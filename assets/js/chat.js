/* =============================================================
   Akshay Portfolio — AI Chat Widget
   Self-contained IIFE. Communicates via Cloudflare Worker proxy.
   ============================================================= */
(function () {
  'use strict';

  // ── Configuration ─────────────────────────────────────────────
  const WORKER_URL = 'https://jolly-sky-5ae9.sandhyadilip88.workers.dev';
  const MODEL = 'openrouter/free';
  const MAX_HISTORY_TURNS = 8; // user+ai pairs kept for context

  // ── State ──────────────────────────────────────────────────────
  let isOpen = false;
  let isStreaming = false;
  let greetingShown = false;
  let history = []; // { role: 'user'|'assistant', content: string }[]

  // ── DOM refs ───────────────────────────────────────────────────
  const toggle      = document.getElementById('chat-toggle');
  const panel       = document.getElementById('chat-panel');
  const closeBtn    = document.getElementById('chat-close');
  const messagesEl  = document.getElementById('chat-messages');
  const form        = document.getElementById('chat-form');
  const inputEl     = document.getElementById('chat-input');
  const sendBtn     = document.getElementById('chat-send');
  const suggestionsEl = document.getElementById('chat-suggestions');

  if (!toggle || !panel) return; // guard: elements not found

  // ── Panel open / close ─────────────────────────────────────────
  function openPanel() {
    isOpen = true;
    panel.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');

    // Trigger CSS transition (small delay lets display:flex render first)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.add('is-open');
      });
    });

    if (!greetingShown) {
      greetingShown = true;
      setTimeout(() => {
        appendMessage('ai', "Hi! I'm Akshay's AI assistant. Ask me anything about his background, projects, or skills — or how to get in touch.");
      }, 200);
    }

    inputEl.focus();
    document.addEventListener('keydown', handleEscape);
  }

  function closePanel() {
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');

    // Re-hide after transition completes
    setTimeout(() => {
      if (!isOpen) panel.setAttribute('hidden', '');
    }, 400); // matches --transition-slow

    toggle.focus();
    document.removeEventListener('keydown', handleEscape);
  }

  function handleEscape(e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  }

  toggle.addEventListener('click', () => isOpen ? closePanel() : openPanel());
  closeBtn.addEventListener('click', closePanel);

  // ── Message rendering ──────────────────────────────────────────
  function stripMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '$1')  // **bold**
      .replace(/\*(.+?)\*/g, '$1')       // *italic*
      .replace(/`(.+?)`/g, '$1')         // `code`
      .replace(/#+\s*/g, '')             // ## headers
      .replace(/^\s*[-•]\s+/gm, '• ');  // - bullets → • bullets
  }

  function appendMessage(role, content) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = content;

    msg.appendChild(bubble);
    messagesEl.appendChild(msg);
    scrollToBottom();
    return bubble; // returned so streaming can update it
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // ── Typing indicator ───────────────────────────────────────────
  let typingEl = null;

  function showTyping() {
    typingEl = document.createElement('div');
    typingEl.className = 'chat-typing-indicator';
    typingEl.innerHTML = '<span class="chat-typing-dot"></span><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span>';
    messagesEl.appendChild(typingEl);
    scrollToBottom();
  }

  function removeTyping() {
    if (typingEl) { typingEl.remove(); typingEl = null; }
  }

  // ── Streaming response ─────────────────────────────────────────
  async function streamResponse(userText) {
    if (isStreaming) return;
    isStreaming = true;
    sendBtn.disabled = true;

    // Hide suggestion chips after first real interaction
    suggestionsEl.classList.add('hidden');

    // Trim history to MAX_HISTORY_TURNS pairs
    const maxMessages = MAX_HISTORY_TURNS * 2;
    if (history.length > maxMessages) {
      history = history.slice(history.length - maxMessages);
    }

    const messages = [
      ...history,
      { role: 'user', content: userText }
    ];

    showTyping();

    let bubble = null;
    let fullText = '';

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, messages, stream: true })
      });

      if (response.status === 429) {
        removeTyping();
        appendMessage('ai', "You've sent a lot of messages! Please wait a minute before trying again.");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              if (firstChunk) {
                firstChunk = false;
                removeTyping();
                bubble = appendMessage('ai', '');
              }
              fullText += delta;
              bubble.textContent = stripMarkdown(fullText);
              scrollToBottom();
            }
          } catch {
            // malformed chunk — skip
          }
        }
      }

      // Non-streaming fallback: if no chunks came through, check for plain JSON
      if (firstChunk) {
        removeTyping();
        try {
          const json = JSON.parse(buffer + decoder.decode());
          const content = json.choices?.[0]?.message?.content || json.choices?.[0]?.text;
          if (content) {
            fullText = content;
            bubble = appendMessage('ai', stripMarkdown(fullText));
          } else {
            throw new Error('empty response');
          }
        } catch {
          throw new Error('no content received');
        }
      }

      // Persist to history
      history.push({ role: 'user', content: userText });
      history.push({ role: 'assistant', content: fullText });

    } catch (err) {
      removeTyping();

      if (!navigator.onLine) {
        appendMessage('ai', "It looks like you're offline. Please check your connection and try again.");
      } else {
        appendMessage('ai', "Sorry, I'm having trouble connecting right now. Please try again in a moment, or reach out directly via the contact links below.");
      }
    } finally {
      isStreaming = false;
      updateSendBtn();
    }
  }

  // ── Input handling ─────────────────────────────────────────────
  function updateSendBtn() {
    sendBtn.disabled = inputEl.value.trim().length === 0 || isStreaming;
  }

  inputEl.addEventListener('input', updateSendBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text || isStreaming) return;

    appendMessage('user', text);
    inputEl.value = '';
    updateSendBtn();
    streamResponse(text);
  });

  // ── Suggestion chips ───────────────────────────────────────────
  suggestionsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.chat-suggestion');
    if (!btn) return;
    const text = btn.textContent.trim();
    appendMessage('user', text);
    streamResponse(text);
  });

})();
