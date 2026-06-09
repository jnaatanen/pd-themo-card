/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, ot = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), xt = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ot && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Nt = (s) => new Pt(typeof s == "string" ? s : s + "", void 0, nt), C = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new Pt(e, s, nt);
}, Rt = (s, t) => {
  if (ot) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = G.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, yt = ot ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Nt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qt, defineProperty: jt, getOwnPropertyDescriptor: Bt, getOwnPropertyNames: Lt, getOwnPropertySymbols: Wt, getPrototypeOf: Ft } = Object, $ = globalThis, $t = $.trustedTypes, Vt = $t ? $t.emptyScript : "", tt = $.reactiveElementPolyfillSupport, N = (s, t) => s, J = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Vt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, at = (s, t) => !qt(s, t), _t = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: at };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = _t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && jt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = Bt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const l = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = Ft(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const e = this.properties, i = [...Lt(e), ...Wt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(yt(r));
    } else t !== void 0 && e.push(yt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : J).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const l = i.getPropertyOptions(r), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : J;
      this._$Em = r;
      const c = a.fromAttribute(e, l.type);
      this[r] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, o) {
    var n;
    if (t !== void 0) {
      const l = this.constructor;
      if (r === !1 && (o = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? at)(o, e) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) {
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[N("elementProperties")] = /* @__PURE__ */ new Map(), O[N("finalized")] = /* @__PURE__ */ new Map(), tt == null || tt({ ReactiveElement: O }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, wt = (s) => s, K = R.trustedTypes, At = K ? K.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ot = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Mt = "?" + y, Zt = `<${Mt}>`, k = document, q = () => k.createComment(""), j = (s) => s === null || typeof s != "object" && typeof s != "function", lt = Array.isArray, Gt = (s) => lt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", et = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zt = /-->/g, Et = />/g, A = RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), kt = /'/g, St = /"/g, It = /^(?:script|style|textarea|title)$/i, Dt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), h = Dt(1), Jt = Dt(2), M = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), z = k.createTreeWalker(k, 129);
function Ht(s, t) {
  if (!lt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return At !== void 0 ? At.createHTML(t) : t;
}
const Kt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = U;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let c, p, d = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, p = n.exec(a), p !== null); ) f = n.lastIndex, n === U ? p[1] === "!--" ? n = zt : p[1] !== void 0 ? n = Et : p[2] !== void 0 ? (It.test(p[2]) && (r = RegExp("</" + p[2], "g")), n = A) : p[3] !== void 0 && (n = A) : n === A ? p[0] === ">" ? (n = r ?? U, d = -1) : p[1] === void 0 ? d = -2 : (d = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? A : p[3] === '"' ? St : kt) : n === St || n === kt ? n = A : n === zt || n === Et ? n = U : (n = A, r = void 0);
    const g = n === A && s[l + 1].startsWith("/>") ? " " : "";
    o += n === U ? a + Zt : d >= 0 ? (i.push(c), a.slice(0, d) + Ot + a.slice(d) + y + g) : a + y + (d === -2 ? l : g);
  }
  return [Ht(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [c, p] = Kt(t, e);
    if (this.el = B.createElement(c, i), z.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = z.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Ot)) {
          const f = p[n++], g = r.getAttribute(d).split(y), w = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: w[2], strings: g, ctor: w[1] === "." ? Xt : w[1] === "?" ? Yt : w[1] === "@" ? te : Q }), r.removeAttribute(d);
        } else d.startsWith(y) && (a.push({ type: 6, index: o }), r.removeAttribute(d));
        if (It.test(r.tagName)) {
          const d = r.textContent.split(y), f = d.length - 1;
          if (f > 0) {
            r.textContent = K ? K.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(d[g], q()), z.nextNode(), a.push({ type: 2, index: ++o });
            r.append(d[f], q());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Mt) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(y, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += y.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function I(s, t, e = s, i) {
  var n, l;
  if (t === M) return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = j(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = I(s, r._$AS(s, t.values), r, i)), t;
}
class Qt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    z.currentNode = r;
    let o = z.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new W(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new ee(o, this, t)), this._$AV.push(c), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = z.nextNode(), n++);
    }
    return z.currentNode = k, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class W {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = I(this, t, e), j(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== M && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = B.createElement(Ht(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new Qt(r, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Ct.get(t.strings);
    return e === void 0 && Ct.set(t.strings, e = new B(t)), e;
  }
  k(t) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new W(this.O(q()), this.O(q()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = wt(t).nextSibling;
      wt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = I(this, t, e, 0), n = !j(t) || t !== this._$AH && t !== M, n && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = I(this, l[i + a], e, a), c === M && (c = this._$AH[a]), n || (n = !j(c) || c !== this._$AH[a]), c === u ? t = u : t !== u && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Yt extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class te extends Q {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = I(this, t, e, 0) ?? u) === M) return;
    const i = this._$AH, r = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ee {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const st = R.litHtmlPolyfillSupport;
st == null || st(B, W), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.3");
const se = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new W(t.insertBefore(q(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class b extends O {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return M;
  }
}
var Tt;
b._$litElement$ = !0, b.finalized = !0, (Tt = E.litElementHydrateSupport) == null || Tt.call(E, { LitElement: b });
const it = E.litElementPolyfillSupport;
it == null || it({ LitElement: b });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: at }, re = (s = ie, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(s) {
  return (t, e) => typeof e == "object" ? re(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ct(s) {
  return m({ ...s, state: !0, attribute: !1 });
}
const V = C`
  :host {
    --bg:#0f1722; --surface:#1a2433; --surface-2:#131d2a; --surface-3:#213044;
    --border:rgba(255,255,255,0.08); --border-2:rgba(255,255,255,0.14);
    --fg:#e8eef5; --fg-soft:#b6c3d2; --muted:#6a7a8f; --muted-2:#4a5b73;
    --accent:#03a9f4; --accent-2:#0288d1; --heat:#ff7043; --heat-soft:rgba(255,112,67,0.14);
    --cool:#4fc3f7; --ok:#66bb6a; --warn:#ffb74d; --danger:#ef5350;
    --font-sans:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',system-ui,sans-serif;
    --font-mono:'JetBrains Mono','IBM Plex Mono',ui-monospace,Menlo,monospace;
    display:block;
    color:var(--fg); font-family:var(--font-sans); font-size:14px; line-height:1.5;
    font-variant-numeric:tabular-nums;
  }
  * { box-sizing:border-box; }
`;
function oe(s) {
  if (s.entities !== void 0) {
    if (!Array.isArray(s.entities) || s.entities.length === 0)
      throw new Error("themo-card: 'entities' must be a non-empty list of climate entities");
    for (const i of s.entities)
      if (typeof i != "string" || !i.startsWith("climate."))
        throw new Error(`themo-card: 'entities' must contain only climate.* (got ${i})`);
  }
  const t = s.step ?? 0.5;
  if (typeof t != "number" || t <= 0)
    throw new Error("themo-card: 'step' must be a positive number");
  const e = s.quick_actions ?? [];
  return {
    type: s.type,
    title: s.title ?? "Themo Heating",
    entities: s.entities,
    default_zone: s.default_zone,
    step: t,
    sun_entity: s.sun_entity,
    energy: s.energy,
    quick_actions: e
  };
}
const ne = 84, rt = 2 * Math.PI * ne;
function ae(s, t, e) {
  if (s === null || e <= t) return rt;
  const i = Math.min(1, Math.max(0, (s - t) / (e - t)));
  return rt * (1 - i);
}
function le(s, t, e, i) {
  const r = Math.round(s / i) * i, o = Math.min(e, Math.max(t, r)), n = (String(i).split(".")[1] || "").length;
  return Number(o.toFixed(n));
}
function ce(s, t) {
  var n, l;
  const e = (n = s.entities) == null ? void 0 : n[t], i = e == null ? void 0 : e.device_id;
  if (!i) return null;
  const r = (l = s.devices) == null ? void 0 : l[i], o = (r == null ? void 0 : r.identifiers) ?? [];
  for (const a of o)
    if (a[0] === "pd_hathemo") {
      const c = parseInt(a[1], 10);
      return Number.isNaN(c) ? null : c;
    }
  return null;
}
const de = { off: "off", heat: "heat", auto: "auto" };
function v(s) {
  if (s == null || s === "" || s === "unknown" || s === "unavailable") return null;
  const t = Number(s);
  return Number.isNaN(t) ? null : t;
}
function pe(s, t) {
  if (t) return t;
  const e = s.entities ?? {};
  return Object.keys(e).filter((i) => {
    var r;
    return i.startsWith("climate.") && ((r = e[i]) == null ? void 0 : r.platform) === "pd_hathemo";
  }).sort();
}
function P(s, t, e, i, r = !1) {
  var n;
  if (!t) return null;
  const o = s.entities ?? {};
  for (const l of Object.keys(o))
    if (((n = o[l]) == null ? void 0 : n.device_id) === t && l.startsWith(e + ".") && (r ? l.endsWith("_" + i) : l.includes(i)))
      return l;
  return null;
}
function he(s, t, e) {
  var g, w, pt, ht, ut, mt, ft, gt, vt;
  const i = s.states[t];
  if (!i) return null;
  const r = i.attributes, o = (w = (g = s.entities) == null ? void 0 : g[t]) == null ? void 0 : w.device_id, n = P(s, o, "sensor", "room_temperature"), l = P(s, o, "sensor", "floor_temperature"), a = P(s, o, "sensor", "outside_temperature"), c = P(s, o, "binary_sensor", "heating"), p = P(s, o, "light", "backlight"), d = P(s, o, "sensor", "heating_today", !0), f = (bt) => bt ? s.states[bt] : void 0;
  return {
    climateEntityId: t,
    name: r.friendly_name ?? t,
    currentTemp: v(r.current_temperature),
    targetTemp: v(r.temperature),
    mode: de[i.state] ?? "off",
    heating: (r.hvac_action ?? ((pt = f(c)) == null ? void 0 : pt.state)) === "heating" || ((ht = f(c)) == null ? void 0 : ht.state) === "on",
    minTemp: v(r.min_temp) ?? 5,
    maxTemp: v(r.max_temp) ?? 35,
    step: v(r.target_temp_step) ?? e,
    roomTemp: v((ut = f(n)) == null ? void 0 : ut.state),
    floorTemp: v((mt = f(l)) == null ? void 0 : mt.state),
    outsideTemp: v((ft = f(a)) == null ? void 0 : ft.state),
    heatingTodayPct: v((gt = f(d)) == null ? void 0 : gt.state),
    backlightEntityId: p,
    backlightOn: p ? ((vt = f(p)) == null ? void 0 : vt.state) === "on" : null,
    themoDeviceId: ce(s, t),
    presetModes: Array.isArray(r.preset_modes) ? r.preset_modes : [],
    presetMode: r.preset_mode ?? null
  };
}
function ue(s) {
  return s ? s.schedules.find((t) => t.active) ?? null : null;
}
function Ut(s, t) {
  const e = s.setpoints.filter((n) => n.day === t).sort((n, l) => n.hour - l.hour), i = new Array(24).fill(null);
  if (e.length === 0) return i;
  let r = null, o = 0;
  for (let n = 0; n < 24; n++) {
    for (; o < e.length && e[o].hour === n; )
      r = e[o].value, o++;
    i[n] = r;
  }
  return i;
}
function me(s, t, e) {
  const i = Ut(s, t), r = i[e];
  for (let o = e + 1; o < 24; o++)
    if (i[o] !== null && i[o] !== r) return { hour: o, value: i[o] };
  return null;
}
class fe {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  get(t, e) {
    const i = this.cache.get(e);
    if (i) return i;
    const r = this.fetch(t, e);
    return this.cache.set(e, r), r;
  }
  invalidate(t) {
    this.cache.delete(t);
  }
  async fetch(t, e) {
    try {
      return { schedules: (await t.connection.sendMessagePromise(
        { type: "pd_hathemo/schedules", device_id: e }
      )).schedules };
    } catch {
      return this.cache.delete(e), null;
    }
  }
}
function ge(s, t, e) {
  return s.callService("climate", "set_temperature", { entity_id: t, temperature: e });
}
function ve(s, t, e) {
  return s.callService("climate", "set_hvac_mode", { entity_id: t, hvac_mode: e });
}
function be(s, t, e) {
  return s.callService("climate", "set_preset_mode", { entity_id: t, preset_mode: e });
}
function xe(s, t, e) {
  return s.callService("light", e ? "turn_off" : "turn_on", { entity_id: t });
}
function ye(s, t) {
  const [e, i] = t.service.split(".", 2);
  return s.callService(e, i, t.service_data ?? {});
}
const X = C`
  /* ----------- HA card primitives ----------- */
  .ha-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }
  .ha-card.small { padding: 16px; }
  .ha-card .card-head {
    padding: 18px 22px 14px;
    display: flex; align-items: center; gap: 14px;
    border-bottom: 1px solid var(--border);
  }
  .ha-card .card-head .h-title {
    font-size: 15px; font-weight: 500; letter-spacing: -0.005em;
  }
  .ha-card .card-head .h-sub {
    color: var(--muted); font-size: 12px;
  }
  .ha-card .card-head .spacer { flex: 1; }

  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    height: 24px; padding: 0 10px;
    border-radius: 999px;
    background: var(--surface-3);
    border: 1px solid var(--border);
    color: var(--fg-soft);
    font-size: 11px; letter-spacing: 0.04em;
    font-family: var(--font-mono);
    text-transform: uppercase;
  }
  .pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
  .pill.heat { color: var(--heat); background: var(--heat-soft); border-color: rgba(255,112,67,0.3); }
  .pill.heat .dot { background: var(--heat); box-shadow: 0 0 0 4px rgba(255,112,67,0.18); animation: pulse 1.6s ease-in-out infinite; }
  .pill.ok { color: var(--ok); }
  .pill.cool { color: var(--cool); }
  .pill.outside { color: var(--fg-soft); }
  .pill.outside .dot { background: var(--cool); }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,112,67,0.4); }
    50% { box-shadow: 0 0 0 6px rgba(255,112,67,0); }
  }

  /* ----------- Themo card overview ----------- */
  .themo-overview .strip {
    padding: 14px 22px;
    display: flex; gap: 18px;
    border-bottom: 1px solid var(--border);
    background: var(--surface-2);
    align-items: center;
  }
  .strip .stat {
    display: flex; flex-direction: column;
    border-right: 1px solid var(--border);
    padding-right: 18px;
    min-width: 0;
  }
  .strip .stat:last-of-type { border-right: 0; }
  .strip .stat .label {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted); font-family: var(--font-mono);
    margin-bottom: 4px;
  }
  .strip .stat .val {
    font-size: 18px; color: var(--fg);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }
  .strip .stat .val .unit { font-size: 12px; color: var(--muted); margin-left: 2px; }
  .strip .stat .val .delta { font-size: 11px; color: var(--ok); margin-left: 8px; font-family: var(--font-mono); }

  .zones {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
  }
  .zone {
    background: var(--surface);
    padding: 18px 18px 16px;
    cursor: pointer;
    transition: background .12s;
    position: relative;
  }
  .zone:hover { background: #1d2839; }
  .zone.active-detail {
    background: linear-gradient(180deg, rgba(3,169,244,0.06), transparent 60%);
    box-shadow: inset 2px 0 0 var(--accent);
  }
  .zone.heating::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--heat), transparent);
    opacity: 0.7;
    animation: heatline 2.2s ease-in-out infinite;
  }
  @keyframes heatline {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.9; }
  }

  .zone-head {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 12px;
  }
  .zone-name { font-size: 13px; font-weight: 500; letter-spacing: -0.005em; flex: 1; }
  .zone-entity {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted-2);
    margin-top: 2px;
  }
  .zone-temp {
    display: flex; align-items: baseline; gap: 8px;
    margin-bottom: 8px;
  }
  .zone-temp .now {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }
  .zone-temp .now .unit {
    font-size: 14px; color: var(--muted); font-weight: 400; margin-left: 2px;
  }
  .zone-temp .target {
    font-size: 12px;
    color: var(--fg-soft);
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
  }
  .zone-temp .target .arrow { color: var(--muted); margin: 0 4px; }
  .zone-meta {
    display: flex; align-items: center; gap: 8px;
    color: var(--muted); font-size: 11px;
    font-family: var(--font-mono); letter-spacing: 0.03em;
    margin-bottom: 12px; min-height: 14px;
  }
  .zone-meta .sep { color: var(--muted-2); }
  .zone-foot {
    display: flex; align-items: center; gap: 6px;
  }
  .mode-pill {
    height: 22px; padding: 0 10px;
    border-radius: 999px;
    border: 1px solid var(--border-2);
    background: transparent;
    color: var(--fg-soft);
    font-size: 10px; letter-spacing: 0.12em;
    font-family: var(--font-mono);
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 5px;
  }
  .mode-pill .swatch { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
  .mode-pill.heat { color: var(--heat); border-color: rgba(255,112,67,0.45); }
  .mode-pill.heat .swatch { background: var(--heat); }
  .mode-pill.auto { color: var(--accent); border-color: rgba(3,169,244,0.4); }
  .mode-pill.auto .swatch { background: var(--accent); }
  .mode-pill.off { color: var(--muted); }

  .quick-actions {
    padding: 16px 22px;
    border-top: 1px solid var(--border);
    background: var(--surface-2);
    display: flex; align-items: center; gap: 10px;
    flex-wrap: wrap;
  }
  .qa-label {
    font-size: 10px; color: var(--muted);
    letter-spacing: 0.16em; text-transform: uppercase;
    font-family: var(--font-mono);
    margin-right: 6px;
  }
  .qa-chip {
    height: 32px; padding: 0 14px;
    border-radius: 999px;
    background: var(--surface-3);
    border: 1px solid var(--border-2);
    color: var(--fg-soft);
    font-size: 12px;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px;
    font-family: inherit;
    transition: background .12s, color .12s, border-color .12s;
  }
  .qa-chip:hover { background: #28354b; color: var(--fg); border-color: var(--accent); }
  .qa-chip.active { background: rgba(255,112,67,0.16); color: var(--heat); border-color: rgba(255,112,67,0.5); }
  .qa-chip .svg-ic { width: 14px; height: 14px; opacity: 0.85; }
  .qa-chip .kbd {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 1px 4px;
    background: rgba(0,0,0,0.2);
  }

  .daily-bar {
    padding: 16px 22px;
    border-top: 1px solid var(--border);
    display: grid; grid-template-columns: 130px 1fr 64px;
    gap: 16px;
    align-items: center;
  }
  .daily-bar .lbl {
    font-size: 10px; color: var(--muted);
    letter-spacing: 0.14em; text-transform: uppercase;
    font-family: var(--font-mono);
  }
  .daily-bar .bar {
    height: 6px; border-radius: 999px;
    background: var(--surface-2);
    overflow: hidden;
    position: relative;
  }
  .daily-bar .bar::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 9.99%, var(--border) 9.99%, var(--border) 10%);
    pointer-events: none;
  }
  .daily-bar .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--heat), #ffb74d);
    width: 38%;
    border-radius: 999px;
  }
  .daily-bar .pct {
    text-align: right;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--fg);
    letter-spacing: 0.02em;
  }
  .daily-bar .pct .small { color: var(--muted); font-size: 10px; }

  /* ----------- Detail card (right column) ----------- */
  .detail-head {
    padding: 22px 24px 18px;
    border-bottom: 1px solid var(--border);
  }
  .detail-eyebrow {
    color: var(--muted); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase;
    font-family: var(--font-mono);
    margin-bottom: 6px;
  }
  .detail-title {
    font-size: 22px; letter-spacing: -0.015em;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .detail-entity {
    font-family: var(--font-mono);
    font-size: 11px; color: var(--muted);
    letter-spacing: 0.02em;
  }

  .ring-stage {
    padding: 28px 24px 8px;
    display: grid; grid-template-columns: 220px 1fr;
    gap: 22px;
    align-items: center;
  }
  .ring {
    position: relative; width: 220px; height: 220px;
    display: grid; place-items: center;
  }
  .ring svg { width: 100%; height: 100%; }
  .ring .ring-num {
    position: absolute;
    inset: 0;
    display: grid; place-items: center;
    text-align: center;
  }
  .ring .now-big {
    font-size: 60px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .ring .now-big .unit { font-size: 22px; color: var(--muted); margin-left: 2px; font-weight: 300; }
  .ring .now-cap {
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing: 0.18em;
    color: var(--muted); text-transform: uppercase;
    margin-top: 8px;
  }
  .target-col { display: flex; flex-direction: column; gap: 14px; }
  .target-col .label {
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted);
  }
  .stepper {
    display: grid; grid-template-columns: 44px 1fr 44px;
    height: 56px;
    border-radius: 12px;
    border: 1px solid var(--border-2);
    overflow: hidden;
    background: var(--surface-2);
  }
  .stepper button {
    border: 0; background: transparent;
    color: var(--fg-soft);
    font-size: 22px; line-height: 1;
    cursor: pointer;
    font-family: var(--font-sans);
    transition: background .12s, color .12s;
  }
  .stepper button:hover { background: rgba(3,169,244,0.1); color: var(--accent); }
  .stepper .val {
    display: grid; place-items: center;
    font-family: var(--font-mono);
    font-size: 24px;
    letter-spacing: 0.01em;
    color: var(--fg);
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .stepper .val .unit {
    font-size: 12px; color: var(--muted); margin-left: 2px;
  }

  .mode-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 0 24px;
    margin-top: 18px;
  }
  .mode-tile {
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    border-radius: 12px;
    padding: 14px 12px;
    display: flex; flex-direction: column;
    align-items: flex-start; gap: 8px;
    cursor: pointer;
    transition: border-color .12s, background .12s;
    color: var(--fg-soft);
  }
  .mode-tile:hover { border-color: var(--accent); }
  .mode-tile.selected {
    border-color: var(--heat);
    background: linear-gradient(180deg, rgba(255,112,67,0.1), transparent 80%);
    color: var(--fg);
  }
  .mode-tile .ic { width: 22px; height: 22px; }
  .mode-tile .name { font-size: 13px; font-weight: 500; }
  .mode-tile .desc { font-size: 11px; color: var(--muted); }
  .mode-tile.selected .desc { color: var(--fg-soft); }

  .detail-grid {
    padding: 22px 24px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .kv {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    background: var(--surface-2);
  }
  .kv .k {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .kv .v {
    font-size: 16px; color: var(--fg);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.005em;
  }
  .kv .v .unit { font-size: 11px; color: var(--muted); margin-left: 2px; }
  .kv .sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .schedule {
    padding: 22px 24px;
    border-top: 1px solid var(--border);
  }
  .schedule-head {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
  }
  .schedule-head .title { font-size: 13px; font-weight: 500; }
  .schedule-head .next {
    margin-left: auto;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--muted); letter-spacing: 0.04em;
  }
  .schedule-head .next strong { color: var(--accent); font-weight: 500; }
  .heatmap {
    display: grid; grid-template-columns: 36px 1fr;
    gap: 6px;
    align-items: center;
  }
  .heatmap .hour-row {
    display: grid; grid-template-columns: repeat(24, 1fr);
    gap: 2px;
    height: 18px;
  }
  .heatmap .hour-row .cell {
    border-radius: 2px;
    background: rgba(255,255,255,0.05);
  }
  .heatmap .hour-row .cell[data-h="1"] { background: rgba(255,112,67,0.25); }
  .heatmap .hour-row .cell[data-h="2"] { background: rgba(255,112,67,0.5); }
  .heatmap .hour-row .cell[data-h="3"] { background: rgba(255,112,67,0.78); }
  .heatmap .hour-row .cell[data-now] { box-shadow: inset 0 0 0 1.5px var(--accent); }
  .heatmap .row-lbl {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--muted); letter-spacing: 0.04em;
    text-align: right;
  }
  .hour-axis {
    grid-column: 2;
    display: grid; grid-template-columns: repeat(24, 1fr);
    gap: 2px;
    margin-top: 4px;
    font-family: var(--font-mono);
    font-size: 9px; color: var(--muted-2);
    letter-spacing: 0.02em;
  }
  .hour-axis span { text-align: center; }
  .hour-axis span:not(:nth-child(6n+1)) { visibility: hidden; }

  /* ----------- Side cards (right column extras) ----------- */
  .right-col { display: flex; flex-direction: column; gap: 18px; }

  .glance .glance-row {
    display: flex; align-items: center; gap: 14px;
  }
  .glance .icon-circle {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: grid; place-items: center;
    background: rgba(3,169,244,0.12);
    color: var(--accent);
  }
  .glance .icon-circle.warm { background: rgba(255,112,67,0.14); color: var(--heat); }
  .glance .glance-row .big {
    font-size: 22px; font-weight: 300;
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
  }
  .glance .glance-row .big .unit { font-size: 12px; color: var(--muted); }
  .glance .glance-row .sub { font-size: 11px; color: var(--muted); font-family: var(--font-mono); letter-spacing: 0.02em; }

  .legend {
    padding: 12px 18px;
    display: flex; gap: 16px;
    border-top: 1px solid var(--border);
    background: var(--surface-2);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .legend .li { display: inline-flex; align-items: center; gap: 6px; }
  .legend .sw { width: 10px; height: 10px; border-radius: 3px; }

  /* ----------- Misc ----------- */
  a { color: inherit; text-decoration: none; }
  ::selection { background: rgba(3,169,244,0.3); color: var(--fg); }
`;
var $e = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, dt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? _e(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && $e(t, e, r), r;
};
const we = { off: "Off", heat: "Heat", auto: "Auto" };
let L = class extends b {
  constructor() {
    super(...arguments), this.selected = !1;
  }
  select() {
    this.dispatchEvent(new CustomEvent("zone-select", {
      detail: { entityId: this.zone.climateEntityId },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const s = this.zone, t = ["zone", s.heating ? "heating" : "", this.selected ? "active-detail" : ""].join(" ");
    return h`
      <div class="${t}" @click=${() => this.select()}>
        <div class="zone-head">
          <div>
            <div class="zone-name">${s.name}</div>
            <div class="zone-entity">${s.climateEntityId}</div>
          </div>
        </div>
        <div class="zone-temp">
          <div class="now">${s.currentTemp ?? "—"}<span class="unit">°</span></div>
          <div class="target">→ <span>${s.targetTemp ?? "—"}°</span></div>
        </div>
        <div class="zone-meta">${s.heating ? "heating" : "idle"}${s.heatingTodayPct !== null ? ` · ${s.heatingTodayPct}% today` : ""}</div>
        <div class="zone-foot">
          <button class="mode-pill ${s.mode}"><span class="swatch"></span>${we[s.mode]}</button>
        </div>
      </div>`;
  }
};
L.styles = [V, X, C`:host{display:contents;}`];
dt([
  m({ attribute: !1 })
], L.prototype, "zone", 2);
dt([
  m({ type: Boolean })
], L.prototype, "selected", 2);
L = dt([
  F("themo-zone-tile")
], L);
var Ae = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, T = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ze(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Ae(t, e, r), r;
};
let x = class extends b {
  constructor() {
    super(...arguments), this.zones = [], this.selectedId = "", this.title = "Themo Heating", this.quickActions = [], this.outsideText = null, this.sunText = null;
  }
  get activeCount() {
    return this.zones.filter((s) => s.heating).length;
  }
  get houseAvg() {
    const s = this.zones.map((t) => t.currentTemp).filter((t) => t !== null);
    return s.length ? Math.round(s.reduce((t, e) => t + e, 0) / s.length * 10) / 10 : null;
  }
  render() {
    const s = this.activeCount > 0;
    return h`
      <section class="ha-card themo-overview">
        <div class="card-head">
          <div>
            <div class="h-title">${this.title}</div>
            <div class="h-sub">${this.zones.length} thermostats · pd_hathemo</div>
          </div>
          <div class="spacer"></div>
          ${s ? h`<span class="pill heat"><span class="dot"></span>Heating now</span>` : ""}
          ${this.outsideText ? h`<span class="pill outside"><span class="dot"></span>Outside ${this.outsideText}</span>` : ""}
        </div>

        <div class="strip">
          <div class="stat"><div class="label">Active zones</div><div class="val">${this.activeCount}<span class="unit">/ ${this.zones.length}</span></div></div>
          <div class="stat"><div class="label">House avg</div><div class="val">${this.houseAvg ?? "—"}<span class="unit">°C</span></div></div>
          ${this.sunText ? h`<div class="stat"><div class="label">Sunrise → Sunset</div><div class="val">${this.sunText}</div></div>` : ""}
        </div>

        <div class="zones">
          ${this.zones.map((t) => h`
            <themo-zone-tile .zone=${t} ?selected=${t.climateEntityId === this.selectedId}></themo-zone-tile>`)}
        </div>

        ${this.quickActions.length ? h`
          <div class="quick-actions">
            <span class="qa-label">Quick actions</span>
            ${this.quickActions.map((t) => h`
              <button class="qa-chip" @click=${() => this.dispatchEvent(new CustomEvent("quick-action", { detail: { action: t }, bubbles: !0, composed: !0 }))}>${t.name}</button>`)}
          </div>` : ""}

        <div class="legend">
          <div class="li"><span class="sw" style="background:var(--heat)"></span>Heating</div>
          <div class="li"><span class="sw" style="background:var(--accent)"></span>Auto</div>
          <div class="li"><span class="sw" style="background:var(--muted)"></span>Off</div>
        </div>
      </section>`;
  }
};
x.styles = [V, X, C`:host{display:block;}`];
T([
  m({ attribute: !1 })
], x.prototype, "zones", 2);
T([
  m()
], x.prototype, "selectedId", 2);
T([
  m()
], x.prototype, "title", 2);
T([
  m({ attribute: !1 })
], x.prototype, "quickActions", 2);
T([
  m()
], x.prototype, "outsideText", 2);
T([
  m()
], x.prototype, "sunText", 2);
x = T([
  F("themo-overview")
], x);
var Ee = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, H = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ke(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Ee(t, e, r), r;
};
const Se = [
  { mode: "off", name: "Off", desc: "power off" },
  { mode: "heat", name: "Heat", desc: "manual setpoint" },
  { mode: "auto", name: "Auto", desc: "follow schedule" }
];
let _ = class extends b {
  constructor() {
    super(...arguments), this.todayRow = null, this.nextChange = null, this.nowHour = 0, this.step = 0.5;
  }
  emit(s, t) {
    this.dispatchEvent(new CustomEvent(s, { detail: t, bubbles: !0, composed: !0 }));
  }
  bump(s) {
    const t = this.zone, e = t.targetTemp ?? t.minTemp, i = le(e + s, t.minTemp, t.maxTemp, t.step);
    this.emit("setpoint-change", { temperature: i });
  }
  render() {
    const s = this.zone, t = ae(s.currentTemp, s.minTemp, s.maxTemp), e = s.presetModes.length > 0;
    return h`
      <section class="ha-card themo-detail">
        <div class="detail-head">
          <div class="detail-eyebrow">Selected zone</div>
          <div class="detail-title">${s.name}</div>
          <div class="detail-entity">${s.climateEntityId}</div>
        </div>

        <div class="ring-stage">
          <div class="ring">
            ${Jt`<svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle cx="100" cy="100" r="84" fill="none" stroke="var(--heat)" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="${rt}" stroke-dashoffset="${t}"
                transform="rotate(-90 100 100)"/>
            </svg>`}
            <div class="ring-num"><div>
              <div class="now-big">${s.currentTemp ?? "—"}<span class="unit">°C</span></div>
              <div class="now-cap">Room temp</div>
            </div></div>
          </div>
          <div class="target-col">
            <div>
              <div class="label">Setpoint</div>
              <div class="stepper">
                <button data-step-dn @click=${() => this.bump(-s.step)} ?disabled=${s.mode !== "heat"}>−</button>
                <div class="val"><span>${s.targetTemp ?? "—"}</span><span class="unit">°C</span></div>
                <button data-step-up @click=${() => this.bump(s.step)} ?disabled=${s.mode !== "heat"}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mode-row">
          ${Se.map((i) => h`
            <div class="mode-tile ${s.mode === i.mode ? "selected" : ""}" data-mode=${i.mode}
              @click=${() => this.emit("mode-change", { mode: i.mode })}>
              <div><div class="name">${i.name}</div><div class="desc">${i.desc}</div></div>
            </div>`)}
        </div>

        <div class="detail-grid">
          <div class="kv"><div class="k">Room sensor</div><div class="v">${s.roomTemp ?? "—"}<span class="unit">°C</span></div></div>
          <div class="kv"><div class="k">Heating action</div><div class="v" style="color:var(--heat)">${s.heating ? "Active" : "Idle"}</div></div>
          <div class="kv"><div class="k">Daily heating</div><div class="v">${s.heatingTodayPct ?? "—"}<span class="unit">%</span></div></div>
          <div class="kv" data-backlight style="cursor:pointer"
            @click=${() => s.backlightEntityId && this.emit("backlight-toggle", {})}>
            <div class="k">Backlight</div>
            <div class="v" style="color:var(--accent)">${s.backlightOn === null ? "—" : s.backlightOn ? "On" : "Off"}</div>
          </div>
        </div>

        ${e ? this.renderSchedule(s) : ""}
      </section>`;
  }
  renderSchedule(s) {
    const t = this.todayRow ?? new Array(24).fill(null), e = Math.max(...t.map((r) => r ?? 0), 1), i = (r) => r === null ? 0 : Math.ceil(r / e * 3);
    return h`
      <div class="schedule">
        <div class="schedule-head">
          <div class="title">Today's schedule</div>
          <div class="next">${this.nextChange ? h`Next change <strong>${String(this.nextChange.hour).padStart(2, "0")}:00 → ${this.nextChange.value}°</strong>` : "No further changes today"}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${s.presetModes.map((r) => h`
            <button class="qa-chip ${s.presetMode === r ? "active" : ""}" data-preset=${r}
              @click=${() => this.emit("preset-change", { preset: r })}>${r}</button>`)}
        </div>
        <div class="heatmap">
          <div class="row-lbl">Today</div>
          <div class="hour-row">
            ${t.map((r, o) => h`<div class="cell"
              data-h=${i(r) || ""} ?data-now=${o === this.nowHour}></div>`)}
          </div>
        </div>
      </div>`;
  }
};
_.styles = [V, X, C`:host{display:block;}`];
H([
  m({ attribute: !1 })
], _.prototype, "zone", 2);
H([
  m({ attribute: !1 })
], _.prototype, "todayRow", 2);
H([
  m({ attribute: !1 })
], _.prototype, "nextChange", 2);
H([
  m({ type: Number })
], _.prototype, "nowHour", 2);
H([
  m({ type: Number })
], _.prototype, "step", 2);
_ = H([
  F("themo-detail")
], _);
var Ce = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, Z = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Te(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Ce(t, e, r), r;
};
let S = class extends b {
  constructor() {
    super(...arguments), this.value = "", this.unit = "", this.sub = "", this.warm = !1;
  }
  render() {
    return h`
      <section class="ha-card small glance">
        <div class="glance-row">
          <div class="icon-circle ${this.warm ? "warm" : ""}"></div>
          <div style="flex:1">
            <div class="big">${this.value}<span class="unit">${this.unit}</span></div>
            <div class="sub">${this.sub}</div>
          </div>
        </div>
      </section>`;
  }
};
S.styles = [V, X, C`:host{display:block;}`];
Z([
  m()
], S.prototype, "value", 2);
Z([
  m()
], S.prototype, "unit", 2);
Z([
  m()
], S.prototype, "sub", 2);
Z([
  m({ type: Boolean })
], S.prototype, "warm", 2);
S = Z([
  F("themo-glance")
], S);
var Pe = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, Y = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Oe(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Pe(t, e, r), r;
};
let D = class extends b {
  constructor() {
    super(...arguments), this.selectedId = null, this.scheduleData = null, this.schedules = new fe(), this.lastFetchedDeviceId = null;
  }
  setConfig(s) {
    this.config = oe(s);
  }
  getCardSize() {
    return 12;
  }
  set hass(s) {
    this._hass = s, this.requestUpdate(), this.maybeFetchSchedule();
  }
  get hass() {
    return this._hass;
  }
  zones() {
    return !this._hass || !this.config ? [] : pe(this._hass, this.config.entities).map((s) => he(this._hass, s, this.config.step)).filter((s) => s !== null);
  }
  selected(s) {
    if (!s.length) return null;
    const t = this.selectedId ?? this.config.default_zone ?? s[0].climateEntityId;
    return s.find((e) => e.climateEntityId === t) ?? s[0];
  }
  async maybeFetchSchedule() {
    const s = this.selected(this.zones()), t = (s == null ? void 0 : s.themoDeviceId) ?? null;
    t === null || t === this.lastFetchedDeviceId || (this.lastFetchedDeviceId = t, this.scheduleData = await this.schedules.get(this._hass, t), this.requestUpdate());
  }
  onSelect(s) {
    this.selectedId = s, this.scheduleData = null, this.maybeFetchSchedule();
  }
  sunText() {
    const s = this.config.sun_entity;
    if (!s) return null;
    const t = this._hass.states[s];
    if (!t) return null;
    const e = (i) => i ? new Date(i).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—";
    return `${e(t.attributes.next_rising)} → ${e(t.attributes.next_setting)}`;
  }
  energyGlance() {
    var e;
    const s = (e = this.config.energy) == null ? void 0 : e.today_entity;
    if (!s) return "";
    const t = this._hass.states[s];
    return t ? h`<themo-glance .value=${t.state} .unit=${t.attributes.unit_of_measurement ?? "kWh"} .sub=${"today · all zones"}></themo-glance>` : "";
  }
  render() {
    if (!this.config || !this._hass) return h``;
    const s = this.zones(), t = this.selected(s), e = (t == null ? void 0 : t.outsideTemp) ?? null, i = ue(this.scheduleData), r = (/* @__PURE__ */ new Date()).getDay(), o = (/* @__PURE__ */ new Date()).getHours(), n = i ? Ut(i, r) : null, l = i ? me(i, r, o) : null;
    return h`
      <div class="view">
        <themo-overview
          .zones=${s} .selectedId=${(t == null ? void 0 : t.climateEntityId) ?? ""} .title=${this.config.title}
          .quickActions=${this.config.quick_actions}
          .outsideText=${e !== null ? `${e}°C` : null}
          .sunText=${this.sunText()}
          @zone-select=${(a) => this.onSelect(a.detail.entityId)}
          @quick-action=${(a) => ye(this._hass, a.detail.action)}
        ></themo-overview>
        <div class="right-col">
          ${t ? h`<themo-detail
            .zone=${t} .todayRow=${n} .nextChange=${l} .nowHour=${o} .step=${this.config.step}
            @setpoint-change=${(a) => ge(this._hass, t.climateEntityId, a.detail.temperature)}
            @mode-change=${(a) => ve(this._hass, t.climateEntityId, a.detail.mode)}
            @preset-change=${(a) => this.onPreset(t, a.detail.preset)}
            @backlight-toggle=${() => t.backlightEntityId && xe(this._hass, t.backlightEntityId, t.backlightOn ?? !1)}
          ></themo-detail>` : h`<div>No Themo thermostats found.</div>`}
          ${this.energyGlance()}
        </div>
      </div>`;
  }
  async onPreset(s, t) {
    await be(this._hass, s.climateEntityId, t), s.themoDeviceId !== null && (this.schedules.invalidate(s.themoDeviceId), this.lastFetchedDeviceId = null, this.maybeFetchSchedule());
  }
};
D.styles = [V, C`
    .view { display:grid; grid-template-columns: 1fr 460px; gap:24px; padding:8px; }
    .right-col { display:flex; flex-direction:column; gap:18px; }
    @container (max-width: 1100px) { .view { grid-template-columns: 1fr; } }
    :host { container-type: inline-size; }
  `];
Y([
  ct()
], D.prototype, "config", 2);
Y([
  ct()
], D.prototype, "selectedId", 2);
Y([
  ct()
], D.prototype, "scheduleData", 2);
D = Y([
  F("themo-card")
], D);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "themo-card",
  name: "PapaDog's Themo Control Card",
  description: "Multi-thermostat companion card for the pd_hathemo integration"
});
export {
  D as ThemoCard
};
