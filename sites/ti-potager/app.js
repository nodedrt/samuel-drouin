/* Ti Potager — projet concept de Samuel Drouin */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = "fr";
  try { lang = localStorage.getItem("tp-lang") || "fr"; } catch (e) {}
  var L = function (fr, en) { return lang === "en" ? en : fr; };
  var loc = function () { return lang === "en" ? "en-GB" : "fr-FR"; };
  function mu() { var d = new Date(); return new Date(d.getTime() + (d.getTimezoneOffset() + 240) * 60000); }

  /* ---------- données ---------- */
  var TABS = [["entrees", "Pour commencer", "To start"], ["plats", "Au cœur", "Mains"], ["desserts", "Douceurs", "Sweet"], ["boire", "À boire", "To drink"]];
  var TAGS = { v: ["Végétal", "Plant-based"], sg: ["Sans gluten", "Gluten-free"], ep: ["Épicé", "Spicy"] };
  var MENU = {
    entrees: [
      ["Salade du matin, vinaigrette passion", "Morning salad, passion fruit dressing", "Les feuilles cueillies il y a quelques heures, graines torréfiées.", "Leaves picked a few hours ago, toasted seeds.", 320, "salade", "v sg"],
      ["Gâteaux piments au persil", "Chilli cakes with parsley", "Le classique des rues mauriciennes, version jardin.", "The Mauritian street classic, garden style.", 180, "persil", "v ep"],
      ["Carpaccio de palmiste, citron vert", "Palm heart carpaccio, lime", "Tranché minute, huile de coco, piment doux.", "Sliced to order, coconut oil, mild chilli.", 390, "feuille-jaune", "v sg"],
      ["Bouillon de brèdes", "Island greens broth", "Brèdes du potager, gingembre, ail confit.", "Garden greens, ginger, confit garlic.", 260, "chou", "v sg"]
    ],
    plats: [
      ["Carri de légumes du jour", "Vegetable curry of the day", "Aubergines, chouchou et giraumon, riz au safran.", "Aubergine, chayote and pumpkin, saffron rice.", 520, "cueillette", "v sg ep"],
      ["Poisson grillé, rougaille au basilic", "Grilled fish, basil rougaille", "La pêche du matin, tomates et basilic du jardin.", "This morning’s catch, garden tomatoes and basil.", 690, "basilic", "sg ep"],
      ["Farata maison, achards de chou", "Homemade farata, cabbage achards", "Galette feuilletée, légumes croquants au curcuma.", "Flaky flatbread, crunchy turmeric pickles.", 450, "chou", "v"],
      ["Poulet fumé au goyavier, patate douce", "Guava-wood smoked chicken, sweet potato", "Fumé six heures, purée à la vanille.", "Smoked for six hours, vanilla mash.", 650, "champ", "sg"]
    ],
    desserts: [
      ["Tarte banane-vanille", "Banana and vanilla tart", "Bananes du fond du jardin, vanille de l’île.", "Bananas from the back of the garden, island vanilla.", 290, "fleur", "v"],
      ["Sorbet hibiscus, fleurs comestibles", "Hibiscus sorbet, edible flowers", "Acidulé, rose vif, servi glacé.", "Tangy, bright pink, ice cold.", 240, "feuille-rouge", "v sg"],
      ["Gâteau patate douce et coco", "Sweet potato and coconut cake", "La recette de la grand-mère de Mireille.", "Mireille’s grandmother’s recipe.", 260, "soleil", "v sg"]
    ],
    boire: [
      ["Citronnade au basilic", "Basil lemonade", "Citrons verts pressés, basilic du jour.", "Fresh limes, today’s basil.", 160, "basilic", "v sg"],
      ["Infusion du jardin", "Garden infusion", "Citronnelle, menthe, feuilles de combava.", "Lemongrass, mint, kaffir lime leaves.", 120, "fougere", "v sg"],
      ["Jus de tamarin", "Tamarind juice", "Doux et acidulé, sur glace.", "Sweet and sour, on ice.", 150, "tagete", "v sg"],
      ["Rhum arrangé maison", "House-infused rum", "Letchi et vanille, six mois de patience.", "Lychee and vanilla, six months of patience.", 280, "nervure", "v sg"]
    ]
  };
  var VEG = [["salade", "Laitue feuille de chêne", "Oak leaf lettuce"], ["persil", "Persil frisé", "Curly parsley"], ["cueillette", "Aubergines", "Aubergines"], ["basilic", "Basilic", "Basil"], ["tagete", "Tagètes (fleurs)", "Marigolds (flowers)"]];
  var tab = "entrees", filters = {};

  /* ---------- langue ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-en]").forEach(function (el) { if (el.dataset.fr === undefined) el.dataset.fr = el.textContent; el.textContent = lang === "en" ? el.dataset.en : el.dataset.fr; });
    $(".lang").textContent = lang === "en" ? "Français" : "English";
    veg(); tabs(); chips(); dishes(); days(); openNow();
  }
  $(".lang").addEventListener("click", function () { lang = lang === "en" ? "fr" : "en"; try { localStorage.setItem("tp-lang", lang); } catch (e) {} applyLang(); });

  /* ---------- ce matin au potager ---------- */
  function veg() {
    var d = mu(), h = d.getHours() + d.getMinutes() / 60, since = h >= 6.5 ? h - 6.5 : h + 17.5;
    var n = Math.max(1, Math.round(since));
    $("#harvest").textContent = L("Cueilli à 6 h 30 · il y a " + n + " h", "Picked at 6:30 am · " + n + " h ago");
    $("#veg").innerHTML = VEG.map(function (v) { return '<article class="vg"><figure><img src="img/' + v[0] + '-s.jpg" alt="" loading="lazy"></figure><b>' + L(v[1], v[2]) + "</b><span>" + L("Rang ", "Row ") + (3 + v[1].length % 9) + "</span></article>"; }).join("");
  }

  /* ---------- carte ---------- */
  function tabs() {
    $("#tabs").innerHTML = TABS.map(function (t) { return '<button type="button" role="tab" data-t="' + t[0] + '" aria-selected="' + (t[0] === tab) + '">' + L(t[1], t[2]) + "</button>"; }).join("");
  }
  function chips() {
    $("#chips").innerHTML = Object.keys(TAGS).map(function (k) { return '<button type="button" data-f="' + k + '" aria-pressed="' + !!filters[k] + '">' + L(TAGS[k][0], TAGS[k][1]) + "</button>"; }).join("");
  }
  function dishes() {
    var on = Object.keys(filters).filter(function (k) { return filters[k]; });
    var list = MENU[tab].filter(function (d) { return on.every(function (k) { return d[6].split(" ").indexOf(k) >= 0; }); });
    $("#dishes").innerHTML = list.length ? list.map(function (d) {
      return '<li class="dish" data-img="' + d[5] + '"><h3>' + L(d[0], d[1]) + '</h3><span class="pr">' + d[4] + "</span><p>" + L(d[2], d[3]) + '</p><span class="lb">' + d[6].split(" ").map(function (k) { return "<i>" + L(TAGS[k][0], TAGS[k][1]) + "</i>"; }).join("") + "</span></li>";
    }).join("") : '<li class="empty">' + L("Rien ne correspond à ces filtres dans cette partie de la carte. Essayez d’en retirer un.", "Nothing matches these filters in this part of the menu. Try removing one.") + "</li>";
  }
  $("#tabs").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; tab = b.dataset.t; tabs(); dishes(); });
  $("#chips").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; filters[b.dataset.f] = !filters[b.dataset.f]; chips(); dishes(); });

  /* aperçu photo qui suit la souris */
  var peek = $("#peek"), pimg = $("img", peek), px = 0, py = 0, tx = 0, ty = 0, raf = 0;
  function follow() { px += (tx - px) * 0.18; py += (ty - py) * 0.18; peek.style.left = px + "px"; peek.style.top = py + "px"; raf = peek.classList.contains("on") ? requestAnimationFrame(follow) : 0; }
  $("#dishes").addEventListener("mousemove", function (e) {
    var d = e.target.closest(".dish"); tx = e.clientX + 140; ty = e.clientY;
    if (!d) { peek.classList.remove("on"); return; }
    var s = "img/" + d.dataset.img + "-s.jpg";
    if (pimg.getAttribute("src") !== s) pimg.src = s;
    if (!peek.classList.contains("on")) { px = tx; py = ty; peek.classList.add("on"); if (!raf) raf = requestAnimationFrame(follow); }
  });
  $("#dishes").addEventListener("mouseleave", function () { peek.classList.remove("on"); });

  /* ---------- histoire : l'image change avec le texte ---------- */
  var stImgs = $$(".st-img img");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = +e.target.dataset.i;
        $$(".stp").forEach(function (s) { s.classList.toggle("on", s === e.target); });
        stImgs.forEach(function (im, j) { im.classList.toggle("on", j === i); });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    $$(".stp").forEach(function (s) { so.observe(s); });
  }

  /* ---------- réservation ---------- */
  var day = null, slot = null, pax = 2;
  var SLOTS = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
  function full(k) { var h = 0; for (var i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) % 997; return h % 5 === 0; }
  function key(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function days() {
    var t = mu(), out = "";
    for (var i = 0; i < 8; i++) {
      var d = new Date(t); d.setDate(t.getDate() + i); var k = key(d), closed = d.getDay() === 1;
      if (day === null && !closed) day = k;
      out += '<button type="button" data-d="' + k + '" aria-pressed="' + (day === k) + '"' + (closed ? " disabled" : "") + ' aria-label="' + d.toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long" }) + (closed ? L(", fermé", ", closed") : "") + '"><span>' + (i === 0 ? L("Auj.", "Today") : d.toLocaleDateString(loc(), { weekday: "short" }).replace(".", "")) + "</span><b>" + d.getDate() + "</b></button>";
    }
    $("#days").innerHTML = out; slots();
  }
  function slots() {
    var t = mu(), today = key(t) === day, now = t.getHours() * 60 + t.getMinutes();
    $("#slots").innerHTML = SLOTS.map(function (s) {
      var m = +s.slice(0, 2) * 60 + +s.slice(3), off = full(day + s) || (today && m < now + 60);
      if (off && slot === s) slot = null;
      return '<button type="button" data-s="' + s + '" aria-pressed="' + (slot === s) + '"' + (off ? " disabled" : "") + ">" + s + "</button>";
    }).join("");
  }
  $("#days").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b || b.disabled) return; day = b.dataset.d; $$("#days button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); slots(); });
  $("#slots").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b || b.disabled) return; slot = b.dataset.s; $$("#slots button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); $("#err").textContent = ""; });
  $$("[data-p]").forEach(function (b) { b.addEventListener("click", function () { pax = Math.min(12, Math.max(1, pax + +b.dataset.p)); $("#pax").textContent = pax; }); });
  $("#rf").addEventListener("submit", function (e) {
    e.preventDefault();
    var nom = this.nom.value.trim(), err = $("#err");
    if (!slot) { err.textContent = L("Choisissez une heure.", "Pick a time."); return; }
    if (!nom) { err.textContent = L("Indiquez votre nom pour la table.", "Add your name for the table."); this.nom.focus(); return; }
    err.textContent = "";
    var p = day.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
    var tk = $("#ticket");
    tk.innerHTML = '<p class="meta">' + L("Table notée", "Table noted") + "</p><h3>" + nom.replace(/[<>&"]/g, "") + "</h3><p><b>" + d.toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long" }) + " · " + slot + "</b><br>" + pax + " " + L(pax > 1 ? "couverts" : "couvert", pax > 1 ? "guests" : "guest") + "</p>" +
      '<p class="tl">' + L("Ti Potager est un restaurant imaginaire : cette réservation n’est pas envoyée. Merci d’avoir joué le jeu.", "Ti Potager is an imaginary restaurant: this booking is not sent anywhere. Thanks for playing along.") + "</p>";
    tk.hidden = false; tk.style.animation = "none"; void tk.offsetWidth; tk.style.animation = "";
    tk.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  });

  /* ---------- ouvert maintenant ? ---------- */
  function openNow() {
    var d = mu(), m = d.getHours() * 60 + d.getMinutes(), o = d.getDay() !== 1 && ((m >= 720 && m < 870) || (m >= 1140 && m < 1320));
    var el = $("#open"); el.textContent = o ? L("Ouvert en ce moment", "Open right now") : L("Fermé en ce moment", "Closed right now"); el.classList.toggle("closed", !o);
  }

  /* ---------- navigation, bouton flottant, apparitions ---------- */
  var fab = $(".fab"), hero = $(".hero"), resa = $("#resa");
  function onScroll() {
    var r = resa.getBoundingClientRect();
    fab.classList.toggle("on", scrollY > hero.offsetHeight * 0.8 && (r.top > innerHeight || r.bottom < 0));
  }
  addEventListener("scroll", onScroll, { passive: true });
  if ("IntersectionObserver" in window) {
    var navs = $$(".nav a");
    var no = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) navs.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); }); }); }, { rootMargin: "-45% 0px -50% 0px" });
    ["carte", "potager", "resa", "infos"].forEach(function (id) { no.observe(document.getElementById(id)); });
    $$(".sh, .vg, .rf, .infos > div, .lead").forEach(function (el) { el.classList.add("rv"); });
    var ro = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } }); }, { rootMargin: "0px 0px -6% 0px" });
    if (!reduce) $$(".rv").forEach(function (el) { ro.observe(el); }); else $$(".rv").forEach(function (el) { el.classList.add("in"); });
  }
  applyLang(); onScroll();
})();
