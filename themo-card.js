/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge = globalThis, Le = ge.ShadowRoot && (ge.ShadyCSS === void 0 || ge.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, De = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== De) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Le && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = ot.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && ot.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Tt = (t) => new yt(typeof t == "string" ? t : t + "", void 0, De), f = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((o, s, r) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new yt(i, t, De);
}, Et = (t, e) => {
  if (Le) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const o = document.createElement("style"), s = ge.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = i.cssText, t.appendChild(o);
  }
}, rt = Le ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return Tt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ct, defineProperty: Ot, getOwnPropertyDescriptor: Pt, getOwnPropertyNames: St, getOwnPropertySymbols: It, getPrototypeOf: Mt } = Object, I = globalThis, nt = I.trustedTypes, Lt = nt ? nt.emptyScript : "", ke = I.reactiveElementPolyfillSupport, ie = (t, e) => t, me = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Lt : null;
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
} }, He = (t, e) => !Ct(t, e), at = { attribute: !0, type: String, converter: me, reflect: !1, useDefault: !1, hasChanged: He };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), I.litPropertyMetadata ?? (I.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let W = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = at) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(e, o, i);
      s !== void 0 && Ot(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: s, set: r } = Pt(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: s, set(n) {
      const l = s == null ? void 0 : s.call(this);
      r == null || r.call(this, n), this.requestUpdate(e, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ie("elementProperties"))) return;
    const e = Mt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ie("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ie("properties"))) {
      const i = this.properties, o = [...St(i), ...It(i)];
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
      for (const s of o) i.unshift(rt(s));
    } else e !== void 0 && i.push(rt(e));
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
    return Et(e, this.constructor.elementStyles), e;
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
      const n = (((r = o.converter) == null ? void 0 : r.toAttribute) !== void 0 ? o.converter : me).toAttribute(i, o.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var r, n;
    const o = this.constructor, s = o._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = o.getPropertyOptions(s), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : me;
      this._$Em = s;
      const h = c.fromAttribute(i, l.type);
      this[s] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, i, o, s = !1, r) {
    var n;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[e]), o ?? (o = l.getPropertyOptions(e)), !((o.hasChanged ?? He)(r, i) || o.useDefault && o.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(l._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: s, wrapped: r }, n) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: l } = n, c = this[r];
        l !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
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
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[ie("elementProperties")] = /* @__PURE__ */ new Map(), W[ie("finalized")] = /* @__PURE__ */ new Map(), ke == null || ke({ ReactiveElement: W }), (I.reactiveElementVersions ?? (I.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = globalThis, lt = (t) => t, ve = se.trustedTypes, ct = ve ? ve.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, $t = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, wt = "?" + S, Dt = `<${wt}>`, R = document, oe = () => R.createComment(""), re = (t) => t === null || typeof t != "object" && typeof t != "function", qe = Array.isArray, Ht = (t) => qe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", _e = `[ 	
\f\r]`, te = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, pt = />/g, H = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, ut = /"/g, kt = /^(?:script|style|textarea|title)$/i, _t = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), a = _t(1), y = _t(2), V = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), q = R.createTreeWalker(R, 129);
function zt(t, e) {
  if (!qe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(e) : e;
}
const qt = (t, e) => {
  const i = t.length - 1, o = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = te;
  for (let l = 0; l < i; l++) {
    const c = t[l];
    let h, g, u = -1, b = 0;
    for (; b < c.length && (n.lastIndex = b, g = n.exec(c), g !== null); ) b = n.lastIndex, n === te ? g[1] === "!--" ? n = dt : g[1] !== void 0 ? n = pt : g[2] !== void 0 ? (kt.test(g[2]) && (s = RegExp("</" + g[2], "g")), n = H) : g[3] !== void 0 && (n = H) : n === H ? g[0] === ">" ? (n = s ?? te, u = -1) : g[1] === void 0 ? u = -2 : (u = n.lastIndex - g[2].length, h = g[1], n = g[3] === void 0 ? H : g[3] === '"' ? ut : ht) : n === ut || n === ht ? n = H : n === dt || n === pt ? n = te : (n = H, s = void 0);
    const x = n === H && t[l + 1].startsWith("/>") ? " " : "";
    r += n === te ? c + Dt : u >= 0 ? (o.push(h), c.slice(0, u) + $t + c.slice(u) + S + x) : c + S + (u === -2 ? l : x);
  }
  return [zt(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class ne {
  constructor({ strings: e, _$litType$: i }, o) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const l = e.length - 1, c = this.parts, [h, g] = qt(e, i);
    if (this.el = ne.createElement(h, o), q.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = q.nextNode()) !== null && c.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith($t)) {
          const b = g[n++], x = s.getAttribute(u).split(S), T = /([.?@])?(.*)/.exec(b);
          c.push({ type: 1, index: r, name: T[2], strings: x, ctor: T[1] === "." ? Rt : T[1] === "?" ? Ut : T[1] === "@" ? jt : fe }), s.removeAttribute(u);
        } else u.startsWith(S) && (c.push({ type: 6, index: r }), s.removeAttribute(u));
        if (kt.test(s.tagName)) {
          const u = s.textContent.split(S), b = u.length - 1;
          if (b > 0) {
            s.textContent = ve ? ve.emptyScript : "";
            for (let x = 0; x < b; x++) s.append(u[x], oe()), q.nextNode(), c.push({ type: 2, index: ++r });
            s.append(u[b], oe());
          }
        }
      } else if (s.nodeType === 8) if (s.data === wt) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(S, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += S.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const o = R.createElement("template");
    return o.innerHTML = e, o;
  }
}
function Z(t, e, i = t, o) {
  var n, l;
  if (e === V) return e;
  let s = o !== void 0 ? (n = i._$Co) == null ? void 0 : n[o] : i._$Cl;
  const r = re(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = s : i._$Cl = s), s !== void 0 && (e = Z(t, s._$AS(t, e.values), s, o)), e;
}
class Nt {
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
    const { el: { content: i }, parts: o } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? R).importNode(i, !0);
    q.currentNode = s;
    let r = q.nextNode(), n = 0, l = 0, c = o[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let h;
        c.type === 2 ? h = new de(r, r.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (h = new Bt(r, this, e)), this._$AV.push(h), c = o[++l];
      }
      n !== (c == null ? void 0 : c.index) && (r = q.nextNode(), n++);
    }
    return q.currentNode = R, s;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
}
class de {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, o, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = Z(this, e, i), re(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== V && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ht(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && re(this._$AH) ? this._$AA.nextSibling.data = e : this.T(R.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: i, _$litType$: o } = e, s = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = ne.createElement(zt(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(i);
    else {
      const n = new Nt(s, this), l = n.u(this.options);
      n.p(i), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = gt.get(e.strings);
    return i === void 0 && gt.set(e.strings, i = new ne(e)), i;
  }
  k(e) {
    qe(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, s = 0;
    for (const r of e) s === i.length ? i.push(o = new de(this.O(oe()), this.O(oe()), this, this.options)) : o = i[s], o._$AI(r), s++;
    s < i.length && (this._$AR(o && o._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, i); e !== this._$AB; ) {
      const s = lt(e).nextSibling;
      lt(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class fe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, s, r) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = m;
  }
  _$AI(e, i = this, o, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = Z(this, e, i, 0), n = !re(e) || e !== this._$AH && e !== V, n && (this._$AH = e);
    else {
      const l = e;
      let c, h;
      for (e = r[0], c = 0; c < r.length - 1; c++) h = Z(this, l[o + c], i, c), h === V && (h = this._$AH[c]), n || (n = !re(h) || h !== this._$AH[c]), h === m ? e = m : e !== m && (e += (h ?? "") + r[c + 1]), this._$AH[c] = h;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Rt extends fe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Ut extends fe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class jt extends fe {
  constructor(e, i, o, s, r) {
    super(e, i, o, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Z(this, e, i, 0) ?? m) === V) return;
    const o = this._$AH, s = e === m && o !== m || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, r = e !== m && (o === m || s);
    s && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Bt {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Z(this, e);
  }
}
const ze = se.litHtmlPolyfillSupport;
ze == null || ze(ne, de), (se.litHtmlVersions ?? (se.litHtmlVersions = [])).push("3.3.3");
const Ft = (t, e, i) => {
  const o = (i == null ? void 0 : i.renderBefore) ?? e;
  let s = o._$litPart$;
  if (s === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    o._$litPart$ = s = new de(e.insertBefore(oe(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
class v extends W {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ft(i, this.renderRoot, this.renderOptions);
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
    return V;
  }
}
var xt;
v._$litElement$ = !0, v.finalized = !0, (xt = N.litElementHydrateSupport) == null || xt.call(N, { LitElement: v });
const Ae = N.litElementPolyfillSupport;
Ae == null || Ae({ LitElement: v });
(N.litElementVersions ?? (N.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = { attribute: !0, type: String, converter: me, reflect: !1, hasChanged: He }, Vt = (t = Wt, e, i) => {
  const { kind: o, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), o === "accessor") {
    const { name: n } = i;
    return { set(l) {
      const c = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, c, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, t, l), l;
    } };
  }
  if (o === "setter") {
    const { name: n } = i;
    return function(l) {
      const c = this[n];
      e.call(this, l), this.requestUpdate(n, c, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function d(t) {
  return (e, i) => typeof i == "object" ? Vt(t, e, i) : ((o, s, r) => {
    const n = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, o), n ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function L(t) {
  return d({ ...t, state: !0, attribute: !1 });
}
const k = f`
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
function Zt(t) {
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
const Gt = 84, ae = 2 * Math.PI * Gt;
function Ne(t, e, i) {
  if (t === null || i <= e) return ae;
  const o = Math.min(1, Math.max(0, (t - e) / (i - e)));
  return ae * (1 - o);
}
function Re(t, e, i, o) {
  const s = Math.round(t / o) * o, r = Math.min(i, Math.max(e, s)), n = (String(o).split(".")[1] || "").length;
  return Number(r.toFixed(n));
}
const G = 0.5;
function Ue(t, e) {
  const i = Math.round((t + e) * 10) / 10;
  return Math.min(500, Math.max(0, i));
}
function Kt(t, e) {
  var n, l;
  const i = (n = t.entities) == null ? void 0 : n[e], o = i == null ? void 0 : i.device_id;
  if (!o) return null;
  const s = (l = t.devices) == null ? void 0 : l[o], r = (s == null ? void 0 : s.identifiers) ?? [];
  for (const c of r)
    if (c[0] === "pd_hathemo") {
      const h = parseInt(c[1], 10);
      return Number.isNaN(h) ? null : h;
    }
  return null;
}
const Jt = { off: "off", heat: "heat", auto: "auto" };
function z(t) {
  if (t == null || t === "" || t === "unknown" || t === "unavailable") return null;
  const e = Number(t);
  return Number.isNaN(e) ? null : e;
}
function Qt(t, e) {
  if (e) return e;
  const i = t.entities ?? {};
  return Object.keys(i).filter((o) => {
    var s;
    return o.startsWith("climate.") && ((s = i[o]) == null ? void 0 : s.platform) === "pd_hathemo";
  }).sort();
}
function E(t, e, i, o, s = !1) {
  var n;
  if (!e) return null;
  const r = t.entities ?? {};
  for (const l of Object.keys(r))
    if (((n = r[l]) == null ? void 0 : n.device_id) === e && l.startsWith(i + ".") && (s ? l.endsWith("_" + o) : l.includes(o)))
      return l;
  return null;
}
function Yt(t, e, i) {
  var Ve, Ze, Ge, Ke, Je, Qe, Ye, Xe, et, tt;
  const o = t.states[e];
  if (!o) return null;
  const s = o.attributes, r = (Ze = (Ve = t.entities) == null ? void 0 : Ve[e]) == null ? void 0 : Ze.device_id, n = E(t, r, "sensor", "room_temperature"), l = E(t, r, "sensor", "floor_temperature"), c = E(t, r, "sensor", "outside_temperature"), h = E(t, r, "binary_sensor", "heating"), g = E(t, r, "light", "backlight"), u = E(t, r, "sensor", "heating_today", !0), b = E(t, r, "switch", "child_lock", !0), x = E(t, r, "number", "price_limit", !0), T = E(t, r, "binary_sensor", "connection", !0), p = (ue) => ue ? t.states[ue] : void 0, $ = (ue) => {
    var st;
    const it = (st = p(ue)) == null ? void 0 : st.state;
    return it === "on" ? !0 : it === "off" ? !1 : null;
  };
  return {
    climateEntityId: e,
    name: s.friendly_name ?? e,
    currentTemp: z(s.current_temperature),
    targetTemp: z(s.temperature),
    mode: Jt[o.state] ?? "off",
    heating: (s.hvac_action ?? ((Ge = p(h)) == null ? void 0 : Ge.state)) === "heating" || ((Ke = p(h)) == null ? void 0 : Ke.state) === "on",
    minTemp: z(s.min_temp) ?? 5,
    maxTemp: z(s.max_temp) ?? 35,
    step: z(s.target_temp_step) ?? i,
    roomTemp: z((Je = p(n)) == null ? void 0 : Je.state),
    floorTemp: z((Qe = p(l)) == null ? void 0 : Qe.state),
    outsideTemp: z((Ye = p(c)) == null ? void 0 : Ye.state),
    heatingTodayPct: z((Xe = p(u)) == null ? void 0 : Xe.state),
    backlightEntityId: g,
    backlightOn: g ? ((et = p(g)) == null ? void 0 : et.state) === "on" : null,
    themoDeviceId: Kt(t, e),
    presetModes: Array.isArray(s.preset_modes) ? s.preset_modes : [],
    presetMode: s.preset_mode ?? null,
    childLockEntityId: b,
    childLockOn: $(b),
    priceLimitEntityId: x,
    priceLimit: z((tt = p(x)) == null ? void 0 : tt.state),
    connected: $(T)
  };
}
function Xt(t) {
  return t ? t.schedules.find((e) => e.active) ?? null : null;
}
function At(t, e) {
  const i = t.setpoints.filter((n) => n.day === e).sort((n, l) => n.hour - l.hour), o = new Array(24).fill(null);
  if (i.length === 0) return o;
  let s = null, r = 0;
  for (let n = 0; n < 24; n++) {
    for (; r < i.length && i[r].hour === n; )
      s = i[r].value, r++;
    o[n] = s;
  }
  return o;
}
function ei(t, e, i) {
  const o = At(t, e), s = o[i];
  for (let r = i + 1; r < 24; r++)
    if (o[r] !== null && o[r] !== s) return { hour: r, value: o[r] };
  return null;
}
class ti {
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
function Te(t, e, i) {
  return t.callService("climate", "set_temperature", { entity_id: e, temperature: i });
}
function Ee(t, e, i) {
  return t.callService("climate", "set_hvac_mode", { entity_id: e, hvac_mode: i });
}
function ii(t, e, i) {
  return t.callService("climate", "set_preset_mode", { entity_id: e, preset_mode: i });
}
function Ce(t, e, i) {
  return t.callService("light", i ? "turn_off" : "turn_on", { entity_id: e });
}
function Oe(t, e) {
  const [i, o] = e.service.split(".", 2);
  return t.callService(i, o, e.service_data ?? {});
}
function Pe(t, e, i) {
  return t.callService("switch", i ? "turn_off" : "turn_on", { entity_id: e });
}
function Se(t, e, i) {
  return t.callService("number", "set_value", { entity_id: e, value: i });
}
const be = f`
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
`, xe = f`
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
var si = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, je = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? oi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && si(e, i, s), s;
};
function Be(t, e = null) {
  return t.connected === !1 ? { kind: "offline", text: "offline · cloud connection lost", pct: null } : t.heating ? { kind: "heating", text: "heating", pct: t.heatingTodayPct } : t.mode === "auto" && t.priceLimit !== null && e !== null && e > t.priceLimit ? { kind: "cap", text: `price cap · spot ${e.toFixed(1)} > ${t.priceLimit} c/kWh`, pct: null } : t.floorTemp !== null ? { kind: "plain", text: `floor ${t.floorTemp}°`, pct: null } : t.mode === "off" ? { kind: "plain", text: "off", pct: null } : t.mode === "auto" && t.currentTemp !== null && t.targetTemp !== null && t.currentTemp >= t.targetTemp ? { kind: "plain", text: "at setpoint", pct: null } : { kind: "plain", text: t.mode, pct: null };
}
const Y = y`<svg class="lock-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`, X = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22.6 14.6A4.5 4.5 0 0 0 18 9h-1.3A7 7 0 0 0 6 6.3"/><path d="M6.5 9.7A4.5 4.5 0 0 0 7.5 18h9"/><line x1="3" y1="3" x2="21" y2="21"/></svg>`, mt = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`, ri = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`, ni = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
let le = class extends v {
  constructor() {
    super(...arguments), this.spot = null;
  }
  icon() {
    return this.zone.heating ? mt : this.zone.mode === "auto" ? ri : this.zone.mode === "off" ? ni : mt;
  }
  open() {
    this.dispatchEvent(new CustomEvent("zone-open", {
      detail: { entityId: this.zone.climateEntityId },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = this.zone, e = ["zrow", t.heating ? "heating" : t.mode, t.connected === !1 ? "offline" : ""].join(" ");
    return a`
      <div class="${e}" @click=${() => this.open()}>
        <div class="ic">${this.icon()}</div>
        <div>
          <div class="name">${t.name}${t.childLockOn ? Y : ""}</div>
          <div class="meta">${(() => {
      const i = Be(t, this.spot);
      return i.kind === "offline" ? a`<span class="offl">${X}offline</span>` : i.kind === "heating" ? a`<span class="st-heat">heating</span>${i.pct !== null ? a` · <span class="pct">${i.pct}% today</span>` : ""}` : i.kind === "cap" ? a`<span class="cap">${i.text}</span>` : i.text;
    })()}</div>
        </div>
        <div class="now">${t.currentTemp ?? "—"}<span class="u">°</span><span class="tgt">→ ${t.targetTemp !== null ? a`${t.targetTemp}°` : t.mode === "auto" ? a`<span class="auto-a">A</span>` : "—"}</span></div>
        <div class="mp"></div>
      </div>`;
  }
};
le.styles = [k, xe, f`
    :host{display:block;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .meta .st-heat { color: var(--heat); }
    .meta .pct { color: var(--fg-soft); }
    .lock-ic { width: 12px; height: 12px; margin-left: 6px; vertical-align: -1px; color: var(--fg-soft); }
    .meta .cap { color: var(--warn); }
    .meta .offl { color: var(--warn); display: inline-flex; align-items: center; gap: 5px; }
    .meta .offl svg { width: 12px; height: 12px; flex-shrink: 0; }
    .zrow.offline { opacity: .55; }
  `];
je([
  d({ attribute: !1 })
], le.prototype, "zone", 2);
je([
  d({ attribute: !1 })
], le.prototype, "spot", 2);
le = je([
  w("themo-zone-row")
], le);
var ai = Object.defineProperty, li = Object.getOwnPropertyDescriptor, ye = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? li(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && ai(e, i, s), s;
};
const ci = { off: "Off", heat: "Heat", auto: "Auto" };
let K = class extends v {
  constructor() {
    super(...arguments), this.spot = null, this.selected = !1;
  }
  select() {
    this.dispatchEvent(new CustomEvent("zone-select", {
      detail: { entityId: this.zone.climateEntityId },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = this.zone, e = ["zone", t.heating ? "heating" : "", this.selected ? "active-detail" : "", t.connected === !1 ? "offline" : ""].join(" ");
    return a`
      <div class="${e}" @click=${() => this.select()}>
        <div class="zone-head">
          <div>
            <div class="zone-name">${t.name}${t.childLockOn ? Y : ""}</div>
            <div class="zone-entity">${t.climateEntityId}</div>
          </div>
        </div>
        <div class="zone-temp">
          <div class="now">${t.currentTemp ?? "—"}<span class="unit">°</span></div>
          <div class="target">→ <span>${t.targetTemp !== null ? a`${t.targetTemp}°` : t.mode === "auto" ? a`<span class="auto-a">A</span>` : "—"}</span></div>
        </div>
        <div class="zone-meta">${(() => {
      const i = Be(t, this.spot);
      return i.kind === "offline" ? a`<span class="offl">${X}${i.text}</span>` : i.kind === "cap" ? a`<span class="cap">${i.text}</span>` : a`${t.heating ? a`<span class="st-heat">heating</span>` : "idle"}${t.heatingTodayPct !== null ? a` · <span class="pct">${t.heatingTodayPct}% today</span>` : ""}`;
    })()}</div>
        <div class="zone-foot">
          <button class="mode-pill ${t.mode}"><span class="swatch"></span>${ci[t.mode]}</button>
        </div>
      </div>`;
  }
};
K.styles = [k, be, f`
    :host{display:contents;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .zone-meta .st-heat { color: var(--heat); }
    .zone-meta .pct { color: var(--fg-soft); }
    .lock-ic { width: 12px; height: 12px; margin-left: 6px; vertical-align: -1px; color: var(--fg-soft); }
    .zone-meta .cap { color: var(--warn); }
    .zone-meta .offl { color: var(--warn); display: inline-flex; align-items: center; gap: 5px; }
    .zone-meta .offl svg { width: 12px; height: 12px; flex-shrink: 0; }
    .zone.offline { opacity: .55; }
  `];
ye([
  d({ attribute: !1 })
], K.prototype, "zone", 2);
ye([
  d({ attribute: !1 })
], K.prototype, "spot", 2);
ye([
  d({ type: Boolean })
], K.prototype, "selected", 2);
K = ye([
  w("themo-zone-tile")
], K);
var di = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, D = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? pi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && di(e, i, s), s;
};
let A = class extends v {
  constructor() {
    super(...arguments), this.zones = [], this.selectedId = "", this.title = "Themo Heating", this.quickActions = [], this.outsideText = null, this.sunText = null, this.spot = null;
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
    return a`
      <section class="ha-card themo-overview">
        <div class="card-head">
          <div>
            <div class="h-title">${this.title}</div>
            <div class="h-sub">${this.zones.length} thermostats · pd_hathemo</div>
          </div>
          <div class="spacer"></div>
          ${t ? a`<span class="pill heat"><span class="dot"></span>Heating now</span>` : ""}
          ${this.outsideText ? a`<span class="pill outside"><span class="dot"></span>Outside ${this.outsideText}</span>` : ""}
        </div>

        <div class="strip">
          <div class="stat"><div class="label">Active zones</div><div class="val">${this.activeCount}<span class="unit">/ ${this.zones.length}</span></div></div>
          <div class="stat"><div class="label">House avg</div><div class="val">${this.houseAvg ?? "—"}<span class="unit">°C</span></div></div>
          ${this.sunText ? a`<div class="stat"><div class="label">Sunrise → Sunset</div><div class="val">${this.sunText}</div></div>` : ""}
        </div>

        <div class="zones">
          ${this.zones.map((e) => a`
            <themo-zone-tile .zone=${e} .spot=${this.spot} ?selected=${e.climateEntityId === this.selectedId}></themo-zone-tile>`)}
        </div>

        ${this.quickActions.length ? a`
          <div class="quick-actions">
            <span class="qa-label">Quick actions</span>
            ${this.quickActions.map((e) => a`
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
A.styles = [k, be, f`:host{display:block;}`];
D([
  d({ attribute: !1 })
], A.prototype, "zones", 2);
D([
  d()
], A.prototype, "selectedId", 2);
D([
  d()
], A.prototype, "title", 2);
D([
  d({ attribute: !1 })
], A.prototype, "quickActions", 2);
D([
  d()
], A.prototype, "outsideText", 2);
D([
  d()
], A.prototype, "sunText", 2);
D([
  d({ attribute: !1 })
], A.prototype, "spot", 2);
A = D([
  w("themo-overview")
], A);
var hi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, B = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? ui(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && hi(e, i, s), s;
};
const gi = [
  { mode: "off", name: "Off", desc: "power off" },
  { mode: "heat", name: "Heat", desc: "manual setpoint" },
  { mode: "auto", name: "Auto", desc: "follow schedule" }
];
let C = class extends v {
  constructor() {
    super(...arguments), this.todayRow = null, this.nextChange = null, this.nowHour = 0, this.step = 0.5, this.pendingPrice = null, this.pendingFor = null, this.pendingAt = 0;
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = e.targetTemp ?? e.minTemp, o = Re(i + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: o });
  }
  bumpPrice(t) {
    const e = this.pendingPrice ?? this.zone.priceLimit;
    if (e === null) return;
    const i = Ue(e, t);
    this.pendingPrice = i, this.pendingAt = Date.now(), this.pendingFor = this.zone.climateEntityId, this.emit("pricelimit-change", { value: i });
  }
  willUpdate() {
    const t = this.zone;
    this.pendingPrice !== null && ((t == null ? void 0 : t.climateEntityId) !== this.pendingFor || (t == null ? void 0 : t.priceLimit) === this.pendingPrice || Date.now() - this.pendingAt > 1e4) && (this.pendingPrice = null, this.pendingFor = null);
  }
  render() {
    const t = this.zone, e = Ne(t.currentTemp, t.minTemp, t.maxTemp), i = t.presetModes.length > 0;
    return a`
      <section class="ha-card themo-detail">
        <div class="detail-head">
          <div class="detail-eyebrow">Selected zone</div>
          <div class="detail-title">${t.name}</div>
          <div class="detail-entity">${t.climateEntityId}</div>
          ${t.connected === !1 ? a`<div class="offchip">${X}offline</div>` : ""}
        </div>

        <div class="ring-stage">
          <div class="ring">
            ${y`<svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle cx="100" cy="100" r="84" fill="none" stroke="var(--heat)" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="${ae}" stroke-dashoffset="${e}"
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
                <div class="val">${t.targetTemp !== null ? a`<span>${t.targetTemp}</span><span class="unit">°C</span>` : t.mode === "auto" ? a`<span class="auto-a">A</span>` : a`<span>—</span><span class="unit">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mode-row">
          ${gi.map((o) => a`
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
          ${t.childLockEntityId !== null ? a`
          <div class="kv" data-childlock style="cursor:pointer" @click=${() => this.emit("childlock-toggle", {})}>
            <div class="k">Child lock</div>
            <div class="v" style="color:${t.childLockOn ? "var(--accent)" : "var(--muted)"};display:flex;align-items:center;gap:7px">${Y}${t.childLockOn === null ? "—" : t.childLockOn ? "Locked" : "Open"}</div>
            <div class="sub">${t.childLockOn ? "tap to unlock" : "tap to lock"}</div>
          </div>` : ""}
          ${t.priceLimitEntityId !== null ? a`
          <div class="kv">
            <div class="k">Price limit</div>
            <div class="v mini-step">
              <button data-price-dn ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(-G)}>−</button>
              ${this.pendingPrice ?? t.priceLimit ?? "—"}<span class="unit">c/kWh</span>
              <button data-price-up ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(G)}>+</button>
            </div>
            <div class="sub">auto skips pricier hours</div>
          </div>` : ""}
        </div>

        ${i ? this.renderSchedule(t) : ""}
      </section>`;
  }
  renderSchedule(t) {
    const e = this.todayRow ?? new Array(24).fill(null), i = Math.max(...e.map((s) => s ?? 0), 1), o = (s) => s === null ? 0 : Math.ceil(s / i * 3);
    return a`
      <div class="schedule">
        <div class="schedule-head">
          <div class="title">Today's schedule</div>
          <div class="next">${this.nextChange ? a`Next change <strong>${String(this.nextChange.hour).padStart(2, "0")}:00 → ${this.nextChange.value}°</strong>` : "No further changes today"}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${t.presetModes.map((s) => a`
            <button class="qa-chip ${t.presetMode === s ? "active" : ""}" data-preset=${s}
              @click=${() => this.emit("preset-change", { preset: s })}>${s}</button>`)}
        </div>
        <div class="heatmap">
          <div class="row-lbl">Today</div>
          <div class="hour-row">
            ${e.map((s, r) => a`<div class="cell"
              data-h=${o(s) || ""} ?data-now=${r === this.nowHour}></div>`)}
          </div>
        </div>
      </div>`;
  }
};
C.styles = [k, be, f`
    :host{display:block;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .kv .lock-ic { width: 14px; height: 14px; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 11px var(--font-mono); letter-spacing: .04em; margin-top: 4px; }
    .offchip svg { width: 12px; height: 12px; }
  `];
B([
  d({ attribute: !1 })
], C.prototype, "zone", 2);
B([
  d({ attribute: !1 })
], C.prototype, "todayRow", 2);
B([
  d({ attribute: !1 })
], C.prototype, "nextChange", 2);
B([
  d({ type: Number })
], C.prototype, "nowHour", 2);
B([
  d({ type: Number })
], C.prototype, "step", 2);
B([
  L()
], C.prototype, "pendingPrice", 2);
C = B([
  w("themo-detail")
], C);
var mi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, pe = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? vi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && mi(e, i, s), s;
};
let U = class extends v {
  constructor() {
    super(...arguments), this.value = "", this.unit = "", this.sub = "", this.warm = !1;
  }
  render() {
    return a`
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
U.styles = [k, be, f`:host{display:block;}`];
pe([
  d()
], U.prototype, "value", 2);
pe([
  d()
], U.prototype, "unit", 2);
pe([
  d()
], U.prototype, "sub", 2);
pe([
  d({ type: Boolean })
], U.prototype, "warm", 2);
U = pe([
  w("themo-glance")
], U);
var fi = Object.defineProperty, bi = Object.getOwnPropertyDescriptor, he = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? bi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && fi(e, i, s), s;
};
const vt = (t) => Math.round(t * 10) / 10;
let j = class extends v {
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
    const t = this.avg((o) => o.currentTemp), e = this.avg((o) => o.targetTemp), i = t !== null && e !== null ? vt(t - e) : null;
    return a`
      <div class="head-card">
        <div class="row">
          ${this.activeCount > 0 ? a`<div class="badge"><span class="dot"></span>Heating now</div>` : a`<div></div>`}
          ${this.outsideText ? a`<div class="outside">Outside ${this.outsideText}</div>` : ""}
        </div>
        <div class="big-temp">
          <div class="now">${t !== null ? vt(t) : "—"}<span class="unit">°</span></div>
          ${i !== null ? a`<div class="delta">${i >= 0 ? "+" : ""}${i.toFixed(1)}° vs target</div>` : ""}
        </div>
        <div class="sub">House average · ${this.activeCount} of ${this.zones.length} zones active</div>
        <div class="breakdown">
          <div class="b"><div class="k">Active</div><div class="v">${this.activeCount}<span class="small"> / ${this.zones.length}</span></div></div>
          ${this.energyToday ? a`<div class="b"><div class="k">Today kWh</div><div class="v">${this.energyToday}</div></div>` : ""}
          ${this.energyCost ? a`<div class="b"><div class="k">Cost</div><div class="v">${this.energyCost}</div></div>` : ""}
        </div>
      </div>`;
  }
};
j.styles = [k, xe, f`:host{display:block;}`];
he([
  d({ attribute: !1 })
], j.prototype, "zones", 2);
he([
  d()
], j.prototype, "outsideText", 2);
he([
  d()
], j.prototype, "energyToday", 2);
he([
  d()
], j.prototype, "energyCost", 2);
j = he([
  w("themo-mobile-header")
], j);
var xi = Object.defineProperty, yi = Object.getOwnPropertyDescriptor, F = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? yi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && xi(e, i, s), s;
};
let O = class extends v {
  constructor() {
    super(...arguments), this.zones = [], this.quickActions = [], this.outsideText = null, this.energyToday = null, this.energyCost = null, this.spot = null;
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
    return a`
      <themo-mobile-header .zones=${this.zones} .outsideText=${this.outsideText}
        .energyToday=${this.energyToday} .energyCost=${this.energyCost}></themo-mobile-header>

      ${this.quickActions.length ? a`
        <div class="chips-scroll">
          ${this.quickActions.map((e) => a`
            <button class="chip" @click=${() => this.dispatchEvent(new CustomEvent("quick-action", { detail: { action: e }, bubbles: !0, composed: !0 }))}>${e.name}</button>`)}
        </div>` : ""}

      <div class="section-label">
        <span>Zones</span>
        <span class="count">${this.zones.length} · ${this.heatingCount} heating</span>
      </div>
      <div class="zlist">
        ${this.zones.map((e) => a`<themo-zone-row .zone=${e} .spot=${this.spot}></themo-zone-row>`)}
      </div>

      ${t !== null ? a`
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
O.styles = [k, xe, f`:host{display:block;padding:4px;}`];
F([
  d({ attribute: !1 })
], O.prototype, "zones", 2);
F([
  d({ attribute: !1 })
], O.prototype, "quickActions", 2);
F([
  d()
], O.prototype, "outsideText", 2);
F([
  d()
], O.prototype, "energyToday", 2);
F([
  d()
], O.prototype, "energyCost", 2);
F([
  d({ attribute: !1 })
], O.prototype, "spot", 2);
O = F([
  w("themo-mobile-view")
], O);
var $i = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, $e = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? wi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && $i(e, i, s), s;
};
const Ie = 58, ft = 2 * Math.PI * Ie, ki = [
  { mode: "off", name: "Off", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: "heat", name: "Heat", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: "auto", name: "Auto", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` }
];
let J = class extends v {
  constructor() {
    super(...arguments), this.nextChangeText = null, this.pendingPrice = null, this.pendingFor = null, this.pendingAt = 0;
  }
  emit(t, e = {}) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = Re((e.targetTemp ?? e.minTemp) + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: i });
  }
  bumpPrice(t) {
    const e = this.pendingPrice ?? this.zone.priceLimit;
    if (e === null) return;
    const i = Ue(e, t);
    this.pendingPrice = i, this.pendingAt = Date.now(), this.pendingFor = this.zone.climateEntityId, this.emit("pricelimit-change", { value: i });
  }
  willUpdate() {
    const t = this.zone;
    this.pendingPrice !== null && ((t == null ? void 0 : t.climateEntityId) !== this.pendingFor || (t == null ? void 0 : t.priceLimit) === this.pendingPrice || Date.now() - this.pendingAt > 1e4) && (this.pendingPrice = null, this.pendingFor = null);
  }
  render() {
    const t = this.zone, e = Ne(t.currentTemp, t.minTemp, t.maxTemp) / ae * ft;
    return a`
      <div class="sheet-backdrop" @click=${() => this.emit("sheet-close")}></div>
      <div class="sheet">
        <div class="grabber" @click=${() => this.emit("sheet-close")}></div>
        <div class="head">
          <div class="name">${t.name}</div>
          <div class="entity">${t.climateEntityId}</div>
          ${t.connected === !1 ? a`<div class="offchip">${X}offline</div>` : ""}
        </div>
        <div class="dial-row">
          <div class="mini-ring">
            ${y`<svg viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="${Ie}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
              <circle cx="70" cy="70" r="${Ie}" fill="none" stroke="var(--heat)" stroke-width="8"
                stroke-linecap="round" stroke-dasharray="${ft}" stroke-dashoffset="${e}"
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
                <div class="val">${t.targetTemp !== null ? a`${t.targetTemp}<span class="u">°C</span>` : t.mode === "auto" ? a`<span class="auto-a">A</span>` : a`—<span class="u">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="mode-row">
          ${ki.map((i) => a`
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
          ${t.childLockEntityId !== null ? a`
          <div class="kv" data-childlock style="cursor:pointer" @click=${() => this.emit("childlock-toggle")}>
            <div class="k">Child lock</div>
            <div class="v" style="color:${t.childLockOn ? "var(--accent)" : "var(--muted)"};display:flex;align-items:center;gap:6px">${Y}${t.childLockOn === null ? "—" : t.childLockOn ? "Locked" : "Open"}</div>
            <div class="sub">${t.childLockOn ? "tap to unlock" : "tap to lock"}</div>
          </div>` : ""}
          ${t.priceLimitEntityId !== null ? a`
          <div class="kv">
            <div class="k">Price limit</div>
            <div class="v mini-step">
              <button data-price-dn ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(-G)}>−</button>
              ${this.pendingPrice ?? t.priceLimit ?? "—"} c/kWh
              <button data-price-up ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(G)}>+</button>
            </div>
          </div>` : ""}
        </div>
      </div>`;
  }
};
J.styles = [k, xe, f`
    :host{display:contents;} .auto-a { color: var(--ok); font-weight: 600; }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .kv .sub { font-family: var(--font-mono); font-size: 9px; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; margin-top: 3px; }
    .kv .lock-ic { width: 13px; height: 13px; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 10px var(--font-mono); letter-spacing: .04em; }
    .offchip svg { width: 12px; height: 12px; }
  `];
$e([
  d({ attribute: !1 })
], J.prototype, "zone", 2);
$e([
  d()
], J.prototype, "nextChangeText", 2);
$e([
  L()
], J.prototype, "pendingPrice", 2);
J = $e([
  w("themo-mobile-sheet")
], J);
const Fe = f`
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
var _i = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, we = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? zi(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && _i(e, i, s), s;
};
const Ai = { off: "Off", heat: "Heat", auto: "Auto" };
function Ti(t, e) {
  if (t === null || e === null) return null;
  const i = Math.round((t - e) * 10) / 10;
  return { text: `${i >= 0 ? "+" : ""}${i.toFixed(1)}°`, cool: i < 0 };
}
let Q = class extends v {
  constructor() {
    super(...arguments), this.spot = null, this.selected = !1;
  }
  select() {
    this.dispatchEvent(new CustomEvent("zone-select", {
      detail: { entityId: this.zone.climateEntityId },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = this.zone, e = Ti(t.currentTemp, t.targetTemp), i = ["ztile", t.heating ? "heating" : t.mode, this.selected ? "selected" : "", t.connected === !1 ? "offline" : ""].join(" ");
    return a`
      <div class="${i}" @click=${() => this.select()}>
        <div>
          <div class="head">
            <div>
              <div class="name">${t.name}</div>
              <div class="entity">${t.climateEntityId}</div>
            </div>
            ${t.childLockOn ? Y : ""}<div class="mp"><span class="sw"></span>${Ai[t.mode]}</div>
          </div>
          <div class="big-temp">
            <div class="now">${t.currentTemp ?? "—"}</div>
            <div class="u">°C</div>
            ${e ? a`<div class="delta ${e.cool ? "cool" : ""}">${e.text}</div>` : ""}
          </div>
          <div class="target-line">→ <span class="target">${t.targetTemp !== null ? a`${t.targetTemp}°` : t.mode === "auto" ? a`<span class="auto-a">A</span>` : "—"}</span>${t.targetTemp !== null ? " setpoint" : ""}</div>
          <div class="meta-line">${(() => {
      const o = Be(t, this.spot);
      return o.kind === "offline" ? a`<span class="offl">${X}${o.text}</span>` : o.kind === "heating" ? a`<span class="st-heat">heating</span>${o.pct !== null ? a` · <span class="pct">${o.pct}% today</span>` : ""}` : o.kind === "cap" ? a`<span class="cap">${o.text}</span>` : o.text;
    })()}</div>
        </div>
      </div>`;
  }
};
Q.styles = [k, Fe, f`
    :host{display:block;min-height:0;} .ztile{height:100%;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .meta-line .st-heat { color: var(--heat); }
    .meta-line .pct { color: var(--fg-soft); }
    .lock-ic { width: 14px; height: 14px; margin-right: 8px; color: var(--fg-soft); align-self: center; }
    .meta-line .cap { color: var(--warn); }
    .meta-line .offl { color: var(--warn); display: inline-flex; align-items: center; gap: 5px; }
    .meta-line .offl svg { width: 12px; height: 12px; flex-shrink: 0; }
    .ztile.offline { opacity: .55; }
  `];
we([
  d({ attribute: !1 })
], Q.prototype, "zone", 2);
we([
  d({ attribute: !1 })
], Q.prototype, "spot", 2);
we([
  d({ type: Boolean })
], Q.prototype, "selected", 2);
Q = we([
  w("themo-tablet-tile")
], Q);
var Ei = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, We = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Ci(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && Ei(e, i, s), s;
};
const Me = 80, bt = 2 * Math.PI * Me, Oi = [
  { mode: "off", name: "Off", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: "heat", name: "Heat", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: "auto", name: "Auto", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` }
];
let ce = class extends v {
  constructor() {
    super(...arguments), this.pendingPrice = null, this.pendingFor = null, this.pendingAt = 0;
  }
  emit(t, e = {}) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = Re((e.targetTemp ?? e.minTemp) + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: i });
  }
  bumpPrice(t) {
    const e = this.pendingPrice ?? this.zone.priceLimit;
    if (e === null) return;
    const i = Ue(e, t);
    this.pendingPrice = i, this.pendingAt = Date.now(), this.pendingFor = this.zone.climateEntityId, this.emit("pricelimit-change", { value: i });
  }
  willUpdate() {
    const t = this.zone;
    this.pendingPrice !== null && ((t == null ? void 0 : t.climateEntityId) !== this.pendingFor || (t == null ? void 0 : t.priceLimit) === this.pendingPrice || Date.now() - this.pendingAt > 1e4) && (this.pendingPrice = null, this.pendingFor = null);
  }
  render() {
    const t = this.zone, e = Ne(t.currentTemp, t.minTemp, t.maxTemp) / ae * bt;
    return a`
      <div class="focus-card">
        <div class="label">Selected zone</div>
        <div class="name">${t.name}</div>
        ${t.connected === !1 ? a`<div class="offchip">${X}offline</div>` : ""}
        <div class="ring-wrap">
          ${y`<svg class="ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="${Me}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
            <circle cx="100" cy="100" r="${Me}" fill="none" stroke="var(--heat)" stroke-width="8"
              stroke-linecap="round" stroke-dasharray="${bt}" stroke-dashoffset="${e}"
              transform="rotate(-90 100 100)"/>
          </svg>`}
          <div class="ring-num"><div>
            <div class="big">${t.currentTemp ?? "—"}<span class="u">°C</span></div>
            <div class="cap">Room</div>
          </div></div>
        </div>
        <div class="stepper">
          <button data-step-dn @click=${() => this.bump(-t.step)} ?disabled=${t.mode !== "heat"}>−</button>
          <div class="val">${t.targetTemp !== null ? a`${t.targetTemp}<span class="u">°C</span>` : t.mode === "auto" ? a`<span class="auto-a">A</span>` : a`—<span class="u">°C</span>`}</div>
          <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
        </div>
        <div class="mode-row">
          ${Oi.map((i) => a`
            <div class="mode-tile ${t.mode === i.mode ? "selected" : ""}" data-mode=${i.mode}
              @click=${() => this.emit("mode-change", { mode: i.mode })}>
              ${i.icon}<div class="name">${i.name}</div>
            </div>`)}
        </div>
        ${t.backlightEntityId !== null || t.childLockEntityId !== null ? a`
        <div class="dev-row">
          ${t.backlightEntityId !== null ? a`
            <button class="dev-chip ${t.backlightOn ? "active" : ""}" data-backlight
              @click=${() => this.emit("backlight-toggle")}>Backlight · ${t.backlightOn === null ? "—" : t.backlightOn ? "On" : "Off"}</button>` : ""}
          ${t.childLockEntityId !== null ? a`
            <button class="dev-chip ${t.childLockOn ? "active" : ""}" data-childlock
              @click=${() => this.emit("childlock-toggle")}>${Y}Child lock · ${t.childLockOn === null ? "—" : t.childLockOn ? "Locked" : "Open"}</button>` : ""}
        </div>` : ""}
        ${t.priceLimitEntityId !== null ? a`
        <div class="price-row">
          <span class="plbl">Price limit</span>
          <span class="mini-step">
            <button data-price-dn ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(-G)}>−</button>
            ${this.pendingPrice ?? t.priceLimit ?? "—"} <span class="pu">c/kWh</span>
            <button data-price-up ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(G)}>+</button>
          </span>
        </div>` : ""}
        ${t.presetModes.length ? a`
          <div class="preset-row">
            ${t.presetModes.map((i) => a`
              <button class="pchip ${t.presetMode === i ? "active" : ""}" data-preset=${i}
                @click=${() => this.emit("preset-change", { preset: i })}>${i}</button>`)}
          </div>` : ""}
      </div>`;
  }
};
ce.styles = [k, Fe, f`
    :host { display: block; }
    .preset-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
    .pchip {
      height: 30px; padding: 0 12px; border-radius: 999px;
      background: var(--surface-2); border: 1px solid var(--border-2);
      color: var(--fg-soft); font-size: 12px; font-family: inherit; cursor: pointer;
    }
    .pchip.active { background: rgba(3,169,244,0.12); border-color: rgba(3,169,244,0.5); color: var(--accent); }
    .auto-a { color: var(--ok); font-weight: 600; }
    .dev-row { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .dev-chip { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--border-2); background: var(--surface-2); color: var(--fg-soft); font-size: 12px; font-family: inherit; cursor: pointer; }
    .dev-chip svg { width: 14px; height: 14px; }
    .dev-chip.active { background: rgba(3,169,244,0.12); border-color: rgba(3,169,244,0.5); color: var(--accent); }
    .price-row { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
    .plbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
    .pu { font-size: 11px; color: var(--muted); }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 10px var(--font-mono); letter-spacing: .04em; margin-bottom: 8px; }
    .offchip svg { width: 12px; height: 12px; }
  `];
We([
  d({ attribute: !1 })
], ce.prototype, "zone", 2);
We([
  L()
], ce.prototype, "pendingPrice", 2);
ce = We([
  w("themo-tablet-focus")
], ce);
var Pi = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, P = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Si(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && Pi(e, i, s), s;
};
const Ii = (t) => Math.round(t * 10) / 10;
let _ = class extends v {
  constructor() {
    super(...arguments), this.zones = [], this.selectedId = "", this.quickActions = [], this.outsideText = null, this.energyToday = null, this.energyCost = null, this.energySpot = null, this.spot = null;
  }
  get heatingCount() {
    return this.zones.filter((t) => t.heating).length;
  }
  get houseAvg() {
    const t = this.zones.map((e) => e.currentTemp).filter((e) => e !== null);
    return t.length ? Ii(t.reduce((e, i) => e + i, 0) / t.length) : null;
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
    return a`
      <div class="wrap">
        <div class="topbar">
          <div class="glance">
            ${this.outsideText ? a`<div class="gl"><div class="l">Outside</div><div class="v">${this.outsideText}</div></div>` : ""}
            <div class="gl"><div class="l">House avg</div><div class="v">${this.houseAvg ?? "—"}<span class="u">°C</span></div></div>
            ${this.energyToday ? a`<div class="gl"><div class="l">Today</div><div class="v">${this.energyToday}<span class="u">kWh</span></div></div>` : ""}
          </div>
          <div class="spacer"></div>
          ${this.heatingCount > 0 ? a`<div class="badge"><span class="dot"></span>Heating · ${this.heatingCount} of ${this.zones.length}</div>` : ""}
        </div>

        <div class="zones-grid">
          ${this.zones.map((i) => a`
            <themo-tablet-tile .zone=${i} .spot=${this.spot} ?selected=${i.climateEntityId === ((t == null ? void 0 : t.climateEntityId) ?? "")}></themo-tablet-tile>`)}
        </div>

        <div class="zones-foot">
          <div class="lbl">Daily heating · all zones</div>
          <div class="bar"><div class="fill" style="width:${e ?? 0}%"></div></div>
          <div class="stat"><div class="v">${e ?? "—"}<span class="u">%</span></div><div class="l">heating</div></div>
          ${this.energyToday ? a`<div class="stat"><div class="v">${this.energyToday}<span class="u">kWh</span></div><div class="l">energy</div></div>` : ""}
          ${this.energyCost ? a`<div class="stat"><div class="v">${this.energyCost}</div><div class="l">cost</div></div>` : ""}
          ${this.energySpot ? a`<div class="stat"><div class="v">${this.energySpot}</div><div class="l">spot avg</div></div>` : ""}
        </div>

        <aside class="rail">
          ${t ? a`<themo-tablet-focus .zone=${t}></themo-tablet-focus>` : ""}
          ${this.quickActions.length ? a`
            <div class="qa-stack">
              <div class="qa-label">House actions</div>
              <div class="qa-row">
                ${this.quickActions.map((i) => a`
                  <button class="qa-btn" @click=${() => this.dispatchEvent(new CustomEvent("quick-action", { detail: { action: i }, bubbles: !0, composed: !0 }))}>
                    <div class="lbl-row">${i.name}</div>
                    ${i.description ? a`<div class="sub">${i.description}</div>` : ""}
                  </button>`)}
              </div>
            </div>` : ""}
        </aside>
      </div>`;
  }
};
_.styles = [k, Fe, f`
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
P([
  d({ attribute: !1 })
], _.prototype, "zones", 2);
P([
  d()
], _.prototype, "selectedId", 2);
P([
  d({ attribute: !1 })
], _.prototype, "quickActions", 2);
P([
  d()
], _.prototype, "outsideText", 2);
P([
  d()
], _.prototype, "energyToday", 2);
P([
  d()
], _.prototype, "energyCost", 2);
P([
  d()
], _.prototype, "energySpot", 2);
P([
  d({ attribute: !1 })
], _.prototype, "spot", 2);
_ = P([
  w("themo-tablet-view")
], _);
var Mi = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, ee = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? Li(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (s = (o ? n(e, i, s) : n(s)) || s);
  return o && s && Mi(e, i, s), s;
};
let M = class extends v {
  constructor() {
    super(...arguments), this.selectedId = null, this.scheduleData = null, this.band = "desktop", this.sheetOpen = !1, this.schedules = new ti(), this.lastFetchedDeviceId = null;
  }
  setConfig(t) {
    this.config = Zt(t);
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
    return !this._hass || !this.config ? [] : Qt(this._hass, this.config.entities).map((t) => Yt(this._hass, t, this.config.step)).filter((t) => t !== null);
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
    return e ? a`<themo-glance .value=${e.state} .unit=${e.attributes.unit_of_measurement ?? "kWh"} .sub=${"today · all zones"}></themo-glance>` : "";
  }
  energyValue(t) {
    var o;
    if (!t) return null;
    const e = this._hass.states[t];
    if (!e || e.state === "unknown" || e.state === "unavailable") return null;
    const i = e.attributes.unit_of_measurement;
    return i && t === ((o = this.config.energy) == null ? void 0 : o.cost_entity) ? `${e.state} ${i}` : e.state;
  }
  spotNumber() {
    var r;
    const t = (r = this.config.energy) == null ? void 0 : r.spot_entity;
    if (!t) return null;
    const e = this._hass.states[t], i = Number(e == null ? void 0 : e.state);
    if (!Number.isFinite(i)) return null;
    const o = (n) => Math.round(n * 1e3) / 1e3, s = (e.attributes.unit_of_measurement ?? "").toLowerCase().replace(/\s/g, "");
    return s === "c/kwh" || s === "snt/kwh" || s === "cent/kwh" || s === "ct/kwh" ? o(i) : s === "€/kwh" || s === "eur/kwh" ? o(i * 100) : s === "€/mwh" || s === "eur/mwh" ? o(i / 10) : null;
  }
  onZoneOpen(t) {
    this.onSelect(t), this.sheetOpen = !0;
  }
  render() {
    var g, u, b, x, T;
    if (!this.config || !this._hass) return a``;
    const t = this.zones(), e = this.selected(t), i = (e == null ? void 0 : e.outsideTemp) ?? null, o = Xt(this.scheduleData), s = (/* @__PURE__ */ new Date()).getDay(), r = (/* @__PURE__ */ new Date()).getHours(), n = o ? At(o, s) : null, l = o ? ei(o, s, r) : null, c = i !== null ? `${i}°C` : null, h = this.spotNumber();
    if (this.effectiveLayout() === "mobile") {
      const p = l ? `${String(l.hour).padStart(2, "0")}:00 → ${l.value}°` : null;
      return a`
        <themo-mobile-view
          .zones=${t} .quickActions=${this.config.quick_actions} .outsideText=${c} .spot=${h}
          .energyToday=${this.energyValue((g = this.config.energy) == null ? void 0 : g.today_entity)}
          .energyCost=${this.energyValue((u = this.config.energy) == null ? void 0 : u.cost_entity)}
          @zone-open=${($) => this.onZoneOpen($.detail.entityId)}
          @quick-action=${($) => Oe(this._hass, $.detail.action)}
        ></themo-mobile-view>
        ${this.sheetOpen && e && (this.selectedId === null || e.climateEntityId === this.selectedId) ? a`<themo-mobile-sheet
          .zone=${e} .nextChangeText=${p}
          @sheet-close=${() => {
        this.sheetOpen = !1;
      }}
          @setpoint-change=${($) => Te(this._hass, e.climateEntityId, $.detail.temperature)}
          @mode-change=${($) => Ee(this._hass, e.climateEntityId, $.detail.mode)}
          @backlight-toggle=${() => e.backlightEntityId && Ce(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
          @childlock-toggle=${() => (e == null ? void 0 : e.childLockEntityId) && Pe(this._hass, e.childLockEntityId, e.childLockOn ?? !1)}
          @pricelimit-change=${($) => (e == null ? void 0 : e.priceLimitEntityId) && Se(this._hass, e.priceLimitEntityId, $.detail.value)}
        ></themo-mobile-sheet>` : ""}`;
    }
    return this.effectiveLayout() === "tablet" ? a`
        <themo-tablet-view
          .zones=${t} .selectedId=${(e == null ? void 0 : e.climateEntityId) ?? ""}
          .quickActions=${this.config.quick_actions} .outsideText=${c} .spot=${h}
          .energyToday=${this.energyValue((b = this.config.energy) == null ? void 0 : b.today_entity)}
          .energyCost=${this.energyValue((x = this.config.energy) == null ? void 0 : x.cost_entity)}
          .energySpot=${this.energyValue((T = this.config.energy) == null ? void 0 : T.spot_entity)}
          @zone-select=${(p) => this.onSelect(p.detail.entityId)}
          @quick-action=${(p) => Oe(this._hass, p.detail.action)}
          @setpoint-change=${(p) => e && Te(this._hass, e.climateEntityId, p.detail.temperature)}
          @mode-change=${(p) => e && Ee(this._hass, e.climateEntityId, p.detail.mode)}
          @preset-change=${(p) => e && this.onPreset(e, p.detail.preset)}
          @backlight-toggle=${() => (e == null ? void 0 : e.backlightEntityId) && Ce(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
          @childlock-toggle=${() => (e == null ? void 0 : e.childLockEntityId) && Pe(this._hass, e.childLockEntityId, e.childLockOn ?? !1)}
          @pricelimit-change=${(p) => (e == null ? void 0 : e.priceLimitEntityId) && Se(this._hass, e.priceLimitEntityId, p.detail.value)}
        ></themo-tablet-view>` : a`
      <div class="view">
        <themo-overview
          .zones=${t} .selectedId=${(e == null ? void 0 : e.climateEntityId) ?? ""} .title=${this.config.title}
          .quickActions=${this.config.quick_actions}
          .outsideText=${c} .spot=${h}
          .sunText=${this.sunText()}
          @zone-select=${(p) => this.onSelect(p.detail.entityId)}
          @quick-action=${(p) => Oe(this._hass, p.detail.action)}
        ></themo-overview>
        <div class="right-col">
          ${e ? a`<themo-detail
            .zone=${e} .todayRow=${n} .nextChange=${l} .nowHour=${r} .step=${this.config.step}
            @setpoint-change=${(p) => Te(this._hass, e.climateEntityId, p.detail.temperature)}
            @mode-change=${(p) => Ee(this._hass, e.climateEntityId, p.detail.mode)}
            @preset-change=${(p) => this.onPreset(e, p.detail.preset)}
            @backlight-toggle=${() => e.backlightEntityId && Ce(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
            @childlock-toggle=${() => (e == null ? void 0 : e.childLockEntityId) && Pe(this._hass, e.childLockEntityId, e.childLockOn ?? !1)}
            @pricelimit-change=${(p) => (e == null ? void 0 : e.priceLimitEntityId) && Se(this._hass, e.priceLimitEntityId, p.detail.value)}
          ></themo-detail>` : a`<div>No Themo thermostats found.</div>`}
          ${this.energyGlance()}
        </div>
      </div>`;
  }
  async onPreset(t, e) {
    await ii(this._hass, t.climateEntityId, e), t.themoDeviceId !== null && (this.schedules.invalidate(t.themoDeviceId), this.lastFetchedDeviceId = null, this.maybeFetchSchedule());
  }
};
M.styles = [k, f`
    :host { display: block; }
    .view { display:grid; grid-template-columns: 1fr 460px; gap:24px; padding:8px; }
    .right-col { display:flex; flex-direction:column; gap:18px; }
  `];
ee([
  L()
], M.prototype, "config", 2);
ee([
  L()
], M.prototype, "selectedId", 2);
ee([
  L()
], M.prototype, "scheduleData", 2);
ee([
  L()
], M.prototype, "band", 2);
ee([
  L()
], M.prototype, "sheetOpen", 2);
M = ee([
  w("themo-card")
], M);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "themo-card",
  name: "PapaDog's Themo Control Card",
  description: "Multi-thermostat companion card for the pd_hathemo integration"
});
export {
  M as ThemoCard
};
