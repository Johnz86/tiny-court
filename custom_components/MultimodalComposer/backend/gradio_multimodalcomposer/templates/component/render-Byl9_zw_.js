const hr = 1, _r = 2, dr = 4, vr = 8, pr = 16, yr = 1, gr = 2, wr = 4, Er = 8, mr = 16, br = 1, Sr = 2, b = /* @__PURE__ */ Symbol("uninitialized"), nn = "http://www.w3.org/1999/xhtml", Tr = "http://www.w3.org/2000/svg", Ar = "http://www.w3.org/1998/Math/MathML", kr = "@attach", Et = !1;
var rn = Array.isArray, sn = Array.prototype.indexOf, Pe = Array.prototype.includes, ln = Array.from, fn = Object.defineProperty, we = Object.getOwnPropertyDescriptor, an = Object.getOwnPropertyDescriptors, un = Object.prototype, on = Array.prototype, mt = Object.getPrototypeOf, ot = Object.isExtensible;
function xr(e) {
  return typeof e == "function";
}
const cn = () => {
};
function Cr(e) {
  return e();
}
function hn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function bt() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const T = 2, ce = 4, Te = 8, Qe = 1 << 24, P = 16, B = 32, X = 64, Ge = 128, C = 512, m = 1024, S = 2048, D = 4096, R = 8192, L = 16384, _e = 32768, ct = 1 << 25, be = 65536, Ne = 1 << 17, _n = 1 << 18, de = 1 << 19, St = 1 << 20, Rr = 1 << 25, ie = 65536, Ie = 1 << 21, oe = 1 << 22, K = 1 << 23, ne = /* @__PURE__ */ Symbol("$state"), Mr = /* @__PURE__ */ Symbol("legacy props"), Or = /* @__PURE__ */ Symbol(""), dn = /* @__PURE__ */ Symbol("attributes"), vn = /* @__PURE__ */ Symbol("class"), pn = /* @__PURE__ */ Symbol("style"), $e = /* @__PURE__ */ Symbol("text"), Ce = /* @__PURE__ */ Symbol("form reset"), je = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Nr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function yn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Ir(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function gn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function wn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function En(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function mn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Lr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function bn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Sn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Tn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function An() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function kn() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Dr() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function xn() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Tt(e) {
  return e === this.v;
}
function Cn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function At(e) {
  return !Cn(e, this.v);
}
let He = !1, Rn = !1;
function Fr() {
  He = !0;
}
let E = null;
function he(e) {
  E = e;
}
function Mn(e, t = !1, n) {
  E = {
    p: E,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      p
    ),
    l: He && !t ? { s: null, u: null, $: [] } : null
  };
}
function On(e) {
  var t = (
    /** @type {ComponentContext} */
    E
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Ut(r);
  }
  return e !== void 0 && (t.x = e), t.i = !0, E = t.p, e ?? /** @type {T} */
  {};
}
function Ae() {
  return !He || E !== null && E.l === null;
}
let ee = [];
function kt() {
  var e = ee;
  ee = [], hn(e);
}
function W(e) {
  if (ee.length === 0 && !Ee) {
    var t = ee;
    queueMicrotask(() => {
      t === ee && kt();
    });
  }
  ee.push(e);
}
function Pn() {
  for (; ee.length > 0; )
    kt();
}
function xt(e) {
  var t = p;
  if (t === null)
    return v.f |= K, e;
  if ((t.f & _e) === 0 && (t.f & ce) === 0)
    throw e;
  z(e, t);
}
function z(e, t) {
  if (!(t !== null && (t.f & L) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & Ge) !== 0) {
        if ((t.f & _e) === 0)
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
const Nn = -7169;
function w(e, t) {
  e.f = e.f & Nn | t;
}
function et(e) {
  (e.f & C) !== 0 || e.deps === null ? w(e, m) : w(e, D);
}
function Ct(e) {
  if (e !== null)
    for (const t of e)
      (t.f & T) === 0 || (t.f & ie) === 0 || (t.f ^= ie, Ct(
        /** @type {Derived} */
        t.deps
      ));
}
function Rt(e, t, n) {
  (e.f & S) !== 0 ? t.add(e) : (e.f & D) !== 0 && n.add(e), Ct(e.deps), w(e, m);
}
function In(e) {
  let t = 0, n = ke(0), r;
  return () => {
    it() && (Y(n), ft(() => (t === 0 && (r = ut(() => e(() => me(n)))), t += 1, () => {
      W(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, me(n));
      });
    })));
  };
}
var Ln = be | de;
function Dn(e, t, n, r) {
  new Fn(e, t, n, r);
}
class Fn {
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
  #_ = 0;
  #f = 0;
  #a = !1;
  /** @type {Set<Effect>} */
  #o = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #p = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #u = null;
  #g = In(() => (this.#u = ke(this.#_), () => {
    this.#u = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, s) {
    this.#i = t, this.#r = n, this.#h = (i) => {
      var u = (
        /** @type {Effect} */
        p
      );
      u.b = this, u.f |= Ge, r(i);
    }, this.parent = /** @type {Effect} */
    p.b, this.transform_error = s ?? this.parent?.transform_error ?? ((i) => i), this.#n = er(() => {
      this.#w();
    }, Ln);
  }
  #y() {
    try {
      this.#l = Q(() => this.#h(this.#i));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #m(t) {
    const n = this.#r.failed;
    n && (this.#s = Q(() => {
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
    t && (this.is_pending = !0, this.#e = Q(() => t(this.#i)), W(() => {
      var n = this.#t = document.createDocumentFragment(), r = Bt();
      n.append(r), this.#l = this.#E(() => Q(() => this.#h(r))), this.#f === 0 && (this.#i.before(n), this.#t = null, Me(
        /** @type {Effect} */
        this.#e,
        () => {
          this.#e = null;
        }
      ), this.#c(
        /** @type {Batch} */
        y
      ));
    }));
  }
  #w() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#f = 0, this.#_ = 0, this.#l = Q(() => {
        this.#h(this.#i);
      }), this.#f > 0) {
        var t = this.#t = document.createDocumentFragment();
        rr(this.#l, t);
        const n = (
          /** @type {(anchor: Node) => void} */
          this.#r.pending
        );
        this.#e = Q(() => n(this.#i));
      } else
        this.#c(
          /** @type {Batch} */
          y
        );
    } catch (n) {
      this.error(n);
    }
  }
  /**
   * @param {Batch} batch
   */
  #c(t) {
    this.is_pending = !1, t.transfer_effects(this.#o, this.#p);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Rt(t, this.#o, this.#p);
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
  #E(t) {
    var n = p, r = v, s = E;
    O(this.#n), M(this.#n), he(this.#n.ctx);
    try {
      return Z.ensure(), t();
    } catch (i) {
      return xt(i), null;
    } finally {
      O(n), M(r), he(s);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #d(t, n) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#d(t, n);
      return;
    }
    this.#f += t, this.#f === 0 && (this.#c(n), this.#e && Me(this.#e, () => {
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
    this.#d(t, n), this.#_ += t, !(!this.#u || this.#a) && (this.#a = !0, W(() => {
      this.#a = !1, this.#u && Fe(this.#u, this.#_);
    }));
  }
  get_effect_pending() {
    return this.#g(), Y(
      /** @type {Source<number>} */
      this.#u
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!this.#r.onerror && !this.#r.failed)
      throw t;
    y?.is_fork ? (this.#l && y.skip_effect(this.#l), this.#e && y.skip_effect(this.#e), this.#s && y.skip_effect(this.#s), y.oncommit(() => {
      this.#S(t);
    })) : this.#S(t);
  }
  /**
   * @param {unknown} error
   */
  #S(t) {
    this.#l && (j(this.#l), this.#l = null), this.#e && (j(this.#e), this.#e = null), this.#s && (j(this.#s), this.#s = null);
    var n = this.#r.onerror;
    let r = this.#r.failed;
    var s = !1, i = !1;
    const u = () => {
      if (s) {
        xn();
        return;
      }
      s = !0, i && An(), this.#s !== null && Me(this.#s, () => {
        this.#s = null;
      }), this.#E(() => {
        this.#w();
      });
    }, a = (l) => {
      try {
        i = !0, n?.(l, u), i = !1;
      } catch (f) {
        z(f, this.#n && this.#n.parent);
      }
      r && (this.#s = this.#E(() => {
        try {
          return Q(() => {
            var f = (
              /** @type {Effect} */
              p
            );
            f.b = this, f.f |= Ge, r(
              this.#i,
              () => l,
              () => u
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
    W(() => {
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
function jn(e, t, n, r) {
  const s = Ae() ? tt : Vn;
  var i = e.filter((h) => !h.settled), u = t.map(s);
  if (n.length === 0 && i.length === 0) {
    r(u);
    return;
  }
  var a = (
    /** @type {Effect} */
    p
  ), l = Hn(), f = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((h) => h.promise)) : null;
  function _(h) {
    if ((a.f & L) === 0) {
      l();
      try {
        r([...u, ...h]);
      } catch (d) {
        z(d, a);
      }
      Le();
    }
  }
  var o = Mt();
  if (n.length === 0) {
    f.then(() => _([])).finally(o);
    return;
  }
  function c() {
    Promise.all(n.map((h) => /* @__PURE__ */ Bn(h))).then(_).catch((h) => z(h, a)).finally(o);
  }
  f ? f.then(() => {
    l(), c(), Le();
  }) : c();
}
function Hn() {
  var e = (
    /** @type {Effect} */
    p
  ), t = v, n = E, r = (
    /** @type {Batch} */
    y
  );
  return function(i = !0) {
    O(e), M(t), he(n), i && (e.f & L) === 0 && (r?.activate(), r?.apply());
  };
}
function Le(e = !0) {
  O(null), M(null), he(null), e && y?.deactivate();
}
function Mt() {
  var e = (
    /** @type {Effect} */
    p
  ), t = e.b, n = (
    /** @type {Batch} */
    y
  ), r = !!t?.is_rendered();
  return t?.update_pending_count(1, n), n.increment(r, e), () => {
    t?.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function tt(e) {
  var t = T | S;
  return p !== null && (p.f |= de), {
    ctx: E,
    deps: null,
    effects: null,
    equals: Tt,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      b
    ),
    wv: 0,
    parent: p,
    ac: null
  };
}
const pe = /* @__PURE__ */ Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Bn(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    p
  );
  r === null && yn();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = ke(
    /** @type {V} */
    b
  ), u = !v, a = /* @__PURE__ */ new Set();
  return Qn(() => {
    var l = (
      /** @type {Effect} */
      p
    ), f = bt();
    s = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, (h) => {
        h !== je && f.reject(h);
      }).finally(Le);
    } catch (h) {
      f.reject(h), Le();
    }
    var _ = (
      /** @type {Batch} */
      y
    );
    if (u) {
      if ((l.f & _e) !== 0)
        var o = Mt();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        r.b?.is_rendered()
      )
        _.async_deriveds.get(l)?.reject(pe);
      else
        for (const h of a.values())
          h.reject(pe);
      a.add(f), _.async_deriveds.set(l, f);
    }
    const c = (h, d = void 0) => {
      o?.(), a.delete(f), d !== pe && (_.activate(), d ? (i.f |= K, Fe(i, d)) : ((i.f & K) !== 0 && (i.f ^= K), Fe(i, h)), _.deactivate());
    };
    f.promise.then(c, (h) => c(null, h || "unknown"));
  }), lt(() => {
    for (const l of a)
      l.reject(pe);
  }), new Promise((l) => {
    function f(_) {
      function o() {
        _ === s ? l(i) : f(s);
      }
      _.then(o, o);
    }
    f(s);
  });
}
// @__NO_SIDE_EFFECTS__
function jr(e) {
  const t = /* @__PURE__ */ tt(e);
  return Kt(t), t;
}
// @__NO_SIDE_EFFECTS__
function Vn(e) {
  const t = /* @__PURE__ */ tt(e);
  return t.equals = At, t;
}
function qn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      j(
        /** @type {Effect} */
        t[n]
      );
  }
}
function nt(e) {
  var t, n = p, r = e.parent;
  if (!J && r !== null && e.v !== b && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (L | R)) !== 0)
    return kn(), e.v;
  O(r);
  try {
    e.f &= ~ie, qn(e), t = Jt(e);
  } finally {
    O(n);
  }
  return t;
}
function Ot(e) {
  var t = nt(e);
  if (!e.equals(t) && (e.wv = Xt(), (!y?.is_fork || e.deps === null) && (y !== null ? (y.capture(e, t, !0), ze?.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    w(e, m);
    return;
  }
  J || (N !== null ? (it() || y?.is_fork) && N.set(e, t) : et(e));
}
function Un(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(je), t.fn !== null && (t.teardown = cn), t.ac = null, Se(t, 0), at(t));
}
function Pt(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && le(t);
}
let Ue = null, ae = null, y = null, ze = null, N = null, Ke = null, Ee = !1, Ye = !1, ue = null, Re = null;
var ht = 0;
let Yn = 1;
class Z {
  id = Yn++;
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
  #_ = [];
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
  #o = /* @__PURE__ */ new Map();
  /**
   * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
   * @type {Set<Effect>}
   */
  #p = /* @__PURE__ */ new Set();
  is_fork = !1;
  #u = !1;
  constructor() {
    ae === null ? Ue = ae = this : (ae.#r = this, this.#v = ae), ae = this;
  }
  #g() {
    if (this.is_fork) return !0;
    for (const r of this.#e.keys()) {
      for (var t = r, n = !1; t.parent !== null; ) {
        if (this.#o.has(t)) {
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
    this.#o.has(t) || this.#o.set(t, { d: [], m: [] }), this.#p.delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = this.#o.get(t);
    if (r) {
      this.#o.delete(t);
      for (var s of r.d)
        w(s, S), n(s);
      for (s of r.m)
        w(s, D), n(s);
    }
    this.#p.add(t);
  }
  #y() {
    this.#i = !0, ht++ > 1e3 && (this.#d(), $n());
    for (const l of this.#f)
      this.#a.delete(l), w(l, S), this.schedule(l);
    for (const l of this.#a)
      w(l, D), this.schedule(l);
    const t = this.#t;
    this.#t = [], this.apply();
    var n = ue = [], r = [], s = Re = [];
    for (const l of t)
      try {
        this.#m(l, n, r);
      } catch (f) {
        throw Lt(l), this.#g() || this.discard(), f;
      }
    if (y = null, s.length > 0) {
      var i = Z.ensure();
      for (const l of s)
        i.schedule(l);
    }
    if (ue = null, Re = null, this.#g()) {
      this.#c(r), this.#c(n);
      for (const [l, f] of this.#o)
        It(l, f);
      s.length > 0 && /** @type {unknown} */
      y.#y();
      return;
    }
    const u = this.#b();
    if (u) {
      this.#c(r), this.#c(n), u.#w(this);
      return;
    }
    this.#f.clear(), this.#a.clear();
    for (const l of this.#h) l(this);
    this.#h.clear(), ze = this, _t(r), _t(n), ze = null, this.#s?.resolve();
    var a = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      y
    );
    if (this.#l === 0 && (this.#t.length === 0 || a !== null) && this.#d(), this.#t.length > 0)
      if (a !== null) {
        const l = a;
        l.#t.push(...this.#t.filter((f) => !l.#t.includes(f)));
      } else
        a = this;
    a !== null && a.#y();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #m(t, n, r) {
    t.f ^= m;
    for (var s = t.first; s !== null; ) {
      var i = s.f, u = (i & (B | X)) !== 0, a = u && (i & m) !== 0, l = a || (i & R) !== 0 || this.#o.has(s);
      if (!l && s.fn !== null) {
        u ? s.f ^= m : (i & ce) !== 0 ? n.push(s) : ve(s) && ((i & P) !== 0 && this.#a.add(s), le(s));
        var f = s.first;
        if (f !== null) {
          s = f;
          continue;
        }
      }
      for (; s !== null; ) {
        var _ = s.next;
        if (_ !== null) {
          s = _;
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
          if ((i & T) !== 0)
            n(
              /** @type {Derived} */
              a
            );
          else {
            var u = (
              /** @type {Effect} */
              a
            );
            i & (oe | P) && !this.async_deriveds.has(u) && (this.#a.delete(u), w(u, S), this.schedule(u));
          }
        }
    };
    for (const r of this.current.keys())
      n(r);
    this.oncommit(() => t.discard()), t.#d(), y = this, this.#y();
  }
  /**
   * @param {Effect[]} effects
   */
  #c(t) {
    for (var n = 0; n < t.length; n += 1)
      Rt(t[n], this.#f, this.#a);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== b && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & K) === 0 && (this.current.set(t, [n, r]), N?.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    y = this;
  }
  deactivate() {
    y = null, N = null;
  }
  flush() {
    try {
      Ye = !0, y = this, this.#y();
    } finally {
      ht = 0, Ke = null, ue = null, Re = null, Ye = !1, y = null, N = null, re.clear();
    }
  }
  discard() {
    for (const t of this.#n) t(this);
    this.#n.clear();
    for (const t of this.async_deriveds.values())
      t.reject(pe);
    this.#d(), this.#s?.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    this.#_.push(t);
  }
  #E() {
    for (let o = Ue; o !== null; o = o.#r) {
      var t = o.id < this.id, n = [];
      for (const [c, [h, d]] of this.current) {
        if (o.current.has(c)) {
          var r = (
            /** @type {[any, boolean]} */
            o.current.get(c)[0]
          );
          if (t && h !== r)
            o.current.set(c, [h, d]);
          else
            continue;
        }
        n.push(c);
      }
      if (t)
        for (const [c, h] of this.async_deriveds) {
          const d = o.async_deriveds.get(c);
          d && h.promise.then(d.resolve).catch(d.reject);
        }
      var s = [...o.current.keys()].filter(
        (c) => !/** @type {[any, boolean]} */
        o.current.get(c)[1]
      );
      if (!(!o.#i || s.length === 0)) {
        var i = s.filter((c) => !this.current.has(c));
        if (i.length === 0)
          t && o.discard();
        else if (n.length > 0) {
          if (t)
            for (const c of this.#p)
              o.unskip_effect(c, (h) => {
                (h.f & (P | oe)) !== 0 ? o.schedule(h) : o.#c([h]);
              });
          o.activate();
          var u = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
          for (var l of n)
            Nt(l, i, u, a);
          a = /* @__PURE__ */ new Map();
          var f = [...o.current].filter(([c, h]) => {
            const d = this.current.get(c);
            return d ? d[0] !== h[0] || d[1] !== h[1] : !0;
          }).map(([c]) => c);
          if (f.length > 0)
            for (const c of this.#_)
              (c.f & (L | R | Ne)) === 0 && rt(c, f, a) && ((c.f & (oe | P)) !== 0 ? (w(c, S), o.schedule(c)) : o.#f.add(c));
          if (o.#t.length > 0 && !o.#u) {
            o.apply();
            for (var _ of o.#t)
              o.#m(_, [], []);
            o.#t = [];
          }
          o.deactivate();
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
    this.#u || (this.#u = !0, W(() => {
      this.#u = !1, this.linked && this.flush();
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
    return (this.#s ??= bt()).promise;
  }
  static ensure() {
    if (y === null) {
      const t = y = new Z();
      !Ye && !Ee && W(() => {
        t.#i || t.flush();
      });
    }
    return y;
  }
  apply() {
    {
      N = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (Ke = t, t.b?.is_pending && (t.f & (ce | Te | Qe)) !== 0 && (t.f & _e) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ue !== null && n === p && (v === null || (v.f & T) === 0))
        return;
      if ((r & (X | B)) !== 0) {
        if ((r & m) === 0)
          return;
        n.f ^= m;
      }
    }
    this.#t.push(n);
  }
  #d() {
    if (this.linked) {
      var t = this.#v, n = this.#r;
      t === null ? Ue = n : t.#r = n, n === null ? ae = t : n.#v = t, this.linked = !1;
    }
  }
}
function Gn(e) {
  var t = Ee;
  Ee = !0;
  try {
    for (var n; ; ) {
      if (Pn(), y === null)
        return (
          /** @type {T} */
          n
        );
      y.flush();
    }
  } finally {
    Ee = t;
  }
}
function $n() {
  try {
    mn();
  } catch (e) {
    z(e, Ke);
  }
}
let q = null;
function _t(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (L | R)) === 0 && ve(r) && (q = /* @__PURE__ */ new Set(), le(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Gt(r), q?.size > 0)) {
        re.clear();
        for (const s of q) {
          if ((s.f & (L | R)) !== 0) continue;
          const i = [s];
          let u = s.parent;
          for (; u !== null; )
            q.has(u) && (q.delete(u), i.push(u)), u = u.parent;
          for (let a = i.length - 1; a >= 0; a--) {
            const l = i[a];
            (l.f & (L | R)) === 0 && le(l);
          }
        }
        q.clear();
      }
    }
    q = null;
  }
}
function Nt(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & T) !== 0 ? Nt(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (oe | P)) !== 0 && (i & S) === 0 && rt(s, t, r) && (w(s, S), st(
        /** @type {Effect} */
        s
      ));
    }
}
function rt(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (Pe.call(t, s))
        return !0;
      if ((s.f & T) !== 0 && rt(
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
function st(e) {
  y.schedule(e);
}
function It(e, t) {
  if (!((e.f & B) !== 0 && (e.f & m) !== 0)) {
    (e.f & S) !== 0 ? t.d.push(e) : (e.f & D) !== 0 && t.m.push(e), w(e, m);
    for (var n = e.first; n !== null; )
      It(n, t), n = n.next;
  }
}
function Lt(e) {
  w(e, m);
  for (var t = e.first; t !== null; )
    Lt(t), t = t.next;
}
let De = /* @__PURE__ */ new Set();
const re = /* @__PURE__ */ new Map();
let Dt = !1;
function ke(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Tt,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function $(e, t) {
  const n = ke(e);
  return Kt(n), n;
}
// @__NO_SIDE_EFFECTS__
function Hr(e, t = !1, n = !0) {
  const r = ke(e);
  return t || (r.equals = At), He && n && E !== null && E.l !== null && (E.l.s ??= []).push(r), r;
}
function Br(e, t) {
  return U(
    e,
    ut(() => Y(e))
  ), t;
}
function U(e, t, n = !1) {
  v !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!I || (v.f & Ne) !== 0) && Ae() && (v.f & (T | P | oe | Ne)) !== 0 && (H === null || !H.has(e)) && Tn();
  let r = n ? ye(t) : t;
  return Fe(e, r, Re);
}
function Fe(e, t, n = null) {
  if (!e.equals(t)) {
    re.set(e, J ? t : e.v);
    var r = Z.ensure();
    if (r.capture(e, t), (e.f & T) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & S) !== 0 && nt(s), N === null && et(s);
    }
    e.wv = Xt(), Ft(e, S, n), Ae() && p !== null && (p.f & m) !== 0 && (p.f & (B | X)) === 0 && (x === null ? sr([e]) : x.push(e)), !r.is_fork && De.size > 0 && !Dt && zn();
  }
  return t;
}
function zn() {
  Dt = !1;
  for (const e of De) {
    (e.f & m) !== 0 && w(e, D);
    let t;
    try {
      t = ve(e);
    } catch {
      t = !0;
    }
    t && le(e);
  }
  De.clear();
}
function Vr(e, t = 1) {
  var n = Y(e), r = t === 1 ? n++ : n--;
  return U(e, n), r;
}
function me(e) {
  U(e, e.v + 1);
}
function Ft(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var s = Ae(), i = r.length, u = 0; u < i; u++) {
      var a = r[u], l = a.f;
      if (!(!s && a === p)) {
        var f = (l & S) === 0;
        if (f && w(a, t), (l & Ne) !== 0)
          De.add(
            /** @type {Effect} */
            a
          );
        else if ((l & T) !== 0) {
          var _ = (
            /** @type {Derived} */
            a
          );
          N?.delete(_), (l & ie) === 0 && (l & C && (p === null || (p.f & Ie) === 0) && (a.f |= ie), Ft(_, D, n));
        } else if (f) {
          var o = (
            /** @type {Effect} */
            a
          );
          (l & P) !== 0 && q !== null && q.add(o), n !== null ? n.push(o) : st(o);
        }
      }
    }
}
function ye(e) {
  if (typeof e != "object" || e === null || ne in e)
    return e;
  const t = mt(e);
  if (t !== un && t !== on)
    return e;
  var n = /* @__PURE__ */ new Map(), r = rn(e), s = /* @__PURE__ */ $(0), i = se, u = (a) => {
    if (se === i)
      return a();
    var l = v, f = se;
    M(null), gt(i);
    var _ = a();
    return M(l), gt(f), _;
  };
  return r && n.set("length", /* @__PURE__ */ $(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, l, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && bn();
        var _ = n.get(l);
        return _ === void 0 ? u(() => {
          var o = /* @__PURE__ */ $(f.value);
          return n.set(l, o), o;
        }) : U(_, f.value, !0), !0;
      },
      deleteProperty(a, l) {
        var f = n.get(l);
        if (f === void 0) {
          if (l in a) {
            const _ = u(() => /* @__PURE__ */ $(b));
            n.set(l, _), me(s);
          }
        } else
          U(f, b), me(s);
        return !0;
      },
      get(a, l, f) {
        if (l === ne)
          return e;
        var _ = n.get(l), o = l in a;
        if (_ === void 0 && (!o || we(a, l)?.writable) && (_ = u(() => {
          var h = ye(o ? a[l] : b), d = /* @__PURE__ */ $(h);
          return d;
        }), n.set(l, _)), _ !== void 0) {
          var c = Y(_);
          return c === b ? void 0 : c;
        }
        return Reflect.get(a, l, f);
      },
      getOwnPropertyDescriptor(a, l) {
        var f = Reflect.getOwnPropertyDescriptor(a, l);
        if (f && "value" in f) {
          var _ = n.get(l);
          _ && (f.value = Y(_));
        } else if (f === void 0) {
          var o = n.get(l), c = o?.v;
          if (o !== void 0 && c !== b)
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
        if (l === ne)
          return !0;
        var f = n.get(l), _ = f !== void 0 && f.v !== b || Reflect.has(a, l);
        if (f !== void 0 || p !== null && (!_ || we(a, l)?.writable)) {
          f === void 0 && (f = u(() => {
            var c = _ ? ye(a[l]) : b, h = /* @__PURE__ */ $(c);
            return h;
          }), n.set(l, f));
          var o = Y(f);
          if (o === b)
            return !1;
        }
        return _;
      },
      set(a, l, f, _) {
        var o = n.get(l), c = l in a;
        if (r && l === "length")
          for (var h = f; h < /** @type {Source<number>} */
          o.v; h += 1) {
            var d = n.get(h + "");
            d !== void 0 ? U(d, b) : h in a && (d = u(() => /* @__PURE__ */ $(b)), n.set(h + "", d));
          }
        if (o === void 0)
          (!c || we(a, l)?.writable) && (o = u(() => /* @__PURE__ */ $(void 0)), U(o, ye(f)), n.set(l, o));
        else {
          c = o.v !== b;
          var g = u(() => ye(f));
          U(o, g);
        }
        var G = Reflect.getOwnPropertyDescriptor(a, l);
        if (G?.set && G.set.call(_, f), !c) {
          if (r && typeof l == "string") {
            var V = (
              /** @type {Source<number>} */
              n.get("length")
            ), fe = Number(l);
            Number.isInteger(fe) && fe >= V.v && U(V, fe + 1);
          }
          me(s);
        }
        return !0;
      },
      ownKeys(a) {
        Y(s);
        var l = Reflect.ownKeys(a).filter((o) => {
          var c = n.get(o);
          return c === void 0 || c.v !== b;
        });
        for (var [f, _] of n)
          _.v !== b && !(f in a) && l.push(f);
        return l;
      },
      setPrototypeOf() {
        Sn();
      }
    }
  );
}
function dt(e) {
  try {
    if (e !== null && typeof e == "object" && ne in e)
      return e[ne];
  } catch {
  }
  return e;
}
function qr(e, t) {
  return Object.is(dt(e), dt(t));
}
var vt, Kn, jt, Ht;
function Wn() {
  if (vt === void 0) {
    vt = window, Kn = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    jt = we(t, "firstChild").get, Ht = we(t, "nextSibling").get, ot(e) && (e[vn] = void 0, e[dn] = null, e[pn] = void 0, e.__e = void 0), ot(n) && (n[$e] = void 0);
  }
}
function Bt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
  return (
    /** @type {TemplateNode | null} */
    jt.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return (
    /** @type {TemplateNode | null} */
    Ht.call(e)
  );
}
function Ur(e, t) {
  return /* @__PURE__ */ Vt(e);
}
function Yr(e, t = !1) {
  {
    var n = /* @__PURE__ */ Vt(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Be(n) : n;
  }
}
function Gr(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Be(r);
  return r;
}
function $r(e) {
  e.textContent = "";
}
function zr() {
  return !1;
}
function Kr(e, t, n) {
  return t == null || t === nn ? (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  ) : (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e)
  );
}
function Wr(e, t) {
  if (t) {
    const n = document.body;
    e.autofocus = !0, W(() => {
      document.activeElement === n && e.focus();
    });
  }
}
let pt = !1;
function Xn() {
  pt || (pt = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t[Ce]?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Xr(e, t, n, r = !0) {
  r && n();
  for (var s of t)
    e.addEventListener(s, n);
  lt(() => {
    for (var i of t)
      e.removeEventListener(i, n);
  });
}
function Ve(e) {
  var t = v, n = p;
  M(null), O(null);
  try {
    return e();
  } finally {
    M(t), O(n);
  }
}
function Zr(e, t, n, r = n) {
  e.addEventListener(t, () => Ve(n));
  const s = (
    /** @type {any} */
    e[Ce]
  );
  s ? e[Ce] = () => {
    s(), r(!0);
  } : e[Ce] = () => r(!0), Xn();
}
function qt(e) {
  p === null && (v === null && En(), wn()), J && gn();
}
function Zn(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function F(e, t) {
  var n = p;
  n !== null && (n.f & R) !== 0 && (e |= R);
  var r = {
    ctx: E,
    deps: null,
    nodes: null,
    f: e | S | C,
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
  y?.register_created_effect(r);
  var s = r;
  if ((e & ce) !== 0)
    ue !== null ? ue.push(r) : Z.ensure().schedule(r);
  else if (t !== null) {
    try {
      le(r);
    } catch (u) {
      throw j(r), u;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & de) === 0 && (s = s.first, (e & P) !== 0 && (e & be) !== 0 && s !== null && (s.f |= be));
  }
  if (s !== null && (s.parent = n, n !== null && Zn(s, n), v !== null && (v.f & T) !== 0 && (e & X) === 0)) {
    var i = (
      /** @type {Derived} */
      v
    );
    (i.effects ??= []).push(s);
  }
  return r;
}
function it() {
  return v !== null && !I;
}
function lt(e) {
  const t = F(Te, null);
  return w(t, m), t.teardown = e, t;
}
function Jr(e) {
  qt();
  var t = (
    /** @type {Effect} */
    p.f
  ), n = !v && (t & B) !== 0 && E !== null && !E.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      E
    );
    (r.e ??= []).push(e);
  } else
    return Ut(e);
}
function Ut(e) {
  return F(ce | St, e);
}
function Qr(e) {
  return qt(), F(Te | St, e);
}
function Jn(e) {
  Z.ensure();
  const t = F(X | de, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Me(t, () => {
      j(t), r(void 0);
    }) : (j(t), r(void 0));
  });
}
function es(e) {
  return F(ce, e);
}
function ts(e, t) {
  var n = (
    /** @type {ComponentContextLegacy} */
    E
  ), r = { effect: null, ran: !1, deps: e };
  n.l.$.push(r), r.effect = ft(() => {
    if (e(), !r.ran) {
      r.ran = !0;
      var s = (
        /** @type {Effect} */
        p
      );
      try {
        O(s.parent), ut(t);
      } finally {
        O(s);
      }
    }
  });
}
function ns() {
  var e = (
    /** @type {ComponentContextLegacy} */
    E
  );
  ft(() => {
    for (var t of e.l.$) {
      t.deps();
      var n = t.effect;
      (n.f & m) !== 0 && n.deps !== null && w(n, D), ve(n) && le(n), t.ran = !1;
    }
  });
}
function Qn(e) {
  return F(oe | de, e);
}
function ft(e, t = 0) {
  return F(Te | t, e);
}
function rs(e, t = [], n = [], r = []) {
  jn(r, t, n, (s) => {
    F(Te, () => {
      e(...s.map(Y));
    });
  });
}
function er(e, t = 0) {
  var n = F(P | t, e);
  return n;
}
function ss(e, t = 0) {
  var n = F(Qe | t, e);
  return n;
}
function Q(e) {
  return F(B | de, e);
}
function Yt(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = J, r = v;
    yt(!0), M(null);
    try {
      t.call(null);
    } finally {
      yt(n), M(r);
    }
  }
}
function at(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && Ve(() => {
      s.abort(je);
    });
    var r = n.next;
    (n.f & X) !== 0 ? n.parent = null : j(n, t), n = r;
  }
}
function tr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & B) === 0 && j(t), t = n;
  }
}
function j(e, t = !0) {
  var n = !1;
  (t || (e.f & _n) !== 0) && e.nodes !== null && e.nodes.end !== null && (nr(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= ct, at(e, t && !n), Se(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  Yt(e), e.f ^= ct, e.f |= L;
  var s = e.parent;
  s !== null && s.first !== null && Gt(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function nr(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Be(e);
    e.remove(), e = n;
  }
}
function Gt(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Me(e, t, n = !0) {
  var r = [];
  $t(e, r, !0);
  var s = () => {
    n && j(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var u = () => --i || s();
    for (var a of r)
      a.out(u);
  } else
    s();
}
function $t(e, t, n) {
  if ((e.f & R) === 0) {
    e.f ^= R;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var s = e.first; s !== null; ) {
      var i = s.next;
      if ((s.f & X) === 0) {
        var u = (s.f & be) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & B) !== 0 && (e.f & P) !== 0;
        $t(s, t, u ? n : !1);
      }
      s = i;
    }
  }
}
function is(e) {
  zt(e, !0);
}
function zt(e, t) {
  if ((e.f & R) !== 0) {
    e.f ^= R, (e.f & m) === 0 && (w(e, S), Z.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & be) !== 0 || (n.f & B) !== 0;
      zt(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const u of i)
        (u.is_global || t) && u.in();
  }
}
function rr(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ Be(n);
      t.append(n), n = s;
    }
}
let Oe = !1, J = !1;
function yt(e) {
  J = e;
}
let v = null, I = !1;
function M(e) {
  v = e;
}
let p = null;
function O(e) {
  p = e;
}
let H = null;
function Kt(e) {
  v !== null && (H ??= /* @__PURE__ */ new Set()).add(e);
}
let A = null, k = 0, x = null;
function sr(e) {
  x = e;
}
let Wt = 1, te = 0, se = te;
function gt(e) {
  se = e;
}
function Xt() {
  return ++Wt;
}
function ve(e) {
  var t = e.f;
  if ((t & S) !== 0)
    return !0;
  if (t & T && (e.f &= ~ie), (t & D) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (ve(
        /** @type {Derived} */
        i
      ) && Ot(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & C) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    N === null && w(e, m);
  }
  return !1;
}
function Zt(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(H !== null && H.has(e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & T) !== 0 ? Zt(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? w(i, S) : (i.f & m) !== 0 && w(i, D), st(
        /** @type {Effect} */
        i
      ));
    }
}
function Jt(e) {
  var t = A, n = k, r = x, s = v, i = H, u = E, a = I, l = se, f = e.f;
  A = /** @type {null | Value[]} */
  null, k = 0, x = null, v = (f & (B | X)) === 0 ? e : null, H = null, he(e.ctx), I = !1, se = ++te, e.ac !== null && (Ve(() => {
    e.ac.abort(je);
  }), e.ac = null);
  try {
    e.f |= Ie;
    var _ = (
      /** @type {Function} */
      e.fn
    ), o = _();
    e.f |= _e;
    var c = e.deps, h = y?.is_fork;
    if (A !== null) {
      var d;
      if (h || Se(e, k), c !== null && k > 0)
        for (c.length = k + A.length, d = 0; d < A.length; d++)
          c[k + d] = A[d];
      else
        e.deps = c = A;
      if (it() && (e.f & C) !== 0)
        for (d = k; d < c.length; d++)
          (c[d].reactions ??= []).push(e);
    } else !h && c !== null && k < c.length && (Se(e, k), c.length = k);
    if (Ae() && x !== null && !I && c !== null && (e.f & (T | D | S)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      x.length; d++)
        Zt(
          x[d],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (te++, s.deps !== null)
        for (let g = 0; g < n; g += 1)
          s.deps[g].rv = te;
      if (t !== null)
        for (const g of t)
          g.rv = te;
      x !== null && (r === null ? r = x : r.push(.../** @type {Source[]} */
      x));
    }
    return (e.f & K) !== 0 && (e.f ^= K), o;
  } catch (g) {
    return xt(g);
  } finally {
    e.f ^= Ie, A = t, k = n, x = r, v = s, H = i, he(u), I = a, se = l;
  }
}
function ir(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = sn.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & T) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (A === null || !Pe.call(A, t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & C) !== 0 && (i.f ^= C, i.f &= ~ie), i.v !== b && et(i), Un(i), Se(i, 0);
  }
}
function Se(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      ir(e, n[r]);
}
function le(e) {
  var t = e.f;
  if ((t & L) === 0) {
    w(e, m);
    var n = p, r = Oe;
    p = e, Oe = !0;
    try {
      (t & (P | Qe)) !== 0 ? tr(e) : at(e), Yt(e);
      var s = Jt(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = Wt;
      var i;
      Et && Rn && (e.f & S) !== 0 && e.deps;
    } finally {
      Oe = r, p = n;
    }
  }
}
async function ls() {
  await Promise.resolve(), Gn();
}
function Y(e) {
  var t = e.f, n = (t & T) !== 0;
  if (v !== null && !I) {
    var r = p !== null && (p.f & L) !== 0;
    if (!r && (H === null || !H.has(e))) {
      var s = v.deps;
      if ((v.f & Ie) !== 0)
        e.rv < te && (e.rv = te, A === null && s !== null && s[k] === e ? k++ : A === null ? A = [e] : A.push(e));
      else {
        v.deps ??= [], Pe.call(v.deps, e) || v.deps.push(e);
        var i = e.reactions;
        i === null ? e.reactions = [v] : Pe.call(i, v) || i.push(v);
      }
    }
  }
  if (J && re.has(e))
    return re.get(e);
  if (n) {
    var u = (
      /** @type {Derived} */
      e
    );
    if (J) {
      var a = u.v;
      return ((u.f & m) === 0 && u.reactions !== null || en(u)) && (a = nt(u)), re.set(u, a), a;
    }
    var l = (u.f & C) === 0 && !I && v !== null && (Oe || (v.f & C) !== 0), f = (u.f & _e) === 0;
    ve(u) && (l && (u.f |= C), Ot(u)), l && !f && (Pt(u), Qt(u));
  }
  if (N?.has(e))
    return N.get(e);
  if ((e.f & K) !== 0)
    throw e.v;
  return e.v;
}
function Qt(e) {
  if (e.f |= C, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & T) !== 0 && (t.f & C) === 0 && (Pt(
        /** @type {Derived} */
        t
      ), Qt(
        /** @type {Derived} */
        t
      ));
}
function en(e) {
  if (e.v === b) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (re.has(t) || (t.f & T) !== 0 && en(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function ut(e) {
  var t = I;
  try {
    return I = !0, e();
  } finally {
    I = t;
  }
}
function fs(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (ne in e)
      We(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && ne in n && We(n);
      }
  }
}
function We(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        We(e[r], t);
      } catch {
      }
    const n = mt(e);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = an(n);
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
function as(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const lr = [
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
function us(e) {
  return lr.includes(e);
}
const fr = {
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
function os(e) {
  return e = e.toLowerCase(), fr[e] ?? e;
}
const ar = ["touchstart", "touchmove"];
function ur(e) {
  return ar.includes(e);
}
const ge = /* @__PURE__ */ Symbol("events"), tn = /* @__PURE__ */ new Set(), Xe = /* @__PURE__ */ new Set();
function or(e, t, n, r = {}) {
  function s(i) {
    if (r.capture || Ze.call(t, i), !i.cancelBubble)
      return Ve(() => n?.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? W(() => {
    t.addEventListener(e, s, r);
  }) : t.addEventListener(e, s, r), s;
}
function cs(e, t, n, r, s) {
  var i = { capture: r, passive: s }, u = or(e, t, n, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && lt(() => {
    t.removeEventListener(e, u, i);
  });
}
function hs(e, t, n) {
  (t[ge] ??= {})[e] = n;
}
function _s(e) {
  for (var t = 0; t < e.length; t++)
    tn.add(e[t]);
  for (var n of Xe)
    n(e);
}
let wt = null;
function Ze(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = e.composedPath?.() || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  wt = e;
  var u = 0, a = wt === e && e[ge];
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
    l <= f && (u = l);
  }
  if (i = /** @type {Element} */
  s[u] || e.target, i !== t) {
    fn(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var _ = v, o = p;
    M(null), O(null);
    try {
      for (var c, h = []; i !== null && i !== t; ) {
        try {
          var d = i[ge]?.[r];
          d != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && d.call(i, e);
        } catch (g) {
          c ? h.push(g) : c = g;
        }
        if (e.cancelBubble) break;
        u++, i = u < s.length ? (
          /** @type {Element} */
          s[u]
        ) : null;
      }
      if (c) {
        for (let g of h)
          queueMicrotask(() => {
            throw g;
          });
        throw c;
      }
    } finally {
      e[ge] = t, delete e.currentTarget, M(_), O(o);
    }
  }
}
function ds(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[$e] ??= e.nodeValue) && (e[$e] = n, e.nodeValue = `${n}`);
}
function vs(e, t) {
  return cr(e, t);
}
const xe = /* @__PURE__ */ new Map();
function cr(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: u = !0, transformError: a }) {
  Wn();
  var l = void 0, f = Jn(() => {
    var _ = n ?? t.appendChild(Bt());
    Dn(
      /** @type {TemplateNode} */
      _,
      {
        pending: () => {
        }
      },
      (h) => {
        Mn({});
        var d = (
          /** @type {ComponentContext} */
          E
        );
        i && (d.c = i), s && (r.$$events = s), l = e(h, r) || {}, On();
      },
      a
    );
    var o = /* @__PURE__ */ new Set(), c = (h) => {
      for (var d = 0; d < h.length; d++) {
        var g = h[d];
        if (!o.has(g)) {
          o.add(g);
          var G = ur(g);
          for (const qe of [t, document]) {
            var V = xe.get(qe);
            V === void 0 && (V = /* @__PURE__ */ new Map(), xe.set(qe, V));
            var fe = V.get(g);
            fe === void 0 ? (qe.addEventListener(g, Ze, { passive: G }), V.set(g, 1)) : V.set(g, fe + 1);
          }
        }
      }
    };
    return c(ln(tn)), Xe.add(c), () => {
      for (var h of o)
        for (const G of [t, document]) {
          var d = (
            /** @type {Map<string, number>} */
            xe.get(G)
          ), g = (
            /** @type {number} */
            d.get(h)
          );
          --g == 0 ? (G.removeEventListener(h, Ze), d.delete(h), d.size === 0 && xe.delete(G)) : d.set(h, g);
        }
      Xe.delete(c), _ !== n && _.parentNode?.removeChild(_);
    };
  });
  return Je.set(l, f), l;
}
let Je = /* @__PURE__ */ new WeakMap();
function ps(e, t) {
  const n = Je.get(e);
  return n ? (Je.delete(e), n(t)) : Promise.resolve();
}
export {
  vn as $,
  Fe as A,
  Rr as B,
  Ir as C,
  Vn as D,
  be as E,
  ln as F,
  hr as G,
  pr as H,
  ke as I,
  _r as J,
  L as K,
  R as L,
  B as M,
  $r as N,
  Be as O,
  dr as P,
  W as Q,
  vr as R,
  rs as S,
  br as T,
  nr as U,
  Tr as V,
  Ar as W,
  es as X,
  ft as Y,
  fs as Z,
  ss as _,
  U as a,
  pn as a0,
  Dr as a1,
  qr as a2,
  Zr as a3,
  dn as a4,
  nn as a5,
  jn as a6,
  kr as a7,
  Nr as a8,
  as as a9,
  mr as aA,
  J as aB,
  Mr as aC,
  xr as aD,
  $ as aE,
  Fr as aF,
  ts as aG,
  ns as aH,
  Yr as aI,
  On as aJ,
  Mn as aK,
  Gr as aL,
  cs as aM,
  Br as aN,
  Ur as aO,
  jr as aP,
  ds as aQ,
  Vr as aR,
  vs as aS,
  ps as aT,
  hs as aa,
  _s as ab,
  or as ac,
  Wr as ad,
  os as ae,
  b as af,
  Or as ag,
  us as ah,
  an as ai,
  ls as aj,
  Xr as ak,
  E as al,
  ct as am,
  ne as an,
  Qr as ao,
  Jr as ap,
  Cr as aq,
  tt as ar,
  we as as,
  Lr as at,
  wr as au,
  ye as av,
  Er as aw,
  He as ax,
  gr as ay,
  yr as az,
  Y as b,
  Kr as c,
  fn as d,
  Bt as e,
  Vt as f,
  mt as g,
  Kn as h,
  rn as i,
  p as j,
  Sr as k,
  is as l,
  Hr as m,
  cn as n,
  un as o,
  j as p,
  Me as q,
  hn as r,
  Cn as s,
  lt as t,
  ut as u,
  Q as v,
  y as w,
  rr as x,
  zr as y,
  er as z
};
