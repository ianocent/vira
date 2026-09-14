/* track.js - event tracking universal (GTM dataLayer).
 * Dipasang di semua site sales Suzuki via shared/inject_tracking.py
 * Event yang dikirim (dataLayer.push):
 *   - wa_link_click  : klik tautan WhatsApp (delegation, semua halaman)
 *   - tel_link_click : klik tautan tel:
 *   - cta_click      : klik tombol CTA (.btn-wa, .cta, [data-cta])
 *   - site_map_click : klik link navigasi halaman lain
 *   - scroll_75      : kedalaman scroll 75% (sinyal minat)
 */
(function () {
    try {
        window.dataLayer = window.dataLayer || [];
        var SITE = window.location.hostname;

        function track(event, params) {
            params = params || {};
            params.event = event;
            params.platform = 'web';
            params.site = SITE;
            window.dataLayer.push(params);
        }

        function waitGTM(fn, tries) {
            tries = tries || 0;
            if (window.google_tag_manager || typeof window.google_tag_manager !== 'undefined') { fn(); return; }
            if (tries > 50) { fn; return; }
            setTimeout(function () { waitGTM(fn, tries + 1); }, 100);
        }

        document.addEventListener('click', function (ev) {
            var a = ev.target.closest ? ev.target.closest('a') : null;
            if (!a) return;
            var href = a.getAttribute('href') || '';
            var label = (a.innerText || a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);

            if (href.indexOf('wa.me') !== -1) { track('wa_link_click', { link_text: label, model: label }); }
            if (href.substr(0, 4) === 'tel:') { track('tel_link_click', { link_text: label }); }
            if (a.classList && (a.classList.contains('cta') || a.classList.contains('btn-wa') || a.getAttribute('data-cta'))) {
                track('cta_click', { link_text: label });
            }
            if (href.indexOf('/') === 0 && href !== '/' && href.indexOf('assets') === -1) {
                track('site_nav_click', { link_text: label, page: location.pathname });
            }
        });

        var scrolled = false;
        var onScroll = function () {
            var doc = document.documentElement;
            var h = doc.scrollHeight - window.innerHeight;
            if (h <= 0) return;
            var ratio = window.scrollY / h;
            if (!scrolled && ratio >= 0.75) { scrolled = true; track('scroll_75', { page: location.pathname }); }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    } catch (e) {
        try { window.dataLayer.push({ event: 'track_error', error: String(e) }); } catch (e2) {}
    }
})();