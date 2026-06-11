/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, ze = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ke = Symbol(), je = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ze && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = je.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && je.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (t) => new ot(typeof t == "string" ? t : t + "", void 0, ke), b = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, s, r) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new ot(i, t, ke);
}, mt = (t, e) => {
  if (ze) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), s = ne.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = i.cssText, t.appendChild(o);
  }
}, Be = ze ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return gt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: ft, getOwnPropertyDescriptor: bt, getOwnPropertyNames: xt, getOwnPropertySymbols: yt, getPrototypeOf: $t } = Object, C = globalThis, Le = C.trustedTypes, wt = Le ? Le.emptyScript : "", me = C.reactiveElementPolyfillSupport, G = (t, e) => t, le = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? wt : null;
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
} }, Te = (t, e) => !vt(t, e), Fe = { attribute: !0, type: String, converter: le, reflect: !1, useDefault: !1, hasChanged: Te };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let j = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Fe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(e, o, i);
      s !== void 0 && ft(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: s, set: r } = bt(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: s, set(a) {
      const l = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const e = $t(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const i = this.properties, o = [...xt(i), ...yt(i)];
      for (const s of o) this.createProperty(s, i[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [o, s] of i) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const s = this._$Eu(i, o);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const s of o) i.unshift(Be(s));
    } else e !== void 0 && i.push(Be(e));
    return i;
  }
  static _$Eu(e, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const o of i.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return mt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var o;
      return (o = i.hostConnected) == null ? void 0 : o.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var o;
      return (o = i.hostDisconnected) == null ? void 0 : o.call(i);
    });
  }
  attributeChangedCallback(e, i, o) {
    this._$AK(e, o);
  }
  _$ET(e, i) {
    var r;
    const o = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, o);
    if (s !== void 0 && o.reflect === !0) {
      const a = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : le).toAttribute(i, o.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var r, a;
    const o = this.constructor, s = o._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = o.getPropertyOptions(s), d = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : le;
      this._$Em = s;
      const p = d.fromAttribute(i, l.type);
      this[s] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, s = !1, r) {
    var a;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[e]), o ?? (o = l.getPropertyOptions(e)), !((o.hasChanged ?? Te)(r, i) || o.useDefault && o.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(l._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: s, wrapped: r }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: l } = a, d = this[r];
        l !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, a, d);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (o = this._$EO) == null || o.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((o) => {
      var s;
      return (s = o.hostUpdated) == null ? void 0 : s.call(o);
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[G("elementProperties")] = /* @__PURE__ */ new Map(), j[G("finalized")] = /* @__PURE__ */ new Map(), me == null || me({ ReactiveElement: j }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, Ve = (t) => t, de = J.trustedTypes, We = de ? de.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, rt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, at = "?" + A, _t = `<${at}>`, H = document, K = () => H.createComment(""), Q = (t) => t === null || typeof t != "object" && typeof t != "function", Ae = Array.isArray, zt = (t) => Ae(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ve = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ze = /-->/g, Ge = />/g, I = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Je = /'/g, Ke = /"/g, nt = /^(?:script|style|textarea|title)$/i, lt = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), n = lt(1), y = lt(2), B = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Qe = /* @__PURE__ */ new WeakMap(), M = H.createTreeWalker(H, 129);
function dt(t, e) {
  if (!Ae(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return We !== void 0 ? We.createHTML(e) : e;
}
const kt = (t, e) => {
  const i = t.length - 1, o = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Z;
  for (let l = 0; l < i; l++) {
    const d = t[l];
    let p, g, h = -1, m = 0;
    for (; m < d.length && (a.lastIndex = m, g = a.exec(d), g !== null); ) m = a.lastIndex, a === Z ? g[1] === "!--" ? a = Ze : g[1] !== void 0 ? a = Ge : g[2] !== void 0 ? (nt.test(g[2]) && (s = RegExp("</" + g[2], "g")), a = I) : g[3] !== void 0 && (a = I) : a === I ? g[0] === ">" ? (a = s ?? Z, h = -1) : g[1] === void 0 ? h = -2 : (h = a.lastIndex - g[2].length, p = g[1], a = g[3] === void 0 ? I : g[3] === '"' ? Ke : Je) : a === Ke || a === Je ? a = I : a === Ze || a === Ge ? a = Z : (a = I, s = void 0);
    const x = a === I && t[l + 1].startsWith("/>") ? " " : "";
    r += a === Z ? d + _t : h >= 0 ? (o.push(p), d.slice(0, h) + rt + d.slice(h) + A + x) : d + A + (h === -2 ? l : x);
  }
  return [dt(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class Y {
  constructor({ strings: e, _$litType$: i }, o) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const l = e.length - 1, d = this.parts, [p, g] = kt(e, i);
    if (this.el = Y.createElement(p, o), M.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = M.nextNode()) !== null && d.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(rt)) {
          const m = g[a++], x = s.getAttribute(h).split(A), u = /([.?@])?(.*)/.exec(m);
          d.push({ type: 1, index: r, name: u[2], strings: x, ctor: u[1] === "." ? At : u[1] === "?" ? Ct : u[1] === "@" ? Et : he }), s.removeAttribute(h);
        } else h.startsWith(A) && (d.push({ type: 6, index: r }), s.removeAttribute(h));
        if (nt.test(s.tagName)) {
          const h = s.textContent.split(A), m = h.length - 1;
          if (m > 0) {
            s.textContent = de ? de.emptyScript : "";
            for (let x = 0; x < m; x++) s.append(h[x], K()), M.nextNode(), d.push({ type: 2, index: ++r });
            s.append(h[m], K());
          }
        }
      } else if (s.nodeType === 8) if (s.data === at) d.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(A, h + 1)) !== -1; ) d.push({ type: 7, index: r }), h += A.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const o = H.createElement("template");
    return o.innerHTML = e, o;
  }
}
function L(t, e, i = t, o) {
  var a, l;
  if (e === B) return e;
  let s = o !== void 0 ? (a = i._$Co) == null ? void 0 : a[o] : i._$Cl;
  const r = Q(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = s : i._$Cl = s), s !== void 0 && (e = L(t, s._$AS(t, e.values), s, o)), e;
}
class Tt {
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
    const { el: { content: i }, parts: o } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? H).importNode(i, !0);
    M.currentNode = s;
    let r = M.nextNode(), a = 0, l = 0, d = o[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let p;
        d.type === 2 ? p = new se(r, r.nextSibling, this, e) : d.type === 1 ? p = new d.ctor(r, d.name, d.strings, this, e) : d.type === 6 && (p = new Ot(r, this, e)), this._$AV.push(p), d = o[++l];
      }
      a !== (d == null ? void 0 : d.index) && (r = M.nextNode(), a++);
    }
    return M.currentNode = H, s;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class se {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, o, s) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = L(this, e, i), Q(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== B && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : zt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== v && Q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: i, _$litType$: o } = e, s = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Y.createElement(dt(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(i);
    else {
      const a = new Tt(s, this), l = a.u(this.options);
      a.p(i), this.T(l), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Qe.get(e.strings);
    return i === void 0 && Qe.set(e.strings, i = new Y(e)), i;
  }
  k(e) {
    Ae(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, s = 0;
    for (const r of e) s === i.length ? i.push(o = new se(this.O(K()), this.O(K()), this, this.options)) : o = i[s], o._$AI(r), s++;
    s < i.length && (this._$AR(o && o._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, i); e !== this._$AB; ) {
      const s = Ve(e).nextSibling;
      Ve(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class he {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, s, r) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = v;
  }
  _$AI(e, i = this, o, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = L(this, e, i, 0), a = !Q(e) || e !== this._$AH && e !== B, a && (this._$AH = e);
    else {
      const l = e;
      let d, p;
      for (e = r[0], d = 0; d < r.length - 1; d++) p = L(this, l[o + d], i, d), p === B && (p = this._$AH[d]), a || (a = !Q(p) || p !== this._$AH[d]), p === v ? e = v : e !== v && (e += (p ?? "") + r[d + 1]), this._$AH[d] = p;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class At extends he {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
class Ct extends he {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== v);
  }
}
class Et extends he {
  constructor(e, i, o, s, r) {
    super(e, i, o, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = L(this, e, i, 0) ?? v) === B) return;
    const o = this._$AH, s = e === v && o !== v || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, r = e !== v && (o === v || s);
    s && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ot {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    L(this, e);
  }
}
const fe = J.litHtmlPolyfillSupport;
fe == null || fe(Y, se), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.3");
const Pt = (t, e, i) => {
  const o = (i == null ? void 0 : i.renderBefore) ?? e;
  let s = o._$litPart$;
  if (s === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    o._$litPart$ = s = new se(e.insertBefore(K(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
class f extends j {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Pt(i, this.renderRoot, this.renderOptions);
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
    return B;
  }
}
var st;
f._$litElement$ = !0, f.finalized = !0, (st = D.litElementHydrateSupport) == null || st.call(D, { LitElement: f });
const be = D.litElementPolyfillSupport;
be == null || be({ LitElement: f });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.2");
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
const St = { attribute: !0, type: String, converter: le, reflect: !1, hasChanged: Te }, It = (t = St, e, i) => {
  const { kind: o, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), o === "accessor") {
    const { name: a } = i;
    return { set(l) {
      const d = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(a, d, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, t, l), l;
    } };
  }
  if (o === "setter") {
    const { name: a } = i;
    return function(l) {
      const d = this[a];
      e.call(this, l), this.requestUpdate(a, d, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function c(t) {
  return (e, i) => typeof i == "object" ? It(t, e, i) : ((o, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, o), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function oe(t) {
  return c({ ...t, state: !0, attribute: !1 });
}
const w = b`
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
function Mt(t) {
  if (t.entities !== void 0) {
    if (!Array.isArray(t.entities) || t.entities.length === 0)
      throw new Error("themo-card: 'entities' must be a non-empty list of climate entities");
    for (const s of t.entities)
      if (typeof s != "string" || !s.startsWith("climate."))
        throw new Error(`themo-card: 'entities' must contain only climate.* (got ${s})`);
  }
  const e = t.step ?? 0.5;
  if (typeof e != "number" || e <= 0)
    throw new Error("themo-card: 'step' must be a positive number");
  const i = t.quick_actions ?? [], o = t.layout ?? "auto";
  if (o !== "auto" && o !== "desktop" && o !== "tablet" && o !== "mobile")
    throw new Error("themo-card: 'layout' must be auto, desktop, tablet, or mobile");
  return {
    type: t.type,
    title: t.title ?? "Themo Heating",
    entities: t.entities,
    default_zone: t.default_zone,
    step: e,
    sun_entity: t.sun_entity,
    energy: t.energy,
    quick_actions: i,
    layout: o
  };
}
const Dt = 84, X = 2 * Math.PI * Dt;
function Ce(t, e, i) {
  if (t === null || i <= e) return X;
  const o = Math.min(1, Math.max(0, (t - e) / (i - e)));
  return X * (1 - o);
}
function Ee(t, e, i, o) {
  const s = Math.round(t / o) * o, r = Math.min(i, Math.max(e, s)), a = (String(o).split(".")[1] || "").length;
  return Number(r.toFixed(a));
}
function Ht(t, e) {
  var a, l;
  const i = (a = t.entities) == null ? void 0 : a[e], o = i == null ? void 0 : i.device_id;
  if (!o) return null;
  const s = (l = t.devices) == null ? void 0 : l[o], r = (s == null ? void 0 : s.identifiers) ?? [];
  for (const d of r)
    if (d[0] === "pd_hathemo") {
      const p = parseInt(d[1], 10);
      return Number.isNaN(p) ? null : p;
    }
  return null;
}
const qt = { off: "off", heat: "heat", auto: "auto" };
function k(t) {
  if (t == null || t === "" || t === "unknown" || t === "unavailable") return null;
  const e = Number(t);
  return Number.isNaN(e) ? null : e;
}
function Rt(t, e) {
  if (e) return e;
  const i = t.entities ?? {};
  return Object.keys(i).filter((o) => {
    var s;
    return o.startsWith("climate.") && ((s = i[o]) == null ? void 0 : s.platform) === "pd_hathemo";
  }).sort();
}
function U(t, e, i, o, s = !1) {
  var a;
  if (!e) return null;
  const r = t.entities ?? {};
  for (const l of Object.keys(r))
    if (((a = r[l]) == null ? void 0 : a.device_id) === e && l.startsWith(i + ".") && (s ? l.endsWith("_" + o) : l.includes(o)))
      return l;
  return null;
}
function Nt(t, e, i) {
  var x, u, _, Me, De, He, qe, Re, Ne;
  const o = t.states[e];
  if (!o) return null;
  const s = o.attributes, r = (u = (x = t.entities) == null ? void 0 : x[e]) == null ? void 0 : u.device_id, a = U(t, r, "sensor", "room_temperature"), l = U(t, r, "sensor", "floor_temperature"), d = U(t, r, "sensor", "outside_temperature"), p = U(t, r, "binary_sensor", "heating"), g = U(t, r, "light", "backlight"), h = U(t, r, "sensor", "heating_today", !0), m = (Ue) => Ue ? t.states[Ue] : void 0;
  return {
    climateEntityId: e,
    name: s.friendly_name ?? e,
    currentTemp: k(s.current_temperature),
    targetTemp: k(s.temperature),
    mode: qt[o.state] ?? "off",
    heating: (s.hvac_action ?? ((_ = m(p)) == null ? void 0 : _.state)) === "heating" || ((Me = m(p)) == null ? void 0 : Me.state) === "on",
    minTemp: k(s.min_temp) ?? 5,
    maxTemp: k(s.max_temp) ?? 35,
    step: k(s.target_temp_step) ?? i,
    roomTemp: k((De = m(a)) == null ? void 0 : De.state),
    floorTemp: k((He = m(l)) == null ? void 0 : He.state),
    outsideTemp: k((qe = m(d)) == null ? void 0 : qe.state),
    heatingTodayPct: k((Re = m(h)) == null ? void 0 : Re.state),
    backlightEntityId: g,
    backlightOn: g ? ((Ne = m(g)) == null ? void 0 : Ne.state) === "on" : null,
    themoDeviceId: Ht(t, e),
    presetModes: Array.isArray(s.preset_modes) ? s.preset_modes : [],
    presetMode: s.preset_mode ?? null
  };
}
function Ut(t) {
  return t ? t.schedules.find((e) => e.active) ?? null : null;
}
function ct(t, e) {
  const i = t.setpoints.filter((a) => a.day === e).sort((a, l) => a.hour - l.hour), o = new Array(24).fill(null);
  if (i.length === 0) return o;
  let s = null, r = 0;
  for (let a = 0; a < 24; a++) {
    for (; r < i.length && i[r].hour === a; )
      s = i[r].value, r++;
    o[a] = s;
  }
  return o;
}
function jt(t, e, i) {
  const o = ct(t, e), s = o[i];
  for (let r = i + 1; r < 24; r++)
    if (o[r] !== null && o[r] !== s) return { hour: r, value: o[r] };
  return null;
}
class Bt {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  get(e, i) {
    const o = this.cache.get(i);
    if (o) return o;
    const s = this.fetch(e, i);
    return this.cache.set(i, s), s;
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
function xe(t, e, i) {
  return t.callService("climate", "set_temperature", { entity_id: e, temperature: i });
}
function ye(t, e, i) {
  return t.callService("climate", "set_hvac_mode", { entity_id: e, hvac_mode: i });
}
function Lt(t, e, i) {
  return t.callService("climate", "set_preset_mode", { entity_id: e, preset_mode: i });
}
function Ye(t, e, i) {
  return t.callService("light", i ? "turn_off" : "turn_on", { entity_id: e });
}
function $e(t, e) {
  const [i, o] = e.service.split(".", 2);
  return t.callService(i, o, e.service_data ?? {});
}
const ue = b`
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
var Ft = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, Oe = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Vt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Ft(e, i, s), s;
};
const Wt = { off: "Off", heat: "Heat", auto: "Auto" };
let ee = class extends f {
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
    return n`
      <div class="${e}" @click=${() => this.select()}>
        <div class="zone-head">
          <div>
            <div class="zone-name">${t.name}</div>
            <div class="zone-entity">${t.climateEntityId}</div>
          </div>
        </div>
        <div class="zone-temp">
          <div class="now">${t.currentTemp ?? "—"}<span class="unit">°</span></div>
          <div class="target">→ <span>${t.targetTemp !== null ? n`${t.targetTemp}°` : t.mode === "auto" ? n`<span class="auto-a">A</span>` : "—"}</span></div>
        </div>
        <div class="zone-meta">${t.heating ? n`<span class="st-heat">heating</span>` : "idle"}${t.heatingTodayPct !== null ? n` · <span class="pct">${t.heatingTodayPct}% today</span>` : ""}</div>
        <div class="zone-foot">
          <button class="mode-pill ${t.mode}"><span class="swatch"></span>${Wt[t.mode]}</button>
        </div>
      </div>`;
  }
};
ee.styles = [w, ue, b`
    :host{display:contents;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .zone-meta .st-heat { color: var(--heat); }
    .zone-meta .pct { color: var(--fg-soft); }
  `];
Oe([
  c({ attribute: !1 })
], ee.prototype, "zone", 2);
Oe([
  c({ type: Boolean })
], ee.prototype, "selected", 2);
ee = Oe([
  $("themo-zone-tile")
], ee);
var Zt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, N = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Gt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Zt(e, i, s), s;
};
let T = class extends f {
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
    return n`
      <section class="ha-card themo-overview">
        <div class="card-head">
          <div>
            <div class="h-title">${this.title}</div>
            <div class="h-sub">${this.zones.length} thermostats · pd_hathemo</div>
          </div>
          <div class="spacer"></div>
          ${t ? n`<span class="pill heat"><span class="dot"></span>Heating now</span>` : ""}
          ${this.outsideText ? n`<span class="pill outside"><span class="dot"></span>Outside ${this.outsideText}</span>` : ""}
        </div>

        <div class="strip">
          <div class="stat"><div class="label">Active zones</div><div class="val">${this.activeCount}<span class="unit">/ ${this.zones.length}</span></div></div>
          <div class="stat"><div class="label">House avg</div><div class="val">${this.houseAvg ?? "—"}<span class="unit">°C</span></div></div>
          ${this.sunText ? n`<div class="stat"><div class="label">Sunrise → Sunset</div><div class="val">${this.sunText}</div></div>` : ""}
        </div>

        <div class="zones">
          ${this.zones.map((e) => n`
            <themo-zone-tile .zone=${e} ?selected=${e.climateEntityId === this.selectedId}></themo-zone-tile>`)}
        </div>

        ${this.quickActions.length ? n`
          <div class="quick-actions">
            <span class="qa-label">Quick actions</span>
            ${this.quickActions.map((e) => n`
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
T.styles = [w, ue, b`:host{display:block;}`];
N([
  c({ attribute: !1 })
], T.prototype, "zones", 2);
N([
  c()
], T.prototype, "selectedId", 2);
N([
  c()
], T.prototype, "title", 2);
N([
  c({ attribute: !1 })
], T.prototype, "quickActions", 2);
N([
  c()
], T.prototype, "outsideText", 2);
N([
  c()
], T.prototype, "sunText", 2);
T = N([
  $("themo-overview")
], T);
var Jt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, F = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Kt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Jt(e, i, s), s;
};
const Qt = [
  { mode: "off", name: "Off", desc: "power off" },
  { mode: "heat", name: "Heat", desc: "manual setpoint" },
  { mode: "auto", name: "Auto", desc: "follow schedule" }
];
let E = class extends f {
  constructor() {
    super(...arguments), this.todayRow = null, this.nextChange = null, this.nowHour = 0, this.step = 0.5;
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = e.targetTemp ?? e.minTemp, o = Ee(i + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: o });
  }
  render() {
    const t = this.zone, e = Ce(t.currentTemp, t.minTemp, t.maxTemp), i = t.presetModes.length > 0;
    return n`
      <section class="ha-card themo-detail">
        <div class="detail-head">
          <div class="detail-eyebrow">Selected zone</div>
          <div class="detail-title">${t.name}</div>
          <div class="detail-entity">${t.climateEntityId}</div>
        </div>

        <div class="ring-stage">
          <div class="ring">
            ${y`<svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle cx="100" cy="100" r="84" fill="none" stroke="var(--heat)" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="${X}" stroke-dashoffset="${e}"
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
                <div class="val">${t.targetTemp !== null ? n`<span>${t.targetTemp}</span><span class="unit">°C</span>` : t.mode === "auto" ? n`<span class="auto-a">A</span>` : n`<span>—</span><span class="unit">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mode-row">
          ${Qt.map((o) => n`
            <div class="mode-tile ${t.mode === o.mode ? "selected" : ""}" data-mode=${o.mode}
              @click=${() => this.emit("mode-change", { mode: o.mode })}>
              <div><div class="name">${o.name}</div><div class="desc">${o.desc}</div></div>
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
    const e = this.todayRow ?? new Array(24).fill(null), i = Math.max(...e.map((s) => s ?? 0), 1), o = (s) => s === null ? 0 : Math.ceil(s / i * 3);
    return n`
      <div class="schedule">
        <div class="schedule-head">
          <div class="title">Today's schedule</div>
          <div class="next">${this.nextChange ? n`Next change <strong>${String(this.nextChange.hour).padStart(2, "0")}:00 → ${this.nextChange.value}°</strong>` : "No further changes today"}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${t.presetModes.map((s) => n`
            <button class="qa-chip ${t.presetMode === s ? "active" : ""}" data-preset=${s}
              @click=${() => this.emit("preset-change", { preset: s })}>${s}</button>`)}
        </div>
        <div class="heatmap">
          <div class="row-lbl">Today</div>
          <div class="hour-row">
            ${e.map((s, r) => n`<div class="cell"
              data-h=${o(s) || ""} ?data-now=${r === this.nowHour}></div>`)}
          </div>
        </div>
      </div>`;
  }
};
E.styles = [w, ue, b`:host{display:block;} .auto-a { color: var(--ok); font-weight: 600; }`];
F([
  c({ attribute: !1 })
], E.prototype, "zone", 2);
F([
  c({ attribute: !1 })
], E.prototype, "todayRow", 2);
F([
  c({ attribute: !1 })
], E.prototype, "nextChange", 2);
F([
  c({ type: Number })
], E.prototype, "nowHour", 2);
F([
  c({ type: Number })
], E.prototype, "step", 2);
E = F([
  $("themo-detail")
], E);
var Yt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, re = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Xt(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && Yt(e, i, s), s;
};
let q = class extends f {
  constructor() {
    super(...arguments), this.value = "", this.unit = "", this.sub = "", this.warm = !1;
  }
  render() {
    return n`
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
q.styles = [w, ue, b`:host{display:block;}`];
re([
  c()
], q.prototype, "value", 2);
re([
  c()
], q.prototype, "unit", 2);
re([
  c()
], q.prototype, "sub", 2);
re([
  c({ type: Boolean })
], q.prototype, "warm", 2);
q = re([
  $("themo-glance")
], q);
const ge = b`
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
var ei = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, ae = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? ti(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && ei(e, i, s), s;
};
const Xe = (t) => Math.round(t * 10) / 10;
let R = class extends f {
  constructor() {
    super(...arguments), this.zones = [], this.outsideText = null, this.energyToday = null, this.energyCost = null;
  }
  get activeCount() {
    return this.zones.filter((t) => t.heating).length;
  }
  avg(t) {
    const e = this.zones.map(t).filter((i) => i !== null);
    return e.length ? e.reduce((i, o) => i + o, 0) / e.length : null;
  }
  render() {
    const t = this.avg((o) => o.currentTemp), e = this.avg((o) => o.targetTemp), i = t !== null && e !== null ? Xe(t - e) : null;
    return n`
      <div class="head-card">
        <div class="row">
          ${this.activeCount > 0 ? n`<div class="badge"><span class="dot"></span>Heating now</div>` : n`<div></div>`}
          ${this.outsideText ? n`<div class="outside">Outside ${this.outsideText}</div>` : ""}
        </div>
        <div class="big-temp">
          <div class="now">${t !== null ? Xe(t) : "—"}<span class="unit">°</span></div>
          ${i !== null ? n`<div class="delta">${i >= 0 ? "+" : ""}${i.toFixed(1)}° vs target</div>` : ""}
        </div>
        <div class="sub">House average · ${this.activeCount} of ${this.zones.length} zones active</div>
        <div class="breakdown">
          <div class="b"><div class="k">Active</div><div class="v">${this.activeCount}<span class="small"> / ${this.zones.length}</span></div></div>
          ${this.energyToday ? n`<div class="b"><div class="k">Today kWh</div><div class="v">${this.energyToday}</div></div>` : ""}
          ${this.energyCost ? n`<div class="b"><div class="k">Cost</div><div class="v">${this.energyCost}</div></div>` : ""}
        </div>
      </div>`;
  }
};
R.styles = [w, ge, b`:host{display:block;}`];
ae([
  c({ attribute: !1 })
], R.prototype, "zones", 2);
ae([
  c()
], R.prototype, "outsideText", 2);
ae([
  c()
], R.prototype, "energyToday", 2);
ae([
  c()
], R.prototype, "energyCost", 2);
R = ae([
  $("themo-mobile-header")
], R);
var ii = Object.defineProperty, si = Object.getOwnPropertyDescriptor, pt = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? si(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && ii(e, i, s), s;
};
function ht(t) {
  return t.heating ? t.heatingTodayPct !== null ? `heating · ${t.heatingTodayPct}% today` : "heating" : t.floorTemp !== null ? `floor ${t.floorTemp}°` : t.mode === "off" ? "off" : t.mode === "auto" && t.currentTemp !== null && t.targetTemp !== null && t.currentTemp >= t.targetTemp ? "at setpoint" : t.mode;
}
const et = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`, oi = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`, ri = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
let ce = class extends f {
  icon() {
    return this.zone.heating ? et : this.zone.mode === "auto" ? oi : this.zone.mode === "off" ? ri : et;
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
    return n`
      <div class="${e}" @click=${() => this.open()}>
        <div class="ic">${this.icon()}</div>
        <div>
          <div class="name">${t.name}</div>
          <div class="meta">${t.heating ? n`<span class="st-heat">heating</span>${t.heatingTodayPct !== null ? n` · <span class="pct">${t.heatingTodayPct}% today</span>` : ""}` : ht(t)}</div>
        </div>
        <div class="now">${t.currentTemp ?? "—"}<span class="u">°</span><span class="tgt">→ ${t.targetTemp !== null ? n`${t.targetTemp}°` : t.mode === "auto" ? n`<span class="auto-a">A</span>` : "—"}</span></div>
        <div class="mp"></div>
      </div>`;
  }
};
ce.styles = [w, ge, b`
    :host{display:block;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .meta .st-heat { color: var(--heat); }
    .meta .pct { color: var(--fg-soft); }
  `];
pt([
  c({ attribute: !1 })
], ce.prototype, "zone", 2);
ce = pt([
  $("themo-zone-row")
], ce);
var ai = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, V = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? ni(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && ai(e, i, s), s;
};
let O = class extends f {
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
    return n`
      <themo-mobile-header .zones=${this.zones} .outsideText=${this.outsideText}
        .energyToday=${this.energyToday} .energyCost=${this.energyCost}></themo-mobile-header>

      ${this.quickActions.length ? n`
        <div class="chips-scroll">
          ${this.quickActions.map((e) => n`
            <button class="chip" @click=${() => this.dispatchEvent(new CustomEvent("quick-action", { detail: { action: e }, bubbles: !0, composed: !0 }))}>${e.name}</button>`)}
        </div>` : ""}

      <div class="section-label">
        <span>Zones</span>
        <span class="count">${this.zones.length} · ${this.heatingCount} heating</span>
      </div>
      <div class="zlist">
        ${this.zones.map((e) => n`<themo-zone-row .zone=${e}></themo-zone-row>`)}
      </div>

      ${t !== null ? n`
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
O.styles = [w, ge, b`:host{display:block;padding:4px;}`];
V([
  c({ attribute: !1 })
], O.prototype, "zones", 2);
V([
  c({ attribute: !1 })
], O.prototype, "quickActions", 2);
V([
  c()
], O.prototype, "outsideText", 2);
V([
  c()
], O.prototype, "energyToday", 2);
V([
  c()
], O.prototype, "energyCost", 2);
O = V([
  $("themo-mobile-view")
], O);
var li = Object.defineProperty, di = Object.getOwnPropertyDescriptor, Pe = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? di(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && li(e, i, s), s;
};
const we = 58, tt = 2 * Math.PI * we, ci = [
  { mode: "off", name: "Off", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: "heat", name: "Heat", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: "auto", name: "Auto", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` }
];
let te = class extends f {
  constructor() {
    super(...arguments), this.nextChangeText = null;
  }
  emit(t, e = {}) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = Ee((e.targetTemp ?? e.minTemp) + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: i });
  }
  render() {
    const t = this.zone, e = Ce(t.currentTemp, t.minTemp, t.maxTemp) / X * tt;
    return n`
      <div class="sheet-backdrop" @click=${() => this.emit("sheet-close")}></div>
      <div class="sheet">
        <div class="grabber" @click=${() => this.emit("sheet-close")}></div>
        <div class="head">
          <div class="name">${t.name}</div>
          <div class="entity">${t.climateEntityId}</div>
        </div>
        <div class="dial-row">
          <div class="mini-ring">
            ${y`<svg viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="${we}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
              <circle cx="70" cy="70" r="${we}" fill="none" stroke="var(--heat)" stroke-width="8"
                stroke-linecap="round" stroke-dasharray="${tt}" stroke-dashoffset="${e}"
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
                <div class="val">${t.targetTemp !== null ? n`${t.targetTemp}<span class="u">°C</span>` : t.mode === "auto" ? n`<span class="auto-a">A</span>` : n`—<span class="u">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="mode-row">
          ${ci.map((i) => n`
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
te.styles = [w, ge, b`:host{display:contents;} .auto-a { color: var(--ok); font-weight: 600; }`];
Pe([
  c({ attribute: !1 })
], te.prototype, "zone", 2);
Pe([
  c()
], te.prototype, "nextChangeText", 2);
te = Pe([
  $("themo-mobile-sheet")
], te);
const Se = b`
  /* ---------- Top bar ---------- */
  .topbar {
    height: 64px;
    padding: 0 28px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 28px;
    background: rgba(20,32,46,0.5);
  }
  .topbar .vbar { width: 1px; height: 28px; background: var(--border); }
  .topbar .glance {
    display: flex; align-items: center; gap: 18px;
  }
  .topbar .gl {
    display: flex; align-items: baseline; gap: 6px;
  }
  .topbar .gl .v {
    font-size: 18px;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }
  .topbar .gl .v .u { font-size: 11px; color: var(--muted); margin-left: 1px; }
  .topbar .gl .l {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .topbar .spacer { flex: 1; }
  .topbar .badge {
    display: inline-flex; align-items: center; gap: 8px;
    height: 32px; padding: 0 14px;
    border-radius: 999px;
    border: 1px solid rgba(255,112,67,0.4);
    background: var(--heat-soft);
    color: var(--heat);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .topbar .badge .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--heat);
    box-shadow: 0 0 0 4px rgba(255,112,67,0.2);
    animation: pulse 1.6s infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,112,67,0.4); }
    50% { box-shadow: 0 0 0 7px rgba(255,112,67,0); }
  }

  /* ---------- Zones grid (left, big) ---------- */
  .zones-grid {
    padding: 24px 24px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 14px;
  }
  .ztile {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 18px 20px 18px;
    display: flex; flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    min-height: 0;
    transition: border-color .12s, background .12s;
  }
  .ztile:hover { border-color: var(--border-2); }
  .ztile.selected {
    border-color: var(--accent);
    background: linear-gradient(180deg, rgba(3,169,244,0.08), transparent 70%), var(--surface);
  }
  .ztile.heating {
    background: linear-gradient(180deg, rgba(255,112,67,0.1), transparent 60%), var(--surface);
  }
  .ztile.heating::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    border: 1px solid rgba(255,112,67,0.4);
    pointer-events: none;
  }
  .ztile.off {
    background: rgba(255,255,255,0.02);
    color: var(--fg-soft);
  }

  .ztile .head {
    display: flex; align-items: flex-start;
    gap: 10px;
  }
  .ztile .head .name {
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.005em;
    flex: 1;
  }
  .ztile .head .entity {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted-2);
    margin-top: 2px;
    letter-spacing: 0.02em;
  }
  .ztile .mp {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 4px 8px;
    border: 1px solid var(--border-2);
    border-radius: 6px;
    background: rgba(255,255,255,0.02);
  }
  .ztile.heating .mp { color: var(--heat); border-color: rgba(255,112,67,0.4); background: rgba(255,112,67,0.08); }
  .ztile.auto .mp { color: var(--accent); border-color: rgba(3,169,244,0.4); background: rgba(3,169,244,0.06); }
  .ztile .mp .sw { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  .ztile .big-temp {
    display: flex; align-items: baseline;
    gap: 6px;
    margin: 12px 0 8px;
  }
  .ztile .big-temp .now {
    font-size: 64px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }
  .ztile.off .big-temp .now { color: var(--muted); font-weight: 200; }
  .ztile .big-temp .u {
    font-size: 24px; color: var(--muted); font-weight: 300;
  }
  .ztile .big-temp .delta {
    font-size: 13px;
    color: var(--ok);
    font-family: var(--font-mono);
    margin-left: 4px;
    letter-spacing: 0.02em;
  }
  .ztile .big-temp .delta.warn { color: var(--heat); }
  .ztile .big-temp .delta.cool { color: var(--accent); }

  .ztile .target-line {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--fg-soft);
    letter-spacing: 0.03em;
  }
  .ztile .target-line .arrow { color: var(--muted); }
  .ztile .target-line .target { color: var(--fg); }
  .ztile .meta-line {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.02em;
    margin-top: 4px;
    height: 14px;
  }

  /* ---------- Right rail ---------- */
  .rail {
    background: var(--surface-2);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 24px 22px;
    overflow: hidden;
    gap: 20px;
  }

  .focus-card {
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 14px;
    padding: 18px;
  }
  .focus-card .label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .focus-card .name {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin-bottom: 16px;
  }
  .focus-card .ring-wrap {
    display: grid; place-items: center;
    margin-bottom: 14px;
    position: relative;
  }
  .focus-card svg.ring { width: 180px; height: 180px; }
  .focus-card .ring-num {
    position: absolute; inset: 0;
    display: grid; place-items: center;
  }
  .focus-card .ring-num .big {
    font-size: 44px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .focus-card .ring-num .big .u { font-size: 16px; color: var(--muted); }
  .focus-card .ring-num .cap {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 4px;
  }
  .stepper {
    display: grid; grid-template-columns: 56px 1fr 56px;
    height: 60px;
    border-radius: 14px;
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    overflow: hidden;
  }
  .stepper button {
    border: 0; background: transparent;
    color: var(--accent);
    font-size: 26px;
    line-height: 1;
    cursor: pointer;
    font-family: var(--font-sans);
  }
  .stepper .val {
    display: grid; place-items: center;
    font-family: var(--font-mono);
    font-size: 22px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .stepper .val .u { font-size: 11px; color: var(--muted); margin-left: 2px; }

  .mode-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-top: 12px;
  }
  .mode-tile {
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    border-radius: 10px;
    padding: 10px 8px;
    display: flex; flex-direction: column; align-items: center;
    gap: 4px;
    cursor: pointer;
    color: var(--fg-soft);
  }
  .mode-tile.selected {
    background: rgba(255,112,67,0.12);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .mode-tile svg { width: 18px; height: 18px; }
  .mode-tile .name {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .qa-stack {
    display: flex; flex-direction: column; gap: 8px;
  }
  .qa-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .qa-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .qa-btn {
    background: var(--surface);
    border: 1px solid var(--border-2);
    border-radius: 12px;
    padding: 14px 12px;
    color: var(--fg-soft);
    text-align: left;
    cursor: pointer;
    display: flex; flex-direction: column; gap: 4px;
    font-family: inherit;
    transition: background .12s, color .12s, border-color .12s;
  }
  .qa-btn:hover {
    background: var(--surface-3);
    border-color: var(--accent);
    color: var(--fg);
  }
  .qa-btn.active {
    background: rgba(255,112,67,0.12);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .qa-btn .lbl-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500;
  }
  .qa-btn .lbl-row svg { width: 16px; height: 16px; }
  .qa-btn .sub {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.06em;
  }
  .qa-btn.active .sub { color: rgba(255,112,67,0.7); }
  .qa-btn.wide { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: space-between; }
  .qa-btn.wide .lbl-row { font-size: 12px; }

  /* Bottom strip on left side (daily heating) */
  .zones-foot {
    border-top: 1px solid var(--border);
    padding: 14px 24px;
    display: grid;
    grid-template-columns: 140px 1fr auto auto auto auto;
    gap: 20px;
    align-items: center;
  }
  .zones-foot .lbl {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .zones-foot .bar {
    height: 6px;
    border-radius: 999px;
    background: rgba(255,255,255,0.05);
    overflow: hidden;
    position: relative;
  }
  .zones-foot .bar::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 9.99%, var(--border) 9.99%, var(--border) 10%);
    pointer-events: none;
  }
  .zones-foot .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--heat), #ffb74d);
    width: 38%;
    border-radius: 999px;
  }
  .zones-foot .stat {
    display: flex; flex-direction: column; align-items: flex-end;
    gap: 1px;
  }
  .zones-foot .stat .v {
    font-family: var(--font-mono);
    font-size: 15px;
    color: var(--fg);
    letter-spacing: -0.005em;
  }
  .zones-foot .stat .v .u { font-size: 10px; color: var(--muted); }
  .zones-foot .stat .l {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
`;
var pi = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, Ie = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? hi(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && pi(e, i, s), s;
};
const ui = { off: "Off", heat: "Heat", auto: "Auto" };
function gi(t, e) {
  if (t === null || e === null) return null;
  const i = Math.round((t - e) * 10) / 10;
  return { text: `${i >= 0 ? "+" : ""}${i.toFixed(1)}°`, cool: i < 0 };
}
let ie = class extends f {
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
    const t = this.zone, e = gi(t.currentTemp, t.targetTemp), i = ["ztile", t.heating ? "heating" : t.mode, this.selected ? "selected" : ""].join(" ");
    return n`
      <div class="${i}" @click=${() => this.select()}>
        <div>
          <div class="head">
            <div>
              <div class="name">${t.name}</div>
              <div class="entity">${t.climateEntityId}</div>
            </div>
            <div class="mp"><span class="sw"></span>${ui[t.mode]}</div>
          </div>
          <div class="big-temp">
            <div class="now">${t.currentTemp ?? "—"}</div>
            <div class="u">°C</div>
            ${e ? n`<div class="delta ${e.cool ? "cool" : ""}">${e.text}</div>` : ""}
          </div>
          <div class="target-line">→ <span class="target">${t.targetTemp !== null ? n`${t.targetTemp}°` : t.mode === "auto" ? n`<span class="auto-a">A</span>` : "—"}</span>${t.targetTemp !== null ? " setpoint" : ""}</div>
          <div class="meta-line">${t.heating ? n`<span class="st-heat">heating</span>${t.heatingTodayPct !== null ? n` · <span class="pct">${t.heatingTodayPct}% today</span>` : ""}` : ht(t)}</div>
        </div>
      </div>`;
  }
};
ie.styles = [w, Se, b`
    :host{display:block;min-height:0;} .ztile{height:100%;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .meta-line .st-heat { color: var(--heat); }
    .meta-line .pct { color: var(--fg-soft); }
  `];
Ie([
  c({ attribute: !1 })
], ie.prototype, "zone", 2);
Ie([
  c({ type: Boolean })
], ie.prototype, "selected", 2);
ie = Ie([
  $("themo-tablet-tile")
], ie);
var mi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, ut = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? vi(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && mi(e, i, s), s;
};
const _e = 80, it = 2 * Math.PI * _e, fi = [
  { mode: "off", name: "Off", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: "heat", name: "Heat", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: "auto", name: "Auto", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` }
];
let pe = class extends f {
  emit(t, e = {}) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = Ee((e.targetTemp ?? e.minTemp) + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: i });
  }
  render() {
    const t = this.zone, e = Ce(t.currentTemp, t.minTemp, t.maxTemp) / X * it;
    return n`
      <div class="focus-card">
        <div class="label">Selected zone</div>
        <div class="name">${t.name}</div>
        <div class="ring-wrap">
          ${y`<svg class="ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="${_e}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
            <circle cx="100" cy="100" r="${_e}" fill="none" stroke="var(--heat)" stroke-width="8"
              stroke-linecap="round" stroke-dasharray="${it}" stroke-dashoffset="${e}"
              transform="rotate(-90 100 100)"/>
          </svg>`}
          <div class="ring-num"><div>
            <div class="big">${t.currentTemp ?? "—"}<span class="u">°C</span></div>
            <div class="cap">Room</div>
          </div></div>
        </div>
        <div class="stepper">
          <button data-step-dn @click=${() => this.bump(-t.step)} ?disabled=${t.mode !== "heat"}>−</button>
          <div class="val">${t.targetTemp !== null ? n`${t.targetTemp}<span class="u">°C</span>` : t.mode === "auto" ? n`<span class="auto-a">A</span>` : n`—<span class="u">°C</span>`}</div>
          <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
        </div>
        <div class="mode-row">
          ${fi.map((i) => n`
            <div class="mode-tile ${t.mode === i.mode ? "selected" : ""}" data-mode=${i.mode}
              @click=${() => this.emit("mode-change", { mode: i.mode })}>
              ${i.icon}<div class="name">${i.name}</div>
            </div>`)}
        </div>
        ${t.presetModes.length ? n`
          <div class="preset-row">
            ${t.presetModes.map((i) => n`
              <button class="pchip ${t.presetMode === i ? "active" : ""}" data-preset=${i}
                @click=${() => this.emit("preset-change", { preset: i })}>${i}</button>`)}
          </div>` : ""}
      </div>`;
  }
};
pe.styles = [w, Se, b`
    :host { display: block; }
    .preset-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
    .pchip {
      height: 30px; padding: 0 12px; border-radius: 999px;
      background: var(--surface-2); border: 1px solid var(--border-2);
      color: var(--fg-soft); font-size: 12px; font-family: inherit; cursor: pointer;
    }
    .pchip.active { background: rgba(3,169,244,0.12); border-color: rgba(3,169,244,0.5); color: var(--accent); }
    .auto-a { color: var(--ok); font-weight: 600; }
  `];
ut([
  c({ attribute: !1 })
], pe.prototype, "zone", 2);
pe = ut([
  $("themo-tablet-focus")
], pe);
var bi = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, S = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? xi(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && bi(e, i, s), s;
};
const yi = (t) => Math.round(t * 10) / 10;
let z = class extends f {
  constructor() {
    super(...arguments), this.zones = [], this.selectedId = "", this.quickActions = [], this.outsideText = null, this.energyToday = null, this.energyCost = null, this.energySpot = null;
  }
  get heatingCount() {
    return this.zones.filter((t) => t.heating).length;
  }
  get houseAvg() {
    const t = this.zones.map((e) => e.currentTemp).filter((e) => e !== null);
    return t.length ? yi(t.reduce((e, i) => e + i, 0) / t.length) : null;
  }
  get dailyAvg() {
    const t = this.zones.map((e) => e.heatingTodayPct).filter((e) => e !== null);
    return t.length ? Math.round(t.reduce((e, i) => e + i, 0) / t.length) : null;
  }
  get selectedZone() {
    return this.zones.find((t) => t.climateEntityId === this.selectedId) ?? this.zones[0] ?? null;
  }
  render() {
    const t = this.selectedZone, e = this.dailyAvg;
    return n`
      <div class="wrap">
        <div class="topbar">
          <div class="glance">
            ${this.outsideText ? n`<div class="gl"><div class="l">Outside</div><div class="v">${this.outsideText}</div></div>` : ""}
            <div class="gl"><div class="l">House avg</div><div class="v">${this.houseAvg ?? "—"}<span class="u">°C</span></div></div>
            ${this.energyToday ? n`<div class="gl"><div class="l">Today</div><div class="v">${this.energyToday}<span class="u">kWh</span></div></div>` : ""}
          </div>
          <div class="spacer"></div>
          ${this.heatingCount > 0 ? n`<div class="badge"><span class="dot"></span>Heating · ${this.heatingCount} of ${this.zones.length}</div>` : ""}
        </div>

        <div class="zones-grid">
          ${this.zones.map((i) => n`
            <themo-tablet-tile .zone=${i} ?selected=${i.climateEntityId === ((t == null ? void 0 : t.climateEntityId) ?? "")}></themo-tablet-tile>`)}
        </div>

        <div class="zones-foot">
          <div class="lbl">Daily heating · all zones</div>
          <div class="bar"><div class="fill" style="width:${e ?? 0}%"></div></div>
          <div class="stat"><div class="v">${e ?? "—"}<span class="u">%</span></div><div class="l">heating</div></div>
          ${this.energyToday ? n`<div class="stat"><div class="v">${this.energyToday}<span class="u">kWh</span></div><div class="l">energy</div></div>` : ""}
          ${this.energyCost ? n`<div class="stat"><div class="v">${this.energyCost}</div><div class="l">cost</div></div>` : ""}
          ${this.energySpot ? n`<div class="stat"><div class="v">${this.energySpot}</div><div class="l">spot avg</div></div>` : ""}
        </div>

        <aside class="rail">
          ${t ? n`<themo-tablet-focus .zone=${t}></themo-tablet-focus>` : ""}
          ${this.quickActions.length ? n`
            <div class="qa-stack">
              <div class="qa-label">House actions</div>
              <div class="qa-row">
                ${this.quickActions.map((i) => n`
                  <button class="qa-btn" @click=${() => this.dispatchEvent(new CustomEvent("quick-action", { detail: { action: i }, bubbles: !0, composed: !0 }))}>
                    <div class="lbl-row">${i.name}</div>
                    ${i.description ? n`<div class="sub">${i.description}</div>` : ""}
                  </button>`)}
              </div>
            </div>` : ""}
        </aside>
      </div>`;
  }
};
z.styles = [w, Se, b`
    :host { display: block; }
    .wrap {
      display: grid;
      grid-template-columns: 1fr 320px;
      grid-template-rows: auto 1fr auto;
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      background: var(--surface-2);
    }
    .topbar { grid-column: 1 / -1; }
    .zones-grid { grid-row: 2; grid-column: 1; }
    .zones-foot { grid-row: 3; grid-column: 1; }
    .rail { grid-row: 2 / span 2; grid-column: 2; }
  `];
S([
  c({ attribute: !1 })
], z.prototype, "zones", 2);
S([
  c()
], z.prototype, "selectedId", 2);
S([
  c({ attribute: !1 })
], z.prototype, "quickActions", 2);
S([
  c()
], z.prototype, "outsideText", 2);
S([
  c()
], z.prototype, "energyToday", 2);
S([
  c()
], z.prototype, "energyCost", 2);
S([
  c()
], z.prototype, "energySpot", 2);
z = S([
  $("themo-tablet-view")
], z);
var $i = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, W = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? wi(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (o ? a(e, i, s) : a(s)) || s);
  return o && s && $i(e, i, s), s;
};
let P = class extends f {
  constructor() {
    super(...arguments), this.selectedId = null, this.scheduleData = null, this.band = "desktop", this.sheetOpen = !1, this.schedules = new Bt(), this.lastFetchedDeviceId = null;
  }
  setConfig(t) {
    this.config = Mt(t);
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
      this.band = e <= 0 ? "desktop" : e < 600 ? "mobile" : e < 1100 ? "tablet" : "desktop";
    }), this.resizeObserver.observe(this));
  }
  disconnectedCallback() {
    var t;
    (t = this.resizeObserver) == null || t.disconnect(), super.disconnectedCallback();
  }
  effectiveLayout() {
    return this.config.layout !== "auto" ? this.config.layout : this.band;
  }
  zones() {
    return !this._hass || !this.config ? [] : Rt(this._hass, this.config.entities).map((t) => Nt(this._hass, t, this.config.step)).filter((t) => t !== null);
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
    const i = (o) => o ? new Date(o).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—";
    return `${i(e.attributes.next_rising)} → ${i(e.attributes.next_setting)}`;
  }
  energyGlance() {
    var i;
    const t = (i = this.config.energy) == null ? void 0 : i.today_entity;
    if (!t) return "";
    const e = this._hass.states[t];
    return e ? n`<themo-glance .value=${e.state} .unit=${e.attributes.unit_of_measurement ?? "kWh"} .sub=${"today · all zones"}></themo-glance>` : "";
  }
  energyValue(t) {
    var o;
    if (!t) return null;
    const e = this._hass.states[t];
    if (!e || e.state === "unknown" || e.state === "unavailable") return null;
    const i = e.attributes.unit_of_measurement;
    return i && t === ((o = this.config.energy) == null ? void 0 : o.cost_entity) ? `${e.state} ${i}` : e.state;
  }
  onZoneOpen(t) {
    this.onSelect(t), this.sheetOpen = !0;
  }
  render() {
    var p, g, h, m, x;
    if (!this.config || !this._hass) return n``;
    const t = this.zones(), e = this.selected(t), i = (e == null ? void 0 : e.outsideTemp) ?? null, o = Ut(this.scheduleData), s = (/* @__PURE__ */ new Date()).getDay(), r = (/* @__PURE__ */ new Date()).getHours(), a = o ? ct(o, s) : null, l = o ? jt(o, s, r) : null, d = i !== null ? `${i}°C` : null;
    if (this.effectiveLayout() === "mobile") {
      const u = l ? `${String(l.hour).padStart(2, "0")}:00 → ${l.value}°` : null;
      return n`
        <themo-mobile-view
          .zones=${t} .quickActions=${this.config.quick_actions} .outsideText=${d}
          .energyToday=${this.energyValue((p = this.config.energy) == null ? void 0 : p.today_entity)}
          .energyCost=${this.energyValue((g = this.config.energy) == null ? void 0 : g.cost_entity)}
          @zone-open=${(_) => this.onZoneOpen(_.detail.entityId)}
          @quick-action=${(_) => $e(this._hass, _.detail.action)}
        ></themo-mobile-view>
        ${this.sheetOpen && e && (this.selectedId === null || e.climateEntityId === this.selectedId) ? n`<themo-mobile-sheet
          .zone=${e} .nextChangeText=${u}
          @sheet-close=${() => {
        this.sheetOpen = !1;
      }}
          @setpoint-change=${(_) => xe(this._hass, e.climateEntityId, _.detail.temperature)}
          @mode-change=${(_) => ye(this._hass, e.climateEntityId, _.detail.mode)}
          @backlight-toggle=${() => e.backlightEntityId && Ye(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
        ></themo-mobile-sheet>` : ""}`;
    }
    return this.effectiveLayout() === "tablet" ? n`
        <themo-tablet-view
          .zones=${t} .selectedId=${(e == null ? void 0 : e.climateEntityId) ?? ""}
          .quickActions=${this.config.quick_actions} .outsideText=${d}
          .energyToday=${this.energyValue((h = this.config.energy) == null ? void 0 : h.today_entity)}
          .energyCost=${this.energyValue((m = this.config.energy) == null ? void 0 : m.cost_entity)}
          .energySpot=${this.energyValue((x = this.config.energy) == null ? void 0 : x.spot_entity)}
          @zone-select=${(u) => this.onSelect(u.detail.entityId)}
          @quick-action=${(u) => $e(this._hass, u.detail.action)}
          @setpoint-change=${(u) => e && xe(this._hass, e.climateEntityId, u.detail.temperature)}
          @mode-change=${(u) => e && ye(this._hass, e.climateEntityId, u.detail.mode)}
          @preset-change=${(u) => e && this.onPreset(e, u.detail.preset)}
        ></themo-tablet-view>` : n`
      <div class="view">
        <themo-overview
          .zones=${t} .selectedId=${(e == null ? void 0 : e.climateEntityId) ?? ""} .title=${this.config.title}
          .quickActions=${this.config.quick_actions}
          .outsideText=${d}
          .sunText=${this.sunText()}
          @zone-select=${(u) => this.onSelect(u.detail.entityId)}
          @quick-action=${(u) => $e(this._hass, u.detail.action)}
        ></themo-overview>
        <div class="right-col">
          ${e ? n`<themo-detail
            .zone=${e} .todayRow=${a} .nextChange=${l} .nowHour=${r} .step=${this.config.step}
            @setpoint-change=${(u) => xe(this._hass, e.climateEntityId, u.detail.temperature)}
            @mode-change=${(u) => ye(this._hass, e.climateEntityId, u.detail.mode)}
            @preset-change=${(u) => this.onPreset(e, u.detail.preset)}
            @backlight-toggle=${() => e.backlightEntityId && Ye(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
          ></themo-detail>` : n`<div>No Themo thermostats found.</div>`}
          ${this.energyGlance()}
        </div>
      </div>`;
  }
  async onPreset(t, e) {
    await Lt(this._hass, t.climateEntityId, e), t.themoDeviceId !== null && (this.schedules.invalidate(t.themoDeviceId), this.lastFetchedDeviceId = null, this.maybeFetchSchedule());
  }
};
P.styles = [w, b`
    :host { display: block; }
    .view { display:grid; grid-template-columns: 1fr 460px; gap:24px; padding:8px; }
    .right-col { display:flex; flex-direction:column; gap:18px; }
  `];
W([
  oe()
], P.prototype, "config", 2);
W([
  oe()
], P.prototype, "selectedId", 2);
W([
  oe()
], P.prototype, "scheduleData", 2);
W([
  oe()
], P.prototype, "band", 2);
W([
  oe()
], P.prototype, "sheetOpen", 2);
P = W([
  $("themo-card")
], P);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "themo-card",
  name: "PapaDog's Themo Control Card",
  description: "Multi-thermostat companion card for the pd_hathemo integration"
});
export {
  P as ThemoCard
};
