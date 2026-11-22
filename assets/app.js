/* Samuel Drouin — portfolio.
   Contenu : assets/data.js (projets), assets/ajouts.js (projets ajoutés par l'app), videos.js.
   Photos : assets/photos.js (généré). */
(function () {
  "use strict";
  var SITE = window.SITE, PHOTOS = window.PHOTOS || {}, MAP = window.PREVIEW_MAP || null;
  var VSEC = window.VIDEO_SECTIONS || [], VIDEOS = (window.VIDEOS || []).concat(window.AJOUTS_VIDEOS || []);
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia("(hover: none)").matches;
  var MAIL = "samueldrouin10@gmail.com", TEL = "+230 5473 18 36", WA = "23054731836";

  /* ---------- projets ajoutés par l'app ---------- */
  (window.AJOUTS || []).forEach(function (a) {
    var f = "ajouts/" + a.slug;
    PHOTOS[f] = a.images;
    SITE.projets[a.slug] = { titre: a.titre, dossier: f, nouveau: true };
    var sec = SITE.sections.filter(function (s) { return s.id === a.section; })[0];
    if (!sec) { sec = { id: a.section, fr: a.sectionNom || a.section, en: a.sectionNom || a.section, projets: [] }; SITE.sections.splice(SITE.sections.length - 1, 0, sec); }
    if (sec.projets.indexOf(a.slug) < 0) sec.projets.unshift(a.slug);
    if (a.vitrine && SITE.une && a.images && a.images[0]) SITE.une.unshift({ projet: a.slug, img: [f + "/" + a.images[0][0]] });
  });
  VIDEOS.forEach(function (v) { if (v.vitrine && !v.vedette) v.vedette = 0.5; });

  /* ---------- langue ---------- */
  var lang = "";
  try { lang = localStorage.getItem("sd-lang") || ""; } catch (e) {}
  if (lang !== "fr" && lang !== "en") lang = /^fr/i.test(navigator.language || "") ? "fr" : "en";
  var T = {
    fr: {
      who: "Samuel Drouin", role: "Photographe & vidéaste, île Maurice", photo: "Photographie", video: "Vidéo", grade: "Étalonnage", info: "Info", contact: "Contact", menu: "Menu", close: "Fermer",
      images: "photos", projects: "projets", project: "projet", see: "Voir le projet", byProject: "Tous les projets", allVideos: "Toutes les vidéos",
      services: "Services", servicesLine: "Architecture et hôtellerie, entreprises et marques, portrait, voyage, films, drone, étalonnage.",
      clients: "Ils m’ont fait confiance", clientsLine: "Ciel Textile, Gamma Construction, Sealife, Sasha Academy, Telkom Kenya, KFC, Eclosia.",
      similar: "Un projet similaire ?", email: "E-mail", next: "Projet suivant", back: "Retour", ask: "Un projet ?", copy: "Copier", copied: "Copié",
      rights: "Photographies protégées, toute reproduction interdite.", prev: "Préc.", nextShort: "Suiv.", prevImg: "Image préc.", nextImg: "Image suiv.", play: "Lire",
      bio: "Samuel Drouin est photographe et vidéaste, basé à l’île Maurice. Il photographie et filme les entreprises, les marques, les lieux et les personnes qui les font vivre, du drone au plateau de tournage. Coloriste, il développe Node DRT, un plugin d’étalonnage pour DaVinci Resolve, et Lumina, un DCTL.",
      tools: "Outils", svc: ["Photographie d’entreprise et de marque", "Portrait", "Architecture et hôtellerie", "Films publicitaires et institutionnels", "Prises de vue par drone", "Contenus pour les réseaux", "Étalonnage"],
      videos: "vidéos", prevP: "Projet précédent", wa: "Bonjour Samuel, j’ai un projet : ", notfound: "Page introuvable", home: "Retour à l’accueil", isNew: "Nouveau"
    },
    en: {
      who: "Samuel Drouin", role: "Photographer & filmmaker, Mauritius", photo: "Photography", video: "Video", grade: "Colour grading", info: "Info", contact: "Contact", menu: "Menu", close: "Close",
      images: "photos", projects: "projects", project: "project", see: "View project", byProject: "All projects", allVideos: "All videos",
      services: "Services", servicesLine: "Architecture & hospitality, corporate & brands, portrait, travel, film, drone, colour grading.",
      clients: "Clients", clientsLine: "Ciel Textile, Gamma Construction, Sealife, Sasha Academy, Telkom Kenya, KFC, Eclosia.",
      similar: "A similar project?", email: "Email", next: "Next project", back: "Back", ask: "A project in mind?", copy: "Copy", copied: "Copied",
      rights: "Protected photographs, all reproduction prohibited.", prev: "Prev.", nextShort: "Next", prevImg: "Previous image", nextImg: "Next image", play: "Play",
      bio: "Samuel Drouin is a photographer and filmmaker based in Mauritius. He photographs and films companies, brands, places and the people behind them, from drone to film set. A colourist, he develops Node DRT, a grading plugin for DaVinci Resolve, and Lumina, a DCTL.",
      tools: "Tools", svc: ["Corporate & brand photography", "Portrait", "Architecture & hospitality", "Commercial & corporate film", "Drone photography & film", "Social media content", "Colour grading"],
      videos: "videos", prevP: "Previous project", wa: "Hi Samuel, I have a project: ", notfound: "Page not found", home: "Back to home", isNew: "New"
    }
  };
  var AUTH = "C’est dans la brume et dans la conquête de moi-même que je laisse parler mon intuition. La photographie est devenue ma quête. Cette quête n’a pas, pour moi, de destination dans le temps. Cet instant est en soi ma destination.";
  var AUTH_EN = "It is in the mist, and in the conquest of myself, that I let my intuition speak. Photography has become my quest. For me, this quest has no destination in time. This very moment is my destination.";
  function t(k) { return T[lang][k]; }
  function L(o) { return o && typeof o === "object" ? (o[lang] || o.fr) : o; }

  /* ---------- données ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var DIM = {};
  Object.keys(PHOTOS).forEach(function (f) { DIM[f] = {}; PHOTOS[f].forEach(function (x) { DIM[f][x[0]] = x; }); });
  function P(code) {
    var i = code.lastIndexOf("/"), f = code.slice(0, i), n = code.slice(i + 1), d = (DIM[f] || {})[n] || [n, 1600, 1067];
    return { code: code, f: f, n: n, w: d[1], h: d[2] };
  }
  function src(p, small) { var s = "photos/" + p.f + (small ? "/min/" : "/") + p.n + ".jpg"; return MAP && MAP[s] ? MAP[s] : s; }
  function waLink() { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t("wa")); }
  function proj(slug) { return SITE.projets[slug]; }
  function images(slug) {
    var p = proj(slug); if (!p) return [];
    return (PHOTOS[p.dossier] || []).filter(function (x) {
      if (p.partie && x[3] !== p.partie) return false;
      if (p.sauf && p.sauf.indexOf(x[0]) >= 0) return false;
      return true;
    }).map(function (x) { return P(p.dossier + "/" + x[0]); });
  }
  function cover(slug) { var p = proj(slug); return p.couverture ? P(p.dossier + "/" + p.couverture) : images(slug)[0]; }
  function sectionOf(slug) { return SITE.sections.filter(function (s) { return s.projets.indexOf(slug) >= 0; })[0]; }
  function allProjects() { var a = []; SITE.sections.forEach(function (s) { s.projets.forEach(function (p) { if (proj(p) && images(p).length) a.push(p); }); }); return a; }

  function img(p, o) {
    o = o || {};
    return '<img draggable="false" alt="' + esc(o.alt || "") + '" width="' + p.w + '" height="' + p.h + '"' + (o.eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"') +
      ' src="' + esc(src(p, !o.full)) + '" srcset="' + esc(src(p, true)) + " 960w, " + esc(src(p)) + ' 1600w" sizes="' + (o.sizes || "50vw") + '">';
  }

  /* rangée(s) justifiée(s) : les images gardent leur format et partagent la même hauteur */
  function justify(el, items, o) {
    o = o || {};
    var cs = getComputedStyle(el), W = el.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) - 1; if (W <= 0) return;
    var gap = parseFloat(cs.getPropertyValue("--g")) || 12, vw = window.innerWidth, vh = window.innerHeight;
    var rows = [], lastRows = [];
    if (o.balanced) {
      var mx = vw < 768 ? 2 : o.balanced, k = Math.ceil(items.length / mx), base = Math.floor(items.length / k), extra = items.length % k, q = 0;
      for (var ri = 0; ri < k; ri++) { var n = base + (ri < extra ? 1 : 0); rows.push(items.slice(q, q + n)); q += n; }
    } else if (o.single) {
      var groups = vw < 768 && items.length > 2 ? [items.slice(0, 2), items.slice(2)] : [items];
      groups.forEach(function (g) { rows.push(g); });
    } else if (o.rows) {
      o.rows.forEach(function (r) {
        var x = r.map(function (i) { return items[i]; }).filter(Boolean);
        /* sur téléphone, pas plus de deux images par rangée pour garder des photos lisibles */
        while (vw < 600 && x.length > 2) rows.push(x.splice(0, 2));
        if (x.length) rows.push(x);
      });
    } else {
      var target = o.target ? o.target(vw) : 300, segs = [[]];
      items.forEach(function (it, i) { if (o.breaks && o.breaks[i] && segs[segs.length - 1].length) segs.push([]); segs[segs.length - 1].push(it); });
      segs.forEach(function (seg) {
        var row = [], sum = 0;
        seg.forEach(function (it) { row.push(it); sum += it.p.w / it.p.h; if (sum * target + gap * (row.length - 1) >= W) { rows.push(row); row = []; sum = 0; } });
        if (row.length) { rows.push(row); lastRows.push(rows.length - 1); }
      });
    }
    el.innerHTML = rows.map(function (r, ri) {
      var sum = r.reduce(function (a, it) { return a + it.p.w / it.p.h; }, 0), h = (W - gap * (r.length - 1)) / sum;
      var last = lastRows.indexOf(ri) >= 0 && !o.single && !o.rows && rows.length > 1;
      if (last && o.target) h = Math.min(h, o.target(vw) * 1.15);
      if (o.maxH) h = Math.min(h, o.maxH * vh);
      return '<div class="jr' + (o.center ? " c" : "") + '">' + r.map(function (it) {
        var w = h * it.p.w / it.p.h, tag = it.href ? "a" : "button";
        return "<" + tag + ' class="tile fig"' + (it.href ? ' href="' + it.href + '"' : ' type="button"') + (it.i != null ? ' data-i="' + it.i + '"' : "") + ' style="width:' + w.toFixed(1) + 'px">' +
          '<div class="mask" style="height:' + h.toFixed(1) + 'px">' + img(it.p, { alt: it.alt, sizes: Math.ceil(100 * w / vw) + "vw", eager: o.eager || ri === 0 }) + "</div>" + (it.cap || "") + "</" + tag + ">";
      }).join("") + "</div>";
    }).join("");
    observe();
  }
  var resizers = [];
  function mountJ(el, items, o) { var f = function () { justify(el, items, o); }; f(); resizers.push(f); }

  /* ---------- squelette ---------- */
  var hd = document.getElementById("hd"), main = document.getElementById("main"), ft = document.getElementById("contact"), bar = document.getElementById("bar"), menu = document.getElementById("menu");
  function chrome() {
    document.documentElement.lang = lang;
    hd.innerHTML = '<a class="who intro-hd" href="#/">' + t("who") + '</a><span class="loc intro-hd">' + esc(t("role")) + "</span>" +
      '<nav class="intro-hd" aria-label="Navigation"><button type="button" class="u ixb" data-ixo>Index,</button> <a class="u" data-nav="photographie" href="#/photographie">' + t("photo") + ',</a> <a class="u" data-nav="video" href="#/video">' + t("video") + ',</a> ' +
      '<a class="u" data-nav="etalonnage" href="#/etalonnage">' + t("grade") + ',</a> <a class="u" data-nav="info" href="#/info">' + t("info") + ',</a> <a class="u" href="#contact" data-contact>' + t("contact") + "</a>" +
      '<span class="lang"><button class="' + (lang === "fr" ? "" : "off") + '" data-lang="fr">FR</button> / <button class="' + (lang === "en" ? "" : "off") + '" data-lang="en">EN</button></span></nav>' +
      '<button class="menu-b intro-hd" aria-expanded="false" aria-controls="menu">' + t("menu") + "</button>";
    menu.innerHTML = '<button type="button" class="big" data-ixo>Index</button><a class="big" href="#/photographie">' + t("photo") + '</a><a class="big" href="#/video">' + t("video") + '</a><a class="big" href="#/etalonnage">' + t("grade") + '</a><a class="big" href="#/info">' + t("info") + '</a><a class="big" href="#contact" data-contact>' + t("contact") + "</a>" +
      '<div class="sm"><button data-lang="fr">FR</button><button data-lang="en">EN</button><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:' + MAIL + '">' + t("email") + "</a></div>";
    ft.innerHTML = '<p class="q">' + t("ask") + '</p><a class="big u" href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp →</a><a class="big u" href="mailto:' + MAIL + '">' + t("email") + " →</a>" +
      '<div class="bot"><span>' + MAIL + ' &nbsp; <button type="button" id="cp">' + t("copy") + "</button></span><span>" + TEL + "</span><span>© " + new Date().getFullYear() + " Samuel Drouin. " + t("rights") + "</span></div>";
    bar.innerHTML = '<a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:' + MAIL + '">' + t("email") + "</a>";
    hd.querySelector(".menu-b").addEventListener("click", function () { toggleMenu(); });
    document.getElementById("cp").addEventListener("click", function () {
      var b = this;
      try { navigator.clipboard.writeText(MAIL).then(function () { b.textContent = t("copied"); setTimeout(function () { b.textContent = t("copy"); }, 1500); }); } catch (e) {}
    });
  }
  function toggleMenu(force) {
    var b = hd.querySelector(".menu-b"), open = force != null ? force : menu.hidden;
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("on"); }); }
    else { if (menu.hidden) return; menu.classList.remove("on"); setTimeout(function () { if (!menu.classList.contains("on")) menu.hidden = true; }, 400); }
    lock(open, true);
    b.setAttribute("aria-expanded", open); b.textContent = open ? t("close") : t("menu");
  }
  /* rend la page inactive derrière une fenêtre ouverte */
  function lock(on, keepHd) { [main, ft, bar].forEach(function (x) { if (x) x.inert = on; }); if (!keepHd) hd.inert = on; }
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) toggleMenu(false); });
  document.addEventListener("click", function (e) {
    var l = e.target.closest("[data-lang]");
    if (l) { lang = l.dataset.lang; try { localStorage.setItem("sd-lang", lang); } catch (x) {} chrome(); page = ""; render(true); return; }
    if (e.target.closest("[data-ixo]")) { e.preventDefault(); toggleMenu(false); openIxo(); return; }
    if (e.target.closest("#ixo .x") || e.target.closest("#ixo a")) { closeIxo(); }
    var c = e.target.closest("[data-contact]");
    if (c) { e.preventDefault(); toggleMenu(false); ft.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  });

  function pTitle(slug) { var p = proj(slug); return p ? L(p.titre) : ""; }
  function secName(slug) { var s = sectionOf(slug); return slug === "etalonnage" ? t("grade") : s ? L(s) : ""; }
  function href(slug) { return slug === "etalonnage" ? "#/etalonnage" : "#/photographie/" + slug; }

  /* ---------- accueil : photo / vidéo, vitrine, index ---------- */
  var mode = "photo", page = "", st = null, rot = {}, pools = {};
  try { mode = sessionStorage.getItem("sd-mode") === "video" ? "video" : "photo"; } catch (e) {}
  try { rot = JSON.parse(sessionStorage.getItem("sd-rot") || "{}") || {}; } catch (e) { rot = {}; }
  function saveMode() { try { sessionStorage.setItem("sd-mode", mode); } catch (e) {} }
  function saveRot() { try { sessionStorage.setItem("sd-rot", JSON.stringify(rot)); } catch (e) {} }
  function stopStage() { if (st) { st.dead = true; if (st.io) st.io.disconnect(); st = null; } }
  var RAMP = "cubic-bezier(.86,0,.07,1)", OUT = "cubic-bezier(.16,1,.3,1)", TR = 1300;

  function vsec(id) { return VSEC.filter(function (s) { return s.id === id; })[0]; }
  function counts() { return { photo: allProjects().length, video: VIDEOS.length }; }

  /* jeux d'images d'un projet : la sélection d'abord, puis chaque paysage seul et les verticales par deux */
  function pool(u) {
    if (pools[u.projet]) return pools[u.projet];
    var g = [], seen = {}, pend = null;
    if (u.img && u.img.length) { g.push(u.img.map(P)); u.img.forEach(function (c) { seen[c] = 1; }); }
    images(u.projet).forEach(function (p) {
      if (seen[p.code] || g.length >= 12) return;
      var ar = p.w / p.h;
      if (ar >= 1.25) g.push([p]);
      else if (ar <= 0.9) { if (pend) { g.push([pend, p]); pend = null; } else pend = p; }
    });
    if (!g.length) g.push([cover(u.projet)]);
    return (pools[u.projet] = g);
  }
  function peekGroup(it) { var g = pool(it.u); return g[(rot[it.key] || 0) % g.length]; }
  function takeGroup(it) { var g = peekGroup(it); rot[it.key] = (rot[it.key] || 0) + 1; saveRot(); return g; }

  function featured() {
    if (mode === "video") {
      return VIDEOS.filter(function (v) { return v.vedette; }).sort(function (a, b) { return a.vedette - b.vedette; }).map(function (v) {
        var p = parseVideo(v.lien || "") || {};
        return { video: true, titre: L(v.titre), meta: vsec(v.section) ? L(vsec(v.section)) : t("video"), em: p.em, th: p.th, th2: p.th2 };
      }).filter(function (x) { return x.em; });
    }
    return (SITE.une || []).filter(function (u) { return proj(u.projet) && images(u.projet).length; }).map(function (u) {
      var s = secName(u.projet), ti = pTitle(u.projet);
      return { key: u.projet, u: u, titre: ti, meta: (s && s !== ti ? s + ", " : "") + images(u.projet).length + " " + t("images"), href: href(u.projet) };
    });
  }

  function home() {
    var c = counts();
    main.innerHTML =
      '<section class="st">' +
        '<div class="st-top"><div class="mode" role="tablist">' +
          '<a role="tab" href="#/photographie" data-mode="photo" aria-selected="' + (mode === "photo") + '">' + t("photo") + "<sup>" + c.photo + "</sup></a>" +
          '<a role="tab" href="#/video" data-mode="video" aria-selected="' + (mode === "video") + '">' + t("video") + "<sup>" + c.video + "</sup></a></div>" +
          '<p class="st-intro">' + esc(lang === "fr" ? "Photographie et film, à l’île Maurice et ailleurs." : "Photography and film, in Mauritius and beyond.") + "</p></div>" +
        '<div class="st-frame" role="region" aria-roledescription="carousel"></div>' +
        '<div class="st-cap grid"><span class="st-n"><span class="roll"></span></span><a class="st-t"><span class="roll"></span></a><span class="st-m"></span><a class="st-go u"></a></div>' +
        '<div class="st-lg"><button type="button" class="lg-a" data-d="-1" aria-label="' + t("prev") + '">←</button><ol class="st-leg"></ol><button type="button" class="lg-a" data-d="1" aria-label="' + t("nextShort") + '">→</button></div><i class="st-clock" aria-hidden="true"></i>' +
      "</section>" +
      '<section class="ix grid" id="index"></section>' +
      '<section class="after grid"><p class="row"><span>' + t("services") + "</span><span>" + t("servicesLine") + '</span></p><p class="row"><span>' + t("clients") + "</span><span>" + t("clientsLine") + "</span></p></section>";
    startStage(false); indexList(false);
  }
  /* changer de mode : seuls la vitrine et l'index changent */
  function setMode(m) {
    if (m === mode) return;
    mode = m; saveMode();
    main.querySelectorAll("[data-mode]").forEach(function (x) { x.setAttribute("aria-selected", x.dataset.mode === mode); });
    startStage(true); indexList(true);
  }

  /* ---- vitrine ---- */
  function startStage(keep) {
    stopStage();
    var root = main.querySelector(".st"); if (!root) return;
    var items = featured(), frame = root.querySelector(".st-frame"), leg = root.querySelector(".st-leg");
    var me = st = { i: -1, tok: 0, items: items, root: root, grp: null };
    root.classList.remove("playing");
    if (!keep) frame.innerHTML = "";
    leg.innerHTML = "";
    /* légende par groupes : elle change en fondu, les flèches parcourent les groupes */
    function per() { return window.innerWidth < 768 ? 3 : window.innerWidth < 1100 ? 4 : 6; }
    me.page = -1;
    function renderLeg(pg, dir) {
      var P = per(), pages = Math.ceil(items.length / P); pg = ((pg % pages) + pages) % pages;
      var draw = function () {
        me.page = pg;
        leg.innerHTML = items.slice(pg * P, pg * P + P).map(function (it, j) {
          var k = pg * P + j;
          return '<li><button type="button" data-k="' + k + '"' + (k === me.i ? ' class="on" aria-current="true"' : "") + "><span>" + esc(it.titre) + "</span><i><b></b></i></button></li>";
        }).join("");
        leg.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { show(+b.dataset.k); }); });
        root.querySelectorAll(".lg-a").forEach(function (a) { a.hidden = pages < 2; });
        mirror();
        if (dir && !reduce && leg.animate) leg.animate([{ opacity: 0, transform: "translate3d(" + (dir * 28) + "px,0,0)" }, { opacity: 1, transform: "none" }], { duration: 480, easing: OUT });
      };
      if (dir && !reduce && leg.animate && leg.children.length) {
        var out = leg.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translate3d(" + (-dir * 28) + "px,0,0)" }], { duration: 220, easing: "ease-in", fill: "forwards" });
        out.onfinish = function () { if (me.dead) return; draw(); out.cancel(); };
      } else draw();
    }
    root.querySelectorAll(".lg-a").forEach(function (a) { a.onclick = function () { var d = +a.dataset.d; renderLeg(me.page + d, d); }; });
    if ("IntersectionObserver" in window) {
      me.io = new IntersectionObserver(function (es) { root.classList.toggle("away", !es[0].isIntersecting); sync(); }, { threshold: 0.25 });
      me.io.observe(frame);
    }

    /* minuterie : elle s'arrête tant que la souris est sur la vitrine */
    var DUR = 4500, clock = root.querySelector(".st-clock");
    /* souris sur la vitrine : le temps ralentit (x2,5) sans s'arrêter ; pause seulement pendant une vidéo ou hors écran */
    function pauseNow() { return root.classList.contains("playing") || root.classList.contains("away"); }
    function sync() {
      var r = me.hold ? 0.4 : 1;
      [me.bar, me.vis].forEach(function (a) {
        if (!a) return;
        if (a.playbackRate !== r) { if (a.updatePlaybackRate) a.updatePlaybackRate(r); else a.playbackRate = r; }
        if (pauseNow()) { if (a.playState === "running") a.pause(); } else if (a.playState === "paused") a.play();
      });
    }
    function mirror() {
      if (me.vis) { me.vis.cancel(); me.vis = null; }
      var b = leg.querySelector("button.on b"); if (!b) return;
      if (reduce || !b.animate || !me.bar) { b.style.transform = "scaleX(1)"; return; }
      me.vis = b.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: DUR, easing: "linear", fill: "forwards" });
      me.vis.currentTime = me.bar.currentTime || 0;
      sync();
    }
    function bar() {
      if (me.bar) { me.bar.onfinish = null; me.bar.cancel(); me.bar = null; }
      if (!reduce && clock.animate) {
        me.bar = clock.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: DUR, easing: "linear", fill: "forwards" });
        me.bar.onfinish = function () { if (!me.dead) show(me.i + 1, 1); };
      }
      mirror(); sync();
    }
    me.sync = sync;
    root.onmouseenter = function () { me.hold = true; sync(); };
    root.onmouseleave = function () { me.hold = false; sync(); cursor.hide(); };

    /* glisser, cliquer à gauche / à droite, étiquette qui suit la souris */
    var drag = null;
    /* zones : bords extrêmes = projet précédent / suivant ; côtés de l'image = image précédente / suivante du projet ; centre = ouvrir */
    function multi() { var it = me.items[me.i]; return it && !it.video && pool(it.u).length > 1; }
    function zone(x) {
      var r = frame.getBoundingClientRect(), f = (x - r.left) / r.width;
      var ims = frame.lastElementChild ? frame.lastElementChild.querySelectorAll(".st-i") : [];
      var a = ims.length ? ims[0].getBoundingClientRect().left : r.left, b = ims.length ? ims[ims.length - 1].getBoundingClientRect().right : r.right;
      var edge = Math.max(r.width * 0.1, 48);
      if (x < Math.max(a, r.left + edge)) return -2;
      if (x > Math.min(b, r.right - edge)) return 2;
      var g = (x - a) / (b - a);
      return !multi() ? (f < 0.3 ? -2 : f > 0.7 ? 2 : 0) : g < 0.33 ? -1 : g > 0.67 ? 1 : 0;
    }
    function label(dx, x) {
      var it = me.items[me.i]; if (!it) return "";
      if (drag && Math.abs(dx) > 8) return dx < 0 ? "→" : "←";
      var z = zone(x), n = me.items.length;
      if (z === -2) return "← " + me.items[(me.i - 1 + n) % n].titre;
      if (z === 2) return me.items[(me.i + 1) % n].titre + " →";
      if (z === -1) return "← " + t("prevImg");
      if (z === 1) return t("nextImg") + " →";
      return it.video ? t("play") : t("see");
    }
    function step(d) {
      var it = me.items[me.i];
      if (!multi()) { show(me.i + d, d); return; }
      var L = pool(it.u).length;
      if (d < 0) { rot[it.key] = ((rot[it.key] || 0) - 2) % L; if (rot[it.key] < 0) rot[it.key] += L; }
      show(me.i, d, true);
    }
    frame.onpointerdown = function (e) {
      if (e.button || root.classList.contains("playing")) return;
      drag = { x: e.clientX, dx: 0 };
      try { frame.setPointerCapture(e.pointerId); } catch (x) {}
      cursor.press(true);
    };
    frame.onpointermove = function (e) {
      if (root.classList.contains("playing")) { cursor.hide(); return; }
      if (drag) {
        drag.dx = e.clientX - drag.x;
        var cur = frame.lastElementChild;
        if (cur && Math.abs(drag.dx) > 4) { cur.style.transform = "translateX(" + (drag.dx * 0.4) + "px)"; root.classList.add("dragging"); }
      }
      if (e.pointerType === "mouse") cursor.show(label(drag ? drag.dx : 0, e.clientX), e.clientX, e.clientY, lightUnder(e));
    };
    function endDrag(cancel, x) {
      if (!drag) return;
      var dx = drag.dx; drag = null; root.classList.remove("dragging"); cursor.press(false);
      var cur = frame.lastElementChild;
      if (!cancel && Math.abs(dx) > 70) { show(me.i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); return; }
      if (cur && cur.style.transform) { var from = cur.style.transform; cur.style.transform = ""; if (cur.animate && !reduce) cur.animate([{ transform: from }, { transform: "none" }], { duration: 600, easing: OUT }); }
      if (!cancel && Math.abs(dx) < 6) { var z = zone(x); if (z === -2 || z === 2) show(me.i + z / 2, z / 2); else if (z) step(z); else open(); }
    }
    frame.onpointerup = function (e) { endDrag(false, e.clientX); };
    frame.onpointercancel = function () { endDrag(true); };
    frame.onpointerleave = function (e) { if (e.pointerType === "mouse") cursor.hide(); };
    frame.onkeydown = function (e) { if (e.key === "Enter") open(); };
    root.querySelector(".st-t").onclick = function (e) { var it = me.items[me.i]; if (!it || it.video) { e.preventDefault(); open(); } };

    function open() {
      var it = me.items[me.i]; if (!it) return;
      if (!it.video) { location.hash = it.href; return; }
      var box = frame.lastElementChild && frame.lastElementChild.querySelector(".st-i"); if (!box || !it.em) return;
      root.classList.add("playing"); cursor.hide(); sync();
      box.insertAdjacentHTML("beforeend", '<iframe src="' + esc(it.em) + '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="' + esc(it.titre) + '"></iframe>');
    }

    function layer(it, grp) {
      var W = frame.clientWidth, H = frame.clientHeight, gap = 12, list;
      if (it.video) list = [{ ar: 16 / 9 }];
      else { list = grp.map(function (p) { return { ar: p.w / p.h, p: p }; }); if (window.innerWidth < 768) list = [{ ar: W / H, p: grp[0] }]; }
      var sum = list.reduce(function (a, x) { return a + x.ar; }, 0), h = Math.min(H, (W - gap * (list.length - 1)) / sum);
      var d = document.createElement("div"); d.className = "st-l";
      d.innerHTML = list.map(function (x) {
        var im = x.p ? '<img draggable="false" alt="' + esc(it.titre) + '" src="' + esc(src(x.p)) + '">' :
          '<img draggable="false" alt="" src="' + esc(it.th || "") + '"' + (it.th2 ? ' data-fb="' + esc(it.th2) + '"' : "") + ">";
        return '<div class="st-i" style="width:' + (h * x.ar).toFixed(1) + "px;height:" + h.toFixed(1) + 'px"><div class="dr">' + im + "</div>" + (it.video ? '<span class="play">' + t("play") + "</span>" : "") + "</div>";
      }).join("");
      var fb = d.querySelector("img[data-fb]");
      if (fb) { fb.onload = function () { if (fb.naturalWidth <= 120 && fb.dataset.fb) { fb.src = fb.dataset.fb; delete fb.dataset.fb; } }; fb.onerror = function () { if (fb.dataset.fb) { fb.src = fb.dataset.fb; delete fb.dataset.fb; } }; }
      return d;
    }
    function ready(d, cb) {
      var done = false, fin = function () { if (!done) { done = true; cb(); } };
      var ps = [].map.call(d.querySelectorAll("img"), function (im) { return im.decode ? im.decode().catch(function () {}) : Promise.resolve(); });
      Promise.all(ps).then(fin); setTimeout(fin, 700);
    }
    function drift(d, delay) {
      if (reduce || !d.animate) return;
      d.querySelectorAll(".dr").forEach(function (x) { x.animate([{ transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 8000, delay: delay, easing: "cubic-bezier(.3,.1,.3,1)", fill: "both" }); });
    }

    function show(k, dir, same) {
      if (me.dead || !me.items.length) return;
      var n = me.items.length; k = (k + n) % n;
      if (k === me.i && !same) return;
      if (dir == null) dir = me.i < 0 ? 1 : (me.i === n - 1 && k === 0) ? 1 : (me.i === 0 && k === n - 1) ? -1 : (k > me.i ? 1 : -1);
      var firstShow = me.i < 0 && !frame.firstElementChild;
      me.i = k; root.classList.remove("playing");
      var it = me.items[k], grp = it.video ? null : takeGroup(it);
      me.grp = grp;
      var d = layer(it, grp), tok = ++me.tok;
      d.style.visibility = "hidden";
      frame.appendChild(d);
      [].forEach.call(frame.querySelectorAll("iframe"), function (f) { f.remove(); });

      /* légende, titre, compteur : tout de suite */
      var cap = root.querySelector(".st-cap"), tt = cap.querySelector(".st-t"), go = cap.querySelector(".st-go");
      go.textContent = it.video ? t("play") : t("see"); go.setAttribute("href", it.href || "#/");
      go.onclick = it.video ? function (e) { e.preventDefault(); open(); } : null;
      tt.setAttribute("href", it.href || "#/");
      var PP = per(), pg = Math.floor(k / PP), pages = Math.ceil(n / PP);
      if (pg !== me.page) renderLeg(pg, me.page < 0 ? 0 : (pg > me.page || (me.page === pages - 1 && pg === 0) ? 1 : -1));
      else leg.querySelectorAll("button").forEach(function (b) { var on = +b.dataset.k === k; b.classList.toggle("on", on); b.setAttribute("aria-current", on); });
      bar();

      ready(d, function () {
        if (tok !== me.tok || me.dead) { d.remove(); return; }
        d.style.visibility = "";
        if (!same) { roll(cap.querySelector(".st-n .roll"), pad(k + 1) + " / " + pad(n), dir); roll(tt.querySelector(".roll"), it.titre, dir); }
        cap.querySelector(".st-m").textContent = it.meta;
        var olds = [].filter.call(frame.children, function (o) { return o !== d; });
        if (reduce || !d.animate) { olds.forEach(function (o) { o.remove(); }); return; }
        if (firstShow) {
          d.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 1300, easing: "cubic-bezier(.76,0,.24,1)" });
        } else {
          /* rideau qui glisse sur le côté, comme avant */
          d.animate([{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 950, easing: "cubic-bezier(.76,0,.24,1)" });
          d.querySelectorAll(".dr").forEach(function (x) { x.animate([{ transform: "scale(1.12) translate3d(" + (dir * 4) + "%,0,0)" }, { transform: "none" }], { duration: 1200, easing: OUT }); });
          olds.forEach(function (o) {
            var from = o.style.transform || "translate3d(0,0,0)";
            o.getAnimations().forEach(function (a) { a.cancel(); });
            var a = o.animate([{ transform: from, opacity: 1 }, { transform: "translate3d(" + (-dir * 8) + "%,0,0)", opacity: 0 }], { duration: 950, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" });
            a.onfinish = function () { o.remove(); };
            setTimeout(function () { if (o.parentNode) o.remove(); }, 1100);
          });
        }
      });
      /* préparer la suivante */
      var nx = me.items[(k + 1) % n];
      if (nx && !nx.video) peekGroup(nx).forEach(function (p) { var im = new Image(); im.src = src(p); });
      else if (nx && nx.th) { new Image().src = nx.th; }
    }
    me.show = show;
    resizers.push(function () {
      if (!me.dead && me.i >= 0) renderLeg(Math.floor(me.i / per()), 0);
      var it = me.items[me.i]; if (!it || me.dead || root.classList.contains("playing")) return;
      var d = layer(it, me.grp); frame.innerHTML = ""; frame.appendChild(d);
    });
    show(0, 1);
    /* précharger toute la vitrine pour des changements instantanés */
    setTimeout(function () {
      if (me.dead) return;
      me.items.forEach(function (it) {
        if (it.video) { if (it.th) new Image().src = it.th; return; }
        peekGroup(it).forEach(function (p) { var im = new Image(); im.decoding = "async"; im.src = src(p); });
      });
    }, 1800);
  }

  /* curseur natif (pas d'effet) */
  /* clarté de la photo sous la légende : une petite carte 24×24 par image, calculée une fois */
  function lumMap(im) {
    if (im._lum !== undefined) return im._lum;
    im._lum = null;
    try {
      if (!im.complete || !im.naturalWidth) { im._lum = undefined; return null; }
      var c = document.createElement("canvas"); c.width = c.height = 24;
      var x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(im, 0, 0, 24, 24);
      var d = x.getImageData(0, 0, 24, 24).data, m = new Float32Array(576);
      for (var i = 0; i < 576; i++) m[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
      im._lum = m;
    } catch (e) {}
    return im._lum;
  }
  /* vrai = fond clair sous le texte (donc texte noir) */
  function lightUnder(e) {
    var box = e.target.closest && e.target.closest(".st-i"); if (!box) return true;
    var im = box.querySelector("img"), m = im && lumMap(im); if (!m) return false;
    var r = box.getBoundingClientRect(), sum = 0, n = 0;
    for (var dx = 0; dx <= 150; dx += 15) for (var dy = -12; dy <= 12; dy += 12) {
      var u = Math.floor((e.clientX + dx - r.left) / r.width * 24), v = Math.floor((e.clientY + dy - r.top) / r.height * 24);
      if (u < 0 || v < 0 || u > 23 || v > 23) continue;
      sum += m[v * 24 + u]; n++;
    }
    return n ? sum / n > 0.62 : false;
  }
  var cursor = (function () {
    /* curseur discret : un point et une légende fine, collés à la souris ; blancs sur l'image, noirs sur le fond */
    var el = document.createElement("div"); el.className = "st-hint"; el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<i class="h-dot"></i><span class="h-t"><span></span></span>';
    document.body.appendChild(el);
    var tx = el.querySelector(".h-t span"), on = false, cur = "";
    function setText(txt) {
      if (txt === cur) return; cur = txt;
      if (reduce || !tx.animate || !tx.textContent) { tx.textContent = txt; return; }
      var o = tx.animate([{ transform: "none", opacity: 1 }, { transform: "translateY(-100%)", opacity: 0 }], { duration: 160, easing: "ease-in", fill: "forwards" });
      o.onfinish = function () { tx.textContent = cur; o.cancel(); tx.animate([{ transform: "translateY(100%)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 340, easing: OUT }); };
    }
    return {
      show: function (txt, px, py, light) {
        if (touch) return;
        el.style.transform = "translate3d(" + px + "px," + py + "px,0)";
        el.classList.toggle("dark", !!light);
        setText(txt);
        if (!on) { on = true; el.classList.add("on"); document.documentElement.classList.add("hint-on"); }
      },
      hide: function () { if (!on) return; on = false; el.classList.remove("on"); document.documentElement.classList.remove("hint-on"); },
      press: function (p) { el.classList.toggle("down", !!p); }
    };
  })();
  document.addEventListener("visibilitychange", function () { if (st && st.sync) st.sync(); });

  /* navigation entre projets : la même en haut et en bas de chaque page */
  function pnav(pr, nx, big) {
    return '<nav class="pnav' + (big ? " big" : "") + '" aria-label="' + t("byProject") + '">' +
      '<a class="pp" href="' + href(pr) + '"><span class="xs">← ' + t("prevP") + "</span><b>" + esc(pTitle(pr)) + "</b></a>" +
      '<button type="button" class="pi" data-ixo>Index</button>' +
      '<a class="pn" href="' + href(nx) + '"><span class="xs">' + t("next") + " →</span><b>" + esc(pTitle(nx)) + "</b></a></nav>";
  }

  /* titre qui roule, lettre par lettre */
  function roll(el, text, dir) {
    if (!el) return;
    var nw = document.createElement("span"); nw.className = "rw";
    nw.innerHTML = String(text).split("").map(function (ch) { return "<span>" + (ch === " " ? "&nbsp;" : esc(ch)) + "</span>"; }).join("");
    var olds = el.querySelectorAll(".rw");
    if (olds.length && olds[olds.length - 1].textContent === nw.textContent) return;
    if (reduce || !nw.animate || !olds.length) {
      el.innerHTML = ""; el.appendChild(nw);
      if (!reduce && nw.animate) nw.querySelectorAll("span").forEach(function (c, i) { c.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { duration: 1100, delay: 200 + i * 22, easing: OUT, fill: "backwards" }); });
      return;
    }
    for (var q = 0; q < olds.length - 1; q++) olds[q].remove();
    var old = olds[olds.length - 1], up = dir < 0 ? 1 : -1;
    old.querySelectorAll("span").forEach(function (c, i) { c.animate([{ transform: "none" }, { transform: "translateY(" + (up * 110) + "%)" }], { duration: 520, delay: i * 10, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" }); });
    setTimeout(function () { if (old.parentNode) old.remove(); }, 720);
    el.appendChild(nw);
    nw.querySelectorAll("span").forEach(function (c, i) { c.animate([{ transform: "translateY(" + (-up * 110) + "%)" }, { transform: "none" }], { duration: 1000, delay: 220 + i * 20, easing: OUT, fill: "backwards" }); });
  }

  /* ---- index : les sections et leurs projets ---- */
  var pv = document.getElementById("peek");
  function indexList(anim) {
    var el = main.querySelector(".ix"); if (!el) return;
    var cards = [], n = 0;
    if (mode === "photo") {
      SITE.sections.forEach(function (s) {
        s.projets.filter(function (slug) { return proj(slug) && images(slug).length; }).forEach(function (slug, j) {
          n++; var c = cover(slug);
          cards.push('<a class="ix-c fig"' + (j === 0 ? ' id="ix-' + s.id + '"' : "") + ' href="' + href(slug) + '"><div class="ix-im"><img loading="lazy" decoding="async" draggable="false" alt="' + esc(pTitle(slug)) + '" src="' + esc(src(c, true)) + '"></div>' +
            '<div class="ix-tx"><span class="ix-sec">' + esc(L(s)) + '</span><b>' + esc(pTitle(slug)) + (proj(slug).nouveau ? " <i>" + t("isNew") + "</i>" : "") + '</b><span class="ix-n">' + images(slug).length + "</span></div></a>");
        });
      });
    } else {
      VSEC.forEach(function (s) {
        VIDEOS.filter(function (v) { return v.section === s.id && parseVideo(v.lien || ""); }).forEach(function (v, j) {
          n++; var p = parseVideo(v.lien);
          cards.push('<a class="ix-c v fig"' + (j === 0 ? ' id="ix-' + s.id + '"' : "") + ' href="#/video/' + s.id + '" data-em="' + esc(p.em) + '" data-t="' + esc(L(v.titre)) + '"><div class="ix-im"><img loading="lazy" decoding="async" draggable="false" alt="" src="' + esc(p.th2 || p.th) + '"><span class="play">' + t("play") + "</span></div>" +
            '<div class="ix-tx"><span class="ix-sec">' + esc(L(s)) + '</span><b>' + esc(L(v.titre)) + "</b></div></a>");
        });
      });
    }
    el.innerHTML = '<h2 class="ix-h">Index<small>' + n + " " + (mode === "photo" ? t("projects") : t("videos")) + '</small></h2><div class="ix-grid">' + cards.join("") + "</div>";
    el.querySelectorAll(".ix-c[data-em]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); openVideo(a.dataset.em, a.dataset.t, a); }); });
    if (anim && !reduce && el.animate) el.querySelectorAll(".ix-h, .ix-c").forEach(function (r, i) {
      r.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 800, delay: 100 + Math.min(i, 24) * 30, easing: OUT, fill: "backwards" });
    });
    observe();
  }
  function scrollIx(id) {
    var x = document.getElementById("ix-" + id);
    if (x) window.scrollTo({ top: x.getBoundingClientRect().top + window.scrollY - 80, behavior: reduce ? "auto" : "smooth" });
  }
  document.addEventListener("mousemove", function (e) { if (pv.classList.contains("on")) pv.style.transform = "translate(" + (e.clientX + 24) + "px," + (e.clientY - pv.offsetHeight / 2) + "px)"; }, { passive: true });

  function mapHTML() {
    return '<div class="map grid">' + '<div class="mcol"><h3><a href="#/photographie">' + t("photo") + "</a></h3>" + SITE.sections.map(function (s) {
      var ps = s.projets.filter(function (p) { return proj(p) && images(p).length; });
      if (!ps.length) return "";
      var single = ps.length === 1 && pTitle(ps[0]) === L(s);
      if (single) return '<div class="mg one"><a href="' + href(ps[0]) + '">' + esc(L(s)) + "</a><span>" + images(ps[0]).length + "</span></div>";
      return '<div class="mg"><h4>' + esc(L(s)) + "</h4><ul>" + ps.map(function (p) { return '<li><a href="' + href(p) + '">' + esc(pTitle(p)) + (proj(p).nouveau ? ' <i>' + t("isNew") + "</i>" : "") + "</a><span>" + images(p).length + "</span></li>"; }).join("") + "</ul></div>";
    }).join("") + "</div>" +
      '<div class="mcol"><h3><a href="#/video">' + t("video") + "</a></h3>" + VSEC.filter(function (v) { return VIDEOS.some(function (x) { return x.section === v.id; }); }).map(function (v) {
        return '<div class="mg one"><a href="#/video/' + v.id + '">' + esc(L(v)) + "</a><span>" + VIDEOS.filter(function (x) { return x.section === v.id; }).length + "</span></div>";
      }).join("") + '<h3 class="h3b">' + t("grade") + '</h3><div class="mg one"><a href="#/etalonnage">DCTL Lumina</a><span>' + images("etalonnage").length + "</span></div></div></div>";
  }

  /* ---------- projet ---------- */
  function projet(slug) {
    var p = proj(slug); if (!p || !images(slug).length) return notFound();
    var list = images(slug), s = sectionOf(slug), all = allProjects(), k = all.indexOf(slug), nx = all[(k + 1) % all.length];
    var pr = all[(k - 1 + all.length) % all.length];
    if (slug === "etalonnage") { nx = all[0]; pr = all[all.length - 1]; }
    var sn = s ? L(s) : t("grade");
    main.innerHTML = '<section class="ph grid"><div class="meta xs"><a class="u" href="' + (slug === "etalonnage" ? "#/" : "#/photographie") + '">' + esc(sn) + "</a><span>" + (k >= 0 ? pad(k + 1) + " / " + pad(all.length) + ", " : "") + list.length + " " + t("images") + '</span></div><h1><span class="roll"></span></h1>' +
      (slug === "etalonnage" ? '<p class="lead rl">' + esc(lang === "fr" ? "Images étalonnées avec Lumina, mon DCTL pour DaVinci Resolve. Je développe aussi Node DRT, un plugin d’étalonnage pour Resolve." : "Frames graded with Lumina, my DCTL for DaVinci Resolve. I also develop Node DRT, a grading plugin for Resolve.") + "</p>" : "") + pnav(pr, nx, false) + "</section>" +
      '<section class="gal"><div class="jw" id="jg"></div></section>' +
      '<section class="s-end grid"><p class="q"><span>' + t("similar") + '</span><a class="u" href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp,</a><a class="u" href="mailto:' + MAIL + '">' + t("email") + "</a>" +
      (slug === "etalonnage" ? '<a class="u" href="https://nodedrt.github.io/NodeDRT/" target="_blank" rel="noopener">Node DRT →</a>' : "") + "</p>" +
      pnav(pr, nx, true) + "</section>";
    roll(main.querySelector(".ph h1 .roll"), L(p.titre), 1);
    curPrevNext = [href(pr), href(nx)];
    var el = document.getElementById("jg");
    var opt = { target: function (vw) { return vw < 600 ? 180 : vw < 1100 ? 280 : Math.min(500, vw * 0.3); } }, pos = {};
    list.forEach(function (q, i) { pos[q.n] = i; });
    if (p.lignes) {
      var vu = {};
      opt.rows = p.lignes.map(function (r) { return r.map(function (n) { vu[pos[n]] = 1; return pos[n]; }).filter(function (x) { return x != null; }); });
      list.forEach(function (q, i) { if (!vu[i]) opt.rows.push([i]); });
    }
    if (p.coupure) { opt.breaks = {}; p.coupure.forEach(function (n) { if (pos[n] != null) opt.breaks[pos[n]] = 1; }); }
    mountJ(el, list.map(function (q, i) { return { p: q, i: i, alt: L(p.titre) + ", " + (i + 1) }; }), opt);
    el.addEventListener("click", function (e) { var b = e.target.closest("[data-i]"); if (b) openLB(list, +b.dataset.i, b, L(p.titre)); });
  }

  /* ---------- vidéo ---------- */
  function parseVideo(u) {
    var m;
    if ((m = u.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/))) return { th: "https://i.ytimg.com/vi/" + m[1] + "/maxresdefault.jpg", th2: "https://i.ytimg.com/vi/" + m[1] + "/hqdefault.jpg", em: "https://www.youtube-nocookie.com/embed/" + m[1] + "?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd2160" };
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { th: "https://vumbnail.com/" + m[1] + ".jpg", em: "https://player.vimeo.com/video/" + m[1] + "?autoplay=1&dnt=1&quality=auto" };
    if ((m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/))) return { th: "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w1600", em: "https://drive.google.com/file/d/" + m[1] + "/preview" };
    return null;
  }

  /* ---------- info ---------- */
  function info() {
    main.innerHTML = '<section class="ph grid"><h1>' + t("info") + "</h1></section>" +
      '<section class="auth grid"><p class="rl" lang="fr">' + esc(AUTH) + "</p>" + (lang === "en" ? '<p class="tr">' + esc(AUTH_EN) + "</p>" : "") + "</section>" +
      '<section class="bio grid"><p class="rl">' + esc(t("bio")) + "</p></section>" +
      '<section class="cols grid"><div><h3>' + t("services") + "</h3><ul>" + t("svc").map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      "<div><h3>" + t("tools") + '</h3><ul><li><a class="u" href="https://nodedrt.github.io/NodeDRT/" target="_blank" rel="noopener">Node DRT, DaVinci Resolve plugin</a></li><li><a class="u" href="#/etalonnage">Lumina, DCTL</a></li></ul></div>' +
      "<div><h3>" + t("contact") + '</h3><ul><li><a class="u" href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a></li><li><a class="u" href="mailto:' + MAIL + '">' + MAIL + "</a></li><li>" + TEL + "</li></ul></div></section>" +
      '<section class="after grid"><p class="row"><span>' + t("clients") + "</span><span>" + t("clientsLine") + "</span></p></section>";
  }
  function notFound() { main.innerHTML = '<section class="ph grid"><h1>' + t("notfound") + '</h1></section><section class="after grid"><a class="all u" href="#/">' + t("home") + " →</a></section>"; }

  /* ---------- révélations ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  function splitWords(el) {
    if (el.dataset.split) return; el.dataset.split = 1;
    el.innerHTML = el.textContent.split(/\s+/).filter(Boolean).map(function (w) { return '<span class="w">' + esc(w) + "</span>"; }).join(" ");
    var top = null, line = -1;
    el.querySelectorAll(".w").forEach(function (w) { if (w.offsetTop !== top) { top = w.offsetTop; line++; } w.style.transitionDelay = (line * 80) + "ms"; });
  }
  function observe() {
    main.querySelectorAll(".rl").forEach(splitWords);
    main.querySelectorAll(".fig:not(.in), .rl:not(.in)").forEach(function (el) { if (io && !reduce) io.observe(el); else el.classList.add("in"); });
  }

  /* ---------- visionneuse ---------- */
  var lb = document.getElementById("lb"), lbs = { list: [], i: 0, from: null, title: "" };
  lb.innerHTML = '<div class="top xs"><span class="lt"></span><span class="lc"></span><button type="button" class="lx"></button></div><div class="stage"><img alt=""></div><span class="hint"></span>';
  var lbImg = lb.querySelector(".stage img"), hint = lb.querySelector(".hint");
  function lbShow(i, from) {
    var Ls = lbs.list; lbs.i = (i + Ls.length) % Ls.length; var p = Ls[lbs.i];
    lbImg.src = src(p, true);
    var full = new Image(); full.onload = function () { if (Ls[lbs.i] === p) lbImg.src = full.src; }; full.src = src(p);
    lbImg.alt = (lbs.title ? lbs.title + ", " : "") + (lbs.i + 1);
    lb.querySelector(".lt").textContent = lbs.title;
    lb.querySelector(".lc").textContent = pad(lbs.i + 1) + " / " + pad(Ls.length);
    [1, -1].forEach(function (d) { new Image().src = src(Ls[(lbs.i + d + Ls.length) % Ls.length]); });
    if (from && !reduce && lbImg.animate) {
      var r0 = from.getBoundingClientRect();
      requestAnimationFrame(function () {
        var r1 = lbImg.getBoundingClientRect(); if (!r1.width) return;
        lbImg.animate([{ transform: "translate(" + (r0.left - r1.left) + "px," + (r0.top - r1.top) + "px) scale(" + (r0.width / r1.width) + "," + (r0.height / r1.height) + ")", transformOrigin: "0 0" },
          { transform: "none", transformOrigin: "0 0" }], { duration: 600, easing: "cubic-bezier(.76,0,.24,1)" });
      });
    }
  }
  function openLB(list, i, from, title) {
    if (!list.length || i < 0) return;
    lbs.list = list; lbs.from = from; lbs.title = title;
    lb.querySelector(".lx").textContent = t("close");
    lb.hidden = false; document.body.style.overflow = "hidden"; lock(true);
    requestAnimationFrame(function () { lb.classList.add("on"); });
    lbShow(i, from.querySelector(".mask"));
    lb.querySelector(".lx").focus();
  }
  function closeLB() { if (lb.hidden) return; lb.classList.remove("on"); document.body.style.overflow = ""; lock(false); setTimeout(function () { if (!lb.classList.contains("on")) lb.hidden = true; }, 450); if (lbs.from && lbs.from.isConnected) lbs.from.focus({ preventScroll: true }); }
  lb.addEventListener("click", function (e) {
    if (e.target.closest(".lx")) return closeLB();
    if (e.target.closest(".top")) return;
    lbShow(lbs.i + (e.clientX < window.innerWidth / 2 ? -1 : 1));
  });
  lb.addEventListener("mousemove", function (e) {
    hint.style.left = e.clientX + "px"; hint.style.top = e.clientY + "px";
    hint.textContent = e.target.closest(".top") ? "" : (e.clientX < window.innerWidth / 2 ? t("prev") : t("nextShort"));
  });
  var sx = null;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 45) lbShow(lbs.i + (dx < 0 ? 1 : -1)); });

  /* ---------- lecteur vidéo ---------- */
  var vm = document.getElementById("vm"), vmFrom = null;
  function openVideo(em, title, from) {
    vmFrom = from;
    vm.innerHTML = '<div class="top xs"><span>' + esc(title) + '</span><button type="button" class="vx">' + t("close") + '</button></div><div class="fr"><iframe src="' + esc(em) + '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="' + esc(title) + '"></iframe></div>';
    vm.hidden = false; document.body.style.overflow = "hidden"; lock(true);
    requestAnimationFrame(function () { vm.classList.add("on"); });
    vm.querySelector(".vx").addEventListener("click", closeVideo); vm.querySelector(".vx").focus();
  }
  function closeVideo() { if (vm.hidden) return; vm.classList.remove("on"); document.body.style.overflow = ""; lock(false); var f = vm.querySelector("iframe"); if (f) f.remove(); setTimeout(function () { if (!vm.classList.contains("on")) { vm.hidden = true; vm.innerHTML = ""; } }, 450); if (vmFrom && vmFrom.isConnected) vmFrom.focus({ preventScroll: true }); }
  vm.addEventListener("click", function (e) { if (e.target === vm) closeVideo(); });
  document.addEventListener("keydown", function (e) {
    if (!vm.hidden) { if (e.key === "Escape") closeVideo(); return; }
    if (!lb.hidden) { if (e.key === "Escape") closeLB(); else if (e.key === "ArrowRight") lbShow(lbs.i + 1); else if (e.key === "ArrowLeft") lbShow(lbs.i - 1); return; }
    if (!ixo.hidden) { if (e.key === "Escape") closeIxo(); return; }
    if (!menu.hidden) { if (e.key === "Escape") toggleMenu(false); return; }
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented || /input|textarea|select/i.test(e.target.tagName || "")) return;
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var d = e.key === "ArrowRight" ? 1 : -1;
    if (st && st.show) { e.preventDefault(); st.show(st.i + d, d); }
    else if (curPrevNext) location.hash = curPrevNext[d > 0 ? 1 : 0];
  });

  /* ---------- index plein écran ---------- */
  var ixo = document.createElement("div"), curPrevNext = null;
  ixo.id = "ixo"; ixo.className = "ixo"; ixo.hidden = true; ixo.setAttribute("role", "dialog"); ixo.setAttribute("aria-label", "Index");
  document.body.appendChild(ixo);
  function openIxo() {
    ixo.innerHTML = '<div class="top"><span>Index</span><button type="button" class="x">' + t("close") + "</button></div>" + mapHTML();
    ixo.querySelectorAll(".mg").forEach(function (g, i) { g.style.setProperty("--i", i); });
    var cur = location.hash;
    ixo.querySelectorAll("a").forEach(function (a) { if (a.getAttribute("href") === cur) a.classList.add("cur"); });
    ixo.hidden = false; document.body.style.overflow = "hidden"; lock(true);
    requestAnimationFrame(function () { ixo.classList.add("on"); });
    ixo.querySelector(".x").focus();
  }
  function closeIxo() { if (ixo.hidden) return; ixo.classList.remove("on"); document.body.style.overflow = ""; lock(false); setTimeout(function () { if (!ixo.classList.contains("on")) ixo.hidden = true; }, 500); }

  /* ---------- protection ---------- */
  document.addEventListener("contextmenu", function (e) { if (e.target.tagName === "IMG" || e.target.closest(".lb, .st-frame")) e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { if (e.target.tagName === "IMG") e.preventDefault(); });

  /* ---------- routeur ---------- */
  var first = true;
  function parse() {
    var hs = /^#\//.test(location.hash) ? location.hash : "#/";
    var h = hs.replace(/^#\/?/, "").split("/"), r = h[0] || "";
    if (r === "travaux") r = "photographie";
    return { r: r, sub: h[1] ? decodeURIComponent(h[1]) : "" };
  }
  function navOn() {
    hd.querySelectorAll("[data-nav]").forEach(function (a) {
      var n = a.dataset.nav;
      a.classList.toggle("on", page === "home" ? (n === "photographie" && mode === "photo") || (n === "video" && mode === "video") : page === "projet" ? n === "photographie" : n === page);
    });
  }
  function setTitle(R) {
    var ttl = page === "projet" && proj(R.sub) ? pTitle(R.sub) : page === "home" ? (mode === "video" ? t("video") : t("photo")) : page === "etalonnage" ? t("grade") : page === "info" ? t("info") : t("role");
    document.title = "Samuel Drouin — " + ttl;
  }
  function render(keepScroll) {
    var R = parse(), r = R.r;
    var hm = r === "" ? mode : (r === "photographie" && !R.sub) ? "photo" : r === "video" ? "video" : null;
    toggleMenu(false); closeIxo(); pv.classList.remove("on"); cursor.hide();
    /* même page : on ne change que le contenu */
    if (hm && page === "home" && main.querySelector(".st")) {
      setMode(hm);
      if (R.sub) scrollIx(R.sub); else if (window.scrollY > 0 && r !== "") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      navOn(); setTitle(R); return;
    }
    stopStage(); resizers = []; curPrevNext = null;
    var from = page;
    var draw = function () {
      if (hm) { if (hm !== mode) { mode = hm; saveMode(); } page = "home"; home(); }
      else if (r === "photographie") { page = "projet"; projet(R.sub); }
      else if (r === "etalonnage") { page = "etalonnage"; projet("etalonnage"); }
      else if (r === "info") { page = "info"; info(); }
      else { page = "404"; notFound(); }
      navOn(); setTitle(R);
      var back = hm && from === "projet" && scrollMem[location.hash || "#/"];
      if (back) window.scrollTo(0, back); else if (!keepScroll) window.scrollTo(0, 0);
      observe();
      if (!first && !keepScroll) main.focus({ preventScroll: true });
      if (hm && R.sub) setTimeout(function () { scrollIx(R.sub); }, 120);
    };
    if (!first && !reduce && document.startViewTransition) document.startViewTransition(draw);
    else { draw(); if (!first && !reduce) { main.classList.remove("fade"); void main.offsetWidth; main.classList.add("fade"); } }
    first = false;
  }
  var scrollMem = {}, lastHash = location.hash;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("hashchange", function () {
    if (location.hash && !/^#\//.test(location.hash)) return;
    scrollMem[lastHash || "#/"] = window.scrollY; lastHash = location.hash;
    render();
  });
  var rt, lastW = window.innerWidth, lastH = window.innerHeight;
  window.addEventListener("resize", function () { if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 90) return; lastW = window.innerWidth; lastH = window.innerHeight; clearTimeout(rt); rt = setTimeout(function () { resizers.forEach(function (f) { f(); }); }, 150); });
  window.addEventListener("scroll", function () {
    var past = window.scrollY > window.innerHeight * 0.8, ftv = ft.getBoundingClientRect().top < window.innerHeight;
    bar.classList.toggle("on", past && !ftv && !curPrevNext);
    var pb = main.querySelector(".pbar"); if (pb) pb.classList.toggle("on", window.scrollY > 200 && !ftv);
  }, { passive: true });

  chrome(); render();
  var go = function () { document.body.classList.add("ready"); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { requestAnimationFrame(go); }); else requestAnimationFrame(go);
  setTimeout(go, 1200);
})();
