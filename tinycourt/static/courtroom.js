/* Embedded? Hugging Face wraps the Space app in an auto-resizing iframe
 * (iframe-resizer). Our viewport-locked layout would feed that resizer an
 * ever-growing height, so tag <html> as embedded and let the CSS pin a fixed
 * height instead (see ".tc-embed" in courtroom.css). Runs immediately at <head>
 * parse, before the body renders, so there's no layout flash. A cross-origin
 * access to window.top throws — which itself means we're embedded. */
try { if (window.self !== window.top) document.documentElement.classList.add("tc-embed"); }
catch (e) { document.documentElement.classList.add("tc-embed"); }

/* Fit the embedded app to the space actually available below HF's Space tab bar.
 * We can't use viewport units (they resolve to the iframe's own height → the
 * resizer feedback runaway), and a fixed px either overflows or underfills. So
 * ask iframe-resizer for the PARENT's geometry via getPageInfo: `windowHeight`
 * and the iframe's `offsetTop` are independent of the iframe's own height, so the
 * derived height is a stable fixed px that also equals the visible area. Publish
 * it as `--embed-h`; the `.tc-embed` CSS heights read it (fallback 820px until
 * ready). getPageInfo's callback re-fires on parent resize/scroll, so it stays
 * responsive. */
(function fitEmbedHeight() {
  if (window.self === window.top) return;
  function apply(info) {
    var h = Math.max(360, Math.round(info.windowHeight - info.offsetTop + (info.scrollTop || 0)));
    document.documentElement.style.setProperty("--embed-h", h + "px");
  }
  var n = 0;
  var iv = setInterval(function () {
    var pi = window.parentIFrame;
    if (pi && typeof pi.getPageInfo === "function") {
      clearInterval(iv);
      try { pi.getPageInfo(apply); } catch (e) {}
    } else if (++n > 200) {
      clearInterval(iv);
    }
  }, 100);
})();

/* Tiny Court — all client-side behaviour, in one namespace.
 *
 * Loaded once into <head> (see app.main → launch(head=…)). Everything hangs off
 * a single `window.tc`, so the Python side wires Gradio events with thin
 * one-line bridges, e.g. `js="(v) => window.tc.toast(v)"`. Keeping it in one
 * module lets the optimistic busy-state machine live in a shared closure
 * instead of the window.__tc* globals the old per-listener js= blobs needed.
 *
 * Why client-side at all: every server turn runs with show_progress="hidden"
 * (the courtroom supplies its own theatrical feedback and "must not look like
 * default Gradio"), and model inference can take many seconds. These bridges
 * give instant, in-character feedback and a deterministic busy lifecycle.
 */
