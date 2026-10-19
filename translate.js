/* Iskra Coaching: English / Polish switch.
   Polish uses Google Website Translator, loaded only when a visitor chooses PL. */
(function () {
  var KEY = 'iskra-lang';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var q = new URLSearchParams(location.search).get('lang');
  var lang = (q || get() || 'en') === 'pl' ? 'pl' : 'en';
  var host = location.hostname, bare = host.replace(/^www\./, '');
  function setCookie() {
    var c = 'googtrans=/en/pl; path=/';
    document.cookie = c;
    if (bare.indexOf('.') > -1) document.cookie = c + '; domain=.' + bare;
  }
  function clearCookie() {
    var x = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = x; document.cookie = x + '; domain=' + host;
    if (bare.indexOf('.') > -1) document.cookie = x + '; domain=.' + bare;
  }
  function switchTo(l) {
    put(l);
    if (l === 'pl') setCookie(); else clearCookie();
    var url = location.pathname + location.hash;   // drop ?lang=
    if (url === location.pathname + location.search + location.hash) location.reload(); else location.href = url;
  }
  var css = document.createElement('style');
  css.textContent =
    '.lang{display:inline-flex;gap:2px;padding:2px;border:1px solid rgba(217,187,139,.5);border-radius:999px;align-items:center}' +
    '.lang button{font:500 .74rem/1 var(--sans,system-ui);letter-spacing:.06em;padding:.38rem .62rem;border:0;border-radius:999px;background:none;color:var(--on-dark-muted,#AEB7C2);cursor:pointer}' +
    '.lang button:hover{color:var(--on-dark,#EDE9E0)}' +
    '.lang button[aria-pressed="true"]{background:var(--champagne,#D9BB8B);color:#0E151D}' +
    '.lang button:focus-visible{outline:2px solid var(--champagne,#D9BB8B);outline-offset:2px}' +
    '.tr-note{position:fixed;left:0;right:0;bottom:0;z-index:90;background:#F3EBDA;color:#4a3d22;font:.82rem/1.5 var(--sans,system-ui);text-align:center;padding:.55rem 2.6rem .55rem 1rem;box-shadow:0 -2px 12px rgba(0,0,0,.18)}.tr-note button{position:absolute;right:.6rem;top:50%;transform:translateY(-50%);border:0;background:none;font-size:1.1rem;line-height:1;color:#4a3d22;cursor:pointer;padding:.3rem .5rem}' +
    '.nav-links .lang{width:fit-content}' +
    'body{top:0!important}.skiptranslate>iframe,iframe.skiptranslate,.goog-te-banner-frame,#goog-gt-tt,.goog-tooltip{display:none!important}' +
    '.goog-text-highlight{background:none!important;box-shadow:none!important}';
  document.head.appendChild(css);

  function build() {
    var nav = document.getElementById('navLinks');
    if (nav) {
      var box = document.createElement('div');
      box.className = 'lang notranslate'; box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Language / Język');
      [['en', 'EN', 'English'], ['pl', 'PL', 'Polski']].forEach(function (d) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = d[1]; b.title = d[2]; b.lang = d[0];
        b.setAttribute('aria-pressed', String(lang === d[0]));
        b.addEventListener('click', function () { if (lang !== d[0]) switchTo(d[0]); });
        box.appendChild(b);
      });
      var cta = nav.querySelector('.btn');
      nav.insertBefore(box, cta || null);
    }
    var brand = document.querySelector('.brand'); if (brand) brand.setAttribute('translate', 'no');
    if (lang === 'pl') {
      var n = document.createElement('div'); n.className = 'tr-note notranslate'; n.setAttribute('translate', 'no');
      n.textContent = 'Tłumaczenie automatyczne (Google). W razie rozbieżności obowiązuje wersja angielska.';
      var x = document.createElement('button'); x.type = 'button'; x.textContent = '\u00d7'; x.setAttribute('aria-label', 'Zamknij');
      x.addEventListener('click', function () { n.remove(); });
      n.appendChild(x); document.body.appendChild(n);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();

  if (lang === 'pl') {
    setCookie();
    var holder = document.createElement('div'); holder.id = 'google_translate_element'; holder.style.display = 'none';
    document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(holder); });
    window.iskraTranslateInit = function () {
      new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'pl', autoDisplay: false }, 'google_translate_element');
    };
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=iskraTranslateInit'; s.async = true;
    document.head.appendChild(s);
  } else if (/(^|; )googtrans=/.test(document.cookie)) clearCookie();
})();
