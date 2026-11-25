/* Samuel Drouin — sites web */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SITES = window.SITES || [];
  var lang = "fr";
  try { lang = localStorage.getItem("sd-lang") || "fr"; } catch (e) {}
  var L = function (o) { return typeof o === "string" ? o : (o[lang] || o.fr); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------- projets ---------- */
  var timers = [];
  function work() {
    timers.forEach(clearInterval); timers = [];
    var ext = function (s) { return /^https?:/.test(s.lien); };
    $("#projets").innerHTML = SITES.map(function (s, i) {
      var tag = s.type === "reel" ? (lang === "en" ? "Live site" : "Site en ligne") : (lang === "en" ? "Concept, fictional brand" : "Concept, marque fictive");
      if (s.phare) tag = "<i>" + (lang === "en" ? "Flagship" : "Projet phare") + "</i> · " + tag;
      return '<article class="pj grid" id="' + s.id + '">' +
        '<header class="pj-h"><span class="pj-n">' + String(i + 1).padStart(2, "0") + " / " + String(SITES.length).padStart(2, "0") + '</span><h2 class="pj-t">' + esc(s.titre) + "<small>" + esc(L(s.sous)) + '</small></h2><span class="pj-tag">' + tag + '</span><span class="pj-y">' + esc(s.annee) + "</span></header>" +
        '<a class="stage" href="' + s.lien + '"' + (ext(s) ? ' target="_blank" rel="noopener"' : "") + ' aria-label="' + (lang === "en" ? "Visit " : "Visiter ") + esc(s.titre) + '">' +
          '<div class="screen"><img src="' + s.img.d + '" alt="' + esc(s.titre) + (lang === "en" ? ", desktop view" : ", vue ordinateur") + '" loading="lazy">' + (s.img.d2 ? '<img src="' + s.img.d2 + '" alt="" loading="lazy">' : "") + "</div>" +
          '<div class="phone"><img src="' + s.img.m + '" alt="' + esc(s.titre) + (lang === "en" ? ", phone view" : ", vue téléphone") + '" loading="lazy"></div>' +
        "</a>" +
        '<p class="pj-tx">' + esc(L(s.texte)) + "</p>" +
        '<ul class="pj-pts">' + s.points[lang === "en" ? "en" : "fr"].map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
        '<a class="pj-go u" href="' + s.lien + '"' + (ext(s) ? ' target="_blank" rel="noopener"' : "") + ">" + (lang === "en" ? "Visit the site ↗" : "Visiter le site ↗") + "</a>" +
      "</article>";
    }).join("");
    $("#nb").textContent = SITES.length;
    if (!reduce) $$(".screen").forEach(function (sc) { if (sc.children.length > 1) timers.push(setInterval(function () { sc.classList.toggle("alt"); }, 4200)); });
    reveal();
  }

  /* ---------- étiquette « Visiter » qui suit la souris ---------- */
  var peek = $("#peek"), px = 0, py = 0, tx = 0, ty = 0, raf = 0;
  function loop() { px += (tx - px) * 0.2; py += (ty - py) * 0.2; peek.style.left = px + "px"; peek.style.top = py + "px"; raf = peek.classList.contains("on") ? requestAnimationFrame(loop) : 0; }
  document.addEventListener("mousemove", function (e) {
    tx = e.clientX; ty = e.clientY;
    var st = e.target.closest && e.target.closest(".stage");
    if (st) {
      if (!peek.classList.contains("on")) { px = tx; py = ty; peek.textContent = lang === "en" ? "Visit ↗" : "Visiter ↗"; peek.classList.add("on"); if (!raf) raf = requestAnimationFrame(loop); }
    } else peek.classList.remove("on");
  });

  /* ---------- langue ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-en]").forEach(function (el) { if (el.dataset.fr === undefined) el.dataset.fr = el.textContent; el.textContent = lang === "en" ? el.dataset.en : el.dataset.fr; });
    var b = $(".lang"); b.textContent = lang === "en" ? "FR" : "EN"; b.setAttribute("aria-label", lang === "en" ? "Passer en français" : "Switch to English");
    $("#mail").href = "mailto:samueldrouinwork@gmail.com?subject=" + encodeURIComponent(lang === "en" ? "Website project" : "Projet de site");
    document.title = lang === "en" ? "Samuel Drouin | Web design, Mauritius" : "Samuel Drouin | Création de sites web, île Maurice";
    work();
  }
  $(".lang").addEventListener("click", function () { lang = lang === "en" ? "fr" : "en"; try { localStorage.setItem("sd-lang", lang); } catch (e) {} applyLang(); });

  /* ---------- navigation active et apparitions ---------- */
  var ro = "IntersectionObserver" in window && !reduce ? new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function reveal() {
    $$(".pj-h, .stage, .pj-tx, .pj-pts, .h2, .skills li, .off article, .steps li").forEach(function (el) {
      if (el.classList.contains("in")) return;
      el.classList.add("rv"); if (ro) ro.observe(el); else el.classList.add("in");
    });
  }
  if ("IntersectionObserver" in window) {
    var navs = $$(".hd nav a");
    var no = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) navs.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); }); }); }, { rootMargin: "-45% 0px -50% 0px" });
    ["projets", "savoir", "offres", "contact"].forEach(function (id) { no.observe(document.getElementById(id)); });
  }
  $("#yr").textContent = new Date().getFullYear();
  applyLang();
})();