window.tc = (function () {
  "use strict";

  // --- Inline icons (mirror tinycourt/render.py _ICONS) ---------------------
  const GAVEL = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5 5 5"/><path d="m12 7 5 5"/><path d="m5 14 5 5"/><path d="m9 18 8-8"/><path d="m3 21 6-6"/></svg>';
  const PERSON = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Draft chips only paste text into the composer (no inference, no re-render).
  const DRAFTS = new Set(["draft_blame", "draft_partial", "draft_witness", "draft_apology"]);

  // --- Optimistic busy-state machine ----------------------------------------
  // Setting busy is optimistic (instant, on click); CLEARING it is driven by an
  // explicit server signal — every completed turn pings the busy/toast bridges
  // (see busyDone / toast). A generous failsafe timer is the only backstop.
  // While busy: body.tc-busy locks every control (CSS), the clicked chip/button
  // shows a spinner (.loading), and glass phases get an optimistic user bubble +
  // a court "typing" indicator.
  let busy = false;
  let busyTimer = null;

  const list = () => document.querySelector("#surface .message-list");
  const scrollList = () => { const l = list(); if (l) l.scrollTop = l.scrollHeight; };

  const addBubble = (html) => {
    const l = list();
    if (!l) return;
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const node = tmp.firstElementChild;
    // Keep the reply chips as the last element: insert just before them.
    l.insertBefore(node, l.querySelector(".reply-actions"));
    scrollList();
  };

  const typingHTML = () =>
    '<div class="court-message typing" aria-live="polite" aria-label="The court is deliberating">' +
    '<div class="message-avatar"><span class="avatar-icon">' + GAVEL + "</span></div>" +
    '<div class="message-bubble"><span class="message-label">The Court</span>' +
    '<span class="typing-dots"><i></i><i></i><i></i></span></div></div>';

  const userHTML = (text) => {
    const stage = document.body.dataset.stage || "";
    const who = stage === "case" ? "Complaint" : "You";
    return '<div class="court-message user optimistic">' +
      '<div class="message-avatar"><span class="avatar-icon">' + PERSON + "</span></div>" +
      '<div class="message-bubble"><span class="message-label">' + who + "</span>" + esc(text) + "</div></div>";
  };

  function clearBusy() {
    if (!busy) return;
    busy = false;
    clearTimeout(busyTimer);
    document.body.classList.remove("tc-busy");
    document.querySelectorAll(".reply-chip.loading, #actionRow button.loading")
      .forEach((b) => b.classList.remove("loading"));
    document.querySelectorAll("#surface .court-message.typing").forEach((n) => n.remove());
    scrollList();
  }

  function setBusy(opts) {
    if (busy) return false;
    busy = true;
    document.body.classList.add("tc-busy");
    if (opts && opts.spin) opts.spin.classList.add("loading");
    if (opts && opts.userText) addBubble(userHTML(opts.userText));
    if (opts && opts.typing && !document.querySelector("#surface .court-message.typing")) {
      addBubble(typingHTML());
    }
    clearTimeout(busyTimer);
    busyTimer = setTimeout(clearBusy, 180000); // failsafe backstop only
    return true;
  }

  // --- One-time delegated listeners (called from demo.load via tc.init) ------
  // Inbound chip bridge: reply chips rendered inside the static #surface HTML
  // are inert, so a single delegated listener forwards their clicks to the
  // matching hidden `#tcbtn-<id>` real button (whose .click round-trips to
  // Python). Delegation survives #surface being re-rendered every turn.
  let bound = false;
  function init() {
    if (bound) return;
    bound = true;

    // A11y: the inbound chip-bridge buttons (#tcbtn-*) are real <button>s kept
    // in the DOM but pushed offscreen (Gradio drops visible=False from the DOM),
    // so without this they are phantom tab stops / announced controls. Take the
    // whole bridge out of the tab order and hide it from assistive tech — the
    // reply chips inside #surface stay the real, reachable controls.
    const triggers = document.getElementById("actionTriggers");
    if (triggers) {
      triggers.setAttribute("aria-hidden", "true");
      triggers.querySelectorAll("button").forEach((b) => b.setAttribute("tabindex", "-1"));
    }

    // Reply chips (delegated; chips are re-rendered every turn).
    document.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-tc-action]");
      if (!chip) return;
      e.preventDefault();
      if (busy) { e.stopPropagation(); return; }
      const id = chip.getAttribute("data-tc-action");
      const host = document.getElementById("tcbtn-" + id);
      const btn = host ? (host.tagName === "BUTTON" ? host : host.querySelector("button")) : null;
      if (!btn) { console.warn("[tinycourt] no trigger button for action", id); return; }
      if (!DRAFTS.has(id)) setBusy({ spin: chip, typing: true });
      btn.click();
    }, true);

    // Paper-phase action row (real gr.Buttons): spin the clicked one, lock the rest.
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#actionRow button");
      if (!btn) return;
      if (busy) { e.stopPropagation(); e.preventDefault(); return; }
      setBusy({ spin: btn });
    }, true);

    // While a turn is in flight, block a second composer send (button + Enter).
    // These scope by event target (not the composer's value/markup), so the app
    // never reaches into the component's internal DOM to reconstruct what was typed.
    document.addEventListener("click", (e) => {
      if (!busy) return;
      if (!e.target.closest("#composerInput .submit-btn")) return;
      e.stopPropagation();
      e.preventDefault();
    }, true);
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || e.shiftKey || !busy) return;
      if (!(e.target.closest && e.target.closest("#composerInput textarea"))) return;
      e.stopPropagation();
      e.preventDefault();
    }, true);
  }

  // --- Bridges wired from Python (thin js= one-liners) ----------------------

  // Seed the body skin class + a safe default stage before the SPA routes.
  function onLoad() {
    document.body.classList.add("tc-skin");
    document.body.dataset.stage = "landing";
  }

  // Mirror the wizard phase onto body + #courtView (drives the bg pan + per-stage CSS).
  function stage(s) {
    if (!s) return;
    document.body.dataset.stage = s;
    const cv = document.getElementById("courtView");
    if (cv) cv.dataset.stage = s;
  }

  // Transient toast. A toast also marks the end of a server turn (validation
  // nudges return only a toast, no #surface re-render), so it clears busy too.
  let toastTimer = null;
  function toast(v) {
    if (!v) return;
    clearBusy();
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = v.split("|").slice(1).join("|");
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
  }

  // Copy the shareable court record to the clipboard.
  function share(v) {
    if (!v) return;
    const text = v.split("|").slice(1).join("|");
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  }

  // Every completed turn pushes a fresh nonce here so we clear busy
  // deterministically (no DOM-mutation guessing).
  function busyDone(v) {
    if (v) clearBusy();
  }

  // Client-side court-record export (remaining-work T3): render the existing
  // paper record card to a PNG the visitor can download — the shareable payoff.
  // Pure browser work, triggered by a server nonce on the png bridge; html2canvas
  // is vendored and loaded ahead of this script (see app.main head).
  let savingPng = false;
  async function savePng(v) {
    if (!v || savingPng) return;
    const card = document.querySelector("#surface .ruling-surface");
    if (!card || typeof window.html2canvas !== "function") {
      toast("0|The court could not print the record this time.");
      return;
    }
    savingPng = true;
    try {
      const canvas = await window.html2canvas(card, {
        backgroundColor: "#f4ead7", // paper, so transparency never bleeds black
        scale: Math.min(2, window.devicePixelRatio || 1) + 1,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "tiny-court-record.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.warn("[tinycourt] savePng failed", e);
      toast("0|The court could not print the record this time.");
    } finally {
      savingPng = false;
    }
  }

  // The composer's own submit carries the typed value as its payload, so raise
  // the optimistic user bubble + typing indicator from it — no DOM scraping.
  // Empty sends are ignored (the server adds nothing, so nothing to echo).
  function composer(mm) {
    if (busy) return;
    const text = (mm && mm.text ? String(mm.text) : "").trim();
    const hasFiles = !!(mm && Array.isArray(mm.files) && mm.files.length);
    if (!text && !hasFiles) return;
    setBusy({ userText: text || null, typing: true });
  }

  return { init, onLoad, stage, toast, share, busyDone, composer, savePng };
})();
