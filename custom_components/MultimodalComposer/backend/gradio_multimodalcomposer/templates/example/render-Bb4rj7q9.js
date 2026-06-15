const ir = 1, lr = 2, fr = 16, ar = 1, or = 2, ur = 4, cr = 8, hr = 16, dr = 1, _r = 2, m = /* @__PURE__ */ Symbol("uninitialized"), vr = "http://www.w3.org/1999/xhtml", pr = "@attach", vt = !1;
var Kt = Array.isArray, Wt = Array.prototype.indexOf, Re = Array.prototype.includes, Xt = Array.from, Zt = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, Jt = Object.getOwnPropertyDescriptors, Qt = Object.prototype, en = Array.prototype, pt = Object.getPrototypeOf, lt = Object.isExtensible;
const tn = () => {
};
function nn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function gt() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const S = 2, ue = 4, De = 8, Xe = 1 << 24, P = 16, L = 32, $ = 64, He = 128, C = 512, E = 1024, T = 2048, j = 4096, R = 8192, N = 16384, de = 32768, ft = 1 << 25, me = 65536, Oe = 1 << 17, rn = 1 << 18, _e = 1 << 19, sn = 1 << 20, gr = 1 << 25, se = 65536, Pe = 1 << 21, oe = 1 << 22, G = 1 << 23, ee = /* @__PURE__ */ Symbol("$state"), yr = /* @__PURE__ */ Symbol("legacy props"), wr = /* @__PURE__ */ Symbol(""), ln = /* @__PURE__ */ Symbol("attributes"), fn = /* @__PURE__ */ Symbol("class"), an = /* @__PURE__ */ Symbol("style"), Ue = /* @__PURE__ */ Symbol("text"), Fe = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Er = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function on() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function br(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function un(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function cn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function hn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function dn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Tr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function _n() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function vn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function pn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function gn() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function yn() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Sr() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function wn() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function yt(e) {
  return e === this.v;
}
function mn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function wt(e) {
  return !mn(e, this.v);
}
let Le = !1, En = !1;
function kr() {
  Le = !0;
}
let b = null;
function ce(e) {
  b = e;
}
function bn(e, t = !1, n) {
  b = {
    p: b,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      p
    ),
    l: Le && !t ? { s: null, u: null, $: [] } : null
  };
}
function Tn(e) {
  var t = (
    /** @type {ComponentContext} */
    b
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Dt(r);
  }
  return t.i = !0, b = t.p, /** @type {T} */
  {};
}
function be() {
  return !Le || b !== null && b.l === null;
}
let fe = [];
function Sn() {
  var e = fe;
  fe = [], nn(e);
}
function te(e) {
  if (fe.length === 0) {
    var t = fe;
    queueMicrotask(() => {
      t === fe && Sn();
    });
  }
  fe.push(e);
}
function mt(e) {
  var t = p;
  if (t === null)
    return v.f |= G, e;
  if ((t.f & de) === 0 && (t.f & ue) === 0)
    throw e;
  z(e, t);
}
function z(e, t) {
  if (!(t !== null && (t.f & N) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & He) !== 0) {
        if ((t.f & de) === 0)
          throw e;
        try {
          t.b.error(e);
          return;
        } catch (n) {
          e = n;
        }
      }
      t = t.parent;
    }
    throw e;
  }
}
const kn = -7169;
function w(e, t) {
  e.f = e.f & kn | t;
}
function Ze(e) {
  (e.f & C) !== 0 || e.deps === null ? w(e, E) : w(e, j);
}
function Et(e) {
  if (e !== null)
    for (const t of e)
      (t.f & S) === 0 || (t.f & se) === 0 || (t.f ^= se, Et(
        /** @type {Derived} */
        t.deps
      ));
}
function bt(e, t, n) {
  (e.f & T) !== 0 ? t.add(e) : (e.f & j) !== 0 && n.add(e), Et(e.deps), w(e, E);
}
function An(e) {
  let t = 0, n = Te(0), r;
  return () => {
    rt() && (Q(n), zn(() => (t === 0 && (r = Jn(() => e(() => we(n)))), t += 1, () => {
      te(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, we(n));
      });
    })));
  };
}
var xn = me | _e;
function Cn(e, t, n, r) {
  new Rn(e, t, n, r);
}
class Rn {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /**
   * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
   * Inherited from parent boundary, or defaults to identity.
   * @type {(error: unknown) => unknown}
   */
  transform_error;
  /** @type {TemplateNode} */
  #i;
  /** @type {TemplateNode | null} */
  #v = null;
  /** @type {BoundaryProps} */
  #r;
  /** @type {((anchor: Node) => void)} */
  #h;
  /** @type {Effect} */
  #n;
  /** @type {Effect | null} */
  #l = null;
  /** @type {Effect | null} */
  #e = null;
  /** @type {Effect | null} */
  #s = null;
  /** @type {DocumentFragment | null} */
  #t = null;
  #d = 0;
  #f = 0;
  #a = !1;
  /** @type {Set<Effect>} */
  #u = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #p = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #o = null;
  #y = An(() => (this.#o = Te(this.#d), () => {
    this.#o = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, s) {
    this.#i = t, this.#r = n, this.#h = (i) => {
      var o = (
        /** @type {Effect} */
        p
      );
      o.b = this, o.f |= He, r(i);
    }, this.parent = /** @type {Effect} */
    p.b, this.transform_error = s ?? this.parent?.transform_error ?? ((i) => i), this.#n = Gn(() => {
      this.#w();
    }, xn);
  }
  #g() {
    try {
      this.#l = X(() => this.#h(this.#i));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #E(t) {
    const n = this.#r.failed;
    n && (this.#s = X(() => {
      n(
        this.#i,
        () => t,
        () => () => {
        }
      );
    }));
  }
  #b() {
    const t = this.#r.pending;
    t && (this.is_pending = !0, this.#e = X(() => t(this.#i)), te(() => {
      var n = this.#t = document.createDocumentFragment(), r = Mt();
      n.append(r), this.#l = this.#m(() => X(() => this.#h(r))), this.#f === 0 && (this.#i.before(n), this.#t = null, xe(
        /** @type {Effect} */
        this.#e,
        () => {
          this.#e = null;
        }
      ), this.#c(
        /** @type {Batch} */
        g
      ));
    }));
  }
  #w() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#f = 0, this.#d = 0, this.#l = X(() => {
        this.#h(this.#i);
      }), this.#f > 0) {
        var t = this.#t = document.createDocumentFragment();
        Wn(this.#l, t);
        const n = (
          /** @type {(anchor: Node) => void} */
          this.#r.pending
        );
        this.#e = X(() => n(this.#i));
      } else
        this.#c(
          /** @type {Batch} */
          g
        );
    } catch (n) {
      this.error(n);
    }
  }
  /**
   * @param {Batch} batch
   */
  #c(t) {
    this.is_pending = !1, t.transfer_effects(this.#u, this.#p);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    bt(t, this.#u, this.#p);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#r.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #m(t) {
    var n = p, r = v, s = b;
    B(this.#n), O(this.#n), ce(this.#n.ctx);
    try {
      return K.ensure(), t();
    } catch (i) {
      return mt(i), null;
    } finally {
      B(n), O(r), ce(s);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #_(t, n) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#_(t, n);
      return;
    }
    this.#f += t, this.#f === 0 && (this.#c(n), this.#e && xe(this.#e, () => {
      this.#e = null;
    }), this.#t && (this.#i.before(this.#t), this.#t = null));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    this.#_(t, n), this.#d += t, !(!this.#o || this.#a) && (this.#a = !0, te(() => {
      this.#a = !1, this.#o && Ne(this.#o, this.#d);
    }));
  }
  get_effect_pending() {
    return this.#y(), Q(
      /** @type {Source<number>} */
      this.#o
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!this.#r.onerror && !this.#r.failed)
      throw t;
    g?.is_fork ? (this.#l && g.skip_effect(this.#l), this.#e && g.skip_effect(this.#e), this.#s && g.skip_effect(this.#s), g.oncommit(() => {
      this.#T(t);
    })) : this.#T(t);
  }
  /**
   * @param {unknown} error
   */
  #T(t) {
    this.#l && (D(this.#l), this.#l = null), this.#e && (D(this.#e), this.#e = null), this.#s && (D(this.#s), this.#s = null);
    var n = this.#r.onerror;
    let r = this.#r.failed;
    var s = !1, i = !1;
    const o = () => {
      if (s) {
        wn();
        return;
      }
      s = !0, i && gn(), this.#s !== null && xe(this.#s, () => {
        this.#s = null;
      }), this.#m(() => {
        this.#w();
      });
    }, a = (l) => {
      try {
        i = !0, n?.(l, o), i = !1;
      } catch (f) {
        z(f, this.#n && this.#n.parent);
      }
      r && (this.#s = this.#m(() => {
        try {
          return X(() => {
            var f = (
              /** @type {Effect} */
              p
            );
            f.b = this, f.f |= He, r(
              this.#i,
              () => l,
              () => o
            );
          });
        } catch (f) {
          return z(
            f,
            /** @type {Effect} */
            this.#n.parent
          ), null;
        }
      }));
    };
    te(() => {
      var l;
      try {
        l = this.transform_error(t);
      } catch (f) {
        z(f, this.#n && this.#n.parent);
        return;
      }
      l !== null && typeof l == "object" && typeof /** @type {any} */
      l.then == "function" ? l.then(
        a,
        /** @param {unknown} e */
        (f) => z(f, this.#n && this.#n.parent)
      ) : a(l);
    });
  }
}
function On(e, t, n, r) {
  const s = be() ? Je : Mn;
  var i = e.filter((h) => !h.settled), o = t.map(s);
  if (n.length === 0 && i.length === 0) {
    r(o);
    return;
  }
  var a = (
    /** @type {Effect} */
    p
  ), l = Pn(), f = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((h) => h.promise)) : null;
  function d(h) {
    if ((a.f & N) === 0) {
      l();
      try {
        r([...o, ...h]);
      } catch (_) {
        z(_, a);
      }
      Ie();
    }
  }
  var u = Tt();
  if (n.length === 0) {
    f.then(() => d([])).finally(u);
    return;
  }
  function c() {
    Promise.all(n.map((h) => /* @__PURE__ */ In(h))).then(d).catch((h) => z(h, a)).finally(u);
  }
  f ? f.then(() => {
    l(), c(), Ie();
  }) : c();
}
function Pn() {
  var e = (
    /** @type {Effect} */
    p
  ), t = v, n = b, r = (
    /** @type {Batch} */
    g
  );
  return function(i = !0) {
    B(e), O(t), ce(n), i && (e.f & N) === 0 && (r?.activate(), r?.apply());
  };
}
function Ie(e = !0) {
  B(null), O(null), ce(null), e && g?.deactivate();
}
function Tt() {
  var e = (
    /** @type {Effect} */
    p
  ), t = e.b, n = (
    /** @type {Batch} */
    g
  ), r = !!t?.is_rendered();
  return t?.update_pending_count(1, n), n.increment(r, e), () => {
    t?.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  var t = S | T;
  return p !== null && (p.f |= _e), {
    ctx: b,
    deps: null,
    effects: null,
    equals: yt,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      m
    ),
    wv: 0,
    parent: p,
    ac: null
  };
}
const ve = /* @__PURE__ */ Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function In(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    p
  );
  r === null && on();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = Te(
    /** @type {V} */
    m
  ), o = !v, a = /* @__PURE__ */ new Set();
  return Yn(() => {
    var l = (
      /** @type {Effect} */
      p
    ), f = gt();
    s = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, (h) => {
        h !== Fe && f.reject(h);
      }).finally(Ie);
    } catch (h) {
      f.reject(h), Ie();
    }
    var d = (
      /** @type {Batch} */
      g
    );
    if (o) {
      if ((l.f & de) !== 0)
        var u = Tt();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        r.b?.is_rendered()
      )
        d.async_deriveds.get(l)?.reject(ve);
      else
        for (const h of a.values())
          h.reject(ve);
      a.add(f), d.async_deriveds.set(l, f);
    }
    const c = (h, _ = void 0) => {
      u?.(), a.delete(f), _ !== ve && (d.activate(), _ ? (i.f |= G, Ne(i, _)) : ((i.f & G) !== 0 && (i.f ^= G), Ne(i, h)), d.deactivate());
    };
    f.promise.then(c, (h) => c(null, h || "unknown"));
  }), st(() => {
    for (const l of a)
      l.reject(ve);
  }), new Promise((l) => {
    function f(d) {
      function u() {
        d === s ? l(i) : f(s);
      }
      d.then(u, u);
    }
    f(s);
  });
}
// @__NO_SIDE_EFFECTS__
function Ar(e) {
  const t = /* @__PURE__ */ Je(e);
  return qt(t), t;
}
// @__NO_SIDE_EFFECTS__
function Mn(e) {
  const t = /* @__PURE__ */ Je(e);
  return t.equals = wt, t;
}
function Nn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      D(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Qe(e) {
  var t, n = p, r = e.parent;
  if (!W && r !== null && e.v !== m && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (N | R)) !== 0)
    return yn(), e.v;
  B(r);
  try {
    e.f &= ~se, Nn(e), t = Yt(e);
  } finally {
    B(n);
  }
  return t;
}
function St(e) {
  var t = Qe(e);
  if (!e.equals(t) && (e.wv = Ht(), (!g?.is_fork || e.deps === null) && (g !== null ? (g.capture(e, t, !0), Ye?.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    w(e, E);
    return;
  }
  W || (I !== null ? (rt() || g?.is_fork) && I.set(e, t) : Ze(e));
}
function Dn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Fe), t.fn !== null && (t.teardown = tn), t.ac = null, Ee(t, 0), it(t));
}
function kt(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && he(t);
}
let qe = null, le = null, g = null, Ye = null, I = null, ze = null, Ve = !1, ae = null, Ae = null;
var at = 0;
let Fn = 1;
class K {
  id = Fn++;
  /** True as soon as `#process` was called */
  #i = !1;
  linked = !0;
  /** @type {Batch | null} */
  #v = null;
  /** @type {Batch | null} */
  #r = null;
  /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
  async_deriveds = /* @__PURE__ */ new Map();
  /**
   * The current values of any signals that are updated in this batch.
   * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Value, [any, boolean]>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Value, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<(batch: Batch) => void>}
   */
  #h = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #l = 0;
  /**
   * Async effects that are currently in flight, _not_ inside a pending boundary
   * @type {Map<Effect, number>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #s = null;
  /**
   * The root effects that need to be flushed
   * @type {Effect[]}
   */
  #t = [];
  /**
   * Effects created while this batch was active.
   * @type {Effect[]}
   */
  #d = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #f = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #a = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #u = /* @__PURE__ */ new Map();
  /**
   * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
   * @type {Set<Effect>}
   */
  #p = /* @__PURE__ */ new Set();
  is_fork = !1;
  #o = !1;
  constructor() {
    le === null ? qe = le = this : (le.#r = this, this.#v = le), le = this;
  }
  #y() {
    if (this.is_fork) return !0;
    for (const r of this.#e.keys()) {
      for (var t = r, n = !1; t.parent !== null; ) {
        if (this.#u.has(t)) {
          n = !0;
          break;
        }
        t = t.parent;
      }
      if (!n)
        return !0;
    }
    return !1;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    this.#u.has(t) || this.#u.set(t, { d: [], m: [] }), this.#p.delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = this.#u.get(t);
    if (r) {
      this.#u.delete(t);
      for (var s of r.d)
        w(s, T), n(s);
      for (s of r.m)
        w(s, j), n(s);
    }
    this.#p.add(t);
  }
  #g() {
    this.#i = !0, at++ > 1e3 && (this.#_(), Ln());
    for (const l of this.#f)
      this.#a.delete(l), w(l, T), this.schedule(l);
    for (const l of this.#a)
      w(l, j), this.schedule(l);
    const t = this.#t;
    this.#t = [], this.apply();
    var n = ae = [], r = [], s = Ae = [];
    for (const l of t)
      try {
        this.#E(l, n, r);
      } catch (f) {
        throw Ct(l), this.#y() || this.discard(), f;
      }
    if (g = null, s.length > 0) {
      var i = K.ensure();
      for (const l of s)
        i.schedule(l);
    }
    if (ae = null, Ae = null, this.#y()) {
      this.#c(r), this.#c(n);
      for (const [l, f] of this.#u)
        xt(l, f);
      s.length > 0 && /** @type {unknown} */
      g.#g();
      return;
    }
    const o = this.#b();
    if (o) {
      this.#c(r), this.#c(n), o.#w(this);
      return;
    }
    this.#f.clear(), this.#a.clear();
    for (const l of this.#h) l(this);
    this.#h.clear(), Ye = this, ot(r), ot(n), Ye = null, this.#s?.resolve();
    var a = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      g
    );
    if (this.#l === 0 && (this.#t.length === 0 || a !== null) && this.#_(), this.#t.length > 0)
      if (a !== null) {
        const l = a;
        l.#t.push(...this.#t.filter((f) => !l.#t.includes(f)));
      } else
        a = this;
    a !== null && a.#g();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #E(t, n, r) {
    t.f ^= E;
    for (var s = t.first; s !== null; ) {
      var i = s.f, o = (i & (L | $)) !== 0, a = o && (i & E) !== 0, l = a || (i & R) !== 0 || this.#u.has(s);
      if (!l && s.fn !== null) {
        o ? s.f ^= E : (i & ue) !== 0 ? n.push(s) : Se(s) && ((i & P) !== 0 && this.#a.add(s), he(s));
        var f = s.first;
        if (f !== null) {
          s = f;
          continue;
        }
      }
      for (; s !== null; ) {
        var d = s.next;
        if (d !== null) {
          s = d;
          break;
        }
        s = s.parent;
      }
    }
  }
  #b() {
    for (var t = this.#v; t !== null; ) {
      if (!t.is_fork) {
        for (const [n, [, r]] of this.current)
          if (t.current.has(n) && !r)
            return t;
      }
      t = t.#v;
    }
    return null;
  }
  /**
   * @param {Batch} batch
   */
  #w(t) {
    for (const [r, s] of t.current)
      !this.previous.has(r) && t.previous.has(r) && this.previous.set(r, t.previous.get(r)), this.current.set(r, s);
    for (const [r, s] of t.async_deriveds) {
      const i = this.async_deriveds.get(r);
      i && s.promise.then(i.resolve).catch(i.reject);
    }
    t.async_deriveds.clear(), this.transfer_effects(t.#f, t.#a);
    const n = (r) => {
      var s = r.reactions;
      if (s !== null)
        for (const a of s) {
          var i = a.f;
          if ((i & S) !== 0)
            n(
              /** @type {Derived} */
              a
            );
          else {
            var o = (
              /** @type {Effect} */
              a
            );
            i & (oe | P) && !this.async_deriveds.has(o) && (this.#a.delete(o), w(o, T), this.schedule(o));
          }
        }
    };
    for (const r of this.current.keys())
      n(r);
    this.oncommit(() => t.discard()), t.#_(), g = this, this.#g();
  }
  /**
   * @param {Effect[]} effects
   */
  #c(t) {
    for (var n = 0; n < t.length; n += 1)
      bt(t[n], this.#f, this.#a);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== m && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & G) === 0 && (this.current.set(t, [n, r]), I?.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    g = this;
  }
  deactivate() {
    g = null, I = null;
  }
  flush() {
    try {
      Ve = !0, g = this, this.#g();
    } finally {
      at = 0, ze = null, ae = null, Ae = null, Ve = !1, g = null, I = null, ne.clear();
    }
  }
  discard() {
    for (const t of this.#n) t(this);
    this.#n.clear();
    for (const t of this.async_deriveds.values())
      t.reject(ve);
    this.#_(), this.#s?.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    this.#d.push(t);
  }
  #m() {
    for (let u = qe; u !== null; u = u.#r) {
      var t = u.id < this.id, n = [];
      for (const [c, [h, _]] of this.current) {
        if (u.current.has(c)) {
          var r = (
            /** @type {[any, boolean]} */
            u.current.get(c)[0]
          );
          if (t && h !== r)
            u.current.set(c, [h, _]);
          else
            continue;
        }
        n.push(c);
      }
      if (t)
        for (const [c, h] of this.async_deriveds) {
          const _ = u.async_deriveds.get(c);
          _ && h.promise.then(_.resolve).catch(_.reject);
        }
      var s = [...u.current.keys()].filter(
        (c) => !/** @type {[any, boolean]} */
        u.current.get(c)[1]
      );
      if (!(!u.#i || s.length === 0)) {
        var i = s.filter((c) => !this.current.has(c));
        if (i.length === 0)
          t && u.discard();
        else if (n.length > 0) {
          if (t)
            for (const c of this.#p)
              u.unskip_effect(c, (h) => {
                (h.f & (P | oe)) !== 0 ? u.schedule(h) : u.#c([h]);
              });
          u.activate();
          var o = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
          for (var l of n)
            At(l, i, o, a);
          a = /* @__PURE__ */ new Map();
          var f = [...u.current].filter(([c, h]) => {
            const _ = this.current.get(c);
            return _ ? _[0] !== h[0] || _[1] !== h[1] : !0;
          }).map(([c]) => c);
          if (f.length > 0)
            for (const c of this.#d)
              (c.f & (N | R | Oe)) === 0 && et(c, f, a) && ((c.f & (oe | P)) !== 0 ? (w(c, T), u.schedule(c)) : u.#f.add(c));
          if (u.#t.length > 0 && !u.#o) {
            u.apply();
            for (var d of u.#t)
              u.#E(d, [], []);
            u.#t = [];
          }
          u.deactivate();
        }
      }
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (this.#l += 1, t) {
      let r = this.#e.get(n) ?? 0;
      this.#e.set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (this.#l -= 1, t) {
      let r = this.#e.get(n) ?? 0;
      r === 1 ? this.#e.delete(n) : this.#e.set(n, r - 1);
    }
    this.#o || (this.#o = !0, te(() => {
      this.#o = !1, this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      this.#f.add(r);
    for (const r of n)
      this.#a.add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    this.#h.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#n.add(t);
  }
  settled() {
    return (this.#s ??= gt()).promise;
  }
  static ensure() {
    if (g === null) {
      const t = g = new K();
      Ve || te(() => {
        t.#i || t.flush();
      });
    }
    return g;
  }
  apply() {
    {
      I = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (ze = t, t.b?.is_pending && (t.f & (ue | De | Xe)) !== 0 && (t.f & de) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ae !== null && n === p && (v === null || (v.f & S) === 0))
        return;
      if ((r & ($ | L)) !== 0) {
        if ((r & E) === 0)
          return;
        n.f ^= E;
      }
    }
    this.#t.push(n);
  }
  #_() {
    if (this.linked) {
      var t = this.#v, n = this.#r;
      t === null ? qe = n : t.#r = n, n === null ? le = t : n.#v = t, this.linked = !1;
    }
  }
}
function Ln() {
  try {
    dn();
  } catch (e) {
    z(e, ze);
  }
}
let H = null;
function ot(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (N | R)) === 0 && Se(r) && (H = /* @__PURE__ */ new Set(), he(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Lt(r), H?.size > 0)) {
        ne.clear();
        for (const s of H) {
          if ((s.f & (N | R)) !== 0) continue;
          const i = [s];
          let o = s.parent;
          for (; o !== null; )
            H.has(o) && (H.delete(o), i.push(o)), o = o.parent;
          for (let a = i.length - 1; a >= 0; a--) {
            const l = i[a];
            (l.f & (N | R)) === 0 && he(l);
          }
        }
        H.clear();
      }
    }
    H = null;
  }
}
function At(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & S) !== 0 ? At(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (oe | P)) !== 0 && (i & T) === 0 && et(s, t, r) && (w(s, T), tt(
        /** @type {Effect} */
        s
      ));
    }
}
function et(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (Re.call(t, s))
        return !0;
      if ((s.f & S) !== 0 && et(
        /** @type {Derived} */
        s,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function tt(e) {
  g.schedule(e);
}
function xt(e, t) {
  if (!((e.f & L) !== 0 && (e.f & E) !== 0)) {
    (e.f & T) !== 0 ? t.d.push(e) : (e.f & j) !== 0 && t.m.push(e), w(e, E);
    for (var n = e.first; n !== null; )
      xt(n, t), n = n.next;
  }
}
function Ct(e) {
  w(e, E);
  for (var t = e.first; t !== null; )
    Ct(t), t = t.next;
}
let Me = /* @__PURE__ */ new Set();
const ne = /* @__PURE__ */ new Map();
let Rt = !1;
function Te(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: yt,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function Y(e, t) {
  const n = Te(e);
  return qt(n), n;
}
// @__NO_SIDE_EFFECTS__
function xr(e, t = !1, n = !0) {
  const r = Te(e);
  return t || (r.equals = wt), Le && n && b !== null && b.l !== null && (b.l.s ??= []).push(r), r;
}
function Z(e, t, n = !1) {
  v !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!M || (v.f & Oe) !== 0) && be() && (v.f & (S | P | oe | Oe)) !== 0 && (F === null || !F.has(e)) && pn();
  let r = n ? pe(t) : t;
  return Ne(e, r, Ae);
}
function Ne(e, t, n = null) {
  if (!e.equals(t)) {
    ne.set(e, W ? t : e.v);
    var r = K.ensure();
    if (r.capture(e, t), (e.f & S) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & T) !== 0 && Qe(s), I === null && Ze(s);
    }
    e.wv = Ht(), Ot(e, T, n), be() && p !== null && (p.f & E) !== 0 && (p.f & (L | $)) === 0 && (x === null ? Xn([e]) : x.push(e)), !r.is_fork && Me.size > 0 && !Rt && jn();
  }
  return t;
}
function jn() {
  Rt = !1;
  for (const e of Me) {
    (e.f & E) !== 0 && w(e, j);
    let t;
    try {
      t = Se(e);
    } catch {
      t = !0;
    }
    t && he(e);
  }
  Me.clear();
}
function we(e) {
  Z(e, e.v + 1);
}
function Ot(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var s = be(), i = r.length, o = 0; o < i; o++) {
      var a = r[o], l = a.f;
      if (!(!s && a === p)) {
        var f = (l & T) === 0;
        if (f && w(a, t), (l & Oe) !== 0)
          Me.add(
            /** @type {Effect} */
            a
          );
        else if ((l & S) !== 0) {
          var d = (
            /** @type {Derived} */
            a
          );
          I?.delete(d), (l & se) === 0 && (l & C && (p === null || (p.f & Pe) === 0) && (a.f |= se), Ot(d, j, n));
        } else if (f) {
          var u = (
            /** @type {Effect} */
            a
          );
          (l & P) !== 0 && H !== null && H.add(u), n !== null ? n.push(u) : tt(u);
        }
      }
    }
}
function pe(e) {
  if (typeof e != "object" || e === null || ee in e)
    return e;
  const t = pt(e);
  if (t !== Qt && t !== en)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Kt(e), s = /* @__PURE__ */ Y(0), i = re, o = (a) => {
    if (re === i)
      return a();
    var l = v, f = re;
    O(null), dt(i);
    var d = a();
    return O(l), dt(f), d;
  };
  return r && n.set("length", /* @__PURE__ */ Y(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, l, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && _n();
        var d = n.get(l);
        return d === void 0 ? o(() => {
          var u = /* @__PURE__ */ Y(f.value);
          return n.set(l, u), u;
        }) : Z(d, f.value, !0), !0;
      },
      deleteProperty(a, l) {
        var f = n.get(l);
        if (f === void 0) {
          if (l in a) {
            const d = o(() => /* @__PURE__ */ Y(m));
            n.set(l, d), we(s);
          }
        } else
          Z(f, m), we(s);
        return !0;
      },
      get(a, l, f) {
        if (l === ee)
          return e;
        var d = n.get(l), u = l in a;
        if (d === void 0 && (!u || ye(a, l)?.writable) && (d = o(() => {
          var h = pe(u ? a[l] : m), _ = /* @__PURE__ */ Y(h);
          return _;
        }), n.set(l, d)), d !== void 0) {
          var c = Q(d);
          return c === m ? void 0 : c;
        }
        return Reflect.get(a, l, f);
      },
      getOwnPropertyDescriptor(a, l) {
        var f = Reflect.getOwnPropertyDescriptor(a, l);
        if (f && "value" in f) {
          var d = n.get(l);
          d && (f.value = Q(d));
        } else if (f === void 0) {
          var u = n.get(l), c = u?.v;
          if (u !== void 0 && c !== m)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return f;
      },
      has(a, l) {
        if (l === ee)
          return !0;
        var f = n.get(l), d = f !== void 0 && f.v !== m || Reflect.has(a, l);
        if (f !== void 0 || p !== null && (!d || ye(a, l)?.writable)) {
          f === void 0 && (f = o(() => {
            var c = d ? pe(a[l]) : m, h = /* @__PURE__ */ Y(c);
            return h;
          }), n.set(l, f));
          var u = Q(f);
          if (u === m)
            return !1;
        }
        return d;
      },
      set(a, l, f, d) {
        var u = n.get(l), c = l in a;
        if (r && l === "length")
          for (var h = f; h < /** @type {Source<number>} */
          u.v; h += 1) {
            var _ = n.get(h + "");
            _ !== void 0 ? Z(_, m) : h in a && (_ = o(() => /* @__PURE__ */ Y(m)), n.set(h + "", _));
          }
        if (u === void 0)
          (!c || ye(a, l)?.writable) && (u = o(() => /* @__PURE__ */ Y(void 0)), Z(u, pe(f)), n.set(l, u));
        else {
          c = u.v !== m;
          var y = o(() => pe(f));
          Z(u, y);
        }
        var U = Reflect.getOwnPropertyDescriptor(a, l);
        if (U?.set && U.set.call(d, f), !c) {
          if (r && typeof l == "string") {
            var V = (
              /** @type {Source<number>} */
              n.get("length")
            ), ie = Number(l);
            Number.isInteger(ie) && ie >= V.v && Z(V, ie + 1);
          }
          we(s);
        }
        return !0;
      },
      ownKeys(a) {
        Q(s);
        var l = Reflect.ownKeys(a).filter((u) => {
          var c = n.get(u);
          return c === void 0 || c.v !== m;
        });
        for (var [f, d] of n)
          d.v !== m && !(f in a) && l.push(f);
        return l;
      },
      setPrototypeOf() {
        vn();
      }
    }
  );
}
function ut(e) {
  try {
    if (e !== null && typeof e == "object" && ee in e)
      return e[ee];
  } catch {
  }
  return e;
}
function Cr(e, t) {
  return Object.is(ut(e), ut(t));
}
var ct, Bn, Pt, It;
function qn() {
  if (ct === void 0) {
    ct = window, Bn = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Pt = ye(t, "firstChild").get, It = ye(t, "nextSibling").get, lt(e) && (e[fn] = void 0, e[ln] = null, e[an] = void 0, e.__e = void 0), lt(n) && (n[Ue] = void 0);
  }
}
function Mt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
  return (
    /** @type {TemplateNode | null} */
    Pt.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function je(e) {
  return (
    /** @type {TemplateNode | null} */
    It.call(e)
  );
}
function Rr(e, t) {
  return /* @__PURE__ */ Nt(e);
}
function Or(e, t = !1) {
  {
    var n = /* @__PURE__ */ Nt(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ je(n) : n;
  }
}
function Pr(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ je(r);
  return r;
}
function Ir(e) {
  e.textContent = "";
}
function Mr() {
  return !1;
}
function Nr(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function Dr(e, t, n, r = !0) {
  r && n();
  for (var s of t)
    e.addEventListener(s, n);
  st(() => {
    for (var i of t)
      e.removeEventListener(i, n);
  });
}
function nt(e) {
  var t = v, n = p;
  O(null), B(null);
  try {
    return e();
  } finally {
    O(t), B(n);
  }
}
function Vn(e) {
  p === null && (v === null && hn(), cn()), W && un();
}
function Hn(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function q(e, t) {
  var n = p;
  n !== null && (n.f & R) !== 0 && (e |= R);
  var r = {
    ctx: b,
    deps: null,
    nodes: null,
    f: e | T | C,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  g?.register_created_effect(r);
  var s = r;
  if ((e & ue) !== 0)
    ae !== null ? ae.push(r) : K.ensure().schedule(r);
  else if (t !== null) {
    try {
      he(r);
    } catch (o) {
      throw D(r), o;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & _e) === 0 && (s = s.first, (e & P) !== 0 && (e & me) !== 0 && s !== null && (s.f |= me));
  }
  if (s !== null && (s.parent = n, n !== null && Hn(s, n), v !== null && (v.f & S) !== 0 && (e & $) === 0)) {
    var i = (
      /** @type {Derived} */
      v
    );
    (i.effects ??= []).push(s);
  }
  return r;
}
function rt() {
  return v !== null && !M;
}
function st(e) {
  const t = q(De, null);
  return w(t, E), t.teardown = e, t;
}
function Fr(e) {
  Vn();
  var t = (
    /** @type {Effect} */
    p.f
  ), n = !v && (t & L) !== 0 && b !== null && !b.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      b
    );
    (r.e ??= []).push(e);
  } else
    return Dt(e);
}
function Dt(e) {
  return q(ue | sn, e);
}
function Un(e) {
  K.ensure();
  const t = q($ | _e, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? xe(t, () => {
      D(t), r(void 0);
    }) : (D(t), r(void 0));
  });
}
function Lr(e) {
  return q(ue, e);
}
function Yn(e) {
  return q(oe | _e, e);
}
function zn(e, t = 0) {
  return q(De | t, e);
}
function jr(e, t = [], n = [], r = []) {
  On(r, t, n, (s) => {
    q(De, () => {
      e(...s.map(Q));
    });
  });
}
function Gn(e, t = 0) {
  var n = q(P | t, e);
  return n;
}
function Br(e, t = 0) {
  var n = q(Xe | t, e);
  return n;
}
function X(e) {
  return q(L | _e, e);
}
function Ft(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = W, r = v;
    ht(!0), O(null);
    try {
      t.call(null);
    } finally {
      ht(n), O(r);
    }
  }
}
function it(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && nt(() => {
      s.abort(Fe);
    });
    var r = n.next;
    (n.f & $) !== 0 ? n.parent = null : D(n, t), n = r;
  }
}
function $n(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & L) === 0 && D(t), t = n;
  }
}
function D(e, t = !0) {
  var n = !1;
  (t || (e.f & rn) !== 0) && e.nodes !== null && e.nodes.end !== null && (Kn(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= ft, it(e, t && !n), Ee(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  Ft(e), e.f ^= ft, e.f |= N;
  var s = e.parent;
  s !== null && s.first !== null && Lt(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Kn(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ je(e);
    e.remove(), e = n;
  }
}
function Lt(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function xe(e, t, n = !0) {
  var r = [];
  jt(e, r, !0);
  var s = () => {
    n && D(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var o = () => --i || s();
    for (var a of r)
      a.out(o);
  } else
    s();
}
function jt(e, t, n) {
  if ((e.f & R) === 0) {
    e.f ^= R;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var s = e.first; s !== null; ) {
      var i = s.next;
      if ((s.f & $) === 0) {
        var o = (s.f & me) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & L) !== 0 && (e.f & P) !== 0;
        jt(s, t, o ? n : !1);
      }
      s = i;
    }
  }
}
function qr(e) {
  Bt(e, !0);
}
function Bt(e, t) {
  if ((e.f & R) !== 0) {
    e.f ^= R, (e.f & E) === 0 && (w(e, T), K.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & me) !== 0 || (n.f & L) !== 0;
      Bt(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const o of i)
        (o.is_global || t) && o.in();
  }
}
function Wn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ je(n);
      t.append(n), n = s;
    }
}
let Ce = !1, W = !1;
function ht(e) {
  W = e;
}
let v = null, M = !1;
function O(e) {
  v = e;
}
let p = null;
function B(e) {
  p = e;
}
let F = null;
function qt(e) {
  v !== null && (F ??= /* @__PURE__ */ new Set()).add(e);
}
let k = null, A = 0, x = null;
function Xn(e) {
  x = e;
}
let Vt = 1, J = 0, re = J;
function dt(e) {
  re = e;
}
function Ht() {
  return ++Vt;
}
function Se(e) {
  var t = e.f;
  if ((t & T) !== 0)
    return !0;
  if (t & S && (e.f &= ~se), (t & j) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (Se(
        /** @type {Derived} */
        i
      ) && St(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & C) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    I === null && w(e, E);
  }
  return !1;
}
function Ut(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(F !== null && F.has(e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & S) !== 0 ? Ut(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? w(i, T) : (i.f & E) !== 0 && w(i, j), tt(
        /** @type {Effect} */
        i
      ));
    }
}
function Yt(e) {
  var t = k, n = A, r = x, s = v, i = F, o = b, a = M, l = re, f = e.f;
  k = /** @type {null | Value[]} */
  null, A = 0, x = null, v = (f & (L | $)) === 0 ? e : null, F = null, ce(e.ctx), M = !1, re = ++J, e.ac !== null && (nt(() => {
    e.ac.abort(Fe);
  }), e.ac = null);
  try {
    e.f |= Pe;
    var d = (
      /** @type {Function} */
      e.fn
    ), u = d();
    e.f |= de;
    var c = e.deps, h = g?.is_fork;
    if (k !== null) {
      var _;
      if (h || Ee(e, A), c !== null && A > 0)
        for (c.length = A + k.length, _ = 0; _ < k.length; _++)
          c[A + _] = k[_];
      else
        e.deps = c = k;
      if (rt() && (e.f & C) !== 0)
        for (_ = A; _ < c.length; _++)
          (c[_].reactions ??= []).push(e);
    } else !h && c !== null && A < c.length && (Ee(e, A), c.length = A);
    if (be() && x !== null && !M && c !== null && (e.f & (S | j | T)) === 0)
      for (_ = 0; _ < /** @type {Source[]} */
      x.length; _++)
        Ut(
          x[_],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (J++, s.deps !== null)
        for (let y = 0; y < n; y += 1)
          s.deps[y].rv = J;
      if (t !== null)
        for (const y of t)
          y.rv = J;
      x !== null && (r === null ? r = x : r.push(.../** @type {Source[]} */
      x));
    }
    return (e.f & G) !== 0 && (e.f ^= G), u;
  } catch (y) {
    return mt(y);
  } finally {
    e.f ^= Pe, k = t, A = n, x = r, v = s, F = i, ce(o), M = a, re = l;
  }
}
function Zn(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Wt.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & S) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (k === null || !Re.call(k, t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & C) !== 0 && (i.f ^= C, i.f &= ~se), i.v !== m && Ze(i), Dn(i), Ee(i, 0);
  }
}
function Ee(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Zn(e, n[r]);
}
function he(e) {
  var t = e.f;
  if ((t & N) === 0) {
    w(e, E);
    var n = p, r = Ce;
    p = e, Ce = !0;
    try {
      (t & (P | Xe)) !== 0 ? $n(e) : it(e), Ft(e);
      var s = Yt(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = Vt;
      var i;
      vt && En && (e.f & T) !== 0 && e.deps;
    } finally {
      Ce = r, p = n;
    }
  }
}
function Q(e) {
  var t = e.f, n = (t & S) !== 0;
  if (v !== null && !M) {
    var r = p !== null && (p.f & N) !== 0;
    if (!r && (F === null || !F.has(e))) {
      var s = v.deps;
      if ((v.f & Pe) !== 0)
        e.rv < J && (e.rv = J, k === null && s !== null && s[A] === e ? A++ : k === null ? k = [e] : k.push(e));
      else {
        v.deps ??= [], Re.call(v.deps, e) || v.deps.push(e);
        var i = e.reactions;
        i === null ? e.reactions = [v] : Re.call(i, v) || i.push(v);
      }
    }
  }
  if (W && ne.has(e))
    return ne.get(e);
  if (n) {
    var o = (
      /** @type {Derived} */
      e
    );
    if (W) {
      var a = o.v;
      return ((o.f & E) === 0 && o.reactions !== null || Gt(o)) && (a = Qe(o)), ne.set(o, a), a;
    }
    var l = (o.f & C) === 0 && !M && v !== null && (Ce || (v.f & C) !== 0), f = (o.f & de) === 0;
    Se(o) && (l && (o.f |= C), St(o)), l && !f && (kt(o), zt(o));
  }
  if (I?.has(e))
    return I.get(e);
  if ((e.f & G) !== 0)
    throw e.v;
  return e.v;
}
function zt(e) {
  if (e.f |= C, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & S) !== 0 && (t.f & C) === 0 && (kt(
        /** @type {Derived} */
        t
      ), zt(
        /** @type {Derived} */
        t
      ));
}
function Gt(e) {
  if (e.v === m) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (ne.has(t) || (t.f & S) !== 0 && Gt(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Jn(e) {
  var t = M;
  try {
    return M = !0, e();
  } finally {
    M = t;
  }
}
function Vr(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (ee in e)
      Ge(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && ee in n && Ge(n);
      }
  }
}
function Ge(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        Ge(e[r], t);
      } catch {
      }
    const n = pt(e);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = Jt(n);
      for (let s in r) {
        const i = r[s].get;
        if (i)
          try {
            i.call(e);
          } catch {
          }
      }
    }
  }
}
function Hr(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const Qn = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function Ur(e) {
  return Qn.includes(e);
}
const er = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function Yr(e) {
  return e = e.toLowerCase(), er[e] ?? e;
}
const tr = ["touchstart", "touchmove"];
function nr(e) {
  return tr.includes(e);
}
const ge = /* @__PURE__ */ Symbol("events"), $t = /* @__PURE__ */ new Set(), $e = /* @__PURE__ */ new Set();
function rr(e, t, n, r = {}) {
  function s(i) {
    if (r.capture || Ke.call(t, i), !i.cancelBubble)
      return nt(() => n?.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? te(() => {
    t.addEventListener(e, s, r);
  }) : t.addEventListener(e, s, r), s;
}
function zr(e, t, n, r, s) {
  var i = { capture: r, passive: s }, o = rr(e, t, n, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && st(() => {
    t.removeEventListener(e, o, i);
  });
}
function Gr(e, t, n) {
  (t[ge] ??= {})[e] = n;
}
function $r(e) {
  for (var t = 0; t < e.length; t++)
    $t.add(e[t]);
  for (var n of $e)
    n(e);
}
let _t = null;
function Ke(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = e.composedPath?.() || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  _t = e;
  var o = 0, a = _t === e && e[ge];
  if (a) {
    var l = s.indexOf(a);
    if (l !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[ge] = t;
      return;
    }
    var f = s.indexOf(t);
    if (f === -1)
      return;
    l <= f && (o = l);
  }
  if (i = /** @type {Element} */
  s[o] || e.target, i !== t) {
    Zt(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var d = v, u = p;
    O(null), B(null);
    try {
      for (var c, h = []; i !== null && i !== t; ) {
        try {
          var _ = i[ge]?.[r];
          _ != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && _.call(i, e);
        } catch (y) {
          c ? h.push(y) : c = y;
        }
        if (e.cancelBubble) break;
        o++, i = o < s.length ? (
          /** @type {Element} */
          s[o]
        ) : null;
      }
      if (c) {
        for (let y of h)
          queueMicrotask(() => {
            throw y;
          });
        throw c;
      }
    } finally {
      e[ge] = t, delete e.currentTarget, O(d), B(u);
    }
  }
}
function Kr(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[Ue] ??= e.nodeValue) && (e[Ue] = n, e.nodeValue = `${n}`);
}
function Wr(e, t) {
  return sr(e, t);
}
const ke = /* @__PURE__ */ new Map();
function sr(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: o = !0, transformError: a }) {
  qn();
  var l = void 0, f = Un(() => {
    var d = n ?? t.appendChild(Mt());
    Cn(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (h) => {
        bn({});
        var _ = (
          /** @type {ComponentContext} */
          b
        );
        i && (_.c = i), s && (r.$$events = s), l = e(h, r) || {}, Tn();
      },
      a
    );
    var u = /* @__PURE__ */ new Set(), c = (h) => {
      for (var _ = 0; _ < h.length; _++) {
        var y = h[_];
        if (!u.has(y)) {
          u.add(y);
          var U = nr(y);
          for (const Be of [t, document]) {
            var V = ke.get(Be);
            V === void 0 && (V = /* @__PURE__ */ new Map(), ke.set(Be, V));
            var ie = V.get(y);
            ie === void 0 ? (Be.addEventListener(y, Ke, { passive: U }), V.set(y, 1)) : V.set(y, ie + 1);
          }
        }
      }
    };
    return c(Xt($t)), $e.add(c), () => {
      for (var h of u)
        for (const U of [t, document]) {
          var _ = (
            /** @type {Map<string, number>} */
            ke.get(U)
          ), y = (
            /** @type {number} */
            _.get(h)
          );
          --y == 0 ? (U.removeEventListener(h, Ke), _.delete(h), _.size === 0 && ke.delete(U)) : _.set(h, y);
        }
      $e.delete(c), d !== n && d.parentNode?.removeChild(d);
    };
  });
  return We.set(l, f), l;
}
let We = /* @__PURE__ */ new WeakMap();
function Xr(e, t) {
  const n = We.get(e);
  return n ? (We.delete(e), n(t)) : Promise.resolve();
}
export {
  $r as $,
  ir as A,
  fr as B,
  xr as C,
  Te as D,
  me as E,
  lr as F,
  N as G,
  L as H,
  R as I,
  Ir as J,
  je as K,
  Lr as L,
  zn as M,
  Vr as N,
  Br as O,
  fn as P,
  Sr as Q,
  Cr as R,
  an as S,
  dr as T,
  st as U,
  On as V,
  pr as W,
  wr as X,
  Er as Y,
  Hr as Z,
  Gr as _,
  _r as a,
  rr as a0,
  Yr as a1,
  m as a2,
  ln as a3,
  vr as a4,
  pt as a5,
  Ur as a6,
  Jt as a7,
  Dr as a8,
  b as a9,
  Ar as aA,
  Wr as aB,
  Xr as aC,
  ft as aa,
  ee as ab,
  ye as ac,
  Tr as ad,
  ur as ae,
  pe as af,
  Z as ag,
  cr as ah,
  Le as ai,
  or as aj,
  ar as ak,
  Je as al,
  hr as am,
  W as an,
  yr as ao,
  bn as ap,
  zr as aq,
  Tn as ar,
  kr as as,
  Fr as at,
  Or as au,
  Pr as av,
  jr as aw,
  Y as ax,
  Rr as ay,
  Kr as az,
  p as b,
  Nr as c,
  Mt as d,
  qr as e,
  D as f,
  Nt as g,
  X as h,
  Bn as i,
  g as j,
  Mr as k,
  Gn as l,
  Wn as m,
  tn as n,
  Q as o,
  xe as p,
  te as q,
  nn as r,
  mn as s,
  Ne as t,
  Jn as u,
  gr as v,
  br as w,
  Mn as x,
  Kt as y,
  Xt as z
};
