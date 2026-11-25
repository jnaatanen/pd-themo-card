/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, je = fe.ShadowRoot && (fe.ShadyCSS === void 0 || fe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Be = Symbol(), mt = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Be) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (je && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = mt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && mt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ht = (t) => new Pt(typeof t == "string" ? t : t + "", void 0, Be), f = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new Pt(i, t, Be);
}, qt = (t, e) => {
  if (je) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), o = fe.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, vt = je ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Ht(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Rt, defineProperty: Ut, getOwnPropertyDescriptor: jt, getOwnPropertyNames: Bt, getOwnPropertySymbols: Ft, getPrototypeOf: Wt } = Object, S = globalThis, ft = S.trustedTypes, Vt = ft ? ft.emptyScript : "", Oe = S.reactiveElementPolyfillSupport, oe = (t, e) => t, be = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Vt : null;
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
} }, Fe = (t, e) => !Rt(t, e), bt = { attribute: !0, type: String, converter: be, reflect: !1, useDefault: !1, hasChanged: Fe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let V = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = bt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && Ut(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = jt(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const l = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(oe("elementProperties"))) return;
    const e = Wt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(oe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(oe("properties"))) {
      const i = this.properties, s = [...Bt(i), ...Ft(i)];
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
      for (const o of s) i.unshift(vt(o));
    } else e !== void 0 && i.push(vt(e));
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
    return qt(e, this.constructor.elementStyles), e;
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
    var n;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : be).toAttribute(i, s.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, r;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const l = s.getPropertyOptions(o), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : be;
      this._$Em = o;
      const h = c.fromAttribute(i, l.type);
      this[o] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, o = !1, n) {
    var r;
    if (e !== void 0) {
      const l = this.constructor;
      if (o === !1 && (n = this[e]), s ?? (s = l.getPropertyOptions(e)), !((s.hasChanged ?? Fe)(n, i) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(l._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? i ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: l } = r, c = this[n];
        l !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
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
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[oe("elementProperties")] = /* @__PURE__ */ new Map(), V[oe("finalized")] = /* @__PURE__ */ new Map(), Oe == null || Oe({ ReactiveElement: V }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, xt = (t) => t, xe = ne.trustedTypes, yt = xe ? xe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, St = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, It = "?" + P, Zt = `<${It}>`, R = document, re = () => R.createComment(""), ae = (t) => t === null || typeof t != "object" && typeof t != "function", We = Array.isArray, Gt = (t) => We(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Pe = `[ 	
\f\r]`, se = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $t = /-->/g, wt = />/g, N = RegExp(`>|${Pe}(?:([^\\s"'>=/]+)(${Pe}*=${Pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), kt = /'/g, _t = /"/g, Mt = /^(?:script|style|textarea|title)$/i, Lt = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), a = Lt(1), y = Lt(2), Z = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), H = R.createTreeWalker(R, 129);
function Dt(t, e) {
  if (!We(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return yt !== void 0 ? yt.createHTML(e) : e;
}
const Kt = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = se;
  for (let l = 0; l < i; l++) {
    const c = t[l];
    let h, g, u = -1, b = 0;
    for (; b < c.length && (r.lastIndex = b, g = r.exec(c), g !== null); ) b = r.lastIndex, r === se ? g[1] === "!--" ? r = $t : g[1] !== void 0 ? r = wt : g[2] !== void 0 ? (Mt.test(g[2]) && (o = RegExp("</" + g[2], "g")), r = N) : g[3] !== void 0 && (r = N) : r === N ? g[0] === ">" ? (r = o ?? se, u = -1) : g[1] === void 0 ? u = -2 : (u = r.lastIndex - g[2].length, h = g[1], r = g[3] === void 0 ? N : g[3] === '"' ? _t : kt) : r === _t || r === kt ? r = N : r === $t || r === wt ? r = se : (r = N, o = void 0);
    const x = r === N && t[l + 1].startsWith("/>") ? " " : "";
    n += r === se ? c + Zt : u >= 0 ? (s.push(h), c.slice(0, u) + St + c.slice(u) + P + x) : c + P + (u === -2 ? l : x);
  }
  return [Dt(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class le {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const l = e.length - 1, c = this.parts, [h, g] = Kt(e, i);
    if (this.el = le.createElement(h, s), H.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = H.nextNode()) !== null && c.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(St)) {
          const b = g[r++], x = o.getAttribute(u).split(P), A = /([.?@])?(.*)/.exec(b);
          c.push({ type: 1, index: n, name: A[2], strings: x, ctor: A[1] === "." ? Jt : A[1] === "?" ? Qt : A[1] === "@" ? Xt : ye }), o.removeAttribute(u);
        } else u.startsWith(P) && (c.push({ type: 6, index: n }), o.removeAttribute(u));
        if (Mt.test(o.tagName)) {
          const u = o.textContent.split(P), b = u.length - 1;
          if (b > 0) {
            o.textContent = xe ? xe.emptyScript : "";
            for (let x = 0; x < b; x++) o.append(u[x], re()), H.nextNode(), c.push({ type: 2, index: ++n });
            o.append(u[b], re());
          }
        }
      } else if (o.nodeType === 8) if (o.data === It) c.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(P, u + 1)) !== -1; ) c.push({ type: 7, index: n }), u += P.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = R.createElement("template");
    return s.innerHTML = e, s;
  }
}
function G(t, e, i = t, s) {
  var r, l;
  if (e === Z) return e;
  let o = s !== void 0 ? (r = i._$Co) == null ? void 0 : r[s] : i._$Cl;
  const n = ae(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = G(t, o._$AS(t, e.values), o, s)), e;
}
class Yt {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? R).importNode(i, !0);
    H.currentNode = o;
    let n = H.nextNode(), r = 0, l = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let h;
        c.type === 2 ? h = new he(n, n.nextSibling, this, e) : c.type === 1 ? h = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (h = new ei(n, this, e)), this._$AV.push(h), c = s[++l];
      }
      r !== (c == null ? void 0 : c.index) && (n = H.nextNode(), r++);
    }
    return H.currentNode = R, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class he {
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
    e = G(this, e, i), ae(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== Z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Gt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && ae(this._$AH) ? this._$AA.nextSibling.data = e : this.T(R.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = le.createElement(Dt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const r = new Yt(o, this), l = r.u(this.options);
      r.p(i), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = zt.get(e.strings);
    return i === void 0 && zt.set(e.strings, i = new le(e)), i;
  }
  k(e) {
    We(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new he(this.O(re()), this.O(re()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = xt(e).nextSibling;
      xt(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class ye {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = m;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = G(this, e, i, 0), r = !ae(e) || e !== this._$AH && e !== Z, r && (this._$AH = e);
    else {
      const l = e;
      let c, h;
      for (e = n[0], c = 0; c < n.length - 1; c++) h = G(this, l[s + c], i, c), h === Z && (h = this._$AH[c]), r || (r = !ae(h) || h !== this._$AH[c]), h === m ? e = m : e !== m && (e += (h ?? "") + n[c + 1]), this._$AH[c] = h;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Jt extends ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Qt extends ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Xt extends ye {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = G(this, e, i, 0) ?? m) === Z) return;
    const s = this._$AH, o = e === m && s !== m || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== m && (s === m || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ei {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    G(this, e);
  }
}
const Se = ne.litHtmlPolyfillSupport;
Se == null || Se(le, he), (ne.litHtmlVersions ?? (ne.litHtmlVersions = [])).push("3.3.3");
const ti = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new he(e.insertBefore(re(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis;
class v extends V {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ti(i, this.renderRoot, this.renderOptions);
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
    return Z;
  }
}
var Ot;
v._$litElement$ = !0, v.finalized = !0, (Ot = q.litElementHydrateSupport) == null || Ot.call(q, { LitElement: v });
const Ie = q.litElementPolyfillSupport;
Ie == null || Ie({ LitElement: v });
(q.litElementVersions ?? (q.litElementVersions = [])).push("4.2.2");
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
const ii = { attribute: !0, type: String, converter: be, reflect: !1, hasChanged: Fe }, si = (t = ii, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const c = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, c, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, t, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(l) {
      const c = this[r];
      e.call(this, l), this.requestUpdate(r, c, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function p(t) {
  return (e, i) => typeof i == "object" ? si(t, e, i) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(t) {
  return p({ ...t, state: !0, attribute: !1 });
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
function oi(t) {
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
  if (s !== "auto" && s !== "desktop" && s !== "tablet" && s !== "mobile")
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
    layout: s
  };
}
const ni = 84, ce = 2 * Math.PI * ni;
function Ve(t, e, i) {
  if (t === null || i <= e) return ce;
  const s = Math.min(1, Math.max(0, (t - e) / (i - e)));
  return ce * (1 - s);
}
function Ze(t, e, i, s) {
  const o = Math.round(t / s) * s, n = Math.min(i, Math.max(e, o)), r = (String(s).split(".")[1] || "").length;
  return Number(n.toFixed(r));
}
const K = 0.5;
function Ge(t, e) {
  const i = Math.round((t + e) * 10) / 10;
  return Math.min(500, Math.max(0, i));
}
function ri(t, e) {
  var r, l;
  const i = (r = t.entities) == null ? void 0 : r[e], s = i == null ? void 0 : i.device_id;
  if (!s) return null;
  const o = (l = t.devices) == null ? void 0 : l[s], n = (o == null ? void 0 : o.identifiers) ?? [];
  for (const c of n)
    if (c[0] === "pd_hathemo") {
      const h = parseInt(c[1], 10);
      return Number.isNaN(h) ? null : h;
    }
  return null;
}
const ai = { off: "off", heat: "heat", auto: "auto" };
function $(t) {
  if (t == null || t === "" || t === "unknown" || t === "unavailable") return null;
  const e = Number(t);
  return Number.isNaN(e) ? null : e;
}
function li(t, e) {
  if (e) return e;
  const i = t.entities ?? {};
  return Object.keys(i).filter((s) => {
    var o;
    return s.startsWith("climate.") && ((o = i[s]) == null ? void 0 : o.platform) === "pd_hathemo";
  }).sort();
}
function _(t, e, i, s, o = !1) {
  var r;
  if (!e) return null;
  const n = t.entities ?? {};
  for (const l of Object.keys(n))
    if (((r = n[l]) == null ? void 0 : r.device_id) === e && l.startsWith(i + ".") && (o ? l.endsWith("_" + s) : l.includes(s)))
      return l;
  return null;
}
function ci(t, e, i) {
  var et, tt, it, st, ot, nt, rt, at, lt, ct, dt, pt, ht;
  const s = t.states[e];
  if (!s) return null;
  const o = s.attributes, n = (tt = (et = t.entities) == null ? void 0 : et[e]) == null ? void 0 : tt.device_id, r = _(t, n, "sensor", "room_temperature"), l = _(t, n, "sensor", "floor_temperature"), c = _(t, n, "sensor", "outside_temperature"), h = _(t, n, "binary_sensor", "heating"), g = _(t, n, "light", "backlight"), u = _(t, n, "sensor", "heating_today", !0), b = _(t, n, "switch", "child_lock", !0), x = _(t, n, "number", "price_limit", !0), A = _(t, n, "binary_sensor", "connection", !0), ie = _(t, n, "sensor", "scheduled_temperature", !0), me = _(t, n, "sensor", "next_schedule_change", !0), d = (D) => D ? t.states[D] : void 0, Xe = (D) => {
    var gt;
    const ut = (gt = d(D)) == null ? void 0 : gt.state;
    return ut === "on" ? !0 : ut === "off" ? !1 : null;
  }, Ae = (it = d(ie)) == null ? void 0 : it.attributes, Ce = Ae == null ? void 0 : Ae.schedule, W = d(me);
  let Ee = null;
  const ve = W == null ? void 0 : W.state;
  if (ve && ve !== "unknown" && ve !== "unavailable") {
    const D = new Date(ve);
    Number.isNaN(D.getTime()) || (Ee = D);
  }
  return {
    climateEntityId: e,
    name: o.friendly_name ?? e,
    currentTemp: $(o.current_temperature),
    targetTemp: $(o.temperature),
    mode: ai[s.state] ?? "off",
    heating: (o.hvac_action ?? ((st = d(h)) == null ? void 0 : st.state)) === "heating" || ((ot = d(h)) == null ? void 0 : ot.state) === "on",
    minTemp: $(o.min_temp) ?? 5,
    maxTemp: $(o.max_temp) ?? 35,
    step: $(o.target_temp_step) ?? i,
    roomTemp: $((nt = d(r)) == null ? void 0 : nt.state),
    floorTemp: $((rt = d(l)) == null ? void 0 : rt.state),
    outsideTemp: $((at = d(c)) == null ? void 0 : at.state),
    heatingTodayPct: $((lt = d(u)) == null ? void 0 : lt.state),
    backlightEntityId: g,
    backlightOn: g ? ((ct = d(g)) == null ? void 0 : ct.state) === "on" : null,
    themoDeviceId: ri(t, e),
    presetModes: Array.isArray(o.preset_modes) ? o.preset_modes : [],
    presetMode: o.preset_mode ?? null,
    childLockEntityId: b,
    childLockOn: Xe(b),
    priceLimitEntityId: x,
    priceLimit: $((dt = d(x)) == null ? void 0 : dt.state),
    connected: Xe(A),
    scheduledTemp: $((pt = d(ie)) == null ? void 0 : pt.state),
    scheduleName: typeof Ce == "string" && Ce !== "" ? Ce : null,
    nextChangeAt: Ee,
    nextChangeTemp: Ee !== null ? $((ht = W == null ? void 0 : W.attributes) == null ? void 0 : ht.temperature) : null
  };
}
function di(t) {
  return t ? t.schedules.find((e) => e.active) ?? null : null;
}
function Nt(t, e) {
  const i = t.setpoints.filter((r) => r.day === e).sort((r, l) => r.hour - l.hour), s = new Array(24).fill(null);
  if (i.length === 0) return s;
  let o = null, n = 0;
  for (let r = 0; r < 24; r++) {
    for (; n < i.length && i[n].hour === r; )
      o = i[n].value, n++;
    s[r] = o;
  }
  return s;
}
function pi(t, e, i) {
  const s = Nt(t, e), o = s[i];
  for (let n = i + 1; n < 24; n++)
    if (s[n] !== null && s[n] !== o) return { hour: n, value: s[n] };
  return null;
}
const hi = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function ui(t, e) {
  const i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
  return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate() ? i : `${hi[t.getDay()]} ${i}`;
}
function $e(t, e = /* @__PURE__ */ new Date()) {
  return t.nextChangeAt === null || t.nextChangeTemp === null || t.nextChangeAt.getTime() <= e.getTime() ? null : `${ui(t.nextChangeAt, e)} → ${t.nextChangeTemp}°`;
}
class gi {
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
function Me(t, e, i) {
  return t.callService("climate", "set_temperature", { entity_id: e, temperature: i });
}
function Le(t, e, i) {
  return t.callService("climate", "set_hvac_mode", { entity_id: e, hvac_mode: i });
}
function mi(t, e, i) {
  return t.callService("climate", "set_preset_mode", { entity_id: e, preset_mode: i });
}
function De(t, e, i) {
  return t.callService("light", i ? "turn_off" : "turn_on", { entity_id: e });
}
function Ne(t, e) {
  const [i, s] = e.service.split(".", 2);
  return t.callService(i, s, e.service_data ?? {});
}
function He(t, e, i) {
  return t.callService("switch", i ? "turn_off" : "turn_on", { entity_id: e });
}
function qe(t, e, i) {
  return t.callService("number", "set_value", { entity_id: e, value: i });
}
const we = f`
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
`, ke = f`
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
var vi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, Ke = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? fi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && vi(e, i, o), o;
};
function Ye(t, e = null) {
  return t.connected === !1 ? { kind: "offline", text: "offline · cloud connection lost", pct: null } : t.heating ? { kind: "heating", text: "heating", pct: t.heatingTodayPct } : t.mode === "auto" && t.priceLimit !== null && e !== null && e > t.priceLimit ? { kind: "cap", text: `price cap · spot ${e.toFixed(1)} > ${t.priceLimit} c/kWh`, pct: null } : t.floorTemp !== null ? { kind: "plain", text: `floor ${t.floorTemp}°`, pct: null } : t.mode === "off" ? { kind: "plain", text: "off", pct: null } : t.mode === "auto" && t.currentTemp !== null && t.targetTemp !== null && t.currentTemp >= t.targetTemp ? { kind: "plain", text: "at setpoint", pct: null } : { kind: "plain", text: t.mode, pct: null };
}
const X = y`<svg class="lock-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`, ee = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22.6 14.6A4.5 4.5 0 0 0 18 9h-1.3A7 7 0 0 0 6 6.3"/><path d="M6.5 9.7A4.5 4.5 0 0 0 7.5 18h9"/><line x1="3" y1="3" x2="21" y2="21"/></svg>`, Tt = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`, bi = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`, xi = y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
let de = class extends v {
  constructor() {
    super(...arguments), this.spot = null;
  }
  icon() {
    return this.zone.heating ? Tt : this.zone.mode === "auto" ? bi : this.zone.mode === "off" ? xi : Tt;
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
          <div class="name">${t.name}${t.childLockOn ? X : ""}</div>
          <div class="meta">${(() => {
      const i = Ye(t, this.spot);
      return i.kind === "offline" ? a`<span class="offl">${ee}offline</span>` : i.kind === "heating" ? a`<span class="st-heat">heating</span>${i.pct !== null ? a` · <span class="pct">${i.pct}% today</span>` : ""}` : i.kind === "cap" ? a`<span class="cap">${i.text}</span>` : i.text;
    })()}</div>
        </div>
        <div class="now">${t.currentTemp ?? "—"}<span class="u">°</span><span class="tgt">→ ${t.targetTemp !== null ? a`${t.targetTemp}°` : t.mode === "auto" ? a`<span class="auto-a">A</span>${t.scheduledTemp !== null ? a` ${t.scheduledTemp}°` : ""}` : "—"}</span></div>
        <div class="mp"></div>
      </div>`;
  }
};
de.styles = [k, ke, f`
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
Ke([
  p({ attribute: !1 })
], de.prototype, "zone", 2);
Ke([
  p({ attribute: !1 })
], de.prototype, "spot", 2);
de = Ke([
  w("themo-zone-row")
], de);
var yi = Object.defineProperty, $i = Object.getOwnPropertyDescriptor, _e = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? $i(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && yi(e, i, o), o;
};
const wi = { off: "Off", heat: "Heat", auto: "Auto" };
let Y = class extends v {
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
            <div class="zone-name">${t.name}${t.childLockOn ? X : ""}</div>
            <div class="zone-entity">${t.climateEntityId}</div>
          </div>
        </div>
        <div class="zone-temp">
          <div class="now">${t.currentTemp ?? "—"}<span class="unit">°</span></div>
          <div class="target">→ <span>${t.targetTemp !== null ? a`${t.targetTemp}°` : t.mode === "auto" ? a`<span class="auto-a">A</span>${t.scheduledTemp !== null ? a` ${t.scheduledTemp}°` : ""}` : "—"}</span></div>
        </div>
        <div class="zone-meta">${(() => {
      const i = Ye(t, this.spot);
      if (i.kind === "offline") return a`<span class="offl">${ee}${i.text}</span>`;
      if (i.kind === "cap") return a`<span class="cap">${i.text}</span>`;
      const s = i.kind === "plain" && t.mode === "auto" ? $e(t) : null;
      return a`${t.heating ? a`<span class="st-heat">heating</span>` : "idle"}${t.heatingTodayPct !== null ? a` · <span class="pct">${t.heatingTodayPct}% today</span>` : ""}${s ? ` · ${s}` : ""}`;
    })()}</div>
        <div class="zone-foot">
          <button class="mode-pill ${t.mode}"><span class="swatch"></span>${wi[t.mode]}</button>
        </div>
      </div>`;
  }
};
Y.styles = [k, we, f`
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
_e([
  p({ attribute: !1 })
], Y.prototype, "zone", 2);
_e([
  p({ attribute: !1 })
], Y.prototype, "spot", 2);
_e([
  p({ type: Boolean })
], Y.prototype, "selected", 2);
Y = _e([
  w("themo-zone-tile")
], Y);
var ki = Object.defineProperty, _i = Object.getOwnPropertyDescriptor, L = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? _i(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && ki(e, i, o), o;
};
let T = class extends v {
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
T.styles = [k, we, f`:host{display:block;}`];
L([
  p({ attribute: !1 })
], T.prototype, "zones", 2);
L([
  p()
], T.prototype, "selectedId", 2);
L([
  p()
], T.prototype, "title", 2);
L([
  p({ attribute: !1 })
], T.prototype, "quickActions", 2);
L([
  p()
], T.prototype, "outsideText", 2);
L([
  p()
], T.prototype, "sunText", 2);
L([
  p({ attribute: !1 })
], T.prototype, "spot", 2);
T = L([
  w("themo-overview")
], T);
var zi = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, B = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ti(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && zi(e, i, o), o;
};
const Ai = [
  { mode: "off", name: "Off", desc: "power off" },
  { mode: "heat", name: "Heat", desc: "manual setpoint" },
  { mode: "auto", name: "Auto", desc: "follow schedule" }
];
let C = class extends v {
  constructor() {
    super(...arguments), this.todayRow = null, this.nextChangeText = null, this.nowHour = 0, this.step = 0.5, this.pendingPrice = null, this.pendingFor = null, this.pendingAt = 0;
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = e.targetTemp ?? e.minTemp, s = Ze(i + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: s });
  }
  bumpPrice(t) {
    const e = this.pendingPrice ?? this.zone.priceLimit;
    if (e === null) return;
    const i = Ge(e, t);
    this.pendingPrice = i, this.pendingAt = Date.now(), this.pendingFor = this.zone.climateEntityId, this.emit("pricelimit-change", { value: i });
  }
  willUpdate() {
    const t = this.zone;
    this.pendingPrice !== null && ((t == null ? void 0 : t.climateEntityId) !== this.pendingFor || (t == null ? void 0 : t.priceLimit) === this.pendingPrice || Date.now() - this.pendingAt > 1e4) && (this.pendingPrice = null, this.pendingFor = null);
  }
  render() {
    const t = this.zone, e = Ve(t.currentTemp, t.minTemp, t.maxTemp), i = t.presetModes.length > 0;
    return a`
      <section class="ha-card themo-detail">
        <div class="detail-head">
          <div class="detail-eyebrow">Selected zone</div>
          <div class="detail-title">${t.name}</div>
          <div class="detail-entity">${t.climateEntityId}</div>
          ${t.connected === !1 ? a`<div class="offchip">${ee}offline</div>` : ""}
        </div>

        <div class="ring-stage">
          <div class="ring">
            ${y`<svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle cx="100" cy="100" r="84" fill="none" stroke="var(--heat)" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="${ce}" stroke-dashoffset="${e}"
                transform="rotate(-90 100 100)"/>
            </svg>`}
            <div class="ring-num"><div>
              <div class="now-big">${t.currentTemp ?? "—"}<span class="unit">°C</span></div>
              <div class="now-cap">Room temp</div>
            </div></div>
          </div>
          <div class="target-col">
            <div>
              <div class="label">${t.mode === "auto" ? `Target${t.scheduleName ? ` · ${t.scheduleName}` : ""}` : "Setpoint"}</div>
              ${t.mode === "auto" ? a`
              <div class="stepper auto" data-auto-target>
                <div class="val"><span class="auto-a">A</span>${t.scheduledTemp !== null ? a`<span>${t.scheduledTemp}</span><span class="unit">°C</span>` : ""}</div>
              </div>` : a`
              <div class="stepper">
                <button data-step-dn @click=${() => this.bump(-t.step)} ?disabled=${t.mode !== "heat"}>−</button>
                <div class="val">${t.targetTemp !== null ? a`<span>${t.targetTemp}</span><span class="unit">°C</span>` : a`<span>—</span><span class="unit">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>`}
            </div>
          </div>
        </div>

        <div class="mode-row">
          ${Ai.map((s) => a`
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
          ${t.childLockEntityId !== null ? a`
          <div class="kv" data-childlock style="cursor:pointer" @click=${() => this.emit("childlock-toggle", {})}>
            <div class="k">Child lock</div>
            <div class="v" style="color:${t.childLockOn ? "var(--accent)" : "var(--muted)"};display:flex;align-items:center;gap:7px">${X}${t.childLockOn === null ? "—" : t.childLockOn ? "Locked" : "Open"}</div>
            <div class="sub">${t.childLockOn ? "tap to unlock" : "tap to lock"}</div>
          </div>` : ""}
          ${t.priceLimitEntityId !== null ? a`
          <div class="kv">
            <div class="k">Price limit</div>
            <div class="v mini-step">
              <button data-price-dn ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(-K)}>−</button>
              ${this.pendingPrice ?? t.priceLimit ?? "—"}<span class="unit">c/kWh</span>
              <button data-price-up ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(K)}>+</button>
            </div>
            <div class="sub">auto skips pricier hours</div>
          </div>` : ""}
        </div>

        ${i ? this.renderSchedule(t) : ""}
      </section>`;
  }
  renderSchedule(t) {
    const e = this.todayRow ?? new Array(24).fill(null), i = Math.max(...e.map((o) => o ?? 0), 1), s = (o) => o === null ? 0 : Math.ceil(o / i * 3);
    return a`
      <div class="schedule">
        <div class="schedule-head">
          <div class="title">Today's schedule</div>
          <div class="next">${this.nextChangeText ? a`Next change <strong>${this.nextChangeText}</strong>` : "No further changes today"}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${t.presetModes.map((o) => a`
            <button class="qa-chip ${t.presetMode === o ? "active" : ""}" data-preset=${o}
              @click=${() => this.emit("preset-change", { preset: o })}>${o}</button>`)}
        </div>
        <div class="heatmap">
          <div class="row-lbl">Today</div>
          <div class="hour-row">
            ${e.map((o, n) => a`<div class="cell"
              data-h=${s(o) || ""} ?data-now=${n === this.nowHour}></div>`)}
          </div>
        </div>
      </div>`;
  }
};
C.styles = [k, we, f`
    :host{display:block;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .stepper.auto { display: flex; align-items: center; justify-content: center; }
    .stepper.auto .val { border: 0; display: flex; align-items: baseline; gap: 6px; }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .kv .lock-ic { width: 14px; height: 14px; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 11px var(--font-mono); letter-spacing: .04em; margin-top: 4px; }
    .offchip svg { width: 12px; height: 12px; }
  `];
B([
  p({ attribute: !1 })
], C.prototype, "zone", 2);
B([
  p({ attribute: !1 })
], C.prototype, "todayRow", 2);
B([
  p()
], C.prototype, "nextChangeText", 2);
B([
  p({ type: Number })
], C.prototype, "nowHour", 2);
B([
  p({ type: Number })
], C.prototype, "step", 2);
B([
  M()
], C.prototype, "pendingPrice", 2);
C = B([
  w("themo-detail")
], C);
var Ci = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, ue = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ei(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Ci(e, i, o), o;
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
U.styles = [k, we, f`:host{display:block;}`];
ue([
  p()
], U.prototype, "value", 2);
ue([
  p()
], U.prototype, "unit", 2);
ue([
  p()
], U.prototype, "sub", 2);
ue([
  p({ type: Boolean })
], U.prototype, "warm", 2);
U = ue([
  w("themo-glance")
], U);
var Oi = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, ge = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Pi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Oi(e, i, o), o;
};
const At = (t) => Math.round(t * 10) / 10;
let j = class extends v {
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
    const t = this.avg((s) => s.currentTemp), e = this.avg((s) => s.targetTemp), i = t !== null && e !== null ? At(t - e) : null;
    return a`
      <div class="head-card">
        <div class="row">
          ${this.activeCount > 0 ? a`<div class="badge"><span class="dot"></span>Heating now</div>` : a`<div></div>`}
          ${this.outsideText ? a`<div class="outside">Outside ${this.outsideText}</div>` : ""}
        </div>
        <div class="big-temp">
          <div class="now">${t !== null ? At(t) : "—"}<span class="unit">°</span></div>
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
j.styles = [k, ke, f`:host{display:block;}`];
ge([
  p({ attribute: !1 })
], j.prototype, "zones", 2);
ge([
  p()
], j.prototype, "outsideText", 2);
ge([
  p()
], j.prototype, "energyToday", 2);
ge([
  p()
], j.prototype, "energyCost", 2);
j = ge([
  w("themo-mobile-header")
], j);
var Si = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, F = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ii(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Si(e, i, o), o;
};
let E = class extends v {
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
E.styles = [k, ke, f`:host{display:block;padding:4px;}`];
F([
  p({ attribute: !1 })
], E.prototype, "zones", 2);
F([
  p({ attribute: !1 })
], E.prototype, "quickActions", 2);
F([
  p()
], E.prototype, "outsideText", 2);
F([
  p()
], E.prototype, "energyToday", 2);
F([
  p()
], E.prototype, "energyCost", 2);
F([
  p({ attribute: !1 })
], E.prototype, "spot", 2);
E = F([
  w("themo-mobile-view")
], E);
var Mi = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, ze = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Li(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Mi(e, i, o), o;
};
const Re = 58, Ct = 2 * Math.PI * Re, Di = [
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
    const e = this.zone, i = Ze((e.targetTemp ?? e.minTemp) + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: i });
  }
  bumpPrice(t) {
    const e = this.pendingPrice ?? this.zone.priceLimit;
    if (e === null) return;
    const i = Ge(e, t);
    this.pendingPrice = i, this.pendingAt = Date.now(), this.pendingFor = this.zone.climateEntityId, this.emit("pricelimit-change", { value: i });
  }
  willUpdate() {
    const t = this.zone;
    this.pendingPrice !== null && ((t == null ? void 0 : t.climateEntityId) !== this.pendingFor || (t == null ? void 0 : t.priceLimit) === this.pendingPrice || Date.now() - this.pendingAt > 1e4) && (this.pendingPrice = null, this.pendingFor = null);
  }
  render() {
    const t = this.zone, e = Ve(t.currentTemp, t.minTemp, t.maxTemp) / ce * Ct;
    return a`
      <div class="sheet-backdrop" @click=${() => this.emit("sheet-close")}></div>
      <div class="sheet">
        <div class="grabber" @click=${() => this.emit("sheet-close")}></div>
        <div class="head">
          <div class="name">${t.name}</div>
          <div class="entity">${t.climateEntityId}</div>
          ${t.connected === !1 ? a`<div class="offchip">${ee}offline</div>` : ""}
        </div>
        <div class="dial-row">
          <div class="mini-ring">
            ${y`<svg viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="${Re}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
              <circle cx="70" cy="70" r="${Re}" fill="none" stroke="var(--heat)" stroke-width="8"
                stroke-linecap="round" stroke-dasharray="${Ct}" stroke-dashoffset="${e}"
                transform="rotate(-90 70 70)"/>
            </svg>`}
            <div class="num"><div>
              <div class="big">${t.currentTemp ?? "—"}<span class="u">°C</span></div>
              <div class="lbl">Room</div>
            </div></div>
          </div>
          <div class="target-stack">
            <div>
              <div class="lbl">${t.mode === "auto" ? `Target${t.scheduleName ? ` · ${t.scheduleName}` : ""}` : "Setpoint"}</div>
              ${t.mode === "auto" ? a`
              <div class="stepper auto" data-auto-target>
                <div class="val"><span class="auto-a">A</span>${t.scheduledTemp !== null ? a`${t.scheduledTemp}<span class="u">°C</span>` : ""}</div>
              </div>` : a`
              <div class="stepper">
                <button data-step-dn @click=${() => this.bump(-t.step)} ?disabled=${t.mode !== "heat"}>−</button>
                <div class="val">${t.targetTemp !== null ? a`${t.targetTemp}<span class="u">°C</span>` : a`—<span class="u">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
              </div>`}
            </div>
          </div>
        </div>
        <div class="mode-row">
          ${Di.map((i) => a`
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
            <div class="v" style="color:${t.childLockOn ? "var(--accent)" : "var(--muted)"};display:flex;align-items:center;gap:6px">${X}${t.childLockOn === null ? "—" : t.childLockOn ? "Locked" : "Open"}</div>
            <div class="sub">${t.childLockOn ? "tap to unlock" : "tap to lock"}</div>
          </div>` : ""}
          ${t.priceLimitEntityId !== null ? a`
          <div class="kv">
            <div class="k">Price limit</div>
            <div class="v mini-step">
              <button data-price-dn ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(-K)}>−</button>
              ${this.pendingPrice ?? t.priceLimit ?? "—"} c/kWh
              <button data-price-up ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(K)}>+</button>
            </div>
          </div>` : ""}
        </div>
      </div>`;
  }
};
J.styles = [k, ke, f`
    :host{display:contents;} .auto-a { color: var(--ok); font-weight: 600; }
    .stepper.auto { display: flex; align-items: center; justify-content: center; }
    .stepper.auto .val { border: 0; display: flex; align-items: baseline; gap: 5px; }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .kv .sub { font-family: var(--font-mono); font-size: 9px; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; margin-top: 3px; }
    .kv .lock-ic { width: 13px; height: 13px; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 10px var(--font-mono); letter-spacing: .04em; }
    .offchip svg { width: 12px; height: 12px; }
  `];
ze([
  p({ attribute: !1 })
], J.prototype, "zone", 2);
ze([
  p()
], J.prototype, "nextChangeText", 2);
ze([
  M()
], J.prototype, "pendingPrice", 2);
J = ze([
  w("themo-mobile-sheet")
], J);
const Je = f`
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
var Ni = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, Te = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Hi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Ni(e, i, o), o;
};
const qi = { off: "Off", heat: "Heat", auto: "Auto" };
function Ri(t, e) {
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
    const t = this.zone, e = Ri(t.currentTemp, t.targetTemp), i = ["ztile", t.heating ? "heating" : t.mode, this.selected ? "selected" : "", t.connected === !1 ? "offline" : ""].join(" ");
    return a`
      <div class="${i}" @click=${() => this.select()}>
        <div>
          <div class="head">
            <div>
              <div class="name">${t.name}</div>
              <div class="entity">${t.climateEntityId}</div>
            </div>
            ${t.childLockOn ? X : ""}<div class="mp"><span class="sw"></span>${qi[t.mode]}</div>
          </div>
          <div class="big-temp">
            <div class="now">${t.currentTemp ?? "—"}</div>
            <div class="u">°C</div>
            ${e ? a`<div class="delta ${e.cool ? "cool" : ""}">${e.text}</div>` : ""}
          </div>
          <div class="target-line">→ <span class="target">${t.targetTemp !== null ? a`${t.targetTemp}°` : t.mode === "auto" ? a`<span class="auto-a">A</span>${t.scheduledTemp !== null ? a` ${t.scheduledTemp}°` : ""}` : "—"}</span>${t.targetTemp !== null ? " setpoint" : t.mode === "auto" && t.scheduledTemp !== null ? " schedule" : ""}</div>
          <div class="meta-line">${(() => {
      const s = Ye(t, this.spot);
      if (s.kind === "offline") return a`<span class="offl">${ee}${s.text}</span>`;
      if (s.kind === "heating") return a`<span class="st-heat">heating</span>${s.pct !== null ? a` · <span class="pct">${s.pct}% today</span>` : ""}`;
      if (s.kind === "cap") return a`<span class="cap">${s.text}</span>`;
      const o = s.kind === "plain" && t.mode === "auto" ? $e(t) : null;
      return a`${s.text}${o ? ` · ${o}` : ""}`;
    })()}</div>
        </div>
      </div>`;
  }
};
Q.styles = [k, Je, f`
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
Te([
  p({ attribute: !1 })
], Q.prototype, "zone", 2);
Te([
  p({ attribute: !1 })
], Q.prototype, "spot", 2);
Te([
  p({ type: Boolean })
], Q.prototype, "selected", 2);
Q = Te([
  w("themo-tablet-tile")
], Q);
var Ui = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, Qe = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ji(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Ui(e, i, o), o;
};
const Ue = 80, Et = 2 * Math.PI * Ue, Bi = [
  { mode: "off", name: "Off", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: "heat", name: "Heat", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: "auto", name: "Auto", icon: y`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` }
];
let pe = class extends v {
  constructor() {
    super(...arguments), this.pendingPrice = null, this.pendingFor = null, this.pendingAt = 0;
  }
  emit(t, e = {}) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  bump(t) {
    const e = this.zone, i = Ze((e.targetTemp ?? e.minTemp) + t, e.minTemp, e.maxTemp, e.step);
    this.emit("setpoint-change", { temperature: i });
  }
  bumpPrice(t) {
    const e = this.pendingPrice ?? this.zone.priceLimit;
    if (e === null) return;
    const i = Ge(e, t);
    this.pendingPrice = i, this.pendingAt = Date.now(), this.pendingFor = this.zone.climateEntityId, this.emit("pricelimit-change", { value: i });
  }
  willUpdate() {
    const t = this.zone;
    this.pendingPrice !== null && ((t == null ? void 0 : t.climateEntityId) !== this.pendingFor || (t == null ? void 0 : t.priceLimit) === this.pendingPrice || Date.now() - this.pendingAt > 1e4) && (this.pendingPrice = null, this.pendingFor = null);
  }
  render() {
    const t = this.zone, e = Ve(t.currentTemp, t.minTemp, t.maxTemp) / ce * Et;
    return a`
      <div class="focus-card">
        <div class="label">Selected zone</div>
        <div class="name">${t.name}</div>
        ${t.connected === !1 ? a`<div class="offchip">${ee}offline</div>` : ""}
        <div class="ring-wrap">
          ${y`<svg class="ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="${Ue}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
            <circle cx="100" cy="100" r="${Ue}" fill="none" stroke="var(--heat)" stroke-width="8"
              stroke-linecap="round" stroke-dasharray="${Et}" stroke-dashoffset="${e}"
              transform="rotate(-90 100 100)"/>
          </svg>`}
          <div class="ring-num"><div>
            <div class="big">${t.currentTemp ?? "—"}<span class="u">°C</span></div>
            <div class="cap">Room</div>
          </div></div>
        </div>
        ${t.mode === "auto" ? a`
        <div class="stepper auto" data-auto-target>
          <div class="val"><span class="auto-a">A</span>${t.scheduledTemp !== null ? a`${t.scheduledTemp}<span class="u">°C</span>` : ""}</div>
        </div>
        ${(() => {
      const i = $e(t);
      return i ? a`<div class="next-line">${t.scheduleName ? `${t.scheduleName} schedule · next ${i}` : `Next ${i}`}</div>` : "";
    })()}` : a`
        <div class="stepper">
          <button data-step-dn @click=${() => this.bump(-t.step)} ?disabled=${t.mode !== "heat"}>−</button>
          <div class="val">${t.targetTemp !== null ? a`${t.targetTemp}<span class="u">°C</span>` : a`—<span class="u">°C</span>`}</div>
          <button data-step-up @click=${() => this.bump(t.step)} ?disabled=${t.mode !== "heat"}>+</button>
        </div>`}
        <div class="mode-row">
          ${Bi.map((i) => a`
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
              @click=${() => this.emit("childlock-toggle")}>${X}Child lock · ${t.childLockOn === null ? "—" : t.childLockOn ? "Locked" : "Open"}</button>` : ""}
        </div>` : ""}
        ${t.priceLimitEntityId !== null ? a`
        <div class="price-row">
          <span class="plbl">Price limit</span>
          <span class="mini-step">
            <button data-price-dn ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(-K)}>−</button>
            ${this.pendingPrice ?? t.priceLimit ?? "—"} <span class="pu">c/kWh</span>
            <button data-price-up ?disabled=${t.priceLimit === null} @click=${() => this.bumpPrice(K)}>+</button>
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
pe.styles = [k, Je, f`
    :host { display: block; }
    .preset-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
    .pchip {
      height: 30px; padding: 0 12px; border-radius: 999px;
      background: var(--surface-2); border: 1px solid var(--border-2);
      color: var(--fg-soft); font-size: 12px; font-family: inherit; cursor: pointer;
    }
    .pchip.active { background: rgba(3,169,244,0.12); border-color: rgba(3,169,244,0.5); color: var(--accent); }
    .auto-a { color: var(--ok); font-weight: 600; }
    .stepper.auto { display: flex; align-items: center; justify-content: center; }
    .stepper.auto .val { border: 0; display: flex; align-items: baseline; gap: 6px; }
    .next-line { margin-top: 10px; text-align: center; font-size: 12px; color: var(--fg-soft); }
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
Qe([
  p({ attribute: !1 })
], pe.prototype, "zone", 2);
Qe([
  M()
], pe.prototype, "pendingPrice", 2);
pe = Qe([
  w("themo-tablet-focus")
], pe);
var Fi = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, O = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Wi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Fi(e, i, o), o;
};
const Vi = (t) => Math.round(t * 10) / 10;
let z = class extends v {
  constructor() {
    super(...arguments), this.zones = [], this.selectedId = "", this.quickActions = [], this.outsideText = null, this.energyToday = null, this.energyCost = null, this.energySpot = null, this.spot = null;
  }
  get heatingCount() {
    return this.zones.filter((t) => t.heating).length;
  }
  get houseAvg() {
    const t = this.zones.map((e) => e.currentTemp).filter((e) => e !== null);
    return t.length ? Vi(t.reduce((e, i) => e + i, 0) / t.length) : null;
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
z.styles = [k, Je, f`
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
O([
  p({ attribute: !1 })
], z.prototype, "zones", 2);
O([
  p()
], z.prototype, "selectedId", 2);
O([
  p({ attribute: !1 })
], z.prototype, "quickActions", 2);
O([
  p()
], z.prototype, "outsideText", 2);
O([
  p()
], z.prototype, "energyToday", 2);
O([
  p()
], z.prototype, "energyCost", 2);
O([
  p()
], z.prototype, "energySpot", 2);
O([
  p({ attribute: !1 })
], z.prototype, "spot", 2);
z = O([
  w("themo-tablet-view")
], z);
var Zi = Object.defineProperty, Gi = Object.getOwnPropertyDescriptor, te = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Gi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Zi(e, i, o), o;
};
let I = class extends v {
  constructor() {
    super(...arguments), this.selectedId = null, this.scheduleData = null, this.band = "desktop", this.sheetOpen = !1, this.schedules = new gi(), this.lastFetchedDeviceId = null;
  }
  setConfig(t) {
    this.config = oi(t);
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
    return !this._hass || !this.config ? [] : li(this._hass, this.config.entities).map((t) => ci(this._hass, t, this.config.step)).filter((t) => t !== null);
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
    return e ? a`<themo-glance .value=${e.state} .unit=${e.attributes.unit_of_measurement ?? "kWh"} .sub=${"today · all zones"}></themo-glance>` : "";
  }
  energyValue(t) {
    var s;
    if (!t) return null;
    const e = this._hass.states[t];
    if (!e || e.state === "unknown" || e.state === "unavailable") return null;
    const i = e.attributes.unit_of_measurement;
    return i && t === ((s = this.config.energy) == null ? void 0 : s.cost_entity) ? `${e.state} ${i}` : e.state;
  }
  spotNumber() {
    var n;
    const t = (n = this.config.energy) == null ? void 0 : n.spot_entity;
    if (!t) return null;
    const e = this._hass.states[t], i = Number(e == null ? void 0 : e.state);
    if (!Number.isFinite(i)) return null;
    const s = (r) => Math.round(r * 1e3) / 1e3, o = (e.attributes.unit_of_measurement ?? "").toLowerCase().replace(/\s/g, "");
    return o === "c/kwh" || o === "snt/kwh" || o === "cent/kwh" || o === "ct/kwh" ? s(i) : o === "€/kwh" || o === "eur/kwh" ? s(i * 100) : o === "€/mwh" || o === "eur/mwh" ? s(i / 10) : null;
  }
  onZoneOpen(t) {
    this.onSelect(t), this.sheetOpen = !0;
  }
  render() {
    var b, x, A, ie, me;
    if (!this.config || !this._hass) return a``;
    const t = this.zones(), e = this.selected(t), i = (e == null ? void 0 : e.outsideTemp) ?? null, s = di(this.scheduleData), o = (/* @__PURE__ */ new Date()).getDay(), n = (/* @__PURE__ */ new Date()).getHours(), r = s ? Nt(s, o) : null, l = s ? pi(s, o, n) : null, c = i !== null ? `${i}°C` : null, h = this.spotNumber(), g = l ? `${String(l.hour).padStart(2, "0")}:00 → ${l.value}°` : null, u = e ? $e(e, /* @__PURE__ */ new Date()) ?? g : null;
    return this.effectiveLayout() === "mobile" ? a`
        <themo-mobile-view
          .zones=${t} .quickActions=${this.config.quick_actions} .outsideText=${c} .spot=${h}
          .energyToday=${this.energyValue((b = this.config.energy) == null ? void 0 : b.today_entity)}
          .energyCost=${this.energyValue((x = this.config.energy) == null ? void 0 : x.cost_entity)}
          @zone-open=${(d) => this.onZoneOpen(d.detail.entityId)}
          @quick-action=${(d) => Ne(this._hass, d.detail.action)}
        ></themo-mobile-view>
        ${this.sheetOpen && e && (this.selectedId === null || e.climateEntityId === this.selectedId) ? a`<themo-mobile-sheet
          .zone=${e} .nextChangeText=${u}
          @sheet-close=${() => {
      this.sheetOpen = !1;
    }}
          @setpoint-change=${(d) => Me(this._hass, e.climateEntityId, d.detail.temperature)}
          @mode-change=${(d) => Le(this._hass, e.climateEntityId, d.detail.mode)}
          @backlight-toggle=${() => e.backlightEntityId && De(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
          @childlock-toggle=${() => (e == null ? void 0 : e.childLockEntityId) && He(this._hass, e.childLockEntityId, e.childLockOn ?? !1)}
          @pricelimit-change=${(d) => (e == null ? void 0 : e.priceLimitEntityId) && qe(this._hass, e.priceLimitEntityId, d.detail.value)}
        ></themo-mobile-sheet>` : ""}` : this.effectiveLayout() === "tablet" ? a`
        <themo-tablet-view
          .zones=${t} .selectedId=${(e == null ? void 0 : e.climateEntityId) ?? ""}
          .quickActions=${this.config.quick_actions} .outsideText=${c} .spot=${h}
          .energyToday=${this.energyValue((A = this.config.energy) == null ? void 0 : A.today_entity)}
          .energyCost=${this.energyValue((ie = this.config.energy) == null ? void 0 : ie.cost_entity)}
          .energySpot=${this.energyValue((me = this.config.energy) == null ? void 0 : me.spot_entity)}
          @zone-select=${(d) => this.onSelect(d.detail.entityId)}
          @quick-action=${(d) => Ne(this._hass, d.detail.action)}
          @setpoint-change=${(d) => e && Me(this._hass, e.climateEntityId, d.detail.temperature)}
          @mode-change=${(d) => e && Le(this._hass, e.climateEntityId, d.detail.mode)}
          @preset-change=${(d) => e && this.onPreset(e, d.detail.preset)}
          @backlight-toggle=${() => (e == null ? void 0 : e.backlightEntityId) && De(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
          @childlock-toggle=${() => (e == null ? void 0 : e.childLockEntityId) && He(this._hass, e.childLockEntityId, e.childLockOn ?? !1)}
          @pricelimit-change=${(d) => (e == null ? void 0 : e.priceLimitEntityId) && qe(this._hass, e.priceLimitEntityId, d.detail.value)}
        ></themo-tablet-view>` : a`
      <div class="view">
        <themo-overview
          .zones=${t} .selectedId=${(e == null ? void 0 : e.climateEntityId) ?? ""} .title=${this.config.title}
          .quickActions=${this.config.quick_actions}
          .outsideText=${c} .spot=${h}
          .sunText=${this.sunText()}
          @zone-select=${(d) => this.onSelect(d.detail.entityId)}
          @quick-action=${(d) => Ne(this._hass, d.detail.action)}
        ></themo-overview>
        <div class="right-col">
          ${e ? a`<themo-detail
            .zone=${e} .todayRow=${r} .nextChangeText=${u} .nowHour=${n} .step=${this.config.step}
            @setpoint-change=${(d) => Me(this._hass, e.climateEntityId, d.detail.temperature)}
            @mode-change=${(d) => Le(this._hass, e.climateEntityId, d.detail.mode)}
            @preset-change=${(d) => this.onPreset(e, d.detail.preset)}
            @backlight-toggle=${() => e.backlightEntityId && De(this._hass, e.backlightEntityId, e.backlightOn ?? !1)}
            @childlock-toggle=${() => (e == null ? void 0 : e.childLockEntityId) && He(this._hass, e.childLockEntityId, e.childLockOn ?? !1)}
            @pricelimit-change=${(d) => (e == null ? void 0 : e.priceLimitEntityId) && qe(this._hass, e.priceLimitEntityId, d.detail.value)}
          ></themo-detail>` : a`<div>No Themo thermostats found.</div>`}
          ${this.energyGlance()}
        </div>
      </div>`;
  }
  async onPreset(t, e) {
    await mi(this._hass, t.climateEntityId, e), t.themoDeviceId !== null && (this.schedules.invalidate(t.themoDeviceId), this.lastFetchedDeviceId = null, this.maybeFetchSchedule());
  }
};
I.styles = [k, f`
    :host { display: block; }
    .view { display:grid; grid-template-columns: 1fr 460px; gap:24px; padding:8px; }
    .right-col { display:flex; flex-direction:column; gap:18px; }
  `];
te([
  M()
], I.prototype, "config", 2);
te([
  M()
], I.prototype, "selectedId", 2);
te([
  M()
], I.prototype, "scheduleData", 2);
te([
  M()
], I.prototype, "band", 2);
te([
  M()
], I.prototype, "sheetOpen", 2);
I = te([
  w("themo-card")
], I);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "themo-card",
  name: "PapaDog's Themo Control Card",
  description: "Multi-thermostat companion card for the pd_hathemo integration"
});
export {
  I as ThemoCard
};
