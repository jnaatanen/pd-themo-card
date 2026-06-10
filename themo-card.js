/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = globalThis, me = ie.ShadowRoot && (ie.ShadyCSS === void 0 || ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = Symbol(), Ee = /* @__PURE__ */ new WeakMap();
let Ge = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (me && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Ee.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ee.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (t) => new Ge(typeof t == "string" ? t : t + "", void 0, ve), f = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, o, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[r + 1], t[0]);
  return new Ge(i, t, ve);
}, rt = (t, e) => {
  if (me) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), o = ie.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, Se = me ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return ot(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: nt, defineProperty: at, getOwnPropertyDescriptor: lt, getOwnPropertyNames: dt, getOwnPropertySymbols: ct, getPrototypeOf: pt } = Object, k = globalThis, Oe = k.trustedTypes, ht = Oe ? Oe.emptyScript : "", ce = k.reactiveElementPolyfillSupport, V = (t, e) => t, se = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ht : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, fe = (t, e) => !nt(t, e), Pe = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: fe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), k.litPropertyMetadata ?? (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Pe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && at(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: r } = lt(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(V("elementProperties"))) return;
    const e = pt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(V("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(V("properties"))) {
      const i = this.properties, s = [...dt(i), ...ct(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Se(o));
    } else e !== void 0 && i.push(Se(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((i) => i(this));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return rt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    });
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    var r;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : se).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var r, n;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = s.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : se;
      this._$Em = o;
      const p = l.fromAttribute(i, a.type);
      this[o] = p ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, o = !1, r) {
    var n;
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[e]), s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? fe)(r, i) || s.useDefault && s.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: r }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[V("elementProperties")] = /* @__PURE__ */ new Map(), R[V("finalized")] = /* @__PURE__ */ new Map(), ce == null || ce({ ReactiveElement: R }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Me = (t) => t, oe = W.trustedTypes, Ie = oe ? oe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Je = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Ke = "?" + w, ut = `<${Ke}>`, M = document, Z = () => M.createComment(""), G = (t) => t === null || typeof t != "object" && typeof t != "function", be = Array.isArray, gt = (t) => be(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", pe = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, De = /-->/g, He = />/g, S = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ne = /'/g, Re = /"/g, Qe = /^(?:script|style|textarea|title)$/i, Ye = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Ye(1), z = Ye(2), U = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), O = M.createTreeWalker(M, 129);
function Xe(t, e) {
  if (!be(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ie !== void 0 ? Ie.createHTML(e) : e;
}
const mt = (t, e) => {
  const i = t.length - 1, s = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = F;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let p, g, d = -1, u = 0;
    for (; u < l.length && (n.lastIndex = u, g = n.exec(l), g !== null); ) u = n.lastIndex, n === F ? g[1] === "!--" ? n = De : g[1] !== void 0 ? n = He : g[2] !== void 0 ? (Qe.test(g[2]) && (o = RegExp("</" + g[2], "g")), n = S) : g[3] !== void 0 && (n = S) : n === S ? g[0] === ">" ? (n = o ?? F, d = -1) : g[1] === void 0 ? d = -2 : (d = n.lastIndex - g[2].length, p = g[1], n = g[3] === void 0 ? S : g[3] === '"' ? Re : Ne) : n === Re || n === Ne ? n = S : n === De || n === He ? n = F : (n = S, o = void 0);
    const b = n === S && t[a + 1].startsWith("/>") ? " " : "";
    r += n === F ? l + ut : d >= 0 ? (s.push(p), l.slice(0, d) + Je + l.slice(d) + w + b) : l + w + (d === -2 ? a : b);
  }
  return [Xe(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class J {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const a = e.length - 1, l = this.parts, [p, g] = mt(e, i);
    if (this.el = J.createElement(p, s), O.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = O.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Je)) {
          const u = g[n++], b = o.getAttribute(d).split(w), E = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: E[2], strings: b, ctor: E[1] === "." ? ft : E[1] === "?" ? bt : E[1] === "@" ? xt : ae }), o.removeAttribute(d);
        } else d.startsWith(w) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (Qe.test(o.tagName)) {
          const d = o.textContent.split(w), u = d.length - 1;
          if (u > 0) {
            o.textContent = oe ? oe.emptyScript : "";
            for (let b = 0; b < u; b++) o.append(d[b], Z()), O.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[u], Z());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ke) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(w, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += w.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const s = M.createElement("template");
    return s.innerHTML = e, s;
  }
}
function j(t, e, i = t, s) {
  var n, a;
  if (e === U) return e;
  let o = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const r = G(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = j(t, o._$AS(t, e.values), o, s)), e;
}
class vt {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? M).importNode(i, !0);
    O.currentNode = o;
    let r = O.nextNode(), n = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let p;
        l.type === 2 ? p = new Y(r, r.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (p = new yt(r, this, e)), this._$AV.push(p), l = s[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = O.nextNode(), n++);
    }
    return O.currentNode = M, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class Y {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = j(this, e, i), G(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== U && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : gt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && G(this._$AH) ? this._$AA.nextSibling.data = e : this.T(M.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = J.createElement(Xe(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(i);
    else {
      const n = new vt(o, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = Ue.get(e.strings);
    return i === void 0 && Ue.set(e.strings, i = new J(e)), i;
  }
  k(e) {
    be(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const r of e) o === i.length ? i.push(s = new Y(this.O(Z()), this.O(Z()), this, this.options)) : s = i[o], s._$AI(r), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = Me(e).nextSibling;
      Me(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class ae {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, r) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = m;
  }
  _$AI(e, i = this, s, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = j(this, e, i, 0), n = !G(e) || e !== this._$AH && e !== U, n && (this._$AH = e);
    else {
      const a = e;
      let l, p;
      for (e = r[0], l = 0; l < r.length - 1; l++) p = j(this, a[s + l], i, l), p === U && (p = this._$AH[l]), n || (n = !G(p) || p !== this._$AH[l]), p === m ? e = m : e !== m && (e += (p ?? "") + r[l + 1]), this._$AH[l] = p;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ft extends ae {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class bt extends ae {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class xt extends ae {
  constructor(e, i, s, o, r) {
    super(e, i, s, o, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = j(this, e, i, 0) ?? m) === U) return;
    const s = this._$AH, o = e === m && s !== m || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== m && (s === m || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class yt {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    j(this, e);
  }
}
const he = W.litHtmlPolyfillSupport;
he == null || he(J, Y), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.3");
const $t = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new Y(e.insertBefore(Z(), r), r, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class v extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $t(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return U;
  }
}
var Ze;
v._$litElement$ = !0, v.finalized = !0, (Ze = P.litElementHydrateSupport) == null || Ze.call(P, { LitElement: v });
const ue = P.litElementPolyfillSupport;
ue == null || ue({ LitElement: v });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = { attribute: !0, type: String, converter: se, reflect: !1, hasChanged: fe }, wt = (t = _t, e, i) => {
  const { kind: s, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), s === "accessor") {
    const { name: n } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(n, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, t, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(a) {
      const l = this[n];
      e.call(this, a), this.requestUpdate(n, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function h(t) {
  return (e, i) => typeof i == "object" ? wt(t, e, i) : ((s, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function X(t) {
  return h({ ...t, state: !0, attribute: !1 });
}
const _ = f`
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
function kt(t) {
  if (t.entities !== void 0) {
    if (!Array.isArray(t.entities) || t.entities.length === 0)
      throw new Error("themo-card: 'entities' must be a non-empty list of climate entities");
    for (const o of t.entities)
      if (typeof o != "string" || !o.startsWith("climate."))
        throw new Error(`themo-card: 'entities' must contain only climate.* (got ${o})`);
  }
  const e = t.step ?? 0.5;
  if (typeof e != "number" || e <= 0)
    throw new Error("themo-card: 'step' must be a positive number");
  const i = t.quick_actions ?? [], s = t.layout ?? "auto";
  if (s !== "auto" && s !== "desktop" && s !== "mobile")
    throw new Error("themo-card: 'layout' must be auto, desktop, or mobile");
  return {
    type: t.type,
    title: t.title ?? "Themo Heating",
    entities: t.entities,
    default_zone: t.default_zone,
    step: e,
    sun_entity: t.sun_entity,
    energy: t.energy,
    quick_actions: i,
    layout: s
  };
}
const zt = 84, re = 2 * Math.PI * zt;
function et(t, e, i) {
  if (t === null || i <= e) return re;
  const s = Math.min(1, Math.max(0, (t - e) / (i - e)));
  return re * (1 - s);
}
function tt(t, e, i, s) {
  const o = Math.round(t / s) * s, r = Math.min(i, Math.max(e, o)), n = (String(s).split(".")[1] || "").length;
  return Number(r.toFixed(n));
}
function At(t, e) {
  var n, a;
  const i = (n = t.entities) == null ? void 0 : n[e], s = i == null ? void 0 : i.device_id;
  if (!s) return null;
  const o = (a = t.devices) == null ? void 0 : a[s], r = (o == null ? void 0 : o.identifiers) ?? [];
  for (const l of r)
    if (l[0] === "pd_hathemo") {
      const p = parseInt(l[1], 10);
      return Number.isNaN(p) ? null : p;
    }
  return null;
}
const Tt = { off: "off", heat: "heat", auto: "auto" };
function x(t) {
  if (t == null || t === "" || t === "unknown" || t === "unavailable") return null;
  const e = Number(t);
  return Number.isNaN(e) ? null : e;
}
function Ct(t, e) {
  if (e) return e;
  const i = t.entities ?? {};
  return Object.keys(i).filter((s) => {
    var o;
    return s.startsWith("climate.") && ((o = i[s]) == null ? void 0 : o.platform) === "pd_hathemo";
  }).sort();
}
function N(t, e, i, s, o = !1) {
  var n;
  if (!e) return null;
  const r = t.entities ?? {};
  for (const a of Object.keys(r))
    if (((n = r[a]) == null ? void 0 : n.device_id) === e && a.startsWith(i + ".") && (o ? a.endsWith("_" + s) : a.includes(s)))
      return a;
  return null;
}
function Et(t, e, i) {
  var b, E, $e, _e, we, ke, ze, Ae, Te;
  const s = t.states[e];
  if (!s) return null;
  const o = s.attributes, r = (E = (b = t.entities) == null ? void 0 : b[e]) == null ? void 0 : E.device_id, n = N(t, r, "sensor", "room_temperature"), a = N(t, r, "sensor", "floor_temperature"), l = N(t, r, "sensor", "outside_temperature"), p = N(t, r, "binary_sensor", "heating"), g = N(t, r, "light", "backlight"), d = N(t, r, "sensor", "heating_today", !0), u = (Ce) => Ce ? t.states[Ce] : void 0;
  return {
    climateEntityId: e,
    name: o.friendly_name ?? e,
    currentTemp: x(o.current_temperature),
    targetTemp: x(o.temperature),
    mode: Tt[s.state] ?? "off",
    heating: (o.hvac_action ?? (($e = u(p)) == null ? void 0 : $e.state)) === "heating" || ((_e = u(p)) == null ? void 0 : _e.state) === "on",
    minTemp: x(o.min_temp) ?? 5,
    maxTemp: x(o.max_temp) ?? 35,
    step: x(o.target_temp_step) ?? i,
    roomTemp: x((we = u(n)) == null ? void 0 : we.state),
    floorTemp: x((ke = u(a)) == null ? void 0 : ke.state),
    outsideTemp: x((ze = u(l)) == null ? void 0 : ze.state),
    heatingTodayPct: x((Ae = u(d)) == null ? void 0 : Ae.state),
    backlightEntityId: g,
    backlightOn: g ? ((Te = u(g)) == null ? void 0 : Te.state) === "on" : null,
    themoDeviceId: At(t, e),
    presetModes: Array.isArray(o.preset_modes) ? o.preset_modes : [],
    presetMode: o.preset_mode ?? null
  };
}
function St(t) {
  return t ? t.schedules.find((e) => e.active) ?? null : null;
}
function it(t, e) {
  const i = t.setpoints.filter((n) => n.day === e).sort((n, a) => n.hour - a.hour), s = new Array(24).fill(null);
  if (i.length === 0) return s;
  let o = null, r = 0;
  for (let n = 0; n < 24; n++) {
    for (; r < i.length && i[r].hour === n; )
      o = i[r].value, r++;
    s[n] = o;
  }
  return s;
}
function Ot(t, e, i) {
  const s = it(t, e), o = s[i];
  for (let r = i + 1; r < 24; r++)
    if (s[r] !== null && s[r] !== o) return { hour: r, value: s[r] };
  return null;
}
class Pt {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  get(e, i) {
    const s = this.cache.get(i);
    if (s) return s;
    const o = this.fetch(e, i);
    return this.cache.set(i, o), o;
  }
  invalidate(e) {
    this.cache.delete(e);
  }
  async fetch(e, i) {
    try {
      return { schedules: (await e.connection.sendMessagePromise(
        { type: "pd_hathemo/schedules", device_id: i }
      )).schedules };
    } catch {
      return this.cache.delete(i), null;
    }
  }
}
function je(t, e, i) {
  return t.callService("climate", "set_temperature", { entity_id: e, temperature: i });
}
function qe(t, e, i) {
  return t.callService("climate", "set_hvac_mode", { entity_id: e, hvac_mode: i });
}
function Mt(t, e, i) {
  return t.callService("climate", "set_preset_mode", { entity_id: e, preset_mode: i });
}
function Be(t, e, i) {
  return t.callService("light", i ? "turn_off" : "turn_on", { entity_id: e });
}
function Le(t, e) {
  const [i, s] = e.service.split(".", 2);
  return t.callService(i, s, e.service_data ?? {});
}
const le = f`
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
var It = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, xe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Dt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && It(e, i, o), o;
};
const Ht = { off: "Off", heat: "Heat", auto: "Auto" };
let K = class extends v {
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
    const t = this.zone, e = ["zone", t.heating ? "heating" : "", this.selected ? "active-detail" : ""].join(" ");
    return c`
      <div class="${e}" @click=${() => this.select()}>
        <div class="zone-head">
          <div>
            <div class="zone-name">${t.name}</div>
            <div class="zone-entity">${t.climateEntityId}</div>
          </div>
        </div>
        <div class="zone-temp">
          <div class="now">${t.currentTemp ?? "—"}<span class="unit">°</span></div>
          <div class="target">→ <span>${t.targetTemp ?? "—"}°</span></div>
        </div>
        <div class="zone-meta">${t.heating ? "heating" : "idle"}${t.heatingTodayPct !== null ? ` · ${t.heatingTodayPct}% today` : ""}</div>
        <div class="zone-foot">
          <button class="mode-pill ${t.mode}"><span class="swatch"></span>${Ht[t.mode]}</button>
        </div>
      </div>`;
  }
};
K.styles = [_, le, f`:host{display:contents;}`];
xe([
  h({ attribute: !1 })
], K.prototype, "zone", 2);
xe([
  h({ type: Boolean })
], K.prototype, "selected", 2);
K = xe([
  $("themo-zone-tile")
], K);
var Nt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, H = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Rt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Nt(e, i, o), o;
};
let y = class extends v {
  constructor() {
    super(...arguments), this.zones = [], this.selectedId = "", this.title = "Themo Heating", this.quickActions = [], this.outsideText = null, this.sunText = null;
  }
  get activeCount() {
    return this.zones.filter((t) => t.heating).length;
  }
  get houseAvg() {
    const t = this.zones.map((e) => e.currentTemp).filter((e) => e !== null);
    return t.length ? Math.round(t.reduce((e, i) => e + i, 0) / t.length * 10) / 10 : null;
  }
  render() {
    const t = this.activeCount > 0;
    return c`
      <section class="ha-card themo-overview">
        <div class="card-head">
          <div>
            <div class="h-title">${this.title}</div>
            <div class="h-sub">${this.zones.length} thermostats · pd_hathemo</div>
          </div>
          <div class="spacer"></div>
          ${t ? c`<span class="pill heat"><span class="dot"></span>Heating now</span>` : ""}
          ${this.outsideText ? c`<span class="pill outside"><span class="dot"></span>Outside ${this.outsideText}</span>` : ""}
        </div>

        <div class="strip">
          <div class="stat"><div class="label">Active zones</div><div class="val">${this.activeCount}<span class="unit">/ ${this.zones.length}</span></div></div>
          <div class="stat"><div class="label">House avg</div><div class="val">${this.houseAvg ?? "—"}<span class="unit">°C</span></div></div>
          ${this.sunText ? c`<div class="stat"><div class="label">Sunrise → Sunset</div><div class="val">${this.sunText}</div></div>` : ""}
        </div>

        <div class="zones">
          ${this.zones.map((e) => c`
            <themo-zone-tile .zone=${e} ?selected=${e.climateEntityId === this.selectedId}></themo-zone-tile>`)}
        </div>

        ${this.quickActions.length ? c`
          <div class="quick-actions">
            <span class="qa-label">Quick actions</span>
            ${this.quickActions.map((e) => c`
              <button class="qa-chip" @click=${() => this.dispatchEvent(new CustomEvent("quick-action", { detail: { action: e }, bubbles: !0, composed: !0 }))}>${e.name}</button>`)}
          </div>` : ""}

        <div class="legend">
          <div class="li"><span class="sw" style="background:var(--heat)"></span>Heating</div>
          <div class="li"><span class="sw" style="background:var(--accent)"></span>Auto</div>
          <div class="li"><span class="sw" style="background:var(--muted)"></span>Off</div>
        </div>
      </section>`;
  }
};
y.styles = [_, le, f`:host{display:block;}`];
H([
  h({ attribute: !1 })
], y.prototype, "zones", 2);
H([
  h()
], y.prototype, "selectedId", 2);
H([
  h()
], y.prototype, "title", 2);
H([
  h({ attribute: !1 })
], y.prototype, "quickActions", 2);
H([
  h()
], y.prototype, "outsideText", 2);
H([
  h()
], y.prototype, "sunText", 2);
y = H([
  $("themo-overview")
], y);
var Ut = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, q = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? jt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Ut(e, i, o), o;
};
const qt = [
  { mode: "off", name: "Off", desc: "power off" },
  { mode: "heat", name: "Heat", desc: "manual setpoint" },
  { mode: "auto", name: "Auto", desc: "follow schedule" }
];
let A = class extends v {
  constructor() {
    super(...arguments), this.todayRow = null, this.nextChange = null, this.nowHour = 0, this.step = 0.5;
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = e.targetTemp ?? e.minTemp, s = tt(i + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: s });
  }
  render() {
    const t = this.zone, e = et(t.currentTemp, t.minTemp, t.maxTemp), i = t.presetModes.length > 0;
    return c`
      <section class="ha-card themo-detail">
        <div class="detail-head">
          <div class="detail-eyebrow">Selected zone</div>
          <div class="detail-title">${t.name}</div>
          <div class="detail-entity">${t.climateEntityId}</div>
        </div>

        <div class="ring-stage">
          <div class="ring">
            ${z`<svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle cx="100" cy="100" r="84" fill="none" stroke="var(--heat)" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="${re}" stroke-dashoffset="${e}"
                transform="rotate(-90 100 100)"/>
            </svg>`}
            <div class="ring-num"><div>
              <div class="now-big">${t.currentTemp ?? "—"}<span class="unit">°C</span></div>
              <div class="now-cap">Room temp</div>
            </div></div>
          </div>
          <div class="target-col">
            <div>
              <div class="label">Setpoint</div>
              <div class="stepper">
                <button data-step-dn @click=${() => this.bump(-t.step)} ?disabled=${t.mode !== "heat"}>−</button>
                <div class="val"><span>${t.targetTemp ?? "—"}</span><span class="unit">°C</span></div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mode-row">
          ${qt.map((s) => c`
            <div class="mode-tile ${t.mode === s.mode ? "selected" : ""}" data-mode=${s.mode}
              @click=${() => this.emit("mode-change", { mode: s.mode })}>
              <div><div class="name">${s.name}</div><div class="desc">${s.desc}</div></div>
            </div>`)}
        </div>

        <div class="detail-grid">
          <div class="kv"><div class="k">Room sensor</div><div class="v">${t.roomTemp ?? "—"}<span class="unit">°C</span></div></div>
          <div class="kv"><div class="k">Heating action</div><div class="v" style="color:var(--heat)">${t.heating ? "Active" : "Idle"}</div></div>
          <div class="kv"><div class="k">Daily heating</div><div class="v">${t.heatingTodayPct ?? "—"}<span class="unit">%</span></div></div>
          <div class="kv" data-backlight style="cursor:pointer"
            @click=${() => t.backlightEntityId && this.emit("backlight-toggle", {})}>
            <div class="k">Backlight</div>
            <div class="v" style="color:var(--accent)">${t.backlightOn === null ? "—" : t.backlightOn ? "On" : "Off"}</div>
          </div>
        </div>

        ${i ? this.renderSchedule(t) : ""}
      </section>`;
  }
  renderSchedule(t) {
    const e = this.todayRow ?? new Array(24).fill(null), i = Math.max(...e.map((o) => o ?? 0), 1), s = (o) => o === null ? 0 : Math.ceil(o / i * 3);
    return c`
      <div class="schedule">
        <div class="schedule-head">
          <div class="title">Today's schedule</div>
          <div class="next">${this.nextChange ? c`Next change <strong>${String(this.nextChange.hour).padStart(2, "0")}:00 → ${this.nextChange.value}°</strong>` : "No further changes today"}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${t.presetModes.map((o) => c`
            <button class="qa-chip ${t.presetMode === o ? "active" : ""}" data-preset=${o}
              @click=${() => this.emit("preset-change", { preset: o })}>${o}</button>`)}
        </div>
        <div class="heatmap">
          <div class="row-lbl">Today</div>
          <div class="hour-row">
            ${e.map((o, r) => c`<div class="cell"
              data-h=${s(o) || ""} ?data-now=${r === this.nowHour}></div>`)}
          </div>
        </div>
      </div>`;
  }
};
A.styles = [_, le, f`:host{display:block;}`];
q([
  h({ attribute: !1 })
], A.prototype, "zone", 2);
q([
  h({ attribute: !1 })
], A.prototype, "todayRow", 2);
q([
  h({ attribute: !1 })
], A.prototype, "nextChange", 2);
q([
  h({ type: Number })
], A.prototype, "nowHour", 2);
q([
  h({ type: Number })
], A.prototype, "step", 2);
A = q([
  $("themo-detail")
], A);
var Bt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, ee = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Lt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Bt(e, i, o), o;
};
let I = class extends v {
  constructor() {
    super(...arguments), this.value = "", this.unit = "", this.sub = "", this.warm = !1;
  }
  render() {
    return c`
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
I.styles = [_, le, f`:host{display:block;}`];
ee([
  h()
], I.prototype, "value", 2);
ee([
  h()
], I.prototype, "unit", 2);
ee([
  h()
], I.prototype, "sub", 2);
ee([
  h({ type: Boolean })
], I.prototype, "warm", 2);
I = ee([
  $("themo-glance")
], I);
const de = f`
  /* Header card */
  .head-card {
    background: linear-gradient(180deg, rgba(255,112,67,0.16), transparent 80%), var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 18px 18px 20px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  .head-card .row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .head-card .badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--heat);
  }
  .head-card .badge .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--heat);
    box-shadow: 0 0 0 4px rgba(255,112,67,0.2);
    animation: pulse 1.6s infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,112,67,0.4); }
    50% { box-shadow: 0 0 0 6px rgba(255,112,67,0); }
  }
  .head-card .outside {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--fg-soft);
    letter-spacing: 0.03em;
  }
  .head-card .big-temp {
    display: flex; align-items: baseline; gap: 14px;
    margin-bottom: 6px;
  }
  .head-card .big-temp .now {
    font-size: 56px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .head-card .big-temp .unit {
    font-size: 22px;
    color: var(--muted);
    font-weight: 300;
  }
  .head-card .big-temp .delta {
    font-size: 13px;
    color: var(--ok);
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
  }
  .head-card .sub {
    font-size: 12px; color: var(--fg-soft);
  }
  .head-card .breakdown {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 10px; margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }
  .head-card .breakdown .b {
    display: flex; flex-direction: column; gap: 2px;
  }
  .head-card .breakdown .k {
    font-size: 10px; color: var(--muted);
    font-family: var(--font-mono);
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .head-card .breakdown .v {
    font-size: 15px; color: var(--fg);
    letter-spacing: -0.005em;
  }
  .head-card .breakdown .v .small { font-size: 11px; color: var(--muted); }

  /* Quick chips */
  .chips-scroll {
    display: flex; gap: 8px;
    overflow-x: auto;
    margin-bottom: 18px;
    padding-bottom: 4px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .chips-scroll::-webkit-scrollbar { display: none; }
  .chip {
    flex-shrink: 0;
    height: 38px;
    padding: 0 14px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--border-2);
    color: var(--fg-soft);
    font-size: 13px;
    font-family: inherit;
    display: inline-flex; align-items: center; gap: 7px;
    cursor: pointer;
  }
  .chip.active {
    background: rgba(255,112,67,0.16);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .chip svg { width: 15px; height: 15px; }

  /* Zone list */
  .section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 6px 4px 10px;
    display: flex; justify-content: space-between;
  }
  .section-label .count {
    color: var(--fg-soft);
  }
  .zlist {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .zrow {
    padding: 14px 16px;
    display: grid;
    grid-template-columns: 36px 1fr auto auto;
    gap: 12px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    position: relative;
  }
  .zrow:last-child { border-bottom: 0; }
  .zrow:active { background: var(--surface-2); }
  .zrow .ic {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(3,169,244,0.1);
    color: var(--accent);
    display: grid; place-items: center;
  }
  .zrow.heating .ic {
    background: rgba(255,112,67,0.14);
    color: var(--heat);
  }
  .zrow.off .ic {
    background: rgba(255,255,255,0.05);
    color: var(--muted);
  }
  .zrow .ic svg { width: 18px; height: 18px; }
  .zrow .name { font-size: 14px; font-weight: 500; }
  .zrow .meta {
    font-size: 11px; color: var(--muted);
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
    margin-top: 1px;
  }
  .zrow .now {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .zrow .now .u { font-size: 12px; color: var(--muted); }
  .zrow .now .tgt {
    display: block;
    font-size: 10px;
    color: var(--muted);
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
    margin-top: 2px;
    text-align: right;
  }
  .zrow .mp {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--muted);
  }
  .zrow.heating .mp { background: var(--heat); box-shadow: 0 0 0 4px rgba(255,112,67,0.16); }
  .zrow.auto .mp { background: var(--accent); }
  .zrow.off .mp { background: var(--muted-2); }

  /* Daily heating mini */
  .mini-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 16px;
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: center;
  }
  .mini-card .ic-circle {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,112,67,0.14);
    color: var(--heat);
    display: grid; place-items: center;
    grid-row: 1 / span 2;
  }
  .mini-card .ml { display: flex; flex-direction: column; gap: 2px; padding-left: 0; }
  .mini-card .label { font-size: 12px; color: var(--fg-soft); }
  .mini-card .bar {
    height: 5px; border-radius: 999px;
    background: var(--surface-2);
    overflow: hidden;
    margin-top: 8px;
  }
  .mini-card .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--heat), #ffb74d);
    width: 38%;
    border-radius: 999px;
  }
  .mini-card .pct { font-family: var(--font-mono); font-size: 20px; letter-spacing: -0.01em; }
  .mini-card .pct .small { font-size: 11px; color: var(--muted); }

  /* ----------- Zone detail sheet ----------- */
  /* Backdrop dim — position: fixed so it overlays the viewport (not the mock phone frame) */
  .sheet-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 30;
  }
  /* Sheet — position: fixed so it anchors to the viewport bottom */
  .sheet {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    background: var(--surface);
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    padding: 14px 18px 28px;
    z-index: 40;
    box-shadow: 0 -20px 40px rgba(0,0,0,0.4);
  }
  .sheet .grabber {
    width: 38px; height: 5px;
    background: rgba(255,255,255,0.25);
    border-radius: 999px;
    margin: 0 auto 12px;
  }
  .sheet .head {
    display: flex; align-items: baseline; gap: 10px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 16px;
  }
  .sheet .head .name { font-size: 20px; font-weight: 500; letter-spacing: -0.01em; }
  .sheet .head .entity {
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.02em;
  }
  .sheet .dial-row {
    display: grid; grid-template-columns: 130px 1fr;
    gap: 16px; align-items: center;
    margin-bottom: 16px;
  }
  .mini-ring {
    position: relative; width: 130px; height: 130px;
    display: grid; place-items: center;
  }
  .mini-ring svg { width: 100%; height: 100%; }
  .mini-ring .num {
    position: absolute; inset: 0;
    display: grid; place-items: center;
  }
  .mini-ring .num .big {
    font-size: 32px;
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .mini-ring .num .big .u { font-size: 12px; color: var(--muted); }
  .mini-ring .num .lbl {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--muted);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: 6px;
  }
  .sheet .target-stack {
    display: flex; flex-direction: column; gap: 10px;
  }
  .sheet .target-stack .lbl {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .sheet .stepper {
    display: grid; grid-template-columns: 48px 1fr 48px;
    height: 56px;
    border-radius: 16px;
    border: 1px solid var(--border-2);
    overflow: hidden;
    background: var(--surface-2);
  }
  .sheet .stepper button {
    border: 0; background: transparent;
    color: var(--accent);
    font-size: 26px; line-height: 1;
    cursor: pointer;
  }
  .sheet .stepper .val {
    display: grid; place-items: center;
    font-family: var(--font-mono);
    font-size: 22px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .sheet .stepper .val .u { font-size: 11px; color: var(--muted); margin-left: 2px; }
  .sheet .mode-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  .sheet .mode-tile {
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    border-radius: 14px;
    padding: 14px 10px;
    display: flex; flex-direction: column; align-items: center;
    gap: 6px;
    cursor: pointer;
    color: var(--fg-soft);
    text-align: center;
  }
  .sheet .mode-tile.selected {
    background: rgba(255,112,67,0.12);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .sheet .mode-tile.selected.auto {
    background: rgba(3,169,244,0.12);
    border-color: rgba(3,169,244,0.5);
    color: var(--accent);
  }
  .sheet .mode-tile .name {
    font-size: 12px; font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: var(--font-mono);
  }
  .sheet .mode-tile svg { width: 22px; height: 22px; }
  .sheet .kvs {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .sheet .kv {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 12px;
  }
  .sheet .kv .k {
    font-family: var(--font-mono);
    font-size: 10px; color: var(--muted);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .sheet .kv .v {
    font-size: 14px;
    font-variant-numeric: tabular-nums;
  }
  .sheet .kv .v.heat { color: var(--heat); }
  .sheet .kv .v.accent { color: var(--accent); }

  /* Sheet slide-up entrance animation (not in mock — sheets pop in there) */
  @keyframes sheet-up { from { transform: translateY(24px); opacity: 0.6; } to { transform: none; opacity: 1; } }
  .sheet { animation: sheet-up .18s ease-out; }
`;
var Ft = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, te = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Vt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Ft(e, i, o), o;
};
const Fe = (t) => Math.round(t * 10) / 10;
let D = class extends v {
  constructor() {
    super(...arguments), this.zones = [], this.outsideText = null, this.energyToday = null, this.energyCost = null;
  }
  get activeCount() {
    return this.zones.filter((t) => t.heating).length;
  }
  avg(t) {
    const e = this.zones.map(t).filter((i) => i !== null);
    return e.length ? e.reduce((i, s) => i + s, 0) / e.length : null;
  }
  render() {
    const t = this.avg((s) => s.currentTemp), e = this.avg((s) => s.targetTemp), i = t !== null && e !== null ? Fe(t - e) : null;
    return c`
      <div class="head-card">
        <div class="row">
          ${this.activeCount > 0 ? c`<div class="badge"><span class="dot"></span>Heating now</div>` : c`<div></div>`}
          ${this.outsideText ? c`<div class="outside">Outside ${this.outsideText}</div>` : ""}
        </div>
        <div class="big-temp">
          <div class="now">${t !== null ? Fe(t) : "—"}<span class="unit">°</span></div>
          ${i !== null ? c`<div class="delta">${i >= 0 ? "+" : ""}${i.toFixed(1)}° vs target</div>` : ""}
        </div>
        <div class="sub">House average · ${this.activeCount} of ${this.zones.length} zones active</div>
        <div class="breakdown">
          <div class="b"><div class="k">Active</div><div class="v">${this.activeCount}<span class="small"> / ${this.zones.length}</span></div></div>
          ${this.energyToday ? c`<div class="b"><div class="k">Today kWh</div><div class="v">${this.energyToday}</div></div>` : ""}
          ${this.energyCost ? c`<div class="b"><div class="k">Cost</div><div class="v">${this.energyCost}</div></div>` : ""}
        </div>
      </div>`;
  }
};
D.styles = [_, de, f`:host{display:block;}`];
te([
  h({ attribute: !1 })
], D.prototype, "zones", 2);
te([
  h()
], D.prototype, "outsideText", 2);
te([
  h()
], D.prototype, "energyToday", 2);
te([
  h()
], D.prototype, "energyCost", 2);
D = te([
  $("themo-mobile-header")
], D);
var Wt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, st = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Zt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Wt(e, i, o), o;
};
function Gt(t) {
  return t.heating ? t.heatingTodayPct !== null ? `heating · ${t.heatingTodayPct}% today` : "heating" : t.floorTemp !== null ? `floor ${t.floorTemp}°` : t.mode === "off" ? "off" : t.mode === "auto" && t.currentTemp !== null && t.targetTemp !== null && t.currentTemp >= t.targetTemp ? "at setpoint" : t.mode;
}
const Ve = z`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`, Jt = z`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`, Kt = z`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
let ne = class extends v {
  icon() {
    return this.zone.heating ? Ve : this.zone.mode === "auto" ? Jt : this.zone.mode === "off" ? Kt : Ve;
  }
  open() {
    this.dispatchEvent(new CustomEvent("zone-open", {
      detail: { entityId: this.zone.climateEntityId },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = this.zone, e = ["zrow", t.heating ? "heating" : t.mode].join(" ");
    return c`
      <div class="${e}" @click=${() => this.open()}>
        <div class="ic">${this.icon()}</div>
        <div>
          <div class="name">${t.name}</div>
          <div class="meta">${Gt(t)}</div>
        </div>
        <div class="now">${t.currentTemp ?? "—"}<span class="u">°</span><span class="tgt">→ ${t.targetTemp !== null ? `${t.targetTemp}°` : "—"}</span></div>
        <div class="mp"></div>
      </div>`;
  }
};
ne.styles = [_, de, f`:host{display:block;}`];
st([
  h({ attribute: !1 })
], ne.prototype, "zone", 2);
ne = st([
  $("themo-zone-row")
], ne);
var Qt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, B = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Yt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Qt(e, i, o), o;
};
let T = class extends v {
  constructor() {
    super(...arguments), this.zones = [], this.quickActions = [], this.outsideText = null, this.energyToday = null, this.energyCost = null;
  }
  get heatingCount() {
    return this.zones.filter((t) => t.heating).length;
  }
  get dailyAvg() {
    const t = this.zones.map((e) => e.heatingTodayPct).filter((e) => e !== null);
    return t.length ? Math.round(t.reduce((e, i) => e + i, 0) / t.length) : null;
  }
  render() {
    const t = this.dailyAvg;
    return c`
      <themo-mobile-header .zones=${this.zones} .outsideText=${this.outsideText}
        .energyToday=${this.energyToday} .energyCost=${this.energyCost}></themo-mobile-header>

      ${this.quickActions.length ? c`
        <div class="chips-scroll">
          ${this.quickActions.map((e) => c`
            <button class="chip" @click=${() => this.dispatchEvent(new CustomEvent("quick-action", { detail: { action: e }, bubbles: !0, composed: !0 }))}>${e.name}</button>`)}
        </div>` : ""}

      <div class="section-label">
        <span>Zones</span>
        <span class="count">${this.zones.length} · ${this.heatingCount} heating</span>
      </div>
      <div class="zlist">
        ${this.zones.map((e) => c`<themo-zone-row .zone=${e}></themo-zone-row>`)}
      </div>

      ${t !== null ? c`
        <div class="mini-card">
          <div class="ic-circle"></div>
          <div class="ml">
            <div class="label">Daily heating · all zones</div>
            <div class="bar"><div class="fill" style="width:${t}%"></div></div>
          </div>
          <div class="pct">${t}%</div>
        </div>` : ""}
    `;
  }
};
T.styles = [_, de, f`:host{display:block;padding:4px;}`];
B([
  h({ attribute: !1 })
], T.prototype, "zones", 2);
B([
  h({ attribute: !1 })
], T.prototype, "quickActions", 2);
B([
  h()
], T.prototype, "outsideText", 2);
B([
  h()
], T.prototype, "energyToday", 2);
B([
  h()
], T.prototype, "energyCost", 2);
T = B([
  $("themo-mobile-view")
], T);
var Xt = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, ye = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ei(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && Xt(e, i, o), o;
};
const ge = 58, We = 2 * Math.PI * ge, ti = [
  { mode: "off", name: "Off", icon: z`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: "heat", name: "Heat", icon: z`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: "auto", name: "Auto", icon: z`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` }
];
let Q = class extends v {
  constructor() {
    super(...arguments), this.nextChangeText = null;
  }
  emit(t, e = {}) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = tt((e.targetTemp ?? e.minTemp) + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: i });
  }
  render() {
    const t = this.zone, e = et(t.currentTemp, t.minTemp, t.maxTemp) / re * We;
    return c`
      <div class="sheet-backdrop" @click=${() => this.emit("sheet-close")}></div>
      <div class="sheet">
        <div class="grabber" @click=${() => this.emit("sheet-close")}></div>
        <div class="head">
          <div class="name">${t.name}</div>
          <div class="entity">${t.climateEntityId}</div>
        </div>
        <div class="dial-row">
          <div class="mini-ring">
            ${z`<svg viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="${ge}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
              <circle cx="70" cy="70" r="${ge}" fill="none" stroke="var(--heat)" stroke-width="8"
                stroke-linecap="round" stroke-dasharray="${We}" stroke-dashoffset="${e}"
                transform="rotate(-90 70 70)"/>
            </svg>`}
            <div class="num"><div>
              <div class="big">${t.currentTemp ?? "—"}<span class="u">°C</span></div>
              <div class="lbl">Room</div>
            </div></div>
          </div>
          <div class="target-stack">
            <div>
              <div class="lbl">Setpoint</div>
              <div class="stepper">
                <button data-step-dn @click=${() => this.bump(-t.step)} ?disabled=${t.mode !== "heat"}>−</button>
                <div class="val">${t.targetTemp ?? "—"}<span class="u">°C</span></div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="mode-row">
          ${ti.map((i) => c`
            <div class="mode-tile ${t.mode === i.mode ? `selected ${i.mode === "auto" ? "auto" : ""}` : ""}"
              data-mode=${i.mode} @click=${() => this.emit("mode-change", { mode: i.mode })}>
              ${i.icon}<div class="name">${i.name}</div>
            </div>`)}
        </div>
        <div class="kvs">
          <div class="kv"><div class="k">Heating</div>
            <div class="v ${t.heating ? "heat" : ""}">${t.heating ? "Active" : "Idle"}${t.heatingTodayPct !== null ? ` · ${t.heatingTodayPct}% today` : ""}</div></div>
          <div class="kv"><div class="k">Daily</div>
            <div class="v">${t.heatingTodayPct !== null ? `${t.heatingTodayPct}%` : "—"}</div></div>
          <div class="kv" data-backlight style="cursor:pointer"
            @click=${() => t.backlightEntityId && this.emit("backlight-toggle")}>
            <div class="k">Backlight</div>
            <div class="v accent">${t.backlightOn === null ? "—" : t.backlightOn ? "On" : "Off"}</div></div>
          <div class="kv"><div class="k">Next change</div>
            <div class="v">${this.nextChangeText ?? "—"}</div></div>
        </div>
      </div>`;
  }
};
Q.styles = [_, de, f`:host{display:contents;}`];
ye([
  h({ attribute: !1 })
], Q.prototype, "zone", 2);
ye([
  h()
], Q.prototype, "nextChangeText", 2);
Q = ye([
  $("themo-mobile-sheet")
], Q);
var ii = Object.defineProperty, si = Object.getOwnPropertyDescriptor, L = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? si(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && ii(e, i, o), o;
};
let C = class extends v {
  constructor() {
    super(...arguments), this.selectedId = null, this.scheduleData = null, this.narrow = !1, this.sheetOpen = !1, this.schedules = new Pt(), this.lastFetchedDeviceId = null;
  }
  setConfig(t) {
    this.config = kt(t);
  }
  getCardSize() {
    return 12;
  }
  set hass(t) {
    this._hass = t, this.requestUpdate(), this.maybeFetchSchedule();
  }
  get hass() {
    return this._hass;
  }
  connectedCallback() {
    super.connectedCallback(), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver((t) => {
      var i;
      const e = ((i = t[0]) == null ? void 0 : i.contentRect.width) ?? 0;
      this.narrow = e > 0 && e < 1100;
    }), this.resizeObserver.observe(this));
  }
  disconnectedCallback() {
    var t;
    (t = this.resizeObserver) == null || t.disconnect(), super.disconnectedCallback();
  }
  effectiveLayout() {
    return this.config.layout === "desktop" || this.config.layout === "mobile" ? this.config.layout : this.narrow ? "mobile" : "desktop";
  }
  zones() {
    return !this._hass || !this.config ? [] : Ct(this._hass, this.config.entities).map((t) => Et(this._hass, t, this.config.step)).filter((t) => t !== null);
  }
  selected(t) {
    if (!t.length) return null;
    const e = this.selectedId ?? this.config.default_zone ?? t[0].climateEntityId;
    return t.find((i) => i.climateEntityId === e) ?? t[0];
  }
  async maybeFetchSchedule() {
    const t = this.selected(this.zones()), e = (t == null ? void 0 : t.themoDeviceId) ?? null;
    e === null || e === this.lastFetchedDeviceId || (this.lastFetchedDeviceId = e, this.scheduleData = await this.schedules.get(this._hass, e), this.requestUpdate());
  }
  onSelect(t) {
    this.selectedId = t, this.scheduleData = null, this.maybeFetchSchedule();
  }
  sunText() {
    const t = this.config.sun_entity;
    if (!t) return null;
    const e = this._hass.states[t];
    if (!e) return null;
    const i = (s) => s ? new Date(s).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—";
    return `${i(e.attributes.next_rising)} → ${i(e.attributes.next_setting)}`;
  }
  energyGlance() {
    var i;
    const t = (i = this.config.energy) == null ? void 0 : i.today_entity;
    if (!t) return "";
    const e = this._hass.states[t];
    return e ? c`<themo-glance .value=${e.state} .unit=${e.attributes.unit_of_measurement ?? "kWh"} .sub=${"today · all zones"}></themo-glance>` : "";
  }
  energyValue(t) {
    var s;
    if (!t) return null;
    const e = this._hass.states[t];
    if (!e || e.state === "unknown" || e.state === "unavailable") return null;
    const i = e.attributes.unit_of_measurement;
    return i && t === ((s = this.config.energy) == null ? void 0 : s.cost_entity) ? `${e.state} ${i}` : e.state;
  }
  onZoneOpen(t) {
    this.onSelect(t), this.sheetOpen = !0;
  }
  render() {
    var p, g;
    if (!this.config || !this._hass) return c``;
    const t = this.zones(), e = this.selected(t), i = (e == null ? void 0 : e.outsideTemp) ?? null, s = St(this.scheduleData), o = (/* @__PURE__ */ new Date()).getDay(), r = (/* @__PURE__ */ new Date()).getHours(), n = s ? it(s, o) : null, a = s ? Ot(s, o, r) : null, l = i !== null ? `${i}°C` : null;
    if (this.effectiveLayout() === "mobile") {
      const d = a ? `${String(a.hour).padStart(2, "0")}:00 → ${a.value}°` : null;
      return c`
        <themo-mobile-view
          .zones=${t} .quickActions=${this.config.quick_actions} .outsideText=${l}
          .energyToday=${this.energyValue((p = this.config.energy) == null ? void 0 : p.today_entity)}
          .energyCost=${this.energyValue((g = this.config.energy) == null ? void 0 : g.cost_entity)}
          @zone-open=${(u) => this.onZoneOpen(u.detail.entityId)}
          @quick-action=${(u) => Le(this._hass, u.detail.action)}
        ></themo-mobile-view>
        ${this.sheetOpen && e && (this.selectedId === null || e.climateEntityId === this.selectedId) ? c`<themo-mobile-sheet
          .zone=${e} .nextChangeText=${d}
          @sheet-close=${() => {
        this.sheetOpen = !1;
      }}
          @setpoint-change=${(u) => je(this._hass, e.climateEntityId, u.detail.temperature)}
          @mode-change=${(u) => qe(this._hass, e.climateEntityId, u.detail.mode)}
          @backlight-toggle=${() => e.backlightEntityId && Be(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
        ></themo-mobile-sheet>` : ""}`;
    }
    return c`
      <div class="view">
        <themo-overview
          .zones=${t} .selectedId=${(e == null ? void 0 : e.climateEntityId) ?? ""} .title=${this.config.title}
          .quickActions=${this.config.quick_actions}
          .outsideText=${l}
          .sunText=${this.sunText()}
          @zone-select=${(d) => this.onSelect(d.detail.entityId)}
          @quick-action=${(d) => Le(this._hass, d.detail.action)}
        ></themo-overview>
        <div class="right-col">
          ${e ? c`<themo-detail
            .zone=${e} .todayRow=${n} .nextChange=${a} .nowHour=${r} .step=${this.config.step}
            @setpoint-change=${(d) => je(this._hass, e.climateEntityId, d.detail.temperature)}
            @mode-change=${(d) => qe(this._hass, e.climateEntityId, d.detail.mode)}
            @preset-change=${(d) => this.onPreset(e, d.detail.preset)}
            @backlight-toggle=${() => e.backlightEntityId && Be(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
          ></themo-detail>` : c`<div>No Themo thermostats found.</div>`}
          ${this.energyGlance()}
        </div>
      </div>`;
  }
  async onPreset(t, e) {
    await Mt(this._hass, t.climateEntityId, e), t.themoDeviceId !== null && (this.schedules.invalidate(t.themoDeviceId), this.lastFetchedDeviceId = null, this.maybeFetchSchedule());
  }
};
C.styles = [_, f`
    :host { display: block; }
    .view { display:grid; grid-template-columns: 1fr 460px; gap:24px; padding:8px; }
    .right-col { display:flex; flex-direction:column; gap:18px; }
  `];
L([
  X()
], C.prototype, "config", 2);
L([
  X()
], C.prototype, "selectedId", 2);
L([
  X()
], C.prototype, "scheduleData", 2);
L([
  X()
], C.prototype, "narrow", 2);
L([
  X()
], C.prototype, "sheetOpen", 2);
C = L([
  $("themo-card")
], C);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "themo-card",
  name: "PapaDog's Themo Control Card",
  description: "Multi-thermostat companion card for the pd_hathemo integration"
});
export {
  C as ThemoCard
};
