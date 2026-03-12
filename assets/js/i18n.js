/* =============================================================
   Akshay Portfolio — i18n (EN / JA) Language Switcher
   Self-contained IIFE. Reads/writes data-i18n attributes.
   Exposes window.__i18n for chat.js to read strings at runtime.
   ============================================================= */
(function () {
  'use strict';

  // ── Translations ───────────────────────────────────────────────
  const translations = {
    en: {
      // Nav
      'nav.home':     'Home',
      'nav.about':    'About',
      'nav.skills':   'Skills',
      'nav.projects': 'Projects',
      'nav.resume':   'Resume',
      'nav.contact':  'Contact',

      // Hero
      'hero.eyebrow':         'Data Scientist & AI/ML Engineer · Tokyo, Japan',
      'hero.subtitle-prefix': 'I build ',
      'hero.typed-items':     'production ML systems.,agentic AI workflows.,computer vision pipelines.,data-driven solutions.',
      'hero.cta-primary':     'View Projects',
      'hero.cta-ghost':       'Get in Touch',
      'hero.scroll':          'Scroll',

      // About
      'about.eyebrow':        'About Me',
      'about.heading':        'Turning data into intelligent systems.',
      'about.role':           'Data Scientist @ Rakuten',
      'about.bio1':           "I'm an Electrical Engineering graduate from India who discovered my passion in Data Science, AI, and Machine Learning. While my academic foundation is in electrical engineering, I was drawn to the limitless possibilities of intelligent systems and the incredible impact they can have on people's lives.",
      'about.bio2-html':      'Currently a Data Scientist at Rakuten in Tokyo, I bring experience across the full ML lifecycle — from building computer vision systems and predictive maintenance models at a semiconductor manufacturer, to deploying production ML pipelines and agentic AI workflows. I hold a <strong>JLPT N2</strong> Japanese language certification and have been based in Japan since 2022.',
      'about.badge-location': 'Tokyo, Japan',
      'about.badge-lang':     'JLPT N2',
      'about.badge-company':  'Rakuten',
      'about.stat1-label':    'Years in ML / AI',
      'about.stat2-label':    'Roles in Japan',
      'about.stat3-label':    'JLPT Japanese',

      // Skills
      'skills.eyebrow': 'Technical Skills',
      'skills.heading': 'Languages & Technologies',
      'skills.group1':  'Languages',
      'skills.group2':  'ML & Data Science',
      'skills.group3':  'Agentic AI & LLMs',
      'skills.group4':  'Tools & Infrastructure',

      // Projects
      'projects.eyebrow': 'Work',
      'projects.heading': 'Projects & Highlights',

      // Project filters
      'filter.all':      'All',
      'filter.cv':       'Computer Vision',
      'filter.llm':      'LLM / NLP',
      'filter.ml':       'Machine Learning',
      'filter.robotics': 'Robotics',

      'proj1.tag':      'Computer Vision · Industry',
      'proj1.title':    'Equipment Anomaly Detection System',
      'proj1.desc':     'Developed a computer vision system to detect anomalies in temperature and humidity controllers for a leading semiconductor manufacturer. Enables timely maintenance and prevents unplanned production downtime. Deployed in a real-time manufacturing environment at Quest Global Japan.',
      'proj2.tag':      'Predictive Maintenance',
      'proj2.title':    'Conveyor Belt RUL Prediction',
      'proj2.desc':     'Built predictive maintenance models for conveyor belt remaining useful life (RUL) prediction. Also detected refrigerant leaks and classified equipment health using sensor data and the KNIME analytics platform.',
      'proj3.tag':      'Analytics · LLM Integration',
      'proj3.title':    'Power BI Analytics Platform & LLM Chatbot',
      'proj3.desc':     "Designed executive Power BI dashboards to analyze service trends and reduce machine service costs. Built a custom Power BI chat bot visual integrating the company's Azure LLM API, enabling field engineers to query production data in natural language directly within the dashboard for real-time insights.",
      'proj4.tag':      'LLM / NLP',
      'proj4.title':    'LLM Based Text to SQL App',
      'proj4.desc':     "Empowers anyone to extract insights from databases by translating natural language questions into accurate SQL queries — including complex conditions and nesting. Powered by Google AI's Gemini LLM.",
      'proj5.tag':      'Computer Vision · Edge AI',
      'proj5.title':    'Automatic Number Plate Recognition',
      'proj5.desc-html':'Enhanced ANPR model by narrowing detection scope, optimizing neural architecture, and compiling for fast inference — improving accuracy 96% → <strong style="color:var(--text-primary)">99.5%</strong> and latency 250ms → <strong style="color:var(--text-primary)">5.6ms</strong>.',
      'proj6.tag':      'Keypoint Detection · Edge',
      'proj6.title':    'Darts Keypoint Detection System',
      'proj6.desc':     'Maps the landing point of a dart on a dartboard for automatic scoring. Optimized for edge devices via ONNX conversion, enabling real-time inference on resource-constrained hardware.',
      'proj7.tag':      'Segmentation · TF.js',
      'proj7.title':    'Farm Animal Dimension Estimator',
      'proj7.desc':     'Image segmentation web app that detects and estimates the length of farm animals using PCA on segmentation masks. Deployed entirely in-browser using TensorFlow.js — no backend required.',
      'proj8.tag':      'Machine Learning',
      'proj8.title':    'Recommendation System',
      'proj8.desc':     'Book and Movie recommendation systems using collaborative filtering, popularity-based, and content-based algorithms.',
      'proj9.tag':      'Robotics · Competition',
      'proj9.title':    'ArtPark Robotics Competition',
      'proj9.desc-html':'Hardware stack for a Janitor Robot at the IISc-hosted ArtPark competition — qualified proposal round, placing in the <strong style="color:var(--text-primary)">top 29 teams</strong> in India.',

      // Resume
      'resume.eyebrow':  'Background',
      'resume.heading':  'Experience & Education',
      'resume.work-col': 'Work Experience',
      'resume.edu-col':  'Education',
      'resume.cert-col': 'Certifications',

      'work1.role':  'Data Scientist',
      'work1.date':  'Feb 2026 – Present',
      'work1.badge': 'Current',
      'work1.org':   'Rakuten · Tokyo, Japan',
      'work2.role':  'Data Scientist',
      'work2.date':  'Jan 2025 – Jan 2026',
      'work2.org':   'Quest Global · Kumamoto, Japan',
      'work2.li1':   'Built CV anomaly detection for semiconductor equipment (temperature/humidity controllers).',
      'work2.li2':   'Developed predictive maintenance models for conveyor belt RUL prediction.',
      'work2.li3':   'Created etching rate recipe optimization web app using Flask.',
      'work2.li4':   'Designed Power BI executive dashboards and a custom LLM chatbot visual using Azure API.',
      'work2.li5':   'Developed KNIME workflows and Selenium automation to improve operational efficiency.',
      'work3.role':  'Machine Learning Engineer',
      'work3.date':  'Oct 2022 – Dec 2024',
      'work3.org':   'SOHGA Co., Ltd · Tokyo, Japan',
      'work3.li1':   'Built in-browser ML apps using TensorFlow.js (classification model builder, farm animal segmentation).',
      'work3.li2':   'Developed Darts keypoint detection system optimized for edge devices via ONNX.',
      'work3.li3':   'Enhanced ANPR model accuracy from 96% to 99.5% and latency from 250ms to 5.6ms.',
      'work4.role':  'Research Intern — 3D Keypoint Detection',
      'work4.date':  'Nov 2021 – Oct 2022',
      'work4.org':   'SOHGA Co., Ltd · Tokyo, Japan',
      'work4.desc':  'Researched 3D keypoint detection using monocular cameras.',
      'work5.role':  'CTO',
      'work5.date':  'Jul 2023 – Sep 2023',
      'work5.org':   'Ferocite · Bengaluru, India',
      'work5.li1':   'Led tech stack decisions, developer hiring, and product roadmap at an early-stage startup.',
      'work5.li2':   'Contributed to client negotiations and closing deals in the first fiscal quarter.',
      'work6.role':  'Data Annotation & Quality Control Intern',
      'work6.date':  'Feb 2022 – Apr 2022',
      'work6.org':   'Wobot.ai · India',
      'work6.li1':   'Labeled 2000+ camera feed images daily for computer vision model training.',
      'work6.li2':   'Promoted to QC in 2 months for reaching benchmark annotation accuracy.',

      'edu1.role':   'B.Tech — Electrical & Electronics Engineering',
      'edu1.date':   '2018 – 2022',
      'edu1.badge':  'CGPA 9.2 / 10',
      'edu1.org':    'REVA University, Bangalore, India',
      'cert1.role':  'Japanese Language Proficiency — JLPT N2',
      'cert1.org':   'Japan Foundation',
      'cert2.role':  'AI Coder: Vibe Coder to Agentic Engineer',
      'cert2.date':  'Mar 2026',
      'cert2.org':   'Udemy',
      'cert3.role':  'Agent Skills with Anthropic',
      'cert3.date':  'Feb 2026',
      'cert3.org':   'DeepLearning.AI',
      'cert4.role':  'Claude Code: A Highly Agentic Coding Assistant',
      'cert4.date':  'Feb 2026',
      'cert4.org':   'DeepLearning.AI',
      'cert5.role':  'MLOps with Databricks',
      'cert5.date':  'Jan 2026',
      'cert5.org':   'LinkedIn Learning',
      'cert6.role':  'Build REST APIs with FastAPI',
      'cert6.date':  'Jan 2026',
      'cert6.org':   'LinkedIn Learning',
      'cert7.role':  'PySpark Essential Training',
      'cert7.date':  'Jan 2026',
      'cert7.org':   'LinkedIn Learning',

      // Contact
      'contact.eyebrow':        'Contact',
      'contact.heading':        "Let's work together.",
      'contact.subtext':        "I'm open to new opportunities, collaborations, and interesting projects. Based in Tokyo — feel free to reach out in English or Japanese.",
      'contact.email-label':    'Email',
      'contact.linkedin-label': 'LinkedIn',
      'contact.github-label':   'GitHub',

      // Footer
      'footer.views': 'views',

      // Chat
      'chat.toggle-label':    'Ask about me',
      'chat.header-name':     "Akshay's AI",
      'chat.header-status':   'Online',
      'chat.greeting':        "Hi! I'm Akshay's AI assistant. Ask me anything about his background, projects, or skills — or how to get in touch.",
      'chat.placeholder':     'Ask about Akshay…',
      'chat.suggestion1':     'What projects has Akshay built?',
      'chat.suggestion2':     'What are his skills?',
      'chat.suggestion3':     'How can I contact him?',
      'chat.error-ratelimit': "You've sent a lot of messages! Please wait a minute before trying again.",
      'chat.error-offline':   "It looks like you're offline. Please check your connection and try again.",
      'chat.error-generic':   "Sorry, I'm having trouble connecting right now. Please try again in a moment, or reach out directly via the contact links below.",
    },

    ja: {
      // Nav
      'nav.home':     'ホーム',
      'nav.about':    '概要',
      'nav.skills':   'スキル',
      'nav.projects': 'プロジェクト',
      'nav.resume':   '経歴',
      'nav.contact':  'お問い合わせ',

      // Hero
      'hero.eyebrow':         'データサイエンティスト & AI/MLエンジニア · 東京、日本',
      'hero.subtitle-prefix': '',
      'hero.typed-items':     '本番MLシステムを構築しています。,エージェントAIワークフローを構築しています。,コンピュータビジョンパイプラインを構築しています。,データ駆動型ソリューションを構築しています。',
      'hero.cta-primary':     'プロジェクトを見る',
      'hero.cta-ghost':       'お問い合わせ',
      'hero.scroll':          'スクロール',

      // About
      'about.eyebrow':        '自己紹介',
      'about.heading':        'データをインテリジェントなシステムへ。',
      'about.role':           'データサイエンティスト @ 楽天',
      'about.bio1':           'インド出身の電気工学系卒業生として、データサイエンス・AI・機械学習への情熱を見出しました。電気工学の学術的基礎を持ちながら、インテリジェントシステムの無限の可能性と、人々の生活に与える大きなインパクトに引き寄せられました。',
      'about.bio2-html':      '現在は東京の楽天でデータサイエンティストとして勤務しており、MLライフサイクル全体にわたる経験を有しています。半導体メーカーでのコンピュータビジョンシステムや予知保全モデルの構築から、本番MLパイプラインおよびエージェントAIワークフローの展開まで手がけています。<strong>JLPT N2</strong>の日本語資格を保有し、2022年から日本を拠点に活動しています。',
      'about.badge-location': '東京、日本',
      'about.badge-lang':     'JLPT N2',
      'about.badge-company':  '楽天',
      'about.stat1-label':    'ML/AI 経験年数',
      'about.stat2-label':    '日本での職歴',
      'about.stat3-label':    '日本語能力',

      // Skills
      'skills.eyebrow': '技術スキル',
      'skills.heading': '言語とテクノロジー',
      'skills.group1':  'プログラミング言語',
      'skills.group2':  'ML & データサイエンス',
      'skills.group3':  'エージェントAI & LLM',
      'skills.group4':  'ツール & インフラ',

      // Projects
      'projects.eyebrow': '実績',
      'projects.heading': 'プロジェクト & ハイライト',

      // Project filters
      'filter.all':      'すべて',
      'filter.cv':       'コンピュータビジョン',
      'filter.llm':      'LLM / NLP',
      'filter.ml':       '機械学習',
      'filter.robotics': 'ロボティクス',

      'proj1.tag':      'コンピュータビジョン · 産業',
      'proj1.title':    '設備異常検知システム',
      'proj1.desc':     '大手半導体メーカー向けに、温湿度コントローラの異常を検知するコンピュータビジョンシステムを開発。設備の適時メンテナンスを可能にし、予期せぬ生産停止を防止。Quest Global Japanのリアルタイム製造環境に導入済み。',
      'proj2.tag':      '予知保全',
      'proj2.title':    'コンベアベルト残存寿命予測',
      'proj2.desc':     'コンベアベルトの残存寿命（RUL）予測のための予知保全モデルを構築。センサーデータとKNIMEアナリティクスプラットフォームを活用し、冷媒漏れの検知および設備の健全性分類も実施。',
      'proj3.tag':      'アナリティクス · LLM統合',
      'proj3.title':    'Power BIアナリティクス基盤 & LLMチャットボット',
      'proj3.desc':     'サービストレンドを分析し機械サービスコストを削減するための役員向けPower BIダッシュボードを設計。Azure LLM APIを統合したカスタムPower BIチャットボットビジュアルを構築し、フィールドエンジニアがダッシュボード内で生産データを自然言語でリアルタイムに照会できるよう実現。',
      'proj4.tag':      'LLM / 自然言語処理',
      'proj4.title':    'LLMによるText to SQLアプリ',
      'proj4.desc':     '自然言語の質問を正確なSQLクエリ（複雑な条件やネストを含む）に変換することで、誰でもデータベースからインサイトを抽出できるよう支援。Google AIのGemini LLMを活用。',
      'proj5.tag':      'コンピュータビジョン · エッジAI',
      'proj5.title':    '自動ナンバープレート認識',
      'proj5.desc-html':'検出範囲の絞り込み、ニューラルアーキテクチャの最適化、高速推論向けコンパイルによりANPRモデルを強化。精度 96% → <strong style="color:var(--text-primary)">99.5%</strong>、レイテンシ 250ms → <strong style="color:var(--text-primary)">5.6ms</strong> に改善。',
      'proj6.tag':      'キーポイント検出 · エッジ',
      'proj6.title':    'ダーツキーポイント検出システム',
      'proj6.desc':     '自動スコアリングのため、ダーツボード上のダーツ着弾点をマッピング。ONNXへの変換によりエッジデバイス向けに最適化し、リソース制約のあるハードウェア上でリアルタイム推論を実現。',
      'proj7.tag':      'セグメンテーション · TF.js',
      'proj7.title':    '農場動物寸法推定システム',
      'proj7.desc':     'セグメンテーションマスクにPCAを適用して農場動物を検出・体長推定する画像セグメンテーションWebアプリ。TensorFlow.jsを使用してブラウザ内で完結—バックエンド不要。',
      'proj8.tag':      '機械学習',
      'proj8.title':    'レコメンデーションシステム',
      'proj8.desc':     '協調フィルタリング、人気度ベース、コンテンツベースのアルゴリズムを使った書籍・映画推薦システム。',
      'proj9.tag':      'ロボティクス · 競技',
      'proj9.title':    'ArtParkロボティクスコンペティション',
      'proj9.desc-html':'IISc主催のArtParkコンペティション向けジャニターロボットのハードウェアスタックを担当。提案ラウンドを通過し、<strong style="color:var(--text-primary)">インド全国上位29チーム</strong>に選出。',

      // Resume
      'resume.eyebrow':  '経歴',
      'resume.heading':  '職歴 & 学歴',
      'resume.work-col': '職務経歴',
      'resume.edu-col':  '学歴',
      'resume.cert-col': '資格・認定',

      'work1.role':  'データサイエンティスト',
      'work1.date':  '2026年2月 – 現在',
      'work1.badge': '在職中',
      'work1.org':   '楽天 · 東京、日本',
      'work2.role':  'データサイエンティスト',
      'work2.date':  '2025年1月 – 2026年1月',
      'work2.org':   'Quest Global · 熊本、日本',
      'work2.li1':   '半導体装置（温湿度コントローラ）のCV異常検知システムを構築。',
      'work2.li2':   'コンベアベルトのRUL予測のための予知保全モデルを開発。',
      'work2.li3':   'Flaskを使ったエッチングレートレシピ最適化Webアプリを作成。',
      'work2.li4':   'Power BI役員向けダッシュボードおよびAzure APIを活用したカスタムLLMチャットボットビジュアルを設計。',
      'work2.li5':   'KNIMEワークフローとSelenium自動化を開発し、業務効率を改善。',
      'work3.role':  '機械学習エンジニア',
      'work3.date':  '2022年10月 – 2024年12月',
      'work3.org':   'SOHGA株式会社 · 東京、日本',
      'work3.li1':   'TensorFlow.jsを使ったブラウザ内MLアプリを構築（分類モデルビルダー、農場動物セグメンテーション）。',
      'work3.li2':   'ONNXによりエッジデバイス向けに最適化されたダーツキーポイント検出システムを開発。',
      'work3.li3':   'ANPRモデルの精度を96%から99.5%に、レイテンシを250msから5.6msに改善。',
      'work4.role':  'リサーチインターン — 3Dキーポイント検出',
      'work4.date':  '2021年11月 – 2022年10月',
      'work4.org':   'SOHGA株式会社 · 東京、日本',
      'work4.desc':  '単眼カメラを使った3Dキーポイント検出を研究。',
      'work5.role':  'CTO',
      'work5.date':  '2023年7月 – 2023年9月',
      'work5.org':   'Ferocite · バンガロール、インド',
      'work5.li1':   '初期スタートアップにおける技術スタックの選定、開発者採用、プロダクトロードマップを主導。',
      'work5.li2':   '第1四半期のクライアント交渉および成約に貢献。',
      'work6.role':  'データアノテーション & 品質管理インターン',
      'work6.date':  '2022年2月 – 2022年4月',
      'work6.org':   'Wobot.ai · インド',
      'work6.li1':   'コンピュータビジョンモデルのトレーニング用に、毎日2000枚以上のカメラ映像画像にラベリング。',
      'work6.li2':   'アノテーション精度のベンチマーク達成により、2ヶ月でQCに昇格。',

      'edu1.role':   'B.Tech — 電気電子工学',
      'edu1.date':   '2018年 – 2022年',
      'edu1.badge':  'GPA 9.2 / 10',
      'edu1.org':    'REVA大学、バンガロール、インド',
      'cert1.role':  '日本語能力試験 — JLPT N2',
      'cert1.org':   '日本国際教育支援協会',
      'cert2.role':  'AIコーダー：バイブコーディングからエージェントエンジニアへ',
      'cert2.date':  '2026年3月',
      'cert2.org':   'Udemy',
      'cert3.role':  'Anthropicによるエージェントスキル',
      'cert3.date':  '2026年2月',
      'cert3.org':   'DeepLearning.AI',
      'cert4.role':  'Claude Code：高度なエージェント型コーディングアシスタント',
      'cert4.date':  '2026年2月',
      'cert4.org':   'DeepLearning.AI',
      'cert5.role':  'DatabricksによるMLOps',
      'cert5.date':  '2026年1月',
      'cert5.org':   'LinkedIn Learning',
      'cert6.role':  'FastAPIでREST APIを構築する',
      'cert6.date':  '2026年1月',
      'cert6.org':   'LinkedIn Learning',
      'cert7.role':  'PySpark基礎トレーニング',
      'cert7.date':  '2026年1月',
      'cert7.org':   'LinkedIn Learning',

      // Contact
      'contact.eyebrow':        'お問い合わせ',
      'contact.heading':        '一緒に働きましょう。',
      'contact.subtext':        '新しい機会・コラボレーション・面白いプロジェクトを歓迎しています。東京在住 — 日本語または英語でお気軽にご連絡ください。',
      'contact.email-label':    'メール',
      'contact.linkedin-label': 'LinkedIn',
      'contact.github-label':   'GitHub',

      // Footer
      'footer.views': '閲覧数',

      // Chat
      'chat.toggle-label':    '何でも聞いてね',
      'chat.header-name':     'アクシャイのAI',
      'chat.header-status':   'オンライン',
      'chat.greeting':        'こんにちは！アクシャイのAIアシスタントです。経歴・プロジェクト・スキル、または連絡先についてお気軽にどうぞ。',
      'chat.placeholder':     'アクシャイについて質問する…',
      'chat.suggestion1':     'どんなプロジェクトを作りましたか？',
      'chat.suggestion2':     'スキルを教えてください',
      'chat.suggestion3':     '連絡先を教えてください',
      'chat.error-ratelimit': 'メッセージを送りすぎました。少し待ってからもう一度お試しください。',
      'chat.error-offline':   'オフラインのようです。接続を確認してからもう一度お試しください。',
      'chat.error-generic':   '接続に問題が発生しています。しばらくしてから再度お試しいただくか、下の連絡先リンクから直接ご連絡ください。',
    }
  };

  // ── State ──────────────────────────────────────────────────────
  let currentLang = localStorage.getItem('lang') || 'en';

  // ── Translation helper ─────────────────────────────────────────
  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) ||
           (translations['en'][key]) || key;
  }

  // Expose for chat.js to read strings at runtime
  window.__i18n = { t: () => {} }; // placeholder until applyLang runs

  // ── Apply translations ─────────────────────────────────────────
  function applyLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'ja' ? 'ja' : 'en');

    const tr = translations[lang];

    // textContent elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (tr[key] !== undefined) el.textContent = tr[key];
    });

    // innerHTML elements (contains HTML tags like <strong>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (tr[key] !== undefined) el.innerHTML = tr[key];
    });

    // placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (tr[key] !== undefined) el.setAttribute('placeholder', tr[key]);
    });

    // Typed.js — reinitialize only when strings change
    const typedEl = document.querySelector('.typed');
    const newTypedItems = tr['hero.typed-items'];
    if (typedEl && newTypedItems) {
      const current = typedEl.getAttribute('data-typed-items');
      if (current !== newTypedItems) {
        typedEl.setAttribute('data-typed-items', newTypedItems);
        if (window.__typedInstance) {
          window.__typedInstance.destroy();
          window.__typedInstance = null;
        }
        if (typeof Typed !== 'undefined') {
          window.__typedInstance = new Typed('.typed', {
            strings: newTypedItems.split(',').map(s => s.trim()),
            loop: true,
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000
          });
        }
      }
    }

    // Update lang toggle button text
    const btn = document.querySelector('.lang-toggle');
    if (btn) {
      btn.textContent = lang === 'ja' ? 'EN' : 'JP';
      btn.setAttribute('aria-label', lang === 'ja' ? 'Switch to English' : '日本語に切り替える');
    }

    // Update window.__i18n so chat.js can read current strings
    window.__i18n = { t: (key) => tr[key] || translations['en'][key] || key };

    // Expose current lang for chat.js request body
    window.__currentLang = lang;
  }

  // ── Toggle button click ────────────────────────────────────────
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const next = currentLang === 'en' ? 'ja' : 'en';
      applyLang(next);
      localStorage.setItem('lang', next);
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  // Run after DOM is ready. Typed.js is already loaded and main.js
  // has initialized __typedInstance — we may destroy+reinit if lang=ja.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLang(currentLang));
  } else {
    applyLang(currentLang);
  }

})();
