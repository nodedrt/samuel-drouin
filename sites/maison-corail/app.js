/* Maison Corail — projet concept de Samuel Drouin */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- langue ---------- */
  var lang = "fr";
  try { lang = localStorage.getItem("mc-lang") || "fr"; } catch (e) {}
  if (lang !== "en") lang = "fr";
  var L = function (fr, en) { return lang === "en" ? en : fr; };

  /* ---------- données ---------- */
  var ROOMS = [
    { id: "corail", fr: "Chambre Corail", en: "Coral Room", m2: 28, pax: 2, prix: 240, vue: ["Vue mer", "Sea view"], img: ["corail", "lagon", "plage"],
      txt: ["Le grand lit bleu, les coussins corail et la mer qui entre par la fenêtre. La chambre qui a donné son nom à la maison.", "The big blue bed, coral cushions and the sea coming in through the window. The room that gave the house its name."],
      plus: [["Lit king size", "King-size bed"], ["Fenêtre sur le lagon", "Window on the lagoon"], ["Douche à l’italienne", "Walk-in shower"], ["Climatisation silencieuse", "Quiet air conditioning"]] },
    { id: "lagon", fr: "Chambre Lagon", en: "Lagoon Room", m2: 32, pax: 2, prix: 280, vue: ["Vue lagon", "Lagoon view"], img: ["lagon", "corail", "mer"],
      txt: ["Sous le toit, une grande fenêtre panoramique cadre le lagon comme un tableau. On s’y réveille avec la lumière.", "Under the roof, a wide panoramic window frames the lagoon like a painting. You wake up with the light."],
      plus: [["Fenêtre panoramique", "Panoramic window"], ["Lit queen size", "Queen-size bed"], ["Coin lecture", "Reading nook"], ["Peignoirs en lin", "Linen bathrobes"]] },
    { id: "perchee", fr: "La Perchée", en: "The Loft", m2: 36, pax: 4, prix: 320, vue: ["Mezzanine", "Mezzanine"], img: ["mezzanine", "salon2", "jardin"],
      txt: ["Une échelle en bois, une mezzanine pour les enfants, des rideaux turquoise. La chambre des familles.", "A wooden ladder, a mezzanine for the children, turquoise curtains. The family room."],
      plus: [["Lit double et mezzanine", "Double bed and loft"], ["Idéale en famille", "Ideal for families"], ["Vue jardin et mer", "Garden and sea view"], ["Jeux et livres", "Games and books"]] },
    { id: "jardin", fr: "Chambre Jardin", en: "Garden Room", m2: 26, pax: 2, prix: 210, vue: ["Vue jardin", "Garden view"], img: ["jardin", "alcove", "bougain"],
      txt: ["Au rez-de-chaussée, ouverte sur les bougainvilliers. Calme absolu, le chant des oiseaux en fond.", "On the ground floor, opening onto the bougainvillea. Absolute calm, birdsong in the background."],
      plus: [["Accès direct au jardin", "Direct garden access"], ["Lit queen size", "Queen-size bed"], ["Penderie en bois", "Wooden wardrobe"], ["Calme absolu", "Absolute calm"]] },
    { id: "terrasse", fr: "Suite Terrasse", en: "Terrace Suite", m2: 44, pax: 3, prix: 360, vue: ["Terrasse privée", "Private terrace"], img: ["terrasse", "alcove", "salon3"],
      txt: ["La plus grande : une chambre, une alcôve, des portes-fenêtres sur une terrasse privée. Pour les longs séjours.", "The largest: a bedroom, an alcove, French windows onto a private terrace. For long stays."],
      plus: [["Terrasse privée", "Private terrace"], ["Alcôve avec lit de jour", "Alcove with daybed"], ["Armoire ancienne", "Antique wardrobe"], ["Petit-déjeuner servi dehors", "Breakfast served outside"]] },
    { id: "amis", fr: "Chambre des Amis", en: "Friends’ Room", m2: 24, pax: 2, prix: 190, vue: ["Deux lits", "Twin beds"], img: ["amis", "entree", "facade"],
      txt: ["Deux lits jumeaux, des tableaux aux murs et une fenêtre en fer forgé. Pour voyager à deux, chacun son lit.", "Twin beds, paintings on the walls and a wrought-iron window. For two friends travelling together."],
      plus: [["Deux lits simples", "Two single beds"], ["Fenêtre en fer forgé", "Wrought-iron window"], ["Œuvres d’artistes locaux", "Local artists’ works"], ["Le meilleur prix", "Best rate"]] }
  ];
  var GAL = [
    { k: "salon", c: "a", fr: "Le salon, ouvert sur la terrasse", en: "The living room, open to the terrace" },
    { k: "plage", c: "b", fr: "La maison vue du ciel, à quarante pas de la plage", en: "The house from above, forty steps from the beach" },
    { k: "salon3", c: "c", fr: "Fauteuils tressés et coussins bleus", en: "Woven armchairs and blue cushions" },
    { k: "facade", c: "d", fr: "La maison, cachée sous les filaos", en: "The house, hidden under the casuarinas" },
    { k: "entree", c: "e", fr: "L’entrée et l’escalier vers les chambres", en: "The entrance and the stairs to the rooms" },
    { k: "cuisine2", c: "f", fr: "La cuisine aux carreaux peints", en: "The kitchen with painted tiles" }
  ];
  var img = function (k, small) { return "img/" + k + (small ? "-s" : "") + ".jpg"; };
  var srcset = function (k) { return img(k, 1) + " 900w, " + img(k) + " 1800w"; };

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-en]").forEach(function (el) {
      if (el.dataset.fr === undefined) el.dataset.fr = el.textContent;
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.fr;
    });
    var b = $(".lang"); b.textContent = lang === "en" ? "FR" : "EN"; b.setAttribute("aria-label", lang === "en" ? "Passer en français" : "Switch to English");
    rails(); mosaic(); roomOptions(); words(); today(); calc();
  }
  $(".lang").addEventListener("click", function () {
    lang = lang === "en" ? "fr" : "en";
    try { localStorage.setItem("mc-lang", lang); } catch (e) {}
    applyLang();
  });

  /* ---------- en-tête ---------- */
  var hd = $("#hd"), hero = $(".hero"), bar = $("#bar");
  var navs = $$(".nav a");
  var cb = $(".concept");
  function setCb() { document.documentElement.style.setProperty("--cb", cb.offsetHeight + "px"); }
  setCb(); addEventListener("resize", setCb);
  function onScroll() {
    var y = scrollY, h = hero.offsetHeight;
    hd.classList.toggle("solid", y > h * 0.7);
    var bk = $("#reserver").getBoundingClientRect();
    bar.classList.toggle("on", y > h * 0.9 && bk.top > innerHeight * 0.8);
    parallax();
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        navs.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["chambres", "maison", "table", "lagon"].forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---------- ouverture : fondus lents ---------- */
  var slides = $$(".hero-sl img"), dots = $$(".dots i"), cur = 0;
  slides.forEach(function (s) { if (s.dataset.src) { var i = new Image(); i.src = s.dataset.src; } });
  function nextSlide() {
    var a = slides[cur]; cur = (cur + 1) % slides.length; var b = slides[cur];
    if (b.dataset.src) { b.src = b.dataset.src; b.removeAttribute("data-src"); }
    b.classList.add("on"); a.classList.remove("on");
    dots.forEach(function (d, i) { d.classList.remove("on"); if (i === cur) { void d.offsetWidth; d.classList.add("on"); } });
  }
  if (!reduce) setInterval(function () { if (!document.hidden && scrollY < innerHeight) nextSlide(); }, 6500);

  /* ---------- heure et coucher du soleil à Maurice ---------- */
  var SUN = [1132, 1127, 1110, 1088, 1071, 1067, 1074, 1084, 1091, 1097, 1109, 1124]; // minutes, le 15 de chaque mois
  function mu() { var d = new Date(); return new Date(d.getTime() + (d.getTimezoneOffset() + 240) * 60000); }
  function hm(m) { m = Math.round(m); return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); }
  function clock() {
    var d = mu();
    $("#now").textContent = hm(d.getHours() * 60 + d.getMinutes());
    var mo = d.getMonth(), f = (d.getDate() - 15) / 30, o = f >= 0 ? (mo + 1) % 12 : (mo + 11) % 12;
    $("#sun").textContent = hm(SUN[mo] + (SUN[o] - SUN[mo]) * Math.abs(f));
  }
  clock(); setInterval(clock, 20000);

  /* ---------- texte qui s'allume mot à mot ---------- */
  var wordEls = [];
  function words() {
    var p = $(".reveal-words");
    p.innerHTML = p.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");
    wordEls = $$(".w", p); lightWords();
  }
  function lightWords() {
    if (!wordEls.length) return;
    var r = wordEls[0].parentNode.getBoundingClientRect();
    var t = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
    var n = reduce ? wordEls.length : Math.round(t * wordEls.length);
    wordEls.forEach(function (w, i) { w.classList.toggle("on", i < n); });
  }

  /* ---------- chambres ---------- */
  var rail = $("#rail");
  function rails() {
    rail.innerHTML = ROOMS.map(function (r, i) {
      return '<button type="button" class="room" data-i="' + i + '"><div class="ph"><img src="' + img(r.img[0], 1) + '" srcset="' + srcset(r.img[0]) + '" sizes="(max-width:700px) 80vw, 32vw" alt="" loading="lazy" draggable="false"><span class="tag">' + L(r.vue[0], r.vue[1]) + "</span></div>" +
        "<h3>" + L(r.fr, r.en) + "</h3><p><span>" + r.m2 + " m² · " + r.pax + " " + L("pers.", "guests") + "</span><span>" + L("dès", "from") + " <b>" + r.prix + " €</b></span></p></button>";
    }).join("");
  }
  var drag = null, moved = false;
  rail.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; drag = { x: e.clientX, s: rail.scrollLeft }; moved = false; });
  addEventListener("pointermove", function (e) {
    if (!drag) return; var dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) { moved = true; rail.classList.add("drag"); }
    rail.scrollLeft = drag.s - dx;
  });
  addEventListener("pointerup", function () {
    if (!drag) return; drag = null;
    if (rail.classList.contains("drag")) {
      rail.classList.remove("drag");
      var w = rail.querySelector(".room").offsetWidth + 20;
      rail.scrollTo({ left: Math.round(rail.scrollLeft / w) * w, behavior: "smooth" });
    }
  });
  rail.addEventListener("click", function (e) { var b = e.target.closest(".room"); if (!b || moved) { moved = false; return; } openRoom(+b.dataset.i); });
  $$(".ar").forEach(function (b) { b.addEventListener("click", function () { var w = rail.querySelector(".room").offsetWidth + 20; rail.scrollBy({ left: w * b.dataset.d, behavior: "smooth" }); }); });
  rail.addEventListener("keydown", function (e) { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); rail.scrollBy({ left: (e.key === "ArrowRight" ? 1 : -1) * 320, behavior: "smooth" }); } });

  /* ---------- fiche chambre ---------- */
  var dr = $("#drawer"), lastFocus = null;
  function openRoom(i) {
    var r = ROOMS[i]; lastFocus = document.activeElement;
    $(".dr-img", dr).innerHTML = r.img.map(function (k, j) { return '<img src="' + img(k, j > 0) + '" ' + (j ? "" : 'srcset="' + srcset(k) + '" sizes="720px" ') + 'alt="">'; }).join("");
    $(".dr-tx", dr).innerHTML = '<p class="kick">' + L(r.vue[0], r.vue[1]) + " · " + r.m2 + " m² · " + r.pax + " " + L("personnes", "guests") + '</p><h3 id="dr-t">' + L(r.fr, r.en) + "</h3><p>" + L(r.txt[0], r.txt[1]) + "</p><ul>" +
      r.plus.map(function (p) { return "<li>" + L(p[0], p[1]) + "</li>"; }).join("") + '</ul><button class="btn" type="button" data-pick="' + r.id + '">' + L("Réserver cette chambre", "Book this room") + " · " + r.prix + " € / " + L("nuit", "night") + "</button>";
    dr.hidden = false; document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { dr.classList.add("on"); $(".x", dr).focus(); });
  }
  function closeRoom() {
    dr.classList.remove("on"); document.body.style.overflow = "";
    setTimeout(function () { dr.hidden = true; }, 600);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  dr.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeRoom();
    var p = e.target.closest("[data-pick]");
    if (p) { $("#roomSel").value = p.dataset.pick; calc(); closeRoom(); setTimeout(goBook, 300); }
  });

  /* ---------- mosaïque et visionneuse ---------- */
  function mosaic() {
    $("#mosaic").innerHTML = GAL.map(function (g, i) {
      return '<button type="button" class="' + g.c + '" data-i="' + i + '" aria-label="' + L("Agrandir : ", "Enlarge: ") + L(g.fr, g.en) + '"><img src="' + img(g.k, 1) + '" srcset="' + srcset(g.k) + '" sizes="(max-width:700px) 50vw, 60vw" alt="' + L(g.fr, g.en) + '" loading="lazy"></button>';
    }).join("");
  }
  var lb = $("#lb"), lbi = 0, lbImg = $("img", lb);
  $("#mosaic").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) openLB(+b.dataset.i); });
  function showLB() {
    var g = GAL[lbi]; lbImg.style.opacity = 0;
    var n = new Image(); n.onload = function () { lbImg.src = n.src; lbImg.alt = L(g.fr, g.en); lbImg.style.opacity = 1; }; n.src = img(g.k);
    $("figcaption", lb).textContent = (lbi + 1) + " / " + GAL.length + " · " + L(g.fr, g.en);
    [1, -1].forEach(function (d) { new Image().src = img(GAL[(lbi + d + GAL.length) % GAL.length].k); });
  }
  function openLB(i) { lbi = i; lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = "hidden"; showLB(); requestAnimationFrame(function () { lb.classList.add("on"); $(".x", lb).focus(); }); }
  function closeLB() { lb.classList.remove("on"); document.body.style.overflow = ""; setTimeout(function () { lb.hidden = true; }, 400); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  function stepLB(d) { lbi = (lbi + d + GAL.length) % GAL.length; showLB(); }
  $(".x", lb).addEventListener("click", closeLB);
  $(".lb-a.p", lb).addEventListener("click", function () { stepLB(-1); });
  $(".lb-a.n", lb).addEventListener("click", function () { stepLB(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { if (tx === null) return; var d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 40) stepLB(d < 0 ? 1 : -1); tx = null; });
  addEventListener("keydown", function (e) {
    if (!lb.hidden) { if (e.key === "Escape") closeLB(); if (e.key === "ArrowRight") stepLB(1); if (e.key === "ArrowLeft") stepLB(-1); return; }
    if (!dr.hidden && e.key === "Escape") closeRoom();
  });

  /* ---------- table : date du jour ---------- */
  function today() { $("#today").textContent = mu().toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { weekday: "long", day: "numeric", month: "long" }); }

  /* ---------- parallaxe du lagon ---------- */
  var lg = $(".lg-bg"), lgs = $(".lagoon");
  function parallax() {
    lightWords();
    if (reduce) return;
    var r = lgs.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    var p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    lg.style.transform = "translate3d(0," + (p * -8) + "%,0)";
  }
  var tick = false;
  addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(function () { onScroll(); tick = false; }); } }, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- réservation ---------- */
  var bk = $("#bk"), sel = $("#roomSel"), g = 2;
  function iso(d) { return d.toISOString().slice(0, 10); }
  var d0 = mu(); d0.setDate(d0.getDate() + 14); var d1 = new Date(d0); d1.setDate(d1.getDate() + 5);
  bk.in.value = iso(d0); bk.out.value = iso(d1); bk.in.min = iso(mu()); bk.out.min = iso(mu());
  function roomOptions() {
    var v = sel.value || "corail";
    sel.innerHTML = ROOMS.map(function (r) { return '<option value="' + r.id + '">' + L(r.fr, r.en) + " · " + r.prix + " €</option>"; }).join("");
    sel.value = v;
  }
  function calc() {
    var r = ROOMS.filter(function (x) { return x.id === sel.value; })[0] || ROOMS[0];
    var a = new Date(bk.in.value), b = new Date(bk.out.value), n = Math.round((b - a) / 864e5);
    var err = $("#err"), msg = "";
    if (!(n > 0)) msg = L("La date de départ doit suivre la date d’arrivée.", "Departure must be after arrival.");
    else if (g > r.pax) msg = L(r.fr + " accueille " + r.pax + " personnes au plus. Essayez La Perchée pour les familles.", r.en + " sleeps " + r.pax + " at most. Try The Loft for families.");
    err.textContent = msg; err.classList.toggle("on", !!msg);
    $("#sum").innerHTML = n > 0 ? n + " " + L(n > 1 ? "nuits" : "nuit", n > 1 ? "nights" : "night") + " · " + (n * r.prix).toLocaleString(lang === "en" ? "en-GB" : "fr-FR") + " €" +
      "<small>" + L("Petit-déjeuner et pirogue du matin inclus", "Breakfast and morning canoe included") + "</small>" : "—";
    $("#barTx").textContent = L("Dès 190 € la nuit", "From €190 a night");
    return !msg;
  }
  bk.addEventListener("input", calc);
  $$("[data-g]").forEach(function (b) { b.addEventListener("click", function () { g = Math.min(6, Math.max(1, g + +b.dataset.g)); bk.g.value = g; calc(); }); });
  bk.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!calc()) return;
    toast(L("Bonne nouvelle, la chambre est libre à ces dates. Rappel : Maison Corail est un hôtel imaginaire, aucune réservation n’est enregistrée.", "Good news, the room is free on those dates. Reminder: Maison Corail is an imaginary hotel, no booking is recorded."));
  });
  function goBook() { $("#reserver").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); setTimeout(function () { bk.in.focus({ preventScroll: true }); }, 700); }
  $$("[data-book]").forEach(function (b) { b.addEventListener("click", goBook); });
  var tt;
  function toast(m) { var t = $("#toast"); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(function () { t.hidden = true; }, 6000); }

  /* ---------- apparitions au défilement ---------- */
  $$(".sec-h, .facts, .rail, .mosaic, .table-tx, .exp, .strip figure, .bk").forEach(function (el) { el.classList.add("rv"); });
  if ("IntersectionObserver" in window && !reduce) {
    var ro = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    $$(".rv").forEach(function (el) { ro.observe(el); });
  } else $$(".rv").forEach(function (el) { el.classList.add("in"); });

  applyLang(); onScroll();
})();
