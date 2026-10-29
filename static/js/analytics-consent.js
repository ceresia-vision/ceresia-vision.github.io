(() => {
  'use strict';
  const measurementId = 'G-5E9LXL6HFZ';
  const storageKey = 'ceresia-analytics-consent-v1';
  const language = document.documentElement.lang.split('-')[0];
  const messages = {
    es: {title: 'Privacidad y cookies', body: 'Usamos Google Analytics para entender cómo se utiliza la web. Solo se activa si aceptas las cookies de análisis. Puedes cambiar tu elección en cualquier momento.', accept: 'Aceptar', reject: 'Rechazar', settings: 'Cookies', policy: 'Política de cookies'},
    en: {title: 'Privacy and cookies', body: 'We use Google Analytics to understand how this site is used. Analytics cookies are enabled only if you accept them. You can change your choice at any time.', accept: 'Accept', reject: 'Reject', settings: 'Cookies', policy: 'Cookie policy'},
    fr: {title: 'Confidentialité et cookies', body: 'Nous utilisons Google Analytics pour comprendre l’utilisation du site. Les cookies d’analyse ne sont activés qu’avec votre accord. Vous pouvez modifier votre choix à tout moment.', accept: 'Accepter', reject: 'Refuser', settings: 'Cookies', policy: 'Politique de cookies'},
    it: {title: 'Privacy e cookie', body: 'Utilizziamo Google Analytics per capire come viene usato il sito. I cookie di analisi vengono attivati solo se li accetti. Puoi modificare la tua scelta in qualsiasi momento.', accept: 'Accetta', reject: 'Rifiuta', settings: 'Cookie', policy: 'Informativa sui cookie'},
    zh: {title: '隐私和 Cookie', body: '我们使用 Google Analytics 了解网站的使用情况。只有在您同意后才会启用分析 Cookie。您可以随时更改选择。', accept: '接受', reject: '拒绝', settings: 'Cookie 设置', policy: 'Cookie 政策'}
  };
  const text = messages[language] || messages.en;
  const policyPaths = {es: 'politica-de-cookies/', en: 'en/cookie-policy/', fr: 'fr/politique-de-cookies/', it: 'it/informativa-cookie/', zh: 'zh/cookie-policy/'};
  const base = document.currentScript.dataset.siteBase || '/';
  let choice = null;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && Date.now() - saved.time < 180 * 24 * 60 * 60 * 1000) choice = saved.choice;
  } catch (_) { /* Ask again if storage is unavailable or invalid. */ }

  const startAnalytics = () => {
    if (document.querySelector('[data-ceresia-analytics]')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
    const script = document.createElement('script');
    script.async = true;
    script.dataset.ceresiaAnalytics = 'true';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  };
  if (choice === 'accepted') startAnalytics();

  const init = () => {
    const banner = document.createElement('section');
    banner.className = 'cookie-banner';
    banner.setAttribute('aria-label', text.title);
    banner.hidden = choice === 'accepted' || choice === 'rejected';
    const content = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = text.title;
    const description = document.createElement('p');
    description.textContent = text.body;
    const policy = document.createElement('a');
    policy.href = base + (policyPaths[language] || policyPaths.en);
    policy.textContent = text.policy;
    content.append(title, description, policy);
    const actions = document.createElement('div');
    actions.className = 'cookie-actions';
    const reject = document.createElement('button');
    reject.type = 'button'; reject.textContent = text.reject;
    const accept = document.createElement('button');
    accept.type = 'button'; accept.textContent = text.accept;
    actions.append(reject, accept);
    banner.append(content, actions);
    document.body.append(banner);

    const saveChoice = (value) => {
      try { localStorage.setItem(storageKey, JSON.stringify({choice: value, time: Date.now()})); } catch (_) { /* The choice applies to this page. */ }
      banner.hidden = true;
      if (value === 'accepted') startAnalytics();
      else if (document.querySelector('[data-ceresia-analytics]')) {
        // Remove GA cookies at the host and parent-domain scopes, then unload the tag.
        const parts = location.hostname.split('.');
        const domains = [''];
        for (let i = 0; i < parts.length - 1; i++) domains.push('; domain=' + parts.slice(i).join('.'));
        document.cookie.split(';').forEach((cookie) => {
          const name = cookie.trim().split('=')[0];
          if (/^_ga(?:_|$)/.test(name)) domains.forEach((domain) => {
            document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
          });
        });
        window.location.reload();
      }
    };
    reject.addEventListener('click', () => saveChoice('rejected'));
    accept.addEventListener('click', () => saveChoice('accepted'));
    document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
      button.textContent = text.settings;
      button.addEventListener('click', () => { banner.hidden = false; reject.focus(); });
    });
  };
  window.addEventListener('storage', (event) => {
    if (event.key === storageKey) window.location.reload();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
