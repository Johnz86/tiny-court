import { n as Ft, u as gs, s as yo, r as Uu, q as $u, c as Gu, g as Ln, i as Hu, T as Vu, a as Ku, b as Fr, d as Gt, e as js, f as Tt, p as Nr, h as At, j as vo, m as To, k as So, l as Br, E as xo, o as he, t as Rn, v as st, w as Wu, x as Ao, y as Ur, z as $r, A as Yu, B as ju, C as qu, D as _n, F as Xu, G as Io, I as Si, H as zu, J as Qu, K as Zu, L as it, M as Gr, N as Ju, O as bo, P as Dn, S as Cn, Q as eh, R as th, U as Hr, V as sh, W as ih, X as rh, Y as Vr, Z as nh, _ as Ms, $ as ui, a0 as ah, a1 as oh, a2 as lh, a3 as uh, a4 as hh, a5 as ch, a6 as dh, a7 as fh, a8 as gh, a9 as mh, aa as ph, ab as Lo, ac as Eh, ad as yh, ae as vh, af as Th, ag as qs, ah as Sh, ai as xh, aj as Ah, ak as Ih, al as Pn, am as bh, an as Lh, ao as Rh, ap as Kr, aq as We, ar as Wr, as as _h, at as ir, au as rr, av as Ro, aw as Fs, ax as _o, ay as nr, az as kn, aA as xi } from "./render-Bb4rj7q9.js";
function Dh(i, e, t) {
  if (i == null)
    return e(void 0), t && t(void 0), Ft;
  const s = gs(
    () => i.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return s.unsubscribe ? () => s.unsubscribe() : s;
}
const Rt = [];
function Ch(i, e) {
  return {
    subscribe: hi(i, e).subscribe
  };
}
function hi(i, e = Ft) {
  let t = null;
  const s = /* @__PURE__ */ new Set();
  function r(o) {
    if (yo(i, o) && (i = o, t)) {
      const u = !Rt.length;
      for (const l of s)
        l[1](), Rt.push(l, i);
      if (u) {
        for (let l = 0; l < Rt.length; l += 2)
          Rt[l][0](Rt[l + 1]);
        Rt.length = 0;
      }
    }
  }
  function n(o) {
    r(o(
      /** @type {T} */
      i
    ));
  }
  function a(o, u = Ft) {
    const l = [o, u];
    return s.add(l), s.size === 1 && (t = e(r, n) || Ft), o(
      /** @type {T} */
      i
    ), () => {
      s.delete(l), s.size === 0 && t && (t(), t = null);
    };
  }
  return { set: r, update: n, subscribe: a };
}
function jt(i, e, t) {
  const s = !Array.isArray(i), r = s ? [i] : i;
  if (!r.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const n = e.length < 2;
  return Ch(t, (a, o) => {
    let u = !1;
    const l = [];
    let h = 0, c = Ft;
    const d = () => {
      if (h)
        return;
      c();
      const f = e(s ? l[0] : l, a, o);
      n ? a(f) : c = typeof f == "function" ? f : Ft;
    }, g = r.map(
      (f, m) => Dh(
        f,
        (p) => {
          l[m] = p, h &= ~(1 << m), u && d();
        },
        () => {
          h |= 1 << m;
        }
      )
    );
    return u = !0, d(), function() {
      Uu(g), c(), u = !1;
    };
  });
}
let ys = !1;
function Ph(i) {
  var e = ys;
  try {
    return ys = !1, [i(), ys];
  } finally {
    ys = e;
  }
}
function kh(i, e) {
  if (e) {
    const t = document.body;
    i.autofocus = !0, $u(() => {
      document.activeElement === t && i.focus();
    });
  }
}
const wh = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (i) => i
  })
);
function Oh(i) {
  return (
    /** @type {string} */
    wh?.createHTML(i) ?? i
  );
}
function Mh(i) {
  var e = Gu("template");
  return e.innerHTML = Oh(i.replaceAll("<!>", "<!---->")), e.content;
}
function Xs(i, e) {
  var t = (
    /** @type {Effect} */
    Fr
  );
  t.nodes === null && (t.nodes = { start: i, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function ci(i, e) {
  var t = (e & Vu) !== 0, s = (e & Ku) !== 0, r, n = !i.startsWith("<!>");
  return () => {
    r === void 0 && (r = Mh(n ? i : "<!>" + i), t || (r = /** @type {TemplateNode} */
    Ln(r)));
    var a = (
      /** @type {TemplateNode} */
      s || Hu ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    if (t) {
      var o = (
        /** @type {TemplateNode} */
        Ln(a)
      ), u = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      Xs(o, u);
    } else
      Xs(a, a);
    return a;
  };
}
function Fh(i = "") {
  {
    var e = Gt(i + "");
    return Xs(e, e), e;
  }
}
function Do() {
  var i = document.createDocumentFragment(), e = document.createComment(""), t = Gt();
  return i.append(e, t), Xs(e, t), i;
}
function vt(i, e) {
  i !== null && i.before(
    /** @type {Node} */
    e
  );
}
class Co {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #e = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #s = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #t = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #r = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    this.anchor = e, this.#r = t;
  }
  /**
   * @param {Batch} batch
   */
  #n = (e) => {
    if (this.#e.has(e)) {
      var t = (
        /** @type {Key} */
        this.#e.get(e)
      ), s = this.#s.get(t);
      if (s)
        js(s), this.#i.delete(t);
      else {
        var r = this.#t.get(t);
        r && (js(r.effect), this.#s.set(t, r.effect), this.#t.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), s = r.effect);
      }
      for (const [n, a] of this.#e) {
        if (this.#e.delete(n), n === e)
          break;
        const o = this.#t.get(a);
        o && (Tt(o.effect), this.#t.delete(a));
      }
      for (const [n, a] of this.#s) {
        if (n === t || this.#i.has(n)) continue;
        const o = () => {
          if (Array.from(this.#e.values()).includes(n)) {
            var l = document.createDocumentFragment();
            To(a, l), l.append(Gt()), this.#t.set(n, { effect: a, fragment: l });
          } else
            Tt(a);
          this.#i.delete(n), this.#s.delete(n);
        };
        this.#r || !s ? (this.#i.add(n), Nr(a, o, !1)) : o();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #a = (e) => {
    this.#e.delete(e);
    const t = Array.from(this.#e.values());
    for (const [s, r] of this.#t)
      t.includes(s) || (Tt(r.effect), this.#t.delete(s));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var s = (
      /** @type {Batch} */
      vo
    ), r = So();
    if (t && !this.#s.has(e) && !this.#t.has(e))
      if (r) {
        var n = document.createDocumentFragment(), a = Gt();
        n.append(a), this.#t.set(e, {
          effect: At(() => t(a)),
          fragment: n
        });
      } else
        this.#s.set(
          e,
          At(() => t(this.anchor))
        );
    if (this.#e.set(s, e), r) {
      for (const [o, u] of this.#s)
        o === e ? s.unskip_effect(u) : s.skip_effect(u);
      for (const [o, u] of this.#t)
        o === e ? s.unskip_effect(u.effect) : s.skip_effect(u.effect);
      s.oncommit(this.#n), s.ondiscard(this.#a);
    } else
      this.#n(s);
  }
}
function Po(i, e, t = !1) {
  var s = new Co(i), r = t ? xo : 0;
  function n(a, o) {
    s.ensure(a, o);
  }
  Br(() => {
    var a = !1;
    e((o, u = 0) => {
      a = !0, n(u, o);
    }), a || n(-1, null);
  }, r);
}
function Nh(i, e) {
  return e;
}
function Bh(i, e, t) {
  for (var s = [], r = e.length, n, a = e.length, o = 0; o < r; o++) {
    let c = e[o];
    Nr(
      c,
      () => {
        if (n) {
          if (n.pending.delete(c), n.done.add(c), n.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              i.outrogroups
            );
            ar(i, $r(n.done)), d.delete(n), d.size === 0 && (i.outrogroups = null);
          }
        } else
          a -= 1;
      },
      !1
    );
  }
  if (a === 0) {
    var u = s.length === 0 && t !== null;
    if (u) {
      var l = (
        /** @type {Element} */
        t
      ), h = (
        /** @type {Element} */
        l.parentNode
      );
      Qu(h), h.append(l), i.items.clear();
    }
    ar(i, e, !u);
  } else
    n = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (i.outrogroups ??= /* @__PURE__ */ new Set()).add(n);
}
function ar(i, e, t = !0) {
  var s;
  if (i.pending.size > 0) {
    s = /* @__PURE__ */ new Set();
    for (const a of i.pending.values())
      for (const o of a)
        s.add(
          /** @type {EachItem} */
          i.items.get(o).e
        );
  }
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    if (s?.has(n)) {
      n.f |= st;
      const a = document.createDocumentFragment();
      To(n, a);
    } else
      Tt(e[r], t);
  }
}
var wn;
function Uh(i, e, t, s, r, n = null) {
  var a = i, o = /* @__PURE__ */ new Map(), u = null, l = Ao(() => {
    var y = t();
    return (
      /** @type {V[]} */
      Ur(y) ? y : y == null ? [] : $r(y)
    );
  }), h, c = /* @__PURE__ */ new Map(), d = !0;
  function g(y) {
    (p.effect.f & Io) === 0 && (p.pending.delete(y), p.fallback = u, $h(p, h, a, e, s), u !== null && (h.length === 0 ? (u.f & st) === 0 ? js(u) : (u.f ^= st, ts(u, null, a)) : Nr(u, () => {
      u = null;
    })));
  }
  function f(y) {
    p.pending.delete(y);
  }
  var m = Br(() => {
    h = /** @type {V[]} */
    he(l);
    for (var y = h.length, v = /* @__PURE__ */ new Set(), T = (
      /** @type {Batch} */
      vo
    ), S = So(), x = 0; x < y; x += 1) {
      var L = h[x], A = s(L, x), I = d ? null : o.get(A);
      I ? (I.v && Rn(I.v, L), I.i && Rn(I.i, x), S && T.unskip_effect(I.e)) : (I = Gh(
        o,
        d ? a : wn ??= Gt(),
        L,
        A,
        x,
        r,
        e,
        t
      ), d || (I.e.f |= st), o.set(A, I)), v.add(A);
    }
    if (y === 0 && n && !u && (d ? u = At(() => n(a)) : (u = At(() => n(wn ??= Gt())), u.f |= st)), y > v.size && Wu(), !d)
      if (c.set(T, v), S) {
        for (const [_, b] of o)
          v.has(_) || T.skip_effect(b.e);
        T.oncommit(g), T.ondiscard(f);
      } else
        g(T);
    he(l);
  }), p = { effect: m, items: o, pending: c, outrogroups: null, fallback: u };
  d = !1;
}
function Qt(i) {
  for (; i !== null && (i.f & zu) === 0; )
    i = i.next;
  return i;
}
function $h(i, e, t, s, r) {
  var n = e.length, a = i.items, o = Qt(i.effect.first), u, l = null, h = [], c = [], d, g, f, m;
  for (m = 0; m < n; m += 1) {
    if (d = e[m], g = r(d, m), f = /** @type {EachItem} */
    a.get(g).e, i.outrogroups !== null)
      for (const I of i.outrogroups)
        I.pending.delete(f), I.done.delete(f);
    if ((f.f & Si) !== 0 && js(f), (f.f & st) !== 0)
      if (f.f ^= st, f === o)
        ts(f, null, t);
      else {
        var p = l ? l.next : o;
        f === i.effect.last && (i.effect.last = f.prev), f.prev && (f.prev.next = f.next), f.next && (f.next.prev = f.prev), rt(i, l, f), rt(i, f, p), ts(f, p, t), l = f, h = [], c = [], o = Qt(l.next);
        continue;
      }
    if (f !== o) {
      if (u !== void 0 && u.has(f)) {
        if (h.length < c.length) {
          var y = c[0], v;
          l = y.prev;
          var T = h[0], S = h[h.length - 1];
          for (v = 0; v < h.length; v += 1)
            ts(h[v], y, t);
          for (v = 0; v < c.length; v += 1)
            u.delete(c[v]);
          rt(i, T.prev, S.next), rt(i, l, T), rt(i, S, y), o = y, l = S, m -= 1, h = [], c = [];
        } else
          u.delete(f), ts(f, o, t), rt(i, f.prev, f.next), rt(i, f, l === null ? i.effect.first : l.next), rt(i, l, f), l = f;
        continue;
      }
      for (h = [], c = []; o !== null && o !== f; )
        (u ??= /* @__PURE__ */ new Set()).add(o), c.push(o), o = Qt(o.next);
      if (o === null)
        continue;
    }
    (f.f & st) === 0 && h.push(f), l = f, o = Qt(f.next);
  }
  if (i.outrogroups !== null) {
    for (const I of i.outrogroups)
      I.pending.size === 0 && (ar(i, $r(I.done)), i.outrogroups?.delete(I));
    i.outrogroups.size === 0 && (i.outrogroups = null);
  }
  if (o !== null || u !== void 0) {
    var x = [];
    if (u !== void 0)
      for (f of u)
        (f.f & Si) === 0 && x.push(f);
    for (; o !== null; )
      (o.f & Si) === 0 && o !== i.fallback && x.push(o), o = Qt(o.next);
    var L = x.length;
    if (L > 0) {
      var A = null;
      Bh(i, x, A);
    }
  }
}
function Gh(i, e, t, s, r, n, a, o) {
  var u = (a & Yu) !== 0 ? (a & ju) === 0 ? qu(t, !1, !1) : _n(t) : null, l = (a & Xu) !== 0 ? _n(r) : null;
  return {
    v: u,
    i: l,
    e: At(() => (n(e, u ?? t, l ?? r, o), () => {
      i.delete(s);
    }))
  };
}
function ts(i, e, t) {
  if (i.nodes)
    for (var s = i.nodes.start, r = i.nodes.end, n = e && (e.f & st) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; s !== null; ) {
      var a = (
        /** @type {TemplateNode} */
        Zu(s)
      );
      if (n.before(s), s === r)
        return;
      s = a;
    }
}
function rt(i, e, t) {
  e === null ? i.effect.first = t : e.next = t, t === null ? i.effect.last = e : t.prev = e;
}
function Hh(i, e, ...t) {
  var s = new Co(i);
  Br(() => {
    const r = e() ?? null;
    s.ensure(r, r && ((n) => r(n, ...t)));
  }, xo);
}
function Vh(i, e, t) {
  it(() => {
    var s = gs(() => e(i, t?.()) || {});
    if (t && s?.update) {
      var r = !1, n = (
        /** @type {any} */
        {}
      );
      Gr(() => {
        var a = t();
        Ju(a), r && yo(n, a) && (n = a, s.update(a));
      }), r = !0;
    }
    if (s?.destroy)
      return () => (
        /** @type {Function} */
        s.destroy()
      );
  });
}
function Kh(i, e) {
  var t = void 0, s;
  bo(() => {
    t !== (t = e()) && (s && (Tt(s), s = null), t && (s = At(() => {
      it(() => (
        /** @type {(node: Element) => void} */
        t(i)
      ));
    })));
  });
}
function ko(i) {
  var e, t, s = "";
  if (typeof i == "string" || typeof i == "number") s += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var r = i.length;
    for (e = 0; e < r; e++) i[e] && (t = ko(i[e])) && (s && (s += " "), s += t);
  } else for (t in i) i[t] && (s && (s += " "), s += t);
  return s;
}
function Wh() {
  for (var i, e, t = 0, s = "", r = arguments.length; t < r; t++) (i = arguments[t]) && (e = ko(i)) && (s && (s += " "), s += e);
  return s;
}
function Yh(i) {
  return typeof i == "object" ? Wh(i) : i ?? "";
}
const On = [...` 	
\r\f \v\uFEFF`];
function jh(i, e, t) {
  var s = i == null ? "" : "" + i;
  if (e && (s = s ? s + " " + e : e), t) {
    for (var r of Object.keys(t))
      if (t[r])
        s = s ? s + " " + r : r;
      else if (s.length)
        for (var n = r.length, a = 0; (a = s.indexOf(r, a)) >= 0; ) {
          var o = a + n;
          (a === 0 || On.includes(s[a - 1])) && (o === s.length || On.includes(s[o])) ? s = (a === 0 ? "" : s.substring(0, a)) + s.substring(o + 1) : a = o;
        }
  }
  return s === "" ? null : s;
}
function Mn(i, e = !1) {
  var t = e ? " !important;" : ";", s = "";
  for (var r of Object.keys(i)) {
    var n = i[r];
    n != null && n !== "" && (s += " " + r + ": " + n + t);
  }
  return s;
}
function Ai(i) {
  return i[0] !== "-" || i[1] !== "-" ? i.toLowerCase() : i;
}
function qh(i, e) {
  if (e) {
    var t = "", s, r;
    if (Array.isArray(e) ? (s = e[0], r = e[1]) : s = e, i) {
      i = String(i).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var n = !1, a = 0, o = !1, u = [];
      s && u.push(...Object.keys(s).map(Ai)), r && u.push(...Object.keys(r).map(Ai));
      var l = 0, h = -1;
      const m = i.length;
      for (var c = 0; c < m; c++) {
        var d = i[c];
        if (o ? d === "/" && i[c - 1] === "*" && (o = !1) : n ? n === d && (n = !1) : d === "/" && i[c + 1] === "*" ? o = !0 : d === '"' || d === "'" ? n = d : d === "(" ? a++ : d === ")" && a--, !o && n === !1 && a === 0) {
          if (d === ":" && h === -1)
            h = c;
          else if (d === ";" || c === m - 1) {
            if (h !== -1) {
              var g = Ai(i.substring(l, h).trim());
              if (!u.includes(g)) {
                d !== ";" && c++;
                var f = i.substring(l, c).trim();
                t += " " + f + ";";
              }
            }
            l = c + 1, h = -1;
          }
        }
      }
    }
    return s && (t += Mn(s)), r && (t += Mn(r, !0)), t = t.trim(), t === "" ? null : t;
  }
  return i == null ? null : String(i);
}
function Yr(i, e, t, s, r, n) {
  var a = (
    /** @type {any} */
    i[Dn]
  );
  if (a !== t || a === void 0) {
    var o = jh(t, s, n);
    o == null ? i.removeAttribute("class") : e ? i.className = o : i.setAttribute("class", o), i[Dn] = t;
  } else if (n && r !== n)
    for (var u in n) {
      var l = !!n[u];
      (r == null || l !== !!r[u]) && i.classList.toggle(u, l);
    }
  return n;
}
function Ii(i, e = {}, t, s) {
  for (var r in t) {
    var n = t[r];
    e[r] !== n && (t[r] == null ? i.style.removeProperty(r) : i.style.setProperty(r, n, s));
  }
}
function Xh(i, e, t, s) {
  var r = (
    /** @type {any} */
    i[Cn]
  );
  if (r !== e) {
    var n = qh(e, s);
    n == null ? i.removeAttribute("style") : i.style.cssText = n, i[Cn] = e;
  } else s && (Array.isArray(s) ? (Ii(i, t?.[0], s[0]), Ii(i, t?.[1], s[1], "important")) : Ii(i, t, s));
  return s;
}
function or(i, e, t = !1) {
  if (i.multiple) {
    if (e == null)
      return;
    if (!Ur(e))
      return eh();
    for (var s of i.options)
      s.selected = e.includes(Fn(s));
    return;
  }
  for (s of i.options) {
    var r = Fn(s);
    if (th(r, e)) {
      s.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (i.selectedIndex = -1);
}
function zh(i) {
  var e = new MutationObserver(() => {
    or(i, i.__value);
  });
  e.observe(i, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Hr(() => {
    e.disconnect();
  });
}
function Fn(i) {
  return "__value" in i ? i.__value : i.value;
}
const vs = /* @__PURE__ */ Symbol("class"), Zt = /* @__PURE__ */ Symbol("style"), wo = /* @__PURE__ */ Symbol("is custom element"), Oo = /* @__PURE__ */ Symbol("is html"), Qh = Vr ? "input" : "INPUT", Zh = Vr ? "option" : "OPTION", Jh = Vr ? "select" : "SELECT";
function ec(i, e) {
  e ? i.hasAttribute("selected") || i.setAttribute("selected", "") : i.removeAttribute("selected");
}
function St(i, e, t, s) {
  var r = Mo(i);
  r[e] !== (r[e] = t) && (e === "loading" && (i[rh] = t), t == null ? i.removeAttribute(e) : typeof t != "string" && Fo(i).includes(e) ? i[e] = t : i.setAttribute(e, t));
}
function tc(i, e, t, s, r = !1, n = !1) {
  var a = Mo(i), o = a[wo], u = !a[Oo], l = e || {}, h = i.nodeName === Zh;
  for (var c in e)
    c in t || (t[c] = null);
  t.class ? t.class = Yh(t.class) : t.class = null, t[Zt] && (t.style ??= null);
  var d = Fo(i);
  if (i.nodeName === Qh && "type" in t && ("value" in t || "__value" in t)) {
    var g = t.type;
    (g !== l.type || g === void 0 && i.hasAttribute("type")) && (l.type = g, St(i, "type", g));
  }
  for (const S in t) {
    let x = t[S];
    if (h && S === "value" && x == null) {
      i.value = i.__value = "", l[S] = x;
      continue;
    }
    if (S === "class") {
      var f = i.namespaceURI === "http://www.w3.org/1999/xhtml";
      Yr(i, f, x, s, e?.[vs], t[vs]), l[S] = x, l[vs] = t[vs];
      continue;
    }
    if (S === "style") {
      Xh(i, x, e?.[Zt], t[Zt]), l[S] = x, l[Zt] = t[Zt];
      continue;
    }
    var m = l[S];
    if (!(x === m && !(x === void 0 && i.hasAttribute(S)))) {
      l[S] = x;
      var p = S[0] + S[1];
      if (p !== "$$")
        if (p === "on") {
          const L = {}, A = "$$" + S;
          let I = S.slice(2);
          var y = dh(I);
          if (nh(I) && (I = I.slice(0, -7), L.capture = !0), !y && m) {
            if (x != null) continue;
            i.removeEventListener(I, l[A], L), l[A] = null;
          }
          if (y)
            Ms(I, i, x), ui([I]);
          else if (x != null) {
            let _ = function(b) {
              l[S].call(this, b);
            };
            l[A] = ah(I, i, _, L);
          }
        } else if (S === "style")
          St(i, S, x);
        else if (S === "autofocus")
          kh(
            /** @type {HTMLElement} */
            i,
            !!x
          );
        else if (!o && (S === "__value" || S === "value" && x != null))
          i.value = i.__value = x;
        else if (S === "selected" && h)
          ec(
            /** @type {HTMLOptionElement} */
            i,
            x
          );
        else {
          var v = S;
          u || (v = oh(v));
          var T = v === "defaultValue" || v === "defaultChecked";
          if (x == null && !o && !T)
            if (a[S] = null, v === "value" || v === "checked") {
              let L = (
                /** @type {HTMLInputElement} */
                i
              );
              const A = e === void 0;
              if (v === "value") {
                let I = L.defaultValue;
                L.removeAttribute(v), L.defaultValue = I, L.value = L.__value = A ? I : null;
              } else {
                let I = L.defaultChecked;
                L.removeAttribute(v), L.defaultChecked = I, L.checked = A ? I : !1;
              }
            } else
              i.removeAttribute(S);
          else T || d.includes(v) && (o || typeof x != "string") ? (i[v] = x, v in a && (a[v] = lh)) : typeof x != "function" && St(i, v, x);
        }
    }
  }
  return l;
}
function sc(i, e, t = [], s = [], r = [], n, a = !1, o = !1) {
  sh(r, t, s, (u) => {
    var l = void 0, h = {}, c = i.nodeName === Jh, d = !1;
    if (bo(() => {
      var f = e(...u.map(he)), m = tc(
        i,
        l,
        f,
        n,
        a,
        o
      );
      d && c && "value" in f && or(
        /** @type {HTMLSelectElement} */
        i,
        f.value
      );
      for (let y of Object.getOwnPropertySymbols(h))
        f[y] || Tt(h[y]);
      for (let y of Object.getOwnPropertySymbols(f)) {
        var p = f[y];
        y.description === ih && (!l || p !== l[y]) && (h[y] && Tt(h[y]), h[y] = At(() => Kh(i, () => p))), m[y] = p;
      }
      l = m;
    }), c) {
      var g = (
        /** @type {HTMLSelectElement} */
        i
      );
      it(() => {
        or(
          g,
          /** @type {Record<string | symbol, any>} */
          l.value,
          !0
        ), zh(g);
      });
    }
    d = !0;
  });
}
function Mo(i) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    i[uh] ??= {
      [wo]: i.nodeName.includes("-"),
      [Oo]: i.namespaceURI === hh
    }
  );
}
var Nn = /* @__PURE__ */ new Map();
function Fo(i) {
  var e = i.getAttribute("is") || i.nodeName, t = Nn.get(e);
  if (t) return t;
  Nn.set(e, t = []);
  for (var s, r = i, n = Element.prototype; n !== r; ) {
    s = fh(r);
    for (var a in s)
      s[a].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      a !== "innerHTML" && a !== "textContent" && a !== "innerText" && t.push(a);
    r = ch(r);
  }
  return t;
}
function ic(i, e, t = e) {
  var s, r, n = () => {
    cancelAnimationFrame(s), i.paused || (s = requestAnimationFrame(n));
    var a = i.currentTime;
    r !== a && t(r = a);
  };
  s = requestAnimationFrame(n), i.addEventListener("timeupdate", n), Gr(() => {
    var a = Number(e());
    r !== a && !isNaN(
      /** @type {any} */
      a
    ) && (i.currentTime = r = a);
  }), Hr(() => {
    cancelAnimationFrame(s), i.removeEventListener("timeupdate", n);
  });
}
function rc(i, e, t = e) {
  var s = e(), r = () => {
    s !== i.paused && t(s = i.paused);
  };
  gh(i, ["play", "pause", "canplay"], r, s == null), it(() => {
    (s = !!e()) !== i.paused && (s ? i.pause() : i.play().catch((n) => {
      throw t(s = !0), n;
    }));
  });
}
class jr {
  /** */
  #e = /* @__PURE__ */ new WeakMap();
  /** @type {ResizeObserver | undefined} */
  #s;
  /** @type {ResizeObserverOptions} */
  #t;
  /** @static */
  static entries = /* @__PURE__ */ new WeakMap();
  /** @param {ResizeObserverOptions} options */
  constructor(e) {
    this.#t = e;
  }
  /**
   * @param {Element} element
   * @param {(entry: ResizeObserverEntry) => any} listener
   */
  observe(e, t) {
    var s = this.#e.get(e) || /* @__PURE__ */ new Set();
    return s.add(t), this.#e.set(e, s), this.#i().observe(e, this.#t), () => {
      var r = this.#e.get(e);
      r.delete(t), r.size === 0 && (this.#e.delete(e), this.#s.unobserve(e));
    };
  }
  #i() {
    return this.#s ?? (this.#s = new ResizeObserver(
      /** @param {any} entries */
      (e) => {
        for (var t of e) {
          jr.entries.set(t.target, t);
          for (var s of this.#e.get(t.target) || [])
            s(t);
        }
      }
    ));
  }
}
var nc = /* @__PURE__ */ new jr({
  box: "border-box"
});
function ac(i, e, t) {
  var s = nc.observe(i, () => t(i[e]));
  it(() => (gs(() => t(i[e])), s));
}
function bi(i, e) {
  return i === e || i?.[Lo] === e;
}
function No(i = {}, e, t, s) {
  var r = (
    /** @type {ComponentContext} */
    mh.r
  ), n = (
    /** @type {Effect} */
    Fr
  );
  return it(() => {
    var a, o;
    return Gr(() => {
      a = o, o = [], gs(() => {
        bi(t(...o), i) || (e(i, ...o), a && bi(t(...a), i) && e(null, ...a));
      });
    }), () => {
      let u = n;
      for (; u !== r && u.parent !== null && u.parent.f & ph; )
        u = u.parent;
      const l = () => {
        o && bi(t(...o), i) && e(null, ...o);
      }, h = u.teardown;
      u.teardown = () => {
        l(), h?.();
      };
    };
  }), i;
}
function oc(i, e, t, s, r) {
  var n = () => {
    s(t[i]);
  };
  t.addEventListener(e, n), n(), (t === document.body || t === window || t === document) && Hr(() => {
    t.removeEventListener(e, n);
  });
}
function lc(i, e) {
  var t = (
    /** @type {Record<string, Function[] | Function>} */
    i.$$events?.[e.type]
  ), s = Ur(t) ? t.slice() : t == null ? [] : [t];
  for (var r of s)
    r.call(this, e);
}
function De(i, e, t, s) {
  var r = !xh || (t & Ah) !== 0, n = (t & Sh) !== 0, a = (t & bh) !== 0, o = (
    /** @type {V} */
    s
  ), u = !0, l = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), h = () => a && r ? (l ??= Pn(
    /** @type {() => V} */
    s
  ), he(l)) : (u && (u = !1, o = a ? gs(
    /** @type {() => V} */
    s
  ) : (
    /** @type {V} */
    s
  )), o);
  let c;
  if (n) {
    var d = Lo in i || Rh in i;
    c = Eh(i, e)?.set ?? (d && e in i ? (S) => i[e] = S : void 0);
  }
  var g, f = !1;
  n ? [g, f] = Ph(() => (
    /** @type {V} */
    i[e]
  )) : g = /** @type {V} */
  i[e], g === void 0 && s !== void 0 && (g = h(), c && (r && yh(), c(g)));
  var m;
  if (r ? m = () => {
    var S = (
      /** @type {V} */
      i[e]
    );
    return S === void 0 ? h() : (u = !0, S);
  } : m = () => {
    var S = (
      /** @type {V} */
      i[e]
    );
    return S !== void 0 && (o = /** @type {V} */
    void 0), S === void 0 ? o : S;
  }, r && (t & vh) === 0)
    return m;
  if (c) {
    var p = i.$$legacy;
    return (
      /** @type {() => V} */
      (function(S, x) {
        return arguments.length > 0 ? ((!r || !x || p || f) && c(x ? m() : S), S) : m();
      })
    );
  }
  var y = !1, v = ((t & Ih) !== 0 ? Pn : Ao)(() => (y = !1, m()));
  n && he(v);
  var T = (
    /** @type {Effect} */
    Fr
  );
  return (
    /** @type {() => V} */
    (function(S, x) {
      if (arguments.length > 0) {
        const L = x ? he(v) : r && n ? Th(S) : S;
        return qs(v, L), y = !0, o !== void 0 && (o = L), S;
      }
      return Lh && y || (T.f & Io) !== 0 ? v.v : he(v);
    })
  );
}
var uc = /* @__PURE__ */ ci("<img/>");
function hc(i, e) {
  Kr(e, !0);
  var t = uc();
  sc(
    t,
    (s) => ({
      src: e.src,
      class: s,
      "data-testid": e.data_testid,
      ...e.restProps
    }),
    [() => (e.class_names || []).join(" ")],
    void 0,
    void 0,
    "svelte-5xcf1t"
  ), We("load", t, function(s) {
    lc.call(this, e, s);
  }), vt(i, t), Wr();
}
_h();
const cc = [
  { color: "red", primary: 600, secondary: 100 },
  { color: "green", primary: 600, secondary: 100 },
  { color: "blue", primary: 600, secondary: 100 },
  { color: "yellow", primary: 500, secondary: 100 },
  { color: "purple", primary: 600, secondary: 100 },
  { color: "teal", primary: 600, secondary: 100 },
  { color: "orange", primary: 600, secondary: 100 },
  { color: "cyan", primary: 600, secondary: 100 },
  { color: "lime", primary: 500, secondary: 100 },
  { color: "pink", primary: 600, secondary: 100 }
], Bn = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  }
};
cc.reduce((i, { color: e, primary: t, secondary: s }) => ({
  ...i,
  [e]: {
    primary: Bn[e][t],
    secondary: Bn[e][s]
  }
}), {});
function dc(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Li, Un;
function fc() {
  if (Un) return Li;
  Un = 1;
  var i = function(v) {
    return e(v) && !t(v);
  };
  function e(y) {
    return !!y && typeof y == "object";
  }
  function t(y) {
    var v = Object.prototype.toString.call(y);
    return v === "[object RegExp]" || v === "[object Date]" || n(y);
  }
  var s = typeof Symbol == "function" && Symbol.for, r = s ? /* @__PURE__ */ Symbol.for("react.element") : 60103;
  function n(y) {
    return y.$$typeof === r;
  }
  function a(y) {
    return Array.isArray(y) ? [] : {};
  }
  function o(y, v) {
    return v.clone !== !1 && v.isMergeableObject(y) ? m(a(y), y, v) : y;
  }
  function u(y, v, T) {
    return y.concat(v).map(function(S) {
      return o(S, T);
    });
  }
  function l(y, v) {
    if (!v.customMerge)
      return m;
    var T = v.customMerge(y);
    return typeof T == "function" ? T : m;
  }
  function h(y) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(y).filter(function(v) {
      return Object.propertyIsEnumerable.call(y, v);
    }) : [];
  }
  function c(y) {
    return Object.keys(y).concat(h(y));
  }
  function d(y, v) {
    try {
      return v in y;
    } catch {
      return !1;
    }
  }
  function g(y, v) {
    return d(y, v) && !(Object.hasOwnProperty.call(y, v) && Object.propertyIsEnumerable.call(y, v));
  }
  function f(y, v, T) {
    var S = {};
    return T.isMergeableObject(y) && c(y).forEach(function(x) {
      S[x] = o(y[x], T);
    }), c(v).forEach(function(x) {
      g(y, x) || (d(y, x) && T.isMergeableObject(v[x]) ? S[x] = l(x, T)(y[x], v[x], T) : S[x] = o(v[x], T));
    }), S;
  }
  function m(y, v, T) {
    T = T || {}, T.arrayMerge = T.arrayMerge || u, T.isMergeableObject = T.isMergeableObject || i, T.cloneUnlessOtherwiseSpecified = o;
    var S = Array.isArray(v), x = Array.isArray(y), L = S === x;
    return L ? S ? T.arrayMerge(y, v, T) : f(y, v, T) : o(v, T);
  }
  m.all = function(v, T) {
    if (!Array.isArray(v))
      throw new Error("first argument should be an array");
    return v.reduce(function(S, x) {
      return m(S, x, T);
    }, {});
  };
  var p = m;
  return Li = p, Li;
}
var gc = fc();
const mc = /* @__PURE__ */ dc(gc);
var lr = function(i, e) {
  return lr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, s) {
    t.__proto__ = s;
  } || function(t, s) {
    for (var r in s) Object.prototype.hasOwnProperty.call(s, r) && (t[r] = s[r]);
  }, lr(i, e);
};
function di(i, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  lr(i, e);
  function t() {
    this.constructor = i;
  }
  i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var se = function() {
  return se = Object.assign || function(e) {
    for (var t, s = 1, r = arguments.length; s < r; s++) {
      t = arguments[s];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, se.apply(this, arguments);
};
function pc(i, e) {
  var t = {};
  for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && e.indexOf(s) < 0 && (t[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, s = Object.getOwnPropertySymbols(i); r < s.length; r++)
      e.indexOf(s[r]) < 0 && Object.prototype.propertyIsEnumerable.call(i, s[r]) && (t[s[r]] = i[s[r]]);
  return t;
}
function Ri(i, e, t) {
  if (t || arguments.length === 2) for (var s = 0, r = e.length, n; s < r; s++)
    (n || !(s in e)) && (n || (n = Array.prototype.slice.call(e, 0, s)), n[s] = e[s]);
  return i.concat(n || Array.prototype.slice.call(e));
}
function _i(i, e) {
  var t = e && e.cache ? e.cache : Ac, s = e && e.serializer ? e.serializer : Sc, r = e && e.strategy ? e.strategy : vc;
  return r(i, {
    cache: t,
    serializer: s
  });
}
function Ec(i) {
  return i == null || typeof i == "number" || typeof i == "boolean";
}
function yc(i, e, t, s) {
  var r = Ec(s) ? s : t(s), n = e.get(r);
  return typeof n > "u" && (n = i.call(this, s), e.set(r, n)), n;
}
function Bo(i, e, t) {
  var s = Array.prototype.slice.call(arguments, 3), r = t(s), n = e.get(r);
  return typeof n > "u" && (n = i.apply(this, s), e.set(r, n)), n;
}
function Uo(i, e, t, s, r) {
  return t.bind(e, i, s, r);
}
function vc(i, e) {
  var t = i.length === 1 ? yc : Bo;
  return Uo(i, this, t, e.cache.create(), e.serializer);
}
function Tc(i, e) {
  return Uo(i, this, Bo, e.cache.create(), e.serializer);
}
var Sc = function() {
  return JSON.stringify(arguments);
}, xc = (
  /** @class */
  (function() {
    function i() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    return i.prototype.get = function(e) {
      return this.cache[e];
    }, i.prototype.set = function(e, t) {
      this.cache[e] = t;
    }, i;
  })()
), Ac = {
  create: function() {
    return new xc();
  }
}, Di = {
  variadic: Tc
}, J;
(function(i) {
  i[i.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", i[i.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", i[i.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", i[i.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", i[i.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", i[i.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", i[i.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", i[i.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", i[i.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", i[i.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", i[i.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", i[i.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", i[i.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", i[i.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", i[i.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", i[i.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", i[i.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", i[i.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", i[i.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", i[i.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", i[i.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", i[i.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", i[i.INVALID_TAG = 23] = "INVALID_TAG", i[i.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", i[i.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", i[i.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(J || (J = {}));
var ue;
(function(i) {
  i[i.literal = 0] = "literal", i[i.argument = 1] = "argument", i[i.number = 2] = "number", i[i.date = 3] = "date", i[i.time = 4] = "time", i[i.select = 5] = "select", i[i.plural = 6] = "plural", i[i.pound = 7] = "pound", i[i.tag = 8] = "tag";
})(ue || (ue = {}));
var Ht;
(function(i) {
  i[i.number = 0] = "number", i[i.dateTime = 1] = "dateTime";
})(Ht || (Ht = {}));
function $n(i) {
  return i.type === ue.literal;
}
function Ic(i) {
  return i.type === ue.argument;
}
function $o(i) {
  return i.type === ue.number;
}
function Go(i) {
  return i.type === ue.date;
}
function Ho(i) {
  return i.type === ue.time;
}
function Vo(i) {
  return i.type === ue.select;
}
function Ko(i) {
  return i.type === ue.plural;
}
function bc(i) {
  return i.type === ue.pound;
}
function Wo(i) {
  return i.type === ue.tag;
}
function Yo(i) {
  return !!(i && typeof i == "object" && i.type === Ht.number);
}
function ur(i) {
  return !!(i && typeof i == "object" && i.type === Ht.dateTime);
}
var jo = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, Lc = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function Rc(i) {
  var e = {};
  return i.replace(Lc, function(t) {
    var s = t.length;
    switch (t[0]) {
      // Era
      case "G":
        e.era = s === 4 ? "long" : s === 5 ? "narrow" : "short";
        break;
      // Year
      case "y":
        e.year = s === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      // Quarter
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      // Month
      case "M":
      case "L":
        e.month = ["numeric", "2-digit", "short", "long", "narrow"][s - 1];
        break;
      // Week
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        e.day = ["numeric", "2-digit"][s - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      // Weekday
      case "E":
        e.weekday = s === 4 ? "long" : s === 5 ? "narrow" : "short";
        break;
      case "e":
        if (s < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][s - 4];
        break;
      case "c":
        if (s < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][s - 4];
        break;
      // Period
      case "a":
        e.hour12 = !0;
        break;
      case "b":
      // am, pm, noon, midnight
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      // Hour
      case "h":
        e.hourCycle = "h12", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "H":
        e.hourCycle = "h23", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "K":
        e.hourCycle = "h11", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "k":
        e.hourCycle = "h24", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      // Minute
      case "m":
        e.minute = ["numeric", "2-digit"][s - 1];
        break;
      // Second
      case "s":
        e.second = ["numeric", "2-digit"][s - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      // Zone
      case "z":
        e.timeZoneName = s < 4 ? "short" : "long";
        break;
      case "Z":
      // 1..3, 4, 5: The ISO8601 varios formats
      case "O":
      // 1, 4: milliseconds in day short, long
      case "v":
      // 1, 4: generic non-location format
      case "V":
      // 1, 2, 3, 4: time zone ID or city
      case "X":
      // 1, 2, 3, 4: The ISO8601 varios formats
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  }), e;
}
var _c = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function Dc(i) {
  if (i.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var e = i.split(_c).filter(function(d) {
    return d.length > 0;
  }), t = [], s = 0, r = e; s < r.length; s++) {
    var n = r[s], a = n.split("/");
    if (a.length === 0)
      throw new Error("Invalid number skeleton");
    for (var o = a[0], u = a.slice(1), l = 0, h = u; l < h.length; l++) {
      var c = h[l];
      if (c.length === 0)
        throw new Error("Invalid number skeleton");
    }
    t.push({ stem: o, options: u });
  }
  return t;
}
function Cc(i) {
  return i.replace(/^(.*?)-/, "");
}
var Gn = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, qo = /^(@+)?(\+|#+)?[rs]?$/g, Pc = /(\*)(0+)|(#+)(0+)|(0+)/g, Xo = /^(0+)$/;
function Hn(i) {
  var e = {};
  return i[i.length - 1] === "r" ? e.roundingPriority = "morePrecision" : i[i.length - 1] === "s" && (e.roundingPriority = "lessPrecision"), i.replace(qo, function(t, s, r) {
    return typeof r != "string" ? (e.minimumSignificantDigits = s.length, e.maximumSignificantDigits = s.length) : r === "+" ? e.minimumSignificantDigits = s.length : s[0] === "#" ? e.maximumSignificantDigits = s.length : (e.minimumSignificantDigits = s.length, e.maximumSignificantDigits = s.length + (typeof r == "string" ? r.length : 0)), "";
  }), e;
}
function zo(i) {
  switch (i) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function kc(i) {
  var e;
  if (i[0] === "E" && i[1] === "E" ? (e = {
    notation: "engineering"
  }, i = i.slice(2)) : i[0] === "E" && (e = {
    notation: "scientific"
  }, i = i.slice(1)), e) {
    var t = i.slice(0, 2);
    if (t === "+!" ? (e.signDisplay = "always", i = i.slice(2)) : t === "+?" && (e.signDisplay = "exceptZero", i = i.slice(2)), !Xo.test(i))
      throw new Error("Malformed concise eng/scientific notation");
    e.minimumIntegerDigits = i.length;
  }
  return e;
}
function Vn(i) {
  var e = {}, t = zo(i);
  return t || e;
}
function wc(i) {
  for (var e = {}, t = 0, s = i; t < s.length; t++) {
    var r = s[t];
    switch (r.stem) {
      case "percent":
      case "%":
        e.style = "percent";
        continue;
      case "%x100":
        e.style = "percent", e.scale = 100;
        continue;
      case "currency":
        e.style = "currency", e.currency = r.options[0];
        continue;
      case "group-off":
      case ",_":
        e.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        e.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        e.style = "unit", e.unit = Cc(r.options[0]);
        continue;
      case "compact-short":
      case "K":
        e.notation = "compact", e.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        e.notation = "compact", e.compactDisplay = "long";
        continue;
      case "scientific":
        e = se(se(se({}, e), { notation: "scientific" }), r.options.reduce(function(u, l) {
          return se(se({}, u), Vn(l));
        }, {}));
        continue;
      case "engineering":
        e = se(se(se({}, e), { notation: "engineering" }), r.options.reduce(function(u, l) {
          return se(se({}, u), Vn(l));
        }, {}));
        continue;
      case "notation-simple":
        e.notation = "standard";
        continue;
      // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
      case "unit-width-narrow":
        e.currencyDisplay = "narrowSymbol", e.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        e.currencyDisplay = "code", e.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        e.currencyDisplay = "name", e.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        e.currencyDisplay = "symbol";
        continue;
      case "scale":
        e.scale = parseFloat(r.options[0]);
        continue;
      case "rounding-mode-floor":
        e.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        e.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        e.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        e.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        e.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        e.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        e.roundingMode = "halfExpand";
        continue;
      // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
      case "integer-width":
        if (r.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        r.options[0].replace(Pc, function(u, l, h, c, d, g) {
          if (l)
            e.minimumIntegerDigits = h.length;
          else {
            if (c && d)
              throw new Error("We currently do not support maximum integer digits");
            if (g)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (Xo.test(r.stem)) {
      e.minimumIntegerDigits = r.stem.length;
      continue;
    }
    if (Gn.test(r.stem)) {
      if (r.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      r.stem.replace(Gn, function(u, l, h, c, d, g) {
        return h === "*" ? e.minimumFractionDigits = l.length : c && c[0] === "#" ? e.maximumFractionDigits = c.length : d && g ? (e.minimumFractionDigits = d.length, e.maximumFractionDigits = d.length + g.length) : (e.minimumFractionDigits = l.length, e.maximumFractionDigits = l.length), "";
      });
      var n = r.options[0];
      n === "w" ? e = se(se({}, e), { trailingZeroDisplay: "stripIfInteger" }) : n && (e = se(se({}, e), Hn(n)));
      continue;
    }
    if (qo.test(r.stem)) {
      e = se(se({}, e), Hn(r.stem));
      continue;
    }
    var a = zo(r.stem);
    a && (e = se(se({}, e), a));
    var o = kc(r.stem);
    o && (e = se(se({}, e), o));
  }
  return e;
}
var Ts = {
  "001": [
    "H",
    "h"
  ],
  419: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AD: [
    "H",
    "hB"
  ],
  AE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  AF: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  AG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AL: [
    "h",
    "H",
    "hB"
  ],
  AM: [
    "H",
    "hB"
  ],
  AO: [
    "H",
    "hB"
  ],
  AR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AS: [
    "h",
    "H"
  ],
  AT: [
    "H",
    "hB"
  ],
  AU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AW: [
    "H",
    "hB"
  ],
  AX: [
    "H"
  ],
  AZ: [
    "H",
    "hB",
    "h"
  ],
  BA: [
    "H",
    "hB",
    "h"
  ],
  BB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BD: [
    "h",
    "hB",
    "H"
  ],
  BE: [
    "H",
    "hB"
  ],
  BF: [
    "H",
    "hB"
  ],
  BG: [
    "H",
    "hB",
    "h"
  ],
  BH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  BI: [
    "H",
    "h"
  ],
  BJ: [
    "H",
    "hB"
  ],
  BL: [
    "H",
    "hB"
  ],
  BM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BN: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  BO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  BQ: [
    "H"
  ],
  BR: [
    "H",
    "hB"
  ],
  BS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BT: [
    "h",
    "H"
  ],
  BW: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BY: [
    "H",
    "h"
  ],
  BZ: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CA: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  CC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CD: [
    "hB",
    "H"
  ],
  CF: [
    "H",
    "h",
    "hB"
  ],
  CG: [
    "H",
    "hB"
  ],
  CH: [
    "H",
    "hB",
    "h"
  ],
  CI: [
    "H",
    "hB"
  ],
  CK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CL: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CM: [
    "H",
    "h",
    "hB"
  ],
  CN: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  CO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CP: [
    "H"
  ],
  CR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CU: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CV: [
    "H",
    "hB"
  ],
  CW: [
    "H",
    "hB"
  ],
  CX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CY: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  CZ: [
    "H"
  ],
  DE: [
    "H",
    "hB"
  ],
  DG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  DJ: [
    "h",
    "H"
  ],
  DK: [
    "H"
  ],
  DM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  DO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  DZ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  EC: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  EE: [
    "H",
    "hB"
  ],
  EG: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  ER: [
    "h",
    "H"
  ],
  ES: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  ET: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  FI: [
    "H"
  ],
  FJ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  FM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FO: [
    "H",
    "h"
  ],
  FR: [
    "H",
    "hB"
  ],
  GA: [
    "H",
    "hB"
  ],
  GB: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GD: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GE: [
    "H",
    "hB",
    "h"
  ],
  GF: [
    "H",
    "hB"
  ],
  GG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GH: [
    "h",
    "H"
  ],
  GI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GL: [
    "H",
    "h"
  ],
  GM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GN: [
    "H",
    "hB"
  ],
  GP: [
    "H",
    "hB"
  ],
  GQ: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  GR: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  GT: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  GU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GW: [
    "H",
    "hB"
  ],
  GY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  HK: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  HN: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  HR: [
    "H",
    "hB"
  ],
  HU: [
    "H",
    "h"
  ],
  IC: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  ID: [
    "H"
  ],
  IE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IL: [
    "H",
    "hB"
  ],
  IM: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IN: [
    "h",
    "H"
  ],
  IO: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IQ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  IR: [
    "hB",
    "H"
  ],
  IS: [
    "H"
  ],
  IT: [
    "H",
    "hB"
  ],
  JE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  JM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  JO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  JP: [
    "H",
    "K",
    "h"
  ],
  KE: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  KG: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KH: [
    "hB",
    "h",
    "H",
    "hb"
  ],
  KI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KM: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KN: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KP: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KW: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  KY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KZ: [
    "H",
    "hB"
  ],
  LA: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  LB: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LI: [
    "H",
    "hB",
    "h"
  ],
  LK: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  LR: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LS: [
    "h",
    "H"
  ],
  LT: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  LU: [
    "H",
    "h",
    "hB"
  ],
  LV: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  LY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MC: [
    "H",
    "hB"
  ],
  MD: [
    "H",
    "hB"
  ],
  ME: [
    "H",
    "hB",
    "h"
  ],
  MF: [
    "H",
    "hB"
  ],
  MG: [
    "H",
    "h"
  ],
  MH: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ML: [
    "H"
  ],
  MM: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  MN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MP: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MQ: [
    "H",
    "hB"
  ],
  MR: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MS: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MT: [
    "H",
    "h"
  ],
  MU: [
    "H",
    "h"
  ],
  MV: [
    "H",
    "h"
  ],
  MW: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MX: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  MY: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  MZ: [
    "H",
    "hB"
  ],
  NA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NC: [
    "H",
    "hB"
  ],
  NE: [
    "H"
  ],
  NF: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NI: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NL: [
    "H",
    "hB"
  ],
  NO: [
    "H",
    "h"
  ],
  NP: [
    "H",
    "h",
    "hB"
  ],
  NR: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NU: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  OM: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PF: [
    "H",
    "h",
    "hB"
  ],
  PG: [
    "h",
    "H"
  ],
  PH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PK: [
    "h",
    "hB",
    "H"
  ],
  PL: [
    "H",
    "h"
  ],
  PM: [
    "H",
    "hB"
  ],
  PN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  PR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PS: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PT: [
    "H",
    "hB"
  ],
  PW: [
    "h",
    "H"
  ],
  PY: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  QA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  RE: [
    "H",
    "hB"
  ],
  RO: [
    "H",
    "hB"
  ],
  RS: [
    "H",
    "hB",
    "h"
  ],
  RU: [
    "H"
  ],
  RW: [
    "H",
    "h"
  ],
  SA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SC: [
    "H",
    "h",
    "hB"
  ],
  SD: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SE: [
    "H"
  ],
  SG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SH: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SI: [
    "H",
    "hB"
  ],
  SJ: [
    "H"
  ],
  SK: [
    "H"
  ],
  SL: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SM: [
    "H",
    "h",
    "hB"
  ],
  SN: [
    "H",
    "h",
    "hB"
  ],
  SO: [
    "h",
    "H"
  ],
  SR: [
    "H",
    "hB"
  ],
  SS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ST: [
    "H",
    "hB"
  ],
  SV: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  SX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  TC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TD: [
    "h",
    "H",
    "hB"
  ],
  TF: [
    "H",
    "h",
    "hB"
  ],
  TG: [
    "H",
    "hB"
  ],
  TH: [
    "H",
    "h"
  ],
  TJ: [
    "H",
    "h"
  ],
  TL: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  TM: [
    "H",
    "h"
  ],
  TN: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  TO: [
    "h",
    "H"
  ],
  TR: [
    "H",
    "hB"
  ],
  TT: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TW: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  TZ: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UA: [
    "H",
    "hB",
    "h"
  ],
  UG: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  US: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  UY: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  UZ: [
    "H",
    "hB",
    "h"
  ],
  VA: [
    "H",
    "h",
    "hB"
  ],
  VC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  VG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VN: [
    "H",
    "h"
  ],
  VU: [
    "h",
    "H"
  ],
  WF: [
    "H",
    "hB"
  ],
  WS: [
    "h",
    "H"
  ],
  XK: [
    "H",
    "hB",
    "h"
  ],
  YE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  YT: [
    "H",
    "hB"
  ],
  ZA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ZM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ZW: [
    "H",
    "h"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-HK": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-IL": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "en-MY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ]
};
function Oc(i, e) {
  for (var t = "", s = 0; s < i.length; s++) {
    var r = i.charAt(s);
    if (r === "j") {
      for (var n = 0; s + 1 < i.length && i.charAt(s + 1) === r; )
        n++, s++;
      var a = 1 + (n & 1), o = n < 2 ? 1 : 3 + (n >> 1), u = "a", l = Mc(e);
      for ((l == "H" || l == "k") && (o = 0); o-- > 0; )
        t += u;
      for (; a-- > 0; )
        t = l + t;
    } else r === "J" ? t += "H" : t += r;
  }
  return t;
}
function Mc(i) {
  var e = i.hourCycle;
  if (e === void 0 && // @ts-ignore hourCycle(s) is not identified yet
  i.hourCycles && // @ts-ignore
  i.hourCycles.length && (e = i.hourCycles[0]), e)
    switch (e) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  var t = i.language, s;
  t !== "root" && (s = i.maximize().region);
  var r = Ts[s || ""] || Ts[t || ""] || Ts["".concat(t, "-001")] || Ts["001"];
  return r[0];
}
var Ci, Fc = new RegExp("^".concat(jo.source, "*")), Nc = new RegExp("".concat(jo.source, "*$"));
function ee(i, e) {
  return { start: i, end: e };
}
var Bc = !!String.prototype.startsWith && "_a".startsWith("a", 1), Uc = !!String.fromCodePoint, $c = !!Object.fromEntries, Gc = !!String.prototype.codePointAt, Hc = !!String.prototype.trimStart, Vc = !!String.prototype.trimEnd, Kc = !!Number.isSafeInteger, Wc = Kc ? Number.isSafeInteger : function(i) {
  return typeof i == "number" && isFinite(i) && Math.floor(i) === i && Math.abs(i) <= 9007199254740991;
}, hr = !0;
try {
  var Yc = Zo("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  hr = ((Ci = Yc.exec("a")) === null || Ci === void 0 ? void 0 : Ci[0]) === "a";
} catch {
  hr = !1;
}
var Kn = Bc ? (
  // Native
  function(e, t, s) {
    return e.startsWith(t, s);
  }
) : (
  // For IE11
  function(e, t, s) {
    return e.slice(s, s + t.length) === t;
  }
), cr = Uc ? String.fromCodePoint : (
  // IE11
  function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    for (var s = "", r = e.length, n = 0, a; r > n; ) {
      if (a = e[n++], a > 1114111)
        throw RangeError(a + " is not a valid code point");
      s += a < 65536 ? String.fromCharCode(a) : String.fromCharCode(((a -= 65536) >> 10) + 55296, a % 1024 + 56320);
    }
    return s;
  }
), Wn = (
  // native
  $c ? Object.fromEntries : (
    // Ponyfill
    function(e) {
      for (var t = {}, s = 0, r = e; s < r.length; s++) {
        var n = r[s], a = n[0], o = n[1];
        t[a] = o;
      }
      return t;
    }
  )
), Qo = Gc ? (
  // Native
  function(e, t) {
    return e.codePointAt(t);
  }
) : (
  // IE 11
  function(e, t) {
    var s = e.length;
    if (!(t < 0 || t >= s)) {
      var r = e.charCodeAt(t), n;
      return r < 55296 || r > 56319 || t + 1 === s || (n = e.charCodeAt(t + 1)) < 56320 || n > 57343 ? r : (r - 55296 << 10) + (n - 56320) + 65536;
    }
  }
), jc = Hc ? (
  // Native
  function(e) {
    return e.trimStart();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(Fc, "");
  }
), qc = Vc ? (
  // Native
  function(e) {
    return e.trimEnd();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(Nc, "");
  }
);
function Zo(i, e) {
  return new RegExp(i, e);
}
var dr;
if (hr) {
  var Yn = Zo("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  dr = function(e, t) {
    var s;
    Yn.lastIndex = t;
    var r = Yn.exec(e);
    return (s = r[1]) !== null && s !== void 0 ? s : "";
  };
} else
  dr = function(e, t) {
    for (var s = []; ; ) {
      var r = Qo(e, t);
      if (r === void 0 || Jo(r) || Zc(r))
        break;
      s.push(r), t += r >= 65536 ? 2 : 1;
    }
    return cr.apply(void 0, s);
  };
var Xc = (
  /** @class */
  (function() {
    function i(e, t) {
      t === void 0 && (t = {}), this.message = e, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!t.ignoreTag, this.locale = t.locale, this.requiresOtherClause = !!t.requiresOtherClause, this.shouldParseSkeletons = !!t.shouldParseSkeletons;
    }
    return i.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, i.prototype.parseMessage = function(e, t, s) {
      for (var r = []; !this.isEOF(); ) {
        var n = this.char();
        if (n === 123) {
          var a = this.parseArgument(e, s);
          if (a.err)
            return a;
          r.push(a.val);
        } else {
          if (n === 125 && e > 0)
            break;
          if (n === 35 && (t === "plural" || t === "selectordinal")) {
            var o = this.clonePosition();
            this.bump(), r.push({
              type: ue.pound,
              location: ee(o, this.clonePosition())
            });
          } else if (n === 60 && !this.ignoreTag && this.peek() === 47) {
            if (s)
              break;
            return this.error(J.UNMATCHED_CLOSING_TAG, ee(this.clonePosition(), this.clonePosition()));
          } else if (n === 60 && !this.ignoreTag && fr(this.peek() || 0)) {
            var a = this.parseTag(e, t);
            if (a.err)
              return a;
            r.push(a.val);
          } else {
            var a = this.parseLiteral(e, t);
            if (a.err)
              return a;
            r.push(a.val);
          }
        }
      }
      return { val: r, err: null };
    }, i.prototype.parseTag = function(e, t) {
      var s = this.clonePosition();
      this.bump();
      var r = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: ue.literal,
            value: "<".concat(r, "/>"),
            location: ee(s, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var n = this.parseMessage(e + 1, t, !0);
        if (n.err)
          return n;
        var a = n.val, o = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !fr(this.char()))
            return this.error(J.INVALID_TAG, ee(o, this.clonePosition()));
          var u = this.clonePosition(), l = this.parseTagName();
          return r !== l ? this.error(J.UNMATCHED_CLOSING_TAG, ee(u, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: ue.tag,
              value: r,
              children: a,
              location: ee(s, this.clonePosition())
            },
            err: null
          } : this.error(J.INVALID_TAG, ee(o, this.clonePosition())));
        } else
          return this.error(J.UNCLOSED_TAG, ee(s, this.clonePosition()));
      } else
        return this.error(J.INVALID_TAG, ee(s, this.clonePosition()));
    }, i.prototype.parseTagName = function() {
      var e = this.offset();
      for (this.bump(); !this.isEOF() && Qc(this.char()); )
        this.bump();
      return this.message.slice(e, this.offset());
    }, i.prototype.parseLiteral = function(e, t) {
      for (var s = this.clonePosition(), r = ""; ; ) {
        var n = this.tryParseQuote(t);
        if (n) {
          r += n;
          continue;
        }
        var a = this.tryParseUnquoted(e, t);
        if (a) {
          r += a;
          continue;
        }
        var o = this.tryParseLeftAngleBracket();
        if (o) {
          r += o;
          continue;
        }
        break;
      }
      var u = ee(s, this.clonePosition());
      return {
        val: { type: ue.literal, value: r, location: u },
        err: null
      };
    }, i.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !zc(this.peek() || 0)) ? (this.bump(), "<") : null;
    }, i.prototype.tryParseQuote = function(e) {
      if (this.isEOF() || this.char() !== 39)
        return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        // '{', '<', '>', '}'
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if (e === "plural" || e === "selectordinal")
            break;
          return null;
        default:
          return null;
      }
      this.bump();
      var t = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var s = this.char();
        if (s === 39)
          if (this.peek() === 39)
            t.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          t.push(s);
        this.bump();
      }
      return cr.apply(void 0, t);
    }, i.prototype.tryParseUnquoted = function(e, t) {
      if (this.isEOF())
        return null;
      var s = this.char();
      return s === 60 || s === 123 || s === 35 && (t === "plural" || t === "selectordinal") || s === 125 && e > 0 ? null : (this.bump(), cr(s));
    }, i.prototype.parseArgument = function(e, t) {
      var s = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, ee(s, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(J.EMPTY_ARGUMENT, ee(s, this.clonePosition()));
      var r = this.parseIdentifierIfPossible().value;
      if (!r)
        return this.error(J.MALFORMED_ARGUMENT, ee(s, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, ee(s, this.clonePosition()));
      switch (this.char()) {
        // Simple argument: `{name}`
        case 125:
          return this.bump(), {
            val: {
              type: ue.argument,
              // value does not include the opening and closing braces.
              value: r,
              location: ee(s, this.clonePosition())
            },
            err: null
          };
        // Argument with options: `{name, format, ...}`
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, ee(s, this.clonePosition())) : this.parseArgumentOptions(e, t, r, s);
        default:
          return this.error(J.MALFORMED_ARGUMENT, ee(s, this.clonePosition()));
      }
    }, i.prototype.parseIdentifierIfPossible = function() {
      var e = this.clonePosition(), t = this.offset(), s = dr(this.message, t), r = t + s.length;
      this.bumpTo(r);
      var n = this.clonePosition(), a = ee(e, n);
      return { value: s, location: a };
    }, i.prototype.parseArgumentOptions = function(e, t, s, r) {
      var n, a = this.clonePosition(), o = this.parseIdentifierIfPossible().value, u = this.clonePosition();
      switch (o) {
        case "":
          return this.error(J.EXPECT_ARGUMENT_TYPE, ee(a, u));
        case "number":
        case "date":
        case "time": {
          this.bumpSpace();
          var l = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var h = this.clonePosition(), c = this.parseSimpleArgStyleIfPossible();
            if (c.err)
              return c;
            var d = qc(c.val);
            if (d.length === 0)
              return this.error(J.EXPECT_ARGUMENT_STYLE, ee(this.clonePosition(), this.clonePosition()));
            var g = ee(h, this.clonePosition());
            l = { style: d, styleLocation: g };
          }
          var f = this.tryParseArgumentClose(r);
          if (f.err)
            return f;
          var m = ee(r, this.clonePosition());
          if (l && Kn(l?.style, "::", 0)) {
            var p = jc(l.style.slice(2));
            if (o === "number") {
              var c = this.parseNumberSkeletonFromString(p, l.styleLocation);
              return c.err ? c : {
                val: { type: ue.number, value: s, location: m, style: c.val },
                err: null
              };
            } else {
              if (p.length === 0)
                return this.error(J.EXPECT_DATE_TIME_SKELETON, m);
              var y = p;
              this.locale && (y = Oc(p, this.locale));
              var d = {
                type: Ht.dateTime,
                pattern: y,
                location: l.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? Rc(y) : {}
              }, v = o === "date" ? ue.date : ue.time;
              return {
                val: { type: v, value: s, location: m, style: d },
                err: null
              };
            }
          }
          return {
            val: {
              type: o === "number" ? ue.number : o === "date" ? ue.date : ue.time,
              value: s,
              location: m,
              style: (n = l?.style) !== null && n !== void 0 ? n : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var T = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(J.EXPECT_SELECT_ARGUMENT_OPTIONS, ee(T, se({}, T)));
          this.bumpSpace();
          var S = this.parseIdentifierIfPossible(), x = 0;
          if (o !== "select" && S.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(J.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ee(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var c = this.tryParseDecimalInteger(J.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, J.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (c.err)
              return c;
            this.bumpSpace(), S = this.parseIdentifierIfPossible(), x = c.val;
          }
          var L = this.tryParsePluralOrSelectOptions(e, o, t, S);
          if (L.err)
            return L;
          var f = this.tryParseArgumentClose(r);
          if (f.err)
            return f;
          var A = ee(r, this.clonePosition());
          return o === "select" ? {
            val: {
              type: ue.select,
              value: s,
              options: Wn(L.val),
              location: A
            },
            err: null
          } : {
            val: {
              type: ue.plural,
              value: s,
              options: Wn(L.val),
              offset: x,
              pluralType: o === "plural" ? "cardinal" : "ordinal",
              location: A
            },
            err: null
          };
        }
        default:
          return this.error(J.INVALID_ARGUMENT_TYPE, ee(a, u));
      }
    }, i.prototype.tryParseArgumentClose = function(e) {
      return this.isEOF() || this.char() !== 125 ? this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, ee(e, this.clonePosition())) : (this.bump(), { val: !0, err: null });
    }, i.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var e = 0, t = this.clonePosition(); !this.isEOF(); ) {
        var s = this.char();
        switch (s) {
          case 39: {
            this.bump();
            var r = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(J.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, ee(r, this.clonePosition()));
            this.bump();
            break;
          }
          case 123: {
            e += 1, this.bump();
            break;
          }
          case 125: {
            if (e > 0)
              e -= 1;
            else
              return {
                val: this.message.slice(t.offset, this.offset()),
                err: null
              };
            break;
          }
          default:
            this.bump();
            break;
        }
      }
      return {
        val: this.message.slice(t.offset, this.offset()),
        err: null
      };
    }, i.prototype.parseNumberSkeletonFromString = function(e, t) {
      var s = [];
      try {
        s = Dc(e);
      } catch {
        return this.error(J.INVALID_NUMBER_SKELETON, t);
      }
      return {
        val: {
          type: Ht.number,
          tokens: s,
          location: t,
          parsedOptions: this.shouldParseSkeletons ? wc(s) : {}
        },
        err: null
      };
    }, i.prototype.tryParsePluralOrSelectOptions = function(e, t, s, r) {
      for (var n, a = !1, o = [], u = /* @__PURE__ */ new Set(), l = r.value, h = r.location; ; ) {
        if (l.length === 0) {
          var c = this.clonePosition();
          if (t !== "select" && this.bumpIf("=")) {
            var d = this.tryParseDecimalInteger(J.EXPECT_PLURAL_ARGUMENT_SELECTOR, J.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (d.err)
              return d;
            h = ee(c, this.clonePosition()), l = this.message.slice(c.offset, this.offset());
          } else
            break;
        }
        if (u.has(l))
          return this.error(t === "select" ? J.DUPLICATE_SELECT_ARGUMENT_SELECTOR : J.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, h);
        l === "other" && (a = !0), this.bumpSpace();
        var g = this.clonePosition();
        if (!this.bumpIf("{"))
          return this.error(t === "select" ? J.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : J.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, ee(this.clonePosition(), this.clonePosition()));
        var f = this.parseMessage(e + 1, t, s);
        if (f.err)
          return f;
        var m = this.tryParseArgumentClose(g);
        if (m.err)
          return m;
        o.push([
          l,
          {
            value: f.val,
            location: ee(g, this.clonePosition())
          }
        ]), u.add(l), this.bumpSpace(), n = this.parseIdentifierIfPossible(), l = n.value, h = n.location;
      }
      return o.length === 0 ? this.error(t === "select" ? J.EXPECT_SELECT_ARGUMENT_SELECTOR : J.EXPECT_PLURAL_ARGUMENT_SELECTOR, ee(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !a ? this.error(J.MISSING_OTHER_CLAUSE, ee(this.clonePosition(), this.clonePosition())) : { val: o, err: null };
    }, i.prototype.tryParseDecimalInteger = function(e, t) {
      var s = 1, r = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (s = -1);
      for (var n = !1, a = 0; !this.isEOF(); ) {
        var o = this.char();
        if (o >= 48 && o <= 57)
          n = !0, a = a * 10 + (o - 48), this.bump();
        else
          break;
      }
      var u = ee(r, this.clonePosition());
      return n ? (a *= s, Wc(a) ? { val: a, err: null } : this.error(t, u)) : this.error(e, u);
    }, i.prototype.offset = function() {
      return this.position.offset;
    }, i.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    }, i.prototype.clonePosition = function() {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, i.prototype.char = function() {
      var e = this.position.offset;
      if (e >= this.message.length)
        throw Error("out of bound");
      var t = Qo(this.message, e);
      if (t === void 0)
        throw Error("Offset ".concat(e, " is at invalid UTF-16 code unit boundary"));
      return t;
    }, i.prototype.error = function(e, t) {
      return {
        val: null,
        err: {
          kind: e,
          message: this.message,
          location: t
        }
      };
    }, i.prototype.bump = function() {
      if (!this.isEOF()) {
        var e = this.char();
        e === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e < 65536 ? 1 : 2);
      }
    }, i.prototype.bumpIf = function(e) {
      if (Kn(this.message, e, this.offset())) {
        for (var t = 0; t < e.length; t++)
          this.bump();
        return !0;
      }
      return !1;
    }, i.prototype.bumpUntil = function(e) {
      var t = this.offset(), s = this.message.indexOf(e, t);
      return s >= 0 ? (this.bumpTo(s), !0) : (this.bumpTo(this.message.length), !1);
    }, i.prototype.bumpTo = function(e) {
      if (this.offset() > e)
        throw Error("targetOffset ".concat(e, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (e = Math.min(e, this.message.length); ; ) {
        var t = this.offset();
        if (t === e)
          break;
        if (t > e)
          throw Error("targetOffset ".concat(e, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF())
          break;
      }
    }, i.prototype.bumpSpace = function() {
      for (; !this.isEOF() && Jo(this.char()); )
        this.bump();
    }, i.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var e = this.char(), t = this.offset(), s = this.message.charCodeAt(t + (e >= 65536 ? 2 : 1));
      return s ?? null;
    }, i;
  })()
);
function fr(i) {
  return i >= 97 && i <= 122 || i >= 65 && i <= 90;
}
function zc(i) {
  return fr(i) || i === 47;
}
function Qc(i) {
  return i === 45 || i === 46 || i >= 48 && i <= 57 || i === 95 || i >= 97 && i <= 122 || i >= 65 && i <= 90 || i == 183 || i >= 192 && i <= 214 || i >= 216 && i <= 246 || i >= 248 && i <= 893 || i >= 895 && i <= 8191 || i >= 8204 && i <= 8205 || i >= 8255 && i <= 8256 || i >= 8304 && i <= 8591 || i >= 11264 && i <= 12271 || i >= 12289 && i <= 55295 || i >= 63744 && i <= 64975 || i >= 65008 && i <= 65533 || i >= 65536 && i <= 983039;
}
function Jo(i) {
  return i >= 9 && i <= 13 || i === 32 || i === 133 || i >= 8206 && i <= 8207 || i === 8232 || i === 8233;
}
function Zc(i) {
  return i >= 33 && i <= 35 || i === 36 || i >= 37 && i <= 39 || i === 40 || i === 41 || i === 42 || i === 43 || i === 44 || i === 45 || i >= 46 && i <= 47 || i >= 58 && i <= 59 || i >= 60 && i <= 62 || i >= 63 && i <= 64 || i === 91 || i === 92 || i === 93 || i === 94 || i === 96 || i === 123 || i === 124 || i === 125 || i === 126 || i === 161 || i >= 162 && i <= 165 || i === 166 || i === 167 || i === 169 || i === 171 || i === 172 || i === 174 || i === 176 || i === 177 || i === 182 || i === 187 || i === 191 || i === 215 || i === 247 || i >= 8208 && i <= 8213 || i >= 8214 && i <= 8215 || i === 8216 || i === 8217 || i === 8218 || i >= 8219 && i <= 8220 || i === 8221 || i === 8222 || i === 8223 || i >= 8224 && i <= 8231 || i >= 8240 && i <= 8248 || i === 8249 || i === 8250 || i >= 8251 && i <= 8254 || i >= 8257 && i <= 8259 || i === 8260 || i === 8261 || i === 8262 || i >= 8263 && i <= 8273 || i === 8274 || i === 8275 || i >= 8277 && i <= 8286 || i >= 8592 && i <= 8596 || i >= 8597 && i <= 8601 || i >= 8602 && i <= 8603 || i >= 8604 && i <= 8607 || i === 8608 || i >= 8609 && i <= 8610 || i === 8611 || i >= 8612 && i <= 8613 || i === 8614 || i >= 8615 && i <= 8621 || i === 8622 || i >= 8623 && i <= 8653 || i >= 8654 && i <= 8655 || i >= 8656 && i <= 8657 || i === 8658 || i === 8659 || i === 8660 || i >= 8661 && i <= 8691 || i >= 8692 && i <= 8959 || i >= 8960 && i <= 8967 || i === 8968 || i === 8969 || i === 8970 || i === 8971 || i >= 8972 && i <= 8991 || i >= 8992 && i <= 8993 || i >= 8994 && i <= 9e3 || i === 9001 || i === 9002 || i >= 9003 && i <= 9083 || i === 9084 || i >= 9085 && i <= 9114 || i >= 9115 && i <= 9139 || i >= 9140 && i <= 9179 || i >= 9180 && i <= 9185 || i >= 9186 && i <= 9254 || i >= 9255 && i <= 9279 || i >= 9280 && i <= 9290 || i >= 9291 && i <= 9311 || i >= 9472 && i <= 9654 || i === 9655 || i >= 9656 && i <= 9664 || i === 9665 || i >= 9666 && i <= 9719 || i >= 9720 && i <= 9727 || i >= 9728 && i <= 9838 || i === 9839 || i >= 9840 && i <= 10087 || i === 10088 || i === 10089 || i === 10090 || i === 10091 || i === 10092 || i === 10093 || i === 10094 || i === 10095 || i === 10096 || i === 10097 || i === 10098 || i === 10099 || i === 10100 || i === 10101 || i >= 10132 && i <= 10175 || i >= 10176 && i <= 10180 || i === 10181 || i === 10182 || i >= 10183 && i <= 10213 || i === 10214 || i === 10215 || i === 10216 || i === 10217 || i === 10218 || i === 10219 || i === 10220 || i === 10221 || i === 10222 || i === 10223 || i >= 10224 && i <= 10239 || i >= 10240 && i <= 10495 || i >= 10496 && i <= 10626 || i === 10627 || i === 10628 || i === 10629 || i === 10630 || i === 10631 || i === 10632 || i === 10633 || i === 10634 || i === 10635 || i === 10636 || i === 10637 || i === 10638 || i === 10639 || i === 10640 || i === 10641 || i === 10642 || i === 10643 || i === 10644 || i === 10645 || i === 10646 || i === 10647 || i === 10648 || i >= 10649 && i <= 10711 || i === 10712 || i === 10713 || i === 10714 || i === 10715 || i >= 10716 && i <= 10747 || i === 10748 || i === 10749 || i >= 10750 && i <= 11007 || i >= 11008 && i <= 11055 || i >= 11056 && i <= 11076 || i >= 11077 && i <= 11078 || i >= 11079 && i <= 11084 || i >= 11085 && i <= 11123 || i >= 11124 && i <= 11125 || i >= 11126 && i <= 11157 || i === 11158 || i >= 11159 && i <= 11263 || i >= 11776 && i <= 11777 || i === 11778 || i === 11779 || i === 11780 || i === 11781 || i >= 11782 && i <= 11784 || i === 11785 || i === 11786 || i === 11787 || i === 11788 || i === 11789 || i >= 11790 && i <= 11798 || i === 11799 || i >= 11800 && i <= 11801 || i === 11802 || i === 11803 || i === 11804 || i === 11805 || i >= 11806 && i <= 11807 || i === 11808 || i === 11809 || i === 11810 || i === 11811 || i === 11812 || i === 11813 || i === 11814 || i === 11815 || i === 11816 || i === 11817 || i >= 11818 && i <= 11822 || i === 11823 || i >= 11824 && i <= 11833 || i >= 11834 && i <= 11835 || i >= 11836 && i <= 11839 || i === 11840 || i === 11841 || i === 11842 || i >= 11843 && i <= 11855 || i >= 11856 && i <= 11857 || i === 11858 || i >= 11859 && i <= 11903 || i >= 12289 && i <= 12291 || i === 12296 || i === 12297 || i === 12298 || i === 12299 || i === 12300 || i === 12301 || i === 12302 || i === 12303 || i === 12304 || i === 12305 || i >= 12306 && i <= 12307 || i === 12308 || i === 12309 || i === 12310 || i === 12311 || i === 12312 || i === 12313 || i === 12314 || i === 12315 || i === 12316 || i === 12317 || i >= 12318 && i <= 12319 || i === 12320 || i === 12336 || i === 64830 || i === 64831 || i >= 65093 && i <= 65094;
}
function gr(i) {
  i.forEach(function(e) {
    if (delete e.location, Vo(e) || Ko(e))
      for (var t in e.options)
        delete e.options[t].location, gr(e.options[t].value);
    else $o(e) && Yo(e.style) || (Go(e) || Ho(e)) && ur(e.style) ? delete e.style.location : Wo(e) && gr(e.children);
  });
}
function Jc(i, e) {
  e === void 0 && (e = {}), e = se({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, e);
  var t = new Xc(i, e).parse();
  if (t.err) {
    var s = SyntaxError(J[t.err.kind]);
    throw s.location = t.err.location, s.originalMessage = t.err.message, s;
  }
  return e?.captureLocation || gr(t.val), t.val;
}
var Vt;
(function(i) {
  i.MISSING_VALUE = "MISSING_VALUE", i.INVALID_VALUE = "INVALID_VALUE", i.MISSING_INTL_API = "MISSING_INTL_API";
})(Vt || (Vt = {}));
var fi = (
  /** @class */
  (function(i) {
    di(e, i);
    function e(t, s, r) {
      var n = i.call(this, t) || this;
      return n.code = s, n.originalMessage = r, n;
    }
    return e.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, e;
  })(Error)
), jn = (
  /** @class */
  (function(i) {
    di(e, i);
    function e(t, s, r, n) {
      return i.call(this, 'Invalid values for "'.concat(t, '": "').concat(s, '". Options are "').concat(Object.keys(r).join('", "'), '"'), Vt.INVALID_VALUE, n) || this;
    }
    return e;
  })(fi)
), ed = (
  /** @class */
  (function(i) {
    di(e, i);
    function e(t, s, r) {
      return i.call(this, 'Value for "'.concat(t, '" must be of type ').concat(s), Vt.INVALID_VALUE, r) || this;
    }
    return e;
  })(fi)
), td = (
  /** @class */
  (function(i) {
    di(e, i);
    function e(t, s) {
      return i.call(this, 'The intl string context variable "'.concat(t, '" was not provided to the string "').concat(s, '"'), Vt.MISSING_VALUE, s) || this;
    }
    return e;
  })(fi)
), Ie;
(function(i) {
  i[i.literal = 0] = "literal", i[i.object = 1] = "object";
})(Ie || (Ie = {}));
function sd(i) {
  return i.length < 2 ? i : i.reduce(function(e, t) {
    var s = e[e.length - 1];
    return !s || s.type !== Ie.literal || t.type !== Ie.literal ? e.push(t) : s.value += t.value, e;
  }, []);
}
function id(i) {
  return typeof i == "function";
}
function Ns(i, e, t, s, r, n, a) {
  if (i.length === 1 && $n(i[0]))
    return [
      {
        type: Ie.literal,
        value: i[0].value
      }
    ];
  for (var o = [], u = 0, l = i; u < l.length; u++) {
    var h = l[u];
    if ($n(h)) {
      o.push({
        type: Ie.literal,
        value: h.value
      });
      continue;
    }
    if (bc(h)) {
      typeof n == "number" && o.push({
        type: Ie.literal,
        value: t.getNumberFormat(e).format(n)
      });
      continue;
    }
    var c = h.value;
    if (!(r && c in r))
      throw new td(c, a);
    var d = r[c];
    if (Ic(h)) {
      (!d || typeof d == "string" || typeof d == "number") && (d = typeof d == "string" || typeof d == "number" ? String(d) : ""), o.push({
        type: typeof d == "string" ? Ie.literal : Ie.object,
        value: d
      });
      continue;
    }
    if (Go(h)) {
      var g = typeof h.style == "string" ? s.date[h.style] : ur(h.style) ? h.style.parsedOptions : void 0;
      o.push({
        type: Ie.literal,
        value: t.getDateTimeFormat(e, g).format(d)
      });
      continue;
    }
    if (Ho(h)) {
      var g = typeof h.style == "string" ? s.time[h.style] : ur(h.style) ? h.style.parsedOptions : s.time.medium;
      o.push({
        type: Ie.literal,
        value: t.getDateTimeFormat(e, g).format(d)
      });
      continue;
    }
    if ($o(h)) {
      var g = typeof h.style == "string" ? s.number[h.style] : Yo(h.style) ? h.style.parsedOptions : void 0;
      g && g.scale && (d = d * (g.scale || 1)), o.push({
        type: Ie.literal,
        value: t.getNumberFormat(e, g).format(d)
      });
      continue;
    }
    if (Wo(h)) {
      var f = h.children, m = h.value, p = r[m];
      if (!id(p))
        throw new ed(m, "function", a);
      var y = Ns(f, e, t, s, r, n), v = p(y.map(function(x) {
        return x.value;
      }));
      Array.isArray(v) || (v = [v]), o.push.apply(o, v.map(function(x) {
        return {
          type: typeof x == "string" ? Ie.literal : Ie.object,
          value: x
        };
      }));
    }
    if (Vo(h)) {
      var T = h.options[d] || h.options.other;
      if (!T)
        throw new jn(h.value, d, Object.keys(h.options), a);
      o.push.apply(o, Ns(T.value, e, t, s, r));
      continue;
    }
    if (Ko(h)) {
      var T = h.options["=".concat(d)];
      if (!T) {
        if (!Intl.PluralRules)
          throw new fi(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Vt.MISSING_INTL_API, a);
        var S = t.getPluralRules(e, { type: h.pluralType }).select(d - (h.offset || 0));
        T = h.options[S] || h.options.other;
      }
      if (!T)
        throw new jn(h.value, d, Object.keys(h.options), a);
      o.push.apply(o, Ns(T.value, e, t, s, r, d - (h.offset || 0)));
      continue;
    }
  }
  return sd(o);
}
function rd(i, e) {
  return e ? se(se(se({}, i || {}), e || {}), Object.keys(i).reduce(function(t, s) {
    return t[s] = se(se({}, i[s]), e[s] || {}), t;
  }, {})) : i;
}
function nd(i, e) {
  return e ? Object.keys(i).reduce(function(t, s) {
    return t[s] = rd(i[s], e[s]), t;
  }, se({}, i)) : i;
}
function Pi(i) {
  return {
    create: function() {
      return {
        get: function(e) {
          return i[e];
        },
        set: function(e, t) {
          i[e] = t;
        }
      };
    }
  };
}
function ad(i) {
  return i === void 0 && (i = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: _i(function() {
      for (var e, t = [], s = 0; s < arguments.length; s++)
        t[s] = arguments[s];
      return new ((e = Intl.NumberFormat).bind.apply(e, Ri([void 0], t, !1)))();
    }, {
      cache: Pi(i.number),
      strategy: Di.variadic
    }),
    getDateTimeFormat: _i(function() {
      for (var e, t = [], s = 0; s < arguments.length; s++)
        t[s] = arguments[s];
      return new ((e = Intl.DateTimeFormat).bind.apply(e, Ri([void 0], t, !1)))();
    }, {
      cache: Pi(i.dateTime),
      strategy: Di.variadic
    }),
    getPluralRules: _i(function() {
      for (var e, t = [], s = 0; s < arguments.length; s++)
        t[s] = arguments[s];
      return new ((e = Intl.PluralRules).bind.apply(e, Ri([void 0], t, !1)))();
    }, {
      cache: Pi(i.pluralRules),
      strategy: Di.variadic
    })
  };
}
var od = (
  /** @class */
  (function() {
    function i(e, t, s, r) {
      t === void 0 && (t = i.defaultLocale);
      var n = this;
      if (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(u) {
        var l = n.formatToParts(u);
        if (l.length === 1)
          return l[0].value;
        var h = l.reduce(function(c, d) {
          return !c.length || d.type !== Ie.literal || typeof c[c.length - 1] != "string" ? c.push(d.value) : c[c.length - 1] += d.value, c;
        }, []);
        return h.length <= 1 ? h[0] || "" : h;
      }, this.formatToParts = function(u) {
        return Ns(n.ast, n.locales, n.formatters, n.formats, u, void 0, n.message);
      }, this.resolvedOptions = function() {
        var u;
        return {
          locale: ((u = n.resolvedLocale) === null || u === void 0 ? void 0 : u.toString()) || Intl.NumberFormat.supportedLocalesOf(n.locales)[0]
        };
      }, this.getAst = function() {
        return n.ast;
      }, this.locales = t, this.resolvedLocale = i.resolveLocale(t), typeof e == "string") {
        if (this.message = e, !i.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var a = r || {};
        a.formatters;
        var o = pc(a, ["formatters"]);
        this.ast = i.__parse(e, se(se({}, o), { locale: this.resolvedLocale }));
      } else
        this.ast = e;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = nd(i.formats, s), this.formatters = r && r.formatters || ad(this.formatterCache);
    }
    return Object.defineProperty(i, "defaultLocale", {
      get: function() {
        return i.memoizedDefaultLocale || (i.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), i.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), i.memoizedDefaultLocale = null, i.resolveLocale = function(e) {
      if (!(typeof Intl.Locale > "u")) {
        var t = Intl.NumberFormat.supportedLocalesOf(e);
        return t.length > 0 ? new Intl.Locale(t[0]) : new Intl.Locale(typeof e == "string" ? e : e[0]);
      }
    }, i.__parse = Jc, i.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0
        },
        currency: {
          style: "currency"
        },
        percent: {
          style: "percent"
        }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    }, i;
  })()
);
function ld(i, e) {
  if (e == null)
    return;
  if (e in i)
    return i[e];
  const t = e.split(".");
  let s = i;
  for (let r = 0; r < t.length; r++)
    if (typeof s == "object") {
      if (r > 0) {
        const n = t.slice(r, t.length).join(".");
        if (n in s) {
          s = s[n];
          break;
        }
      }
      s = s[t[r]];
    } else
      s = void 0;
  return s;
}
const ut = {}, ud = (i, e, t) => t && (e in ut || (ut[e] = {}), i in ut[e] || (ut[e][i] = t), t), el = (i, e) => {
  if (e == null)
    return;
  if (e in ut && i in ut[e])
    return ut[e][i];
  const t = gi(e);
  for (let s = 0; s < t.length; s++) {
    const r = t[s], n = cd(r, i);
    if (n)
      return ud(i, e, n);
  }
};
let qr;
const ms = hi({});
function hd(i) {
  return qr[i] || null;
}
function tl(i) {
  return i in qr;
}
function cd(i, e) {
  if (!tl(i))
    return null;
  const t = hd(i);
  return ld(t, e);
}
function dd(i) {
  if (i == null)
    return;
  const e = gi(i);
  for (let t = 0; t < e.length; t++) {
    const s = e[t];
    if (tl(s))
      return s;
  }
}
function fd(i, ...e) {
  delete ut[i], ms.update((t) => (t[i] = mc.all([t[i] || {}, ...e]), t));
}
jt(
  [ms],
  ([i]) => Object.keys(i)
);
ms.subscribe((i) => qr = i);
const Bs = {};
function gd(i, e) {
  Bs[i].delete(e), Bs[i].size === 0 && delete Bs[i];
}
function sl(i) {
  return Bs[i];
}
function md(i) {
  return gi(i).map((e) => {
    const t = sl(e);
    return [e, t ? [...t] : []];
  }).filter(([, e]) => e.length > 0);
}
function mr(i) {
  return i == null ? !1 : gi(i).some(
    (e) => {
      var t;
      return (t = sl(e)) == null ? void 0 : t.size;
    }
  );
}
function pd(i, e) {
  return Promise.all(
    e.map((s) => (gd(i, s), s().then((r) => r.default || r)))
  ).then((s) => fd(i, ...s));
}
const Jt = {};
function il(i) {
  if (!mr(i))
    return i in Jt ? Jt[i] : Promise.resolve();
  const e = md(i);
  return Jt[i] = Promise.all(
    e.map(
      ([t, s]) => pd(t, s)
    )
  ).then(() => {
    if (mr(i))
      return il(i);
    delete Jt[i];
  }), Jt[i];
}
const Ed = {
  number: {
    scientific: { notation: "scientific" },
    engineering: { notation: "engineering" },
    compactLong: { notation: "compact", compactDisplay: "long" },
    compactShort: { notation: "compact", compactDisplay: "short" }
  },
  date: {
    short: { month: "numeric", day: "numeric", year: "2-digit" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  },
  time: {
    short: { hour: "numeric", minute: "numeric" },
    medium: { hour: "numeric", minute: "numeric", second: "numeric" },
    long: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    },
    full: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    }
  }
}, yd = {
  fallbackLocale: null,
  loadingDelay: 200,
  formats: Ed,
  warnOnMissingMessages: !0,
  handleMissingMessage: void 0,
  ignoreTag: !0
}, vd = yd;
function Kt() {
  return vd;
}
const ki = hi(!1);
var Td = Object.defineProperty, Sd = Object.defineProperties, xd = Object.getOwnPropertyDescriptors, qn = Object.getOwnPropertySymbols, Ad = Object.prototype.hasOwnProperty, Id = Object.prototype.propertyIsEnumerable, Xn = (i, e, t) => e in i ? Td(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, bd = (i, e) => {
  for (var t in e || (e = {}))
    Ad.call(e, t) && Xn(i, t, e[t]);
  if (qn)
    for (var t of qn(e))
      Id.call(e, t) && Xn(i, t, e[t]);
  return i;
}, Ld = (i, e) => Sd(i, xd(e));
let pr;
const zs = hi(null);
function zn(i) {
  return i.split("-").map((e, t, s) => s.slice(0, t + 1).join("-")).reverse();
}
function gi(i, e = Kt().fallbackLocale) {
  const t = zn(i);
  return e ? [.../* @__PURE__ */ new Set([...t, ...zn(e)])] : t;
}
function bt() {
  return pr ?? void 0;
}
zs.subscribe((i) => {
  pr = i ?? void 0, typeof window < "u" && i != null && document.documentElement.setAttribute("lang", i);
});
const Rd = (i) => {
  if (i && dd(i) && mr(i)) {
    const { loadingDelay: e } = Kt();
    let t;
    return typeof window < "u" && bt() != null && e ? t = window.setTimeout(
      () => ki.set(!0),
      e
    ) : ki.set(!0), il(i).then(() => {
      zs.set(i);
    }).finally(() => {
      clearTimeout(t), ki.set(!1);
    });
  }
  return zs.set(i);
}, ps = Ld(bd({}, zs), {
  set: Rd
}), mi = (i) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (s) => {
    const r = JSON.stringify(s);
    return r in e ? e[r] : e[r] = i(s);
  };
};
var _d = Object.defineProperty, Qs = Object.getOwnPropertySymbols, rl = Object.prototype.hasOwnProperty, nl = Object.prototype.propertyIsEnumerable, Qn = (i, e, t) => e in i ? _d(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Xr = (i, e) => {
  for (var t in e || (e = {}))
    rl.call(e, t) && Qn(i, t, e[t]);
  if (Qs)
    for (var t of Qs(e))
      nl.call(e, t) && Qn(i, t, e[t]);
  return i;
}, qt = (i, e) => {
  var t = {};
  for (var s in i)
    rl.call(i, s) && e.indexOf(s) < 0 && (t[s] = i[s]);
  if (i != null && Qs)
    for (var s of Qs(i))
      e.indexOf(s) < 0 && nl.call(i, s) && (t[s] = i[s]);
  return t;
};
const as = (i, e) => {
  const { formats: t } = Kt();
  if (i in t && e in t[i])
    return t[i][e];
  throw new Error(`[svelte-i18n] Unknown "${e}" ${i} format.`);
}, Dd = mi(
  (i) => {
    var e = i, { locale: t, format: s } = e, r = qt(e, ["locale", "format"]);
    if (t == null)
      throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
    return s && (r = as("number", s)), new Intl.NumberFormat(t, r);
  }
), Cd = mi(
  (i) => {
    var e = i, { locale: t, format: s } = e, r = qt(e, ["locale", "format"]);
    if (t == null)
      throw new Error('[svelte-i18n] A "locale" must be set to format dates');
    return s ? r = as("date", s) : Object.keys(r).length === 0 && (r = as("date", "short")), new Intl.DateTimeFormat(t, r);
  }
), Pd = mi(
  (i) => {
    var e = i, { locale: t, format: s } = e, r = qt(e, ["locale", "format"]);
    if (t == null)
      throw new Error(
        '[svelte-i18n] A "locale" must be set to format time values'
      );
    return s ? r = as("time", s) : Object.keys(r).length === 0 && (r = as("time", "short")), new Intl.DateTimeFormat(t, r);
  }
), kd = (i = {}) => {
  var e = i, {
    locale: t = bt()
  } = e, s = qt(e, [
    "locale"
  ]);
  return Dd(Xr({ locale: t }, s));
}, wd = (i = {}) => {
  var e = i, {
    locale: t = bt()
  } = e, s = qt(e, [
    "locale"
  ]);
  return Cd(Xr({ locale: t }, s));
}, Od = (i = {}) => {
  var e = i, {
    locale: t = bt()
  } = e, s = qt(e, [
    "locale"
  ]);
  return Pd(Xr({ locale: t }, s));
}, Md = mi(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  (i, e = bt()) => new od(i, e, Kt().formats, {
    ignoreTag: Kt().ignoreTag
  })
), Fd = (i, e = {}) => {
  var t, s, r, n;
  let a = e;
  typeof i == "object" && (a = i, i = a.id);
  const {
    values: o,
    locale: u = bt(),
    default: l
  } = a;
  if (u == null)
    throw new Error(
      "[svelte-i18n] Cannot format a message without first setting the initial locale."
    );
  let h = el(i, u);
  if (!h)
    h = (n = (r = (s = (t = Kt()).handleMissingMessage) == null ? void 0 : s.call(t, { locale: u, id: i, defaultValue: l })) != null ? r : l) != null ? n : i;
  else if (typeof h != "string")
    return console.warn(
      `[svelte-i18n] Message with id "${i}" must be of type "string", found: "${typeof h}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`
    ), h;
  if (!o)
    return h;
  let c = h;
  try {
    c = Md(h, u).format(o);
  } catch (d) {
    d instanceof Error && console.warn(
      `[svelte-i18n] Message "${i}" has syntax error:`,
      d.message
    );
  }
  return c;
}, Nd = (i, e) => Od(e).format(i), Bd = (i, e) => wd(e).format(i), Ud = (i, e) => kd(e).format(i), $d = (i, e = bt()) => el(i, e);
jt([ps, ms], () => Fd);
jt([ps], () => Nd);
jt([ps], () => Bd);
jt([ps], () => Ud);
jt([ps, ms], () => $d);
ui(["click"]);
ui(["click"]);
var Zn;
(function(i) {
  i.LOAD = "LOAD", i.EXEC = "EXEC", i.FFPROBE = "FFPROBE", i.WRITE_FILE = "WRITE_FILE", i.READ_FILE = "READ_FILE", i.DELETE_FILE = "DELETE_FILE", i.RENAME = "RENAME", i.CREATE_DIR = "CREATE_DIR", i.LIST_DIR = "LIST_DIR", i.DELETE_DIR = "DELETE_DIR", i.ERROR = "ERROR", i.DOWNLOAD = "DOWNLOAD", i.PROGRESS = "PROGRESS", i.LOG = "LOG", i.MOUNT = "MOUNT", i.UNMOUNT = "UNMOUNT";
})(Zn || (Zn = {}));
var Jn;
(function(i) {
  i.MEMFS = "MEMFS", i.NODEFS = "NODEFS", i.NODERAWFS = "NODERAWFS", i.IDBFS = "IDBFS", i.WORKERFS = "WORKERFS", i.PROXYFS = "PROXYFS";
})(Jn || (Jn = {}));
function Gd(i, { autoplay: e }) {
  async function t() {
    e && await i.play();
  }
  return i.addEventListener("loadeddata", t), {
    destroy() {
      i.removeEventListener("loadeddata", t);
    }
  };
}
const F = Number.isFinite || function(i) {
  return typeof i == "number" && isFinite(i);
}, Hd = Number.isSafeInteger || function(i) {
  return typeof i == "number" && Math.abs(i) <= Vd;
}, Vd = Number.MAX_SAFE_INTEGER || 9007199254740991;
let V = /* @__PURE__ */ (function(i) {
  return i.NETWORK_ERROR = "networkError", i.MEDIA_ERROR = "mediaError", i.KEY_SYSTEM_ERROR = "keySystemError", i.MUX_ERROR = "muxError", i.OTHER_ERROR = "otherError", i;
})({}), D = /* @__PURE__ */ (function(i) {
  return i.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", i.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", i.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", i.KEY_SYSTEM_NO_CONFIGURED_LICENSE = "keySystemNoConfiguredLicense", i.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", i.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED = "keySystemServerCertificateRequestFailed", i.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED = "keySystemServerCertificateUpdateFailed", i.KEY_SYSTEM_SESSION_UPDATE_FAILED = "keySystemSessionUpdateFailed", i.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED = "keySystemStatusOutputRestricted", i.KEY_SYSTEM_STATUS_INTERNAL_ERROR = "keySystemStatusInternalError", i.KEY_SYSTEM_DESTROY_MEDIA_KEYS_ERROR = "keySystemDestroyMediaKeysError", i.KEY_SYSTEM_DESTROY_CLOSE_SESSION_ERROR = "keySystemDestroyCloseSessionError", i.KEY_SYSTEM_DESTROY_REMOVE_SESSION_ERROR = "keySystemDestroyRemoveSessionError", i.MANIFEST_LOAD_ERROR = "manifestLoadError", i.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", i.MANIFEST_PARSING_ERROR = "manifestParsingError", i.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", i.LEVEL_EMPTY_ERROR = "levelEmptyError", i.LEVEL_LOAD_ERROR = "levelLoadError", i.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", i.LEVEL_PARSING_ERROR = "levelParsingError", i.LEVEL_SWITCH_ERROR = "levelSwitchError", i.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", i.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", i.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", i.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", i.FRAG_LOAD_ERROR = "fragLoadError", i.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", i.FRAG_DECRYPT_ERROR = "fragDecryptError", i.FRAG_PARSING_ERROR = "fragParsingError", i.FRAG_GAP = "fragGap", i.REMUX_ALLOC_ERROR = "remuxAllocError", i.KEY_LOAD_ERROR = "keyLoadError", i.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", i.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", i.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", i.BUFFER_APPEND_ERROR = "bufferAppendError", i.BUFFER_APPENDING_ERROR = "bufferAppendingError", i.BUFFER_STALLED_ERROR = "bufferStalledError", i.BUFFER_FULL_ERROR = "bufferFullError", i.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", i.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", i.ASSET_LIST_LOAD_ERROR = "assetListLoadError", i.ASSET_LIST_LOAD_TIMEOUT = "assetListLoadTimeout", i.ASSET_LIST_PARSING_ERROR = "assetListParsingError", i.INTERSTITIAL_ASSET_ITEM_ERROR = "interstitialAssetItemError", i.INTERNAL_EXCEPTION = "internalException", i.INTERNAL_ABORTED = "aborted", i.ATTACH_MEDIA_ERROR = "attachMediaError", i.UNKNOWN = "unknown", i;
})({}), E = /* @__PURE__ */ (function(i) {
  return i.MEDIA_ATTACHING = "hlsMediaAttaching", i.MEDIA_ATTACHED = "hlsMediaAttached", i.MEDIA_DETACHING = "hlsMediaDetaching", i.MEDIA_DETACHED = "hlsMediaDetached", i.MEDIA_ENDED = "hlsMediaEnded", i.STALL_RESOLVED = "hlsStallResolved", i.BUFFER_RESET = "hlsBufferReset", i.BUFFER_CODECS = "hlsBufferCodecs", i.BUFFER_CREATED = "hlsBufferCreated", i.BUFFER_APPENDING = "hlsBufferAppending", i.BUFFER_APPENDED = "hlsBufferAppended", i.BUFFER_EOS = "hlsBufferEos", i.BUFFERED_TO_END = "hlsBufferedToEnd", i.BUFFER_FLUSHING = "hlsBufferFlushing", i.BUFFER_FLUSHED = "hlsBufferFlushed", i.MANIFEST_LOADING = "hlsManifestLoading", i.MANIFEST_LOADED = "hlsManifestLoaded", i.MANIFEST_PARSED = "hlsManifestParsed", i.LEVEL_SWITCHING = "hlsLevelSwitching", i.LEVEL_SWITCHED = "hlsLevelSwitched", i.LEVEL_LOADING = "hlsLevelLoading", i.LEVEL_LOADED = "hlsLevelLoaded", i.LEVEL_UPDATED = "hlsLevelUpdated", i.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", i.LEVELS_UPDATED = "hlsLevelsUpdated", i.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", i.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", i.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", i.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", i.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", i.AUDIO_TRACK_UPDATED = "hlsAudioTrackUpdated", i.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", i.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", i.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", i.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", i.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", i.SUBTITLE_TRACK_UPDATED = "hlsSubtitleTrackUpdated", i.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", i.CUES_PARSED = "hlsCuesParsed", i.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", i.INIT_PTS_FOUND = "hlsInitPtsFound", i.FRAG_LOADING = "hlsFragLoading", i.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", i.FRAG_LOADED = "hlsFragLoaded", i.FRAG_DECRYPTED = "hlsFragDecrypted", i.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", i.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", i.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", i.FRAG_PARSED = "hlsFragParsed", i.FRAG_BUFFERED = "hlsFragBuffered", i.FRAG_CHANGED = "hlsFragChanged", i.FPS_DROP = "hlsFpsDrop", i.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", i.MAX_AUTO_LEVEL_UPDATED = "hlsMaxAutoLevelUpdated", i.ERROR = "hlsError", i.DESTROYING = "hlsDestroying", i.KEY_LOADING = "hlsKeyLoading", i.KEY_LOADED = "hlsKeyLoaded", i.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", i.BACK_BUFFER_REACHED = "hlsBackBufferReached", i.STEERING_MANIFEST_LOADED = "hlsSteeringManifestLoaded", i.ASSET_LIST_LOADING = "hlsAssetListLoading", i.ASSET_LIST_LOADED = "hlsAssetListLoaded", i.INTERSTITIALS_UPDATED = "hlsInterstitialsUpdated", i.INTERSTITIALS_BUFFERED_TO_BOUNDARY = "hlsInterstitialsBufferedToBoundary", i.INTERSTITIAL_ASSET_PLAYER_CREATED = "hlsInterstitialAssetPlayerCreated", i.INTERSTITIAL_STARTED = "hlsInterstitialStarted", i.INTERSTITIAL_ASSET_STARTED = "hlsInterstitialAssetStarted", i.INTERSTITIAL_ASSET_ENDED = "hlsInterstitialAssetEnded", i.INTERSTITIAL_ASSET_ERROR = "hlsInterstitialAssetError", i.INTERSTITIAL_ENDED = "hlsInterstitialEnded", i.INTERSTITIALS_PRIMARY_RESUMED = "hlsInterstitialsPrimaryResumed", i.PLAYOUT_LIMIT_REACHED = "hlsPlayoutLimitReached", i.EVENT_CUE_ENTER = "hlsEventCueEnter", i;
})({});
var Q = {
  MANIFEST: "manifest",
  LEVEL: "level",
  AUDIO_TRACK: "audioTrack",
  SUBTITLE_TRACK: "subtitleTrack"
}, B = {
  MAIN: "main",
  AUDIO: "audio",
  SUBTITLE: "subtitle"
};
class _t {
  //  About half of the estimated value will be from the last |halfLife| samples by weight.
  constructor(e, t = 0, s = 0) {
    this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = e, this.alpha_ = e ? Math.exp(Math.log(0.5) / e) : 0, this.estimate_ = t, this.totalWeight_ = s;
  }
  sample(e, t) {
    const s = Math.pow(this.alpha_, e);
    this.estimate_ = t * (1 - s) + s * this.estimate_, this.totalWeight_ += e;
  }
  getTotalWeight() {
    return this.totalWeight_;
  }
  getEstimate() {
    if (this.alpha_) {
      const e = 1 - Math.pow(this.alpha_, this.totalWeight_);
      if (e)
        return this.estimate_ / e;
    }
    return this.estimate_;
  }
}
class Kd {
  constructor(e, t, s, r = 100) {
    this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultTTFB_ = void 0, this.ttfb_ = void 0, this.defaultEstimate_ = s, this.minWeight_ = 1e-3, this.minDelayMs_ = 50, this.slow_ = new _t(e), this.fast_ = new _t(t), this.defaultTTFB_ = r, this.ttfb_ = new _t(e);
  }
  update(e, t) {
    const {
      slow_: s,
      fast_: r,
      ttfb_: n
    } = this;
    s.halfLife !== e && (this.slow_ = new _t(e, s.getEstimate(), s.getTotalWeight())), r.halfLife !== t && (this.fast_ = new _t(t, r.getEstimate(), r.getTotalWeight())), n.halfLife !== e && (this.ttfb_ = new _t(e, n.getEstimate(), n.getTotalWeight()));
  }
  sample(e, t) {
    e = Math.max(e, this.minDelayMs_);
    const s = 8 * t, r = e / 1e3, n = s / r;
    this.fast_.sample(r, n), this.slow_.sample(r, n);
  }
  sampleTTFB(e) {
    const t = e / 1e3, s = Math.sqrt(2) * Math.exp(-Math.pow(t, 2) / 2);
    this.ttfb_.sample(s, Math.max(e, 5));
  }
  canEstimate() {
    return this.fast_.getTotalWeight() >= this.minWeight_;
  }
  getEstimate() {
    return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_;
  }
  getEstimateTTFB() {
    return this.ttfb_.getTotalWeight() >= this.minWeight_ ? this.ttfb_.getEstimate() : this.defaultTTFB_;
  }
  get defaultEstimate() {
    return this.defaultEstimate_;
  }
  destroy() {
  }
}
function Wd(i, e, t) {
  return (e = jd(e)) in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
function ae() {
  return ae = Object.assign ? Object.assign.bind() : function(i) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var s in t) ({}).hasOwnProperty.call(t, s) && (i[s] = t[s]);
    }
    return i;
  }, ae.apply(null, arguments);
}
function ea(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    e && (s = s.filter(function(r) {
      return Object.getOwnPropertyDescriptor(i, r).enumerable;
    })), t.push.apply(t, s);
  }
  return t;
}
function re(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ea(Object(t), !0).forEach(function(s) {
      Wd(i, s, t[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : ea(Object(t)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(t, s));
    });
  }
  return i;
}
function Yd(i, e) {
  if (typeof i != "object" || !i) return i;
  var t = i[Symbol.toPrimitive];
  if (t !== void 0) {
    var s = t.call(i, e);
    if (typeof s != "object") return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(i);
}
function jd(i) {
  var e = Yd(i, "string");
  return typeof e == "symbol" ? e : e + "";
}
class Be {
  constructor(e, t) {
    this.trace = void 0, this.debug = void 0, this.log = void 0, this.warn = void 0, this.info = void 0, this.error = void 0;
    const s = `[${e}]:`;
    this.trace = ot, this.debug = t.debug.bind(null, s), this.log = t.log.bind(null, s), this.warn = t.warn.bind(null, s), this.info = t.info.bind(null, s), this.error = t.error.bind(null, s);
  }
}
const ot = function() {
}, qd = {
  trace: ot,
  debug: ot,
  log: ot,
  warn: ot,
  info: ot,
  error: ot
};
function Er() {
  return ae({}, qd);
}
function Xd(i, e) {
  const t = self.console[i];
  return t ? t.bind(self.console, `${e ? "[" + e + "] " : ""}[${i}] >`) : ot;
}
function ta(i, e, t) {
  return e[i] ? e[i].bind(e) : Xd(i, t);
}
const yr = Er();
function zd(i, e, t) {
  const s = Er();
  if (typeof console == "object" && i === !0 || typeof i == "object") {
    const r = [
      // Remove out from list here to hard-disable a log-level
      // 'trace',
      "debug",
      "log",
      "info",
      "warn",
      "error"
    ];
    r.forEach((n) => {
      s[n] = ta(n, i, t);
    });
    try {
      s.log(`Debug logs enabled for "${e}" in hls.js version 1.6.16`);
    } catch {
      return Er();
    }
    r.forEach((n) => {
      yr[n] = ta(n, i);
    });
  } else
    ae(yr, s);
  return s;
}
const ne = yr;
function ct(i = !0) {
  return typeof self > "u" ? void 0 : (i || !self.MediaSource) && self.ManagedMediaSource || self.MediaSource || self.WebKitMediaSource;
}
function Qd(i) {
  return typeof self < "u" && i === self.ManagedMediaSource;
}
function al(i, e) {
  const t = Object.keys(i), s = Object.keys(e), r = t.length, n = s.length;
  return !r || !n || r === n && !t.some((a) => s.indexOf(a) === -1);
}
function Oe(i, e = !1) {
  if (typeof TextDecoder < "u") {
    const l = new TextDecoder("utf-8").decode(i);
    if (e) {
      const h = l.indexOf("\0");
      return h !== -1 ? l.substring(0, h) : l;
    }
    return l.replace(/\0/g, "");
  }
  const t = i.length;
  let s, r, n, a = "", o = 0;
  for (; o < t; ) {
    if (s = i[o++], s === 0 && e)
      return a;
    if (s === 0 || s === 3)
      continue;
    switch (s >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        a += String.fromCharCode(s);
        break;
      case 12:
      case 13:
        r = i[o++], a += String.fromCharCode((s & 31) << 6 | r & 63);
        break;
      case 14:
        r = i[o++], n = i[o++], a += String.fromCharCode((s & 15) << 12 | (r & 63) << 6 | (n & 63) << 0);
        break;
    }
  }
  return a;
}
function Te(i) {
  let e = "";
  for (let t = 0; t < i.length; t++) {
    let s = i[t].toString(16);
    s.length < 2 && (s = "0" + s), e += s;
  }
  return e;
}
function ol(i) {
  return Uint8Array.from(i.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer;
}
function Zd(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var wi = { exports: {} }, sa;
function Jd() {
  return sa || (sa = 1, (function(i, e) {
    (function(t) {
      var s = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/, r = /^(?=([^\/?#]*))\1([^]*)$/, n = /(?:\/|^)\.(?=\/)/g, a = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, o = {
        // If opts.alwaysNormalize is true then the path will always be normalized even when it starts with / or //
        // E.g
        // With opts.alwaysNormalize = false (default, spec compliant)
        // http://a.com/b/cd + /e/f/../g => http://a.com/e/f/../g
        // With opts.alwaysNormalize = true (not spec compliant)
        // http://a.com/b/cd + /e/f/../g => http://a.com/e/g
        buildAbsoluteURL: function(u, l, h) {
          if (h = h || {}, u = u.trim(), l = l.trim(), !l) {
            if (!h.alwaysNormalize)
              return u;
            var c = o.parseURL(u);
            if (!c)
              throw new Error("Error trying to parse base URL.");
            return c.path = o.normalizePath(
              c.path
            ), o.buildURLFromParts(c);
          }
          var d = o.parseURL(l);
          if (!d)
            throw new Error("Error trying to parse relative URL.");
          if (d.scheme)
            return h.alwaysNormalize ? (d.path = o.normalizePath(d.path), o.buildURLFromParts(d)) : l;
          var g = o.parseURL(u);
          if (!g)
            throw new Error("Error trying to parse base URL.");
          if (!g.netLoc && g.path && g.path[0] !== "/") {
            var f = r.exec(g.path);
            g.netLoc = f[1], g.path = f[2];
          }
          g.netLoc && !g.path && (g.path = "/");
          var m = {
            // 2c) Otherwise, the embedded URL inherits the scheme of
            // the base URL.
            scheme: g.scheme,
            netLoc: d.netLoc,
            path: null,
            params: d.params,
            query: d.query,
            fragment: d.fragment
          };
          if (!d.netLoc && (m.netLoc = g.netLoc, d.path[0] !== "/"))
            if (!d.path)
              m.path = g.path, d.params || (m.params = g.params, d.query || (m.query = g.query));
            else {
              var p = g.path, y = p.substring(0, p.lastIndexOf("/") + 1) + d.path;
              m.path = o.normalizePath(y);
            }
          return m.path === null && (m.path = h.alwaysNormalize ? o.normalizePath(d.path) : d.path), o.buildURLFromParts(m);
        },
        parseURL: function(u) {
          var l = s.exec(u);
          return l ? {
            scheme: l[1] || "",
            netLoc: l[2] || "",
            path: l[3] || "",
            params: l[4] || "",
            query: l[5] || "",
            fragment: l[6] || ""
          } : null;
        },
        normalizePath: function(u) {
          for (u = u.split("").reverse().join("").replace(n, ""); u.length !== (u = u.replace(a, "")).length; )
            ;
          return u.split("").reverse().join("");
        },
        buildURLFromParts: function(u) {
          return u.scheme + u.netLoc + u.path + u.params + u.query + u.fragment;
        }
      };
      i.exports = o;
    })();
  })(wi)), wi.exports;
}
var zr = Jd();
class Qr {
  constructor() {
    this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = {
      start: 0,
      first: 0,
      end: 0
    }, this.parsing = {
      start: 0,
      end: 0
    }, this.buffering = {
      start: 0,
      first: 0,
      end: 0
    };
  }
}
var oe = {
  AUDIO: "audio",
  VIDEO: "video",
  AUDIOVIDEO: "audiovideo"
};
class ll {
  constructor(e) {
    this._byteRange = null, this._url = null, this._stats = null, this._streams = null, this.base = void 0, this.relurl = void 0, typeof e == "string" && (e = {
      url: e
    }), this.base = e, tf(this, "stats");
  }
  // setByteRange converts a EXT-X-BYTERANGE attribute into a two element array
  setByteRange(e, t) {
    const s = e.split("@", 2);
    let r;
    s.length === 1 ? r = t?.byteRangeEndOffset || 0 : r = parseInt(s[1]), this._byteRange = [r, parseInt(s[0]) + r];
  }
  get baseurl() {
    return this.base.url;
  }
  get byteRange() {
    return this._byteRange === null ? [] : this._byteRange;
  }
  get byteRangeStartOffset() {
    return this.byteRange[0];
  }
  get byteRangeEndOffset() {
    return this.byteRange[1];
  }
  get elementaryStreams() {
    return this._streams === null && (this._streams = {
      [oe.AUDIO]: null,
      [oe.VIDEO]: null,
      [oe.AUDIOVIDEO]: null
    }), this._streams;
  }
  set elementaryStreams(e) {
    this._streams = e;
  }
  get hasStats() {
    return this._stats !== null;
  }
  get hasStreams() {
    return this._streams !== null;
  }
  get stats() {
    return this._stats === null && (this._stats = new Qr()), this._stats;
  }
  set stats(e) {
    this._stats = e;
  }
  get url() {
    return !this._url && this.baseurl && this.relurl && (this._url = zr.buildAbsoluteURL(this.baseurl, this.relurl, {
      alwaysNormalize: !0
    })), this._url || "";
  }
  set url(e) {
    this._url = e;
  }
  clearElementaryStreamInfo() {
    const {
      elementaryStreams: e
    } = this;
    e[oe.AUDIO] = null, e[oe.VIDEO] = null, e[oe.AUDIOVIDEO] = null;
  }
}
function ge(i) {
  return i.sn !== "initSegment";
}
class Oi extends ll {
  constructor(e, t) {
    super(t), this._decryptdata = null, this._programDateTime = null, this._ref = null, this._bitrate = void 0, this.rawProgramDateTime = null, this.tagList = [], this.duration = 0, this.sn = 0, this.levelkeys = void 0, this.type = void 0, this.loader = null, this.keyLoader = null, this.level = -1, this.cc = 0, this.startPTS = void 0, this.endPTS = void 0, this.startDTS = void 0, this.endDTS = void 0, this.start = 0, this.playlistOffset = 0, this.deltaPTS = void 0, this.maxStartPTS = void 0, this.minEndPTS = void 0, this.data = void 0, this.bitrateTest = !1, this.title = null, this.initSegment = null, this.endList = void 0, this.gap = void 0, this.urlId = 0, this.type = e;
  }
  get byteLength() {
    if (this.hasStats) {
      const e = this.stats.total;
      if (e)
        return e;
    }
    if (this.byteRange.length) {
      const e = this.byteRange[0], t = this.byteRange[1];
      if (F(e) && F(t))
        return t - e;
    }
    return null;
  }
  get bitrate() {
    return this.byteLength ? this.byteLength * 8 / this.duration : this._bitrate ? this._bitrate : null;
  }
  set bitrate(e) {
    this._bitrate = e;
  }
  get decryptdata() {
    var e;
    const {
      levelkeys: t
    } = this;
    if (!t || t.NONE)
      return null;
    if (t.identity)
      this._decryptdata || (this._decryptdata = t.identity.getDecryptData(this.sn));
    else if (!((e = this._decryptdata) != null && e.keyId)) {
      const s = Object.keys(t);
      if (s.length === 1) {
        const r = this._decryptdata = t[s[0]] || null;
        r && (this._decryptdata = r.getDecryptData(this.sn, t));
      }
    }
    return this._decryptdata;
  }
  get end() {
    return this.start + this.duration;
  }
  get endProgramDateTime() {
    if (this.programDateTime === null)
      return null;
    const e = F(this.duration) ? this.duration : 0;
    return this.programDateTime + e * 1e3;
  }
  get encrypted() {
    var e;
    if ((e = this._decryptdata) != null && e.encrypted)
      return !0;
    if (this.levelkeys) {
      var t;
      const s = Object.keys(this.levelkeys), r = s.length;
      if (r > 1 || r === 1 && (t = this.levelkeys[s[0]]) != null && t.encrypted)
        return !0;
    }
    return !1;
  }
  get programDateTime() {
    return this._programDateTime === null && this.rawProgramDateTime && (this.programDateTime = Date.parse(this.rawProgramDateTime)), this._programDateTime;
  }
  set programDateTime(e) {
    if (!F(e)) {
      this._programDateTime = this.rawProgramDateTime = null;
      return;
    }
    this._programDateTime = e;
  }
  get ref() {
    return ge(this) ? (this._ref || (this._ref = {
      base: this.base,
      start: this.start,
      duration: this.duration,
      sn: this.sn,
      programDateTime: this.programDateTime
    }), this._ref) : null;
  }
  addStart(e) {
    this.setStart(this.start + e);
  }
  setStart(e) {
    this.start = e, this._ref && (this._ref.start = e);
  }
  setDuration(e) {
    this.duration = e, this._ref && (this._ref.duration = e);
  }
  setKeyFormat(e) {
    const t = this.levelkeys;
    if (t) {
      var s;
      const r = t[e];
      r && !((s = this._decryptdata) != null && s.keyId) && (this._decryptdata = r.getDecryptData(this.sn, t));
    }
  }
  abortRequests() {
    var e, t;
    (e = this.loader) == null || e.abort(), (t = this.keyLoader) == null || t.abort();
  }
  setElementaryStreamInfo(e, t, s, r, n, a = !1) {
    const {
      elementaryStreams: o
    } = this, u = o[e];
    if (!u) {
      o[e] = {
        startPTS: t,
        endPTS: s,
        startDTS: r,
        endDTS: n,
        partial: a
      };
      return;
    }
    u.startPTS = Math.min(u.startPTS, t), u.endPTS = Math.max(u.endPTS, s), u.startDTS = Math.min(u.startDTS, r), u.endDTS = Math.max(u.endDTS, n);
  }
}
class ef extends ll {
  constructor(e, t, s, r, n) {
    super(s), this.fragOffset = 0, this.duration = 0, this.gap = !1, this.independent = !1, this.relurl = void 0, this.fragment = void 0, this.index = void 0, this.duration = e.decimalFloatingPoint("DURATION"), this.gap = e.bool("GAP"), this.independent = e.bool("INDEPENDENT"), this.relurl = e.enumeratedString("URI"), this.fragment = t, this.index = r;
    const a = e.enumeratedString("BYTERANGE");
    a && this.setByteRange(a, n), n && (this.fragOffset = n.fragOffset + n.duration);
  }
  get start() {
    return this.fragment.start + this.fragOffset;
  }
  get end() {
    return this.start + this.duration;
  }
  get loaded() {
    const {
      elementaryStreams: e
    } = this;
    return !!(e.audio || e.video || e.audiovideo);
  }
}
function ul(i, e) {
  const t = Object.getPrototypeOf(i);
  if (t) {
    const s = Object.getOwnPropertyDescriptor(t, e);
    return s || ul(t, e);
  }
}
function tf(i, e) {
  const t = ul(i, e);
  t && (t.enumerable = !0, Object.defineProperty(i, e, t));
}
const ia = Math.pow(2, 32) - 1, sf = [].push, hl = {
  video: 1,
  audio: 2,
  id3: 3,
  text: 4
};
function me(i) {
  return String.fromCharCode.apply(null, i);
}
function cl(i, e) {
  const t = i[e] << 8 | i[e + 1];
  return t < 0 ? 65536 + t : t;
}
function Y(i, e) {
  const t = dl(i, e);
  return t < 0 ? 4294967296 + t : t;
}
function ra(i, e) {
  let t = Y(i, e);
  return t *= Math.pow(2, 32), t += Y(i, e + 4), t;
}
function dl(i, e) {
  return i[e] << 24 | i[e + 1] << 16 | i[e + 2] << 8 | i[e + 3];
}
function rf(i) {
  const e = i.byteLength;
  for (let t = 0; t < e; ) {
    const s = Y(i, t);
    if (s > 8 && i[t + 4] === 109 && i[t + 5] === 111 && i[t + 6] === 111 && i[t + 7] === 102)
      return !0;
    t = s > 1 ? t + s : e;
  }
  return !1;
}
function z(i, e) {
  const t = [];
  if (!e.length)
    return t;
  const s = i.byteLength;
  for (let r = 0; r < s; ) {
    const n = Y(i, r), a = me(i.subarray(r + 4, r + 8)), o = n > 1 ? r + n : s;
    if (a === e[0])
      if (e.length === 1)
        t.push(i.subarray(r + 8, o));
      else {
        const u = z(i.subarray(r + 8, o), e.slice(1));
        u.length && sf.apply(t, u);
      }
    r = o;
  }
  return t;
}
function nf(i) {
  const e = [], t = i[0];
  let s = 8;
  const r = Y(i, s);
  s += 4;
  let n = 0, a = 0;
  t === 0 ? (n = Y(i, s), a = Y(i, s + 4), s += 8) : (n = ra(i, s), a = ra(i, s + 8), s += 16), s += 2;
  let o = i.length + a;
  const u = cl(i, s);
  s += 2;
  for (let l = 0; l < u; l++) {
    let h = s;
    const c = Y(i, h);
    h += 4;
    const d = c & 2147483647;
    if ((c & 2147483648) >>> 31 === 1)
      return ne.warn("SIDX has hierarchical references (not supported)"), null;
    const f = Y(i, h);
    h += 4, e.push({
      referenceSize: d,
      subsegmentDuration: f,
      // unscaled
      info: {
        duration: f / r,
        start: o,
        end: o + d - 1
      }
    }), o += d, h += 4, s = h;
  }
  return {
    earliestPresentationTime: n,
    timescale: r,
    version: t,
    referencesCount: u,
    references: e
  };
}
function fl(i) {
  const e = [], t = z(i, ["moov", "trak"]);
  for (let r = 0; r < t.length; r++) {
    const n = t[r], a = z(n, ["tkhd"])[0];
    if (a) {
      let o = a[0];
      const u = Y(a, o === 0 ? 12 : 20), l = z(n, ["mdia", "mdhd"])[0];
      if (l) {
        o = l[0];
        const h = Y(l, o === 0 ? 12 : 20), c = z(n, ["mdia", "hdlr"])[0];
        if (c) {
          const d = me(c.subarray(8, 12)), g = {
            soun: oe.AUDIO,
            vide: oe.VIDEO
          }[d], f = z(n, ["mdia", "minf", "stbl", "stsd"])[0], m = af(f);
          g ? (e[u] = {
            timescale: h,
            type: g,
            stsd: m
          }, e[g] = re({
            timescale: h,
            id: u
          }, m)) : e[u] = {
            timescale: h,
            type: d,
            stsd: m
          };
        }
      }
    }
  }
  return z(i, ["moov", "mvex", "trex"]).forEach((r) => {
    const n = Y(r, 4), a = e[n];
    a && (a.default = {
      duration: Y(r, 12),
      flags: Y(r, 20)
    });
  }), e;
}
function af(i) {
  const e = i.subarray(8), t = e.subarray(86), s = me(e.subarray(4, 8));
  let r = s, n;
  const a = s === "enca" || s === "encv";
  if (a) {
    const l = z(e, [s])[0].subarray(s === "enca" ? 28 : 78);
    z(l, ["sinf"]).forEach((c) => {
      const d = z(c, ["schm"])[0];
      if (d) {
        const g = me(d.subarray(4, 8));
        if (g === "cbcs" || g === "cenc") {
          const f = z(c, ["frma"])[0];
          f && (r = me(f));
        }
      }
    });
  }
  const o = r;
  switch (r) {
    case "avc1":
    case "avc2":
    case "avc3":
    case "avc4": {
      const u = z(t, ["avcC"])[0];
      u && u.length > 3 && (r += "." + xs(u[1]) + xs(u[2]) + xs(u[3]), n = Ss(o === "avc1" ? "dva1" : "dvav", t));
      break;
    }
    case "mp4a": {
      const u = z(e, [s])[0], l = z(u.subarray(28), ["esds"])[0];
      if (l && l.length > 7) {
        let h = 4;
        if (l[h++] !== 3)
          break;
        h = Mi(l, h), h += 2;
        const c = l[h++];
        if (c & 128 && (h += 2), c & 64 && (h += l[h++]), l[h++] !== 4)
          break;
        h = Mi(l, h);
        const d = l[h++];
        if (d === 64)
          r += "." + xs(d);
        else
          break;
        if (h += 12, l[h++] !== 5)
          break;
        h = Mi(l, h);
        const g = l[h++];
        let f = (g & 248) >> 3;
        f === 31 && (f += 1 + ((g & 7) << 3) + ((l[h] & 224) >> 5)), r += "." + f;
      }
      break;
    }
    case "hvc1":
    case "hev1": {
      const u = z(t, ["hvcC"])[0];
      if (u && u.length > 12) {
        const l = u[1], h = ["", "A", "B", "C"][l >> 6], c = l & 31, d = Y(u, 2), g = (l & 32) >> 5 ? "H" : "L", f = u[12], m = u.subarray(6, 12);
        r += "." + h + c, r += "." + of(d).toString(16).toUpperCase(), r += "." + g + f;
        let p = "";
        for (let y = m.length; y--; ) {
          const v = m[y];
          (v || p) && (p = "." + v.toString(16).toUpperCase() + p);
        }
        r += p;
      }
      n = Ss(o == "hev1" ? "dvhe" : "dvh1", t);
      break;
    }
    case "dvh1":
    case "dvhe":
    case "dvav":
    case "dva1":
    case "dav1": {
      r = Ss(r, t) || r;
      break;
    }
    case "vp09": {
      const u = z(t, ["vpcC"])[0];
      if (u && u.length > 6) {
        const l = u[4], h = u[5], c = u[6] >> 4 & 15;
        r += "." + Ye(l) + "." + Ye(h) + "." + Ye(c);
      }
      break;
    }
    case "av01": {
      const u = z(t, ["av1C"])[0];
      if (u && u.length > 2) {
        const l = u[1] >>> 5, h = u[1] & 31, c = u[2] >>> 7 ? "H" : "M", d = (u[2] & 64) >> 6, g = (u[2] & 32) >> 5, f = l === 2 && d ? g ? 12 : 10 : d ? 10 : 8, m = (u[2] & 16) >> 4, p = (u[2] & 8) >> 3, y = (u[2] & 4) >> 2, v = u[2] & 3;
        r += "." + l + "." + Ye(h) + c + "." + Ye(f) + "." + m + "." + p + y + v + "." + Ye(1) + "." + Ye(1) + "." + Ye(1) + "." + 0, n = Ss("dav1", t);
      }
      break;
    }
  }
  return {
    codec: r,
    encrypted: a,
    supplemental: n
  };
}
function Ss(i, e) {
  const t = z(e, ["dvvC"]), s = t.length ? t[0] : z(e, ["dvcC"])[0];
  if (s) {
    const r = s[2] >> 1 & 127, n = s[2] << 5 & 32 | s[3] >> 3 & 31;
    return i + "." + Ye(r) + "." + Ye(n);
  }
}
function of(i) {
  let e = 0;
  for (let t = 0; t < 32; t++)
    e |= (i >> t & 1) << 31 - t;
  return e >>> 0;
}
function Mi(i, e) {
  const t = e + 5;
  for (; i[e++] & 128 && e < t; )
    ;
  return e;
}
function xs(i) {
  return ("0" + i.toString(16).toUpperCase()).slice(-2);
}
function Ye(i) {
  return (i < 10 ? "0" : "") + i;
}
function lf(i, e) {
  if (!i || !e)
    return;
  const t = e.keyId;
  t && e.isCommonEncryption && gl(i, (s, r) => {
    const n = s.subarray(8, 24);
    n.some((a) => a !== 0) || (ne.log(`[eme] Patching keyId in 'enc${r ? "a" : "v"}>sinf>>tenc' box: ${Te(n)} -> ${Te(t)}`), s.set(t, 8));
  });
}
function uf(i) {
  const e = [];
  return gl(i, (t) => e.push(t.subarray(8, 24))), e;
}
function gl(i, e) {
  z(i, ["moov", "trak"]).forEach((s) => {
    const r = z(s, ["mdia", "minf", "stbl", "stsd"])[0];
    if (!r) return;
    const n = r.subarray(8);
    let a = z(n, ["enca"]);
    const o = a.length > 0;
    o || (a = z(n, ["encv"])), a.forEach((u) => {
      const l = o ? u.subarray(28) : u.subarray(78);
      z(l, ["sinf"]).forEach((c) => {
        const d = ml(c);
        d && e(d, o);
      });
    });
  });
}
function ml(i) {
  const e = z(i, ["schm"])[0];
  if (e) {
    const t = me(e.subarray(4, 8));
    if (t === "cbcs" || t === "cenc") {
      const s = z(i, ["schi", "tenc"])[0];
      if (s)
        return s;
    }
  }
}
function hf(i, e, t) {
  const s = {}, r = z(i, ["moof", "traf"]);
  for (let n = 0; n < r.length; n++) {
    const a = r[n], o = z(a, ["tfhd"])[0], u = Y(o, 4), l = e[u];
    if (!l)
      continue;
    s[u] || (s[u] = {
      start: NaN,
      duration: 0,
      sampleCount: 0,
      timescale: l.timescale,
      type: l.type
    });
    const h = s[u], c = z(a, ["tfdt"])[0];
    if (c) {
      const T = c[0];
      let S = Y(c, 4);
      T === 1 && (S === ia ? t.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time") : (S *= ia + 1, S += Y(c, 8))), F(S) && (!F(h.start) || S < h.start) && (h.start = S);
    }
    const d = l.default, g = Y(o, 0) | d?.flags;
    let f = d?.duration || 0;
    g & 8 && (g & 2 ? f = Y(o, 12) : f = Y(o, 8));
    const m = z(a, ["trun"]);
    let p = h.start || 0, y = 0, v = f;
    for (let T = 0; T < m.length; T++) {
      const S = m[T], x = Y(S, 4), L = h.sampleCount;
      h.sampleCount += x;
      const A = S[3] & 1, I = S[3] & 4, _ = S[2] & 1, b = S[2] & 2, P = S[2] & 4, M = S[2] & 8;
      let U = 8, K = x;
      for (A && (U += 4), I && x && (!(S[U + 1] & 1) && h.keyFrameIndex === void 0 && (h.keyFrameIndex = L), U += 4, _ ? (v = Y(S, U), U += 4) : v = f, b && (U += 4), M && (U += 4), p += v, y += v, K--); K--; )
        _ ? (v = Y(S, U), U += 4) : v = f, b && (U += 4), P && (S[U + 1] & 1 || h.keyFrameIndex === void 0 && (h.keyFrameIndex = h.sampleCount - (K + 1), h.keyFrameStart = p), U += 4), M && (U += 4), p += v, y += v;
      !y && f && (y += f * x);
    }
    h.duration += y;
  }
  if (!Object.keys(s).some((n) => s[n].duration)) {
    let n = 1 / 0, a = 0;
    const o = z(i, ["sidx"]);
    for (let u = 0; u < o.length; u++) {
      const l = nf(o[u]);
      if (l != null && l.references) {
        n = Math.min(n, l.earliestPresentationTime / l.timescale);
        const h = l.references.reduce((c, d) => c + d.info.duration || 0, 0);
        a = Math.max(a, h + l.earliestPresentationTime / l.timescale);
      }
    }
    a && F(a) && Object.keys(s).forEach((u) => {
      s[u].duration || (s[u].duration = a * s[u].timescale - s[u].start);
    });
  }
  return s;
}
function cf(i) {
  const e = {
    valid: null,
    remainder: null
  }, t = z(i, ["moof"]);
  if (t.length < 2)
    return e.remainder = i, e;
  const s = t[t.length - 1];
  return e.valid = i.slice(0, s.byteOffset - 8), e.remainder = i.slice(s.byteOffset - 8), e;
}
function Ne(i, e) {
  const t = new Uint8Array(i.length + e.length);
  return t.set(i), t.set(e, i.length), t;
}
function na(i, e) {
  const t = [], s = e.samples, r = e.timescale, n = e.id;
  let a = !1;
  return z(s, ["moof"]).map((u) => {
    const l = u.byteOffset - 8;
    z(u, ["traf"]).map((c) => {
      const d = z(c, ["tfdt"]).map((g) => {
        const f = g[0];
        let m = Y(g, 4);
        return f === 1 && (m *= Math.pow(2, 32), m += Y(g, 8)), m / r;
      })[0];
      return d !== void 0 && (i = d), z(c, ["tfhd"]).map((g) => {
        const f = Y(g, 4), m = Y(g, 0) & 16777215, p = (m & 1) !== 0, y = (m & 2) !== 0, v = (m & 8) !== 0;
        let T = 0;
        const S = (m & 16) !== 0;
        let x = 0;
        const L = (m & 32) !== 0;
        let A = 8;
        f === n && (p && (A += 8), y && (A += 4), v && (T = Y(g, A), A += 4), S && (x = Y(g, A), A += 4), L && (A += 4), e.type === "video" && (a = pi(e.codec)), z(c, ["trun"]).map((I) => {
          const _ = I[0], b = Y(I, 0) & 16777215, P = (b & 1) !== 0;
          let M = 0;
          const U = (b & 4) !== 0, K = (b & 256) !== 0;
          let $ = 0;
          const k = (b & 512) !== 0;
          let G = 0;
          const N = (b & 1024) !== 0, H = (b & 2048) !== 0;
          let W = 0;
          const w = Y(I, 4);
          let O = 8;
          P && (M = Y(I, O), O += 4), U && (O += 4);
          let q = M + l;
          for (let ie = 0; ie < w; ie++) {
            if (K ? ($ = Y(I, O), O += 4) : $ = T, k ? (G = Y(I, O), O += 4) : G = x, N && (O += 4), H && (_ === 0 ? W = Y(I, O) : W = dl(I, O), O += 4), e.type === oe.VIDEO) {
              let X = 0;
              for (; X < G; ) {
                const Z = Y(s, q);
                if (q += 4, df(a, s[q])) {
                  const xe = s.subarray(q, q + Z);
                  Zr(xe, a ? 2 : 1, i + W / r, t);
                }
                q += Z, X += Z + 4;
              }
            }
            i += $ / r;
          }
        }));
      });
    });
  }), t;
}
function pi(i) {
  if (!i)
    return !1;
  const e = i.substring(0, 4);
  return e === "hvc1" || e === "hev1" || // Dolby Vision
  e === "dvh1" || e === "dvhe";
}
function df(i, e) {
  if (i) {
    const t = e >> 1 & 63;
    return t === 39 || t === 40;
  } else
    return (e & 31) === 6;
}
function Zr(i, e, t, s) {
  const r = pl(i);
  let n = 0;
  n += e;
  let a = 0, o = 0, u = 0;
  for (; n < r.length; ) {
    a = 0;
    do {
      if (n >= r.length)
        break;
      u = r[n++], a += u;
    } while (u === 255);
    o = 0;
    do {
      if (n >= r.length)
        break;
      u = r[n++], o += u;
    } while (u === 255);
    const l = r.length - n;
    let h = n;
    if (o < l)
      n += o;
    else if (o > l) {
      ne.error(`Malformed SEI payload. ${o} is too small, only ${l} bytes left to parse.`);
      break;
    }
    if (a === 4) {
      if (r[h++] === 181) {
        const d = cl(r, h);
        if (h += 2, d === 49) {
          const g = Y(r, h);
          if (h += 4, g === 1195456820) {
            const f = r[h++];
            if (f === 3) {
              const m = r[h++], p = 31 & m, y = 64 & m, v = y ? 2 + p * 3 : 0, T = new Uint8Array(v);
              if (y) {
                T[0] = m;
                for (let S = 1; S < v; S++)
                  T[S] = r[h++];
              }
              s.push({
                type: f,
                payloadType: a,
                pts: t,
                bytes: T
              });
            }
          }
        }
      }
    } else if (a === 5 && o > 16) {
      const c = [];
      for (let f = 0; f < 16; f++) {
        const m = r[h++].toString(16);
        c.push(m.length == 1 ? "0" + m : m), (f === 3 || f === 5 || f === 7 || f === 9) && c.push("-");
      }
      const d = o - 16, g = new Uint8Array(d);
      for (let f = 0; f < d; f++)
        g[f] = r[h++];
      s.push({
        payloadType: a,
        pts: t,
        uuid: c.join(""),
        userData: Oe(g),
        userDataBytes: g
      });
    }
  }
}
function pl(i) {
  const e = i.byteLength, t = [];
  let s = 1;
  for (; s < e - 2; )
    i[s] === 0 && i[s + 1] === 0 && i[s + 2] === 3 ? (t.push(s + 2), s += 2) : s++;
  if (t.length === 0)
    return i;
  const r = e - t.length, n = new Uint8Array(r);
  let a = 0;
  for (s = 0; s < r; a++, s++)
    a === t[0] && (a++, t.shift()), n[s] = i[a];
  return n;
}
function ff(i) {
  const e = i[0];
  let t = "", s = "", r = 0, n = 0, a = 0, o = 0, u = 0, l = 0;
  if (e === 0) {
    for (; me(i.subarray(l, l + 1)) !== "\0"; )
      t += me(i.subarray(l, l + 1)), l += 1;
    for (t += me(i.subarray(l, l + 1)), l += 1; me(i.subarray(l, l + 1)) !== "\0"; )
      s += me(i.subarray(l, l + 1)), l += 1;
    s += me(i.subarray(l, l + 1)), l += 1, r = Y(i, 12), n = Y(i, 16), o = Y(i, 20), u = Y(i, 24), l = 28;
  } else if (e === 1) {
    l += 4, r = Y(i, l), l += 4;
    const c = Y(i, l);
    l += 4;
    const d = Y(i, l);
    for (l += 4, a = 2 ** 32 * c + d, Hd(a) || (a = Number.MAX_SAFE_INTEGER, ne.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), o = Y(i, l), l += 4, u = Y(i, l), l += 4; me(i.subarray(l, l + 1)) !== "\0"; )
      t += me(i.subarray(l, l + 1)), l += 1;
    for (t += me(i.subarray(l, l + 1)), l += 1; me(i.subarray(l, l + 1)) !== "\0"; )
      s += me(i.subarray(l, l + 1)), l += 1;
    s += me(i.subarray(l, l + 1)), l += 1;
  }
  const h = i.subarray(l, i.byteLength);
  return {
    schemeIdUri: t,
    value: s,
    timeScale: r,
    presentationTime: a,
    presentationTimeDelta: n,
    eventDuration: o,
    id: u,
    payload: h
  };
}
function gf(i, ...e) {
  const t = e.length;
  let s = 8, r = t;
  for (; r--; )
    s += e[r].byteLength;
  const n = new Uint8Array(s);
  for (n[0] = s >> 24 & 255, n[1] = s >> 16 & 255, n[2] = s >> 8 & 255, n[3] = s & 255, n.set(i, 4), r = 0, s = 8; r < t; r++)
    n.set(e[r], s), s += e[r].byteLength;
  return n;
}
function mf(i, e, t) {
  if (i.byteLength !== 16)
    throw new RangeError("Invalid system id");
  let s, r;
  s = 0, r = new Uint8Array();
  let n;
  s > 0 ? (n = new Uint8Array(4), e.length > 0 && new DataView(n.buffer).setUint32(0, e.length, !1)) : n = new Uint8Array();
  const a = new Uint8Array(4);
  return t.byteLength > 0 && new DataView(a.buffer).setUint32(0, t.byteLength, !1), gf(
    [112, 115, 115, 104],
    new Uint8Array([
      s,
      0,
      0,
      0
      // Flags
    ]),
    i,
    // 16 bytes
    n,
    r,
    a,
    t
  );
}
function pf(i) {
  const e = [];
  if (i instanceof ArrayBuffer) {
    const t = i.byteLength;
    let s = 0;
    for (; s + 32 < t; ) {
      const r = new DataView(i, s), n = Ef(r);
      e.push(n), s += n.size;
    }
  }
  return e;
}
function Ef(i) {
  const e = i.getUint32(0), t = i.byteOffset, s = i.byteLength;
  if (s < e)
    return {
      offset: t,
      size: s
    };
  if (i.getUint32(4) !== 1886614376)
    return {
      offset: t,
      size: e
    };
  const n = i.getUint32(8) >>> 24;
  if (n !== 0 && n !== 1)
    return {
      offset: t,
      size: e
    };
  const a = i.buffer, o = Te(new Uint8Array(a, t + 12, 16));
  let u = null, l = null, h = 0;
  if (n === 0)
    h = 28;
  else {
    const d = i.getUint32(28);
    if (!d || s < 32 + d * 16)
      return {
        offset: t,
        size: e
      };
    u = [];
    for (let g = 0; g < d; g++)
      u.push(new Uint8Array(a, t + 32 + g * 16, 16));
    h = 32 + d * 16;
  }
  if (!h)
    return {
      offset: t,
      size: e
    };
  const c = i.getUint32(h);
  return e - 32 < c ? {
    offset: t,
    size: e
  } : (l = new Uint8Array(a, t + h + 4, c), {
    version: n,
    systemId: o,
    kids: u,
    data: l,
    offset: t,
    size: e
  });
}
const El = () => /\(Windows.+Firefox\//i.test(navigator.userAgent), Wt = {
  audio: {
    a3ds: 1,
    "ac-3": 0.95,
    "ac-4": 1,
    alac: 0.9,
    alaw: 1,
    dra1: 1,
    "dts+": 1,
    "dts-": 1,
    dtsc: 1,
    dtse: 1,
    dtsh: 1,
    "ec-3": 0.9,
    enca: 1,
    fLaC: 0.9,
    // MP4-RA listed codec entry for FLAC
    flac: 0.9,
    // legacy browser codec name for FLAC
    FLAC: 0.9,
    // some manifests may list "FLAC" with Apple's tools
    g719: 1,
    g726: 1,
    m4ae: 1,
    mha1: 1,
    mha2: 1,
    mhm1: 1,
    mhm2: 1,
    mlpa: 1,
    mp4a: 1,
    "raw ": 1,
    Opus: 1,
    opus: 1,
    // browsers expect this to be lowercase despite MP4RA says 'Opus'
    samr: 1,
    sawb: 1,
    sawp: 1,
    sevc: 1,
    sqcp: 1,
    ssmv: 1,
    twos: 1,
    ulaw: 1
  },
  video: {
    avc1: 1,
    avc2: 1,
    avc3: 1,
    avc4: 1,
    avcp: 1,
    av01: 0.8,
    dav1: 0.8,
    drac: 1,
    dva1: 1,
    dvav: 1,
    dvh1: 0.7,
    dvhe: 0.7,
    encv: 1,
    hev1: 0.75,
    hvc1: 0.75,
    mjp2: 1,
    mp4v: 1,
    mvc1: 1,
    mvc2: 1,
    mvc3: 1,
    mvc4: 1,
    resv: 1,
    rv60: 1,
    s263: 1,
    svc1: 1,
    svc2: 1,
    "vc-1": 1,
    vp08: 1,
    vp09: 0.9
  },
  text: {
    stpp: 1,
    wvtt: 1
  }
};
function Jr(i, e) {
  const t = Wt[e];
  return !!t && !!t[i.slice(0, 4)];
}
function os(i, e, t = !0) {
  return !i.split(",").some((s) => !en(s, e, t));
}
function en(i, e, t = !0) {
  var s;
  const r = ct(t);
  return (s = r?.isTypeSupported(ls(i, e))) != null ? s : !1;
}
function ls(i, e) {
  return `${e}/mp4;codecs=${i}`;
}
function aa(i) {
  if (i) {
    const e = i.substring(0, 4);
    return Wt.video[e];
  }
  return 2;
}
function Zs(i) {
  const e = El();
  return i.split(",").reduce((t, s) => {
    const n = e && pi(s) ? 9 : Wt.video[s];
    return n ? (n * 2 + t) / (t ? 3 : 2) : (Wt.audio[s] + t) / (t ? 2 : 1);
  }, 0);
}
const Fi = {};
function yf(i, e = !0) {
  if (Fi[i])
    return Fi[i];
  const t = {
    // Idealy fLaC and Opus would be first (spec-compliant) but
    // some browsers will report that fLaC is supported then fail.
    // see: https://bugs.chromium.org/p/chromium/issues/detail?id=1422728
    flac: ["flac", "fLaC", "FLAC"],
    opus: ["opus", "Opus"],
    // Replace audio codec info if browser does not support mp4a.40.34,
    // and demuxer can fallback to 'audio/mpeg' or 'audio/mp4;codecs="mp3"'
    "mp4a.40.34": ["mp3"]
  }[i];
  for (let r = 0; r < t.length; r++) {
    var s;
    if (en(t[r], "audio", e))
      return Fi[i] = t[r], t[r];
    if (t[r] === "mp3" && (s = ct(e)) != null && s.isTypeSupported("audio/mpeg"))
      return "";
  }
  return i;
}
const vf = /flac|opus|mp4a\.40\.34/i;
function Js(i, e = !0) {
  return i.replace(vf, (t) => yf(t.toLowerCase(), e));
}
function Tf(i, e) {
  const t = [];
  if (i) {
    const s = i.split(",");
    for (let r = 0; r < s.length; r++)
      Jr(s[r], "video") || t.push(s[r]);
  }
  return e && t.push(e), t.join(",");
}
function Us(i, e) {
  if (i && (i.length > 4 || ["ac-3", "ec-3", "alac", "fLaC", "Opus"].indexOf(i) !== -1) && (oa(i, "audio") || oa(i, "video")))
    return i;
  if (e) {
    const t = e.split(",");
    if (t.length > 1) {
      if (i) {
        for (let s = t.length; s--; )
          if (t[s].substring(0, 4) === i.substring(0, 4))
            return t[s];
      }
      return t[0];
    }
  }
  return e || i;
}
function oa(i, e) {
  return Jr(i, e) && en(i, e);
}
function Sf(i) {
  const e = i.split(",");
  for (let t = 0; t < e.length; t++) {
    const s = e[t].split(".");
    s.length > 2 && s[0] === "avc1" && (e[t] = `avc1.${parseInt(s[1]).toString(16)}${("000" + parseInt(s[2]).toString(16)).slice(-4)}`);
  }
  return e.join(",");
}
function xf(i) {
  if (i.startsWith("av01.")) {
    const e = i.split("."), t = ["0", "111", "01", "01", "01", "0"];
    for (let s = e.length; s > 4 && s < 10; s++)
      e[s] = t[s - 4];
    return e.join(".");
  }
  return i;
}
function la(i) {
  const e = ct(i) || {
    isTypeSupported: () => !1
  };
  return {
    mpeg: e.isTypeSupported("audio/mpeg"),
    mp3: e.isTypeSupported('audio/mp4; codecs="mp3"'),
    ac3: e.isTypeSupported('audio/mp4; codecs="ac-3"')
  };
}
function vr(i) {
  return i.replace(/^.+codecs=["']?([^"']+).*$/, "$1");
}
const Af = {
  supported: !0,
  powerEfficient: !0,
  smooth: !0
  // keySystemAccess: null,
}, If = {
  supported: !1,
  smooth: !1,
  powerEfficient: !1
  // keySystemAccess: null,
}, yl = {
  supported: !0,
  configurations: [],
  decodingInfoResults: [Af]
};
function vl(i, e) {
  return {
    supported: !1,
    configurations: e,
    decodingInfoResults: [If],
    error: i
  };
}
function bf(i, e, t, s, r, n) {
  const a = i.videoCodec, o = i.audioCodec ? i.audioGroups : null, u = n?.audioCodec, l = n?.channels, h = l ? parseInt(l) : u ? 1 / 0 : 2;
  let c = null;
  if (o != null && o.length)
    try {
      o.length === 1 && o[0] ? c = e.groups[o[0]].channels : c = o.reduce((d, g) => {
        if (g) {
          const f = e.groups[g];
          if (!f)
            throw new Error(`Audio track group ${g} not found`);
          Object.keys(f.channels).forEach((m) => {
            d[m] = (d[m] || 0) + f.channels[m];
          });
        }
        return d;
      }, {
        2: 0
      });
    } catch {
      return !0;
    }
  return a !== void 0 && // Force media capabilities check for HEVC to avoid failure on Windows
  (a.split(",").some((d) => pi(d)) || i.width > 1920 && i.height > 1088 || i.height > 1920 && i.width > 1088 || i.frameRate > Math.max(s, 30) || i.videoRange !== "SDR" && i.videoRange !== t || i.bitrate > Math.max(r, 8e6)) || !!c && F(h) && Object.keys(c).some((d) => parseInt(d) > h);
}
function Tl(i, e, t, s = {}) {
  const r = i.videoCodec;
  if (!r && !i.audioCodec || !t)
    return Promise.resolve(yl);
  const n = [], a = Lf(i), o = a.length, u = Rf(i, e, o > 0), l = u.length;
  for (let h = o || 1 * l || 1; h--; ) {
    const c = {
      type: "media-source"
    };
    if (o && (c.video = a[h % o]), l) {
      c.audio = u[h % l];
      const d = c.audio.bitrate;
      c.video && d && (c.video.bitrate -= d);
    }
    n.push(c);
  }
  if (r) {
    const h = navigator.userAgent;
    if (r.split(",").some((c) => pi(c)) && El())
      return Promise.resolve(vl(new Error(`Overriding Windows Firefox HEVC MediaCapabilities result based on user-agent string: (${h})`), n));
  }
  return Promise.all(n.map((h) => {
    const c = Df(h);
    return s[c] || (s[c] = t.decodingInfo(h));
  })).then((h) => ({
    supported: !h.some((c) => !c.supported),
    configurations: n,
    decodingInfoResults: h
  })).catch((h) => ({
    supported: !1,
    configurations: n,
    decodingInfoResults: [],
    error: h
  }));
}
function Lf(i) {
  var e;
  const t = (e = i.videoCodec) == null ? void 0 : e.split(","), s = Sl(i), r = i.width || 640, n = i.height || 480, a = i.frameRate || 30, o = i.videoRange.toLowerCase();
  return t ? t.map((u) => {
    const l = {
      contentType: ls(xf(u), "video"),
      width: r,
      height: n,
      bitrate: s,
      framerate: a
    };
    return o !== "sdr" && (l.transferFunction = o), l;
  }) : [];
}
function Rf(i, e, t) {
  var s;
  const r = (s = i.audioCodec) == null ? void 0 : s.split(","), n = Sl(i);
  return r && i.audioGroups ? i.audioGroups.reduce((a, o) => {
    var u;
    const l = o ? (u = e.groups[o]) == null ? void 0 : u.tracks : null;
    return l ? l.reduce((h, c) => {
      if (c.groupId === o) {
        const d = parseFloat(c.channels || "");
        r.forEach((g) => {
          const f = {
            contentType: ls(g, "audio"),
            bitrate: t ? _f(g, n) : n
          };
          d && (f.channels = "" + d), h.push(f);
        });
      }
      return h;
    }, a) : a;
  }, []) : [];
}
function _f(i, e) {
  if (e <= 1)
    return 1;
  let t = 128e3;
  return i === "ec-3" ? t = 768e3 : i === "ac-3" && (t = 64e4), Math.min(e / 2, t);
}
function Sl(i) {
  return Math.ceil(Math.max(i.bitrate * 0.9, i.averageBitrate) / 1e3) * 1e3 || 1;
}
function Df(i) {
  let e = "";
  const {
    audio: t,
    video: s
  } = i;
  if (s) {
    const r = vr(s.contentType);
    e += `${r}_r${s.height}x${s.width}f${Math.ceil(s.framerate)}${s.transferFunction || "sd"}_${Math.ceil(s.bitrate / 1e5)}`;
  }
  if (t) {
    const r = vr(t.contentType);
    e += `${s ? "_" : ""}${r}_c${t.channels}`;
  }
  return e;
}
const Tr = ["NONE", "TYPE-0", "TYPE-1", null];
function Cf(i) {
  return Tr.indexOf(i) > -1;
}
const ei = ["SDR", "PQ", "HLG"];
function Pf(i) {
  return !!i && ei.indexOf(i) > -1;
}
var $s = {
  No: "",
  Yes: "YES",
  v2: "v2"
};
function ua(i) {
  const {
    canSkipUntil: e,
    canSkipDateRanges: t,
    age: s
  } = i, r = s < e / 2;
  return e && r ? t ? $s.v2 : $s.Yes : $s.No;
}
class ha {
  constructor(e, t, s) {
    this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = e, this.part = t, this.skip = s;
  }
  addDirectives(e) {
    const t = new self.URL(e);
    return this.msn !== void 0 && t.searchParams.set("_HLS_msn", this.msn.toString()), this.part !== void 0 && t.searchParams.set("_HLS_part", this.part.toString()), this.skip && t.searchParams.set("_HLS_skip", this.skip), t.href;
  }
}
class us {
  constructor(e) {
    if (this._attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.url = void 0, this.frameRate = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.supplemental = void 0, this.videoCodec = void 0, this.width = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.supportedPromise = void 0, this.supportedResult = void 0, this._avgBitrate = 0, this._audioGroups = void 0, this._subtitleGroups = void 0, this._urlId = 0, this.url = [e.url], this._attrs = [e.attrs], this.bitrate = e.bitrate, e.details && (this.details = e.details), this.id = e.id || 0, this.name = e.name, this.width = e.width || 0, this.height = e.height || 0, this.frameRate = e.attrs.optionalFloat("FRAME-RATE", 0), this._avgBitrate = e.attrs.decimalInteger("AVERAGE-BANDWIDTH"), this.audioCodec = e.audioCodec, this.videoCodec = e.videoCodec, this.codecSet = [e.videoCodec, e.audioCodec].filter((s) => !!s).map((s) => s.substring(0, 4)).join(","), "supplemental" in e) {
      var t;
      this.supplemental = e.supplemental;
      const s = (t = e.supplemental) == null ? void 0 : t.videoCodec;
      s && s !== e.videoCodec && (this.codecSet += `,${s.substring(0, 4)}`);
    }
    this.addGroupId("audio", e.attrs.AUDIO), this.addGroupId("text", e.attrs.SUBTITLES);
  }
  get maxBitrate() {
    return Math.max(this.realBitrate, this.bitrate);
  }
  get averageBitrate() {
    return this._avgBitrate || this.realBitrate || this.bitrate;
  }
  get attrs() {
    return this._attrs[0];
  }
  get codecs() {
    return this.attrs.CODECS || "";
  }
  get pathwayId() {
    return this.attrs["PATHWAY-ID"] || ".";
  }
  get videoRange() {
    return this.attrs["VIDEO-RANGE"] || "SDR";
  }
  get score() {
    return this.attrs.optionalFloat("SCORE", 0);
  }
  get uri() {
    return this.url[0] || "";
  }
  hasAudioGroup(e) {
    return ca(this._audioGroups, e);
  }
  hasSubtitleGroup(e) {
    return ca(this._subtitleGroups, e);
  }
  get audioGroups() {
    return this._audioGroups;
  }
  get subtitleGroups() {
    return this._subtitleGroups;
  }
  addGroupId(e, t) {
    if (t) {
      if (e === "audio") {
        let s = this._audioGroups;
        s || (s = this._audioGroups = []), s.indexOf(t) === -1 && s.push(t);
      } else if (e === "text") {
        let s = this._subtitleGroups;
        s || (s = this._subtitleGroups = []), s.indexOf(t) === -1 && s.push(t);
      }
    }
  }
  // Deprecated methods (retained for backwards compatibility)
  get urlId() {
    return 0;
  }
  set urlId(e) {
  }
  get audioGroupIds() {
    return this.audioGroups ? [this.audioGroupId] : void 0;
  }
  get textGroupIds() {
    return this.subtitleGroups ? [this.textGroupId] : void 0;
  }
  get audioGroupId() {
    var e;
    return (e = this.audioGroups) == null ? void 0 : e[0];
  }
  get textGroupId() {
    var e;
    return (e = this.subtitleGroups) == null ? void 0 : e[0];
  }
  addFallback() {
  }
}
function ca(i, e) {
  return !e || !i ? !1 : i.indexOf(e) !== -1;
}
function kf() {
  if (typeof matchMedia == "function") {
    const i = matchMedia("(dynamic-range: high)"), e = matchMedia("bad query");
    if (i.media !== e.media)
      return i.matches === !0;
  }
  return !1;
}
function wf(i, e) {
  let t = !1, s = [];
  if (i && (t = i !== "SDR", s = [i]), e) {
    s = e.allowedVideoRanges || ei.slice(0);
    const r = s.join("") !== "SDR" && !e.videoCodec;
    t = e.preferHDR !== void 0 ? e.preferHDR : r && kf(), t || (s = ["SDR"]);
  }
  return {
    preferHDR: t,
    allowedVideoRanges: s
  };
}
const Of = (i) => {
  const e = /* @__PURE__ */ new WeakSet();
  return (t, s) => {
    if (i && (s = i(t, s)), typeof s == "object" && s !== null) {
      if (e.has(s))
        return;
      e.add(s);
    }
    return s;
  };
}, le = (i, e) => JSON.stringify(i, Of(e));
function Mf(i, e, t, s, r) {
  const n = Object.keys(i), a = s?.channels, o = s?.audioCodec, u = r?.videoCodec, l = a && parseInt(a) === 2;
  let h = !1, c = !1, d = 1 / 0, g = 1 / 0, f = 1 / 0, m = 1 / 0, p = 0, y = [];
  const {
    preferHDR: v,
    allowedVideoRanges: T
  } = wf(e, r);
  for (let I = n.length; I--; ) {
    const _ = i[n[I]];
    h || (h = _.channels[2] > 0), d = Math.min(d, _.minHeight), g = Math.min(g, _.minFramerate), f = Math.min(f, _.minBitrate), T.filter((P) => _.videoRanges[P] > 0).length > 0 && (c = !0);
  }
  d = F(d) ? d : 0, g = F(g) ? g : 0;
  const S = Math.max(1080, d), x = Math.max(30, g);
  f = F(f) ? f : t, t = Math.max(f, t), c || (e = void 0);
  const L = n.length > 1;
  return {
    codecSet: n.reduce((I, _) => {
      const b = i[_];
      if (_ === I)
        return I;
      if (y = c ? T.filter((P) => b.videoRanges[P] > 0) : [], L) {
        if (b.minBitrate > t)
          return Ve(_, `min bitrate of ${b.minBitrate} > current estimate of ${t}`), I;
        if (!b.hasDefaultAudio)
          return Ve(_, "no renditions with default or auto-select sound found"), I;
        if (o && _.indexOf(o.substring(0, 4)) % 5 !== 0)
          return Ve(_, `audio codec preference "${o}" not found`), I;
        if (a && !l) {
          if (!b.channels[a])
            return Ve(_, `no renditions with ${a} channel sound found (channels options: ${Object.keys(b.channels)})`), I;
        } else if ((!o || l) && h && b.channels[2] === 0)
          return Ve(_, "no renditions with stereo sound found"), I;
        if (b.minHeight > S)
          return Ve(_, `min resolution of ${b.minHeight} > maximum of ${S}`), I;
        if (b.minFramerate > x)
          return Ve(_, `min framerate of ${b.minFramerate} > maximum of ${x}`), I;
        if (!y.some((P) => b.videoRanges[P] > 0))
          return Ve(_, `no variants with VIDEO-RANGE of ${le(y)} found`), I;
        if (u && _.indexOf(u.substring(0, 4)) % 5 !== 0)
          return Ve(_, `video codec preference "${u}" not found`), I;
        if (b.maxScore < p)
          return Ve(_, `max score of ${b.maxScore} < selected max of ${p}`), I;
      }
      return I && (Zs(_) >= Zs(I) || b.fragmentError > i[I].fragmentError) ? I : (m = b.minIndex, p = b.maxScore, _);
    }, void 0),
    videoRanges: y,
    preferHDR: v,
    minFramerate: g,
    minBitrate: f,
    minIndex: m
  };
}
function Ve(i, e) {
  ne.log(`[abr] start candidates with "${i}" ignored because ${e}`);
}
function xl(i) {
  return i.reduce((e, t) => {
    let s = e.groups[t.groupId];
    s || (s = e.groups[t.groupId] = {
      tracks: [],
      channels: {
        2: 0
      },
      hasDefault: !1,
      hasAutoSelect: !1
    }), s.tracks.push(t);
    const r = t.channels || "2";
    return s.channels[r] = (s.channels[r] || 0) + 1, s.hasDefault = s.hasDefault || t.default, s.hasAutoSelect = s.hasAutoSelect || t.autoselect, s.hasDefault && (e.hasDefaultAudio = !0), s.hasAutoSelect && (e.hasAutoSelectAudio = !0), e;
  }, {
    hasDefaultAudio: !1,
    hasAutoSelectAudio: !1,
    groups: {}
  });
}
function Ff(i, e, t, s) {
  return i.slice(t, s + 1).reduce((r, n, a) => {
    if (!n.codecSet)
      return r;
    const o = n.audioGroups;
    let u = r[n.codecSet];
    u || (r[n.codecSet] = u = {
      minBitrate: 1 / 0,
      minHeight: 1 / 0,
      minFramerate: 1 / 0,
      minIndex: a,
      maxScore: 0,
      videoRanges: {
        SDR: 0
      },
      channels: {
        2: 0
      },
      hasDefaultAudio: !o,
      fragmentError: 0
    }), u.minBitrate = Math.min(u.minBitrate, n.bitrate);
    const l = Math.min(n.height, n.width);
    return u.minHeight = Math.min(u.minHeight, l), u.minFramerate = Math.min(u.minFramerate, n.frameRate), u.minIndex = Math.min(u.minIndex, a), u.maxScore = Math.max(u.maxScore, n.score), u.fragmentError += n.fragmentError, u.videoRanges[n.videoRange] = (u.videoRanges[n.videoRange] || 0) + 1, o && o.forEach((h) => {
      if (!h)
        return;
      const c = e.groups[h];
      c && (u.hasDefaultAudio = u.hasDefaultAudio || e.hasDefaultAudio ? c.hasDefault : c.hasAutoSelect || !e.hasDefaultAudio && !e.hasAutoSelectAudio, Object.keys(c.channels).forEach((d) => {
        u.channels[d] = (u.channels[d] || 0) + c.channels[d];
      }));
    }), r;
  }, {});
}
function da(i) {
  if (!i)
    return i;
  const {
    lang: e,
    assocLang: t,
    characteristics: s,
    channels: r,
    audioCodec: n
  } = i;
  return {
    lang: e,
    assocLang: t,
    characteristics: s,
    channels: r,
    audioCodec: n
  };
}
function qe(i, e, t) {
  if ("attrs" in i) {
    const s = e.indexOf(i);
    if (s !== -1)
      return s;
  }
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    if (xt(i, r, t))
      return s;
  }
  return -1;
}
function xt(i, e, t) {
  const {
    groupId: s,
    name: r,
    lang: n,
    assocLang: a,
    default: o
  } = i, u = i.forced;
  return (s === void 0 || e.groupId === s) && (r === void 0 || e.name === r) && (n === void 0 || Nf(n, e.lang)) && (n === void 0 || e.assocLang === a) && (o === void 0 || e.default === o) && (u === void 0 || e.forced === u) && (!("characteristics" in i) || Bf(i.characteristics || "", e.characteristics)) && (t === void 0 || t(i, e));
}
function Nf(i, e = "--") {
  return i.length === e.length ? i === e : i.startsWith(e) || e.startsWith(i);
}
function Bf(i, e = "") {
  const t = i.split(","), s = e.split(",");
  return t.length === s.length && !t.some((r) => s.indexOf(r) === -1);
}
function yt(i, e) {
  const {
    audioCodec: t,
    channels: s
  } = i;
  return (t === void 0 || (e.audioCodec || "").substring(0, 4) === t.substring(0, 4)) && (s === void 0 || s === (e.channels || "2"));
}
function Uf(i, e, t, s, r) {
  const n = e[s], o = e.reduce((d, g, f) => {
    const m = g.uri;
    return (d[m] || (d[m] = [])).push(f), d;
  }, {})[n.uri];
  o.length > 1 && (s = Math.max.apply(Math, o));
  const u = n.videoRange, l = n.frameRate, h = n.codecSet.substring(0, 4), c = fa(e, s, (d) => {
    if (d.videoRange !== u || d.frameRate !== l || d.codecSet.substring(0, 4) !== h)
      return !1;
    const g = d.audioGroups, f = t.filter((m) => !g || g.indexOf(m.groupId) !== -1);
    return qe(i, f, r) > -1;
  });
  return c > -1 ? c : fa(e, s, (d) => {
    const g = d.audioGroups, f = t.filter((m) => !g || g.indexOf(m.groupId) !== -1);
    return qe(i, f, r) > -1;
  });
}
function fa(i, e, t) {
  for (let s = e; s > -1; s--)
    if (t(i[s]))
      return s;
  for (let s = e + 1; s < i.length; s++)
    if (t(i[s]))
      return s;
  return -1;
}
function ti(i, e) {
  var t;
  return !!i && i !== ((t = e.loadLevelObj) == null ? void 0 : t.uri);
}
class $f extends Be {
  constructor(e) {
    super("abr", e.logger), this.hls = void 0, this.lastLevelLoadSec = 0, this.lastLoadedFragLevel = -1, this.firstSelection = -1, this._nextAutoLevel = -1, this.nextAutoLevelKey = "", this.audioTracksByGroup = null, this.codecTiers = null, this.timer = -1, this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.rebufferNotice = -1, this.supportedCache = {}, this.bwEstimator = void 0, this._abandonRulesCheck = (t) => {
      var s;
      const {
        fragCurrent: r,
        partCurrent: n,
        hls: a
      } = this, {
        autoLevelEnabled: o,
        media: u
      } = a;
      if (!r || !u)
        return;
      const l = performance.now(), h = n ? n.stats : r.stats, c = n ? n.duration : r.duration, d = l - h.loading.start, g = a.minAutoLevel, f = r.level, m = this._nextAutoLevel;
      if (h.aborted || h.loaded && h.loaded === h.total || f <= g) {
        this.clearTimer(), this._nextAutoLevel = -1;
        return;
      }
      if (!o)
        return;
      const p = m > -1 && m !== f, y = !!t || p;
      if (!y && (u.paused || !u.playbackRate || !u.readyState))
        return;
      const v = a.mainForwardBufferInfo;
      if (!y && v === null)
        return;
      const T = this.bwEstimator.getEstimateTTFB(), S = Math.abs(u.playbackRate);
      if (d <= Math.max(T, 1e3 * (c / (S * 2))))
        return;
      const x = v ? v.len / S : 0, L = h.loading.first ? h.loading.first - h.loading.start : -1, A = h.loaded && L > -1, I = this.getBwEstimate(), _ = a.levels, b = _[f], P = Math.max(h.loaded, Math.round(c * (r.bitrate || b.averageBitrate) / 8));
      let M = A ? d - L : d;
      M < 1 && A && (M = Math.min(d, h.loaded * 8 / I));
      const U = A ? h.loaded * 1e3 / M : 0, K = T / 1e3, $ = U ? (P - h.loaded) / U : P * 8 / I + K;
      if ($ <= x)
        return;
      const k = U ? U * 8 : I, G = ((s = t?.details || this.hls.latestLevelDetails) == null ? void 0 : s.live) === !0, N = this.hls.config.abrBandWidthUpFactor;
      let H = Number.POSITIVE_INFINITY, W;
      for (W = f - 1; W > g; W--) {
        const ie = _[W].maxBitrate, X = !_[W].details || G;
        if (H = this.getTimeToLoadFrag(K, k, c * ie, X), H < Math.min(x, c + K))
          break;
      }
      if (H >= $ || H > c * 10)
        return;
      A ? this.bwEstimator.sample(d - Math.min(T, L), h.loaded) : this.bwEstimator.sampleTTFB(d);
      const w = _[W].maxBitrate;
      this.getBwEstimate() * N > w && this.resetEstimator(w);
      const O = this.findBestLevel(w, g, W, 0, x, 1, 1);
      O > -1 && (W = O), this.warn(`Fragment ${r.sn}${n ? " part " + n.index : ""} of level ${f} is loading too slowly;
      Fragment duration: ${r.duration.toFixed(3)}
      Time to underbuffer: ${x.toFixed(3)} s
      Estimated load time for current fragment: ${$.toFixed(3)} s
      Estimated load time for down switch fragment: ${H.toFixed(3)} s
      TTFB estimate: ${L | 0} ms
      Current BW estimate: ${F(I) ? I | 0 : "Unknown"} bps
      New BW estimate: ${this.getBwEstimate() | 0} bps
      Switching to level ${W} @ ${w | 0} bps`), a.nextLoadLevel = a.nextAutoLevel = W, this.clearTimer();
      const q = () => {
        if (this.clearTimer(), this.fragCurrent === r && this.hls.loadLevel === W && W > 0) {
          const ie = this.getStarvationDelay();
          if (this.warn(`Aborting inflight request ${W > 0 ? "and switching down" : ""}
      Fragment duration: ${r.duration.toFixed(3)} s
      Time to underbuffer: ${ie.toFixed(3)} s`), r.abortRequests(), this.fragCurrent = this.partCurrent = null, W > g) {
            let X = this.findBestLevel(this.hls.levels[g].bitrate, g, W, 0, ie, 1, 1);
            X === -1 && (X = g), this.hls.nextLoadLevel = this.hls.nextAutoLevel = X, this.resetEstimator(this.hls.levels[X].bitrate);
          }
        }
      };
      p || $ > H * 2 ? q() : this.timer = self.setInterval(q, H * 1e3), a.trigger(E.FRAG_LOAD_EMERGENCY_ABORTED, {
        frag: r,
        part: n,
        stats: h
      });
    }, this.hls = e, this.bwEstimator = this.initEstimator(), this.registerListeners();
  }
  resetEstimator(e) {
    e && (this.log(`setting initial bwe to ${e}`), this.hls.config.abrEwmaDefaultEstimate = e), this.firstSelection = -1, this.bwEstimator = this.initEstimator();
  }
  initEstimator() {
    const e = this.hls.config;
    return new Kd(e.abrEwmaSlowVoD, e.abrEwmaFastVoD, e.abrEwmaDefaultEstimate);
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.FRAG_LOADING, this.onFragLoading, this), e.on(E.FRAG_LOADED, this.onFragLoaded, this), e.on(E.FRAG_BUFFERED, this.onFragBuffered, this), e.on(E.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(E.LEVEL_LOADED, this.onLevelLoaded, this), e.on(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(E.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this), e.on(E.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e && (e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.FRAG_LOADING, this.onFragLoading, this), e.off(E.FRAG_LOADED, this.onFragLoaded, this), e.off(E.FRAG_BUFFERED, this.onFragBuffered, this), e.off(E.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(E.LEVEL_LOADED, this.onLevelLoaded, this), e.off(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(E.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this), e.off(E.ERROR, this.onError, this));
  }
  destroy() {
    this.unregisterListeners(), this.clearTimer(), this.hls = this._abandonRulesCheck = this.supportedCache = null, this.fragCurrent = this.partCurrent = null;
  }
  onManifestLoading(e, t) {
    this.lastLoadedFragLevel = -1, this.firstSelection = -1, this.lastLevelLoadSec = 0, this.supportedCache = {}, this.fragCurrent = this.partCurrent = null, this.onLevelsUpdated(), this.clearTimer();
  }
  onLevelsUpdated() {
    this.lastLoadedFragLevel > -1 && this.fragCurrent && (this.lastLoadedFragLevel = this.fragCurrent.level), this._nextAutoLevel = -1, this.onMaxAutoLevelUpdated(), this.codecTiers = null, this.audioTracksByGroup = null;
  }
  onMaxAutoLevelUpdated() {
    this.firstSelection = -1, this.nextAutoLevelKey = "";
  }
  onFragLoading(e, t) {
    const s = t.frag;
    if (!this.ignoreFragment(s)) {
      if (!s.bitrateTest) {
        var r;
        this.fragCurrent = s, this.partCurrent = (r = t.part) != null ? r : null;
      }
      this.clearTimer(), this.timer = self.setInterval(this._abandonRulesCheck, 100);
    }
  }
  onLevelSwitching(e, t) {
    this.clearTimer();
  }
  onError(e, t) {
    if (!t.fatal)
      switch (t.details) {
        case D.BUFFER_ADD_CODEC_ERROR:
        case D.BUFFER_APPEND_ERROR:
          this.lastLoadedFragLevel = -1, this.firstSelection = -1;
          break;
        case D.FRAG_LOAD_TIMEOUT: {
          const s = t.frag, {
            fragCurrent: r,
            partCurrent: n
          } = this;
          if (s && r && s.sn === r.sn && s.level === r.level) {
            const a = performance.now(), o = n ? n.stats : s.stats, u = a - o.loading.start, l = o.loading.first ? o.loading.first - o.loading.start : -1;
            if (o.loaded && l > -1) {
              const c = this.bwEstimator.getEstimateTTFB();
              this.bwEstimator.sample(u - Math.min(c, l), o.loaded);
            } else
              this.bwEstimator.sampleTTFB(u);
          }
          break;
        }
      }
  }
  getTimeToLoadFrag(e, t, s, r) {
    const n = e + s / t, a = r ? e + this.lastLevelLoadSec : 0;
    return n + a;
  }
  onLevelLoaded(e, t) {
    const s = this.hls.config, {
      loading: r
    } = t.stats, n = r.end - r.first;
    F(n) && (this.lastLevelLoadSec = n / 1e3), t.details.live ? this.bwEstimator.update(s.abrEwmaSlowLive, s.abrEwmaFastLive) : this.bwEstimator.update(s.abrEwmaSlowVoD, s.abrEwmaFastVoD), this.timer > -1 && this._abandonRulesCheck(t.levelInfo);
  }
  onFragLoaded(e, {
    frag: t,
    part: s
  }) {
    const r = s ? s.stats : t.stats;
    if (t.type === B.MAIN && this.bwEstimator.sampleTTFB(r.loading.first - r.loading.start), !this.ignoreFragment(t)) {
      if (this.clearTimer(), t.level === this._nextAutoLevel && (this._nextAutoLevel = -1), this.firstSelection = -1, this.hls.config.abrMaxWithRealBitrate) {
        const n = s ? s.duration : t.duration, a = this.hls.levels[t.level], o = (a.loaded ? a.loaded.bytes : 0) + r.loaded, u = (a.loaded ? a.loaded.duration : 0) + n;
        a.loaded = {
          bytes: o,
          duration: u
        }, a.realBitrate = Math.round(8 * o / u);
      }
      if (t.bitrateTest) {
        const n = {
          stats: r,
          frag: t,
          part: s,
          id: t.type
        };
        this.onFragBuffered(E.FRAG_BUFFERED, n), t.bitrateTest = !1;
      } else
        this.lastLoadedFragLevel = t.level;
    }
  }
  onFragBuffered(e, t) {
    const {
      frag: s,
      part: r
    } = t, n = r != null && r.stats.loaded ? r.stats : s.stats;
    if (n.aborted || this.ignoreFragment(s))
      return;
    const a = n.parsing.end - n.loading.start - Math.min(n.loading.first - n.loading.start, this.bwEstimator.getEstimateTTFB());
    this.bwEstimator.sample(a, n.loaded), n.bwEstimate = this.getBwEstimate(), s.bitrateTest ? this.bitrateTestDelay = a / 1e3 : this.bitrateTestDelay = 0;
  }
  ignoreFragment(e) {
    return e.type !== B.MAIN || e.sn === "initSegment";
  }
  clearTimer() {
    this.timer > -1 && (self.clearInterval(this.timer), this.timer = -1);
  }
  get firstAutoLevel() {
    const {
      maxAutoLevel: e,
      minAutoLevel: t
    } = this.hls, s = this.getBwEstimate(), r = this.hls.config.maxStarvationDelay, n = this.findBestLevel(s, t, e, 0, r, 1, 1);
    if (n > -1)
      return n;
    const a = this.hls.firstLevel, o = Math.min(Math.max(a, t), e);
    return this.warn(`Could not find best starting auto level. Defaulting to first in playlist ${a} clamped to ${o}`), o;
  }
  get forcedAutoLevel() {
    return this.nextAutoLevelKey ? -1 : this._nextAutoLevel;
  }
  // return next auto level
  get nextAutoLevel() {
    const e = this.forcedAutoLevel, s = this.bwEstimator.canEstimate(), r = this.lastLoadedFragLevel > -1;
    if (e !== -1 && (!s || !r || this.nextAutoLevelKey === this.getAutoLevelKey()))
      return e;
    const n = s && r ? this.getNextABRAutoLevel() : this.firstAutoLevel;
    if (e !== -1) {
      const a = this.hls.levels;
      if (a.length > Math.max(e, n) && a[e].loadError <= a[n].loadError)
        return e;
    }
    return this._nextAutoLevel = n, this.nextAutoLevelKey = this.getAutoLevelKey(), n;
  }
  getAutoLevelKey() {
    return `${this.getBwEstimate()}_${this.getStarvationDelay().toFixed(2)}`;
  }
  getNextABRAutoLevel() {
    const {
      fragCurrent: e,
      partCurrent: t,
      hls: s
    } = this;
    if (s.levels.length <= 1)
      return s.loadLevel;
    const {
      maxAutoLevel: r,
      config: n,
      minAutoLevel: a
    } = s, o = t ? t.duration : e ? e.duration : 0, u = this.getBwEstimate(), l = this.getStarvationDelay();
    let h = n.abrBandWidthFactor, c = n.abrBandWidthUpFactor;
    if (l) {
      const p = this.findBestLevel(u, a, r, l, 0, h, c);
      if (p >= 0)
        return this.rebufferNotice = -1, p;
    }
    let d = o ? Math.min(o, n.maxStarvationDelay) : n.maxStarvationDelay;
    if (!l) {
      const p = this.bitrateTestDelay;
      p && (d = (o ? Math.min(o, n.maxLoadingDelay) : n.maxLoadingDelay) - p, this.info(`bitrate test took ${Math.round(1e3 * p)}ms, set first fragment max fetchDuration to ${Math.round(1e3 * d)} ms`), h = c = 1);
    }
    const g = this.findBestLevel(u, a, r, l, d, h, c);
    if (this.rebufferNotice !== g && (this.rebufferNotice = g, this.info(`${l ? "rebuffering expected" : "buffer is empty"}, optimal quality level ${g}`)), g > -1)
      return g;
    const f = s.levels[a], m = s.loadLevelObj;
    return m && f?.bitrate < m.bitrate ? a : s.loadLevel;
  }
  getStarvationDelay() {
    const e = this.hls, t = e.media;
    if (!t)
      return 1 / 0;
    const s = t && t.playbackRate !== 0 ? Math.abs(t.playbackRate) : 1, r = e.mainForwardBufferInfo;
    return (r ? r.len : 0) / s;
  }
  getBwEstimate() {
    return this.bwEstimator.canEstimate() ? this.bwEstimator.getEstimate() : this.hls.config.abrEwmaDefaultEstimate;
  }
  findBestLevel(e, t, s, r, n, a, o) {
    var u;
    const l = r + n, h = this.lastLoadedFragLevel, c = h === -1 ? this.hls.firstLevel : h, {
      fragCurrent: d,
      partCurrent: g
    } = this, {
      levels: f,
      allAudioTracks: m,
      loadLevel: p,
      config: y
    } = this.hls;
    if (f.length === 1)
      return 0;
    const v = f[c], T = !!((u = this.hls.latestLevelDetails) != null && u.live), S = p === -1 || h === -1;
    let x, L = "SDR", A = v?.frameRate || 0;
    const {
      audioPreference: I,
      videoPreference: _
    } = y, b = this.audioTracksByGroup || (this.audioTracksByGroup = xl(m));
    let P = -1;
    if (S) {
      if (this.firstSelection !== -1)
        return this.firstSelection;
      const k = this.codecTiers || (this.codecTiers = Ff(f, b, t, s)), G = Mf(k, L, e, I, _), {
        codecSet: N,
        videoRanges: H,
        minFramerate: W,
        minBitrate: w,
        minIndex: O,
        preferHDR: q
      } = G;
      P = O, x = N, L = q ? H[H.length - 1] : H[0], A = W, e = Math.max(e, w), this.log(`picked start tier ${le(G)}`);
    } else
      x = v?.codecSet, L = v?.videoRange;
    const M = g ? g.duration : d ? d.duration : 0, U = this.bwEstimator.getEstimateTTFB() / 1e3, K = [];
    for (let k = s; k >= t; k--) {
      var $;
      const G = f[k], N = k > c;
      if (!G)
        continue;
      if (y.useMediaCapabilities && !G.supportedResult && !G.supportedPromise) {
        const X = navigator.mediaCapabilities;
        typeof X?.decodingInfo == "function" && bf(G, b, L, A, e, I) ? (G.supportedPromise = Tl(G, b, X, this.supportedCache), G.supportedPromise.then((Z) => {
          if (!this.hls)
            return;
          G.supportedResult = Z;
          const xe = this.hls.levels, ye = xe.indexOf(G);
          Z.error ? this.warn(`MediaCapabilities decodingInfo error: "${Z.error}" for level ${ye} ${le(Z)}`) : Z.supported ? Z.decodingInfoResults.some((Me) => Me.smooth === !1 || Me.powerEfficient === !1) && this.log(`MediaCapabilities decodingInfo for level ${ye} not smooth or powerEfficient: ${le(Z)}`) : (this.warn(`Unsupported MediaCapabilities decodingInfo result for level ${ye} ${le(Z)}`), ye > -1 && xe.length > 1 && (this.log(`Removing unsupported level ${ye}`), this.hls.removeLevel(ye), this.hls.loadLevel === -1 && (this.hls.nextLoadLevel = 0)));
        }).catch((Z) => {
          this.warn(`Error handling MediaCapabilities decodingInfo: ${Z}`);
        })) : G.supportedResult = yl;
      }
      if ((x && G.codecSet !== x || L && G.videoRange !== L || N && A > G.frameRate || !N && A > 0 && A < G.frameRate || ($ = G.supportedResult) != null && ($ = $.decodingInfoResults) != null && $.some((X) => X.smooth === !1)) && (!S || k !== P)) {
        K.push(k);
        continue;
      }
      const H = G.details, W = (g ? H?.partTarget : H?.averagetargetduration) || M;
      let w;
      N ? w = o * e : w = a * e;
      const O = M && r >= M * 2 && n === 0 ? G.averageBitrate : G.maxBitrate, q = this.getTimeToLoadFrag(U, w, O * W, H === void 0);
      if (
        // if adjusted bw is greater than level bitrate AND
        w >= O && // no level change, or new level has no error history
        (k === h || G.loadError === 0 && G.fragmentError === 0) && // fragment fetchDuration unknown OR live stream OR fragment fetchDuration less than max allowed fetch duration, then this level matches
        // we don't account for max Fetch Duration for live streams, this is to avoid switching down when near the edge of live sliding window ...
        // special case to support startLevel = -1 (bitrateTest) on live streams : in that case we should not exit loop so that findBestLevel will return -1
        (q <= U || !F(q) || T && !this.bitrateTestDelay || q < l)
      ) {
        const X = this.forcedAutoLevel;
        return k !== p && (X === -1 || X !== p) && (K.length && this.trace(`Skipped level(s) ${K.join(",")} of ${s} max with CODECS and VIDEO-RANGE:"${f[K[0]].codecs}" ${f[K[0]].videoRange}; not compatible with "${x}" ${L}`), this.info(`switch candidate:${c}->${k} adjustedbw(${Math.round(w)})-bitrate=${Math.round(w - O)} ttfb:${U.toFixed(1)} avgDuration:${W.toFixed(1)} maxFetchDuration:${l.toFixed(1)} fetchDuration:${q.toFixed(1)} firstSelection:${S} codecSet:${G.codecSet} videoRange:${G.videoRange} hls.loadLevel:${p}`)), S && (this.firstSelection = k), k;
      }
    }
    return -1;
  }
  set nextAutoLevel(e) {
    const t = this.deriveNextAutoLevel(e);
    this._nextAutoLevel !== t && (this.nextAutoLevelKey = "", this._nextAutoLevel = t);
  }
  deriveNextAutoLevel(e) {
    const {
      maxAutoLevel: t,
      minAutoLevel: s
    } = this.hls;
    return Math.min(Math.max(e, s), t);
  }
}
const Al = {
  /**
   * Searches for an item in an array which matches a certain condition.
   * This requires the condition to only match one item in the array,
   * and for the array to be ordered.
   *
   * @param list The array to search.
   * @param comparisonFn
   *      Called and provided a candidate item as the first argument.
   *      Should return:
   *          > -1 if the item should be located at a lower index than the provided item.
   *          > 1 if the item should be located at a higher index than the provided item.
   *          > 0 if the item is the item you're looking for.
   *
   * @returns the object if found, otherwise returns null
   */
  search: function(i, e) {
    let t = 0, s = i.length - 1, r = null, n = null;
    for (; t <= s; ) {
      r = (t + s) / 2 | 0, n = i[r];
      const a = e(n);
      if (a > 0)
        t = r + 1;
      else if (a < 0)
        s = r - 1;
      else
        return n;
    }
    return null;
  }
};
function Gf(i, e, t) {
  if (e === null || !Array.isArray(i) || !i.length || !F(e))
    return null;
  const s = i[0].programDateTime;
  if (e < (s || 0))
    return null;
  const r = i[i.length - 1].endProgramDateTime;
  if (e >= (r || 0))
    return null;
  for (let n = 0; n < i.length; ++n) {
    const a = i[n];
    if (Vf(e, t, a))
      return a;
  }
  return null;
}
function It(i, e, t = 0, s = 0, r = 5e-3) {
  let n = null;
  if (i) {
    n = e[1 + i.sn - e[0].sn] || null;
    const o = i.endDTS - t;
    o > 0 && o < 15e-7 && (t += 15e-7), n && i.level !== n.level && n.end <= i.end && (n = e[2 + i.sn - e[0].sn] || null);
  } else t === 0 && e[0].start === 0 && (n = e[0]);
  if (n && ((!i || i.level === n.level) && ga(t, s, n) === 0 || Hf(n, i, Math.min(r, s))))
    return n;
  const a = Al.search(e, ga.bind(null, t, s));
  return a && (a !== i || !n) ? a : n;
}
function Hf(i, e, t) {
  if (e && e.start === 0 && e.level < i.level && (e.endPTS || 0) > 0) {
    const s = e.tagList.reduce((r, n) => (n[0] === "INF" && (r += parseFloat(n[1])), r), t);
    return i.start <= s;
  }
  return !1;
}
function ga(i = 0, e = 0, t) {
  if (t.start <= i && t.start + t.duration > i)
    return 0;
  const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0));
  return t.start + t.duration - s <= i ? 1 : t.start - s > i && t.start ? -1 : 0;
}
function Vf(i, e, t) {
  const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0)) * 1e3;
  return (t.endProgramDateTime || 0) - s > i;
}
function Il(i, e, t) {
  if (i && i.startCC <= e && i.endCC >= e) {
    let s = i.fragments;
    const {
      fragmentHint: r
    } = i;
    r && (s = s.concat(r));
    let n;
    return Al.search(s, (a) => a.cc < e ? 1 : a.cc > e ? -1 : (n = a, a.end <= t ? 1 : a.start > t ? -1 : 0)), n || null;
  }
  return null;
}
function si(i) {
  switch (i.details) {
    case D.FRAG_LOAD_TIMEOUT:
    case D.KEY_LOAD_TIMEOUT:
    case D.LEVEL_LOAD_TIMEOUT:
    case D.MANIFEST_LOAD_TIMEOUT:
      return !0;
  }
  return !1;
}
function bl(i) {
  return i.details.startsWith("key");
}
function Ll(i) {
  return bl(i) && !!i.frag && !i.frag.decryptdata;
}
function ma(i, e) {
  const t = si(e);
  return i.default[`${t ? "timeout" : "error"}Retry`];
}
function tn(i, e) {
  const t = i.backoff === "linear" ? 1 : Math.pow(2, e);
  return Math.min(t * i.retryDelayMs, i.maxRetryDelayMs);
}
function pa(i) {
  return re(re({}, i), {
    errorRetry: null,
    timeoutRetry: null
  });
}
function ii(i, e, t, s) {
  if (!i)
    return !1;
  const r = s?.code, n = e < i.maxNumRetry && (Kf(r) || !!t);
  return i.shouldRetry ? i.shouldRetry(i, e, t, s, n) : n;
}
function Kf(i) {
  return Sr(i) || !!i && (i < 400 || i > 499);
}
function Sr(i) {
  return i === 0 && navigator.onLine === !1;
}
var ve = {
  DoNothing: 0,
  SendAlternateToPenaltyBox: 2,
  RemoveAlternatePermanently: 3,
  RetryRequest: 5
}, Ce = {
  None: 0,
  MoveAllAlternatesMatchingHost: 1,
  MoveAllAlternatesMatchingHDCP: 2,
  MoveAllAlternatesMatchingKey: 4
};
class Wf extends Be {
  constructor(e) {
    super("error-controller", e.logger), this.hls = void 0, this.playlistError = 0, this.hls = e, this.registerListeners();
  }
  registerListeners() {
    const e = this.hls;
    e.on(E.ERROR, this.onError, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.LEVEL_UPDATED, this.onLevelUpdated, this);
  }
  unregisterListeners() {
    const e = this.hls;
    e && (e.off(E.ERROR, this.onError, this), e.off(E.ERROR, this.onErrorOut, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.LEVEL_UPDATED, this.onLevelUpdated, this));
  }
  destroy() {
    this.unregisterListeners(), this.hls = null;
  }
  startLoad(e) {
  }
  stopLoad() {
    this.playlistError = 0;
  }
  getVariantLevelIndex(e) {
    return e?.type === B.MAIN ? e.level : this.getVariantIndex();
  }
  getVariantIndex() {
    var e;
    const t = this.hls, s = t.currentLevel;
    return (e = t.loadLevelObj) != null && e.details || s === -1 ? t.loadLevel : s;
  }
  variantHasKey(e, t) {
    if (e) {
      var s;
      if ((s = e.details) != null && s.hasKey(t))
        return !0;
      const r = e.audioGroups;
      if (r)
        return this.hls.allAudioTracks.filter((a) => r.indexOf(a.groupId) >= 0).some((a) => {
          var o;
          return (o = a.details) == null ? void 0 : o.hasKey(t);
        });
    }
    return !1;
  }
  onManifestLoading() {
    this.playlistError = 0;
  }
  onLevelUpdated() {
    this.playlistError = 0;
  }
  onError(e, t) {
    var s;
    if (t.fatal)
      return;
    const r = this.hls, n = t.context;
    switch (t.details) {
      case D.FRAG_LOAD_ERROR:
      case D.FRAG_LOAD_TIMEOUT:
      case D.KEY_LOAD_ERROR:
      case D.KEY_LOAD_TIMEOUT:
        t.errorAction = this.getFragRetryOrSwitchAction(t);
        return;
      case D.FRAG_PARSING_ERROR:
        if ((s = t.frag) != null && s.gap) {
          t.errorAction = Nt();
          return;
        }
      // falls through
      case D.FRAG_GAP:
      case D.FRAG_DECRYPT_ERROR: {
        t.errorAction = this.getFragRetryOrSwitchAction(t), t.errorAction.action = ve.SendAlternateToPenaltyBox;
        return;
      }
      case D.LEVEL_EMPTY_ERROR:
      case D.LEVEL_PARSING_ERROR:
        {
          var a;
          const u = t.parent === B.MAIN ? t.level : r.loadLevel;
          t.details === D.LEVEL_EMPTY_ERROR && ((a = t.context) != null && (a = a.levelDetails) != null && a.live) ? t.errorAction = this.getPlaylistRetryOrSwitchAction(t, u) : (t.levelRetry = !1, t.errorAction = this.getLevelSwitchAction(t, u));
        }
        return;
      case D.LEVEL_LOAD_ERROR:
      case D.LEVEL_LOAD_TIMEOUT:
        typeof n?.level == "number" && (t.errorAction = this.getPlaylistRetryOrSwitchAction(t, n.level));
        return;
      case D.AUDIO_TRACK_LOAD_ERROR:
      case D.AUDIO_TRACK_LOAD_TIMEOUT:
      case D.SUBTITLE_LOAD_ERROR:
      case D.SUBTITLE_TRACK_LOAD_TIMEOUT:
        if (n) {
          const u = r.loadLevelObj;
          if (u && (n.type === Q.AUDIO_TRACK && u.hasAudioGroup(n.groupId) || n.type === Q.SUBTITLE_TRACK && u.hasSubtitleGroup(n.groupId))) {
            t.errorAction = this.getPlaylistRetryOrSwitchAction(t, r.loadLevel), t.errorAction.action = ve.SendAlternateToPenaltyBox, t.errorAction.flags = Ce.MoveAllAlternatesMatchingHost;
            return;
          }
        }
        return;
      case D.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:
        t.errorAction = {
          action: ve.SendAlternateToPenaltyBox,
          flags: Ce.MoveAllAlternatesMatchingHDCP
        };
        return;
      case D.KEY_SYSTEM_SESSION_UPDATE_FAILED:
      case D.KEY_SYSTEM_STATUS_INTERNAL_ERROR:
      case D.KEY_SYSTEM_NO_SESSION:
        t.errorAction = {
          action: ve.SendAlternateToPenaltyBox,
          flags: Ce.MoveAllAlternatesMatchingKey
        };
        return;
      case D.BUFFER_ADD_CODEC_ERROR:
      case D.REMUX_ALLOC_ERROR:
      case D.BUFFER_APPEND_ERROR:
        if (!t.errorAction) {
          var o;
          t.errorAction = this.getLevelSwitchAction(t, (o = t.level) != null ? o : r.loadLevel);
        }
        return;
      case D.INTERNAL_EXCEPTION:
      case D.BUFFER_APPENDING_ERROR:
      case D.BUFFER_FULL_ERROR:
      case D.LEVEL_SWITCH_ERROR:
      case D.BUFFER_STALLED_ERROR:
      case D.BUFFER_SEEK_OVER_HOLE:
      case D.BUFFER_NUDGE_ON_STALL:
        t.errorAction = Nt();
        return;
    }
    t.type === V.KEY_SYSTEM_ERROR && (t.levelRetry = !1, t.errorAction = Nt());
  }
  getPlaylistRetryOrSwitchAction(e, t) {
    const s = this.hls, r = ma(s.config.playlistLoadPolicy, e), n = this.playlistError++;
    if (ii(r, n, si(e), e.response))
      return {
        action: ve.RetryRequest,
        flags: Ce.None,
        retryConfig: r,
        retryCount: n
      };
    const o = this.getLevelSwitchAction(e, t);
    return r && (o.retryConfig = r, o.retryCount = n), o;
  }
  getFragRetryOrSwitchAction(e) {
    const t = this.hls, s = this.getVariantLevelIndex(e.frag), r = t.levels[s], {
      fragLoadPolicy: n,
      keyLoadPolicy: a
    } = t.config, o = ma(bl(e) ? a : n, e), u = t.levels.reduce((h, c) => h + c.fragmentError, 0);
    if (r && (e.details !== D.FRAG_GAP && r.fragmentError++, !Ll(e) && ii(o, u, si(e), e.response)))
      return {
        action: ve.RetryRequest,
        flags: Ce.None,
        retryConfig: o,
        retryCount: u
      };
    const l = this.getLevelSwitchAction(e, s);
    return o && (l.retryConfig = o, l.retryCount = u), l;
  }
  getLevelSwitchAction(e, t) {
    const s = this.hls;
    t == null && (t = s.loadLevel);
    const r = this.hls.levels[t];
    if (r) {
      var n, a;
      const l = e.details;
      r.loadError++, l === D.BUFFER_APPEND_ERROR && r.fragmentError++;
      let h = -1;
      const {
        levels: c,
        loadLevel: d,
        minAutoLevel: g,
        maxAutoLevel: f
      } = s;
      !s.autoLevelEnabled && !s.config.preserveManualLevelOnError && (s.loadLevel = -1);
      const m = (n = e.frag) == null ? void 0 : n.type, y = (m === B.AUDIO && l === D.FRAG_PARSING_ERROR || e.sourceBufferName === "audio" && (l === D.BUFFER_ADD_CODEC_ERROR || l === D.BUFFER_APPEND_ERROR)) && c.some(({
        audioCodec: L
      }) => r.audioCodec !== L), T = e.sourceBufferName === "video" && (l === D.BUFFER_ADD_CODEC_ERROR || l === D.BUFFER_APPEND_ERROR) && c.some(({
        codecSet: L,
        audioCodec: A
      }) => r.codecSet !== L && r.audioCodec === A), {
        type: S,
        groupId: x
      } = (a = e.context) != null ? a : {};
      for (let L = c.length; L--; ) {
        const A = (L + d) % c.length;
        if (A !== d && A >= g && A <= f && c[A].loadError === 0) {
          var o, u;
          const I = c[A];
          if (l === D.FRAG_GAP && m === B.MAIN && e.frag) {
            const _ = c[A].details;
            if (_) {
              const b = It(e.frag, _.fragments, e.frag.start);
              if (b != null && b.gap)
                continue;
            }
          } else {
            if (S === Q.AUDIO_TRACK && I.hasAudioGroup(x) || S === Q.SUBTITLE_TRACK && I.hasSubtitleGroup(x))
              continue;
            if (m === B.AUDIO && (o = r.audioGroups) != null && o.some((_) => I.hasAudioGroup(_)) || m === B.SUBTITLE && (u = r.subtitleGroups) != null && u.some((_) => I.hasSubtitleGroup(_)) || y && r.audioCodec === I.audioCodec || T && r.codecSet === I.codecSet || !y && r.codecSet !== I.codecSet)
              continue;
          }
          h = A;
          break;
        }
      }
      if (h > -1 && s.loadLevel !== h)
        return e.levelRetry = !0, this.playlistError = 0, {
          action: ve.SendAlternateToPenaltyBox,
          flags: Ce.None,
          nextAutoLevel: h
        };
    }
    return {
      action: ve.SendAlternateToPenaltyBox,
      flags: Ce.MoveAllAlternatesMatchingHost
    };
  }
  onErrorOut(e, t) {
    var s;
    switch ((s = t.errorAction) == null ? void 0 : s.action) {
      case ve.DoNothing:
        break;
      case ve.SendAlternateToPenaltyBox:
        this.sendAlternateToPenaltyBox(t), !t.errorAction.resolved && t.details !== D.FRAG_GAP ? t.fatal = !0 : /MediaSource readyState: ended/.test(t.error.message) && (this.warn(`MediaSource ended after "${t.sourceBufferName}" sourceBuffer append error. Attempting to recover from media error.`), this.hls.recoverMediaError());
        break;
    }
    if (t.fatal) {
      this.hls.stopLoad();
      return;
    }
  }
  sendAlternateToPenaltyBox(e) {
    const t = this.hls, s = e.errorAction;
    if (!s)
      return;
    const {
      flags: r
    } = s, n = s.nextAutoLevel;
    switch (r) {
      case Ce.None:
        this.switchLevel(e, n);
        break;
      case Ce.MoveAllAlternatesMatchingHDCP: {
        const u = this.getVariantLevelIndex(e.frag), l = t.levels[u], h = l?.attrs["HDCP-LEVEL"];
        if (s.hdcpLevel = h, h === "NONE")
          this.warn("HDCP policy resticted output with HDCP-LEVEL=NONE");
        else if (h) {
          t.maxHdcpLevel = Tr[Tr.indexOf(h) - 1], s.resolved = !0, this.warn(`Restricting playback to HDCP-LEVEL of "${t.maxHdcpLevel}" or lower`);
          break;
        }
      }
      // eslint-disable-next-line no-fallthrough
      case Ce.MoveAllAlternatesMatchingKey: {
        const u = e.decryptdata;
        if (u) {
          const l = this.hls.levels, h = l.length;
          for (let d = h; d--; )
            if (this.variantHasKey(l[d], u)) {
              var a, o;
              this.log(`Banned key found in level ${d} (${l[d].bitrate}bps) or audio group "${(a = l[d].audioGroups) == null ? void 0 : a.join(",")}" (${(o = e.frag) == null ? void 0 : o.type} fragment) ${Te(u.keyId || [])}`), l[d].fragmentError++, l[d].loadError++, this.log(`Removing level ${d} with key error (${e.error})`), this.hls.removeLevel(d);
            }
          const c = e.frag;
          if (this.hls.levels.length < h)
            s.resolved = !0;
          else if (c && c.type !== B.MAIN) {
            const d = c.decryptdata;
            d && !u.matches(d) && (s.resolved = !0);
          }
        }
        break;
      }
    }
    s.resolved || this.switchLevel(e, n);
  }
  switchLevel(e, t) {
    if (t !== void 0 && e.errorAction && (this.warn(`switching to level ${t} after ${e.details}`), this.hls.nextAutoLevel = t, e.errorAction.resolved = !0, this.hls.nextLoadLevel = this.hls.nextAutoLevel, e.details === D.BUFFER_ADD_CODEC_ERROR && e.mimeType && e.sourceBufferName !== "audiovideo")) {
      const s = vr(e.mimeType), r = this.hls.levels;
      for (let n = r.length; n--; )
        r[n][`${e.sourceBufferName}Codec`] === s && (this.log(`Removing level ${n} for ${e.details} ("${s}" not supported)`), this.hls.removeLevel(n));
    }
  }
}
function Nt(i) {
  const e = {
    action: ve.DoNothing,
    flags: Ce.None
  };
  return i && (e.resolved = !0), e;
}
var pe = {
  NOT_LOADED: "NOT_LOADED",
  APPENDING: "APPENDING",
  PARTIAL: "PARTIAL",
  OK: "OK"
};
class Yf {
  constructor(e) {
    this.activePartLists = /* @__PURE__ */ Object.create(null), this.endListFragments = /* @__PURE__ */ Object.create(null), this.fragments = /* @__PURE__ */ Object.create(null), this.timeRanges = /* @__PURE__ */ Object.create(null), this.bufferPadding = 0.2, this.hls = void 0, this.hasGaps = !1, this.hls = e, this._registerListeners();
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e && (e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.BUFFER_APPENDED, this.onBufferAppended, this), e.on(E.FRAG_BUFFERED, this.onFragBuffered, this), e.on(E.FRAG_LOADED, this.onFragLoaded, this));
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e && (e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.BUFFER_APPENDED, this.onBufferAppended, this), e.off(E.FRAG_BUFFERED, this.onFragBuffered, this), e.off(E.FRAG_LOADED, this.onFragLoaded, this));
  }
  destroy() {
    this._unregisterListeners(), this.hls = // @ts-ignore
    this.fragments = // @ts-ignore
    this.activePartLists = // @ts-ignore
    this.endListFragments = this.timeRanges = null;
  }
  /**
   * Return a Fragment or Part with an appended range that matches the position and levelType
   * Otherwise, return null
   */
  getAppendedFrag(e, t) {
    const s = this.activePartLists[t];
    if (s)
      for (let r = s.length; r--; ) {
        const n = s[r];
        if (!n)
          break;
        if (n.start <= e && e <= n.end && n.loaded)
          return n;
      }
    return this.getBufferedFrag(e, t);
  }
  /**
   * Return a buffered Fragment that matches the position and levelType.
   * A buffered Fragment is one whose loading, parsing and appending is done (completed or "partial" meaning aborted).
   * If not found any Fragment, return null
   */
  getBufferedFrag(e, t) {
    return this.getFragAtPos(e, t, !0);
  }
  getFragAtPos(e, t, s) {
    const {
      fragments: r
    } = this, n = Object.keys(r);
    for (let a = n.length; a--; ) {
      const o = r[n[a]];
      if (o?.body.type === t && (!s || o.buffered)) {
        const u = o.body;
        if (u.start <= e && e <= u.end)
          return u;
      }
    }
    return null;
  }
  /**
   * Partial fragments effected by coded frame eviction will be removed
   * The browser will unload parts of the buffer to free up memory for new buffer data
   * Fragments will need to be reloaded when the buffer is freed up, removing partial fragments will allow them to reload(since there might be parts that are still playable)
   */
  detectEvictedFragments(e, t, s, r, n) {
    this.timeRanges && (this.timeRanges[e] = t);
    const a = r?.fragment.sn || -1;
    Object.keys(this.fragments).forEach((o) => {
      const u = this.fragments[o];
      if (!u || a >= u.body.sn)
        return;
      if (!u.buffered && (!u.loaded || n)) {
        u.body.type === s && this.removeFragment(u.body);
        return;
      }
      const l = u.range[e];
      if (l) {
        if (l.time.length === 0) {
          this.removeFragment(u.body);
          return;
        }
        l.time.some((h) => {
          const c = !this.isTimeBuffered(h.startPTS, h.endPTS, t);
          return c && this.removeFragment(u.body), c;
        });
      }
    });
  }
  /**
   * Checks if the fragment passed in is loaded in the buffer properly
   * Partially loaded fragments will be registered as a partial fragment
   */
  detectPartialFragments(e) {
    const t = this.timeRanges;
    if (!t || e.frag.sn === "initSegment")
      return;
    const s = e.frag, r = Dt(s), n = this.fragments[r];
    if (!n || n.buffered && s.gap)
      return;
    const a = !s.relurl;
    Object.keys(t).forEach((o) => {
      const u = s.elementaryStreams[o];
      if (!u)
        return;
      const l = t[o], h = a || u.partial === !0;
      n.range[o] = this.getBufferedTimes(s, e.part, h, l);
    }), n.loaded = null, Object.keys(n.range).length ? (this.bufferedEnd(n, s), As(n) || this.removeParts(s.sn - 1, s.type)) : this.removeFragment(n.body);
  }
  bufferedEnd(e, t) {
    e.buffered = !0, (e.body.endList = t.endList || e.body.endList) && (this.endListFragments[e.body.type] = e);
  }
  removeParts(e, t) {
    const s = this.activePartLists[t];
    s && (this.activePartLists[t] = Ea(s, (r) => r.fragment.sn >= e));
  }
  fragBuffered(e, t) {
    const s = Dt(e);
    let r = this.fragments[s];
    !r && t && (r = this.fragments[s] = {
      body: e,
      appendedPTS: null,
      loaded: null,
      buffered: !1,
      range: /* @__PURE__ */ Object.create(null)
    }, e.gap && (this.hasGaps = !0)), r && (r.loaded = null, this.bufferedEnd(r, e));
  }
  getBufferedTimes(e, t, s, r) {
    const n = {
      time: [],
      partial: s
    }, a = e.start, o = e.end, u = e.minEndPTS || o, l = e.maxStartPTS || a;
    for (let h = 0; h < r.length; h++) {
      const c = r.start(h) - this.bufferPadding, d = r.end(h) + this.bufferPadding;
      if (l >= c && u <= d) {
        n.time.push({
          startPTS: Math.max(a, r.start(h)),
          endPTS: Math.min(o, r.end(h))
        });
        break;
      } else if (a < d && o > c) {
        const g = Math.max(a, r.start(h)), f = Math.min(o, r.end(h));
        f > g && (n.partial = !0, n.time.push({
          startPTS: g,
          endPTS: f
        }));
      } else if (o <= c)
        break;
    }
    return n;
  }
  /**
   * Gets the partial fragment for a certain time
   */
  getPartialFragment(e) {
    let t = null, s, r, n, a = 0;
    const {
      bufferPadding: o,
      fragments: u
    } = this;
    return Object.keys(u).forEach((l) => {
      const h = u[l];
      h && As(h) && (r = h.body.start - o, n = h.body.end + o, e >= r && e <= n && (s = Math.min(e - r, n - e), a <= s && (t = h.body, a = s)));
    }), t;
  }
  isEndListAppended(e) {
    const t = this.endListFragments[e];
    return t !== void 0 && (t.buffered || As(t));
  }
  getState(e) {
    const t = Dt(e), s = this.fragments[t];
    return s ? s.buffered ? As(s) ? pe.PARTIAL : pe.OK : pe.APPENDING : pe.NOT_LOADED;
  }
  isTimeBuffered(e, t, s) {
    let r, n;
    for (let a = 0; a < s.length; a++) {
      if (r = s.start(a) - this.bufferPadding, n = s.end(a) + this.bufferPadding, e >= r && t <= n)
        return !0;
      if (t <= r)
        return !1;
    }
    return !1;
  }
  onManifestLoading() {
    this.removeAllFragments();
  }
  onFragLoaded(e, t) {
    if (t.frag.sn === "initSegment" || t.frag.bitrateTest)
      return;
    const s = t.frag, r = t.part ? null : t, n = Dt(s);
    this.fragments[n] = {
      body: s,
      appendedPTS: null,
      loaded: r,
      buffered: !1,
      range: /* @__PURE__ */ Object.create(null)
    };
  }
  onBufferAppended(e, t) {
    const {
      frag: s,
      part: r,
      timeRanges: n,
      type: a
    } = t;
    if (s.sn === "initSegment")
      return;
    const o = s.type;
    if (r) {
      let l = this.activePartLists[o];
      l || (this.activePartLists[o] = l = []), l.push(r);
    }
    this.timeRanges = n;
    const u = n[a];
    this.detectEvictedFragments(a, u, o, r);
  }
  onFragBuffered(e, t) {
    this.detectPartialFragments(t);
  }
  hasFragment(e) {
    const t = Dt(e);
    return !!this.fragments[t];
  }
  hasFragments(e) {
    const {
      fragments: t
    } = this, s = Object.keys(t);
    if (!e)
      return s.length > 0;
    for (let r = s.length; r--; ) {
      const n = t[s[r]];
      if (n?.body.type === e)
        return !0;
    }
    return !1;
  }
  hasParts(e) {
    var t;
    return !!((t = this.activePartLists[e]) != null && t.length);
  }
  removeFragmentsInRange(e, t, s, r, n) {
    r && !this.hasGaps || Object.keys(this.fragments).forEach((a) => {
      const o = this.fragments[a];
      if (!o)
        return;
      const u = o.body;
      u.type !== s || r && !u.gap || u.start < t && u.end > e && (o.buffered || n) && this.removeFragment(u);
    });
  }
  removeFragment(e) {
    const t = Dt(e);
    e.clearElementaryStreamInfo();
    const s = this.activePartLists[e.type];
    if (s) {
      const r = e.sn;
      this.activePartLists[e.type] = Ea(s, (n) => n.fragment.sn !== r);
    }
    delete this.fragments[t], e.endList && delete this.endListFragments[e.type];
  }
  removeAllFragments() {
    var e;
    this.fragments = /* @__PURE__ */ Object.create(null), this.endListFragments = /* @__PURE__ */ Object.create(null), this.activePartLists = /* @__PURE__ */ Object.create(null), this.hasGaps = !1;
    const t = (e = this.hls) == null || (e = e.latestLevelDetails) == null ? void 0 : e.partList;
    t && t.forEach((s) => s.clearElementaryStreamInfo());
  }
}
function As(i) {
  var e, t, s;
  return i.buffered && !!(i.body.gap || (e = i.range.video) != null && e.partial || (t = i.range.audio) != null && t.partial || (s = i.range.audiovideo) != null && s.partial);
}
function Dt(i) {
  return `${i.type}_${i.level}_${i.sn}`;
}
function Ea(i, e) {
  return i.filter((t) => {
    const s = e(t);
    return s || t.clearElementaryStreamInfo(), s;
  });
}
var dt = {
  cbc: 0,
  ctr: 1
};
class jf {
  constructor(e, t, s) {
    this.subtle = void 0, this.aesIV = void 0, this.aesMode = void 0, this.subtle = e, this.aesIV = t, this.aesMode = s;
  }
  decrypt(e, t) {
    switch (this.aesMode) {
      case dt.cbc:
        return this.subtle.decrypt({
          name: "AES-CBC",
          iv: this.aesIV
        }, t, e);
      case dt.ctr:
        return this.subtle.decrypt(
          {
            name: "AES-CTR",
            counter: this.aesIV,
            length: 64
          },
          //64 : NIST SP800-38A standard suggests that the counter should occupy half of the counter block
          t,
          e
        );
      default:
        throw new Error(`[AESCrypto] invalid aes mode ${this.aesMode}`);
    }
  }
}
function qf(i) {
  const e = i.byteLength, t = e && new DataView(i.buffer).getUint8(e - 1);
  return t ? i.slice(0, e - t) : i;
}
class Xf {
  constructor() {
    this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable();
  }
  // Using view.getUint32() also swaps the byte order.
  uint8ArrayToUint32Array_(e) {
    const t = new DataView(e), s = new Uint32Array(4);
    for (let r = 0; r < 4; r++)
      s[r] = t.getUint32(r * 4);
    return s;
  }
  initTable() {
    const e = this.sBox, t = this.invSBox, s = this.subMix, r = s[0], n = s[1], a = s[2], o = s[3], u = this.invSubMix, l = u[0], h = u[1], c = u[2], d = u[3], g = new Uint32Array(256);
    let f = 0, m = 0, p = 0;
    for (p = 0; p < 256; p++)
      p < 128 ? g[p] = p << 1 : g[p] = p << 1 ^ 283;
    for (p = 0; p < 256; p++) {
      let y = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4;
      y = y >>> 8 ^ y & 255 ^ 99, e[f] = y, t[y] = f;
      const v = g[f], T = g[v], S = g[T];
      let x = g[y] * 257 ^ y * 16843008;
      r[f] = x << 24 | x >>> 8, n[f] = x << 16 | x >>> 16, a[f] = x << 8 | x >>> 24, o[f] = x, x = S * 16843009 ^ T * 65537 ^ v * 257 ^ f * 16843008, l[y] = x << 24 | x >>> 8, h[y] = x << 16 | x >>> 16, c[y] = x << 8 | x >>> 24, d[y] = x, f ? (f = v ^ g[g[g[S ^ v]]], m ^= g[g[m]]) : f = m = 1;
    }
  }
  expandKey(e) {
    const t = this.uint8ArrayToUint32Array_(e);
    let s = !0, r = 0;
    for (; r < t.length && s; )
      s = t[r] === this.key[r], r++;
    if (s)
      return;
    this.key = t;
    const n = this.keySize = t.length;
    if (n !== 4 && n !== 6 && n !== 8)
      throw new Error("Invalid aes key size=" + n);
    const a = this.ksRows = (n + 6 + 1) * 4;
    let o, u;
    const l = this.keySchedule = new Uint32Array(a), h = this.invKeySchedule = new Uint32Array(a), c = this.sBox, d = this.rcon, g = this.invSubMix, f = g[0], m = g[1], p = g[2], y = g[3];
    let v, T;
    for (o = 0; o < a; o++) {
      if (o < n) {
        v = l[o] = t[o];
        continue;
      }
      T = v, o % n === 0 ? (T = T << 8 | T >>> 24, T = c[T >>> 24] << 24 | c[T >>> 16 & 255] << 16 | c[T >>> 8 & 255] << 8 | c[T & 255], T ^= d[o / n | 0] << 24) : n > 6 && o % n === 4 && (T = c[T >>> 24] << 24 | c[T >>> 16 & 255] << 16 | c[T >>> 8 & 255] << 8 | c[T & 255]), l[o] = v = (l[o - n] ^ T) >>> 0;
    }
    for (u = 0; u < a; u++)
      o = a - u, u & 3 ? T = l[o] : T = l[o - 4], u < 4 || o <= 4 ? h[u] = T : h[u] = f[c[T >>> 24]] ^ m[c[T >>> 16 & 255]] ^ p[c[T >>> 8 & 255]] ^ y[c[T & 255]], h[u] = h[u] >>> 0;
  }
  // Adding this as a method greatly improves performance.
  networkToHostOrderSwap(e) {
    return e << 24 | (e & 65280) << 8 | (e & 16711680) >> 8 | e >>> 24;
  }
  decrypt(e, t, s) {
    const r = this.keySize + 6, n = this.invKeySchedule, a = this.invSBox, o = this.invSubMix, u = o[0], l = o[1], h = o[2], c = o[3], d = this.uint8ArrayToUint32Array_(s);
    let g = d[0], f = d[1], m = d[2], p = d[3];
    const y = new Int32Array(e), v = new Int32Array(y.length);
    let T, S, x, L, A, I, _, b, P, M, U, K, $, k;
    const G = this.networkToHostOrderSwap;
    for (; t < y.length; ) {
      for (P = G(y[t]), M = G(y[t + 1]), U = G(y[t + 2]), K = G(y[t + 3]), A = P ^ n[0], I = K ^ n[1], _ = U ^ n[2], b = M ^ n[3], $ = 4, k = 1; k < r; k++)
        T = u[A >>> 24] ^ l[I >> 16 & 255] ^ h[_ >> 8 & 255] ^ c[b & 255] ^ n[$], S = u[I >>> 24] ^ l[_ >> 16 & 255] ^ h[b >> 8 & 255] ^ c[A & 255] ^ n[$ + 1], x = u[_ >>> 24] ^ l[b >> 16 & 255] ^ h[A >> 8 & 255] ^ c[I & 255] ^ n[$ + 2], L = u[b >>> 24] ^ l[A >> 16 & 255] ^ h[I >> 8 & 255] ^ c[_ & 255] ^ n[$ + 3], A = T, I = S, _ = x, b = L, $ = $ + 4;
      T = a[A >>> 24] << 24 ^ a[I >> 16 & 255] << 16 ^ a[_ >> 8 & 255] << 8 ^ a[b & 255] ^ n[$], S = a[I >>> 24] << 24 ^ a[_ >> 16 & 255] << 16 ^ a[b >> 8 & 255] << 8 ^ a[A & 255] ^ n[$ + 1], x = a[_ >>> 24] << 24 ^ a[b >> 16 & 255] << 16 ^ a[A >> 8 & 255] << 8 ^ a[I & 255] ^ n[$ + 2], L = a[b >>> 24] << 24 ^ a[A >> 16 & 255] << 16 ^ a[I >> 8 & 255] << 8 ^ a[_ & 255] ^ n[$ + 3], v[t] = G(T ^ g), v[t + 1] = G(L ^ f), v[t + 2] = G(x ^ m), v[t + 3] = G(S ^ p), g = P, f = M, m = U, p = K, t = t + 4;
    }
    return v.buffer;
  }
}
class zf {
  constructor(e, t, s) {
    this.subtle = void 0, this.key = void 0, this.aesMode = void 0, this.subtle = e, this.key = t, this.aesMode = s;
  }
  expandKey() {
    const e = Qf(this.aesMode);
    return this.subtle.importKey("raw", this.key, {
      name: e
    }, !1, ["encrypt", "decrypt"]);
  }
}
function Qf(i) {
  switch (i) {
    case dt.cbc:
      return "AES-CBC";
    case dt.ctr:
      return "AES-CTR";
    default:
      throw new Error(`[FastAESKey] invalid aes mode ${i}`);
  }
}
const Zf = 16;
class sn {
  constructor(e, {
    removePKCS7Padding: t = !0
  } = {}) {
    if (this.logEnabled = !0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.useSoftware = void 0, this.enableSoftwareAES = void 0, this.enableSoftwareAES = e.enableSoftwareAES, this.removePKCS7Padding = t, t)
      try {
        const s = self.crypto;
        s && (this.subtle = s.subtle || s.webkitSubtle);
      } catch {
      }
    this.useSoftware = !this.subtle;
  }
  destroy() {
    this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null;
  }
  isSync() {
    return this.useSoftware;
  }
  flush() {
    const {
      currentResult: e,
      remainderData: t
    } = this;
    if (!e || t)
      return this.reset(), null;
    const s = new Uint8Array(e);
    return this.reset(), this.removePKCS7Padding ? qf(s) : s;
  }
  reset() {
    this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null);
  }
  decrypt(e, t, s, r) {
    return this.useSoftware ? new Promise((n, a) => {
      const o = ArrayBuffer.isView(e) ? e : new Uint8Array(e);
      this.softwareDecrypt(o, t, s, r);
      const u = this.flush();
      u ? n(u.buffer) : a(new Error("[softwareDecrypt] Failed to decrypt data"));
    }) : this.webCryptoDecrypt(new Uint8Array(e), t, s, r);
  }
  // Software decryption is progressive. Progressive decryption may not return a result on each call. Any cached
  // data is handled in the flush() call
  softwareDecrypt(e, t, s, r) {
    const {
      currentIV: n,
      currentResult: a,
      remainderData: o
    } = this;
    if (r !== dt.cbc || t.byteLength !== 16)
      return ne.warn("SoftwareDecrypt: can only handle AES-128-CBC"), null;
    this.logOnce("JS AES decrypt"), o && (e = Ne(o, e), this.remainderData = null);
    const u = this.getValidChunk(e);
    if (!u.length)
      return null;
    n && (s = n);
    let l = this.softwareDecrypter;
    l || (l = this.softwareDecrypter = new Xf()), l.expandKey(t);
    const h = a;
    return this.currentResult = l.decrypt(u.buffer, 0, s), this.currentIV = u.slice(-16).buffer, h || null;
  }
  webCryptoDecrypt(e, t, s, r) {
    if (this.key !== t || !this.fastAesKey) {
      if (!this.subtle)
        return Promise.resolve(this.onWebCryptoError(e, t, s, r));
      this.key = t, this.fastAesKey = new zf(this.subtle, t, r);
    }
    return this.fastAesKey.expandKey().then((n) => this.subtle ? (this.logOnce("WebCrypto AES decrypt"), new jf(this.subtle, new Uint8Array(s), r).decrypt(e.buffer, n)) : Promise.reject(new Error("web crypto not initialized"))).catch((n) => (ne.warn(`[decrypter]: WebCrypto Error, disable WebCrypto API, ${n.name}: ${n.message}`), this.onWebCryptoError(e, t, s, r)));
  }
  onWebCryptoError(e, t, s, r) {
    const n = this.enableSoftwareAES;
    if (n) {
      this.useSoftware = !0, this.logEnabled = !0, this.softwareDecrypt(e, t, s, r);
      const a = this.flush();
      if (a)
        return a.buffer;
    }
    throw new Error("WebCrypto" + (n ? " and softwareDecrypt" : "") + ": failed to decrypt data");
  }
  getValidChunk(e) {
    let t = e;
    const s = e.length - e.length % Zf;
    return s !== e.length && (t = e.slice(0, s), this.remainderData = e.slice(s)), t;
  }
  logOnce(e) {
    this.logEnabled && (ne.log(`[decrypter]: ${e}`), this.logEnabled = !1);
  }
}
const ya = Math.pow(2, 17);
class Jf {
  constructor(e) {
    this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = e;
  }
  destroy() {
    this.loader && (this.loader.destroy(), this.loader = null);
  }
  abort() {
    this.loader && this.loader.abort();
  }
  load(e, t) {
    const s = e.url;
    if (!s)
      return Promise.reject(new et({
        type: V.NETWORK_ERROR,
        details: D.FRAG_LOAD_ERROR,
        fatal: !1,
        frag: e,
        error: new Error(`Fragment does not have a ${s ? "part list" : "url"}`),
        networkDetails: null
      }));
    this.abort();
    const r = this.config, n = r.fLoader, a = r.loader;
    return new Promise((o, u) => {
      if (this.loader && this.loader.destroy(), e.gap)
        if (e.tagList.some((f) => f[0] === "GAP")) {
          u(Ta(e));
          return;
        } else
          e.gap = !1;
      const l = this.loader = n ? new n(r) : new a(r), h = va(e);
      e.loader = l;
      const c = pa(r.fragLoadPolicy.default), d = {
        loadPolicy: c,
        timeout: c.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0,
        highWaterMark: e.sn === "initSegment" ? 1 / 0 : ya
      };
      e.stats = l.stats;
      const g = {
        onSuccess: (f, m, p, y) => {
          this.resetLoader(e, l);
          let v = f.data;
          p.resetIV && e.decryptdata && (e.decryptdata.iv = new Uint8Array(v.slice(0, 16)), v = v.slice(16)), o({
            frag: e,
            part: null,
            payload: v,
            networkDetails: y
          });
        },
        onError: (f, m, p, y) => {
          this.resetLoader(e, l), u(new et({
            type: V.NETWORK_ERROR,
            details: D.FRAG_LOAD_ERROR,
            fatal: !1,
            frag: e,
            response: re({
              url: s,
              data: void 0
            }, f),
            error: new Error(`HTTP Error ${f.code} ${f.text}`),
            networkDetails: p,
            stats: y
          }));
        },
        onAbort: (f, m, p) => {
          this.resetLoader(e, l), u(new et({
            type: V.NETWORK_ERROR,
            details: D.INTERNAL_ABORTED,
            fatal: !1,
            frag: e,
            error: new Error("Aborted"),
            networkDetails: p,
            stats: f
          }));
        },
        onTimeout: (f, m, p) => {
          this.resetLoader(e, l), u(new et({
            type: V.NETWORK_ERROR,
            details: D.FRAG_LOAD_TIMEOUT,
            fatal: !1,
            frag: e,
            error: new Error(`Timeout after ${d.timeout}ms`),
            networkDetails: p,
            stats: f
          }));
        }
      };
      t && (g.onProgress = (f, m, p, y) => t({
        frag: e,
        part: null,
        payload: p,
        networkDetails: y
      })), l.load(h, d, g);
    });
  }
  loadPart(e, t, s) {
    this.abort();
    const r = this.config, n = r.fLoader, a = r.loader;
    return new Promise((o, u) => {
      if (this.loader && this.loader.destroy(), e.gap || t.gap) {
        u(Ta(e, t));
        return;
      }
      const l = this.loader = n ? new n(r) : new a(r), h = va(e, t);
      e.loader = l;
      const c = pa(r.fragLoadPolicy.default), d = {
        loadPolicy: c,
        timeout: c.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0,
        highWaterMark: ya
      };
      t.stats = l.stats, l.load(h, d, {
        onSuccess: (g, f, m, p) => {
          this.resetLoader(e, l), this.updateStatsFromPart(e, t);
          const y = {
            frag: e,
            part: t,
            payload: g.data,
            networkDetails: p
          };
          s(y), o(y);
        },
        onError: (g, f, m, p) => {
          this.resetLoader(e, l), u(new et({
            type: V.NETWORK_ERROR,
            details: D.FRAG_LOAD_ERROR,
            fatal: !1,
            frag: e,
            part: t,
            response: re({
              url: h.url,
              data: void 0
            }, g),
            error: new Error(`HTTP Error ${g.code} ${g.text}`),
            networkDetails: m,
            stats: p
          }));
        },
        onAbort: (g, f, m) => {
          e.stats.aborted = t.stats.aborted, this.resetLoader(e, l), u(new et({
            type: V.NETWORK_ERROR,
            details: D.INTERNAL_ABORTED,
            fatal: !1,
            frag: e,
            part: t,
            error: new Error("Aborted"),
            networkDetails: m,
            stats: g
          }));
        },
        onTimeout: (g, f, m) => {
          this.resetLoader(e, l), u(new et({
            type: V.NETWORK_ERROR,
            details: D.FRAG_LOAD_TIMEOUT,
            fatal: !1,
            frag: e,
            part: t,
            error: new Error(`Timeout after ${d.timeout}ms`),
            networkDetails: m,
            stats: g
          }));
        }
      });
    });
  }
  updateStatsFromPart(e, t) {
    const s = e.stats, r = t.stats, n = r.total;
    if (s.loaded += r.loaded, n) {
      const u = Math.round(e.duration / t.duration), l = Math.min(Math.round(s.loaded / n), u), c = (u - l) * Math.round(s.loaded / l);
      s.total = s.loaded + c;
    } else
      s.total = Math.max(s.loaded, s.total);
    const a = s.loading, o = r.loading;
    a.start ? a.first += o.first - o.start : (a.start = o.start, a.first = o.first), a.end = o.end;
  }
  resetLoader(e, t) {
    e.loader = null, this.loader === t && (self.clearTimeout(this.partLoadTimeout), this.loader = null), t.destroy();
  }
}
function va(i, e = null) {
  const t = e || i, s = {
    frag: i,
    part: e,
    responseType: "arraybuffer",
    url: t.url,
    headers: {},
    rangeStart: 0,
    rangeEnd: 0
  }, r = t.byteRangeStartOffset, n = t.byteRangeEndOffset;
  if (F(r) && F(n)) {
    var a;
    let o = r, u = n;
    if (i.sn === "initSegment" && eg((a = i.decryptdata) == null ? void 0 : a.method)) {
      const l = n - r;
      l % 16 && (u = n + (16 - l % 16)), r !== 0 && (s.resetIV = !0, o = r - 16);
    }
    s.rangeStart = o, s.rangeEnd = u;
  }
  return s;
}
function Ta(i, e) {
  const t = new Error(`GAP ${i.gap ? "tag" : "attribute"} found`), s = {
    type: V.MEDIA_ERROR,
    details: D.FRAG_GAP,
    fatal: !1,
    frag: i,
    error: t,
    networkDetails: null
  };
  return e && (s.part = e), (e || i).stats.aborted = !0, new et(s);
}
function eg(i) {
  return i === "AES-128" || i === "AES-256";
}
class et extends Error {
  constructor(e) {
    super(e.error.message), this.data = void 0, this.data = e;
  }
}
class Rl extends Be {
  constructor(e, t) {
    super(e, t), this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this);
  }
  destroy() {
    this.onHandlerDestroying(), this.onHandlerDestroyed();
  }
  onHandlerDestroying() {
    this.clearNextTick(), this.clearInterval();
  }
  onHandlerDestroyed() {
  }
  hasInterval() {
    return !!this._tickInterval;
  }
  hasNextTick() {
    return !!this._tickTimer;
  }
  /**
   * @param millis - Interval time (ms)
   * @eturns True when interval has been scheduled, false when already scheduled (no effect)
   */
  setInterval(e) {
    return this._tickInterval ? !1 : (this._tickCallCount = 0, this._tickInterval = self.setInterval(this._boundTick, e), !0);
  }
  /**
   * @returns True when interval was cleared, false when none was set (no effect)
   */
  clearInterval() {
    return this._tickInterval ? (self.clearInterval(this._tickInterval), this._tickInterval = null, !0) : !1;
  }
  /**
   * @returns True when timeout was cleared, false when none was set (no effect)
   */
  clearNextTick() {
    return this._tickTimer ? (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0) : !1;
  }
  /**
   * Will call the subclass doTick implementation in this main loop tick
   * or in the next one (via setTimeout(,0)) in case it has already been called
   * in this tick (in case this is a re-entrant call).
   */
  tick() {
    this._tickCallCount++, this._tickCallCount === 1 && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0);
  }
  tickImmediate() {
    this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0);
  }
  /**
   * For subclass to implement task logic
   * @abstract
   */
  doTick() {
  }
}
class rn {
  constructor(e, t, s, r = 0, n = -1, a = !1) {
    this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = Is(), this.buffering = {
      audio: Is(),
      video: Is(),
      audiovideo: Is()
    }, this.level = e, this.sn = t, this.id = s, this.size = r, this.part = n, this.partial = a;
  }
}
function Is() {
  return {
    start: 0,
    executeStart: 0,
    executeEnd: 0,
    end: 0
  };
}
const Sa = {
  length: 0,
  start: () => 0,
  end: () => 0
};
class j {
  /**
   * Return true if `media`'s buffered include `position`
   */
  static isBuffered(e, t) {
    if (e) {
      const s = j.getBuffered(e);
      for (let r = s.length; r--; )
        if (t >= s.start(r) && t <= s.end(r))
          return !0;
    }
    return !1;
  }
  static bufferedRanges(e) {
    if (e) {
      const t = j.getBuffered(e);
      return j.timeRangesToArray(t);
    }
    return [];
  }
  static timeRangesToArray(e) {
    const t = [];
    for (let s = 0; s < e.length; s++)
      t.push({
        start: e.start(s),
        end: e.end(s)
      });
    return t;
  }
  static bufferInfo(e, t, s) {
    if (e) {
      const r = j.bufferedRanges(e);
      if (r.length)
        return j.bufferedInfo(r, t, s);
    }
    return {
      len: 0,
      start: t,
      end: t,
      bufferedIndex: -1
    };
  }
  static bufferedInfo(e, t, s) {
    t = Math.max(0, t), e.length > 1 && e.sort((h, c) => h.start - c.start || c.end - h.end);
    let r = -1, n = [];
    if (s)
      for (let h = 0; h < e.length; h++) {
        t >= e[h].start && t <= e[h].end && (r = h);
        const c = n.length;
        if (c) {
          const d = n[c - 1].end;
          e[h].start - d < s ? e[h].end > d && (n[c - 1].end = e[h].end) : n.push(e[h]);
        } else
          n.push(e[h]);
      }
    else
      n = e;
    let a = 0, o, u = t, l = t;
    for (let h = 0; h < n.length; h++) {
      const c = n[h].start, d = n[h].end;
      if (r === -1 && t >= c && t <= d && (r = h), t + s >= c && t < d)
        u = c, l = d, a = l - t;
      else if (t + s < c) {
        o = c;
        break;
      }
    }
    return {
      len: a,
      start: u || 0,
      end: l || 0,
      nextStart: o,
      buffered: e,
      bufferedIndex: r
    };
  }
  /**
   * Safe method to get buffered property.
   * SourceBuffer.buffered may throw if SourceBuffer is removed from it's MediaSource
   */
  static getBuffered(e) {
    try {
      return e.buffered || Sa;
    } catch (t) {
      return ne.log("failed to get media.buffered", t), Sa;
    }
  }
}
const _l = /\{\$([a-zA-Z0-9-_]+)\}/g;
function xa(i) {
  return _l.test(i);
}
function xr(i, e) {
  if (i.variableList !== null || i.hasVariableRefs) {
    const t = i.variableList;
    return e.replace(_l, (s) => {
      const r = s.substring(2, s.length - 1), n = t?.[r];
      return n === void 0 ? (i.playlistParsingError || (i.playlistParsingError = new Error(`Missing preceding EXT-X-DEFINE tag for Variable Reference: "${r}"`)), s) : n;
    });
  }
  return e;
}
function Aa(i, e, t) {
  let s = i.variableList;
  s || (i.variableList = s = {});
  let r, n;
  if ("QUERYPARAM" in e) {
    r = e.QUERYPARAM;
    try {
      const a = new self.URL(t).searchParams;
      if (a.has(r))
        n = a.get(r);
      else
        throw new Error(`"${r}" does not match any query parameter in URI: "${t}"`);
    } catch (a) {
      i.playlistParsingError || (i.playlistParsingError = new Error(`EXT-X-DEFINE QUERYPARAM: ${a.message}`));
    }
  } else
    r = e.NAME, n = e.VALUE;
  r in s ? i.playlistParsingError || (i.playlistParsingError = new Error(`EXT-X-DEFINE duplicate Variable Name declarations: "${r}"`)) : s[r] = n || "";
}
function tg(i, e, t) {
  const s = e.IMPORT;
  if (t && s in t) {
    let r = i.variableList;
    r || (i.variableList = r = {}), r[s] = t[s];
  } else
    i.playlistParsingError || (i.playlistParsingError = new Error(`EXT-X-DEFINE IMPORT attribute not found in Multivariant Playlist: "${s}"`));
}
const sg = /^(\d+)x(\d+)$/, Ia = /(.+?)=(".*?"|.*?)(?:,|$)/g;
class ce {
  constructor(e, t) {
    typeof e == "string" && (e = ce.parseAttrList(e, t)), ae(this, e);
  }
  get clientAttrs() {
    return Object.keys(this).filter((e) => e.substring(0, 2) === "X-");
  }
  decimalInteger(e) {
    const t = parseInt(this[e], 10);
    return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t;
  }
  hexadecimalInteger(e) {
    if (this[e]) {
      let t = (this[e] || "0x").slice(2);
      t = (t.length & 1 ? "0" : "") + t;
      const s = new Uint8Array(t.length / 2);
      for (let r = 0; r < t.length / 2; r++)
        s[r] = parseInt(t.slice(r * 2, r * 2 + 2), 16);
      return s;
    }
    return null;
  }
  hexadecimalIntegerAsNumber(e) {
    const t = parseInt(this[e], 16);
    return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t;
  }
  decimalFloatingPoint(e) {
    return parseFloat(this[e]);
  }
  optionalFloat(e, t) {
    const s = this[e];
    return s ? parseFloat(s) : t;
  }
  enumeratedString(e) {
    return this[e];
  }
  enumeratedStringList(e, t) {
    const s = this[e];
    return (s ? s.split(/[ ,]+/) : []).reduce((r, n) => (r[n.toLowerCase()] = !0, r), t);
  }
  bool(e) {
    return this[e] === "YES";
  }
  decimalResolution(e) {
    const t = sg.exec(this[e]);
    if (t !== null)
      return {
        width: parseInt(t[1], 10),
        height: parseInt(t[2], 10)
      };
  }
  static parseAttrList(e, t) {
    let s;
    const r = {};
    for (Ia.lastIndex = 0; (s = Ia.exec(e)) !== null; ) {
      const a = s[1].trim();
      let o = s[2];
      const u = o.indexOf('"') === 0 && o.lastIndexOf('"') === o.length - 1;
      let l = !1;
      if (u)
        o = o.slice(1, -1);
      else
        switch (a) {
          case "IV":
          case "SCTE35-CMD":
          case "SCTE35-IN":
          case "SCTE35-OUT":
            l = !0;
        }
      if (t && (u || l))
        o = xr(t, o);
      else if (!l && !u)
        switch (a) {
          case "CLOSED-CAPTIONS":
            if (o === "NONE")
              break;
          // falls through
          case "ALLOWED-CPC":
          case "CLASS":
          case "ASSOC-LANGUAGE":
          case "AUDIO":
          case "BYTERANGE":
          case "CHANNELS":
          case "CHARACTERISTICS":
          case "CODECS":
          case "DATA-ID":
          case "END-DATE":
          case "GROUP-ID":
          case "ID":
          case "IMPORT":
          case "INSTREAM-ID":
          case "KEYFORMAT":
          case "KEYFORMATVERSIONS":
          case "LANGUAGE":
          case "NAME":
          case "PATHWAY-ID":
          case "QUERYPARAM":
          case "RECENTLY-REMOVED-DATERANGES":
          case "SERVER-URI":
          case "STABLE-RENDITION-ID":
          case "STABLE-VARIANT-ID":
          case "START-DATE":
          case "SUBTITLES":
          case "SUPPLEMENTAL-CODECS":
          case "URI":
          case "VALUE":
          case "VIDEO":
          case "X-ASSET-LIST":
          case "X-ASSET-URI":
            ne.warn(`${e}: attribute ${a} is missing quotes`);
        }
      r[a] = o;
    }
    return r;
  }
}
const ig = "com.apple.hls.interstitial";
function rg(i) {
  return i !== "ID" && i !== "CLASS" && i !== "CUE" && i !== "START-DATE" && i !== "DURATION" && i !== "END-DATE" && i !== "END-ON-NEXT";
}
function ng(i) {
  return i === "SCTE35-OUT" || i === "SCTE35-IN" || i === "SCTE35-CMD";
}
class Dl {
  constructor(e, t, s = 0) {
    var r;
    if (this.attr = void 0, this.tagAnchor = void 0, this.tagOrder = void 0, this._startDate = void 0, this._endDate = void 0, this._dateAtEnd = void 0, this._cue = void 0, this._badValueForSameId = void 0, this.tagAnchor = t?.tagAnchor || null, this.tagOrder = (r = t?.tagOrder) != null ? r : s, t) {
      const n = t.attr;
      for (const a in n)
        if (Object.prototype.hasOwnProperty.call(e, a) && e[a] !== n[a]) {
          ne.warn(`DATERANGE tag attribute: "${a}" does not match for tags with ID: "${e.ID}"`), this._badValueForSameId = a;
          break;
        }
      e = ae(new ce({}), n, e);
    }
    if (this.attr = e, t ? (this._startDate = t._startDate, this._cue = t._cue, this._endDate = t._endDate, this._dateAtEnd = t._dateAtEnd) : this._startDate = new Date(e["START-DATE"]), "END-DATE" in this.attr) {
      const n = t?.endDate || new Date(this.attr["END-DATE"]);
      F(n.getTime()) && (this._endDate = n);
    }
  }
  get id() {
    return this.attr.ID;
  }
  get class() {
    return this.attr.CLASS;
  }
  get cue() {
    const e = this._cue;
    return e === void 0 ? this._cue = this.attr.enumeratedStringList(this.attr.CUE ? "CUE" : "X-CUE", {
      pre: !1,
      post: !1,
      once: !1
    }) : e;
  }
  get startTime() {
    const {
      tagAnchor: e
    } = this;
    return e === null || e.programDateTime === null ? (ne.warn(`Expected tagAnchor Fragment with PDT set for DateRange "${this.id}": ${e}`), NaN) : e.start + (this.startDate.getTime() - e.programDateTime) / 1e3;
  }
  get startDate() {
    return this._startDate;
  }
  get endDate() {
    const e = this._endDate || this._dateAtEnd;
    if (e)
      return e;
    const t = this.duration;
    return t !== null ? this._dateAtEnd = new Date(this._startDate.getTime() + t * 1e3) : null;
  }
  get duration() {
    if ("DURATION" in this.attr) {
      const e = this.attr.decimalFloatingPoint("DURATION");
      if (F(e))
        return e;
    } else if (this._endDate)
      return (this._endDate.getTime() - this._startDate.getTime()) / 1e3;
    return null;
  }
  get plannedDuration() {
    return "PLANNED-DURATION" in this.attr ? this.attr.decimalFloatingPoint("PLANNED-DURATION") : null;
  }
  get endOnNext() {
    return this.attr.bool("END-ON-NEXT");
  }
  get isInterstitial() {
    return this.class === ig;
  }
  get isValid() {
    return !!this.id && !this._badValueForSameId && F(this.startDate.getTime()) && (this.duration === null || this.duration >= 0) && (!this.endOnNext || !!this.class) && (!this.attr.CUE || !this.cue.pre && !this.cue.post || this.cue.pre !== this.cue.post) && (!this.isInterstitial || "X-ASSET-URI" in this.attr || "X-ASSET-LIST" in this.attr);
  }
}
const ag = 10;
class og {
  constructor(e) {
    this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.dateRanges = void 0, this.dateRangeTagCount = 0, this.live = !0, this.requestScheduled = -1, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.misses = 0, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.encryptedFragments = void 0, this.playlistParsingError = null, this.variableList = null, this.hasVariableRefs = !1, this.appliedTimelineOffset = void 0, this.fragments = [], this.encryptedFragments = [], this.dateRanges = {}, this.url = e;
  }
  reloaded(e) {
    if (!e) {
      this.advanced = !0, this.updated = !0;
      return;
    }
    const t = this.lastPartSn - e.lastPartSn, s = this.lastPartIndex - e.lastPartIndex;
    this.updated = this.endSN !== e.endSN || !!s || !!t || !this.live, this.advanced = this.endSN > e.endSN || t > 0 || t === 0 && s > 0, this.updated || this.advanced ? this.misses = Math.floor(e.misses * 0.6) : this.misses = e.misses + 1;
  }
  hasKey(e) {
    return this.encryptedFragments.some((t) => {
      let s = t.decryptdata;
      return s || (t.setKeyFormat(e.keyFormat), s = t.decryptdata), !!s && e.matches(s);
    });
  }
  get hasProgramDateTime() {
    return this.fragments.length ? F(this.fragments[this.fragments.length - 1].programDateTime) : !1;
  }
  get levelTargetDuration() {
    return this.averagetargetduration || this.targetduration || ag;
  }
  get drift() {
    const e = this.driftEndTime - this.driftStartTime;
    return e > 0 ? (this.driftEnd - this.driftStart) * 1e3 / e : 1;
  }
  get edge() {
    return this.partEnd || this.fragmentEnd;
  }
  get partEnd() {
    var e;
    return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd;
  }
  get fragmentEnd() {
    return this.fragments.length ? this.fragments[this.fragments.length - 1].end : 0;
  }
  get fragmentStart() {
    return this.fragments.length ? this.fragments[0].start : 0;
  }
  get age() {
    return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0;
  }
  get lastPartIndex() {
    var e;
    return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].index : -1;
  }
  get maxPartIndex() {
    const e = this.partList;
    if (e) {
      const t = this.lastPartIndex;
      if (t !== -1) {
        for (let s = e.length; s--; )
          if (e[s].index > t)
            return e[s].index;
        return t;
      }
    }
    return 0;
  }
  get lastPartSn() {
    var e;
    return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN;
  }
  get expired() {
    if (this.live && this.age && this.misses < 3) {
      const e = this.partEnd - this.fragmentStart;
      return this.age > Math.max(e, this.totalduration) + this.levelTargetDuration;
    }
    return !1;
  }
}
function ri(i, e) {
  return i.length === e.length ? !i.some((t, s) => t !== e[s]) : !1;
}
function ba(i, e) {
  return !i && !e ? !0 : !i || !e ? !1 : ri(i, e);
}
function Bt(i) {
  return i === "AES-128" || i === "AES-256" || i === "AES-256-CTR";
}
function nn(i) {
  switch (i) {
    case "AES-128":
    case "AES-256":
      return dt.cbc;
    case "AES-256-CTR":
      return dt.ctr;
    default:
      throw new Error(`invalid full segment method ${i}`);
  }
}
function an(i) {
  return Uint8Array.from(atob(i), (e) => e.charCodeAt(0));
}
function Ar(i) {
  return Uint8Array.from(unescape(encodeURIComponent(i)), (e) => e.charCodeAt(0));
}
function lg(i) {
  const e = Ar(i).subarray(0, 16), t = new Uint8Array(16);
  return t.set(e, 16 - e.length), t;
}
function Cl(i) {
  const e = function(s, r, n) {
    const a = s[r];
    s[r] = s[n], s[n] = a;
  };
  e(i, 0, 3), e(i, 1, 2), e(i, 4, 5), e(i, 6, 7);
}
function Pl(i) {
  const e = i.split(":");
  let t = null;
  if (e[0] === "data" && e.length === 2) {
    const s = e[1].split(";"), r = s[s.length - 1].split(",");
    if (r.length === 2) {
      const n = r[0] === "base64", a = r[1];
      n ? (s.splice(-1, 1), t = an(a)) : t = lg(a);
    }
  }
  return t;
}
const ni = typeof self < "u" ? self : void 0;
var de = {
  CLEARKEY: "org.w3.clearkey",
  FAIRPLAY: "com.apple.fps",
  PLAYREADY: "com.microsoft.playready",
  WIDEVINE: "com.widevine.alpha"
}, Se = {
  CLEARKEY: "org.w3.clearkey",
  FAIRPLAY: "com.apple.streamingkeydelivery",
  PLAYREADY: "com.microsoft.playready",
  WIDEVINE: "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
};
function Gs(i) {
  switch (i) {
    case Se.FAIRPLAY:
      return de.FAIRPLAY;
    case Se.PLAYREADY:
      return de.PLAYREADY;
    case Se.WIDEVINE:
      return de.WIDEVINE;
    case Se.CLEARKEY:
      return de.CLEARKEY;
  }
}
function Ni(i) {
  switch (i) {
    case de.FAIRPLAY:
      return Se.FAIRPLAY;
    case de.PLAYREADY:
      return Se.PLAYREADY;
    case de.WIDEVINE:
      return Se.WIDEVINE;
    case de.CLEARKEY:
      return Se.CLEARKEY;
  }
}
function ss(i) {
  const {
    drmSystems: e,
    widevineLicenseUrl: t
  } = i, s = e ? [de.FAIRPLAY, de.WIDEVINE, de.PLAYREADY, de.CLEARKEY].filter((r) => !!e[r]) : [];
  return !s[de.WIDEVINE] && t && s.push(de.WIDEVINE), s;
}
const kl = (function(i) {
  return ni != null && (i = ni.navigator) != null && i.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
})();
function ug(i, e, t, s) {
  let r;
  switch (i) {
    case de.FAIRPLAY:
      r = ["cenc", "sinf"];
      break;
    case de.WIDEVINE:
    case de.PLAYREADY:
      r = ["cenc"];
      break;
    case de.CLEARKEY:
      r = ["cenc", "keyids"];
      break;
    default:
      throw new Error(`Unknown key-system: ${i}`);
  }
  return hg(r, e, t, s);
}
function hg(i, e, t, s) {
  return [{
    initDataTypes: i,
    persistentState: s.persistentState || "optional",
    distinctiveIdentifier: s.distinctiveIdentifier || "optional",
    sessionTypes: s.sessionTypes || [s.sessionType || "temporary"],
    audioCapabilities: e.map((n) => ({
      contentType: `audio/mp4; codecs=${n}`,
      robustness: s.audioRobustness || "",
      encryptionScheme: s.audioEncryptionScheme || null
    })),
    videoCapabilities: t.map((n) => ({
      contentType: `video/mp4; codecs=${n}`,
      robustness: s.videoRobustness || "",
      encryptionScheme: s.videoEncryptionScheme || null
    }))
  }];
}
function cg(i) {
  var e;
  return !!i && (i.sessionType === "persistent-license" || !!((e = i.sessionTypes) != null && e.some((t) => t === "persistent-license")));
}
function wl(i) {
  const e = new Uint16Array(i.buffer, i.byteOffset, i.byteLength / 2), t = String.fromCharCode.apply(null, Array.from(e)), s = t.substring(t.indexOf("<"), t.length), a = new DOMParser().parseFromString(s, "text/xml").getElementsByTagName("KID")[0];
  if (a) {
    const o = a.childNodes[0] ? a.childNodes[0].nodeValue : a.getAttribute("VALUE");
    if (o) {
      const u = an(o).subarray(0, 16);
      return Cl(u), u;
    }
  }
  return null;
}
let Ct = {};
class ht {
  static clearKeyUriToKeyIdMap() {
    Ct = {};
  }
  static setKeyIdForUri(e, t) {
    Ct[e] = t;
  }
  static addKeyIdForUri(e) {
    const t = Object.keys(Ct).length % Number.MAX_SAFE_INTEGER, s = new Uint8Array(16);
    return new DataView(s.buffer, 12, 4).setUint32(0, t), Ct[e] = s, s;
  }
  constructor(e, t, s, r = [1], n = null, a) {
    this.uri = void 0, this.method = void 0, this.keyFormat = void 0, this.keyFormatVersions = void 0, this.encrypted = void 0, this.isCommonEncryption = void 0, this.iv = null, this.key = null, this.keyId = null, this.pssh = null, this.method = e, this.uri = t, this.keyFormat = s, this.keyFormatVersions = r, this.iv = n, this.encrypted = e ? e !== "NONE" : !1, this.isCommonEncryption = this.encrypted && !Bt(e), a != null && a.startsWith("0x") && (this.keyId = new Uint8Array(ol(a)));
  }
  matches(e) {
    return e.uri === this.uri && e.method === this.method && e.encrypted === this.encrypted && e.keyFormat === this.keyFormat && ri(e.keyFormatVersions, this.keyFormatVersions) && ba(e.iv, this.iv) && ba(e.keyId, this.keyId);
  }
  isSupported() {
    if (this.method) {
      if (Bt(this.method) || this.method === "NONE")
        return !0;
      if (this.keyFormat === "identity")
        return this.method === "SAMPLE-AES";
      switch (this.keyFormat) {
        case Se.FAIRPLAY:
        case Se.WIDEVINE:
        case Se.PLAYREADY:
        case Se.CLEARKEY:
          return ["SAMPLE-AES", "SAMPLE-AES-CENC", "SAMPLE-AES-CTR"].indexOf(this.method) !== -1;
      }
    }
    return !1;
  }
  getDecryptData(e, t) {
    if (!this.encrypted || !this.uri)
      return null;
    if (Bt(this.method)) {
      let n = this.iv;
      return n || (typeof e != "number" && (ne.warn(`missing IV for initialization segment with method="${this.method}" - compliance issue`), e = 0), n = fg(e)), new ht(this.method, this.uri, "identity", this.keyFormatVersions, n);
    }
    if (this.keyId) {
      const n = Ct[this.uri];
      if (n && !ri(this.keyId, n) && ht.setKeyIdForUri(this.uri, this.keyId), this.pssh)
        return this;
    }
    const s = Pl(this.uri);
    if (s)
      switch (this.keyFormat) {
        case Se.WIDEVINE:
          if (this.pssh = s, !this.keyId) {
            const n = pf(s.buffer);
            if (n.length) {
              var r;
              const a = n[0];
              this.keyId = (r = a.kids) != null && r.length ? a.kids[0] : null;
            }
          }
          this.keyId || (this.keyId = La(t));
          break;
        case Se.PLAYREADY: {
          const n = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]);
          this.pssh = mf(n, null, s), this.keyId = wl(s);
          break;
        }
        default: {
          let n = s.subarray(0, 16);
          if (n.length !== 16) {
            const a = new Uint8Array(16);
            a.set(n, 16 - n.length), n = a;
          }
          this.keyId = n;
          break;
        }
      }
    if (!this.keyId || this.keyId.byteLength !== 16) {
      let n;
      n = dg(t), n || (n = La(t), n || (n = Ct[this.uri])), n && (this.keyId = n, ht.setKeyIdForUri(this.uri, n));
    }
    return this;
  }
}
function dg(i) {
  const e = i?.[Se.WIDEVINE];
  return e ? e.keyId : null;
}
function La(i) {
  const e = i?.[Se.PLAYREADY];
  if (e) {
    const t = Pl(e.uri);
    if (t)
      return wl(t);
  }
  return null;
}
function fg(i) {
  const e = new Uint8Array(16);
  for (let t = 12; t < 16; t++)
    e[t] = i >> 8 * (15 - t) & 255;
  return e;
}
const Ra = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g, _a = /#EXT-X-MEDIA:(.*)/g, gg = /^#EXT(?:INF|-X-TARGETDURATION):/m, Bi = new RegExp([
  /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
  // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
  /(?!#) *(\S[^\r\n]*)/.source,
  // segment URI, group 3 => the URI (note newline is not eaten)
  /#.*/.source
  // All other non-segment oriented tags will match with all groups empty
].join("|"), "g"), mg = new RegExp([/#EXT-X-(PROGRAM-DATE-TIME|BYTERANGE|DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source, /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source, /#EXT-X-(DISCONTINUITY|ENDLIST|GAP|INDEPENDENT-SEGMENTS)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|"));
class Xe {
  static findGroup(e, t) {
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      if (r.id === t)
        return r;
    }
  }
  static resolve(e, t) {
    return zr.buildAbsoluteURL(t, e, {
      alwaysNormalize: !0
    });
  }
  static isMediaPlaylist(e) {
    return gg.test(e);
  }
  static parseMasterPlaylist(e, t) {
    const s = xa(e), r = {
      contentSteering: null,
      levels: [],
      playlistParsingError: null,
      sessionData: null,
      sessionKeys: null,
      startTimeOffset: null,
      variableList: null,
      hasVariableRefs: s
    }, n = [];
    if (Ra.lastIndex = 0, !e.startsWith("#EXTM3U"))
      return r.playlistParsingError = new Error("no EXTM3U delimiter"), r;
    let a;
    for (; (a = Ra.exec(e)) != null; )
      if (a[1]) {
        var o;
        const l = new ce(a[1], r), h = xr(r, a[2]), c = {
          attrs: l,
          bitrate: l.decimalInteger("BANDWIDTH") || l.decimalInteger("AVERAGE-BANDWIDTH"),
          name: l.NAME,
          url: Xe.resolve(h, t)
        }, d = l.decimalResolution("RESOLUTION");
        d && (c.width = d.width, c.height = d.height), Pa(l.CODECS, c);
        const g = l["SUPPLEMENTAL-CODECS"];
        g && (c.supplemental = {}, Pa(g, c.supplemental)), (o = c.unknownCodecs) != null && o.length || n.push(c), r.levels.push(c);
      } else if (a[3]) {
        const l = a[3], h = a[4];
        switch (l) {
          case "SESSION-DATA": {
            const c = new ce(h, r), d = c["DATA-ID"];
            d && (r.sessionData === null && (r.sessionData = {}), r.sessionData[d] = c);
            break;
          }
          case "SESSION-KEY": {
            const c = Da(h, t, r);
            c.encrypted && c.isSupported() ? (r.sessionKeys === null && (r.sessionKeys = []), r.sessionKeys.push(c)) : ne.warn(`[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "${h}"`);
            break;
          }
          case "DEFINE": {
            {
              const c = new ce(h, r);
              Aa(r, c, t);
            }
            break;
          }
          case "CONTENT-STEERING": {
            const c = new ce(h, r);
            r.contentSteering = {
              uri: Xe.resolve(c["SERVER-URI"], t),
              pathwayId: c["PATHWAY-ID"] || "."
            };
            break;
          }
          case "START": {
            r.startTimeOffset = Ca(h);
            break;
          }
        }
      }
    const u = n.length > 0 && n.length < r.levels.length;
    return r.levels = u ? n : r.levels, r.levels.length === 0 && (r.playlistParsingError = new Error("no levels found in manifest")), r;
  }
  static parseMasterPlaylistMedia(e, t, s) {
    let r;
    const n = {}, a = s.levels, o = {
      AUDIO: a.map((l) => ({
        id: l.attrs.AUDIO,
        audioCodec: l.audioCodec
      })),
      SUBTITLES: a.map((l) => ({
        id: l.attrs.SUBTITLES,
        textCodec: l.textCodec
      })),
      "CLOSED-CAPTIONS": []
    };
    let u = 0;
    for (_a.lastIndex = 0; (r = _a.exec(e)) !== null; ) {
      const l = new ce(r[1], s), h = l.TYPE;
      if (h) {
        const c = o[h], d = n[h] || [];
        n[h] = d;
        const g = l.LANGUAGE, f = l["ASSOC-LANGUAGE"], m = l.CHANNELS, p = l.CHARACTERISTICS, y = l["INSTREAM-ID"], v = {
          attrs: l,
          bitrate: 0,
          id: u++,
          groupId: l["GROUP-ID"] || "",
          name: l.NAME || g || "",
          type: h,
          default: l.bool("DEFAULT"),
          autoselect: l.bool("AUTOSELECT"),
          forced: l.bool("FORCED"),
          lang: g,
          url: l.URI ? Xe.resolve(l.URI, t) : ""
        };
        if (f && (v.assocLang = f), m && (v.channels = m), p && (v.characteristics = p), y && (v.instreamId = y), c != null && c.length) {
          const T = Xe.findGroup(c, v.groupId) || c[0];
          ka(v, T, "audioCodec"), ka(v, T, "textCodec");
        }
        d.push(v);
      }
    }
    return n;
  }
  static parseLevelPlaylist(e, t, s, r, n, a) {
    var o;
    const u = {
      url: t
    }, l = new og(t), h = l.fragments, c = [];
    let d = null, g = 0, f = 0, m = 0, p = 0, y = 0, v = null, T = new Oi(r, u), S, x, L, A = -1, I = !1, _ = null, b;
    if (Bi.lastIndex = 0, l.m3u8 = e, l.hasVariableRefs = xa(e), ((o = Bi.exec(e)) == null ? void 0 : o[0]) !== "#EXTM3U")
      return l.playlistParsingError = new Error("Missing format identifier #EXTM3U"), l;
    for (; (S = Bi.exec(e)) !== null; ) {
      I && (I = !1, T = new Oi(r, u), T.playlistOffset = m, T.setStart(m), T.sn = g, T.cc = p, y && (T.bitrate = y), T.level = s, d && (T.initSegment = d, d.rawProgramDateTime && (T.rawProgramDateTime = d.rawProgramDateTime, d.rawProgramDateTime = null), _ && (T.setByteRange(_), _ = null)));
      const K = S[1];
      if (K) {
        T.duration = parseFloat(K);
        const $ = (" " + S[2]).slice(1);
        T.title = $ || null, T.tagList.push($ ? ["INF", K, $] : ["INF", K]);
      } else if (S[3]) {
        if (F(T.duration)) {
          T.playlistOffset = m, T.setStart(m), L && Oa(T, L, l), T.sn = g, T.level = s, T.cc = p, h.push(T);
          const $ = (" " + S[3]).slice(1);
          T.relurl = xr(l, $), Ir(T, v, c), v = T, m += T.duration, g++, f = 0, I = !0;
        }
      } else {
        if (S = S[0].match(mg), !S) {
          ne.warn("No matches on slow regex match for level playlist!");
          continue;
        }
        for (x = 1; x < S.length && S[x] === void 0; x++)
          ;
        const $ = (" " + S[x]).slice(1), k = (" " + S[x + 1]).slice(1), G = S[x + 2] ? (" " + S[x + 2]).slice(1) : null;
        switch ($) {
          case "BYTERANGE":
            v ? T.setByteRange(k, v) : T.setByteRange(k);
            break;
          case "PROGRAM-DATE-TIME":
            T.rawProgramDateTime = k, T.tagList.push(["PROGRAM-DATE-TIME", k]), A === -1 && (A = h.length);
            break;
          case "PLAYLIST-TYPE":
            l.type && Ze(l, $, S), l.type = k.toUpperCase();
            break;
          case "MEDIA-SEQUENCE":
            l.startSN !== 0 ? Ze(l, $, S) : h.length > 0 && Ma(l, $, S), g = l.startSN = parseInt(k);
            break;
          case "SKIP": {
            l.skippedSegments && Ze(l, $, S);
            const N = new ce(k, l), H = N.decimalInteger("SKIPPED-SEGMENTS");
            if (F(H)) {
              l.skippedSegments += H;
              for (let w = H; w--; )
                h.push(null);
              g += H;
            }
            const W = N.enumeratedString("RECENTLY-REMOVED-DATERANGES");
            W && (l.recentlyRemovedDateranges = (l.recentlyRemovedDateranges || []).concat(W.split("	")));
            break;
          }
          case "TARGETDURATION":
            l.targetduration !== 0 && Ze(l, $, S), l.targetduration = Math.max(parseInt(k), 1);
            break;
          case "VERSION":
            l.version !== null && Ze(l, $, S), l.version = parseInt(k);
            break;
          case "INDEPENDENT-SEGMENTS":
            break;
          case "ENDLIST":
            l.live || Ze(l, $, S), l.live = !1;
            break;
          case "#":
            (k || G) && T.tagList.push(G ? [k, G] : [k]);
            break;
          case "DISCONTINUITY":
            p++, T.tagList.push(["DIS"]);
            break;
          case "GAP":
            T.gap = !0, T.tagList.push([$]);
            break;
          case "BITRATE":
            T.tagList.push([$, k]), y = parseInt(k) * 1e3, F(y) ? T.bitrate = y : y = 0;
            break;
          case "DATERANGE": {
            const N = new ce(k, l), H = new Dl(N, l.dateRanges[N.ID], l.dateRangeTagCount);
            l.dateRangeTagCount++, H.isValid || l.skippedSegments ? l.dateRanges[H.id] = H : ne.warn(`Ignoring invalid DATERANGE tag: "${k}"`), T.tagList.push(["EXT-X-DATERANGE", k]);
            break;
          }
          case "DEFINE": {
            {
              const N = new ce(k, l);
              "IMPORT" in N ? tg(l, N, a) : Aa(l, N, t);
            }
            break;
          }
          case "DISCONTINUITY-SEQUENCE":
            l.startCC !== 0 ? Ze(l, $, S) : h.length > 0 && Ma(l, $, S), l.startCC = p = parseInt(k);
            break;
          case "KEY": {
            const N = Da(k, t, l);
            if (N.isSupported()) {
              if (N.method === "NONE") {
                L = void 0;
                break;
              }
              L || (L = {});
              const H = L[N.keyFormat];
              H != null && H.matches(N) || (H && (L = ae({}, L)), L[N.keyFormat] = N);
            } else
              ne.warn(`[Keys] Ignoring unsupported EXT-X-KEY tag: "${k}"`);
            break;
          }
          case "START":
            l.startTimeOffset = Ca(k);
            break;
          case "MAP": {
            const N = new ce(k, l);
            if (T.duration) {
              const H = new Oi(r, u);
              wa(H, N, s, L), d = H, T.initSegment = d, d.rawProgramDateTime && !T.rawProgramDateTime && (T.rawProgramDateTime = d.rawProgramDateTime);
            } else {
              const H = T.byteRangeEndOffset;
              if (H) {
                const W = T.byteRangeStartOffset;
                _ = `${H - W}@${W}`;
              } else
                _ = null;
              wa(T, N, s, L), d = T, I = !0;
            }
            d.cc = p;
            break;
          }
          case "SERVER-CONTROL": {
            b && Ze(l, $, S), b = new ce(k), l.canBlockReload = b.bool("CAN-BLOCK-RELOAD"), l.canSkipUntil = b.optionalFloat("CAN-SKIP-UNTIL", 0), l.canSkipDateRanges = l.canSkipUntil > 0 && b.bool("CAN-SKIP-DATERANGES"), l.partHoldBack = b.optionalFloat("PART-HOLD-BACK", 0), l.holdBack = b.optionalFloat("HOLD-BACK", 0);
            break;
          }
          case "PART-INF": {
            l.partTarget && Ze(l, $, S);
            const N = new ce(k);
            l.partTarget = N.decimalFloatingPoint("PART-TARGET");
            break;
          }
          case "PART": {
            let N = l.partList;
            N || (N = l.partList = []);
            const H = f > 0 ? N[N.length - 1] : void 0, W = f++, w = new ce(k, l), O = new ef(w, T, u, W, H);
            N.push(O), T.duration += O.duration;
            break;
          }
          case "PRELOAD-HINT": {
            const N = new ce(k, l);
            l.preloadHint = N;
            break;
          }
          case "RENDITION-REPORT": {
            const N = new ce(k, l);
            l.renditionReports = l.renditionReports || [], l.renditionReports.push(N);
            break;
          }
          default:
            ne.warn(`line parsed but not handled: ${S}`);
            break;
        }
      }
    }
    v && !v.relurl ? (h.pop(), m -= v.duration, l.partList && (l.fragmentHint = v)) : l.partList && (Ir(T, v, c), T.cc = p, l.fragmentHint = T, L && Oa(T, L, l)), l.targetduration || (l.playlistParsingError = new Error("Missing Target Duration"));
    const P = h.length, M = h[0], U = h[P - 1];
    if (m += l.skippedSegments * l.targetduration, m > 0 && P && U) {
      l.averagetargetduration = m / P;
      const K = U.sn;
      l.endSN = K !== "initSegment" ? K : 0, l.live || (U.endList = !0), A > 0 && (Eg(h, A), M && c.unshift(M));
    }
    return l.fragmentHint && (m += l.fragmentHint.duration), l.totalduration = m, c.length && l.dateRangeTagCount && M && Ol(c, l), l.endCC = p, l;
  }
}
function Ol(i, e) {
  let t = i.length;
  if (!t)
    if (e.hasProgramDateTime) {
      const o = e.fragments[e.fragments.length - 1];
      i.push(o), t++;
    } else
      return;
  const s = i[t - 1], r = e.live ? 1 / 0 : e.totalduration, n = Object.keys(e.dateRanges);
  for (let o = n.length; o--; ) {
    const u = e.dateRanges[n[o]], l = u.startDate.getTime();
    u.tagAnchor = s.ref;
    for (let h = t; h--; ) {
      var a;
      if (((a = i[h]) == null ? void 0 : a.sn) < e.startSN)
        break;
      const c = pg(e, l, i, h, r);
      if (c !== -1) {
        u.tagAnchor = e.fragments[c].ref;
        break;
      }
    }
  }
}
function pg(i, e, t, s, r) {
  const n = t[s];
  if (n) {
    const o = n.programDateTime;
    if (e >= o || s === 0) {
      var a;
      const u = (((a = t[s + 1]) == null ? void 0 : a.start) || r) - n.start;
      if (e <= o + u * 1e3) {
        const l = t[s].sn - i.startSN;
        if (l < 0)
          return -1;
        const h = i.fragments;
        if (h.length > t.length) {
          const d = (t[s + 1] || h[h.length - 1]).sn - i.startSN;
          for (let g = d; g > l; g--) {
            const f = h[g].programDateTime;
            if (e >= f && e < f + h[g].duration * 1e3)
              return g;
          }
        }
        return l;
      }
    }
  }
  return -1;
}
function Da(i, e, t) {
  var s, r;
  const n = new ce(i, t), a = (s = n.METHOD) != null ? s : "", o = n.URI, u = n.hexadecimalInteger("IV"), l = n.KEYFORMATVERSIONS, h = (r = n.KEYFORMAT) != null ? r : "identity";
  o && n.IV && !u && ne.error(`Invalid IV: ${n.IV}`);
  const c = o ? Xe.resolve(o, e) : "", d = (l || "1").split("/").map(Number).filter(Number.isFinite);
  return new ht(a, c, h, d, u, n.KEYID);
}
function Ca(i) {
  const t = new ce(i).decimalFloatingPoint("TIME-OFFSET");
  return F(t) ? t : null;
}
function Pa(i, e) {
  let t = (i || "").split(/[ ,]+/).filter((s) => s);
  ["video", "audio", "text"].forEach((s) => {
    const r = t.filter((n) => Jr(n, s));
    r.length && (e[`${s}Codec`] = r.map((n) => n.split("/")[0]).join(","), t = t.filter((n) => r.indexOf(n) === -1));
  }), e.unknownCodecs = t;
}
function ka(i, e, t) {
  const s = e[t];
  s && (i[t] = s);
}
function Eg(i, e) {
  let t = i[e];
  for (let s = e; s--; ) {
    const r = i[s];
    if (!r)
      return;
    r.programDateTime = t.programDateTime - r.duration * 1e3, t = r;
  }
}
function Ir(i, e, t) {
  i.rawProgramDateTime ? t.push(i) : e != null && e.programDateTime && (i.programDateTime = e.endProgramDateTime);
}
function wa(i, e, t, s) {
  i.relurl = e.URI, e.BYTERANGE && i.setByteRange(e.BYTERANGE), i.level = t, i.sn = "initSegment", s && (i.levelkeys = s), i.initSegment = null;
}
function Oa(i, e, t) {
  i.levelkeys = e;
  const {
    encryptedFragments: s
  } = t;
  (!s.length || s[s.length - 1].levelkeys !== e) && Object.keys(e).some((r) => e[r].isCommonEncryption) && s.push(i);
}
function Ze(i, e, t) {
  i.playlistParsingError = new Error(`#EXT-X-${e} must not appear more than once (${t[0]})`);
}
function Ma(i, e, t) {
  i.playlistParsingError = new Error(`#EXT-X-${e} must appear before the first Media Segment (${t[0]})`);
}
function Ui(i, e) {
  const t = e.startPTS;
  if (F(t)) {
    let s = 0, r;
    e.sn > i.sn ? (s = t - i.start, r = i) : (s = i.start - t, r = e), r.duration !== s && r.setDuration(s);
  } else e.sn > i.sn ? i.cc === e.cc && i.minEndPTS ? e.setStart(i.start + (i.minEndPTS - i.start)) : e.setStart(i.start + i.duration) : e.setStart(Math.max(i.start - e.duration, 0));
}
function Ml(i, e, t, s, r, n, a) {
  s - t <= 0 && (a.warn("Fragment should have a positive duration", e), s = t + e.duration, n = r + e.duration);
  let u = t, l = s;
  const h = e.startPTS, c = e.endPTS;
  if (F(h)) {
    const y = Math.abs(h - t);
    i && y > i.totalduration ? a.warn(`media timestamps and playlist times differ by ${y}s for level ${e.level} ${i.url}`) : F(e.deltaPTS) ? e.deltaPTS = Math.max(y, e.deltaPTS) : e.deltaPTS = y, u = Math.max(t, h), t = Math.min(t, h), r = e.startDTS !== void 0 ? Math.min(r, e.startDTS) : r, l = Math.min(s, c), s = Math.max(s, c), n = e.endDTS !== void 0 ? Math.max(n, e.endDTS) : n;
  }
  const d = t - e.start;
  e.start !== 0 && e.setStart(t), e.setDuration(s - e.start), e.startPTS = t, e.maxStartPTS = u, e.startDTS = r, e.endPTS = s, e.minEndPTS = l, e.endDTS = n;
  const g = e.sn;
  if (!i || g < i.startSN || g > i.endSN)
    return 0;
  let f;
  const m = g - i.startSN, p = i.fragments;
  for (p[m] = e, f = m; f > 0; f--)
    Ui(p[f], p[f - 1]);
  for (f = m; f < p.length - 1; f++)
    Ui(p[f], p[f + 1]);
  return i.fragmentHint && Ui(p[p.length - 1], i.fragmentHint), i.PTSKnown = i.alignedSliding = !0, d;
}
function yg(i, e, t) {
  if (i === e)
    return;
  let s = null;
  const r = i.fragments;
  for (let h = r.length - 1; h >= 0; h--) {
    const c = r[h].initSegment;
    if (c) {
      s = c;
      break;
    }
  }
  i.fragmentHint && delete i.fragmentHint.endPTS;
  let n;
  Sg(i, e, (h, c, d, g) => {
    if ((!e.startCC || e.skippedSegments) && c.cc !== h.cc) {
      const f = h.cc - c.cc;
      for (let m = d; m < g.length; m++)
        g[m].cc += f;
      e.endCC = g[g.length - 1].cc;
    }
    F(h.startPTS) && F(h.endPTS) && (c.setStart(c.startPTS = h.startPTS), c.startDTS = h.startDTS, c.maxStartPTS = h.maxStartPTS, c.endPTS = h.endPTS, c.endDTS = h.endDTS, c.minEndPTS = h.minEndPTS, c.setDuration(h.endPTS - h.startPTS), c.duration && (n = c), e.PTSKnown = e.alignedSliding = !0), h.hasStreams && (c.elementaryStreams = h.elementaryStreams), c.loader = h.loader, h.hasStats && (c.stats = h.stats), h.initSegment && (c.initSegment = h.initSegment, s = h.initSegment);
  });
  const a = e.fragments, o = e.fragmentHint ? a.concat(e.fragmentHint) : a;
  if (s && o.forEach((h) => {
    var c;
    h && (!h.initSegment || h.initSegment.relurl === ((c = s) == null ? void 0 : c.relurl)) && (h.initSegment = s);
  }), e.skippedSegments) {
    if (e.deltaUpdateFailed = a.some((h) => !h), e.deltaUpdateFailed) {
      t.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
      for (let h = e.skippedSegments; h--; )
        a.shift();
      e.startSN = a[0].sn;
    } else {
      e.canSkipDateRanges && (e.dateRanges = vg(i.dateRanges, e, t));
      const h = i.fragments.filter((c) => c.rawProgramDateTime);
      if (i.hasProgramDateTime && !e.hasProgramDateTime)
        for (let c = 1; c < o.length; c++)
          o[c].programDateTime === null && Ir(o[c], o[c - 1], h);
      Ol(h, e);
    }
    e.endCC = a[a.length - 1].cc;
  }
  if (!e.startCC) {
    var u;
    const h = Bl(i, e.startSN - 1);
    e.startCC = (u = h?.cc) != null ? u : a[0].cc;
  }
  Tg(i.partList, e.partList, (h, c) => {
    c.elementaryStreams = h.elementaryStreams, c.stats = h.stats;
  }), n ? Ml(e, n, n.startPTS, n.endPTS, n.startDTS, n.endDTS, t) : Fl(i, e), a.length && (e.totalduration = e.edge - a[0].start), e.driftStartTime = i.driftStartTime, e.driftStart = i.driftStart;
  const l = e.advancedDateTime;
  if (e.advanced && l) {
    const h = e.edge;
    e.driftStart || (e.driftStartTime = l, e.driftStart = h), e.driftEndTime = l, e.driftEnd = h;
  } else
    e.driftEndTime = i.driftEndTime, e.driftEnd = i.driftEnd, e.advancedDateTime = i.advancedDateTime;
  e.requestScheduled === -1 && (e.requestScheduled = i.requestScheduled);
}
function vg(i, e, t) {
  const {
    dateRanges: s,
    recentlyRemovedDateranges: r
  } = e, n = ae({}, i);
  r && r.forEach((u) => {
    delete n[u];
  });
  const o = Object.keys(n).length;
  return o ? (Object.keys(s).forEach((u) => {
    const l = n[u], h = new Dl(s[u].attr, l);
    h.isValid ? (n[u] = h, l || (h.tagOrder += o)) : t.warn(`Ignoring invalid Playlist Delta Update DATERANGE tag: "${le(s[u].attr)}"`);
  }), n) : s;
}
function Tg(i, e, t) {
  if (i && e) {
    let s = 0;
    for (let r = 0, n = i.length; r <= n; r++) {
      const a = i[r], o = e[r + s];
      a && o && a.index === o.index && a.fragment.sn === o.fragment.sn ? t(a, o) : s--;
    }
  }
}
function Sg(i, e, t) {
  const s = e.skippedSegments, r = Math.max(i.startSN, e.startSN) - e.startSN, n = (i.fragmentHint ? 1 : 0) + (s ? e.endSN : Math.min(i.endSN, e.endSN)) - e.startSN, a = e.startSN - i.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, u = i.fragmentHint ? i.fragments.concat(i.fragmentHint) : i.fragments;
  for (let l = r; l <= n; l++) {
    const h = u[a + l];
    let c = o[l];
    if (s && !c && h && (c = e.fragments[l] = h), h && c) {
      t(h, c, l, o);
      const d = h.relurl, g = c.relurl;
      if (d && xg(d, g)) {
        e.playlistParsingError = Fa(`media sequence mismatch ${c.sn}:`, i, e, h, c);
        return;
      } else if (h.cc !== c.cc) {
        e.playlistParsingError = Fa(`discontinuity sequence mismatch (${h.cc}!=${c.cc})`, i, e, h, c);
        return;
      }
    }
  }
}
function Fa(i, e, t, s, r) {
  return new Error(`${i} ${r.url}
Playlist starting @${e.startSN}
${e.m3u8}

Playlist starting @${t.startSN}
${t.m3u8}`);
}
function Fl(i, e, t = !0) {
  const s = e.startSN + e.skippedSegments - i.startSN, r = i.fragments, n = s >= 0;
  let a = 0;
  if (n && s < r.length)
    a = r[s].start;
  else if (n && e.startSN === i.endSN + 1)
    a = i.fragmentEnd;
  else if (n && t)
    a = i.fragmentStart + s * e.levelTargetDuration;
  else if (!e.skippedSegments && e.fragmentStart === 0)
    a = i.fragmentStart;
  else
    return;
  br(e, a);
}
function br(i, e) {
  if (e) {
    const t = i.fragments;
    for (let s = i.skippedSegments; s < t.length; s++)
      t[s].addStart(e);
    i.fragmentHint && i.fragmentHint.addStart(e);
  }
}
function Nl(i, e = 1 / 0) {
  let t = 1e3 * i.targetduration;
  if (i.updated) {
    const s = i.fragments;
    if (s.length && t * 4 > e) {
      const n = s[s.length - 1].duration * 1e3;
      n < t && (t = n);
    }
  } else
    t /= 2;
  return Math.round(t);
}
function Bl(i, e, t) {
  if (!i)
    return null;
  let s = i.fragments[e - i.startSN];
  return s || (s = i.fragmentHint, s && s.sn === e) ? s : e < i.startSN && t && t.sn === e ? t : null;
}
function Na(i, e, t) {
  return i ? Ul(i.partList, e, t) : null;
}
function Ul(i, e, t) {
  if (i)
    for (let s = i.length; s--; ) {
      const r = i[s];
      if (r.index === t && r.fragment.sn === e)
        return r;
    }
  return null;
}
function $l(i) {
  i.forEach((e, t) => {
    var s;
    (s = e.details) == null || s.fragments.forEach((r) => {
      r.level = t, r.initSegment && (r.initSegment.level = t);
    });
  });
}
function xg(i, e) {
  return i !== e && e ? Ba(i) !== Ba(e) : !1;
}
function Ba(i) {
  return i.replace(/\?[^?]*$/, "");
}
function is(i, e) {
  for (let s = 0, r = i.length; s < r; s++) {
    var t;
    if (((t = i[s]) == null ? void 0 : t.cc) === e)
      return i[s];
  }
  return null;
}
function Ag(i, e) {
  return !!(i && e.startCC < i.endCC && e.endCC > i.startCC);
}
function Ua(i, e) {
  const t = i.start + e;
  i.startPTS = t, i.setStart(t), i.endPTS = t + i.duration;
}
function Gl(i, e) {
  const t = e.fragments;
  for (let s = 0, r = t.length; s < r; s++)
    Ua(t[s], i);
  e.fragmentHint && Ua(e.fragmentHint, i), e.alignedSliding = !0;
}
function Ig(i, e) {
  i && (Hl(e, i), e.alignedSliding || ai(e, i), !e.alignedSliding && !e.skippedSegments && Fl(i, e, !1));
}
function Hl(i, e) {
  if (!Ag(e, i))
    return;
  const t = Math.min(e.endCC, i.endCC), s = is(e.fragments, t), r = is(i.fragments, t);
  if (!s || !r)
    return;
  ne.log(`Aligning playlist at start of dicontinuity sequence ${t}`);
  const n = s.start - r.start;
  Gl(n, i);
}
function ai(i, e) {
  if (!i.hasProgramDateTime || !e.hasProgramDateTime)
    return;
  const t = i.fragments, s = e.fragments;
  if (!t.length || !s.length)
    return;
  let r, n;
  const a = Math.min(e.endCC, i.endCC);
  e.startCC < a && i.startCC < a && (r = is(s, a), n = is(t, a)), (!r || !n) && (r = s[Math.floor(s.length / 2)], n = is(t, r.cc) || t[Math.floor(t.length / 2)]);
  const o = r.programDateTime, u = n.programDateTime;
  if (!o || !u)
    return;
  const l = (u - o) / 1e3 - (n.start - r.start);
  Gl(l, i);
}
function be(i, e, t) {
  Re(i, e, t), i.addEventListener(e, t);
}
function Re(i, e, t) {
  i.removeEventListener(e, t);
}
const bg = {
  toString: function(i) {
    let e = "";
    const t = i.length;
    for (let s = 0; s < t; s++)
      e += `[${i.start(s).toFixed(3)}-${i.end(s).toFixed(3)}]`;
    return e;
  }
}, C = {
  STOPPED: "STOPPED",
  IDLE: "IDLE",
  KEY_LOADING: "KEY_LOADING",
  FRAG_LOADING: "FRAG_LOADING",
  FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
  WAITING_TRACK: "WAITING_TRACK",
  PARSING: "PARSING",
  PARSED: "PARSED",
  ENDED: "ENDED",
  ERROR: "ERROR",
  WAITING_INIT_PTS: "WAITING_INIT_PTS",
  WAITING_LEVEL: "WAITING_LEVEL"
};
class on extends Rl {
  constructor(e, t, s, r, n) {
    super(r, e.logger), this.hls = void 0, this.fragPrevious = null, this.fragCurrent = null, this.fragmentTracker = void 0, this.transmuxer = null, this._state = C.STOPPED, this.playlistType = void 0, this.media = null, this.mediaBuffer = null, this.config = void 0, this.bitrateTest = !1, this.lastCurrentTime = 0, this.nextLoadPosition = 0, this.startPosition = 0, this.startTimeOffset = null, this.retryDate = 0, this.levels = null, this.fragmentLoader = void 0, this.keyLoader = void 0, this.levelLastLoaded = null, this.startFragRequested = !1, this.decrypter = void 0, this.initPTS = [], this.buffering = !0, this.loadingParts = !1, this.loopSn = void 0, this.onMediaSeeking = () => {
      const {
        config: a,
        fragCurrent: o,
        media: u,
        mediaBuffer: l,
        state: h
      } = this, c = u ? u.currentTime : 0, d = j.bufferInfo(l || u, c, a.maxBufferHole), g = !d.len;
      if (this.log(`Media seeking to ${F(c) ? c.toFixed(3) : c}, state: ${h}, ${g ? "out of" : "in"} buffer`), this.state === C.ENDED)
        this.resetLoadingState();
      else if (o) {
        const f = a.maxFragLookUpTolerance, m = o.start - f, p = o.start + o.duration + f;
        if (g || p < d.start || m > d.end) {
          const y = c > p;
          (c < m || y) && (y && o.loader && (this.log(`Cancelling fragment load for seek (sn: ${o.sn})`), o.abortRequests(), this.resetLoadingState()), this.fragPrevious = null);
        }
      }
      if (u) {
        this.fragmentTracker.removeFragmentsInRange(c, 1 / 0, this.playlistType, !0);
        const f = this.lastCurrentTime;
        if (c > f && (this.lastCurrentTime = c), !this.loadingParts) {
          const m = Math.max(d.end, c), p = this.shouldLoadParts(this.getLevelDetails(), m);
          p && (this.log(`LL-Part loading ON after seeking to ${c.toFixed(2)} with buffer @${m.toFixed(2)}`), this.loadingParts = p);
        }
      }
      this.hls.hasEnoughToStart || (this.log(`Setting ${g ? "startPosition" : "nextLoadPosition"} to ${c} for seek without enough to start`), this.nextLoadPosition = c, g && (this.startPosition = c)), g && this.state === C.IDLE && this.tickImmediate();
    }, this.onMediaEnded = () => {
      this.log("setting startPosition to 0 because media ended"), this.startPosition = this.lastCurrentTime = 0;
    }, this.playlistType = n, this.hls = e, this.fragmentLoader = new Jf(e.config), this.keyLoader = s, this.fragmentTracker = t, this.config = e.config, this.decrypter = new sn(e.config);
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(E.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(E.ERROR, this.onError, this);
  }
  doTick() {
    this.onTickEnd();
  }
  onTickEnd() {
  }
  startLoad(e) {
  }
  stopLoad() {
    if (this.state === C.STOPPED)
      return;
    this.fragmentLoader.abort(), this.keyLoader.abort(this.playlistType);
    const e = this.fragCurrent;
    e != null && e.loader && (e.abortRequests(), this.fragmentTracker.removeFragment(e)), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = C.STOPPED;
  }
  get startPositionValue() {
    const {
      nextLoadPosition: e,
      startPosition: t
    } = this;
    return t === -1 && e ? e : t;
  }
  get bufferingEnabled() {
    return this.buffering;
  }
  pauseBuffering() {
    this.buffering = !1;
  }
  resumeBuffering() {
    this.buffering = !0;
  }
  get inFlightFrag() {
    return {
      frag: this.fragCurrent,
      state: this.state
    };
  }
  _streamEnded(e, t) {
    if (t.live || !this.media)
      return !1;
    const s = e.end || 0, r = this.config.timelineOffset || 0;
    if (s <= r)
      return !1;
    const n = e.buffered;
    this.config.maxBufferHole && n && n.length > 1 && (e = j.bufferedInfo(n, e.start, 0));
    const a = e.nextStart;
    if (a && a > r && a < t.edge || this.media.currentTime < e.start)
      return !1;
    const u = t.partList;
    if (u != null && u.length) {
      const h = u[u.length - 1];
      return j.isBuffered(this.media, h.start + h.duration / 2);
    }
    const l = t.fragments[t.fragments.length - 1].type;
    return this.fragmentTracker.isEndListAppended(l);
  }
  getLevelDetails() {
    if (this.levels && this.levelLastLoaded !== null)
      return this.levelLastLoaded.details;
  }
  get timelineOffset() {
    const e = this.config.timelineOffset;
    if (e) {
      var t;
      return ((t = this.getLevelDetails()) == null ? void 0 : t.appliedTimelineOffset) || e;
    }
    return 0;
  }
  onMediaAttached(e, t) {
    const s = this.media = this.mediaBuffer = t.media;
    be(s, "seeking", this.onMediaSeeking), be(s, "ended", this.onMediaEnded);
    const r = this.config;
    this.levels && r.autoStartLoad && this.state === C.STOPPED && this.startLoad(r.startPosition);
  }
  onMediaDetaching(e, t) {
    const s = !!t.transferMedia, r = this.media;
    if (r !== null) {
      if (r.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), Re(r, "seeking", this.onMediaSeeking), Re(r, "ended", this.onMediaEnded), this.keyLoader && !s && this.keyLoader.detach(), this.media = this.mediaBuffer = null, this.loopSn = void 0, s) {
        this.resetLoadingState(), this.resetTransmuxer();
        return;
      }
      this.loadingParts = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad();
    }
  }
  onManifestLoading() {
    this.initPTS = [], this.levels = this.levelLastLoaded = this.fragCurrent = null, this.lastCurrentTime = this.startPosition = 0, this.startFragRequested = !1;
  }
  onError(e, t) {
  }
  onManifestLoaded(e, t) {
    this.startTimeOffset = t.startTimeOffset;
  }
  onHandlerDestroying() {
    this.stopLoad(), this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null), super.onHandlerDestroying(), this.hls = this.onMediaSeeking = this.onMediaEnded = null;
  }
  onHandlerDestroyed() {
    this.state = C.STOPPED, this.fragmentLoader && this.fragmentLoader.destroy(), this.keyLoader && this.keyLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.keyLoader = this.fragmentLoader = this.fragmentTracker = null, super.onHandlerDestroyed();
  }
  loadFragment(e, t, s) {
    this.startFragRequested = !0, this._loadFragForPlayback(e, t, s);
  }
  _loadFragForPlayback(e, t, s) {
    const r = (n) => {
      const a = n.frag;
      if (this.fragContextChanged(a)) {
        this.warn(`${a.type} sn: ${a.sn}${n.part ? " part: " + n.part.index : ""} of ${this.fragInfo(a, !1, n.part)}) was dropped during download.`), this.fragmentTracker.removeFragment(a);
        return;
      }
      a.stats.chunkCount++, this._handleFragmentLoadProgress(n);
    };
    this._doFragLoad(e, t, s, r).then((n) => {
      if (!n)
        return;
      const a = this.state, o = n.frag;
      if (this.fragContextChanged(o)) {
        (a === C.FRAG_LOADING || !this.fragCurrent && a === C.PARSING) && (this.fragmentTracker.removeFragment(o), this.state = C.IDLE);
        return;
      }
      "payload" in n && (this.log(`Loaded ${o.type} sn: ${o.sn} of ${this.playlistLabel()} ${o.level}`), this.hls.trigger(E.FRAG_LOADED, n)), this._handleFragmentLoadComplete(n);
    }).catch((n) => {
      this.state === C.STOPPED || this.state === C.ERROR || (this.warn(`Frag error: ${n?.message || n}`), this.resetFragmentLoading(e));
    });
  }
  clearTrackerIfNeeded(e) {
    var t;
    const {
      fragmentTracker: s
    } = this;
    if (s.getState(e) === pe.APPENDING) {
      const n = e.type, a = this.getFwdBufferInfo(this.mediaBuffer, n), o = Math.max(e.duration, a ? a.len : this.config.maxBufferLength), u = this.backtrackFragment;
      ((u ? e.sn - u.sn : 0) === 1 || this.reduceMaxBufferLength(o, e.duration)) && s.removeFragment(e);
    } else ((t = this.mediaBuffer) == null ? void 0 : t.buffered.length) === 0 ? s.removeAllFragments() : s.hasParts(e.type) && (s.detectPartialFragments({
      frag: e,
      part: null,
      stats: e.stats,
      id: e.type
    }), s.getState(e) === pe.PARTIAL && s.removeFragment(e));
  }
  checkLiveUpdate(e) {
    if (e.updated && !e.live) {
      const t = e.fragments[e.fragments.length - 1];
      this.fragmentTracker.detectPartialFragments({
        frag: t,
        part: null,
        stats: t.stats,
        id: t.type
      });
    }
    e.fragments[0] || (e.deltaUpdateFailed = !0);
  }
  waitForLive(e) {
    const t = e.details;
    return t?.live && t.type !== "EVENT" && (this.levelLastLoaded !== e || t.expired);
  }
  flushMainBuffer(e, t, s = null) {
    if (!(e - t))
      return;
    const r = {
      startOffset: e,
      endOffset: t,
      type: s
    };
    this.hls.trigger(E.BUFFER_FLUSHING, r);
  }
  _loadInitSegment(e, t) {
    this._doFragLoad(e, t).then((s) => {
      const r = s?.frag;
      if (!r || this.fragContextChanged(r) || !this.levels)
        throw new Error("init load aborted");
      return s;
    }).then((s) => {
      const {
        hls: r
      } = this, {
        frag: n,
        payload: a
      } = s, o = n.decryptdata;
      if (a && a.byteLength > 0 && o != null && o.key && o.iv && Bt(o.method)) {
        const u = self.performance.now();
        return this.decrypter.decrypt(new Uint8Array(a), o.key.buffer, o.iv.buffer, nn(o.method)).catch((l) => {
          throw r.trigger(E.ERROR, {
            type: V.MEDIA_ERROR,
            details: D.FRAG_DECRYPT_ERROR,
            fatal: !1,
            error: l,
            reason: l.message,
            frag: n
          }), l;
        }).then((l) => {
          const h = self.performance.now();
          return r.trigger(E.FRAG_DECRYPTED, {
            frag: n,
            payload: l,
            stats: {
              tstart: u,
              tdecrypt: h
            }
          }), s.payload = l, this.completeInitSegmentLoad(s);
        });
      }
      return this.completeInitSegmentLoad(s);
    }).catch((s) => {
      this.state === C.STOPPED || this.state === C.ERROR || (this.warn(s), this.resetFragmentLoading(e));
    });
  }
  completeInitSegmentLoad(e) {
    const {
      levels: t
    } = this;
    if (!t)
      throw new Error("init load aborted, missing levels");
    const s = e.frag.stats;
    this.state !== C.STOPPED && (this.state = C.IDLE), e.frag.data = new Uint8Array(e.payload), s.parsing.start = s.buffering.start = self.performance.now(), s.parsing.end = s.buffering.end = self.performance.now(), this.tick();
  }
  unhandledEncryptionError(e, t) {
    var s, r;
    const n = e.tracks;
    if (n && !t.encrypted && ((s = n.audio) != null && s.encrypted || (r = n.video) != null && r.encrypted) && (!this.config.emeEnabled || !this.keyLoader.emeController)) {
      const a = this.media, o = new Error(`Encrypted track with no key in ${this.fragInfo(t)} (media ${a ? "attached mediaKeys: " + a.mediaKeys : "detached"})`);
      return this.warn(o.message), !a || a.mediaKeys ? !1 : (this.hls.trigger(E.ERROR, {
        type: V.KEY_SYSTEM_ERROR,
        details: D.KEY_SYSTEM_NO_KEYS,
        fatal: !1,
        error: o,
        frag: t
      }), this.resetTransmuxer(), !0);
    }
    return !1;
  }
  fragContextChanged(e) {
    const {
      fragCurrent: t
    } = this;
    return !e || !t || e.sn !== t.sn || e.level !== t.level;
  }
  fragBufferedComplete(e, t) {
    const s = this.mediaBuffer ? this.mediaBuffer : this.media;
    if (this.log(`Buffered ${e.type} sn: ${e.sn}${t ? " part: " + t.index : ""} of ${this.fragInfo(e, !1, t)} > buffer:${s ? bg.toString(j.getBuffered(s)) : "(detached)"})`), ge(e)) {
      var r;
      if (e.type !== B.SUBTITLE) {
        const a = e.elementaryStreams;
        if (!Object.keys(a).some((o) => !!a[o])) {
          this.state = C.IDLE;
          return;
        }
      }
      const n = (r = this.levels) == null ? void 0 : r[e.level];
      n != null && n.fragmentError && (this.log(`Resetting level fragment error count of ${n.fragmentError} on frag buffered`), n.fragmentError = 0);
    }
    this.state = C.IDLE;
  }
  _handleFragmentLoadComplete(e) {
    const {
      transmuxer: t
    } = this;
    if (!t)
      return;
    const {
      frag: s,
      part: r,
      partsLoaded: n
    } = e, a = !n || n.length === 0 || n.some((u) => !u), o = new rn(s.level, s.sn, s.stats.chunkCount + 1, 0, r ? r.index : -1, !a);
    t.flush(o);
  }
  _handleFragmentLoadProgress(e) {
  }
  _doFragLoad(e, t, s = null, r) {
    var n;
    this.fragCurrent = e;
    const a = t.details;
    if (!this.levels || !a)
      throw new Error(`frag load aborted, missing level${a ? "" : " detail"}s`);
    let o = null;
    if (e.encrypted && !((n = e.decryptdata) != null && n.key)) {
      if (this.log(`Loading key for ${e.sn} of [${a.startSN}-${a.endSN}], ${this.playlistLabel()} ${e.level}`), this.state = C.KEY_LOADING, this.fragCurrent = e, o = this.keyLoader.load(e).then((d) => {
        if (!this.fragContextChanged(d.frag))
          return this.hls.trigger(E.KEY_LOADED, d), this.state === C.KEY_LOADING && (this.state = C.IDLE), d;
      }), this.hls.trigger(E.KEY_LOADING, {
        frag: e
      }), this.fragCurrent === null)
        return this.log("context changed in KEY_LOADING"), Promise.resolve(null);
    } else e.encrypted || (o = this.keyLoader.loadClear(e, a.encryptedFragments, this.startFragRequested), o && this.log("[eme] blocking frag load until media-keys acquired"));
    const u = this.fragPrevious;
    if (ge(e) && (!u || e.sn !== u.sn)) {
      const d = this.shouldLoadParts(t.details, e.end);
      d !== this.loadingParts && (this.log(`LL-Part loading ${d ? "ON" : "OFF"} loading sn ${u?.sn}->${e.sn}`), this.loadingParts = d);
    }
    if (s = Math.max(e.start, s || 0), this.loadingParts && ge(e)) {
      const d = a.partList;
      if (d && r) {
        s > a.fragmentEnd && a.fragmentHint && (e = a.fragmentHint);
        const g = this.getNextPart(d, e, s);
        if (g > -1) {
          const f = d[g];
          e = this.fragCurrent = f.fragment, this.log(`Loading ${e.type} sn: ${e.sn} part: ${f.index} (${g}/${d.length - 1}) of ${this.fragInfo(e, !1, f)}) cc: ${e.cc} [${a.startSN}-${a.endSN}], target: ${parseFloat(s.toFixed(3))}`), this.nextLoadPosition = f.start + f.duration, this.state = C.FRAG_LOADING;
          let m;
          return o ? m = o.then((p) => !p || this.fragContextChanged(p.frag) ? null : this.doFragPartsLoad(e, f, t, r)).catch((p) => this.handleFragLoadError(p)) : m = this.doFragPartsLoad(e, f, t, r).catch((p) => this.handleFragLoadError(p)), this.hls.trigger(E.FRAG_LOADING, {
            frag: e,
            part: f,
            targetBufferTime: s
          }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts")) : m;
        } else if (!e.url || this.loadedEndOfParts(d, s))
          return Promise.resolve(null);
      }
    }
    if (ge(e) && this.loadingParts) {
      var l;
      this.log(`LL-Part loading OFF after next part miss @${s.toFixed(2)} Check buffer at sn: ${e.sn} loaded parts: ${(l = a.partList) == null ? void 0 : l.filter((d) => d.loaded).map((d) => `[${d.start}-${d.end}]`)}`), this.loadingParts = !1;
    } else if (!e.url)
      return Promise.resolve(null);
    this.log(`Loading ${e.type} sn: ${e.sn} of ${this.fragInfo(e, !1)}) cc: ${e.cc} ${"[" + a.startSN + "-" + a.endSN + "]"}, target: ${parseFloat(s.toFixed(3))}`), F(e.sn) && !this.bitrateTest && (this.nextLoadPosition = e.start + e.duration), this.state = C.FRAG_LOADING;
    const h = this.config.progressive && e.type !== B.SUBTITLE;
    let c;
    return h && o ? c = o.then((d) => !d || this.fragContextChanged(d.frag) ? null : this.fragmentLoader.load(e, r)).catch((d) => this.handleFragLoadError(d)) : c = Promise.all([this.fragmentLoader.load(e, h ? r : void 0), o]).then(([d]) => (!h && r && r(d), d)).catch((d) => this.handleFragLoadError(d)), this.hls.trigger(E.FRAG_LOADING, {
      frag: e,
      targetBufferTime: s
    }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING")) : c;
  }
  doFragPartsLoad(e, t, s, r) {
    return new Promise((n, a) => {
      var o;
      const u = [], l = (o = s.details) == null ? void 0 : o.partList, h = (c) => {
        this.fragmentLoader.loadPart(e, c, r).then((d) => {
          u[c.index] = d;
          const g = d.part;
          this.hls.trigger(E.FRAG_LOADED, d);
          const f = Na(s.details, e.sn, c.index + 1) || Ul(l, e.sn, c.index + 1);
          if (f)
            h(f);
          else
            return n({
              frag: e,
              part: g,
              partsLoaded: u
            });
        }).catch(a);
      };
      h(t);
    });
  }
  handleFragLoadError(e) {
    if ("data" in e) {
      const t = e.data;
      t.frag && t.details === D.INTERNAL_ABORTED ? this.handleFragLoadAborted(t.frag, t.part) : t.frag && t.type === V.KEY_SYSTEM_ERROR ? (t.frag.abortRequests(), this.resetStartWhenNotLoaded(), this.resetFragmentLoading(t.frag)) : this.hls.trigger(E.ERROR, t);
    } else
      this.hls.trigger(E.ERROR, {
        type: V.OTHER_ERROR,
        details: D.INTERNAL_EXCEPTION,
        err: e,
        error: e,
        fatal: !0
      });
    return null;
  }
  _handleTransmuxerFlush(e) {
    const t = this.getCurrentContext(e);
    if (!t || this.state !== C.PARSING) {
      !this.fragCurrent && this.state !== C.STOPPED && this.state !== C.ERROR && (this.state = C.IDLE);
      return;
    }
    const {
      frag: s,
      part: r,
      level: n
    } = t, a = self.performance.now();
    s.stats.parsing.end = a, r && (r.stats.parsing.end = a);
    const o = this.getLevelDetails(), l = o && s.sn > o.endSN || this.shouldLoadParts(o, s.end);
    l !== this.loadingParts && (this.log(`LL-Part loading ${l ? "ON" : "OFF"} after parsing segment ending @${s.end.toFixed(2)}`), this.loadingParts = l), this.updateLevelTiming(s, r, n, e.partial);
  }
  shouldLoadParts(e, t) {
    if (this.config.lowLatencyMode) {
      if (!e)
        return this.loadingParts;
      if (e.partList) {
        var s;
        const n = e.partList[0];
        if (n.fragment.type === B.SUBTITLE)
          return !1;
        const a = n.end + (((s = e.fragmentHint) == null ? void 0 : s.duration) || 0);
        if (t >= a) {
          var r;
          if ((this.hls.hasEnoughToStart ? ((r = this.media) == null ? void 0 : r.currentTime) || this.lastCurrentTime : this.getLoadPosition()) > n.start - n.fragment.duration)
            return !0;
        }
      }
    }
    return !1;
  }
  getCurrentContext(e) {
    const {
      levels: t,
      fragCurrent: s
    } = this, {
      level: r,
      sn: n,
      part: a
    } = e;
    if (!(t != null && t[r]))
      return this.warn(`Levels object was unset while buffering fragment ${n} of ${this.playlistLabel()} ${r}. The current chunk will not be buffered.`), null;
    const o = t[r], u = o.details, l = a > -1 ? Na(u, n, a) : null, h = l ? l.fragment : Bl(u, n, s);
    return h ? (s && s !== h && (h.stats = s.stats), {
      frag: h,
      part: l,
      level: o
    }) : null;
  }
  bufferFragmentData(e, t, s, r, n) {
    if (this.state !== C.PARSING)
      return;
    const {
      data1: a,
      data2: o
    } = e;
    let u = a;
    if (o && (u = Ne(a, o)), !u.length)
      return;
    const l = this.initPTS[t.cc], h = l ? -l.baseTime / l.timescale : void 0, c = {
      type: e.type,
      frag: t,
      part: s,
      chunkMeta: r,
      offset: h,
      parent: t.type,
      data: u
    };
    if (this.hls.trigger(E.BUFFER_APPENDING, c), e.dropped && e.independent && !s) {
      if (n)
        return;
      this.flushBufferGap(t);
    }
  }
  flushBufferGap(e) {
    const t = this.media;
    if (!t)
      return;
    if (!j.isBuffered(t, t.currentTime)) {
      this.flushMainBuffer(0, e.start);
      return;
    }
    const s = t.currentTime, r = j.bufferInfo(t, s, 0), n = e.duration, a = Math.min(this.config.maxFragLookUpTolerance * 2, n * 0.25), o = Math.max(Math.min(e.start - a, r.end - a), s + a);
    e.start - o > a && this.flushMainBuffer(o, e.start);
  }
  getFwdBufferInfo(e, t) {
    var s;
    const r = this.getLoadPosition();
    if (!F(r))
      return null;
    const a = this.lastCurrentTime > r || (s = this.media) != null && s.paused ? 0 : this.config.maxBufferHole;
    return this.getFwdBufferInfoAtPos(e, r, t, a);
  }
  getFwdBufferInfoAtPos(e, t, s, r) {
    const n = j.bufferInfo(e, t, r);
    if (n.len === 0 && n.nextStart !== void 0) {
      const a = this.fragmentTracker.getBufferedFrag(t, s);
      if (a && (n.nextStart <= a.end || a.gap)) {
        const o = Math.max(Math.min(n.nextStart, a.end) - t, r);
        return j.bufferInfo(e, t, o);
      }
    }
    return n;
  }
  getMaxBufferLength(e) {
    const {
      config: t
    } = this;
    let s;
    return e ? s = Math.max(8 * t.maxBufferSize / e, t.maxBufferLength) : s = t.maxBufferLength, Math.min(s, t.maxMaxBufferLength);
  }
  exceedsMaxBuffer(e, t, s) {
    const r = e.nextStart;
    if (r && s.start > r) {
      const n = e.buffered;
      if (n) {
        let a = e.len;
        const o = e.bufferedIndex;
        for (let u = n.length - 1; u > o; u--)
          n[u].start < s.start && (a += n[u].end - n[u].start);
        return a >= t;
      }
    }
    return !1;
  }
  reduceMaxBufferLength(e, t) {
    const s = this.config, r = Math.max(Math.min(e - t, s.maxBufferLength), t), n = Math.max(e - t * 3, s.maxMaxBufferLength / 2, r);
    return n >= r ? (s.maxMaxBufferLength = n, this.warn(`Reduce max buffer length to ${n}s`), !0) : !1;
  }
  getAppendedFrag(e, t = B.MAIN) {
    const s = this.fragmentTracker ? this.fragmentTracker.getAppendedFrag(e, t) : null;
    return s && "fragment" in s ? s.fragment : s;
  }
  getNextFragment(e, t) {
    const s = t.fragments, r = s.length;
    if (!r)
      return null;
    const {
      config: n
    } = this, a = t.fragmentStart, o = n.lowLatencyMode && !!t.partList;
    let u = null;
    if (t.live) {
      const c = n.initialLiveManifestSize;
      if (r < c)
        return this.warn(`Not enough fragments to start playback (have: ${r}, need: ${c})`), null;
      if (!t.PTSKnown && !this.startFragRequested && this.startPosition === -1 || e < a) {
        var l;
        o && !this.loadingParts && (this.log("LL-Part loading ON for initial live fragment"), this.loadingParts = !0), u = this.getInitialLiveFragment(t);
        const d = this.config.startPosition, g = this.hls.startPosition, f = this.hls.liveSyncPosition, m = ((l = u) == null ? void 0 : l.start) || 0;
        let p, y;
        g !== -1 && g >= a ? (p = g, y = g === d ? "config" : "next load start") : f !== null ? (p = f, y = "live edge") : (p = e, y = "buffer pos"), p < m && (p = m, y = "live frag start"), p < a && (p = a, y = "playlist start"), (this.startPosition != p || this.nextLoadPosition != p) && (this.log(`Setting startPosition to ${p.toFixed(3)} ${g === -1 ? "" : `(from ${d}) `}based on ${y}. live edge: ${f} live frag start: ${m.toFixed(3)} playlist start: ${a.toFixed(3)} buffer pos: ${e}`), this.startPosition = this.nextLoadPosition = p);
      }
    } else e <= a && (u = s[0]);
    if (!u) {
      const c = this.loadingParts ? t.partEnd : t.fragmentEnd;
      u = this.getFragmentAtPosition(e, c, t);
    }
    let h = this.filterReplacedPrimary(u, t);
    if (!h && u) {
      const c = u.sn - t.startSN;
      h = this.filterReplacedPrimary(s[c + 1] || null, t);
    }
    return this.mapToInitFragWhenRequired(h);
  }
  isLoopLoading(e, t) {
    if (this.nextLoadPosition <= t)
      return !1;
    const s = this.fragmentTracker.getState(e);
    return s === pe.OK || s === pe.PARTIAL && !!e.gap;
  }
  getNextFragmentLoopLoading(e, t, s, r, n) {
    let a = null;
    if (e.gap && (a = this.getNextFragment(this.nextLoadPosition, t), a && !a.gap && s.nextStart)) {
      const o = this.getFwdBufferInfoAtPos(this.mediaBuffer ? this.mediaBuffer : this.media, s.nextStart, r, 0);
      if (o !== null && s.len + o.len >= n) {
        const u = a.sn;
        return this.loopSn !== u && (this.log(`buffer full after gaps in "${r}" playlist starting at sn: ${u}`), this.loopSn = u), null;
      }
    }
    return this.loopSn = void 0, a;
  }
  get primaryPrefetch() {
    if ($a(this.config)) {
      var e;
      if ((e = this.hls.interstitialsManager) == null || (e = e.playingItem) == null ? void 0 : e.event)
        return !0;
    }
    return !1;
  }
  filterReplacedPrimary(e, t) {
    if (!e)
      return e;
    if ($a(this.config) && e.type !== B.SUBTITLE) {
      const s = this.hls.interstitialsManager, r = s?.bufferingItem;
      if (r) {
        const a = r.event;
        if (a) {
          if (a.appendInPlace || Math.abs(e.start - r.start) > 1 || r.start === 0)
            return null;
        } else if (e.end <= r.start && t?.live === !1 || e.start > r.end && r.nextEvent && (r.nextEvent.appendInPlace || e.start - r.end > 1))
          return null;
      }
      const n = s?.playerQueue;
      if (n)
        for (let a = n.length; a--; ) {
          const o = n[a].interstitial;
          if (o.appendInPlace && e.start >= o.startTime && e.end <= o.resumeTime)
            return null;
        }
    }
    return e;
  }
  mapToInitFragWhenRequired(e) {
    return e != null && e.initSegment && !e.initSegment.data && !this.bitrateTest ? e.initSegment : e;
  }
  getNextPart(e, t, s) {
    let r = -1, n = !1, a = !0;
    for (let o = 0, u = e.length; o < u; o++) {
      const l = e[o];
      if (a = a && !l.independent, r > -1 && s < l.start)
        break;
      const h = l.loaded;
      h ? r = -1 : (n || (l.independent || a) && l.fragment === t) && (l.fragment !== t && this.warn(`Need buffer at ${s} but next unloaded part starts at ${l.start}`), r = o), n = h;
    }
    return r;
  }
  loadedEndOfParts(e, t) {
    let s;
    for (let r = e.length; r--; ) {
      if (s = e[r], !s.loaded)
        return !1;
      if (t > s.start)
        return !0;
    }
    return !1;
  }
  /*
   This method is used find the best matching first fragment for a live playlist. This fragment is used to calculate the
   "sliding" of the playlist, which is its offset from the start of playback. After sliding we can compute the real
   start and end times for each fragment in the playlist (after which this method will not need to be called).
  */
  getInitialLiveFragment(e) {
    const t = e.fragments, s = this.fragPrevious;
    let r = null;
    if (s) {
      if (e.hasProgramDateTime && (r = Gf(t, s.endProgramDateTime, this.config.maxFragLookUpTolerance), r && this.log(`Live playlist, switching playlist, load frag with same PDT: ${s.programDateTime}`)), !r) {
        const n = s.sn + 1;
        if (n >= e.startSN && n <= e.endSN) {
          const a = t[n - e.startSN];
          s.cc === a.cc && (r = a, this.log(`Live playlist, switching playlist, load frag with next SN: ${r.sn}`));
        }
        r || (r = Il(e, s.cc, s.end), r && this.log(`Live playlist, switching playlist, load frag with same CC: ${r.sn}`));
      }
    } else {
      const n = this.hls.liveSyncPosition;
      n !== null && (r = this.getFragmentAtPosition(n, this.bitrateTest ? e.fragmentEnd : e.edge, e));
    }
    return r;
  }
  /*
  This method finds the best matching fragment given the provided position.
   */
  getFragmentAtPosition(e, t, s) {
    const {
      config: r
    } = this;
    let {
      fragPrevious: n
    } = this, {
      fragments: a,
      endSN: o
    } = s;
    const {
      fragmentHint: u
    } = s, {
      maxFragLookUpTolerance: l
    } = r, h = s.partList, c = !!(this.loadingParts && h != null && h.length && u);
    c && !this.bitrateTest && h[h.length - 1].fragment.sn === u.sn && (a = a.concat(u), o = u.sn);
    let d;
    if (e < t) {
      var g;
      const m = e < this.lastCurrentTime || e > t - l || (g = this.media) != null && g.paused || !this.startFragRequested ? 0 : l;
      d = It(n, a, e, m);
    } else
      d = a[a.length - 1];
    if (d) {
      const f = d.sn - s.startSN, m = this.fragmentTracker.getState(d);
      if ((m === pe.OK || m === pe.PARTIAL && d.gap) && (n = d), n && d.sn === n.sn && (!c || h[0].fragment.sn > d.sn || !s.live) && d.level === n.level) {
        const y = a[f + 1];
        d.sn < o && this.fragmentTracker.getState(y) !== pe.OK ? d = y : d = null;
      }
    }
    return d;
  }
  alignPlaylists(e, t, s) {
    const r = e.fragments.length;
    if (!r)
      return this.warn("No fragments in live playlist"), 0;
    const n = e.fragmentStart, a = !t, o = e.alignedSliding && F(n);
    if (a || !o && !n) {
      Ig(s, e);
      const u = e.fragmentStart;
      return this.log(`Live playlist sliding: ${u.toFixed(2)} start-sn: ${t ? t.startSN : "na"}->${e.startSN} fragments: ${r}`), u;
    }
    return n;
  }
  waitForCdnTuneIn(e) {
    return e.live && e.canBlockReload && e.partTarget && e.tuneInGoal > Math.max(e.partHoldBack, e.partTarget * 3);
  }
  setStartPosition(e, t) {
    let s = this.startPosition;
    s < t && (s = -1);
    const r = this.timelineOffset;
    if (s === -1) {
      const n = this.startTimeOffset !== null, a = n ? this.startTimeOffset : e.startTimeOffset;
      a !== null && F(a) ? (s = t + a, a < 0 && (s += e.edge), s = Math.min(Math.max(t, s), t + e.totalduration), this.log(`Setting startPosition to ${s} for start time offset ${a} found in ${n ? "multivariant" : "media"} playlist`), this.startPosition = s) : e.live ? (s = this.hls.liveSyncPosition || t, this.log(`Setting startPosition to -1 to start at live edge ${s}`), this.startPosition = -1) : (this.log("setting startPosition to 0 by default"), this.startPosition = s = 0), this.lastCurrentTime = s + r;
    }
    this.nextLoadPosition = s + r;
  }
  getLoadPosition() {
    var e;
    const {
      media: t
    } = this;
    let s = 0;
    return (e = this.hls) != null && e.hasEnoughToStart && t ? s = t.currentTime : this.nextLoadPosition >= 0 && (s = this.nextLoadPosition), s;
  }
  handleFragLoadAborted(e, t) {
    this.transmuxer && e.type === this.playlistType && ge(e) && e.stats.aborted && (this.log(`Fragment ${e.sn}${t ? " part " + t.index : ""} of ${this.playlistLabel()} ${e.level} was aborted`), this.resetFragmentLoading(e));
  }
  resetFragmentLoading(e) {
    (!this.fragCurrent || !this.fragContextChanged(e) && this.state !== C.FRAG_LOADING_WAITING_RETRY) && (this.state = C.IDLE);
  }
  onFragmentOrKeyLoadError(e, t) {
    var s;
    if (t.chunkMeta && !t.frag) {
      const y = this.getCurrentContext(t.chunkMeta);
      y && (t.frag = y.frag);
    }
    const r = t.frag;
    if (!r || r.type !== e || !this.levels)
      return;
    if (this.fragContextChanged(r)) {
      var n;
      this.warn(`Frag load error must match current frag to retry ${r.url} > ${(n = this.fragCurrent) == null ? void 0 : n.url}`);
      return;
    }
    const a = t.details === D.FRAG_GAP;
    a && this.fragmentTracker.fragBuffered(r, !0);
    const o = t.errorAction;
    if (!o) {
      this.state = C.ERROR;
      return;
    }
    const {
      action: u,
      flags: l,
      retryCount: h = 0,
      retryConfig: c
    } = o, d = !!c, g = d && u === ve.RetryRequest, f = d && !o.resolved && l === Ce.MoveAllAlternatesMatchingHost, m = (s = this.hls.latestLevelDetails) == null ? void 0 : s.live;
    if (!g && f && ge(r) && !r.endList && m && !Ll(t))
      this.resetFragmentErrors(e), this.treatAsGap(r), o.resolved = !0;
    else if ((g || f) && h < c.maxNumRetry) {
      var p;
      const y = Sr((p = t.response) == null ? void 0 : p.code), v = tn(c, h);
      if (this.resetStartWhenNotLoaded(), this.retryDate = self.performance.now() + v, this.state = C.FRAG_LOADING_WAITING_RETRY, o.resolved = !0, y) {
        this.log("Waiting for connection (offline)"), this.retryDate = 1 / 0, t.reason = "offline";
        return;
      }
      this.warn(`Fragment ${r.sn} of ${e} ${r.level} errored with ${t.details}, retrying loading ${h + 1}/${c.maxNumRetry} in ${v}ms`);
    } else if (c)
      if (this.resetFragmentErrors(e), h < c.maxNumRetry)
        !a && u !== ve.RemoveAlternatePermanently && (o.resolved = !0);
      else {
        this.warn(`${t.details} reached or exceeded max retry (${h})`);
        return;
      }
    else u === ve.SendAlternateToPenaltyBox ? this.state = C.WAITING_LEVEL : this.state = C.ERROR;
    this.tickImmediate();
  }
  checkRetryDate() {
    const e = self.performance.now(), t = this.retryDate, s = t === 1 / 0;
    (!t || e >= t || s && !Sr(0)) && (s && this.log("Connection restored (online)"), this.resetStartWhenNotLoaded(), this.state = C.IDLE);
  }
  reduceLengthAndFlushBuffer(e) {
    if (this.state === C.PARSING || this.state === C.PARSED) {
      const t = e.frag, s = e.parent, r = this.getFwdBufferInfo(this.mediaBuffer, s), n = r && r.len > 0.5;
      n && this.reduceMaxBufferLength(r.len, t?.duration || 10);
      const a = !n;
      return a && this.warn(`Buffer full error while media.currentTime (${this.getLoadPosition()}) is not buffered, flush ${s} buffer`), t && (this.fragmentTracker.removeFragment(t), this.nextLoadPosition = t.start), this.resetLoadingState(), a;
    }
    return !1;
  }
  resetFragmentErrors(e) {
    e === B.AUDIO && (this.fragCurrent = null), this.hls.hasEnoughToStart || (this.startFragRequested = !1), this.state !== C.STOPPED && (this.state = C.IDLE);
  }
  afterBufferFlushed(e, t, s) {
    if (!e)
      return;
    const r = j.getBuffered(e);
    this.fragmentTracker.detectEvictedFragments(t, r, s), this.state === C.ENDED && this.resetLoadingState();
  }
  resetLoadingState() {
    this.log("Reset loading state"), this.fragCurrent = null, this.fragPrevious = null, this.state !== C.STOPPED && (this.state = C.IDLE);
  }
  resetStartWhenNotLoaded() {
    if (!this.hls.hasEnoughToStart) {
      this.startFragRequested = !1;
      const e = this.levelLastLoaded, t = e ? e.details : null;
      t != null && t.live ? (this.log("resetting startPosition for live start"), this.startPosition = -1, this.setStartPosition(t, t.fragmentStart), this.resetLoadingState()) : this.nextLoadPosition = this.startPosition;
    }
  }
  resetWhenMissingContext(e) {
    this.log(`Loading context changed while buffering sn ${e.sn} of ${this.playlistLabel()} ${e.level === -1 ? "<removed>" : e.level}. This chunk will not be buffered.`), this.removeUnbufferedFrags(), this.resetStartWhenNotLoaded(), this.resetLoadingState();
  }
  removeUnbufferedFrags(e = 0) {
    this.fragmentTracker.removeFragmentsInRange(e, 1 / 0, this.playlistType, !1, !0);
  }
  updateLevelTiming(e, t, s, r) {
    const n = s.details;
    if (!n) {
      this.warn("level.details undefined");
      return;
    }
    if (!Object.keys(e.elementaryStreams).reduce((u, l) => {
      const h = e.elementaryStreams[l];
      if (h) {
        const c = h.endPTS - h.startPTS;
        if (c <= 0)
          return this.warn(`Could not parse fragment ${e.sn} ${l} duration reliably (${c})`), u || !1;
        const d = r ? 0 : Ml(n, e, h.startPTS, h.endPTS, h.startDTS, h.endDTS, this);
        return this.hls.trigger(E.LEVEL_PTS_UPDATED, {
          details: n,
          level: s,
          drift: d,
          type: l,
          frag: e,
          start: h.startPTS,
          end: h.endPTS
        }), !0;
      }
      return u;
    }, !1)) {
      var o;
      const u = ((o = this.transmuxer) == null ? void 0 : o.error) === null;
      if ((s.fragmentError === 0 || u && (s.fragmentError < 2 || e.endList)) && this.treatAsGap(e, s), u) {
        const l = new Error(`Found no media in fragment ${e.sn} of ${this.playlistLabel()} ${e.level} resetting transmuxer to fallback to playlist timing`);
        if (this.warn(l.message), this.hls.trigger(E.ERROR, {
          type: V.MEDIA_ERROR,
          details: D.FRAG_PARSING_ERROR,
          fatal: !1,
          error: l,
          frag: e,
          reason: `Found no media in msn ${e.sn} of ${this.playlistLabel()} "${s.url}"`
        }), !this.hls)
          return;
        this.resetTransmuxer();
      }
    }
    this.state = C.PARSED, this.log(`Parsed ${e.type} sn: ${e.sn}${t ? " part: " + t.index : ""} of ${this.fragInfo(e, !1, t)})`), this.hls.trigger(E.FRAG_PARSED, {
      frag: e,
      part: t
    });
  }
  playlistLabel() {
    return this.playlistType === B.MAIN ? "level" : "track";
  }
  fragInfo(e, t = !0, s) {
    var r, n;
    return `${this.playlistLabel()} ${e.level} (${s ? "part" : "frag"}:[${((r = t && !s ? e.startPTS : (s || e).start) != null ? r : NaN).toFixed(3)}-${((n = t && !s ? e.endPTS : (s || e).end) != null ? n : NaN).toFixed(3)}]${s && e.type === "main" ? "INDEPENDENT=" + (s.independent ? "YES" : "NO") : ""}`;
  }
  treatAsGap(e, t) {
    t && t.fragmentError++, e.gap = !0, this.fragmentTracker.removeFragment(e), this.fragmentTracker.fragBuffered(e, !0);
  }
  resetTransmuxer() {
    var e;
    (e = this.transmuxer) == null || e.reset();
  }
  recoverWorkerError(e) {
    e.event === "demuxerWorker" && (this.fragmentTracker.removeAllFragments(), this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null), this.resetStartWhenNotLoaded(), this.resetLoadingState());
  }
  set state(e) {
    const t = this._state;
    t !== e && (this._state = e, this.log(`${t}->${e}`));
  }
  get state() {
    return this._state;
  }
}
function $a(i) {
  return !!i.interstitialsController && i.enableInterstitialPlayback !== !1;
}
class Vl {
  constructor() {
    this.chunks = [], this.dataLength = 0;
  }
  push(e) {
    this.chunks.push(e), this.dataLength += e.length;
  }
  flush() {
    const {
      chunks: e,
      dataLength: t
    } = this;
    let s;
    if (e.length)
      e.length === 1 ? s = e[0] : s = Lg(e, t);
    else return new Uint8Array(0);
    return this.reset(), s;
  }
  reset() {
    this.chunks.length = 0, this.dataLength = 0;
  }
}
function Lg(i, e) {
  const t = new Uint8Array(e);
  let s = 0;
  for (let r = 0; r < i.length; r++) {
    const n = i[r];
    t.set(n, s), s += n.length;
  }
  return t;
}
var $i = { exports: {} }, Ga;
function Rg() {
  return Ga || (Ga = 1, (function(i) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function s() {
    }
    Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (t = !1));
    function r(u, l, h) {
      this.fn = u, this.context = l, this.once = h || !1;
    }
    function n(u, l, h, c, d) {
      if (typeof h != "function")
        throw new TypeError("The listener must be a function");
      var g = new r(h, c || u, d), f = t ? t + l : l;
      return u._events[f] ? u._events[f].fn ? u._events[f] = [u._events[f], g] : u._events[f].push(g) : (u._events[f] = g, u._eventsCount++), u;
    }
    function a(u, l) {
      --u._eventsCount === 0 ? u._events = new s() : delete u._events[l];
    }
    function o() {
      this._events = new s(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var l = [], h, c;
      if (this._eventsCount === 0) return l;
      for (c in h = this._events)
        e.call(h, c) && l.push(t ? c.slice(1) : c);
      return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(h)) : l;
    }, o.prototype.listeners = function(l) {
      var h = t ? t + l : l, c = this._events[h];
      if (!c) return [];
      if (c.fn) return [c.fn];
      for (var d = 0, g = c.length, f = new Array(g); d < g; d++)
        f[d] = c[d].fn;
      return f;
    }, o.prototype.listenerCount = function(l) {
      var h = t ? t + l : l, c = this._events[h];
      return c ? c.fn ? 1 : c.length : 0;
    }, o.prototype.emit = function(l, h, c, d, g, f) {
      var m = t ? t + l : l;
      if (!this._events[m]) return !1;
      var p = this._events[m], y = arguments.length, v, T;
      if (p.fn) {
        switch (p.once && this.removeListener(l, p.fn, void 0, !0), y) {
          case 1:
            return p.fn.call(p.context), !0;
          case 2:
            return p.fn.call(p.context, h), !0;
          case 3:
            return p.fn.call(p.context, h, c), !0;
          case 4:
            return p.fn.call(p.context, h, c, d), !0;
          case 5:
            return p.fn.call(p.context, h, c, d, g), !0;
          case 6:
            return p.fn.call(p.context, h, c, d, g, f), !0;
        }
        for (T = 1, v = new Array(y - 1); T < y; T++)
          v[T - 1] = arguments[T];
        p.fn.apply(p.context, v);
      } else {
        var S = p.length, x;
        for (T = 0; T < S; T++)
          switch (p[T].once && this.removeListener(l, p[T].fn, void 0, !0), y) {
            case 1:
              p[T].fn.call(p[T].context);
              break;
            case 2:
              p[T].fn.call(p[T].context, h);
              break;
            case 3:
              p[T].fn.call(p[T].context, h, c);
              break;
            case 4:
              p[T].fn.call(p[T].context, h, c, d);
              break;
            default:
              if (!v) for (x = 1, v = new Array(y - 1); x < y; x++)
                v[x - 1] = arguments[x];
              p[T].fn.apply(p[T].context, v);
          }
      }
      return !0;
    }, o.prototype.on = function(l, h, c) {
      return n(this, l, h, c, !1);
    }, o.prototype.once = function(l, h, c) {
      return n(this, l, h, c, !0);
    }, o.prototype.removeListener = function(l, h, c, d) {
      var g = t ? t + l : l;
      if (!this._events[g]) return this;
      if (!h)
        return a(this, g), this;
      var f = this._events[g];
      if (f.fn)
        f.fn === h && (!d || f.once) && (!c || f.context === c) && a(this, g);
      else {
        for (var m = 0, p = [], y = f.length; m < y; m++)
          (f[m].fn !== h || d && !f[m].once || c && f[m].context !== c) && p.push(f[m]);
        p.length ? this._events[g] = p.length === 1 ? p[0] : p : a(this, g);
      }
      return this;
    }, o.prototype.removeAllListeners = function(l) {
      var h;
      return l ? (h = t ? t + l : l, this._events[h] && a(this, h)) : (this._events = new s(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, i.exports = o;
  })($i)), $i.exports;
}
var _g = Rg(), ln = /* @__PURE__ */ Zd(_g);
const hs = "1.6.16", Yt = {};
function Dg() {
  return typeof __HLS_WORKER_BUNDLE__ == "function";
}
function Cg() {
  const i = Yt[hs];
  if (i)
    return i.clientCount++, i;
  const e = new self.Blob([`var exports={};var module={exports:exports};function define(f){f()};define.amd=true;(${__HLS_WORKER_BUNDLE__.toString()})(true);`], {
    type: "text/javascript"
  }), t = self.URL.createObjectURL(e), r = {
    worker: new self.Worker(t),
    objectURL: t,
    clientCount: 1
  };
  return Yt[hs] = r, r;
}
function Pg(i) {
  const e = Yt[i];
  if (e)
    return e.clientCount++, e;
  const t = new self.URL(i, self.location.href).href, r = {
    worker: new self.Worker(t),
    scriptURL: t,
    clientCount: 1
  };
  return Yt[i] = r, r;
}
function kg(i) {
  const e = Yt[i || hs];
  if (e && e.clientCount-- === 1) {
    const {
      worker: s,
      objectURL: r
    } = e;
    delete Yt[i || hs], r && self.URL.revokeObjectURL(r), s.terminate();
  }
}
function Kl(i, e) {
  return e + 10 <= i.length && i[e] === 51 && i[e + 1] === 68 && i[e + 2] === 73 && i[e + 3] < 255 && i[e + 4] < 255 && i[e + 6] < 128 && i[e + 7] < 128 && i[e + 8] < 128 && i[e + 9] < 128;
}
function un(i, e) {
  return e + 10 <= i.length && i[e] === 73 && i[e + 1] === 68 && i[e + 2] === 51 && i[e + 3] < 255 && i[e + 4] < 255 && i[e + 6] < 128 && i[e + 7] < 128 && i[e + 8] < 128 && i[e + 9] < 128;
}
function Ei(i, e) {
  let t = 0;
  return t = (i[e] & 127) << 21, t |= (i[e + 1] & 127) << 14, t |= (i[e + 2] & 127) << 7, t |= i[e + 3] & 127, t;
}
function cs(i, e) {
  const t = e;
  let s = 0;
  for (; un(i, e); ) {
    s += 10;
    const r = Ei(i, e + 6);
    s += r, Kl(i, e + 10) && (s += 10), e += s;
  }
  if (s > 0)
    return i.subarray(t, t + s);
}
function wg(i, e, t, s) {
  const r = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350], n = e[t + 2], a = n >> 2 & 15;
  if (a > 12) {
    const g = new Error(`invalid ADTS sampling index:${a}`);
    i.emit(E.ERROR, E.ERROR, {
      type: V.MEDIA_ERROR,
      details: D.FRAG_PARSING_ERROR,
      fatal: !0,
      error: g,
      reason: g.message
    });
    return;
  }
  const o = (n >> 6 & 3) + 1, u = e[t + 3] >> 6 & 3 | (n & 1) << 2, l = "mp4a.40." + o, h = r[a];
  let c = a;
  (o === 5 || o === 29) && (c -= 3);
  const d = [o << 3 | (c & 14) >> 1, (c & 1) << 7 | u << 3];
  return ne.log(`manifest codec:${s}, parsed codec:${l}, channels:${u}, rate:${h} (ADTS object type:${o} sampling index:${a})`), {
    config: d,
    samplerate: h,
    channelCount: u,
    codec: l,
    parsedCodec: l,
    manifestCodec: s
  };
}
function Wl(i, e) {
  return i[e] === 255 && (i[e + 1] & 246) === 240;
}
function Yl(i, e) {
  return i[e + 1] & 1 ? 7 : 9;
}
function hn(i, e) {
  return (i[e + 3] & 3) << 11 | i[e + 4] << 3 | (i[e + 5] & 224) >>> 5;
}
function Og(i, e) {
  return e + 5 < i.length;
}
function oi(i, e) {
  return e + 1 < i.length && Wl(i, e);
}
function Mg(i, e) {
  return Og(i, e) && Wl(i, e) && hn(i, e) <= i.length - e;
}
function Fg(i, e) {
  if (oi(i, e)) {
    const t = Yl(i, e);
    if (e + t >= i.length)
      return !1;
    const s = hn(i, e);
    if (s <= t)
      return !1;
    const r = e + s;
    return r === i.length || oi(i, r);
  }
  return !1;
}
function jl(i, e, t, s, r) {
  if (!i.samplerate) {
    const n = wg(e, t, s, r);
    if (!n)
      return;
    ae(i, n);
  }
}
function ql(i) {
  return 1024 * 9e4 / i;
}
function Ng(i, e) {
  const t = Yl(i, e);
  if (e + t <= i.length) {
    const s = hn(i, e) - t;
    if (s > 0)
      return {
        headerLength: t,
        frameLength: s
      };
  }
}
function Xl(i, e, t, s, r) {
  const n = ql(i.samplerate), a = s + r * n, o = Ng(e, t);
  let u;
  if (o) {
    const {
      frameLength: c,
      headerLength: d
    } = o, g = d + c, f = Math.max(0, t + g - e.length);
    f ? (u = new Uint8Array(g - d), u.set(e.subarray(t + d, e.length), 0)) : u = e.subarray(t + d, t + g);
    const m = {
      unit: u,
      pts: a
    };
    return f || i.samples.push(m), {
      sample: m,
      length: g,
      missing: f
    };
  }
  const l = e.length - t;
  return u = new Uint8Array(l), u.set(e.subarray(t, e.length), 0), {
    sample: {
      unit: u,
      pts: a
    },
    length: l,
    missing: -1
  };
}
function Bg(i, e) {
  return un(i, e) && Ei(i, e + 6) + 10 <= i.length - e;
}
function Ug(i) {
  return i instanceof ArrayBuffer ? i : i.byteOffset == 0 && i.byteLength == i.buffer.byteLength ? i.buffer : new Uint8Array(i).buffer;
}
function Gi(i, e = 0, t = 1 / 0) {
  return $g(i, e, t, Uint8Array);
}
function $g(i, e, t, s) {
  const r = Gg(i);
  let n = 1;
  "BYTES_PER_ELEMENT" in s && (n = s.BYTES_PER_ELEMENT);
  const a = Hg(i) ? i.byteOffset : 0, o = (a + i.byteLength) / n, u = (a + e) / n, l = Math.floor(Math.max(0, Math.min(u, o))), h = Math.floor(Math.min(l + Math.max(t, 0), o));
  return new s(r, l, h - l);
}
function Gg(i) {
  return i instanceof ArrayBuffer ? i : i.buffer;
}
function Hg(i) {
  return i && i.buffer instanceof ArrayBuffer && i.byteLength !== void 0 && i.byteOffset !== void 0;
}
function Vg(i) {
  const e = {
    key: i.type,
    description: "",
    data: "",
    mimeType: null,
    pictureType: null
  }, t = 3;
  if (i.size < 2)
    return;
  if (i.data[0] !== t) {
    console.log("Ignore frame with unrecognized character encoding");
    return;
  }
  const s = i.data.subarray(1).indexOf(0);
  if (s === -1)
    return;
  const r = Oe(Gi(i.data, 1, s)), n = i.data[2 + s], a = i.data.subarray(3 + s).indexOf(0);
  if (a === -1)
    return;
  const o = Oe(Gi(i.data, 3 + s, a));
  let u;
  return r === "-->" ? u = Oe(Gi(i.data, 4 + s + a)) : u = Ug(i.data.subarray(4 + s + a)), e.mimeType = r, e.pictureType = n, e.description = o, e.data = u, e;
}
function Kg(i) {
  if (i.size < 2)
    return;
  const e = Oe(i.data, !0), t = new Uint8Array(i.data.subarray(e.length + 1));
  return {
    key: i.type,
    info: e,
    data: t.buffer
  };
}
function Wg(i) {
  if (i.size < 2)
    return;
  if (i.type === "TXXX") {
    let t = 1;
    const s = Oe(i.data.subarray(t), !0);
    t += s.length + 1;
    const r = Oe(i.data.subarray(t));
    return {
      key: i.type,
      info: s,
      data: r
    };
  }
  const e = Oe(i.data.subarray(1));
  return {
    key: i.type,
    info: "",
    data: e
  };
}
function Yg(i) {
  if (i.type === "WXXX") {
    if (i.size < 2)
      return;
    let t = 1;
    const s = Oe(i.data.subarray(t), !0);
    t += s.length + 1;
    const r = Oe(i.data.subarray(t));
    return {
      key: i.type,
      info: s,
      data: r
    };
  }
  const e = Oe(i.data);
  return {
    key: i.type,
    info: "",
    data: e
  };
}
function jg(i) {
  return i.type === "PRIV" ? Kg(i) : i.type[0] === "W" ? Yg(i) : i.type === "APIC" ? Vg(i) : Wg(i);
}
function qg(i) {
  const e = String.fromCharCode(i[0], i[1], i[2], i[3]), t = Ei(i, 4), s = 10;
  return {
    type: e,
    size: t,
    data: i.subarray(s, s + t)
  };
}
const bs = 10, Xg = 10;
function zl(i) {
  let e = 0;
  const t = [];
  for (; un(i, e); ) {
    const s = Ei(i, e + 6);
    i[e + 5] >> 6 & 1 && (e += bs), e += bs;
    const r = e + s;
    for (; e + Xg < r; ) {
      const n = qg(i.subarray(e)), a = jg(n);
      a && t.push(a), e += n.size + bs;
    }
    Kl(i, e) && (e += bs);
  }
  return t;
}
function Ql(i) {
  return i && i.key === "PRIV" && i.info === "com.apple.streaming.transportStreamTimestamp";
}
function zg(i) {
  if (i.data.byteLength === 8) {
    const e = new Uint8Array(i.data), t = e[3] & 1;
    let s = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
    return s /= 45, t && (s += 4772185884e-2), Math.round(s);
  }
}
function cn(i) {
  const e = zl(i);
  for (let t = 0; t < e.length; t++) {
    const s = e[t];
    if (Ql(s))
      return zg(s);
  }
}
let ke = /* @__PURE__ */ (function(i) {
  return i.audioId3 = "org.id3", i.dateRange = "com.apple.quicktime.HLS", i.emsg = "https://aomedia.org/emsg/ID3", i.misbklv = "urn:misb:KLV:bin:1910.1", i;
})({});
function je(i = "", e = 9e4) {
  return {
    type: i,
    id: -1,
    pid: -1,
    inputTimeScale: e,
    sequenceNumber: -1,
    samples: [],
    dropped: 0
  };
}
class dn {
  constructor() {
    this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.basePTS = null, this.initPTS = null, this.lastPTS = null;
  }
  resetInitSegment(e, t, s, r) {
    this._id3Track = {
      type: "id3",
      id: 3,
      pid: -1,
      inputTimeScale: 9e4,
      sequenceNumber: 0,
      samples: [],
      dropped: 0
    };
  }
  resetTimeStamp(e) {
    this.initPTS = e, this.resetContiguity();
  }
  resetContiguity() {
    this.basePTS = null, this.lastPTS = null, this.frameIndex = 0;
  }
  canParse(e, t) {
    return !1;
  }
  appendFrame(e, t, s) {
  }
  // feed incoming data to the front of the parsing pipeline
  demux(e, t) {
    this.cachedData && (e = Ne(this.cachedData, e), this.cachedData = null);
    let s = cs(e, 0), r = s ? s.length : 0, n;
    const a = this._audioTrack, o = this._id3Track, u = s ? cn(s) : void 0, l = e.length;
    for ((this.basePTS === null || this.frameIndex === 0 && F(u)) && (this.basePTS = Qg(u, t, this.initPTS), this.lastPTS = this.basePTS), this.lastPTS === null && (this.lastPTS = this.basePTS), s && s.length > 0 && o.samples.push({
      pts: this.lastPTS,
      dts: this.lastPTS,
      data: s,
      type: ke.audioId3,
      duration: Number.POSITIVE_INFINITY
    }); r < l; ) {
      if (this.canParse(e, r)) {
        const h = this.appendFrame(a, e, r);
        h ? (this.frameIndex++, this.lastPTS = h.sample.pts, r += h.length, n = r) : r = l;
      } else Bg(e, r) ? (s = cs(e, r), o.samples.push({
        pts: this.lastPTS,
        dts: this.lastPTS,
        data: s,
        type: ke.audioId3,
        duration: Number.POSITIVE_INFINITY
      }), r += s.length, n = r) : r++;
      if (r === l && n !== l) {
        const h = e.slice(n);
        this.cachedData ? this.cachedData = Ne(this.cachedData, h) : this.cachedData = h;
      }
    }
    return {
      audioTrack: a,
      videoTrack: je(),
      id3Track: o,
      textTrack: je()
    };
  }
  demuxSampleAes(e, t, s) {
    return Promise.reject(new Error(`[${this}] This demuxer does not support Sample-AES decryption`));
  }
  flush(e) {
    const t = this.cachedData;
    return t && (this.cachedData = null, this.demux(t, 0)), {
      audioTrack: this._audioTrack,
      videoTrack: je(),
      id3Track: this._id3Track,
      textTrack: je()
    };
  }
  destroy() {
    this.cachedData = null, this._audioTrack = this._id3Track = void 0;
  }
}
const Qg = (i, e, t) => {
  if (F(i))
    return i * 90;
  const s = t ? t.baseTime * 9e4 / t.timescale : 0;
  return e * 9e4 + s;
};
let Ls = null;
const Zg = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160], Jg = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3], e0 = [
  // MPEG 2.5
  [
    0,
    // Reserved
    72,
    // Layer3
    144,
    // Layer2
    12
    // Layer1
  ],
  // Reserved
  [
    0,
    // Reserved
    0,
    // Layer3
    0,
    // Layer2
    0
    // Layer1
  ],
  // MPEG 2
  [
    0,
    // Reserved
    72,
    // Layer3
    144,
    // Layer2
    12
    // Layer1
  ],
  // MPEG 1
  [
    0,
    // Reserved
    144,
    // Layer3
    144,
    // Layer2
    12
    // Layer1
  ]
], t0 = [
  0,
  // Reserved
  1,
  // Layer3
  1,
  // Layer2
  4
  // Layer1
];
function Zl(i, e, t, s, r) {
  if (t + 24 > e.length)
    return;
  const n = Jl(e, t);
  if (n && t + n.frameLength <= e.length) {
    const a = n.samplesPerFrame * 9e4 / n.sampleRate, o = s + r * a, u = {
      unit: e.subarray(t, t + n.frameLength),
      pts: o,
      dts: o
    };
    return i.config = [], i.channelCount = n.channelCount, i.samplerate = n.sampleRate, i.samples.push(u), {
      sample: u,
      length: n.frameLength,
      missing: 0
    };
  }
}
function Jl(i, e) {
  const t = i[e + 1] >> 3 & 3, s = i[e + 1] >> 1 & 3, r = i[e + 2] >> 4 & 15, n = i[e + 2] >> 2 & 3;
  if (t !== 1 && r !== 0 && r !== 15 && n !== 3) {
    const a = i[e + 2] >> 1 & 1, o = i[e + 3] >> 6, u = t === 3 ? 3 - s : s === 3 ? 3 : 4, l = Zg[u * 14 + r - 1] * 1e3, c = Jg[(t === 3 ? 0 : t === 2 ? 1 : 2) * 3 + n], d = o === 3 ? 1 : 2, g = e0[t][s], f = t0[s], m = g * 8 * f, p = Math.floor(g * l / c + a) * f;
    if (Ls === null) {
      const T = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
      Ls = T ? parseInt(T[1]) : 0;
    }
    return Ls && Ls <= 87 && s === 2 && l >= 224e3 && o === 0 && (i[e + 3] = i[e + 3] | 128), {
      sampleRate: c,
      channelCount: d,
      frameLength: p,
      samplesPerFrame: m
    };
  }
}
function fn(i, e) {
  return i[e] === 255 && (i[e + 1] & 224) === 224 && (i[e + 1] & 6) !== 0;
}
function eu(i, e) {
  return e + 1 < i.length && fn(i, e);
}
function s0(i, e) {
  return fn(i, e) && 4 <= i.length - e;
}
function tu(i, e) {
  if (e + 1 < i.length && fn(i, e)) {
    const s = Jl(i, e);
    let r = 4;
    s != null && s.frameLength && (r = s.frameLength);
    const n = e + r;
    return n === i.length || eu(i, n);
  }
  return !1;
}
class i0 extends dn {
  constructor(e, t) {
    super(), this.observer = void 0, this.config = void 0, this.observer = e, this.config = t;
  }
  resetInitSegment(e, t, s, r) {
    super.resetInitSegment(e, t, s, r), this._audioTrack = {
      container: "audio/adts",
      type: "audio",
      id: 2,
      pid: -1,
      sequenceNumber: 0,
      segmentCodec: "aac",
      samples: [],
      manifestCodec: t,
      duration: r,
      inputTimeScale: 9e4,
      dropped: 0
    };
  }
  // Source for probe info - https://wiki.multimedia.cx/index.php?title=ADTS
  static probe(e, t) {
    if (!e)
      return !1;
    const s = cs(e, 0);
    let r = s?.length || 0;
    if (tu(e, r))
      return !1;
    for (let n = e.length; r < n; r++)
      if (Fg(e, r))
        return t.log("ADTS sync word found !"), !0;
    return !1;
  }
  canParse(e, t) {
    return Mg(e, t);
  }
  appendFrame(e, t, s) {
    jl(e, this.observer, t, s, e.manifestCodec);
    const r = Xl(e, t, s, this.basePTS, this.frameIndex);
    if (r && r.missing === 0)
      return r;
  }
}
const su = (i, e) => {
  let t = 0, s = 5;
  e += s;
  const r = new Uint32Array(1), n = new Uint32Array(1), a = new Uint8Array(1);
  for (; s > 0; ) {
    a[0] = i[e];
    const o = Math.min(s, 8), u = 8 - o;
    n[0] = 4278190080 >>> 24 + u << u, r[0] = (a[0] & n[0]) >> u, t = t ? t << o | r[0] : r[0], e += 1, s -= o;
  }
  return t;
};
class r0 extends dn {
  constructor(e) {
    super(), this.observer = void 0, this.observer = e;
  }
  resetInitSegment(e, t, s, r) {
    super.resetInitSegment(e, t, s, r), this._audioTrack = {
      container: "audio/ac-3",
      type: "audio",
      id: 2,
      pid: -1,
      sequenceNumber: 0,
      segmentCodec: "ac3",
      samples: [],
      manifestCodec: t,
      duration: r,
      inputTimeScale: 9e4,
      dropped: 0
    };
  }
  canParse(e, t) {
    return t + 64 < e.length;
  }
  appendFrame(e, t, s) {
    const r = iu(e, t, s, this.basePTS, this.frameIndex);
    if (r !== -1)
      return {
        sample: e.samples[e.samples.length - 1],
        length: r,
        missing: 0
      };
  }
  static probe(e) {
    if (!e)
      return !1;
    const t = cs(e, 0);
    if (!t)
      return !1;
    const s = t.length;
    return e[s] === 11 && e[s + 1] === 119 && cn(t) !== void 0 && // check the bsid to confirm ac-3
    su(e, s) < 16;
  }
}
function iu(i, e, t, s, r) {
  if (t + 8 > e.length || e[t] !== 11 || e[t + 1] !== 119)
    return -1;
  const n = e[t + 4] >> 6;
  if (n >= 3)
    return -1;
  const o = [48e3, 44100, 32e3][n], u = e[t + 4] & 63, h = [64, 69, 96, 64, 70, 96, 80, 87, 120, 80, 88, 120, 96, 104, 144, 96, 105, 144, 112, 121, 168, 112, 122, 168, 128, 139, 192, 128, 140, 192, 160, 174, 240, 160, 175, 240, 192, 208, 288, 192, 209, 288, 224, 243, 336, 224, 244, 336, 256, 278, 384, 256, 279, 384, 320, 348, 480, 320, 349, 480, 384, 417, 576, 384, 418, 576, 448, 487, 672, 448, 488, 672, 512, 557, 768, 512, 558, 768, 640, 696, 960, 640, 697, 960, 768, 835, 1152, 768, 836, 1152, 896, 975, 1344, 896, 976, 1344, 1024, 1114, 1536, 1024, 1115, 1536, 1152, 1253, 1728, 1152, 1254, 1728, 1280, 1393, 1920, 1280, 1394, 1920][u * 3 + n] * 2;
  if (t + h > e.length)
    return -1;
  const c = e[t + 6] >> 5;
  let d = 0;
  c === 2 ? d += 2 : (c & 1 && c !== 1 && (d += 2), c & 4 && (d += 2));
  const g = (e[t + 6] << 8 | e[t + 7]) >> 12 - d & 1, m = [2, 1, 2, 3, 3, 4, 4, 5][c] + g, p = e[t + 5] >> 3, y = e[t + 5] & 7, v = new Uint8Array([n << 6 | p << 1 | y >> 2, (y & 3) << 6 | c << 3 | g << 2 | u >> 4, u << 4 & 224]), T = 1536 / o * 9e4, S = s + r * T, x = e.subarray(t, t + h);
  return i.config = v, i.channelCount = m, i.samplerate = o, i.samples.push({
    unit: x,
    pts: S
  }), h;
}
class n0 extends dn {
  resetInitSegment(e, t, s, r) {
    super.resetInitSegment(e, t, s, r), this._audioTrack = {
      container: "audio/mpeg",
      type: "audio",
      id: 2,
      pid: -1,
      sequenceNumber: 0,
      segmentCodec: "mp3",
      samples: [],
      manifestCodec: t,
      duration: r,
      inputTimeScale: 9e4,
      dropped: 0
    };
  }
  static probe(e) {
    if (!e)
      return !1;
    const t = cs(e, 0);
    let s = t?.length || 0;
    if (t && e[s] === 11 && e[s + 1] === 119 && cn(t) !== void 0 && // check the bsid to confirm ac-3 or ec-3 (not mp3)
    su(e, s) <= 16)
      return !1;
    for (let r = e.length; s < r; s++)
      if (tu(e, s))
        return ne.log("MPEG Audio sync word found !"), !0;
    return !1;
  }
  canParse(e, t) {
    return s0(e, t);
  }
  appendFrame(e, t, s) {
    if (this.basePTS !== null)
      return Zl(e, t, s, this.basePTS, this.frameIndex);
  }
}
const a0 = /\/emsg[-/]ID3/i;
class o0 {
  constructor(e, t) {
    this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = t;
  }
  resetTimeStamp() {
  }
  resetInitSegment(e, t, s, r) {
    const n = this.videoTrack = je("video", 1), a = this.audioTrack = je("audio", 1), o = this.txtTrack = je("text", 1);
    if (this.id3Track = je("id3", 1), this.timeOffset = 0, !(e != null && e.byteLength))
      return;
    const u = fl(e);
    if (u.video) {
      const {
        id: l,
        timescale: h,
        codec: c,
        supplemental: d
      } = u.video;
      n.id = l, n.timescale = o.timescale = h, n.codec = c, n.supplemental = d;
    }
    if (u.audio) {
      const {
        id: l,
        timescale: h,
        codec: c
      } = u.audio;
      a.id = l, a.timescale = h, a.codec = c;
    }
    o.id = hl.text, n.sampleDuration = 0, n.duration = a.duration = r;
  }
  resetContiguity() {
    this.remainderData = null;
  }
  static probe(e) {
    return rf(e);
  }
  demux(e, t) {
    this.timeOffset = t;
    let s = e;
    const r = this.videoTrack, n = this.txtTrack;
    if (this.config.progressive) {
      this.remainderData && (s = Ne(this.remainderData, e));
      const o = cf(s);
      this.remainderData = o.remainder, r.samples = o.valid || new Uint8Array();
    } else
      r.samples = s;
    const a = this.extractID3Track(r, t);
    return n.samples = na(t, r), {
      videoTrack: r,
      audioTrack: this.audioTrack,
      id3Track: a,
      textTrack: this.txtTrack
    };
  }
  flush() {
    const e = this.timeOffset, t = this.videoTrack, s = this.txtTrack;
    t.samples = this.remainderData || new Uint8Array(), this.remainderData = null;
    const r = this.extractID3Track(t, this.timeOffset);
    return s.samples = na(e, t), {
      videoTrack: t,
      audioTrack: je(),
      id3Track: r,
      textTrack: je()
    };
  }
  extractID3Track(e, t) {
    const s = this.id3Track;
    if (e.samples.length) {
      const r = z(e.samples, ["emsg"]);
      r && r.forEach((n) => {
        const a = ff(n);
        if (a0.test(a.schemeIdUri)) {
          const o = Ha(a, t);
          let u = a.eventDuration === 4294967295 ? Number.POSITIVE_INFINITY : a.eventDuration / a.timeScale;
          u <= 1e-3 && (u = Number.POSITIVE_INFINITY);
          const l = a.payload;
          s.samples.push({
            data: l,
            len: l.byteLength,
            dts: o,
            pts: o,
            type: ke.emsg,
            duration: u
          });
        } else if (this.config.enableEmsgKLVMetadata && a.schemeIdUri.startsWith("urn:misb:KLV:bin:1910.1")) {
          const o = Ha(a, t);
          s.samples.push({
            data: a.payload,
            len: a.payload.byteLength,
            dts: o,
            pts: o,
            type: ke.misbklv,
            duration: Number.POSITIVE_INFINITY
          });
        }
      });
    }
    return s;
  }
  demuxSampleAes(e, t, s) {
    return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"));
  }
  destroy() {
    this.config = null, this.remainderData = null, this.videoTrack = this.audioTrack = this.id3Track = this.txtTrack = void 0;
  }
}
function Ha(i, e) {
  return F(i.presentationTime) ? i.presentationTime / i.timeScale : e + i.presentationTimeDelta / i.timeScale;
}
class l0 {
  constructor(e, t, s) {
    this.keyData = void 0, this.decrypter = void 0, this.keyData = s, this.decrypter = new sn(t, {
      removePKCS7Padding: !1
    });
  }
  decryptBuffer(e) {
    return this.decrypter.decrypt(e, this.keyData.key.buffer, this.keyData.iv.buffer, dt.cbc);
  }
  // AAC - encrypt all full 16 bytes blocks starting from offset 16
  decryptAacSample(e, t, s) {
    const r = e[t].unit;
    if (r.length <= 16)
      return;
    const n = r.subarray(16, r.length - r.length % 16), a = n.buffer.slice(n.byteOffset, n.byteOffset + n.length);
    this.decryptBuffer(a).then((o) => {
      const u = new Uint8Array(o);
      r.set(u, 16), this.decrypter.isSync() || this.decryptAacSamples(e, t + 1, s);
    }).catch(s);
  }
  decryptAacSamples(e, t, s) {
    for (; ; t++) {
      if (t >= e.length) {
        s();
        return;
      }
      if (!(e[t].unit.length < 32) && (this.decryptAacSample(e, t, s), !this.decrypter.isSync()))
        return;
    }
  }
  // AVC - encrypt one 16 bytes block out of ten, starting from offset 32
  getAvcEncryptedData(e) {
    const t = Math.floor((e.length - 48) / 160) * 16 + 16, s = new Int8Array(t);
    let r = 0;
    for (let n = 32; n < e.length - 16; n += 160, r += 16)
      s.set(e.subarray(n, n + 16), r);
    return s;
  }
  getAvcDecryptedUnit(e, t) {
    const s = new Uint8Array(t);
    let r = 0;
    for (let n = 32; n < e.length - 16; n += 160, r += 16)
      e.set(s.subarray(r, r + 16), n);
    return e;
  }
  decryptAvcSample(e, t, s, r, n) {
    const a = pl(n.data), o = this.getAvcEncryptedData(a);
    this.decryptBuffer(o.buffer).then((u) => {
      n.data = this.getAvcDecryptedUnit(a, u), this.decrypter.isSync() || this.decryptAvcSamples(e, t, s + 1, r);
    }).catch(r);
  }
  decryptAvcSamples(e, t, s, r) {
    if (e instanceof Uint8Array)
      throw new Error("Cannot decrypt samples of type Uint8Array");
    for (; ; t++, s = 0) {
      if (t >= e.length) {
        r();
        return;
      }
      const n = e[t].units;
      for (; !(s >= n.length); s++) {
        const a = n[s];
        if (!(a.data.length <= 48 || a.type !== 1 && a.type !== 5) && (this.decryptAvcSample(e, t, s, r, a), !this.decrypter.isSync()))
          return;
      }
    }
  }
}
class ru {
  constructor() {
    this.VideoSample = null;
  }
  createVideoSample(e, t, s) {
    return {
      key: e,
      frame: !1,
      pts: t,
      dts: s,
      units: [],
      length: 0
    };
  }
  getLastNalUnit(e) {
    var t;
    let s = this.VideoSample, r;
    if ((!s || s.units.length === 0) && (s = e[e.length - 1]), (t = s) != null && t.units) {
      const n = s.units;
      r = n[n.length - 1];
    }
    return r;
  }
  pushAccessUnit(e, t) {
    if (e.units.length && e.frame) {
      if (e.pts === void 0) {
        const s = t.samples, r = s.length;
        if (r) {
          const n = s[r - 1];
          e.pts = n.pts, e.dts = n.dts;
        } else {
          t.dropped++;
          return;
        }
      }
      t.samples.push(e);
    }
  }
  parseNALu(e, t, s) {
    const r = t.byteLength;
    let n = e.naluState || 0;
    const a = n, o = [];
    let u = 0, l, h, c, d = -1, g = 0;
    for (n === -1 && (d = 0, g = this.getNALuType(t, 0), n = 0, u = 1); u < r; ) {
      if (l = t[u++], !n) {
        n = l ? 0 : 1;
        continue;
      }
      if (n === 1) {
        n = l ? 0 : 2;
        continue;
      }
      if (!l)
        n = 3;
      else if (l === 1) {
        if (h = u - n - 1, d >= 0) {
          const f = {
            data: t.subarray(d, h),
            type: g
          };
          o.push(f);
        } else {
          const f = this.getLastNalUnit(e.samples);
          f && (a && u <= 4 - a && f.state && (f.data = f.data.subarray(0, f.data.byteLength - a)), h > 0 && (f.data = Ne(f.data, t.subarray(0, h)), f.state = 0));
        }
        u < r ? (c = this.getNALuType(t, u), d = u, g = c, n = 0) : n = -1;
      } else
        n = 0;
    }
    if (d >= 0 && n >= 0) {
      const f = {
        data: t.subarray(d, r),
        type: g,
        state: n
      };
      o.push(f);
    }
    if (o.length === 0) {
      const f = this.getLastNalUnit(e.samples);
      f && (f.data = Ne(f.data, t));
    }
    return e.naluState = n, o;
  }
}
class rs {
  constructor(e) {
    this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = e, this.bytesAvailable = e.byteLength, this.word = 0, this.bitsAvailable = 0;
  }
  // ():void
  loadWord() {
    const e = this.data, t = this.bytesAvailable, s = e.byteLength - t, r = new Uint8Array(4), n = Math.min(4, t);
    if (n === 0)
      throw new Error("no bytes available");
    r.set(e.subarray(s, s + n)), this.word = new DataView(r.buffer).getUint32(0), this.bitsAvailable = n * 8, this.bytesAvailable -= n;
  }
  // (count:int):void
  skipBits(e) {
    let t;
    e = Math.min(e, this.bytesAvailable * 8 + this.bitsAvailable), this.bitsAvailable > e ? (this.word <<= e, this.bitsAvailable -= e) : (e -= this.bitsAvailable, t = e >> 3, e -= t << 3, this.bytesAvailable -= t, this.loadWord(), this.word <<= e, this.bitsAvailable -= e);
  }
  // (size:int):uint
  readBits(e) {
    let t = Math.min(this.bitsAvailable, e);
    const s = this.word >>> 32 - t;
    if (e > 32 && ne.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= t, this.bitsAvailable > 0)
      this.word <<= t;
    else if (this.bytesAvailable > 0)
      this.loadWord();
    else
      throw new Error("no bits available");
    return t = e - t, t > 0 && this.bitsAvailable ? s << t | this.readBits(t) : s;
  }
  // ():uint
  skipLZ() {
    let e;
    for (e = 0; e < this.bitsAvailable; ++e)
      if ((this.word & 2147483648 >>> e) !== 0)
        return this.word <<= e, this.bitsAvailable -= e, e;
    return this.loadWord(), e + this.skipLZ();
  }
  // ():void
  skipUEG() {
    this.skipBits(1 + this.skipLZ());
  }
  // ():void
  skipEG() {
    this.skipBits(1 + this.skipLZ());
  }
  // ():uint
  readUEG() {
    const e = this.skipLZ();
    return this.readBits(e + 1) - 1;
  }
  // ():int
  readEG() {
    const e = this.readUEG();
    return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1);
  }
  // Some convenience functions
  // :Boolean
  readBoolean() {
    return this.readBits(1) === 1;
  }
  // ():int
  readUByte() {
    return this.readBits(8);
  }
  // ():int
  readUShort() {
    return this.readBits(16);
  }
  // ():int
  readUInt() {
    return this.readBits(32);
  }
}
class u0 extends ru {
  parsePES(e, t, s, r) {
    const n = this.parseNALu(e, s.data, r);
    let a = this.VideoSample, o, u = !1;
    s.data = null, a && n.length && !e.audFound && (this.pushAccessUnit(a, e), a = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts)), n.forEach((l) => {
      var h, c;
      switch (l.type) {
        // NDR
        case 1: {
          let m = !1;
          o = !0;
          const p = l.data;
          if (u && p.length > 4) {
            const y = this.readSliceType(p);
            (y === 2 || y === 4 || y === 7 || y === 9) && (m = !0);
          }
          if (m) {
            var d;
            (d = a) != null && d.frame && !a.key && (this.pushAccessUnit(a, e), a = this.VideoSample = null);
          }
          a || (a = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts)), a.frame = !0, a.key = m;
          break;
        }
        case 5:
          o = !0, (h = a) != null && h.frame && !a.key && (this.pushAccessUnit(a, e), a = this.VideoSample = null), a || (a = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts)), a.key = !0, a.frame = !0;
          break;
        // SEI
        case 6: {
          o = !0, Zr(l.data, 1, s.pts, t.samples);
          break;
        }
        case 7: {
          var g, f;
          o = !0, u = !0;
          const m = l.data, p = this.readSPS(m);
          if (!e.sps || e.width !== p.width || e.height !== p.height || ((g = e.pixelRatio) == null ? void 0 : g[0]) !== p.pixelRatio[0] || ((f = e.pixelRatio) == null ? void 0 : f[1]) !== p.pixelRatio[1]) {
            e.width = p.width, e.height = p.height, e.pixelRatio = p.pixelRatio, e.sps = [m];
            const y = m.subarray(1, 4);
            let v = "avc1.";
            for (let T = 0; T < 3; T++) {
              let S = y[T].toString(16);
              S.length < 2 && (S = "0" + S), v += S;
            }
            e.codec = v;
          }
          break;
        }
        // PPS
        case 8:
          o = !0, e.pps = [l.data];
          break;
        // AUD
        case 9:
          o = !0, e.audFound = !0, (c = a) != null && c.frame && (this.pushAccessUnit(a, e), a = null), a || (a = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts));
          break;
        // Filler Data
        case 12:
          o = !0;
          break;
        default:
          o = !1;
          break;
      }
      a && o && a.units.push(l);
    }), r && a && (this.pushAccessUnit(a, e), this.VideoSample = null);
  }
  getNALuType(e, t) {
    return e[t] & 31;
  }
  readSliceType(e) {
    const t = new rs(e);
    return t.readUByte(), t.readUEG(), t.readUEG();
  }
  /**
   * The scaling list is optionally transmitted as part of a sequence parameter
   * set and is not relevant to transmuxing.
   * @param count the number of entries in this scaling list
   * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
   */
  skipScalingList(e, t) {
    let s = 8, r = 8, n;
    for (let a = 0; a < e; a++)
      r !== 0 && (n = t.readEG(), r = (s + n + 256) % 256), s = r === 0 ? s : r;
  }
  /**
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the H264 metadata that
   * describes the properties of upcoming video frames.
   * @returns an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  readSPS(e) {
    const t = new rs(e);
    let s = 0, r = 0, n = 0, a = 0, o, u, l;
    const h = t.readUByte.bind(t), c = t.readBits.bind(t), d = t.readUEG.bind(t), g = t.readBoolean.bind(t), f = t.skipBits.bind(t), m = t.skipEG.bind(t), p = t.skipUEG.bind(t), y = this.skipScalingList.bind(this);
    h();
    const v = h();
    if (c(5), f(3), h(), p(), v === 100 || v === 110 || v === 122 || v === 244 || v === 44 || v === 83 || v === 86 || v === 118 || v === 128) {
      const I = d();
      if (I === 3 && f(1), p(), p(), f(1), g())
        for (u = I !== 3 ? 8 : 12, l = 0; l < u; l++)
          g() && (l < 6 ? y(16, t) : y(64, t));
    }
    p();
    const T = d();
    if (T === 0)
      d();
    else if (T === 1)
      for (f(1), m(), m(), o = d(), l = 0; l < o; l++)
        m();
    p(), f(1);
    const S = d(), x = d(), L = c(1);
    L === 0 && f(1), f(1), g() && (s = d(), r = d(), n = d(), a = d());
    let A = [1, 1];
    if (g() && g())
      switch (h()) {
        case 1:
          A = [1, 1];
          break;
        case 2:
          A = [12, 11];
          break;
        case 3:
          A = [10, 11];
          break;
        case 4:
          A = [16, 11];
          break;
        case 5:
          A = [40, 33];
          break;
        case 6:
          A = [24, 11];
          break;
        case 7:
          A = [20, 11];
          break;
        case 8:
          A = [32, 11];
          break;
        case 9:
          A = [80, 33];
          break;
        case 10:
          A = [18, 11];
          break;
        case 11:
          A = [15, 11];
          break;
        case 12:
          A = [64, 33];
          break;
        case 13:
          A = [160, 99];
          break;
        case 14:
          A = [4, 3];
          break;
        case 15:
          A = [3, 2];
          break;
        case 16:
          A = [2, 1];
          break;
        case 255: {
          A = [h() << 8 | h(), h() << 8 | h()];
          break;
        }
      }
    return {
      width: Math.ceil((S + 1) * 16 - s * 2 - r * 2),
      height: (2 - L) * (x + 1) * 16 - (L ? 2 : 4) * (n + a),
      pixelRatio: A
    };
  }
}
class h0 extends ru {
  constructor(...e) {
    super(...e), this.initVPS = null;
  }
  parsePES(e, t, s, r) {
    const n = this.parseNALu(e, s.data, r);
    let a = this.VideoSample, o, u = !1;
    s.data = null, a && n.length && !e.audFound && (this.pushAccessUnit(a, e), a = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts)), n.forEach((l) => {
      var h, c;
      switch (l.type) {
        // NON-IDR, NON RANDOM ACCESS SLICE
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          a || (a = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts)), a.frame = !0, o = !0;
          break;
        // CRA, BLA (random access picture)
        case 16:
        case 17:
        case 18:
        case 21:
          if (o = !0, u) {
            var d;
            (d = a) != null && d.frame && !a.key && (this.pushAccessUnit(a, e), a = this.VideoSample = null);
          }
          a || (a = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts)), a.key = !0, a.frame = !0;
          break;
        // IDR
        case 19:
        case 20:
          o = !0, (h = a) != null && h.frame && !a.key && (this.pushAccessUnit(a, e), a = this.VideoSample = null), a || (a = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts)), a.key = !0, a.frame = !0;
          break;
        // SEI
        case 39:
          o = !0, Zr(
            l.data,
            2,
            // NALu header size
            s.pts,
            t.samples
          );
          break;
        // VPS
        case 32:
          o = !0, e.vps || (typeof e.params != "object" && (e.params = {}), e.params = ae(e.params, this.readVPS(l.data)), this.initVPS = l.data), e.vps = [l.data];
          break;
        // SPS
        case 33:
          if (o = !0, u = !0, e.vps !== void 0 && e.vps[0] !== this.initVPS && e.sps !== void 0 && !this.matchSPS(e.sps[0], l.data) && (this.initVPS = e.vps[0], e.sps = e.pps = void 0), !e.sps) {
            const g = this.readSPS(l.data);
            e.width = g.width, e.height = g.height, e.pixelRatio = g.pixelRatio, e.codec = g.codecString, e.sps = [], typeof e.params != "object" && (e.params = {});
            for (const f in g.params)
              e.params[f] = g.params[f];
          }
          this.pushParameterSet(e.sps, l.data, e.vps), a || (a = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts)), a.key = !0;
          break;
        // PPS
        case 34:
          if (o = !0, typeof e.params == "object") {
            if (!e.pps) {
              e.pps = [];
              const g = this.readPPS(l.data);
              for (const f in g)
                e.params[f] = g[f];
            }
            this.pushParameterSet(e.pps, l.data, e.vps);
          }
          break;
        // ACCESS UNIT DELIMITER
        case 35:
          o = !0, e.audFound = !0, (c = a) != null && c.frame && (this.pushAccessUnit(a, e), a = null), a || (a = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts));
          break;
        default:
          o = !1;
          break;
      }
      a && o && a.units.push(l);
    }), r && a && (this.pushAccessUnit(a, e), this.VideoSample = null);
  }
  pushParameterSet(e, t, s) {
    (s && s[0] === this.initVPS || !s && !e.length) && e.push(t);
  }
  getNALuType(e, t) {
    return (e[t] & 126) >>> 1;
  }
  ebsp2rbsp(e) {
    const t = new Uint8Array(e.byteLength);
    let s = 0;
    for (let r = 0; r < e.byteLength; r++)
      r >= 2 && e[r] === 3 && e[r - 1] === 0 && e[r - 2] === 0 || (t[s] = e[r], s++);
    return new Uint8Array(t.buffer, 0, s);
  }
  pushAccessUnit(e, t) {
    super.pushAccessUnit(e, t), this.initVPS && (this.initVPS = null);
  }
  readVPS(e) {
    const t = new rs(e);
    t.readUByte(), t.readUByte(), t.readBits(4), t.skipBits(2), t.readBits(6);
    const s = t.readBits(3), r = t.readBoolean();
    return {
      numTemporalLayers: s + 1,
      temporalIdNested: r
    };
  }
  readSPS(e) {
    const t = new rs(this.ebsp2rbsp(e));
    t.readUByte(), t.readUByte(), t.readBits(4);
    const s = t.readBits(3);
    t.readBoolean();
    const r = t.readBits(2), n = t.readBoolean(), a = t.readBits(5), o = t.readUByte(), u = t.readUByte(), l = t.readUByte(), h = t.readUByte(), c = t.readUByte(), d = t.readUByte(), g = t.readUByte(), f = t.readUByte(), m = t.readUByte(), p = t.readUByte(), y = t.readUByte(), v = [], T = [];
    for (let te = 0; te < s; te++)
      v.push(t.readBoolean()), T.push(t.readBoolean());
    if (s > 0)
      for (let te = s; te < 8; te++)
        t.readBits(2);
    for (let te = 0; te < s; te++)
      v[te] && (t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte(), t.readUByte()), T[te] && t.readUByte();
    t.readUEG();
    const S = t.readUEG();
    S == 3 && t.skipBits(1);
    const x = t.readUEG(), L = t.readUEG(), A = t.readBoolean();
    let I = 0, _ = 0, b = 0, P = 0;
    A && (I += t.readUEG(), _ += t.readUEG(), b += t.readUEG(), P += t.readUEG());
    const M = t.readUEG(), U = t.readUEG(), K = t.readUEG(), $ = t.readBoolean();
    for (let te = $ ? 0 : s; te <= s; te++)
      t.skipUEG(), t.skipUEG(), t.skipUEG();
    if (t.skipUEG(), t.skipUEG(), t.skipUEG(), t.skipUEG(), t.skipUEG(), t.skipUEG(), t.readBoolean() && t.readBoolean())
      for (let Ae = 0; Ae < 4; Ae++)
        for (let Fe = 0; Fe < (Ae === 3 ? 2 : 6); Fe++)
          if (!t.readBoolean())
            t.readUEG();
          else {
            const Ue = Math.min(64, 1 << 4 + (Ae << 1));
            Ae > 1 && t.readEG();
            for (let Lt = 0; Lt < Ue; Lt++)
              t.readEG();
          }
    t.readBoolean(), t.readBoolean(), t.readBoolean() && (t.readUByte(), t.skipUEG(), t.skipUEG(), t.readBoolean());
    const N = t.readUEG();
    let H = 0;
    for (let te = 0; te < N; te++) {
      let Ae = !1;
      if (te !== 0 && (Ae = t.readBoolean()), Ae) {
        te === N && t.readUEG(), t.readBoolean(), t.readUEG();
        let Fe = 0;
        for (let gt = 0; gt <= H; gt++) {
          const Ue = t.readBoolean();
          let Lt = !1;
          Ue || (Lt = t.readBoolean()), (Ue || Lt) && Fe++;
        }
        H = Fe;
      } else {
        const Fe = t.readUEG(), gt = t.readUEG();
        H = Fe + gt;
        for (let Ue = 0; Ue < Fe; Ue++)
          t.readUEG(), t.readBoolean();
        for (let Ue = 0; Ue < gt; Ue++)
          t.readUEG(), t.readBoolean();
      }
    }
    if (t.readBoolean()) {
      const te = t.readUEG();
      for (let Ae = 0; Ae < te; Ae++) {
        for (let Fe = 0; Fe < K + 4; Fe++)
          t.readBits(1);
        t.readBits(1);
      }
    }
    let w = 0, O = 1, q = 1, ie = !0, X = 1, Z = 0;
    t.readBoolean(), t.readBoolean();
    let xe = !1;
    if (t.readBoolean()) {
      if (t.readBoolean()) {
        const mt = t.readUByte(), Sn = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2], Es = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
        mt > 0 && mt < 16 ? (O = Sn[mt - 1], q = Es[mt - 1]) : mt === 255 && (O = t.readBits(16), q = t.readBits(16));
      }
      if (t.readBoolean() && t.readBoolean(), t.readBoolean() && (t.readBits(3), t.readBoolean(), t.readBoolean() && (t.readUByte(), t.readUByte(), t.readUByte())), t.readBoolean() && (t.readUEG(), t.readUEG()), t.readBoolean(), t.readBoolean(), t.readBoolean(), xe = t.readBoolean(), xe && (t.skipUEG(), t.skipUEG(), t.skipUEG(), t.skipUEG()), t.readBoolean() && (X = t.readBits(32), Z = t.readBits(32), t.readBoolean() && t.readUEG(), t.readBoolean())) {
        const Es = t.readBoolean(), xn = t.readBoolean();
        let Xt = !1;
        (Es || xn) && (Xt = t.readBoolean(), Xt && (t.readUByte(), t.readBits(5), t.readBoolean(), t.readBits(5)), t.readBits(4), t.readBits(4), Xt && t.readBits(4), t.readBits(5), t.readBits(5), t.readBits(5));
        for (let An = 0; An <= s; An++) {
          ie = t.readBoolean();
          const Bu = ie || t.readBoolean();
          let In = !1;
          Bu ? t.readEG() : In = t.readBoolean();
          const bn = In ? 1 : t.readUEG() + 1;
          if (Es)
            for (let zt = 0; zt < bn; zt++)
              t.readUEG(), t.readUEG(), Xt && (t.readUEG(), t.readUEG()), t.skipBits(1);
          if (xn)
            for (let zt = 0; zt < bn; zt++)
              t.readUEG(), t.readUEG(), Xt && (t.readUEG(), t.readUEG()), t.skipBits(1);
        }
      }
      t.readBoolean() && (t.readBoolean(), t.readBoolean(), t.readBoolean(), w = t.readUEG());
    }
    let Me = x, He = L;
    if (A) {
      let te = 1, Ae = 1;
      S === 1 ? te = Ae = 2 : S == 2 && (te = 2), Me = x - te * _ - te * I, He = L - Ae * P - Ae * b;
    }
    const ft = r ? ["A", "B", "C"][r] : "", Nu = o << 24 | u << 16 | l << 8 | h;
    let vi = 0;
    for (let te = 0; te < 32; te++)
      vi = (vi | (Nu >> te & 1) << 31 - te) >>> 0;
    let Ti = vi.toString(16);
    return a === 1 && Ti === "2" && (Ti = "6"), {
      codecString: `hvc1.${ft}${a}.${Ti}.${n ? "H" : "L"}${y}.B0`,
      params: {
        general_tier_flag: n,
        general_profile_idc: a,
        general_profile_space: r,
        general_profile_compatibility_flags: [o, u, l, h],
        general_constraint_indicator_flags: [c, d, g, f, m, p],
        general_level_idc: y,
        bit_depth: M + 8,
        bit_depth_luma_minus8: M,
        bit_depth_chroma_minus8: U,
        min_spatial_segmentation_idc: w,
        chroma_format_idc: S,
        frame_rate: {
          fixed: ie,
          fps: Z / X
        }
      },
      width: Me,
      height: He,
      pixelRatio: [O, q]
    };
  }
  readPPS(e) {
    const t = new rs(this.ebsp2rbsp(e));
    t.readUByte(), t.readUByte(), t.skipUEG(), t.skipUEG(), t.skipBits(2), t.skipBits(3), t.skipBits(2), t.skipUEG(), t.skipUEG(), t.skipEG(), t.skipBits(2), t.readBoolean() && t.skipUEG(), t.skipEG(), t.skipEG(), t.skipBits(4);
    const r = t.readBoolean(), n = t.readBoolean();
    let a = 1;
    return n && r ? a = 0 : n ? a = 3 : r && (a = 2), {
      parallelismType: a
    };
  }
  matchSPS(e, t) {
    return String.fromCharCode.apply(null, e).substr(3) === String.fromCharCode.apply(null, t).substr(3);
  }
}
const Ee = 188;
class lt {
  constructor(e, t, s, r) {
    this.logger = void 0, this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._pmtId = -1, this._videoTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.remainderData = null, this.videoParser = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.logger = r, this.videoParser = null;
  }
  static probe(e, t) {
    const s = lt.syncOffset(e);
    return s > 0 && t.warn(`MPEG2-TS detected but first sync word found @ offset ${s}`), s !== -1;
  }
  static syncOffset(e) {
    const t = e.length;
    let s = Math.min(Ee * 5, t - Ee) + 1, r = 0;
    for (; r < s; ) {
      let n = !1, a = -1, o = 0;
      for (let u = r; u < t; u += Ee)
        if (e[u] === 71 && (t - u === Ee || e[u + Ee] === 71)) {
          if (o++, a === -1 && (a = u, a !== 0 && (s = Math.min(a + Ee * 99, e.length - Ee) + 1)), n || (n = Lr(e, u) === 0), n && o > 1 && (a === 0 && o > 2 || u + Ee > s))
            return a;
        } else {
          if (o)
            return -1;
          break;
        }
      r++;
    }
    return -1;
  }
  /**
   * Creates a track model internal to demuxer used to drive remuxing input
   */
  static createTrack(e, t) {
    return {
      container: e === "video" || e === "audio" ? "video/mp2t" : void 0,
      type: e,
      id: hl[e],
      pid: -1,
      inputTimeScale: 9e4,
      sequenceNumber: 0,
      samples: [],
      dropped: 0,
      duration: e === "audio" ? t : void 0
    };
  }
  /**
   * Initializes a new init segment on the demuxer/remuxer interface. Needed for discontinuities/track-switches (or at stream start)
   * Resets all internal track instances of the demuxer.
   */
  resetInitSegment(e, t, s, r) {
    this.pmtParsed = !1, this._pmtId = -1, this._videoTrack = lt.createTrack("video"), this._videoTrack.duration = r, this._audioTrack = lt.createTrack("audio", r), this._id3Track = lt.createTrack("id3"), this._txtTrack = lt.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.videoParser = null, this.aacOverFlow = null, this.remainderData = null, this.audioCodec = t, this.videoCodec = s;
  }
  resetTimeStamp() {
  }
  resetContiguity() {
    const {
      _audioTrack: e,
      _videoTrack: t,
      _id3Track: s
    } = this;
    e && (e.pesData = null), t && (t.pesData = null), s && (s.pesData = null), this.aacOverFlow = null, this.remainderData = null;
  }
  demux(e, t, s = !1, r = !1) {
    s || (this.sampleAes = null);
    let n;
    const a = this._videoTrack, o = this._audioTrack, u = this._id3Track, l = this._txtTrack;
    let h = a.pid, c = a.pesData, d = o.pid, g = u.pid, f = o.pesData, m = u.pesData, p = null, y = this.pmtParsed, v = this._pmtId, T = e.length;
    if (this.remainderData && (e = Ne(this.remainderData, e), T = e.length, this.remainderData = null), T < Ee && !r)
      return this.remainderData = e, {
        audioTrack: o,
        videoTrack: a,
        id3Track: u,
        textTrack: l
      };
    const S = Math.max(0, lt.syncOffset(e));
    T -= (T - S) % Ee, T < e.byteLength && !r && (this.remainderData = new Uint8Array(e.buffer, T, e.buffer.byteLength - T));
    let x = 0;
    for (let A = S; A < T; A += Ee)
      if (e[A] === 71) {
        const I = !!(e[A + 1] & 64), _ = Lr(e, A), b = (e[A + 3] & 48) >> 4;
        let P;
        if (b > 1) {
          if (P = A + 5 + e[A + 4], P === A + Ee)
            continue;
        } else
          P = A + 4;
        switch (_) {
          case h:
            I && (c && (n = Pt(c, this.logger)) && (this.readyVideoParser(a.segmentCodec), this.videoParser !== null && this.videoParser.parsePES(a, l, n, !1)), c = {
              data: [],
              size: 0
            }), c && (c.data.push(e.subarray(P, A + Ee)), c.size += A + Ee - P);
            break;
          case d:
            if (I) {
              if (f && (n = Pt(f, this.logger)))
                switch (o.segmentCodec) {
                  case "aac":
                    this.parseAACPES(o, n);
                    break;
                  case "mp3":
                    this.parseMPEGPES(o, n);
                    break;
                  case "ac3":
                    this.parseAC3PES(o, n);
                    break;
                }
              f = {
                data: [],
                size: 0
              };
            }
            f && (f.data.push(e.subarray(P, A + Ee)), f.size += A + Ee - P);
            break;
          case g:
            I && (m && (n = Pt(m, this.logger)) && this.parseID3PES(u, n), m = {
              data: [],
              size: 0
            }), m && (m.data.push(e.subarray(P, A + Ee)), m.size += A + Ee - P);
            break;
          case 0:
            I && (P += e[P] + 1), v = this._pmtId = c0(e, P);
            break;
          case v: {
            I && (P += e[P] + 1);
            const M = d0(e, P, this.typeSupported, s, this.observer, this.logger);
            h = M.videoPid, h > 0 && (a.pid = h, a.segmentCodec = M.segmentVideoCodec), d = M.audioPid, d > 0 && (o.pid = d, o.segmentCodec = M.segmentAudioCodec), g = M.id3Pid, g > 0 && (u.pid = g), p !== null && !y && (this.logger.warn(`MPEG-TS PMT found at ${A} after unknown PID '${p}'. Backtracking to sync byte @${S} to parse all TS packets.`), p = null, A = S - 188), y = this.pmtParsed = !0;
            break;
          }
          case 17:
          case 8191:
            break;
          default:
            p = _;
            break;
        }
      } else
        x++;
    x > 0 && Rr(this.observer, new Error(`Found ${x} TS packet/s that do not start with 0x47`), void 0, this.logger), a.pesData = c, o.pesData = f, u.pesData = m;
    const L = {
      audioTrack: o,
      videoTrack: a,
      id3Track: u,
      textTrack: l
    };
    return r && this.extractRemainingSamples(L), L;
  }
  flush() {
    const {
      remainderData: e
    } = this;
    this.remainderData = null;
    let t;
    return e ? t = this.demux(e, -1, !1, !0) : t = {
      videoTrack: this._videoTrack,
      audioTrack: this._audioTrack,
      id3Track: this._id3Track,
      textTrack: this._txtTrack
    }, this.extractRemainingSamples(t), this.sampleAes ? this.decrypt(t, this.sampleAes) : t;
  }
  extractRemainingSamples(e) {
    const {
      audioTrack: t,
      videoTrack: s,
      id3Track: r,
      textTrack: n
    } = e, a = s.pesData, o = t.pesData, u = r.pesData;
    let l;
    if (a && (l = Pt(a, this.logger)) ? (this.readyVideoParser(s.segmentCodec), this.videoParser !== null && (this.videoParser.parsePES(s, n, l, !0), s.pesData = null)) : s.pesData = a, o && (l = Pt(o, this.logger))) {
      switch (t.segmentCodec) {
        case "aac":
          this.parseAACPES(t, l);
          break;
        case "mp3":
          this.parseMPEGPES(t, l);
          break;
        case "ac3":
          this.parseAC3PES(t, l);
          break;
      }
      t.pesData = null;
    } else
      o != null && o.size && this.logger.log("last AAC PES packet truncated,might overlap between fragments"), t.pesData = o;
    u && (l = Pt(u, this.logger)) ? (this.parseID3PES(r, l), r.pesData = null) : r.pesData = u;
  }
  demuxSampleAes(e, t, s) {
    const r = this.demux(e, s, !0, !this.config.progressive), n = this.sampleAes = new l0(this.observer, this.config, t);
    return this.decrypt(r, n);
  }
  readyVideoParser(e) {
    this.videoParser === null && (e === "avc" ? this.videoParser = new u0() : e === "hevc" && (this.videoParser = new h0()));
  }
  decrypt(e, t) {
    return new Promise((s) => {
      const {
        audioTrack: r,
        videoTrack: n
      } = e;
      r.samples && r.segmentCodec === "aac" ? t.decryptAacSamples(r.samples, 0, () => {
        n.samples ? t.decryptAvcSamples(n.samples, 0, 0, () => {
          s(e);
        }) : s(e);
      }) : n.samples && t.decryptAvcSamples(n.samples, 0, 0, () => {
        s(e);
      });
    });
  }
  destroy() {
    this.observer && this.observer.removeAllListeners(), this.config = this.logger = this.observer = null, this.aacOverFlow = this.videoParser = this.remainderData = this.sampleAes = null, this._videoTrack = this._audioTrack = this._id3Track = this._txtTrack = void 0;
  }
  parseAACPES(e, t) {
    let s = 0;
    const r = this.aacOverFlow;
    let n = t.data;
    if (r) {
      this.aacOverFlow = null;
      const c = r.missing, d = r.sample.unit.byteLength;
      if (c === -1)
        n = Ne(r.sample.unit, n);
      else {
        const g = d - c;
        r.sample.unit.set(n.subarray(0, c), g), e.samples.push(r.sample), s = r.missing;
      }
    }
    let a, o;
    for (a = s, o = n.length; a < o - 1 && !oi(n, a); a++)
      ;
    if (a !== s) {
      let c;
      const d = a < o - 1;
      if (d ? c = `AAC PES did not start with ADTS header,offset:${a}` : c = "No ADTS header found in AAC PES", Rr(this.observer, new Error(c), d, this.logger), !d)
        return;
    }
    jl(e, this.observer, n, a, this.audioCodec);
    let u;
    if (t.pts !== void 0)
      u = t.pts;
    else if (r) {
      const c = ql(e.samplerate);
      u = r.sample.pts + c;
    } else {
      this.logger.warn("[tsdemuxer]: AAC PES unknown PTS");
      return;
    }
    let l = 0, h;
    for (; a < o; )
      if (h = Xl(e, n, a, u, l), a += h.length, h.missing) {
        this.aacOverFlow = h;
        break;
      } else
        for (l++; a < o - 1 && !oi(n, a); a++)
          ;
  }
  parseMPEGPES(e, t) {
    const s = t.data, r = s.length;
    let n = 0, a = 0;
    const o = t.pts;
    if (o === void 0) {
      this.logger.warn("[tsdemuxer]: MPEG PES unknown PTS");
      return;
    }
    for (; a < r; )
      if (eu(s, a)) {
        const u = Zl(e, s, a, o, n);
        if (u)
          a += u.length, n++;
        else
          break;
      } else
        a++;
  }
  parseAC3PES(e, t) {
    {
      const s = t.data, r = t.pts;
      if (r === void 0) {
        this.logger.warn("[tsdemuxer]: AC3 PES unknown PTS");
        return;
      }
      const n = s.length;
      let a = 0, o = 0, u;
      for (; o < n && (u = iu(e, s, o, r, a++)) > 0; )
        o += u;
    }
  }
  parseID3PES(e, t) {
    if (t.pts === void 0) {
      this.logger.warn("[tsdemuxer]: ID3 PES unknown PTS");
      return;
    }
    const s = ae({}, t, {
      type: this._videoTrack ? ke.emsg : ke.audioId3,
      duration: Number.POSITIVE_INFINITY
    });
    e.samples.push(s);
  }
}
function Lr(i, e) {
  return ((i[e + 1] & 31) << 8) + i[e + 2];
}
function c0(i, e) {
  return (i[e + 10] & 31) << 8 | i[e + 11];
}
function d0(i, e, t, s, r, n) {
  const a = {
    audioPid: -1,
    videoPid: -1,
    id3Pid: -1,
    segmentVideoCodec: "avc",
    segmentAudioCodec: "aac"
  }, o = (i[e + 1] & 15) << 8 | i[e + 2], u = e + 3 + o - 4, l = (i[e + 10] & 15) << 8 | i[e + 11];
  for (e += 12 + l; e < u; ) {
    const h = Lr(i, e), c = (i[e + 3] & 15) << 8 | i[e + 4];
    switch (i[e]) {
      case 207:
        if (!s) {
          Hi("ADTS AAC", n);
          break;
        }
      /* falls through */
      case 15:
        a.audioPid === -1 && (a.audioPid = h);
        break;
      // Packetized metadata (ID3)
      case 21:
        a.id3Pid === -1 && (a.id3Pid = h);
        break;
      case 219:
        if (!s) {
          Hi("H.264", n);
          break;
        }
      /* falls through */
      case 27:
        a.videoPid === -1 && (a.videoPid = h);
        break;
      // ISO/IEC 11172-3 (MPEG-1 audio)
      // or ISO/IEC 13818-3 (MPEG-2 halved sample rate audio)
      case 3:
      case 4:
        !t.mpeg && !t.mp3 ? n.log("MPEG audio found, not supported in this browser") : a.audioPid === -1 && (a.audioPid = h, a.segmentAudioCodec = "mp3");
        break;
      case 193:
        if (!s) {
          Hi("AC-3", n);
          break;
        }
      /* falls through */
      case 129:
        t.ac3 ? a.audioPid === -1 && (a.audioPid = h, a.segmentAudioCodec = "ac3") : n.log("AC-3 audio found, not supported in this browser");
        break;
      case 6:
        if (a.audioPid === -1 && c > 0) {
          let d = e + 5, g = c;
          for (; g > 2; ) {
            i[d] === 106 && (t.ac3 !== !0 ? n.log("AC-3 audio found, not supported in this browser for now") : (a.audioPid = h, a.segmentAudioCodec = "ac3"));
            const m = i[d + 1] + 2;
            d += m, g -= m;
          }
        }
        break;
      case 194:
      // SAMPLE-AES EC3
      /* falls through */
      case 135:
        return Rr(r, new Error("Unsupported EC-3 in M2TS found"), void 0, n), a;
      case 36:
        a.videoPid === -1 && (a.videoPid = h, a.segmentVideoCodec = "hevc", n.log("HEVC in M2TS found"));
        break;
    }
    e += c + 5;
  }
  return a;
}
function Rr(i, e, t, s) {
  s.warn(`parsing error: ${e.message}`), i.emit(E.ERROR, E.ERROR, {
    type: V.MEDIA_ERROR,
    details: D.FRAG_PARSING_ERROR,
    fatal: !1,
    levelRetry: t,
    error: e,
    reason: e.message
  });
}
function Hi(i, e) {
  e.log(`${i} with AES-128-CBC encryption found in unencrypted stream`);
}
function Pt(i, e) {
  let t = 0, s, r, n, a, o;
  const u = i.data;
  if (!i || i.size === 0)
    return null;
  for (; u[0].length < 19 && u.length > 1; )
    u[0] = Ne(u[0], u[1]), u.splice(1, 1);
  if (s = u[0], (s[0] << 16) + (s[1] << 8) + s[2] === 1) {
    if (r = (s[4] << 8) + s[5], r && r > i.size - 6)
      return null;
    const h = s[7];
    h & 192 && (a = (s[9] & 14) * 536870912 + // 1 << 29
    (s[10] & 255) * 4194304 + // 1 << 22
    (s[11] & 254) * 16384 + // 1 << 14
    (s[12] & 255) * 128 + // 1 << 7
    (s[13] & 254) / 2, h & 64 ? (o = (s[14] & 14) * 536870912 + // 1 << 29
    (s[15] & 255) * 4194304 + // 1 << 22
    (s[16] & 254) * 16384 + // 1 << 14
    (s[17] & 255) * 128 + // 1 << 7
    (s[18] & 254) / 2, a - o > 60 * 9e4 && (e.warn(`${Math.round((a - o) / 9e4)}s delta between PTS and DTS, align them`), a = o)) : o = a), n = s[8];
    let c = n + 9;
    if (i.size <= c)
      return null;
    i.size -= c;
    const d = new Uint8Array(i.size);
    for (let g = 0, f = u.length; g < f; g++) {
      s = u[g];
      let m = s.byteLength;
      if (c)
        if (c > m) {
          c -= m;
          continue;
        } else
          s = s.subarray(c), m -= c, c = 0;
      d.set(s, t), t += m;
    }
    return r && (r -= n + 3), {
      data: d,
      pts: a,
      dts: o,
      len: r
    };
  }
  return null;
}
class f0 {
  static getSilentFrame(e, t) {
    switch (e) {
      case "mp4a.40.2":
        if (t === 1)
          return new Uint8Array([0, 200, 0, 128, 35, 128]);
        if (t === 2)
          return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
        if (t === 3)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
        if (t === 4)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
        if (t === 5)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
        if (t === 6)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
        break;
      // handle HE-AAC below (mp4a.40.5 / mp4a.40.29)
      default:
        if (t === 1)
          return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        if (t === 2)
          return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        if (t === 3)
          return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        break;
    }
  }
}
const nt = Math.pow(2, 32) - 1;
class R {
  static init() {
    R.types = {
      avc1: [],
      // codingname
      avcC: [],
      hvc1: [],
      hvcC: [],
      btrt: [],
      dinf: [],
      dref: [],
      esds: [],
      ftyp: [],
      hdlr: [],
      mdat: [],
      mdhd: [],
      mdia: [],
      mfhd: [],
      minf: [],
      moof: [],
      moov: [],
      mp4a: [],
      ".mp3": [],
      dac3: [],
      "ac-3": [],
      mvex: [],
      mvhd: [],
      pasp: [],
      sdtp: [],
      stbl: [],
      stco: [],
      stsc: [],
      stsd: [],
      stsz: [],
      stts: [],
      tfdt: [],
      tfhd: [],
      traf: [],
      trak: [],
      trun: [],
      trex: [],
      tkhd: [],
      vmhd: [],
      smhd: []
    };
    let e;
    for (e in R.types)
      R.types.hasOwnProperty(e) && (R.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
    const t = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      // pre_defined
      118,
      105,
      100,
      101,
      // handler_type: 'vide'
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      86,
      105,
      100,
      101,
      111,
      72,
      97,
      110,
      100,
      108,
      101,
      114,
      0
      // name: 'VideoHandler'
    ]), s = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      // pre_defined
      115,
      111,
      117,
      110,
      // handler_type: 'soun'
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      83,
      111,
      117,
      110,
      100,
      72,
      97,
      110,
      100,
      108,
      101,
      114,
      0
      // name: 'SoundHandler'
    ]);
    R.HDLR_TYPES = {
      video: t,
      audio: s
    };
    const r = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      1,
      // entry_count
      0,
      0,
      0,
      12,
      // entry_size
      117,
      114,
      108,
      32,
      // 'url' type
      0,
      // version 0
      0,
      0,
      1
      // entry_flags
    ]), n = new Uint8Array([
      0,
      // version
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0
      // entry_count
    ]);
    R.STTS = R.STSC = R.STCO = n, R.STSZ = new Uint8Array([
      0,
      // version
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      // sample_size
      0,
      0,
      0,
      0
      // sample_count
    ]), R.VMHD = new Uint8Array([
      0,
      // version
      0,
      0,
      1,
      // flags
      0,
      0,
      // graphicsmode
      0,
      0,
      0,
      0,
      0,
      0
      // opcolor
    ]), R.SMHD = new Uint8Array([
      0,
      // version
      0,
      0,
      0,
      // flags
      0,
      0,
      // balance
      0,
      0
      // reserved
    ]), R.STSD = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      1
    ]);
    const a = new Uint8Array([105, 115, 111, 109]), o = new Uint8Array([97, 118, 99, 49]), u = new Uint8Array([0, 0, 0, 1]);
    R.FTYP = R.box(R.types.ftyp, a, u, a, o), R.DINF = R.box(R.types.dinf, R.box(R.types.dref, r));
  }
  static box(e, ...t) {
    let s = 8, r = t.length;
    const n = r;
    for (; r--; )
      s += t[r].byteLength;
    const a = new Uint8Array(s);
    for (a[0] = s >> 24 & 255, a[1] = s >> 16 & 255, a[2] = s >> 8 & 255, a[3] = s & 255, a.set(e, 4), r = 0, s = 8; r < n; r++)
      a.set(t[r], s), s += t[r].byteLength;
    return a;
  }
  static hdlr(e) {
    return R.box(R.types.hdlr, R.HDLR_TYPES[e]);
  }
  static mdat(e) {
    return R.box(R.types.mdat, e);
  }
  static mdhd(e, t) {
    t *= e;
    const s = Math.floor(t / (nt + 1)), r = Math.floor(t % (nt + 1));
    return R.box(R.types.mdhd, new Uint8Array([
      1,
      // version 1
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      // creation_time
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      // modification_time
      e >> 24 & 255,
      e >> 16 & 255,
      e >> 8 & 255,
      e & 255,
      // timescale
      s >> 24,
      s >> 16 & 255,
      s >> 8 & 255,
      s & 255,
      r >> 24,
      r >> 16 & 255,
      r >> 8 & 255,
      r & 255,
      85,
      196,
      // 'und' language (undetermined)
      0,
      0
    ]));
  }
  static mdia(e) {
    return R.box(R.types.mdia, R.mdhd(e.timescale || 0, e.duration || 0), R.hdlr(e.type), R.minf(e));
  }
  static mfhd(e) {
    return R.box(R.types.mfhd, new Uint8Array([
      0,
      0,
      0,
      0,
      // flags
      e >> 24,
      e >> 16 & 255,
      e >> 8 & 255,
      e & 255
      // sequence_number
    ]));
  }
  static minf(e) {
    return e.type === "audio" ? R.box(R.types.minf, R.box(R.types.smhd, R.SMHD), R.DINF, R.stbl(e)) : R.box(R.types.minf, R.box(R.types.vmhd, R.VMHD), R.DINF, R.stbl(e));
  }
  static moof(e, t, s) {
    return R.box(R.types.moof, R.mfhd(e), R.traf(s, t));
  }
  static moov(e) {
    let t = e.length;
    const s = [];
    for (; t--; )
      s[t] = R.trak(e[t]);
    return R.box.apply(null, [R.types.moov, R.mvhd(e[0].timescale || 0, e[0].duration || 0)].concat(s).concat(R.mvex(e)));
  }
  static mvex(e) {
    let t = e.length;
    const s = [];
    for (; t--; )
      s[t] = R.trex(e[t]);
    return R.box.apply(null, [R.types.mvex, ...s]);
  }
  static mvhd(e, t) {
    t *= e;
    const s = Math.floor(t / (nt + 1)), r = Math.floor(t % (nt + 1)), n = new Uint8Array([
      1,
      // version 1
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      // creation_time
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      // modification_time
      e >> 24 & 255,
      e >> 16 & 255,
      e >> 8 & 255,
      e & 255,
      // timescale
      s >> 24,
      s >> 16 & 255,
      s >> 8 & 255,
      s & 255,
      r >> 24,
      r >> 16 & 255,
      r >> 8 & 255,
      r & 255,
      0,
      1,
      0,
      0,
      // 1.0 rate
      1,
      0,
      // 1.0 volume
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      64,
      0,
      0,
      0,
      // transformation: unity matrix
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // pre_defined
      255,
      255,
      255,
      255
      // next_track_ID
    ]);
    return R.box(R.types.mvhd, n);
  }
  static sdtp(e) {
    const t = e.samples || [], s = new Uint8Array(4 + t.length);
    let r, n;
    for (r = 0; r < t.length; r++)
      n = t[r].flags, s[r + 4] = n.dependsOn << 4 | n.isDependedOn << 2 | n.hasRedundancy;
    return R.box(R.types.sdtp, s);
  }
  static stbl(e) {
    return R.box(R.types.stbl, R.stsd(e), R.box(R.types.stts, R.STTS), R.box(R.types.stsc, R.STSC), R.box(R.types.stsz, R.STSZ), R.box(R.types.stco, R.STCO));
  }
  static avc1(e) {
    let t = [], s = [], r, n, a;
    for (r = 0; r < e.sps.length; r++)
      n = e.sps[r], a = n.byteLength, t.push(a >>> 8 & 255), t.push(a & 255), t = t.concat(Array.prototype.slice.call(n));
    for (r = 0; r < e.pps.length; r++)
      n = e.pps[r], a = n.byteLength, s.push(a >>> 8 & 255), s.push(a & 255), s = s.concat(Array.prototype.slice.call(n));
    const o = R.box(R.types.avcC, new Uint8Array([
      1,
      // version
      t[3],
      // profile
      t[4],
      // profile compat
      t[5],
      // level
      255,
      // lengthSizeMinusOne, hard-coded to 4 bytes
      224 | e.sps.length
      // 3bit reserved (111) + numOfSequenceParameterSets
    ].concat(t).concat([
      e.pps.length
      // numOfPictureParameterSets
    ]).concat(s))), u = e.width, l = e.height, h = e.pixelRatio[0], c = e.pixelRatio[1];
    return R.box(
      R.types.avc1,
      new Uint8Array([
        0,
        0,
        0,
        // reserved
        0,
        0,
        0,
        // reserved
        0,
        1,
        // data_reference_index
        0,
        0,
        // pre_defined
        0,
        0,
        // reserved
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // pre_defined
        u >> 8 & 255,
        u & 255,
        // width
        l >> 8 & 255,
        l & 255,
        // height
        0,
        72,
        0,
        0,
        // horizresolution
        0,
        72,
        0,
        0,
        // vertresolution
        0,
        0,
        0,
        0,
        // reserved
        0,
        1,
        // frame_count
        18,
        100,
        97,
        105,
        108,
        // dailymotion/hls.js
        121,
        109,
        111,
        116,
        105,
        111,
        110,
        47,
        104,
        108,
        115,
        46,
        106,
        115,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // compressorname
        0,
        24,
        // depth = 24
        17,
        17
      ]),
      // pre_defined = -1
      o,
      R.box(R.types.btrt, new Uint8Array([
        0,
        28,
        156,
        128,
        // bufferSizeDB
        0,
        45,
        198,
        192,
        // maxBitrate
        0,
        45,
        198,
        192
      ])),
      // avgBitrate
      R.box(R.types.pasp, new Uint8Array([
        h >> 24,
        // hSpacing
        h >> 16 & 255,
        h >> 8 & 255,
        h & 255,
        c >> 24,
        // vSpacing
        c >> 16 & 255,
        c >> 8 & 255,
        c & 255
      ]))
    );
  }
  static esds(e) {
    const t = e.config;
    return new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      3,
      // descriptor_type
      25,
      // length
      0,
      1,
      // es_id
      0,
      // stream_priority
      4,
      // descriptor_type
      17,
      // length
      64,
      // codec : mpeg4_audio
      21,
      // stream_type
      0,
      0,
      0,
      // buffer_size
      0,
      0,
      0,
      0,
      // maxBitrate
      0,
      0,
      0,
      0,
      // avgBitrate
      5,
      // descriptor_type
      2,
      // length
      ...t,
      6,
      1,
      2
      // GASpecificConfig)); // length + audio config descriptor
    ]);
  }
  static audioStsd(e) {
    const t = e.samplerate || 0;
    return new Uint8Array([
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      // reserved
      0,
      1,
      // data_reference_index
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // reserved
      0,
      e.channelCount || 0,
      // channelcount
      0,
      16,
      // sampleSize:16bits
      0,
      0,
      0,
      0,
      // reserved2
      t >> 8 & 255,
      t & 255,
      //
      0,
      0
    ]);
  }
  static mp4a(e) {
    return R.box(R.types.mp4a, R.audioStsd(e), R.box(R.types.esds, R.esds(e)));
  }
  static mp3(e) {
    return R.box(R.types[".mp3"], R.audioStsd(e));
  }
  static ac3(e) {
    return R.box(R.types["ac-3"], R.audioStsd(e), R.box(R.types.dac3, e.config));
  }
  static stsd(e) {
    const {
      segmentCodec: t
    } = e;
    if (e.type === "audio") {
      if (t === "aac")
        return R.box(R.types.stsd, R.STSD, R.mp4a(e));
      if (t === "ac3" && e.config)
        return R.box(R.types.stsd, R.STSD, R.ac3(e));
      if (t === "mp3" && e.codec === "mp3")
        return R.box(R.types.stsd, R.STSD, R.mp3(e));
    } else if (e.pps && e.sps) {
      if (t === "avc")
        return R.box(R.types.stsd, R.STSD, R.avc1(e));
      if (t === "hevc" && e.vps)
        return R.box(R.types.stsd, R.STSD, R.hvc1(e));
    } else
      throw new Error("video track missing pps or sps");
    throw new Error(`unsupported ${e.type} segment codec (${t}/${e.codec})`);
  }
  static tkhd(e) {
    const t = e.id, s = (e.duration || 0) * (e.timescale || 0), r = e.width || 0, n = e.height || 0, a = Math.floor(s / (nt + 1)), o = Math.floor(s % (nt + 1));
    return R.box(R.types.tkhd, new Uint8Array([
      1,
      // version 1
      0,
      0,
      7,
      // flags
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      // creation_time
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      // modification_time
      t >> 24 & 255,
      t >> 16 & 255,
      t >> 8 & 255,
      t & 255,
      // track_ID
      0,
      0,
      0,
      0,
      // reserved
      a >> 24,
      a >> 16 & 255,
      a >> 8 & 255,
      a & 255,
      o >> 24,
      o >> 16 & 255,
      o >> 8 & 255,
      o & 255,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      // layer
      0,
      0,
      // alternate_group
      0,
      0,
      // non-audio track volume
      0,
      0,
      // reserved
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      64,
      0,
      0,
      0,
      // transformation: unity matrix
      r >> 8 & 255,
      r & 255,
      0,
      0,
      // width
      n >> 8 & 255,
      n & 255,
      0,
      0
      // height
    ]));
  }
  static traf(e, t) {
    const s = R.sdtp(e), r = e.id, n = Math.floor(t / (nt + 1)), a = Math.floor(t % (nt + 1));
    return R.box(
      R.types.traf,
      R.box(R.types.tfhd, new Uint8Array([
        0,
        // version 0
        0,
        0,
        0,
        // flags
        r >> 24,
        r >> 16 & 255,
        r >> 8 & 255,
        r & 255
        // track_ID
      ])),
      R.box(R.types.tfdt, new Uint8Array([
        1,
        // version 1
        0,
        0,
        0,
        // flags
        n >> 24,
        n >> 16 & 255,
        n >> 8 & 255,
        n & 255,
        a >> 24,
        a >> 16 & 255,
        a >> 8 & 255,
        a & 255
      ])),
      R.trun(e, s.length + 16 + // tfhd
      20 + // tfdt
      8 + // traf header
      16 + // mfhd
      8 + // moof header
      8),
      // mdat header
      s
    );
  }
  /**
   * Generate a track box.
   * @param track a track definition
   */
  static trak(e) {
    return e.duration = e.duration || 4294967295, R.box(R.types.trak, R.tkhd(e), R.mdia(e));
  }
  static trex(e) {
    const t = e.id;
    return R.box(R.types.trex, new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      t >> 24,
      t >> 16 & 255,
      t >> 8 & 255,
      t & 255,
      // track_ID
      0,
      0,
      0,
      1,
      // default_sample_description_index
      0,
      0,
      0,
      0,
      // default_sample_duration
      0,
      0,
      0,
      0,
      // default_sample_size
      0,
      1,
      0,
      1
      // default_sample_flags
    ]));
  }
  static trun(e, t) {
    const s = e.samples || [], r = s.length, n = 12 + 16 * r, a = new Uint8Array(n);
    let o, u, l, h, c, d;
    for (t += 8 + n, a.set([
      e.type === "video" ? 1 : 0,
      // version 1 for video with signed-int sample_composition_time_offset
      0,
      15,
      1,
      // flags
      r >>> 24 & 255,
      r >>> 16 & 255,
      r >>> 8 & 255,
      r & 255,
      // sample_count
      t >>> 24 & 255,
      t >>> 16 & 255,
      t >>> 8 & 255,
      t & 255
      // data_offset
    ], 0), o = 0; o < r; o++)
      u = s[o], l = u.duration, h = u.size, c = u.flags, d = u.cts, a.set([
        l >>> 24 & 255,
        l >>> 16 & 255,
        l >>> 8 & 255,
        l & 255,
        // sample_duration
        h >>> 24 & 255,
        h >>> 16 & 255,
        h >>> 8 & 255,
        h & 255,
        // sample_size
        c.isLeading << 2 | c.dependsOn,
        c.isDependedOn << 6 | c.hasRedundancy << 4 | c.paddingValue << 1 | c.isNonSync,
        c.degradPrio & 61440,
        c.degradPrio & 15,
        // sample_flags
        d >>> 24 & 255,
        d >>> 16 & 255,
        d >>> 8 & 255,
        d & 255
        // sample_composition_time_offset
      ], 12 + 16 * o);
    return R.box(R.types.trun, a);
  }
  static initSegment(e) {
    R.types || R.init();
    const t = R.moov(e);
    return Ne(R.FTYP, t);
  }
  static hvc1(e) {
    const t = e.params, s = [e.vps, e.sps, e.pps], r = 4, n = new Uint8Array([1, t.general_profile_space << 6 | (t.general_tier_flag ? 32 : 0) | t.general_profile_idc, t.general_profile_compatibility_flags[0], t.general_profile_compatibility_flags[1], t.general_profile_compatibility_flags[2], t.general_profile_compatibility_flags[3], t.general_constraint_indicator_flags[0], t.general_constraint_indicator_flags[1], t.general_constraint_indicator_flags[2], t.general_constraint_indicator_flags[3], t.general_constraint_indicator_flags[4], t.general_constraint_indicator_flags[5], t.general_level_idc, 240 | t.min_spatial_segmentation_idc >> 8, 255 & t.min_spatial_segmentation_idc, 252 | t.parallelismType, 252 | t.chroma_format_idc, 248 | t.bit_depth_luma_minus8, 248 | t.bit_depth_chroma_minus8, 0, parseInt(t.frame_rate.fps), r - 1 | t.temporal_id_nested << 2 | t.num_temporal_layers << 3 | (t.frame_rate.fixed ? 64 : 0), s.length]);
    let a = n.length;
    for (let f = 0; f < s.length; f += 1) {
      a += 3;
      for (let m = 0; m < s[f].length; m += 1)
        a += 2 + s[f][m].length;
    }
    const o = new Uint8Array(a);
    o.set(n, 0), a = n.length;
    const u = s.length - 1;
    for (let f = 0; f < s.length; f += 1) {
      o.set(new Uint8Array([32 + f | (f === u ? 128 : 0), 0, s[f].length]), a), a += 3;
      for (let m = 0; m < s[f].length; m += 1)
        o.set(new Uint8Array([s[f][m].length >> 8, s[f][m].length & 255]), a), a += 2, o.set(s[f][m], a), a += s[f][m].length;
    }
    const l = R.box(R.types.hvcC, o), h = e.width, c = e.height, d = e.pixelRatio[0], g = e.pixelRatio[1];
    return R.box(
      R.types.hvc1,
      new Uint8Array([
        0,
        0,
        0,
        // reserved
        0,
        0,
        0,
        // reserved
        0,
        1,
        // data_reference_index
        0,
        0,
        // pre_defined
        0,
        0,
        // reserved
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // pre_defined
        h >> 8 & 255,
        h & 255,
        // width
        c >> 8 & 255,
        c & 255,
        // height
        0,
        72,
        0,
        0,
        // horizresolution
        0,
        72,
        0,
        0,
        // vertresolution
        0,
        0,
        0,
        0,
        // reserved
        0,
        1,
        // frame_count
        18,
        100,
        97,
        105,
        108,
        // dailymotion/hls.js
        121,
        109,
        111,
        116,
        105,
        111,
        110,
        47,
        104,
        108,
        115,
        46,
        106,
        115,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // compressorname
        0,
        24,
        // depth = 24
        17,
        17
      ]),
      // pre_defined = -1
      l,
      R.box(R.types.btrt, new Uint8Array([
        0,
        28,
        156,
        128,
        // bufferSizeDB
        0,
        45,
        198,
        192,
        // maxBitrate
        0,
        45,
        198,
        192
      ])),
      // avgBitrate
      R.box(R.types.pasp, new Uint8Array([
        d >> 24,
        // hSpacing
        d >> 16 & 255,
        d >> 8 & 255,
        d & 255,
        g >> 24,
        // vSpacing
        g >> 16 & 255,
        g >> 8 & 255,
        g & 255
      ]))
    );
  }
}
R.types = void 0;
R.HDLR_TYPES = void 0;
R.STTS = void 0;
R.STSC = void 0;
R.STCO = void 0;
R.STSZ = void 0;
R.VMHD = void 0;
R.SMHD = void 0;
R.STSD = void 0;
R.FTYP = void 0;
R.DINF = void 0;
const nu = 9e4;
function gn(i, e, t = 1, s = !1) {
  const r = i * e * t;
  return s ? Math.round(r) : r;
}
function g0(i, e, t = 1, s = !1) {
  return gn(i, e, 1 / t, s);
}
function es(i, e = !1) {
  return gn(i, 1e3, 1 / nu, e);
}
function m0(i, e = 1) {
  return gn(i, nu, 1 / e);
}
function Va(i) {
  const {
    baseTime: e,
    timescale: t,
    trackId: s
  } = i;
  return `${e / t} (${e}/${t}) trackId: ${s}`;
}
const p0 = 10 * 1e3, E0 = 1024, y0 = 1152, v0 = 1536;
let kt = null, Vi = null;
function Ka(i, e, t, s) {
  return {
    duration: e,
    size: t,
    cts: s,
    flags: {
      isLeading: 0,
      isDependedOn: 0,
      hasRedundancy: 0,
      degradPrio: 0,
      dependsOn: i ? 2 : 1,
      isNonSync: i ? 0 : 1
    }
  };
}
class Hs extends Be {
  constructor(e, t, s, r) {
    if (super("mp4-remuxer", r), this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = null, this._initDTS = null, this.nextVideoTs = null, this.nextAudioTs = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.videoTrackConfig = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.ISGenerated = !1, kt === null) {
      const a = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
      kt = a ? parseInt(a[1]) : 0;
    }
    if (Vi === null) {
      const n = navigator.userAgent.match(/Safari\/(\d+)/i);
      Vi = n ? parseInt(n[1]) : 0;
    }
  }
  destroy() {
    this.config = this.videoTrackConfig = this._initPTS = this._initDTS = null;
  }
  resetTimeStamp(e) {
    const t = this._initPTS;
    (!t || !e || e.trackId !== t.trackId || e.baseTime !== t.baseTime || e.timescale !== t.timescale) && this.log(`Reset initPTS: ${t && Va(t)} > ${e && Va(e)}`), this._initPTS = this._initDTS = e;
  }
  resetNextTimestamp() {
    this.log("reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1;
  }
  resetInitSegment() {
    this.log("ISGenerated flag reset"), this.ISGenerated = !1, this.videoTrackConfig = void 0;
  }
  getVideoStartPts(e) {
    let t = !1;
    const s = e[0].pts, r = e.reduce((n, a) => {
      let o = a.pts, u = o - n;
      return u < -4294967296 && (t = !0, o = Pe(o, s), u = o - n), u > 0 ? n : o;
    }, s);
    return t && this.debug("PTS rollover detected"), r;
  }
  remux(e, t, s, r, n, a, o, u) {
    let l, h, c, d, g, f, m = n, p = n;
    const y = e.pid > -1, v = t.pid > -1, T = t.samples.length, S = e.samples.length > 0, x = o && T > 0 || T > 1;
    if ((!y || S) && (!v || x) || this.ISGenerated || o) {
      if (this.ISGenerated) {
        var A, I, _, b;
        const K = this.videoTrackConfig;
        (K && (t.width !== K.width || t.height !== K.height || ((A = t.pixelRatio) == null ? void 0 : A[0]) !== ((I = K.pixelRatio) == null ? void 0 : I[0]) || ((_ = t.pixelRatio) == null ? void 0 : _[1]) !== ((b = K.pixelRatio) == null ? void 0 : b[1])) || !K && x || this.nextAudioTs === null && S) && this.resetInitSegment();
      }
      this.ISGenerated || (c = this.generateIS(e, t, n, a));
      const P = this.isVideoContiguous;
      let M = -1, U;
      if (x && (M = T0(t.samples), !P && this.config.forceKeyFrameOnDiscontinuity))
        if (f = !0, M > 0) {
          this.warn(`Dropped ${M} out of ${T} video samples due to a missing keyframe`);
          const K = this.getVideoStartPts(t.samples);
          t.samples = t.samples.slice(M), t.dropped += M, p += (t.samples[0].pts - K) / t.inputTimeScale, U = p;
        } else M === -1 && (this.warn(`No keyframe found out of ${T} video samples`), f = !1);
      if (this.ISGenerated) {
        if (S && x) {
          const K = this.getVideoStartPts(t.samples), k = (Pe(e.samples[0].pts, K) - K) / t.inputTimeScale;
          m += Math.max(0, k), p += Math.max(0, -k);
        }
        if (S) {
          if (e.samplerate || (this.warn("regenerate InitSegment as audio detected"), c = this.generateIS(e, t, n, a)), h = this.remuxAudio(e, m, this.isAudioContiguous, a, v || x || u === B.AUDIO ? p : void 0), x) {
            const K = h ? h.endPTS - h.startPTS : 0;
            t.inputTimeScale || (this.warn("regenerate InitSegment as video detected"), c = this.generateIS(e, t, n, a)), l = this.remuxVideo(t, p, P, K);
          }
        } else x && (l = this.remuxVideo(t, p, P, 0));
        l && (l.firstKeyFrame = M, l.independent = M !== -1, l.firstKeyFramePTS = U);
      }
    }
    return this.ISGenerated && this._initPTS && this._initDTS && (s.samples.length && (g = au(s, n, this._initPTS, this._initDTS)), r.samples.length && (d = ou(r, n, this._initPTS))), {
      audio: h,
      video: l,
      initSegment: c,
      independent: f,
      text: d,
      id3: g
    };
  }
  computeInitPts(e, t, s, r) {
    const n = Math.round(s * t);
    let a = Pe(e, n);
    if (a < n + t)
      for (this.log(`Adjusting PTS for rollover in timeline near ${(n - a) / t} ${r}`); a < n + t; )
        a += 8589934592;
    return a - n;
  }
  generateIS(e, t, s, r) {
    const n = e.samples, a = t.samples, o = this.typeSupported, u = {}, l = this._initPTS;
    let h = !l || r, c = "audio/mp4", d, g, f, m = -1;
    if (h && (d = g = 1 / 0), e.config && n.length) {
      switch (e.timescale = e.samplerate, e.segmentCodec) {
        case "mp3":
          o.mpeg ? (c = "audio/mpeg", e.codec = "") : o.mp3 && (e.codec = "mp3");
          break;
        case "ac3":
          e.codec = "ac-3";
          break;
      }
      u.audio = {
        id: "audio",
        container: c,
        codec: e.codec,
        initSegment: e.segmentCodec === "mp3" && o.mpeg ? new Uint8Array(0) : R.initSegment([e]),
        metadata: {
          channelCount: e.channelCount
        }
      }, h && (m = e.id, f = e.inputTimeScale, !l || f !== l.timescale ? d = g = this.computeInitPts(n[0].pts, f, s, "audio") : h = !1);
    }
    if (t.sps && t.pps && a.length) {
      if (t.timescale = t.inputTimeScale, u.video = {
        id: "main",
        container: "video/mp4",
        codec: t.codec,
        initSegment: R.initSegment([t]),
        metadata: {
          width: t.width,
          height: t.height
        }
      }, h)
        if (m = t.id, f = t.inputTimeScale, !l || f !== l.timescale) {
          const p = this.getVideoStartPts(a), y = Pe(a[0].dts, p), v = this.computeInitPts(y, f, s, "video"), T = this.computeInitPts(p, f, s, "video");
          g = Math.min(g, v), d = Math.min(d, T);
        } else
          h = !1;
      this.videoTrackConfig = {
        width: t.width,
        height: t.height,
        pixelRatio: t.pixelRatio
      };
    }
    if (Object.keys(u).length)
      return this.ISGenerated = !0, h ? (l && this.warn(`Timestamps at playlist time: ${r ? "" : "~"}${s} ${d / f} != initPTS: ${l.baseTime / l.timescale} (${l.baseTime}/${l.timescale}) trackId: ${l.trackId}`), this.log(`Found initPTS at playlist time: ${s} offset: ${d / f} (${d}/${f}) trackId: ${m}`), this._initPTS = {
        baseTime: d,
        timescale: f,
        trackId: m
      }, this._initDTS = {
        baseTime: g,
        timescale: f,
        trackId: m
      }) : d = f = void 0, {
        tracks: u,
        initPTS: d,
        timescale: f,
        trackId: m
      };
  }
  remuxVideo(e, t, s, r) {
    const n = e.inputTimeScale, a = e.samples, o = [], u = a.length, l = this._initPTS, h = l.baseTime * n / l.timescale;
    let c = this.nextVideoTs, d = 8, g = this.videoSampleDuration, f, m, p = Number.POSITIVE_INFINITY, y = Number.NEGATIVE_INFINITY, v = !1;
    if (!s || c === null) {
      const w = h + t * n, O = a[0].pts - Pe(a[0].dts, a[0].pts);
      kt && c !== null && Math.abs(w - O - (c + h)) < 15e3 ? s = !0 : c = w - O - h;
    }
    const T = c + h;
    for (let w = 0; w < u; w++) {
      const O = a[w];
      O.pts = Pe(O.pts, T), O.dts = Pe(O.dts, T), O.dts < a[w > 0 ? w - 1 : w].dts && (v = !0);
    }
    v && a.sort(function(w, O) {
      const q = w.dts - O.dts, ie = w.pts - O.pts;
      return q || ie;
    }), f = a[0].dts, m = a[a.length - 1].dts;
    const S = m - f, x = S ? Math.round(S / (u - 1)) : g || e.inputTimeScale / 30;
    if (s) {
      const w = f - T, O = w > x, q = w < -1;
      if ((O || q) && (O ? this.warn(`${(e.segmentCodec || "").toUpperCase()}: ${es(w, !0)} ms (${w}dts) hole between fragments detected at ${t.toFixed(3)}`) : this.warn(`${(e.segmentCodec || "").toUpperCase()}: ${es(-w, !0)} ms (${w}dts) overlapping between fragments detected at ${t.toFixed(3)}`), !q || T >= a[0].pts || kt)) {
        f = T;
        const ie = a[0].pts - w;
        if (O)
          a[0].dts = f, a[0].pts = ie;
        else {
          let X = !0;
          for (let Z = 0; Z < a.length && !(a[Z].dts > ie && X); Z++) {
            const xe = a[Z].pts;
            if (a[Z].dts -= w, a[Z].pts -= w, Z < a.length - 1) {
              const ye = a[Z + 1].pts, Me = a[Z].pts, He = ye <= Me, ft = ye <= xe;
              X = He == ft;
            }
          }
        }
        this.log(`Video: Initial PTS/DTS adjusted: ${es(ie, !0)}/${es(f, !0)}, delta: ${es(w, !0)} ms`);
      }
    }
    f = Math.max(0, f);
    let L = 0, A = 0, I = f;
    for (let w = 0; w < u; w++) {
      const O = a[w], q = O.units, ie = q.length;
      let X = 0;
      for (let Z = 0; Z < ie; Z++)
        X += q[Z].data.length;
      A += X, L += ie, O.length = X, O.dts < I ? (O.dts = I, I += x / 4 | 0 || 1) : I = O.dts, p = Math.min(O.pts, p), y = Math.max(O.pts, y);
    }
    m = a[u - 1].dts;
    const _ = A + 4 * L + 8;
    let b;
    try {
      b = new Uint8Array(_);
    } catch (w) {
      this.observer.emit(E.ERROR, E.ERROR, {
        type: V.MUX_ERROR,
        details: D.REMUX_ALLOC_ERROR,
        fatal: !1,
        error: w,
        bytes: _,
        reason: `fail allocating video mdat ${_}`
      });
      return;
    }
    const P = new DataView(b.buffer);
    P.setUint32(0, _), b.set(R.types.mdat, 4);
    let M = !1, U = Number.POSITIVE_INFINITY, K = Number.POSITIVE_INFINITY, $ = Number.NEGATIVE_INFINITY, k = Number.NEGATIVE_INFINITY;
    for (let w = 0; w < u; w++) {
      const O = a[w], q = O.units;
      let ie = 0;
      for (let xe = 0, ye = q.length; xe < ye; xe++) {
        const Me = q[xe], He = Me.data, ft = Me.data.byteLength;
        P.setUint32(d, ft), d += 4, b.set(He, d), d += ft, ie += 4 + ft;
      }
      let X;
      if (w < u - 1)
        g = a[w + 1].dts - O.dts, X = a[w + 1].pts - O.pts;
      else {
        const xe = this.config, ye = w > 0 ? O.dts - a[w - 1].dts : x;
        if (X = w > 0 ? O.pts - a[w - 1].pts : x, xe.stretchShortVideoTrack && this.nextAudioTs !== null) {
          const Me = Math.floor(xe.maxBufferHole * n), He = (r ? p + r * n : this.nextAudioTs + h) - O.pts;
          He > Me ? (g = He - ye, g < 0 ? g = ye : M = !0, this.log(`It is approximately ${He / 90} ms to the next segment; using duration ${g / 90} ms for the last video frame.`)) : g = ye;
        } else
          g = ye;
      }
      const Z = Math.round(O.pts - O.dts);
      U = Math.min(U, g), $ = Math.max($, g), K = Math.min(K, X), k = Math.max(k, X), o.push(Ka(O.key, g, ie, Z));
    }
    if (o.length) {
      if (kt) {
        if (kt < 70) {
          const w = o[0].flags;
          w.dependsOn = 2, w.isNonSync = 0;
        }
      } else if (Vi && k - K < $ - U && x / $ < 0.025 && o[0].cts === 0) {
        this.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.");
        let w = f;
        for (let O = 0, q = o.length; O < q; O++) {
          const ie = w + o[O].duration, X = w + o[O].cts;
          if (O < q - 1) {
            const Z = ie + o[O + 1].cts;
            o[O].duration = Z - X;
          } else
            o[O].duration = O ? o[O - 1].duration : x;
          o[O].cts = 0, w = ie;
        }
      }
    }
    g = M || !g ? x : g;
    const G = m + g;
    this.nextVideoTs = c = G - h, this.videoSampleDuration = g, this.isVideoContiguous = !0;
    const W = {
      data1: R.moof(e.sequenceNumber++, f, ae(e, {
        samples: o
      })),
      data2: b,
      startPTS: (p - h) / n,
      endPTS: (y + g - h) / n,
      startDTS: (f - h) / n,
      endDTS: c / n,
      type: "video",
      hasAudio: !1,
      hasVideo: !0,
      nb: o.length,
      dropped: e.dropped
    };
    return e.samples = [], e.dropped = 0, W;
  }
  getSamplesPerFrame(e) {
    switch (e.segmentCodec) {
      case "mp3":
        return y0;
      case "ac3":
        return v0;
      default:
        return E0;
    }
  }
  remuxAudio(e, t, s, r, n) {
    const a = e.inputTimeScale, o = e.samplerate ? e.samplerate : a, u = a / o, l = this.getSamplesPerFrame(e), h = l * u, c = this._initPTS, d = e.segmentCodec === "mp3" && this.typeSupported.mpeg, g = [], f = n !== void 0;
    let m = e.samples, p = d ? 0 : 8, y = this.nextAudioTs || -1;
    const v = c.baseTime * a / c.timescale, T = v + t * a;
    if (this.isAudioContiguous = s = s || m.length && y > 0 && (r && Math.abs(T - (y + v)) < 9e3 || Math.abs(Pe(m[0].pts, T) - (y + v)) < 20 * h), m.forEach(function(k) {
      k.pts = Pe(k.pts, T);
    }), !s || y < 0) {
      const k = m.length;
      if (m = m.filter((G) => G.pts >= 0), k !== m.length && this.warn(`Removed ${m.length - k} of ${k} samples (initPTS ${v} / ${a})`), !m.length)
        return;
      n === 0 ? y = 0 : r && !f ? y = Math.max(0, T - v) : y = m[0].pts - v;
    }
    if (e.segmentCodec === "aac") {
      const k = this.config.maxAudioFramesDrift;
      for (let G = 0, N = y + v; G < m.length; G++) {
        const H = m[G], W = H.pts, w = W - N, O = Math.abs(1e3 * w / a);
        if (w <= -k * h && f)
          G === 0 && (this.warn(`Audio frame @ ${(W / a).toFixed(3)}s overlaps marker by ${Math.round(1e3 * w / a)} ms.`), this.nextAudioTs = y = W - v, N = W);
        else if (w >= k * h && O < p0 && f) {
          let q = Math.round(w / h);
          for (N = W - q * h; N < 0 && q && h; )
            q--, N += h;
          G === 0 && (this.nextAudioTs = y = N - v), this.warn(`Injecting ${q} audio frames @ ${((N - v) / a).toFixed(3)}s due to ${Math.round(1e3 * w / a)} ms gap.`);
          for (let ie = 0; ie < q; ie++) {
            let X = f0.getSilentFrame(e.parsedCodec || e.manifestCodec || e.codec, e.channelCount);
            X || (this.log("Unable to get silent frame for given audio codec; duplicating last frame instead."), X = H.unit.subarray()), m.splice(G, 0, {
              unit: X,
              pts: N
            }), N += h, G++;
          }
        }
        H.pts = N, N += h;
      }
    }
    let S = null, x = null, L, A = 0, I = m.length;
    for (; I--; )
      A += m[I].unit.byteLength;
    for (let k = 0, G = m.length; k < G; k++) {
      const N = m[k], H = N.unit;
      let W = N.pts;
      if (x !== null) {
        const O = g[k - 1];
        O.duration = Math.round((W - x) / u);
      } else if (s && e.segmentCodec === "aac" && (W = y + v), S = W, A > 0) {
        A += p;
        try {
          L = new Uint8Array(A);
        } catch (O) {
          this.observer.emit(E.ERROR, E.ERROR, {
            type: V.MUX_ERROR,
            details: D.REMUX_ALLOC_ERROR,
            fatal: !1,
            error: O,
            bytes: A,
            reason: `fail allocating audio mdat ${A}`
          });
          return;
        }
        d || (new DataView(L.buffer).setUint32(0, A), L.set(R.types.mdat, 4));
      } else
        return;
      L.set(H, p);
      const w = H.byteLength;
      p += w, g.push(Ka(!0, l, w, 0)), x = W;
    }
    const _ = g.length;
    if (!_)
      return;
    const b = g[g.length - 1];
    y = x - v, this.nextAudioTs = y + u * b.duration;
    const P = d ? new Uint8Array(0) : R.moof(e.sequenceNumber++, S / u, ae({}, e, {
      samples: g
    }));
    e.samples = [];
    const M = (S - v) / a, U = this.nextAudioTs / a, $ = {
      data1: P,
      data2: L,
      startPTS: M,
      endPTS: U,
      startDTS: M,
      endDTS: U,
      type: "audio",
      hasAudio: !0,
      hasVideo: !1,
      nb: _
    };
    return this.isAudioContiguous = !0, $;
  }
}
function Pe(i, e) {
  let t;
  if (e === null)
    return i;
  for (e < i ? t = -8589934592 : t = 8589934592; Math.abs(i - e) > 4294967296; )
    i += t;
  return i;
}
function T0(i) {
  for (let e = 0; e < i.length; e++)
    if (i[e].key)
      return e;
  return -1;
}
function au(i, e, t, s) {
  const r = i.samples.length;
  if (!r)
    return;
  const n = i.inputTimeScale;
  for (let o = 0; o < r; o++) {
    const u = i.samples[o];
    u.pts = Pe(u.pts - t.baseTime * n / t.timescale, e * n) / n, u.dts = Pe(u.dts - s.baseTime * n / s.timescale, e * n) / n;
  }
  const a = i.samples;
  return i.samples = [], {
    samples: a
  };
}
function ou(i, e, t) {
  const s = i.samples.length;
  if (!s)
    return;
  const r = i.inputTimeScale;
  for (let a = 0; a < s; a++) {
    const o = i.samples[a];
    o.pts = Pe(o.pts - t.baseTime * r / t.timescale, e * r) / r;
  }
  i.samples.sort((a, o) => a.pts - o.pts);
  const n = i.samples;
  return i.samples = [], {
    samples: n
  };
}
class S0 extends Be {
  constructor(e, t, s, r) {
    super("passthrough-remuxer", r), this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = null, this.initTracks = void 0, this.lastEndTime = null, this.isVideoContiguous = !1;
  }
  destroy() {
  }
  resetTimeStamp(e) {
    this.lastEndTime = null;
    const t = this.initPTS;
    t && e && t.baseTime === e.baseTime && t.timescale === e.timescale || (this.initPTS = e);
  }
  resetNextTimestamp() {
    this.isVideoContiguous = !1, this.lastEndTime = null;
  }
  resetInitSegment(e, t, s, r) {
    this.audioCodec = t, this.videoCodec = s, this.generateInitSegment(e, r), this.emitInitSegment = !0;
  }
  generateInitSegment(e, t) {
    let {
      audioCodec: s,
      videoCodec: r
    } = this;
    if (!(e != null && e.byteLength)) {
      this.initTracks = void 0, this.initData = void 0;
      return;
    }
    const {
      audio: n,
      video: a
    } = this.initData = fl(e);
    if (t)
      lf(e, t);
    else {
      const u = n || a;
      u != null && u.encrypted && this.warn(`Init segment with encrypted track with has no key ("${u.codec}")!`);
    }
    n && (s = Wa(n, oe.AUDIO, this)), a && (r = Wa(a, oe.VIDEO, this));
    const o = {};
    n && a ? o.audiovideo = {
      container: "video/mp4",
      codec: s + "," + r,
      supplemental: a.supplemental,
      encrypted: a.encrypted,
      initSegment: e,
      id: "main"
    } : n ? o.audio = {
      container: "audio/mp4",
      codec: s,
      encrypted: n.encrypted,
      initSegment: e,
      id: "audio"
    } : a ? o.video = {
      container: "video/mp4",
      codec: r,
      supplemental: a.supplemental,
      encrypted: a.encrypted,
      initSegment: e,
      id: "main"
    } : this.warn("initSegment does not contain moov or trak boxes."), this.initTracks = o;
  }
  remux(e, t, s, r, n, a) {
    var o, u;
    let {
      initPTS: l,
      lastEndTime: h
    } = this;
    const c = {
      audio: void 0,
      video: void 0,
      text: r,
      id3: s,
      initSegment: void 0
    };
    F(h) || (h = this.lastEndTime = n || 0);
    const d = t.samples;
    if (!d.length)
      return c;
    const g = {
      initPTS: void 0,
      timescale: void 0,
      trackId: void 0
    };
    let f = this.initData;
    if ((o = f) != null && o.length || (this.generateInitSegment(d), f = this.initData), !((u = f) != null && u.length))
      return this.warn("Failed to generate initSegment."), c;
    this.emitInitSegment && (g.tracks = this.initTracks, this.emitInitSegment = !1);
    const m = hf(d, f, this), p = f.audio ? m[f.audio.id] : null, y = f.video ? m[f.video.id] : null, v = Rs(y, 1 / 0), T = Rs(p, 1 / 0), S = Rs(y, 0, !0), x = Rs(p, 0, !0);
    let L = n, A = 0;
    const I = p && (!y || !l && T < v || l && l.trackId === f.audio.id), _ = I ? p : y;
    if (_) {
      const N = _.timescale, H = _.start - n * N, W = I ? f.audio.id : f.video.id;
      L = _.start / N, A = I ? x - T : S - v, (a || !l) && (x0(l, L, n, A) || N !== l.timescale) && (l && this.warn(`Timestamps at playlist time: ${a ? "" : "~"}${n} ${H / N} != initPTS: ${l.baseTime / l.timescale} (${l.baseTime}/${l.timescale}) trackId: ${l.trackId}`), this.log(`Found initPTS at playlist time: ${n} offset: ${L - n} (${H}/${N}) trackId: ${W}`), l = null, g.initPTS = H, g.timescale = N, g.trackId = W);
    } else
      this.warn(`No audio or video samples found for initPTS at playlist time: ${n}`);
    l ? (g.initPTS = l.baseTime, g.timescale = l.timescale, g.trackId = l.trackId) : ((!g.timescale || g.trackId === void 0 || g.initPTS === void 0) && (this.warn("Could not set initPTS"), g.initPTS = L, g.timescale = 1, g.trackId = -1), this.initPTS = l = {
      baseTime: g.initPTS,
      timescale: g.timescale,
      trackId: g.trackId
    });
    const b = L - l.baseTime / l.timescale, P = b + A;
    A > 0 ? this.lastEndTime = P : (this.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
    const M = !!f.audio, U = !!f.video;
    let K = "";
    M && (K += "audio"), U && (K += "video");
    const $ = (f.audio ? f.audio.encrypted : !1) || (f.video ? f.video.encrypted : !1), k = {
      data1: d,
      startPTS: b,
      startDTS: b,
      endPTS: P,
      endDTS: P,
      type: K,
      hasAudio: M,
      hasVideo: U,
      nb: 1,
      dropped: 0,
      encrypted: $
    };
    c.audio = M && !U ? k : void 0, c.video = U ? k : void 0;
    const G = y?.sampleCount;
    if (G) {
      const N = y.keyFrameIndex, H = N !== -1;
      k.nb = G, k.dropped = N === 0 || this.isVideoContiguous ? 0 : H ? N : G, k.independent = H, k.firstKeyFrame = N, H && y.keyFrameStart && (k.firstKeyFramePTS = (y.keyFrameStart - l.baseTime) / l.timescale), this.isVideoContiguous || (c.independent = H), this.isVideoContiguous || (this.isVideoContiguous = H), k.dropped && this.warn(`fmp4 does not start with IDR: firstIDR ${N}/${G} dropped: ${k.dropped} start: ${k.firstKeyFramePTS || "NA"}`);
    }
    return c.initSegment = g, c.id3 = au(s, n, l, l), r.samples.length && (c.text = ou(r, n, l)), c;
  }
}
function Rs(i, e, t = !1) {
  return i?.start !== void 0 ? (i.start + (t ? i.duration : 0)) / i.timescale : e;
}
function x0(i, e, t, s) {
  if (i === null)
    return !0;
  const r = Math.max(s, 1), n = e - i.baseTime / i.timescale;
  return Math.abs(n - t) > r;
}
function Wa(i, e, t) {
  const s = i.codec;
  return s && s.length > 4 ? s : e === oe.AUDIO ? s === "ec-3" || s === "ac-3" || s === "alac" ? s : s === "fLaC" || s === "Opus" ? Js(s, !1) : (t.warn(`Unhandled audio codec "${s}" in mp4 MAP`), s || "mp4a") : (t.warn(`Unhandled video codec "${s}" in mp4 MAP`), s || "avc1");
}
let tt;
try {
  tt = self.performance.now.bind(self.performance);
} catch {
  tt = Date.now;
}
const Vs = [{
  demux: o0,
  remux: S0
}, {
  demux: lt,
  remux: Hs
}, {
  demux: i0,
  remux: Hs
}, {
  demux: n0,
  remux: Hs
}];
Vs.splice(2, 0, {
  demux: r0,
  remux: Hs
});
class Ya {
  constructor(e, t, s, r, n, a) {
    this.asyncResult = !1, this.logger = void 0, this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = e, this.typeSupported = t, this.config = s, this.id = n, this.logger = a;
  }
  configure(e) {
    this.transmuxConfig = e, this.decrypter && this.decrypter.reset();
  }
  push(e, t, s, r) {
    const n = s.transmuxing;
    n.executeStart = tt();
    let a = new Uint8Array(e);
    const {
      currentTransmuxState: o,
      transmuxConfig: u
    } = this;
    r && (this.currentTransmuxState = r);
    const {
      contiguous: l,
      discontinuity: h,
      trackSwitch: c,
      accurateTimeOffset: d,
      timeOffset: g,
      initSegmentChange: f
    } = r || o, {
      audioCodec: m,
      videoCodec: p,
      defaultInitPts: y,
      duration: v,
      initSegmentData: T
    } = u, S = A0(a, t);
    if (S && Bt(S.method)) {
      const I = this.getDecrypter(), _ = nn(S.method);
      if (I.isSync()) {
        let b = I.softwareDecrypt(a, S.key.buffer, S.iv.buffer, _);
        if (s.part > -1) {
          const M = I.flush();
          b = M && M.buffer;
        }
        if (!b)
          return n.executeEnd = tt(), Ki(s);
        a = new Uint8Array(b);
      } else
        return this.asyncResult = !0, this.decryptionPromise = I.webCryptoDecrypt(a, S.key.buffer, S.iv.buffer, _).then((b) => {
          const P = this.push(b, null, s);
          return this.decryptionPromise = null, P;
        }), this.decryptionPromise;
    }
    const x = this.needsProbing(h, c);
    if (x) {
      const I = this.configureTransmuxer(a);
      if (I)
        return this.logger.warn(`[transmuxer] ${I.message}`), this.observer.emit(E.ERROR, E.ERROR, {
          type: V.MEDIA_ERROR,
          details: D.FRAG_PARSING_ERROR,
          fatal: !1,
          error: I,
          reason: I.message
        }), n.executeEnd = tt(), Ki(s);
    }
    (h || c || f || x) && this.resetInitSegment(T, m, p, v, t), (h || f || x) && this.resetInitialTimestamp(y), l || this.resetContiguity();
    const L = this.transmux(a, S, g, d, s);
    this.asyncResult = ds(L);
    const A = this.currentTransmuxState;
    return A.contiguous = !0, A.discontinuity = !1, A.trackSwitch = !1, n.executeEnd = tt(), L;
  }
  // Due to data caching, flush calls can produce more than one TransmuxerResult (hence the Array type)
  flush(e) {
    const t = e.transmuxing;
    t.executeStart = tt();
    const {
      decrypter: s,
      currentTransmuxState: r,
      decryptionPromise: n
    } = this;
    if (n)
      return this.asyncResult = !0, n.then(() => this.flush(e));
    const a = [], {
      timeOffset: o
    } = r;
    if (s) {
      const c = s.flush();
      c && a.push(this.push(c.buffer, null, e));
    }
    const {
      demuxer: u,
      remuxer: l
    } = this;
    if (!u || !l) {
      t.executeEnd = tt();
      const c = [Ki(e)];
      return this.asyncResult ? Promise.resolve(c) : c;
    }
    const h = u.flush(o);
    return ds(h) ? (this.asyncResult = !0, h.then((c) => (this.flushRemux(a, c, e), a))) : (this.flushRemux(a, h, e), this.asyncResult ? Promise.resolve(a) : a);
  }
  flushRemux(e, t, s) {
    const {
      audioTrack: r,
      videoTrack: n,
      id3Track: a,
      textTrack: o
    } = t, {
      accurateTimeOffset: u,
      timeOffset: l
    } = this.currentTransmuxState;
    this.logger.log(`[transmuxer.ts]: Flushed ${this.id} sn: ${s.sn}${s.part > -1 ? " part: " + s.part : ""} of ${this.id === B.MAIN ? "level" : "track"} ${s.level}`);
    const h = this.remuxer.remux(r, n, a, o, l, u, !0, this.id);
    e.push({
      remuxResult: h,
      chunkMeta: s
    }), s.transmuxing.executeEnd = tt();
  }
  resetInitialTimestamp(e) {
    const {
      demuxer: t,
      remuxer: s
    } = this;
    !t || !s || (t.resetTimeStamp(e), s.resetTimeStamp(e));
  }
  resetContiguity() {
    const {
      demuxer: e,
      remuxer: t
    } = this;
    !e || !t || (e.resetContiguity(), t.resetNextTimestamp());
  }
  resetInitSegment(e, t, s, r, n) {
    const {
      demuxer: a,
      remuxer: o
    } = this;
    !a || !o || (a.resetInitSegment(e, t, s, r), o.resetInitSegment(e, t, s, n));
  }
  destroy() {
    this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0);
  }
  transmux(e, t, s, r, n) {
    let a;
    return t && t.method === "SAMPLE-AES" ? a = this.transmuxSampleAes(e, t, s, r, n) : a = this.transmuxUnencrypted(e, s, r, n), a;
  }
  transmuxUnencrypted(e, t, s, r) {
    const {
      audioTrack: n,
      videoTrack: a,
      id3Track: o,
      textTrack: u
    } = this.demuxer.demux(e, t, !1, !this.config.progressive);
    return {
      remuxResult: this.remuxer.remux(n, a, o, u, t, s, !1, this.id),
      chunkMeta: r
    };
  }
  transmuxSampleAes(e, t, s, r, n) {
    return this.demuxer.demuxSampleAes(e, t, s).then((a) => ({
      remuxResult: this.remuxer.remux(a.audioTrack, a.videoTrack, a.id3Track, a.textTrack, s, r, !1, this.id),
      chunkMeta: n
    }));
  }
  configureTransmuxer(e) {
    const {
      config: t,
      observer: s,
      typeSupported: r
    } = this;
    let n;
    for (let c = 0, d = Vs.length; c < d; c++) {
      var a;
      if ((a = Vs[c].demux) != null && a.probe(e, this.logger)) {
        n = Vs[c];
        break;
      }
    }
    if (!n)
      return new Error("Failed to find demuxer by probing fragment data");
    const o = this.demuxer, u = this.remuxer, l = n.remux, h = n.demux;
    (!u || !(u instanceof l)) && (this.remuxer = new l(s, t, r, this.logger)), (!o || !(o instanceof h)) && (this.demuxer = new h(s, t, r, this.logger), this.probe = h.probe);
  }
  needsProbing(e, t) {
    return !this.demuxer || !this.remuxer || e || t;
  }
  getDecrypter() {
    let e = this.decrypter;
    return e || (e = this.decrypter = new sn(this.config)), e;
  }
}
function A0(i, e) {
  let t = null;
  return i.byteLength > 0 && e?.key != null && e.iv !== null && e.method != null && (t = e), t;
}
const Ki = (i) => ({
  remuxResult: {},
  chunkMeta: i
});
function ds(i) {
  return "then" in i && i.then instanceof Function;
}
class I0 {
  constructor(e, t, s, r, n) {
    this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = e, this.videoCodec = t, this.initSegmentData = s, this.duration = r, this.defaultInitPts = n || null;
  }
}
class b0 {
  constructor(e, t, s, r, n, a) {
    this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = e, this.contiguous = t, this.accurateTimeOffset = s, this.trackSwitch = r, this.timeOffset = n, this.initSegmentChange = a;
  }
}
let ja = 0;
class lu {
  constructor(e, t, s, r) {
    this.error = null, this.hls = void 0, this.id = void 0, this.instanceNo = ja++, this.observer = void 0, this.frag = null, this.part = null, this.useWorker = void 0, this.workerContext = null, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0, this.onWorkerMessage = (u) => {
      const l = u.data, h = this.hls;
      if (!(!h || !(l != null && l.event) || l.instanceNo !== this.instanceNo))
        switch (l.event) {
          case "init": {
            var c;
            const d = (c = this.workerContext) == null ? void 0 : c.objectURL;
            d && self.URL.revokeObjectURL(d);
            break;
          }
          case "transmuxComplete": {
            this.handleTransmuxComplete(l.data);
            break;
          }
          case "flush": {
            this.onFlush(l.data);
            break;
          }
          // pass logs from the worker thread to the main logger
          case "workerLog": {
            h.logger[l.data.logType] && h.logger[l.data.logType](l.data.message);
            break;
          }
          default: {
            l.data = l.data || {}, l.data.frag = this.frag, l.data.part = this.part, l.data.id = this.id, h.trigger(l.event, l.data);
            break;
          }
        }
    }, this.onWorkerError = (u) => {
      if (!this.hls)
        return;
      const l = new Error(`${u.message}  (${u.filename}:${u.lineno})`);
      this.hls.config.enableWorker = !1, this.hls.logger.warn(`Error in "${this.id}" Web Worker, fallback to inline`), this.hls.trigger(E.ERROR, {
        type: V.OTHER_ERROR,
        details: D.INTERNAL_EXCEPTION,
        fatal: !1,
        event: "demuxerWorker",
        error: l
      });
    };
    const n = e.config;
    this.hls = e, this.id = t, this.useWorker = !!n.enableWorker, this.onTransmuxComplete = s, this.onFlush = r;
    const a = (u, l) => {
      l = l || {}, l.frag = this.frag || void 0, u === E.ERROR && (l = l, l.parent = this.id, l.part = this.part, this.error = l.error), this.hls.trigger(u, l);
    };
    this.observer = new ln(), this.observer.on(E.FRAG_DECRYPTED, a), this.observer.on(E.ERROR, a);
    const o = la(n.preferManagedMediaSource);
    if (this.useWorker && typeof Worker < "u") {
      const u = this.hls.logger;
      if (n.workerPath || Dg()) {
        try {
          n.workerPath ? (u.log(`loading Web Worker ${n.workerPath} for "${t}"`), this.workerContext = Pg(n.workerPath)) : (u.log(`injecting Web Worker for "${t}"`), this.workerContext = Cg());
          const {
            worker: h
          } = this.workerContext;
          h.addEventListener("message", this.onWorkerMessage), h.addEventListener("error", this.onWorkerError), h.postMessage({
            instanceNo: this.instanceNo,
            cmd: "init",
            typeSupported: o,
            id: t,
            config: le(n)
          });
        } catch (h) {
          u.warn(`Error setting up "${t}" Web Worker, fallback to inline`, h), this.terminateWorker(), this.error = null, this.transmuxer = new Ya(this.observer, o, n, "", t, e.logger);
        }
        return;
      }
    }
    this.transmuxer = new Ya(this.observer, o, n, "", t, e.logger);
  }
  reset() {
    if (this.frag = null, this.part = null, this.workerContext) {
      const e = this.instanceNo;
      this.instanceNo = ja++;
      const t = this.hls.config, s = la(t.preferManagedMediaSource);
      this.workerContext.worker.postMessage({
        instanceNo: this.instanceNo,
        cmd: "reset",
        resetNo: e,
        typeSupported: s,
        id: this.id,
        config: le(t)
      });
    }
  }
  terminateWorker() {
    if (this.workerContext) {
      const {
        worker: e
      } = this.workerContext;
      this.workerContext = null, e.removeEventListener("message", this.onWorkerMessage), e.removeEventListener("error", this.onWorkerError), kg(this.hls.config.workerPath);
    }
  }
  destroy() {
    if (this.workerContext)
      this.terminateWorker(), this.onWorkerMessage = this.onWorkerError = null;
    else {
      const t = this.transmuxer;
      t && (t.destroy(), this.transmuxer = null);
    }
    const e = this.observer;
    e && e.removeAllListeners(), this.frag = null, this.part = null, this.observer = null, this.hls = null;
  }
  push(e, t, s, r, n, a, o, u, l, h) {
    var c, d;
    l.transmuxing.start = self.performance.now();
    const {
      instanceNo: g,
      transmuxer: f
    } = this, m = a ? a.start : n.start, p = n.decryptdata, y = this.frag, v = !(y && n.cc === y.cc), T = !(y && l.level === y.level), S = y ? l.sn - y.sn : -1, x = this.part ? l.part - this.part.index : -1, L = S === 0 && l.id > 1 && l.id === y?.stats.chunkCount, A = !T && (S === 1 || S === 0 && (x === 1 || L && x <= 0)), I = self.performance.now();
    (T || S || n.stats.parsing.start === 0) && (n.stats.parsing.start = I), a && (x || !A) && (a.stats.parsing.start = I);
    const _ = !(y && ((c = n.initSegment) == null ? void 0 : c.url) === ((d = y.initSegment) == null ? void 0 : d.url)), b = new b0(v, A, u, T, m, _);
    if (!A || v || _) {
      this.hls.logger.log(`[transmuxer-interface]: Starting new transmux session for ${n.type} sn: ${l.sn}${l.part > -1 ? " part: " + l.part : ""} ${this.id === B.MAIN ? "level" : "track"}: ${l.level} id: ${l.id}
        discontinuity: ${v}
        trackSwitch: ${T}
        contiguous: ${A}
        accurateTimeOffset: ${u}
        timeOffset: ${m}
        initSegmentChange: ${_}`);
      const P = new I0(s, r, t, o, h);
      this.configureTransmuxer(P);
    }
    if (this.frag = n, this.part = a, this.workerContext)
      this.workerContext.worker.postMessage({
        instanceNo: g,
        cmd: "demux",
        data: e,
        decryptdata: p,
        chunkMeta: l,
        state: b
      }, e instanceof ArrayBuffer ? [e] : []);
    else if (f) {
      const P = f.push(e, p, l, b);
      ds(P) ? P.then((M) => {
        this.handleTransmuxComplete(M);
      }).catch((M) => {
        this.transmuxerError(M, l, "transmuxer-interface push error");
      }) : this.handleTransmuxComplete(P);
    }
  }
  flush(e) {
    e.transmuxing.start = self.performance.now();
    const {
      instanceNo: t,
      transmuxer: s
    } = this;
    if (this.workerContext)
      this.workerContext.worker.postMessage({
        instanceNo: t,
        cmd: "flush",
        chunkMeta: e
      });
    else if (s) {
      const r = s.flush(e);
      ds(r) ? r.then((n) => {
        this.handleFlushResult(n, e);
      }).catch((n) => {
        this.transmuxerError(n, e, "transmuxer-interface flush error");
      }) : this.handleFlushResult(r, e);
    }
  }
  transmuxerError(e, t, s) {
    this.hls && (this.error = e, this.hls.trigger(E.ERROR, {
      type: V.MEDIA_ERROR,
      details: D.FRAG_PARSING_ERROR,
      chunkMeta: t,
      frag: this.frag || void 0,
      part: this.part || void 0,
      fatal: !1,
      error: e,
      err: e,
      reason: s
    }));
  }
  handleFlushResult(e, t) {
    e.forEach((s) => {
      this.handleTransmuxComplete(s);
    }), this.onFlush(t);
  }
  configureTransmuxer(e) {
    const {
      instanceNo: t,
      transmuxer: s
    } = this;
    this.workerContext ? this.workerContext.worker.postMessage({
      instanceNo: t,
      cmd: "configure",
      config: e
    }) : s && s.configure(e);
  }
  handleTransmuxComplete(e) {
    e.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(e);
  }
}
const qa = 100;
class L0 extends on {
  constructor(e, t, s) {
    super(e, t, s, "audio-stream-controller", B.AUDIO), this.mainAnchor = null, this.mainFragLoading = null, this.audioOnly = !1, this.bufferedTrack = null, this.switchingTrack = null, this.trackId = -1, this.waitingData = null, this.mainDetails = null, this.flushing = !1, this.bufferFlushed = !1, this.cachedTrackLoadedData = null, this.registerListeners();
  }
  onHandlerDestroying() {
    this.unregisterListeners(), super.onHandlerDestroying(), this.resetItem();
  }
  resetItem() {
    this.mainDetails = this.mainAnchor = this.mainFragLoading = this.bufferedTrack = this.switchingTrack = this.waitingData = this.cachedTrackLoadedData = null;
  }
  registerListeners() {
    super.registerListeners();
    const {
      hls: e
    } = this;
    e.on(E.LEVEL_LOADED, this.onLevelLoaded, this), e.on(E.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), e.on(E.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.on(E.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.on(E.BUFFER_RESET, this.onBufferReset, this), e.on(E.BUFFER_CREATED, this.onBufferCreated, this), e.on(E.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(E.BUFFER_FLUSHED, this.onBufferFlushed, this), e.on(E.INIT_PTS_FOUND, this.onInitPtsFound, this), e.on(E.FRAG_LOADING, this.onFragLoading, this), e.on(E.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e && (super.unregisterListeners(), e.off(E.LEVEL_LOADED, this.onLevelLoaded, this), e.off(E.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), e.off(E.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.off(E.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.off(E.BUFFER_RESET, this.onBufferReset, this), e.off(E.BUFFER_CREATED, this.onBufferCreated, this), e.off(E.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(E.BUFFER_FLUSHED, this.onBufferFlushed, this), e.off(E.INIT_PTS_FOUND, this.onInitPtsFound, this), e.off(E.FRAG_LOADING, this.onFragLoading, this), e.off(E.FRAG_BUFFERED, this.onFragBuffered, this));
  }
  // INIT_PTS_FOUND is triggered when the video track parsed in the stream-controller has a new PTS value
  onInitPtsFound(e, {
    frag: t,
    id: s,
    initPTS: r,
    timescale: n,
    trackId: a
  }) {
    if (s === B.MAIN) {
      const o = t.cc, u = this.fragCurrent;
      if (this.initPTS[o] = {
        baseTime: r,
        timescale: n,
        trackId: a
      }, this.log(`InitPTS for cc: ${o} found from main: ${r / n} (${r}/${n}) trackId: ${a}`), this.mainAnchor = t, this.state === C.WAITING_INIT_PTS) {
        const l = this.waitingData;
        (!l && !this.loadingParts || l && l.frag.cc !== o) && this.syncWithAnchor(t, l?.frag);
      } else !this.hls.hasEnoughToStart && u && u.cc !== o ? (u.abortRequests(), this.syncWithAnchor(t, u)) : this.state === C.IDLE && this.tick();
    }
  }
  getLoadPosition() {
    return !this.startFragRequested && this.nextLoadPosition >= 0 ? this.nextLoadPosition : super.getLoadPosition();
  }
  syncWithAnchor(e, t) {
    var s;
    const r = ((s = this.mainFragLoading) == null ? void 0 : s.frag) || null;
    if (t && r?.cc === t.cc)
      return;
    const n = (r || e).cc, a = this.getLevelDetails(), o = this.getLoadPosition(), u = Il(a, n, o);
    u && (this.log(`Syncing with main frag at ${u.start} cc ${u.cc}`), this.startFragRequested = !1, this.nextLoadPosition = u.start, this.resetLoadingState(), this.state === C.IDLE && this.doTickIdle());
  }
  startLoad(e, t) {
    if (!this.levels) {
      this.startPosition = e, this.state = C.STOPPED;
      return;
    }
    const s = this.lastCurrentTime;
    this.stopLoad(), this.setInterval(qa), s > 0 && e === -1 ? (this.log(`Override startPosition with lastCurrentTime @${s.toFixed(3)}`), e = s, this.state = C.IDLE) : this.state = C.WAITING_TRACK, this.nextLoadPosition = this.lastCurrentTime = e + this.timelineOffset, this.startPosition = t ? -1 : e, this.tick();
  }
  doTick() {
    switch (this.state) {
      case C.IDLE:
        this.doTickIdle();
        break;
      case C.WAITING_TRACK: {
        const {
          levels: e,
          trackId: t
        } = this, s = e?.[t], r = s?.details;
        if (r && !this.waitForLive(s)) {
          if (this.waitForCdnTuneIn(r))
            break;
          this.state = C.WAITING_INIT_PTS;
        }
        break;
      }
      case C.FRAG_LOADING_WAITING_RETRY: {
        this.checkRetryDate();
        break;
      }
      case C.WAITING_INIT_PTS: {
        const e = this.waitingData;
        if (e) {
          const {
            frag: t,
            part: s,
            cache: r,
            complete: n
          } = e, a = this.mainAnchor;
          if (this.initPTS[t.cc] !== void 0) {
            this.waitingData = null, this.state = C.FRAG_LOADING;
            const o = r.flush().buffer, u = {
              frag: t,
              part: s,
              payload: o,
              networkDetails: null
            };
            this._handleFragmentLoadProgress(u), n && super._handleFragmentLoadComplete(u);
          } else a && a.cc !== e.frag.cc && this.syncWithAnchor(a, e.frag);
        } else
          this.state = C.IDLE;
      }
    }
    this.onTickEnd();
  }
  resetLoadingState() {
    const e = this.waitingData;
    e && (this.fragmentTracker.removeFragment(e.frag), this.waitingData = null), super.resetLoadingState();
  }
  onTickEnd() {
    const {
      media: e
    } = this;
    e != null && e.readyState && (this.lastCurrentTime = e.currentTime);
  }
  doTickIdle() {
    var e;
    const {
      hls: t,
      levels: s,
      media: r,
      trackId: n
    } = this, a = t.config;
    if (!this.buffering || !r && !this.primaryPrefetch && (this.startFragRequested || !a.startFragPrefetch) || !(s != null && s[n]))
      return;
    const o = s[n], u = o.details;
    if (!u || this.waitForLive(o) || this.waitForCdnTuneIn(u)) {
      this.state = C.WAITING_TRACK, this.startFragRequested = !1;
      return;
    }
    const l = this.mediaBuffer ? this.mediaBuffer : this.media;
    this.bufferFlushed && l && (this.bufferFlushed = !1, this.afterBufferFlushed(l, oe.AUDIO, B.AUDIO));
    const h = this.getFwdBufferInfo(l, B.AUDIO);
    if (h === null)
      return;
    if (!this.switchingTrack && this._streamEnded(h, u)) {
      t.trigger(E.BUFFER_EOS, {
        type: "audio"
      }), this.state = C.ENDED;
      return;
    }
    const c = h.len, d = t.maxBufferLength, g = u.fragments, f = g[0].start, m = this.getLoadPosition(), p = this.flushing ? m : h.end;
    if (this.switchingTrack && r) {
      const T = m;
      u.PTSKnown && T < f && (h.end > f || h.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), r.currentTime = f + 0.05);
    }
    if (c >= d && !this.switchingTrack && p < g[g.length - 1].start)
      return;
    let y = this.getNextFragment(p, u);
    if (y && this.isLoopLoading(y, p) && (y = this.getNextFragmentLoopLoading(y, u, h, B.MAIN, d)), !y) {
      this.bufferFlushed = !0;
      return;
    }
    if (this.exceedsMaxBuffer(h, d, y))
      return;
    let v = ((e = this.mainFragLoading) == null ? void 0 : e.frag) || null;
    if (!this.audioOnly && this.startFragRequested && v && ge(y) && !y.endList && (!u.live || !this.loadingParts && p < this.hls.liveSyncPosition) && (this.fragmentTracker.getState(v) === pe.OK && (this.mainFragLoading = v = null), v && ge(v))) {
      if (y.start > v.end) {
        const S = this.fragmentTracker.getFragAtPos(p, B.MAIN);
        S && S.end > v.end && (v = S, this.mainFragLoading = {
          frag: S,
          targetBufferTime: null
        });
      }
      if (y.start > v.end)
        return;
    }
    this.loadFragment(y, o, p);
  }
  onMediaDetaching(e, t) {
    this.bufferFlushed = this.flushing = !1, super.onMediaDetaching(e, t);
  }
  onAudioTracksUpdated(e, {
    audioTracks: t
  }) {
    this.resetTransmuxer(), this.levels = t.map((s) => new us(s));
  }
  onAudioTrackSwitching(e, t) {
    const s = !!t.url;
    this.trackId = t.id;
    const {
      fragCurrent: r
    } = this;
    r && (r.abortRequests(), this.removeUnbufferedFrags(r.start)), this.resetLoadingState(), s ? (this.switchingTrack = t, this.flushAudioIfNeeded(t), this.state !== C.STOPPED && (this.setInterval(qa), this.state = C.IDLE, this.tick())) : (this.resetTransmuxer(), this.switchingTrack = null, this.bufferedTrack = t, this.clearInterval());
  }
  onManifestLoading() {
    super.onManifestLoading(), this.bufferFlushed = this.flushing = this.audioOnly = !1, this.resetItem(), this.trackId = -1;
  }
  onLevelLoaded(e, t) {
    this.mainDetails = t.details;
    const s = this.cachedTrackLoadedData;
    s && (this.cachedTrackLoadedData = null, this.onAudioTrackLoaded(E.AUDIO_TRACK_LOADED, s));
  }
  onAudioTrackLoaded(e, t) {
    var s;
    const {
      levels: r
    } = this, {
      details: n,
      id: a,
      groupId: o,
      track: u
    } = t;
    if (!r) {
      this.warn(`Audio tracks reset while loading track ${a} "${u.name}" of "${o}"`);
      return;
    }
    const l = this.mainDetails;
    if (!l || n.endCC > l.endCC || l.expired) {
      this.cachedTrackLoadedData = t, this.state !== C.STOPPED && (this.state = C.WAITING_TRACK);
      return;
    }
    this.cachedTrackLoadedData = null, this.log(`Audio track ${a} "${u.name}" of "${o}" loaded [${n.startSN},${n.endSN}]${n.lastPartSn ? `[part-${n.lastPartSn}-${n.lastPartIndex}]` : ""},duration:${n.totalduration}`);
    const h = r[a];
    let c = 0;
    if (n.live || (s = h.details) != null && s.live) {
      if (this.checkLiveUpdate(n), n.deltaUpdateFailed)
        return;
      if (h.details) {
        var d;
        c = this.alignPlaylists(n, h.details, (d = this.levelLastLoaded) == null ? void 0 : d.details);
      }
      n.alignedSliding || (Hl(n, l), n.alignedSliding || ai(n, l), c = n.fragmentStart);
    }
    h.details = n, this.levelLastLoaded = h, this.startFragRequested || this.setStartPosition(l, c), this.hls.trigger(E.AUDIO_TRACK_UPDATED, {
      details: n,
      id: a,
      groupId: t.groupId
    }), this.state === C.WAITING_TRACK && !this.waitForCdnTuneIn(n) && (this.state = C.IDLE), this.tick();
  }
  _handleFragmentLoadProgress(e) {
    var t;
    const s = e.frag, {
      part: r,
      payload: n
    } = e, {
      config: a,
      trackId: o,
      levels: u
    } = this;
    if (!u) {
      this.warn(`Audio tracks were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
      return;
    }
    const l = u[o];
    if (!l) {
      this.warn("Audio track is undefined on fragment load progress");
      return;
    }
    const h = l.details;
    if (!h) {
      this.warn("Audio track details undefined on fragment load progress"), this.removeUnbufferedFrags(s.start);
      return;
    }
    const c = a.defaultAudioCodec || l.audioCodec || "mp4a.40.2";
    let d = this.transmuxer;
    d || (d = this.transmuxer = new lu(this.hls, B.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
    const g = this.initPTS[s.cc], f = (t = s.initSegment) == null ? void 0 : t.data;
    if (g !== void 0) {
      const p = r ? r.index : -1, y = p !== -1, v = new rn(s.level, s.sn, s.stats.chunkCount, n.byteLength, p, y);
      d.push(n, f, c, "", s, r, h.totalduration, !1, v, g);
    } else {
      this.log(`Unknown video PTS for cc ${s.cc}, waiting for video PTS before demuxing audio frag ${s.sn} of [${h.startSN} ,${h.endSN}],track ${o}`);
      const {
        cache: m
      } = this.waitingData = this.waitingData || {
        frag: s,
        part: r,
        cache: new Vl(),
        complete: !1
      };
      m.push(new Uint8Array(n)), this.state !== C.STOPPED && (this.state = C.WAITING_INIT_PTS);
    }
  }
  _handleFragmentLoadComplete(e) {
    if (this.waitingData) {
      this.waitingData.complete = !0;
      return;
    }
    super._handleFragmentLoadComplete(e);
  }
  onBufferReset() {
    this.mediaBuffer = null;
  }
  onBufferCreated(e, t) {
    this.bufferFlushed = this.flushing = !1;
    const s = t.tracks.audio;
    s && (this.mediaBuffer = s.buffer || null);
  }
  onFragLoading(e, t) {
    !this.audioOnly && t.frag.type === B.MAIN && ge(t.frag) && (this.mainFragLoading = t, this.state === C.IDLE && this.tick());
  }
  onFragBuffered(e, t) {
    const {
      frag: s,
      part: r
    } = t;
    if (s.type !== B.AUDIO) {
      !this.audioOnly && s.type === B.MAIN && !s.elementaryStreams.video && !s.elementaryStreams.audiovideo && (this.audioOnly = !0, this.mainFragLoading = null);
      return;
    }
    if (this.fragContextChanged(s)) {
      this.warn(`Fragment ${s.sn}${r ? " p: " + r.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}, audioSwitch: ${this.switchingTrack ? this.switchingTrack.name : "false"}`);
      return;
    }
    if (ge(s)) {
      this.fragPrevious = s;
      const n = this.switchingTrack;
      n && (this.bufferedTrack = n, this.switchingTrack = null, this.hls.trigger(E.AUDIO_TRACK_SWITCHED, re({}, n)));
    }
    this.fragBufferedComplete(s, r), this.media && this.tick();
  }
  onError(e, t) {
    var s;
    if (t.fatal) {
      this.state = C.ERROR;
      return;
    }
    switch (t.details) {
      case D.FRAG_GAP:
      case D.FRAG_PARSING_ERROR:
      case D.FRAG_DECRYPT_ERROR:
      case D.FRAG_LOAD_ERROR:
      case D.FRAG_LOAD_TIMEOUT:
      case D.KEY_LOAD_ERROR:
      case D.KEY_LOAD_TIMEOUT:
        this.onFragmentOrKeyLoadError(B.AUDIO, t);
        break;
      case D.AUDIO_TRACK_LOAD_ERROR:
      case D.AUDIO_TRACK_LOAD_TIMEOUT:
      case D.LEVEL_PARSING_ERROR:
        !t.levelRetry && this.state === C.WAITING_TRACK && ((s = t.context) == null ? void 0 : s.type) === Q.AUDIO_TRACK && (this.state = C.IDLE);
        break;
      case D.BUFFER_ADD_CODEC_ERROR:
      case D.BUFFER_APPEND_ERROR:
        if (t.parent !== "audio")
          return;
        this.reduceLengthAndFlushBuffer(t) || this.resetLoadingState();
        break;
      case D.BUFFER_FULL_ERROR:
        if (t.parent !== "audio")
          return;
        this.reduceLengthAndFlushBuffer(t) && (this.bufferedTrack = null, super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio"));
        break;
      case D.INTERNAL_EXCEPTION:
        this.recoverWorkerError(t);
        break;
    }
  }
  onBufferFlushing(e, {
    type: t
  }) {
    t !== oe.VIDEO && (this.flushing = !0);
  }
  onBufferFlushed(e, {
    type: t
  }) {
    if (t !== oe.VIDEO) {
      this.flushing = !1, this.bufferFlushed = !0, this.state === C.ENDED && (this.state = C.IDLE);
      const s = this.mediaBuffer || this.media;
      s && (this.afterBufferFlushed(s, t, B.AUDIO), this.tick());
    }
  }
  _handleTransmuxComplete(e) {
    var t;
    const s = "audio", {
      hls: r
    } = this, {
      remuxResult: n,
      chunkMeta: a
    } = e, o = this.getCurrentContext(a);
    if (!o) {
      this.resetWhenMissingContext(a);
      return;
    }
    const {
      frag: u,
      part: l,
      level: h
    } = o, {
      details: c
    } = h, {
      audio: d,
      text: g,
      id3: f,
      initSegment: m
    } = n;
    if (this.fragContextChanged(u) || !c) {
      this.fragmentTracker.removeFragment(u);
      return;
    }
    if (this.state = C.PARSING, this.switchingTrack && d && this.completeAudioSwitch(this.switchingTrack), m != null && m.tracks) {
      const p = u.initSegment || u;
      if (this.unhandledEncryptionError(m, u))
        return;
      this._bufferInitSegment(h, m.tracks, p, a), r.trigger(E.FRAG_PARSING_INIT_SEGMENT, {
        frag: p,
        id: s,
        tracks: m.tracks
      });
    }
    if (d) {
      const {
        startPTS: p,
        endPTS: y,
        startDTS: v,
        endDTS: T
      } = d;
      l && (l.elementaryStreams[oe.AUDIO] = {
        startPTS: p,
        endPTS: y,
        startDTS: v,
        endDTS: T
      }), u.setElementaryStreamInfo(oe.AUDIO, p, y, v, T), this.bufferFragmentData(d, u, l, a);
    }
    if (f != null && (t = f.samples) != null && t.length) {
      const p = ae({
        id: s,
        frag: u,
        details: c
      }, f);
      r.trigger(E.FRAG_PARSING_METADATA, p);
    }
    if (g) {
      const p = ae({
        id: s,
        frag: u,
        details: c
      }, g);
      r.trigger(E.FRAG_PARSING_USERDATA, p);
    }
  }
  _bufferInitSegment(e, t, s, r) {
    if (this.state !== C.PARSING || (t.video && delete t.video, t.audiovideo && delete t.audiovideo, !t.audio))
      return;
    const n = t.audio;
    n.id = B.AUDIO;
    const a = e.audioCodec;
    this.log(`Init audio buffer, container:${n.container}, codecs[level/parsed]=[${a}/${n.codec}]`), a && a.split(",").length === 1 && (n.levelCodec = a), this.hls.trigger(E.BUFFER_CODECS, t);
    const o = n.initSegment;
    if (o != null && o.byteLength) {
      const u = {
        type: "audio",
        frag: s,
        part: null,
        chunkMeta: r,
        parent: s.type,
        data: o
      };
      this.hls.trigger(E.BUFFER_APPENDING, u);
    }
    this.tickImmediate();
  }
  loadFragment(e, t, s) {
    const r = this.fragmentTracker.getState(e);
    if (this.switchingTrack || r === pe.NOT_LOADED || r === pe.PARTIAL) {
      var n;
      if (!ge(e))
        this._loadInitSegment(e, t);
      else if ((n = t.details) != null && n.live && !this.initPTS[e.cc]) {
        this.log(`Waiting for video PTS in continuity counter ${e.cc} of live stream before loading audio fragment ${e.sn} of level ${this.trackId}`), this.state = C.WAITING_INIT_PTS;
        const a = this.mainDetails;
        a && a.fragmentStart !== t.details.fragmentStart && ai(t.details, a);
      } else
        super.loadFragment(e, t, s);
    } else
      this.clearTrackerIfNeeded(e);
  }
  flushAudioIfNeeded(e) {
    if (this.media && this.bufferedTrack) {
      const {
        name: t,
        lang: s,
        assocLang: r,
        characteristics: n,
        audioCodec: a,
        channels: o
      } = this.bufferedTrack;
      xt({
        name: t,
        lang: s,
        assocLang: r,
        characteristics: n,
        audioCodec: a,
        channels: o
      }, e, yt) || (ti(e.url, this.hls) ? (this.log("Switching audio track : flushing all audio"), super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio"), this.bufferedTrack = null) : this.bufferedTrack = e);
    }
  }
  completeAudioSwitch(e) {
    const {
      hls: t
    } = this;
    this.flushAudioIfNeeded(e), this.bufferedTrack = e, this.switchingTrack = null, t.trigger(E.AUDIO_TRACK_SWITCHED, re({}, e));
  }
}
class mn extends Be {
  constructor(e, t) {
    super(t, e.logger), this.hls = void 0, this.canLoad = !1, this.timer = -1, this.hls = e;
  }
  destroy() {
    this.clearTimer(), this.hls = this.log = this.warn = null;
  }
  clearTimer() {
    this.timer !== -1 && (self.clearTimeout(this.timer), this.timer = -1);
  }
  startLoad() {
    this.canLoad = !0, this.loadPlaylist();
  }
  stopLoad() {
    this.canLoad = !1, this.clearTimer();
  }
  switchParams(e, t, s) {
    const r = t?.renditionReports;
    if (r) {
      let n = -1;
      for (let a = 0; a < r.length; a++) {
        const o = r[a];
        let u;
        try {
          u = new self.URL(o.URI, t.url).href;
        } catch (l) {
          this.warn(`Could not construct new URL for Rendition Report: ${l}`), u = o.URI || "";
        }
        if (u === e) {
          n = a;
          break;
        } else u === e.substring(0, u.length) && (n = a);
      }
      if (n !== -1) {
        const a = r[n], o = parseInt(a["LAST-MSN"]) || t.lastPartSn;
        let u = parseInt(a["LAST-PART"]) || t.lastPartIndex;
        if (this.hls.config.lowLatencyMode) {
          const h = Math.min(t.age - t.partTarget, t.targetduration);
          u >= 0 && h > t.partTarget && (u += 1);
        }
        const l = s && ua(s);
        return new ha(o, u >= 0 ? u : void 0, l);
      }
    }
  }
  loadPlaylist(e) {
    this.clearTimer();
  }
  loadingPlaylist(e, t) {
    this.clearTimer();
  }
  shouldLoadPlaylist(e) {
    return this.canLoad && !!e && !!e.url && (!e.details || e.details.live);
  }
  getUrlWithDirectives(e, t) {
    if (t)
      try {
        return t.addDirectives(e);
      } catch (s) {
        this.warn(`Could not construct new URL with HLS Delivery Directives: ${s}`);
      }
    return e;
  }
  playlistLoaded(e, t, s) {
    const {
      details: r,
      stats: n
    } = t, a = self.performance.now(), o = n.loading.first ? Math.max(0, a - n.loading.first) : 0;
    r.advancedDateTime = Date.now() - o;
    const u = this.hls.config.timelineOffset;
    if (u !== r.appliedTimelineOffset) {
      const h = Math.max(u || 0, 0);
      r.appliedTimelineOffset = h, r.fragments.forEach((c) => {
        c.setStart(c.playlistOffset + h);
      });
    }
    if (r.live || s != null && s.live) {
      const h = "levelInfo" in t ? t.levelInfo : t.track;
      if (r.reloaded(s), s && r.fragments.length > 0) {
        yg(s, r, this);
        const v = r.playlistParsingError;
        if (v) {
          this.warn(v);
          const T = this.hls;
          if (!T.config.ignorePlaylistParsingErrors) {
            var l;
            const {
              networkDetails: S
            } = t;
            T.trigger(E.ERROR, {
              type: V.NETWORK_ERROR,
              details: D.LEVEL_PARSING_ERROR,
              fatal: !1,
              url: r.url,
              error: v,
              reason: v.message,
              level: t.level || void 0,
              parent: (l = r.fragments[0]) == null ? void 0 : l.type,
              networkDetails: S,
              stats: n
            });
            return;
          }
          r.playlistParsingError = null;
        }
      }
      r.requestScheduled === -1 && (r.requestScheduled = n.loading.start);
      const c = this.hls.mainForwardBufferInfo, d = c ? c.end - c.len : 0, g = (r.edge - d) * 1e3, f = Nl(r, g);
      if (r.requestScheduled + f < a ? r.requestScheduled = a : r.requestScheduled += f, this.log(`live playlist ${e} ${r.advanced ? "REFRESHED " + r.lastPartSn + "-" + r.lastPartIndex : r.updated ? "UPDATED" : "MISSED"}`), !this.canLoad || !r.live)
        return;
      let m, p, y;
      if (r.canBlockReload && r.endSN && r.advanced) {
        const v = this.hls.config.lowLatencyMode, T = r.lastPartSn, S = r.endSN, x = r.lastPartIndex, L = x !== -1, A = T === S;
        L ? A ? (p = S + 1, y = v ? 0 : x) : (p = T, y = v ? x + 1 : r.maxPartIndex) : p = S + 1;
        const I = r.age, _ = I + r.ageHeader;
        let b = Math.min(_ - r.partTarget, r.targetduration * 1.5);
        if (b > 0) {
          if (_ > r.targetduration * 3)
            this.log(`Playlist last advanced ${I.toFixed(2)}s ago. Omitting segment and part directives.`), p = void 0, y = void 0;
          else if (s != null && s.tuneInGoal && _ - r.partTarget > s.tuneInGoal)
            this.warn(`CDN Tune-in goal increased from: ${s.tuneInGoal} to: ${b} with playlist age: ${r.age}`), b = 0;
          else {
            const P = Math.floor(b / r.targetduration);
            if (p += P, y !== void 0) {
              const M = Math.round(b % r.targetduration / r.partTarget);
              y += M;
            }
            this.log(`CDN Tune-in age: ${r.ageHeader}s last advanced ${I.toFixed(2)}s goal: ${b} skip sn ${P} to part ${y}`);
          }
          r.tuneInGoal = b;
        }
        if (m = this.getDeliveryDirectives(r, t.deliveryDirectives, p, y), v || !A) {
          r.requestScheduled = a, this.loadingPlaylist(h, m);
          return;
        }
      } else (r.canBlockReload || r.canSkipUntil) && (m = this.getDeliveryDirectives(r, t.deliveryDirectives, p, y));
      m && p !== void 0 && r.canBlockReload && (r.requestScheduled = n.loading.first + Math.max(f - o * 2, f / 2)), this.scheduleLoading(h, m, r);
    } else
      this.clearTimer();
  }
  scheduleLoading(e, t, s) {
    const r = s || e.details;
    if (!r) {
      this.loadingPlaylist(e, t);
      return;
    }
    const n = self.performance.now(), a = r.requestScheduled;
    if (n >= a) {
      this.loadingPlaylist(e, t);
      return;
    }
    const o = a - n;
    this.log(`reload live playlist ${e.name || e.bitrate + "bps"} in ${Math.round(o)} ms`), this.clearTimer(), this.timer = self.setTimeout(() => this.loadingPlaylist(e, t), o);
  }
  getDeliveryDirectives(e, t, s, r) {
    let n = ua(e);
    return t != null && t.skip && e.deltaUpdateFailed && (s = t.msn, r = t.part, n = $s.No), new ha(s, r, n);
  }
  checkRetry(e) {
    const t = e.details, s = si(e), r = e.errorAction, {
      action: n,
      retryCount: a = 0,
      retryConfig: o
    } = r || {}, u = !!r && !!o && (n === ve.RetryRequest || !r.resolved && n === ve.SendAlternateToPenaltyBox);
    if (u) {
      var l;
      if (a >= o.maxNumRetry)
        return !1;
      if (s && (l = e.context) != null && l.deliveryDirectives)
        this.warn(`Retrying playlist loading ${a + 1}/${o.maxNumRetry} after "${t}" without delivery-directives`), this.loadPlaylist();
      else {
        const h = tn(o, a);
        this.clearTimer(), this.timer = self.setTimeout(() => this.loadPlaylist(), h), this.warn(`Retrying playlist loading ${a + 1}/${o.maxNumRetry} after "${t}" in ${h}ms`);
      }
      e.levelRetry = !0, r.resolved = !0;
    }
    return u;
  }
}
function uu(i, e) {
  if (i.length !== e.length)
    return !1;
  for (let t = 0; t < i.length; t++)
    if (!fs(i[t].attrs, e[t].attrs))
      return !1;
  return !0;
}
function fs(i, e, t) {
  const s = i["STABLE-RENDITION-ID"];
  return s && !t ? s === e["STABLE-RENDITION-ID"] : !(t || ["LANGUAGE", "NAME", "CHARACTERISTICS", "AUTOSELECT", "DEFAULT", "FORCED", "ASSOC-LANGUAGE"]).some((r) => i[r] !== e[r]);
}
function _r(i, e) {
  return e.label.toLowerCase() === i.name.toLowerCase() && (!e.language || e.language.toLowerCase() === (i.lang || "").toLowerCase());
}
class R0 extends mn {
  constructor(e) {
    super(e, "audio-track-controller"), this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0, this.registerListeners();
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.MANIFEST_PARSED, this.onManifestParsed, this), e.on(E.LEVEL_LOADING, this.onLevelLoading, this), e.on(E.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(E.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.on(E.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.MANIFEST_PARSED, this.onManifestParsed, this), e.off(E.LEVEL_LOADING, this.onLevelLoading, this), e.off(E.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(E.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.off(E.ERROR, this.onError, this);
  }
  destroy() {
    this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.currentTrack = null, super.destroy();
  }
  onManifestLoading() {
    this.tracks = [], this.tracksInGroup = [], this.groupIds = null, this.currentTrack = null, this.trackId = -1, this.selectDefaultTrack = !0;
  }
  onManifestParsed(e, t) {
    this.tracks = t.audioTracks || [];
  }
  onAudioTrackLoaded(e, t) {
    const {
      id: s,
      groupId: r,
      details: n
    } = t, a = this.tracksInGroup[s];
    if (!a || a.groupId !== r) {
      this.warn(`Audio track with id:${s} and group:${r} not found in active group ${a?.groupId}`);
      return;
    }
    const o = a.details;
    a.details = t.details, this.log(`Audio track ${s} "${a.name}" lang:${a.lang} group:${r} loaded [${n.startSN}-${n.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
  }
  onLevelLoading(e, t) {
    this.switchLevel(t.level);
  }
  onLevelSwitching(e, t) {
    this.switchLevel(t.level);
  }
  switchLevel(e) {
    const t = this.hls.levels[e];
    if (!t)
      return;
    const s = t.audioGroups || null, r = this.groupIds;
    let n = this.currentTrack;
    if (!s || r?.length !== s?.length || s != null && s.some((o) => r?.indexOf(o) === -1)) {
      this.groupIds = s, this.trackId = -1, this.currentTrack = null;
      const o = this.tracks.filter((d) => !s || s.indexOf(d.groupId) !== -1);
      if (o.length)
        this.selectDefaultTrack && !o.some((d) => d.default) && (this.selectDefaultTrack = !1), o.forEach((d, g) => {
          d.id = g;
        });
      else if (!n && !this.tracksInGroup.length)
        return;
      this.tracksInGroup = o;
      const u = this.hls.config.audioPreference;
      if (!n && u) {
        const d = qe(u, o, yt);
        if (d > -1)
          n = o[d];
        else {
          const g = qe(u, this.tracks);
          n = this.tracks[g];
        }
      }
      let l = this.findTrackId(n);
      l === -1 && n && (l = this.findTrackId(null));
      const h = {
        audioTracks: o
      };
      this.log(`Updating audio tracks, ${o.length} track(s) found in group(s): ${s?.join(",")}`), this.hls.trigger(E.AUDIO_TRACKS_UPDATED, h);
      const c = this.trackId;
      if (l !== -1 && c === -1)
        this.setAudioTrack(l);
      else if (o.length && c === -1) {
        var a;
        const d = new Error(`No audio track selected for current audio group-ID(s): ${(a = this.groupIds) == null ? void 0 : a.join(",")} track count: ${o.length}`);
        this.warn(d.message), this.hls.trigger(E.ERROR, {
          type: V.MEDIA_ERROR,
          details: D.AUDIO_TRACK_LOAD_ERROR,
          fatal: !0,
          error: d
        });
      }
    }
  }
  onError(e, t) {
    t.fatal || !t.context || t.context.type === Q.AUDIO_TRACK && t.context.id === this.trackId && (!this.groupIds || this.groupIds.indexOf(t.context.groupId) !== -1) && this.checkRetry(t);
  }
  get allAudioTracks() {
    return this.tracks;
  }
  get audioTracks() {
    return this.tracksInGroup;
  }
  get audioTrack() {
    return this.trackId;
  }
  set audioTrack(e) {
    this.selectDefaultTrack = !1, this.setAudioTrack(e);
  }
  setAudioOption(e) {
    const t = this.hls;
    if (t.config.audioPreference = e, e) {
      const s = this.allAudioTracks;
      if (this.selectDefaultTrack = !1, s.length) {
        const r = this.currentTrack;
        if (r && xt(e, r, yt))
          return r;
        const n = qe(e, this.tracksInGroup, yt);
        if (n > -1) {
          const a = this.tracksInGroup[n];
          return this.setAudioTrack(n), a;
        } else if (r) {
          let a = t.loadLevel;
          a === -1 && (a = t.firstAutoLevel);
          const o = Uf(e, t.levels, s, a, yt);
          if (o === -1)
            return null;
          t.nextLoadLevel = o;
        }
        if (e.channels || e.audioCodec) {
          const a = qe(e, s);
          if (a > -1)
            return s[a];
        }
      }
    }
    return null;
  }
  setAudioTrack(e) {
    const t = this.tracksInGroup;
    if (e < 0 || e >= t.length) {
      this.warn(`Invalid audio track id: ${e}`);
      return;
    }
    this.selectDefaultTrack = !1;
    const s = this.currentTrack, r = t[e], n = r.details && !r.details.live;
    if (e === this.trackId && r === s && n || (this.log(`Switching to audio-track ${e} "${r.name}" lang:${r.lang} group:${r.groupId} channels:${r.channels}`), this.trackId = e, this.currentTrack = r, this.hls.trigger(E.AUDIO_TRACK_SWITCHING, re({}, r)), n))
      return;
    const a = this.switchParams(r.url, s?.details, r.details);
    this.loadPlaylist(a);
  }
  findTrackId(e) {
    const t = this.tracksInGroup;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      if (!(this.selectDefaultTrack && !r.default) && (!e || xt(e, r, yt)))
        return s;
    }
    if (e) {
      const {
        name: s,
        lang: r,
        assocLang: n,
        characteristics: a,
        audioCodec: o,
        channels: u
      } = e;
      for (let l = 0; l < t.length; l++) {
        const h = t[l];
        if (xt({
          name: s,
          lang: r,
          assocLang: n,
          characteristics: a,
          audioCodec: o,
          channels: u
        }, h, yt))
          return l;
      }
      for (let l = 0; l < t.length; l++) {
        const h = t[l];
        if (fs(e.attrs, h.attrs, ["LANGUAGE", "ASSOC-LANGUAGE", "CHARACTERISTICS"]))
          return l;
      }
      for (let l = 0; l < t.length; l++) {
        const h = t[l];
        if (fs(e.attrs, h.attrs, ["LANGUAGE"]))
          return l;
      }
    }
    return -1;
  }
  loadPlaylist(e) {
    super.loadPlaylist();
    const t = this.currentTrack;
    this.shouldLoadPlaylist(t) && ti(t.url, this.hls) && this.scheduleLoading(t, e);
  }
  loadingPlaylist(e, t) {
    super.loadingPlaylist(e, t);
    const s = e.id, r = e.groupId, n = this.getUrlWithDirectives(e.url, t), a = e.details, o = a?.age;
    this.log(`Loading audio-track ${s} "${e.name}" lang:${e.lang} group:${r}${t?.msn !== void 0 ? " at sn " + t.msn + " part " + t.part : ""}${o && a.live ? " age " + o.toFixed(1) + (a.type && " " + a.type || "") : ""} ${n}`), this.hls.trigger(E.AUDIO_TRACK_LOADING, {
      url: n,
      id: s,
      groupId: r,
      deliveryDirectives: t || null,
      track: e
    });
  }
}
class _0 {
  constructor(e) {
    this.tracks = void 0, this.queues = {
      video: [],
      audio: [],
      audiovideo: []
    }, this.tracks = e;
  }
  destroy() {
    this.tracks = this.queues = null;
  }
  append(e, t, s) {
    if (this.queues === null || this.tracks === null)
      return;
    const r = this.queues[t];
    r.push(e), r.length === 1 && !s && this.executeNext(t);
  }
  appendBlocker(e) {
    return new Promise((t) => {
      const s = {
        label: "async-blocker",
        execute: t,
        onStart: () => {
        },
        onComplete: () => {
        },
        onError: () => {
        }
      };
      this.append(s, e);
    });
  }
  prependBlocker(e) {
    return new Promise((t) => {
      if (this.queues) {
        const s = {
          label: "async-blocker-prepend",
          execute: t,
          onStart: () => {
          },
          onComplete: () => {
          },
          onError: () => {
          }
        };
        this.queues[e].unshift(s);
      }
    });
  }
  removeBlockers() {
    this.queues !== null && [this.queues.video, this.queues.audio, this.queues.audiovideo].forEach((e) => {
      var t;
      const s = (t = e[0]) == null ? void 0 : t.label;
      (s === "async-blocker" || s === "async-blocker-prepend") && (e[0].execute(), e.splice(0, 1));
    });
  }
  unblockAudio(e) {
    if (this.queues === null)
      return;
    this.queues.audio[0] === e && this.shiftAndExecuteNext("audio");
  }
  executeNext(e) {
    if (this.queues === null || this.tracks === null)
      return;
    const t = this.queues[e];
    if (t.length) {
      const r = t[0];
      try {
        r.execute();
      } catch (n) {
        var s;
        if (r.onError(n), this.queues === null || this.tracks === null)
          return;
        const a = (s = this.tracks[e]) == null ? void 0 : s.buffer;
        a != null && a.updating || this.shiftAndExecuteNext(e);
      }
    }
  }
  shiftAndExecuteNext(e) {
    this.queues !== null && (this.queues[e].shift(), this.executeNext(e));
  }
  current(e) {
    var t;
    return ((t = this.queues) == null ? void 0 : t[e][0]) || null;
  }
  toString() {
    const {
      queues: e,
      tracks: t
    } = this;
    return e === null || t === null ? "<destroyed>" : `
${this.list("video")}
${this.list("audio")}
${this.list("audiovideo")}}`;
  }
  list(e) {
    var t, s;
    return (t = this.queues) != null && t[e] || (s = this.tracks) != null && s[e] ? `${e}: (${this.listSbInfo(e)}) ${this.listOps(e)}` : "";
  }
  listSbInfo(e) {
    var t;
    const s = (t = this.tracks) == null ? void 0 : t[e], r = s?.buffer;
    return r ? `SourceBuffer${r.updating ? " updating" : ""}${s.ended ? " ended" : ""}${s.ending ? " ending" : ""}` : "none";
  }
  listOps(e) {
    var t;
    return ((t = this.queues) == null ? void 0 : t[e].map((s) => s.label).join(", ")) || "";
  }
}
const Xa = /(avc[1234]|hvc1|hev1|dvh[1e]|vp09|av01)(?:\.[^.,]+)+/, hu = "HlsJsTrackRemovedError";
class D0 extends Error {
  constructor(e) {
    super(e), this.name = hu;
  }
}
class C0 extends Be {
  constructor(e, t) {
    super("buffer-controller", e.logger), this.hls = void 0, this.fragmentTracker = void 0, this.details = null, this._objectUrl = null, this.operationQueue = null, this.bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.lastMpegAudioChunk = null, this.blockedAudioAppend = null, this.lastVideoAppendEnd = 0, this.appendSource = void 0, this.transferData = void 0, this.overrides = void 0, this.appendErrors = {
      audio: 0,
      video: 0,
      audiovideo: 0
    }, this.tracks = {}, this.sourceBuffers = [[null, null], [null, null]], this._onEndStreaming = (s) => {
      var r;
      this.hls && ((r = this.mediaSource) == null ? void 0 : r.readyState) === "open" && this.hls.pauseBuffering();
    }, this._onStartStreaming = (s) => {
      this.hls && this.hls.resumeBuffering();
    }, this._onMediaSourceOpen = (s) => {
      const {
        media: r,
        mediaSource: n
      } = this;
      s && this.log("Media source opened"), !(!r || !n) && (n.removeEventListener("sourceopen", this._onMediaSourceOpen), r.removeEventListener("emptied", this._onMediaEmptied), this.updateDuration(), this.hls.trigger(E.MEDIA_ATTACHED, {
        media: r,
        mediaSource: n
      }), this.mediaSource !== null && this.checkPendingTracks());
    }, this._onMediaSourceClose = () => {
      this.log("Media source closed");
    }, this._onMediaSourceEnded = () => {
      this.log("Media source ended");
    }, this._onMediaEmptied = () => {
      const {
        mediaSrc: s,
        _objectUrl: r
      } = this;
      s !== r && this.error(`Media element src was set while attaching MediaSource (${r} > ${s})`);
    }, this.hls = e, this.fragmentTracker = t, this.appendSource = Qd(ct(e.config.preferManagedMediaSource)), this.initTracks(), this.registerListeners();
  }
  hasSourceTypes() {
    return Object.keys(this.tracks).length > 0;
  }
  destroy() {
    this.unregisterListeners(), this.details = null, this.lastMpegAudioChunk = this.blockedAudioAppend = null, this.transferData = this.overrides = void 0, this.operationQueue && (this.operationQueue.destroy(), this.operationQueue = null), this.hls = this.fragmentTracker = null, this._onMediaSourceOpen = this._onMediaSourceClose = null, this._onMediaSourceEnded = null, this._onStartStreaming = this._onEndStreaming = null;
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.MANIFEST_PARSED, this.onManifestParsed, this), e.on(E.BUFFER_RESET, this.onBufferReset, this), e.on(E.BUFFER_APPENDING, this.onBufferAppending, this), e.on(E.BUFFER_CODECS, this.onBufferCodecs, this), e.on(E.BUFFER_EOS, this.onBufferEos, this), e.on(E.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.on(E.FRAG_PARSED, this.onFragParsed, this), e.on(E.FRAG_CHANGED, this.onFragChanged, this), e.on(E.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.MANIFEST_PARSED, this.onManifestParsed, this), e.off(E.BUFFER_RESET, this.onBufferReset, this), e.off(E.BUFFER_APPENDING, this.onBufferAppending, this), e.off(E.BUFFER_CODECS, this.onBufferCodecs, this), e.off(E.BUFFER_EOS, this.onBufferEos, this), e.off(E.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.off(E.FRAG_PARSED, this.onFragParsed, this), e.off(E.FRAG_CHANGED, this.onFragChanged, this), e.off(E.ERROR, this.onError, this);
  }
  transferMedia() {
    const {
      media: e,
      mediaSource: t
    } = this;
    if (!e)
      return null;
    const s = {};
    if (this.operationQueue) {
      const n = this.isUpdating();
      n || this.operationQueue.removeBlockers();
      const a = this.isQueued();
      (n || a) && this.warn(`Transfering MediaSource with${a ? " operations in queue" : ""}${n ? " updating SourceBuffer(s)" : ""} ${this.operationQueue}`), this.operationQueue.destroy();
    }
    const r = this.transferData;
    return !this.sourceBufferCount && r && r.mediaSource === t ? ae(s, r.tracks) : this.sourceBuffers.forEach((n) => {
      const [a] = n;
      a && (s[a] = ae({}, this.tracks[a]), this.removeBuffer(a)), n[0] = n[1] = null;
    }), {
      media: e,
      mediaSource: t,
      tracks: s
    };
  }
  initTracks() {
    const e = {};
    this.sourceBuffers = [[null, null], [null, null]], this.tracks = e, this.resetQueue(), this.resetAppendErrors(), this.lastMpegAudioChunk = this.blockedAudioAppend = null, this.lastVideoAppendEnd = 0;
  }
  onManifestLoading() {
    this.bufferCodecEventsTotal = 0, this.details = null;
  }
  onManifestParsed(e, t) {
    var s;
    let r = 2;
    (t.audio && !t.video || !t.altAudio) && (r = 1), this.bufferCodecEventsTotal = r, this.log(`${r} bufferCodec event(s) expected.`), (s = this.transferData) != null && s.mediaSource && this.sourceBufferCount && r && this.bufferCreated();
  }
  onMediaAttaching(e, t) {
    const s = this.media = t.media;
    this.transferData = this.overrides = void 0;
    const r = ct(this.appendSource);
    if (r) {
      const n = !!t.mediaSource;
      (n || t.overrides) && (this.transferData = t, this.overrides = t.overrides);
      const a = this.mediaSource = t.mediaSource || new r();
      if (this.assignMediaSource(a), n)
        this._objectUrl = s.src, this.attachTransferred();
      else {
        const o = this._objectUrl = self.URL.createObjectURL(a);
        if (this.appendSource)
          try {
            s.removeAttribute("src");
            const u = self.ManagedMediaSource;
            s.disableRemotePlayback = s.disableRemotePlayback || u && a instanceof u, za(s), P0(s, o), s.load();
          } catch {
            s.src = o;
          }
        else
          s.src = o;
      }
      s.addEventListener("emptied", this._onMediaEmptied);
    }
  }
  assignMediaSource(e) {
    var t, s;
    this.log(`${((t = this.transferData) == null ? void 0 : t.mediaSource) === e ? "transferred" : "created"} media source: ${(s = e.constructor) == null ? void 0 : s.name}`), e.addEventListener("sourceopen", this._onMediaSourceOpen), e.addEventListener("sourceended", this._onMediaSourceEnded), e.addEventListener("sourceclose", this._onMediaSourceClose), this.appendSource && (e.addEventListener("startstreaming", this._onStartStreaming), e.addEventListener("endstreaming", this._onEndStreaming));
  }
  attachTransferred() {
    const e = this.media, t = this.transferData;
    if (!t || !e)
      return;
    const s = this.tracks, r = t.tracks, n = r ? Object.keys(r) : null, a = n ? n.length : 0, o = () => {
      Promise.resolve().then(() => {
        this.media && this.mediaSourceOpenOrEnded && this._onMediaSourceOpen();
      });
    };
    if (r && n && a) {
      if (!this.tracksReady) {
        this.hls.config.startFragPrefetch = !0, this.log("attachTransferred: waiting for SourceBuffer track info");
        return;
      }
      if (this.log(`attachTransferred: (bufferCodecEventsTotal ${this.bufferCodecEventsTotal})
required tracks: ${le(s, (u, l) => u === "initSegment" ? void 0 : l)};
transfer tracks: ${le(r, (u, l) => u === "initSegment" ? void 0 : l)}}`), !al(r, s)) {
        t.mediaSource = null, t.tracks = void 0;
        const u = e.currentTime, l = this.details, h = Math.max(u, l?.fragments[0].start || 0);
        if (h - u > 1) {
          this.log(`attachTransferred: waiting for playback to reach new tracks start time ${u} -> ${h}`);
          return;
        }
        this.warn(`attachTransferred: resetting MediaSource for incompatible tracks ("${Object.keys(r)}"->"${Object.keys(s)}") start time: ${h} currentTime: ${u}`), this.onMediaDetaching(E.MEDIA_DETACHING, {}), this.onMediaAttaching(E.MEDIA_ATTACHING, t), e.currentTime = h;
        return;
      }
      this.transferData = void 0, n.forEach((u) => {
        const l = u, h = r[l];
        if (h) {
          const c = h.buffer;
          if (c) {
            const d = this.fragmentTracker, g = h.id;
            if (d.hasFragments(g) || d.hasParts(g)) {
              const p = j.getBuffered(c);
              d.detectEvictedFragments(l, p, g, null, !0);
            }
            const f = Wi(l), m = [l, c];
            this.sourceBuffers[f] = m, c.updating && this.operationQueue && this.operationQueue.prependBlocker(l), this.trackSourceBuffer(l, h);
          }
        }
      }), o(), this.bufferCreated();
    } else
      this.log("attachTransferred: MediaSource w/o SourceBuffers"), o();
  }
  get mediaSourceOpenOrEnded() {
    var e;
    const t = (e = this.mediaSource) == null ? void 0 : e.readyState;
    return t === "open" || t === "ended";
  }
  onMediaDetaching(e, t) {
    const s = !!t.transferMedia;
    this.transferData = this.overrides = void 0;
    const {
      media: r,
      mediaSource: n,
      _objectUrl: a
    } = this;
    if (n) {
      if (this.log(`media source ${s ? "transferring" : "detaching"}`), s)
        this.sourceBuffers.forEach(([o]) => {
          o && this.removeBuffer(o);
        }), this.resetQueue();
      else {
        if (this.mediaSourceOpenOrEnded) {
          const o = n.readyState === "open";
          try {
            const u = n.sourceBuffers;
            for (let l = u.length; l--; )
              o && u[l].abort(), n.removeSourceBuffer(u[l]);
            o && n.endOfStream();
          } catch (u) {
            this.warn(`onMediaDetaching: ${u.message} while calling endOfStream`);
          }
        }
        this.sourceBufferCount && this.onBufferReset();
      }
      n.removeEventListener("sourceopen", this._onMediaSourceOpen), n.removeEventListener("sourceended", this._onMediaSourceEnded), n.removeEventListener("sourceclose", this._onMediaSourceClose), this.appendSource && (n.removeEventListener("startstreaming", this._onStartStreaming), n.removeEventListener("endstreaming", this._onEndStreaming)), this.mediaSource = null, this._objectUrl = null;
    }
    r && (r.removeEventListener("emptied", this._onMediaEmptied), s || (a && self.URL.revokeObjectURL(a), this.mediaSrc === a ? (r.removeAttribute("src"), this.appendSource && za(r), r.load()) : this.warn("media|source.src was changed by a third party - skip cleanup")), this.media = null), this.hls.trigger(E.MEDIA_DETACHED, t);
  }
  onBufferReset() {
    this.sourceBuffers.forEach(([e]) => {
      e && this.resetBuffer(e);
    }), this.initTracks();
  }
  resetBuffer(e) {
    var t;
    const s = (t = this.tracks[e]) == null ? void 0 : t.buffer;
    if (this.removeBuffer(e), s)
      try {
        var r;
        (r = this.mediaSource) != null && r.sourceBuffers.length && this.mediaSource.removeSourceBuffer(s);
      } catch (n) {
        this.warn(`onBufferReset ${e}`, n);
      }
    delete this.tracks[e];
  }
  removeBuffer(e) {
    this.removeBufferListeners(e), this.sourceBuffers[Wi(e)] = [null, null];
    const t = this.tracks[e];
    t && (t.buffer = void 0);
  }
  resetQueue() {
    this.operationQueue && this.operationQueue.destroy(), this.operationQueue = new _0(this.tracks);
  }
  onBufferCodecs(e, t) {
    var s;
    const r = this.tracks, n = Object.keys(t);
    this.log(`BUFFER_CODECS: "${n}" (current SB count ${this.sourceBufferCount})`);
    const a = "audiovideo" in t && (r.audio || r.video) || r.audiovideo && ("audio" in t || "video" in t), o = !a && this.sourceBufferCount && this.media && n.some((u) => !r[u]);
    if (a || o) {
      this.warn(`Unsupported transition between "${Object.keys(r)}" and "${n}" SourceBuffers`);
      return;
    }
    n.forEach((u) => {
      var l, h;
      const c = t[u], {
        id: d,
        codec: g,
        levelCodec: f,
        container: m,
        metadata: p,
        supplemental: y
      } = c;
      let v = r[u];
      const T = (l = this.transferData) == null || (l = l.tracks) == null ? void 0 : l[u], S = T != null && T.buffer ? T : v, x = S?.pendingCodec || S?.codec, L = S?.levelCodec;
      v || (v = r[u] = {
        buffer: void 0,
        listeners: [],
        codec: g,
        supplemental: y,
        container: m,
        levelCodec: f,
        metadata: p,
        id: d
      });
      const A = Us(x, L), I = A?.replace(Xa, "$1");
      let _ = Us(g, f);
      const b = (h = _) == null ? void 0 : h.replace(Xa, "$1");
      _ && A && I !== b && (u.slice(0, 5) === "audio" && (_ = Js(_, this.appendSource)), this.log(`switching codec ${x} to ${_}`), _ !== (v.pendingCodec || v.codec) && (v.pendingCodec = _), v.container = m, this.appendChangeType(u, m, _));
    }), (this.tracksReady || this.sourceBufferCount) && (t.tracks = this.sourceBufferTracks), !this.sourceBufferCount && (this.bufferCodecEventsTotal > 1 && !this.tracks.video && !t.video && ((s = t.audio) == null ? void 0 : s.id) === "main" && (this.log("Main audio-only"), this.bufferCodecEventsTotal = 1), this.mediaSourceOpenOrEnded && this.checkPendingTracks());
  }
  get sourceBufferTracks() {
    return Object.keys(this.tracks).reduce((e, t) => {
      const s = this.tracks[t];
      return e[t] = {
        id: s.id,
        container: s.container,
        codec: s.codec,
        levelCodec: s.levelCodec
      }, e;
    }, {});
  }
  appendChangeType(e, t, s) {
    const r = `${t};codecs=${s}`, n = {
      label: `change-type=${r}`,
      execute: () => {
        const a = this.tracks[e];
        if (a) {
          const o = a.buffer;
          o != null && o.changeType && (this.log(`changing ${e} sourceBuffer type to ${r}`), o.changeType(r), a.codec = s, a.container = t);
        }
        this.shiftAndExecuteNext(e);
      },
      onStart: () => {
      },
      onComplete: () => {
      },
      onError: (a) => {
        this.warn(`Failed to change ${e} SourceBuffer type`, a);
      }
    };
    this.append(n, e, this.isPending(this.tracks[e]));
  }
  blockAudio(e) {
    var t;
    const s = e.start, r = s + e.duration * 0.05;
    if (((t = this.fragmentTracker.getAppendedFrag(s, B.MAIN)) == null ? void 0 : t.gap) === !0)
      return;
    const a = {
      label: "block-audio",
      execute: () => {
        var o;
        const u = this.tracks.video;
        (this.lastVideoAppendEnd > r || u != null && u.buffer && j.isBuffered(u.buffer, r) || ((o = this.fragmentTracker.getAppendedFrag(r, B.MAIN)) == null ? void 0 : o.gap) === !0) && (this.blockedAudioAppend = null, this.shiftAndExecuteNext("audio"));
      },
      onStart: () => {
      },
      onComplete: () => {
      },
      onError: (o) => {
        this.warn("Error executing block-audio operation", o);
      }
    };
    this.blockedAudioAppend = {
      op: a,
      frag: e
    }, this.append(a, "audio", !0);
  }
  unblockAudio() {
    const {
      blockedAudioAppend: e,
      operationQueue: t
    } = this;
    e && t && (this.blockedAudioAppend = null, t.unblockAudio(e.op));
  }
  onBufferAppending(e, t) {
    const {
      tracks: s
    } = this, {
      data: r,
      type: n,
      parent: a,
      frag: o,
      part: u,
      chunkMeta: l,
      offset: h
    } = t, c = l.buffering[n], {
      sn: d,
      cc: g
    } = o, f = self.performance.now();
    c.start = f;
    const m = o.stats.buffering, p = u ? u.stats.buffering : null;
    m.start === 0 && (m.start = f), p && p.start === 0 && (p.start = f);
    const y = s.audio;
    let v = !1;
    n === "audio" && y?.container === "audio/mpeg" && (v = !this.lastMpegAudioChunk || l.id === 1 || this.lastMpegAudioChunk.sn !== l.sn, this.lastMpegAudioChunk = l);
    const T = s.video, S = T?.buffer;
    if (S && d !== "initSegment") {
      const A = u || o, I = this.blockedAudioAppend;
      if (n === "audio" && a !== "main" && !this.blockedAudioAppend && !(T.ending || T.ended)) {
        const b = A.start + A.duration * 0.05, P = S.buffered, M = this.currentOp("video");
        !P.length && !M ? this.blockAudio(A) : !M && !j.isBuffered(S, b) && this.lastVideoAppendEnd < b && this.blockAudio(A);
      } else if (n === "video") {
        const _ = A.end;
        if (I) {
          const b = I.frag.start;
          (_ > b || _ < this.lastVideoAppendEnd || j.isBuffered(S, b)) && this.unblockAudio();
        }
        this.lastVideoAppendEnd = _;
      }
    }
    const x = (u || o).start, L = {
      label: `append-${n}`,
      execute: () => {
        var A;
        c.executeStart = self.performance.now();
        const I = (A = this.tracks[n]) == null ? void 0 : A.buffer;
        I && (v ? this.updateTimestampOffset(I, x, 0.1, n, d, g) : h !== void 0 && F(h) && this.updateTimestampOffset(I, h, 1e-6, n, d, g)), this.appendExecutor(r, n);
      },
      onStart: () => {
      },
      onComplete: () => {
        const A = self.performance.now();
        c.executeEnd = c.end = A, m.first === 0 && (m.first = A), p && p.first === 0 && (p.first = A);
        const I = {};
        this.sourceBuffers.forEach(([_, b]) => {
          _ && (I[_] = j.getBuffered(b));
        }), this.appendErrors[n] = 0, n === "audio" || n === "video" ? this.appendErrors.audiovideo = 0 : (this.appendErrors.audio = 0, this.appendErrors.video = 0), this.hls.trigger(E.BUFFER_APPENDED, {
          type: n,
          frag: o,
          part: u,
          chunkMeta: l,
          parent: o.type,
          timeRanges: I
        });
      },
      onError: (A) => {
        var I;
        const _ = {
          type: V.MEDIA_ERROR,
          parent: o.type,
          details: D.BUFFER_APPEND_ERROR,
          sourceBufferName: n,
          frag: o,
          part: u,
          chunkMeta: l,
          error: A,
          err: A,
          fatal: !1
        }, b = (I = this.media) == null ? void 0 : I.error;
        if (A.code === DOMException.QUOTA_EXCEEDED_ERR || A.name == "QuotaExceededError" || "quota" in A)
          _.details = D.BUFFER_FULL_ERROR;
        else if (A.code === DOMException.INVALID_STATE_ERR && this.mediaSourceOpenOrEnded && !b)
          _.errorAction = Nt(!0);
        else if (A.name === hu && this.sourceBufferCount === 0)
          _.errorAction = Nt(!0);
        else {
          const P = ++this.appendErrors[n];
          this.warn(`Failed ${P}/${this.hls.config.appendErrorMaxRetry} times to append segment in "${n}" sourceBuffer (${b || "no media error"})`), (P >= this.hls.config.appendErrorMaxRetry || b) && (_.fatal = !0);
        }
        this.hls.trigger(E.ERROR, _);
      }
    };
    this.log(`queuing "${n}" append sn: ${d}${u ? " p: " + u.index : ""} of ${o.type === B.MAIN ? "level" : "track"} ${o.level} cc: ${g}`), this.append(L, n, this.isPending(this.tracks[n]));
  }
  getFlushOp(e, t, s) {
    return this.log(`queuing "${e}" remove ${t}-${s}`), {
      label: "remove",
      execute: () => {
        this.removeExecutor(e, t, s);
      },
      onStart: () => {
      },
      onComplete: () => {
        this.hls.trigger(E.BUFFER_FLUSHED, {
          type: e
        });
      },
      onError: (r) => {
        this.warn(`Failed to remove ${t}-${s} from "${e}" SourceBuffer`, r);
      }
    };
  }
  onBufferFlushing(e, t) {
    const {
      type: s,
      startOffset: r,
      endOffset: n
    } = t;
    s ? this.append(this.getFlushOp(s, r, n), s) : this.sourceBuffers.forEach(([a]) => {
      a && this.append(this.getFlushOp(a, r, n), a);
    });
  }
  onFragParsed(e, t) {
    const {
      frag: s,
      part: r
    } = t, n = [], a = r ? r.elementaryStreams : s.elementaryStreams;
    a[oe.AUDIOVIDEO] ? n.push("audiovideo") : (a[oe.AUDIO] && n.push("audio"), a[oe.VIDEO] && n.push("video"));
    const o = () => {
      const u = self.performance.now();
      s.stats.buffering.end = u, r && (r.stats.buffering.end = u);
      const l = r ? r.stats : s.stats;
      this.hls.trigger(E.FRAG_BUFFERED, {
        frag: s,
        part: r,
        stats: l,
        id: s.type
      });
    };
    n.length === 0 && this.warn(`Fragments must have at least one ElementaryStreamType set. type: ${s.type} level: ${s.level} sn: ${s.sn}`), this.blockBuffers(o, n).catch((u) => {
      this.warn(`Fragment buffered callback ${u}`), this.stepOperationQueue(this.sourceBufferTypes);
    });
  }
  onFragChanged(e, t) {
    this.trimBuffers();
  }
  get bufferedToEnd() {
    return this.sourceBufferCount > 0 && !this.sourceBuffers.some(([e]) => {
      if (e) {
        const t = this.tracks[e];
        if (t)
          return !t.ended || t.ending;
      }
      return !1;
    });
  }
  // on BUFFER_EOS mark matching sourcebuffer(s) as "ending" and "ended" and queue endOfStream after remaining operations(s)
  // an undefined data.type will mark all buffers as EOS.
  onBufferEos(e, t) {
    var s;
    this.sourceBuffers.forEach(([a]) => {
      if (a) {
        const o = this.tracks[a];
        (!t.type || t.type === a) && (o.ending = !0, o.ended || (o.ended = !0, this.log(`${a} buffer reached EOS`)));
      }
    });
    const r = ((s = this.overrides) == null ? void 0 : s.endOfStream) !== !1;
    this.sourceBufferCount > 0 && !this.sourceBuffers.some(([a]) => {
      var o;
      return a && !((o = this.tracks[a]) != null && o.ended);
    }) ? r ? (this.log("Queueing EOS"), this.blockUntilOpen(() => {
      this.tracksEnded();
      const {
        mediaSource: a
      } = this;
      if (!a || a.readyState !== "open") {
        a && this.log(`Could not call mediaSource.endOfStream(). mediaSource.readyState: ${a.readyState}`);
        return;
      }
      this.log("Calling mediaSource.endOfStream()"), a.endOfStream(), this.hls.trigger(E.BUFFERED_TO_END, void 0);
    })) : (this.tracksEnded(), this.hls.trigger(E.BUFFERED_TO_END, void 0)) : t.type === "video" && this.unblockAudio();
  }
  tracksEnded() {
    this.sourceBuffers.forEach(([e]) => {
      if (e !== null) {
        const t = this.tracks[e];
        t && (t.ending = !1);
      }
    });
  }
  onLevelUpdated(e, {
    details: t
  }) {
    t.fragments.length && (this.details = t, this.updateDuration());
  }
  updateDuration() {
    this.blockUntilOpen(() => {
      const e = this.getDurationAndRange();
      e && this.updateMediaSource(e);
    });
  }
  onError(e, t) {
    if (t.details === D.BUFFER_APPEND_ERROR && t.frag) {
      var s;
      const r = (s = t.errorAction) == null ? void 0 : s.nextAutoLevel;
      F(r) && r !== t.frag.level && this.resetAppendErrors();
    }
  }
  resetAppendErrors() {
    this.appendErrors = {
      audio: 0,
      video: 0,
      audiovideo: 0
    };
  }
  trimBuffers() {
    const {
      hls: e,
      details: t,
      media: s
    } = this;
    if (!s || t === null || !this.sourceBufferCount)
      return;
    const r = e.config, n = s.currentTime, a = t.levelTargetDuration, o = t.live && r.liveBackBufferLength !== null ? r.liveBackBufferLength : r.backBufferLength;
    if (F(o) && o >= 0) {
      const l = Math.max(o, a), h = Math.floor(n / a) * a - l;
      this.flushBackBuffer(n, a, h);
    }
    const u = r.frontBufferFlushThreshold;
    if (F(u) && u > 0) {
      const l = Math.max(r.maxBufferLength, u), h = Math.max(l, a), c = Math.floor(n / a) * a + h;
      this.flushFrontBuffer(n, a, c);
    }
  }
  flushBackBuffer(e, t, s) {
    this.sourceBuffers.forEach(([r, n]) => {
      if (n) {
        const o = j.getBuffered(n);
        if (o.length > 0 && s > o.start(0)) {
          var a;
          this.hls.trigger(E.BACK_BUFFER_REACHED, {
            bufferEnd: s
          });
          const u = this.tracks[r];
          if ((a = this.details) != null && a.live)
            this.hls.trigger(E.LIVE_BACK_BUFFER_REACHED, {
              bufferEnd: s
            });
          else if (u != null && u.ended) {
            this.log(`Cannot flush ${r} back buffer while SourceBuffer is in ended state`);
            return;
          }
          this.hls.trigger(E.BUFFER_FLUSHING, {
            startOffset: 0,
            endOffset: s,
            type: r
          });
        }
      }
    });
  }
  flushFrontBuffer(e, t, s) {
    this.sourceBuffers.forEach(([r, n]) => {
      if (n) {
        const a = j.getBuffered(n), o = a.length;
        if (o < 2)
          return;
        const u = a.start(o - 1), l = a.end(o - 1);
        if (s > u || e >= u && e <= l)
          return;
        this.hls.trigger(E.BUFFER_FLUSHING, {
          startOffset: u,
          endOffset: 1 / 0,
          type: r
        });
      }
    });
  }
  /**
   * Update Media Source duration to current level duration or override to Infinity if configuration parameter
   * 'liveDurationInfinity` is set to `true`
   * More details: https://github.com/video-dev/hls.js/issues/355
   */
  getDurationAndRange() {
    var e;
    const {
      details: t,
      mediaSource: s
    } = this;
    if (!t || !this.media || s?.readyState !== "open")
      return null;
    const r = t.edge;
    if (t.live && this.hls.config.liveDurationInfinity) {
      if (t.fragments.length && s.setLiveSeekableRange) {
        const l = Math.max(0, t.fragmentStart), h = Math.max(l, r);
        return {
          duration: 1 / 0,
          start: l,
          end: h
        };
      }
      return {
        duration: 1 / 0
      };
    }
    const n = (e = this.overrides) == null ? void 0 : e.duration;
    if (n)
      return F(n) ? {
        duration: n
      } : null;
    const a = this.media.duration, o = F(s.duration) ? s.duration : 0;
    return r > o && r > a || !F(a) ? {
      duration: r
    } : null;
  }
  updateMediaSource({
    duration: e,
    start: t,
    end: s
  }) {
    const r = this.mediaSource;
    !this.media || !r || r.readyState !== "open" || (r.duration !== e && (F(e) && this.log(`Updating MediaSource duration to ${e.toFixed(3)}`), r.duration = e), t !== void 0 && s !== void 0 && (this.log(`MediaSource duration is set to ${r.duration}. Setting seekable range to ${t}-${s}.`), r.setLiveSeekableRange(t, s)));
  }
  get tracksReady() {
    const e = this.pendingTrackCount;
    return e > 0 && (e >= this.bufferCodecEventsTotal || this.isPending(this.tracks.audiovideo));
  }
  checkPendingTracks() {
    const {
      bufferCodecEventsTotal: e,
      pendingTrackCount: t,
      tracks: s
    } = this;
    if (this.log(`checkPendingTracks (pending: ${t} codec events expected: ${e}) ${le(s)}`), this.tracksReady) {
      var r;
      const n = (r = this.transferData) == null ? void 0 : r.tracks;
      n && Object.keys(n).length ? this.attachTransferred() : this.createSourceBuffers();
    }
  }
  bufferCreated() {
    if (this.sourceBufferCount) {
      const e = {};
      this.sourceBuffers.forEach(([t, s]) => {
        if (t) {
          const r = this.tracks[t];
          e[t] = {
            buffer: s,
            container: r.container,
            codec: r.codec,
            supplemental: r.supplemental,
            levelCodec: r.levelCodec,
            id: r.id,
            metadata: r.metadata
          };
        }
      }), this.hls.trigger(E.BUFFER_CREATED, {
        tracks: e
      }), this.log(`SourceBuffers created. Running queue: ${this.operationQueue}`), this.sourceBuffers.forEach(([t]) => {
        this.executeNext(t);
      });
    } else {
      const e = new Error("could not create source buffer for media codec(s)");
      this.hls.trigger(E.ERROR, {
        type: V.MEDIA_ERROR,
        details: D.BUFFER_INCOMPATIBLE_CODECS_ERROR,
        fatal: !0,
        error: e,
        reason: e.message
      });
    }
  }
  createSourceBuffers() {
    const {
      tracks: e,
      sourceBuffers: t,
      mediaSource: s
    } = this;
    if (!s)
      throw new Error("createSourceBuffers called when mediaSource was null");
    for (const n in e) {
      const a = n, o = e[a];
      if (this.isPending(o)) {
        const u = this.getTrackCodec(o, a), l = `${o.container};codecs=${u}`;
        o.codec = u, this.log(`creating sourceBuffer(${l})${this.currentOp(a) ? " Queued" : ""} ${le(o)}`);
        try {
          const h = s.addSourceBuffer(l), c = Wi(a), d = [a, h];
          t[c] = d, o.buffer = h;
        } catch (h) {
          var r;
          this.error(`error while trying to add sourceBuffer: ${h.message}`), this.shiftAndExecuteNext(a), (r = this.operationQueue) == null || r.removeBlockers(), delete this.tracks[a], this.hls.trigger(E.ERROR, {
            type: V.MEDIA_ERROR,
            details: D.BUFFER_ADD_CODEC_ERROR,
            fatal: !1,
            error: h,
            sourceBufferName: a,
            mimeType: l,
            parent: o.id
          });
          return;
        }
        this.trackSourceBuffer(a, o);
      }
    }
    this.bufferCreated();
  }
  getTrackCodec(e, t) {
    const s = e.supplemental;
    let r = e.codec;
    s && (t === "video" || t === "audiovideo") && os(s, "video") && (r = Tf(r, s));
    const n = Us(r, e.levelCodec);
    return n ? t.slice(0, 5) === "audio" ? Js(n, this.appendSource) : n : "";
  }
  trackSourceBuffer(e, t) {
    const s = t.buffer;
    if (!s)
      return;
    const r = this.getTrackCodec(t, e);
    this.tracks[e] = {
      buffer: s,
      codec: r,
      container: t.container,
      levelCodec: t.levelCodec,
      supplemental: t.supplemental,
      metadata: t.metadata,
      id: t.id,
      listeners: []
    }, this.removeBufferListeners(e), this.addBufferListener(e, "updatestart", this.onSBUpdateStart), this.addBufferListener(e, "updateend", this.onSBUpdateEnd), this.addBufferListener(e, "error", this.onSBUpdateError), this.appendSource && this.addBufferListener(e, "bufferedchange", (n, a) => {
      const o = a.removedRanges;
      o != null && o.length && this.hls.trigger(E.BUFFER_FLUSHED, {
        type: n
      });
    });
  }
  get mediaSrc() {
    var e, t;
    const s = ((e = this.media) == null || (t = e.querySelector) == null ? void 0 : t.call(e, "source")) || this.media;
    return s?.src;
  }
  onSBUpdateStart(e) {
    const t = this.currentOp(e);
    t && t.onStart();
  }
  onSBUpdateEnd(e) {
    var t;
    if (((t = this.mediaSource) == null ? void 0 : t.readyState) === "closed") {
      this.resetBuffer(e);
      return;
    }
    const s = this.currentOp(e);
    s && (s.onComplete(), this.shiftAndExecuteNext(e));
  }
  onSBUpdateError(e, t) {
    var s;
    const r = new Error(`${e} SourceBuffer error. MediaSource readyState: ${(s = this.mediaSource) == null ? void 0 : s.readyState}`);
    this.error(`${r}`, t), this.hls.trigger(E.ERROR, {
      type: V.MEDIA_ERROR,
      details: D.BUFFER_APPENDING_ERROR,
      sourceBufferName: e,
      error: r,
      fatal: !1
    });
    const n = this.currentOp(e);
    n && n.onError(r);
  }
  updateTimestampOffset(e, t, s, r, n, a) {
    const o = t - e.timestampOffset;
    Math.abs(o) >= s && (this.log(`Updating ${r} SourceBuffer timestampOffset to ${t} (sn: ${n} cc: ${a})`), e.timestampOffset = t);
  }
  // This method must result in an updateend event; if remove is not called, onSBUpdateEnd must be called manually
  removeExecutor(e, t, s) {
    const {
      media: r,
      mediaSource: n
    } = this, a = this.tracks[e], o = a?.buffer;
    if (!r || !n || !o) {
      this.warn(`Attempting to remove from the ${e} SourceBuffer, but it does not exist`), this.shiftAndExecuteNext(e);
      return;
    }
    const u = F(r.duration) ? r.duration : 1 / 0, l = F(n.duration) ? n.duration : 1 / 0, h = Math.max(0, t), c = Math.min(s, u, l);
    c > h && (!a.ending || a.ended) ? (a.ended = !1, this.log(`Removing [${h},${c}] from the ${e} SourceBuffer`), o.remove(h, c)) : this.shiftAndExecuteNext(e);
  }
  // This method must result in an updateend event; if append is not called, onSBUpdateEnd must be called manually
  appendExecutor(e, t) {
    const s = this.tracks[t], r = s?.buffer;
    if (!r)
      throw new D0(`Attempting to append to the ${t} SourceBuffer, but it does not exist`);
    s.ending = !1, s.ended = !1, r.appendBuffer(e);
  }
  blockUntilOpen(e) {
    if (this.isUpdating() || this.isQueued())
      this.blockBuffers(e).catch((t) => {
        this.warn(`SourceBuffer blocked callback ${t}`), this.stepOperationQueue(this.sourceBufferTypes);
      });
    else
      try {
        e();
      } catch (t) {
        this.warn(`Callback run without blocking ${this.operationQueue} ${t}`);
      }
  }
  isUpdating() {
    return this.sourceBuffers.some(([e, t]) => e && t.updating);
  }
  isQueued() {
    return this.sourceBuffers.some(([e]) => e && !!this.currentOp(e));
  }
  isPending(e) {
    return !!e && !e.buffer;
  }
  // Enqueues an operation to each SourceBuffer queue which, upon execution, resolves a promise. When all promises
  // resolve, the onUnblocked function is executed. Functions calling this method do not need to unblock the queue
  // upon completion, since we already do it here
  blockBuffers(e, t = this.sourceBufferTypes) {
    if (!t.length)
      return this.log("Blocking operation requested, but no SourceBuffers exist"), Promise.resolve().then(e);
    const {
      operationQueue: s
    } = this, r = t.map((a) => this.appendBlocker(a));
    return t.length > 1 && this.blockedAudioAppend && this.unblockAudio(), Promise.all(r).then((a) => {
      s === this.operationQueue && (e(), this.stepOperationQueue(this.sourceBufferTypes));
    });
  }
  stepOperationQueue(e) {
    e.forEach((t) => {
      var s;
      const r = (s = this.tracks[t]) == null ? void 0 : s.buffer;
      !r || r.updating || this.shiftAndExecuteNext(t);
    });
  }
  append(e, t, s) {
    this.operationQueue && this.operationQueue.append(e, t, s);
  }
  appendBlocker(e) {
    if (this.operationQueue)
      return this.operationQueue.appendBlocker(e);
  }
  currentOp(e) {
    return this.operationQueue ? this.operationQueue.current(e) : null;
  }
  executeNext(e) {
    e && this.operationQueue && this.operationQueue.executeNext(e);
  }
  shiftAndExecuteNext(e) {
    this.operationQueue && this.operationQueue.shiftAndExecuteNext(e);
  }
  get pendingTrackCount() {
    return Object.keys(this.tracks).reduce((e, t) => e + (this.isPending(this.tracks[t]) ? 1 : 0), 0);
  }
  get sourceBufferCount() {
    return this.sourceBuffers.reduce((e, [t]) => e + (t ? 1 : 0), 0);
  }
  get sourceBufferTypes() {
    return this.sourceBuffers.map(([e]) => e).filter((e) => !!e);
  }
  addBufferListener(e, t, s) {
    const r = this.tracks[e];
    if (!r)
      return;
    const n = r.buffer;
    if (!n)
      return;
    const a = s.bind(this, e);
    r.listeners.push({
      event: t,
      listener: a
    }), n.addEventListener(t, a);
  }
  removeBufferListeners(e) {
    const t = this.tracks[e];
    if (!t)
      return;
    const s = t.buffer;
    s && (t.listeners.forEach((r) => {
      s.removeEventListener(r.event, r.listener);
    }), t.listeners.length = 0);
  }
}
function za(i) {
  const e = i.querySelectorAll("source");
  [].slice.call(e).forEach((t) => {
    i.removeChild(t);
  });
}
function P0(i, e) {
  const t = self.document.createElement("source");
  t.type = "video/mp4", t.src = e, i.appendChild(t);
}
function Wi(i) {
  return i === "audio" ? 1 : 0;
}
class pn {
  constructor(e) {
    this.hls = void 0, this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.clientRect = void 0, this.streamController = void 0, this.hls = e, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners();
  }
  setStreamController(e) {
    this.streamController = e;
  }
  destroy() {
    this.hls && this.unregisterListener(), this.timer && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null;
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), e.on(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(E.MANIFEST_PARSED, this.onManifestParsed, this), e.on(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(E.BUFFER_CODECS, this.onBufferCodecs, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this);
  }
  unregisterListener() {
    const {
      hls: e
    } = this;
    e.off(E.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), e.off(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(E.MANIFEST_PARSED, this.onManifestParsed, this), e.off(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(E.BUFFER_CODECS, this.onBufferCodecs, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this);
  }
  onFpsDropLevelCapping(e, t) {
    const s = this.hls.levels[t.droppedLevel];
    this.isLevelAllowed(s) && this.restrictedLevels.push({
      bitrate: s.bitrate,
      height: s.height,
      width: s.width
    });
  }
  onMediaAttaching(e, t) {
    this.media = t.media instanceof HTMLVideoElement ? t.media : null, this.clientRect = null, this.timer && this.hls.levels.length && this.detectPlayerSize();
  }
  onManifestParsed(e, t) {
    const s = this.hls;
    this.restrictedLevels = [], this.firstLevel = t.firstLevel, s.config.capLevelToPlayerSize && t.video && this.startCapping();
  }
  onLevelsUpdated(e, t) {
    this.timer && F(this.autoLevelCapping) && this.detectPlayerSize();
  }
  // Only activate capping when playing a video stream; otherwise, multi-bitrate audio-only streams will be restricted
  // to the first level
  onBufferCodecs(e, t) {
    this.hls.config.capLevelToPlayerSize && t.video && this.startCapping();
  }
  onMediaDetaching() {
    this.stopCapping(), this.media = null;
  }
  detectPlayerSize() {
    if (this.media) {
      if (this.mediaHeight <= 0 || this.mediaWidth <= 0) {
        this.clientRect = null;
        return;
      }
      const e = this.hls.levels;
      if (e.length) {
        const t = this.hls, s = this.getMaxLevel(e.length - 1);
        s !== this.autoLevelCapping && t.logger.log(`Setting autoLevelCapping to ${s}: ${e[s].height}p@${e[s].bitrate} for media ${this.mediaWidth}x${this.mediaHeight}`), t.autoLevelCapping = s, t.autoLevelEnabled && t.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = t.autoLevelCapping;
      }
    }
  }
  /*
   * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
   */
  getMaxLevel(e) {
    const t = this.hls.levels;
    if (!t.length)
      return -1;
    const s = t.filter((r, n) => this.isLevelAllowed(r) && n <= e);
    return this.clientRect = null, pn.getMaxLevelByMediaSize(s, this.mediaWidth, this.mediaHeight);
  }
  startCapping() {
    this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize());
  }
  stopCapping() {
    this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0);
  }
  getDimensions() {
    if (this.clientRect)
      return this.clientRect;
    const e = this.media, t = {
      width: 0,
      height: 0
    };
    if (e) {
      const s = e.getBoundingClientRect();
      t.width = s.width, t.height = s.height, !t.width && !t.height && (t.width = s.right - s.left || e.width || 0, t.height = s.bottom - s.top || e.height || 0);
    }
    return this.clientRect = t, t;
  }
  get mediaWidth() {
    return this.getDimensions().width * this.contentScaleFactor;
  }
  get mediaHeight() {
    return this.getDimensions().height * this.contentScaleFactor;
  }
  get contentScaleFactor() {
    let e = 1;
    if (!this.hls.config.ignoreDevicePixelRatio)
      try {
        e = self.devicePixelRatio;
      } catch {
      }
    return Math.min(e, this.hls.config.maxDevicePixelRatio);
  }
  isLevelAllowed(e) {
    return !this.restrictedLevels.some((s) => e.bitrate === s.bitrate && e.width === s.width && e.height === s.height);
  }
  static getMaxLevelByMediaSize(e, t, s) {
    if (!(e != null && e.length))
      return -1;
    const r = (o, u) => u ? o.width !== u.width || o.height !== u.height : !0;
    let n = e.length - 1;
    const a = Math.max(t, s);
    for (let o = 0; o < e.length; o += 1) {
      const u = e[o];
      if ((u.width >= a || u.height >= a) && r(u, e[o + 1])) {
        n = o;
        break;
      }
    }
    return n;
  }
}
const k0 = {
  /**
   * text file, such as a manifest or playlist
   */
  MANIFEST: "m",
  /**
   * audio only
   */
  AUDIO: "a",
  /**
   * video only
   */
  VIDEO: "v",
  /**
   * muxed audio and video
   */
  MUXED: "av",
  /**
   * init segment
   */
  INIT: "i",
  /**
   * caption or subtitle
   */
  CAPTION: "c",
  /**
   * ISOBMFF timed text track
   */
  TIMED_TEXT: "tt",
  /**
   * cryptographic key, license or certificate.
   */
  KEY: "k",
  /**
   * other
   */
  OTHER: "o"
}, Le = k0, w0 = {
  /**
   * HTTP Live Streaming (HLS)
   */
  HLS: "h"
}, O0 = w0;
class ze {
  constructor(e, t) {
    Array.isArray(e) && (e = e.map((s) => s instanceof ze ? s : new ze(s))), this.value = e, this.params = t;
  }
}
const M0 = "Dict";
function F0(i) {
  return Array.isArray(i) ? JSON.stringify(i) : i instanceof Map ? "Map{}" : i instanceof Set ? "Set{}" : typeof i == "object" ? JSON.stringify(i) : String(i);
}
function N0(i, e, t, s) {
  return new Error(`failed to ${i} "${F0(e)}" as ${t}`, {
    cause: s
  });
}
function Qe(i, e, t) {
  return N0("serialize", i, e, t);
}
class cu {
  constructor(e) {
    this.description = e;
  }
}
const Qa = "Bare Item", B0 = "Boolean";
function U0(i) {
  if (typeof i != "boolean")
    throw Qe(i, B0);
  return i ? "?1" : "?0";
}
function $0(i) {
  return btoa(String.fromCharCode(...i));
}
const G0 = "Byte Sequence";
function H0(i) {
  if (ArrayBuffer.isView(i) === !1)
    throw Qe(i, G0);
  return `:${$0(i)}:`;
}
const V0 = "Integer";
function K0(i) {
  return i < -999999999999999 || 999999999999999 < i;
}
function du(i) {
  if (K0(i))
    throw Qe(i, V0);
  return i.toString();
}
function W0(i) {
  return `@${du(i.getTime() / 1e3)}`;
}
function fu(i, e) {
  if (i < 0)
    return -fu(-i, e);
  const t = Math.pow(10, e);
  if (Math.abs(i * t % 1 - 0.5) < Number.EPSILON) {
    const r = Math.floor(i * t);
    return (r % 2 === 0 ? r : r + 1) / t;
  } else
    return Math.round(i * t) / t;
}
const Y0 = "Decimal";
function j0(i) {
  const e = fu(i, 3);
  if (Math.floor(Math.abs(e)).toString().length > 12)
    throw Qe(i, Y0);
  const t = e.toString();
  return t.includes(".") ? t : `${t}.0`;
}
const q0 = "String", X0 = /[\x00-\x1f\x7f]+/;
function z0(i) {
  if (X0.test(i))
    throw Qe(i, q0);
  return `"${i.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
function Q0(i) {
  return i.description || i.toString().slice(7, -1);
}
const Z0 = "Token";
function Za(i) {
  const e = Q0(i);
  if (/^([a-zA-Z*])([!#$%&'*+\-.^_`|~\w:/]*)$/.test(e) === !1)
    throw Qe(e, Z0);
  return e;
}
function Dr(i) {
  switch (typeof i) {
    case "number":
      if (!F(i))
        throw Qe(i, Qa);
      return Number.isInteger(i) ? du(i) : j0(i);
    case "string":
      return z0(i);
    case "symbol":
      return Za(i);
    case "boolean":
      return U0(i);
    case "object":
      if (i instanceof Date)
        return W0(i);
      if (i instanceof Uint8Array)
        return H0(i);
      if (i instanceof cu)
        return Za(i);
    default:
      throw Qe(i, Qa);
  }
}
const J0 = "Key";
function Cr(i) {
  if (/^[a-z*][a-z0-9\-_.*]*$/.test(i) === !1)
    throw Qe(i, J0);
  return i;
}
function En(i) {
  return i == null ? "" : Object.entries(i).map(([e, t]) => t === !0 ? `;${Cr(e)}` : `;${Cr(e)}=${Dr(t)}`).join("");
}
function gu(i) {
  return i instanceof ze ? `${Dr(i.value)}${En(i.params)}` : Dr(i);
}
function em(i) {
  return `(${i.value.map(gu).join(" ")})${En(i.params)}`;
}
function tm(i, e = {
  whitespace: !0
}) {
  if (typeof i != "object" || i == null)
    throw Qe(i, M0);
  const t = i instanceof Map ? i.entries() : Object.entries(i), s = e?.whitespace ? " " : "";
  return Array.from(t).map(([r, n]) => {
    n instanceof ze || (n = new ze(n));
    let a = Cr(r);
    return n.value === !0 ? a += En(n.params) : (a += "=", Array.isArray(n.value) ? a += em(n) : a += gu(n)), a;
  }).join(`,${s}`);
}
function mu(i, e) {
  return tm(i, e);
}
const Ke = "CMCD-Object", fe = "CMCD-Request", pt = "CMCD-Session", at = "CMCD-Status", sm = {
  // Object
  br: Ke,
  ab: Ke,
  d: Ke,
  ot: Ke,
  tb: Ke,
  tpb: Ke,
  lb: Ke,
  tab: Ke,
  lab: Ke,
  url: Ke,
  // Request
  pb: fe,
  bl: fe,
  tbl: fe,
  dl: fe,
  ltc: fe,
  mtp: fe,
  nor: fe,
  nrr: fe,
  rc: fe,
  sn: fe,
  sta: fe,
  su: fe,
  ttfb: fe,
  ttfbb: fe,
  ttlb: fe,
  cmsdd: fe,
  cmsds: fe,
  smrt: fe,
  df: fe,
  cs: fe,
  // TODO: Which header to put the `ts` field is not defined yet.
  ts: fe,
  // Session
  cid: pt,
  pr: pt,
  sf: pt,
  sid: pt,
  st: pt,
  v: pt,
  msd: pt,
  // Status
  bs: at,
  bsd: at,
  cdn: at,
  rtp: at,
  bg: at,
  pt: at,
  ec: at,
  e: at
}, im = {
  /**
   * keys whose values vary with each request.
   */
  REQUEST: fe
};
function rm(i) {
  return Object.keys(i).reduce((e, t) => {
    var s;
    return (s = i[t]) === null || s === void 0 || s.forEach((r) => e[r] = t), e;
  }, {});
}
function nm(i, e) {
  const t = {};
  if (!i)
    return t;
  const s = Object.keys(i), r = e ? rm(e) : {};
  return s.reduce((n, a) => {
    var o;
    const u = sm[a] || r[a] || im.REQUEST, l = (o = n[u]) !== null && o !== void 0 ? o : n[u] = {};
    return l[a] = i[a], n;
  }, t);
}
function am(i) {
  return ["ot", "sf", "st", "e", "sta"].includes(i);
}
function om(i) {
  return typeof i == "number" ? F(i) : i != null && i !== "" && i !== !1;
}
const pu = "event";
function lm(i, e) {
  const t = new URL(i), s = new URL(e);
  if (t.origin !== s.origin)
    return i;
  const r = t.pathname.split("/").slice(1), n = s.pathname.split("/").slice(1, -1);
  for (; r[0] === n[0]; )
    r.shift(), n.shift();
  for (; n.length; )
    n.shift(), r.unshift("..");
  return r.join("/") + t.search + t.hash;
}
const Ks = (i) => Math.round(i), Pr = (i, e) => Array.isArray(i) ? i.map((t) => Pr(t, e)) : i instanceof ze && typeof i.value == "string" ? new ze(Pr(i.value, e), i.params) : (e.baseUrl && (i = lm(i, e.baseUrl)), e.version === 1 ? encodeURIComponent(i) : i), _s = (i) => Ks(i / 100) * 100, um = (i, e) => {
  let t = i;
  return e.version >= 2 && (i instanceof ze && typeof i.value == "string" ? t = new ze([i]) : typeof i == "string" && (t = [i])), Pr(t, e);
}, hm = {
  /**
   * Bitrate (kbps) rounded integer
   */
  br: Ks,
  /**
   * Duration (milliseconds) rounded integer
   */
  d: Ks,
  /**
   * Buffer Length (milliseconds) rounded nearest 100ms
   */
  bl: _s,
  /**
   * Deadline (milliseconds) rounded nearest 100ms
   */
  dl: _s,
  /**
   * Measured Throughput (kbps) rounded nearest 100kbps
   */
  mtp: _s,
  /**
   * Next Object Request URL encoded
   */
  nor: um,
  /**
   * Requested maximum throughput (kbps) rounded nearest 100kbps
   */
  rtp: _s,
  /**
   * Top Bitrate (kbps) rounded integer
   */
  tb: Ks
}, Eu = "request", yu = "response", yn = ["ab", "bg", "bl", "br", "bs", "bsd", "cdn", "cid", "cs", "df", "ec", "lab", "lb", "ltc", "msd", "mtp", "pb", "pr", "pt", "sf", "sid", "sn", "st", "sta", "tab", "tb", "tbl", "tpb", "ts", "v"], cm = ["e"], dm = /^[a-zA-Z0-9-.]+-[a-zA-Z0-9-.]+$/;
function yi(i) {
  return dm.test(i);
}
function fm(i) {
  return yn.includes(i) || cm.includes(i) || yi(i);
}
const vu = ["d", "dl", "nor", "ot", "rtp", "su"];
function gm(i) {
  return yn.includes(i) || vu.includes(i) || yi(i);
}
const mm = ["cmsdd", "cmsds", "rc", "smrt", "ttfb", "ttfbb", "ttlb", "url"];
function pm(i) {
  return yn.includes(i) || vu.includes(i) || mm.includes(i) || yi(i);
}
const Em = ["bl", "br", "bs", "cid", "d", "dl", "mtp", "nor", "nrr", "ot", "pr", "rtp", "sf", "sid", "st", "su", "tb", "v"];
function ym(i) {
  return Em.includes(i) || yi(i);
}
const vm = {
  [yu]: pm,
  [pu]: fm,
  [Eu]: gm
};
function Tu(i, e = {}) {
  const t = {};
  if (i == null || typeof i != "object")
    return t;
  const s = e.version || i.v || 1, r = e.reportingMode || Eu, n = s === 1 ? ym : vm[r];
  let a = Object.keys(i).filter(n);
  const o = e.filter;
  typeof o == "function" && (a = a.filter(o));
  const u = r === yu || r === pu;
  u && !a.includes("ts") && a.push("ts"), s > 1 && !a.includes("v") && a.push("v");
  const l = ae({}, hm, e.formatters), h = {
    version: s,
    reportingMode: r,
    baseUrl: e.baseUrl
  };
  return a.sort().forEach((c) => {
    let d = i[c];
    const g = l[c];
    if (typeof g == "function" && (d = g(d, h)), c === "v") {
      if (s === 1)
        return;
      d = s;
    }
    c == "pr" && d === 1 || (u && c === "ts" && !F(d) && (d = Date.now()), om(d) && (am(c) && typeof d == "string" && (d = new cu(d)), t[c] = d));
  }), t;
}
function Tm(i, e = {}) {
  const t = {};
  if (!i)
    return t;
  const s = Tu(i, e), r = nm(s, e?.customHeaderMap);
  return Object.entries(r).reduce((n, [a, o]) => {
    const u = mu(o, {
      whitespace: !1
    });
    return u && (n[a] = u), n;
  }, t);
}
function Sm(i, e, t) {
  return ae(i, Tm(e, t));
}
const xm = "CMCD";
function Am(i, e = {}) {
  return i ? mu(Tu(i, e), {
    whitespace: !1
  }) : "";
}
function Im(i, e = {}) {
  if (!i)
    return "";
  const t = Am(i, e);
  return encodeURIComponent(t);
}
function bm(i, e = {}) {
  if (!i)
    return "";
  const t = Im(i, e);
  return `${xm}=${t}`;
}
const Ja = /CMCD=[^&#]+/;
function Lm(i, e, t) {
  const s = bm(e, t);
  if (!s)
    return i;
  if (Ja.test(i))
    return i.replace(Ja, s);
  const r = i.includes("?") ? "&" : "?";
  return `${i}${r}${s}`;
}
class Rm {
  constructor(e) {
    this.hls = void 0, this.config = void 0, this.media = void 0, this.sid = void 0, this.cid = void 0, this.useHeaders = !1, this.includeKeys = void 0, this.initialized = !1, this.starved = !1, this.buffering = !0, this.audioBuffer = void 0, this.videoBuffer = void 0, this.onWaiting = () => {
      this.initialized && (this.starved = !0), this.buffering = !0;
    }, this.onPlaying = () => {
      this.initialized || (this.initialized = !0), this.buffering = !1;
    }, this.applyPlaylistData = (r) => {
      try {
        this.apply(r, {
          ot: Le.MANIFEST,
          su: !this.initialized
        });
      } catch (n) {
        this.hls.logger.warn("Could not generate manifest CMCD data.", n);
      }
    }, this.applyFragmentData = (r) => {
      try {
        const {
          frag: n,
          part: a
        } = r, o = this.hls.levels[n.level], u = this.getObjectType(n), l = {
          d: (a || n).duration * 1e3,
          ot: u
        };
        (u === Le.VIDEO || u === Le.AUDIO || u == Le.MUXED) && (l.br = o.bitrate / 1e3, l.tb = this.getTopBandwidth(u) / 1e3, l.bl = this.getBufferLength(u));
        const h = a ? this.getNextPart(a) : this.getNextFrag(n);
        h != null && h.url && h.url !== n.url && (l.nor = h.url), this.apply(r, l);
      } catch (n) {
        this.hls.logger.warn("Could not generate segment CMCD data.", n);
      }
    }, this.hls = e;
    const t = this.config = e.config, {
      cmcd: s
    } = t;
    s != null && (t.pLoader = this.createPlaylistLoader(), t.fLoader = this.createFragmentLoader(), this.sid = s.sessionId || e.sessionId, this.cid = s.contentId, this.useHeaders = s.useHeaders === !0, this.includeKeys = s.includeKeys, this.registerListeners());
  }
  registerListeners() {
    const e = this.hls;
    e.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(E.MEDIA_DETACHED, this.onMediaDetached, this), e.on(E.BUFFER_CREATED, this.onBufferCreated, this);
  }
  unregisterListeners() {
    const e = this.hls;
    e.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(E.MEDIA_DETACHED, this.onMediaDetached, this), e.off(E.BUFFER_CREATED, this.onBufferCreated, this);
  }
  destroy() {
    this.unregisterListeners(), this.onMediaDetached(), this.hls = this.config = this.audioBuffer = this.videoBuffer = null, this.onWaiting = this.onPlaying = this.media = null;
  }
  onMediaAttached(e, t) {
    this.media = t.media, this.media.addEventListener("waiting", this.onWaiting), this.media.addEventListener("playing", this.onPlaying);
  }
  onMediaDetached() {
    this.media && (this.media.removeEventListener("waiting", this.onWaiting), this.media.removeEventListener("playing", this.onPlaying), this.media = null);
  }
  onBufferCreated(e, t) {
    var s, r;
    this.audioBuffer = (s = t.tracks.audio) == null ? void 0 : s.buffer, this.videoBuffer = (r = t.tracks.video) == null ? void 0 : r.buffer;
  }
  /**
   * Create baseline CMCD data
   */
  createData() {
    var e;
    return {
      v: 1,
      sf: O0.HLS,
      sid: this.sid,
      cid: this.cid,
      pr: (e = this.media) == null ? void 0 : e.playbackRate,
      mtp: this.hls.bandwidthEstimate / 1e3
    };
  }
  /**
   * Apply CMCD data to a request.
   */
  apply(e, t = {}) {
    ae(t, this.createData());
    const s = t.ot === Le.INIT || t.ot === Le.VIDEO || t.ot === Le.MUXED;
    this.starved && s && (t.bs = !0, t.su = !0, this.starved = !1), t.su == null && (t.su = this.buffering);
    const {
      includeKeys: r
    } = this;
    r && (t = Object.keys(t).reduce((a, o) => (r.includes(o) && (a[o] = t[o]), a), {}));
    const n = {
      baseUrl: e.url
    };
    this.useHeaders ? (e.headers || (e.headers = {}), Sm(e.headers, t, n)) : e.url = Lm(e.url, t, n);
  }
  getNextFrag(e) {
    var t;
    const s = (t = this.hls.levels[e.level]) == null ? void 0 : t.details;
    if (s) {
      const r = e.sn - s.startSN;
      return s.fragments[r + 1];
    }
  }
  getNextPart(e) {
    var t;
    const {
      index: s,
      fragment: r
    } = e, n = (t = this.hls.levels[r.level]) == null || (t = t.details) == null ? void 0 : t.partList;
    if (n) {
      const {
        sn: a
      } = r;
      for (let o = n.length - 1; o >= 0; o--) {
        const u = n[o];
        if (u.index === s && u.fragment.sn === a)
          return n[o + 1];
      }
    }
  }
  /**
   * The CMCD object type.
   */
  getObjectType(e) {
    const {
      type: t
    } = e;
    if (t === "subtitle")
      return Le.TIMED_TEXT;
    if (e.sn === "initSegment")
      return Le.INIT;
    if (t === "audio")
      return Le.AUDIO;
    if (t === "main")
      return this.hls.audioTracks.length ? Le.VIDEO : Le.MUXED;
  }
  /**
   * Get the highest bitrate.
   */
  getTopBandwidth(e) {
    let t = 0, s;
    const r = this.hls;
    if (e === Le.AUDIO)
      s = r.audioTracks;
    else {
      const n = r.maxAutoLevel, a = n > -1 ? n + 1 : r.levels.length;
      s = r.levels.slice(0, a);
    }
    return s.forEach((n) => {
      n.bitrate > t && (t = n.bitrate);
    }), t > 0 ? t : NaN;
  }
  /**
   * Get the buffer length for a media type in milliseconds
   */
  getBufferLength(e) {
    const t = this.media, s = e === Le.AUDIO ? this.audioBuffer : this.videoBuffer;
    return !s || !t ? NaN : j.bufferInfo(s, t.currentTime, this.config.maxBufferHole).len * 1e3;
  }
  /**
   * Create a playlist loader
   */
  createPlaylistLoader() {
    const {
      pLoader: e
    } = this.config, t = this.applyPlaylistData, s = e || this.config.loader;
    return class {
      constructor(n) {
        this.loader = void 0, this.loader = new s(n);
      }
      get stats() {
        return this.loader.stats;
      }
      get context() {
        return this.loader.context;
      }
      destroy() {
        this.loader.destroy();
      }
      abort() {
        this.loader.abort();
      }
      load(n, a, o) {
        t(n), this.loader.load(n, a, o);
      }
    };
  }
  /**
   * Create a playlist loader
   */
  createFragmentLoader() {
    const {
      fLoader: e
    } = this.config, t = this.applyFragmentData, s = e || this.config.loader;
    return class {
      constructor(n) {
        this.loader = void 0, this.loader = new s(n);
      }
      get stats() {
        return this.loader.stats;
      }
      get context() {
        return this.loader.context;
      }
      destroy() {
        this.loader.destroy();
      }
      abort() {
        this.loader.abort();
      }
      load(n, a, o) {
        t(n), this.loader.load(n, a, o);
      }
    };
  }
}
const _m = 3e5;
class Dm extends Be {
  constructor(e) {
    super("content-steering", e.logger), this.hls = void 0, this.loader = null, this.uri = null, this.pathwayId = ".", this._pathwayPriority = null, this.timeToLoad = 300, this.reloadTimer = -1, this.updated = 0, this.started = !1, this.enabled = !0, this.levels = null, this.audioTracks = null, this.subtitleTracks = null, this.penalizedPathways = {}, this.hls = e, this.registerListeners();
  }
  registerListeners() {
    const e = this.hls;
    e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(E.MANIFEST_PARSED, this.onManifestParsed, this), e.on(E.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const e = this.hls;
    e && (e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(E.MANIFEST_PARSED, this.onManifestParsed, this), e.off(E.ERROR, this.onError, this));
  }
  pathways() {
    return (this.levels || []).reduce((e, t) => (e.indexOf(t.pathwayId) === -1 && e.push(t.pathwayId), e), []);
  }
  get pathwayPriority() {
    return this._pathwayPriority;
  }
  set pathwayPriority(e) {
    this.updatePathwayPriority(e);
  }
  startLoad() {
    if (this.started = !0, this.clearTimeout(), this.enabled && this.uri) {
      if (this.updated) {
        const e = this.timeToLoad * 1e3 - (performance.now() - this.updated);
        if (e > 0) {
          this.scheduleRefresh(this.uri, e);
          return;
        }
      }
      this.loadSteeringManifest(this.uri);
    }
  }
  stopLoad() {
    this.started = !1, this.loader && (this.loader.destroy(), this.loader = null), this.clearTimeout();
  }
  clearTimeout() {
    this.reloadTimer !== -1 && (self.clearTimeout(this.reloadTimer), this.reloadTimer = -1);
  }
  destroy() {
    this.unregisterListeners(), this.stopLoad(), this.hls = null, this.levels = this.audioTracks = this.subtitleTracks = null;
  }
  removeLevel(e) {
    const t = this.levels;
    t && (this.levels = t.filter((s) => s !== e));
  }
  onManifestLoading() {
    this.stopLoad(), this.enabled = !0, this.timeToLoad = 300, this.updated = 0, this.uri = null, this.pathwayId = ".", this.levels = this.audioTracks = this.subtitleTracks = null;
  }
  onManifestLoaded(e, t) {
    const {
      contentSteering: s
    } = t;
    s !== null && (this.pathwayId = s.pathwayId, this.uri = s.uri, this.started && this.startLoad());
  }
  onManifestParsed(e, t) {
    this.audioTracks = t.audioTracks, this.subtitleTracks = t.subtitleTracks;
  }
  onError(e, t) {
    const {
      errorAction: s
    } = t;
    if (s?.action === ve.SendAlternateToPenaltyBox && s.flags === Ce.MoveAllAlternatesMatchingHost) {
      const r = this.levels;
      let n = this._pathwayPriority, a = this.pathwayId;
      if (t.context) {
        const {
          groupId: o,
          pathwayId: u,
          type: l
        } = t.context;
        o && r ? a = this.getPathwayForGroupId(o, l, a) : u && (a = u);
      }
      a in this.penalizedPathways || (this.penalizedPathways[a] = performance.now()), !n && r && (n = this.pathways()), n && n.length > 1 && (this.updatePathwayPriority(n), s.resolved = this.pathwayId !== a), t.details === D.BUFFER_APPEND_ERROR && !t.fatal ? s.resolved = !0 : s.resolved || this.warn(`Could not resolve ${t.details} ("${t.error.message}") with content-steering for Pathway: ${a} levels: ${r && r.length} priorities: ${le(n)} penalized: ${le(this.penalizedPathways)}`);
    }
  }
  filterParsedLevels(e) {
    this.levels = e;
    let t = this.getLevelsForPathway(this.pathwayId);
    if (t.length === 0) {
      const s = e[0].pathwayId;
      this.log(`No levels found in Pathway ${this.pathwayId}. Setting initial Pathway to "${s}"`), t = this.getLevelsForPathway(s), this.pathwayId = s;
    }
    return t.length !== e.length && this.log(`Found ${t.length}/${e.length} levels in Pathway "${this.pathwayId}"`), t;
  }
  getLevelsForPathway(e) {
    return this.levels === null ? [] : this.levels.filter((t) => e === t.pathwayId);
  }
  updatePathwayPriority(e) {
    this._pathwayPriority = e;
    let t;
    const s = this.penalizedPathways, r = performance.now();
    Object.keys(s).forEach((n) => {
      r - s[n] > _m && delete s[n];
    });
    for (let n = 0; n < e.length; n++) {
      const a = e[n];
      if (a in s)
        continue;
      if (a === this.pathwayId)
        return;
      const o = this.hls.nextLoadLevel, u = this.hls.levels[o];
      if (t = this.getLevelsForPathway(a), t.length > 0) {
        this.log(`Setting Pathway to "${a}"`), this.pathwayId = a, $l(t), this.hls.trigger(E.LEVELS_UPDATED, {
          levels: t
        });
        const l = this.hls.levels[o];
        u && l && this.levels && (l.attrs["STABLE-VARIANT-ID"] !== u.attrs["STABLE-VARIANT-ID"] && l.bitrate !== u.bitrate && this.log(`Unstable Pathways change from bitrate ${u.bitrate} to ${l.bitrate}`), this.hls.nextLoadLevel = o);
        break;
      }
    }
  }
  getPathwayForGroupId(e, t, s) {
    const r = this.getLevelsForPathway(s).concat(this.levels || []);
    for (let n = 0; n < r.length; n++)
      if (t === Q.AUDIO_TRACK && r[n].hasAudioGroup(e) || t === Q.SUBTITLE_TRACK && r[n].hasSubtitleGroup(e))
        return r[n].pathwayId;
    return s;
  }
  clonePathways(e) {
    const t = this.levels;
    if (!t)
      return;
    const s = {}, r = {};
    e.forEach((n) => {
      const {
        ID: a,
        "BASE-ID": o,
        "URI-REPLACEMENT": u
      } = n;
      if (t.some((h) => h.pathwayId === a))
        return;
      const l = this.getLevelsForPathway(o).map((h) => {
        const c = new ce(h.attrs);
        c["PATHWAY-ID"] = a;
        const d = c.AUDIO && `${c.AUDIO}_clone_${a}`, g = c.SUBTITLES && `${c.SUBTITLES}_clone_${a}`;
        d && (s[c.AUDIO] = d, c.AUDIO = d), g && (r[c.SUBTITLES] = g, c.SUBTITLES = g);
        const f = Su(h.uri, c["STABLE-VARIANT-ID"], "PER-VARIANT-URIS", u), m = new us({
          attrs: c,
          audioCodec: h.audioCodec,
          bitrate: h.bitrate,
          height: h.height,
          name: h.name,
          url: f,
          videoCodec: h.videoCodec,
          width: h.width
        });
        if (h.audioGroups)
          for (let p = 1; p < h.audioGroups.length; p++)
            m.addGroupId("audio", `${h.audioGroups[p]}_clone_${a}`);
        if (h.subtitleGroups)
          for (let p = 1; p < h.subtitleGroups.length; p++)
            m.addGroupId("text", `${h.subtitleGroups[p]}_clone_${a}`);
        return m;
      });
      t.push(...l), eo(this.audioTracks, s, u, a), eo(this.subtitleTracks, r, u, a);
    });
  }
  loadSteeringManifest(e) {
    const t = this.hls.config, s = t.loader;
    this.loader && this.loader.destroy(), this.loader = new s(t);
    let r;
    try {
      r = new self.URL(e);
    } catch {
      this.enabled = !1, this.log(`Failed to parse Steering Manifest URI: ${e}`);
      return;
    }
    if (r.protocol !== "data:") {
      const h = (this.hls.bandwidthEstimate || t.abrEwmaDefaultEstimate) | 0;
      r.searchParams.set("_HLS_pathway", this.pathwayId), r.searchParams.set("_HLS_throughput", "" + h);
    }
    const n = {
      responseType: "json",
      url: r.href
    }, a = t.steeringManifestLoadPolicy.default, o = a.errorRetry || a.timeoutRetry || {}, u = {
      loadPolicy: a,
      timeout: a.maxLoadTimeMs,
      maxRetry: o.maxNumRetry || 0,
      retryDelay: o.retryDelayMs || 0,
      maxRetryDelay: o.maxRetryDelayMs || 0
    }, l = {
      onSuccess: (h, c, d, g) => {
        this.log(`Loaded steering manifest: "${r}"`);
        const f = h.data;
        if (f?.VERSION !== 1) {
          this.log(`Steering VERSION ${f.VERSION} not supported!`);
          return;
        }
        this.updated = performance.now(), this.timeToLoad = f.TTL;
        const {
          "RELOAD-URI": m,
          "PATHWAY-CLONES": p,
          "PATHWAY-PRIORITY": y
        } = f;
        if (m)
          try {
            this.uri = new self.URL(m, r).href;
          } catch {
            this.enabled = !1, this.log(`Failed to parse Steering Manifest RELOAD-URI: ${m}`);
            return;
          }
        this.scheduleRefresh(this.uri || d.url), p && this.clonePathways(p);
        const v = {
          steeringManifest: f,
          url: r.toString()
        };
        this.hls.trigger(E.STEERING_MANIFEST_LOADED, v), y && this.updatePathwayPriority(y);
      },
      onError: (h, c, d, g) => {
        if (this.log(`Error loading steering manifest: ${h.code} ${h.text} (${c.url})`), this.stopLoad(), h.code === 410) {
          this.enabled = !1, this.log(`Steering manifest ${c.url} no longer available`);
          return;
        }
        let f = this.timeToLoad * 1e3;
        if (h.code === 429) {
          const m = this.loader;
          if (typeof m?.getResponseHeader == "function") {
            const p = m.getResponseHeader("Retry-After");
            p && (f = parseFloat(p) * 1e3);
          }
          this.log(`Steering manifest ${c.url} rate limited`);
          return;
        }
        this.scheduleRefresh(this.uri || c.url, f);
      },
      onTimeout: (h, c, d) => {
        this.log(`Timeout loading steering manifest (${c.url})`), this.scheduleRefresh(this.uri || c.url);
      }
    };
    this.log(`Requesting steering manifest: ${r}`), this.loader.load(n, u, l);
  }
  scheduleRefresh(e, t = this.timeToLoad * 1e3) {
    this.clearTimeout(), this.reloadTimer = self.setTimeout(() => {
      var s;
      const r = (s = this.hls) == null ? void 0 : s.media;
      if (r && !r.ended) {
        this.loadSteeringManifest(e);
        return;
      }
      this.scheduleRefresh(e, this.timeToLoad * 1e3);
    }, t);
  }
}
function eo(i, e, t, s) {
  i && Object.keys(e).forEach((r) => {
    const n = i.filter((a) => a.groupId === r).map((a) => {
      const o = ae({}, a);
      return o.details = void 0, o.attrs = new ce(o.attrs), o.url = o.attrs.URI = Su(a.url, a.attrs["STABLE-RENDITION-ID"], "PER-RENDITION-URIS", t), o.groupId = o.attrs["GROUP-ID"] = e[r], o.attrs["PATHWAY-ID"] = s, o;
    });
    i.push(...n);
  });
}
function Su(i, e, t, s) {
  const {
    HOST: r,
    PARAMS: n,
    [t]: a
  } = s;
  let o;
  e && (o = a?.[e], o && (i = o));
  const u = new self.URL(i);
  return r && !o && (u.host = r), n && Object.keys(n).sort().forEach((l) => {
    l && u.searchParams.set(l, n[l]);
  }), u.href;
}
class Ut extends Be {
  constructor(e) {
    super("eme", e.logger), this.hls = void 0, this.config = void 0, this.media = null, this.mediaResolved = void 0, this.keyFormatPromise = null, this.keySystemAccessPromises = {}, this._requestLicenseFailureCount = 0, this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, this.mediaKeys = null, this.setMediaKeysQueue = Ut.CDMCleanupPromise ? [Ut.CDMCleanupPromise] : [], this.bannedKeyIds = {}, this.onMediaEncrypted = (t) => {
      const {
        initDataType: s,
        initData: r
      } = t, n = `"${t.type}" event: init data type: "${s}"`;
      if (this.debug(n), r !== null) {
        if (!this.keyFormatPromise) {
          let a = Object.keys(this.keySystemAccessPromises);
          a.length || (a = ss(this.config));
          const o = a.map(Ni).filter((u) => !!u);
          this.keyFormatPromise = this.getKeyFormatPromise(o);
        }
        this.keyFormatPromise.then((a) => {
          const o = Gs(a);
          if (s !== "sinf" || o !== de.FAIRPLAY) {
            this.log(`Ignoring "${t.type}" event with init data type: "${s}" for selected key-system ${o}`);
            return;
          }
          let u;
          try {
            const g = me(new Uint8Array(r)), f = an(JSON.parse(g).sinf), m = ml(f);
            if (!m)
              throw new Error("'schm' box missing or not cbcs/cenc with schi > tenc");
            u = new Uint8Array(m.subarray(8, 24));
          } catch (g) {
            this.warn(`${n} Failed to parse sinf: ${g}`);
            return;
          }
          const l = Te(u), {
            keyIdToKeySessionPromise: h,
            mediaKeySessions: c
          } = this;
          let d = h[l];
          for (let g = 0; g < c.length; g++) {
            const f = c[g], m = f.decryptdata;
            if (!m.keyId)
              continue;
            const p = Te(m.keyId);
            if (ri(u, m.keyId) || m.uri.replace(/-/g, "").indexOf(l) !== -1) {
              if (d = h[p], !d)
                continue;
              if (m.pssh)
                break;
              delete h[p], m.pssh = new Uint8Array(r), m.keyId = u, d = h[l] = d.then(() => this.generateRequestWithPreferredKeySession(f, s, r, "encrypted-event-key-match")), d.catch((y) => this.handleError(y));
              break;
            }
          }
          d || this.handleError(new Error(`Key ID ${l} not encountered in playlist. Key-system sessions ${c.length}.`));
        }).catch((a) => this.handleError(a));
      }
    }, this.onWaitingForKey = (t) => {
      this.log(`"${t.type}" event`);
    }, this.hls = e, this.config = e.config, this.registerListeners();
  }
  destroy() {
    this.onDestroying(), this.onMediaDetached();
    const e = this.config;
    e.requestMediaKeySystemAccessFunc = null, e.licenseXhrSetup = e.licenseResponseCallback = void 0, e.drmSystems = e.drmSystemOptions = {}, this.hls = this.config = this.keyIdToKeySessionPromise = null, this.onMediaEncrypted = this.onWaitingForKey = null;
  }
  registerListeners() {
    this.hls.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(E.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(E.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(E.MANIFEST_LOADED, this.onManifestLoaded, this), this.hls.on(E.DESTROYING, this.onDestroying, this);
  }
  unregisterListeners() {
    this.hls.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(E.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(E.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.off(E.MANIFEST_LOADED, this.onManifestLoaded, this), this.hls.off(E.DESTROYING, this.onDestroying, this);
  }
  getLicenseServerUrl(e) {
    const {
      drmSystems: t,
      widevineLicenseUrl: s
    } = this.config, r = t?.[e];
    if (r)
      return r.licenseUrl;
    if (e === de.WIDEVINE && s)
      return s;
  }
  getLicenseServerUrlOrThrow(e) {
    const t = this.getLicenseServerUrl(e);
    if (t === void 0)
      throw new Error(`no license server URL configured for key-system "${e}"`);
    return t;
  }
  getServerCertificateUrl(e) {
    const {
      drmSystems: t
    } = this.config, s = t?.[e];
    if (s)
      return s.serverCertificateUrl;
    this.log(`No Server Certificate in config.drmSystems["${e}"]`);
  }
  attemptKeySystemAccess(e) {
    const t = this.hls.levels, s = (a, o, u) => !!a && u.indexOf(a) === o, r = t.map((a) => a.audioCodec).filter(s), n = t.map((a) => a.videoCodec).filter(s);
    return r.length + n.length === 0 && n.push("avc1.42e01e"), new Promise((a, o) => {
      const u = (l) => {
        const h = l.shift();
        this.getMediaKeysPromise(h, r, n).then((c) => a({
          keySystem: h,
          mediaKeys: c
        })).catch((c) => {
          l.length ? u(l) : c instanceof _e ? o(c) : o(new _e({
            type: V.KEY_SYSTEM_ERROR,
            details: D.KEY_SYSTEM_NO_ACCESS,
            error: c,
            fatal: !0
          }, c.message));
        });
      };
      u(e);
    });
  }
  requestMediaKeySystemAccess(e, t) {
    const {
      requestMediaKeySystemAccessFunc: s
    } = this.config;
    if (typeof s != "function") {
      let r = `Configured requestMediaKeySystemAccess is not a function ${s}`;
      return kl === null && self.location.protocol === "http:" && (r = `navigator.requestMediaKeySystemAccess is not available over insecure protocol ${location.protocol}`), Promise.reject(new Error(r));
    }
    return s(e, t);
  }
  getMediaKeysPromise(e, t, s) {
    var r;
    const n = ug(e, t, s, this.config.drmSystemOptions || {});
    let a = this.keySystemAccessPromises[e], o = (r = a) == null ? void 0 : r.keySystemAccess;
    if (!o) {
      this.log(`Requesting encrypted media "${e}" key-system access with config: ${le(n)}`), o = this.requestMediaKeySystemAccess(e, n);
      const u = a = this.keySystemAccessPromises[e] = {
        keySystemAccess: o
      };
      return o.catch((l) => {
        this.log(`Failed to obtain access to key-system "${e}": ${l}`);
      }), o.then((l) => {
        this.log(`Access for key-system "${l.keySystem}" obtained`);
        const h = this.fetchServerCertificate(e);
        this.log(`Create media-keys for "${e}"`);
        const c = u.mediaKeys = l.createMediaKeys().then((d) => (this.log(`Media-keys created for "${e}"`), u.hasMediaKeys = !0, h.then((g) => g ? this.setMediaKeysServerCertificate(d, e, g) : d)));
        return c.catch((d) => {
          this.error(`Failed to create media-keys for "${e}"}: ${d}`);
        }), c;
      });
    }
    return o.then(() => a.mediaKeys);
  }
  createMediaKeySessionContext({
    decryptdata: e,
    keySystem: t,
    mediaKeys: s
  }) {
    this.log(`Creating key-system session "${t}" keyId: ${Te(e.keyId || [])} keyUri: ${e.uri}`);
    const r = s.createSession(), n = {
      decryptdata: e,
      keySystem: t,
      mediaKeys: s,
      mediaKeysSession: r,
      keyStatus: "status-pending"
    };
    return this.mediaKeySessions.push(n), n;
  }
  renewKeySession(e) {
    const t = e.decryptdata;
    if (t.pssh) {
      const s = this.createMediaKeySessionContext(e), r = Ds(t), n = "cenc";
      this.keyIdToKeySessionPromise[r] = this.generateRequestWithPreferredKeySession(s, n, t.pssh.buffer, "expired");
    } else
      this.warn("Could not renew expired session. Missing pssh initData.");
    this.removeSession(e);
  }
  updateKeySession(e, t) {
    const s = e.mediaKeysSession;
    return this.log(`Updating key-session "${s.sessionId}" for keyId ${Te(e.decryptdata.keyId || [])}
      } (data length: ${t.byteLength})`), s.update(t);
  }
  getSelectedKeySystemFormats() {
    return Object.keys(this.keySystemAccessPromises).map((e) => ({
      keySystem: e,
      hasMediaKeys: this.keySystemAccessPromises[e].hasMediaKeys
    })).filter(({
      hasMediaKeys: e
    }) => !!e).map(({
      keySystem: e
    }) => Ni(e)).filter((e) => !!e);
  }
  getKeySystemAccess(e) {
    return this.getKeySystemSelectionPromise(e).then(({
      keySystem: t,
      mediaKeys: s
    }) => this.attemptSetMediaKeys(t, s));
  }
  selectKeySystem(e) {
    return new Promise((t, s) => {
      this.getKeySystemSelectionPromise(e).then(({
        keySystem: r
      }) => {
        const n = Ni(r);
        n ? t(n) : s(new Error(`Unable to find format for key-system "${r}"`));
      }).catch(s);
    });
  }
  selectKeySystemFormat(e) {
    const t = Object.keys(e.levelkeys || {});
    return this.keyFormatPromise || (this.log(`Selecting key-system from fragment (sn: ${e.sn} ${e.type}: ${e.level}) key formats ${t.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(t)), this.keyFormatPromise;
  }
  getKeyFormatPromise(e) {
    const t = ss(this.config), s = e.map(Gs).filter((r) => !!r && t.indexOf(r) !== -1);
    return this.selectKeySystem(s);
  }
  getKeyStatus(e) {
    const {
      mediaKeySessions: t
    } = this;
    for (let s = 0; s < t.length; s++) {
      const r = Cm(e, t[s]);
      if (r)
        return r;
    }
  }
  loadKey(e) {
    const t = e.keyInfo.decryptdata, s = Ds(t), r = this.bannedKeyIds[s];
    if (r || this.getKeyStatus(t) === "internal-error") {
      const o = to(r || "internal-error", t);
      return this.handleError(o, e.frag), Promise.reject(o);
    }
    const n = `(keyId: ${s} format: "${t.keyFormat}" method: ${t.method} uri: ${t.uri})`;
    this.log(`Starting session for key ${n}`);
    const a = this.keyIdToKeySessionPromise[s];
    if (!a) {
      const o = this.getKeySystemForKeyPromise(t).then(({
        keySystem: u,
        mediaKeys: l
      }) => (this.throwIfDestroyed(), this.log(`Handle encrypted media sn: ${e.frag.sn} ${e.frag.type}: ${e.frag.level} using key ${n}`), this.attemptSetMediaKeys(u, l).then(() => (this.throwIfDestroyed(), this.createMediaKeySessionContext({
        keySystem: u,
        mediaKeys: l,
        decryptdata: t
      }))))).then((u) => {
        const l = "cenc", h = t.pssh ? t.pssh.buffer : null;
        return this.generateRequestWithPreferredKeySession(u, l, h, "playlist-key");
      });
      return o.catch((u) => this.handleError(u, e.frag)), this.keyIdToKeySessionPromise[s] = o, o;
    }
    return a.catch((o) => {
      if (o instanceof _e) {
        const u = re({}, o.data);
        this.getKeyStatus(t) === "internal-error" && (u.decryptdata = t);
        const l = new _e(u, o.message);
        this.handleError(l, e.frag);
      }
    }), a;
  }
  throwIfDestroyed(e = "Invalid state") {
    if (!this.hls)
      throw new Error("invalid state");
  }
  handleError(e, t) {
    if (this.hls)
      if (e instanceof _e) {
        t && (e.data.frag = t);
        const s = e.data.decryptdata;
        this.error(`${e.message}${s ? ` (${Te(s.keyId || [])})` : ""}`), this.hls.trigger(E.ERROR, e.data);
      } else
        this.error(e.message), this.hls.trigger(E.ERROR, {
          type: V.KEY_SYSTEM_ERROR,
          details: D.KEY_SYSTEM_NO_KEYS,
          error: e,
          fatal: !0
        });
  }
  getKeySystemForKeyPromise(e) {
    const t = Ds(e), s = this.keyIdToKeySessionPromise[t];
    if (!s) {
      const r = Gs(e.keyFormat), n = r ? [r] : ss(this.config);
      return this.attemptKeySystemAccess(n);
    }
    return s;
  }
  getKeySystemSelectionPromise(e) {
    if (e.length || (e = ss(this.config)), e.length === 0)
      throw new _e({
        type: V.KEY_SYSTEM_ERROR,
        details: D.KEY_SYSTEM_NO_CONFIGURED_LICENSE,
        fatal: !0
      }, `Missing key-system license configuration options ${le({
        drmSystems: this.config.drmSystems
      })}`);
    return this.attemptKeySystemAccess(e);
  }
  attemptSetMediaKeys(e, t) {
    if (this.mediaResolved = void 0, this.mediaKeys === t)
      return Promise.resolve();
    const s = this.setMediaKeysQueue.slice();
    this.log(`Setting media-keys for "${e}"`);
    const r = Promise.all(s).then(() => this.media ? this.media.setMediaKeys(t) : new Promise((n, a) => {
      this.mediaResolved = () => {
        if (this.mediaResolved = void 0, !this.media)
          return a(new Error("Attempted to set mediaKeys without media element attached"));
        this.mediaKeys = t, this.media.setMediaKeys(t).then(n).catch(a);
      };
    }));
    return this.mediaKeys = t, this.setMediaKeysQueue.push(r), r.then(() => {
      this.log(`Media-keys set for "${e}"`), s.push(r), this.setMediaKeysQueue = this.setMediaKeysQueue.filter((n) => s.indexOf(n) === -1);
    });
  }
  generateRequestWithPreferredKeySession(e, t, s, r) {
    var n;
    const a = (n = this.config.drmSystems) == null || (n = n[e.keySystem]) == null ? void 0 : n.generateRequest;
    if (a)
      try {
        const f = a.call(this.hls, t, s, e);
        if (!f)
          throw new Error("Invalid response from configured generateRequest filter");
        t = f.initDataType, s = f.initData ? f.initData : null, e.decryptdata.pssh = s ? new Uint8Array(s) : null;
      } catch (f) {
        if (this.warn(f.message), this.hls && this.hls.config.debug)
          throw f;
      }
    if (s === null)
      return this.log(`Skipping key-session request for "${r}" (no initData)`), Promise.resolve(e);
    const o = Ds(e.decryptdata), u = e.decryptdata.uri;
    this.log(`Generating key-session request for "${r}" keyId: ${o} URI: ${u} (init data type: ${t} length: ${s.byteLength})`);
    const l = new ln(), h = e._onmessage = (f) => {
      const m = e.mediaKeysSession;
      if (!m) {
        l.emit("error", new Error("invalid state"));
        return;
      }
      const {
        messageType: p,
        message: y
      } = f;
      this.log(`"${p}" message event for session "${m.sessionId}" message size: ${y.byteLength}`), p === "license-request" || p === "license-renewal" ? this.renewLicense(e, y).catch((v) => {
        l.eventNames().length ? l.emit("error", v) : this.handleError(v);
      }) : p === "license-release" ? e.keySystem === de.FAIRPLAY && this.updateKeySession(e, Ar("acknowledged")).then(() => this.removeSession(e)).catch((v) => this.handleError(v)) : this.warn(`unhandled media key message type "${p}"`);
    }, c = (f, m) => {
      m.keyStatus = f;
      let p;
      f.startsWith("usable") ? l.emit("resolved") : f === "internal-error" || f === "output-restricted" || f === "output-downscaled" ? p = to(f, m.decryptdata) : f === "expired" ? p = new Error(`key expired (keyId: ${o})`) : f === "released" ? p = new Error("key released") : f === "status-pending" || this.warn(`unhandled key status change "${f}" (keyId: ${o})`), p && (l.eventNames().length ? l.emit("error", p) : this.handleError(p));
    }, d = e._onkeystatuseschange = (f) => {
      if (!e.mediaKeysSession) {
        l.emit("error", new Error("invalid state"));
        return;
      }
      const p = this.getKeyStatuses(e);
      if (!Object.keys(p).some((S) => p[S] !== "status-pending"))
        return;
      if (p[o] === "expired") {
        this.log(`Expired key ${le(p)} in key-session "${e.mediaKeysSession.sessionId}"`), this.renewKeySession(e);
        return;
      }
      let v = p[o];
      if (v)
        c(v, e);
      else {
        var T;
        e.keyStatusTimeouts || (e.keyStatusTimeouts = {}), (T = e.keyStatusTimeouts)[o] || (T[o] = self.setTimeout(() => {
          if (!e.mediaKeysSession || !this.mediaKeys)
            return;
          const x = this.getKeyStatus(e.decryptdata);
          if (x && x !== "status-pending")
            return this.log(`No status for keyId ${o} in key-session "${e.mediaKeysSession.sessionId}". Using session key-status ${x} from other session.`), c(x, e);
          this.log(`key status for ${o} in key-session "${e.mediaKeysSession.sessionId}" timed out after 1000ms`), v = "internal-error", c(v, e);
        }, 1e3)), this.log(`No status for keyId ${o} (${le(p)}).`);
      }
    };
    be(e.mediaKeysSession, "message", h), be(e.mediaKeysSession, "keystatuseschange", d);
    const g = new Promise((f, m) => {
      l.on("error", m), l.on("resolved", f);
    });
    return e.mediaKeysSession.generateRequest(t, s).then(() => {
      this.log(`Request generated for key-session "${e.mediaKeysSession.sessionId}" keyId: ${o} URI: ${u}`);
    }).catch((f) => {
      throw new _e({
        type: V.KEY_SYSTEM_ERROR,
        details: D.KEY_SYSTEM_NO_SESSION,
        error: f,
        decryptdata: e.decryptdata,
        fatal: !1
      }, `Error generating key-session request: ${f}`);
    }).then(() => g).catch((f) => (l.removeAllListeners(), this.removeSession(e).then(() => {
      throw f;
    }))).then(() => (l.removeAllListeners(), e));
  }
  getKeyStatuses(e) {
    const t = {};
    return e.mediaKeysSession.keyStatuses.forEach((s, r) => {
      if (typeof r == "string" && typeof s == "object") {
        const o = r;
        r = s, s = o;
      }
      const n = "buffer" in r ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : new Uint8Array(r);
      if (e.keySystem === de.PLAYREADY && n.length === 16) {
        const o = Te(n);
        t[o] = s, Cl(n);
      }
      const a = Te(n);
      s === "internal-error" && (this.bannedKeyIds[a] = s), this.log(`key status change "${s}" for keyStatuses keyId: ${a} key-session "${e.mediaKeysSession.sessionId}"`), t[a] = s;
    }), t;
  }
  fetchServerCertificate(e) {
    const t = this.config, s = t.loader, r = new s(t), n = this.getServerCertificateUrl(e);
    return n ? (this.log(`Fetching server certificate for "${e}"`), new Promise((a, o) => {
      const u = {
        responseType: "arraybuffer",
        url: n
      }, l = t.certLoadPolicy.default, h = {
        loadPolicy: l,
        timeout: l.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0
      }, c = {
        onSuccess: (d, g, f, m) => {
          a(d.data);
        },
        onError: (d, g, f, m) => {
          o(new _e({
            type: V.KEY_SYSTEM_ERROR,
            details: D.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
            fatal: !0,
            networkDetails: f,
            response: re({
              url: u.url,
              data: void 0
            }, d)
          }, `"${e}" certificate request failed (${n}). Status: ${d.code} (${d.text})`));
        },
        onTimeout: (d, g, f) => {
          o(new _e({
            type: V.KEY_SYSTEM_ERROR,
            details: D.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
            fatal: !0,
            networkDetails: f,
            response: {
              url: u.url,
              data: void 0
            }
          }, `"${e}" certificate request timed out (${n})`));
        },
        onAbort: (d, g, f) => {
          o(new Error("aborted"));
        }
      };
      r.load(u, h, c);
    })) : Promise.resolve();
  }
  setMediaKeysServerCertificate(e, t, s) {
    return new Promise((r, n) => {
      e.setServerCertificate(s).then((a) => {
        this.log(`setServerCertificate ${a ? "success" : "not supported by CDM"} (${s.byteLength}) on "${t}"`), r(e);
      }).catch((a) => {
        n(new _e({
          type: V.KEY_SYSTEM_ERROR,
          details: D.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED,
          error: a,
          fatal: !0
        }, a.message));
      });
    });
  }
  renewLicense(e, t) {
    return this.requestLicense(e, new Uint8Array(t)).then((s) => this.updateKeySession(e, new Uint8Array(s)).catch((r) => {
      throw new _e({
        type: V.KEY_SYSTEM_ERROR,
        details: D.KEY_SYSTEM_SESSION_UPDATE_FAILED,
        decryptdata: e.decryptdata,
        error: r,
        fatal: !1
      }, r.message);
    }));
  }
  unpackPlayReadyKeyMessage(e, t) {
    const s = String.fromCharCode.apply(null, new Uint16Array(t.buffer));
    if (!s.includes("PlayReadyKeyMessage"))
      return e.setRequestHeader("Content-Type", "text/xml; charset=utf-8"), t;
    const r = new DOMParser().parseFromString(s, "application/xml"), n = r.querySelectorAll("HttpHeader");
    if (n.length > 0) {
      let h;
      for (let c = 0, d = n.length; c < d; c++) {
        var a, o;
        h = n[c];
        const g = (a = h.querySelector("name")) == null ? void 0 : a.textContent, f = (o = h.querySelector("value")) == null ? void 0 : o.textContent;
        g && f && e.setRequestHeader(g, f);
      }
    }
    const u = r.querySelector("Challenge"), l = u?.textContent;
    if (!l)
      throw new Error("Cannot find <Challenge> in key message");
    return Ar(atob(l));
  }
  setupLicenseXHR(e, t, s, r) {
    const n = this.config.licenseXhrSetup;
    return n ? Promise.resolve().then(() => {
      if (!s.decryptdata)
        throw new Error("Key removed");
      return n.call(this.hls, e, t, s, r);
    }).catch((a) => {
      if (!s.decryptdata)
        throw a;
      return e.open("POST", t, !0), n.call(this.hls, e, t, s, r);
    }).then((a) => (e.readyState || e.open("POST", t, !0), {
      xhr: e,
      licenseChallenge: a || r
    })) : (e.open("POST", t, !0), Promise.resolve({
      xhr: e,
      licenseChallenge: r
    }));
  }
  requestLicense(e, t) {
    const s = this.config.keyLoadPolicy.default;
    return new Promise((r, n) => {
      const a = this.getLicenseServerUrlOrThrow(e.keySystem);
      this.log(`Sending license request to URL: ${a}`);
      const o = new XMLHttpRequest();
      o.responseType = "arraybuffer", o.onreadystatechange = () => {
        if (!this.hls || !e.mediaKeysSession)
          return n(new Error("invalid state"));
        if (o.readyState === 4)
          if (o.status === 200) {
            this._requestLicenseFailureCount = 0;
            let u = o.response;
            this.log(`License received ${u instanceof ArrayBuffer ? u.byteLength : u}`);
            const l = this.config.licenseResponseCallback;
            if (l)
              try {
                u = l.call(this.hls, o, a, e);
              } catch (h) {
                this.error(h);
              }
            r(u);
          } else {
            const u = s.errorRetry, l = u ? u.maxNumRetry : 0;
            if (this._requestLicenseFailureCount++, this._requestLicenseFailureCount > l || o.status >= 400 && o.status < 500)
              n(new _e({
                type: V.KEY_SYSTEM_ERROR,
                details: D.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                decryptdata: e.decryptdata,
                fatal: !0,
                networkDetails: o,
                response: {
                  url: a,
                  data: void 0,
                  code: o.status,
                  text: o.statusText
                }
              }, `License Request XHR failed (${a}). Status: ${o.status} (${o.statusText})`));
            else {
              const h = l - this._requestLicenseFailureCount + 1;
              this.warn(`Retrying license request, ${h} attempts left`), this.requestLicense(e, t).then(r, n);
            }
          }
      }, e.licenseXhr && e.licenseXhr.readyState !== XMLHttpRequest.DONE && e.licenseXhr.abort(), e.licenseXhr = o, this.setupLicenseXHR(o, a, e, t).then(({
        xhr: u,
        licenseChallenge: l
      }) => {
        e.keySystem == de.PLAYREADY && (l = this.unpackPlayReadyKeyMessage(u, l)), u.send(l);
      }).catch(n);
    });
  }
  onDestroying() {
    this.unregisterListeners(), this._clear();
  }
  onMediaAttached(e, t) {
    if (!this.config.emeEnabled)
      return;
    const s = t.media;
    this.media = s, be(s, "encrypted", this.onMediaEncrypted), be(s, "waitingforkey", this.onWaitingForKey);
    const r = this.mediaResolved;
    r ? r() : this.mediaKeys = s.mediaKeys;
  }
  onMediaDetached() {
    const e = this.media;
    e && (Re(e, "encrypted", this.onMediaEncrypted), Re(e, "waitingforkey", this.onWaitingForKey), this.media = null, this.mediaKeys = null);
  }
  _clear() {
    var e;
    this._requestLicenseFailureCount = 0, this.keyIdToKeySessionPromise = {}, this.bannedKeyIds = {};
    const t = this.mediaResolved;
    if (t && t(), !this.mediaKeys && !this.mediaKeySessions.length)
      return;
    const s = this.media, r = this.mediaKeySessions.slice();
    this.mediaKeySessions = [], this.mediaKeys = null, ht.clearKeyUriToKeyIdMap();
    const n = r.length;
    Ut.CDMCleanupPromise = Promise.all(r.map((a) => this.removeSession(a)).concat((s == null || (e = s.setMediaKeys(null)) == null ? void 0 : e.catch((a) => {
      this.log(`Could not clear media keys: ${a}`), this.hls && this.hls.trigger(E.ERROR, {
        type: V.OTHER_ERROR,
        details: D.KEY_SYSTEM_DESTROY_MEDIA_KEYS_ERROR,
        fatal: !1,
        error: new Error(`Could not clear media keys: ${a}`)
      });
    })) || Promise.resolve())).catch((a) => {
      this.log(`Could not close sessions and clear media keys: ${a}`), this.hls && this.hls.trigger(E.ERROR, {
        type: V.OTHER_ERROR,
        details: D.KEY_SYSTEM_DESTROY_CLOSE_SESSION_ERROR,
        fatal: !1,
        error: new Error(`Could not close sessions and clear media keys: ${a}`)
      });
    }).then(() => {
      n && this.log("finished closing key sessions and clearing media keys");
    });
  }
  onManifestLoading() {
    this._clear();
  }
  onManifestLoaded(e, {
    sessionKeys: t
  }) {
    if (!(!t || !this.config.emeEnabled) && !this.keyFormatPromise) {
      const s = t.reduce((r, n) => (r.indexOf(n.keyFormat) === -1 && r.push(n.keyFormat), r), []);
      this.log(`Selecting key-system from session-keys ${s.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(s);
    }
  }
  removeSession(e) {
    const {
      mediaKeysSession: t,
      licenseXhr: s,
      decryptdata: r
    } = e;
    if (t) {
      this.log(`Remove licenses and keys and close session "${t.sessionId}" keyId: ${Te(r?.keyId || [])}`), e._onmessage && (t.removeEventListener("message", e._onmessage), e._onmessage = void 0), e._onkeystatuseschange && (t.removeEventListener("keystatuseschange", e._onkeystatuseschange), e._onkeystatuseschange = void 0), s && s.readyState !== XMLHttpRequest.DONE && s.abort(), e.mediaKeysSession = e.decryptdata = e.licenseXhr = void 0;
      const n = this.mediaKeySessions.indexOf(e);
      n > -1 && this.mediaKeySessions.splice(n, 1);
      const {
        keyStatusTimeouts: a
      } = e;
      a && Object.keys(a).forEach((l) => self.clearTimeout(a[l]));
      const {
        drmSystemOptions: o
      } = this.config;
      return (cg(o) ? new Promise((l, h) => {
        self.setTimeout(() => h(new Error("MediaKeySession.remove() timeout")), 8e3), t.remove().then(l).catch(h);
      }) : Promise.resolve()).catch((l) => {
        this.log(`Could not remove session: ${l}`), this.hls && this.hls.trigger(E.ERROR, {
          type: V.OTHER_ERROR,
          details: D.KEY_SYSTEM_DESTROY_REMOVE_SESSION_ERROR,
          fatal: !1,
          error: new Error(`Could not remove session: ${l}`)
        });
      }).then(() => t.close()).catch((l) => {
        this.log(`Could not close session: ${l}`), this.hls && this.hls.trigger(E.ERROR, {
          type: V.OTHER_ERROR,
          details: D.KEY_SYSTEM_DESTROY_CLOSE_SESSION_ERROR,
          fatal: !1,
          error: new Error(`Could not close session: ${l}`)
        });
      });
    }
    return Promise.resolve();
  }
}
Ut.CDMCleanupPromise = void 0;
function Ds(i) {
  if (!i)
    throw new Error("Could not read keyId of undefined decryptdata");
  if (i.keyId === null)
    throw new Error("keyId is null");
  return Te(i.keyId);
}
function Cm(i, e) {
  if (i.keyId && e.mediaKeysSession.keyStatuses.has(i.keyId))
    return e.mediaKeysSession.keyStatuses.get(i.keyId);
  if (i.matches(e.decryptdata))
    return e.keyStatus;
}
class _e extends Error {
  constructor(e, t) {
    super(t), this.data = void 0, e.error || (e.error = new Error(t)), this.data = e, e.err = e.error;
  }
}
function to(i, e) {
  const t = i === "output-restricted", s = t ? D.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED : D.KEY_SYSTEM_STATUS_INTERNAL_ERROR;
  return new _e({
    type: V.KEY_SYSTEM_ERROR,
    details: s,
    fatal: !1,
    decryptdata: e
  }, t ? "HDCP level output restricted" : `key status changed to "${i}"`);
}
class Pm {
  constructor(e) {
    this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = e, this.registerListeners();
  }
  setStreamController(e) {
    this.streamController = e;
  }
  registerListeners() {
    this.hls.on(E.MEDIA_ATTACHING, this.onMediaAttaching, this), this.hls.on(E.MEDIA_DETACHING, this.onMediaDetaching, this);
  }
  unregisterListeners() {
    this.hls.off(E.MEDIA_ATTACHING, this.onMediaAttaching, this), this.hls.off(E.MEDIA_DETACHING, this.onMediaDetaching, this);
  }
  destroy() {
    this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null;
  }
  onMediaAttaching(e, t) {
    const s = this.hls.config;
    if (s.capLevelOnFPSDrop) {
      const r = t.media instanceof self.HTMLVideoElement ? t.media : null;
      this.media = r, r && typeof r.getVideoPlaybackQuality == "function" && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), s.fpsDroppedMonitoringPeriod);
    }
  }
  onMediaDetaching() {
    this.media = null;
  }
  checkFPS(e, t, s) {
    const r = performance.now();
    if (t) {
      if (this.lastTime) {
        const n = r - this.lastTime, a = s - this.lastDroppedFrames, o = t - this.lastDecodedFrames, u = 1e3 * a / n, l = this.hls;
        if (l.trigger(E.FPS_DROP, {
          currentDropped: a,
          currentDecoded: o,
          totalDroppedFrames: s
        }), u > 0 && a > l.config.fpsDroppedMonitoringThreshold * o) {
          let h = l.currentLevel;
          l.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + h), h > 0 && (l.autoLevelCapping === -1 || l.autoLevelCapping >= h) && (h = h - 1, l.trigger(E.FPS_DROP_LEVEL_CAPPING, {
            level: h,
            droppedLevel: l.currentLevel
          }), l.autoLevelCapping = h, this.streamController.nextLevelSwitch());
        }
      }
      this.lastTime = r, this.lastDroppedFrames = s, this.lastDecodedFrames = t;
    }
  }
  checkFPSInterval() {
    const e = this.media;
    if (e)
      if (this.isVideoPlaybackQualityAvailable) {
        const t = e.getVideoPlaybackQuality();
        this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames);
      } else
        this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount);
  }
}
function xu(i, e) {
  let t;
  try {
    t = new Event("addtrack");
  } catch {
    t = document.createEvent("Event"), t.initEvent("addtrack", !1, !1);
  }
  t.track = i, e.dispatchEvent(t);
}
function Au(i, e) {
  const t = i.mode;
  if (t === "disabled" && (i.mode = "hidden"), i.cues && !i.cues.getCueById(e.id))
    try {
      if (i.addCue(e), !i.cues.getCueById(e.id))
        throw new Error(`addCue is failed for: ${e}`);
    } catch (s) {
      ne.debug(`[texttrack-utils]: ${s}`);
      try {
        const r = new self.TextTrackCue(e.startTime, e.endTime, e.text);
        r.id = e.id, i.addCue(r);
      } catch (r) {
        ne.debug(`[texttrack-utils]: Legacy TextTrackCue fallback failed: ${r}`);
      }
    }
  t === "disabled" && (i.mode = t);
}
function Mt(i, e) {
  const t = i.mode;
  if (t === "disabled" && (i.mode = "hidden"), i.cues)
    for (let s = i.cues.length; s--; )
      e && i.cues[s].removeEventListener("enter", e), i.removeCue(i.cues[s]);
  t === "disabled" && (i.mode = t);
}
function kr(i, e, t, s) {
  const r = i.mode;
  if (r === "disabled" && (i.mode = "hidden"), i.cues && i.cues.length > 0) {
    const n = wm(i.cues, e, t);
    for (let a = 0; a < n.length; a++)
      (!s || s(n[a])) && i.removeCue(n[a]);
  }
  r === "disabled" && (i.mode = r);
}
function km(i, e) {
  if (e <= i[0].startTime)
    return 0;
  const t = i.length - 1;
  if (e > i[t].endTime)
    return -1;
  let s = 0, r = t, n;
  for (; s <= r; )
    if (n = Math.floor((r + s) / 2), e < i[n].startTime)
      r = n - 1;
    else if (e > i[n].startTime && s < t)
      s = n + 1;
    else
      return n;
  return i[s].startTime - e < e - i[r].startTime ? s : r;
}
function wm(i, e, t) {
  const s = [], r = km(i, e);
  if (r > -1)
    for (let n = r, a = i.length; n < a; n++) {
      const o = i[n];
      if (o.startTime >= e && o.endTime <= t)
        s.push(o);
      else if (o.startTime > t)
        return s;
    }
  return s;
}
function Ws(i) {
  const e = [];
  for (let t = 0; t < i.length; t++) {
    const s = i[t];
    (s.kind === "subtitles" || s.kind === "captions") && s.label && e.push(i[t]);
  }
  return e;
}
class Om extends mn {
  constructor(e) {
    super(e, "subtitle-track-controller"), this.media = null, this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0, this.queuedDefaultTrack = -1, this.useTextTrackPolling = !1, this.subtitlePollingInterval = -1, this._subtitleDisplay = !0, this.asyncPollTrackChange = () => this.pollTrackChange(0), this.onTextTracksChanged = () => {
      if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), !this.media || !this.hls.config.renderTextTracksNatively)
        return;
      let t = null;
      const s = Ws(this.media.textTracks);
      for (let n = 0; n < s.length; n++)
        if (s[n].mode === "hidden")
          t = s[n];
        else if (s[n].mode === "showing") {
          t = s[n];
          break;
        }
      const r = this.findTrackForTextTrack(t);
      this.subtitleTrack !== r && this.setSubtitleTrack(r);
    }, this.registerListeners();
  }
  destroy() {
    this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.currentTrack = null, this.onTextTracksChanged = this.asyncPollTrackChange = null, super.destroy();
  }
  get subtitleDisplay() {
    return this._subtitleDisplay;
  }
  set subtitleDisplay(e) {
    this._subtitleDisplay = e, this.trackId > -1 && this.toggleTrackModes();
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.MANIFEST_PARSED, this.onManifestParsed, this), e.on(E.LEVEL_LOADING, this.onLevelLoading, this), e.on(E.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(E.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.on(E.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.MANIFEST_PARSED, this.onManifestParsed, this), e.off(E.LEVEL_LOADING, this.onLevelLoading, this), e.off(E.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(E.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.off(E.ERROR, this.onError, this);
  }
  // Listen for subtitle track change, then extract the current track ID.
  onMediaAttached(e, t) {
    this.media = t.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange));
  }
  pollTrackChange(e) {
    self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.onTextTracksChanged, e);
  }
  onMediaDetaching(e, t) {
    const s = this.media;
    if (!s)
      return;
    const r = !!t.transferMedia;
    if (self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || s.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), this.subtitleTrack = -1, this.media = null, r)
      return;
    Ws(s.textTracks).forEach((a) => {
      Mt(a);
    });
  }
  onManifestLoading() {
    this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0;
  }
  // Fired whenever a new manifest is loaded.
  onManifestParsed(e, t) {
    this.tracks = t.subtitleTracks;
  }
  onSubtitleTrackLoaded(e, t) {
    const {
      id: s,
      groupId: r,
      details: n
    } = t, a = this.tracksInGroup[s];
    if (!a || a.groupId !== r) {
      this.warn(`Subtitle track with id:${s} and group:${r} not found in active group ${a?.groupId}`);
      return;
    }
    const o = a.details;
    a.details = t.details, this.log(`Subtitle track ${s} "${a.name}" lang:${a.lang} group:${r} loaded [${n.startSN}-${n.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
  }
  onLevelLoading(e, t) {
    this.switchLevel(t.level);
  }
  onLevelSwitching(e, t) {
    this.switchLevel(t.level);
  }
  switchLevel(e) {
    const t = this.hls.levels[e];
    if (!t)
      return;
    const s = t.subtitleGroups || null, r = this.groupIds;
    let n = this.currentTrack;
    if (!s || r?.length !== s?.length || s != null && s.some((a) => r?.indexOf(a) === -1)) {
      this.groupIds = s, this.trackId = -1, this.currentTrack = null;
      const a = this.tracks.filter((h) => !s || s.indexOf(h.groupId) !== -1);
      if (a.length)
        this.selectDefaultTrack && !a.some((h) => h.default) && (this.selectDefaultTrack = !1), a.forEach((h, c) => {
          h.id = c;
        });
      else if (!n && !this.tracksInGroup.length)
        return;
      this.tracksInGroup = a;
      const o = this.hls.config.subtitlePreference;
      if (!n && o) {
        this.selectDefaultTrack = !1;
        const h = qe(o, a);
        if (h > -1)
          n = a[h];
        else {
          const c = qe(o, this.tracks);
          n = this.tracks[c];
        }
      }
      let u = this.findTrackId(n);
      u === -1 && n && (u = this.findTrackId(null));
      const l = {
        subtitleTracks: a
      };
      this.log(`Updating subtitle tracks, ${a.length} track(s) found in "${s?.join(",")}" group-id`), this.hls.trigger(E.SUBTITLE_TRACKS_UPDATED, l), u !== -1 && this.trackId === -1 && this.setSubtitleTrack(u);
    }
  }
  findTrackId(e) {
    const t = this.tracksInGroup, s = this.selectDefaultTrack;
    for (let r = 0; r < t.length; r++) {
      const n = t[r];
      if (!(s && !n.default || !s && !e) && (!e || xt(n, e)))
        return r;
    }
    if (e) {
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        if (fs(e.attrs, n.attrs, ["LANGUAGE", "ASSOC-LANGUAGE", "CHARACTERISTICS"]))
          return r;
      }
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        if (fs(e.attrs, n.attrs, ["LANGUAGE"]))
          return r;
      }
    }
    return -1;
  }
  findTrackForTextTrack(e) {
    if (e) {
      const t = this.tracksInGroup;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        if (_r(r, e))
          return s;
      }
    }
    return -1;
  }
  onError(e, t) {
    t.fatal || !t.context || t.context.type === Q.SUBTITLE_TRACK && t.context.id === this.trackId && (!this.groupIds || this.groupIds.indexOf(t.context.groupId) !== -1) && this.checkRetry(t);
  }
  get allSubtitleTracks() {
    return this.tracks;
  }
  /** get alternate subtitle tracks list from playlist **/
  get subtitleTracks() {
    return this.tracksInGroup;
  }
  /** get/set index of the selected subtitle track (based on index in subtitle track lists) **/
  get subtitleTrack() {
    return this.trackId;
  }
  set subtitleTrack(e) {
    this.selectDefaultTrack = !1, this.setSubtitleTrack(e);
  }
  setSubtitleOption(e) {
    if (this.hls.config.subtitlePreference = e, e) {
      if (e.id === -1)
        return this.setSubtitleTrack(-1), null;
      const t = this.allSubtitleTracks;
      if (this.selectDefaultTrack = !1, t.length) {
        const s = this.currentTrack;
        if (s && xt(e, s))
          return s;
        const r = qe(e, this.tracksInGroup);
        if (r > -1) {
          const n = this.tracksInGroup[r];
          return this.setSubtitleTrack(r), n;
        } else {
          if (s)
            return null;
          {
            const n = qe(e, t);
            if (n > -1)
              return t[n];
          }
        }
      }
    }
    return null;
  }
  loadPlaylist(e) {
    super.loadPlaylist(), this.shouldLoadPlaylist(this.currentTrack) && this.scheduleLoading(this.currentTrack, e);
  }
  loadingPlaylist(e, t) {
    super.loadingPlaylist(e, t);
    const s = e.id, r = e.groupId, n = this.getUrlWithDirectives(e.url, t), a = e.details, o = a?.age;
    this.log(`Loading subtitle ${s} "${e.name}" lang:${e.lang} group:${r}${t?.msn !== void 0 ? " at sn " + t.msn + " part " + t.part : ""}${o && a.live ? " age " + o.toFixed(1) + (a.type && " " + a.type || "") : ""} ${n}`), this.hls.trigger(E.SUBTITLE_TRACK_LOADING, {
      url: n,
      id: s,
      groupId: r,
      deliveryDirectives: t || null,
      track: e
    });
  }
  /**
   * Disables the old subtitleTrack and sets current mode on the next subtitleTrack.
   * This operates on the DOM textTracks.
   * A value of -1 will disable all subtitle tracks.
   */
  toggleTrackModes() {
    const {
      media: e
    } = this;
    if (!e)
      return;
    const t = Ws(e.textTracks), s = this.currentTrack;
    let r;
    if (s && (r = t.filter((n) => _r(s, n))[0], r || this.warn(`Unable to find subtitle TextTrack with name "${s.name}" and language "${s.lang}"`)), [].slice.call(t).forEach((n) => {
      n.mode !== "disabled" && n !== r && (n.mode = "disabled");
    }), r) {
      const n = this.subtitleDisplay ? "showing" : "hidden";
      r.mode !== n && (r.mode = n);
    }
  }
  /**
   * This method is responsible for validating the subtitle index and periodically reloading if live.
   * Dispatches the SUBTITLE_TRACK_SWITCH event, which instructs the subtitle-stream-controller to load the selected track.
   */
  setSubtitleTrack(e) {
    const t = this.tracksInGroup;
    if (!this.media) {
      this.queuedDefaultTrack = e;
      return;
    }
    if (e < -1 || e >= t.length || !F(e)) {
      this.warn(`Invalid subtitle track id: ${e}`);
      return;
    }
    this.selectDefaultTrack = !1;
    const s = this.currentTrack, r = t[e] || null;
    if (this.trackId = e, this.currentTrack = r, this.toggleTrackModes(), !r) {
      this.hls.trigger(E.SUBTITLE_TRACK_SWITCH, {
        id: e
      });
      return;
    }
    const n = !!r.details && !r.details.live;
    if (e === this.trackId && r === s && n)
      return;
    this.log(`Switching to subtitle-track ${e}` + (r ? ` "${r.name}" lang:${r.lang} group:${r.groupId}` : ""));
    const {
      id: a,
      groupId: o = "",
      name: u,
      type: l,
      url: h
    } = r;
    this.hls.trigger(E.SUBTITLE_TRACK_SWITCH, {
      id: a,
      groupId: o,
      name: u,
      type: l,
      url: h
    });
    const c = this.switchParams(r.url, s?.details, r.details);
    this.loadPlaylist(c);
  }
}
function Mm() {
  try {
    return crypto.randomUUID();
  } catch {
    try {
      const e = URL.createObjectURL(new Blob()), t = e.toString();
      return URL.revokeObjectURL(e), t.slice(t.lastIndexOf("/") + 1);
    } catch {
      let t = (/* @__PURE__ */ new Date()).getTime();
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (r) => {
        const n = (t + Math.random() * 16) % 16 | 0;
        return t = Math.floor(t / 16), (r == "x" ? n : n & 3 | 8).toString(16);
      });
    }
  }
}
function ns(i) {
  let e = 5381, t = i.length;
  for (; t; )
    e = e * 33 ^ i.charCodeAt(--t);
  return (e >>> 0).toString();
}
const $t = 0.025;
let li = /* @__PURE__ */ (function(i) {
  return i[i.Point = 0] = "Point", i[i.Range = 1] = "Range", i;
})({});
function Fm(i, e, t) {
  return `${i.identifier}-${t + 1}-${ns(e)}`;
}
class Nm {
  constructor(e, t) {
    this.base = void 0, this._duration = null, this._timelineStart = null, this.appendInPlaceDisabled = void 0, this.appendInPlaceStarted = void 0, this.dateRange = void 0, this.hasPlayed = !1, this.cumulativeDuration = 0, this.resumeOffset = NaN, this.playoutLimit = NaN, this.restrictions = {
      skip: !1,
      jump: !1
    }, this.snapOptions = {
      out: !1,
      in: !1
    }, this.assetList = [], this.assetListLoader = void 0, this.assetListResponse = null, this.resumeAnchor = void 0, this.error = void 0, this.resetOnResume = void 0, this.base = t, this.dateRange = e, this.setDateRange(e);
  }
  setDateRange(e) {
    this.dateRange = e, this.resumeOffset = e.attr.optionalFloat("X-RESUME-OFFSET", this.resumeOffset), this.playoutLimit = e.attr.optionalFloat("X-PLAYOUT-LIMIT", this.playoutLimit), this.restrictions = e.attr.enumeratedStringList("X-RESTRICT", this.restrictions), this.snapOptions = e.attr.enumeratedStringList("X-SNAP", this.snapOptions);
  }
  reset() {
    var e;
    this.appendInPlaceStarted = !1, (e = this.assetListLoader) == null || e.destroy(), this.assetListLoader = void 0, this.supplementsPrimary || (this.assetListResponse = null, this.assetList = [], this._duration = null);
  }
  isAssetPastPlayoutLimit(e) {
    var t;
    if (e > 0 && e >= this.assetList.length)
      return !0;
    const s = this.playoutLimit;
    return e <= 0 || isNaN(s) ? !1 : s === 0 ? !0 : (((t = this.assetList[e]) == null ? void 0 : t.startOffset) || 0) > s;
  }
  findAssetIndex(e) {
    return this.assetList.indexOf(e);
  }
  get identifier() {
    return this.dateRange.id;
  }
  get startDate() {
    return this.dateRange.startDate;
  }
  get startTime() {
    const e = this.dateRange.startTime;
    if (this.snapOptions.out) {
      const t = this.dateRange.tagAnchor;
      if (t)
        return Yi(e, t);
    }
    return e;
  }
  get startOffset() {
    return this.cue.pre ? 0 : this.startTime;
  }
  get startIsAligned() {
    if (this.startTime === 0 || this.snapOptions.out)
      return !0;
    const e = this.dateRange.tagAnchor;
    if (e) {
      const t = this.dateRange.startTime, s = Yi(t, e);
      return t - s < 0.1;
    }
    return !1;
  }
  get resumptionOffset() {
    const e = this.resumeOffset, t = F(e) ? e : this.duration;
    return this.cumulativeDuration + t;
  }
  get resumeTime() {
    const e = this.startOffset + this.resumptionOffset;
    if (this.snapOptions.in) {
      const t = this.resumeAnchor;
      if (t)
        return Yi(e, t);
    }
    return e;
  }
  get appendInPlace() {
    return this.appendInPlaceStarted ? !0 : this.appendInPlaceDisabled ? !1 : !!(!this.cue.once && !this.cue.pre && // preroll starts at startPosition before startPosition is known (live)
    this.startIsAligned && (isNaN(this.playoutLimit) && isNaN(this.resumeOffset) || this.resumeOffset && this.duration && Math.abs(this.resumeOffset - this.duration) < $t));
  }
  set appendInPlace(e) {
    if (this.appendInPlaceStarted) {
      this.resetOnResume = !e;
      return;
    }
    this.appendInPlaceDisabled = !e;
  }
  // Extended timeline start time
  get timelineStart() {
    return this._timelineStart !== null ? this._timelineStart : this.startTime;
  }
  set timelineStart(e) {
    this._timelineStart = e;
  }
  get duration() {
    const e = this.playoutLimit;
    let t;
    return this._duration !== null ? t = this._duration : this.dateRange.duration ? t = this.dateRange.duration : t = this.dateRange.plannedDuration || 0, !isNaN(e) && e < t && (t = e), t;
  }
  set duration(e) {
    this._duration = e;
  }
  get cue() {
    return this.dateRange.cue;
  }
  get timelineOccupancy() {
    return this.dateRange.attr["X-TIMELINE-OCCUPIES"] === "RANGE" ? li.Range : li.Point;
  }
  get supplementsPrimary() {
    return this.dateRange.attr["X-TIMELINE-STYLE"] === "PRIMARY";
  }
  get contentMayVary() {
    return this.dateRange.attr["X-CONTENT-MAY-VARY"] !== "NO";
  }
  get assetUrl() {
    return this.dateRange.attr["X-ASSET-URI"];
  }
  get assetListUrl() {
    return this.dateRange.attr["X-ASSET-LIST"];
  }
  get baseUrl() {
    return this.base.url;
  }
  get assetListLoaded() {
    return this.assetList.length > 0 || this.assetListResponse !== null;
  }
  toString() {
    return Bm(this);
  }
}
function Yi(i, e) {
  return i - e.start < e.duration / 2 && !(Math.abs(i - (e.start + e.duration)) < $t) ? e.start : e.start + e.duration;
}
function Iu(i, e, t) {
  const s = new self.URL(i, t);
  return s.protocol !== "data:" && s.searchParams.set("_HLS_primary_id", e), s;
}
function ji(i, e) {
  for (; (t = i.assetList[++e]) != null && t.error; )
    var t;
  return e;
}
function Bm(i) {
  return `["${i.identifier}" ${i.cue.pre ? "<pre>" : i.cue.post ? "<post>" : ""}${i.timelineStart.toFixed(2)}-${i.resumeTime.toFixed(2)}]`;
}
function Ot(i) {
  const e = i.timelineStart, t = i.duration || 0;
  return `["${i.identifier}" ${e.toFixed(2)}-${(e + t).toFixed(2)}]`;
}
class Um {
  constructor(e, t, s, r) {
    this.hls = void 0, this.interstitial = void 0, this.assetItem = void 0, this.tracks = null, this.hasDetails = !1, this.mediaAttached = null, this._currentTime = void 0, this._bufferedEosTime = void 0, this.checkPlayout = () => {
      this.reachedPlayout(this.currentTime) && this.hls && this.hls.trigger(E.PLAYOUT_LIMIT_REACHED, {});
    };
    const n = this.hls = new e(t);
    this.interstitial = s, this.assetItem = r;
    const a = () => {
      this.hasDetails = !0;
    };
    n.once(E.LEVEL_LOADED, a), n.once(E.AUDIO_TRACK_LOADED, a), n.once(E.SUBTITLE_TRACK_LOADED, a), n.on(E.MEDIA_ATTACHING, (o, {
      media: u
    }) => {
      this.removeMediaListeners(), this.mediaAttached = u, this.interstitial.playoutLimit && (u.addEventListener("timeupdate", this.checkPlayout), this.appendInPlace && n.on(E.BUFFER_APPENDED, () => {
        const h = this.bufferedEnd;
        this.reachedPlayout(h) && (this._bufferedEosTime = h, n.trigger(E.BUFFERED_TO_END, void 0));
      }));
    });
  }
  get appendInPlace() {
    return this.interstitial.appendInPlace;
  }
  loadSource() {
    const e = this.hls;
    if (e)
      if (e.url)
        e.levels.length && !e.started && e.startLoad(-1, !0);
      else {
        let t = this.assetItem.uri;
        try {
          t = Iu(t, e.config.primarySessionId || "").href;
        } catch {
        }
        e.loadSource(t);
      }
  }
  bufferedInPlaceToEnd(e) {
    var t;
    if (!this.appendInPlace)
      return !1;
    if ((t = this.hls) != null && t.bufferedToEnd)
      return !0;
    if (!e)
      return !1;
    const s = Math.min(this._bufferedEosTime || 1 / 0, this.duration), r = this.timelineOffset, n = j.bufferInfo(e, r, 0);
    return this.getAssetTime(n.end) >= s - 0.02;
  }
  reachedPlayout(e) {
    const s = this.interstitial.playoutLimit;
    return this.startOffset + e >= s;
  }
  get destroyed() {
    var e;
    return !((e = this.hls) != null && e.userConfig);
  }
  get assetId() {
    return this.assetItem.identifier;
  }
  get interstitialId() {
    return this.assetItem.parentIdentifier;
  }
  get media() {
    var e;
    return ((e = this.hls) == null ? void 0 : e.media) || null;
  }
  get bufferedEnd() {
    const e = this.media || this.mediaAttached;
    if (!e)
      return this._bufferedEosTime ? this._bufferedEosTime : this.currentTime;
    const t = j.bufferInfo(e, e.currentTime, 1e-3);
    return this.getAssetTime(t.end);
  }
  get currentTime() {
    const e = this.media || this.mediaAttached;
    return e ? this.getAssetTime(e.currentTime) : this._currentTime || 0;
  }
  get duration() {
    const e = this.assetItem.duration;
    if (!e)
      return 0;
    const t = this.interstitial.playoutLimit;
    if (t) {
      const s = t - this.startOffset;
      if (s > 0 && s < e)
        return s;
    }
    return e;
  }
  get remaining() {
    const e = this.duration;
    return e ? Math.max(0, e - this.currentTime) : 0;
  }
  get startOffset() {
    return this.assetItem.startOffset;
  }
  get timelineOffset() {
    var e;
    return ((e = this.hls) == null ? void 0 : e.config.timelineOffset) || 0;
  }
  set timelineOffset(e) {
    const t = this.timelineOffset;
    if (e !== t) {
      const s = e - t;
      if (Math.abs(s) > 1 / 9e4 && this.hls) {
        if (this.hasDetails)
          throw new Error("Cannot set timelineOffset after playlists are loaded");
        this.hls.config.timelineOffset = e;
      }
    }
  }
  getAssetTime(e) {
    const t = this.timelineOffset, s = this.duration;
    return Math.min(Math.max(0, e - t), s);
  }
  removeMediaListeners() {
    const e = this.mediaAttached;
    e && (this._currentTime = e.currentTime, this.bufferSnapShot(), e.removeEventListener("timeupdate", this.checkPlayout));
  }
  bufferSnapShot() {
    if (this.mediaAttached) {
      var e;
      (e = this.hls) != null && e.bufferedToEnd && (this._bufferedEosTime = this.bufferedEnd);
    }
  }
  destroy() {
    this.removeMediaListeners(), this.hls && this.hls.destroy(), this.hls = null, this.tracks = this.mediaAttached = this.checkPlayout = null;
  }
  attachMedia(e) {
    var t;
    this.loadSource(), (t = this.hls) == null || t.attachMedia(e);
  }
  detachMedia() {
    var e;
    this.removeMediaListeners(), this.mediaAttached = null, (e = this.hls) == null || e.detachMedia();
  }
  resumeBuffering() {
    var e;
    (e = this.hls) == null || e.resumeBuffering();
  }
  pauseBuffering() {
    var e;
    (e = this.hls) == null || e.pauseBuffering();
  }
  transferMedia() {
    var e;
    return this.bufferSnapShot(), ((e = this.hls) == null ? void 0 : e.transferMedia()) || null;
  }
  resetDetails() {
    const e = this.hls;
    if (e && this.hasDetails) {
      e.stopLoad();
      const t = (s) => delete s.details;
      e.levels.forEach(t), e.allAudioTracks.forEach(t), e.allSubtitleTracks.forEach(t), this.hasDetails = !1;
    }
  }
  on(e, t, s) {
    var r;
    (r = this.hls) == null || r.on(e, t);
  }
  once(e, t, s) {
    var r;
    (r = this.hls) == null || r.once(e, t);
  }
  off(e, t, s) {
    var r;
    (r = this.hls) == null || r.off(e, t);
  }
  toString() {
    var e;
    return `HlsAssetPlayer: ${Ot(this.assetItem)} ${(e = this.hls) == null ? void 0 : e.sessionId} ${this.appendInPlace ? "append-in-place" : ""}`;
  }
}
const so = 0.033;
class $m extends Be {
  constructor(e, t) {
    super("interstitials-sched", t), this.onScheduleUpdate = void 0, this.eventMap = {}, this.events = null, this.items = null, this.durations = {
      primary: 0,
      playout: 0,
      integrated: 0
    }, this.onScheduleUpdate = e;
  }
  destroy() {
    this.reset(), this.onScheduleUpdate = null;
  }
  reset() {
    this.eventMap = {}, this.setDurations(0, 0, 0), this.events && this.events.forEach((e) => e.reset()), this.events = this.items = null;
  }
  resetErrorsInRange(e, t) {
    return this.events ? this.events.reduce((s, r) => e <= r.startOffset && t > r.startOffset ? (delete r.error, s + 1) : s, 0) : 0;
  }
  get duration() {
    const e = this.items;
    return e ? e[e.length - 1].end : 0;
  }
  get length() {
    return this.items ? this.items.length : 0;
  }
  getEvent(e) {
    return e && this.eventMap[e] || null;
  }
  hasEvent(e) {
    return e in this.eventMap;
  }
  findItemIndex(e, t) {
    if (e.event)
      return this.findEventIndex(e.event.identifier);
    let s = -1;
    e.nextEvent ? s = this.findEventIndex(e.nextEvent.identifier) - 1 : e.previousEvent && (s = this.findEventIndex(e.previousEvent.identifier) + 1);
    const r = this.items;
    if (r)
      for (r[s] || (t === void 0 && (t = e.start), s = this.findItemIndexAtTime(t)); s >= 0 && (n = r[s]) != null && n.event; ) {
        var n;
        s--;
      }
    return s;
  }
  findItemIndexAtTime(e, t) {
    const s = this.items;
    if (s)
      for (let r = 0; r < s.length; r++) {
        let n = s[r];
        if (t && t !== "primary" && (n = n[t]), e === n.start || e > n.start && e < n.end)
          return r;
      }
    return -1;
  }
  findJumpRestrictedIndex(e, t) {
    const s = this.items;
    if (s)
      for (let r = e; r <= t && s[r]; r++) {
        const n = s[r].event;
        if (n != null && n.restrictions.jump && !n.appendInPlace)
          return r;
      }
    return -1;
  }
  findEventIndex(e) {
    const t = this.items;
    if (t)
      for (let r = t.length; r--; ) {
        var s;
        if (((s = t[r].event) == null ? void 0 : s.identifier) === e)
          return r;
      }
    return -1;
  }
  findAssetIndex(e, t) {
    const s = e.assetList, r = s.length;
    if (r > 1)
      for (let n = 0; n < r; n++) {
        const a = s[n];
        if (!a.error) {
          const o = a.timelineStart;
          if (t === o || t > o && (t < o + (a.duration || 0) || n === r - 1))
            return n;
        }
      }
    return 0;
  }
  get assetIdAtEnd() {
    var e;
    const t = (e = this.items) == null || (e = e[this.length - 1]) == null ? void 0 : e.event;
    if (t) {
      const s = t.assetList, r = s[s.length - 1];
      if (r)
        return r.identifier;
    }
    return null;
  }
  parseInterstitialDateRanges(e, t) {
    const s = e.main.details, {
      dateRanges: r
    } = s, n = this.events, a = this.parseDateRanges(r, {
      url: s.url
    }, t), o = Object.keys(r), u = n ? n.filter((l) => !o.includes(l.identifier)) : [];
    a.length && a.sort((l, h) => {
      const c = l.cue.pre, d = l.cue.post, g = h.cue.pre, f = h.cue.post;
      if (c && !g)
        return -1;
      if (g && !c || d && !f)
        return 1;
      if (f && !d)
        return -1;
      if (!c && !g && !d && !f) {
        const m = l.startTime, p = h.startTime;
        if (m !== p)
          return m - p;
      }
      return l.dateRange.tagOrder - h.dateRange.tagOrder;
    }), this.events = a, u.forEach((l) => {
      this.removeEvent(l);
    }), this.updateSchedule(e, u);
  }
  updateSchedule(e, t = [], s = !1) {
    const r = this.events || [];
    if (r.length || t.length || this.length < 2) {
      const n = this.items, a = this.parseSchedule(r, e);
      (s || t.length || n?.length !== a.length || a.some((u, l) => Math.abs(u.playout.start - n[l].playout.start) > 5e-3 || Math.abs(u.playout.end - n[l].playout.end) > 5e-3)) && (this.items = a, this.onScheduleUpdate(t, n));
    }
  }
  parseDateRanges(e, t, s) {
    const r = [], n = Object.keys(e);
    for (let a = 0; a < n.length; a++) {
      const o = n[a], u = e[o];
      if (u.isInterstitial) {
        let l = this.eventMap[o];
        l ? l.setDateRange(u) : (l = new Nm(u, t), this.eventMap[o] = l, s === !1 && (l.appendInPlace = s)), r.push(l);
      }
    }
    return r;
  }
  parseSchedule(e, t) {
    const s = [], r = t.main.details, n = r.live ? 1 / 0 : r.edge;
    let a = 0;
    if (e = e.filter((u) => !u.error && !(u.cue.once && u.hasPlayed)), e.length) {
      this.resolveOffsets(e, t);
      let u = 0, l = 0;
      if (e.forEach((h, c) => {
        const d = h.cue.pre, g = h.cue.post, f = e[c - 1] || null, m = h.appendInPlace, p = g ? n : h.startOffset, y = h.duration, v = h.timelineOccupancy === li.Range ? y : 0, T = h.resumptionOffset, S = f?.startTime === p, x = p + h.cumulativeDuration;
        let L = m ? x + y : p + T;
        if (d || !g && p <= 0) {
          const I = l;
          l += v, h.timelineStart = x;
          const _ = a;
          a += y, s.push({
            event: h,
            start: x,
            end: L,
            playout: {
              start: _,
              end: a
            },
            integrated: {
              start: I,
              end: l
            }
          });
        } else if (p <= n) {
          if (!S) {
            const b = p - u;
            if (b > so) {
              const P = u, M = l;
              l += b;
              const U = a;
              a += b;
              const K = {
                previousEvent: e[c - 1] || null,
                nextEvent: h,
                start: P,
                end: P + b,
                playout: {
                  start: U,
                  end: a
                },
                integrated: {
                  start: M,
                  end: l
                }
              };
              s.push(K);
            } else b > 0 && f && (f.cumulativeDuration += b, s[s.length - 1].end = p);
          }
          g && (L = x), h.timelineStart = x;
          const I = l;
          l += v;
          const _ = a;
          a += y, s.push({
            event: h,
            start: x,
            end: L,
            playout: {
              start: _,
              end: a
            },
            integrated: {
              start: I,
              end: l
            }
          });
        } else
          return;
        const A = h.resumeTime;
        g || A > n ? u = n : u = A;
      }), u < n) {
        var o;
        const h = u, c = l, d = n - u;
        l += d;
        const g = a;
        a += d, s.push({
          previousEvent: ((o = s[s.length - 1]) == null ? void 0 : o.event) || null,
          nextEvent: null,
          start: u,
          end: h + d,
          playout: {
            start: g,
            end: a
          },
          integrated: {
            start: c,
            end: l
          }
        });
      }
      this.setDurations(n, a, l);
    } else
      s.push({
        previousEvent: null,
        nextEvent: null,
        start: 0,
        end: n,
        playout: {
          start: 0,
          end: n
        },
        integrated: {
          start: 0,
          end: n
        }
      }), this.setDurations(n, n, n);
    return s;
  }
  setDurations(e, t, s) {
    this.durations = {
      primary: e,
      playout: t,
      integrated: s
    };
  }
  resolveOffsets(e, t) {
    const s = t.main.details, r = s.live ? 1 / 0 : s.edge;
    let n = 0, a = -1;
    e.forEach((o, u) => {
      const l = o.cue.pre, h = o.cue.post, c = l ? 0 : h ? r : o.startTime;
      this.updateAssetDurations(o), a === c ? o.cumulativeDuration = n : (n = 0, a = c), !h && o.snapOptions.in && (o.resumeAnchor = It(null, s.fragments, o.startOffset + o.resumptionOffset, 0, 0) || void 0), o.appendInPlace && !o.appendInPlaceStarted && (this.primaryCanResumeInPlaceAt(o, t) || (o.appendInPlace = !1)), !o.appendInPlace && u + 1 < e.length && e[u + 1].startTime - e[u].resumeTime < so && (e[u + 1].appendInPlace = !1, e[u + 1].appendInPlace && this.warn(`Could not change append strategy for abutting event ${o}`));
      const g = F(o.resumeOffset) ? o.resumeOffset : o.duration;
      n += g;
    });
  }
  primaryCanResumeInPlaceAt(e, t) {
    const s = e.resumeTime, r = e.startTime + e.resumptionOffset;
    return Math.abs(s - r) > $t ? (this.log(`"${e.identifier}" resumption ${s} not aligned with estimated timeline end ${r}`), !1) : !Object.keys(t).some((a) => {
      const o = t[a].details, u = o.edge;
      if (s >= u)
        return this.log(`"${e.identifier}" resumption ${s} past ${a} playlist end ${u}`), !1;
      const l = It(null, o.fragments, s);
      if (!l)
        return this.log(`"${e.identifier}" resumption ${s} does not align with any fragments in ${a} playlist (${o.fragStart}-${o.fragmentEnd})`), !0;
      const h = a === "audio" ? 0.175 : 0;
      return Math.abs(l.start - s) < $t + h || Math.abs(l.end - s) < $t + h ? !1 : (this.log(`"${e.identifier}" resumption ${s} not aligned with ${a} fragment bounds (${l.start}-${l.end} sn: ${l.sn} cc: ${l.cc})`), !0);
    });
  }
  updateAssetDurations(e) {
    if (!e.assetListLoaded)
      return;
    const t = e.timelineStart;
    let s = 0, r = !1, n = !1;
    for (let a = 0; a < e.assetList.length; a++) {
      const o = e.assetList[a], u = t + s;
      o.startOffset = s, o.timelineStart = u, r || (r = o.duration === null), n || (n = !!o.error);
      const l = o.error ? 0 : o.duration || 0;
      s += l;
    }
    r && !n ? e.duration = Math.max(s, e.duration) : e.duration = s;
  }
  removeEvent(e) {
    e.reset(), delete this.eventMap[e.identifier];
  }
}
function $e(i) {
  return `[${i.event ? '"' + i.event.identifier + '"' : "primary"}: ${i.start.toFixed(2)}-${i.end.toFixed(2)}]`;
}
class Gm {
  constructor(e) {
    this.hls = void 0, this.hls = e;
  }
  destroy() {
    this.hls = null;
  }
  loadAssetList(e, t) {
    const s = e.assetListUrl;
    let r;
    try {
      r = Iu(s, this.hls.sessionId, e.baseUrl);
    } catch (d) {
      const g = this.assignAssetListError(e, D.ASSET_LIST_LOAD_ERROR, d, s);
      this.hls.trigger(E.ERROR, g);
      return;
    }
    t && r.protocol !== "data:" && r.searchParams.set("_HLS_start_offset", "" + t);
    const n = this.hls.config, a = n.loader, o = new a(n), u = {
      responseType: "json",
      url: r.href
    }, l = n.interstitialAssetListLoadPolicy.default, h = {
      loadPolicy: l,
      timeout: l.maxLoadTimeMs,
      maxRetry: 0,
      retryDelay: 0,
      maxRetryDelay: 0
    }, c = {
      onSuccess: (d, g, f, m) => {
        const p = d.data, y = p?.ASSETS;
        if (!Array.isArray(y)) {
          const v = this.assignAssetListError(e, D.ASSET_LIST_PARSING_ERROR, new Error("Invalid interstitial asset list"), f.url, g, m);
          this.hls.trigger(E.ERROR, v);
          return;
        }
        e.assetListResponse = p, this.hls.trigger(E.ASSET_LIST_LOADED, {
          event: e,
          assetListResponse: p,
          networkDetails: m
        });
      },
      onError: (d, g, f, m) => {
        const p = this.assignAssetListError(e, D.ASSET_LIST_LOAD_ERROR, new Error(`Error loading X-ASSET-LIST: HTTP status ${d.code} ${d.text} (${g.url})`), g.url, m, f);
        this.hls.trigger(E.ERROR, p);
      },
      onTimeout: (d, g, f) => {
        const m = this.assignAssetListError(e, D.ASSET_LIST_LOAD_TIMEOUT, new Error(`Timeout loading X-ASSET-LIST (${g.url})`), g.url, d, f);
        this.hls.trigger(E.ERROR, m);
      }
    };
    return o.load(u, h, c), this.hls.trigger(E.ASSET_LIST_LOADING, {
      event: e
    }), o;
  }
  assignAssetListError(e, t, s, r, n, a) {
    return e.error = s, {
      type: V.NETWORK_ERROR,
      details: t,
      fatal: !1,
      interstitial: e,
      url: r,
      error: s,
      networkDetails: a,
      stats: n
    };
  }
}
function io(i) {
  var e;
  i == null || (e = i.play()) == null || e.catch(() => {
  });
}
function wt(i, e) {
  return `[${i}] Advancing timeline position to ${e}`;
}
class Hm extends Be {
  constructor(e, t) {
    super("interstitials", e.logger), this.HlsPlayerClass = void 0, this.hls = void 0, this.assetListLoader = void 0, this.mediaSelection = null, this.altSelection = null, this.media = null, this.detachedData = null, this.requiredTracks = null, this.manager = null, this.playerQueue = [], this.bufferedPos = -1, this.timelinePos = -1, this.schedule = void 0, this.playingItem = null, this.bufferingItem = null, this.waitingItem = null, this.endedItem = null, this.playingAsset = null, this.endedAsset = null, this.bufferingAsset = null, this.shouldPlay = !1, this.onPlay = () => {
      this.shouldPlay = !0;
    }, this.onPause = () => {
      this.shouldPlay = !1;
    }, this.onSeeking = () => {
      const s = this.currentTime;
      if (s === void 0 || this.playbackDisabled || !this.schedule)
        return;
      const r = s - this.timelinePos;
      if (Math.abs(r) < 1 / 7056e5)
        return;
      const a = r <= -0.01;
      this.timelinePos === -1 && !this.effectivePlayingItem && this.checkStart(), this.timelinePos = s, this.bufferedPos = s;
      const o = this.playingItem;
      if (!o) {
        this.checkBuffer();
        return;
      }
      if (a && this.schedule.resetErrorsInRange(s, s - r) && this.updateSchedule(!0), this.checkBuffer(), a && s < o.start || s >= o.end) {
        var u;
        const g = this.findItemIndex(o);
        let f = this.schedule.findItemIndexAtTime(s);
        if (f === -1 && (f = g + (a ? -1 : 1), this.log(`seeked ${a ? "back " : ""}to position not covered by schedule ${s} (resolving from ${g} to ${f})`)), !this.isInterstitial(o) && (u = this.media) != null && u.paused && (this.shouldPlay = !1), !a && f > g) {
          const m = this.schedule.findJumpRestrictedIndex(g + 1, f);
          if (m > g) {
            this.setSchedulePosition(m);
            return;
          }
        }
        this.setSchedulePosition(f);
        return;
      }
      const l = this.playingAsset;
      if (!l) {
        if (this.playingLastItem && this.isInterstitial(o)) {
          const g = o.event.assetList[0];
          g && (this.endedItem = this.playingItem, this.playingItem = null, this.setScheduleToAssetAtTime(s, g));
        }
        return;
      }
      const h = l.timelineStart, c = l.duration || 0;
      if (a && s < h || s >= h + c) {
        var d;
        (d = o.event) != null && d.appendInPlace && (this.clearAssetPlayers(o.event, o), this.flushFrontBuffer(s)), this.setScheduleToAssetAtTime(s, l);
      }
    }, this.onTimeupdate = () => {
      const s = this.currentTime;
      if (s === void 0 || this.playbackDisabled)
        return;
      if (this.timelinePos === -1 && !this.effectivePlayingItem && this.checkStart(), s > this.timelinePos)
        this.timelinePos = s, s > this.bufferedPos && this.checkBuffer();
      else
        return;
      const r = this.playingItem;
      if (!r || this.playingLastItem)
        return;
      if (s >= r.end) {
        this.timelinePos = r.end;
        const o = this.findItemIndex(r);
        this.setSchedulePosition(o + 1);
      }
      const n = this.playingAsset;
      if (!n)
        return;
      const a = n.timelineStart + (n.duration || 0);
      s >= a && this.setScheduleToAssetAtTime(s, n);
    }, this.onScheduleUpdate = (s, r) => {
      const n = this.schedule;
      if (!n)
        return;
      const a = this.playingItem, o = n.events || [], u = n.items || [], l = n.durations, h = s.map((m) => m.identifier), c = !!(o.length || h.length);
      (c || r) && this.log(`INTERSTITIALS_UPDATED (${o.length}): ${o}
Schedule: ${u.map((m) => $e(m))} pos: ${this.timelinePos}`), h.length && this.log(`Removed events ${h}`);
      let d = null, g = null;
      a && (d = this.updateItem(a, this.timelinePos), this.itemsMatch(a, d) ? this.playingItem = d : this.waitingItem = this.endedItem = null), this.waitingItem = this.updateItem(this.waitingItem), this.endedItem = this.updateItem(this.endedItem);
      const f = this.bufferingItem;
      if (f && (g = this.updateItem(f, this.bufferedPos), this.itemsMatch(f, g) ? this.bufferingItem = g : f.event && (this.bufferingItem = this.playingItem, this.clearInterstitial(f.event, null))), s.forEach((m) => {
        m.assetList.forEach((p) => {
          this.clearAssetPlayer(p.identifier, null);
        });
      }), this.playerQueue.forEach((m) => {
        if (m.interstitial.appendInPlace) {
          const p = m.assetItem.timelineStart, y = m.timelineOffset - p;
          if (y)
            try {
              m.timelineOffset = p;
            } catch (v) {
              Math.abs(y) > $t && this.warn(`${v} ("${m.assetId}" ${m.timelineOffset}->${p})`);
            }
        }
      }), c || r) {
        if (this.hls.trigger(E.INTERSTITIALS_UPDATED, {
          events: o.slice(0),
          schedule: u.slice(0),
          durations: l,
          removedIds: h
        }), this.isInterstitial(a) && h.includes(a.event.identifier)) {
          this.warn(`Interstitial "${a.event.identifier}" removed while playing`), this.primaryFallback(a.event);
          return;
        }
        a && this.trimInPlace(d, a), f && g !== d && this.trimInPlace(g, f), this.checkBuffer();
      }
    }, this.hls = e, this.HlsPlayerClass = t, this.assetListLoader = new Gm(e), this.schedule = new $m(this.onScheduleUpdate, e.logger), this.registerListeners();
  }
  registerListeners() {
    const e = this.hls;
    e && (e.on(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.on(E.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.on(E.AUDIO_TRACK_UPDATED, this.onAudioTrackUpdated, this), e.on(E.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.on(E.SUBTITLE_TRACK_UPDATED, this.onSubtitleTrackUpdated, this), e.on(E.EVENT_CUE_ENTER, this.onInterstitialCueEnter, this), e.on(E.ASSET_LIST_LOADED, this.onAssetListLoaded, this), e.on(E.BUFFER_APPENDED, this.onBufferAppended, this), e.on(E.BUFFER_FLUSHED, this.onBufferFlushed, this), e.on(E.BUFFERED_TO_END, this.onBufferedToEnd, this), e.on(E.MEDIA_ENDED, this.onMediaEnded, this), e.on(E.ERROR, this.onError, this), e.on(E.DESTROYING, this.onDestroying, this));
  }
  unregisterListeners() {
    const e = this.hls;
    e && (e.off(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.off(E.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.off(E.AUDIO_TRACK_UPDATED, this.onAudioTrackUpdated, this), e.off(E.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.off(E.SUBTITLE_TRACK_UPDATED, this.onSubtitleTrackUpdated, this), e.off(E.EVENT_CUE_ENTER, this.onInterstitialCueEnter, this), e.off(E.ASSET_LIST_LOADED, this.onAssetListLoaded, this), e.off(E.BUFFER_CODECS, this.onBufferCodecs, this), e.off(E.BUFFER_APPENDED, this.onBufferAppended, this), e.off(E.BUFFER_FLUSHED, this.onBufferFlushed, this), e.off(E.BUFFERED_TO_END, this.onBufferedToEnd, this), e.off(E.MEDIA_ENDED, this.onMediaEnded, this), e.off(E.ERROR, this.onError, this), e.off(E.DESTROYING, this.onDestroying, this));
  }
  startLoad() {
    this.resumeBuffering();
  }
  stopLoad() {
    this.pauseBuffering();
  }
  resumeBuffering() {
    var e;
    (e = this.getBufferingPlayer()) == null || e.resumeBuffering();
  }
  pauseBuffering() {
    var e;
    (e = this.getBufferingPlayer()) == null || e.pauseBuffering();
  }
  destroy() {
    this.unregisterListeners(), this.stopLoad(), this.assetListLoader && this.assetListLoader.destroy(), this.emptyPlayerQueue(), this.clearScheduleState(), this.schedule && this.schedule.destroy(), this.media = this.detachedData = this.mediaSelection = this.requiredTracks = this.altSelection = this.schedule = this.manager = null, this.hls = this.HlsPlayerClass = this.log = null, this.assetListLoader = null, this.onPlay = this.onPause = this.onSeeking = this.onTimeupdate = null, this.onScheduleUpdate = null;
  }
  onDestroying() {
    const e = this.primaryMedia || this.media;
    e && this.removeMediaListeners(e);
  }
  removeMediaListeners(e) {
    Re(e, "play", this.onPlay), Re(e, "pause", this.onPause), Re(e, "seeking", this.onSeeking), Re(e, "timeupdate", this.onTimeupdate);
  }
  onMediaAttaching(e, t) {
    const s = this.media = t.media;
    be(s, "seeking", this.onSeeking), be(s, "timeupdate", this.onTimeupdate), be(s, "play", this.onPlay), be(s, "pause", this.onPause);
  }
  onMediaAttached(e, t) {
    const s = this.effectivePlayingItem, r = this.detachedData;
    if (this.detachedData = null, s === null)
      this.checkStart();
    else if (!r) {
      this.clearScheduleState();
      const n = this.findItemIndex(s);
      this.setSchedulePosition(n);
    }
  }
  clearScheduleState() {
    this.log("clear schedule state"), this.playingItem = this.bufferingItem = this.waitingItem = this.endedItem = this.playingAsset = this.endedAsset = this.bufferingAsset = null;
  }
  onMediaDetaching(e, t) {
    const s = !!t.transferMedia, r = this.media;
    if (this.media = null, !s && (r && this.removeMediaListeners(r), this.detachedData)) {
      const n = this.getBufferingPlayer();
      n && (this.log(`Removing schedule state for detachedData and ${n}`), this.playingAsset = this.endedAsset = this.bufferingAsset = this.bufferingItem = this.waitingItem = this.detachedData = null, n.detachMedia()), this.shouldPlay = !1;
    }
  }
  get interstitialsManager() {
    if (!this.hls)
      return null;
    if (this.manager)
      return this.manager;
    const e = this, t = () => e.bufferingItem || e.waitingItem, s = (c) => c && e.getAssetPlayer(c.identifier), r = (c, d, g, f, m) => {
      if (c) {
        let p = c[d].start;
        const y = c.event;
        if (y) {
          if (d === "playout" || y.timelineOccupancy !== li.Point) {
            const v = s(g);
            v?.interstitial === y && (p += v.assetItem.startOffset + v[m]);
          }
        } else {
          const v = f === "bufferedPos" ? a() : e[f];
          p += v - c.start;
        }
        return p;
      }
      return 0;
    }, n = (c, d) => {
      var g;
      if (c !== 0 && d !== "primary" && (g = e.schedule) != null && g.length) {
        var f;
        const m = e.schedule.findItemIndexAtTime(c), p = (f = e.schedule.items) == null ? void 0 : f[m];
        if (p) {
          const y = p[d].start - p.start;
          return c + y;
        }
      }
      return c;
    }, a = () => {
      const c = e.bufferedPos;
      return c === Number.MAX_VALUE ? o("primary") : Math.max(c, 0);
    }, o = (c) => {
      var d, g;
      return (d = e.primaryDetails) != null && d.live ? e.primaryDetails.edge : ((g = e.schedule) == null ? void 0 : g.durations[c]) || 0;
    }, u = (c, d) => {
      var g, f;
      const m = e.effectivePlayingItem;
      if (m != null && (g = m.event) != null && g.restrictions.skip || !e.schedule)
        return;
      e.log(`seek to ${c} "${d}"`);
      const p = e.effectivePlayingItem, y = e.schedule.findItemIndexAtTime(c, d), v = (f = e.schedule.items) == null ? void 0 : f[y], T = e.getBufferingPlayer(), S = T?.interstitial, x = S?.appendInPlace, L = p && e.itemsMatch(p, v);
      if (p && (x || L)) {
        const A = s(e.playingAsset), I = A?.media || e.primaryMedia;
        if (I) {
          const _ = d === "primary" ? I.currentTime : r(p, d, e.playingAsset, "timelinePos", "currentTime"), b = c - _, P = (x ? _ : I.currentTime) + b;
          if (P >= 0 && (!A || x || P <= A.duration)) {
            I.currentTime = P;
            return;
          }
        }
      }
      if (v) {
        let A = c;
        if (d !== "primary") {
          const _ = v[d].start, b = c - _;
          A = v.start + b;
        }
        const I = !e.isInterstitial(v);
        if ((!e.isInterstitial(p) || p.event.appendInPlace) && (I || v.event.appendInPlace)) {
          const _ = e.media || (x ? T?.media : null);
          _ && (_.currentTime = A);
        } else if (p) {
          const _ = e.findItemIndex(p);
          if (y > _) {
            const P = e.schedule.findJumpRestrictedIndex(_ + 1, y);
            if (P > _) {
              e.setSchedulePosition(P);
              return;
            }
          }
          let b = 0;
          if (I)
            e.timelinePos = A, e.checkBuffer();
          else {
            const P = v.event.assetList, M = c - (v[d] || v).start;
            for (let U = P.length; U--; ) {
              const K = P[U];
              if (K.duration && M >= K.startOffset && M < K.startOffset + K.duration) {
                b = U;
                break;
              }
            }
          }
          e.setSchedulePosition(y, b);
        }
      }
    }, l = () => {
      const c = e.effectivePlayingItem;
      if (e.isInterstitial(c))
        return c;
      const d = t();
      return e.isInterstitial(d) ? d : null;
    }, h = {
      get bufferedEnd() {
        const c = t(), d = e.bufferingItem;
        if (d && d === c) {
          var g;
          return r(d, "playout", e.bufferingAsset, "bufferedPos", "bufferedEnd") - d.playout.start || ((g = e.bufferingAsset) == null ? void 0 : g.startOffset) || 0;
        }
        return 0;
      },
      get currentTime() {
        const c = l(), d = e.effectivePlayingItem;
        return d && d === c ? r(d, "playout", e.effectivePlayingAsset, "timelinePos", "currentTime") - d.playout.start : 0;
      },
      set currentTime(c) {
        const d = l(), g = e.effectivePlayingItem;
        g && g === d && u(c + g.playout.start, "playout");
      },
      get duration() {
        const c = l();
        return c ? c.playout.end - c.playout.start : 0;
      },
      get assetPlayers() {
        var c;
        const d = (c = l()) == null ? void 0 : c.event.assetList;
        return d ? d.map((g) => e.getAssetPlayer(g.identifier)) : [];
      },
      get playingIndex() {
        var c;
        const d = (c = l()) == null ? void 0 : c.event;
        return d && e.effectivePlayingAsset ? d.findAssetIndex(e.effectivePlayingAsset) : -1;
      },
      get scheduleItem() {
        return l();
      }
    };
    return this.manager = {
      get events() {
        var c;
        return ((c = e.schedule) == null || (c = c.events) == null ? void 0 : c.slice(0)) || [];
      },
      get schedule() {
        var c;
        return ((c = e.schedule) == null || (c = c.items) == null ? void 0 : c.slice(0)) || [];
      },
      get interstitialPlayer() {
        return l() ? h : null;
      },
      get playerQueue() {
        return e.playerQueue.slice(0);
      },
      get bufferingAsset() {
        return e.bufferingAsset;
      },
      get bufferingItem() {
        return t();
      },
      get bufferingIndex() {
        const c = t();
        return e.findItemIndex(c);
      },
      get playingAsset() {
        return e.effectivePlayingAsset;
      },
      get playingItem() {
        return e.effectivePlayingItem;
      },
      get playingIndex() {
        const c = e.effectivePlayingItem;
        return e.findItemIndex(c);
      },
      primary: {
        get bufferedEnd() {
          return a();
        },
        get currentTime() {
          const c = e.timelinePos;
          return c > 0 ? c : 0;
        },
        set currentTime(c) {
          u(c, "primary");
        },
        get duration() {
          return o("primary");
        },
        get seekableStart() {
          var c;
          return ((c = e.primaryDetails) == null ? void 0 : c.fragmentStart) || 0;
        }
      },
      integrated: {
        get bufferedEnd() {
          return r(t(), "integrated", e.bufferingAsset, "bufferedPos", "bufferedEnd");
        },
        get currentTime() {
          return r(e.effectivePlayingItem, "integrated", e.effectivePlayingAsset, "timelinePos", "currentTime");
        },
        set currentTime(c) {
          u(c, "integrated");
        },
        get duration() {
          return o("integrated");
        },
        get seekableStart() {
          var c;
          return n(((c = e.primaryDetails) == null ? void 0 : c.fragmentStart) || 0, "integrated");
        }
      },
      skip: () => {
        const c = e.effectivePlayingItem, d = c?.event;
        if (d && !d.restrictions.skip) {
          const g = e.findItemIndex(c);
          if (d.appendInPlace) {
            const f = c.playout.start + c.event.duration;
            u(f + 1e-3, "playout");
          } else
            e.advanceAfterAssetEnded(d, g, 1 / 0);
        }
      }
    };
  }
  // Schedule getters
  get effectivePlayingItem() {
    return this.waitingItem || this.playingItem || this.endedItem;
  }
  get effectivePlayingAsset() {
    return this.playingAsset || this.endedAsset;
  }
  get playingLastItem() {
    var e;
    const t = this.playingItem, s = (e = this.schedule) == null ? void 0 : e.items;
    return !this.playbackStarted || !t || !s ? !1 : this.findItemIndex(t) === s.length - 1;
  }
  get playbackStarted() {
    return this.effectivePlayingItem !== null;
  }
  // Media getters and event callbacks
  get currentTime() {
    var e, t;
    if (this.mediaSelection === null)
      return;
    const s = this.waitingItem || this.playingItem;
    if (this.isInterstitial(s) && !s.event.appendInPlace)
      return;
    let r = this.media;
    !r && (e = this.bufferingItem) != null && (e = e.event) != null && e.appendInPlace && (r = this.primaryMedia);
    const n = (t = r) == null ? void 0 : t.currentTime;
    if (!(n === void 0 || !F(n)))
      return n;
  }
  get primaryMedia() {
    var e;
    return this.media || ((e = this.detachedData) == null ? void 0 : e.media) || null;
  }
  isInterstitial(e) {
    return !!(e != null && e.event);
  }
  retreiveMediaSource(e, t) {
    const s = this.getAssetPlayer(e);
    s && this.transferMediaFromPlayer(s, t);
  }
  transferMediaFromPlayer(e, t) {
    const s = e.interstitial.appendInPlace, r = e.media;
    if (s && r === this.primaryMedia) {
      if (this.bufferingAsset = null, (!t || this.isInterstitial(t) && !t.event.appendInPlace) && t && r) {
        this.detachedData = {
          media: r
        };
        return;
      }
      const n = e.transferMedia();
      this.log(`transfer MediaSource from ${e} ${le(n)}`), this.detachedData = n;
    } else t && r && (this.shouldPlay || (this.shouldPlay = !r.paused));
  }
  transferMediaTo(e, t) {
    var s, r;
    if (e.media === t)
      return;
    let n = null;
    const a = this.hls, o = e !== a, u = o && e.interstitial.appendInPlace, l = (s = this.detachedData) == null ? void 0 : s.mediaSource;
    let h;
    if (a.media)
      u && (n = a.transferMedia(), this.detachedData = n), h = "Primary";
    else if (l) {
      const f = this.getBufferingPlayer();
      f ? (n = f.transferMedia(), h = `${f}`) : h = "detached MediaSource";
    } else
      h = "detached media";
    if (!n) {
      if (l)
        n = this.detachedData, this.log(`using detachedData: MediaSource ${le(n)}`);
      else if (!this.detachedData || a.media === t) {
        const f = this.playerQueue;
        f.length > 1 && f.forEach((m) => {
          if (o && m.interstitial.appendInPlace !== u) {
            const p = m.interstitial;
            this.clearInterstitial(m.interstitial, null), p.appendInPlace = !1, p.appendInPlace && this.warn(`Could not change append strategy for queued assets ${p}`);
          }
        }), this.hls.detachMedia(), this.detachedData = {
          media: t
        };
      }
    }
    const c = n && "mediaSource" in n && ((r = n.mediaSource) == null ? void 0 : r.readyState) !== "closed", d = c && n ? n : t;
    this.log(`${c ? "transfering MediaSource" : "attaching media"} to ${o ? e : "Primary"} from ${h} (media.currentTime: ${t.currentTime})`);
    const g = this.schedule;
    if (d === n && g) {
      const f = o && e.assetId === g.assetIdAtEnd;
      d.overrides = {
        duration: g.duration,
        endOfStream: !o || f,
        cueRemoval: !o
      };
    }
    e.attachMedia(d);
  }
  onInterstitialCueEnter() {
    this.onTimeupdate();
  }
  // Scheduling methods
  checkStart() {
    const e = this.schedule, t = e?.events;
    if (!t || this.playbackDisabled || !this.media)
      return;
    this.bufferedPos === -1 && (this.bufferedPos = 0);
    const s = this.timelinePos, r = this.effectivePlayingItem;
    if (s === -1) {
      const n = this.hls.startPosition;
      if (this.timelinePos = n, t.length === 0)
        this.setSchedulePosition(0);
      else if (t[0].cue.pre) {
        this.log(wt("checkStart (preroll)", n));
        const a = e.findEventIndex(t[0].identifier);
        this.setSchedulePosition(a);
      } else if (n >= 0 || !this.primaryLive) {
        this.log(wt("checkStart", n));
        const a = this.timelinePos = n > 0 ? n : 0, o = e.findItemIndexAtTime(a);
        this.setSchedulePosition(o);
      } else this.hls.liveSyncPosition === 0 ? this.setSchedulePosition(0) : this.log("[checkStart] waiting for live start");
    } else if (r && !this.playingItem) {
      this.log(wt("checkStart (playing item)", r.start));
      const n = e.findItemIndex(r);
      this.setSchedulePosition(n);
    }
  }
  advanceAssetBuffering(e, t) {
    const s = e.event, r = s.findAssetIndex(t), n = ji(s, r);
    if (!s.isAssetPastPlayoutLimit(n))
      this.bufferedToEvent(e, n);
    else if (this.schedule) {
      var a;
      const o = (a = this.schedule.items) == null ? void 0 : a[this.findItemIndex(e) + 1];
      o && this.bufferedToItem(o);
    }
  }
  advanceAfterAssetEnded(e, t, s) {
    const r = ji(e, s);
    if (e.isAssetPastPlayoutLimit(r)) {
      if (this.schedule) {
        const n = this.schedule.items;
        if (n) {
          const a = t + 1, o = n.length;
          if (a >= o) {
            this.setSchedulePosition(-1);
            return;
          }
          const u = e.resumeTime;
          this.timelinePos < u && (this.log(wt("advanceAfterAssetEnded", u)), this.timelinePos = u, e.appendInPlace && this.advanceInPlace(u), this.checkBuffer(this.bufferedPos < u)), this.setSchedulePosition(a);
        }
      }
    } else {
      if (e.appendInPlace) {
        const n = e.assetList[r];
        n && this.advanceInPlace(n.timelineStart);
      }
      this.setSchedulePosition(t, r);
    }
  }
  setScheduleToAssetAtTime(e, t) {
    const s = this.schedule;
    if (!s)
      return;
    const r = t.parentIdentifier, n = s.getEvent(r);
    if (n) {
      const a = s.findEventIndex(r), o = s.findAssetIndex(n, e);
      this.advanceAfterAssetEnded(n, a, o - 1);
    }
  }
  setSchedulePosition(e, t) {
    var s;
    const r = (s = this.schedule) == null ? void 0 : s.items;
    if (!r || this.playbackDisabled)
      return;
    const n = e >= 0 ? r[e] : null;
    this.log(`setSchedulePosition ${e}, ${t} (${n && $e(n)}) pos: ${this.timelinePos}`);
    const a = this.waitingItem || this.playingItem, o = this.playingLastItem;
    if (this.isInterstitial(a)) {
      const h = a.event, c = this.playingAsset, d = c?.identifier, g = d ? this.getAssetPlayer(d) : null;
      if (g && d && (!this.eventItemsMatch(a, n) || t !== void 0 && d !== h.assetList[t].identifier)) {
        var u;
        const f = h.findAssetIndex(c);
        if (this.log(`INTERSTITIAL_ASSET_ENDED ${f + 1}/${h.assetList.length} ${Ot(c)}`), this.endedAsset = c, this.playingAsset = null, this.hls.trigger(E.INTERSTITIAL_ASSET_ENDED, {
          asset: c,
          assetListIndex: f,
          event: h,
          schedule: r.slice(0),
          scheduleIndex: e,
          player: g
        }), a !== this.playingItem) {
          this.itemsMatch(a, this.playingItem) && // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          !this.playingAsset && this.advanceAfterAssetEnded(h, this.findItemIndex(this.playingItem), f);
          return;
        }
        this.retreiveMediaSource(d, n), g.media && !((u = this.detachedData) != null && u.mediaSource) && g.detachMedia();
      }
      if (!this.eventItemsMatch(a, n) && (this.endedItem = a, this.playingItem = null, this.log(`INTERSTITIAL_ENDED ${h} ${$e(a)}`), h.hasPlayed = !0, this.hls.trigger(E.INTERSTITIAL_ENDED, {
        event: h,
        schedule: r.slice(0),
        scheduleIndex: e
      }), h.cue.once)) {
        var l;
        this.updateSchedule();
        const f = (l = this.schedule) == null ? void 0 : l.items;
        if (n && f) {
          const m = this.findItemIndex(n);
          this.advanceSchedule(m, f, t, a, o);
        }
        return;
      }
    }
    this.advanceSchedule(e, r, t, a, o);
  }
  advanceSchedule(e, t, s, r, n) {
    const a = this.schedule;
    if (!a)
      return;
    const o = t[e] || null, u = this.primaryMedia, l = this.playerQueue;
    if (l.length && l.forEach((h) => {
      const c = h.interstitial, d = a.findEventIndex(c.identifier);
      (d < e || d > e + 1) && this.clearInterstitial(c, o);
    }), this.isInterstitial(o)) {
      this.timelinePos = Math.min(Math.max(this.timelinePos, o.start), o.end);
      const h = o.event;
      if (s === void 0) {
        s = a.findAssetIndex(h, this.timelinePos);
        const f = ji(h, s - 1);
        if (h.isAssetPastPlayoutLimit(f) || h.appendInPlace && this.timelinePos === o.end) {
          this.advanceAfterAssetEnded(h, e, s);
          return;
        }
        s = f;
      }
      const c = this.waitingItem;
      this.assetsBuffered(o, u) || this.setBufferingItem(o);
      let d = this.preloadAssets(h, s);
      if (this.eventItemsMatch(o, c || r) || (this.waitingItem = o, this.log(`INTERSTITIAL_STARTED ${$e(o)} ${h.appendInPlace ? "append in place" : ""}`), this.hls.trigger(E.INTERSTITIAL_STARTED, {
        event: h,
        schedule: t.slice(0),
        scheduleIndex: e
      })), !h.assetListLoaded) {
        this.log(`Waiting for ASSET-LIST to complete loading ${h}`);
        return;
      }
      if (h.assetListLoader && (h.assetListLoader.destroy(), h.assetListLoader = void 0), !u) {
        this.log(`Waiting for attachMedia to start Interstitial ${h}`);
        return;
      }
      this.waitingItem = this.endedItem = null, this.playingItem = o;
      const g = h.assetList[s];
      if (!g) {
        this.advanceAfterAssetEnded(h, e, s || 0);
        return;
      }
      if (d || (d = this.getAssetPlayer(g.identifier)), d === null || d.destroyed) {
        const f = h.assetList.length;
        this.warn(`asset ${s + 1}/${f} player destroyed ${h}`), d = this.createAssetPlayer(h, g, s), d.loadSource();
      }
      if (!this.eventItemsMatch(o, this.bufferingItem) && h.appendInPlace && this.isAssetBuffered(g))
        return;
      this.startAssetPlayer(d, s, t, e, u), this.shouldPlay && io(d.media);
    } else o ? (this.resumePrimary(o, e, r), this.shouldPlay && io(this.hls.media)) : n && this.isInterstitial(r) && (this.endedItem = null, this.playingItem = r, r.event.appendInPlace || this.attachPrimary(a.durations.primary, null));
  }
  get playbackDisabled() {
    return this.hls.config.enableInterstitialPlayback === !1;
  }
  get primaryDetails() {
    var e;
    return (e = this.mediaSelection) == null ? void 0 : e.main.details;
  }
  get primaryLive() {
    var e;
    return !!((e = this.primaryDetails) != null && e.live);
  }
  resumePrimary(e, t, s) {
    var r, n;
    if (this.playingItem = e, this.playingAsset = this.endedAsset = null, this.waitingItem = this.endedItem = null, this.bufferedToItem(e), this.log(`resuming ${$e(e)}`), !((r = this.detachedData) != null && r.mediaSource)) {
      let o = this.timelinePos;
      (o < e.start || o >= e.end) && (o = this.getPrimaryResumption(e, t), this.log(wt("resumePrimary", o)), this.timelinePos = o), this.attachPrimary(o, e);
    }
    if (!s)
      return;
    const a = (n = this.schedule) == null ? void 0 : n.items;
    a && (this.log(`INTERSTITIALS_PRIMARY_RESUMED ${$e(e)}`), this.hls.trigger(E.INTERSTITIALS_PRIMARY_RESUMED, {
      schedule: a.slice(0),
      scheduleIndex: t
    }), this.checkBuffer());
  }
  getPrimaryResumption(e, t) {
    const s = e.start;
    if (this.primaryLive) {
      const r = this.primaryDetails;
      if (t === 0)
        return this.hls.startPosition;
      if (r && (s < r.fragmentStart || s > r.edge))
        return this.hls.liveSyncPosition || -1;
    }
    return s;
  }
  isAssetBuffered(e) {
    const t = this.getAssetPlayer(e.identifier);
    return t != null && t.hls ? t.hls.bufferedToEnd : j.bufferInfo(this.primaryMedia, this.timelinePos, 0).end + 1 >= e.timelineStart + (e.duration || 0);
  }
  attachPrimary(e, t, s) {
    t ? this.setBufferingItem(t) : this.bufferingItem = this.playingItem, this.bufferingAsset = null;
    const r = this.primaryMedia;
    if (!r)
      return;
    const n = this.hls;
    n.media ? this.checkBuffer() : (this.transferMediaTo(n, r), s && this.startLoadingPrimaryAt(e, s)), s || (this.log(wt("attachPrimary", e)), this.timelinePos = e, this.startLoadingPrimaryAt(e, s));
  }
  startLoadingPrimaryAt(e, t) {
    var s;
    const r = this.hls;
    !r.loadingEnabled || !r.media || Math.abs((((s = r.mainForwardBufferInfo) == null ? void 0 : s.start) || r.media.currentTime) - e) > 0.5 ? r.startLoad(e, t) : r.bufferingEnabled || r.resumeBuffering();
  }
  // HLS.js event callbacks
  onManifestLoading() {
    var e;
    this.stopLoad(), (e = this.schedule) == null || e.reset(), this.emptyPlayerQueue(), this.clearScheduleState(), this.shouldPlay = !1, this.bufferedPos = this.timelinePos = -1, this.mediaSelection = this.altSelection = this.manager = this.requiredTracks = null, this.hls.off(E.BUFFER_CODECS, this.onBufferCodecs, this), this.hls.on(E.BUFFER_CODECS, this.onBufferCodecs, this);
  }
  onLevelUpdated(e, t) {
    if (t.level === -1 || !this.schedule)
      return;
    const s = this.hls.levels[t.level];
    if (!s.details)
      return;
    const r = re(re({}, this.mediaSelection || this.altSelection), {}, {
      main: s
    });
    this.mediaSelection = r, this.schedule.parseInterstitialDateRanges(r, this.hls.config.interstitialAppendInPlace), !this.effectivePlayingItem && this.schedule.items && this.checkStart();
  }
  onAudioTrackUpdated(e, t) {
    const s = this.hls.audioTracks[t.id], r = this.mediaSelection;
    if (!r) {
      this.altSelection = re(re({}, this.altSelection), {}, {
        audio: s
      });
      return;
    }
    const n = re(re({}, r), {}, {
      audio: s
    });
    this.mediaSelection = n;
  }
  onSubtitleTrackUpdated(e, t) {
    const s = this.hls.subtitleTracks[t.id], r = this.mediaSelection;
    if (!r) {
      this.altSelection = re(re({}, this.altSelection), {}, {
        subtitles: s
      });
      return;
    }
    const n = re(re({}, r), {}, {
      subtitles: s
    });
    this.mediaSelection = n;
  }
  onAudioTrackSwitching(e, t) {
    const s = da(t);
    this.playerQueue.forEach(({
      hls: r
    }) => r && (r.setAudioOption(t) || r.setAudioOption(s)));
  }
  onSubtitleTrackSwitch(e, t) {
    const s = da(t);
    this.playerQueue.forEach(({
      hls: r
    }) => r && (r.setSubtitleOption(t) || t.id !== -1 && r.setSubtitleOption(s)));
  }
  onBufferCodecs(e, t) {
    const s = t.tracks;
    s && (this.requiredTracks = s);
  }
  onBufferAppended(e, t) {
    this.checkBuffer();
  }
  onBufferFlushed(e, t) {
    const s = this.playingItem;
    if (s && !this.itemsMatch(s, this.bufferingItem) && !this.isInterstitial(s)) {
      const r = this.timelinePos;
      this.bufferedPos = r, this.checkBuffer();
    }
  }
  onBufferedToEnd(e) {
    if (!this.schedule)
      return;
    const t = this.schedule.events;
    if (this.bufferedPos < Number.MAX_VALUE && t) {
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        if (n.cue.post) {
          var s;
          const a = this.schedule.findEventIndex(n.identifier), o = (s = this.schedule.items) == null ? void 0 : s[a];
          this.isInterstitial(o) && this.eventItemsMatch(o, this.bufferingItem) && this.bufferedToItem(o, 0);
          break;
        }
      }
      this.bufferedPos = Number.MAX_VALUE;
    }
  }
  onMediaEnded(e) {
    const t = this.playingItem;
    if (!this.playingLastItem && t) {
      const s = this.findItemIndex(t);
      this.setSchedulePosition(s + 1);
    } else
      this.shouldPlay = !1;
  }
  updateItem(e, t) {
    var s;
    const r = (s = this.schedule) == null ? void 0 : s.items;
    if (e && r) {
      const n = this.findItemIndex(e, t);
      return r[n] || null;
    }
    return null;
  }
  trimInPlace(e, t) {
    if (this.isInterstitial(e) && e.event.appendInPlace && t.end - e.end > 0.25) {
      e.event.assetList.forEach((n, a) => {
        e.event.isAssetPastPlayoutLimit(a) && this.clearAssetPlayer(n.identifier, null);
      });
      const s = e.end + 0.25, r = j.bufferInfo(this.primaryMedia, s, 0);
      (r.end > s || (r.nextStart || 0) > s) && (this.log(`trim buffered interstitial ${$e(e)} (was ${$e(t)})`), this.attachPrimary(s, null, !0), this.flushFrontBuffer(s));
    }
  }
  itemsMatch(e, t) {
    return !!t && (e === t || e.event && t.event && this.eventItemsMatch(e, t) || !e.event && !t.event && this.findItemIndex(e) === this.findItemIndex(t));
  }
  eventItemsMatch(e, t) {
    var s;
    return !!t && (e === t || e.event.identifier === ((s = t.event) == null ? void 0 : s.identifier));
  }
  findItemIndex(e, t) {
    return e && this.schedule ? this.schedule.findItemIndex(e, t) : -1;
  }
  updateSchedule(e = !1) {
    var t;
    const s = this.mediaSelection;
    s && ((t = this.schedule) == null || t.updateSchedule(s, [], e));
  }
  // Schedule buffer control
  checkBuffer(e) {
    var t;
    const s = (t = this.schedule) == null ? void 0 : t.items;
    if (!s)
      return;
    const r = j.bufferInfo(this.primaryMedia, this.timelinePos, 0);
    e && (this.bufferedPos = this.timelinePos), e || (e = r.len < 1), this.updateBufferedPos(r.end, s, e);
  }
  updateBufferedPos(e, t, s) {
    const r = this.schedule, n = this.bufferingItem;
    if (this.bufferedPos > e || !r)
      return;
    if (t.length === 1 && this.itemsMatch(t[0], n)) {
      this.bufferedPos = e;
      return;
    }
    const a = this.playingItem, o = this.findItemIndex(a);
    let u = r.findItemIndexAtTime(e);
    if (this.bufferedPos < e) {
      var l;
      const h = this.findItemIndex(n), c = Math.min(h + 1, t.length - 1), d = t[c];
      if ((u === -1 && n && e >= n.end || (l = d.event) != null && l.appendInPlace && e + 0.01 >= d.start) && (u = c), this.isInterstitial(n)) {
        const g = n.event;
        if (c - o > 1 && g.appendInPlace === !1 || g.assetList.length === 0 && g.assetListLoader)
          return;
      }
      if (this.bufferedPos = e, u > h && u > o)
        this.bufferedToItem(d);
      else {
        const g = this.primaryDetails;
        this.primaryLive && g && e > g.edge - g.targetduration && d.start < g.edge + this.hls.config.interstitialLiveLookAhead && this.isInterstitial(d) && this.preloadAssets(d.event, 0);
      }
    } else s && a && !this.itemsMatch(a, n) && (u === o ? this.bufferedToItem(a) : u === o + 1 && this.bufferedToItem(t[u]));
  }
  assetsBuffered(e, t) {
    return e.event.assetList.length === 0 ? !1 : !e.event.assetList.some((r) => {
      const n = this.getAssetPlayer(r.identifier);
      return !(n != null && n.bufferedInPlaceToEnd(t));
    });
  }
  setBufferingItem(e) {
    const t = this.bufferingItem, s = this.schedule;
    if (!this.itemsMatch(e, t) && s) {
      const {
        items: r,
        events: n
      } = s;
      if (!r || !n)
        return t;
      const a = this.isInterstitial(e), o = this.getBufferingPlayer();
      this.bufferingItem = e, this.bufferedPos = Math.max(e.start, Math.min(e.end, this.timelinePos));
      const u = o ? o.remaining : t ? t.end - this.timelinePos : 0;
      if (this.log(`INTERSTITIALS_BUFFERED_TO_BOUNDARY ${$e(e)}` + (t ? ` (${u.toFixed(2)} remaining)` : "")), !this.playbackDisabled)
        if (a) {
          const l = s.findAssetIndex(e.event, this.bufferedPos);
          e.event.assetList.forEach((h, c) => {
            const d = this.getAssetPlayer(h.identifier);
            d && (c === l && d.loadSource(), d.resumeBuffering());
          });
        } else
          this.hls.resumeBuffering(), this.playerQueue.forEach((l) => l.pauseBuffering());
      this.hls.trigger(E.INTERSTITIALS_BUFFERED_TO_BOUNDARY, {
        events: n.slice(0),
        schedule: r.slice(0),
        bufferingIndex: this.findItemIndex(e),
        playingIndex: this.findItemIndex(this.playingItem)
      });
    } else this.bufferingItem !== e && (this.bufferingItem = e);
    return t;
  }
  bufferedToItem(e, t = 0) {
    const s = this.setBufferingItem(e);
    if (!this.playbackDisabled) {
      if (this.isInterstitial(e))
        this.bufferedToEvent(e, t);
      else if (s !== null) {
        this.bufferingAsset = null;
        const r = this.detachedData;
        r ? r.mediaSource ? this.attachPrimary(e.start, e, !0) : this.preloadPrimary(e) : this.preloadPrimary(e);
      }
    }
  }
  preloadPrimary(e) {
    const t = this.findItemIndex(e), s = this.getPrimaryResumption(e, t);
    this.startLoadingPrimaryAt(s);
  }
  bufferedToEvent(e, t) {
    const s = e.event, r = s.assetList.length === 0 && !s.assetListLoader, n = s.cue.once;
    if (r || !n) {
      const a = this.preloadAssets(s, t);
      if (a != null && a.interstitial.appendInPlace) {
        const o = this.primaryMedia;
        o && this.bufferAssetPlayer(a, o);
      }
    }
  }
  preloadAssets(e, t) {
    const s = e.assetUrl, r = e.assetList.length, n = r === 0 && !e.assetListLoader, a = e.cue.once;
    if (n) {
      const u = e.timelineStart;
      if (e.appendInPlace) {
        var o;
        const d = this.playingItem;
        !this.isInterstitial(d) && (d == null || (o = d.nextEvent) == null ? void 0 : o.identifier) === e.identifier && this.flushFrontBuffer(u + 0.25);
      }
      let l, h = 0;
      if (!this.playingItem && this.primaryLive && (h = this.hls.startPosition, h === -1 && (h = this.hls.liveSyncPosition || 0)), h && !(e.cue.pre || e.cue.post)) {
        const d = h - u;
        d > 0 && (l = Math.round(d * 1e3) / 1e3);
      }
      if (this.log(`Load interstitial asset ${t + 1}/${s ? 1 : r} ${e}${l ? ` live-start: ${h} start-offset: ${l}` : ""}`), s)
        return this.createAsset(e, 0, 0, u, e.duration, s);
      const c = this.assetListLoader.loadAssetList(e, l);
      c && (e.assetListLoader = c);
    } else if (!a && r) {
      for (let l = t; l < r; l++) {
        const h = e.assetList[l], c = this.getAssetPlayerQueueIndex(h.identifier);
        (c === -1 || this.playerQueue[c].destroyed) && !h.error && this.createAssetPlayer(e, h, l);
      }
      const u = e.assetList[t];
      if (u) {
        const l = this.getAssetPlayer(u.identifier);
        return l && l.loadSource(), l;
      }
    }
    return null;
  }
  flushFrontBuffer(e) {
    const t = this.requiredTracks;
    if (!t)
      return;
    this.log(`Removing front buffer starting at ${e}`), Object.keys(t).forEach((r) => {
      this.hls.trigger(E.BUFFER_FLUSHING, {
        startOffset: e,
        endOffset: 1 / 0,
        type: r
      });
    });
  }
  // Interstitial Asset Player control
  getAssetPlayerQueueIndex(e) {
    const t = this.playerQueue;
    for (let s = 0; s < t.length; s++)
      if (e === t[s].assetId)
        return s;
    return -1;
  }
  getAssetPlayer(e) {
    const t = this.getAssetPlayerQueueIndex(e);
    return this.playerQueue[t] || null;
  }
  getBufferingPlayer() {
    const {
      playerQueue: e,
      primaryMedia: t
    } = this;
    if (t) {
      for (let s = 0; s < e.length; s++)
        if (e[s].media === t)
          return e[s];
    }
    return null;
  }
  createAsset(e, t, s, r, n, a) {
    const o = {
      parentIdentifier: e.identifier,
      identifier: Fm(e, a, t),
      duration: n,
      startOffset: s,
      timelineStart: r,
      uri: a
    };
    return this.createAssetPlayer(e, o, t);
  }
  createAssetPlayer(e, t, s) {
    const r = this.hls, n = r.userConfig;
    let a = n.videoPreference;
    const o = r.loadLevelObj || r.levels[r.currentLevel];
    (a || o) && (a = ae({}, a), o.videoCodec && (a.videoCodec = o.videoCodec), o.videoRange && (a.allowedVideoRanges = [o.videoRange]));
    const u = r.audioTracks[r.audioTrack], l = r.subtitleTracks[r.subtitleTrack];
    let h = 0;
    if (this.primaryLive || e.appendInPlace) {
      const S = this.timelinePos - t.timelineStart;
      if (S > 1) {
        const x = t.duration;
        x && S < x && (h = S);
      }
    }
    const c = t.identifier, d = re(re({}, n), {}, {
      maxMaxBufferLength: Math.min(180, r.config.maxMaxBufferLength),
      autoStartLoad: !0,
      startFragPrefetch: !0,
      primarySessionId: r.sessionId,
      assetPlayerId: c,
      abrEwmaDefaultEstimate: r.bandwidthEstimate,
      interstitialsController: void 0,
      startPosition: h,
      liveDurationInfinity: !1,
      testBandwidth: !1,
      videoPreference: a,
      audioPreference: u || n.audioPreference,
      subtitlePreference: l || n.subtitlePreference
    });
    e.appendInPlace && (e.appendInPlaceStarted = !0, t.timelineStart && (d.timelineOffset = t.timelineStart));
    const g = d.cmcd;
    g != null && g.sessionId && g.contentId && (d.cmcd = ae({}, g, {
      contentId: ns(t.uri)
    })), this.getAssetPlayer(c) && this.warn(`Duplicate date range identifier ${e} and asset ${c}`);
    const f = new Um(this.HlsPlayerClass, d, e, t);
    this.playerQueue.push(f), e.assetList[s] = t;
    let m = !0;
    const p = (S) => {
      if (S.live) {
        var x;
        const I = new Error(`Interstitials MUST be VOD assets ${e}`), _ = {
          fatal: !0,
          type: V.OTHER_ERROR,
          details: D.INTERSTITIAL_ASSET_ITEM_ERROR,
          error: I
        }, b = ((x = this.schedule) == null ? void 0 : x.findEventIndex(e.identifier)) || -1;
        this.handleAssetItemError(_, e, b, s, I.message);
        return;
      }
      const L = S.edge - S.fragmentStart, A = t.duration;
      (m || A === null || L > A) && (m = !1, this.log(`Interstitial asset "${c}" duration change ${A} > ${L}`), t.duration = L, this.updateSchedule());
    };
    f.on(E.LEVEL_UPDATED, (S, {
      details: x
    }) => p(x)), f.on(E.LEVEL_PTS_UPDATED, (S, {
      details: x
    }) => p(x)), f.on(E.EVENT_CUE_ENTER, () => this.onInterstitialCueEnter());
    const y = (S, x) => {
      const L = this.getAssetPlayer(c);
      if (L && x.tracks) {
        L.off(E.BUFFER_CODECS, y), L.tracks = x.tracks;
        const A = this.primaryMedia;
        this.bufferingAsset === L.assetItem && A && !L.media && this.bufferAssetPlayer(L, A);
      }
    };
    f.on(E.BUFFER_CODECS, y);
    const v = () => {
      var S;
      const x = this.getAssetPlayer(c);
      if (this.log(`buffered to end of asset ${x}`), !x || !this.schedule)
        return;
      const L = this.schedule.findEventIndex(e.identifier), A = (S = this.schedule.items) == null ? void 0 : S[L];
      this.isInterstitial(A) && this.advanceAssetBuffering(A, t);
    };
    f.on(E.BUFFERED_TO_END, v);
    const T = (S) => () => {
      if (!this.getAssetPlayer(c) || !this.schedule)
        return;
      this.shouldPlay = !0;
      const L = this.schedule.findEventIndex(e.identifier);
      this.advanceAfterAssetEnded(e, L, S);
    };
    return f.once(E.MEDIA_ENDED, T(s)), f.once(E.PLAYOUT_LIMIT_REACHED, T(1 / 0)), f.on(E.ERROR, (S, x) => {
      if (!this.schedule)
        return;
      const L = this.getAssetPlayer(c);
      if (x.details === D.BUFFER_STALLED_ERROR) {
        if (L != null && L.appendInPlace) {
          this.handleInPlaceStall(e);
          return;
        }
        this.onTimeupdate(), this.checkBuffer(!0);
        return;
      }
      this.handleAssetItemError(x, e, this.schedule.findEventIndex(e.identifier), s, `Asset player error ${x.error} ${e}`);
    }), f.on(E.DESTROYING, () => {
      if (!this.getAssetPlayer(c) || !this.schedule)
        return;
      const x = new Error(`Asset player destroyed unexpectedly ${c}`), L = {
        fatal: !0,
        type: V.OTHER_ERROR,
        details: D.INTERSTITIAL_ASSET_ITEM_ERROR,
        error: x
      };
      this.handleAssetItemError(L, e, this.schedule.findEventIndex(e.identifier), s, x.message);
    }), this.log(`INTERSTITIAL_ASSET_PLAYER_CREATED ${Ot(t)}`), this.hls.trigger(E.INTERSTITIAL_ASSET_PLAYER_CREATED, {
      asset: t,
      assetListIndex: s,
      event: e,
      player: f
    }), f;
  }
  clearInterstitial(e, t) {
    this.clearAssetPlayers(e, t), e.reset();
  }
  clearAssetPlayers(e, t) {
    e.assetList.forEach((s) => {
      this.clearAssetPlayer(s.identifier, t);
    });
  }
  resetAssetPlayer(e) {
    const t = this.getAssetPlayerQueueIndex(e);
    if (t !== -1) {
      this.log(`reset asset player "${e}" after error`);
      const s = this.playerQueue[t];
      this.transferMediaFromPlayer(s, null), s.resetDetails();
    }
  }
  clearAssetPlayer(e, t) {
    const s = this.getAssetPlayerQueueIndex(e);
    if (s !== -1) {
      const r = this.playerQueue[s];
      this.log(`clear ${r} toSegment: ${t && $e(t)}`), this.transferMediaFromPlayer(r, t), this.playerQueue.splice(s, 1), r.destroy();
    }
  }
  emptyPlayerQueue() {
    let e;
    for (; e = this.playerQueue.pop(); )
      e.destroy();
    this.playerQueue = [];
  }
  startAssetPlayer(e, t, s, r, n) {
    const {
      interstitial: a,
      assetItem: o,
      assetId: u
    } = e, l = a.assetList.length, h = this.playingAsset;
    this.endedAsset = null, this.playingAsset = o, (!h || h.identifier !== u) && (h && (this.clearAssetPlayer(h.identifier, s[r]), delete h.error), this.log(`INTERSTITIAL_ASSET_STARTED ${t + 1}/${l} ${Ot(o)}`), this.hls.trigger(E.INTERSTITIAL_ASSET_STARTED, {
      asset: o,
      assetListIndex: t,
      event: a,
      schedule: s.slice(0),
      scheduleIndex: r,
      player: e
    })), this.bufferAssetPlayer(e, n);
  }
  bufferAssetPlayer(e, t) {
    var s, r;
    if (!this.schedule)
      return;
    const {
      interstitial: n,
      assetItem: a
    } = e, o = this.schedule.findEventIndex(n.identifier), u = (s = this.schedule.items) == null ? void 0 : s[o];
    if (!u)
      return;
    e.loadSource(), this.setBufferingItem(u), this.bufferingAsset = a;
    const l = this.getBufferingPlayer();
    if (l === e)
      return;
    const h = n.appendInPlace;
    if (h && l?.interstitial.appendInPlace === !1)
      return;
    const c = l?.tracks || ((r = this.detachedData) == null ? void 0 : r.tracks) || this.requiredTracks;
    if (h && a !== this.playingAsset) {
      if (!e.tracks) {
        this.log(`Waiting for track info before buffering ${e}`);
        return;
      }
      if (c && !al(c, e.tracks)) {
        const d = new Error(`Asset ${Ot(a)} SourceBuffer tracks ('${Object.keys(e.tracks)}') are not compatible with primary content tracks ('${Object.keys(c)}')`), g = {
          fatal: !0,
          type: V.OTHER_ERROR,
          details: D.INTERSTITIAL_ASSET_ITEM_ERROR,
          error: d
        }, f = n.findAssetIndex(a);
        this.handleAssetItemError(g, n, o, f, d.message);
        return;
      }
    }
    this.transferMediaTo(e, t);
  }
  handleInPlaceStall(e) {
    const t = this.schedule, s = this.primaryMedia;
    if (!t || !s)
      return;
    const r = s.currentTime, n = t.findAssetIndex(e, r), a = e.assetList[n];
    if (a) {
      const o = this.getAssetPlayer(a.identifier);
      if (o) {
        const u = o.currentTime || r - a.timelineStart, l = o.duration - u;
        if (this.warn(`Stalled at ${u} of ${u + l} in ${o} ${e} (media.currentTime: ${r})`), u && (l / s.playbackRate < 0.5 || o.bufferedInPlaceToEnd(s)) && o.hls) {
          const h = t.findEventIndex(e.identifier);
          this.advanceAfterAssetEnded(e, h, n);
        }
      }
    }
  }
  advanceInPlace(e) {
    const t = this.primaryMedia;
    t && t.currentTime < e && (t.currentTime = e);
  }
  handleAssetItemError(e, t, s, r, n) {
    if (e.details === D.BUFFER_STALLED_ERROR)
      return;
    const a = t.assetList[r] || null;
    if (this.warn(`INTERSTITIAL_ASSET_ERROR ${a && Ot(a)} ${e.error}`), !this.schedule)
      return;
    const o = a?.identifier || "", u = this.getAssetPlayerQueueIndex(o), l = this.playerQueue[u] || null, h = this.schedule.items, c = ae({}, e, {
      fatal: !1,
      errorAction: Nt(!0),
      asset: a,
      assetListIndex: r,
      event: t,
      schedule: h,
      scheduleIndex: s,
      player: l
    });
    if (this.hls.trigger(E.INTERSTITIAL_ASSET_ERROR, c), !e.fatal)
      return;
    const d = this.playingAsset, g = this.bufferingAsset, f = new Error(n);
    if (a && (this.clearAssetPlayer(o, null), a.error = f), !t.assetList.some((m) => !m.error))
      t.error = f;
    else
      for (let m = r; m < t.assetList.length; m++)
        this.resetAssetPlayer(t.assetList[m].identifier);
    this.updateSchedule(!0), t.error ? this.primaryFallback(t) : d && d.identifier === o ? this.advanceAfterAssetEnded(t, s, r) : g && g.identifier === o && this.isInterstitial(this.bufferingItem) && this.advanceAssetBuffering(this.bufferingItem, g);
  }
  primaryFallback(e) {
    const t = e.timelineStart, s = this.effectivePlayingItem;
    let r = this.timelinePos;
    if (s) {
      this.log(`Fallback to primary from event "${e.identifier}" start: ${t} pos: ${r} playing: ${$e(s)} error: ${e.error}`), r === -1 && (r = this.hls.startPosition);
      const a = this.updateItem(s, r);
      this.itemsMatch(s, a) && this.clearInterstitial(e, null), e.appendInPlace && (this.attachPrimary(t, null), this.flushFrontBuffer(t));
    } else if (r === -1) {
      this.checkStart();
      return;
    }
    if (!this.schedule)
      return;
    const n = this.schedule.findItemIndexAtTime(r);
    this.setSchedulePosition(n);
  }
  // Asset List loading
  onAssetListLoaded(e, t) {
    var s, r;
    const n = t.event, a = n.identifier, o = t.assetListResponse.ASSETS;
    if (!((s = this.schedule) != null && s.hasEvent(a)))
      return;
    const u = n.timelineStart, l = n.duration;
    let h = 0;
    o.forEach((m, p) => {
      const y = parseFloat(m.DURATION);
      this.createAsset(n, p, h, u + h, y, m.URI), h += y;
    }), n.duration = h, this.log(`Loaded asset-list with duration: ${h} (was: ${l}) ${n}`);
    const c = this.waitingItem, d = c?.event.identifier === a;
    this.updateSchedule();
    const g = (r = this.bufferingItem) == null ? void 0 : r.event;
    if (d) {
      var f;
      const m = this.schedule.findEventIndex(a), p = (f = this.schedule.items) == null ? void 0 : f[m];
      if (p) {
        if (!this.playingItem && this.timelinePos > p.end && this.schedule.findItemIndexAtTime(this.timelinePos) !== m) {
          n.error = new Error(`Interstitial ${o.length ? "no longer within playback range" : "asset-list is empty"} ${this.timelinePos} ${n}`), this.log(n.error.message), this.updateSchedule(!0), this.primaryFallback(n);
          return;
        }
        this.setBufferingItem(p);
      }
      this.setSchedulePosition(m);
    } else if (g?.identifier === a) {
      const m = n.assetList[0];
      if (m) {
        const p = this.getAssetPlayer(m.identifier);
        if (g.appendInPlace) {
          const y = this.primaryMedia;
          p && y && this.bufferAssetPlayer(p, y);
        } else p && p.loadSource();
      }
    }
  }
  onError(e, t) {
    if (this.schedule)
      switch (t.details) {
        case D.ASSET_LIST_PARSING_ERROR:
        case D.ASSET_LIST_LOAD_ERROR:
        case D.ASSET_LIST_LOAD_TIMEOUT: {
          const s = t.interstitial;
          s && (this.updateSchedule(!0), this.primaryFallback(s));
          break;
        }
        case D.BUFFER_STALLED_ERROR: {
          const s = this.endedItem || this.waitingItem || this.playingItem;
          if (this.isInterstitial(s) && s.event.appendInPlace) {
            this.handleInPlaceStall(s.event);
            return;
          }
          this.log(`Primary player stall @${this.timelinePos} bufferedPos: ${this.bufferedPos}`), this.onTimeupdate(), this.checkBuffer(!0);
          break;
        }
      }
  }
}
const ro = 500;
class Vm extends on {
  constructor(e, t, s) {
    super(e, t, s, "subtitle-stream-controller", B.SUBTITLE), this.currentTrackId = -1, this.tracksBuffered = [], this.mainDetails = null, this.registerListeners();
  }
  onHandlerDestroying() {
    this.unregisterListeners(), super.onHandlerDestroying(), this.mainDetails = null;
  }
  registerListeners() {
    super.registerListeners();
    const {
      hls: e
    } = this;
    e.on(E.LEVEL_LOADED, this.onLevelLoaded, this), e.on(E.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.on(E.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.on(E.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.on(E.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), e.on(E.BUFFER_FLUSHING, this.onBufferFlushing, this);
  }
  unregisterListeners() {
    super.unregisterListeners();
    const {
      hls: e
    } = this;
    e.off(E.LEVEL_LOADED, this.onLevelLoaded, this), e.off(E.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.off(E.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.off(E.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.off(E.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), e.off(E.BUFFER_FLUSHING, this.onBufferFlushing, this);
  }
  startLoad(e, t) {
    this.stopLoad(), this.state = C.IDLE, this.setInterval(ro), this.nextLoadPosition = this.lastCurrentTime = e + this.timelineOffset, this.startPosition = t ? -1 : e, this.tick();
  }
  onManifestLoading() {
    super.onManifestLoading(), this.mainDetails = null;
  }
  onMediaDetaching(e, t) {
    this.tracksBuffered = [], super.onMediaDetaching(e, t);
  }
  onLevelLoaded(e, t) {
    this.mainDetails = t.details;
  }
  onSubtitleFragProcessed(e, t) {
    const {
      frag: s,
      success: r
    } = t;
    if (this.fragContextChanged(s) || (ge(s) && (this.fragPrevious = s), this.state = C.IDLE), !r)
      return;
    const n = this.tracksBuffered[this.currentTrackId];
    if (!n)
      return;
    let a;
    const o = s.start;
    for (let l = 0; l < n.length; l++)
      if (o >= n[l].start && o <= n[l].end) {
        a = n[l];
        break;
      }
    const u = s.start + s.duration;
    a ? a.end = u : (a = {
      start: o,
      end: u
    }, n.push(a)), this.fragmentTracker.fragBuffered(s), this.fragBufferedComplete(s, null), this.media && this.tick();
  }
  onBufferFlushing(e, t) {
    const {
      startOffset: s,
      endOffset: r
    } = t;
    if (s === 0 && r !== Number.POSITIVE_INFINITY) {
      const n = r - 1;
      if (n <= 0)
        return;
      t.endOffsetSubtitles = Math.max(0, n), this.tracksBuffered.forEach((a) => {
        for (let o = 0; o < a.length; ) {
          if (a[o].end <= n) {
            a.shift();
            continue;
          } else if (a[o].start < n)
            a[o].start = n;
          else
            break;
          o++;
        }
      }), this.fragmentTracker.removeFragmentsInRange(s, n, B.SUBTITLE);
    }
  }
  // If something goes wrong, proceed to next frag, if we were processing one.
  onError(e, t) {
    const s = t.frag;
    s?.type === B.SUBTITLE && (t.details === D.FRAG_GAP && this.fragmentTracker.fragBuffered(s, !0), this.fragCurrent && this.fragCurrent.abortRequests(), this.state !== C.STOPPED && (this.state = C.IDLE));
  }
  // Got all new subtitle levels.
  onSubtitleTracksUpdated(e, {
    subtitleTracks: t
  }) {
    if (this.levels && uu(this.levels, t)) {
      this.levels = t.map((s) => new us(s));
      return;
    }
    this.tracksBuffered = [], this.levels = t.map((s) => {
      const r = new us(s);
      return this.tracksBuffered[r.id] = [], r;
    }), this.fragmentTracker.removeFragmentsInRange(0, Number.POSITIVE_INFINITY, B.SUBTITLE), this.fragPrevious = null, this.mediaBuffer = null;
  }
  onSubtitleTrackSwitch(e, t) {
    var s;
    if (this.currentTrackId = t.id, !((s = this.levels) != null && s.length) || this.currentTrackId === -1) {
      this.clearInterval();
      return;
    }
    const r = this.levels[this.currentTrackId];
    r != null && r.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, r && this.state !== C.STOPPED && this.setInterval(ro);
  }
  // Got a new set of subtitle fragments.
  onSubtitleTrackLoaded(e, t) {
    var s;
    const {
      currentTrackId: r,
      levels: n
    } = this, {
      details: a,
      id: o
    } = t;
    if (!n) {
      this.warn(`Subtitle tracks were reset while loading level ${o}`);
      return;
    }
    const u = n[o];
    if (o >= n.length || !u)
      return;
    this.log(`Subtitle track ${o} loaded [${a.startSN},${a.endSN}]${a.lastPartSn ? `[part-${a.lastPartSn}-${a.lastPartIndex}]` : ""},duration:${a.totalduration}`), this.mediaBuffer = this.mediaBufferTimeRanges;
    let l = 0;
    if (a.live || (s = u.details) != null && s.live) {
      if (a.deltaUpdateFailed)
        return;
      const c = this.mainDetails;
      if (!c) {
        this.startFragRequested = !1;
        return;
      }
      const d = c.fragments[0];
      if (!u.details)
        a.hasProgramDateTime && c.hasProgramDateTime ? (ai(a, c), l = a.fragmentStart) : d && (l = d.start, br(a, l));
      else {
        var h;
        l = this.alignPlaylists(a, u.details, (h = this.levelLastLoaded) == null ? void 0 : h.details), l === 0 && d && (l = d.start, br(a, l));
      }
      c && !this.startFragRequested && this.setStartPosition(c, l);
    }
    u.details = a, this.levelLastLoaded = u, o === r && (this.hls.trigger(E.SUBTITLE_TRACK_UPDATED, {
      details: a,
      id: o,
      groupId: t.groupId
    }), this.tick(), a.live && !this.fragCurrent && this.media && this.state === C.IDLE && (It(null, a.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), u.details = void 0)));
  }
  _handleFragmentLoadComplete(e) {
    const {
      frag: t,
      payload: s
    } = e, r = t.decryptdata, n = this.hls;
    if (!this.fragContextChanged(t) && s && s.byteLength > 0 && r != null && r.key && r.iv && Bt(r.method)) {
      const a = performance.now();
      this.decrypter.decrypt(new Uint8Array(s), r.key.buffer, r.iv.buffer, nn(r.method)).catch((o) => {
        throw n.trigger(E.ERROR, {
          type: V.MEDIA_ERROR,
          details: D.FRAG_DECRYPT_ERROR,
          fatal: !1,
          error: o,
          reason: o.message,
          frag: t
        }), o;
      }).then((o) => {
        const u = performance.now();
        n.trigger(E.FRAG_DECRYPTED, {
          frag: t,
          payload: o,
          stats: {
            tstart: a,
            tdecrypt: u
          }
        });
      }).catch((o) => {
        this.warn(`${o.name}: ${o.message}`), this.state = C.IDLE;
      });
    }
  }
  doTick() {
    if (!this.media) {
      this.state = C.IDLE;
      return;
    }
    if (this.state === C.IDLE) {
      const {
        currentTrackId: e,
        levels: t
      } = this, s = t?.[e];
      if (!s || !t.length || !s.details || this.waitForLive(s))
        return;
      const {
        config: r
      } = this, n = this.getLoadPosition(), a = j.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], n, r.maxBufferHole), {
        end: o,
        len: u
      } = a, l = s.details, h = this.hls.maxBufferLength + l.levelTargetDuration;
      if (u > h)
        return;
      const c = l.fragments, d = c.length, g = l.edge;
      let f = null;
      const m = this.fragPrevious;
      if (o < g) {
        const v = r.maxFragLookUpTolerance, T = o > g - v ? 0 : v;
        f = It(m, c, Math.max(c[0].start, o), T), !f && m && m.start < c[0].start && (f = c[0]);
      } else
        f = c[d - 1];
      if (f = this.filterReplacedPrimary(f, s.details), !f)
        return;
      const p = f.sn - l.startSN, y = c[p - 1];
      if (y && y.cc === f.cc && this.fragmentTracker.getState(y) === pe.NOT_LOADED && (f = y), this.fragmentTracker.getState(f) === pe.NOT_LOADED) {
        const v = this.mapToInitFragWhenRequired(f);
        v && this.loadFragment(v, s, o);
      }
    }
  }
  loadFragment(e, t, s) {
    ge(e) ? super.loadFragment(e, t, s) : this._loadInitSegment(e, t);
  }
  get mediaBufferTimeRanges() {
    return new Km(this.tracksBuffered[this.currentTrackId] || []);
  }
}
class Km {
  constructor(e) {
    this.buffered = void 0;
    const t = (s, r, n) => {
      if (r = r >>> 0, r > n - 1)
        throw new DOMException(`Failed to execute '${s}' on 'TimeRanges': The index provided (${r}) is greater than the maximum bound (${n})`);
      return e[r][s];
    };
    this.buffered = {
      get length() {
        return e.length;
      },
      end(s) {
        return t("end", s, e.length);
      },
      start(s) {
        return t("start", s, e.length);
      }
    };
  }
}
const Wm = {
  42: 225,
  // lowercase a, acute accent
  92: 233,
  // lowercase e, acute accent
  94: 237,
  // lowercase i, acute accent
  95: 243,
  // lowercase o, acute accent
  96: 250,
  // lowercase u, acute accent
  123: 231,
  // lowercase c with cedilla
  124: 247,
  // division symbol
  125: 209,
  // uppercase N tilde
  126: 241,
  // lowercase n tilde
  127: 9608,
  // Full block
  // THIS BLOCK INCLUDES THE 16 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x11 AND LOW BETWEEN 0x30 AND 0x3F
  // THIS MEANS THAT \x50 MUST BE ADDED TO THE VALUES
  128: 174,
  // Registered symbol (R)
  129: 176,
  // degree sign
  130: 189,
  // 1/2 symbol
  131: 191,
  // Inverted (open) question mark
  132: 8482,
  // Trademark symbol (TM)
  133: 162,
  // Cents symbol
  134: 163,
  // Pounds sterling
  135: 9834,
  // Music 8'th note
  136: 224,
  // lowercase a, grave accent
  137: 32,
  // transparent space (regular)
  138: 232,
  // lowercase e, grave accent
  139: 226,
  // lowercase a, circumflex accent
  140: 234,
  // lowercase e, circumflex accent
  141: 238,
  // lowercase i, circumflex accent
  142: 244,
  // lowercase o, circumflex accent
  143: 251,
  // lowercase u, circumflex accent
  // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x12 AND LOW BETWEEN 0x20 AND 0x3F
  144: 193,
  // capital letter A with acute
  145: 201,
  // capital letter E with acute
  146: 211,
  // capital letter O with acute
  147: 218,
  // capital letter U with acute
  148: 220,
  // capital letter U with diaresis
  149: 252,
  // lowercase letter U with diaeresis
  150: 8216,
  // opening single quote
  151: 161,
  // inverted exclamation mark
  152: 42,
  // asterisk
  153: 8217,
  // closing single quote
  154: 9473,
  // box drawings heavy horizontal
  155: 169,
  // copyright sign
  156: 8480,
  // Service mark
  157: 8226,
  // (round) bullet
  158: 8220,
  // Left double quotation mark
  159: 8221,
  // Right double quotation mark
  160: 192,
  // uppercase A, grave accent
  161: 194,
  // uppercase A, circumflex
  162: 199,
  // uppercase C with cedilla
  163: 200,
  // uppercase E, grave accent
  164: 202,
  // uppercase E, circumflex
  165: 203,
  // capital letter E with diaresis
  166: 235,
  // lowercase letter e with diaresis
  167: 206,
  // uppercase I, circumflex
  168: 207,
  // uppercase I, with diaresis
  169: 239,
  // lowercase i, with diaresis
  170: 212,
  // uppercase O, circumflex
  171: 217,
  // uppercase U, grave accent
  172: 249,
  // lowercase u, grave accent
  173: 219,
  // uppercase U, circumflex
  174: 171,
  // left-pointing double angle quotation mark
  175: 187,
  // right-pointing double angle quotation mark
  // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x13 AND LOW BETWEEN 0x20 AND 0x3F
  176: 195,
  // Uppercase A, tilde
  177: 227,
  // Lowercase a, tilde
  178: 205,
  // Uppercase I, acute accent
  179: 204,
  // Uppercase I, grave accent
  180: 236,
  // Lowercase i, grave accent
  181: 210,
  // Uppercase O, grave accent
  182: 242,
  // Lowercase o, grave accent
  183: 213,
  // Uppercase O, tilde
  184: 245,
  // Lowercase o, tilde
  185: 123,
  // Open curly brace
  186: 125,
  // Closing curly brace
  187: 92,
  // Backslash
  188: 94,
  // Caret
  189: 95,
  // Underscore
  190: 124,
  // Pipe (vertical line)
  191: 8764,
  // Tilde operator
  192: 196,
  // Uppercase A, umlaut
  193: 228,
  // Lowercase A, umlaut
  194: 214,
  // Uppercase O, umlaut
  195: 246,
  // Lowercase o, umlaut
  196: 223,
  // Esszett (sharp S)
  197: 165,
  // Yen symbol
  198: 164,
  // Generic currency sign
  199: 9475,
  // Box drawings heavy vertical
  200: 197,
  // Uppercase A, ring
  201: 229,
  // Lowercase A, ring
  202: 216,
  // Uppercase O, stroke
  203: 248,
  // Lowercase o, strok
  204: 9487,
  // Box drawings heavy down and right
  205: 9491,
  // Box drawings heavy down and left
  206: 9495,
  // Box drawings heavy up and right
  207: 9499
  // Box drawings heavy up and left
}, bu = (i) => String.fromCharCode(Wm[i] || i), Ge = 15, Je = 100, Ym = {
  17: 1,
  18: 3,
  21: 5,
  22: 7,
  23: 9,
  16: 11,
  19: 12,
  20: 14
}, jm = {
  17: 2,
  18: 4,
  21: 6,
  22: 8,
  23: 10,
  19: 13,
  20: 15
}, qm = {
  25: 1,
  26: 3,
  29: 5,
  30: 7,
  31: 9,
  24: 11,
  27: 12,
  28: 14
}, Xm = {
  25: 2,
  26: 4,
  29: 6,
  30: 8,
  31: 10,
  27: 13,
  28: 15
}, zm = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"];
class Qm {
  constructor() {
    this.time = null, this.verboseLevel = 0;
  }
  log(e, t) {
    if (this.verboseLevel >= e) {
      const s = typeof t == "function" ? t() : t;
      ne.log(`${this.time} [${e}] ${s}`);
    }
  }
}
const Et = function(e) {
  const t = [];
  for (let s = 0; s < e.length; s++)
    t.push(e[s].toString(16));
  return t;
};
class Lu {
  constructor() {
    this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
  }
  reset() {
    this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
  }
  setStyles(e) {
    const t = ["foreground", "underline", "italics", "background", "flash"];
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      e.hasOwnProperty(r) && (this[r] = e[r]);
    }
  }
  isDefault() {
    return this.foreground === "white" && !this.underline && !this.italics && this.background === "black" && !this.flash;
  }
  equals(e) {
    return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash;
  }
  copy(e) {
    this.foreground = e.foreground, this.underline = e.underline, this.italics = e.italics, this.background = e.background, this.flash = e.flash;
  }
  toString() {
    return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash;
  }
}
class Zm {
  constructor() {
    this.uchar = " ", this.penState = new Lu();
  }
  reset() {
    this.uchar = " ", this.penState.reset();
  }
  setChar(e, t) {
    this.uchar = e, this.penState.copy(t);
  }
  setPenState(e) {
    this.penState.copy(e);
  }
  equals(e) {
    return this.uchar === e.uchar && this.penState.equals(e.penState);
  }
  copy(e) {
    this.uchar = e.uchar, this.penState.copy(e.penState);
  }
  isEmpty() {
    return this.uchar === " " && this.penState.isDefault();
  }
}
class Jm {
  constructor(e) {
    this.chars = [], this.pos = 0, this.currPenState = new Lu(), this.cueStartTime = null, this.logger = void 0;
    for (let t = 0; t < Je; t++)
      this.chars.push(new Zm());
    this.logger = e;
  }
  equals(e) {
    for (let t = 0; t < Je; t++)
      if (!this.chars[t].equals(e.chars[t]))
        return !1;
    return !0;
  }
  copy(e) {
    for (let t = 0; t < Je; t++)
      this.chars[t].copy(e.chars[t]);
  }
  isEmpty() {
    let e = !0;
    for (let t = 0; t < Je; t++)
      if (!this.chars[t].isEmpty()) {
        e = !1;
        break;
      }
    return e;
  }
  /**
   *  Set the cursor to a valid column.
   */
  setCursor(e) {
    this.pos !== e && (this.pos = e), this.pos < 0 ? (this.logger.log(3, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > Je && (this.logger.log(3, "Too large cursor position " + this.pos), this.pos = Je);
  }
  /**
   * Move the cursor relative to current position.
   */
  moveCursor(e) {
    const t = this.pos + e;
    if (e > 1)
      for (let s = this.pos + 1; s < t + 1; s++)
        this.chars[s].setPenState(this.currPenState);
    this.setCursor(t);
  }
  /**
   * Backspace, move one step back and clear character.
   */
  backSpace() {
    this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState);
  }
  insertChar(e) {
    e >= 144 && this.backSpace();
    const t = bu(e);
    if (this.pos >= Je) {
      this.logger.log(0, () => "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!");
      return;
    }
    this.chars[this.pos].setChar(t, this.currPenState), this.moveCursor(1);
  }
  clearFromPos(e) {
    let t;
    for (t = e; t < Je; t++)
      this.chars[t].reset();
  }
  clear() {
    this.clearFromPos(0), this.pos = 0, this.currPenState.reset();
  }
  clearToEndOfRow() {
    this.clearFromPos(this.pos);
  }
  getTextString() {
    const e = [];
    let t = !0;
    for (let s = 0; s < Je; s++) {
      const r = this.chars[s].uchar;
      r !== " " && (t = !1), e.push(r);
    }
    return t ? "" : e.join("");
  }
  setPenStyles(e) {
    this.currPenState.setStyles(e), this.chars[this.pos].setPenState(this.currPenState);
  }
}
class qi {
  constructor(e) {
    this.rows = [], this.currRow = Ge - 1, this.nrRollUpRows = null, this.lastOutputScreen = null, this.logger = void 0;
    for (let t = 0; t < Ge; t++)
      this.rows.push(new Jm(e));
    this.logger = e;
  }
  reset() {
    for (let e = 0; e < Ge; e++)
      this.rows[e].clear();
    this.currRow = Ge - 1;
  }
  equals(e) {
    let t = !0;
    for (let s = 0; s < Ge; s++)
      if (!this.rows[s].equals(e.rows[s])) {
        t = !1;
        break;
      }
    return t;
  }
  copy(e) {
    for (let t = 0; t < Ge; t++)
      this.rows[t].copy(e.rows[t]);
  }
  isEmpty() {
    let e = !0;
    for (let t = 0; t < Ge; t++)
      if (!this.rows[t].isEmpty()) {
        e = !1;
        break;
      }
    return e;
  }
  backSpace() {
    this.rows[this.currRow].backSpace();
  }
  clearToEndOfRow() {
    this.rows[this.currRow].clearToEndOfRow();
  }
  /**
   * Insert a character (without styling) in the current row.
   */
  insertChar(e) {
    this.rows[this.currRow].insertChar(e);
  }
  setPen(e) {
    this.rows[this.currRow].setPenStyles(e);
  }
  moveCursor(e) {
    this.rows[this.currRow].moveCursor(e);
  }
  setCursor(e) {
    this.logger.log(2, "setCursor: " + e), this.rows[this.currRow].setCursor(e);
  }
  setPAC(e) {
    this.logger.log(2, () => "pacData = " + le(e));
    let t = e.row - 1;
    if (this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== t) {
      for (let o = 0; o < Ge; o++)
        this.rows[o].clear();
      const n = this.currRow + 1 - this.nrRollUpRows, a = this.lastOutputScreen;
      if (a) {
        const o = a.rows[n].cueStartTime, u = this.logger.time;
        if (o !== null && u !== null && o < u)
          for (let l = 0; l < this.nrRollUpRows; l++)
            this.rows[t - this.nrRollUpRows + l + 1].copy(a.rows[n + l]);
      }
    }
    this.currRow = t;
    const s = this.rows[this.currRow];
    if (e.indent !== null) {
      const n = e.indent, a = Math.max(n - 1, 0);
      s.setCursor(e.indent), e.color = s.chars[a].penState.foreground;
    }
    const r = {
      foreground: e.color,
      underline: e.underline,
      italics: e.italics,
      background: "black",
      flash: !1
    };
    this.setPen(r);
  }
  /**
   * Set background/extra foreground, but first do back_space, and then insert space (backwards compatibility).
   */
  setBkgData(e) {
    this.logger.log(2, () => "bkgData = " + le(e)), this.backSpace(), this.setPen(e), this.insertChar(32);
  }
  setRollUpRows(e) {
    this.nrRollUpRows = e;
  }
  rollUp() {
    if (this.nrRollUpRows === null) {
      this.logger.log(3, "roll_up but nrRollUpRows not set yet");
      return;
    }
    this.logger.log(1, () => this.getDisplayText());
    const e = this.currRow + 1 - this.nrRollUpRows, t = this.rows.splice(e, 1)[0];
    t.clear(), this.rows.splice(this.currRow, 0, t), this.logger.log(2, "Rolling up");
  }
  /**
   * Get all non-empty rows with as unicode text.
   */
  getDisplayText(e) {
    e = e || !1;
    const t = [];
    let s = "", r = -1;
    for (let n = 0; n < Ge; n++) {
      const a = this.rows[n].getTextString();
      a && (r = n + 1, e ? t.push("Row " + r + ": '" + a + "'") : t.push(a.trim()));
    }
    return t.length > 0 && (e ? s = "[" + t.join(" | ") + "]" : s = t.join(`
`)), s;
  }
  getTextAndFormat() {
    return this.rows;
  }
}
class no {
  constructor(e, t, s) {
    this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = e, this.outputFilter = t, this.mode = null, this.verbose = 0, this.displayedMemory = new qi(s), this.nonDisplayedMemory = new qi(s), this.lastOutputScreen = new qi(s), this.currRollUpRow = this.displayedMemory.rows[Ge - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = s;
  }
  reset() {
    this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[Ge - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null;
  }
  getHandler() {
    return this.outputFilter;
  }
  setHandler(e) {
    this.outputFilter = e;
  }
  setPAC(e) {
    this.writeScreen.setPAC(e);
  }
  setBkgData(e) {
    this.writeScreen.setBkgData(e);
  }
  setMode(e) {
    e !== this.mode && (this.mode = e, this.logger.log(2, () => "MODE=" + e), this.mode === "MODE_POP-ON" ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), this.mode !== "MODE_ROLL-UP" && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e);
  }
  insertChars(e) {
    for (let s = 0; s < e.length; s++)
      this.writeScreen.insertChar(e[s]);
    const t = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
    this.logger.log(2, () => t + ": " + this.writeScreen.getDisplayText(!0)), (this.mode === "MODE_PAINT-ON" || this.mode === "MODE_ROLL-UP") && (this.logger.log(1, () => "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate());
  }
  ccRCL() {
    this.logger.log(2, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON");
  }
  ccBS() {
    this.logger.log(2, "BS - BackSpace"), this.mode !== "MODE_TEXT" && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate());
  }
  ccAOF() {
  }
  ccAON() {
  }
  ccDER() {
    this.logger.log(2, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate();
  }
  ccRU(e) {
    this.logger.log(2, "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e);
  }
  ccFON() {
    this.logger.log(2, "FON - Flash On"), this.writeScreen.setPen({
      flash: !0
    });
  }
  ccRDC() {
    this.logger.log(2, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON");
  }
  ccTR() {
    this.logger.log(2, "TR"), this.setMode("MODE_TEXT");
  }
  ccRTD() {
    this.logger.log(2, "RTD"), this.setMode("MODE_TEXT");
  }
  ccEDM() {
    this.logger.log(2, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0);
  }
  ccCR() {
    this.logger.log(2, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0);
  }
  ccENM() {
    this.logger.log(2, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset();
  }
  ccEOC() {
    if (this.logger.log(2, "EOC - End Of Caption"), this.mode === "MODE_POP-ON") {
      const e = this.displayedMemory;
      this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = e, this.writeScreen = this.nonDisplayedMemory, this.logger.log(1, () => "DISP: " + this.displayedMemory.getDisplayText());
    }
    this.outputDataUpdate(!0);
  }
  ccTO(e) {
    this.logger.log(2, "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e);
  }
  ccMIDROW(e) {
    const t = {
      flash: !1
    };
    if (t.underline = e % 2 === 1, t.italics = e >= 46, t.italics)
      t.foreground = "white";
    else {
      const s = Math.floor(e / 2) - 16, r = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
      t.foreground = r[s];
    }
    this.logger.log(2, "MIDROW: " + le(t)), this.writeScreen.setPen(t);
  }
  outputDataUpdate(e = !1) {
    const t = this.logger.time;
    t !== null && this.outputFilter && (this.cueStartTime === null && !this.displayedMemory.isEmpty() ? this.cueStartTime = t : this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, t, this.lastOutputScreen), e && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : t), this.lastOutputScreen.copy(this.displayedMemory));
  }
  cueSplitAtTime(e) {
    this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e));
  }
}
class ao {
  constructor(e, t, s) {
    this.channels = void 0, this.currentChannel = 0, this.cmdHistory = tp(), this.logger = void 0;
    const r = this.logger = new Qm();
    this.channels = [null, new no(e, t, r), new no(e + 1, s, r)];
  }
  getHandler(e) {
    return this.channels[e].getHandler();
  }
  setHandler(e, t) {
    this.channels[e].setHandler(t);
  }
  /**
   * Add data for time t in forms of list of bytes (unsigned ints). The bytes are treated as pairs.
   */
  addData(e, t) {
    this.logger.time = e;
    for (let s = 0; s < t.length; s += 2) {
      const r = t[s] & 127, n = t[s + 1] & 127;
      let a = !1, o = null;
      if (r === 0 && n === 0)
        continue;
      this.logger.log(3, () => "[" + Et([t[s], t[s + 1]]) + "] -> (" + Et([r, n]) + ")");
      const u = this.cmdHistory;
      if (r >= 16 && r <= 31) {
        if (ep(r, n, u)) {
          Cs(null, null, u), this.logger.log(3, () => "Repeated command (" + Et([r, n]) + ") is dropped");
          continue;
        }
        Cs(r, n, this.cmdHistory), a = this.parseCmd(r, n), a || (a = this.parseMidrow(r, n)), a || (a = this.parsePAC(r, n)), a || (a = this.parseBackgroundAttributes(r, n));
      } else
        Cs(null, null, u);
      if (!a && (o = this.parseChars(r, n), o)) {
        const h = this.currentChannel;
        h && h > 0 ? this.channels[h].insertChars(o) : this.logger.log(2, "No channel found yet. TEXT-MODE?");
      }
      !a && !o && this.logger.log(2, () => "Couldn't parse cleaned data " + Et([r, n]) + " orig: " + Et([t[s], t[s + 1]]));
    }
  }
  /**
   * Parse Command.
   * @returns True if a command was found
   */
  parseCmd(e, t) {
    const s = (e === 20 || e === 28 || e === 21 || e === 29) && t >= 32 && t <= 47, r = (e === 23 || e === 31) && t >= 33 && t <= 35;
    if (!(s || r))
      return !1;
    const n = e === 20 || e === 21 || e === 23 ? 1 : 2, a = this.channels[n];
    return e === 20 || e === 21 || e === 28 || e === 29 ? t === 32 ? a.ccRCL() : t === 33 ? a.ccBS() : t === 34 ? a.ccAOF() : t === 35 ? a.ccAON() : t === 36 ? a.ccDER() : t === 37 ? a.ccRU(2) : t === 38 ? a.ccRU(3) : t === 39 ? a.ccRU(4) : t === 40 ? a.ccFON() : t === 41 ? a.ccRDC() : t === 42 ? a.ccTR() : t === 43 ? a.ccRTD() : t === 44 ? a.ccEDM() : t === 45 ? a.ccCR() : t === 46 ? a.ccENM() : t === 47 && a.ccEOC() : a.ccTO(t - 32), this.currentChannel = n, !0;
  }
  /**
   * Parse midrow styling command
   */
  parseMidrow(e, t) {
    let s = 0;
    if ((e === 17 || e === 25) && t >= 32 && t <= 47) {
      if (e === 17 ? s = 1 : s = 2, s !== this.currentChannel)
        return this.logger.log(0, "Mismatch channel in midrow parsing"), !1;
      const r = this.channels[s];
      return r ? (r.ccMIDROW(t), this.logger.log(3, () => "MIDROW (" + Et([e, t]) + ")"), !0) : !1;
    }
    return !1;
  }
  /**
   * Parse Preable Access Codes (Table 53).
   * @returns {Boolean} Tells if PAC found
   */
  parsePAC(e, t) {
    let s;
    const r = (e >= 17 && e <= 23 || e >= 25 && e <= 31) && t >= 64 && t <= 127, n = (e === 16 || e === 24) && t >= 64 && t <= 95;
    if (!(r || n))
      return !1;
    const a = e <= 23 ? 1 : 2;
    t >= 64 && t <= 95 ? s = a === 1 ? Ym[e] : qm[e] : s = a === 1 ? jm[e] : Xm[e];
    const o = this.channels[a];
    return o ? (o.setPAC(this.interpretPAC(s, t)), this.currentChannel = a, !0) : !1;
  }
  /**
   * Interpret the second byte of the pac, and return the information.
   * @returns pacData with style parameters
   */
  interpretPAC(e, t) {
    let s;
    const r = {
      color: null,
      italics: !1,
      indent: null,
      underline: !1,
      row: e
    };
    return t > 95 ? s = t - 96 : s = t - 64, r.underline = (s & 1) === 1, s <= 13 ? r.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(s / 2)] : s <= 15 ? (r.italics = !0, r.color = "white") : r.indent = Math.floor((s - 16) / 2) * 4, r;
  }
  /**
   * Parse characters.
   * @returns An array with 1 to 2 codes corresponding to chars, if found. null otherwise.
   */
  parseChars(e, t) {
    let s, r = null, n = null;
    if (e >= 25 ? (s = 2, n = e - 8) : (s = 1, n = e), n >= 17 && n <= 19) {
      let a;
      n === 17 ? a = t + 80 : n === 18 ? a = t + 112 : a = t + 144, this.logger.log(2, () => "Special char '" + bu(a) + "' in channel " + s), r = [a];
    } else e >= 32 && e <= 127 && (r = t === 0 ? [e] : [e, t]);
    return r && this.logger.log(3, () => "Char codes =  " + Et(r).join(",")), r;
  }
  /**
   * Parse extended background attributes as well as new foreground color black.
   * @returns True if background attributes are found
   */
  parseBackgroundAttributes(e, t) {
    const s = (e === 16 || e === 24) && t >= 32 && t <= 47, r = (e === 23 || e === 31) && t >= 45 && t <= 47;
    if (!(s || r))
      return !1;
    let n;
    const a = {};
    e === 16 || e === 24 ? (n = Math.floor((t - 32) / 2), a.background = zm[n], t % 2 === 1 && (a.background = a.background + "_semi")) : t === 45 ? a.background = "transparent" : (a.foreground = "black", t === 47 && (a.underline = !0));
    const o = e <= 23 ? 1 : 2;
    return this.channels[o].setBkgData(a), !0;
  }
  /**
   * Reset state of parser and its channels.
   */
  reset() {
    for (let e = 0; e < Object.keys(this.channels).length; e++) {
      const t = this.channels[e];
      t && t.reset();
    }
    Cs(null, null, this.cmdHistory);
  }
  /**
   * Trigger the generation of a cue, and the start of a new one if displayScreens are not empty.
   */
  cueSplitAtTime(e) {
    for (let t = 0; t < this.channels.length; t++) {
      const s = this.channels[t];
      s && s.cueSplitAtTime(e);
    }
  }
}
function Cs(i, e, t) {
  t.a = i, t.b = e;
}
function ep(i, e, t) {
  return t.a === i && t.b === e;
}
function tp() {
  return {
    a: null,
    b: null
  };
}
var vn = (function() {
  if (ni != null && ni.VTTCue)
    return self.VTTCue;
  const i = ["", "lr", "rl"], e = ["start", "middle", "end", "left", "right"];
  function t(o, u) {
    if (typeof u != "string" || !Array.isArray(o))
      return !1;
    const l = u.toLowerCase();
    return ~o.indexOf(l) ? l : !1;
  }
  function s(o) {
    return t(i, o);
  }
  function r(o) {
    return t(e, o);
  }
  function n(o, ...u) {
    let l = 1;
    for (; l < arguments.length; l++) {
      const h = arguments[l];
      for (const c in h)
        o[c] = h[c];
    }
    return o;
  }
  function a(o, u, l) {
    const h = this, c = {
      enumerable: !0
    };
    h.hasBeenReset = !1;
    let d = "", g = !1, f = o, m = u, p = l, y = null, v = "", T = !0, S = "auto", x = "start", L = 50, A = "middle", I = 50, _ = "middle";
    Object.defineProperty(h, "id", n({}, c, {
      get: function() {
        return d;
      },
      set: function(b) {
        d = "" + b;
      }
    })), Object.defineProperty(h, "pauseOnExit", n({}, c, {
      get: function() {
        return g;
      },
      set: function(b) {
        g = !!b;
      }
    })), Object.defineProperty(h, "startTime", n({}, c, {
      get: function() {
        return f;
      },
      set: function(b) {
        if (typeof b != "number")
          throw new TypeError("Start time must be set to a number.");
        f = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "endTime", n({}, c, {
      get: function() {
        return m;
      },
      set: function(b) {
        if (typeof b != "number")
          throw new TypeError("End time must be set to a number.");
        m = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "text", n({}, c, {
      get: function() {
        return p;
      },
      set: function(b) {
        p = "" + b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "region", n({}, c, {
      get: function() {
        return y;
      },
      set: function(b) {
        y = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "vertical", n({}, c, {
      get: function() {
        return v;
      },
      set: function(b) {
        const P = s(b);
        if (P === !1)
          throw new SyntaxError("An invalid or illegal string was specified.");
        v = P, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "snapToLines", n({}, c, {
      get: function() {
        return T;
      },
      set: function(b) {
        T = !!b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "line", n({}, c, {
      get: function() {
        return S;
      },
      set: function(b) {
        if (typeof b != "number" && b !== "auto")
          throw new SyntaxError("An invalid number or illegal string was specified.");
        S = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "lineAlign", n({}, c, {
      get: function() {
        return x;
      },
      set: function(b) {
        const P = r(b);
        if (!P)
          throw new SyntaxError("An invalid or illegal string was specified.");
        x = P, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "position", n({}, c, {
      get: function() {
        return L;
      },
      set: function(b) {
        if (b < 0 || b > 100)
          throw new Error("Position must be between 0 and 100.");
        L = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "positionAlign", n({}, c, {
      get: function() {
        return A;
      },
      set: function(b) {
        const P = r(b);
        if (!P)
          throw new SyntaxError("An invalid or illegal string was specified.");
        A = P, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "size", n({}, c, {
      get: function() {
        return I;
      },
      set: function(b) {
        if (b < 0 || b > 100)
          throw new Error("Size must be between 0 and 100.");
        I = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "align", n({}, c, {
      get: function() {
        return _;
      },
      set: function(b) {
        const P = r(b);
        if (!P)
          throw new SyntaxError("An invalid or illegal string was specified.");
        _ = P, this.hasBeenReset = !0;
      }
    })), h.displayState = void 0;
  }
  return a.prototype.getCueAsHTML = function() {
    return self.WebVTT.convertCueToDOMTree(self, this.text);
  }, a;
})();
class sp {
  decode(e, t) {
    if (!e)
      return "";
    if (typeof e != "string")
      throw new Error("Error - expected string data.");
    return decodeURIComponent(encodeURIComponent(e));
  }
}
function Ru(i) {
  function e(s, r, n, a) {
    return (s | 0) * 3600 + (r | 0) * 60 + (n | 0) + parseFloat(a || 0);
  }
  const t = i.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
  return t ? parseFloat(t[2]) > 59 ? e(t[2], t[3], 0, t[4]) : e(t[1], t[2], t[3], t[4]) : null;
}
class ip {
  constructor() {
    this.values = /* @__PURE__ */ Object.create(null);
  }
  // Only accept the first assignment to any key.
  set(e, t) {
    !this.get(e) && t !== "" && (this.values[e] = t);
  }
  // Return the value for a key, or a default value.
  // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
  // a number of possible default values as properties where 'defaultKey' is
  // the key of the property that will be chosen; otherwise it's assumed to be
  // a single value.
  get(e, t, s) {
    return s ? this.has(e) ? this.values[e] : t[s] : this.has(e) ? this.values[e] : t;
  }
  // Check whether we have a value for a key.
  has(e) {
    return e in this.values;
  }
  // Accept a setting if its one of the given alternatives.
  alt(e, t, s) {
    for (let r = 0; r < s.length; ++r)
      if (t === s[r]) {
        this.set(e, t);
        break;
      }
  }
  // Accept a setting if its a valid (signed) integer.
  integer(e, t) {
    /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10));
  }
  // Accept a setting if its a valid percentage.
  percent(e, t) {
    if (/^([\d]{1,3})(\.[\d]*)?%$/.test(t)) {
      const s = parseFloat(t);
      if (s >= 0 && s <= 100)
        return this.set(e, s), !0;
    }
    return !1;
  }
}
function _u(i, e, t, s) {
  const r = s ? i.split(s) : [i];
  for (const n in r) {
    if (typeof r[n] != "string")
      continue;
    const a = r[n].split(t);
    if (a.length !== 2)
      continue;
    const o = a[0], u = a[1];
    e(o, u);
  }
}
const wr = new vn(0, 0, ""), Ps = wr.align === "middle" ? "middle" : "center";
function rp(i, e, t) {
  const s = i;
  function r() {
    const o = Ru(i);
    if (o === null)
      throw new Error("Malformed timestamp: " + s);
    return i = i.replace(/^[^\sa-zA-Z-]+/, ""), o;
  }
  function n(o, u) {
    const l = new ip();
    _u(o, function(d, g) {
      let f;
      switch (d) {
        case "region":
          for (let m = t.length - 1; m >= 0; m--)
            if (t[m].id === g) {
              l.set(d, t[m].region);
              break;
            }
          break;
        case "vertical":
          l.alt(d, g, ["rl", "lr"]);
          break;
        case "line":
          f = g.split(","), l.integer(d, f[0]), l.percent(d, f[0]) && l.set("snapToLines", !1), l.alt(d, f[0], ["auto"]), f.length === 2 && l.alt("lineAlign", f[1], ["start", Ps, "end"]);
          break;
        case "position":
          f = g.split(","), l.percent(d, f[0]), f.length === 2 && l.alt("positionAlign", f[1], ["start", Ps, "end", "line-left", "line-right", "auto"]);
          break;
        case "size":
          l.percent(d, g);
          break;
        case "align":
          l.alt(d, g, ["start", Ps, "end", "left", "right"]);
          break;
      }
    }, /:/, /\s/), u.region = l.get("region", null), u.vertical = l.get("vertical", "");
    let h = l.get("line", "auto");
    h === "auto" && wr.line === -1 && (h = -1), u.line = h, u.lineAlign = l.get("lineAlign", "start"), u.snapToLines = l.get("snapToLines", !0), u.size = l.get("size", 100), u.align = l.get("align", Ps);
    let c = l.get("position", "auto");
    c === "auto" && wr.position === 50 && (c = u.align === "start" || u.align === "left" ? 0 : u.align === "end" || u.align === "right" ? 100 : 50), u.position = c;
  }
  function a() {
    i = i.replace(/^\s+/, "");
  }
  if (a(), e.startTime = r(), a(), i.slice(0, 3) !== "-->")
    throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + s);
  i = i.slice(3), a(), e.endTime = r(), a(), n(i, e);
}
function Du(i) {
  return i.replace(/<br(?: \/)?>/gi, `
`);
}
class np {
  constructor() {
    this.state = "INITIAL", this.buffer = "", this.decoder = new sp(), this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0;
  }
  parse(e) {
    const t = this;
    e && (t.buffer += t.decoder.decode(e, {
      stream: !0
    }));
    function s() {
      let n = t.buffer, a = 0;
      for (n = Du(n); a < n.length && n[a] !== "\r" && n[a] !== `
`; )
        ++a;
      const o = n.slice(0, a);
      return n[a] === "\r" && ++a, n[a] === `
` && ++a, t.buffer = n.slice(a), o;
    }
    function r(n) {
      _u(n, function(a, o) {
      }, /:/);
    }
    try {
      let n = "";
      if (t.state === "INITIAL") {
        if (!/\r\n|\n/.test(t.buffer))
          return this;
        n = s();
        const o = n.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
        if (!(o != null && o[0]))
          throw new Error("Malformed WebVTT signature.");
        t.state = "HEADER";
      }
      let a = !1;
      for (; t.buffer; ) {
        if (!/\r\n|\n/.test(t.buffer))
          return this;
        switch (a ? a = !1 : n = s(), t.state) {
          case "HEADER":
            /:/.test(n) ? r(n) : n || (t.state = "ID");
            continue;
          case "NOTE":
            n || (t.state = "ID");
            continue;
          case "ID":
            if (/^NOTE($|[ \t])/.test(n)) {
              t.state = "NOTE";
              break;
            }
            if (!n)
              continue;
            if (t.cue = new vn(0, 0, ""), t.state = "CUE", n.indexOf("-->") === -1) {
              t.cue.id = n;
              continue;
            }
          // Process line as start of a cue.
          /* falls through */
          case "CUE":
            if (!t.cue) {
              t.state = "BADCUE";
              continue;
            }
            try {
              rp(n, t.cue, t.regionList);
            } catch {
              t.cue = null, t.state = "BADCUE";
              continue;
            }
            t.state = "CUETEXT";
            continue;
          case "CUETEXT":
            {
              const o = n.indexOf("-->") !== -1;
              if (!n || o && (a = !0)) {
                t.oncue && t.cue && t.oncue(t.cue), t.cue = null, t.state = "ID";
                continue;
              }
              if (t.cue === null)
                continue;
              t.cue.text && (t.cue.text += `
`), t.cue.text += n;
            }
            continue;
          case "BADCUE":
            n || (t.state = "ID");
        }
      }
    } catch {
      t.state === "CUETEXT" && t.cue && t.oncue && t.oncue(t.cue), t.cue = null, t.state = t.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
    }
    return this;
  }
  flush() {
    const e = this;
    try {
      if ((e.cue || e.state === "HEADER") && (e.buffer += `

`, e.parse()), e.state === "INITIAL" || e.state === "BADWEBVTT")
        throw new Error("Malformed WebVTT signature.");
    } catch (t) {
      e.onparsingerror && e.onparsingerror(t);
    }
    return e.onflush && e.onflush(), this;
  }
}
const ap = /\r\n|\n\r|\n|\r/g, Xi = function(e, t, s = 0) {
  return e.slice(s, s + t.length) === t;
}, op = function(e) {
  let t = parseInt(e.slice(-3));
  const s = parseInt(e.slice(-6, -4)), r = parseInt(e.slice(-9, -7)), n = e.length > 9 ? parseInt(e.substring(0, e.indexOf(":"))) : 0;
  if (!F(t) || !F(s) || !F(r) || !F(n))
    throw Error(`Malformed X-TIMESTAMP-MAP: Local:${e}`);
  return t += 1e3 * s, t += 60 * 1e3 * r, t += 3600 * 1e3 * n, t;
};
function Tn(i, e, t) {
  return ns(i.toString()) + ns(e.toString()) + ns(t);
}
const lp = function(e, t, s) {
  let r = e[t], n = e[r.prevCC];
  if (!n || !n.new && r.new) {
    e.ccOffset = e.presentationOffset = r.start, r.new = !1;
    return;
  }
  for (; (a = n) != null && a.new; ) {
    var a;
    e.ccOffset += r.start - n.start, r.new = !1, r = n, n = e[r.prevCC];
  }
  e.presentationOffset = s;
};
function up(i, e, t, s, r, n, a) {
  const o = new np(), u = Oe(new Uint8Array(i)).trim().replace(ap, `
`).split(`
`), l = [], h = e ? m0(e.baseTime, e.timescale) : 0;
  let c = "00:00.000", d = 0, g = 0, f, m = !0;
  o.oncue = function(p) {
    const y = t[s];
    let v = t.ccOffset;
    const T = (d - h) / 9e4;
    if (y != null && y.new && (g !== void 0 ? v = t.ccOffset = y.start : lp(t, s, T)), T) {
      if (!e) {
        f = new Error("Missing initPTS for VTT MPEGTS");
        return;
      }
      v = T - t.presentationOffset;
    }
    const S = p.endTime - p.startTime, x = Pe((p.startTime + v - g) * 9e4, r * 9e4) / 9e4;
    p.startTime = Math.max(x, 0), p.endTime = Math.max(x + S, 0);
    const L = p.text.trim();
    p.text = decodeURIComponent(encodeURIComponent(L)), p.id || (p.id = Tn(p.startTime, p.endTime, L)), p.endTime > 0 && l.push(p);
  }, o.onparsingerror = function(p) {
    f = p;
  }, o.onflush = function() {
    if (f) {
      a(f);
      return;
    }
    n(l);
  }, u.forEach((p) => {
    if (m)
      if (Xi(p, "X-TIMESTAMP-MAP=")) {
        m = !1, p.slice(16).split(",").forEach((y) => {
          Xi(y, "LOCAL:") ? c = y.slice(6) : Xi(y, "MPEGTS:") && (d = parseInt(y.slice(7)));
        });
        try {
          g = op(c) / 1e3;
        } catch (y) {
          f = y;
        }
        return;
      } else p === "" && (m = !1);
    o.parse(p + `
`);
  }), o.flush();
}
const zi = "stpp.ttml.im1t", Cu = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/, Pu = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/, hp = {
  left: "start",
  center: "center",
  right: "end",
  start: "start",
  end: "end"
};
function oo(i, e, t, s) {
  const r = z(new Uint8Array(i), ["mdat"]);
  if (r.length === 0) {
    s(new Error("Could not parse IMSC1 mdat"));
    return;
  }
  const n = r.map((o) => Oe(o)), a = g0(e.baseTime, 1, e.timescale);
  try {
    n.forEach((o) => t(cp(o, a)));
  } catch (o) {
    s(o);
  }
}
function cp(i, e) {
  const r = new DOMParser().parseFromString(i, "text/xml").getElementsByTagName("tt")[0];
  if (!r)
    throw new Error("Invalid ttml");
  const n = {
    frameRate: 30,
    subFrameRate: 1,
    frameRateMultiplier: 0,
    tickRate: 0
  }, a = Object.keys(n).reduce((c, d) => (c[d] = r.getAttribute(`ttp:${d}`) || n[d], c), {}), o = r.getAttribute("xml:space") !== "preserve", u = lo(Qi(r, "styling", "style")), l = lo(Qi(r, "layout", "region")), h = Qi(r, "body", "[begin]");
  return [].map.call(h, (c) => {
    const d = ku(c, o);
    if (!d || !c.hasAttribute("begin"))
      return null;
    const g = Ji(c.getAttribute("begin"), a), f = Ji(c.getAttribute("dur"), a);
    let m = Ji(c.getAttribute("end"), a);
    if (g === null)
      throw uo(c);
    if (m === null) {
      if (f === null)
        throw uo(c);
      m = g + f;
    }
    const p = new vn(g - e, m - e, d);
    p.id = Tn(p.startTime, p.endTime, p.text);
    const y = l[c.getAttribute("region")], v = u[c.getAttribute("style")], T = dp(y, v, u), {
      textAlign: S
    } = T;
    if (S) {
      const x = hp[S];
      x && (p.lineAlign = x), p.align = S;
    }
    return ae(p, T), p;
  }).filter((c) => c !== null);
}
function Qi(i, e, t) {
  const s = i.getElementsByTagName(e)[0];
  return s ? [].slice.call(s.querySelectorAll(t)) : [];
}
function lo(i) {
  return i.reduce((e, t) => {
    const s = t.getAttribute("xml:id");
    return s && (e[s] = t), e;
  }, {});
}
function ku(i, e) {
  return [].slice.call(i.childNodes).reduce((t, s, r) => {
    var n;
    return s.nodeName === "br" && r ? t + `
` : (n = s.childNodes) != null && n.length ? ku(s, e) : e ? t + s.textContent.trim().replace(/\s+/g, " ") : t + s.textContent;
  }, "");
}
function dp(i, e, t) {
  const s = "http://www.w3.org/ns/ttml#styling";
  let r = null;
  const n = [
    "displayAlign",
    "textAlign",
    "color",
    "backgroundColor",
    "fontSize",
    "fontFamily"
    // 'fontWeight',
    // 'lineHeight',
    // 'wrapOption',
    // 'fontStyle',
    // 'direction',
    // 'writingMode'
  ], a = i != null && i.hasAttribute("style") ? i.getAttribute("style") : null;
  return a && t.hasOwnProperty(a) && (r = t[a]), n.reduce((o, u) => {
    const l = Zi(e, s, u) || Zi(i, s, u) || Zi(r, s, u);
    return l && (o[u] = l), o;
  }, {});
}
function Zi(i, e, t) {
  return i && i.hasAttributeNS(e, t) ? i.getAttributeNS(e, t) : null;
}
function uo(i) {
  return new Error(`Could not parse ttml timestamp ${i}`);
}
function Ji(i, e) {
  if (!i)
    return null;
  let t = Ru(i);
  return t === null && (Cu.test(i) ? t = fp(i, e) : Pu.test(i) && (t = gp(i, e))), t;
}
function fp(i, e) {
  const t = Cu.exec(i), s = (t[4] | 0) + (t[5] | 0) / e.subFrameRate;
  return (t[1] | 0) * 3600 + (t[2] | 0) * 60 + (t[3] | 0) + s / e.frameRate;
}
function gp(i, e) {
  const t = Pu.exec(i), s = Number(t[1]);
  switch (t[2]) {
    case "h":
      return s * 3600;
    case "m":
      return s * 60;
    case "ms":
      return s * 1e3;
    case "f":
      return s / e.frameRate;
    case "t":
      return s / e.tickRate;
  }
  return s;
}
class ks {
  constructor(e, t) {
    this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = e, this.trackName = t;
  }
  dispatchCue() {
    this.startTime !== null && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null);
  }
  newCue(e, t, s) {
    (this.startTime === null || this.startTime > e) && (this.startTime = e), this.endTime = t, this.screen = s, this.timelineController.createCaptionsTrack(this.trackName);
  }
  reset() {
    this.cueRanges = [], this.startTime = null;
  }
}
class mp {
  constructor(e) {
    this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = co(), this.captionsProperties = void 0, this.hls = e, this.config = e.config, this.Cues = e.config.cueHandler, this.captionsProperties = {
      textTrack1: {
        label: this.config.captionsTextTrack1Label,
        languageCode: this.config.captionsTextTrack1LanguageCode
      },
      textTrack2: {
        label: this.config.captionsTextTrack2Label,
        languageCode: this.config.captionsTextTrack2LanguageCode
      },
      textTrack3: {
        label: this.config.captionsTextTrack3Label,
        languageCode: this.config.captionsTextTrack3LanguageCode
      },
      textTrack4: {
        label: this.config.captionsTextTrack4Label,
        languageCode: this.config.captionsTextTrack4LanguageCode
      }
    }, e.on(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(E.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.on(E.FRAG_LOADING, this.onFragLoading, this), e.on(E.FRAG_LOADED, this.onFragLoaded, this), e.on(E.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.on(E.FRAG_DECRYPTED, this.onFragDecrypted, this), e.on(E.INIT_PTS_FOUND, this.onInitPtsFound, this), e.on(E.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.on(E.BUFFER_FLUSHING, this.onBufferFlushing, this);
  }
  destroy() {
    const {
      hls: e
    } = this;
    e.off(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(E.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.off(E.FRAG_LOADING, this.onFragLoading, this), e.off(E.FRAG_LOADED, this.onFragLoaded, this), e.off(E.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.off(E.FRAG_DECRYPTED, this.onFragDecrypted, this), e.off(E.INIT_PTS_FOUND, this.onInitPtsFound, this), e.off(E.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.off(E.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = this.media = null, this.cea608Parser1 = this.cea608Parser2 = void 0;
  }
  initCea608Parsers() {
    const e = new ks(this, "textTrack1"), t = new ks(this, "textTrack2"), s = new ks(this, "textTrack3"), r = new ks(this, "textTrack4");
    this.cea608Parser1 = new ao(1, e, t), this.cea608Parser2 = new ao(3, s, r);
  }
  addCues(e, t, s, r, n) {
    let a = !1;
    for (let o = n.length; o--; ) {
      const u = n[o], l = pp(u[0], u[1], t, s);
      if (l >= 0 && (u[0] = Math.min(u[0], t), u[1] = Math.max(u[1], s), a = !0, l / (s - t) > 0.5))
        return;
    }
    if (a || n.push([t, s]), this.config.renderTextTracksNatively) {
      const o = this.captionsTracks[e];
      this.Cues.newCue(o, t, s, r);
    } else {
      const o = this.Cues.newCue(null, t, s, r);
      this.hls.trigger(E.CUES_PARSED, {
        type: "captions",
        cues: o,
        track: e
      });
    }
  }
  // Triggered when an initial PTS is found; used for synchronisation of WebVTT.
  onInitPtsFound(e, {
    frag: t,
    id: s,
    initPTS: r,
    timescale: n,
    trackId: a
  }) {
    const {
      unparsedVttFrags: o
    } = this;
    s === B.MAIN && (this.initPTS[t.cc] = {
      baseTime: r,
      timescale: n,
      trackId: a
    }), o.length && (this.unparsedVttFrags = [], o.forEach((u) => {
      this.initPTS[u.frag.cc] ? this.onFragLoaded(E.FRAG_LOADED, u) : this.hls.trigger(E.SUBTITLE_FRAG_PROCESSED, {
        success: !1,
        frag: u.frag,
        error: new Error("Subtitle discontinuity domain does not match main")
      });
    }));
  }
  getExistingTrack(e, t) {
    const {
      media: s
    } = this;
    if (s)
      for (let r = 0; r < s.textTracks.length; r++) {
        const n = s.textTracks[r];
        if (ho(n, {
          name: e,
          lang: t,
          characteristics: "transcribes-spoken-dialog,describes-music-and-sound"
        }))
          return n;
      }
    return null;
  }
  createCaptionsTrack(e) {
    this.config.renderTextTracksNatively ? this.createNativeTrack(e) : this.createNonNativeTrack(e);
  }
  createNativeTrack(e) {
    if (this.captionsTracks[e])
      return;
    const {
      captionsProperties: t,
      captionsTracks: s,
      media: r
    } = this, {
      label: n,
      languageCode: a
    } = t[e], o = this.getExistingTrack(n, a);
    if (o)
      s[e] = o, Mt(s[e]), xu(s[e], r);
    else {
      const u = this.createTextTrack("captions", n, a);
      u && (u[e] = !0, s[e] = u);
    }
  }
  createNonNativeTrack(e) {
    if (this.nonNativeCaptionsTracks[e])
      return;
    const t = this.captionsProperties[e];
    if (!t)
      return;
    const s = t.label, r = {
      _id: e,
      label: s,
      kind: "captions",
      default: t.media ? !!t.media.default : !1,
      closedCaptions: t.media
    };
    this.nonNativeCaptionsTracks[e] = r, this.hls.trigger(E.NON_NATIVE_TEXT_TRACKS_FOUND, {
      tracks: [r]
    });
  }
  createTextTrack(e, t, s) {
    const r = this.media;
    if (r)
      return r.addTextTrack(e, t, s);
  }
  onMediaAttaching(e, t) {
    this.media = t.media, t.mediaSource || this._cleanTracks();
  }
  onMediaDetaching(e, t) {
    const s = !!t.transferMedia;
    if (this.media = null, s)
      return;
    const {
      captionsTracks: r
    } = this;
    Object.keys(r).forEach((n) => {
      Mt(r[n]), delete r[n];
    }), this.nonNativeCaptionsTracks = {};
  }
  onManifestLoading() {
    this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = co(), this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = [], this.initPTS = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset());
  }
  _cleanTracks() {
    const {
      media: e
    } = this;
    if (!e)
      return;
    const t = e.textTracks;
    if (t)
      for (let s = 0; s < t.length; s++)
        Mt(t[s]);
  }
  onSubtitleTracksUpdated(e, t) {
    const s = t.subtitleTracks || [], r = s.some((n) => n.textCodec === zi);
    if (this.config.enableWebVTT || r && this.config.enableIMSC1) {
      if (uu(this.tracks, s)) {
        this.tracks = s;
        return;
      }
      if (this.textTracks = [], this.tracks = s, this.config.renderTextTracksNatively) {
        const a = this.media, o = a ? Ws(a.textTracks) : null;
        if (this.tracks.forEach((u, l) => {
          let h;
          if (o) {
            let c = null;
            for (let d = 0; d < o.length; d++)
              if (o[d] && ho(o[d], u)) {
                c = o[d], o[d] = null;
                break;
              }
            c && (h = c);
          }
          if (h)
            Mt(h);
          else {
            const c = wu(u);
            h = this.createTextTrack(c, u.name, u.lang), h && (h.mode = "disabled");
          }
          h && this.textTracks.push(h);
        }), o != null && o.length) {
          const u = o.filter((l) => l !== null).map((l) => l.label);
          u.length && this.hls.logger.warn(`Media element contains unused subtitle tracks: ${u.join(", ")}. Replace media element for each source to clear TextTracks and captions menu.`);
        }
      } else if (this.tracks.length) {
        const a = this.tracks.map((o) => ({
          label: o.name,
          kind: o.type.toLowerCase(),
          default: o.default,
          subtitleTrack: o
        }));
        this.hls.trigger(E.NON_NATIVE_TEXT_TRACKS_FOUND, {
          tracks: a
        });
      }
    }
  }
  onManifestLoaded(e, t) {
    this.config.enableCEA708Captions && t.captions && t.captions.forEach((s) => {
      const r = /(?:CC|SERVICE)([1-4])/.exec(s.instreamId);
      if (!r)
        return;
      const n = `textTrack${r[1]}`, a = this.captionsProperties[n];
      a && (a.label = s.name, s.lang && (a.languageCode = s.lang), a.media = s);
    });
  }
  closedCaptionsForLevel(e) {
    const t = this.hls.levels[e.level];
    return t?.attrs["CLOSED-CAPTIONS"];
  }
  onFragLoading(e, t) {
    if (this.enabled && t.frag.type === B.MAIN) {
      var s, r;
      const {
        cea608Parser1: n,
        cea608Parser2: a,
        lastSn: o
      } = this, {
        cc: u,
        sn: l
      } = t.frag, h = (s = (r = t.part) == null ? void 0 : r.index) != null ? s : -1;
      n && a && (l !== o + 1 || l === o && h !== this.lastPartIndex + 1 || u !== this.lastCc) && (n.reset(), a.reset()), this.lastCc = u, this.lastSn = l, this.lastPartIndex = h;
    }
  }
  onFragLoaded(e, t) {
    const {
      frag: s,
      payload: r
    } = t;
    if (s.type === B.SUBTITLE)
      if (r.byteLength) {
        const n = s.decryptdata, a = "stats" in t;
        if (n == null || !n.encrypted || a) {
          const o = this.tracks[s.level], u = this.vttCCs;
          u[s.cc] || (u[s.cc] = {
            start: s.start,
            prevCC: this.prevCC,
            new: !0
          }, this.prevCC = s.cc), o && o.textCodec === zi ? this._parseIMSC1(s, r) : this._parseVTTs(t);
        }
      } else
        this.hls.trigger(E.SUBTITLE_FRAG_PROCESSED, {
          success: !1,
          frag: s,
          error: new Error("Empty subtitle payload")
        });
  }
  _parseIMSC1(e, t) {
    const s = this.hls;
    oo(t, this.initPTS[e.cc], (r) => {
      this._appendCues(r, e.level), s.trigger(E.SUBTITLE_FRAG_PROCESSED, {
        success: !0,
        frag: e
      });
    }, (r) => {
      s.logger.log(`Failed to parse IMSC1: ${r}`), s.trigger(E.SUBTITLE_FRAG_PROCESSED, {
        success: !1,
        frag: e,
        error: r
      });
    });
  }
  _parseVTTs(e) {
    var t;
    const {
      frag: s,
      payload: r
    } = e, {
      initPTS: n,
      unparsedVttFrags: a
    } = this, o = n.length - 1;
    if (!n[s.cc] && o === -1) {
      a.push(e);
      return;
    }
    const u = this.hls, l = (t = s.initSegment) != null && t.data ? Ne(s.initSegment.data, new Uint8Array(r)).buffer : r;
    up(l, this.initPTS[s.cc], this.vttCCs, s.cc, s.start, (h) => {
      this._appendCues(h, s.level), u.trigger(E.SUBTITLE_FRAG_PROCESSED, {
        success: !0,
        frag: s
      });
    }, (h) => {
      const c = h.message === "Missing initPTS for VTT MPEGTS";
      c ? a.push(e) : this._fallbackToIMSC1(s, r), u.logger.log(`Failed to parse VTT cue: ${h}`), !(c && o > s.cc) && u.trigger(E.SUBTITLE_FRAG_PROCESSED, {
        success: !1,
        frag: s,
        error: h
      });
    });
  }
  _fallbackToIMSC1(e, t) {
    const s = this.tracks[e.level];
    s.textCodec || oo(t, this.initPTS[e.cc], () => {
      s.textCodec = zi, this._parseIMSC1(e, t);
    }, () => {
      s.textCodec = "wvtt";
    });
  }
  _appendCues(e, t) {
    const s = this.hls;
    if (this.config.renderTextTracksNatively) {
      const r = this.textTracks[t];
      if (!r || r.mode === "disabled")
        return;
      e.forEach((n) => Au(r, n));
    } else {
      const r = this.tracks[t];
      if (!r)
        return;
      const n = r.default ? "default" : "subtitles" + t;
      s.trigger(E.CUES_PARSED, {
        type: "subtitles",
        cues: e,
        track: n
      });
    }
  }
  onFragDecrypted(e, t) {
    const {
      frag: s
    } = t;
    s.type === B.SUBTITLE && this.onFragLoaded(E.FRAG_LOADED, t);
  }
  onSubtitleTracksCleared() {
    this.tracks = [], this.captionsTracks = {};
  }
  onFragParsingUserdata(e, t) {
    if (!this.enabled || !this.config.enableCEA708Captions)
      return;
    const {
      frag: s,
      samples: r
    } = t;
    if (!(s.type === B.MAIN && this.closedCaptionsForLevel(s) === "NONE"))
      for (let n = 0; n < r.length; n++) {
        const a = r[n].bytes;
        if (a) {
          this.cea608Parser1 || this.initCea608Parsers();
          const o = this.extractCea608Data(a);
          this.cea608Parser1.addData(r[n].pts, o[0]), this.cea608Parser2.addData(r[n].pts, o[1]);
        }
      }
  }
  onBufferFlushing(e, {
    startOffset: t,
    endOffset: s,
    endOffsetSubtitles: r,
    type: n
  }) {
    const {
      media: a
    } = this;
    if (!(!a || a.currentTime < s)) {
      if (!n || n === "video") {
        const {
          captionsTracks: o
        } = this;
        Object.keys(o).forEach((u) => kr(o[u], t, s));
      }
      if (this.config.renderTextTracksNatively && t === 0 && r !== void 0) {
        const {
          textTracks: o
        } = this;
        Object.keys(o).forEach((u) => kr(o[u], t, r));
      }
    }
  }
  extractCea608Data(e) {
    const t = [[], []], s = e[0] & 31;
    let r = 2;
    for (let n = 0; n < s; n++) {
      const a = e[r++], o = 127 & e[r++], u = 127 & e[r++];
      if (o === 0 && u === 0)
        continue;
      if ((4 & a) !== 0) {
        const h = 3 & a;
        (h === 0 || h === 1) && (t[h].push(o), t[h].push(u));
      }
    }
    return t;
  }
}
function wu(i) {
  return i.characteristics && /transcribes-spoken-dialog/gi.test(i.characteristics) && /describes-music-and-sound/gi.test(i.characteristics) ? "captions" : "subtitles";
}
function ho(i, e) {
  return !!i && i.kind === wu(e) && _r(e, i);
}
function pp(i, e, t, s) {
  return Math.min(e, s) - Math.max(i, t);
}
function co() {
  return {
    ccOffset: 0,
    presentationOffset: 0,
    0: {
      start: 0,
      prevCC: -1,
      new: !0
    }
  };
}
const Ep = /\s/, yp = {
  newCue(i, e, t, s) {
    const r = [];
    let n, a, o, u, l;
    const h = self.VTTCue || self.TextTrackCue;
    for (let d = 0; d < s.rows.length; d++)
      if (n = s.rows[d], o = !0, u = 0, l = "", !n.isEmpty()) {
        var c;
        for (let m = 0; m < n.chars.length; m++)
          Ep.test(n.chars[m].uchar) && o ? u++ : (l += n.chars[m].uchar, o = !1);
        n.cueStartTime = e, e === t && (t += 1e-4), u >= 16 ? u-- : u++;
        const g = Du(l.trim()), f = Tn(e, t, g);
        i != null && (c = i.cues) != null && c.getCueById(f) || (a = new h(e, t, g), a.id = f, a.line = d + 1, a.align = "left", a.position = 10 + Math.min(80, Math.floor(u * 8 / 32) * 10), r.push(a));
      }
    return i && r.length && (r.sort((d, g) => d.line === "auto" || g.line === "auto" ? 0 : d.line > 8 && g.line > 8 ? g.line - d.line : d.line - g.line), r.forEach((d) => Au(i, d))), r;
  }
};
function vp() {
  if (
    // @ts-ignore
    self.fetch && self.AbortController && self.ReadableStream && self.Request
  )
    try {
      return new self.ReadableStream({}), !0;
    } catch {
    }
  return !1;
}
const Tp = /(\d+)-(\d+)\/(\d+)/;
class fo {
  constructor(e) {
    this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = null, this.response = null, this.controller = void 0, this.context = null, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = e.fetchSetup || Ip, this.controller = new self.AbortController(), this.stats = new Qr();
  }
  destroy() {
    this.loader = this.callbacks = this.context = this.config = this.request = null, this.abortInternal(), this.response = null, this.fetchSetup = this.controller = this.stats = null;
  }
  abortInternal() {
    this.controller && !this.stats.loading.end && (this.stats.aborted = !0, this.controller.abort());
  }
  abort() {
    var e;
    this.abortInternal(), (e = this.callbacks) != null && e.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response);
  }
  load(e, t, s) {
    const r = this.stats;
    if (r.loading.start)
      throw new Error("Loader can only be used once.");
    r.loading.start = self.performance.now();
    const n = Sp(e, this.controller.signal), a = e.responseType === "arraybuffer", o = a ? "byteLength" : "length", {
      maxTimeToFirstByteMs: u,
      maxLoadTimeMs: l
    } = t.loadPolicy;
    this.context = e, this.config = t, this.callbacks = s, this.request = this.fetchSetup(e, n), self.clearTimeout(this.requestTimeout), t.timeout = u && F(u) ? u : l, this.requestTimeout = self.setTimeout(() => {
      this.callbacks && (this.abortInternal(), this.callbacks.onTimeout(r, e, this.response));
    }, t.timeout), (ds(this.request) ? this.request.then(self.fetch) : self.fetch(this.request)).then((c) => {
      var d;
      this.response = this.loader = c;
      const g = Math.max(self.performance.now(), r.loading.start);
      if (self.clearTimeout(this.requestTimeout), t.timeout = l, this.requestTimeout = self.setTimeout(() => {
        this.callbacks && (this.abortInternal(), this.callbacks.onTimeout(r, e, this.response));
      }, l - (g - r.loading.start)), !c.ok) {
        const {
          status: m,
          statusText: p
        } = c;
        throw new bp(p || "fetch, bad network response", m, c);
      }
      r.loading.first = g, r.total = Ap(c.headers) || r.total;
      const f = (d = this.callbacks) == null ? void 0 : d.onProgress;
      return f && F(t.highWaterMark) ? this.loadProgressively(c, r, e, t.highWaterMark, f) : a ? c.arrayBuffer() : e.responseType === "json" ? c.json() : c.text();
    }).then((c) => {
      var d, g;
      const f = this.response;
      if (!f)
        throw new Error("loader destroyed");
      self.clearTimeout(this.requestTimeout), r.loading.end = Math.max(self.performance.now(), r.loading.first);
      const m = c[o];
      m && (r.loaded = r.total = m);
      const p = {
        url: f.url,
        data: c,
        code: f.status
      }, y = (d = this.callbacks) == null ? void 0 : d.onProgress;
      y && !F(t.highWaterMark) && y(r, e, c, f), (g = this.callbacks) == null || g.onSuccess(p, r, e, f);
    }).catch((c) => {
      var d;
      if (self.clearTimeout(this.requestTimeout), r.aborted)
        return;
      const g = c && c.code || 0, f = c ? c.message : null;
      (d = this.callbacks) == null || d.onError({
        code: g,
        text: f
      }, e, c ? c.details : null, r);
    });
  }
  getCacheAge() {
    let e = null;
    if (this.response) {
      const t = this.response.headers.get("age");
      e = t ? parseFloat(t) : null;
    }
    return e;
  }
  getResponseHeader(e) {
    return this.response ? this.response.headers.get(e) : null;
  }
  loadProgressively(e, t, s, r = 0, n) {
    const a = new Vl(), o = e.body.getReader(), u = () => o.read().then((l) => {
      if (l.done)
        return a.dataLength && n(t, s, a.flush().buffer, e), Promise.resolve(new ArrayBuffer(0));
      const h = l.value, c = h.length;
      return t.loaded += c, c < r || a.dataLength ? (a.push(h), a.dataLength >= r && n(t, s, a.flush().buffer, e)) : n(t, s, h.buffer, e), u();
    }).catch(() => Promise.reject());
    return u();
  }
}
function Sp(i, e) {
  const t = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    signal: e,
    headers: new self.Headers(ae({}, i.headers))
  };
  return i.rangeEnd && t.headers.set("Range", "bytes=" + i.rangeStart + "-" + String(i.rangeEnd - 1)), t;
}
function xp(i) {
  const e = Tp.exec(i);
  if (e)
    return parseInt(e[2]) - parseInt(e[1]) + 1;
}
function Ap(i) {
  const e = i.get("Content-Range");
  if (e) {
    const s = xp(e);
    if (F(s))
      return s;
  }
  const t = i.get("Content-Length");
  if (t)
    return parseInt(t);
}
function Ip(i, e) {
  return new self.Request(i.url, e);
}
class bp extends Error {
  constructor(e, t, s) {
    super(e), this.code = void 0, this.details = void 0, this.code = t, this.details = s;
  }
}
const Lp = /^age:\s*[\d.]+\s*$/im;
class Ou {
  constructor(e) {
    this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = null, this.loader = null, this.stats = void 0, this.xhrSetup = e && e.xhrSetup || null, this.stats = new Qr(), this.retryDelay = 0;
  }
  destroy() {
    this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null, this.context = null, this.xhrSetup = null;
  }
  abortInternal() {
    const e = this.loader;
    self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), e && (e.onreadystatechange = null, e.onprogress = null, e.readyState !== 4 && (this.stats.aborted = !0, e.abort()));
  }
  abort() {
    var e;
    this.abortInternal(), (e = this.callbacks) != null && e.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader);
  }
  load(e, t, s) {
    if (this.stats.loading.start)
      throw new Error("Loader can only be used once.");
    this.stats.loading.start = self.performance.now(), this.context = e, this.config = t, this.callbacks = s, this.loadInternal();
  }
  loadInternal() {
    const {
      config: e,
      context: t
    } = this;
    if (!e || !t)
      return;
    const s = this.loader = new self.XMLHttpRequest(), r = this.stats;
    r.loading.first = 0, r.loaded = 0, r.aborted = !1;
    const n = this.xhrSetup;
    n ? Promise.resolve().then(() => {
      if (!(this.loader !== s || this.stats.aborted))
        return n(s, t.url);
    }).catch((a) => {
      if (!(this.loader !== s || this.stats.aborted))
        return s.open("GET", t.url, !0), n(s, t.url);
    }).then(() => {
      this.loader !== s || this.stats.aborted || this.openAndSendXhr(s, t, e);
    }).catch((a) => {
      var o;
      (o = this.callbacks) == null || o.onError({
        code: s.status,
        text: a.message
      }, t, s, r);
    }) : this.openAndSendXhr(s, t, e);
  }
  openAndSendXhr(e, t, s) {
    e.readyState || e.open("GET", t.url, !0);
    const r = t.headers, {
      maxTimeToFirstByteMs: n,
      maxLoadTimeMs: a
    } = s.loadPolicy;
    if (r)
      for (const o in r)
        e.setRequestHeader(o, r[o]);
    t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)), e.onreadystatechange = this.readystatechange.bind(this), e.onprogress = this.loadprogress.bind(this), e.responseType = t.responseType, self.clearTimeout(this.requestTimeout), s.timeout = n && F(n) ? n : a, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), s.timeout), e.send();
  }
  readystatechange() {
    const {
      context: e,
      loader: t,
      stats: s
    } = this;
    if (!e || !t)
      return;
    const r = t.readyState, n = this.config;
    if (!s.aborted && r >= 2 && (s.loading.first === 0 && (s.loading.first = Math.max(self.performance.now(), s.loading.start), n.timeout !== n.loadPolicy.maxLoadTimeMs && (self.clearTimeout(this.requestTimeout), n.timeout = n.loadPolicy.maxLoadTimeMs, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), n.loadPolicy.maxLoadTimeMs - (s.loading.first - s.loading.start)))), r === 4)) {
      self.clearTimeout(this.requestTimeout), t.onreadystatechange = null, t.onprogress = null;
      const l = t.status, h = t.responseType === "text" ? t.responseText : null;
      if (l >= 200 && l < 300) {
        const f = h ?? t.response;
        if (f != null) {
          var a, o;
          s.loading.end = Math.max(self.performance.now(), s.loading.first);
          const m = t.responseType === "arraybuffer" ? f.byteLength : f.length;
          s.loaded = s.total = m, s.bwEstimate = s.total * 8e3 / (s.loading.end - s.loading.first);
          const p = (a = this.callbacks) == null ? void 0 : a.onProgress;
          p && p(s, e, f, t);
          const y = {
            url: t.responseURL,
            data: f,
            code: l
          };
          (o = this.callbacks) == null || o.onSuccess(y, s, e, t);
          return;
        }
      }
      const c = n.loadPolicy.errorRetry, d = s.retry, g = {
        url: e.url,
        data: void 0,
        code: l
      };
      if (ii(c, d, !1, g))
        this.retry(c);
      else {
        var u;
        ne.error(`${l} while loading ${e.url}`), (u = this.callbacks) == null || u.onError({
          code: l,
          text: t.statusText
        }, e, t, s);
      }
    }
  }
  loadtimeout() {
    if (!this.config) return;
    const e = this.config.loadPolicy.timeoutRetry, t = this.stats.retry;
    if (ii(e, t, !0))
      this.retry(e);
    else {
      var s;
      ne.warn(`timeout while loading ${(s = this.context) == null ? void 0 : s.url}`);
      const r = this.callbacks;
      r && (this.abortInternal(), r.onTimeout(this.stats, this.context, this.loader));
    }
  }
  retry(e) {
    const {
      context: t,
      stats: s
    } = this;
    this.retryDelay = tn(e, s.retry), s.retry++, ne.warn(`${status ? "HTTP Status " + status : "Timeout"} while loading ${t?.url}, retrying ${s.retry}/${e.maxNumRetry} in ${this.retryDelay}ms`), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay);
  }
  loadprogress(e) {
    const t = this.stats;
    t.loaded = e.loaded, e.lengthComputable && (t.total = e.total);
  }
  getCacheAge() {
    let e = null;
    if (this.loader && Lp.test(this.loader.getAllResponseHeaders())) {
      const t = this.loader.getResponseHeader("age");
      e = t ? parseFloat(t) : null;
    }
    return e;
  }
  getResponseHeader(e) {
    return this.loader && new RegExp(`^${e}:\\s*[\\d.]+\\s*$`, "im").test(this.loader.getAllResponseHeaders()) ? this.loader.getResponseHeader(e) : null;
  }
}
const Rp = {
  maxTimeToFirstByteMs: 8e3,
  maxLoadTimeMs: 2e4,
  timeoutRetry: null,
  errorRetry: null
}, _p = re(re({
  autoStartLoad: !0,
  // used by stream-controller
  startPosition: -1,
  // used by stream-controller
  defaultAudioCodec: void 0,
  // used by stream-controller
  debug: !1,
  // used by logger
  capLevelOnFPSDrop: !1,
  // used by fps-controller
  capLevelToPlayerSize: !1,
  // used by cap-level-controller
  ignoreDevicePixelRatio: !1,
  // used by cap-level-controller
  maxDevicePixelRatio: Number.POSITIVE_INFINITY,
  // used by cap-level-controller
  preferManagedMediaSource: !0,
  initialLiveManifestSize: 1,
  // used by stream-controller
  maxBufferLength: 30,
  // used by stream-controller
  backBufferLength: 1 / 0,
  // used by buffer-controller
  frontBufferFlushThreshold: 1 / 0,
  startOnSegmentBoundary: !1,
  // used by stream-controller
  maxBufferSize: 60 * 1e3 * 1e3,
  // used by stream-controller
  maxFragLookUpTolerance: 0.25,
  // used by stream-controller
  maxBufferHole: 0.1,
  // used by stream-controller and gap-controller
  detectStallWithCurrentTimeMs: 1250,
  // used by gap-controller
  highBufferWatchdogPeriod: 2,
  // used by gap-controller
  nudgeOffset: 0.1,
  // used by gap-controller
  nudgeMaxRetry: 3,
  // used by gap-controller
  nudgeOnVideoHole: !0,
  // used by gap-controller
  liveSyncMode: "edge",
  // used by stream-controller
  liveSyncDurationCount: 3,
  // used by latency-controller
  liveSyncOnStallIncrease: 1,
  // used by latency-controller
  liveMaxLatencyDurationCount: 1 / 0,
  // used by latency-controller
  liveSyncDuration: void 0,
  // used by latency-controller
  liveMaxLatencyDuration: void 0,
  // used by latency-controller
  maxLiveSyncPlaybackRate: 1,
  // used by latency-controller
  liveDurationInfinity: !1,
  // used by buffer-controller
  /**
   * @deprecated use backBufferLength
   */
  liveBackBufferLength: null,
  // used by buffer-controller
  maxMaxBufferLength: 600,
  // used by stream-controller
  enableWorker: !0,
  // used by transmuxer
  workerPath: null,
  // used by transmuxer
  enableSoftwareAES: !0,
  // used by decrypter
  startLevel: void 0,
  // used by level-controller
  startFragPrefetch: !1,
  // used by stream-controller
  fpsDroppedMonitoringPeriod: 5e3,
  // used by fps-controller
  fpsDroppedMonitoringThreshold: 0.2,
  // used by fps-controller
  appendErrorMaxRetry: 3,
  // used by buffer-controller
  ignorePlaylistParsingErrors: !1,
  loader: Ou,
  // loader: FetchLoader,
  fLoader: void 0,
  // used by fragment-loader
  pLoader: void 0,
  // used by playlist-loader
  xhrSetup: void 0,
  // used by xhr-loader
  licenseXhrSetup: void 0,
  // used by eme-controller
  licenseResponseCallback: void 0,
  // used by eme-controller
  abrController: $f,
  bufferController: C0,
  capLevelController: pn,
  errorController: Wf,
  fpsController: Pm,
  stretchShortVideoTrack: !1,
  // used by mp4-remuxer
  maxAudioFramesDrift: 1,
  // used by mp4-remuxer
  forceKeyFrameOnDiscontinuity: !0,
  // used by ts-demuxer
  abrEwmaFastLive: 3,
  // used by abr-controller
  abrEwmaSlowLive: 9,
  // used by abr-controller
  abrEwmaFastVoD: 3,
  // used by abr-controller
  abrEwmaSlowVoD: 9,
  // used by abr-controller
  abrEwmaDefaultEstimate: 5e5,
  // 500 kbps  // used by abr-controller
  abrEwmaDefaultEstimateMax: 5e6,
  // 5 mbps
  abrBandWidthFactor: 0.95,
  // used by abr-controller
  abrBandWidthUpFactor: 0.7,
  // used by abr-controller
  abrMaxWithRealBitrate: !1,
  // used by abr-controller
  maxStarvationDelay: 4,
  // used by abr-controller
  maxLoadingDelay: 4,
  // used by abr-controller
  minAutoBitrate: 0,
  // used by hls
  emeEnabled: !1,
  // used by eme-controller
  widevineLicenseUrl: void 0,
  // used by eme-controller
  drmSystems: {},
  // used by eme-controller
  drmSystemOptions: {},
  // used by eme-controller
  requestMediaKeySystemAccessFunc: kl,
  // used by eme-controller
  requireKeySystemAccessOnStart: !1,
  // used by eme-controller
  testBandwidth: !0,
  progressive: !1,
  lowLatencyMode: !0,
  cmcd: void 0,
  enableDateRangeMetadataCues: !0,
  enableEmsgMetadataCues: !0,
  enableEmsgKLVMetadata: !1,
  enableID3MetadataCues: !0,
  enableInterstitialPlayback: !0,
  interstitialAppendInPlace: !0,
  interstitialLiveLookAhead: 10,
  useMediaCapabilities: !0,
  preserveManualLevelOnError: !1,
  certLoadPolicy: {
    default: Rp
  },
  keyLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 8e3,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 1,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 2e4,
        backoff: "linear"
      },
      errorRetry: {
        maxNumRetry: 8,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 2e4,
        backoff: "linear"
      }
    }
  },
  manifestLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1 / 0,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 1,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  playlistLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1e4,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 2,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  fragLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1e4,
      maxLoadTimeMs: 12e4,
      timeoutRetry: {
        maxNumRetry: 4,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 6,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  steeringManifestLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1e4,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 1,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  interstitialAssetListLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1e4,
      maxLoadTimeMs: 3e4,
      timeoutRetry: {
        maxNumRetry: 0,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 0,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  // These default settings are deprecated in favor of the above policies
  // and are maintained for backwards compatibility
  manifestLoadingTimeOut: 1e4,
  manifestLoadingMaxRetry: 1,
  manifestLoadingRetryDelay: 1e3,
  manifestLoadingMaxRetryTimeout: 64e3,
  levelLoadingTimeOut: 1e4,
  levelLoadingMaxRetry: 4,
  levelLoadingRetryDelay: 1e3,
  levelLoadingMaxRetryTimeout: 64e3,
  fragLoadingTimeOut: 2e4,
  fragLoadingMaxRetry: 6,
  fragLoadingRetryDelay: 1e3,
  fragLoadingMaxRetryTimeout: 64e3
}, Dp()), {}, {
  subtitleStreamController: Vm,
  subtitleTrackController: Om,
  timelineController: mp,
  audioStreamController: L0,
  audioTrackController: R0,
  emeController: Ut,
  cmcdController: Rm,
  contentSteeringController: Dm,
  interstitialsController: Hm
});
function Dp() {
  return {
    cueHandler: yp,
    // used by timeline-controller
    enableWebVTT: !0,
    // used by timeline-controller
    enableIMSC1: !0,
    // used by timeline-controller
    enableCEA708Captions: !0,
    // used by timeline-controller
    captionsTextTrack1Label: "English",
    // used by timeline-controller
    captionsTextTrack1LanguageCode: "en",
    // used by timeline-controller
    captionsTextTrack2Label: "Spanish",
    // used by timeline-controller
    captionsTextTrack2LanguageCode: "es",
    // used by timeline-controller
    captionsTextTrack3Label: "Unknown CC",
    // used by timeline-controller
    captionsTextTrack3LanguageCode: "",
    // used by timeline-controller
    captionsTextTrack4Label: "Unknown CC",
    // used by timeline-controller
    captionsTextTrack4LanguageCode: "",
    // used by timeline-controller
    renderTextTracksNatively: !0
  };
}
function Cp(i, e, t) {
  if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration))
    throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
  if (e.liveMaxLatencyDurationCount !== void 0 && (e.liveSyncDurationCount === void 0 || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount))
    throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
  if (e.liveMaxLatencyDuration !== void 0 && (e.liveSyncDuration === void 0 || e.liveMaxLatencyDuration <= e.liveSyncDuration))
    throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
  const s = Or(i), r = ["manifest", "level", "frag"], n = ["TimeOut", "MaxRetry", "RetryDelay", "MaxRetryTimeout"];
  return r.forEach((a) => {
    const o = `${a === "level" ? "playlist" : a}LoadPolicy`, u = e[o] === void 0, l = [];
    n.forEach((h) => {
      const c = `${a}Loading${h}`, d = e[c];
      if (d !== void 0 && u) {
        l.push(c);
        const g = s[o].default;
        switch (e[o] = {
          default: g
        }, h) {
          case "TimeOut":
            g.maxLoadTimeMs = d, g.maxTimeToFirstByteMs = d;
            break;
          case "MaxRetry":
            g.errorRetry.maxNumRetry = d, g.timeoutRetry.maxNumRetry = d;
            break;
          case "RetryDelay":
            g.errorRetry.retryDelayMs = d, g.timeoutRetry.retryDelayMs = d;
            break;
          case "MaxRetryTimeout":
            g.errorRetry.maxRetryDelayMs = d, g.timeoutRetry.maxRetryDelayMs = d;
            break;
        }
      }
    }), l.length && t.warn(`hls.js config: "${l.join('", "')}" setting(s) are deprecated, use "${o}": ${le(e[o])}`);
  }), re(re({}, s), e);
}
function Or(i) {
  return i && typeof i == "object" ? Array.isArray(i) ? i.map(Or) : Object.keys(i).reduce((e, t) => (e[t] = Or(i[t]), e), {}) : i;
}
function Pp(i, e) {
  const t = i.loader;
  t !== fo && t !== Ou ? (e.log("[config]: Custom loader detected, cannot enable progressive streaming"), i.progressive = !1) : vp() && (i.loader = fo, i.progressive = !0, i.enableSoftwareAES = !0, e.log("[config]: Progressive streaming enabled, using FetchLoader"));
}
const Ys = 2, kp = 0.1, wp = 0.05, Op = 100;
class Mp extends Rl {
  constructor(e, t) {
    super("gap-controller", e.logger), this.hls = void 0, this.fragmentTracker = void 0, this.media = null, this.mediaSource = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.buffered = {}, this.lastCurrentTime = 0, this.ended = 0, this.waiting = 0, this.onMediaPlaying = () => {
      this.ended = 0, this.waiting = 0;
    }, this.onMediaWaiting = () => {
      var s;
      (s = this.media) != null && s.seeking || (this.waiting = self.performance.now(), this.tick());
    }, this.onMediaEnded = () => {
      if (this.hls) {
        var s;
        this.ended = ((s = this.media) == null ? void 0 : s.currentTime) || 1, this.hls.trigger(E.MEDIA_ENDED, {
          stalled: !1
        });
      }
    }, this.hls = e, this.fragmentTracker = t, this.registerListeners();
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e && (e.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.BUFFER_APPENDED, this.onBufferAppended, this));
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e && (e.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.BUFFER_APPENDED, this.onBufferAppended, this));
  }
  destroy() {
    super.destroy(), this.unregisterListeners(), this.media = this.hls = this.fragmentTracker = null, this.mediaSource = void 0;
  }
  onMediaAttached(e, t) {
    this.setInterval(Op), this.mediaSource = t.mediaSource;
    const s = this.media = t.media;
    be(s, "playing", this.onMediaPlaying), be(s, "waiting", this.onMediaWaiting), be(s, "ended", this.onMediaEnded);
  }
  onMediaDetaching(e, t) {
    this.clearInterval();
    const {
      media: s
    } = this;
    s && (Re(s, "playing", this.onMediaPlaying), Re(s, "waiting", this.onMediaWaiting), Re(s, "ended", this.onMediaEnded), this.media = null), this.mediaSource = void 0;
  }
  onBufferAppended(e, t) {
    this.buffered = t.timeRanges;
  }
  get hasBuffered() {
    return Object.keys(this.buffered).length > 0;
  }
  tick() {
    var e;
    if (!((e = this.media) != null && e.readyState) || !this.hasBuffered)
      return;
    const t = this.media.currentTime;
    this.poll(t, this.lastCurrentTime), this.lastCurrentTime = t;
  }
  /**
   * Checks if the playhead is stuck within a gap, and if so, attempts to free it.
   * A gap is an unbuffered range between two buffered ranges (or the start and the first buffered range).
   *
   * @param lastCurrentTime - Previously read playhead position
   */
  poll(e, t) {
    var s, r;
    const n = (s = this.hls) == null ? void 0 : s.config;
    if (!n)
      return;
    const a = this.media;
    if (!a)
      return;
    const {
      seeking: o
    } = a, u = this.seeking && !o, l = !this.seeking && o, h = a.paused && !o || a.ended || a.playbackRate === 0;
    if (this.seeking = o, e !== t) {
      t && (this.ended = 0), this.moved = !0, o || (this.nudgeRetry = 0, n.nudgeOnVideoHole && !h && e > t && this.nudgeOnVideoHole(e, t)), this.waiting === 0 && this.stallResolved(e);
      return;
    }
    if (l || u) {
      u && this.stallResolved(e);
      return;
    }
    if (h) {
      this.nudgeRetry = 0, this.stallResolved(e), !this.ended && a.ended && this.hls && (this.ended = e || 1, this.hls.trigger(E.MEDIA_ENDED, {
        stalled: !1
      }));
      return;
    }
    if (!j.getBuffered(a).length) {
      this.nudgeRetry = 0;
      return;
    }
    const c = j.bufferInfo(a, e, 0), d = c.nextStart || 0, g = this.fragmentTracker;
    if (o && g && this.hls) {
      const L = go(this.hls.inFlightFragments, e), A = c.len > Ys, I = !d || L || d - e > Ys && !g.getPartialFragment(e);
      if (A || I)
        return;
      this.moved = !1;
    }
    const f = (r = this.hls) == null ? void 0 : r.latestLevelDetails;
    if (!this.moved && this.stalled !== null && g) {
      if (!(c.len > 0) && !d)
        return;
      const A = Math.max(d, c.start || 0) - e, _ = !!(f != null && f.live) ? f.targetduration * 2 : Ys, b = ws(e, g);
      if (A > 0 && (A <= _ || b)) {
        a.paused || this._trySkipBufferHole(b);
        return;
      }
    }
    const m = n.detectStallWithCurrentTimeMs, p = self.performance.now(), y = this.waiting;
    let v = this.stalled;
    if (v === null)
      if (y > 0 && p - y < m)
        v = this.stalled = y;
      else {
        this.stalled = p;
        return;
      }
    const T = p - v;
    if (!o && (T >= m || y) && this.hls) {
      var S;
      if (((S = this.mediaSource) == null ? void 0 : S.readyState) === "ended" && !(f != null && f.live) && Math.abs(e - (f?.edge || 0)) < 1) {
        if (this.ended)
          return;
        this.ended = e || 1, this.hls.trigger(E.MEDIA_ENDED, {
          stalled: !0
        });
        return;
      }
      if (this._reportStall(c), !this.media || !this.hls)
        return;
    }
    const x = j.bufferInfo(a, e, n.maxBufferHole);
    this._tryFixBufferStall(x, T, e);
  }
  stallResolved(e) {
    const t = this.stalled;
    if (t && this.hls && (this.stalled = null, this.stallReported)) {
      const s = self.performance.now() - t;
      this.log(`playback not stuck anymore @${e}, after ${Math.round(s)}ms`), this.stallReported = !1, this.waiting = 0, this.hls.trigger(E.STALL_RESOLVED, {});
    }
  }
  nudgeOnVideoHole(e, t) {
    var s;
    const r = this.buffered.video;
    if (this.hls && this.media && this.fragmentTracker && (s = this.buffered.audio) != null && s.length && r && r.length > 1 && e > r.end(0)) {
      const n = j.bufferedInfo(j.timeRangesToArray(this.buffered.audio), e, 0);
      if (n.len > 1 && t >= n.start) {
        const a = j.timeRangesToArray(r), o = j.bufferedInfo(a, t, 0).bufferedIndex;
        if (o > -1 && o < a.length - 1) {
          const u = j.bufferedInfo(a, e, 0).bufferedIndex, l = a[o].end, h = a[o + 1].start;
          if ((u === -1 || u > o) && h - l < 1 && // `maxBufferHole` may be too small and setting it to 0 should not disable this feature
          e - l < 2) {
            const c = new Error(`nudging playhead to flush pipeline after video hole. currentTime: ${e} hole: ${l} -> ${h} buffered index: ${u}`);
            this.warn(c.message), this.media.currentTime += 1e-6;
            let d = ws(e, this.fragmentTracker);
            d && "fragment" in d ? d = d.fragment : d || (d = void 0);
            const g = j.bufferInfo(this.media, e, 0);
            this.hls.trigger(E.ERROR, {
              type: V.MEDIA_ERROR,
              details: D.BUFFER_SEEK_OVER_HOLE,
              fatal: !1,
              error: c,
              reason: c.message,
              frag: d,
              buffer: g.len,
              bufferInfo: g
            });
          }
        }
      }
    }
  }
  /**
   * Detects and attempts to fix known buffer stalling issues.
   * @param bufferInfo - The properties of the current buffer.
   * @param stalledDurationMs - The amount of time Hls.js has been stalling for.
   * @private
   */
  _tryFixBufferStall(e, t, s) {
    var r, n;
    const {
      fragmentTracker: a,
      media: o
    } = this, u = (r = this.hls) == null ? void 0 : r.config;
    if (!o || !a || !u)
      return;
    const l = (n = this.hls) == null ? void 0 : n.latestLevelDetails, h = ws(s, a);
    if ((h || l != null && l.live && s < l.fragmentStart) && (this._trySkipBufferHole(h) || !this.media))
      return;
    const c = e.buffered, d = this.adjacentTraversal(e, s);
    (c && c.length > 1 && e.len > u.maxBufferHole || e.nextStart && (e.nextStart - s < u.maxBufferHole || d)) && (t > u.highBufferWatchdogPeriod * 1e3 || this.waiting) && (this.warn("Trying to nudge playhead over buffer-hole"), this._tryNudgeBuffer(e));
  }
  adjacentTraversal(e, t) {
    const s = this.fragmentTracker, r = e.nextStart;
    if (s && r) {
      const n = s.getFragAtPos(t, B.MAIN), a = s.getFragAtPos(r, B.MAIN);
      if (n && a)
        return a.sn - n.sn < 2;
    }
    return !1;
  }
  /**
   * Triggers a BUFFER_STALLED_ERROR event, but only once per stall period.
   * @param bufferLen - The playhead distance from the end of the current buffer segment.
   * @private
   */
  _reportStall(e) {
    const {
      hls: t,
      media: s,
      stallReported: r,
      stalled: n
    } = this;
    if (!r && n !== null && s && t) {
      this.stallReported = !0;
      const a = new Error(`Playback stalling at @${s.currentTime} due to low buffer (${le(e)})`);
      this.warn(a.message), t.trigger(E.ERROR, {
        type: V.MEDIA_ERROR,
        details: D.BUFFER_STALLED_ERROR,
        fatal: !1,
        error: a,
        buffer: e.len,
        bufferInfo: e,
        stalled: {
          start: n
        }
      });
    }
  }
  /**
   * Attempts to fix buffer stalls by jumping over known gaps caused by partial fragments
   * @param appended - The fragment or part found at the current time (where playback is stalling).
   * @private
   */
  _trySkipBufferHole(e) {
    var t;
    const {
      fragmentTracker: s,
      media: r
    } = this, n = (t = this.hls) == null ? void 0 : t.config;
    if (!r || !s || !n)
      return 0;
    const a = r.currentTime, o = j.bufferInfo(r, a, 0), u = a < o.start ? o.start : o.nextStart;
    if (u && this.hls) {
      const h = o.len <= n.maxBufferHole, c = o.len > 0 && o.len < 1 && r.readyState < 3, d = u - a;
      if (d > 0 && (h || c)) {
        if (d > n.maxBufferHole) {
          let f = !1;
          if (a === 0) {
            const m = s.getAppendedFrag(0, B.MAIN);
            m && u < m.end && (f = !0);
          }
          if (!f && e) {
            var l;
            if (!((l = this.hls.loadLevelObj) != null && l.details) || go(this.hls.inFlightFragments, u))
              return 0;
            let p = !1, y = e.end;
            for (; y < u; ) {
              const v = ws(y, s);
              if (v)
                y += v.duration;
              else {
                p = !0;
                break;
              }
            }
            if (p)
              return 0;
          }
        }
        const g = Math.max(u + wp, a + kp);
        if (this.warn(`skipping hole, adjusting currentTime from ${a} to ${g}`), this.moved = !0, r.currentTime = g, !(e != null && e.gap)) {
          const f = new Error(`fragment loaded with buffer holes, seeking from ${a} to ${g}`), m = {
            type: V.MEDIA_ERROR,
            details: D.BUFFER_SEEK_OVER_HOLE,
            fatal: !1,
            error: f,
            reason: f.message,
            buffer: o.len,
            bufferInfo: o
          };
          e && ("fragment" in e ? m.part = e : m.frag = e), this.hls.trigger(E.ERROR, m);
        }
        return g;
      }
    }
    return 0;
  }
  /**
   * Attempts to fix buffer stalls by advancing the mediaElement's current time by a small amount.
   * @private
   */
  _tryNudgeBuffer(e) {
    const {
      hls: t,
      media: s,
      nudgeRetry: r
    } = this, n = t?.config;
    if (!s || !n)
      return 0;
    const a = s.currentTime;
    if (this.nudgeRetry++, r < n.nudgeMaxRetry) {
      const o = a + (r + 1) * n.nudgeOffset, u = new Error(`Nudging 'currentTime' from ${a} to ${o}`);
      this.warn(u.message), s.currentTime = o, t.trigger(E.ERROR, {
        type: V.MEDIA_ERROR,
        details: D.BUFFER_NUDGE_ON_STALL,
        error: u,
        fatal: !1,
        buffer: e.len,
        bufferInfo: e
      });
    } else {
      const o = new Error(`Playhead still not moving while enough data buffered @${a} after ${n.nudgeMaxRetry} nudges`);
      this.error(o.message), t.trigger(E.ERROR, {
        type: V.MEDIA_ERROR,
        details: D.BUFFER_STALLED_ERROR,
        error: o,
        fatal: !0,
        buffer: e.len,
        bufferInfo: e
      });
    }
  }
}
function go(i, e) {
  const t = mo(i.main);
  if (t && t.start <= e)
    return t;
  const s = mo(i.audio);
  return s && s.start <= e ? s : null;
}
function mo(i) {
  if (!i)
    return null;
  switch (i.state) {
    case C.IDLE:
    case C.STOPPED:
    case C.ENDED:
    case C.ERROR:
      return null;
  }
  return i.frag;
}
function ws(i, e) {
  return e.getAppendedFrag(i, B.MAIN) || e.getPartialFragment(i);
}
const Fp = 0.25;
function Mr() {
  if (!(typeof self > "u"))
    return self.VTTCue || self.TextTrackCue;
}
function er(i, e, t, s, r) {
  let n = new i(e, t, "");
  try {
    n.value = s, r && (n.type = r);
  } catch {
    n = new i(e, t, le(r ? re({
      type: r
    }, s) : s));
  }
  return n;
}
const Os = (() => {
  const i = Mr();
  try {
    i && new i(0, Number.POSITIVE_INFINITY, "");
  } catch {
    return Number.MAX_VALUE;
  }
  return Number.POSITIVE_INFINITY;
})();
class Np {
  constructor(e) {
    this.hls = void 0, this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.removeCues = !0, this.assetCue = void 0, this.onEventCueEnter = () => {
      this.hls && this.hls.trigger(E.EVENT_CUE_ENTER, {});
    }, this.hls = e, this._registerListeners();
  }
  destroy() {
    this._unregisterListeners(), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = this.onEventCueEnter = null;
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e && (e.on(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), e.on(E.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.on(E.LEVEL_PTS_UPDATED, this.onLevelPtsUpdated, this));
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e && (e.off(E.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), e.off(E.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.off(E.LEVEL_PTS_UPDATED, this.onLevelPtsUpdated, this));
  }
  // Add ID3 metatadata text track.
  onMediaAttaching(e, t) {
    var s;
    this.media = t.media, ((s = t.overrides) == null ? void 0 : s.cueRemoval) === !1 && (this.removeCues = !1);
  }
  onMediaAttached() {
    var e;
    const t = (e = this.hls) == null ? void 0 : e.latestLevelDetails;
    t && this.updateDateRangeCues(t);
  }
  onMediaDetaching(e, t) {
    this.media = null, !t.transferMedia && (this.id3Track && (this.removeCues && Mt(this.id3Track, this.onEventCueEnter), this.id3Track = null), this.dateRangeCuesAppended = {});
  }
  onManifestLoading() {
    this.dateRangeCuesAppended = {};
  }
  createTrack(e) {
    const t = this.getID3Track(e.textTracks);
    return t.mode = "hidden", t;
  }
  getID3Track(e) {
    if (this.media) {
      for (let t = 0; t < e.length; t++) {
        const s = e[t];
        if (s.kind === "metadata" && s.label === "id3")
          return xu(s, this.media), s;
      }
      return this.media.addTextTrack("metadata", "id3");
    }
  }
  onFragParsingMetadata(e, t) {
    if (!this.media || !this.hls)
      return;
    const {
      enableEmsgMetadataCues: s,
      enableID3MetadataCues: r
    } = this.hls.config;
    if (!s && !r)
      return;
    const {
      samples: n
    } = t;
    this.id3Track || (this.id3Track = this.createTrack(this.media));
    const a = Mr();
    if (a)
      for (let o = 0; o < n.length; o++) {
        const u = n[o].type;
        if (u === ke.emsg && !s || !r)
          continue;
        const l = zl(n[o].data), h = n[o].pts;
        let c = h + n[o].duration;
        c > Os && (c = Os), c - h <= 0 && (c = h + Fp);
        for (let g = 0; g < l.length; g++) {
          const f = l[g];
          if (!Ql(f)) {
            this.updateId3CueEnds(h, u);
            const m = er(a, h, c, f, u);
            m && this.id3Track.addCue(m);
          }
        }
      }
  }
  updateId3CueEnds(e, t) {
    var s;
    const r = (s = this.id3Track) == null ? void 0 : s.cues;
    if (r)
      for (let n = r.length; n--; ) {
        const a = r[n];
        a.type === t && a.startTime < e && a.endTime === Os && (a.endTime = e);
      }
  }
  onBufferFlushing(e, {
    startOffset: t,
    endOffset: s,
    type: r
  }) {
    const {
      id3Track: n,
      hls: a
    } = this;
    if (!a)
      return;
    const {
      config: {
        enableEmsgMetadataCues: o,
        enableID3MetadataCues: u
      }
    } = a;
    if (n && (o || u)) {
      let l;
      r === "audio" ? l = (h) => h.type === ke.audioId3 && u : r === "video" ? l = (h) => h.type === ke.emsg && o : l = (h) => h.type === ke.audioId3 && u || h.type === ke.emsg && o, kr(n, t, s, l);
    }
  }
  onLevelUpdated(e, {
    details: t
  }) {
    this.updateDateRangeCues(t, !0);
  }
  onLevelPtsUpdated(e, t) {
    Math.abs(t.drift) > 0.01 && this.updateDateRangeCues(t.details);
  }
  updateDateRangeCues(e, t) {
    if (!this.hls || !this.media)
      return;
    const {
      assetPlayerId: s,
      timelineOffset: r,
      enableDateRangeMetadataCues: n,
      interstitialsController: a
    } = this.hls.config;
    if (!n)
      return;
    const o = Mr();
    if (s && r && !a) {
      const {
        fragmentStart: m,
        fragmentEnd: p
      } = e;
      let y = this.assetCue;
      y ? (y.startTime = m, y.endTime = p) : o && (y = this.assetCue = er(o, m, p, {
        assetPlayerId: this.hls.config.assetPlayerId
      }, "hlsjs.interstitial.asset"), y && (y.id = s, this.id3Track || (this.id3Track = this.createTrack(this.media)), this.id3Track.addCue(y), y.addEventListener("enter", this.onEventCueEnter)));
    }
    if (!e.hasProgramDateTime)
      return;
    const {
      id3Track: u
    } = this, {
      dateRanges: l
    } = e, h = Object.keys(l);
    let c = this.dateRangeCuesAppended;
    if (u && t) {
      var d;
      if ((d = u.cues) != null && d.length) {
        const m = Object.keys(c).filter((p) => !h.includes(p));
        for (let p = m.length; p--; ) {
          var g;
          const y = m[p], v = (g = c[y]) == null ? void 0 : g.cues;
          delete c[y], v && Object.keys(v).forEach((T) => {
            const S = v[T];
            if (S) {
              S.removeEventListener("enter", this.onEventCueEnter);
              try {
                u.removeCue(S);
              } catch {
              }
            }
          });
        }
      } else
        c = this.dateRangeCuesAppended = {};
    }
    const f = e.fragments[e.fragments.length - 1];
    if (!(h.length === 0 || !F(f?.programDateTime))) {
      this.id3Track || (this.id3Track = this.createTrack(this.media));
      for (let m = 0; m < h.length; m++) {
        const p = h[m], y = l[p], v = y.startTime, T = c[p], S = T?.cues || {};
        let x = T?.durationKnown || !1, L = Os;
        const {
          duration: A,
          endDate: I
        } = y;
        if (I && A !== null)
          L = v + A, x = !0;
        else if (y.endOnNext && !x) {
          const b = h.reduce((P, M) => {
            if (M !== y.id) {
              const U = l[M];
              if (U.class === y.class && U.startDate > y.startDate && (!P || y.startDate < P.startDate))
                return U;
            }
            return P;
          }, null);
          b && (L = b.startTime, x = !0);
        }
        const _ = Object.keys(y.attr);
        for (let b = 0; b < _.length; b++) {
          const P = _[b];
          if (!rg(P))
            continue;
          const M = S[P];
          if (M)
            x && !(T != null && T.durationKnown) ? M.endTime = L : Math.abs(M.startTime - v) > 0.01 && (M.startTime = v, M.endTime = L);
          else if (o) {
            let U = y.attr[P];
            ng(P) && (U = ol(U));
            const $ = er(o, v, L, {
              key: P,
              data: U
            }, ke.dateRange);
            $ && ($.id = p, this.id3Track.addCue($), S[P] = $, a && (P === "X-ASSET-LIST" || P === "X-ASSET-URL") && $.addEventListener("enter", this.onEventCueEnter));
          }
        }
        c[p] = {
          cues: S,
          dateRange: y,
          durationKnown: x
        };
      }
    }
  }
}
class Bp {
  constructor(e) {
    this.hls = void 0, this.config = void 0, this.media = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this._targetLatencyUpdated = !1, this.onTimeupdate = () => {
      const {
        media: t
      } = this, s = this.levelDetails;
      if (!t || !s)
        return;
      this.currentTime = t.currentTime;
      const r = this.computeLatency();
      if (r === null)
        return;
      this._latency = r;
      const {
        lowLatencyMode: n,
        maxLiveSyncPlaybackRate: a
      } = this.config;
      if (!n || a === 1 || !s.live)
        return;
      const o = this.targetLatency;
      if (o === null)
        return;
      const u = r - o, l = Math.min(this.maxLatency, o + s.targetduration);
      if (u < l && u > 0.05 && this.forwardBufferLength > 1) {
        const c = Math.min(2, Math.max(1, a)), d = Math.round(2 / (1 + Math.exp(-0.75 * u - this.edgeStalled)) * 20) / 20, g = Math.min(c, Math.max(1, d));
        this.changeMediaPlaybackRate(t, g);
      } else t.playbackRate !== 1 && t.playbackRate !== 0 && this.changeMediaPlaybackRate(t, 1);
    }, this.hls = e, this.config = e.config, this.registerListeners();
  }
  get levelDetails() {
    var e;
    return ((e = this.hls) == null ? void 0 : e.latestLevelDetails) || null;
  }
  get latency() {
    return this._latency || 0;
  }
  get maxLatency() {
    const {
      config: e
    } = this;
    if (e.liveMaxLatencyDuration !== void 0)
      return e.liveMaxLatencyDuration;
    const t = this.levelDetails;
    return t ? e.liveMaxLatencyDurationCount * t.targetduration : 0;
  }
  get targetLatency() {
    const e = this.levelDetails;
    if (e === null || this.hls === null)
      return null;
    const {
      holdBack: t,
      partHoldBack: s,
      targetduration: r
    } = e, {
      liveSyncDuration: n,
      liveSyncDurationCount: a,
      lowLatencyMode: o
    } = this.config, u = this.hls.userConfig;
    let l = o && s || t;
    (this._targetLatencyUpdated || u.liveSyncDuration || u.liveSyncDurationCount || l === 0) && (l = n !== void 0 ? n : a * r);
    const h = r;
    return l + Math.min(this.stallCount * this.config.liveSyncOnStallIncrease, h);
  }
  set targetLatency(e) {
    this.stallCount = 0, this.config.liveSyncDuration = e, this._targetLatencyUpdated = !0;
  }
  get liveSyncPosition() {
    const e = this.estimateLiveEdge(), t = this.targetLatency;
    if (e === null || t === null)
      return null;
    const s = this.levelDetails;
    if (s === null)
      return null;
    const r = s.edge, n = e - t - this.edgeStalled, a = r - s.totalduration, o = r - (this.config.lowLatencyMode && s.partTarget || s.targetduration);
    return Math.min(Math.max(a, n), o);
  }
  get drift() {
    const e = this.levelDetails;
    return e === null ? 1 : e.drift;
  }
  get edgeStalled() {
    const e = this.levelDetails;
    if (e === null)
      return 0;
    const t = (this.config.lowLatencyMode && e.partTarget || e.targetduration) * 3;
    return Math.max(e.age - t, 0);
  }
  get forwardBufferLength() {
    const {
      media: e
    } = this, t = this.levelDetails;
    if (!e || !t)
      return 0;
    const s = e.buffered.length;
    return (s ? e.buffered.end(s - 1) : t.edge) - this.currentTime;
  }
  destroy() {
    this.unregisterListeners(), this.onMediaDetaching(), this.hls = null;
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e && (e.on(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.on(E.ERROR, this.onError, this));
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e && (e.off(E.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(E.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.LEVEL_UPDATED, this.onLevelUpdated, this), e.off(E.ERROR, this.onError, this));
  }
  onMediaAttached(e, t) {
    this.media = t.media, this.media.addEventListener("timeupdate", this.onTimeupdate);
  }
  onMediaDetaching() {
    this.media && (this.media.removeEventListener("timeupdate", this.onTimeupdate), this.media = null);
  }
  onManifestLoading() {
    this._latency = null, this.stallCount = 0;
  }
  onLevelUpdated(e, {
    details: t
  }) {
    t.advanced && this.onTimeupdate(), !t.live && this.media && this.media.removeEventListener("timeupdate", this.onTimeupdate);
  }
  onError(e, t) {
    var s;
    t.details === D.BUFFER_STALLED_ERROR && (this.stallCount++, this.hls && (s = this.levelDetails) != null && s.live && this.hls.logger.warn("[latency-controller]: Stall detected, adjusting target latency"));
  }
  changeMediaPlaybackRate(e, t) {
    var s, r;
    e.playbackRate !== t && ((s = this.hls) == null || s.logger.debug(`[latency-controller]: latency=${this.latency.toFixed(3)}, targetLatency=${(r = this.targetLatency) == null ? void 0 : r.toFixed(3)}, forwardBufferLength=${this.forwardBufferLength.toFixed(3)}: adjusting playback rate from ${e.playbackRate} to ${t}`), e.playbackRate = t);
  }
  estimateLiveEdge() {
    const e = this.levelDetails;
    return e === null ? null : e.edge + e.age;
  }
  computeLatency() {
    const e = this.estimateLiveEdge();
    return e === null ? null : e - this.currentTime;
  }
}
class Up extends mn {
  constructor(e, t) {
    super(e, "level-controller"), this._levels = [], this._firstLevel = -1, this._maxAutoLevel = -1, this._startLevel = void 0, this.currentLevel = null, this.currentLevelIndex = -1, this.manualLevelIndex = -1, this.steering = void 0, this.onParsedComplete = void 0, this.steering = t, this._registerListeners();
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(E.LEVEL_LOADED, this.onLevelLoaded, this), e.on(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(E.FRAG_BUFFERED, this.onFragBuffered, this), e.on(E.ERROR, this.onError, this);
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(E.LEVEL_LOADED, this.onLevelLoaded, this), e.off(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(E.FRAG_BUFFERED, this.onFragBuffered, this), e.off(E.ERROR, this.onError, this);
  }
  destroy() {
    this._unregisterListeners(), this.steering = null, this.resetLevels(), super.destroy();
  }
  stopLoad() {
    this._levels.forEach((t) => {
      t.loadError = 0, t.fragmentError = 0;
    }), super.stopLoad();
  }
  resetLevels() {
    this._startLevel = void 0, this.manualLevelIndex = -1, this.currentLevelIndex = -1, this.currentLevel = null, this._levels = [], this._maxAutoLevel = -1;
  }
  onManifestLoading(e, t) {
    this.resetLevels();
  }
  onManifestLoaded(e, t) {
    const s = this.hls.config.preferManagedMediaSource, r = [], n = {}, a = {};
    let o = !1, u = !1, l = !1;
    t.levels.forEach((h) => {
      const c = h.attrs;
      let {
        audioCodec: d,
        videoCodec: g
      } = h;
      d && (h.audioCodec = d = Js(d, s) || void 0), g && (g = h.videoCodec = Sf(g));
      const {
        width: f,
        height: m,
        unknownCodecs: p
      } = h, y = p?.length || 0;
      if (o || (o = !!(f && m)), u || (u = !!g), l || (l = !!d), y || d && !this.isAudioSupported(d) || g && !this.isVideoSupported(g)) {
        this.log(`Some or all CODECS not supported "${c.CODECS}"`);
        return;
      }
      const {
        CODECS: v,
        "FRAME-RATE": T,
        "HDCP-LEVEL": S,
        "PATHWAY-ID": x,
        RESOLUTION: L,
        "VIDEO-RANGE": A
      } = c, _ = `${`${x || "."}-`}${h.bitrate}-${L}-${T}-${v}-${A}-${S}`;
      if (n[_])
        if (n[_].uri !== h.url && !h.attrs["PATHWAY-ID"]) {
          const b = a[_] += 1;
          h.attrs["PATHWAY-ID"] = new Array(b + 1).join(".");
          const P = this.createLevel(h);
          n[_] = P, r.push(P);
        } else
          n[_].addGroupId("audio", c.AUDIO), n[_].addGroupId("text", c.SUBTITLES);
      else {
        const b = this.createLevel(h);
        n[_] = b, a[_] = 1, r.push(b);
      }
    }), this.filterAndSortMediaOptions(r, t, o, u, l);
  }
  createLevel(e) {
    const t = new us(e), s = e.supplemental;
    if (s != null && s.videoCodec && !this.isVideoSupported(s.videoCodec)) {
      const r = new Error(`SUPPLEMENTAL-CODECS not supported "${s.videoCodec}"`);
      this.log(r.message), t.supportedResult = vl(r, []);
    }
    return t;
  }
  isAudioSupported(e) {
    return os(e, "audio", this.hls.config.preferManagedMediaSource);
  }
  isVideoSupported(e) {
    return os(e, "video", this.hls.config.preferManagedMediaSource);
  }
  filterAndSortMediaOptions(e, t, s, r, n) {
    var a;
    let o = [], u = [], l = e;
    const h = ((a = t.stats) == null ? void 0 : a.parsing) || {};
    if ((s || r) && n && (l = l.filter(({
      videoCodec: v,
      videoRange: T,
      width: S,
      height: x
    }) => (!!v || !!(S && x)) && Pf(T))), l.length === 0) {
      Promise.resolve().then(() => {
        if (this.hls) {
          let v = "no level with compatible codecs found in manifest", T = v;
          t.levels.length && (T = `one or more CODECS in variant not supported: ${le(t.levels.map((x) => x.attrs.CODECS).filter((x, L, A) => A.indexOf(x) === L))}`, this.warn(T), v += ` (${T})`);
          const S = new Error(v);
          this.hls.trigger(E.ERROR, {
            type: V.MEDIA_ERROR,
            details: D.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
            fatal: !0,
            url: t.url,
            error: S,
            reason: T
          });
        }
      }), h.end = performance.now();
      return;
    }
    t.audioTracks && (o = t.audioTracks.filter((v) => !v.audioCodec || this.isAudioSupported(v.audioCodec)), po(o)), t.subtitles && (u = t.subtitles, po(u));
    const c = l.slice(0);
    l.sort((v, T) => {
      if (v.attrs["HDCP-LEVEL"] !== T.attrs["HDCP-LEVEL"])
        return (v.attrs["HDCP-LEVEL"] || "") > (T.attrs["HDCP-LEVEL"] || "") ? 1 : -1;
      if (s && v.height !== T.height)
        return v.height - T.height;
      if (v.frameRate !== T.frameRate)
        return v.frameRate - T.frameRate;
      if (v.videoRange !== T.videoRange)
        return ei.indexOf(v.videoRange) - ei.indexOf(T.videoRange);
      if (v.videoCodec !== T.videoCodec) {
        const S = aa(v.videoCodec), x = aa(T.videoCodec);
        if (S !== x)
          return x - S;
      }
      if (v.uri === T.uri && v.codecSet !== T.codecSet) {
        const S = Zs(v.codecSet), x = Zs(T.codecSet);
        if (S !== x)
          return x - S;
      }
      return v.averageBitrate !== T.averageBitrate ? v.averageBitrate - T.averageBitrate : 0;
    });
    let d = c[0];
    if (this.steering && (l = this.steering.filterParsedLevels(l), l.length !== c.length)) {
      for (let v = 0; v < c.length; v++)
        if (c[v].pathwayId === l[0].pathwayId) {
          d = c[v];
          break;
        }
    }
    this._levels = l;
    for (let v = 0; v < l.length; v++)
      if (l[v] === d) {
        var g;
        this._firstLevel = v;
        const T = d.bitrate, S = this.hls.bandwidthEstimate;
        if (this.log(`manifest loaded, ${l.length} level(s) found, first bitrate: ${T}`), ((g = this.hls.userConfig) == null ? void 0 : g.abrEwmaDefaultEstimate) === void 0) {
          const x = Math.min(T, this.hls.config.abrEwmaDefaultEstimateMax);
          x > S && S === this.hls.abrEwmaDefaultEstimate && (this.hls.bandwidthEstimate = x);
        }
        break;
      }
    const f = n && !r, m = this.hls.config, p = !!(m.audioStreamController && m.audioTrackController), y = {
      levels: l,
      audioTracks: o,
      subtitleTracks: u,
      sessionData: t.sessionData,
      sessionKeys: t.sessionKeys,
      firstLevel: this._firstLevel,
      stats: t.stats,
      audio: n,
      video: r,
      altAudio: p && !f && o.some((v) => !!v.url)
    };
    h.end = performance.now(), this.hls.trigger(E.MANIFEST_PARSED, y);
  }
  get levels() {
    return this._levels.length === 0 ? null : this._levels;
  }
  get loadLevelObj() {
    return this.currentLevel;
  }
  get level() {
    return this.currentLevelIndex;
  }
  set level(e) {
    const t = this._levels;
    if (t.length === 0)
      return;
    if (e < 0 || e >= t.length) {
      const h = new Error("invalid level idx"), c = e < 0;
      if (this.hls.trigger(E.ERROR, {
        type: V.OTHER_ERROR,
        details: D.LEVEL_SWITCH_ERROR,
        level: e,
        fatal: c,
        error: h,
        reason: h.message
      }), c)
        return;
      e = Math.min(e, t.length - 1);
    }
    const s = this.currentLevelIndex, r = this.currentLevel, n = r ? r.attrs["PATHWAY-ID"] : void 0, a = t[e], o = a.attrs["PATHWAY-ID"];
    if (this.currentLevelIndex = e, this.currentLevel = a, s === e && r && n === o)
      return;
    this.log(`Switching to level ${e} (${a.height ? a.height + "p " : ""}${a.videoRange ? a.videoRange + " " : ""}${a.codecSet ? a.codecSet + " " : ""}@${a.bitrate})${o ? " with Pathway " + o : ""} from level ${s}${n ? " with Pathway " + n : ""}`);
    const u = {
      level: e,
      attrs: a.attrs,
      details: a.details,
      bitrate: a.bitrate,
      averageBitrate: a.averageBitrate,
      maxBitrate: a.maxBitrate,
      realBitrate: a.realBitrate,
      width: a.width,
      height: a.height,
      codecSet: a.codecSet,
      audioCodec: a.audioCodec,
      videoCodec: a.videoCodec,
      audioGroups: a.audioGroups,
      subtitleGroups: a.subtitleGroups,
      loaded: a.loaded,
      loadError: a.loadError,
      fragmentError: a.fragmentError,
      name: a.name,
      id: a.id,
      uri: a.uri,
      url: a.url,
      urlId: 0,
      audioGroupIds: a.audioGroupIds,
      textGroupIds: a.textGroupIds
    };
    this.hls.trigger(E.LEVEL_SWITCHING, u);
    const l = a.details;
    if (!l || l.live) {
      const h = this.switchParams(a.uri, r?.details, l);
      this.loadPlaylist(h);
    }
  }
  get manualLevel() {
    return this.manualLevelIndex;
  }
  set manualLevel(e) {
    this.manualLevelIndex = e, this._startLevel === void 0 && (this._startLevel = e), e !== -1 && (this.level = e);
  }
  get firstLevel() {
    return this._firstLevel;
  }
  set firstLevel(e) {
    this._firstLevel = e;
  }
  get startLevel() {
    if (this._startLevel === void 0) {
      const e = this.hls.config.startLevel;
      return e !== void 0 ? e : this.hls.firstAutoLevel;
    }
    return this._startLevel;
  }
  set startLevel(e) {
    this._startLevel = e;
  }
  get pathways() {
    return this.steering ? this.steering.pathways() : [];
  }
  get pathwayPriority() {
    return this.steering ? this.steering.pathwayPriority : null;
  }
  set pathwayPriority(e) {
    if (this.steering) {
      const t = this.steering.pathways(), s = e.filter((r) => t.indexOf(r) !== -1);
      if (e.length < 1) {
        this.warn(`pathwayPriority ${e} should contain at least one pathway from list: ${t}`);
        return;
      }
      this.steering.pathwayPriority = s;
    }
  }
  onError(e, t) {
    t.fatal || !t.context || t.context.type === Q.LEVEL && t.context.level === this.level && this.checkRetry(t);
  }
  // reset errors on the successful load of a fragment
  onFragBuffered(e, {
    frag: t
  }) {
    if (t !== void 0 && t.type === B.MAIN) {
      const s = t.elementaryStreams;
      if (!Object.keys(s).some((n) => !!s[n]))
        return;
      const r = this._levels[t.level];
      r != null && r.loadError && (this.log(`Resetting level error count of ${r.loadError} on frag buffered`), r.loadError = 0);
    }
  }
  onLevelLoaded(e, t) {
    var s;
    const {
      level: r,
      details: n
    } = t, a = t.levelInfo;
    if (!a) {
      var o;
      this.warn(`Invalid level index ${r}`), (o = t.deliveryDirectives) != null && o.skip && (n.deltaUpdateFailed = !0);
      return;
    }
    if (a === this.currentLevel || t.withoutMultiVariant) {
      a.fragmentError === 0 && (a.loadError = 0);
      let u = a.details;
      u === t.details && u.advanced && (u = void 0), this.playlistLoaded(r, t, u);
    } else (s = t.deliveryDirectives) != null && s.skip && (n.deltaUpdateFailed = !0);
  }
  loadPlaylist(e) {
    super.loadPlaylist(), this.shouldLoadPlaylist(this.currentLevel) && this.scheduleLoading(this.currentLevel, e);
  }
  loadingPlaylist(e, t) {
    super.loadingPlaylist(e, t);
    const s = this.getUrlWithDirectives(e.uri, t), r = this.currentLevelIndex, n = e.attrs["PATHWAY-ID"], a = e.details, o = a?.age;
    this.log(`Loading level index ${r}${t?.msn !== void 0 ? " at sn " + t.msn + " part " + t.part : ""}${n ? " Pathway " + n : ""}${o && a.live ? " age " + o.toFixed(1) + (a.type && " " + a.type || "") : ""} ${s}`), this.hls.trigger(E.LEVEL_LOADING, {
      url: s,
      level: r,
      levelInfo: e,
      pathwayId: e.attrs["PATHWAY-ID"],
      id: 0,
      // Deprecated Level urlId
      deliveryDirectives: t || null
    });
  }
  get nextLoadLevel() {
    return this.manualLevelIndex !== -1 ? this.manualLevelIndex : this.hls.nextAutoLevel;
  }
  set nextLoadLevel(e) {
    this.level = e, this.manualLevelIndex === -1 && (this.hls.nextAutoLevel = e);
  }
  removeLevel(e) {
    var t;
    if (this._levels.length === 1)
      return;
    const s = this._levels.filter((n, a) => a !== e ? !0 : (this.steering && this.steering.removeLevel(n), n === this.currentLevel && (this.currentLevel = null, this.currentLevelIndex = -1, n.details && n.details.fragments.forEach((o) => o.level = -1)), !1));
    $l(s), this._levels = s, this.currentLevelIndex > -1 && (t = this.currentLevel) != null && t.details && (this.currentLevelIndex = this.currentLevel.details.fragments[0].level), this.manualLevelIndex > -1 && (this.manualLevelIndex = this.currentLevelIndex);
    const r = s.length - 1;
    this._firstLevel = Math.min(this._firstLevel, r), this._startLevel && (this._startLevel = Math.min(this._startLevel, r)), this.hls.trigger(E.LEVELS_UPDATED, {
      levels: s
    });
  }
  onLevelsUpdated(e, {
    levels: t
  }) {
    this._levels = t;
  }
  checkMaxAutoUpdated() {
    const {
      autoLevelCapping: e,
      maxAutoLevel: t,
      maxHdcpLevel: s
    } = this.hls;
    this._maxAutoLevel !== t && (this._maxAutoLevel = t, this.hls.trigger(E.MAX_AUTO_LEVEL_UPDATED, {
      autoLevelCapping: e,
      levels: this.levels,
      maxAutoLevel: t,
      minAutoLevel: this.hls.minAutoLevel,
      maxHdcpLevel: s
    }));
  }
}
function po(i) {
  const e = {};
  i.forEach((t) => {
    const s = t.groupId || "";
    t.id = e[s] = e[s] || 0, e[s]++;
  });
}
function Mu() {
  return self.SourceBuffer || self.WebKitSourceBuffer;
}
function Fu() {
  if (!ct())
    return !1;
  const e = Mu();
  return !e || e.prototype && typeof e.prototype.appendBuffer == "function" && typeof e.prototype.remove == "function";
}
function $p() {
  if (!Fu())
    return !1;
  const i = ct();
  return typeof i?.isTypeSupported == "function" && (["avc1.42E01E,mp4a.40.2", "av01.0.01M.08", "vp09.00.50.08"].some((e) => i.isTypeSupported(ls(e, "video"))) || ["mp4a.40.2", "fLaC"].some((e) => i.isTypeSupported(ls(e, "audio"))));
}
function Gp() {
  var i;
  const e = Mu();
  return typeof (e == null || (i = e.prototype) == null ? void 0 : i.changeType) == "function";
}
const Hp = 100;
class Vp extends on {
  constructor(e, t, s) {
    super(e, t, s, "stream-controller", B.MAIN), this.audioCodecSwap = !1, this.level = -1, this._forceStartLoad = !1, this._hasEnoughToStart = !1, this.altAudio = 0, this.audioOnly = !1, this.fragPlaying = null, this.fragLastKbps = 0, this.couldBacktrack = !1, this.backtrackFragment = null, this.audioCodecSwitch = !1, this.videoBuffer = null, this.onMediaPlaying = () => {
      this.tick();
    }, this.onMediaSeeked = () => {
      const r = this.media, n = r ? r.currentTime : null;
      if (n === null || !F(n) || (this.log(`Media seeked to ${n.toFixed(3)}`), !this.getBufferedFrag(n)))
        return;
      const a = this.getFwdBufferInfoAtPos(r, n, B.MAIN, 0);
      if (a === null || a.len === 0) {
        this.warn(`Main forward buffer length at ${n} on "seeked" event ${a ? a.len : "empty"})`);
        return;
      }
      this.tick();
    }, this.registerListeners();
  }
  registerListeners() {
    super.registerListeners();
    const {
      hls: e
    } = this;
    e.on(E.MANIFEST_PARSED, this.onManifestParsed, this), e.on(E.LEVEL_LOADING, this.onLevelLoading, this), e.on(E.LEVEL_LOADED, this.onLevelLoaded, this), e.on(E.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), e.on(E.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.on(E.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), e.on(E.BUFFER_CREATED, this.onBufferCreated, this), e.on(E.BUFFER_FLUSHED, this.onBufferFlushed, this), e.on(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(E.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  unregisterListeners() {
    super.unregisterListeners();
    const {
      hls: e
    } = this;
    e.off(E.MANIFEST_PARSED, this.onManifestParsed, this), e.off(E.LEVEL_LOADED, this.onLevelLoaded, this), e.off(E.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), e.off(E.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.off(E.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), e.off(E.BUFFER_CREATED, this.onBufferCreated, this), e.off(E.BUFFER_FLUSHED, this.onBufferFlushed, this), e.off(E.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(E.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  onHandlerDestroying() {
    this.onMediaPlaying = this.onMediaSeeked = null, this.unregisterListeners(), super.onHandlerDestroying();
  }
  startLoad(e, t) {
    if (this.levels) {
      const {
        lastCurrentTime: s,
        hls: r
      } = this;
      if (this.stopLoad(), this.setInterval(Hp), this.level = -1, !this.startFragRequested) {
        let n = r.startLevel;
        n === -1 && (r.config.testBandwidth && this.levels.length > 1 ? (n = 0, this.bitrateTest = !0) : n = r.firstAutoLevel), r.nextLoadLevel = n, this.level = r.loadLevel, this._hasEnoughToStart = !!t;
      }
      s > 0 && e === -1 && !t && (this.log(`Override startPosition with lastCurrentTime @${s.toFixed(3)}`), e = s), this.state = C.IDLE, this.nextLoadPosition = this.lastCurrentTime = e + this.timelineOffset, this.startPosition = t ? -1 : e, this.tick();
    } else
      this._forceStartLoad = !0, this.state = C.STOPPED;
  }
  stopLoad() {
    this._forceStartLoad = !1, super.stopLoad();
  }
  doTick() {
    switch (this.state) {
      case C.WAITING_LEVEL: {
        const {
          levels: e,
          level: t
        } = this, s = e?.[t], r = s?.details;
        if (r && (!r.live || this.levelLastLoaded === s && !this.waitForLive(s))) {
          if (this.waitForCdnTuneIn(r))
            break;
          this.state = C.IDLE;
          break;
        } else if (this.hls.nextLoadLevel !== this.level) {
          this.state = C.IDLE;
          break;
        }
        break;
      }
      case C.FRAG_LOADING_WAITING_RETRY:
        this.checkRetryDate();
        break;
    }
    this.state === C.IDLE && this.doTickIdle(), this.onTickEnd();
  }
  onTickEnd() {
    var e;
    super.onTickEnd(), (e = this.media) != null && e.readyState && this.media.seeking === !1 && (this.lastCurrentTime = this.media.currentTime), this.checkFragmentChanged();
  }
  doTickIdle() {
    const {
      hls: e,
      levelLastLoaded: t,
      levels: s,
      media: r
    } = this;
    if (t === null || !r && !this.primaryPrefetch && (this.startFragRequested || !e.config.startFragPrefetch) || this.altAudio && this.audioOnly)
      return;
    const n = this.buffering ? e.nextLoadLevel : e.loadLevel;
    if (!(s != null && s[n]))
      return;
    const a = s[n], o = this.getMainFwdBufferInfo();
    if (o === null)
      return;
    const u = this.getLevelDetails();
    if (u && this._streamEnded(o, u)) {
      const m = {};
      this.altAudio === 2 && (m.type = "video"), this.hls.trigger(E.BUFFER_EOS, m), this.state = C.ENDED;
      return;
    }
    if (!this.buffering)
      return;
    e.loadLevel !== n && e.manualLevel === -1 && this.log(`Adapting to level ${n} from level ${this.level}`), this.level = e.nextLoadLevel = n;
    const l = a.details;
    if (!l || this.state === C.WAITING_LEVEL || this.waitForLive(a)) {
      this.level = n, this.state = C.WAITING_LEVEL, this.startFragRequested = !1;
      return;
    }
    const h = o.len, c = this.getMaxBufferLength(a.maxBitrate);
    if (h >= c)
      return;
    this.backtrackFragment && this.backtrackFragment.start > o.end && (this.backtrackFragment = null);
    const d = this.backtrackFragment ? this.backtrackFragment.start : o.end;
    let g = this.getNextFragment(d, l);
    if (this.couldBacktrack && !this.fragPrevious && g && ge(g) && this.fragmentTracker.getState(g) !== pe.OK) {
      var f;
      const p = ((f = this.backtrackFragment) != null ? f : g).sn - l.startSN, y = l.fragments[p - 1];
      y && g.cc === y.cc && (g = y, this.fragmentTracker.removeFragment(y));
    } else this.backtrackFragment && o.len && (this.backtrackFragment = null);
    if (g && this.isLoopLoading(g, d)) {
      if (!g.gap) {
        const p = this.audioOnly && !this.altAudio ? oe.AUDIO : oe.VIDEO, y = (p === oe.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
        y && this.afterBufferFlushed(y, p, B.MAIN);
      }
      g = this.getNextFragmentLoopLoading(g, l, o, B.MAIN, c);
    }
    g && (this.exceedsMaxBuffer(o, c, g) || (g.initSegment && !g.initSegment.data && !this.bitrateTest && (g = g.initSegment), this.loadFragment(g, a, d)));
  }
  loadFragment(e, t, s) {
    const r = this.fragmentTracker.getState(e);
    r === pe.NOT_LOADED || r === pe.PARTIAL ? ge(e) ? this.bitrateTest ? (this.log(`Fragment ${e.sn} of level ${e.level} is being downloaded to test bitrate and will not be buffered`), this._loadBitrateTestFrag(e, t)) : super.loadFragment(e, t, s) : this._loadInitSegment(e, t) : this.clearTrackerIfNeeded(e);
  }
  getBufferedFrag(e) {
    return this.fragmentTracker.getBufferedFrag(e, B.MAIN);
  }
  followingBufferedFrag(e) {
    return e ? this.getBufferedFrag(e.end + 0.5) : null;
  }
  /*
    on immediate level switch :
     - pause playback if playing
     - cancel any pending load request
     - and trigger a buffer flush
  */
  immediateLevelSwitch() {
    if (this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY), this.altAudio !== 0) {
      var e;
      (((e = this.getLevelDetails()) == null ? void 0 : e.fragmentStart) || 0) > this.lastCurrentTime && super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio");
    }
  }
  /**
   * try to switch ASAP without breaking video playback:
   * in order to ensure smooth but quick level switching,
   * we need to find the next flushable buffer range
   * we should take into account new segment fetch time
   */
  nextLevelSwitch() {
    const {
      levels: e,
      media: t
    } = this;
    if (t != null && t.readyState) {
      let s;
      const r = this.getAppendedFrag(t.currentTime);
      r && r.start > 1 && this.flushMainBuffer(0, r.start - 1);
      const n = this.getLevelDetails();
      if (n != null && n.live) {
        const o = this.getMainFwdBufferInfo();
        if (!o || o.len < n.targetduration * 2)
          return;
      }
      if (!t.paused && e) {
        const o = this.hls.nextLoadLevel, u = e[o], l = this.fragLastKbps;
        l && this.fragCurrent ? s = this.fragCurrent.duration * u.maxBitrate / (1e3 * l) + 1 : s = 0;
      } else
        s = 0;
      const a = this.getBufferedFrag(t.currentTime + s);
      if (a) {
        const o = this.followingBufferedFrag(a);
        if (o) {
          this.abortCurrentFrag();
          const u = o.maxStartPTS ? o.maxStartPTS : o.start, l = o.duration, h = Math.max(a.end, u + Math.min(Math.max(l - this.config.maxFragLookUpTolerance, l * (this.couldBacktrack ? 0.5 : 0.125)), l * (this.couldBacktrack ? 0.75 : 0.25)));
          this.flushMainBuffer(h, Number.POSITIVE_INFINITY);
        }
      }
    }
  }
  abortCurrentFrag() {
    const e = this.fragCurrent;
    switch (this.fragCurrent = null, this.backtrackFragment = null, e && (e.abortRequests(), this.fragmentTracker.removeFragment(e)), this.state) {
      case C.KEY_LOADING:
      case C.FRAG_LOADING:
      case C.FRAG_LOADING_WAITING_RETRY:
      case C.PARSING:
      case C.PARSED:
        this.state = C.IDLE;
        break;
    }
    this.nextLoadPosition = this.getLoadPosition();
  }
  flushMainBuffer(e, t) {
    super.flushMainBuffer(e, t, this.altAudio === 2 ? "video" : null);
  }
  onMediaAttached(e, t) {
    super.onMediaAttached(e, t);
    const s = t.media;
    be(s, "playing", this.onMediaPlaying), be(s, "seeked", this.onMediaSeeked);
  }
  onMediaDetaching(e, t) {
    const {
      media: s
    } = this;
    s && (Re(s, "playing", this.onMediaPlaying), Re(s, "seeked", this.onMediaSeeked)), this.videoBuffer = null, this.fragPlaying = null, super.onMediaDetaching(e, t), !t.transferMedia && (this._hasEnoughToStart = !1);
  }
  onManifestLoading() {
    super.onManifestLoading(), this.log("Trigger BUFFER_RESET"), this.hls.trigger(E.BUFFER_RESET, void 0), this.couldBacktrack = !1, this.fragLastKbps = 0, this.fragPlaying = this.backtrackFragment = null, this.altAudio = 0, this.audioOnly = !1;
  }
  onManifestParsed(e, t) {
    let s = !1, r = !1;
    for (let n = 0; n < t.levels.length; n++) {
      const a = t.levels[n].audioCodec;
      a && (s = s || a.indexOf("mp4a.40.2") !== -1, r = r || a.indexOf("mp4a.40.5") !== -1);
    }
    this.audioCodecSwitch = s && r && !Gp(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = t.levels, this.startFragRequested = !1;
  }
  onLevelLoading(e, t) {
    const {
      levels: s
    } = this;
    if (!s || this.state !== C.IDLE)
      return;
    const r = t.levelInfo;
    (!r.details || r.details.live && (this.levelLastLoaded !== r || r.details.expired) || this.waitForCdnTuneIn(r.details)) && (this.state = C.WAITING_LEVEL);
  }
  onLevelLoaded(e, t) {
    var s;
    const {
      levels: r,
      startFragRequested: n
    } = this, a = t.level, o = t.details, u = o.totalduration;
    if (!r) {
      this.warn(`Levels were reset while loading level ${a}`);
      return;
    }
    this.log(`Level ${a} loaded [${o.startSN},${o.endSN}]${o.lastPartSn ? `[part-${o.lastPartSn}-${o.lastPartIndex}]` : ""}, cc [${o.startCC}, ${o.endCC}] duration:${u}`);
    const l = t.levelInfo, h = this.fragCurrent;
    h && (this.state === C.FRAG_LOADING || this.state === C.FRAG_LOADING_WAITING_RETRY) && h.level !== t.level && h.loader && this.abortCurrentFrag();
    let c = 0;
    if (o.live || (s = l.details) != null && s.live) {
      var d;
      if (this.checkLiveUpdate(o), o.deltaUpdateFailed)
        return;
      c = this.alignPlaylists(o, l.details, (d = this.levelLastLoaded) == null ? void 0 : d.details);
    }
    if (l.details = o, this.levelLastLoaded = l, n || this.setStartPosition(o, c), this.hls.trigger(E.LEVEL_UPDATED, {
      details: o,
      level: a
    }), this.state === C.WAITING_LEVEL) {
      if (this.waitForCdnTuneIn(o))
        return;
      this.state = C.IDLE;
    }
    n && o.live && this.synchronizeToLiveEdge(o), this.tick();
  }
  synchronizeToLiveEdge(e) {
    const {
      config: t,
      media: s
    } = this;
    if (!s)
      return;
    const r = this.hls.liveSyncPosition, n = this.getLoadPosition(), a = e.fragmentStart, o = e.edge, u = n >= a - t.maxFragLookUpTolerance && n <= o;
    if (r !== null && s.duration > r && (n < r || !u)) {
      const h = t.liveMaxLatencyDuration !== void 0 ? t.liveMaxLatencyDuration : t.liveMaxLatencyDurationCount * e.targetduration;
      if ((!u && s.readyState < 4 || n < o - h) && (this._hasEnoughToStart || (this.nextLoadPosition = r), s.readyState))
        if (this.warn(`Playback: ${n.toFixed(3)} is located too far from the end of live sliding playlist: ${o}, reset currentTime to : ${r.toFixed(3)}`), this.config.liveSyncMode === "buffered") {
          var l;
          const c = j.bufferInfo(s, r, 0);
          if (!((l = c.buffered) != null && l.length)) {
            s.currentTime = r;
            return;
          }
          if (c.start <= n) {
            s.currentTime = r;
            return;
          }
          const {
            nextStart: g
          } = j.bufferedInfo(c.buffered, n, 0);
          g && (s.currentTime = g);
        } else
          s.currentTime = r;
    }
  }
  _handleFragmentLoadProgress(e) {
    var t;
    const s = e.frag, {
      part: r,
      payload: n
    } = e, {
      levels: a
    } = this;
    if (!a) {
      this.warn(`Levels were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
      return;
    }
    const o = a[s.level];
    if (!o) {
      this.warn(`Level ${s.level} not found on progress`);
      return;
    }
    const u = o.details;
    if (!u) {
      this.warn(`Dropping fragment ${s.sn} of level ${s.level} after level details were reset`), this.fragmentTracker.removeFragment(s);
      return;
    }
    const l = o.videoCodec, h = u.PTSKnown || !u.live, c = (t = s.initSegment) == null ? void 0 : t.data, d = this._getAudioCodec(o), g = this.transmuxer = this.transmuxer || new lu(this.hls, B.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)), f = r ? r.index : -1, m = f !== -1, p = new rn(s.level, s.sn, s.stats.chunkCount, n.byteLength, f, m), y = this.initPTS[s.cc];
    g.push(n, c, d, l, s, r, u.totalduration, h, p, y);
  }
  onAudioTrackSwitching(e, t) {
    const s = this.hls, r = this.altAudio !== 0;
    if (ti(t.url, s))
      this.altAudio = 1;
    else {
      if (this.mediaBuffer !== this.media) {
        this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
        const a = this.fragCurrent;
        a && (this.log("Switching to main audio track, cancel main fragment load"), a.abortRequests(), this.fragmentTracker.removeFragment(a)), this.resetTransmuxer(), this.resetLoadingState();
      } else this.audioOnly && this.resetTransmuxer();
      if (r) {
        this.altAudio = 0, this.fragmentTracker.removeAllFragments(), s.once(E.BUFFER_FLUSHED, () => {
          this.hls && this.hls.trigger(E.AUDIO_TRACK_SWITCHED, t);
        }), s.trigger(E.BUFFER_FLUSHING, {
          startOffset: 0,
          endOffset: Number.POSITIVE_INFINITY,
          type: null
        });
        return;
      }
      s.trigger(E.AUDIO_TRACK_SWITCHED, t);
    }
  }
  onAudioTrackSwitched(e, t) {
    const s = ti(t.url, this.hls);
    if (s) {
      const r = this.videoBuffer;
      r && this.mediaBuffer !== r && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = r);
    }
    this.altAudio = s ? 2 : 0, this.tick();
  }
  onBufferCreated(e, t) {
    const s = t.tracks;
    let r, n, a = !1;
    for (const o in s) {
      const u = s[o];
      if (u.id === "main") {
        if (n = o, r = u, o === "video") {
          const l = s[o];
          l && (this.videoBuffer = l.buffer);
        }
      } else
        a = !0;
    }
    a && r ? (this.log(`Alternate track found, use ${n}.buffered to schedule main fragment loading`), this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media;
  }
  onFragBuffered(e, t) {
    const {
      frag: s,
      part: r
    } = t, n = s.type === B.MAIN;
    if (n) {
      if (this.fragContextChanged(s)) {
        this.warn(`Fragment ${s.sn}${r ? " p: " + r.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}`), this.state === C.PARSED && (this.state = C.IDLE);
        return;
      }
      const o = r ? r.stats : s.stats;
      this.fragLastKbps = Math.round(8 * o.total / (o.buffering.end - o.loading.first)), ge(s) && (this.fragPrevious = s), this.fragBufferedComplete(s, r);
    }
    const a = this.media;
    a && (!this._hasEnoughToStart && j.getBuffered(a).length && (this._hasEnoughToStart = !0, this.seekToStartPos()), n && this.tick());
  }
  get hasEnoughToStart() {
    return this._hasEnoughToStart;
  }
  onError(e, t) {
    var s;
    if (t.fatal) {
      this.state = C.ERROR;
      return;
    }
    switch (t.details) {
      case D.FRAG_GAP:
      case D.FRAG_PARSING_ERROR:
      case D.FRAG_DECRYPT_ERROR:
      case D.FRAG_LOAD_ERROR:
      case D.FRAG_LOAD_TIMEOUT:
      case D.KEY_LOAD_ERROR:
      case D.KEY_LOAD_TIMEOUT:
        this.onFragmentOrKeyLoadError(B.MAIN, t);
        break;
      case D.LEVEL_LOAD_ERROR:
      case D.LEVEL_LOAD_TIMEOUT:
      case D.LEVEL_PARSING_ERROR:
        !t.levelRetry && this.state === C.WAITING_LEVEL && ((s = t.context) == null ? void 0 : s.type) === Q.LEVEL && (this.state = C.IDLE);
        break;
      case D.BUFFER_ADD_CODEC_ERROR:
      case D.BUFFER_APPEND_ERROR:
        if (t.parent !== "main")
          return;
        this.reduceLengthAndFlushBuffer(t) && this.resetLoadingState();
        break;
      case D.BUFFER_FULL_ERROR:
        if (t.parent !== "main")
          return;
        this.reduceLengthAndFlushBuffer(t) && (!this.config.interstitialsController && this.config.assetPlayerId ? this._hasEnoughToStart = !0 : this.flushMainBuffer(0, Number.POSITIVE_INFINITY));
        break;
      case D.INTERNAL_EXCEPTION:
        this.recoverWorkerError(t);
        break;
    }
  }
  onFragLoadEmergencyAborted() {
    this.state = C.IDLE, this._hasEnoughToStart || (this.startFragRequested = !1, this.nextLoadPosition = this.lastCurrentTime), this.tickImmediate();
  }
  onBufferFlushed(e, {
    type: t
  }) {
    if (t !== oe.AUDIO || !this.altAudio) {
      const s = (t === oe.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
      s && (this.afterBufferFlushed(s, t, B.MAIN), this.tick());
    }
  }
  onLevelsUpdated(e, t) {
    this.level > -1 && this.fragCurrent && (this.level = this.fragCurrent.level, this.level === -1 && this.resetWhenMissingContext(this.fragCurrent)), this.levels = t.levels;
  }
  swapAudioCodec() {
    this.audioCodecSwap = !this.audioCodecSwap;
  }
  /**
   * Seeks to the set startPosition if not equal to the mediaElement's current time.
   */
  seekToStartPos() {
    const {
      media: e
    } = this;
    if (!e)
      return;
    const t = e.currentTime;
    let s = this.startPosition;
    if (s >= 0 && t < s) {
      if (e.seeking) {
        this.log(`could not seek to ${s}, already seeking at ${t}`);
        return;
      }
      const r = this.timelineOffset;
      r && s && (s += r);
      const n = this.getLevelDetails(), a = j.getBuffered(e), o = a.length ? a.start(0) : 0, u = o - s, l = Math.max(this.config.maxBufferHole, this.config.maxFragLookUpTolerance);
      (this.config.startOnSegmentBoundary || u > 0 && (u < l || this.loadingParts && u < 2 * (n?.partTarget || 0))) && (this.log(`adjusting start position by ${u} to match buffer start`), s += u, this.startPosition = s), t < s && (this.log(`seek to target start position ${s} from current time ${t} buffer start ${o}`), e.currentTime = s);
    }
  }
  _getAudioCodec(e) {
    let t = this.config.defaultAudioCodec || e.audioCodec;
    return this.audioCodecSwap && t && (this.log("Swapping audio codec"), t.indexOf("mp4a.40.5") !== -1 ? t = "mp4a.40.2" : t = "mp4a.40.5"), t;
  }
  _loadBitrateTestFrag(e, t) {
    e.bitrateTest = !0, this._doFragLoad(e, t).then((s) => {
      const {
        hls: r
      } = this, n = s?.frag;
      if (!n || this.fragContextChanged(n))
        return;
      t.fragmentError = 0, this.state = C.IDLE, this.startFragRequested = !1, this.bitrateTest = !1;
      const a = n.stats;
      a.parsing.start = a.parsing.end = a.buffering.start = a.buffering.end = self.performance.now(), r.trigger(E.FRAG_LOADED, s), n.bitrateTest = !1;
    }).catch((s) => {
      this.state === C.STOPPED || this.state === C.ERROR || (this.warn(s), this.resetFragmentLoading(e));
    });
  }
  _handleTransmuxComplete(e) {
    const t = this.playlistType, {
      hls: s
    } = this, {
      remuxResult: r,
      chunkMeta: n
    } = e, a = this.getCurrentContext(n);
    if (!a) {
      this.resetWhenMissingContext(n);
      return;
    }
    const {
      frag: o,
      part: u,
      level: l
    } = a, {
      video: h,
      text: c,
      id3: d,
      initSegment: g
    } = r, {
      details: f
    } = l, m = this.altAudio ? void 0 : r.audio;
    if (this.fragContextChanged(o)) {
      this.fragmentTracker.removeFragment(o);
      return;
    }
    if (this.state = C.PARSING, g) {
      const p = g.tracks;
      if (p) {
        const S = o.initSegment || o;
        if (this.unhandledEncryptionError(g, o))
          return;
        this._bufferInitSegment(l, p, S, n), s.trigger(E.FRAG_PARSING_INIT_SEGMENT, {
          frag: S,
          id: t,
          tracks: p
        });
      }
      const y = g.initPTS, v = g.timescale, T = this.initPTS[o.cc];
      if (F(y) && (!T || T.baseTime !== y || T.timescale !== v)) {
        const S = g.trackId;
        this.initPTS[o.cc] = {
          baseTime: y,
          timescale: v,
          trackId: S
        }, s.trigger(E.INIT_PTS_FOUND, {
          frag: o,
          id: t,
          initPTS: y,
          timescale: v,
          trackId: S
        });
      }
    }
    if (h && f) {
      m && h.type === "audiovideo" && this.logMuxedErr(o);
      const p = f.fragments[o.sn - 1 - f.startSN], y = o.sn === f.startSN, v = !p || o.cc > p.cc;
      if (r.independent !== !1) {
        const {
          startPTS: T,
          endPTS: S,
          startDTS: x,
          endDTS: L
        } = h;
        if (u)
          u.elementaryStreams[h.type] = {
            startPTS: T,
            endPTS: S,
            startDTS: x,
            endDTS: L
          };
        else if (h.firstKeyFrame && h.independent && n.id === 1 && !v && (this.couldBacktrack = !0), h.dropped && h.independent) {
          const A = this.getMainFwdBufferInfo(), I = (A ? A.end : this.getLoadPosition()) + this.config.maxBufferHole, _ = h.firstKeyFramePTS ? h.firstKeyFramePTS : T;
          if (!y && I < _ - this.config.maxBufferHole && !v) {
            this.backtrack(o);
            return;
          } else v && (o.gap = !0);
          o.setElementaryStreamInfo(h.type, o.start, S, o.start, L, !0);
        } else y && T - (f.appliedTimelineOffset || 0) > Ys && (o.gap = !0);
        o.setElementaryStreamInfo(h.type, T, S, x, L), this.backtrackFragment && (this.backtrackFragment = o), this.bufferFragmentData(h, o, u, n, y || v);
      } else if (y || v)
        o.gap = !0;
      else {
        this.backtrack(o);
        return;
      }
    }
    if (m) {
      const {
        startPTS: p,
        endPTS: y,
        startDTS: v,
        endDTS: T
      } = m;
      u && (u.elementaryStreams[oe.AUDIO] = {
        startPTS: p,
        endPTS: y,
        startDTS: v,
        endDTS: T
      }), o.setElementaryStreamInfo(oe.AUDIO, p, y, v, T), this.bufferFragmentData(m, o, u, n);
    }
    if (f && d != null && d.samples.length) {
      const p = {
        id: t,
        frag: o,
        details: f,
        samples: d.samples
      };
      s.trigger(E.FRAG_PARSING_METADATA, p);
    }
    if (f && c) {
      const p = {
        id: t,
        frag: o,
        details: f,
        samples: c.samples
      };
      s.trigger(E.FRAG_PARSING_USERDATA, p);
    }
  }
  logMuxedErr(e) {
    this.warn(`${ge(e) ? "Media" : "Init"} segment with muxed audiovideo where only video expected: ${e.url}`);
  }
  _bufferInitSegment(e, t, s, r) {
    if (this.state !== C.PARSING)
      return;
    this.audioOnly = !!t.audio && !t.video, this.altAudio && !this.audioOnly && (delete t.audio, t.audiovideo && this.logMuxedErr(s));
    const {
      audio: n,
      video: a,
      audiovideo: o
    } = t;
    if (n) {
      const l = e.audioCodec;
      let h = Us(n.codec, l);
      h === "mp4a" && (h = "mp4a.40.5");
      const c = navigator.userAgent.toLowerCase();
      if (this.audioCodecSwitch) {
        h && (h.indexOf("mp4a.40.5") !== -1 ? h = "mp4a.40.2" : h = "mp4a.40.5");
        const d = n.metadata;
        d && "channelCount" in d && (d.channelCount || 1) !== 1 && c.indexOf("firefox") === -1 && (h = "mp4a.40.5");
      }
      h && h.indexOf("mp4a.40.5") !== -1 && c.indexOf("android") !== -1 && n.container !== "audio/mpeg" && (h = "mp4a.40.2", this.log(`Android: force audio codec to ${h}`)), l && l !== h && this.log(`Swapping manifest audio codec "${l}" for "${h}"`), n.levelCodec = h, n.id = B.MAIN, this.log(`Init audio buffer, container:${n.container}, codecs[selected/level/parsed]=[${h || ""}/${l || ""}/${n.codec}]`), delete t.audiovideo;
    }
    if (a) {
      a.levelCodec = e.videoCodec, a.id = B.MAIN;
      const l = a.codec;
      if (l?.length === 4)
        switch (l) {
          case "hvc1":
          case "hev1":
            a.codec = "hvc1.1.6.L120.90";
            break;
          case "av01":
            a.codec = "av01.0.04M.08";
            break;
          case "avc1":
            a.codec = "avc1.42e01e";
            break;
        }
      this.log(`Init video buffer, container:${a.container}, codecs[level/parsed]=[${e.videoCodec || ""}/${l}]${a.codec !== l ? " parsed-corrected=" + a.codec : ""}${a.supplemental ? " supplemental=" + a.supplemental : ""}`), delete t.audiovideo;
    }
    o && (this.log(`Init audiovideo buffer, container:${o.container}, codecs[level/parsed]=[${e.codecs}/${o.codec}]`), delete t.video, delete t.audio);
    const u = Object.keys(t);
    if (u.length) {
      if (this.hls.trigger(E.BUFFER_CODECS, t), !this.hls)
        return;
      u.forEach((l) => {
        const c = t[l].initSegment;
        c != null && c.byteLength && this.hls.trigger(E.BUFFER_APPENDING, {
          type: l,
          data: c,
          frag: s,
          part: null,
          chunkMeta: r,
          parent: s.type
        });
      });
    }
    this.tickImmediate();
  }
  getMainFwdBufferInfo() {
    const e = this.mediaBuffer && this.altAudio === 2 ? this.mediaBuffer : this.media;
    return this.getFwdBufferInfo(e, B.MAIN);
  }
  get maxBufferLength() {
    const {
      levels: e,
      level: t
    } = this, s = e?.[t];
    return s ? this.getMaxBufferLength(s.maxBitrate) : this.config.maxBufferLength;
  }
  backtrack(e) {
    this.couldBacktrack = !0, this.backtrackFragment = e, this.resetTransmuxer(), this.flushBufferGap(e), this.fragmentTracker.removeFragment(e), this.fragPrevious = null, this.nextLoadPosition = e.start, this.state = C.IDLE;
  }
  checkFragmentChanged() {
    const e = this.media;
    let t = null;
    if (e && e.readyState > 1 && e.seeking === !1) {
      const s = e.currentTime;
      if (j.isBuffered(e, s) ? t = this.getAppendedFrag(s) : j.isBuffered(e, s + 0.1) && (t = this.getAppendedFrag(s + 0.1)), t) {
        this.backtrackFragment = null;
        const r = this.fragPlaying, n = t.level;
        (!r || t.sn !== r.sn || r.level !== n) && (this.fragPlaying = t, this.hls.trigger(E.FRAG_CHANGED, {
          frag: t
        }), (!r || r.level !== n) && this.hls.trigger(E.LEVEL_SWITCHED, {
          level: n
        }));
      }
    }
  }
  get nextLevel() {
    const e = this.nextBufferedFrag;
    return e ? e.level : -1;
  }
  get currentFrag() {
    var e;
    if (this.fragPlaying)
      return this.fragPlaying;
    const t = ((e = this.media) == null ? void 0 : e.currentTime) || this.lastCurrentTime;
    return F(t) ? this.getAppendedFrag(t) : null;
  }
  get currentProgramDateTime() {
    var e;
    const t = ((e = this.media) == null ? void 0 : e.currentTime) || this.lastCurrentTime;
    if (F(t)) {
      const s = this.getLevelDetails(), r = this.currentFrag || (s ? It(null, s.fragments, t) : null);
      if (r) {
        const n = r.programDateTime;
        if (n !== null) {
          const a = n + (t - r.start) * 1e3;
          return new Date(a);
        }
      }
    }
    return null;
  }
  get currentLevel() {
    const e = this.currentFrag;
    return e ? e.level : -1;
  }
  get nextBufferedFrag() {
    const e = this.currentFrag;
    return e ? this.followingBufferedFrag(e) : null;
  }
  get forceStartLoad() {
    return this._forceStartLoad;
  }
}
class Kp extends Be {
  constructor(e, t) {
    super("key-loader", t), this.config = void 0, this.keyIdToKeyInfo = {}, this.emeController = null, this.config = e;
  }
  abort(e) {
    for (const s in this.keyIdToKeyInfo) {
      const r = this.keyIdToKeyInfo[s].loader;
      if (r) {
        var t;
        if (e && e !== ((t = r.context) == null ? void 0 : t.frag.type))
          return;
        r.abort();
      }
    }
  }
  detach() {
    for (const e in this.keyIdToKeyInfo) {
      const t = this.keyIdToKeyInfo[e];
      (t.mediaKeySessionContext || t.decryptdata.isCommonEncryption) && delete this.keyIdToKeyInfo[e];
    }
  }
  destroy() {
    this.detach();
    for (const e in this.keyIdToKeyInfo) {
      const t = this.keyIdToKeyInfo[e].loader;
      t && t.destroy();
    }
    this.keyIdToKeyInfo = {};
  }
  createKeyLoadError(e, t = D.KEY_LOAD_ERROR, s, r, n) {
    return new et({
      type: V.NETWORK_ERROR,
      details: t,
      fatal: !1,
      frag: e,
      response: n,
      error: s,
      networkDetails: r
    });
  }
  loadClear(e, t, s) {
    if (this.emeController && this.config.emeEnabled && !this.emeController.getSelectedKeySystemFormats().length) {
      if (t.length)
        for (let r = 0, n = t.length; r < n; r++) {
          const a = t[r];
          if (e.cc <= a.cc && (!ge(e) || !ge(a) || e.sn < a.sn) || !s && r == n - 1)
            return this.emeController.selectKeySystemFormat(a).then((o) => {
              if (!this.emeController)
                return;
              a.setKeyFormat(o);
              const u = Gs(o);
              if (u)
                return this.emeController.getKeySystemAccess([u]);
            });
        }
      if (this.config.requireKeySystemAccessOnStart) {
        const r = ss(this.config);
        if (r.length)
          return this.emeController.getKeySystemAccess(r);
      }
    }
    return null;
  }
  load(e) {
    return !e.decryptdata && e.encrypted && this.emeController && this.config.emeEnabled ? this.emeController.selectKeySystemFormat(e).then((t) => this.loadInternal(e, t)) : this.loadInternal(e);
  }
  loadInternal(e, t) {
    var s, r;
    t && e.setKeyFormat(t);
    const n = e.decryptdata;
    if (!n) {
      const l = new Error(t ? `Expected frag.decryptdata to be defined after setting format ${t}` : `Missing decryption data on fragment in onKeyLoading (emeEnabled with controller: ${this.emeController && this.config.emeEnabled})`);
      return Promise.reject(this.createKeyLoadError(e, D.KEY_LOAD_ERROR, l));
    }
    const a = n.uri;
    if (!a)
      return Promise.reject(this.createKeyLoadError(e, D.KEY_LOAD_ERROR, new Error(`Invalid key URI: "${a}"`)));
    const o = tr(n);
    let u = this.keyIdToKeyInfo[o];
    if ((s = u) != null && s.decryptdata.key)
      return n.key = u.decryptdata.key, Promise.resolve({
        frag: e,
        keyInfo: u
      });
    if (this.emeController && (r = u) != null && r.keyLoadPromise)
      switch (this.emeController.getKeyStatus(u.decryptdata)) {
        case "usable":
        case "usable-in-future":
          return u.keyLoadPromise.then((h) => {
            const {
              keyInfo: c
            } = h;
            return n.key = c.decryptdata.key, {
              frag: e,
              keyInfo: c
            };
          });
      }
    switch (this.log(`${this.keyIdToKeyInfo[o] ? "Rel" : "L"}oading${n.keyId ? " keyId: " + Te(n.keyId) : ""} URI: ${n.uri} from ${e.type} ${e.level}`), u = this.keyIdToKeyInfo[o] = {
      decryptdata: n,
      keyLoadPromise: null,
      loader: null,
      mediaKeySessionContext: null
    }, n.method) {
      case "SAMPLE-AES":
      case "SAMPLE-AES-CENC":
      case "SAMPLE-AES-CTR":
        return n.keyFormat === "identity" ? this.loadKeyHTTP(u, e) : this.loadKeyEME(u, e);
      case "AES-128":
      case "AES-256":
      case "AES-256-CTR":
        return this.loadKeyHTTP(u, e);
      default:
        return Promise.reject(this.createKeyLoadError(e, D.KEY_LOAD_ERROR, new Error(`Key supplied with unsupported METHOD: "${n.method}"`)));
    }
  }
  loadKeyEME(e, t) {
    const s = {
      frag: t,
      keyInfo: e
    };
    if (this.emeController && this.config.emeEnabled) {
      var r;
      if (!e.decryptdata.keyId && (r = t.initSegment) != null && r.data) {
        const a = uf(t.initSegment.data);
        if (a.length) {
          let o = a[0];
          o.some((u) => u !== 0) ? (this.log(`Using keyId found in init segment ${Te(o)}`), ht.setKeyIdForUri(e.decryptdata.uri, o)) : (o = ht.addKeyIdForUri(e.decryptdata.uri), this.log(`Generating keyId to patch media ${Te(o)}`)), e.decryptdata.keyId = o;
        }
      }
      if (!e.decryptdata.keyId && !ge(t))
        return Promise.resolve(s);
      const n = this.emeController.loadKey(s);
      return (e.keyLoadPromise = n.then((a) => (e.mediaKeySessionContext = a, s))).catch((a) => {
        throw e.keyLoadPromise = null, "data" in a && (a.data.frag = t), a;
      });
    }
    return Promise.resolve(s);
  }
  loadKeyHTTP(e, t) {
    const s = this.config, r = s.loader, n = new r(s);
    return t.keyLoader = e.loader = n, e.keyLoadPromise = new Promise((a, o) => {
      const u = {
        keyInfo: e,
        frag: t,
        responseType: "arraybuffer",
        url: e.decryptdata.uri
      }, l = s.keyLoadPolicy.default, h = {
        loadPolicy: l,
        timeout: l.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0
      }, c = {
        onSuccess: (d, g, f, m) => {
          const {
            frag: p,
            keyInfo: y
          } = f, v = tr(y.decryptdata);
          if (!p.decryptdata || y !== this.keyIdToKeyInfo[v])
            return o(this.createKeyLoadError(p, D.KEY_LOAD_ERROR, new Error("after key load, decryptdata unset or changed"), m));
          y.decryptdata.key = p.decryptdata.key = new Uint8Array(d.data), p.keyLoader = null, y.loader = null, a({
            frag: p,
            keyInfo: y
          });
        },
        onError: (d, g, f, m) => {
          this.resetLoader(g), o(this.createKeyLoadError(t, D.KEY_LOAD_ERROR, new Error(`HTTP Error ${d.code} loading key ${d.text}`), f, re({
            url: u.url,
            data: void 0
          }, d)));
        },
        onTimeout: (d, g, f) => {
          this.resetLoader(g), o(this.createKeyLoadError(t, D.KEY_LOAD_TIMEOUT, new Error("key loading timed out"), f));
        },
        onAbort: (d, g, f) => {
          this.resetLoader(g), o(this.createKeyLoadError(t, D.INTERNAL_ABORTED, new Error("key loading aborted"), f));
        }
      };
      n.load(u, h, c);
    });
  }
  resetLoader(e) {
    const {
      frag: t,
      keyInfo: s,
      url: r
    } = e, n = s.loader;
    t.keyLoader === n && (t.keyLoader = null, s.loader = null);
    const a = tr(s.decryptdata) || r;
    delete this.keyIdToKeyInfo[a], n && n.destroy();
  }
}
function tr(i) {
  if (i.keyFormat !== Se.FAIRPLAY) {
    const e = i.keyId;
    if (e)
      return Te(e);
  }
  return i.uri;
}
function Eo(i) {
  const {
    type: e
  } = i;
  switch (e) {
    case Q.AUDIO_TRACK:
      return B.AUDIO;
    case Q.SUBTITLE_TRACK:
      return B.SUBTITLE;
    default:
      return B.MAIN;
  }
}
function sr(i, e) {
  let t = i.url;
  return (t === void 0 || t.indexOf("data:") === 0) && (t = e.url), t;
}
class Wp {
  constructor(e) {
    this.hls = void 0, this.loaders = /* @__PURE__ */ Object.create(null), this.variableList = null, this.onManifestLoaded = this.checkAutostartLoad, this.hls = e, this.registerListeners();
  }
  startLoad(e) {
  }
  stopLoad() {
    this.destroyInternalLoaders();
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(E.MANIFEST_LOADING, this.onManifestLoading, this), e.on(E.LEVEL_LOADING, this.onLevelLoading, this), e.on(E.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), e.on(E.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this), e.on(E.LEVELS_UPDATED, this.onLevelsUpdated, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(E.MANIFEST_LOADING, this.onManifestLoading, this), e.off(E.LEVEL_LOADING, this.onLevelLoading, this), e.off(E.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), e.off(E.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this), e.off(E.LEVELS_UPDATED, this.onLevelsUpdated, this);
  }
  /**
   * Returns defaults or configured loader-type overloads (pLoader and loader config params)
   */
  createInternalLoader(e) {
    const t = this.hls.config, s = t.pLoader, r = t.loader, n = s || r, a = new n(t);
    return this.loaders[e.type] = a, a;
  }
  getInternalLoader(e) {
    return this.loaders[e.type];
  }
  resetInternalLoader(e) {
    this.loaders[e] && delete this.loaders[e];
  }
  /**
   * Call `destroy` on all internal loader instances mapped (one per context type)
   */
  destroyInternalLoaders() {
    for (const e in this.loaders) {
      const t = this.loaders[e];
      t && t.destroy(), this.resetInternalLoader(e);
    }
  }
  destroy() {
    this.variableList = null, this.unregisterListeners(), this.destroyInternalLoaders();
  }
  onManifestLoading(e, t) {
    const {
      url: s
    } = t;
    this.variableList = null, this.load({
      id: null,
      level: 0,
      responseType: "text",
      type: Q.MANIFEST,
      url: s,
      deliveryDirectives: null,
      levelOrTrack: null
    });
  }
  onLevelLoading(e, t) {
    const {
      id: s,
      level: r,
      pathwayId: n,
      url: a,
      deliveryDirectives: o,
      levelInfo: u
    } = t;
    this.load({
      id: s,
      level: r,
      pathwayId: n,
      responseType: "text",
      type: Q.LEVEL,
      url: a,
      deliveryDirectives: o,
      levelOrTrack: u
    });
  }
  onAudioTrackLoading(e, t) {
    const {
      id: s,
      groupId: r,
      url: n,
      deliveryDirectives: a,
      track: o
    } = t;
    this.load({
      id: s,
      groupId: r,
      level: null,
      responseType: "text",
      type: Q.AUDIO_TRACK,
      url: n,
      deliveryDirectives: a,
      levelOrTrack: o
    });
  }
  onSubtitleTrackLoading(e, t) {
    const {
      id: s,
      groupId: r,
      url: n,
      deliveryDirectives: a,
      track: o
    } = t;
    this.load({
      id: s,
      groupId: r,
      level: null,
      responseType: "text",
      type: Q.SUBTITLE_TRACK,
      url: n,
      deliveryDirectives: a,
      levelOrTrack: o
    });
  }
  onLevelsUpdated(e, t) {
    const s = this.loaders[Q.LEVEL];
    if (s) {
      const r = s.context;
      r && !t.levels.some((n) => n === r.levelOrTrack) && (s.abort(), delete this.loaders[Q.LEVEL]);
    }
  }
  load(e) {
    var t;
    const s = this.hls.config;
    let r = this.getInternalLoader(e);
    if (r) {
      const l = this.hls.logger, h = r.context;
      if (h && h.levelOrTrack === e.levelOrTrack && (h.url === e.url || h.deliveryDirectives && !e.deliveryDirectives)) {
        h.url === e.url ? l.log(`[playlist-loader]: ignore ${e.url} ongoing request`) : l.log(`[playlist-loader]: ignore ${e.url} in favor of ${h.url}`);
        return;
      }
      l.log(`[playlist-loader]: aborting previous loader for type: ${e.type}`), r.abort();
    }
    let n;
    if (e.type === Q.MANIFEST ? n = s.manifestLoadPolicy.default : n = ae({}, s.playlistLoadPolicy.default, {
      timeoutRetry: null,
      errorRetry: null
    }), r = this.createInternalLoader(e), F((t = e.deliveryDirectives) == null ? void 0 : t.part)) {
      let l;
      if (e.type === Q.LEVEL && e.level !== null ? l = this.hls.levels[e.level].details : e.type === Q.AUDIO_TRACK && e.id !== null ? l = this.hls.audioTracks[e.id].details : e.type === Q.SUBTITLE_TRACK && e.id !== null && (l = this.hls.subtitleTracks[e.id].details), l) {
        const h = l.partTarget, c = l.targetduration;
        if (h && c) {
          const d = Math.max(h * 3, c * 0.8) * 1e3;
          n = ae({}, n, {
            maxTimeToFirstByteMs: Math.min(d, n.maxTimeToFirstByteMs),
            maxLoadTimeMs: Math.min(d, n.maxTimeToFirstByteMs)
          });
        }
      }
    }
    const a = n.errorRetry || n.timeoutRetry || {}, o = {
      loadPolicy: n,
      timeout: n.maxLoadTimeMs,
      maxRetry: a.maxNumRetry || 0,
      retryDelay: a.retryDelayMs || 0,
      maxRetryDelay: a.maxRetryDelayMs || 0
    }, u = {
      onSuccess: (l, h, c, d) => {
        const g = this.getInternalLoader(c);
        this.resetInternalLoader(c.type);
        const f = l.data;
        h.parsing.start = performance.now(), Xe.isMediaPlaylist(f) || c.type !== Q.MANIFEST ? this.handleTrackOrLevelPlaylist(l, h, c, d || null, g) : this.handleMasterPlaylist(l, h, c, d);
      },
      onError: (l, h, c, d) => {
        this.handleNetworkError(h, c, !1, l, d);
      },
      onTimeout: (l, h, c) => {
        this.handleNetworkError(h, c, !0, void 0, l);
      }
    };
    r.load(e, o, u);
  }
  checkAutostartLoad() {
    if (!this.hls)
      return;
    const {
      config: {
        autoStartLoad: e,
        startPosition: t
      },
      forceStartLoad: s
    } = this.hls;
    (e || s) && (this.hls.logger.log(`${e ? "auto" : "force"} startLoad with configured startPosition ${t}`), this.hls.startLoad(t));
  }
  handleMasterPlaylist(e, t, s, r) {
    const n = this.hls, a = e.data, o = sr(e, s), u = Xe.parseMasterPlaylist(a, o);
    if (u.playlistParsingError) {
      t.parsing.end = performance.now(), this.handleManifestParsingError(e, s, u.playlistParsingError, r, t);
      return;
    }
    const {
      contentSteering: l,
      levels: h,
      sessionData: c,
      sessionKeys: d,
      startTimeOffset: g,
      variableList: f
    } = u;
    this.variableList = f, h.forEach((v) => {
      const {
        unknownCodecs: T
      } = v;
      if (T) {
        const {
          preferManagedMediaSource: S
        } = this.hls.config;
        let {
          audioCodec: x,
          videoCodec: L
        } = v;
        for (let A = T.length; A--; ) {
          const I = T[A];
          os(I, "audio", S) ? (v.audioCodec = x = x ? `${x},${I}` : I, Wt.audio[x.substring(0, 4)] = 2, T.splice(A, 1)) : os(I, "video", S) && (v.videoCodec = L = L ? `${L},${I}` : I, Wt.video[L.substring(0, 4)] = 2, T.splice(A, 1));
        }
      }
    });
    const {
      AUDIO: m = [],
      SUBTITLES: p,
      "CLOSED-CAPTIONS": y
    } = Xe.parseMasterPlaylistMedia(a, o, u);
    m.length && !m.some((T) => !T.url) && h[0].audioCodec && !h[0].attrs.AUDIO && (this.hls.logger.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), m.unshift({
      type: "main",
      name: "main",
      groupId: "main",
      default: !1,
      autoselect: !1,
      forced: !1,
      id: -1,
      attrs: new ce({}),
      bitrate: 0,
      url: ""
    })), n.trigger(E.MANIFEST_LOADED, {
      levels: h,
      audioTracks: m,
      subtitles: p,
      captions: y,
      contentSteering: l,
      url: o,
      stats: t,
      networkDetails: r,
      sessionData: c,
      sessionKeys: d,
      startTimeOffset: g,
      variableList: f
    });
  }
  handleTrackOrLevelPlaylist(e, t, s, r, n) {
    const a = this.hls, {
      id: o,
      level: u,
      type: l
    } = s, h = sr(e, s), c = F(u) ? u : F(o) ? o : 0, d = Eo(s), g = Xe.parseLevelPlaylist(e.data, h, c, d, 0, this.variableList);
    if (l === Q.MANIFEST) {
      const f = {
        attrs: new ce({}),
        bitrate: 0,
        details: g,
        name: "",
        url: h
      };
      g.requestScheduled = t.loading.start + Nl(g, 0), a.trigger(E.MANIFEST_LOADED, {
        levels: [f],
        audioTracks: [],
        url: h,
        stats: t,
        networkDetails: r,
        sessionData: null,
        sessionKeys: null,
        contentSteering: null,
        startTimeOffset: null,
        variableList: null
      });
    }
    t.parsing.end = performance.now(), s.levelDetails = g, this.handlePlaylistLoaded(g, e, t, s, r, n);
  }
  handleManifestParsingError(e, t, s, r, n) {
    this.hls.trigger(E.ERROR, {
      type: V.NETWORK_ERROR,
      details: D.MANIFEST_PARSING_ERROR,
      fatal: t.type === Q.MANIFEST,
      url: e.url,
      err: s,
      error: s,
      reason: s.message,
      response: e,
      context: t,
      networkDetails: r,
      stats: n
    });
  }
  handleNetworkError(e, t, s = !1, r, n) {
    let a = `A network ${s ? "timeout" : "error" + (r ? " (status " + r.code + ")" : "")} occurred while loading ${e.type}`;
    e.type === Q.LEVEL ? a += `: ${e.level} id: ${e.id}` : (e.type === Q.AUDIO_TRACK || e.type === Q.SUBTITLE_TRACK) && (a += ` id: ${e.id} group-id: "${e.groupId}"`);
    const o = new Error(a);
    this.hls.logger.warn(`[playlist-loader]: ${a}`);
    let u = D.UNKNOWN, l = !1;
    const h = this.getInternalLoader(e);
    switch (e.type) {
      case Q.MANIFEST:
        u = s ? D.MANIFEST_LOAD_TIMEOUT : D.MANIFEST_LOAD_ERROR, l = !0;
        break;
      case Q.LEVEL:
        u = s ? D.LEVEL_LOAD_TIMEOUT : D.LEVEL_LOAD_ERROR, l = !1;
        break;
      case Q.AUDIO_TRACK:
        u = s ? D.AUDIO_TRACK_LOAD_TIMEOUT : D.AUDIO_TRACK_LOAD_ERROR, l = !1;
        break;
      case Q.SUBTITLE_TRACK:
        u = s ? D.SUBTITLE_TRACK_LOAD_TIMEOUT : D.SUBTITLE_LOAD_ERROR, l = !1;
        break;
    }
    h && this.resetInternalLoader(e.type);
    const c = {
      type: V.NETWORK_ERROR,
      details: u,
      fatal: l,
      url: e.url,
      loader: h,
      context: e,
      error: o,
      networkDetails: t,
      stats: n
    };
    if (r) {
      const d = t?.url || e.url;
      c.response = re({
        url: d,
        data: void 0
      }, r);
    }
    this.hls.trigger(E.ERROR, c);
  }
  handlePlaylistLoaded(e, t, s, r, n, a) {
    const o = this.hls, {
      type: u,
      level: l,
      levelOrTrack: h,
      id: c,
      groupId: d,
      deliveryDirectives: g
    } = r, f = sr(t, r), m = Eo(r);
    let p = typeof r.level == "number" && m === B.MAIN ? l : void 0;
    const y = e.playlistParsingError;
    if (y) {
      if (this.hls.logger.warn(`${y} ${e.url}`), !o.config.ignorePlaylistParsingErrors) {
        o.trigger(E.ERROR, {
          type: V.NETWORK_ERROR,
          details: D.LEVEL_PARSING_ERROR,
          fatal: !1,
          url: f,
          error: y,
          reason: y.message,
          response: t,
          context: r,
          level: p,
          parent: m,
          networkDetails: n,
          stats: s
        });
        return;
      }
      e.playlistParsingError = null;
    }
    if (!e.fragments.length) {
      const v = e.playlistParsingError = new Error("No Segments found in Playlist");
      o.trigger(E.ERROR, {
        type: V.NETWORK_ERROR,
        details: D.LEVEL_EMPTY_ERROR,
        fatal: !1,
        url: f,
        error: v,
        reason: v.message,
        response: t,
        context: r,
        level: p,
        parent: m,
        networkDetails: n,
        stats: s
      });
      return;
    }
    switch (e.live && a && (a.getCacheAge && (e.ageHeader = a.getCacheAge() || 0), (!a.getCacheAge || isNaN(e.ageHeader)) && (e.ageHeader = 0)), u) {
      case Q.MANIFEST:
      case Q.LEVEL:
        if (p) {
          if (!h)
            p = 0;
          else if (h !== o.levels[p]) {
            const v = o.levels.indexOf(h);
            v > -1 && (p = v);
          }
        }
        o.trigger(E.LEVEL_LOADED, {
          details: e,
          levelInfo: h || o.levels[0],
          level: p || 0,
          id: c || 0,
          stats: s,
          networkDetails: n,
          deliveryDirectives: g,
          withoutMultiVariant: u === Q.MANIFEST
        });
        break;
      case Q.AUDIO_TRACK:
        o.trigger(E.AUDIO_TRACK_LOADED, {
          details: e,
          track: h,
          id: c || 0,
          groupId: d || "",
          stats: s,
          networkDetails: n,
          deliveryDirectives: g
        });
        break;
      case Q.SUBTITLE_TRACK:
        o.trigger(E.SUBTITLE_TRACK_LOADED, {
          details: e,
          track: h,
          id: c || 0,
          groupId: d || "",
          stats: s,
          networkDetails: n,
          deliveryDirectives: g
        });
        break;
    }
  }
}
class we {
  /**
   * Get the video-dev/hls.js package version.
   */
  static get version() {
    return hs;
  }
  /**
   * Check if the required MediaSource Extensions are available.
   */
  static isMSESupported() {
    return Fu();
  }
  /**
   * Check if MediaSource Extensions are available and isTypeSupported checks pass for any baseline codecs.
   */
  static isSupported() {
    return $p();
  }
  /**
   * Get the MediaSource global used for MSE playback (ManagedMediaSource, MediaSource, or WebKitMediaSource).
   */
  static getMediaSource() {
    return ct();
  }
  static get Events() {
    return E;
  }
  static get MetadataSchema() {
    return ke;
  }
  static get ErrorTypes() {
    return V;
  }
  static get ErrorDetails() {
    return D;
  }
  /**
   * Get the default configuration applied to new instances.
   */
  static get DefaultConfig() {
    return we.defaultConfig ? we.defaultConfig : _p;
  }
  /**
   * Replace the default configuration applied to new instances.
   */
  static set DefaultConfig(e) {
    we.defaultConfig = e;
  }
  /**
   * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
   * @param userConfig - Configuration options applied over `Hls.DefaultConfig`
   */
  constructor(e = {}) {
    this.config = void 0, this.userConfig = void 0, this.logger = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this._emitter = new ln(), this._autoLevelCapping = -1, this._maxHdcpLevel = null, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioStreamController = void 0, this.subtititleStreamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.interstitialsController = void 0, this.gapController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this._url = null, this._sessionId = void 0, this.triggeringException = void 0, this.started = !1;
    const t = this.logger = zd(e.debug || !1, "Hls instance", e.assetPlayerId), s = this.config = Cp(we.DefaultConfig, e, t);
    this.userConfig = e, s.progressive && Pp(s, t);
    const {
      abrController: r,
      bufferController: n,
      capLevelController: a,
      errorController: o,
      fpsController: u
    } = s, l = new o(this), h = this.abrController = new r(this), c = new Yf(this), d = s.interstitialsController, g = d ? this.interstitialsController = new d(this, we) : null, f = this.bufferController = new n(this, c), m = this.capLevelController = new a(this), p = new u(this), y = new Wp(this), v = s.contentSteeringController, T = v ? new v(this) : null, S = this.levelController = new Up(this, T), x = new Np(this), L = new Kp(this.config, this.logger), A = this.streamController = new Vp(this, c, L), I = this.gapController = new Mp(this, c);
    m.setStreamController(A), p.setStreamController(A);
    const _ = [y, S, A];
    g && _.splice(1, 0, g), T && _.splice(1, 0, T), this.networkControllers = _;
    const b = [h, f, I, m, p, x, c];
    this.audioTrackController = this.createController(s.audioTrackController, _);
    const P = s.audioStreamController;
    P && _.push(this.audioStreamController = new P(this, c, L)), this.subtitleTrackController = this.createController(s.subtitleTrackController, _);
    const M = s.subtitleStreamController;
    M && _.push(this.subtititleStreamController = new M(this, c, L)), this.createController(s.timelineController, b), L.emeController = this.emeController = this.createController(s.emeController, b), this.cmcdController = this.createController(s.cmcdController, b), this.latencyController = this.createController(Bp, b), this.coreComponents = b, _.push(l);
    const U = l.onErrorOut;
    typeof U == "function" && this.on(E.ERROR, U, l), this.on(E.MANIFEST_LOADED, y.onManifestLoaded, y);
  }
  createController(e, t) {
    if (e) {
      const s = new e(this);
      return t && t.push(s), s;
    }
    return null;
  }
  // Delegate the EventEmitter through the public API of Hls.js
  on(e, t, s = this) {
    this._emitter.on(e, t, s);
  }
  once(e, t, s = this) {
    this._emitter.once(e, t, s);
  }
  removeAllListeners(e) {
    this._emitter.removeAllListeners(e);
  }
  off(e, t, s = this, r) {
    this._emitter.off(e, t, s, r);
  }
  listeners(e) {
    return this._emitter.listeners(e);
  }
  emit(e, t, s) {
    return this._emitter.emit(e, t, s);
  }
  trigger(e, t) {
    if (this.config.debug)
      return this.emit(e, e, t);
    try {
      return this.emit(e, e, t);
    } catch (s) {
      if (this.logger.error("An internal error happened while handling event " + e + '. Error message: "' + s.message + '". Here is a stacktrace:', s), !this.triggeringException) {
        this.triggeringException = !0;
        const r = e === E.ERROR;
        this.trigger(E.ERROR, {
          type: V.OTHER_ERROR,
          details: D.INTERNAL_EXCEPTION,
          fatal: r,
          event: e,
          error: s
        }), this.triggeringException = !1;
      }
    }
    return !1;
  }
  listenerCount(e) {
    return this._emitter.listenerCount(e);
  }
  /**
   * Dispose of the instance
   */
  destroy() {
    this.logger.log("destroy"), this.trigger(E.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this._url = null, this.networkControllers.forEach((t) => t.destroy()), this.networkControllers.length = 0, this.coreComponents.forEach((t) => t.destroy()), this.coreComponents.length = 0;
    const e = this.config;
    e.xhrSetup = e.fetchSetup = void 0, this.userConfig = null;
  }
  /**
   * Attaches Hls.js to a media element
   */
  attachMedia(e) {
    if (!e || "media" in e && !e.media) {
      const n = new Error(`attachMedia failed: invalid argument (${e})`);
      this.trigger(E.ERROR, {
        type: V.OTHER_ERROR,
        details: D.ATTACH_MEDIA_ERROR,
        fatal: !0,
        error: n
      });
      return;
    }
    this.logger.log("attachMedia"), this._media && (this.logger.warn("media must be detached before attaching"), this.detachMedia());
    const t = "media" in e, s = t ? e.media : e, r = t ? e : {
      media: s
    };
    this._media = s, this.trigger(E.MEDIA_ATTACHING, r);
  }
  /**
   * Detach Hls.js from the media
   */
  detachMedia() {
    this.logger.log("detachMedia"), this.trigger(E.MEDIA_DETACHING, {}), this._media = null;
  }
  /**
   * Detach HTMLMediaElement, MediaSource, and SourceBuffers without reset, for attaching to another instance
   */
  transferMedia() {
    this._media = null;
    const e = this.bufferController.transferMedia();
    return this.trigger(E.MEDIA_DETACHING, {
      transferMedia: e
    }), e;
  }
  /**
   * Set the source URL. Can be relative or absolute.
   */
  loadSource(e) {
    this.stopLoad();
    const t = this.media, s = this._url, r = this._url = zr.buildAbsoluteURL(self.location.href, e, {
      alwaysNormalize: !0
    });
    this._autoLevelCapping = -1, this._maxHdcpLevel = null, this.logger.log(`loadSource:${r}`), t && s && (s !== r || this.bufferController.hasSourceTypes()) && (this.detachMedia(), this.attachMedia(t)), this.trigger(E.MANIFEST_LOADING, {
      url: e
    });
  }
  /**
   * Gets the currently loaded URL
   */
  get url() {
    return this._url;
  }
  /**
   * Whether or not enough has been buffered to seek to start position or use `media.currentTime` to determine next load position
   */
  get hasEnoughToStart() {
    return this.streamController.hasEnoughToStart;
  }
  /**
   * Get the startPosition set on startLoad(position) or on autostart with config.startPosition
   */
  get startPosition() {
    return this.streamController.startPositionValue;
  }
  /**
   * Start loading data from the stream source.
   * Depending on default config, client starts loading automatically when a source is set.
   *
   * @param startPosition - Set the start position to stream from.
   * Defaults to -1 (None: starts from earliest point)
   */
  startLoad(e = -1, t) {
    this.logger.log(`startLoad(${e + (t ? ", <skip seek to start>" : "")})`), this.started = !0, this.resumeBuffering();
    for (let s = 0; s < this.networkControllers.length && (this.networkControllers[s].startLoad(e, t), !(!this.started || !this.networkControllers)); s++)
      ;
  }
  /**
   * Stop loading of any stream data.
   */
  stopLoad() {
    this.logger.log("stopLoad"), this.started = !1;
    for (let e = 0; e < this.networkControllers.length && (this.networkControllers[e].stopLoad(), !(this.started || !this.networkControllers)); e++)
      ;
  }
  /**
   * Returns whether loading, toggled with `startLoad()` and `stopLoad()`, is active or not`.
   */
  get loadingEnabled() {
    return this.started;
  }
  /**
   * Returns state of fragment loading toggled by calling `pauseBuffering()` and `resumeBuffering()`.
   */
  get bufferingEnabled() {
    return this.streamController.bufferingEnabled;
  }
  /**
   * Resumes stream controller segment loading after `pauseBuffering` has been called.
   */
  resumeBuffering() {
    this.bufferingEnabled || (this.logger.log("resume buffering"), this.networkControllers.forEach((e) => {
      e.resumeBuffering && e.resumeBuffering();
    }));
  }
  /**
   * Prevents stream controller from loading new segments until `resumeBuffering` is called.
   * This allows for media buffering to be paused without interupting playlist loading.
   */
  pauseBuffering() {
    this.bufferingEnabled && (this.logger.log("pause buffering"), this.networkControllers.forEach((e) => {
      e.pauseBuffering && e.pauseBuffering();
    }));
  }
  get inFlightFragments() {
    const e = {
      [B.MAIN]: this.streamController.inFlightFrag
    };
    return this.audioStreamController && (e[B.AUDIO] = this.audioStreamController.inFlightFrag), this.subtititleStreamController && (e[B.SUBTITLE] = this.subtititleStreamController.inFlightFrag), e;
  }
  /**
   * Swap through possible audio codecs in the stream (for example to switch from stereo to 5.1)
   */
  swapAudioCodec() {
    this.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec();
  }
  /**
   * When the media-element fails, this allows to detach and then re-attach it
   * as one call (convenience method).
   *
   * Automatic recovery of media-errors by this process is configurable.
   */
  recoverMediaError() {
    this.logger.log("recoverMediaError");
    const e = this._media, t = e?.currentTime;
    this.detachMedia(), e && (this.attachMedia(e), t && this.startLoad(t));
  }
  removeLevel(e) {
    this.levelController.removeLevel(e);
  }
  /**
   * @returns a UUID for this player instance
   */
  get sessionId() {
    let e = this._sessionId;
    return e || (e = this._sessionId = Mm()), e;
  }
  /**
   * @returns an array of levels (variants) sorted by HDCP-LEVEL, RESOLUTION (height), FRAME-RATE, CODECS, VIDEO-RANGE, and BANDWIDTH
   */
  get levels() {
    const e = this.levelController.levels;
    return e || [];
  }
  /**
   * @returns LevelDetails of last loaded level (variant) or `null` prior to loading a media playlist.
   */
  get latestLevelDetails() {
    return this.streamController.getLevelDetails() || null;
  }
  /**
   * @returns Level object of selected level (variant) or `null` prior to selecting a level or once the level is removed.
   */
  get loadLevelObj() {
    return this.levelController.loadLevelObj;
  }
  /**
   * Index of quality level (variant) currently played
   */
  get currentLevel() {
    return this.streamController.currentLevel;
  }
  /**
   * Set quality level index immediately. This will flush the current buffer to replace the quality asap. That means playback will interrupt at least shortly to re-buffer and re-sync eventually. Set to -1 for automatic level selection.
   */
  set currentLevel(e) {
    this.logger.log(`set currentLevel:${e}`), this.levelController.manualLevel = e, this.streamController.immediateLevelSwitch();
  }
  /**
   * Index of next quality level loaded as scheduled by stream controller.
   */
  get nextLevel() {
    return this.streamController.nextLevel;
  }
  /**
   * Set quality level index for next loaded data.
   * This will switch the video quality asap, without interrupting playback.
   * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
   * @param newLevel - Pass -1 for automatic level selection
   */
  set nextLevel(e) {
    this.logger.log(`set nextLevel:${e}`), this.levelController.manualLevel = e, this.streamController.nextLevelSwitch();
  }
  /**
   * Return the quality level of the currently or last (of none is loaded currently) segment
   */
  get loadLevel() {
    return this.levelController.level;
  }
  /**
   * Set quality level index for next loaded data in a conservative way.
   * This will switch the quality without flushing, but interrupt current loading.
   * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
   * @param newLevel - Pass -1 for automatic level selection
   */
  set loadLevel(e) {
    this.logger.log(`set loadLevel:${e}`), this.levelController.manualLevel = e;
  }
  /**
   * get next quality level loaded
   */
  get nextLoadLevel() {
    return this.levelController.nextLoadLevel;
  }
  /**
   * Set quality level of next loaded segment in a fully "non-destructive" way.
   * Same as `loadLevel` but will wait for next switch (until current loading is done).
   */
  set nextLoadLevel(e) {
    this.levelController.nextLoadLevel = e;
  }
  /**
   * Return "first level": like a default level, if not set,
   * falls back to index of first level referenced in manifest
   */
  get firstLevel() {
    return Math.max(this.levelController.firstLevel, this.minAutoLevel);
  }
  /**
   * Sets "first-level", see getter.
   */
  set firstLevel(e) {
    this.logger.log(`set firstLevel:${e}`), this.levelController.firstLevel = e;
  }
  /**
   * Return the desired start level for the first fragment that will be loaded.
   * The default value of -1 indicates automatic start level selection.
   * Setting hls.nextAutoLevel without setting a startLevel will result in
   * the nextAutoLevel value being used for one fragment load.
   */
  get startLevel() {
    const e = this.levelController.startLevel;
    return e === -1 && this.abrController.forcedAutoLevel > -1 ? this.abrController.forcedAutoLevel : e;
  }
  /**
   * set  start level (level of first fragment that will be played back)
   * if not overrided by user, first level appearing in manifest will be used as start level
   * if -1 : automatic start level selection, playback will start from level matching download bandwidth
   * (determined from download of first segment)
   */
  set startLevel(e) {
    this.logger.log(`set startLevel:${e}`), e !== -1 && (e = Math.max(e, this.minAutoLevel)), this.levelController.startLevel = e;
  }
  /**
   * Whether level capping is enabled.
   * Default value is set via `config.capLevelToPlayerSize`.
   */
  get capLevelToPlayerSize() {
    return this.config.capLevelToPlayerSize;
  }
  /**
   * Enables or disables level capping. If disabled after previously enabled, `nextLevelSwitch` will be immediately called.
   */
  set capLevelToPlayerSize(e) {
    const t = !!e;
    t !== this.config.capLevelToPlayerSize && (t ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = t);
  }
  /**
   * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
   */
  get autoLevelCapping() {
    return this._autoLevelCapping;
  }
  /**
   * Returns the current bandwidth estimate in bits per second, when available. Otherwise, `NaN` is returned.
   */
  get bandwidthEstimate() {
    const {
      bwEstimator: e
    } = this.abrController;
    return e ? e.getEstimate() : NaN;
  }
  set bandwidthEstimate(e) {
    this.abrController.resetEstimator(e);
  }
  get abrEwmaDefaultEstimate() {
    const {
      bwEstimator: e
    } = this.abrController;
    return e ? e.defaultEstimate : NaN;
  }
  /**
   * get time to first byte estimate
   * @type {number}
   */
  get ttfbEstimate() {
    const {
      bwEstimator: e
    } = this.abrController;
    return e ? e.getEstimateTTFB() : NaN;
  }
  /**
   * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
   */
  set autoLevelCapping(e) {
    this._autoLevelCapping !== e && (this.logger.log(`set autoLevelCapping:${e}`), this._autoLevelCapping = e, this.levelController.checkMaxAutoUpdated());
  }
  get maxHdcpLevel() {
    return this._maxHdcpLevel;
  }
  set maxHdcpLevel(e) {
    Cf(e) && this._maxHdcpLevel !== e && (this._maxHdcpLevel = e, this.levelController.checkMaxAutoUpdated());
  }
  /**
   * True when automatic level selection enabled
   */
  get autoLevelEnabled() {
    return this.levelController.manualLevel === -1;
  }
  /**
   * Level set manually (if any)
   */
  get manualLevel() {
    return this.levelController.manualLevel;
  }
  /**
   * min level selectable in auto mode according to config.minAutoBitrate
   */
  get minAutoLevel() {
    const {
      levels: e,
      config: {
        minAutoBitrate: t
      }
    } = this;
    if (!e) return 0;
    const s = e.length;
    for (let r = 0; r < s; r++)
      if (e[r].maxBitrate >= t)
        return r;
    return 0;
  }
  /**
   * max level selectable in auto mode according to autoLevelCapping
   */
  get maxAutoLevel() {
    const {
      levels: e,
      autoLevelCapping: t,
      maxHdcpLevel: s
    } = this;
    let r;
    if (t === -1 && e != null && e.length ? r = e.length - 1 : r = t, s)
      for (let n = r; n--; ) {
        const a = e[n].attrs["HDCP-LEVEL"];
        if (a && a <= s)
          return n;
      }
    return r;
  }
  get firstAutoLevel() {
    return this.abrController.firstAutoLevel;
  }
  /**
   * next automatically selected quality level
   */
  get nextAutoLevel() {
    return this.abrController.nextAutoLevel;
  }
  /**
   * this setter is used to force next auto level.
   * this is useful to force a switch down in auto mode:
   * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
   * forced value is valid for one fragment. upon successful frag loading at forced level,
   * this value will be resetted to -1 by ABR controller.
   */
  set nextAutoLevel(e) {
    this.abrController.nextAutoLevel = e;
  }
  /**
   * get the datetime value relative to media.currentTime for the active level Program Date Time if present
   */
  get playingDate() {
    return this.streamController.currentProgramDateTime;
  }
  get mainForwardBufferInfo() {
    return this.streamController.getMainFwdBufferInfo();
  }
  get maxBufferLength() {
    return this.streamController.maxBufferLength;
  }
  /**
   * Find and select the best matching audio track, making a level switch when a Group change is necessary.
   * Updates `hls.config.audioPreference`. Returns the selected track, or null when no matching track is found.
   */
  setAudioOption(e) {
    var t;
    return ((t = this.audioTrackController) == null ? void 0 : t.setAudioOption(e)) || null;
  }
  /**
   * Find and select the best matching subtitle track, making a level switch when a Group change is necessary.
   * Updates `hls.config.subtitlePreference`. Returns the selected track, or null when no matching track is found.
   */
  setSubtitleOption(e) {
    var t;
    return ((t = this.subtitleTrackController) == null ? void 0 : t.setSubtitleOption(e)) || null;
  }
  /**
   * Get the complete list of audio tracks across all media groups
   */
  get allAudioTracks() {
    const e = this.audioTrackController;
    return e ? e.allAudioTracks : [];
  }
  /**
   * Get the list of selectable audio tracks
   */
  get audioTracks() {
    const e = this.audioTrackController;
    return e ? e.audioTracks : [];
  }
  /**
   * index of the selected audio track (index in audio track lists)
   */
  get audioTrack() {
    const e = this.audioTrackController;
    return e ? e.audioTrack : -1;
  }
  /**
   * selects an audio track, based on its index in audio track lists
   */
  set audioTrack(e) {
    const t = this.audioTrackController;
    t && (t.audioTrack = e);
  }
  /**
   * get the complete list of subtitle tracks across all media groups
   */
  get allSubtitleTracks() {
    const e = this.subtitleTrackController;
    return e ? e.allSubtitleTracks : [];
  }
  /**
   * get alternate subtitle tracks list from playlist
   */
  get subtitleTracks() {
    const e = this.subtitleTrackController;
    return e ? e.subtitleTracks : [];
  }
  /**
   * index of the selected subtitle track (index in subtitle track lists)
   */
  get subtitleTrack() {
    const e = this.subtitleTrackController;
    return e ? e.subtitleTrack : -1;
  }
  get media() {
    return this._media;
  }
  /**
   * select an subtitle track, based on its index in subtitle track lists
   */
  set subtitleTrack(e) {
    const t = this.subtitleTrackController;
    t && (t.subtitleTrack = e);
  }
  /**
   * Whether subtitle display is enabled or not
   */
  get subtitleDisplay() {
    const e = this.subtitleTrackController;
    return e ? e.subtitleDisplay : !1;
  }
  /**
   * Enable/disable subtitle display rendering
   */
  set subtitleDisplay(e) {
    const t = this.subtitleTrackController;
    t && (t.subtitleDisplay = e);
  }
  /**
   * get mode for Low-Latency HLS loading
   */
  get lowLatencyMode() {
    return this.config.lowLatencyMode;
  }
  /**
   * Enable/disable Low-Latency HLS part playlist and segment loading, and start live streams at playlist PART-HOLD-BACK rather than HOLD-BACK.
   */
  set lowLatencyMode(e) {
    this.config.lowLatencyMode = e;
  }
  /**
   * Position (in seconds) of live sync point (ie edge of live position minus safety delay defined by ```hls.config.liveSyncDuration```)
   * @returns null prior to loading live Playlist
   */
  get liveSyncPosition() {
    return this.latencyController.liveSyncPosition;
  }
  /**
   * Estimated position (in seconds) of live edge (ie edge of live playlist plus time sync playlist advanced)
   * @returns 0 before first playlist is loaded
   */
  get latency() {
    return this.latencyController.latency;
  }
  /**
   * maximum distance from the edge before the player seeks forward to ```hls.liveSyncPosition```
   * configured using ```liveMaxLatencyDurationCount``` (multiple of target duration) or ```liveMaxLatencyDuration```
   * @returns 0 before first playlist is loaded
   */
  get maxLatency() {
    return this.latencyController.maxLatency;
  }
  /**
   * target distance from the edge as calculated by the latency controller
   */
  get targetLatency() {
    return this.latencyController.targetLatency;
  }
  set targetLatency(e) {
    this.latencyController.targetLatency = e;
  }
  /**
   * the rate at which the edge of the current live playlist is advancing or 1 if there is none
   */
  get drift() {
    return this.latencyController.drift;
  }
  /**
   * set to true when startLoad is called before MANIFEST_PARSED event
   */
  get forceStartLoad() {
    return this.streamController.forceStartLoad;
  }
  /**
   * ContentSteering pathways getter
   */
  get pathways() {
    return this.levelController.pathways;
  }
  /**
   * ContentSteering pathwayPriority getter/setter
   */
  get pathwayPriority() {
    return this.levelController.pathwayPriority;
  }
  set pathwayPriority(e) {
    this.levelController.pathwayPriority = e;
  }
  /**
   * returns true when all SourceBuffers are buffered to the end
   */
  get bufferedToEnd() {
    var e;
    return !!((e = this.bufferController) != null && e.bufferedToEnd);
  }
  /**
   * returns Interstitials Program Manager
   */
  get interstitialsManager() {
    var e;
    return ((e = this.interstitialsController) == null ? void 0 : e.interstitialsManager) || null;
  }
  /**
   * returns mediaCapabilities.decodingInfo for a variant/rendition
   */
  getMediaDecodingInfo(e, t = this.allAudioTracks) {
    const s = xl(t);
    return Tl(e, s, navigator.mediaCapabilities);
  }
}
we.defaultConfig = void 0;
var Yp = /* @__PURE__ */ ci('<div><span class="load-wrap svelte-1me9ud"><span class="loader svelte-1me9ud"></span></span></div> <video crossorigin="anonymous" class="svelte-1me9ud"><!></video>', 3);
function jp(i, e) {
  Kr(e, !0);
  let t = De(e, "src", 3, void 0), s = De(e, "muted", 3, void 0), r = De(e, "playsinline", 3, void 0), n = De(e, "preload", 3, void 0), a = De(e, "autoplay", 3, void 0), o = De(e, "controls", 3, void 0), u = De(e, "currentTime", 15, void 0), l = De(e, "duration", 15, void 0), h = De(e, "paused", 15, void 0), c = De(e, "node", 15, void 0), d = De(e, "processingVideo", 3, !1), g = _o(!1);
  function f(x, L, A) {
    if (!(!x || !L) && we.isSupported() && !he(g)) {
      const I = new we({
        maxBufferLength: 1,
        // 0.5 seconds (500 ms)
        maxMaxBufferLength: 1,
        // Maximum max buffer length in seconds
        lowLatencyMode: !0
        // Enable low latency mode
      });
      I.loadSource(x), I.attachMedia(A), I.on(we.Events.MANIFEST_PARSED, function() {
        A.play();
      }), I.on(we.Events.ERROR, function(_, b) {
        if (console.error("HLS error:", _, b), b.fatal)
          switch (b.type) {
            case we.ErrorTypes.NETWORK_ERROR:
              console.error("Fatal network error encountered, trying to recover"), I.startLoad();
              break;
            case we.ErrorTypes.MEDIA_ERROR:
              console.error("Fatal media error encountered, trying to recover"), I.recoverMediaError();
              break;
            default:
              console.error("Fatal error, cannot recover"), I.destroy();
              break;
          }
      }), qs(g, !0);
    }
  }
  ir(() => {
    t(), qs(g, !1);
  }), ir(() => {
    c() && t() && e.is_stream && f(t(), e.is_stream, c());
  });
  var m = Yp(), p = rr(m);
  let y;
  var v = Ro(p, 2), T = nr(v);
  {
    var S = (x) => {
      var L = Do(), A = rr(L);
      Hh(A, () => e.children), vt(x, L);
    };
    Po(T, (x) => {
      e.children && x(S);
    });
  }
  it(() => ic(v, u)), it(() => oc("duration", "durationchange", v, l)), it(() => rc(v, h)), No(v, (x) => c(x), () => c()), Vh(v, (x, L) => Gd?.(x, L), () => ({ autoplay: a() ?? !1 })), Fs(() => {
    y = Yr(p, 1, "overlay svelte-1me9ud", null, y, { hidden: !d() }), St(v, "src", t()), v.muted = s(), v.playsInline = r(), St(v, "preload", n()), v.autoplay = a(), v.controls = o(), v.loop = e.loop, St(v, "data-testid", e["data-testid"]);
  }), We("loadeddata", v, () => e.onloadeddata?.()), Ms("click", v, () => e.onclick?.()), We("play", v, () => e.onplay?.()), We("pause", v, () => e.onpause?.()), We("ended", v, () => e.onended?.()), Ms("mouseover", v, () => e.onmouseover?.()), Ms("mouseout", v, () => e.onmouseout?.()), We("focus", v, () => e.onfocus?.()), We("blur", v, () => e.onblur?.()), We("error", v, () => e.onerror?.("Video not playable")), We("loadstart", v, () => e.onloadstart?.()), We("loadedmetadata", v, () => e.onloadedmetadata?.()), vt(i, m), Wr();
}
ui(["click", "mouseover", "mouseout"]);
var qp = /* @__PURE__ */ ci('<audio controls=""></audio>'), Xp = /* @__PURE__ */ ci("<div><p> </p> <!></div>");
function eE(i, e) {
  Kr(e, !0);
  let t = De(e, "value", 19, () => ({ text: "", files: [] })), s = De(e, "selected", 3, !1), r = _o(0), n;
  function a(d, g) {
    d.style.setProperty("--local-text-width", `${g && g < 150 ? g : 200}px`), d.style.whiteSpace = "unset";
  }
  ir(() => {
    n && he(r) && a(n, he(r));
  });
  var o = Xp();
  let u;
  var l = nr(o), h = nr(l), c = Ro(l, 2);
  Uh(c, 17, () => t().files, Nh, (d, g) => {
    var f = Do(), m = rr(f);
    {
      var p = (A) => {
        hc(A, {
          get src() {
            return he(g).url;
          },
          alt: ""
        });
      }, y = xi(() => he(g).mime_type && he(g).mime_type.includes("image")), v = (A) => {
        jp(A, {
          get src() {
            return he(g).url;
          },
          alt: "",
          loop: !0,
          is_stream: !1
        });
      }, T = xi(() => he(g).mime_type && he(g).mime_type.includes("video")), S = (A) => {
        var I = qp();
        Fs(() => St(I, "src", he(g).url)), vt(A, I);
      }, x = xi(() => he(g).mime_type && he(g).mime_type.includes("audio")), L = (A) => {
        var I = Fh();
        Fs(() => kn(I, he(g).orig_name)), vt(A, I);
      };
      Po(m, (A) => {
        he(y) ? A(p) : he(T) ? A(v, 1) : he(x) ? A(S, 2) : A(L, -1);
      });
    }
    vt(d, f);
  }), No(o, (d) => n = d, () => n), Fs(() => {
    u = Yr(o, 1, "container svelte-s3apn9", null, u, {
      table: e.type === "table",
      gallery: e.type === "gallery",
      selected: s(),
      border: t()
    }), kn(h, t().text ? t().text : "");
  }), ac(o, "clientWidth", (d) => qs(r, d)), vt(i, o), Wr();
}
export {
  eE as default
};
