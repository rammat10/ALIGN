import { a as e, t as n, r as t } from './rolldown-runtime-COnpUsM8.js';
import { i, a as r } from './vendor-react-CqWgVW6T.js';
var a = e(r()),
  o = e(i());
function s(e) {
  var t,
    n,
    r = ``;
  if (typeof e == `string` || typeof e == `number`) r += e;
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (n = s(e[t])) && (r && (r += ` `), (r += n));
    } else for (n in e) e[n] && (r && (r += ` `), (r += n));
  return r;
}
function c() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = s(e)) && (r && (r += ` `), (r += t));
  return r;
}
function l(e) {
  return (e + 0.5) | 0;
}
var u = (e, t, n) => Math.max(Math.min(e, n), t);
function d(e) {
  return u(l(e * 2.55), 0, 255);
}
function f(e) {
  return u(l(e * 255), 0, 255);
}
function p(e) {
  return u(l(e / 2.55) / 100, 0, 1);
}
function m(e) {
  return u(l(e * 100), 0, 100);
}
var h = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
  },
  g = [...`0123456789ABCDEF`],
  _ = (e) => g[e & 15],
  v = (e) => g[(e & 240) >> 4] + g[e & 15],
  y = (e) => (e & 240) >> 4 == (e & 15),
  b = (e) => y(e.r) && y(e.g) && y(e.b) && y(e.a);
function x(e) {
  var t = e.length,
    n;
  return (
    e[0] === `#` &&
      (t === 4 || t === 5
        ? (n = {
            r: 255 & (h[e[1]] * 17),
            g: 255 & (h[e[2]] * 17),
            b: 255 & (h[e[3]] * 17),
            a: t === 5 ? h[e[4]] * 17 : 255,
          })
        : (t === 7 || t === 9) &&
          (n = {
            r: (h[e[1]] << 4) | h[e[2]],
            g: (h[e[3]] << 4) | h[e[4]],
            b: (h[e[5]] << 4) | h[e[6]],
            a: t === 9 ? (h[e[7]] << 4) | h[e[8]] : 255,
          })),
    n
  );
}
var S = (e, t) => (e < 255 ? t(e) : ``);
function C(e) {
  var t = b(e) ? _ : v;
  return e ? `#` + t(e.r) + t(e.g) + t(e.b) + S(e.a, t) : void 0;
}
var w =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function T(e, t, n) {
  const r = t * Math.min(n, 1 - n),
    i = (t, i = (t + e / 30) % 12) => n - r * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [i(0), i(8), i(4)];
}
function E(e, t, n) {
  const r = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [r(5), r(3), r(1)];
}
function D(e, t, n) {
  let r = T(e, 1, 0.5),
    i;
  for (t + n > 1 && ((i = 1 / (t + n)), (t *= i), (n *= i)), i = 0; i < 3; i++)
    (r[i] *= 1 - t - n), (r[i] += t);
  return r;
}
function O(e, t, n, r, i) {
  return e === i ? (t - n) / r + (t < n ? 6 : 0) : t === i ? (n - e) / r + 2 : (e - t) / r + 4;
}
function k(e) {
  let t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    i = Math.max(t, n, r),
    a = Math.min(t, n, r),
    o = (i + a) / 2,
    s,
    c,
    l;
  return (
    i !== a &&
      ((l = i - a),
      (c = o > 0.5 ? l / (2 - i - a) : l / (i + a)),
      (s = O(t, n, r, l, i)),
      (s = s * 60 + 0.5)),
    [s | 0, c || 0, o]
  );
}
function ee(e, t, n, r) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, r)).map(f);
}
function te(e, t, n) {
  return ee(T, e, t, n);
}
function A(e, t, n) {
  return ee(D, e, t, n);
}
function j(e, t, n) {
  return ee(E, e, t, n);
}
function ne(e) {
  return ((e % 360) + 360) % 360;
}
function re(e) {
  let t = w.exec(e),
    n = 255,
    r;
  if (!t) return;
  t[5] !== r && (n = t[6] ? d(+t[5]) : f(+t[5]));
  const i = ne(+t[2]),
    a = t[3] / 100,
    o = t[4] / 100;
  return (
    (r = t[1] === `hwb` ? A(i, a, o) : t[1] === `hsv` ? j(i, a, o) : te(i, a, o)),
    { r: r[0], g: r[1], b: r[2], a: n }
  );
}
function ie(e, t) {
  var n = k(e);
  (n[0] = ne(n[0] + t)), (n = te(n)), (e.r = n[0]), (e.g = n[1]), (e.b = n[2]);
}
function ae(e) {
  if (!e) return;
  const t = k(e),
    n = t[0],
    r = m(t[1]),
    i = m(t[2]);
  return e.a < 255 ? `hsla(${n}, ${r}%, ${i}%, ${p(e.a)})` : `hsl(${n}, ${r}%, ${i}%)`;
}
var oe = {
    x: `dark`,
    Z: `light`,
    Y: `re`,
    X: `blu`,
    W: `gr`,
    V: `medium`,
    U: `slate`,
    A: `ee`,
    T: `ol`,
    S: `or`,
    B: `ra`,
    C: `lateg`,
    D: `ights`,
    R: `in`,
    Q: `turquois`,
    E: `hi`,
    P: `ro`,
    O: `al`,
    N: `le`,
    M: `de`,
    L: `yello`,
    F: `en`,
    K: `ch`,
    G: `arks`,
    H: `ea`,
    I: `ightg`,
    J: `wh`,
  },
  se = {
    OiceXe: `f0f8ff`,
    antiquewEte: `faebd7`,
    aqua: `ffff`,
    aquamarRe: `7fffd4`,
    azuY: `f0ffff`,
    beige: `f5f5dc`,
    bisque: `ffe4c4`,
    black: `0`,
    blanKedOmond: `ffebcd`,
    Xe: `ff`,
    XeviTet: `8a2be2`,
    bPwn: `a52a2a`,
    burlywood: `deb887`,
    caMtXe: `5f9ea0`,
    KartYuse: `7fff00`,
    KocTate: `d2691e`,
    cSO: `ff7f50`,
    cSnflowerXe: `6495ed`,
    cSnsilk: `fff8dc`,
    crimson: `dc143c`,
    cyan: `ffff`,
    xXe: `8b`,
    xcyan: `8b8b`,
    xgTMnPd: `b8860b`,
    xWay: `a9a9a9`,
    xgYF: `6400`,
    xgYy: `a9a9a9`,
    xkhaki: `bdb76b`,
    xmagFta: `8b008b`,
    xTivegYF: `556b2f`,
    xSange: `ff8c00`,
    xScEd: `9932cc`,
    xYd: `8b0000`,
    xsOmon: `e9967a`,
    xsHgYF: `8fbc8f`,
    xUXe: `483d8b`,
    xUWay: `2f4f4f`,
    xUgYy: `2f4f4f`,
    xQe: `ced1`,
    xviTet: `9400d3`,
    dAppRk: `ff1493`,
    dApskyXe: `bfff`,
    dimWay: `696969`,
    dimgYy: `696969`,
    dodgerXe: `1e90ff`,
    fiYbrick: `b22222`,
    flSOwEte: `fffaf0`,
    foYstWAn: `228b22`,
    fuKsia: `ff00ff`,
    gaRsbSo: `dcdcdc`,
    ghostwEte: `f8f8ff`,
    gTd: `ffd700`,
    gTMnPd: `daa520`,
    Way: `808080`,
    gYF: `8000`,
    gYFLw: `adff2f`,
    gYy: `808080`,
    honeyMw: `f0fff0`,
    hotpRk: `ff69b4`,
    RdianYd: `cd5c5c`,
    Rdigo: `4b0082`,
    ivSy: `fffff0`,
    khaki: `f0e68c`,
    lavFMr: `e6e6fa`,
    lavFMrXsh: `fff0f5`,
    lawngYF: `7cfc00`,
    NmoncEffon: `fffacd`,
    ZXe: `add8e6`,
    ZcSO: `f08080`,
    Zcyan: `e0ffff`,
    ZgTMnPdLw: `fafad2`,
    ZWay: `d3d3d3`,
    ZgYF: `90ee90`,
    ZgYy: `d3d3d3`,
    ZpRk: `ffb6c1`,
    ZsOmon: `ffa07a`,
    ZsHgYF: `20b2aa`,
    ZskyXe: `87cefa`,
    ZUWay: `778899`,
    ZUgYy: `778899`,
    ZstAlXe: `b0c4de`,
    ZLw: `ffffe0`,
    lime: `ff00`,
    limegYF: `32cd32`,
    lRF: `faf0e6`,
    magFta: `ff00ff`,
    maPon: `800000`,
    VaquamarRe: `66cdaa`,
    VXe: `cd`,
    VScEd: `ba55d3`,
    VpurpN: `9370db`,
    VsHgYF: `3cb371`,
    VUXe: `7b68ee`,
    VsprRggYF: `fa9a`,
    VQe: `48d1cc`,
    VviTetYd: `c71585`,
    midnightXe: `191970`,
    mRtcYam: `f5fffa`,
    mistyPse: `ffe4e1`,
    moccasR: `ffe4b5`,
    navajowEte: `ffdead`,
    navy: `80`,
    Tdlace: `fdf5e6`,
    Tive: `808000`,
    TivedBb: `6b8e23`,
    Sange: `ffa500`,
    SangeYd: `ff4500`,
    ScEd: `da70d6`,
    pOegTMnPd: `eee8aa`,
    pOegYF: `98fb98`,
    pOeQe: `afeeee`,
    pOeviTetYd: `db7093`,
    papayawEp: `ffefd5`,
    pHKpuff: `ffdab9`,
    peru: `cd853f`,
    pRk: `ffc0cb`,
    plum: `dda0dd`,
    powMrXe: `b0e0e6`,
    purpN: `800080`,
    YbeccapurpN: `663399`,
    Yd: `ff0000`,
    Psybrown: `bc8f8f`,
    PyOXe: `4169e1`,
    saddNbPwn: `8b4513`,
    sOmon: `fa8072`,
    sandybPwn: `f4a460`,
    sHgYF: `2e8b57`,
    sHshell: `fff5ee`,
    siFna: `a0522d`,
    silver: `c0c0c0`,
    skyXe: `87ceeb`,
    UXe: `6a5acd`,
    UWay: `708090`,
    UgYy: `708090`,
    snow: `fffafa`,
    sprRggYF: `ff7f`,
    stAlXe: `4682b4`,
    tan: `d2b48c`,
    teO: `8080`,
    tEstN: `d8bfd8`,
    tomato: `ff6347`,
    Qe: `40e0d0`,
    viTet: `ee82ee`,
    JHt: `f5deb3`,
    wEte: `ffffff`,
    wEtesmoke: `f5f5f5`,
    Lw: `ffff00`,
    LwgYF: `9acd32`,
  };
function ce() {
  let e = {},
    t = Object.keys(se),
    n = Object.keys(oe),
    r,
    i,
    a,
    o,
    s;
  for (r = 0; r < t.length; r++) {
    for (o = s = t[r], i = 0; i < n.length; i++) (a = n[i]), (s = s.replace(a, oe[a]));
    (a = parseInt(se[o], 16)), (e[s] = [(a >> 16) & 255, (a >> 8) & 255, a & 255]);
  }
  return e;
}
var le;
function ue(e) {
  le || ((le = ce()), (le.transparent = [0, 0, 0, 0]));
  const t = le[e.toLowerCase()];
  return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 };
}
var de =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function fe(e) {
  let t = de.exec(e),
    n = 255,
    r,
    i,
    a;
  if (t) {
    if (t[7] !== r) {
      const e = +t[7];
      n = t[8] ? d(e) : u(e * 255, 0, 255);
    }
    return (
      (r = +t[1]),
      (i = +t[3]),
      (a = +t[5]),
      (r = 255 & (t[2] ? d(r) : u(r, 0, 255))),
      (i = 255 & (t[4] ? d(i) : u(i, 0, 255))),
      (a = 255 & (t[6] ? d(a) : u(a, 0, 255))),
      { r, g: i, b: a, a: n }
    );
  }
}
function pe(e) {
  return (
    e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${p(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`)
  );
}
var me = (e) => (e <= 0.0031308 ? e * 12.92 : e ** (1 / 2.4) * 1.055 - 0.055),
  he = (e) => (e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4);
function ge(e, t, n) {
  const r = he(p(e.r)),
    i = he(p(e.g)),
    a = he(p(e.b));
  return {
    r: f(me(r + n * (he(p(t.r)) - r))),
    g: f(me(i + n * (he(p(t.g)) - i))),
    b: f(me(a + n * (he(p(t.b)) - a))),
    a: e.a + n * (t.a - e.a),
  };
}
function _e(e, t, n) {
  if (e) {
    let r = k(e);
    (r[t] = Math.max(0, Math.min(r[t] + r[t] * n, t === 0 ? 360 : 1))),
      (r = te(r)),
      (e.r = r[0]),
      (e.g = r[1]),
      (e.b = r[2]);
  }
}
function ve(e, t) {
  return e && Object.assign(t || {}, e);
}
function ye(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return (
    Array.isArray(e)
      ? e.length >= 3 &&
        ((t = { r: e[0], g: e[1], b: e[2], a: 255 }), e.length > 3 && (t.a = f(e[3])))
      : ((t = ve(e, { r: 0, g: 0, b: 0, a: 1 })), (t.a = f(t.a))),
    t
  );
}
function be(e) {
  return e.charAt(0) === `r` ? fe(e) : re(e);
}
var xe = class e {
  constructor(t) {
    if (t instanceof e) return t;
    let n = typeof t,
      r;
    n === `object` ? (r = ye(t)) : n === `string` && (r = x(t) || ue(t) || be(t)),
      (this._rgb = r),
      (this._valid = !!r);
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = ve(this._rgb);
    return e && (e.a = p(e.a)), e;
  }
  set rgb(e) {
    this._rgb = ye(e);
  }
  rgbString() {
    return this._valid ? pe(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? C(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? ae(this._rgb) : void 0;
  }
  mix(e, t) {
    if (e) {
      let n = this.rgb,
        r = e.rgb,
        i,
        a = t === i ? 0.5 : t,
        o = 2 * a - 1,
        s = n.a - r.a,
        c = ((o * s === -1 ? o : (o + s) / (1 + o * s)) + 1) / 2;
      (i = 1 - c),
        (n.r = 255 & (c * n.r + i * r.r + 0.5)),
        (n.g = 255 & (c * n.g + i * r.g + 0.5)),
        (n.b = 255 & (c * n.b + i * r.b + 0.5)),
        (n.a = a * n.a + (1 - a) * r.a),
        (this.rgb = n);
    }
    return this;
  }
  interpolate(e, t) {
    return e && (this._rgb = ge(this._rgb, e._rgb, t)), this;
  }
  clone() {
    return new e(this.rgb);
  }
  alpha(e) {
    return (this._rgb.a = f(e)), this;
  }
  clearer(e) {
    const t = this._rgb;
    return (t.a *= 1 - e), this;
  }
  greyscale() {
    const e = this._rgb;
    return (e.r = e.g = e.b = l(e.r * 0.3 + e.g * 0.59 + e.b * 0.11)), this;
  }
  opaquer(e) {
    const t = this._rgb;
    return (t.a *= 1 + e), this;
  }
  negate() {
    const e = this._rgb;
    return (e.r = 255 - e.r), (e.g = 255 - e.g), (e.b = 255 - e.b), this;
  }
  lighten(e) {
    return _e(this._rgb, 2, e), this;
  }
  darken(e) {
    return _e(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return _e(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return _e(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return ie(this._rgb, e), this;
  }
};
function Se() {}
var Ce = (() => {
  let e = 0;
  return () => e++;
})();
function M(e) {
  return e == null;
}
function N(e) {
  if (Array.isArray && Array.isArray(e)) return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === `[object` && t.slice(-6) === `Array]`;
}
function P(e) {
  return e !== null && Object.prototype.toString.call(e) === `[object Object]`;
}
function we(e) {
  return (typeof e == `number` || e instanceof Number) && isFinite(+e);
}
function Te(e, t) {
  return we(e) ? e : t;
}
function F(e, t) {
  return e === void 0 ? t : e;
}
var Ee = (e, t) => (typeof e == `string` && e.endsWith(`%`) ? parseFloat(e) / 100 : +e / t),
  De = (e, t) => (typeof e == `string` && e.endsWith(`%`) ? (parseFloat(e) / 100) * t : +e);
function I(e, t, n) {
  if (e && typeof e.call == `function`) return e.apply(n, t);
}
function L(e, t, n, r) {
  let i, a, o;
  if (N(e))
    if (((a = e.length), r)) for (i = a - 1; i >= 0; i--) t.call(n, e[i], i);
    else for (i = 0; i < a; i++) t.call(n, e[i], i);
  else if (P(e)) for (o = Object.keys(e), a = o.length, i = 0; i < a; i++) t.call(n, e[o[i]], o[i]);
}
function Oe(e, t) {
  let n, r, i, a;
  if (!e || !t || e.length !== t.length) return !1;
  for (n = 0, r = e.length; n < r; ++n)
    if (((i = e[n]), (a = t[n]), i.datasetIndex !== a.datasetIndex || i.index !== a.index))
      return !1;
  return !0;
}
function ke(e) {
  if (N(e)) return e.map(ke);
  if (P(e)) {
    let t = Object.create(null),
      n = Object.keys(e),
      r = n.length,
      i = 0;
    for (; i < r; ++i) t[n[i]] = ke(e[n[i]]);
    return t;
  }
  return e;
}
function Ae(e) {
  return [`__proto__`, `prototype`, `constructor`].indexOf(e) === -1;
}
function je(e, t, n, r) {
  if (!Ae(e)) return;
  const i = t[e],
    a = n[e];
  P(i) && P(a) ? Me(i, a, r) : (t[e] = ke(a));
}
function Me(e, t, n) {
  const r = N(t) ? t : [t],
    i = r.length;
  if (!P(e)) return e;
  n ||= {};
  let a = n.merger || je,
    o;
  for (let t = 0; t < i; ++t) {
    if (((o = r[t]), !P(o))) continue;
    const i = Object.keys(o);
    for (let t = 0, r = i.length; t < r; ++t) a(i[t], e, o, n);
  }
  return e;
}
function Ne(e, t) {
  return Me(e, t, { merger: Pe });
}
function Pe(e, t, n) {
  if (!Ae(e)) return;
  const r = t[e],
    i = n[e];
  P(r) && P(i) ? Ne(r, i) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ke(i));
}
var Fe = { '': (e) => e, x: (e) => e.x, y: (e) => e.y };
function Ie(e) {
  let t = e.split(`.`),
    n = [],
    r = ``;
  for (const e of t)
    (r += e), r.endsWith(`\\`) ? (r = r.slice(0, -1) + `.`) : (n.push(r), (r = ``));
  return n;
}
function Le(e) {
  const t = Ie(e);
  return (e) => {
    for (const n of t) {
      if (n === ``) break;
      e &&= e[n];
    }
    return e;
  };
}
function Re(e, t) {
  return (Fe[t] || (Fe[t] = Le(t)))(e);
}
function ze(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var Be = (e) => e !== void 0,
  Ve = (e) => typeof e == `function`,
  He = (e, t) => {
    if (e.size !== t.size) return !1;
    for (const n of e) if (!t.has(n)) return !1;
    return !0;
  };
function Ue(e) {
  return e.type === `mouseup` || e.type === `click` || e.type === `contextmenu`;
}
var R = Math.PI,
  We = 2 * R,
  Ge = We + R,
  Ke = 1 / 0,
  qe = R / 180,
  Je = R / 2,
  Ye = R / 4,
  Xe = (R * 2) / 3,
  Ze = Math.log10,
  Qe = Math.sign;
function $e(e, t, n) {
  return Math.abs(e - t) < n;
}
function et(e) {
  const t = Math.round(e);
  e = $e(e, t, e / 1e3) ? t : e;
  const n = 10 ** Math.floor(Ze(e)),
    r = e / n;
  return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * n;
}
function tt(e) {
  let t = [],
    n = Math.sqrt(e),
    r;
  for (r = 1; r < n; r++) e % r === 0 && (t.push(r), t.push(e / r));
  return n === (n | 0) && t.push(n), t.sort((e, t) => e - t).pop(), t;
}
function nt(e) {
  return (
    typeof e == `symbol` ||
    (typeof e == `object` && !!e && !(Symbol.toPrimitive in e || `toString` in e || `valueOf` in e))
  );
}
function rt(e) {
  return !nt(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function it(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function at(e, t, n) {
  let r, i, a;
  for (r = 0, i = e.length; r < i; r++)
    (a = e[r][n]), isNaN(a) || ((t.min = Math.min(t.min, a)), (t.max = Math.max(t.max, a)));
}
function ot(e) {
  return (R / 180) * e;
}
function st(e) {
  return (180 / R) * e;
}
function ct(e) {
  if (!we(e)) return;
  let t = 1,
    n = 0;
  for (; Math.round(e * t) / t !== e; ) (t *= 10), n++;
  return n;
}
function lt(e, t) {
  let n = t.x - e.x,
    r = t.y - e.y,
    i = Math.sqrt(n * n + r * r),
    a = Math.atan2(r, n);
  return a < -0.5 * R && (a += We), { angle: a, distance: i };
}
function ut(e, t) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function dt(e, t) {
  return ((e - t + Ge) % We) - R;
}
function ft(e) {
  return ((e % We) + We) % We;
}
function pt(e, t, n, r) {
  const i = ft(e),
    a = ft(t),
    o = ft(n),
    s = ft(a - i),
    c = ft(o - i),
    l = ft(i - a),
    u = ft(i - o);
  return i === a || i === o || (r && a === o) || (s > c && l < u);
}
function mt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function ht(e) {
  return mt(e, -32768, 32767);
}
function gt(e, t, n, r = 1e-6) {
  return e >= Math.min(t, n) - r && e <= Math.max(t, n) + r;
}
function _t(e, t, n) {
  n ||= (n) => e[n] < t;
  let r = e.length - 1,
    i = 0,
    a;
  for (; r - i > 1; ) (a = (i + r) >> 1), n(a) ? (i = a) : (r = a);
  return { lo: i, hi: r };
}
var vt = (e, t, n, r) =>
    _t(
      e,
      n,
      r
        ? (r) => {
            const i = e[r][t];
            return i < n || (i === n && e[r + 1][t] === n);
          }
        : (r) => e[r][t] < n,
    ),
  yt = (e, t, n) => _t(e, n, (r) => e[r][t] >= n);
function bt(e, t, n) {
  let r = 0,
    i = e.length;
  for (; r < i && e[r] < t; ) r++;
  for (; i > r && e[i - 1] > n; ) i--;
  return r > 0 || i < e.length ? e.slice(r, i) : e;
}
var xt = [`push`, `pop`, `shift`, `splice`, `unshift`];
function St(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, `_chartjs`, {
    configurable: !0,
    enumerable: !1,
    value: { listeners: [t] },
  }),
    xt.forEach((t) => {
      const n = `_onData` + ze(t),
        r = e[t];
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value(...t) {
          const i = r.apply(this, t);
          return (
            e._chartjs.listeners.forEach((e) => {
              typeof e[n] == `function` && e[n](...t);
            }),
            i
          );
        },
      });
    });
}
function Ct(e, t) {
  const n = e._chartjs;
  if (!n) return;
  const r = n.listeners,
    i = r.indexOf(t);
  i !== -1 && r.splice(i, 1),
    !(r.length > 0) &&
      (xt.forEach((t) => {
        delete e[t];
      }),
      delete e._chartjs);
}
function wt(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
var Tt = (function () {
  return typeof window > `u`
    ? function (e) {
        return e();
      }
    : window.requestAnimationFrame;
})();
function Et(e, t) {
  let n = [],
    r = !1;
  return function (...i) {
    (n = i),
      r ||
        ((r = !0),
        Tt.call(window, () => {
          (r = !1), e.apply(t, n);
        }));
  };
}
function Dt(e, t) {
  let n;
  return function (...r) {
    return t ? (clearTimeout(n), (n = setTimeout(e, t, r))) : e.apply(this, r), t;
  };
}
var Ot = (e) => (e === `start` ? `left` : e === `end` ? `right` : `center`),
  kt = (e, t, n) => (e === `start` ? t : e === `end` ? n : (t + n) / 2);
function At(e, t, n) {
  let r = t.length,
    i = 0,
    a = r;
  if (e._sorted) {
    const { iScale: o, vScale: s, _parsed: c } = e,
      l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null,
      u = o.axis,
      { min: d, max: f, minDefined: p, maxDefined: m } = o.getUserBounds();
    if (p) {
      if (((i = Math.min(vt(c, u, d).lo, n ? r : vt(t, u, o.getPixelForValue(d)).lo)), l)) {
        const e = c
          .slice(0, i + 1)
          .reverse()
          .findIndex((e) => !M(e[s.axis]));
        i -= Math.max(0, e);
      }
      i = mt(i, 0, r - 1);
    }
    if (m) {
      let e = Math.max(
        vt(c, o.axis, f, !0).hi + 1,
        n ? 0 : vt(t, u, o.getPixelForValue(f), !0).hi + 1,
      );
      if (l) {
        const t = c.slice(e - 1).findIndex((e) => !M(e[s.axis]));
        e += Math.max(0, t);
      }
      a = mt(e, i, r) - i;
    } else a = r - i;
  }
  return { start: i, count: a };
}
function jt(e) {
  const { xScale: t, yScale: n, _scaleRanges: r } = e,
    i = { xmin: t.min, xmax: t.max, ymin: n.min, ymax: n.max };
  if (!r) return (e._scaleRanges = i), !0;
  const a = r.xmin !== t.min || r.xmax !== t.max || r.ymin !== n.min || r.ymax !== n.max;
  return Object.assign(r, i), a;
}
var Mt = (e) => e === 0 || e === 1,
  Nt = (e, t, n) => -(2 ** (10 * --e) * Math.sin(((e - t) * We) / n)),
  Pt = (e, t, n) => 2 ** (-10 * e) * Math.sin(((e - t) * We) / n) + 1,
  Ft = {
    linear: (e) => e,
    easeInQuad: (e) => e * e,
    easeOutQuad: (e) => -e * (e - 2),
    easeInOutQuad: (e) => ((e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1)),
    easeInCubic: (e) => e * e * e,
    easeOutCubic: (e) => --e * e * e + 1,
    easeInOutCubic: (e) => ((e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2)),
    easeInQuart: (e) => e * e * e * e,
    easeOutQuart: (e) => -(--e * e * e * e - 1),
    easeInOutQuart: (e) =>
      (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
    easeInQuint: (e) => e * e * e * e * e,
    easeOutQuint: (e) => --e * e * e * e * e + 1,
    easeInOutQuint: (e) =>
      (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
    easeInSine: (e) => -Math.cos(e * Je) + 1,
    easeOutSine: (e) => Math.sin(e * Je),
    easeInOutSine: (e) => -0.5 * (Math.cos(R * e) - 1),
    easeInExpo: (e) => (e === 0 ? 0 : 2 ** (10 * (e - 1))),
    easeOutExpo: (e) => (e === 1 ? 1 : -(2 ** (-10 * e)) + 1),
    easeInOutExpo: (e) =>
      Mt(e) ? e : e < 0.5 ? 0.5 * 2 ** (10 * (e * 2 - 1)) : 0.5 * (-(2 ** (-10 * (e * 2 - 1))) + 2),
    easeInCirc: (e) => (e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1)),
    easeOutCirc: (e) => Math.sqrt(1 - --e * e),
    easeInOutCirc: (e) =>
      (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
    easeInElastic: (e) => (Mt(e) ? e : Nt(e, 0.075, 0.3)),
    easeOutElastic: (e) => (Mt(e) ? e : Pt(e, 0.075, 0.3)),
    easeInOutElastic(e) {
      const t = 0.1125,
        n = 0.45;
      return Mt(e) ? e : e < 0.5 ? 0.5 * Nt(e * 2, t, n) : 0.5 + 0.5 * Pt(e * 2 - 1, t, n);
    },
    easeInBack(e) {
      const t = 1.70158;
      return e * e * ((t + 1) * e - t);
    },
    easeOutBack(e) {
      const t = 1.70158;
      return --e * e * ((t + 1) * e + t) + 1;
    },
    easeInOutBack(e) {
      let t = 1.70158;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    },
    easeInBounce: (e) => 1 - Ft.easeOutBounce(1 - e),
    easeOutBounce(e) {
      const t = 7.5625,
        n = 2.75;
      return e < 1 / n
        ? t * e * e
        : e < 2 / n
          ? t * (e -= 1.5 / n) * e + 0.75
          : e < 2.5 / n
            ? t * (e -= 2.25 / n) * e + 0.9375
            : t * (e -= 2.625 / n) * e + 0.984375;
    },
    easeInOutBounce: (e) =>
      e < 0.5 ? Ft.easeInBounce(e * 2) * 0.5 : Ft.easeOutBounce(e * 2 - 1) * 0.5 + 0.5,
  };
function It(e) {
  if (e && typeof e == `object`) {
    const t = e.toString();
    return t === `[object CanvasPattern]` || t === `[object CanvasGradient]`;
  }
  return !1;
}
function Lt(e) {
  return It(e) ? e : new xe(e);
}
function Rt(e) {
  return It(e) ? e : new xe(e).saturate(0.5).darken(0.1).hexString();
}
var zt = [`x`, `y`, `borderWidth`, `radius`, `tension`],
  Bt = [`color`, `borderColor`, `backgroundColor`];
function Vt(e) {
  e.set(`animation`, {
    delay: void 0,
    duration: 1e3,
    easing: `easeOutQuart`,
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0,
  }),
    e.describe(`animation`, {
      _fallback: !1,
      _indexable: !1,
      _scriptable: (e) => e !== `onProgress` && e !== `onComplete` && e !== `fn`,
    }),
    e.set(`animations`, {
      colors: { type: `color`, properties: Bt },
      numbers: { type: `number`, properties: zt },
    }),
    e.describe(`animations`, { _fallback: `animation` }),
    e.set(`transitions`, {
      active: { animation: { duration: 400 } },
      resize: { animation: { duration: 0 } },
      show: {
        animations: { colors: { from: `transparent` }, visible: { type: `boolean`, duration: 0 } },
      },
      hide: {
        animations: {
          colors: { to: `transparent` },
          visible: { type: `boolean`, easing: `linear`, fn: (e) => e | 0 },
        },
      },
    });
}
function Ht(e) {
  e.set(`layout`, { autoPadding: !0, padding: { top: 0, right: 0, bottom: 0, left: 0 } });
}
var Ut = new Map();
function Wt(e, t) {
  t ||= {};
  let n = e + JSON.stringify(t),
    r = Ut.get(n);
  return r || ((r = new Intl.NumberFormat(e, t)), Ut.set(n, r)), r;
}
function Gt(e, t, n) {
  return Wt(t, n).format(e);
}
var Kt = {
  values(e) {
    return N(e) ? e : `` + e;
  },
  numeric(e, t, n) {
    if (e === 0) return `0`;
    let r = this.chart.options.locale,
      i,
      a = e;
    if (n.length > 1) {
      const t = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (t < 1e-4 || t > 0x38d7ea4c68000) && (i = `scientific`), (a = qt(e, n));
    }
    const o = Ze(Math.abs(a)),
      s = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0),
      c = { notation: i, minimumFractionDigits: s, maximumFractionDigits: s };
    return Object.assign(c, this.options.ticks.format), Gt(e, r, c);
  },
  logarithmic(e, t, n) {
    if (e === 0) return `0`;
    const r = n[t].significand || e / 10 ** Math.floor(Ze(e));
    return [1, 2, 3, 5, 10, 15].includes(r) || t > 0.8 * n.length
      ? Kt.numeric.call(this, e, t, n)
      : ``;
  },
};
function qt(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Jt = { formatters: Kt };
function Yt(e) {
  e.set(`scale`, {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: `ticks`,
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (e, t) => t.lineWidth,
      tickColor: (e, t) => t.color,
      offset: !1,
    },
    border: { display: !0, dash: [], dashOffset: 0, width: 1 },
    title: { display: !1, text: ``, padding: { top: 4, bottom: 4 } },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: ``,
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Jt.formatters.values,
      minor: {},
      major: {},
      align: `center`,
      crossAlign: `near`,
      showLabelBackdrop: !1,
      backdropColor: `rgba(255, 255, 255, 0.75)`,
      backdropPadding: 2,
    },
  }),
    e.route(`scale.ticks`, `color`, ``, `color`),
    e.route(`scale.grid`, `color`, ``, `borderColor`),
    e.route(`scale.border`, `color`, ``, `borderColor`),
    e.route(`scale.title`, `color`, ``, `color`),
    e.describe(`scale`, {
      _fallback: !1,
      _scriptable: (e) =>
        !e.startsWith(`before`) && !e.startsWith(`after`) && e !== `callback` && e !== `parser`,
      _indexable: (e) => e !== `borderDash` && e !== `tickBorderDash` && e !== `dash`,
    }),
    e.describe(`scales`, { _fallback: `scale` }),
    e.describe(`scale.ticks`, {
      _scriptable: (e) => e !== `backdropPadding` && e !== `callback`,
      _indexable: (e) => e !== `backdropPadding`,
    });
}
var Xt = Object.create(null),
  Zt = Object.create(null);
function Qt(e, t) {
  if (!t) return e;
  const n = t.split(`.`);
  for (let t = 0, r = n.length; t < r; ++t) {
    const r = n[t];
    e = e[r] || (e[r] = Object.create(null));
  }
  return e;
}
function $t(e, t, n) {
  return typeof t == `string` ? Me(Qt(e, t), n) : Me(Qt(e, ``), t);
}
var z = new (class {
  constructor(e, t) {
    (this.animation = void 0),
      (this.backgroundColor = `rgba(0,0,0,0.1)`),
      (this.borderColor = `rgba(0,0,0,0.1)`),
      (this.color = `#666`),
      (this.datasets = {}),
      (this.devicePixelRatio = (e) => e.chart.platform.getDevicePixelRatio()),
      (this.elements = {}),
      (this.events = [`mousemove`, `mouseout`, `click`, `touchstart`, `touchmove`]),
      (this.font = {
        family: `'Helvetica Neue', 'Helvetica', 'Arial', sans-serif`,
        size: 12,
        style: `normal`,
        lineHeight: 1.2,
        weight: null,
      }),
      (this.hover = {}),
      (this.hoverBackgroundColor = (e, t) => Rt(t.backgroundColor)),
      (this.hoverBorderColor = (e, t) => Rt(t.borderColor)),
      (this.hoverColor = (e, t) => Rt(t.color)),
      (this.indexAxis = `x`),
      (this.interaction = { mode: `nearest`, intersect: !0, includeInvisible: !1 }),
      (this.maintainAspectRatio = !0),
      (this.onHover = null),
      (this.onClick = null),
      (this.parsing = !0),
      (this.plugins = {}),
      (this.responsive = !0),
      (this.scale = void 0),
      (this.scales = {}),
      (this.showLine = !0),
      (this.drawActiveElementsOnTop = !0),
      this.describe(e),
      this.apply(t);
  }
  set(e, t) {
    return $t(this, e, t);
  }
  get(e) {
    return Qt(this, e);
  }
  describe(e, t) {
    return $t(Zt, e, t);
  }
  override(e, t) {
    return $t(Xt, e, t);
  }
  route(e, t, n, r) {
    const i = Qt(this, e),
      a = Qt(this, n),
      o = `_` + t;
    Object.defineProperties(i, {
      [o]: { value: i[t], writable: !0 },
      [t]: {
        enumerable: !0,
        get() {
          const e = this[o],
            t = a[r];
          return P(e) ? Object.assign({}, t, e) : F(e, t);
        },
        set(e) {
          this[o] = e;
        },
      },
    });
  }
  apply(e) {
    e.forEach((e) => e(this));
  }
})(
  {
    _scriptable: (e) => !e.startsWith(`on`),
    _indexable: (e) => e !== `events`,
    hover: { _fallback: `interaction` },
    interaction: { _scriptable: !1, _indexable: !1 },
  },
  [Vt, Ht, Yt],
);
function en(e) {
  return !e || M(e.size) || M(e.family)
    ? null
    : (e.style ? e.style + ` ` : ``) + (e.weight ? e.weight + ` ` : ``) + e.size + `px ` + e.family;
}
function tn(e, t, n, r, i) {
  let a = t[i];
  return a || ((a = t[i] = e.measureText(i).width), n.push(i)), a > r && (r = a), r;
}
function nn(e, t, n, r) {
  r ||= {};
  let i = (r.data = r.data || {}),
    a = (r.garbageCollect = r.garbageCollect || []);
  r.font !== t && ((i = r.data = {}), (a = r.garbageCollect = []), (r.font = t)),
    e.save(),
    (e.font = t);
  let o = 0,
    s = n.length,
    c,
    l,
    u,
    d,
    f;
  for (c = 0; c < s; c++)
    if (((d = n[c]), d != null && !N(d))) o = tn(e, i, a, o, d);
    else if (N(d))
      for (l = 0, u = d.length; l < u; l++)
        (f = d[l]), f != null && !N(f) && (o = tn(e, i, a, o, f));
  e.restore();
  const p = a.length / 2;
  if (p > n.length) {
    for (c = 0; c < p; c++) delete i[a[c]];
    a.splice(0, p);
  }
  return o;
}
function rn(e, t, n) {
  const r = e.currentDevicePixelRatio,
    i = n === 0 ? 0 : Math.max(n / 2, 0.5);
  return Math.round((t - i) * r) / r + i;
}
function an(e, t) {
  (!t && !e) ||
    ((t ||= e.getContext(`2d`)),
    t.save(),
    t.resetTransform(),
    t.clearRect(0, 0, e.width, e.height),
    t.restore());
}
function on(e, t, n, r) {
  sn(e, t, n, r, null);
}
function sn(e, t, n, r, i) {
  let a,
    o,
    s,
    c,
    l,
    u,
    d,
    f,
    p = t.pointStyle,
    m = t.rotation,
    h = t.radius,
    g = (m || 0) * qe;
  if (
    p &&
    typeof p == `object` &&
    ((a = p.toString()), a === `[object HTMLImageElement]` || a === `[object HTMLCanvasElement]`)
  ) {
    e.save(),
      e.translate(n, r),
      e.rotate(g),
      e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height),
      e.restore();
    return;
  }
  if (!(isNaN(h) || h <= 0)) {
    switch ((e.beginPath(), p)) {
      default:
        i ? e.ellipse(n, r, i / 2, h, 0, 0, We) : e.arc(n, r, h, 0, We), e.closePath();
        break;
      case `triangle`:
        (u = i ? i / 2 : h),
          e.moveTo(n + Math.sin(g) * u, r - Math.cos(g) * h),
          (g += Xe),
          e.lineTo(n + Math.sin(g) * u, r - Math.cos(g) * h),
          (g += Xe),
          e.lineTo(n + Math.sin(g) * u, r - Math.cos(g) * h),
          e.closePath();
        break;
      case `rectRounded`:
        (l = h * 0.516),
          (c = h - l),
          (o = Math.cos(g + Ye) * c),
          (d = Math.cos(g + Ye) * (i ? i / 2 - l : c)),
          (s = Math.sin(g + Ye) * c),
          (f = Math.sin(g + Ye) * (i ? i / 2 - l : c)),
          e.arc(n - d, r - s, l, g - R, g - Je),
          e.arc(n + f, r - o, l, g - Je, g),
          e.arc(n + d, r + s, l, g, g + Je),
          e.arc(n - f, r + o, l, g + Je, g + R),
          e.closePath();
        break;
      case `rect`:
        if (!m) {
          (c = Math.SQRT1_2 * h), (u = i ? i / 2 : c), e.rect(n - u, r - c, 2 * u, 2 * c);
          break;
        }
        g += Ye;
      case `rectRot`:
        (d = Math.cos(g) * (i ? i / 2 : h)),
          (o = Math.cos(g) * h),
          (s = Math.sin(g) * h),
          (f = Math.sin(g) * (i ? i / 2 : h)),
          e.moveTo(n - d, r - s),
          e.lineTo(n + f, r - o),
          e.lineTo(n + d, r + s),
          e.lineTo(n - f, r + o),
          e.closePath();
        break;
      case `crossRot`:
        g += Ye;
      case `cross`:
        (d = Math.cos(g) * (i ? i / 2 : h)),
          (o = Math.cos(g) * h),
          (s = Math.sin(g) * h),
          (f = Math.sin(g) * (i ? i / 2 : h)),
          e.moveTo(n - d, r - s),
          e.lineTo(n + d, r + s),
          e.moveTo(n + f, r - o),
          e.lineTo(n - f, r + o);
        break;
      case `star`:
        (d = Math.cos(g) * (i ? i / 2 : h)),
          (o = Math.cos(g) * h),
          (s = Math.sin(g) * h),
          (f = Math.sin(g) * (i ? i / 2 : h)),
          e.moveTo(n - d, r - s),
          e.lineTo(n + d, r + s),
          e.moveTo(n + f, r - o),
          e.lineTo(n - f, r + o),
          (g += Ye),
          (d = Math.cos(g) * (i ? i / 2 : h)),
          (o = Math.cos(g) * h),
          (s = Math.sin(g) * h),
          (f = Math.sin(g) * (i ? i / 2 : h)),
          e.moveTo(n - d, r - s),
          e.lineTo(n + d, r + s),
          e.moveTo(n + f, r - o),
          e.lineTo(n - f, r + o);
        break;
      case `line`:
        (o = i ? i / 2 : Math.cos(g) * h),
          (s = Math.sin(g) * h),
          e.moveTo(n - o, r - s),
          e.lineTo(n + o, r + s);
        break;
      case `dash`:
        e.moveTo(n, r), e.lineTo(n + Math.cos(g) * (i ? i / 2 : h), r + Math.sin(g) * h);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function cn(e, t, n) {
  return (
    (n ||= 0.5),
    !t || (e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n)
  );
}
function ln(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function un(e) {
  e.restore();
}
function dn(e, t, n, r, i) {
  if (!t) return e.lineTo(n.x, n.y);
  if (i === `middle`) {
    const r = (t.x + n.x) / 2;
    e.lineTo(r, t.y), e.lineTo(r, n.y);
  } else (i === `after`) == !!r ? e.lineTo(n.x, t.y) : e.lineTo(t.x, n.y);
  e.lineTo(n.x, n.y);
}
function fn(e, t, n, r) {
  if (!t) return e.lineTo(n.x, n.y);
  e.bezierCurveTo(
    r ? t.cp1x : t.cp2x,
    r ? t.cp1y : t.cp2y,
    r ? n.cp2x : n.cp1x,
    r ? n.cp2y : n.cp1y,
    n.x,
    n.y,
  );
}
function pn(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]),
    M(t.rotation) || e.rotate(t.rotation),
    t.color && (e.fillStyle = t.color),
    t.textAlign && (e.textAlign = t.textAlign),
    t.textBaseline && (e.textBaseline = t.textBaseline);
}
function mn(e, t, n, r, i) {
  if (i.strikethrough || i.underline) {
    const a = e.measureText(r),
      o = t - a.actualBoundingBoxLeft,
      s = t + a.actualBoundingBoxRight,
      c = n - a.actualBoundingBoxAscent,
      l = n + a.actualBoundingBoxDescent,
      u = i.strikethrough ? (c + l) / 2 : l;
    (e.strokeStyle = e.fillStyle),
      e.beginPath(),
      (e.lineWidth = i.decorationWidth || 2),
      e.moveTo(o, u),
      e.lineTo(s, u),
      e.stroke();
  }
}
function hn(e, t) {
  const n = e.fillStyle;
  (e.fillStyle = t.color), e.fillRect(t.left, t.top, t.width, t.height), (e.fillStyle = n);
}
function gn(e, t, n, r, i, a = {}) {
  let o = N(t) ? t : [t],
    s = a.strokeWidth > 0 && a.strokeColor !== ``,
    c,
    l;
  for (e.save(), e.font = i.string, pn(e, a), c = 0; c < o.length; ++c)
    (l = o[c]),
      a.backdrop && hn(e, a.backdrop),
      s &&
        (a.strokeColor && (e.strokeStyle = a.strokeColor),
        M(a.strokeWidth) || (e.lineWidth = a.strokeWidth),
        e.strokeText(l, n, r, a.maxWidth)),
      e.fillText(l, n, r, a.maxWidth),
      mn(e, n, r, l, a),
      (r += Number(i.lineHeight));
  e.restore();
}
function _n(e, t) {
  const { x: n, y: r, w: i, h: a, radius: o } = t;
  e.arc(n + o.topLeft, r + o.topLeft, o.topLeft, 1.5 * R, R, !0),
    e.lineTo(n, r + a - o.bottomLeft),
    e.arc(n + o.bottomLeft, r + a - o.bottomLeft, o.bottomLeft, R, Je, !0),
    e.lineTo(n + i - o.bottomRight, r + a),
    e.arc(n + i - o.bottomRight, r + a - o.bottomRight, o.bottomRight, Je, 0, !0),
    e.lineTo(n + i, r + o.topRight),
    e.arc(n + i - o.topRight, r + o.topRight, o.topRight, 0, -Je, !0),
    e.lineTo(n + o.topLeft, r);
}
var vn = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
  yn = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function bn(e, t) {
  const n = (`` + e).match(vn);
  if (!n || n[1] === `normal`) return t * 1.2;
  switch (((e = +n[2]), n[3])) {
    case `px`:
      return e;
    case `%`:
      e /= 100;
      break;
  }
  return t * e;
}
var xn = (e) => +e || 0;
function Sn(e, t) {
  const n = {},
    r = P(t),
    i = r ? Object.keys(t) : t,
    a = P(e) ? (r ? (n) => F(e[n], e[t[n]]) : (t) => e[t]) : () => e;
  for (const e of i) n[e] = xn(a(e));
  return n;
}
function Cn(e) {
  return Sn(e, { top: `y`, right: `x`, bottom: `y`, left: `x` });
}
function wn(e) {
  return Sn(e, [`topLeft`, `topRight`, `bottomLeft`, `bottomRight`]);
}
function Tn(e) {
  const t = Cn(e);
  return (t.width = t.left + t.right), (t.height = t.top + t.bottom), t;
}
function En(e, t) {
  (e ||= {}), (t ||= z.font);
  let n = F(e.size, t.size);
  typeof n == `string` && (n = parseInt(n, 10));
  let r = F(e.style, t.style);
  r &&
    !(`` + r).match(yn) &&
    (console.warn(`Invalid font style specified: "` + r + `"`), (r = void 0));
  const i = {
    family: F(e.family, t.family),
    lineHeight: bn(F(e.lineHeight, t.lineHeight), n),
    size: n,
    style: r,
    weight: F(e.weight, t.weight),
    string: ``,
  };
  return (i.string = en(i)), i;
}
function Dn(e, t, n, r) {
  let i = !0,
    a,
    o,
    s;
  for (a = 0, o = e.length; a < o; ++a)
    if (
      ((s = e[a]),
      s !== void 0 &&
        (t !== void 0 && typeof s == `function` && ((s = s(t)), (i = !1)),
        n !== void 0 && N(s) && ((s = s[n % s.length]), (i = !1)),
        s !== void 0))
    )
      return r && !i && (r.cacheable = !1), s;
}
function On(e, t, n) {
  const { min: r, max: i } = e,
    a = De(t, (i - r) / 2),
    o = (e, t) => (n && e === 0 ? 0 : e + t);
  return { min: o(r, -Math.abs(a)), max: o(i, a) };
}
function kn(e, t) {
  return Object.assign(Object.create(e), t);
}
function An(e, t = [``], n, r, i = () => e[0]) {
  const a = n || e;
  return (
    r === void 0 && (r = Kn(`_fallback`, e)),
    new Proxy(
      {
        [Symbol.toStringTag]: `Object`,
        _cacheable: !0,
        _scopes: e,
        _rootScopes: a,
        _fallback: r,
        _getTarget: i,
        override: (n) => An([n, ...e], t, a, r),
      },
      {
        deleteProperty(t, n) {
          return delete t[n], delete t._keys, delete e[0][n], !0;
        },
        get(n, r) {
          return Fn(n, r, () => Gn(r, t, e, n));
        },
        getOwnPropertyDescriptor(e, t) {
          return Reflect.getOwnPropertyDescriptor(e._scopes[0], t);
        },
        getPrototypeOf() {
          return Reflect.getPrototypeOf(e[0]);
        },
        has(e, t) {
          return qn(e).includes(t);
        },
        ownKeys(e) {
          return qn(e);
        },
        set(e, t, n) {
          const r = (e._storage ||= i());
          return (e[t] = r[t] = n), delete e._keys, !0;
        },
      },
    )
  );
}
function jn(e, t, n, r) {
  const i = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: new Set(),
    _descriptors: Mn(e, r),
    setContext: (t) => jn(e, t, n, r),
    override: (i) => jn(e.override(i), t, n, r),
  };
  return new Proxy(i, {
    deleteProperty(t, n) {
      return delete t[n], delete e[n], !0;
    },
    get(e, t, n) {
      return Fn(e, t, () => In(e, t, n));
    },
    getOwnPropertyDescriptor(t, n) {
      return t._descriptors.allKeys
        ? Reflect.has(e, n)
          ? { enumerable: !0, configurable: !0 }
          : void 0
        : Reflect.getOwnPropertyDescriptor(e, n);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    has(t, n) {
      return Reflect.has(e, n);
    },
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    set(t, n, r) {
      return (e[n] = r), delete t[n], !0;
    },
  });
}
function Mn(e, t = { scriptable: !0, indexable: !0 }) {
  const { _scriptable: n = t.scriptable, _indexable: r = t.indexable, _allKeys: i = t.allKeys } = e;
  return {
    allKeys: i,
    scriptable: n,
    indexable: r,
    isScriptable: Ve(n) ? n : () => n,
    isIndexable: Ve(r) ? r : () => r,
  };
}
var Nn = (e, t) => (e ? e + ze(t) : t),
  Pn = (e, t) =>
    P(t) && e !== `adapters` && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Fn(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === `constructor`) return e[t];
  const r = n();
  return (e[t] = r), r;
}
function In(e, t, n) {
  let { _proxy: r, _context: i, _subProxy: a, _descriptors: o } = e,
    s = r[t];
  return (
    Ve(s) && o.isScriptable(t) && (s = Ln(t, s, e, n)),
    N(s) && s.length && (s = Rn(t, s, e, o.isIndexable)),
    Pn(t, s) && (s = jn(s, i, a && a[t], o)),
    s
  );
}
function Ln(e, t, n, r) {
  const { _proxy: i, _context: a, _subProxy: o, _stack: s } = n;
  if (s.has(e)) throw Error(`Recursion detected: ` + Array.from(s).join(`->`) + `->` + e);
  s.add(e);
  let c = t(a, o || r);
  return s.delete(e), Pn(e, c) && (c = Hn(i._scopes, i, e, c)), c;
}
function Rn(e, t, n, r) {
  const { _proxy: i, _context: a, _subProxy: o, _descriptors: s } = n;
  if (a.index !== void 0 && r(e)) return t[a.index % t.length];
  if (P(t[0])) {
    const n = t,
      r = i._scopes.filter((e) => e !== n);
    t = [];
    for (const c of n) {
      const n = Hn(r, i, e, c);
      t.push(jn(n, a, o && o[e], s));
    }
  }
  return t;
}
function zn(e, t, n) {
  return Ve(e) ? e(t, n) : e;
}
var Bn = (e, t) => (e === !0 ? t : typeof e == `string` ? Re(t, e) : void 0);
function Vn(e, t, n, r, i) {
  for (const a of t) {
    const t = Bn(n, a);
    if (t) {
      e.add(t);
      const a = zn(t._fallback, n, i);
      if (a !== void 0 && a !== n && a !== r) return a;
    } else if (t === !1 && r !== void 0 && n !== r) return null;
  }
  return !1;
}
function Hn(e, t, n, r) {
  const i = t._rootScopes,
    a = zn(t._fallback, n, r),
    o = [...e, ...i],
    s = new Set();
  s.add(r);
  let c = Un(s, o, n, a || n, r);
  return c === null || (a !== void 0 && a !== n && ((c = Un(s, o, a, c, r)), c === null))
    ? !1
    : An(Array.from(s), [``], i, a, () => Wn(t, n, r));
}
function Un(e, t, n, r, i) {
  for (; n; ) n = Vn(e, t, n, r, i);
  return n;
}
function Wn(e, t, n) {
  const r = e._getTarget();
  t in r || (r[t] = {});
  const i = r[t];
  return N(i) && P(n) ? n : i || {};
}
function Gn(e, t, n, r) {
  let i;
  for (const a of t)
    if (((i = Kn(Nn(a, e), n)), i !== void 0)) return Pn(e, i) ? Hn(n, r, e, i) : i;
}
function Kn(e, t) {
  for (const n of t) {
    if (!n) continue;
    const t = n[e];
    if (t !== void 0) return t;
  }
}
function qn(e) {
  let t = e._keys;
  return (t ||= e._keys = Jn(e._scopes)), t;
}
function Jn(e) {
  const t = new Set();
  for (const n of e) for (const e of Object.keys(n).filter((e) => !e.startsWith(`_`))) t.add(e);
  return Array.from(t);
}
function Yn(e, t, n, r) {
  let { iScale: i } = e,
    { key: a = `r` } = this._parsing,
    o = Array(r),
    s,
    c,
    l,
    u;
  for (s = 0, c = r; s < c; ++s) (l = s + n), (u = t[l]), (o[s] = { r: i.parse(Re(u, a), l) });
  return o;
}
var Xn = 2 ** -52 || 1e-14,
  Zn = (e, t) => t < e.length && !e[t].skip && e[t],
  Qn = (e) => (e === `x` ? `y` : `x`);
function $n(e, t, n, r) {
  let i = e.skip ? t : e,
    a = t,
    o = n.skip ? t : n,
    s = ut(a, i),
    c = ut(o, a),
    l = s / (s + c),
    u = c / (s + c);
  (l = isNaN(l) ? 0 : l), (u = isNaN(u) ? 0 : u);
  const d = r * l,
    f = r * u;
  return {
    previous: { x: a.x - d * (o.x - i.x), y: a.y - d * (o.y - i.y) },
    next: { x: a.x + f * (o.x - i.x), y: a.y + f * (o.y - i.y) },
  };
}
function er(e, t, n) {
  let r = e.length,
    i,
    a,
    o,
    s,
    c,
    l = Zn(e, 0);
  for (let u = 0; u < r - 1; ++u)
    if (((c = l), (l = Zn(e, u + 1)), !(!c || !l))) {
      if ($e(t[u], 0, Xn)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      (i = n[u] / t[u]),
        (a = n[u + 1] / t[u]),
        (s = i ** 2 + a ** 2),
        !(s <= 9) && ((o = 3 / Math.sqrt(s)), (n[u] = i * o * t[u]), (n[u + 1] = a * o * t[u]));
    }
}
function tr(e, t, n = `x`) {
  let r = Qn(n),
    i = e.length,
    a,
    o,
    s,
    c = Zn(e, 0);
  for (let l = 0; l < i; ++l) {
    if (((o = s), (s = c), (c = Zn(e, l + 1)), !s)) continue;
    const i = s[n],
      u = s[r];
    o && ((a = (i - o[n]) / 3), (s[`cp1${n}`] = i - a), (s[`cp1${r}`] = u - a * t[l])),
      c && ((a = (c[n] - i) / 3), (s[`cp2${n}`] = i + a), (s[`cp2${r}`] = u + a * t[l]));
  }
}
function nr(e, t = `x`) {
  let n = Qn(t),
    r = e.length,
    i = Array(r).fill(0),
    a = Array(r),
    o,
    s,
    c,
    l = Zn(e, 0);
  for (o = 0; o < r; ++o)
    if (((s = c), (c = l), (l = Zn(e, o + 1)), c)) {
      if (l) {
        const e = l[t] - c[t];
        i[o] = e === 0 ? 0 : (l[n] - c[n]) / e;
      }
      a[o] = s ? (l ? (Qe(i[o - 1]) === Qe(i[o]) ? (i[o - 1] + i[o]) / 2 : 0) : i[o - 1]) : i[o];
    }
  er(e, i, a), tr(e, a, t);
}
function rr(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function ir(e, t) {
  let n,
    r,
    i,
    a,
    o,
    s = cn(e[0], t);
  for (n = 0, r = e.length; n < r; ++n)
    (o = a),
      (a = s),
      (s = n < r - 1 && cn(e[n + 1], t)),
      a &&
        ((i = e[n]),
        o && ((i.cp1x = rr(i.cp1x, t.left, t.right)), (i.cp1y = rr(i.cp1y, t.top, t.bottom))),
        s && ((i.cp2x = rr(i.cp2x, t.left, t.right)), (i.cp2y = rr(i.cp2y, t.top, t.bottom))));
}
function ar(e, t, n, r, i) {
  let a, o, s, c;
  if ((t.spanGaps && (e = e.filter((e) => !e.skip)), t.cubicInterpolationMode === `monotone`))
    nr(e, i);
  else {
    let n = r ? e[e.length - 1] : e[0];
    for (a = 0, o = e.length; a < o; ++a)
      (s = e[a]),
        (c = $n(n, s, e[Math.min(a + 1, o - +!r) % o], t.tension)),
        (s.cp1x = c.previous.x),
        (s.cp1y = c.previous.y),
        (s.cp2x = c.next.x),
        (s.cp2y = c.next.y),
        (n = s);
  }
  t.capBezierPoints && ir(e, n);
}
function or() {
  return typeof window < `u` && typeof document < `u`;
}
function sr(e) {
  let t = e.parentNode;
  return t && t.toString() === `[object ShadowRoot]` && (t = t.host), t;
}
function cr(e, t, n) {
  let r;
  return (
    typeof e == `string`
      ? ((r = parseInt(e, 10)), e.indexOf(`%`) !== -1 && (r = (r / 100) * t.parentNode[n]))
      : (r = e),
    r
  );
}
var lr = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ur(e, t) {
  return lr(e).getPropertyValue(t);
}
var dr = [`top`, `right`, `bottom`, `left`];
function fr(e, t, n) {
  const r = {};
  n = n ? `-` + n : ``;
  for (let i = 0; i < 4; i++) {
    const a = dr[i];
    r[a] = parseFloat(e[t + `-` + a + n]) || 0;
  }
  return (r.width = r.left + r.right), (r.height = r.top + r.bottom), r;
}
var pr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function mr(e, t) {
  let n = e.touches,
    r = n && n.length ? n[0] : e,
    { offsetX: i, offsetY: a } = r,
    o = !1,
    s,
    c;
  if (pr(i, a, e.target)) (s = i), (c = a);
  else {
    const e = t.getBoundingClientRect();
    (s = r.clientX - e.left), (c = r.clientY - e.top), (o = !0);
  }
  return { x: s, y: c, box: o };
}
function hr(e, t) {
  if (`native` in e) return e;
  let { canvas: n, currentDevicePixelRatio: r } = t,
    i = lr(n),
    a = i.boxSizing === `border-box`,
    o = fr(i, `padding`),
    s = fr(i, `border`, `width`),
    { x: c, y: l, box: u } = mr(e, n),
    d = o.left + (u && s.left),
    f = o.top + (u && s.top),
    { width: p, height: m } = t;
  return (
    a && ((p -= o.width + s.width), (m -= o.height + s.height)),
    { x: Math.round((((c - d) / p) * n.width) / r), y: Math.round((((l - f) / m) * n.height) / r) }
  );
}
function gr(e, t, n) {
  let r, i;
  if (t === void 0 || n === void 0) {
    const a = e && sr(e);
    if (a) {
      const e = a.getBoundingClientRect(),
        o = lr(a),
        s = fr(o, `border`, `width`),
        c = fr(o, `padding`);
      (t = e.width - c.width - s.width),
        (n = e.height - c.height - s.height),
        (r = cr(o.maxWidth, a, `clientWidth`)),
        (i = cr(o.maxHeight, a, `clientHeight`));
    } else (t = e.clientWidth), (n = e.clientHeight);
  }
  return { width: t, height: n, maxWidth: r || Ke, maxHeight: i || Ke };
}
var _r = (e) => Math.round(e * 10) / 10;
function vr(e, t, n, r) {
  let i = lr(e),
    a = fr(i, `margin`),
    o = cr(i.maxWidth, e, `clientWidth`) || Ke,
    s = cr(i.maxHeight, e, `clientHeight`) || Ke,
    c = gr(e, t, n),
    { width: l, height: u } = c;
  if (i.boxSizing === `content-box`) {
    const e = fr(i, `border`, `width`),
      t = fr(i, `padding`);
    (l -= t.width + e.width), (u -= t.height + e.height);
  }
  return (
    (l = Math.max(0, l - a.width)),
    (u = Math.max(0, r ? l / r : u - a.height)),
    (l = _r(Math.min(l, o, c.maxWidth))),
    (u = _r(Math.min(u, s, c.maxHeight))),
    l && !u && (u = _r(l / 2)),
    (t !== void 0 || n !== void 0) &&
      r &&
      c.height &&
      u > c.height &&
      ((u = c.height), (l = _r(Math.floor(u * r)))),
    { width: l, height: u }
  );
}
function yr(e, t, n) {
  const r = t || 1,
    i = _r(e.height * r),
    a = _r(e.width * r);
  (e.height = _r(e.height)), (e.width = _r(e.width));
  const o = e.canvas;
  return (
    o.style &&
      (n || (!o.style.height && !o.style.width)) &&
      ((o.style.height = `${e.height}px`), (o.style.width = `${e.width}px`)),
    e.currentDevicePixelRatio !== r || o.height !== i || o.width !== a
      ? ((e.currentDevicePixelRatio = r),
        (o.height = i),
        (o.width = a),
        e.ctx.setTransform(r, 0, 0, r, 0, 0),
        !0)
      : !1
  );
}
var br = (function () {
  let e = !1;
  try {
    const t = {
      get passive() {
        return (e = !0), !1;
      },
    };
    or() && (window.addEventListener(`test`, null, t), window.removeEventListener(`test`, null, t));
  } catch {}
  return e;
})();
function xr(e, t) {
  const n = ur(e, t),
    r = n && n.match(/^(\d+)(\.\d+)?px$/);
  return r ? +r[1] : void 0;
}
function Sr(e, t, n, r) {
  return { x: e.x + n * (t.x - e.x), y: e.y + n * (t.y - e.y) };
}
function Cr(e, t, n, r) {
  return {
    x: e.x + n * (t.x - e.x),
    y:
      r === `middle`
        ? n < 0.5
          ? e.y
          : t.y
        : r === `after`
          ? n < 1
            ? e.y
            : t.y
          : n > 0
            ? t.y
            : e.y,
  };
}
function wr(e, t, n, r) {
  const i = { x: e.cp2x, y: e.cp2y },
    a = { x: t.cp1x, y: t.cp1y },
    o = Sr(e, i, n),
    s = Sr(i, a, n),
    c = Sr(a, t, n);
  return Sr(Sr(o, s, n), Sr(s, c, n), n);
}
var Tr = function (e, t) {
    return {
      x(n) {
        return e + e + t - n;
      },
      setWidth(e) {
        t = e;
      },
      textAlign(e) {
        return e === `center` ? e : e === `right` ? `left` : `right`;
      },
      xPlus(e, t) {
        return e - t;
      },
      leftForLtr(e, t) {
        return e - t;
      },
    };
  },
  Er = function () {
    return {
      x(e) {
        return e;
      },
      setWidth(e) {},
      textAlign(e) {
        return e;
      },
      xPlus(e, t) {
        return e + t;
      },
      leftForLtr(e, t) {
        return e;
      },
    };
  };
function Dr(e, t, n) {
  return e ? Tr(t, n) : Er();
}
function Or(e, t) {
  let n, r;
  (t === `ltr` || t === `rtl`) &&
    ((n = e.canvas.style),
    (r = [n.getPropertyValue(`direction`), n.getPropertyPriority(`direction`)]),
    n.setProperty(`direction`, t, `important`),
    (e.prevTextDirection = r));
}
function kr(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty(`direction`, t[0], t[1]));
}
function Ar(e) {
  return e === `angle`
    ? { between: pt, compare: dt, normalize: ft }
    : { between: gt, compare: (e, t) => e - t, normalize: (e) => e };
}
function jr({ start: e, end: t, count: n, loop: r, style: i }) {
  return { start: e % n, end: t % n, loop: r && (t - e + 1) % n === 0, style: i };
}
function Mr(e, t, n) {
  let { property: r, start: i, end: a } = n,
    { between: o, normalize: s } = Ar(r),
    c = t.length,
    { start: l, end: u, loop: d } = e,
    f,
    p;
  if (d) {
    for (l += c, u += c, f = 0, p = c; f < p && o(s(t[l % c][r]), i, a); ++f) l--, u--;
    (l %= c), (u %= c);
  }
  return u < l && (u += c), { start: l, end: u, loop: d, style: e.style };
}
function Nr(e, t, n) {
  if (!n) return [e];
  let { property: r, start: i, end: a } = n,
    o = t.length,
    { compare: s, between: c, normalize: l } = Ar(r),
    { start: u, end: d, loop: f, style: p } = Mr(e, t, n),
    m = [],
    h = !1,
    g = null,
    _,
    v,
    y,
    b = () => c(i, y, _) && s(i, y) !== 0,
    x = () => s(a, _) === 0 || c(a, y, _),
    S = () => h || b(),
    C = () => !h || x();
  for (let e = u, n = u; e <= d; ++e)
    (v = t[e % o]),
      !v.skip &&
        ((_ = l(v[r])),
        _ !== y &&
          ((h = c(_, i, a)),
          g === null && S() && (g = s(_, i) === 0 ? e : n),
          g !== null &&
            C() &&
            (m.push(jr({ start: g, end: e, loop: f, count: o, style: p })), (g = null)),
          (n = e),
          (y = _)));
  return g !== null && m.push(jr({ start: g, end: d, loop: f, count: o, style: p })), m;
}
function Pr(e, t) {
  const n = [],
    r = e.segments;
  for (let i = 0; i < r.length; i++) {
    const a = Nr(r[i], e.points, t);
    a.length && n.push(...a);
  }
  return n;
}
function Fr(e, t, n, r) {
  let i = 0,
    a = t - 1;
  if (n && !r) for (; i < t && !e[i].skip; ) i++;
  for (; i < t && e[i].skip; ) i++;
  for (i %= t, n && (a += i); a > i && e[a % t].skip; ) a--;
  return (a %= t), { start: i, end: a };
}
function Ir(e, t, n, r) {
  let i = e.length,
    a = [],
    o = t,
    s = e[t],
    c;
  for (c = t + 1; c <= n; ++c) {
    const n = e[c % i];
    n.skip || n.stop
      ? s.skip ||
        ((r = !1), a.push({ start: t % i, end: (c - 1) % i, loop: r }), (t = o = n.stop ? c : null))
      : ((o = c), s.skip && (t = c)),
      (s = n);
  }
  return o !== null && a.push({ start: t % i, end: o % i, loop: r }), a;
}
function Lr(e, t) {
  const n = e.points,
    r = e.options.spanGaps,
    i = n.length;
  if (!i) return [];
  const a = !!e._loop,
    { start: o, end: s } = Fr(n, i, a, r);
  return r === !0
    ? Rr(e, [{ start: o, end: s, loop: a }], n, t)
    : Rr(e, Ir(n, o, s < o ? s + i : s, !!e._fullLoop && o === 0 && s === i - 1), n, t);
}
function Rr(e, t, n, r) {
  return !r || !r.setContext || !n ? t : zr(e, t, n, r);
}
function zr(e, t, n, r) {
  let i = e._chart.getContext(),
    a = Br(e.options),
    {
      _datasetIndex: o,
      options: { spanGaps: s },
    } = e,
    c = n.length,
    l = [],
    u = a,
    d = t[0].start,
    f = d;
  function p(e, t, r, i) {
    const a = s ? -1 : 1;
    if (e !== t) {
      for (e += c; n[e % c].skip; ) e -= a;
      for (; n[t % c].skip; ) t += a;
      e % c !== t % c &&
        (l.push({ start: e % c, end: t % c, loop: r, style: i }), (u = i), (d = t % c));
    }
  }
  for (const e of t) {
    d = s ? d : e.start;
    let t = n[d % c],
      a;
    for (f = d + 1; f <= e.end; f++) {
      const s = n[f % c];
      (a = Br(
        r.setContext(
          kn(i, {
            type: `segment`,
            p0: t,
            p1: s,
            p0DataIndex: (f - 1) % c,
            p1DataIndex: f % c,
            datasetIndex: o,
          }),
        ),
      )),
        Vr(a, u) && p(d, f - 1, e.loop, u),
        (t = s),
        (u = a);
    }
    d < f - 1 && p(d, f - 1, e.loop, u);
  }
  return l;
}
function Br(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor,
  };
}
function Vr(e, t) {
  if (!t) return !1;
  const n = [],
    r = function (e, t) {
      return It(t) ? (n.includes(t) || n.push(t), n.indexOf(t)) : t;
    };
  return JSON.stringify(e, r) !== JSON.stringify(t, r);
}
function Hr(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Ur(e, t) {
  const { xScale: n, yScale: r } = e;
  return n && r
    ? {
        left: Hr(n, t, `left`),
        right: Hr(n, t, `right`),
        top: Hr(r, t, `top`),
        bottom: Hr(r, t, `bottom`),
      }
    : t;
}
function Wr(e, t) {
  const n = t._clip;
  if (n.disabled) return !1;
  const r = Ur(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : r.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : r.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : r.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : r.bottom + (n.bottom === !0 ? 0 : n.bottom),
  };
}
var Gr = new (class {
    constructor() {
      (this._request = null),
        (this._charts = new Map()),
        (this._running = !1),
        (this._lastDate = void 0);
    }
    _notify(e, t, n, r) {
      const i = t.listeners[r],
        a = t.duration;
      i.forEach((r) =>
        r({ chart: e, initial: t.initial, numSteps: a, currentStep: Math.min(n - t.start, a) }),
      );
    }
    _refresh() {
      this._request ||=
        ((this._running = !0),
        Tt.call(window, () => {
          this._update(), (this._request = null), this._running && this._refresh();
        }));
    }
    _update(e = Date.now()) {
      let t = 0;
      this._charts.forEach((n, r) => {
        if (!n.running || !n.items.length) return;
        let i = n.items,
          a = i.length - 1,
          o = !1,
          s;
        for (; a >= 0; --a)
          (s = i[a]),
            s._active
              ? (s._total > n.duration && (n.duration = s._total), s.tick(e), (o = !0))
              : ((i[a] = i[i.length - 1]), i.pop());
        o && (r.draw(), this._notify(r, n, e, `progress`)),
          i.length || ((n.running = !1), this._notify(r, n, e, `complete`), (n.initial = !1)),
          (t += i.length);
      }),
        (this._lastDate = e),
        t === 0 && (this._running = !1);
    }
    _getAnims(e) {
      let t = this._charts,
        n = t.get(e);
      return (
        n ||
          ((n = { running: !1, initial: !0, items: [], listeners: { complete: [], progress: [] } }),
          t.set(e, n)),
        n
      );
    }
    listen(e, t, n) {
      this._getAnims(e).listeners[t].push(n);
    }
    add(e, t) {
      !t || !t.length || this._getAnims(e).items.push(...t);
    }
    has(e) {
      return this._getAnims(e).items.length > 0;
    }
    start(e) {
      const t = this._charts.get(e);
      t &&
        ((t.running = !0),
        (t.start = Date.now()),
        (t.duration = t.items.reduce((e, t) => Math.max(e, t._duration), 0)),
        this._refresh());
    }
    running(e) {
      if (!this._running) return !1;
      const t = this._charts.get(e);
      return !(!t || !t.running || !t.items.length);
    }
    stop(e) {
      const t = this._charts.get(e);
      if (!t || !t.items.length) return;
      let n = t.items,
        r = n.length - 1;
      for (; r >= 0; --r) n[r].cancel();
      (t.items = []), this._notify(e, t, Date.now(), `complete`);
    }
    remove(e) {
      return this._charts.delete(e);
    }
  })(),
  Kr = `transparent`,
  qr = {
    boolean(e, t, n) {
      return n > 0.5 ? t : e;
    },
    color(e, t, n) {
      const r = Lt(e || Kr),
        i = r.valid && Lt(t || Kr);
      return i && i.valid ? i.mix(r, n).hexString() : t;
    },
    number(e, t, n) {
      return e + (t - e) * n;
    },
  },
  Jr = class {
    constructor(e, t, n, r) {
      const i = t[n];
      r = Dn([e.to, r, i, e.from]);
      const a = Dn([e.from, i, r]);
      (this._active = !0),
        (this._fn = e.fn || qr[e.type || typeof a]),
        (this._easing = Ft[e.easing] || Ft.linear),
        (this._start = Math.floor(Date.now() + (e.delay || 0))),
        (this._duration = this._total = Math.floor(e.duration)),
        (this._loop = !!e.loop),
        (this._target = t),
        (this._prop = n),
        (this._from = a),
        (this._to = r),
        (this._promises = void 0);
    }
    active() {
      return this._active;
    }
    update(e, t, n) {
      if (this._active) {
        this._notify(!1);
        const r = this._target[this._prop],
          i = n - this._start,
          a = this._duration - i;
        (this._start = n),
          (this._duration = Math.floor(Math.max(a, e.duration))),
          (this._total += i),
          (this._loop = !!e.loop),
          (this._to = Dn([e.to, t, r, e.from])),
          (this._from = Dn([e.from, r, t]));
      }
    }
    cancel() {
      this._active && (this.tick(Date.now()), (this._active = !1), this._notify(!1));
    }
    tick(e) {
      let t = e - this._start,
        n = this._duration,
        r = this._prop,
        i = this._from,
        a = this._loop,
        o = this._to,
        s;
      if (((this._active = i !== o && (a || t < n)), !this._active)) {
        (this._target[r] = o), this._notify(!0);
        return;
      }
      if (t < 0) {
        this._target[r] = i;
        return;
      }
      (s = (t / n) % 2),
        (s = a && s > 1 ? 2 - s : s),
        (s = this._easing(Math.min(1, Math.max(0, s)))),
        (this._target[r] = this._fn(i, o, s));
    }
    wait() {
      const e = (this._promises ||= []);
      return new Promise((t, n) => {
        e.push({ res: t, rej: n });
      });
    }
    _notify(e) {
      const t = e ? `res` : `rej`,
        n = this._promises || [];
      for (let e = 0; e < n.length; e++) n[e][t]();
    }
  },
  Yr = class {
    constructor(e, t) {
      (this._chart = e), (this._properties = new Map()), this.configure(t);
    }
    configure(e) {
      if (!P(e)) return;
      const t = Object.keys(z.animation),
        n = this._properties;
      Object.getOwnPropertyNames(e).forEach((r) => {
        const i = e[r];
        if (!P(i)) return;
        const a = {};
        for (const e of t) a[e] = i[e];
        ((N(i.properties) && i.properties) || [r]).forEach((e) => {
          (e === r || !n.has(e)) && n.set(e, a);
        });
      });
    }
    _animateOptions(e, t) {
      const n = t.options,
        r = Zr(e, n);
      if (!r) return [];
      const i = this._createAnimations(r, n);
      return (
        n.$shared &&
          Xr(e.options.$animations, n).then(
            () => {
              e.options = n;
            },
            () => {},
          ),
        i
      );
    }
    _createAnimations(e, t) {
      let n = this._properties,
        r = [],
        i = (e.$animations ||= {}),
        a = Object.keys(t),
        o = Date.now(),
        s;
      for (s = a.length - 1; s >= 0; --s) {
        const c = a[s];
        if (c.charAt(0) === `$`) continue;
        if (c === `options`) {
          r.push(...this._animateOptions(e, t));
          continue;
        }
        let l = t[c],
          u = i[c],
          d = n.get(c);
        if (u)
          if (d && u.active()) {
            u.update(d, l, o);
            continue;
          } else u.cancel();
        if (!d || !d.duration) {
          e[c] = l;
          continue;
        }
        (i[c] = u = new Jr(d, e, c, l)), r.push(u);
      }
      return r;
    }
    update(e, t) {
      if (this._properties.size === 0) {
        Object.assign(e, t);
        return;
      }
      const n = this._createAnimations(e, t);
      if (n.length) return Gr.add(this._chart, n), !0;
    }
  };
function Xr(e, t) {
  const n = [],
    r = Object.keys(t);
  for (let t = 0; t < r.length; t++) {
    const i = e[r[t]];
    i && i.active() && n.push(i.wait());
  }
  return Promise.all(n);
}
function Zr(e, t) {
  if (!t) return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, { $shared: !1, $animations: {} })), n;
}
function Qr(e, t) {
  const n = (e && e.options) || {},
    r = n.reverse,
    i = n.min === void 0 ? t : 0,
    a = n.max === void 0 ? t : 0;
  return { start: r ? a : i, end: r ? i : a };
}
function $r(e, t, n) {
  if (n === !1) return !1;
  const r = Qr(e, n),
    i = Qr(t, n);
  return { top: i.end, right: r.end, bottom: i.start, left: r.start };
}
function ei(e) {
  let t, n, r, i;
  return (
    P(e) ? ((t = e.top), (n = e.right), (r = e.bottom), (i = e.left)) : (t = n = r = i = e),
    { top: t, right: n, bottom: r, left: i, disabled: e === !1 }
  );
}
function ti(e, t) {
  let n = [],
    r = e._getSortedDatasetMetas(t),
    i,
    a;
  for (i = 0, a = r.length; i < a; ++i) n.push(r[i].index);
  return n;
}
function ni(e, t, n, r = {}) {
  let i = e.keys,
    a = r.mode === `single`,
    o,
    s,
    c,
    l;
  if (t === null) return;
  let u = !1;
  for (o = 0, s = i.length; o < s; ++o) {
    if (((c = +i[o]), c === n)) {
      if (((u = !0), r.all)) continue;
      break;
    }
    (l = e.values[c]), we(l) && (a || t === 0 || Qe(t) === Qe(l)) && (t += l);
  }
  return !u && !r.all ? 0 : t;
}
function ri(e, t) {
  let { iScale: n, vScale: r } = t,
    i = n.axis === `x` ? `x` : `y`,
    a = r.axis === `x` ? `x` : `y`,
    o = Object.keys(e),
    s = Array(o.length),
    c,
    l,
    u;
  for (c = 0, l = o.length; c < l; ++c) (u = o[c]), (s[c] = { [i]: u, [a]: e[u] });
  return s;
}
function ii(e, t) {
  const n = e && e.options.stacked;
  return n || (n === void 0 && t.stack !== void 0);
}
function ai(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function oi(e) {
  const { min: t, max: n, minDefined: r, maxDefined: i } = e.getUserBounds();
  return { min: r ? t : -1 / 0, max: i ? n : 1 / 0 };
}
function si(e, t, n) {
  const r = e[t] || (e[t] = {});
  return r[n] || (r[n] = {});
}
function ci(e, t, n, r) {
  for (const i of t.getMatchingVisibleMetas(r).reverse()) {
    const t = e[i.index];
    if ((n && t > 0) || (!n && t < 0)) return i.index;
  }
  return null;
}
function li(e, t) {
  let { chart: n, _cachedMeta: r } = e,
    i = (n._stacks ||= {}),
    { iScale: a, vScale: o, index: s } = r,
    c = a.axis,
    l = o.axis,
    u = ai(a, o, r),
    d = t.length,
    f;
  for (let e = 0; e < d; ++e) {
    const n = t[e],
      { [c]: a, [l]: d } = n,
      p = (n._stacks ||= {});
    (f = p[l] = si(i, u, a)),
      (f[s] = d),
      (f._top = ci(f, o, !0, r.type)),
      (f._bottom = ci(f, o, !1, r.type));
    const m = (f._visualValues ||= {});
    m[s] = d;
  }
}
function ui(e, t) {
  const n = e.scales;
  return Object.keys(n)
    .filter((e) => n[e].axis === t)
    .shift();
}
function di(e, t) {
  return kn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: `default`,
    type: `dataset`,
  });
}
function fi(e, t, n) {
  return kn(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: `default`,
    type: `data`,
  });
}
function pi(e, t) {
  const n = e.controller.index,
    r = e.vScale && e.vScale.axis;
  if (r) {
    t ||= e._parsed;
    for (const e of t) {
      const t = e._stacks;
      if (!t || t[r] === void 0 || t[r][n] === void 0) return;
      delete t[r][n],
        t[r]._visualValues !== void 0 &&
          t[r]._visualValues[n] !== void 0 &&
          delete t[r]._visualValues[n];
    }
  }
}
var mi = (e) => e === `reset` || e === `none`,
  hi = (e, t) => (t ? e : Object.assign({}, e)),
  gi = (e, t, n) => e && !t.hidden && t._stacked && { keys: ti(n, !0), values: null },
  _i = class {
    static defaults = {};
    static datasetElementType = null;
    static dataElementType = null;
    constructor(e, t) {
      (this.chart = e),
        (this._ctx = e.ctx),
        (this.index = t),
        (this._cachedDataOpts = {}),
        (this._cachedMeta = this.getMeta()),
        (this._type = this._cachedMeta.type),
        (this.options = void 0),
        (this._parsing = !1),
        (this._data = void 0),
        (this._objectData = void 0),
        (this._sharedOptions = void 0),
        (this._drawStart = void 0),
        (this._drawCount = void 0),
        (this.enableOptionSharing = !1),
        (this.supportsDecimation = !1),
        (this.$context = void 0),
        (this._syncList = []),
        (this.datasetElementType = new.target.datasetElementType),
        (this.dataElementType = new.target.dataElementType),
        this.initialize();
    }
    initialize() {
      const e = this._cachedMeta;
      this.configure(),
        this.linkScales(),
        (e._stacked = ii(e.vScale, e)),
        this.addElements(),
        this.options.fill &&
          !this.chart.isPluginEnabled(`filler`) &&
          console.warn(
            `Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options`,
          );
    }
    updateIndex(e) {
      this.index !== e && pi(this._cachedMeta), (this.index = e);
    }
    linkScales() {
      const e = this.chart,
        t = this._cachedMeta,
        n = this.getDataset(),
        r = (e, t, n, r) => (e === `x` ? t : e === `r` ? r : n),
        i = (t.xAxisID = F(n.xAxisID, ui(e, `x`))),
        a = (t.yAxisID = F(n.yAxisID, ui(e, `y`))),
        o = (t.rAxisID = F(n.rAxisID, ui(e, `r`))),
        s = t.indexAxis,
        c = (t.iAxisID = r(s, i, a, o)),
        l = (t.vAxisID = r(s, a, i, o));
      (t.xScale = this.getScaleForId(i)),
        (t.yScale = this.getScaleForId(a)),
        (t.rScale = this.getScaleForId(o)),
        (t.iScale = this.getScaleForId(c)),
        (t.vScale = this.getScaleForId(l));
    }
    getDataset() {
      return this.chart.data.datasets[this.index];
    }
    getMeta() {
      return this.chart.getDatasetMeta(this.index);
    }
    getScaleForId(e) {
      return this.chart.scales[e];
    }
    _getOtherScale(e) {
      const t = this._cachedMeta;
      return e === t.iScale ? t.vScale : t.iScale;
    }
    reset() {
      this._update(`reset`);
    }
    _destroy() {
      const e = this._cachedMeta;
      this._data && Ct(this._data, this), e._stacked && pi(e);
    }
    _dataCheck() {
      const e = this.getDataset(),
        t = (e.data ||= []),
        n = this._data;
      if (P(t)) {
        const e = this._cachedMeta;
        this._data = ri(t, e);
      } else if (n !== t) {
        if (n) {
          Ct(n, this);
          const e = this._cachedMeta;
          pi(e), (e._parsed = []);
        }
        t && Object.isExtensible(t) && St(t, this), (this._syncList = []), (this._data = t);
      }
    }
    addElements() {
      const e = this._cachedMeta;
      this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
    }
    buildOrUpdateElements(e) {
      let t = this._cachedMeta,
        n = this.getDataset(),
        r = !1;
      this._dataCheck();
      const i = t._stacked;
      (t._stacked = ii(t.vScale, t)),
        t.stack !== n.stack && ((r = !0), pi(t), (t.stack = n.stack)),
        this._resyncElements(e),
        (r || i !== t._stacked) && (li(this, t._parsed), (t._stacked = ii(t.vScale, t)));
    }
    configure() {
      const e = this.chart.config,
        t = e.datasetScopeKeys(this._type),
        n = e.getOptionScopes(this.getDataset(), t, !0);
      (this.options = e.createResolver(n, this.getContext())),
        (this._parsing = this.options.parsing),
        (this._cachedDataOpts = {});
    }
    parse(e, t) {
      let { _cachedMeta: n, _data: r } = this,
        { iScale: i, _stacked: a } = n,
        o = i.axis,
        s = e === 0 && t === r.length ? !0 : n._sorted,
        c = e > 0 && n._parsed[e - 1],
        l,
        u,
        d;
      if (this._parsing === !1) (n._parsed = r), (n._sorted = !0), (d = r);
      else {
        d = N(r[e])
          ? this.parseArrayData(n, r, e, t)
          : P(r[e])
            ? this.parseObjectData(n, r, e, t)
            : this.parsePrimitiveData(n, r, e, t);
        const i = () => u[o] === null || (c && u[o] < c[o]);
        for (l = 0; l < t; ++l) (n._parsed[l + e] = u = d[l]), s && (i() && (s = !1), (c = u));
        n._sorted = s;
      }
      a && li(this, d);
    }
    parsePrimitiveData(e, t, n, r) {
      let { iScale: i, vScale: a } = e,
        o = i.axis,
        s = a.axis,
        c = i.getLabels(),
        l = i === a,
        u = Array(r),
        d,
        f,
        p;
      for (d = 0, f = r; d < f; ++d)
        (p = d + n), (u[d] = { [o]: l || i.parse(c[p], p), [s]: a.parse(t[p], p) });
      return u;
    }
    parseArrayData(e, t, n, r) {
      let { xScale: i, yScale: a } = e,
        o = Array(r),
        s,
        c,
        l,
        u;
      for (s = 0, c = r; s < c; ++s)
        (l = s + n), (u = t[l]), (o[s] = { x: i.parse(u[0], l), y: a.parse(u[1], l) });
      return o;
    }
    parseObjectData(e, t, n, r) {
      let { xScale: i, yScale: a } = e,
        { xAxisKey: o = `x`, yAxisKey: s = `y` } = this._parsing,
        c = Array(r),
        l,
        u,
        d,
        f;
      for (l = 0, u = r; l < u; ++l)
        (d = l + n), (f = t[d]), (c[l] = { x: i.parse(Re(f, o), d), y: a.parse(Re(f, s), d) });
      return c;
    }
    getParsed(e) {
      return this._cachedMeta._parsed[e];
    }
    getDataElement(e) {
      return this._cachedMeta.data[e];
    }
    applyStack(e, t, n) {
      const r = this.chart,
        i = this._cachedMeta,
        a = t[e.axis];
      return ni({ keys: ti(r, !0), values: t._stacks[e.axis]._visualValues }, a, i.index, {
        mode: n,
      });
    }
    updateRangeFromParsed(e, t, n, r) {
      let i = n[t.axis],
        a = i === null ? NaN : i,
        o = r && n._stacks[t.axis];
      r && o && ((r.values = o), (a = ni(r, i, this._cachedMeta.index))),
        (e.min = Math.min(e.min, a)),
        (e.max = Math.max(e.max, a));
    }
    getMinMax(e, t) {
      let n = this._cachedMeta,
        r = n._parsed,
        i = n._sorted && e === n.iScale,
        a = r.length,
        o = this._getOtherScale(e),
        s = gi(t, n, this.chart),
        c = { min: 1 / 0, max: -1 / 0 },
        { min: l, max: u } = oi(o),
        d,
        f;
      function p() {
        f = r[d];
        const t = f[o.axis];
        return !we(f[e.axis]) || l > t || u < t;
      }
      for (d = 0; d < a && !(!p() && (this.updateRangeFromParsed(c, e, f, s), i)); ++d);
      if (i) {
        for (d = a - 1; d >= 0; --d)
          if (!p()) {
            this.updateRangeFromParsed(c, e, f, s);
            break;
          }
      }
      return c;
    }
    getAllParsedValues(e) {
      let t = this._cachedMeta._parsed,
        n = [],
        r,
        i,
        a;
      for (r = 0, i = t.length; r < i; ++r) (a = t[r][e.axis]), we(a) && n.push(a);
      return n;
    }
    getMaxOverflow() {
      return !1;
    }
    getLabelAndValue(e) {
      const t = this._cachedMeta,
        n = t.iScale,
        r = t.vScale,
        i = this.getParsed(e);
      return {
        label: n ? `` + n.getLabelForValue(i[n.axis]) : ``,
        value: r ? `` + r.getLabelForValue(i[r.axis]) : ``,
      };
    }
    _update(e) {
      const t = this._cachedMeta;
      this.update(e || `default`),
        (t._clip = ei(F(this.options.clip, $r(t.xScale, t.yScale, this.getMaxOverflow()))));
    }
    update(e) {}
    draw() {
      let e = this._ctx,
        t = this.chart,
        n = this._cachedMeta,
        r = n.data || [],
        i = t.chartArea,
        a = [],
        o = this._drawStart || 0,
        s = this._drawCount || r.length - o,
        c = this.options.drawActiveElementsOnTop,
        l;
      for (n.dataset && n.dataset.draw(e, i, o, s), l = o; l < o + s; ++l) {
        const t = r[l];
        t.hidden || (t.active && c ? a.push(t) : t.draw(e, i));
      }
      for (l = 0; l < a.length; ++l) a[l].draw(e, i);
    }
    getStyle(e, t) {
      const n = t ? `active` : `default`;
      return e === void 0 && this._cachedMeta.dataset
        ? this.resolveDatasetElementOptions(n)
        : this.resolveDataElementOptions(e || 0, n);
    }
    getContext(e, t, n) {
      let r = this.getDataset(),
        i;
      if (e >= 0 && e < this._cachedMeta.data.length) {
        const t = this._cachedMeta.data[e];
        (i = t.$context ||= fi(this.getContext(), e, t)),
          (i.parsed = this.getParsed(e)),
          (i.raw = r.data[e]),
          (i.index = i.dataIndex = e);
      } else
        (i = this.$context ||= di(this.chart.getContext(), this.index)),
          (i.dataset = r),
          (i.index = i.datasetIndex = this.index);
      return (i.active = !!t), (i.mode = n), i;
    }
    resolveDatasetElementOptions(e) {
      return this._resolveElementOptions(this.datasetElementType.id, e);
    }
    resolveDataElementOptions(e, t) {
      return this._resolveElementOptions(this.dataElementType.id, t, e);
    }
    _resolveElementOptions(e, t = `default`, n) {
      const r = t === `active`,
        i = this._cachedDataOpts,
        a = e + `-` + t,
        o = i[a],
        s = this.enableOptionSharing && Be(n);
      if (o) return hi(o, s);
      const c = this.chart.config,
        l = c.datasetElementScopeKeys(this._type, e),
        u = r ? [`${e}Hover`, `hover`, e, ``] : [e, ``],
        d = c.getOptionScopes(this.getDataset(), l),
        f = Object.keys(z.elements[e]),
        p = c.resolveNamedOptions(d, f, () => this.getContext(n, r, t), u);
      return p.$shared && ((p.$shared = s), (i[a] = Object.freeze(hi(p, s)))), p;
    }
    _resolveAnimations(e, t, n) {
      const r = this.chart,
        i = this._cachedDataOpts,
        a = `animation-${t}`,
        o = i[a];
      if (o) return o;
      let s;
      if (r.options.animation !== !1) {
        const r = this.chart.config,
          i = r.datasetAnimationScopeKeys(this._type, t),
          a = r.getOptionScopes(this.getDataset(), i);
        s = r.createResolver(a, this.getContext(e, n, t));
      }
      const c = new Yr(r, s && s.animations);
      return s && s._cacheable && (i[a] = Object.freeze(c)), c;
    }
    getSharedOptions(e) {
      if (e.$shared) return (this._sharedOptions ||= Object.assign({}, e));
    }
    includeOptions(e, t) {
      return !t || mi(e) || this.chart._animationsDisabled;
    }
    _getSharedOptions(e, t) {
      const n = this.resolveDataElementOptions(e, t),
        r = this._sharedOptions,
        i = this.getSharedOptions(n),
        a = this.includeOptions(t, i) || i !== r;
      return this.updateSharedOptions(i, t, n), { sharedOptions: i, includeOptions: a };
    }
    updateElement(e, t, n, r) {
      mi(r) ? Object.assign(e, n) : this._resolveAnimations(t, r).update(e, n);
    }
    updateSharedOptions(e, t, n) {
      e && !mi(t) && this._resolveAnimations(void 0, t).update(e, n);
    }
    _setStyle(e, t, n, r) {
      e.active = r;
      const i = this.getStyle(t, r);
      this._resolveAnimations(t, n, r).update(e, {
        options: (!r && this.getSharedOptions(i)) || i,
      });
    }
    removeHoverStyle(e, t, n) {
      this._setStyle(e, n, `active`, !1);
    }
    setHoverStyle(e, t, n) {
      this._setStyle(e, n, `active`, !0);
    }
    _removeDatasetHoverStyle() {
      const e = this._cachedMeta.dataset;
      e && this._setStyle(e, void 0, `active`, !1);
    }
    _setDatasetHoverStyle() {
      const e = this._cachedMeta.dataset;
      e && this._setStyle(e, void 0, `active`, !0);
    }
    _resyncElements(e) {
      const t = this._data,
        n = this._cachedMeta.data;
      for (const [e, t, n] of this._syncList) this[e](t, n);
      this._syncList = [];
      const r = n.length,
        i = t.length,
        a = Math.min(i, r);
      a && this.parse(0, a),
        i > r ? this._insertElements(r, i - r, e) : i < r && this._removeElements(i, r - i);
    }
    _insertElements(e, t, n = !0) {
      let r = this._cachedMeta,
        i = r.data,
        a = e + t,
        o,
        s = (e) => {
          for (e.length += t, o = e.length - 1; o >= a; o--) e[o] = e[o - t];
        };
      for (s(i), o = e; o < a; ++o) i[o] = new this.dataElementType();
      this._parsing && s(r._parsed), this.parse(e, t), n && this.updateElements(i, e, t, `reset`);
    }
    updateElements(e, t, n, r) {}
    _removeElements(e, t) {
      const n = this._cachedMeta;
      if (this._parsing) {
        const r = n._parsed.splice(e, t);
        n._stacked && pi(n, r);
      }
      n.data.splice(e, t);
    }
    _sync(e) {
      if (this._parsing) this._syncList.push(e);
      else {
        const [t, n, r] = e;
        this[t](n, r);
      }
      this.chart._dataChanges.push([this.index, ...e]);
    }
    _onDataPush() {
      const e = arguments.length;
      this._sync([`_insertElements`, this.getDataset().data.length - e, e]);
    }
    _onDataPop() {
      this._sync([`_removeElements`, this._cachedMeta.data.length - 1, 1]);
    }
    _onDataShift() {
      this._sync([`_removeElements`, 0, 1]);
    }
    _onDataSplice(e, t) {
      t && this._sync([`_removeElements`, e, t]);
      const n = arguments.length - 2;
      n && this._sync([`_insertElements`, e, n]);
    }
    _onDataUnshift() {
      this._sync([`_insertElements`, 0, arguments.length]);
    }
  };
function vi(e, t) {
  if (!e._cache.$bar) {
    let n = e.getMatchingVisibleMetas(t),
      r = [];
    for (let t = 0, i = n.length; t < i; t++) r = r.concat(n[t].controller.getAllParsedValues(e));
    e._cache.$bar = wt(r.sort((e, t) => e - t));
  }
  return e._cache.$bar;
}
function yi(e) {
  let t = e.iScale,
    n = vi(t, e.type),
    r = t._length,
    i,
    a,
    o,
    s,
    c = () => {
      o === 32767 || o === -32768 || (Be(s) && (r = Math.min(r, Math.abs(o - s) || r)), (s = o));
    };
  for (i = 0, a = n.length; i < a; ++i) (o = t.getPixelForValue(n[i])), c();
  for (s = void 0, i = 0, a = t.ticks.length; i < a; ++i) (o = t.getPixelForTick(i)), c();
  return r;
}
function bi(e, t, n, r) {
  let i = n.barThickness,
    a,
    o;
  return (
    M(i) ? ((a = t.min * n.categoryPercentage), (o = n.barPercentage)) : ((a = i * r), (o = 1)),
    { chunk: a / r, ratio: o, start: t.pixels[e] - a / 2 }
  );
}
function xi(e, t, n, r) {
  let i = t.pixels,
    a = i[e],
    o = e > 0 ? i[e - 1] : null,
    s = e < i.length - 1 ? i[e + 1] : null,
    c = n.categoryPercentage;
  o === null && (o = a - (s === null ? t.end - t.start : s - a)), s === null && (s = a + a - o);
  const l = a - ((a - Math.min(o, s)) / 2) * c;
  return { chunk: ((Math.abs(s - o) / 2) * c) / r, ratio: n.barPercentage, start: l };
}
function Si(e, t, n, r) {
  let i = n.parse(e[0], r),
    a = n.parse(e[1], r),
    o = Math.min(i, a),
    s = Math.max(i, a),
    c = o,
    l = s;
  Math.abs(o) > Math.abs(s) && ((c = s), (l = o)),
    (t[n.axis] = l),
    (t._custom = { barStart: c, barEnd: l, start: i, end: a, min: o, max: s });
}
function Ci(e, t, n, r) {
  return N(e) ? Si(e, t, n, r) : (t[n.axis] = n.parse(e, r)), t;
}
function wi(e, t, n, r) {
  let i = e.iScale,
    a = e.vScale,
    o = i.getLabels(),
    s = i === a,
    c = [],
    l,
    u,
    d,
    f;
  for (l = n, u = n + r; l < u; ++l)
    (f = t[l]), (d = {}), (d[i.axis] = s || i.parse(o[l], l)), c.push(Ci(f, d, a, l));
  return c;
}
function Ti(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Ei(e, t, n) {
  return e === 0 ? (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1) : Qe(e);
}
function Di(e) {
  let t, n, r, i, a;
  return (
    e.horizontal
      ? ((t = e.base > e.x), (n = `left`), (r = `right`))
      : ((t = e.base < e.y), (n = `bottom`), (r = `top`)),
    t ? ((i = `end`), (a = `start`)) : ((i = `start`), (a = `end`)),
    { start: n, end: r, reverse: t, top: i, bottom: a }
  );
}
function Oi(e, t, n, r) {
  let i = t.borderSkipped,
    a = {};
  if (!i) {
    e.borderSkipped = a;
    return;
  }
  if (i === !0) {
    e.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 };
    return;
  }
  const { start: o, end: s, reverse: c, top: l, bottom: u } = Di(e);
  i === `middle` &&
    n &&
    ((e.enableBorderRadius = !0),
    (n._top || 0) === r
      ? (i = l)
      : (n._bottom || 0) === r
        ? (i = u)
        : ((a[ki(u, o, s, c)] = !0), (i = l))),
    (a[ki(i, o, s, c)] = !0),
    (e.borderSkipped = a);
}
function ki(e, t, n, r) {
  return r ? ((e = Ai(e, t, n)), (e = ji(e, n, t))) : (e = ji(e, t, n)), e;
}
function Ai(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function ji(e, t, n) {
  return e === `start` ? t : e === `end` ? n : e;
}
function Mi(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === `auto` ? (n === 1 ? 0.33 : 0) : t;
}
var Ni = class extends _i {
  static id = `bar`;
  static defaults = {
    datasetElementType: !1,
    dataElementType: `bar`,
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: { numbers: { type: `number`, properties: [`x`, `y`, `base`, `width`, `height`] } },
  };
  static overrides = {
    scales: {
      _index_: { type: `category`, offset: !0, grid: { offset: !0 } },
      _value_: { type: `linear`, beginAtZero: !0 },
    },
  };
  parsePrimitiveData(e, t, n, r) {
    return wi(e, t, n, r);
  }
  parseArrayData(e, t, n, r) {
    return wi(e, t, n, r);
  }
  parseObjectData(e, t, n, r) {
    let { iScale: i, vScale: a } = e,
      { xAxisKey: o = `x`, yAxisKey: s = `y` } = this._parsing,
      c = i.axis === `x` ? o : s,
      l = a.axis === `x` ? o : s,
      u = [],
      d,
      f,
      p,
      m;
    for (d = n, f = n + r; d < f; ++d)
      (m = t[d]), (p = {}), (p[i.axis] = i.parse(Re(m, c), d)), u.push(Ci(Re(m, l), p, a, d));
    return u;
  }
  updateRangeFromParsed(e, t, n, r) {
    super.updateRangeFromParsed(e, t, n, r);
    const i = n._custom;
    i &&
      t === this._cachedMeta.vScale &&
      ((e.min = Math.min(e.min, i.min)), (e.max = Math.max(e.max, i.max)));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const { iScale: t, vScale: n } = this._cachedMeta,
      r = this.getParsed(e),
      i = r._custom,
      a = Ti(i) ? `[` + i.start + `, ` + i.end + `]` : `` + n.getLabelForValue(r[n.axis]);
    return { label: `` + t.getLabelForValue(r[t.axis]), value: a };
  }
  initialize() {
    (this.enableOptionSharing = !0), super.initialize();
    const e = this._cachedMeta;
    e.stack = this.getDataset().stack;
  }
  update(e) {
    const t = this._cachedMeta;
    this.updateElements(t.data, 0, t.data.length, e);
  }
  updateElements(e, t, n, r) {
    const i = r === `reset`,
      {
        index: a,
        _cachedMeta: { vScale: o },
      } = this,
      s = o.getBasePixel(),
      c = o.isHorizontal(),
      l = this._getRuler(),
      { sharedOptions: u, includeOptions: d } = this._getSharedOptions(t, r);
    for (let f = t; f < t + n; f++) {
      const t = this.getParsed(f),
        n = i || M(t[o.axis]) ? { base: s, head: s } : this._calculateBarValuePixels(f),
        p = this._calculateBarIndexPixels(f, l),
        m = (t._stacks || {})[o.axis],
        h = {
          horizontal: c,
          base: n.base,
          enableBorderRadius: !m || Ti(t._custom) || a === m._top || a === m._bottom,
          x: c ? n.head : p.center,
          y: c ? p.center : n.head,
          height: c ? p.size : Math.abs(n.size),
          width: c ? Math.abs(n.size) : p.size,
        };
      d && (h.options = u || this.resolveDataElementOptions(f, e[f].active ? `active` : r));
      const g = h.options || e[f].options;
      Oi(h, g, m, a), Mi(h, g, l.ratio), this.updateElement(e[f], f, h, r);
    }
  }
  _getStacks(e, t) {
    const { iScale: n } = this._cachedMeta,
      r = n.getMatchingVisibleMetas(this._type).filter((e) => e.controller.options.grouped),
      i = n.options.stacked,
      a = [],
      o = this._cachedMeta.controller.getParsed(t),
      s = o && o[n.axis],
      c = (e) => {
        const t = e._parsed.find((e) => e[n.axis] === s),
          r = t && t[e.vScale.axis];
        if (M(r) || isNaN(r)) return !0;
      };
    for (const n of r)
      if (
        !(t !== void 0 && c(n)) &&
        ((i === !1 || a.indexOf(n.stack) === -1 || (i === void 0 && n.stack === void 0)) &&
          a.push(n.stack),
        n.index === e)
      )
        break;
    return a.length || a.push(void 0), a;
  }
  _getStackCount(e) {
    return this._getStacks(void 0, e).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const e = this.chart.scales,
      t = this.chart.options.indexAxis;
    return Object.keys(e)
      .filter((n) => e[n].axis === t)
      .shift();
  }
  _getAxis() {
    const e = {},
      t = this.getFirstScaleIdForIndexAxis();
    for (const n of this.chart.data.datasets)
      e[F(this.chart.options.indexAxis === `x` ? n.xAxisID : n.yAxisID, t)] = !0;
    return Object.keys(e);
  }
  _getStackIndex(e, t, n) {
    const r = this._getStacks(e, n),
      i = t === void 0 ? -1 : r.indexOf(t);
    return i === -1 ? r.length - 1 : i;
  }
  _getRuler() {
    let e = this.options,
      t = this._cachedMeta,
      n = t.iScale,
      r = [],
      i,
      a;
    for (i = 0, a = t.data.length; i < a; ++i)
      r.push(n.getPixelForValue(this.getParsed(i)[n.axis], i));
    const o = e.barThickness;
    return {
      min: o || yi(t),
      pixels: r,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: e.grouped,
      ratio: o ? 1 : e.categoryPercentage * e.barPercentage,
    };
  }
  _calculateBarValuePixels(e) {
    let {
        _cachedMeta: { vScale: t, _stacked: n, index: r },
        options: { base: i, minBarLength: a },
      } = this,
      o = i || 0,
      s = this.getParsed(e),
      c = s._custom,
      l = Ti(c),
      u = s[t.axis],
      d = 0,
      f = n ? this.applyStack(t, s, n) : u,
      p,
      m;
    f !== u && ((d = f - u), (f = u)),
      l &&
        ((u = c.barStart),
        (f = c.barEnd - c.barStart),
        u !== 0 && Qe(u) !== Qe(c.barEnd) && (d = 0),
        (d += u));
    let h = !M(i) && !l ? i : d,
      g = t.getPixelForValue(h);
    if (
      ((p = this.chart.getDataVisibility(e) ? t.getPixelForValue(d + f) : g),
      (m = p - g),
      Math.abs(m) < a)
    ) {
      (m = Ei(m, t, o) * a), u === o && (g -= m / 2);
      const e = t.getPixelForDecimal(0),
        i = t.getPixelForDecimal(1);
      (g = Math.max(Math.min(g, Math.max(e, i)), Math.min(e, i))),
        (p = g + m),
        n &&
          !l &&
          (s._stacks[t.axis]._visualValues[r] = t.getValueForPixel(p) - t.getValueForPixel(g));
    }
    if (g === t.getPixelForValue(o)) {
      const e = (Qe(m) * t.getLineWidthForValue(o)) / 2;
      (g += e), (m -= e);
    }
    return { size: m, base: g, head: p, center: p + m / 2 };
  }
  _calculateBarIndexPixels(e, t) {
    let n = t.scale,
      r = this.options,
      i = r.skipNull,
      a = F(r.maxBarThickness, 1 / 0),
      o,
      s,
      c = this._getAxisCount();
    if (t.grouped) {
      const n = i ? this._getStackCount(e) : t.stackCount,
        l = r.barThickness === `flex` ? xi(e, t, r, n * c) : bi(e, t, r, n * c),
        u =
          this.chart.options.indexAxis === `x`
            ? this.getDataset().xAxisID
            : this.getDataset().yAxisID,
        d = this._getAxis().indexOf(F(u, this.getFirstScaleIdForIndexAxis())),
        f = this._getStackIndex(this.index, this._cachedMeta.stack, i ? e : void 0) + d;
      (o = l.start + l.chunk * f + l.chunk / 2), (s = Math.min(a, l.chunk * l.ratio));
    } else
      (o = n.getPixelForValue(this.getParsed(e)[n.axis], e)), (s = Math.min(a, t.min * t.ratio));
    return { base: o - s / 2, head: o + s / 2, center: o, size: s };
  }
  draw() {
    let e = this._cachedMeta,
      t = e.vScale,
      n = e.data,
      r = n.length,
      i = 0;
    for (; i < r; ++i) this.getParsed(i)[t.axis] !== null && !n[i].hidden && n[i].draw(this._ctx);
  }
};
function Pi(e, t, n) {
  let r = 1,
    i = 1,
    a = 0,
    o = 0;
  if (t < We) {
    const s = e,
      c = s + t,
      l = Math.cos(s),
      u = Math.sin(s),
      d = Math.cos(c),
      f = Math.sin(c),
      p = (e, t, r) => (pt(e, s, c, !0) ? 1 : Math.max(t, t * n, r, r * n)),
      m = (e, t, r) => (pt(e, s, c, !0) ? -1 : Math.min(t, t * n, r, r * n)),
      h = p(0, l, d),
      g = p(Je, u, f),
      _ = m(R, l, d),
      v = m(R + Je, u, f);
    (r = (h - _) / 2), (i = (g - v) / 2), (a = -(h + _) / 2), (o = -(g + v) / 2);
  }
  return { ratioX: r, ratioY: i, offsetX: a, offsetY: o };
}
var Fi = class extends _i {
    static id = `doughnut`;
    static defaults = {
      datasetElementType: !1,
      dataElementType: `arc`,
      animation: { animateRotate: !0, animateScale: !1 },
      animations: {
        numbers: {
          type: `number`,
          properties: [
            `circumference`,
            `endAngle`,
            `innerRadius`,
            `outerRadius`,
            `startAngle`,
            `x`,
            `y`,
            `offset`,
            `borderWidth`,
            `spacing`,
          ],
        },
      },
      cutout: `50%`,
      rotation: 0,
      circumference: 360,
      radius: `100%`,
      spacing: 0,
      indexAxis: `r`,
    };
    static descriptors = {
      _scriptable: (e) => e !== `spacing`,
      _indexable: (e) =>
        e !== `spacing` && !e.startsWith(`borderDash`) && !e.startsWith(`hoverBorderDash`),
    };
    static overrides = {
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            generateLabels(e) {
              const t = e.data,
                {
                  labels: {
                    pointStyle: n,
                    textAlign: r,
                    color: i,
                    useBorderRadius: a,
                    borderRadius: o,
                  },
                } = e.legend.options;
              return t.labels.length && t.datasets.length
                ? t.labels.map((t, s) => {
                    const c = e.getDatasetMeta(0).controller.getStyle(s);
                    return {
                      text: t,
                      fillStyle: c.backgroundColor,
                      fontColor: i,
                      hidden: !e.getDataVisibility(s),
                      lineDash: c.borderDash,
                      lineDashOffset: c.borderDashOffset,
                      lineJoin: c.borderJoinStyle,
                      lineWidth: c.borderWidth,
                      strokeStyle: c.borderColor,
                      textAlign: r,
                      pointStyle: n,
                      borderRadius: a && (o || c.borderRadius),
                      index: s,
                    };
                  })
                : [];
            },
          },
          onClick(e, t, n) {
            n.chart.toggleDataVisibility(t.index), n.chart.update();
          },
        },
      },
    };
    constructor(e, t) {
      super(e, t),
        (this.enableOptionSharing = !0),
        (this.innerRadius = void 0),
        (this.outerRadius = void 0),
        (this.offsetX = void 0),
        (this.offsetY = void 0);
    }
    linkScales() {}
    parse(e, t) {
      const n = this.getDataset().data,
        r = this._cachedMeta;
      if (this._parsing === !1) r._parsed = n;
      else {
        let i = (e) => +n[e];
        if (P(n[e])) {
          const { key: e = `value` } = this._parsing;
          i = (t) => +Re(n[t], e);
        }
        let a, o;
        for (a = e, o = e + t; a < o; ++a) r._parsed[a] = i(a);
      }
    }
    _getRotation() {
      return ot(this.options.rotation - 90);
    }
    _getCircumference() {
      return ot(this.options.circumference);
    }
    _getRotationExtents() {
      let e = We,
        t = -We;
      for (let n = 0; n < this.chart.data.datasets.length; ++n)
        if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
          const r = this.chart.getDatasetMeta(n).controller,
            i = r._getRotation(),
            a = r._getCircumference();
          (e = Math.min(e, i)), (t = Math.max(t, i + a));
        }
      return { rotation: e, circumference: t - e };
    }
    update(e) {
      const { chartArea: t } = this.chart,
        n = this._cachedMeta,
        r = n.data,
        i = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing,
        a = Math.max((Math.min(t.width, t.height) - i) / 2, 0),
        o = Math.min(Ee(this.options.cutout, a), 1),
        s = this._getRingWeight(this.index),
        { circumference: c, rotation: l } = this._getRotationExtents(),
        { ratioX: u, ratioY: d, offsetX: f, offsetY: p } = Pi(l, c, o),
        m = (t.width - i) / u,
        h = (t.height - i) / d,
        g = Math.max(Math.min(m, h) / 2, 0),
        _ = De(this.options.radius, g),
        v = (_ - Math.max(_ * o, 0)) / this._getVisibleDatasetWeightTotal();
      (this.offsetX = f * _),
        (this.offsetY = p * _),
        (n.total = this.calculateTotal()),
        (this.outerRadius = _ - v * this._getRingWeightOffset(this.index)),
        (this.innerRadius = Math.max(this.outerRadius - v * s, 0)),
        this.updateElements(r, 0, r.length, e);
    }
    _circumference(e, t) {
      const n = this.options,
        r = this._cachedMeta,
        i = this._getCircumference();
      return (t && n.animation.animateRotate) ||
        !this.chart.getDataVisibility(e) ||
        r._parsed[e] === null ||
        r.data[e].hidden
        ? 0
        : this.calculateCircumference((r._parsed[e] * i) / We);
    }
    updateElements(e, t, n, r) {
      let i = r === `reset`,
        a = this.chart,
        o = a.chartArea,
        s = a.options.animation,
        c = (o.left + o.right) / 2,
        l = (o.top + o.bottom) / 2,
        u = i && s.animateScale,
        d = u ? 0 : this.innerRadius,
        f = u ? 0 : this.outerRadius,
        { sharedOptions: p, includeOptions: m } = this._getSharedOptions(t, r),
        h = this._getRotation(),
        g;
      for (g = 0; g < t; ++g) h += this._circumference(g, i);
      for (g = t; g < t + n; ++g) {
        const t = this._circumference(g, i),
          n = e[g],
          a = {
            x: c + this.offsetX,
            y: l + this.offsetY,
            startAngle: h,
            endAngle: h + t,
            circumference: t,
            outerRadius: f,
            innerRadius: d,
          };
        m && (a.options = p || this.resolveDataElementOptions(g, n.active ? `active` : r)),
          (h += t),
          this.updateElement(n, g, a, r);
      }
    }
    calculateTotal() {
      let e = this._cachedMeta,
        t = e.data,
        n = 0,
        r;
      for (r = 0; r < t.length; r++) {
        const i = e._parsed[r];
        i !== null &&
          !isNaN(i) &&
          this.chart.getDataVisibility(r) &&
          !t[r].hidden &&
          (n += Math.abs(i));
      }
      return n;
    }
    calculateCircumference(e) {
      const t = this._cachedMeta.total;
      return t > 0 && !isNaN(e) ? (Math.abs(e) / t) * We : 0;
    }
    getLabelAndValue(e) {
      const t = this._cachedMeta,
        n = this.chart,
        r = n.data.labels || [],
        i = Gt(t._parsed[e], n.options.locale);
      return { label: r[e] || ``, value: i };
    }
    getMaxBorderWidth(e) {
      let t = 0,
        n = this.chart,
        r,
        i,
        a,
        o,
        s;
      if (!e) {
        for (r = 0, i = n.data.datasets.length; r < i; ++r)
          if (n.isDatasetVisible(r)) {
            (a = n.getDatasetMeta(r)), (e = a.data), (o = a.controller);
            break;
          }
      }
      if (!e) return 0;
      for (r = 0, i = e.length; r < i; ++r)
        (s = o.resolveDataElementOptions(r)),
          s.borderAlign !== `inner` &&
            (t = Math.max(t, s.borderWidth || 0, s.hoverBorderWidth || 0));
      return t;
    }
    getMaxOffset(e) {
      let t = 0;
      for (let n = 0, r = e.length; n < r; ++n) {
        const e = this.resolveDataElementOptions(n);
        t = Math.max(t, e.offset || 0, e.hoverOffset || 0);
      }
      return t;
    }
    _getRingWeightOffset(e) {
      let t = 0;
      for (let n = 0; n < e; ++n) this.chart.isDatasetVisible(n) && (t += this._getRingWeight(n));
      return t;
    }
    _getRingWeight(e) {
      return Math.max(F(this.chart.data.datasets[e].weight, 1), 0);
    }
    _getVisibleDatasetWeightTotal() {
      return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
    }
  },
  Ii = class extends _i {
    static id = `line`;
    static defaults = {
      datasetElementType: `line`,
      dataElementType: `point`,
      showLine: !0,
      spanGaps: !1,
    };
    static overrides = { scales: { _index_: { type: `category` }, _value_: { type: `linear` } } };
    initialize() {
      (this.enableOptionSharing = !0), (this.supportsDecimation = !0), super.initialize();
    }
    update(e) {
      let t = this._cachedMeta,
        { dataset: n, data: r = [], _dataset: i } = t,
        a = this.chart._animationsDisabled,
        { start: o, count: s } = At(t, r, a);
      (this._drawStart = o),
        (this._drawCount = s),
        jt(t) && ((o = 0), (s = r.length)),
        (n._chart = this.chart),
        (n._datasetIndex = this.index),
        (n._decimated = !!i._decimated),
        (n.points = r);
      const c = this.resolveDatasetElementOptions(e);
      this.options.showLine || (c.borderWidth = 0),
        (c.segment = this.options.segment),
        this.updateElement(n, void 0, { animated: !a, options: c }, e),
        this.updateElements(r, o, s, e);
    }
    updateElements(e, t, n, r) {
      let i = r === `reset`,
        { iScale: a, vScale: o, _stacked: s, _dataset: c } = this._cachedMeta,
        { sharedOptions: l, includeOptions: u } = this._getSharedOptions(t, r),
        d = a.axis,
        f = o.axis,
        { spanGaps: p, segment: m } = this.options,
        h = rt(p) ? p : 1 / 0,
        g = this.chart._animationsDisabled || i || r === `none`,
        _ = t + n,
        v = e.length,
        y = t > 0 && this.getParsed(t - 1);
      for (let n = 0; n < v; ++n) {
        const p = e[n],
          v = g ? p : {};
        if (n < t || n >= _) {
          v.skip = !0;
          continue;
        }
        const b = this.getParsed(n),
          x = M(b[f]),
          S = (v[d] = a.getPixelForValue(b[d], n)),
          C = (v[f] =
            i || x ? o.getBasePixel() : o.getPixelForValue(s ? this.applyStack(o, b, s) : b[f], n));
        (v.skip = isNaN(S) || isNaN(C) || x),
          (v.stop = n > 0 && Math.abs(b[d] - y[d]) > h),
          m && ((v.parsed = b), (v.raw = c.data[n])),
          u && (v.options = l || this.resolveDataElementOptions(n, p.active ? `active` : r)),
          g || this.updateElement(p, n, v, r),
          (y = b);
      }
    }
    getMaxOverflow() {
      const e = this._cachedMeta,
        t = e.dataset,
        n = (t.options && t.options.borderWidth) || 0,
        r = e.data || [];
      if (!r.length) return n;
      const i = r[0].size(this.resolveDataElementOptions(0)),
        a = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
      return Math.max(n, i, a) / 2;
    }
    draw() {
      const e = this._cachedMeta;
      e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
    }
  },
  Li = class extends _i {
    static id = `polarArea`;
    static defaults = {
      dataElementType: `arc`,
      animation: { animateRotate: !0, animateScale: !0 },
      animations: {
        numbers: {
          type: `number`,
          properties: [`x`, `y`, `startAngle`, `endAngle`, `innerRadius`, `outerRadius`],
        },
      },
      indexAxis: `r`,
      startAngle: 0,
    };
    static overrides = {
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            generateLabels(e) {
              const t = e.data;
              if (t.labels.length && t.datasets.length) {
                const {
                  labels: { pointStyle: n, color: r },
                } = e.legend.options;
                return t.labels.map((t, i) => {
                  const a = e.getDatasetMeta(0).controller.getStyle(i);
                  return {
                    text: t,
                    fillStyle: a.backgroundColor,
                    strokeStyle: a.borderColor,
                    fontColor: r,
                    lineWidth: a.borderWidth,
                    pointStyle: n,
                    hidden: !e.getDataVisibility(i),
                    index: i,
                  };
                });
              }
              return [];
            },
          },
          onClick(e, t, n) {
            n.chart.toggleDataVisibility(t.index), n.chart.update();
          },
        },
      },
      scales: {
        r: {
          type: `radialLinear`,
          angleLines: { display: !1 },
          beginAtZero: !0,
          grid: { circular: !0 },
          pointLabels: { display: !1 },
          startAngle: 0,
        },
      },
    };
    constructor(e, t) {
      super(e, t), (this.innerRadius = void 0), (this.outerRadius = void 0);
    }
    getLabelAndValue(e) {
      const t = this._cachedMeta,
        n = this.chart,
        r = n.data.labels || [],
        i = Gt(t._parsed[e].r, n.options.locale);
      return { label: r[e] || ``, value: i };
    }
    parseObjectData(e, t, n, r) {
      return Yn.bind(this)(e, t, n, r);
    }
    update(e) {
      const t = this._cachedMeta.data;
      this._updateRadius(), this.updateElements(t, 0, t.length, e);
    }
    getMinMax() {
      const e = this._cachedMeta,
        t = { min: 1 / 0, max: -1 / 0 };
      return (
        e.data.forEach((e, n) => {
          const r = this.getParsed(n).r;
          !isNaN(r) &&
            this.chart.getDataVisibility(n) &&
            (r < t.min && (t.min = r), r > t.max && (t.max = r));
        }),
        t
      );
    }
    _updateRadius() {
      const e = this.chart,
        t = e.chartArea,
        n = e.options,
        r = Math.min(t.right - t.left, t.bottom - t.top),
        i = Math.max(r / 2, 0),
        a =
          (i - Math.max(n.cutoutPercentage ? (i / 100) * n.cutoutPercentage : 1, 0)) /
          e.getVisibleDatasetCount();
      (this.outerRadius = i - a * this.index), (this.innerRadius = this.outerRadius - a);
    }
    updateElements(e, t, n, r) {
      let i = r === `reset`,
        a = this.chart,
        o = a.options.animation,
        s = this._cachedMeta.rScale,
        c = s.xCenter,
        l = s.yCenter,
        u = s.getIndexAngle(0) - 0.5 * R,
        d = u,
        f,
        p = 360 / this.countVisibleElements();
      for (f = 0; f < t; ++f) d += this._computeAngle(f, r, p);
      for (f = t; f < t + n; f++) {
        let t = e[f],
          n = d,
          m = d + this._computeAngle(f, r, p),
          h = a.getDataVisibility(f) ? s.getDistanceFromCenterForValue(this.getParsed(f).r) : 0;
        (d = m), i && (o.animateScale && (h = 0), o.animateRotate && (n = m = u));
        const g = {
          x: c,
          y: l,
          innerRadius: 0,
          outerRadius: h,
          startAngle: n,
          endAngle: m,
          options: this.resolveDataElementOptions(f, t.active ? `active` : r),
        };
        this.updateElement(t, f, g, r);
      }
    }
    countVisibleElements() {
      let e = this._cachedMeta,
        t = 0;
      return (
        e.data.forEach((e, n) => {
          !isNaN(this.getParsed(n).r) && this.chart.getDataVisibility(n) && t++;
        }),
        t
      );
    }
    _computeAngle(e, t, n) {
      return this.chart.getDataVisibility(e)
        ? ot(this.resolveDataElementOptions(e, t).angle || n)
        : 0;
    }
  },
  Ri = class extends _i {
    static id = `scatter`;
    static defaults = { datasetElementType: !1, dataElementType: `point`, showLine: !1, fill: !1 };
    static overrides = {
      interaction: { mode: `point` },
      scales: { x: { type: `linear` }, y: { type: `linear` } },
    };
    getLabelAndValue(e) {
      const t = this._cachedMeta,
        n = this.chart.data.labels || [],
        { xScale: r, yScale: i } = t,
        a = this.getParsed(e),
        o = r.getLabelForValue(a.x),
        s = i.getLabelForValue(a.y);
      return { label: n[e] || ``, value: `(` + o + `, ` + s + `)` };
    }
    update(e) {
      let t = this._cachedMeta,
        { data: n = [] } = t,
        r = this.chart._animationsDisabled,
        { start: i, count: a } = At(t, n, r);
      if (
        ((this._drawStart = i),
        (this._drawCount = a),
        jt(t) && ((i = 0), (a = n.length)),
        this.options.showLine)
      ) {
        this.datasetElementType || this.addElements();
        const { dataset: i, _dataset: a } = t;
        (i._chart = this.chart),
          (i._datasetIndex = this.index),
          (i._decimated = !!a._decimated),
          (i.points = n);
        const o = this.resolveDatasetElementOptions(e);
        (o.segment = this.options.segment),
          this.updateElement(i, void 0, { animated: !r, options: o }, e);
      } else this.datasetElementType &&= (delete t.dataset, !1);
      this.updateElements(n, i, a, e);
    }
    addElements() {
      const { showLine: e } = this.options;
      !this.datasetElementType &&
        e &&
        (this.datasetElementType = this.chart.registry.getElement(`line`)),
        super.addElements();
    }
    updateElements(e, t, n, r) {
      let i = r === `reset`,
        { iScale: a, vScale: o, _stacked: s, _dataset: c } = this._cachedMeta,
        l = this.resolveDataElementOptions(t, r),
        u = this.getSharedOptions(l),
        d = this.includeOptions(r, u),
        f = a.axis,
        p = o.axis,
        { spanGaps: m, segment: h } = this.options,
        g = rt(m) ? m : 1 / 0,
        _ = this.chart._animationsDisabled || i || r === `none`,
        v = t > 0 && this.getParsed(t - 1);
      for (let l = t; l < t + n; ++l) {
        const t = e[l],
          n = this.getParsed(l),
          m = _ ? t : {},
          y = M(n[p]),
          b = (m[f] = a.getPixelForValue(n[f], l)),
          x = (m[p] =
            i || y ? o.getBasePixel() : o.getPixelForValue(s ? this.applyStack(o, n, s) : n[p], l));
        (m.skip = isNaN(b) || isNaN(x) || y),
          (m.stop = l > 0 && Math.abs(n[f] - v[f]) > g),
          h && ((m.parsed = n), (m.raw = c.data[l])),
          d && (m.options = u || this.resolveDataElementOptions(l, t.active ? `active` : r)),
          _ || this.updateElement(t, l, m, r),
          (v = n);
      }
      this.updateSharedOptions(u, r, l);
    }
    getMaxOverflow() {
      const e = this._cachedMeta,
        t = e.data || [];
      if (!this.options.showLine) {
        let e = 0;
        for (let n = t.length - 1; n >= 0; --n)
          e = Math.max(e, t[n].size(this.resolveDataElementOptions(n)) / 2);
        return e > 0 && e;
      }
      const n = e.dataset,
        r = (n.options && n.options.borderWidth) || 0;
      if (!t.length) return r;
      const i = t[0].size(this.resolveDataElementOptions(0)),
        a = t[t.length - 1].size(this.resolveDataElementOptions(t.length - 1));
      return Math.max(r, i, a) / 2;
    }
  };
function zi() {
  throw Error(`This method is not implemented: Check that a complete date adapter is provided.`);
}
var Bi = {
  _date: class e {
    static override(t) {
      Object.assign(e.prototype, t);
    }
    options;
    constructor(e) {
      this.options = e || {};
    }
    init() {}
    formats() {
      return zi();
    }
    parse() {
      return zi();
    }
    format() {
      return zi();
    }
    add() {
      return zi();
    }
    diff() {
      return zi();
    }
    startOf() {
      return zi();
    }
    endOf() {
      return zi();
    }
  },
};
function Vi(e, t, n, r) {
  const { controller: i, data: a, _sorted: o } = e,
    s = i._cachedMeta.iScale,
    c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (s && t === s.axis && t !== `r` && o && a.length) {
    const o = s._reversePixels ? yt : vt;
    if (!r) {
      const r = o(a, t, n);
      if (c) {
        const { vScale: t } = i._cachedMeta,
          { _parsed: n } = e,
          a = n
            .slice(0, r.lo + 1)
            .reverse()
            .findIndex((e) => !M(e[t.axis]));
        r.lo -= Math.max(0, a);
        const o = n.slice(r.hi).findIndex((e) => !M(e[t.axis]));
        r.hi += Math.max(0, o);
      }
      return r;
    } else if (i._sharedOptions) {
      const e = a[0],
        r = typeof e.getRange == `function` && e.getRange(t);
      if (r) {
        const e = o(a, t, n - r),
          i = o(a, t, n + r);
        return { lo: e.lo, hi: i.hi };
      }
    }
  }
  return { lo: 0, hi: a.length - 1 };
}
function Hi(e, t, n, r, i) {
  const a = e.getSortedVisibleDatasetMetas(),
    o = n[t];
  for (let e = 0, n = a.length; e < n; ++e) {
    const { index: n, data: s } = a[e],
      { lo: c, hi: l } = Vi(a[e], t, o, i);
    for (let e = c; e <= l; ++e) {
      const t = s[e];
      t.skip || r(t, n, e);
    }
  }
}
function Ui(e) {
  const t = e.indexOf(`x`) !== -1,
    n = e.indexOf(`y`) !== -1;
  return function (e, r) {
    const i = t ? Math.abs(e.x - r.x) : 0,
      a = n ? Math.abs(e.y - r.y) : 0;
    return Math.sqrt(i ** 2 + a ** 2);
  };
}
function Wi(e, t, n, r, i) {
  const a = [];
  return (
    (!i && !e.isPointInArea(t)) ||
      Hi(
        e,
        n,
        t,
        function (n, o, s) {
          (!i && !cn(n, e.chartArea, 0)) ||
            (n.inRange(t.x, t.y, r) && a.push({ element: n, datasetIndex: o, index: s }));
        },
        !0,
      ),
    a
  );
}
function Gi(e, t, n, r) {
  const i = [];
  function a(e, n, a) {
    const { startAngle: o, endAngle: s } = e.getProps([`startAngle`, `endAngle`], r),
      { angle: c } = lt(e, { x: t.x, y: t.y });
    pt(c, o, s) && i.push({ element: e, datasetIndex: n, index: a });
  }
  return Hi(e, n, t, a), i;
}
function Ki(e, t, n, r, i, a) {
  let o = [],
    s = Ui(n),
    c = 1 / 0;
  function l(n, l, u) {
    const d = n.inRange(t.x, t.y, i);
    if (r && !d) return;
    const f = n.getCenterPoint(i);
    if (!(a || e.isPointInArea(f)) && !d) return;
    const p = s(t, f);
    p < c
      ? ((o = [{ element: n, datasetIndex: l, index: u }]), (c = p))
      : p === c && o.push({ element: n, datasetIndex: l, index: u });
  }
  return Hi(e, n, t, l), o;
}
function qi(e, t, n, r, i, a) {
  return !a && !e.isPointInArea(t) ? [] : n === `r` && !r ? Gi(e, t, n, i) : Ki(e, t, n, r, i, a);
}
function Ji(e, t, n, r, i) {
  let a = [],
    o = n === `x` ? `inXRange` : `inYRange`,
    s = !1;
  return (
    Hi(e, n, t, (e, r, c) => {
      e[o] &&
        e[o](t[n], i) &&
        (a.push({ element: e, datasetIndex: r, index: c }), (s ||= e.inRange(t.x, t.y, i)));
    }),
    r && !s ? [] : a
  );
}
var Yi = {
    evaluateInteractionItems: Hi,
    modes: {
      index(e, t, n, r) {
        const i = hr(t, e),
          a = n.axis || `x`,
          o = n.includeInvisible || !1,
          s = n.intersect ? Wi(e, i, a, r, o) : qi(e, i, a, !1, r, o),
          c = [];
        return s.length
          ? (e.getSortedVisibleDatasetMetas().forEach((e) => {
              const t = s[0].index,
                n = e.data[t];
              n && !n.skip && c.push({ element: n, datasetIndex: e.index, index: t });
            }),
            c)
          : [];
      },
      dataset(e, t, n, r) {
        let i = hr(t, e),
          a = n.axis || `xy`,
          o = n.includeInvisible || !1,
          s = n.intersect ? Wi(e, i, a, r, o) : qi(e, i, a, !1, r, o);
        if (s.length > 0) {
          const t = s[0].datasetIndex,
            n = e.getDatasetMeta(t).data;
          s = [];
          for (let e = 0; e < n.length; ++e) s.push({ element: n[e], datasetIndex: t, index: e });
        }
        return s;
      },
      point(e, t, n, r) {
        return Wi(e, hr(t, e), n.axis || `xy`, r, n.includeInvisible || !1);
      },
      nearest(e, t, n, r) {
        const i = hr(t, e),
          a = n.axis || `xy`,
          o = n.includeInvisible || !1;
        return qi(e, i, a, n.intersect, r, o);
      },
      x(e, t, n, r) {
        return Ji(e, hr(t, e), `x`, n.intersect, r);
      },
      y(e, t, n, r) {
        return Ji(e, hr(t, e), `y`, n.intersect, r);
      },
    },
  },
  Xi = [`left`, `top`, `right`, `bottom`];
function Zi(e, t) {
  return e.filter((e) => e.pos === t);
}
function Qi(e, t) {
  return e.filter((e) => Xi.indexOf(e.pos) === -1 && e.box.axis === t);
}
function $i(e, t) {
  return e.sort((e, n) => {
    const r = t ? n : e,
      i = t ? e : n;
    return r.weight === i.weight ? r.index - i.index : r.weight - i.weight;
  });
}
function ea(e) {
  let t = [],
    n,
    r,
    i,
    a,
    o,
    s;
  for (n = 0, r = (e || []).length; n < r; ++n)
    (i = e[n]),
      ({
        position: a,
        options: { stack: o, stackWeight: s = 1 },
      } = i),
      t.push({
        index: n,
        box: i,
        pos: a,
        horizontal: i.isHorizontal(),
        weight: i.weight,
        stack: o && a + o,
        stackWeight: s,
      });
  return t;
}
function ta(e) {
  const t = {};
  for (const n of e) {
    const { stack: e, pos: r, stackWeight: i } = n;
    if (!e || !Xi.includes(r)) continue;
    const a = t[e] || (t[e] = { count: 0, placed: 0, weight: 0, size: 0 });
    a.count++, (a.weight += i);
  }
  return t;
}
function na(e, t) {
  let n = ta(e),
    { vBoxMaxWidth: r, hBoxMaxHeight: i } = t,
    a,
    o,
    s;
  for (a = 0, o = e.length; a < o; ++a) {
    s = e[a];
    const { fullSize: o } = s.box,
      c = n[s.stack],
      l = c && s.stackWeight / c.weight;
    s.horizontal
      ? ((s.width = l ? l * r : o && t.availableWidth), (s.height = i))
      : ((s.width = r), (s.height = l ? l * i : o && t.availableHeight));
  }
  return n;
}
function ra(e) {
  const t = ea(e),
    n = $i(
      t.filter((e) => e.box.fullSize),
      !0,
    ),
    r = $i(Zi(t, `left`), !0),
    i = $i(Zi(t, `right`)),
    a = $i(Zi(t, `top`), !0),
    o = $i(Zi(t, `bottom`)),
    s = Qi(t, `x`),
    c = Qi(t, `y`);
  return {
    fullSize: n,
    leftAndTop: r.concat(a),
    rightAndBottom: i.concat(c).concat(o).concat(s),
    chartArea: Zi(t, `chartArea`),
    vertical: r.concat(i).concat(c),
    horizontal: a.concat(o).concat(s),
  };
}
function ia(e, t, n, r) {
  return Math.max(e[n], t[n]) + Math.max(e[r], t[r]);
}
function aa(e, t) {
  (e.top = Math.max(e.top, t.top)),
    (e.left = Math.max(e.left, t.left)),
    (e.bottom = Math.max(e.bottom, t.bottom)),
    (e.right = Math.max(e.right, t.right));
}
function oa(e, t, n, r) {
  const { pos: i, box: a } = n,
    o = e.maxPadding;
  if (!P(i)) {
    n.size && (e[i] -= n.size);
    const t = r[n.stack] || { size: 0, count: 1 };
    (t.size = Math.max(t.size, n.horizontal ? a.height : a.width)),
      (n.size = t.size / t.count),
      (e[i] += n.size);
  }
  a.getPadding && aa(o, a.getPadding());
  const s = Math.max(0, t.outerWidth - ia(o, e, `left`, `right`)),
    c = Math.max(0, t.outerHeight - ia(o, e, `top`, `bottom`)),
    l = s !== e.w,
    u = c !== e.h;
  return (e.w = s), (e.h = c), n.horizontal ? { same: l, other: u } : { same: u, other: l };
}
function sa(e) {
  const t = e.maxPadding;
  function n(n) {
    const r = Math.max(t[n] - e[n], 0);
    return (e[n] += r), r;
  }
  (e.y += n(`top`)), (e.x += n(`left`)), n(`right`), n(`bottom`);
}
function ca(e, t) {
  const n = t.maxPadding;
  function r(e) {
    const r = { left: 0, top: 0, right: 0, bottom: 0 };
    return (
      e.forEach((e) => {
        r[e] = Math.max(t[e], n[e]);
      }),
      r
    );
  }
  return r(e ? [`left`, `right`] : [`top`, `bottom`]);
}
function la(e, t, n, r) {
  let i = [],
    a,
    o,
    s,
    c,
    l,
    u;
  for (a = 0, o = e.length, l = 0; a < o; ++a) {
    (s = e[a]), (c = s.box), c.update(s.width || t.w, s.height || t.h, ca(s.horizontal, t));
    const { same: o, other: d } = oa(t, n, s, r);
    (l |= o && i.length), (u ||= d), c.fullSize || i.push(s);
  }
  return (l && la(i, t, n, r)) || u;
}
function ua(e, t, n, r, i) {
  (e.top = n), (e.left = t), (e.right = t + r), (e.bottom = n + i), (e.width = r), (e.height = i);
}
function da(e, t, n, r) {
  let i = n.padding,
    { x: a, y: o } = t;
  for (const s of e) {
    const e = s.box,
      c = r[s.stack] || { count: 1, placed: 0, weight: 1 },
      l = s.stackWeight / c.weight || 1;
    if (s.horizontal) {
      const r = t.w * l,
        a = c.size || e.height;
      Be(c.start) && (o = c.start),
        e.fullSize
          ? ua(e, i.left, o, n.outerWidth - i.right - i.left, a)
          : ua(e, t.left + c.placed, o, r, a),
        (c.start = o),
        (c.placed += r),
        (o = e.bottom);
    } else {
      const r = t.h * l,
        o = c.size || e.width;
      Be(c.start) && (a = c.start),
        e.fullSize
          ? ua(e, a, i.top, o, n.outerHeight - i.bottom - i.top)
          : ua(e, a, t.top + c.placed, o, r),
        (c.start = a),
        (c.placed += r),
        (a = e.right);
    }
  }
  (t.x = a), (t.y = o);
}
var fa = {
    addBox(e, t) {
      (e.boxes ||= []),
        (t.fullSize = t.fullSize || !1),
        (t.position = t.position || `top`),
        (t.weight = t.weight || 0),
        (t._layers =
          t._layers ||
          function () {
            return [
              {
                z: 0,
                draw(e) {
                  t.draw(e);
                },
              },
            ];
          }),
        e.boxes.push(t);
    },
    removeBox(e, t) {
      const n = e.boxes ? e.boxes.indexOf(t) : -1;
      n !== -1 && e.boxes.splice(n, 1);
    },
    configure(e, t, n) {
      (t.fullSize = n.fullSize), (t.position = n.position), (t.weight = n.weight);
    },
    update(e, t, n, r) {
      if (!e) return;
      const i = Tn(e.options.layout.padding),
        a = Math.max(t - i.width, 0),
        o = Math.max(n - i.height, 0),
        s = ra(e.boxes),
        c = s.vertical,
        l = s.horizontal;
      L(e.boxes, (e) => {
        typeof e.beforeLayout == `function` && e.beforeLayout();
      });
      const u =
          c.reduce((e, t) => (t.box.options && t.box.options.display === !1 ? e : e + 1), 0) || 1,
        d = Object.freeze({
          outerWidth: t,
          outerHeight: n,
          padding: i,
          availableWidth: a,
          availableHeight: o,
          vBoxMaxWidth: a / 2 / u,
          hBoxMaxHeight: o / 2,
        }),
        f = Object.assign({}, i);
      aa(f, Tn(r));
      const p = Object.assign({ maxPadding: f, w: a, h: o, x: i.left, y: i.top }, i),
        m = na(c.concat(l), d);
      la(s.fullSize, p, d, m),
        la(c, p, d, m),
        la(l, p, d, m) && la(c, p, d, m),
        sa(p),
        da(s.leftAndTop, p, d, m),
        (p.x += p.w),
        (p.y += p.h),
        da(s.rightAndBottom, p, d, m),
        (e.chartArea = {
          left: p.left,
          top: p.top,
          right: p.left + p.w,
          bottom: p.top + p.h,
          height: p.h,
          width: p.w,
        }),
        L(s.chartArea, (t) => {
          const n = t.box;
          Object.assign(n, e.chartArea),
            n.update(p.w, p.h, { left: 0, top: 0, right: 0, bottom: 0 });
        });
    },
  },
  pa = class {
    acquireContext(e, t) {}
    releaseContext(e) {
      return !1;
    }
    addEventListener(e, t, n) {}
    removeEventListener(e, t, n) {}
    getDevicePixelRatio() {
      return 1;
    }
    getMaximumSize(e, t, n, r) {
      return (
        (t = Math.max(0, t || e.width)),
        (n ||= e.height),
        { width: t, height: Math.max(0, r ? Math.floor(t / r) : n) }
      );
    }
    isAttached(e) {
      return !0;
    }
    updateConfig(e) {}
  },
  ma = class extends pa {
    acquireContext(e) {
      return (e && e.getContext && e.getContext(`2d`)) || null;
    }
    updateConfig(e) {
      e.options.animation = !1;
    }
  },
  ha = `$chartjs`,
  ga = {
    touchstart: `mousedown`,
    touchmove: `mousemove`,
    touchend: `mouseup`,
    pointerenter: `mouseenter`,
    pointerdown: `mousedown`,
    pointermove: `mousemove`,
    pointerup: `mouseup`,
    pointerleave: `mouseout`,
    pointerout: `mouseout`,
  },
  _a = (e) => e === null || e === ``;
function va(e, t) {
  const n = e.style,
    r = e.getAttribute(`height`),
    i = e.getAttribute(`width`);
  if (
    ((e[ha] = {
      initial: {
        height: r,
        width: i,
        style: { display: n.display, height: n.height, width: n.width },
      },
    }),
    (n.display = n.display || `block`),
    (n.boxSizing = n.boxSizing || `border-box`),
    _a(i))
  ) {
    const t = xr(e, `width`);
    t !== void 0 && (e.width = t);
  }
  if (_a(r))
    if (e.style.height === ``) e.height = e.width / (t || 2);
    else {
      const t = xr(e, `height`);
      t !== void 0 && (e.height = t);
    }
  return e;
}
var ya = br ? { passive: !0 } : !1;
function ba(e, t, n) {
  e && e.addEventListener(t, n, ya);
}
function xa(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, ya);
}
function Sa(e, t) {
  const n = ga[e.type] || e.type,
    { x: r, y: i } = hr(e, t);
  return { type: n, chart: t, native: e, x: r === void 0 ? null : r, y: i === void 0 ? null : i };
}
function Ca(e, t) {
  for (const n of e) if (n === t || n.contains(t)) return !0;
}
function wa(e, t, n) {
  const r = e.canvas,
    i = new MutationObserver((e) => {
      let t = !1;
      for (const n of e) (t ||= Ca(n.addedNodes, r)), (t &&= !Ca(n.removedNodes, r));
      t && n();
    });
  return i.observe(document, { childList: !0, subtree: !0 }), i;
}
function Ta(e, t, n) {
  const r = e.canvas,
    i = new MutationObserver((e) => {
      let t = !1;
      for (const n of e) (t ||= Ca(n.removedNodes, r)), (t &&= !Ca(n.addedNodes, r));
      t && n();
    });
  return i.observe(document, { childList: !0, subtree: !0 }), i;
}
var Ea = new Map(),
  Da = 0;
function Oa() {
  const e = window.devicePixelRatio;
  e !== Da &&
    ((Da = e),
    Ea.forEach((t, n) => {
      n.currentDevicePixelRatio !== e && t();
    }));
}
function ka(e, t) {
  Ea.size || window.addEventListener(`resize`, Oa), Ea.set(e, t);
}
function Aa(e) {
  Ea.delete(e), Ea.size || window.removeEventListener(`resize`, Oa);
}
function ja(e, t, n) {
  const r = e.canvas,
    i = r && sr(r);
  if (!i) return;
  const a = Et((e, t) => {
      const r = i.clientWidth;
      n(e, t), r < i.clientWidth && n();
    }, window),
    o = new ResizeObserver((e) => {
      const t = e[0],
        n = t.contentRect.width,
        r = t.contentRect.height;
      (n === 0 && r === 0) || a(n, r);
    });
  return o.observe(i), ka(e, a), o;
}
function Ma(e, t, n) {
  n && n.disconnect(), t === `resize` && Aa(e);
}
function Na(e, t, n) {
  const r = e.canvas,
    i = Et((t) => {
      e.ctx !== null && n(Sa(t, e));
    }, e);
  return ba(r, t, i), i;
}
var Pa = class extends pa {
  acquireContext(e, t) {
    const n = e && e.getContext && e.getContext(`2d`);
    return n && n.canvas === e ? (va(e, t), n) : null;
  }
  releaseContext(e) {
    const t = e.canvas;
    if (!t[ha]) return !1;
    const n = t[ha].initial;
    [`height`, `width`].forEach((e) => {
      const r = n[e];
      M(r) ? t.removeAttribute(e) : t.setAttribute(e, r);
    });
    const r = n.style || {};
    return (
      Object.keys(r).forEach((e) => {
        t.style[e] = r[e];
      }),
      (t.width = t.width),
      delete t[ha],
      !0
    );
  }
  addEventListener(e, t, n) {
    this.removeEventListener(e, t);
    const r = (e.$proxies ||= {});
    r[t] = ({ attach: wa, detach: Ta, resize: ja }[t] || Na)(e, t, n);
  }
  removeEventListener(e, t) {
    const n = (e.$proxies ||= {}),
      r = n[t];
    r && (({ attach: Ma, detach: Ma, resize: Ma }[t] || xa)(e, t, r), (n[t] = void 0));
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, t, n, r) {
    return vr(e, t, n, r);
  }
  isAttached(e) {
    const t = e && sr(e);
    return !!(t && t.isConnected);
  }
};
function Fa(e) {
  return !or() || (typeof OffscreenCanvas < `u` && e instanceof OffscreenCanvas) ? ma : Pa;
}
var Ia = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(e) {
    const { x: t, y: n } = this.getProps([`x`, `y`], e);
    return { x: t, y: n };
  }
  hasValue() {
    return rt(this.x) && rt(this.y);
  }
  getProps(e, t) {
    const n = this.$animations;
    if (!t || !n) return this;
    const r = {};
    return (
      e.forEach((e) => {
        r[e] = n[e] && n[e].active() ? n[e]._to : this[e];
      }),
      r
    );
  }
};
function La(e, t) {
  const n = e.options.ticks,
    r = Ra(e),
    i = Math.min(n.maxTicksLimit || r, r),
    a = n.major.enabled ? Ba(t) : [],
    o = a.length,
    s = a[0],
    c = a[o - 1],
    l = [];
  if (o > i) return Va(t, l, a, o / i), l;
  const u = za(a, t, i);
  if (o > 0) {
    let e,
      n,
      r = o > 1 ? Math.round((c - s) / (o - 1)) : null;
    for (Ha(t, l, u, M(r) ? 0 : s - r, s), e = 0, n = o - 1; e < n; e++)
      Ha(t, l, u, a[e], a[e + 1]);
    return Ha(t, l, u, c, M(r) ? t.length : c + r), l;
  }
  return Ha(t, l, u), l;
}
function Ra(e) {
  const t = e.options.offset,
    n = e._tickSize(),
    r = e._length / n + +!t,
    i = e._maxLength / n;
  return Math.floor(Math.min(r, i));
}
function za(e, t, n) {
  const r = Ua(e),
    i = t.length / n;
  if (!r) return Math.max(i, 1);
  const a = tt(r);
  for (let e = 0, t = a.length - 1; e < t; e++) {
    const t = a[e];
    if (t > i) return t;
  }
  return Math.max(i, 1);
}
function Ba(e) {
  let t = [],
    n,
    r;
  for (n = 0, r = e.length; n < r; n++) e[n].major && t.push(n);
  return t;
}
function Va(e, t, n, r) {
  let i = 0,
    a = n[0],
    o;
  for (r = Math.ceil(r), o = 0; o < e.length; o++) o === a && (t.push(e[o]), i++, (a = n[i * r]));
}
function Ha(e, t, n, r, i) {
  let a = F(r, 0),
    o = Math.min(F(i, e.length), e.length),
    s = 0,
    c,
    l,
    u;
  for (n = Math.ceil(n), i && ((c = i - r), (n = c / Math.floor(c / n))), u = a; u < 0; )
    s++, (u = Math.round(a + s * n));
  for (l = Math.max(a, 0); l < o; l++) l === u && (t.push(e[l]), s++, (u = Math.round(a + s * n)));
}
function Ua(e) {
  let t = e.length,
    n,
    r;
  if (t < 2) return !1;
  for (r = e[0], n = 1; n < t; ++n) if (e[n] - e[n - 1] !== r) return !1;
  return r;
}
var Wa = (e) => (e === `left` ? `right` : e === `right` ? `left` : e),
  Ga = (e, t, n) => (t === `top` || t === `left` ? e[t] + n : e[t] - n),
  Ka = (e, t) => Math.min(t || e, e);
function qa(e, t) {
  let n = [],
    r = e.length / t,
    i = e.length,
    a = 0;
  for (; a < i; a += r) n.push(e[Math.floor(a)]);
  return n;
}
function Ja(e, t, n) {
  let r = e.ticks.length,
    i = Math.min(t, r - 1),
    a = e._startPixel,
    o = e._endPixel,
    s = 1e-6,
    c = e.getPixelForTick(i),
    l;
  if (
    !(
      n &&
      ((l =
        r === 1
          ? Math.max(c - a, o - c)
          : t === 0
            ? (e.getPixelForTick(1) - c) / 2
            : (c - e.getPixelForTick(i - 1)) / 2),
      (c += i < t ? l : -l),
      c < a - s || c > o + s)
    )
  )
    return c;
}
function Ya(e, t) {
  L(e, (e) => {
    let n = e.gc,
      r = n.length / 2,
      i;
    if (r > t) {
      for (i = 0; i < r; ++i) delete e.data[n[i]];
      n.splice(0, r);
    }
  });
}
function Xa(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Za(e, t) {
  if (!e.display) return 0;
  const n = En(e.font, t),
    r = Tn(e.padding);
  return (N(e.text) ? e.text.length : 1) * n.lineHeight + r.height;
}
function Qa(e, t) {
  return kn(e, { scale: t, type: `scale` });
}
function $a(e, t, n) {
  return kn(e, { tick: n, index: t, type: `tick` });
}
function eo(e, t, n) {
  let r = Ot(e);
  return ((n && t !== `right`) || (!n && t === `right`)) && (r = Wa(r)), r;
}
function to(e, t, n, r) {
  let { top: i, left: a, bottom: o, right: s, chart: c } = e,
    { chartArea: l, scales: u } = c,
    d = 0,
    f,
    p,
    m,
    h = o - i,
    g = s - a;
  if (e.isHorizontal()) {
    if (((p = kt(r, a, s)), P(n))) {
      const e = Object.keys(n)[0],
        r = n[e];
      m = u[e].getPixelForValue(r) + h - t;
    } else m = n === `center` ? (l.bottom + l.top) / 2 + h - t : Ga(e, n, t);
    f = s - a;
  } else {
    if (P(n)) {
      const e = Object.keys(n)[0],
        r = n[e];
      p = u[e].getPixelForValue(r) - g + t;
    } else p = n === `center` ? (l.left + l.right) / 2 - g + t : Ga(e, n, t);
    (m = kt(r, o, i)), (d = n === `left` ? -Je : Je);
  }
  return { titleX: p, titleY: m, maxWidth: f, rotation: d };
}
var no = class e extends Ia {
    constructor(e) {
      super(),
        (this.id = e.id),
        (this.type = e.type),
        (this.options = void 0),
        (this.ctx = e.ctx),
        (this.chart = e.chart),
        (this.top = void 0),
        (this.bottom = void 0),
        (this.left = void 0),
        (this.right = void 0),
        (this.width = void 0),
        (this.height = void 0),
        (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
        (this.maxWidth = void 0),
        (this.maxHeight = void 0),
        (this.paddingTop = void 0),
        (this.paddingBottom = void 0),
        (this.paddingLeft = void 0),
        (this.paddingRight = void 0),
        (this.axis = void 0),
        (this.labelRotation = void 0),
        (this.min = void 0),
        (this.max = void 0),
        (this._range = void 0),
        (this.ticks = []),
        (this._gridLineItems = null),
        (this._labelItems = null),
        (this._labelSizes = null),
        (this._length = 0),
        (this._maxLength = 0),
        (this._longestTextCache = {}),
        (this._startPixel = void 0),
        (this._endPixel = void 0),
        (this._reversePixels = !1),
        (this._userMax = void 0),
        (this._userMin = void 0),
        (this._suggestedMax = void 0),
        (this._suggestedMin = void 0),
        (this._ticksLength = 0),
        (this._borderValue = 0),
        (this._cache = {}),
        (this._dataLimitsCached = !1),
        (this.$context = void 0);
    }
    init(e) {
      (this.options = e.setContext(this.getContext())),
        (this.axis = e.axis),
        (this._userMin = this.parse(e.min)),
        (this._userMax = this.parse(e.max)),
        (this._suggestedMin = this.parse(e.suggestedMin)),
        (this._suggestedMax = this.parse(e.suggestedMax));
    }
    parse(e, t) {
      return e;
    }
    getUserBounds() {
      let { _userMin: e, _userMax: t, _suggestedMin: n, _suggestedMax: r } = this;
      return (
        (e = Te(e, 1 / 0)),
        (t = Te(t, -1 / 0)),
        (n = Te(n, 1 / 0)),
        (r = Te(r, -1 / 0)),
        { min: Te(e, n), max: Te(t, r), minDefined: we(e), maxDefined: we(t) }
      );
    }
    getMinMax(e) {
      let { min: t, max: n, minDefined: r, maxDefined: i } = this.getUserBounds(),
        a;
      if (r && i) return { min: t, max: n };
      const o = this.getMatchingVisibleMetas();
      for (let s = 0, c = o.length; s < c; ++s)
        (a = o[s].controller.getMinMax(this, e)),
          r || (t = Math.min(t, a.min)),
          i || (n = Math.max(n, a.max));
      return (
        (t = i && t > n ? n : t),
        (n = r && t > n ? t : n),
        { min: Te(t, Te(n, t)), max: Te(n, Te(t, n)) }
      );
    }
    getPadding() {
      return {
        left: this.paddingLeft || 0,
        top: this.paddingTop || 0,
        right: this.paddingRight || 0,
        bottom: this.paddingBottom || 0,
      };
    }
    getTicks() {
      return this.ticks;
    }
    getLabels() {
      const e = this.chart.data;
      return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
    }
    getLabelItems(e = this.chart.chartArea) {
      return (this._labelItems ||= this._computeLabelItems(e));
    }
    beforeLayout() {
      (this._cache = {}), (this._dataLimitsCached = !1);
    }
    beforeUpdate() {
      I(this.options.beforeUpdate, [this]);
    }
    update(e, t, n) {
      const { beginAtZero: r, grace: i, ticks: a } = this.options,
        o = a.sampleSize;
      this.beforeUpdate(),
        (this.maxWidth = e),
        (this.maxHeight = t),
        (this._margins = n = Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, n)),
        (this.ticks = null),
        (this._labelSizes = null),
        (this._gridLineItems = null),
        (this._labelItems = null),
        this.beforeSetDimensions(),
        this.setDimensions(),
        this.afterSetDimensions(),
        (this._maxLength = this.isHorizontal()
          ? this.width + n.left + n.right
          : this.height + n.top + n.bottom),
        (this._dataLimitsCached ||=
          (this.beforeDataLimits(),
          this.determineDataLimits(),
          this.afterDataLimits(),
          (this._range = On(this, i, r)),
          !0)),
        this.beforeBuildTicks(),
        (this.ticks = this.buildTicks() || []),
        this.afterBuildTicks();
      const s = o < this.ticks.length;
      this._convertTicksToLabels(s ? qa(this.ticks, o) : this.ticks),
        this.configure(),
        this.beforeCalculateLabelRotation(),
        this.calculateLabelRotation(),
        this.afterCalculateLabelRotation(),
        a.display &&
          (a.autoSkip || a.source === `auto`) &&
          ((this.ticks = La(this, this.ticks)), (this._labelSizes = null), this.afterAutoSkip()),
        s && this._convertTicksToLabels(this.ticks),
        this.beforeFit(),
        this.fit(),
        this.afterFit(),
        this.afterUpdate();
    }
    configure() {
      let e = this.options.reverse,
        t,
        n;
      this.isHorizontal()
        ? ((t = this.left), (n = this.right))
        : ((t = this.top), (n = this.bottom), (e = !e)),
        (this._startPixel = t),
        (this._endPixel = n),
        (this._reversePixels = e),
        (this._length = n - t),
        (this._alignToPixels = this.options.alignToPixels);
    }
    afterUpdate() {
      I(this.options.afterUpdate, [this]);
    }
    beforeSetDimensions() {
      I(this.options.beforeSetDimensions, [this]);
    }
    setDimensions() {
      this.isHorizontal()
        ? ((this.width = this.maxWidth), (this.left = 0), (this.right = this.width))
        : ((this.height = this.maxHeight), (this.top = 0), (this.bottom = this.height)),
        (this.paddingLeft = 0),
        (this.paddingTop = 0),
        (this.paddingRight = 0),
        (this.paddingBottom = 0);
    }
    afterSetDimensions() {
      I(this.options.afterSetDimensions, [this]);
    }
    _callHooks(e) {
      this.chart.notifyPlugins(e, this.getContext()), I(this.options[e], [this]);
    }
    beforeDataLimits() {
      this._callHooks(`beforeDataLimits`);
    }
    determineDataLimits() {}
    afterDataLimits() {
      this._callHooks(`afterDataLimits`);
    }
    beforeBuildTicks() {
      this._callHooks(`beforeBuildTicks`);
    }
    buildTicks() {
      return [];
    }
    afterBuildTicks() {
      this._callHooks(`afterBuildTicks`);
    }
    beforeTickToLabelConversion() {
      I(this.options.beforeTickToLabelConversion, [this]);
    }
    generateTickLabels(e) {
      let t = this.options.ticks,
        n,
        r,
        i;
      for (n = 0, r = e.length; n < r; n++)
        (i = e[n]), (i.label = I(t.callback, [i.value, n, e], this));
    }
    afterTickToLabelConversion() {
      I(this.options.afterTickToLabelConversion, [this]);
    }
    beforeCalculateLabelRotation() {
      I(this.options.beforeCalculateLabelRotation, [this]);
    }
    calculateLabelRotation() {
      let e = this.options,
        t = e.ticks,
        n = Ka(this.ticks.length, e.ticks.maxTicksLimit),
        r = t.minRotation || 0,
        i = t.maxRotation,
        a = r,
        o,
        s,
        c;
      if (!this._isVisible() || !t.display || r >= i || n <= 1 || !this.isHorizontal()) {
        this.labelRotation = r;
        return;
      }
      const l = this._getLabelSizes(),
        u = l.widest.width,
        d = l.highest.height,
        f = mt(this.chart.width - u, 0, this.maxWidth);
      (o = e.offset ? this.maxWidth / n : f / (n - 1)),
        u + 6 > o &&
          ((o = f / (n - (e.offset ? 0.5 : 1))),
          (s = this.maxHeight - Xa(e.grid) - t.padding - Za(e.title, this.chart.options.font)),
          (c = Math.sqrt(u * u + d * d)),
          (a = st(
            Math.min(
              Math.asin(mt((l.highest.height + 6) / o, -1, 1)),
              Math.asin(mt(s / c, -1, 1)) - Math.asin(mt(d / c, -1, 1)),
            ),
          )),
          (a = Math.max(r, Math.min(i, a)))),
        (this.labelRotation = a);
    }
    afterCalculateLabelRotation() {
      I(this.options.afterCalculateLabelRotation, [this]);
    }
    afterAutoSkip() {}
    beforeFit() {
      I(this.options.beforeFit, [this]);
    }
    fit() {
      const e = { width: 0, height: 0 },
        {
          chart: t,
          options: { ticks: n, title: r, grid: i },
        } = this,
        a = this._isVisible(),
        o = this.isHorizontal();
      if (a) {
        const a = Za(r, t.options.font);
        if (
          (o
            ? ((e.width = this.maxWidth), (e.height = Xa(i) + a))
            : ((e.height = this.maxHeight), (e.width = Xa(i) + a)),
          n.display && this.ticks.length)
        ) {
          const { first: t, last: r, widest: i, highest: a } = this._getLabelSizes(),
            s = n.padding * 2,
            c = ot(this.labelRotation),
            l = Math.cos(c),
            u = Math.sin(c);
          if (o) {
            const t = n.mirror ? 0 : u * i.width + l * a.height;
            e.height = Math.min(this.maxHeight, e.height + t + s);
          } else {
            const t = n.mirror ? 0 : l * i.width + u * a.height;
            e.width = Math.min(this.maxWidth, e.width + t + s);
          }
          this._calculatePadding(t, r, u, l);
        }
      }
      this._handleMargins(),
        o
          ? ((this.width = this._length = t.width - this._margins.left - this._margins.right),
            (this.height = e.height))
          : ((this.width = e.width),
            (this.height = this._length = t.height - this._margins.top - this._margins.bottom));
    }
    _calculatePadding(e, t, n, r) {
      const {
          ticks: { align: i, padding: a },
          position: o,
        } = this.options,
        s = this.labelRotation !== 0,
        c = o !== `top` && this.axis === `x`;
      if (this.isHorizontal()) {
        let o = this.getPixelForTick(0) - this.left,
          l = this.right - this.getPixelForTick(this.ticks.length - 1),
          u = 0,
          d = 0;
        s
          ? c
            ? ((u = r * e.width), (d = n * t.height))
            : ((u = n * e.height), (d = r * t.width))
          : i === `start`
            ? (d = t.width)
            : i === `end`
              ? (u = e.width)
              : i !== `inner` && ((u = e.width / 2), (d = t.width / 2)),
          (this.paddingLeft = Math.max(((u - o + a) * this.width) / (this.width - o), 0)),
          (this.paddingRight = Math.max(((d - l + a) * this.width) / (this.width - l), 0));
      } else {
        let n = t.height / 2,
          r = e.height / 2;
        i === `start` ? ((n = 0), (r = e.height)) : i === `end` && ((n = t.height), (r = 0)),
          (this.paddingTop = n + a),
          (this.paddingBottom = r + a);
      }
    }
    _handleMargins() {
      this._margins &&
        ((this._margins.left = Math.max(this.paddingLeft, this._margins.left)),
        (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
        (this._margins.right = Math.max(this.paddingRight, this._margins.right)),
        (this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom)));
    }
    afterFit() {
      I(this.options.afterFit, [this]);
    }
    isHorizontal() {
      const { axis: e, position: t } = this.options;
      return t === `top` || t === `bottom` || e === `x`;
    }
    isFullSize() {
      return this.options.fullSize;
    }
    _convertTicksToLabels(e) {
      this.beforeTickToLabelConversion(), this.generateTickLabels(e);
      let t, n;
      for (t = 0, n = e.length; t < n; t++) M(e[t].label) && (e.splice(t, 1), n--, t--);
      this.afterTickToLabelConversion();
    }
    _getLabelSizes() {
      let e = this._labelSizes;
      if (!e) {
        let t = this.options.ticks.sampleSize,
          n = this.ticks;
        t < n.length && (n = qa(n, t)),
          (this._labelSizes = e =
            this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit));
      }
      return e;
    }
    _computeLabelSizes(e, t, n) {
      let { ctx: r, _longestTextCache: i } = this,
        a = [],
        o = [],
        s = Math.floor(t / Ka(t, n)),
        c = 0,
        l = 0,
        u,
        d,
        f,
        p,
        m,
        h,
        g,
        _,
        v,
        y,
        b;
      for (u = 0; u < t; u += s) {
        if (
          ((p = e[u].label),
          (m = this._resolveTickFontOptions(u)),
          (r.font = h = m.string),
          (g = i[h] = i[h] || { data: {}, gc: [] }),
          (_ = m.lineHeight),
          (v = y = 0),
          !M(p) && !N(p))
        )
          (v = tn(r, g.data, g.gc, v, p)), (y = _);
        else if (N(p))
          for (d = 0, f = p.length; d < f; ++d)
            (b = p[d]), !M(b) && !N(b) && ((v = tn(r, g.data, g.gc, v, b)), (y += _));
        a.push(v), o.push(y), (c = Math.max(v, c)), (l = Math.max(y, l));
      }
      Ya(i, t);
      const x = a.indexOf(c),
        S = o.indexOf(l),
        C = (e) => ({ width: a[e] || 0, height: o[e] || 0 });
      return { first: C(0), last: C(t - 1), widest: C(x), highest: C(S), widths: a, heights: o };
    }
    getLabelForValue(e) {
      return e;
    }
    getPixelForValue(e, t) {
      return NaN;
    }
    getValueForPixel(e) {}
    getPixelForTick(e) {
      const t = this.ticks;
      return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
    }
    getPixelForDecimal(e) {
      this._reversePixels && (e = 1 - e);
      const t = this._startPixel + e * this._length;
      return ht(this._alignToPixels ? rn(this.chart, t, 0) : t);
    }
    getDecimalForPixel(e) {
      const t = (e - this._startPixel) / this._length;
      return this._reversePixels ? 1 - t : t;
    }
    getBasePixel() {
      return this.getPixelForValue(this.getBaseValue());
    }
    getBaseValue() {
      const { min: e, max: t } = this;
      return e < 0 && t < 0 ? t : e > 0 && t > 0 ? e : 0;
    }
    getContext(e) {
      const t = this.ticks || [];
      if (e >= 0 && e < t.length) {
        const n = t[e];
        return (n.$context ||= $a(this.getContext(), e, n));
      }
      return (this.$context ||= Qa(this.chart.getContext(), this));
    }
    _tickSize() {
      const e = this.options.ticks,
        t = ot(this.labelRotation),
        n = Math.abs(Math.cos(t)),
        r = Math.abs(Math.sin(t)),
        i = this._getLabelSizes(),
        a = e.autoSkipPadding || 0,
        o = i ? i.widest.width + a : 0,
        s = i ? i.highest.height + a : 0;
      return this.isHorizontal() ? (s * n > o * r ? o / n : s / r) : s * r < o * n ? s / n : o / r;
    }
    _isVisible() {
      const e = this.options.display;
      return e === `auto` ? this.getMatchingVisibleMetas().length > 0 : !!e;
    }
    _computeGridLineItems(e) {
      let t = this.axis,
        n = this.chart,
        r = this.options,
        { grid: i, position: a, border: o } = r,
        s = i.offset,
        c = this.isHorizontal(),
        l = this.ticks.length + +!!s,
        u = Xa(i),
        d = [],
        f = o.setContext(this.getContext()),
        p = f.display ? f.width : 0,
        m = p / 2,
        h = function (e) {
          return rn(n, e, p);
        },
        g,
        _,
        v,
        y,
        b,
        x,
        S,
        C,
        w,
        T,
        E,
        D;
      if (a === `top`)
        (g = h(this.bottom)),
          (x = this.bottom - u),
          (C = g - m),
          (T = h(e.top) + m),
          (D = e.bottom);
      else if (a === `bottom`)
        (g = h(this.top)), (T = e.top), (D = h(e.bottom) - m), (x = g + m), (C = this.top + u);
      else if (a === `left`)
        (g = h(this.right)), (b = this.right - u), (S = g - m), (w = h(e.left) + m), (E = e.right);
      else if (a === `right`)
        (g = h(this.left)), (w = e.left), (E = h(e.right) - m), (b = g + m), (S = this.left + u);
      else if (t === `x`) {
        if (a === `center`) g = h((e.top + e.bottom) / 2 + 0.5);
        else if (P(a)) {
          const e = Object.keys(a)[0],
            t = a[e];
          g = h(this.chart.scales[e].getPixelForValue(t));
        }
        (T = e.top), (D = e.bottom), (x = g + m), (C = x + u);
      } else if (t === `y`) {
        if (a === `center`) g = h((e.left + e.right) / 2);
        else if (P(a)) {
          const e = Object.keys(a)[0],
            t = a[e];
          g = h(this.chart.scales[e].getPixelForValue(t));
        }
        (b = g - m), (S = b - u), (w = e.left), (E = e.right);
      }
      const O = F(r.ticks.maxTicksLimit, l),
        k = Math.max(1, Math.ceil(l / O));
      for (_ = 0; _ < l; _ += k) {
        const e = this.getContext(_),
          t = i.setContext(e),
          r = o.setContext(e),
          a = t.lineWidth,
          l = t.color,
          u = r.dash || [],
          f = r.dashOffset,
          p = t.tickWidth,
          m = t.tickColor,
          h = t.tickBorderDash || [],
          g = t.tickBorderDashOffset;
        (v = Ja(this, _, s)),
          v !== void 0 &&
            ((y = rn(n, v, a)),
            c ? (b = S = w = E = y) : (x = C = T = D = y),
            d.push({
              tx1: b,
              ty1: x,
              tx2: S,
              ty2: C,
              x1: w,
              y1: T,
              x2: E,
              y2: D,
              width: a,
              color: l,
              borderDash: u,
              borderDashOffset: f,
              tickWidth: p,
              tickColor: m,
              tickBorderDash: h,
              tickBorderDashOffset: g,
            }));
      }
      return (this._ticksLength = l), (this._borderValue = g), d;
    }
    _computeLabelItems(e) {
      let t = this.axis,
        n = this.options,
        { position: r, ticks: i } = n,
        a = this.isHorizontal(),
        o = this.ticks,
        { align: s, crossAlign: c, padding: l, mirror: u } = i,
        d = Xa(n.grid),
        f = d + l,
        p = u ? -l : f,
        m = -ot(this.labelRotation),
        h = [],
        g,
        _,
        v,
        y,
        b,
        x,
        S,
        C,
        w,
        T,
        E,
        D,
        O = `middle`;
      if (r === `top`) (x = this.bottom - p), (S = this._getXAxisLabelAlignment());
      else if (r === `bottom`) (x = this.top + p), (S = this._getXAxisLabelAlignment());
      else if (r === `left`) {
        const e = this._getYAxisLabelAlignment(d);
        (S = e.textAlign), (b = e.x);
      } else if (r === `right`) {
        const e = this._getYAxisLabelAlignment(d);
        (S = e.textAlign), (b = e.x);
      } else if (t === `x`) {
        if (r === `center`) x = (e.top + e.bottom) / 2 + f;
        else if (P(r)) {
          const e = Object.keys(r)[0],
            t = r[e];
          x = this.chart.scales[e].getPixelForValue(t) + f;
        }
        S = this._getXAxisLabelAlignment();
      } else if (t === `y`) {
        if (r === `center`) b = (e.left + e.right) / 2 - f;
        else if (P(r)) {
          const e = Object.keys(r)[0],
            t = r[e];
          b = this.chart.scales[e].getPixelForValue(t);
        }
        S = this._getYAxisLabelAlignment(d).textAlign;
      }
      t === `y` && (s === `start` ? (O = `top`) : s === `end` && (O = `bottom`));
      const k = this._getLabelSizes();
      for (g = 0, _ = o.length; g < _; ++g) {
        (v = o[g]), (y = v.label);
        const e = i.setContext(this.getContext(g));
        (C = this.getPixelForTick(g) + i.labelOffset),
          (w = this._resolveTickFontOptions(g)),
          (T = w.lineHeight),
          (E = N(y) ? y.length : 1);
        let t = E / 2,
          n = e.color,
          s = e.textStrokeColor,
          l = e.textStrokeWidth,
          d = S;
        a
          ? ((b = C),
            S === `inner` &&
              (d =
                g === _ - 1
                  ? this.options.reverse
                    ? `left`
                    : `right`
                  : g === 0
                    ? this.options.reverse
                      ? `right`
                      : `left`
                    : `center`),
            (D =
              r === `top`
                ? c === `near` || m !== 0
                  ? -E * T + T / 2
                  : c === `center`
                    ? -k.highest.height / 2 - t * T + T
                    : -k.highest.height + T / 2
                : c === `near` || m !== 0
                  ? T / 2
                  : c === `center`
                    ? k.highest.height / 2 - t * T
                    : k.highest.height - E * T),
            u && (D *= -1),
            m !== 0 && !e.showLabelBackdrop && (b += (T / 2) * Math.sin(m)))
          : ((x = C), (D = ((1 - E) * T) / 2));
        let f;
        if (e.showLabelBackdrop) {
          let t = Tn(e.backdropPadding),
            n = k.heights[g],
            r = k.widths[g],
            i = D - t.top,
            a = 0 - t.left;
          switch (O) {
            case `middle`:
              i -= n / 2;
              break;
            case `bottom`:
              i -= n;
              break;
          }
          switch (S) {
            case `center`:
              a -= r / 2;
              break;
            case `right`:
              a -= r;
              break;
            case `inner`:
              g === _ - 1 ? (a -= r) : g > 0 && (a -= r / 2);
              break;
          }
          f = { left: a, top: i, width: r + t.width, height: n + t.height, color: e.backdropColor };
        }
        h.push({
          label: y,
          font: w,
          textOffset: D,
          options: {
            rotation: m,
            color: n,
            strokeColor: s,
            strokeWidth: l,
            textAlign: d,
            textBaseline: O,
            translation: [b, x],
            backdrop: f,
          },
        });
      }
      return h;
    }
    _getXAxisLabelAlignment() {
      const { position: e, ticks: t } = this.options;
      if (-ot(this.labelRotation)) return e === `top` ? `left` : `right`;
      let n = `center`;
      return (
        t.align === `start`
          ? (n = `left`)
          : t.align === `end`
            ? (n = `right`)
            : t.align === `inner` && (n = `inner`),
        n
      );
    }
    _getYAxisLabelAlignment(e) {
      let {
          position: t,
          ticks: { crossAlign: n, mirror: r, padding: i },
        } = this.options,
        a = this._getLabelSizes(),
        o = e + i,
        s = a.widest.width,
        c,
        l;
      return (
        t === `left`
          ? r
            ? ((l = this.right + i),
              n === `near`
                ? (c = `left`)
                : n === `center`
                  ? ((c = `center`), (l += s / 2))
                  : ((c = `right`), (l += s)))
            : ((l = this.right - o),
              n === `near`
                ? (c = `right`)
                : n === `center`
                  ? ((c = `center`), (l -= s / 2))
                  : ((c = `left`), (l = this.left)))
          : t === `right`
            ? r
              ? ((l = this.left + i),
                n === `near`
                  ? (c = `right`)
                  : n === `center`
                    ? ((c = `center`), (l -= s / 2))
                    : ((c = `left`), (l -= s)))
              : ((l = this.left + o),
                n === `near`
                  ? (c = `left`)
                  : n === `center`
                    ? ((c = `center`), (l += s / 2))
                    : ((c = `right`), (l = this.right)))
            : (c = `right`),
        { textAlign: c, x: l }
      );
    }
    _computeLabelArea() {
      if (this.options.ticks.mirror) return;
      const e = this.chart,
        t = this.options.position;
      if (t === `left` || t === `right`)
        return { top: 0, left: this.left, bottom: e.height, right: this.right };
      if (t === `top` || t === `bottom`)
        return { top: this.top, left: 0, bottom: this.bottom, right: e.width };
    }
    drawBackground() {
      const {
        ctx: e,
        options: { backgroundColor: t },
        left: n,
        top: r,
        width: i,
        height: a,
      } = this;
      t && (e.save(), (e.fillStyle = t), e.fillRect(n, r, i, a), e.restore());
    }
    getLineWidthForValue(e) {
      const t = this.options.grid;
      if (!this._isVisible() || !t.display) return 0;
      const n = this.ticks.findIndex((t) => t.value === e);
      return n >= 0 ? t.setContext(this.getContext(n)).lineWidth : 0;
    }
    drawGrid(e) {
      let t = this.options.grid,
        n = this.ctx,
        r = (this._gridLineItems ||= this._computeGridLineItems(e)),
        i,
        a,
        o = (e, t, r) => {
          !r.width ||
            !r.color ||
            (n.save(),
            (n.lineWidth = r.width),
            (n.strokeStyle = r.color),
            n.setLineDash(r.borderDash || []),
            (n.lineDashOffset = r.borderDashOffset),
            n.beginPath(),
            n.moveTo(e.x, e.y),
            n.lineTo(t.x, t.y),
            n.stroke(),
            n.restore());
        };
      if (t.display)
        for (i = 0, a = r.length; i < a; ++i) {
          const e = r[i];
          t.drawOnChartArea && o({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }, e),
            t.drawTicks &&
              o(
                { x: e.tx1, y: e.ty1 },
                { x: e.tx2, y: e.ty2 },
                {
                  color: e.tickColor,
                  width: e.tickWidth,
                  borderDash: e.tickBorderDash,
                  borderDashOffset: e.tickBorderDashOffset,
                },
              );
        }
    }
    drawBorder() {
      const {
          chart: e,
          ctx: t,
          options: { border: n, grid: r },
        } = this,
        i = n.setContext(this.getContext()),
        a = n.display ? i.width : 0;
      if (!a) return;
      let o = r.setContext(this.getContext(0)).lineWidth,
        s = this._borderValue,
        c,
        l,
        u,
        d;
      this.isHorizontal()
        ? ((c = rn(e, this.left, a) - a / 2), (l = rn(e, this.right, o) + o / 2), (u = d = s))
        : ((u = rn(e, this.top, a) - a / 2), (d = rn(e, this.bottom, o) + o / 2), (c = l = s)),
        t.save(),
        (t.lineWidth = i.width),
        (t.strokeStyle = i.color),
        t.beginPath(),
        t.moveTo(c, u),
        t.lineTo(l, d),
        t.stroke(),
        t.restore();
    }
    drawLabels(e) {
      if (!this.options.ticks.display) return;
      const t = this.ctx,
        n = this._computeLabelArea();
      n && ln(t, n);
      const r = this.getLabelItems(e);
      for (const e of r) {
        const n = e.options,
          r = e.font,
          i = e.label,
          a = e.textOffset;
        gn(t, i, 0, a, r, n);
      }
      n && un(t);
    }
    drawTitle() {
      const {
        ctx: e,
        options: { position: t, title: n, reverse: r },
      } = this;
      if (!n.display) return;
      let i = En(n.font),
        a = Tn(n.padding),
        o = n.align,
        s = i.lineHeight / 2;
      t === `bottom` || t === `center` || P(t)
        ? ((s += a.bottom), N(n.text) && (s += i.lineHeight * (n.text.length - 1)))
        : (s += a.top);
      const { titleX: c, titleY: l, maxWidth: u, rotation: d } = to(this, s, t, o);
      gn(e, n.text, 0, 0, i, {
        color: n.color,
        maxWidth: u,
        rotation: d,
        textAlign: eo(o, t, r),
        textBaseline: `middle`,
        translation: [c, l],
      });
    }
    draw(e) {
      this._isVisible() &&
        (this.drawBackground(),
        this.drawGrid(e),
        this.drawBorder(),
        this.drawTitle(),
        this.drawLabels(e));
    }
    _layers() {
      const t = this.options,
        n = (t.ticks && t.ticks.z) || 0,
        r = F(t.grid && t.grid.z, -1),
        i = F(t.border && t.border.z, 0);
      return !this._isVisible() || this.draw !== e.prototype.draw
        ? [
            {
              z: n,
              draw: (e) => {
                this.draw(e);
              },
            },
          ]
        : [
            {
              z: r,
              draw: (e) => {
                this.drawBackground(), this.drawGrid(e), this.drawTitle();
              },
            },
            {
              z: i,
              draw: () => {
                this.drawBorder();
              },
            },
            {
              z: n,
              draw: (e) => {
                this.drawLabels(e);
              },
            },
          ];
    }
    getMatchingVisibleMetas(e) {
      let t = this.chart.getSortedVisibleDatasetMetas(),
        n = this.axis + `AxisID`,
        r = [],
        i,
        a;
      for (i = 0, a = t.length; i < a; ++i) {
        const a = t[i];
        a[n] === this.id && (!e || a.type === e) && r.push(a);
      }
      return r;
    }
    _resolveTickFontOptions(e) {
      return En(this.options.ticks.setContext(this.getContext(e)).font);
    }
    _maxDigits() {
      const e = this._resolveTickFontOptions(0).lineHeight;
      return (this.isHorizontal() ? this.width : this.height) / e;
    }
  },
  ro = class {
    constructor(e, t, n) {
      (this.type = e), (this.scope = t), (this.override = n), (this.items = Object.create(null));
    }
    isForType(e) {
      return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
    }
    register(e) {
      let t = Object.getPrototypeOf(e),
        n;
      oo(t) && (n = this.register(t));
      const r = this.items,
        i = e.id,
        a = this.scope + `.` + i;
      if (!i) throw Error(`class does not have id: ` + e);
      return i in r
        ? a
        : ((r[i] = e), io(e, a, n), this.override && z.override(e.id, e.overrides), a);
    }
    get(e) {
      return this.items[e];
    }
    unregister(e) {
      const t = this.items,
        n = e.id,
        r = this.scope;
      n in t && delete t[n], r && n in z[r] && (delete z[r][n], this.override && delete Xt[n]);
    }
  };
function io(e, t, n) {
  const r = Me(Object.create(null), [n ? z.get(n) : {}, z.get(t), e.defaults]);
  z.set(t, r),
    e.defaultRoutes && ao(t, e.defaultRoutes),
    e.descriptors && z.describe(t, e.descriptors);
}
function ao(e, t) {
  Object.keys(t).forEach((n) => {
    const r = n.split(`.`),
      i = r.pop(),
      a = [e].concat(r).join(`.`),
      o = t[n].split(`.`),
      s = o.pop(),
      c = o.join(`.`);
    z.route(a, i, c, s);
  });
}
function oo(e) {
  return `id` in e && `defaults` in e;
}
var so = new (class {
    constructor() {
      (this.controllers = new ro(_i, `datasets`, !0)),
        (this.elements = new ro(Ia, `elements`)),
        (this.plugins = new ro(Object, `plugins`)),
        (this.scales = new ro(no, `scales`)),
        (this._typedRegistries = [this.controllers, this.scales, this.elements]);
    }
    add(...e) {
      this._each(`register`, e);
    }
    remove(...e) {
      this._each(`unregister`, e);
    }
    addControllers(...e) {
      this._each(`register`, e, this.controllers);
    }
    addElements(...e) {
      this._each(`register`, e, this.elements);
    }
    addPlugins(...e) {
      this._each(`register`, e, this.plugins);
    }
    addScales(...e) {
      this._each(`register`, e, this.scales);
    }
    getController(e) {
      return this._get(e, this.controllers, `controller`);
    }
    getElement(e) {
      return this._get(e, this.elements, `element`);
    }
    getPlugin(e) {
      return this._get(e, this.plugins, `plugin`);
    }
    getScale(e) {
      return this._get(e, this.scales, `scale`);
    }
    removeControllers(...e) {
      this._each(`unregister`, e, this.controllers);
    }
    removeElements(...e) {
      this._each(`unregister`, e, this.elements);
    }
    removePlugins(...e) {
      this._each(`unregister`, e, this.plugins);
    }
    removeScales(...e) {
      this._each(`unregister`, e, this.scales);
    }
    _each(e, t, n) {
      [...t].forEach((t) => {
        const r = n || this._getRegistryForType(t);
        n || r.isForType(t) || (r === this.plugins && t.id)
          ? this._exec(e, r, t)
          : L(t, (t) => {
              const r = n || this._getRegistryForType(t);
              this._exec(e, r, t);
            });
      });
    }
    _exec(e, t, n) {
      const r = ze(e);
      I(n[`before` + r], [], n), t[e](n), I(n[`after` + r], [], n);
    }
    _getRegistryForType(e) {
      for (let t = 0; t < this._typedRegistries.length; t++) {
        const n = this._typedRegistries[t];
        if (n.isForType(e)) return n;
      }
      return this.plugins;
    }
    _get(e, t, n) {
      const r = t.get(e);
      if (r === void 0) throw Error(`"` + e + `" is not a registered ` + n + `.`);
      return r;
    }
  })(),
  co = class {
    constructor() {
      this._init = void 0;
    }
    notify(e, t, n, r) {
      if (
        (t === `beforeInit` &&
          ((this._init = this._createDescriptors(e, !0)), this._notify(this._init, e, `install`)),
        this._init === void 0)
      )
        return;
      const i = r ? this._descriptors(e).filter(r) : this._descriptors(e),
        a = this._notify(i, e, t, n);
      return (
        t === `afterDestroy` &&
          (this._notify(i, e, `stop`),
          this._notify(this._init, e, `uninstall`),
          (this._init = void 0)),
        a
      );
    }
    _notify(e, t, n, r) {
      r ||= {};
      for (const i of e) {
        const e = i.plugin,
          a = e[n];
        if (I(a, [t, r, i.options], e) === !1 && r.cancelable) return !1;
      }
      return !0;
    }
    invalidate() {
      M(this._cache) || ((this._oldCache = this._cache), (this._cache = void 0));
    }
    _descriptors(e) {
      if (this._cache) return this._cache;
      const t = (this._cache = this._createDescriptors(e));
      return this._notifyStateChanges(e), t;
    }
    _createDescriptors(e, t) {
      const n = e && e.config,
        r = F(n.options && n.options.plugins, {}),
        i = lo(n);
      return r === !1 && !t ? [] : fo(e, i, r, t);
    }
    _notifyStateChanges(e) {
      const t = this._oldCache || [],
        n = this._cache,
        r = (e, t) => e.filter((e) => !t.some((t) => e.plugin.id === t.plugin.id));
      this._notify(r(t, n), e, `stop`), this._notify(r(n, t), e, `start`);
    }
  };
function lo(e) {
  const t = {},
    n = [],
    r = Object.keys(so.plugins.items);
  for (let e = 0; e < r.length; e++) n.push(so.getPlugin(r[e]));
  const i = e.plugins || [];
  for (let e = 0; e < i.length; e++) {
    const r = i[e];
    n.indexOf(r) === -1 && (n.push(r), (t[r.id] = !0));
  }
  return { plugins: n, localIds: t };
}
function uo(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function fo(e, { plugins: t, localIds: n }, r, i) {
  const a = [],
    o = e.getContext();
  for (const s of t) {
    const t = s.id,
      c = uo(r[t], i);
    c !== null && a.push({ plugin: s, options: po(e.config, { plugin: s, local: n[t] }, c, o) });
  }
  return a;
}
function po(e, { plugin: t, local: n }, r, i) {
  const a = e.pluginScopeKeys(t),
    o = e.getOptionScopes(r, a);
  return (
    n && t.defaults && o.push(t.defaults),
    e.createResolver(o, i, [``], { scriptable: !1, indexable: !1, allKeys: !0 })
  );
}
function mo(e, t) {
  const n = z.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || `x`;
}
function ho(e, t) {
  let n = e;
  return e === `_index_` ? (n = t) : e === `_value_` && (n = t === `x` ? `y` : `x`), n;
}
function go(e, t) {
  return e === t ? `_index_` : `_value_`;
}
function _o(e) {
  if (e === `x` || e === `y` || e === `r`) return e;
}
function vo(e) {
  if (e === `top` || e === `bottom`) return `x`;
  if (e === `left` || e === `right`) return `y`;
}
function yo(e, ...t) {
  if (_o(e)) return e;
  for (const n of t) {
    const t = n.axis || vo(n.position) || (e.length > 1 && _o(e[0].toLowerCase()));
    if (t) return t;
  }
  throw Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function bo(e, t, n) {
  if (n[t + `AxisID`] === e) return { axis: t };
}
function xo(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((t) => t.xAxisID === e || t.yAxisID === e);
    if (n.length) return bo(e, `x`, n[0]) || bo(e, `y`, n[0]);
  }
  return {};
}
function So(e, t) {
  const n = Xt[e.type] || { scales: {} },
    r = t.scales || {},
    i = mo(e.type, t),
    a = Object.create(null);
  return (
    Object.keys(r).forEach((t) => {
      const o = r[t];
      if (!P(o)) return console.error(`Invalid scale configuration for scale: ${t}`);
      if (o._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${t}`);
      const s = yo(t, o, xo(t, e), z.scales[o.type]),
        c = go(s, i),
        l = n.scales || {};
      a[t] = Ne(Object.create(null), [{ axis: s }, o, l[s], l[c]]);
    }),
    e.data.datasets.forEach((n) => {
      const i = n.type || e.type,
        o = n.indexAxis || mo(i, t),
        s = (Xt[i] || {}).scales || {};
      Object.keys(s).forEach((e) => {
        const t = ho(e, o),
          i = n[t + `AxisID`] || t;
        (a[i] = a[i] || Object.create(null)), Ne(a[i], [{ axis: t }, r[i], s[e]]);
      });
    }),
    Object.keys(a).forEach((e) => {
      const t = a[e];
      Ne(t, [z.scales[t.type], z.scale]);
    }),
    a
  );
}
function Co(e) {
  const t = (e.options ||= {});
  (t.plugins = F(t.plugins, {})), (t.scales = So(e, t));
}
function wo(e) {
  return (e ||= {}), (e.datasets = e.datasets || []), (e.labels = e.labels || []), e;
}
function To(e) {
  return (e ||= {}), (e.data = wo(e.data)), Co(e), e;
}
var Eo = new Map(),
  Do = new Set();
function Oo(e, t) {
  let n = Eo.get(e);
  return n || ((n = t()), Eo.set(e, n), Do.add(n)), n;
}
var ko = (e, t, n) => {
    const r = Re(t, n);
    r !== void 0 && e.add(r);
  },
  Ao = class {
    constructor(e) {
      (this._config = To(e)), (this._scopeCache = new Map()), (this._resolverCache = new Map());
    }
    get platform() {
      return this._config.platform;
    }
    get type() {
      return this._config.type;
    }
    set type(e) {
      this._config.type = e;
    }
    get data() {
      return this._config.data;
    }
    set data(e) {
      this._config.data = wo(e);
    }
    get options() {
      return this._config.options;
    }
    set options(e) {
      this._config.options = e;
    }
    get plugins() {
      return this._config.plugins;
    }
    update() {
      const e = this._config;
      this.clearCache(), Co(e);
    }
    clearCache() {
      this._scopeCache.clear(), this._resolverCache.clear();
    }
    datasetScopeKeys(e) {
      return Oo(e, () => [[`datasets.${e}`, ``]]);
    }
    datasetAnimationScopeKeys(e, t) {
      return Oo(`${e}.transition.${t}`, () => [
        [`datasets.${e}.transitions.${t}`, `transitions.${t}`],
        [`datasets.${e}`, ``],
      ]);
    }
    datasetElementScopeKeys(e, t) {
      return Oo(`${e}-${t}`, () => [
        [`datasets.${e}.elements.${t}`, `datasets.${e}`, `elements.${t}`, ``],
      ]);
    }
    pluginScopeKeys(e) {
      const t = e.id,
        n = this.type;
      return Oo(`${n}-plugin-${t}`, () => [[`plugins.${t}`, ...(e.additionalOptionScopes || [])]]);
    }
    _cachedScopes(e, t) {
      let n = this._scopeCache,
        r = n.get(e);
      return (!r || t) && ((r = new Map()), n.set(e, r)), r;
    }
    getOptionScopes(e, t, n) {
      const { options: r, type: i } = this,
        a = this._cachedScopes(e, n),
        o = a.get(t);
      if (o) return o;
      const s = new Set();
      t.forEach((t) => {
        e && (s.add(e), t.forEach((t) => ko(s, e, t))),
          t.forEach((e) => ko(s, r, e)),
          t.forEach((e) => ko(s, Xt[i] || {}, e)),
          t.forEach((e) => ko(s, z, e)),
          t.forEach((e) => ko(s, Zt, e));
      });
      const c = Array.from(s);
      return c.length === 0 && c.push(Object.create(null)), Do.has(t) && a.set(t, c), c;
    }
    chartOptionScopes() {
      const { options: e, type: t } = this;
      return [e, Xt[t] || {}, z.datasets[t] || {}, { type: t }, z, Zt];
    }
    resolveNamedOptions(e, t, n, r = [``]) {
      let i = { $shared: !0 },
        { resolver: a, subPrefixes: o } = jo(this._resolverCache, e, r),
        s = a;
      if (No(a, t)) {
        (i.$shared = !1), (n = Ve(n) ? n() : n);
        const t = this.createResolver(e, n, o);
        s = jn(a, n, t);
      }
      for (const e of t) i[e] = s[e];
      return i;
    }
    createResolver(e, t, n = [``], r) {
      const { resolver: i } = jo(this._resolverCache, e, n);
      return P(t) ? jn(i, t, void 0, r) : i;
    }
  };
function jo(e, t, n) {
  let r = e.get(t);
  r || ((r = new Map()), e.set(t, r));
  let i = n.join(),
    a = r.get(i);
  return (
    a ||
      ((a = {
        resolver: An(t, n),
        subPrefixes: n.filter((e) => !e.toLowerCase().includes(`hover`)),
      }),
      r.set(i, a)),
    a
  );
}
var Mo = (e) => P(e) && Object.getOwnPropertyNames(e).some((t) => Ve(e[t]));
function No(e, t) {
  const { isScriptable: n, isIndexable: r } = Mn(e);
  for (const i of t) {
    const t = n(i),
      a = r(i),
      o = (a || t) && e[i];
    if ((t && (Ve(o) || Mo(o))) || (a && N(o))) return !0;
  }
  return !1;
}
var Po = `4.5.1`,
  Fo = [`top`, `bottom`, `left`, `right`, `chartArea`];
function Io(e, t) {
  return e === `top` || e === `bottom` || (Fo.indexOf(e) === -1 && t === `x`);
}
function Lo(e, t) {
  return function (n, r) {
    return n[e] === r[e] ? n[t] - r[t] : n[e] - r[e];
  };
}
function Ro(e) {
  const t = e.chart,
    n = t.options.animation;
  t.notifyPlugins(`afterRender`), I(n && n.onComplete, [e], t);
}
function zo(e) {
  const t = e.chart,
    n = t.options.animation;
  I(n && n.onProgress, [e], t);
}
function Bo(e) {
  return (
    or() && typeof e == `string` ? (e = document.getElementById(e)) : e && e.length && (e = e[0]),
    e && e.canvas && (e = e.canvas),
    e
  );
}
var Vo = {},
  Ho = (e) => {
    const t = Bo(e);
    return Object.values(Vo)
      .filter((e) => e.canvas === t)
      .pop();
  };
function Uo(e, t, n) {
  const r = Object.keys(e);
  for (const i of r) {
    const r = +i;
    if (r >= t) {
      const a = e[i];
      delete e[i], (n > 0 || r > t) && (e[r + n] = a);
    }
  }
}
function Wo(e, t, n, r) {
  return !n || e.type === `mouseout` ? null : r ? t : e;
}
var Go = class {
  static defaults = z;
  static instances = Vo;
  static overrides = Xt;
  static registry = so;
  static version = Po;
  static getChart = Ho;
  static register(...e) {
    so.add(...e), Ko();
  }
  static unregister(...e) {
    so.remove(...e), Ko();
  }
  constructor(e, t) {
    const n = (this.config = new Ao(t)),
      r = Bo(e),
      i = Ho(r);
    if (i)
      throw Error(
        `Canvas is already in use. Chart with ID '` +
          i.id +
          `' must be destroyed before the canvas with ID '` +
          i.canvas.id +
          `' can be reused.`,
      );
    const a = n.createResolver(n.chartOptionScopes(), this.getContext());
    (this.platform = new (n.platform || Fa(r))()), this.platform.updateConfig(n);
    const o = this.platform.acquireContext(r, a.aspectRatio),
      s = o && o.canvas,
      c = s && s.height,
      l = s && s.width;
    if (
      ((this.id = Ce()),
      (this.ctx = o),
      (this.canvas = s),
      (this.width = l),
      (this.height = c),
      (this._options = a),
      (this._aspectRatio = this.aspectRatio),
      (this._layers = []),
      (this._metasets = []),
      (this._stacks = void 0),
      (this.boxes = []),
      (this.currentDevicePixelRatio = void 0),
      (this.chartArea = void 0),
      (this._active = []),
      (this._lastEvent = void 0),
      (this._listeners = {}),
      (this._responsiveListeners = void 0),
      (this._sortedMetasets = []),
      (this.scales = {}),
      (this._plugins = new co()),
      (this.$proxies = {}),
      (this._hiddenIndices = {}),
      (this.attached = !1),
      (this._animationsDisabled = void 0),
      (this.$context = void 0),
      (this._doResize = Dt((e) => this.update(e), a.resizeDelay || 0)),
      (this._dataChanges = []),
      (Vo[this.id] = this),
      !o || !s)
    ) {
      console.error(`Failed to create chart: can't acquire context from the given item`);
      return;
    }
    Gr.listen(this, `complete`, Ro),
      Gr.listen(this, `progress`, zo),
      this._initialize(),
      this.attached && this.update();
  }
  get aspectRatio() {
    const {
      options: { aspectRatio: e, maintainAspectRatio: t },
      width: n,
      height: r,
      _aspectRatio: i,
    } = this;
    return M(e) ? (t && i ? i : r ? n / r : null) : e;
  }
  get data() {
    return this.config.data;
  }
  set data(e) {
    this.config.data = e;
  }
  get options() {
    return this._options;
  }
  set options(e) {
    this.config.options = e;
  }
  get registry() {
    return so;
  }
  _initialize() {
    return (
      this.notifyPlugins(`beforeInit`),
      this.options.responsive ? this.resize() : yr(this, this.options.devicePixelRatio),
      this.bindEvents(),
      this.notifyPlugins(`afterInit`),
      this
    );
  }
  clear() {
    return an(this.canvas, this.ctx), this;
  }
  stop() {
    return Gr.stop(this), this;
  }
  resize(e, t) {
    Gr.running(this) ? (this._resizeBeforeDraw = { width: e, height: t }) : this._resize(e, t);
  }
  _resize(e, t) {
    const n = this.options,
      r = this.canvas,
      i = n.maintainAspectRatio && this.aspectRatio,
      a = this.platform.getMaximumSize(r, e, t, i),
      o = n.devicePixelRatio || this.platform.getDevicePixelRatio(),
      s = this.width ? `resize` : `attach`;
    (this.width = a.width),
      (this.height = a.height),
      (this._aspectRatio = this.aspectRatio),
      yr(this, o, !0) &&
        (this.notifyPlugins(`resize`, { size: a }),
        I(n.onResize, [this, a], this),
        this.attached && this._doResize(s) && this.render());
  }
  ensureScalesHaveIDs() {
    L(this.options.scales || {}, (e, t) => {
      e.id = t;
    });
  }
  buildOrUpdateScales() {
    let e = this.options,
      t = e.scales,
      n = this.scales,
      r = Object.keys(n).reduce((e, t) => ((e[t] = !1), e), {}),
      i = [];
    t &&
      (i = i.concat(
        Object.keys(t).map((e) => {
          const n = t[e],
            r = yo(e, n),
            i = r === `r`,
            a = r === `x`;
          return {
            options: n,
            dposition: i ? `chartArea` : a ? `bottom` : `left`,
            dtype: i ? `radialLinear` : a ? `category` : `linear`,
          };
        }),
      )),
      L(i, (t) => {
        const i = t.options,
          a = i.id,
          o = yo(a, i),
          s = F(i.type, t.dtype);
        (i.position === void 0 || Io(i.position, o) !== Io(t.dposition)) &&
          (i.position = t.dposition),
          (r[a] = !0);
        let c = null;
        a in n && n[a].type === s
          ? (c = n[a])
          : ((c = new (so.getScale(s))({ id: a, type: s, ctx: this.ctx, chart: this })),
            (n[c.id] = c)),
          c.init(i, e);
      }),
      L(r, (e, t) => {
        e || delete n[t];
      }),
      L(n, (e) => {
        fa.configure(this, e, e.options), fa.addBox(this, e);
      });
  }
  _updateMetasets() {
    const e = this._metasets,
      t = this.data.datasets.length,
      n = e.length;
    if ((e.sort((e, t) => e.index - t.index), n > t)) {
      for (let e = t; e < n; ++e) this._destroyDatasetMeta(e);
      e.splice(t, n - t);
    }
    this._sortedMetasets = e.slice(0).sort(Lo(`order`, `index`));
  }
  _removeUnreferencedMetasets() {
    const {
      _metasets: e,
      data: { datasets: t },
    } = this;
    e.length > t.length && delete this._stacks,
      e.forEach((e, n) => {
        t.filter((t) => t === e._dataset).length === 0 && this._destroyDatasetMeta(n);
      });
  }
  buildOrUpdateControllers() {
    let e = [],
      t = this.data.datasets,
      n,
      r;
    for (this._removeUnreferencedMetasets(), n = 0, r = t.length; n < r; n++) {
      let r = t[n],
        i = this.getDatasetMeta(n),
        a = r.type || this.config.type;
      if (
        (i.type && i.type !== a && (this._destroyDatasetMeta(n), (i = this.getDatasetMeta(n))),
        (i.type = a),
        (i.indexAxis = r.indexAxis || mo(a, this.options)),
        (i.order = r.order || 0),
        (i.index = n),
        (i.label = `` + r.label),
        (i.visible = this.isDatasetVisible(n)),
        i.controller)
      )
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const t = so.getController(a),
          { datasetElementType: r, dataElementType: o } = z.datasets[a];
        Object.assign(t, {
          dataElementType: so.getElement(o),
          datasetElementType: r && so.getElement(r),
        }),
          (i.controller = new t(this, n)),
          e.push(i.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    L(
      this.data.datasets,
      (e, t) => {
        this.getDatasetMeta(t).controller.reset();
      },
      this,
    );
  }
  reset() {
    this._resetElements(), this.notifyPlugins(`reset`);
  }
  update(e) {
    const t = this.config;
    t.update();
    const n = (this._options = t.createResolver(t.chartOptionScopes(), this.getContext())),
      r = (this._animationsDisabled = !n.animation);
    if (
      (this._updateScales(),
      this._checkEventBindings(),
      this._updateHiddenIndices(),
      this._plugins.invalidate(),
      this.notifyPlugins(`beforeUpdate`, { mode: e, cancelable: !0 }) === !1)
    )
      return;
    const i = this.buildOrUpdateControllers();
    this.notifyPlugins(`beforeElementsUpdate`);
    let a = 0;
    for (let e = 0, t = this.data.datasets.length; e < t; e++) {
      const { controller: t } = this.getDatasetMeta(e),
        n = !r && i.indexOf(t) === -1;
      t.buildOrUpdateElements(n), (a = Math.max(+t.getMaxOverflow(), a));
    }
    (a = this._minPadding = n.layout.autoPadding ? a : 0),
      this._updateLayout(a),
      r ||
        L(i, (e) => {
          e.reset();
        }),
      this._updateDatasets(e),
      this.notifyPlugins(`afterUpdate`, { mode: e }),
      this._layers.sort(Lo(`z`, `_idx`));
    const { _active: o, _lastEvent: s } = this;
    s ? this._eventHandler(s, !0) : o.length && this._updateHoverStyles(o, o, !0), this.render();
  }
  _updateScales() {
    L(this.scales, (e) => {
      fa.removeBox(this, e);
    }),
      this.ensureScalesHaveIDs(),
      this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options;
    (!He(new Set(Object.keys(this._listeners)), new Set(e.events)) ||
      !!this._responsiveListeners !== e.responsive) &&
      (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this,
      t = this._getUniformDataChanges() || [];
    for (const { method: n, start: r, count: i } of t) Uo(e, r, n === `_removeElements` ? -i : i);
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length) return;
    this._dataChanges = [];
    const t = this.data.datasets.length,
      n = (t) =>
        new Set(e.filter((e) => e[0] === t).map((e, t) => t + `,` + e.splice(1).join(`,`))),
      r = n(0);
    for (let e = 1; e < t; e++) if (!He(r, n(e))) return;
    return Array.from(r)
      .map((e) => e.split(`,`))
      .map((e) => ({ method: e[1], start: +e[2], count: +e[3] }));
  }
  _updateLayout(e) {
    if (this.notifyPlugins(`beforeLayout`, { cancelable: !0 }) === !1) return;
    fa.update(this, this.width, this.height, e);
    const t = this.chartArea,
      n = t.width <= 0 || t.height <= 0;
    (this._layers = []),
      L(
        this.boxes,
        (e) => {
          (n && e.position === `chartArea`) ||
            (e.configure && e.configure(), this._layers.push(...e._layers()));
        },
        this,
      ),
      this._layers.forEach((e, t) => {
        e._idx = t;
      }),
      this.notifyPlugins(`afterLayout`);
  }
  _updateDatasets(e) {
    if (this.notifyPlugins(`beforeDatasetsUpdate`, { mode: e, cancelable: !0 }) !== !1) {
      for (let e = 0, t = this.data.datasets.length; e < t; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let t = 0, n = this.data.datasets.length; t < n; ++t)
        this._updateDataset(t, Ve(e) ? e({ datasetIndex: t }) : e);
      this.notifyPlugins(`afterDatasetsUpdate`, { mode: e });
    }
  }
  _updateDataset(e, t) {
    const n = this.getDatasetMeta(e),
      r = { meta: n, index: e, mode: t, cancelable: !0 };
    this.notifyPlugins(`beforeDatasetUpdate`, r) !== !1 &&
      (n.controller._update(t), (r.cancelable = !1), this.notifyPlugins(`afterDatasetUpdate`, r));
  }
  render() {
    this.notifyPlugins(`beforeRender`, { cancelable: !0 }) !== !1 &&
      (Gr.has(this)
        ? this.attached && !Gr.running(this) && Gr.start(this)
        : (this.draw(), Ro({ chart: this })));
  }
  draw() {
    let e;
    if (this._resizeBeforeDraw) {
      const { width: e, height: t } = this._resizeBeforeDraw;
      (this._resizeBeforeDraw = null), this._resize(e, t);
    }
    if (
      (this.clear(),
      this.width <= 0 ||
        this.height <= 0 ||
        this.notifyPlugins(`beforeDraw`, { cancelable: !0 }) === !1)
    )
      return;
    const t = this._layers;
    for (e = 0; e < t.length && t[e].z <= 0; ++e) t[e].draw(this.chartArea);
    for (this._drawDatasets(); e < t.length; ++e) t[e].draw(this.chartArea);
    this.notifyPlugins(`afterDraw`);
  }
  _getSortedDatasetMetas(e) {
    let t = this._sortedMetasets,
      n = [],
      r,
      i;
    for (r = 0, i = t.length; r < i; ++r) {
      const i = t[r];
      (!e || i.visible) && n.push(i);
    }
    return n;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins(`beforeDatasetsDraw`, { cancelable: !0 }) === !1) return;
    const e = this.getSortedVisibleDatasetMetas();
    for (let t = e.length - 1; t >= 0; --t) this._drawDataset(e[t]);
    this.notifyPlugins(`afterDatasetsDraw`);
  }
  _drawDataset(e) {
    const t = this.ctx,
      n = { meta: e, index: e.index, cancelable: !0 },
      r = Wr(this, e);
    this.notifyPlugins(`beforeDatasetDraw`, n) !== !1 &&
      (r && ln(t, r),
      e.controller.draw(),
      r && un(t),
      (n.cancelable = !1),
      this.notifyPlugins(`afterDatasetDraw`, n));
  }
  isPointInArea(e) {
    return cn(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, t, n, r) {
    const i = Yi.modes[t];
    return typeof i == `function` ? i(this, e, n, r) : [];
  }
  getDatasetMeta(e) {
    let t = this.data.datasets[e],
      n = this._metasets,
      r = n.filter((e) => e && e._dataset === t).pop();
    return (
      r ||
        ((r = {
          type: null,
          data: [],
          dataset: null,
          controller: null,
          hidden: null,
          xAxisID: null,
          yAxisID: null,
          order: (t && t.order) || 0,
          index: e,
          _dataset: t,
          _parsed: [],
          _sorted: !1,
        }),
        n.push(r)),
      r
    );
  }
  getContext() {
    return (this.$context ||= kn(null, { chart: this, type: `chart` }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(e) {
    const t = this.data.datasets[e];
    if (!t) return !1;
    const n = this.getDatasetMeta(e);
    return typeof n.hidden == `boolean` ? !n.hidden : !t.hidden;
  }
  setDatasetVisibility(e, t) {
    const n = this.getDatasetMeta(e);
    n.hidden = !t;
  }
  toggleDataVisibility(e) {
    this._hiddenIndices[e] = !this._hiddenIndices[e];
  }
  getDataVisibility(e) {
    return !this._hiddenIndices[e];
  }
  _updateVisibility(e, t, n) {
    const r = n ? `show` : `hide`,
      i = this.getDatasetMeta(e),
      a = i.controller._resolveAnimations(void 0, r);
    Be(t)
      ? ((i.data[t].hidden = !n), this.update())
      : (this.setDatasetVisibility(e, n),
        a.update(i, { visible: n }),
        this.update((t) => (t.datasetIndex === e ? r : void 0)));
  }
  hide(e, t) {
    this._updateVisibility(e, t, !1);
  }
  show(e, t) {
    this._updateVisibility(e, t, !0);
  }
  _destroyDatasetMeta(e) {
    const t = this._metasets[e];
    t && t.controller && t.controller._destroy(), delete this._metasets[e];
  }
  _stop() {
    let e, t;
    for (this.stop(), Gr.remove(this), e = 0, t = this.data.datasets.length; e < t; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins(`beforeDestroy`);
    const { canvas: e, ctx: t } = this;
    this._stop(),
      this.config.clearCache(),
      e &&
        (this.unbindEvents(),
        an(e, t),
        this.platform.releaseContext(t),
        (this.canvas = null),
        (this.ctx = null)),
      delete Vo[this.id],
      this.notifyPlugins(`afterDestroy`);
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(),
      this.options.responsive ? this.bindResponsiveEvents() : (this.attached = !0);
  }
  bindUserEvents() {
    const e = this._listeners,
      t = this.platform,
      n = (n, r) => {
        t.addEventListener(this, n, r), (e[n] = r);
      },
      r = (e, t, n) => {
        (e.offsetX = t), (e.offsetY = n), this._eventHandler(e);
      };
    L(this.options.events, (e) => n(e, r));
  }
  bindResponsiveEvents() {
    this._responsiveListeners ||= {};
    let e = this._responsiveListeners,
      t = this.platform,
      n = (n, r) => {
        t.addEventListener(this, n, r), (e[n] = r);
      },
      r = (n, r) => {
        e[n] && (t.removeEventListener(this, n, r), delete e[n]);
      },
      i = (e, t) => {
        this.canvas && this.resize(e, t);
      },
      a,
      o = () => {
        r(`attach`, o), (this.attached = !0), this.resize(), n(`resize`, i), n(`detach`, a);
      };
    (a = () => {
      (this.attached = !1), r(`resize`, i), this._stop(), this._resize(0, 0), n(`attach`, o);
    }),
      t.isAttached(this.canvas) ? o() : a();
  }
  unbindEvents() {
    L(this._listeners, (e, t) => {
      this.platform.removeEventListener(this, t, e);
    }),
      (this._listeners = {}),
      L(this._responsiveListeners, (e, t) => {
        this.platform.removeEventListener(this, t, e);
      }),
      (this._responsiveListeners = void 0);
  }
  updateHoverStyle(e, t, n) {
    let r = n ? `set` : `remove`,
      i,
      a,
      o,
      s;
    for (
      t === `dataset` &&
        ((i = this.getDatasetMeta(e[0].datasetIndex)),
        i.controller[`_` + r + `DatasetHoverStyle`]()),
        o = 0,
        s = e.length;
      o < s;
      ++o
    ) {
      a = e[o];
      const t = a && this.getDatasetMeta(a.datasetIndex).controller;
      t && t[r + `HoverStyle`](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const t = this._active || [],
      n = e.map(({ datasetIndex: e, index: t }) => {
        const n = this.getDatasetMeta(e);
        if (!n) throw Error(`No dataset found at index ` + e);
        return { datasetIndex: e, element: n.data[t], index: t };
      });
    Oe(n, t) || ((this._active = n), (this._lastEvent = null), this._updateHoverStyles(n, t));
  }
  notifyPlugins(e, t, n) {
    return this._plugins.notify(this, e, t, n);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((t) => t.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, t, n) {
    const r = this.options.hover,
      i = (e, t) =>
        e.filter((e) => !t.some((t) => e.datasetIndex === t.datasetIndex && e.index === t.index)),
      a = i(t, e),
      o = n ? e : i(e, t);
    a.length && this.updateHoverStyle(a, r.mode, !1),
      o.length && r.mode && this.updateHoverStyle(o, r.mode, !0);
  }
  _eventHandler(e, t) {
    const n = { event: e, replay: t, cancelable: !0, inChartArea: this.isPointInArea(e) },
      r = (t) => (t.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins(`beforeEvent`, n, r) === !1) return;
    const i = this._handleEvent(e, t, n.inChartArea);
    return (
      (n.cancelable = !1),
      this.notifyPlugins(`afterEvent`, n, r),
      (i || n.changed) && this.render(),
      this
    );
  }
  _handleEvent(e, t, n) {
    const { _active: r = [], options: i } = this,
      a = t,
      o = this._getActiveElements(e, r, n, a),
      s = Ue(e),
      c = Wo(e, this._lastEvent, n, s);
    n &&
      ((this._lastEvent = null),
      I(i.onHover, [e, o, this], this),
      s && I(i.onClick, [e, o, this], this));
    const l = !Oe(o, r);
    return (
      (l || t) && ((this._active = o), this._updateHoverStyles(o, r, t)), (this._lastEvent = c), l
    );
  }
  _getActiveElements(e, t, n, r) {
    if (e.type === `mouseout`) return [];
    if (!n) return t;
    const i = this.options.hover;
    return this.getElementsAtEventForMode(e, i.mode, i, r);
  }
};
function Ko() {
  return L(Go.instances, (e) => e._plugins.invalidate());
}
function qo(e, t, n = t) {
  (e.lineCap = F(n.borderCapStyle, t.borderCapStyle)),
    e.setLineDash(F(n.borderDash, t.borderDash)),
    (e.lineDashOffset = F(n.borderDashOffset, t.borderDashOffset)),
    (e.lineJoin = F(n.borderJoinStyle, t.borderJoinStyle)),
    (e.lineWidth = F(n.borderWidth, t.borderWidth)),
    (e.strokeStyle = F(n.borderColor, t.borderColor));
}
function Jo(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Yo(e) {
  return e.stepped ? dn : e.tension || e.cubicInterpolationMode === `monotone` ? fn : Jo;
}
function Xo(e, t, n = {}) {
  const r = e.length,
    { start: i = 0, end: a = r - 1 } = n,
    { start: o, end: s } = t,
    c = Math.max(i, o),
    l = Math.min(a, s),
    u = (i < o && a < o) || (i > s && a > s);
  return { count: r, start: c, loop: t.loop, ilen: l < c && !u ? r + l - c : l - c };
}
function Zo(e, t, n, r) {
  let { points: i, options: a } = t,
    { count: o, start: s, loop: c, ilen: l } = Xo(i, n, r),
    u = Yo(a),
    { move: d = !0, reverse: f } = r || {},
    p,
    m,
    h;
  for (p = 0; p <= l; ++p)
    (m = i[(s + (f ? l - p : p)) % o]),
      !m.skip && (d ? (e.moveTo(m.x, m.y), (d = !1)) : u(e, h, m, f, a.stepped), (h = m));
  return c && ((m = i[(s + (f ? l : 0)) % o]), u(e, h, m, f, a.stepped)), !!c;
}
function Qo(e, t, n, r) {
  let i = t.points,
    { count: a, start: o, ilen: s } = Xo(i, n, r),
    { move: c = !0, reverse: l } = r || {},
    u = 0,
    d = 0,
    f,
    p,
    m,
    h,
    g,
    _,
    v = (e) => (o + (l ? s - e : e)) % a,
    y = () => {
      h !== g && (e.lineTo(u, g), e.lineTo(u, h), e.lineTo(u, _));
    };
  for (c && ((p = i[v(0)]), e.moveTo(p.x, p.y)), f = 0; f <= s; ++f) {
    if (((p = i[v(f)]), p.skip)) continue;
    const t = p.x,
      n = p.y,
      r = t | 0;
    r === m
      ? (n < h ? (h = n) : n > g && (g = n), (u = (d * u + t) / ++d))
      : (y(), e.lineTo(t, n), (m = r), (d = 0), (h = g = n)),
      (_ = n);
  }
  y();
}
function $o(e) {
  const t = e.options,
    n = t.borderDash && t.borderDash.length;
  return !e._decimated &&
    !e._loop &&
    !t.tension &&
    t.cubicInterpolationMode !== `monotone` &&
    !t.stepped &&
    !n
    ? Qo
    : Zo;
}
function es(e) {
  return e.stepped ? Cr : e.tension || e.cubicInterpolationMode === `monotone` ? wr : Sr;
}
function ts(e, t, n, r) {
  let i = t._path;
  i || ((i = t._path = new Path2D()), t.path(i, n, r) && i.closePath()),
    qo(e, t.options),
    e.stroke(i);
}
function ns(e, t, n, r) {
  const { segments: i, options: a } = t,
    o = $o(t);
  for (const s of i)
    qo(e, a, s.style),
      e.beginPath(),
      o(e, t, s, { start: n, end: n + r - 1 }) && e.closePath(),
      e.stroke();
}
var rs = typeof Path2D == `function`;
function is(e, t, n, r) {
  rs && !t.options.segment ? ts(e, t, n, r) : ns(e, t, n, r);
}
var as = class extends Ia {
  static id = `line`;
  static defaults = {
    borderCapStyle: `butt`,
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: `miter`,
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: `default`,
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0,
  };
  static defaultRoutes = { backgroundColor: `backgroundColor`, borderColor: `borderColor` };
  static descriptors = { _scriptable: !0, _indexable: (e) => e !== `borderDash` && e !== `fill` };
  constructor(e) {
    super(),
      (this.animated = !0),
      (this.options = void 0),
      (this._chart = void 0),
      (this._loop = void 0),
      (this._fullLoop = void 0),
      (this._path = void 0),
      (this._points = void 0),
      (this._segments = void 0),
      (this._decimated = !1),
      (this._pointsUpdated = !1),
      (this._datasetIndex = void 0),
      e && Object.assign(this, e);
  }
  updateControlPoints(e, t) {
    const n = this.options;
    if (
      (n.tension || n.cubicInterpolationMode === `monotone`) &&
      !n.stepped &&
      !this._pointsUpdated
    ) {
      const r = n.spanGaps ? this._loop : this._fullLoop;
      ar(this._points, n, e, r, t), (this._pointsUpdated = !0);
    }
  }
  set points(e) {
    (this._points = e), delete this._segments, delete this._path, (this._pointsUpdated = !1);
  }
  get points() {
    return this._points;
  }
  get segments() {
    return (this._segments ||= Lr(this, this.options.segment));
  }
  first() {
    const e = this.segments,
      t = this.points;
    return e.length && t[e[0].start];
  }
  last() {
    const e = this.segments,
      t = this.points,
      n = e.length;
    return n && t[e[n - 1].end];
  }
  interpolate(e, t) {
    const n = this.options,
      r = e[t],
      i = this.points,
      a = Pr(this, { property: t, start: r, end: r });
    if (!a.length) return;
    let o = [],
      s = es(n),
      c,
      l;
    for (c = 0, l = a.length; c < l; ++c) {
      const { start: l, end: u } = a[c],
        d = i[l],
        f = i[u];
      if (d === f) {
        o.push(d);
        continue;
      }
      const p = s(d, f, Math.abs((r - d[t]) / (f[t] - d[t])), n.stepped);
      (p[t] = e[t]), o.push(p);
    }
    return o.length === 1 ? o[0] : o;
  }
  pathSegment(e, t, n) {
    return $o(this)(e, this, t, n);
  }
  path(e, t, n) {
    let r = this.segments,
      i = $o(this),
      a = this._loop;
    (t ||= 0), (n ||= this.points.length - t);
    for (const o of r) a &= i(e, this, o, { start: t, end: t + n - 1 });
    return !!a;
  }
  draw(e, t, n, r) {
    const i = this.options || {};
    (this.points || []).length && i.borderWidth && (e.save(), is(e, this, n, r), e.restore()),
      this.animated && ((this._pointsUpdated = !1), (this._path = void 0));
  }
};
function os(e, t, n, r) {
  const i = e.options,
    { [n]: a } = e.getProps([n], r);
  return Math.abs(t - a) < i.radius + i.hitRadius;
}
var ss = class extends Ia {
  static id = `point`;
  parsed;
  skip;
  stop;
  static defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: `circle`,
    radius: 3,
    rotation: 0,
  };
  static defaultRoutes = { backgroundColor: `backgroundColor`, borderColor: `borderColor` };
  constructor(e) {
    super(),
      (this.options = void 0),
      (this.parsed = void 0),
      (this.skip = void 0),
      (this.stop = void 0),
      e && Object.assign(this, e);
  }
  inRange(e, t, n) {
    const r = this.options,
      { x: i, y: a } = this.getProps([`x`, `y`], n);
    return (e - i) ** 2 + (t - a) ** 2 < (r.hitRadius + r.radius) ** 2;
  }
  inXRange(e, t) {
    return os(this, e, `x`, t);
  }
  inYRange(e, t) {
    return os(this, e, `y`, t);
  }
  getCenterPoint(e) {
    const { x: t, y: n } = this.getProps([`x`, `y`], e);
    return { x: t, y: n };
  }
  size(e) {
    e = e || this.options || {};
    let t = e.radius || 0;
    t = Math.max(t, (t && e.hoverRadius) || 0);
    const n = (t && e.borderWidth) || 0;
    return (t + n) * 2;
  }
  draw(e, t) {
    const n = this.options;
    this.skip ||
      n.radius < 0.1 ||
      !cn(this, t, this.size(n) / 2) ||
      ((e.strokeStyle = n.borderColor),
      (e.lineWidth = n.borderWidth),
      (e.fillStyle = n.backgroundColor),
      on(e, n, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
};
function cs(e, t) {
  let {
      x: n,
      y: r,
      base: i,
      width: a,
      height: o,
    } = e.getProps([`x`, `y`, `base`, `width`, `height`], t),
    s,
    c,
    l,
    u,
    d;
  return (
    e.horizontal
      ? ((d = o / 2), (s = Math.min(n, i)), (c = Math.max(n, i)), (l = r - d), (u = r + d))
      : ((d = a / 2), (s = n - d), (c = n + d), (l = Math.min(r, i)), (u = Math.max(r, i))),
    { left: s, top: l, right: c, bottom: u }
  );
}
function ls(e, t, n, r) {
  return e ? 0 : mt(t, n, r);
}
function us(e, t, n) {
  const r = e.options.borderWidth,
    i = e.borderSkipped,
    a = Cn(r);
  return {
    t: ls(i.top, a.top, 0, n),
    r: ls(i.right, a.right, 0, t),
    b: ls(i.bottom, a.bottom, 0, n),
    l: ls(i.left, a.left, 0, t),
  };
}
function ds(e, t, n) {
  const { enableBorderRadius: r } = e.getProps([`enableBorderRadius`]),
    i = e.options.borderRadius,
    a = wn(i),
    o = Math.min(t, n),
    s = e.borderSkipped,
    c = r || P(i);
  return {
    topLeft: ls(!c || s.top || s.left, a.topLeft, 0, o),
    topRight: ls(!c || s.top || s.right, a.topRight, 0, o),
    bottomLeft: ls(!c || s.bottom || s.left, a.bottomLeft, 0, o),
    bottomRight: ls(!c || s.bottom || s.right, a.bottomRight, 0, o),
  };
}
function fs(e) {
  const t = cs(e),
    n = t.right - t.left,
    r = t.bottom - t.top,
    i = us(e, n / 2, r / 2),
    a = ds(e, n / 2, r / 2);
  return {
    outer: { x: t.left, y: t.top, w: n, h: r, radius: a },
    inner: {
      x: t.left + i.l,
      y: t.top + i.t,
      w: n - i.l - i.r,
      h: r - i.t - i.b,
      radius: {
        topLeft: Math.max(0, a.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, a.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, a.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, a.bottomRight - Math.max(i.b, i.r)),
      },
    },
  };
}
function ps(e, t, n, r) {
  const i = t === null,
    a = n === null,
    o = e && !(i && a) && cs(e, r);
  return o && (i || gt(t, o.left, o.right)) && (a || gt(n, o.top, o.bottom));
}
function ms(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function hs(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function gs(e, t, n = {}) {
  const r = e.x === n.x ? 0 : -t,
    i = e.y === n.y ? 0 : -t,
    a = (e.x + e.w === n.x + n.w ? 0 : t) - r,
    o = (e.y + e.h === n.y + n.h ? 0 : t) - i;
  return { x: e.x + r, y: e.y + i, w: e.w + a, h: e.h + o, radius: e.radius };
}
var _s = class extends Ia {
    static id = `bar`;
    static defaults = {
      borderSkipped: `start`,
      borderWidth: 0,
      borderRadius: 0,
      inflateAmount: `auto`,
      pointStyle: void 0,
    };
    static defaultRoutes = { backgroundColor: `backgroundColor`, borderColor: `borderColor` };
    constructor(e) {
      super(),
        (this.options = void 0),
        (this.horizontal = void 0),
        (this.base = void 0),
        (this.width = void 0),
        (this.height = void 0),
        (this.inflateAmount = void 0),
        e && Object.assign(this, e);
    }
    draw(e) {
      const {
          inflateAmount: t,
          options: { borderColor: n, backgroundColor: r },
        } = this,
        { inner: i, outer: a } = fs(this),
        o = ms(a.radius) ? _n : hs;
      e.save(),
        (a.w !== i.w || a.h !== i.h) &&
          (e.beginPath(),
          o(e, gs(a, t, i)),
          e.clip(),
          o(e, gs(i, -t, a)),
          (e.fillStyle = n),
          e.fill(`evenodd`)),
        e.beginPath(),
        o(e, gs(i, t)),
        (e.fillStyle = r),
        e.fill(),
        e.restore();
    }
    inRange(e, t, n) {
      return ps(this, e, t, n);
    }
    inXRange(e, t) {
      return ps(this, e, null, t);
    }
    inYRange(e, t) {
      return ps(this, null, e, t);
    }
    getCenterPoint(e) {
      const {
        x: t,
        y: n,
        base: r,
        horizontal: i,
      } = this.getProps([`x`, `y`, `base`, `horizontal`], e);
      return { x: i ? (t + r) / 2 : t, y: i ? n : (n + r) / 2 };
    }
    getRange(e) {
      return e === `x` ? this.width / 2 : this.height / 2;
    }
  },
  vs = [
    `rgb(54, 162, 235)`,
    `rgb(255, 99, 132)`,
    `rgb(255, 159, 64)`,
    `rgb(255, 205, 86)`,
    `rgb(75, 192, 192)`,
    `rgb(153, 102, 255)`,
    `rgb(201, 203, 207)`,
  ],
  ys = vs.map((e) => e.replace(`rgb(`, `rgba(`).replace(`)`, `, 0.5)`));
function bs(e) {
  return vs[e % vs.length];
}
function xs(e) {
  return ys[e % ys.length];
}
function Ss(e, t) {
  return (e.borderColor = bs(t)), (e.backgroundColor = xs(t)), ++t;
}
function Cs(e, t) {
  return (e.backgroundColor = e.data.map(() => bs(t++))), t;
}
function ws(e, t) {
  return (e.backgroundColor = e.data.map(() => xs(t++))), t;
}
function Ts(e) {
  let t = 0;
  return (n, r) => {
    const i = e.getDatasetMeta(r).controller;
    i instanceof Fi ? (t = Cs(n, t)) : i instanceof Li ? (t = ws(n, t)) : i && (t = Ss(n, t));
  };
}
function Es(e) {
  let t;
  for (t in e) if (e[t].borderColor || e[t].backgroundColor) return !0;
  return !1;
}
function Ds(e) {
  return e && (e.borderColor || e.backgroundColor);
}
function Os() {
  return z.borderColor !== `rgba(0,0,0,0.1)` || z.backgroundColor !== `rgba(0,0,0,0.1)`;
}
var ks = {
    id: `colors`,
    defaults: { enabled: !0, forceOverride: !1 },
    beforeLayout(e, t, n) {
      if (!n.enabled) return;
      const {
          data: { datasets: r },
          options: i,
        } = e.config,
        { elements: a } = i,
        o = Es(r) || Ds(i) || (a && Es(a)) || Os();
      if (!n.forceOverride && o) return;
      const s = Ts(e);
      r.forEach(s);
    },
  },
  As = {
    average(e) {
      if (!e.length) return !1;
      let t,
        n,
        r = new Set(),
        i = 0,
        a = 0;
      for (t = 0, n = e.length; t < n; ++t) {
        const n = e[t].element;
        if (n && n.hasValue()) {
          const e = n.tooltipPosition();
          r.add(e.x), (i += e.y), ++a;
        }
      }
      return a === 0 || r.size === 0
        ? !1
        : { x: [...r].reduce((e, t) => e + t) / r.size, y: i / a };
    },
    nearest(e, t) {
      if (!e.length) return !1;
      let n = t.x,
        r = t.y,
        i = 1 / 0,
        a,
        o,
        s;
      for (a = 0, o = e.length; a < o; ++a) {
        const n = e[a].element;
        if (n && n.hasValue()) {
          const e = ut(t, n.getCenterPoint());
          e < i && ((i = e), (s = n));
        }
      }
      if (s) {
        const e = s.tooltipPosition();
        (n = e.x), (r = e.y);
      }
      return { x: n, y: r };
    },
  };
function js(e, t) {
  return t && (N(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Ms(e) {
  return (typeof e == `string` || e instanceof String) &&
    e.indexOf(`
`) > -1
    ? e.split(`
`)
    : e;
}
function Ns(e, t) {
  const { element: n, datasetIndex: r, index: i } = t,
    a = e.getDatasetMeta(r).controller,
    { label: o, value: s } = a.getLabelAndValue(i);
  return {
    chart: e,
    label: o,
    parsed: a.getParsed(i),
    raw: e.data.datasets[r].data[i],
    formattedValue: s,
    dataset: a.getDataset(),
    dataIndex: i,
    datasetIndex: r,
    element: n,
  };
}
function Ps(e, t) {
  let n = e.chart.ctx,
    { body: r, footer: i, title: a } = e,
    { boxWidth: o, boxHeight: s } = t,
    c = En(t.bodyFont),
    l = En(t.titleFont),
    u = En(t.footerFont),
    d = a.length,
    f = i.length,
    p = r.length,
    m = Tn(t.padding),
    h = m.height,
    g = 0,
    _ = r.reduce((e, t) => e + t.before.length + t.lines.length + t.after.length, 0);
  if (
    ((_ += e.beforeBody.length + e.afterBody.length),
    d && (h += d * l.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom),
    _)
  ) {
    const e = t.displayColors ? Math.max(s, c.lineHeight) : c.lineHeight;
    h += p * e + (_ - p) * c.lineHeight + (_ - 1) * t.bodySpacing;
  }
  f && (h += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
  let v = 0,
    y = function (e) {
      g = Math.max(g, n.measureText(e).width + v);
    };
  return (
    n.save(),
    (n.font = l.string),
    L(e.title, y),
    (n.font = c.string),
    L(e.beforeBody.concat(e.afterBody), y),
    (v = t.displayColors ? o + 2 + t.boxPadding : 0),
    L(r, (e) => {
      L(e.before, y), L(e.lines, y), L(e.after, y);
    }),
    (v = 0),
    (n.font = u.string),
    L(e.footer, y),
    n.restore(),
    (g += m.width),
    { width: g, height: h }
  );
}
function Fs(e, t) {
  const { y: n, height: r } = t;
  return n < r / 2 ? `top` : n > e.height - r / 2 ? `bottom` : `center`;
}
function Is(e, t, n, r) {
  const { x: i, width: a } = r,
    o = n.caretSize + n.caretPadding;
  if ((e === `left` && i + a + o > t.width) || (e === `right` && i - a - o < 0)) return !0;
}
function Ls(e, t, n, r) {
  let { x: i, width: a } = n,
    {
      width: o,
      chartArea: { left: s, right: c },
    } = e,
    l = `center`;
  return (
    r === `center`
      ? (l = i <= (s + c) / 2 ? `left` : `right`)
      : i <= a / 2
        ? (l = `left`)
        : i >= o - a / 2 && (l = `right`),
    Is(l, e, t, n) && (l = `center`),
    l
  );
}
function Rs(e, t, n) {
  const r = n.yAlign || t.yAlign || Fs(e, n);
  return { xAlign: n.xAlign || t.xAlign || Ls(e, t, n, r), yAlign: r };
}
function zs(e, t) {
  let { x: n, width: r } = e;
  return t === `right` ? (n -= r) : t === `center` && (n -= r / 2), n;
}
function Bs(e, t, n) {
  let { y: r, height: i } = e;
  return t === `top` ? (r += n) : t === `bottom` ? (r -= i + n) : (r -= i / 2), r;
}
function Vs(e, t, n, r) {
  let { caretSize: i, caretPadding: a, cornerRadius: o } = e,
    { xAlign: s, yAlign: c } = n,
    l = i + a,
    { topLeft: u, topRight: d, bottomLeft: f, bottomRight: p } = wn(o),
    m = zs(t, s),
    h = Bs(t, c, l);
  return (
    c === `center`
      ? s === `left`
        ? (m += l)
        : s === `right` && (m -= l)
      : s === `left`
        ? (m -= Math.max(u, f) + i)
        : s === `right` && (m += Math.max(d, p) + i),
    { x: mt(m, 0, r.width - t.width), y: mt(h, 0, r.height - t.height) }
  );
}
function Hs(e, t, n) {
  const r = Tn(n.padding);
  return t === `center`
    ? e.x + e.width / 2
    : t === `right`
      ? e.x + e.width - r.right
      : e.x + r.left;
}
function Us(e) {
  return js([], Ms(e));
}
function Ws(e, t, n) {
  return kn(e, { tooltip: t, tooltipItems: n, type: `tooltip` });
}
function Gs(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
var Ks = {
  beforeTitle: Se,
  title(e) {
    if (e.length > 0) {
      const t = e[0],
        n = t.chart.data.labels,
        r = n ? n.length : 0;
      if (this && this.options && this.options.mode === `dataset`) return t.dataset.label || ``;
      if (t.label) return t.label;
      if (r > 0 && t.dataIndex < r) return n[t.dataIndex];
    }
    return ``;
  },
  afterTitle: Se,
  beforeBody: Se,
  beforeLabel: Se,
  label(e) {
    if (this && this.options && this.options.mode === `dataset`)
      return e.label + `: ` + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || ``;
    t && (t += `: `);
    const n = e.formattedValue;
    return M(n) || (t += n), t;
  },
  labelColor(e) {
    const t = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: t.borderColor,
      backgroundColor: t.backgroundColor,
      borderWidth: t.borderWidth,
      borderDash: t.borderDash,
      borderDashOffset: t.borderDashOffset,
      borderRadius: 0,
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const t = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return { pointStyle: t.pointStyle, rotation: t.rotation };
  },
  afterLabel: Se,
  afterBody: Se,
  beforeFooter: Se,
  footer: Se,
  afterFooter: Se,
};
function qs(e, t, n, r) {
  const i = e[t].call(n, r);
  return i === void 0 ? Ks[t].call(n, r) : i;
}
var Js = class extends Ia {
    static positioners = As;
    constructor(e) {
      super(),
        (this.opacity = 0),
        (this._active = []),
        (this._eventPosition = void 0),
        (this._size = void 0),
        (this._cachedAnimations = void 0),
        (this._tooltipItems = []),
        (this.$animations = void 0),
        (this.$context = void 0),
        (this.chart = e.chart),
        (this.options = e.options),
        (this.dataPoints = void 0),
        (this.title = void 0),
        (this.beforeBody = void 0),
        (this.body = void 0),
        (this.afterBody = void 0),
        (this.footer = void 0),
        (this.xAlign = void 0),
        (this.yAlign = void 0),
        (this.x = void 0),
        (this.y = void 0),
        (this.height = void 0),
        (this.width = void 0),
        (this.caretX = void 0),
        (this.caretY = void 0),
        (this.labelColors = void 0),
        (this.labelPointStyles = void 0),
        (this.labelTextColors = void 0);
    }
    initialize(e) {
      (this.options = e), (this._cachedAnimations = void 0), (this.$context = void 0);
    }
    _resolveAnimations() {
      const e = this._cachedAnimations;
      if (e) return e;
      const t = this.chart,
        n = this.options.setContext(this.getContext()),
        r = n.enabled && t.options.animation && n.animations,
        i = new Yr(this.chart, r);
      return r._cacheable && (this._cachedAnimations = Object.freeze(i)), i;
    }
    getContext() {
      return (this.$context ||= Ws(this.chart.getContext(), this, this._tooltipItems));
    }
    getTitle(e, t) {
      let { callbacks: n } = t,
        r = qs(n, `beforeTitle`, this, e),
        i = qs(n, `title`, this, e),
        a = qs(n, `afterTitle`, this, e),
        o = [];
      return (o = js(o, Ms(r))), (o = js(o, Ms(i))), (o = js(o, Ms(a))), o;
    }
    getBeforeBody(e, t) {
      return Us(qs(t.callbacks, `beforeBody`, this, e));
    }
    getBody(e, t) {
      const { callbacks: n } = t,
        r = [];
      return (
        L(e, (e) => {
          const t = { before: [], lines: [], after: [] },
            i = Gs(n, e);
          js(t.before, Ms(qs(i, `beforeLabel`, this, e))),
            js(t.lines, qs(i, `label`, this, e)),
            js(t.after, Ms(qs(i, `afterLabel`, this, e))),
            r.push(t);
        }),
        r
      );
    }
    getAfterBody(e, t) {
      return Us(qs(t.callbacks, `afterBody`, this, e));
    }
    getFooter(e, t) {
      let { callbacks: n } = t,
        r = qs(n, `beforeFooter`, this, e),
        i = qs(n, `footer`, this, e),
        a = qs(n, `afterFooter`, this, e),
        o = [];
      return (o = js(o, Ms(r))), (o = js(o, Ms(i))), (o = js(o, Ms(a))), o;
    }
    _createItems(e) {
      let t = this._active,
        n = this.chart.data,
        r = [],
        i = [],
        a = [],
        o = [],
        s,
        c;
      for (s = 0, c = t.length; s < c; ++s) o.push(Ns(this.chart, t[s]));
      return (
        e.filter && (o = o.filter((t, r, i) => e.filter(t, r, i, n))),
        e.itemSort && (o = o.sort((t, r) => e.itemSort(t, r, n))),
        L(o, (t) => {
          const n = Gs(e.callbacks, t);
          r.push(qs(n, `labelColor`, this, t)),
            i.push(qs(n, `labelPointStyle`, this, t)),
            a.push(qs(n, `labelTextColor`, this, t));
        }),
        (this.labelColors = r),
        (this.labelPointStyles = i),
        (this.labelTextColors = a),
        (this.dataPoints = o),
        o
      );
    }
    update(e, t) {
      let n = this.options.setContext(this.getContext()),
        r = this._active,
        i,
        a = [];
      if (r.length) {
        const e = As[n.position].call(this, r, this._eventPosition);
        (a = this._createItems(n)),
          (this.title = this.getTitle(a, n)),
          (this.beforeBody = this.getBeforeBody(a, n)),
          (this.body = this.getBody(a, n)),
          (this.afterBody = this.getAfterBody(a, n)),
          (this.footer = this.getFooter(a, n));
        const t = (this._size = Ps(this, n)),
          o = Object.assign({}, e, t),
          s = Rs(this.chart, n, o),
          c = Vs(n, o, s, this.chart);
        (this.xAlign = s.xAlign),
          (this.yAlign = s.yAlign),
          (i = {
            opacity: 1,
            x: c.x,
            y: c.y,
            width: t.width,
            height: t.height,
            caretX: e.x,
            caretY: e.y,
          });
      } else this.opacity !== 0 && (i = { opacity: 0 });
      (this._tooltipItems = a),
        (this.$context = void 0),
        i && this._resolveAnimations().update(this, i),
        e && n.external && n.external.call(this, { chart: this.chart, tooltip: this, replay: t });
    }
    drawCaret(e, t, n, r) {
      const i = this.getCaretPosition(e, n, r);
      t.lineTo(i.x1, i.y1), t.lineTo(i.x2, i.y2), t.lineTo(i.x3, i.y3);
    }
    getCaretPosition(e, t, n) {
      let { xAlign: r, yAlign: i } = this,
        { caretSize: a, cornerRadius: o } = n,
        { topLeft: s, topRight: c, bottomLeft: l, bottomRight: u } = wn(o),
        { x: d, y: f } = e,
        { width: p, height: m } = t,
        h,
        g,
        _,
        v,
        y,
        b;
      return (
        i === `center`
          ? ((y = f + m / 2),
            r === `left`
              ? ((h = d), (g = h - a), (v = y + a), (b = y - a))
              : ((h = d + p), (g = h + a), (v = y - a), (b = y + a)),
            (_ = h))
          : ((g =
              r === `left`
                ? d + Math.max(s, l) + a
                : r === `right`
                  ? d + p - Math.max(c, u) - a
                  : this.caretX),
            i === `top`
              ? ((v = f), (y = v - a), (h = g - a), (_ = g + a))
              : ((v = f + m), (y = v + a), (h = g + a), (_ = g - a)),
            (b = v)),
        { x1: h, x2: g, x3: _, y1: v, y2: y, y3: b }
      );
    }
    drawTitle(e, t, n) {
      let r = this.title,
        i = r.length,
        a,
        o,
        s;
      if (i) {
        const c = Dr(n.rtl, this.x, this.width);
        for (
          e.x = Hs(this, n.titleAlign, n),
            t.textAlign = c.textAlign(n.titleAlign),
            t.textBaseline = `middle`,
            a = En(n.titleFont),
            o = n.titleSpacing,
            t.fillStyle = n.titleColor,
            t.font = a.string,
            s = 0;
          s < i;
          ++s
        )
          t.fillText(r[s], c.x(e.x), e.y + a.lineHeight / 2),
            (e.y += a.lineHeight + o),
            s + 1 === i && (e.y += n.titleMarginBottom - o);
      }
    }
    _drawColorBox(e, t, n, r, i) {
      const a = this.labelColors[n],
        o = this.labelPointStyles[n],
        { boxHeight: s, boxWidth: c } = i,
        l = En(i.bodyFont),
        u = Hs(this, `left`, i),
        d = r.x(u),
        f = s < l.lineHeight ? (l.lineHeight - s) / 2 : 0,
        p = t.y + f;
      if (i.usePointStyle) {
        const t = {
            radius: Math.min(c, s) / 2,
            pointStyle: o.pointStyle,
            rotation: o.rotation,
            borderWidth: 1,
          },
          n = r.leftForLtr(d, c) + c / 2,
          l = p + s / 2;
        (e.strokeStyle = i.multiKeyBackground),
          (e.fillStyle = i.multiKeyBackground),
          on(e, t, n, l),
          (e.strokeStyle = a.borderColor),
          (e.fillStyle = a.backgroundColor),
          on(e, t, n, l);
      } else {
        (e.lineWidth = P(a.borderWidth)
          ? Math.max(...Object.values(a.borderWidth))
          : a.borderWidth || 1),
          (e.strokeStyle = a.borderColor),
          e.setLineDash(a.borderDash || []),
          (e.lineDashOffset = a.borderDashOffset || 0);
        const t = r.leftForLtr(d, c),
          n = r.leftForLtr(r.xPlus(d, 1), c - 2),
          o = wn(a.borderRadius);
        Object.values(o).some((e) => e !== 0)
          ? (e.beginPath(),
            (e.fillStyle = i.multiKeyBackground),
            _n(e, { x: t, y: p, w: c, h: s, radius: o }),
            e.fill(),
            e.stroke(),
            (e.fillStyle = a.backgroundColor),
            e.beginPath(),
            _n(e, { x: n, y: p + 1, w: c - 2, h: s - 2, radius: o }),
            e.fill())
          : ((e.fillStyle = i.multiKeyBackground),
            e.fillRect(t, p, c, s),
            e.strokeRect(t, p, c, s),
            (e.fillStyle = a.backgroundColor),
            e.fillRect(n, p + 1, c - 2, s - 2));
      }
      e.fillStyle = this.labelTextColors[n];
    }
    drawBody(e, t, n) {
      let { body: r } = this,
        {
          bodySpacing: i,
          bodyAlign: a,
          displayColors: o,
          boxHeight: s,
          boxWidth: c,
          boxPadding: l,
        } = n,
        u = En(n.bodyFont),
        d = u.lineHeight,
        f = 0,
        p = Dr(n.rtl, this.x, this.width),
        m = function (n) {
          t.fillText(n, p.x(e.x + f), e.y + d / 2), (e.y += d + i);
        },
        h = p.textAlign(a),
        g,
        _,
        v,
        y,
        b,
        x,
        S;
      for (
        t.textAlign = a,
          t.textBaseline = `middle`,
          t.font = u.string,
          e.x = Hs(this, h, n),
          t.fillStyle = n.bodyColor,
          L(this.beforeBody, m),
          f = o && h !== `right` ? (a === `center` ? c / 2 + l : c + 2 + l) : 0,
          y = 0,
          x = r.length;
        y < x;
        ++y
      ) {
        for (
          g = r[y],
            _ = this.labelTextColors[y],
            t.fillStyle = _,
            L(g.before, m),
            v = g.lines,
            o && v.length && (this._drawColorBox(t, e, y, p, n), (d = Math.max(u.lineHeight, s))),
            b = 0,
            S = v.length;
          b < S;
          ++b
        )
          m(v[b]), (d = u.lineHeight);
        L(g.after, m);
      }
      (f = 0), (d = u.lineHeight), L(this.afterBody, m), (e.y -= i);
    }
    drawFooter(e, t, n) {
      let r = this.footer,
        i = r.length,
        a,
        o;
      if (i) {
        const s = Dr(n.rtl, this.x, this.width);
        for (
          e.x = Hs(this, n.footerAlign, n),
            e.y += n.footerMarginTop,
            t.textAlign = s.textAlign(n.footerAlign),
            t.textBaseline = `middle`,
            a = En(n.footerFont),
            t.fillStyle = n.footerColor,
            t.font = a.string,
            o = 0;
          o < i;
          ++o
        )
          t.fillText(r[o], s.x(e.x), e.y + a.lineHeight / 2),
            (e.y += a.lineHeight + n.footerSpacing);
      }
    }
    drawBackground(e, t, n, r) {
      const { xAlign: i, yAlign: a } = this,
        { x: o, y: s } = e,
        { width: c, height: l } = n,
        { topLeft: u, topRight: d, bottomLeft: f, bottomRight: p } = wn(r.cornerRadius);
      (t.fillStyle = r.backgroundColor),
        (t.strokeStyle = r.borderColor),
        (t.lineWidth = r.borderWidth),
        t.beginPath(),
        t.moveTo(o + u, s),
        a === `top` && this.drawCaret(e, t, n, r),
        t.lineTo(o + c - d, s),
        t.quadraticCurveTo(o + c, s, o + c, s + d),
        a === `center` && i === `right` && this.drawCaret(e, t, n, r),
        t.lineTo(o + c, s + l - p),
        t.quadraticCurveTo(o + c, s + l, o + c - p, s + l),
        a === `bottom` && this.drawCaret(e, t, n, r),
        t.lineTo(o + f, s + l),
        t.quadraticCurveTo(o, s + l, o, s + l - f),
        a === `center` && i === `left` && this.drawCaret(e, t, n, r),
        t.lineTo(o, s + u),
        t.quadraticCurveTo(o, s, o + u, s),
        t.closePath(),
        t.fill(),
        r.borderWidth > 0 && t.stroke();
    }
    _updateAnimationTarget(e) {
      const t = this.chart,
        n = this.$animations,
        r = n && n.x,
        i = n && n.y;
      if (r || i) {
        const n = As[e.position].call(this, this._active, this._eventPosition);
        if (!n) return;
        const a = (this._size = Ps(this, e)),
          o = Object.assign({}, n, this._size),
          s = Rs(t, e, o),
          c = Vs(e, o, s, t);
        (r._to !== c.x || i._to !== c.y) &&
          ((this.xAlign = s.xAlign),
          (this.yAlign = s.yAlign),
          (this.width = a.width),
          (this.height = a.height),
          (this.caretX = n.x),
          (this.caretY = n.y),
          this._resolveAnimations().update(this, c));
      }
    }
    _willRender() {
      return !!this.opacity;
    }
    draw(e) {
      let t = this.options.setContext(this.getContext()),
        n = this.opacity;
      if (!n) return;
      this._updateAnimationTarget(t);
      const r = { width: this.width, height: this.height },
        i = { x: this.x, y: this.y };
      n = Math.abs(n) < 0.001 ? 0 : n;
      const a = Tn(t.padding),
        o =
          this.title.length ||
          this.beforeBody.length ||
          this.body.length ||
          this.afterBody.length ||
          this.footer.length;
      t.enabled &&
        o &&
        (e.save(),
        (e.globalAlpha = n),
        this.drawBackground(i, e, r, t),
        Or(e, t.textDirection),
        (i.y += a.top),
        this.drawTitle(i, e, t),
        this.drawBody(i, e, t),
        this.drawFooter(i, e, t),
        kr(e, t.textDirection),
        e.restore());
    }
    getActiveElements() {
      return this._active || [];
    }
    setActiveElements(e, t) {
      const n = this._active,
        r = e.map(({ datasetIndex: e, index: t }) => {
          const n = this.chart.getDatasetMeta(e);
          if (!n) throw Error(`Cannot find a dataset at index ` + e);
          return { datasetIndex: e, element: n.data[t], index: t };
        }),
        i = !Oe(n, r),
        a = this._positionChanged(r, t);
      (i || a) &&
        ((this._active = r),
        (this._eventPosition = t),
        (this._ignoreReplayEvents = !0),
        this.update(!0));
    }
    handleEvent(e, t, n = !0) {
      if (t && this._ignoreReplayEvents) return !1;
      this._ignoreReplayEvents = !1;
      const r = this.options,
        i = this._active || [],
        a = this._getActiveElements(e, i, t, n),
        o = this._positionChanged(a, e),
        s = t || !Oe(a, i) || o;
      return (
        s &&
          ((this._active = a),
          (r.enabled || r.external) &&
            ((this._eventPosition = { x: e.x, y: e.y }), this.update(!0, t))),
        s
      );
    }
    _getActiveElements(e, t, n, r) {
      const i = this.options;
      if (e.type === `mouseout`) return [];
      if (!r)
        return t.filter(
          (e) =>
            this.chart.data.datasets[e.datasetIndex] &&
            this.chart.getDatasetMeta(e.datasetIndex).controller.getParsed(e.index) !== void 0,
        );
      const a = this.chart.getElementsAtEventForMode(e, i.mode, i, n);
      return i.reverse && a.reverse(), a;
    }
    _positionChanged(e, t) {
      const { caretX: n, caretY: r, options: i } = this,
        a = As[i.position].call(this, e, t);
      return a !== !1 && (n !== a.x || r !== a.y);
    }
  },
  Ys = {
    id: `tooltip`,
    _element: Js,
    positioners: As,
    afterInit(e, t, n) {
      n && (e.tooltip = new Js({ chart: e, options: n }));
    },
    beforeUpdate(e, t, n) {
      e.tooltip && e.tooltip.initialize(n);
    },
    reset(e, t, n) {
      e.tooltip && e.tooltip.initialize(n);
    },
    afterDraw(e) {
      const t = e.tooltip;
      if (t && t._willRender()) {
        const n = { tooltip: t };
        if (e.notifyPlugins(`beforeTooltipDraw`, { ...n, cancelable: !0 }) === !1) return;
        t.draw(e.ctx), e.notifyPlugins(`afterTooltipDraw`, n);
      }
    },
    afterEvent(e, t) {
      if (e.tooltip) {
        const n = t.replay;
        e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
      }
    },
    defaults: {
      enabled: !0,
      external: null,
      position: `average`,
      backgroundColor: `rgba(0,0,0,0.8)`,
      titleColor: `#fff`,
      titleFont: { weight: `bold` },
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleAlign: `left`,
      bodyColor: `#fff`,
      bodySpacing: 2,
      bodyFont: {},
      bodyAlign: `left`,
      footerColor: `#fff`,
      footerSpacing: 2,
      footerMarginTop: 6,
      footerFont: { weight: `bold` },
      footerAlign: `left`,
      padding: 6,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      boxHeight: (e, t) => t.bodyFont.size,
      boxWidth: (e, t) => t.bodyFont.size,
      multiKeyBackground: `#fff`,
      displayColors: !0,
      boxPadding: 0,
      borderColor: `rgba(0,0,0,0)`,
      borderWidth: 0,
      animation: { duration: 400, easing: `easeOutQuart` },
      animations: {
        numbers: { type: `number`, properties: [`x`, `y`, `width`, `height`, `caretX`, `caretY`] },
        opacity: { easing: `linear`, duration: 200 },
      },
      callbacks: Ks,
    },
    defaultRoutes: { bodyFont: `font`, footerFont: `font`, titleFont: `font` },
    descriptors: {
      _scriptable: (e) => e !== `filter` && e !== `itemSort` && e !== `external`,
      _indexable: !1,
      callbacks: { _scriptable: !1, _indexable: !1 },
      animation: { _fallback: !1 },
      animations: { _fallback: `animation` },
    },
    additionalOptionScopes: [`interaction`],
  },
  Xs = (e, t, n, r) => (
    typeof t == `string`
      ? ((n = e.push(t) - 1), r.unshift({ index: n, label: t }))
      : isNaN(t) && (n = null),
    n
  );
function Zs(e, t, n, r) {
  const i = e.indexOf(t);
  return i === -1 ? Xs(e, t, n, r) : i === e.lastIndexOf(t) ? i : n;
}
var Qs = (e, t) => (e === null ? null : mt(Math.round(e), 0, t));
function $s(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
var ec = class extends no {
  static id = `category`;
  static defaults = { ticks: { callback: $s } };
  constructor(e) {
    super(e), (this._startValue = void 0), (this._valueRange = 0), (this._addedLabels = []);
  }
  init(e) {
    const t = this._addedLabels;
    if (t.length) {
      const e = this.getLabels();
      for (const { index: n, label: r } of t) e[n] === r && e.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, t) {
    if (M(e)) return null;
    const n = this.getLabels();
    return (
      (t = isFinite(t) && n[t] === e ? t : Zs(n, e, F(t, e), this._addedLabels)),
      Qs(t, n.length - 1)
    );
  }
  determineDataLimits() {
    let { minDefined: e, maxDefined: t } = this.getUserBounds(),
      { min: n, max: r } = this.getMinMax(!0);
    this.options.bounds === `ticks` && (e || (n = 0), t || (r = this.getLabels().length - 1)),
      (this.min = n),
      (this.max = r);
  }
  buildTicks() {
    let e = this.min,
      t = this.max,
      n = this.options.offset,
      r = [],
      i = this.getLabels();
    (i = e === 0 && t === i.length - 1 ? i : i.slice(e, t + 1)),
      (this._valueRange = Math.max(i.length - +!n, 1)),
      (this._startValue = this.min - (n ? 0.5 : 0));
    for (let n = e; n <= t; n++) r.push({ value: n });
    return r;
  }
  getLabelForValue(e) {
    return $s.call(this, e);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(e) {
    return (
      typeof e != `number` && (e = this.parse(e)),
      e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange)
    );
  }
  getPixelForTick(e) {
    const t = this.ticks;
    return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
  }
  getValueForPixel(e) {
    return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
};
function tc(e, t) {
  let n = [],
    {
      bounds: r,
      step: i,
      min: a,
      max: o,
      precision: s,
      count: c,
      maxTicks: l,
      maxDigits: u,
      includeBounds: d,
    } = e,
    f = i || 1,
    p = l - 1,
    { min: m, max: h } = t,
    g = !M(a),
    _ = !M(o),
    v = !M(c),
    y = (h - m) / (u + 1),
    b = et((h - m) / p / f) * f,
    x,
    S,
    C,
    w;
  if (b < 1e-14 && !g && !_) return [{ value: m }, { value: h }];
  (w = Math.ceil(h / b) - Math.floor(m / b)),
    w > p && (b = et((w * b) / p / f) * f),
    M(s) || ((x = 10 ** s), (b = Math.ceil(b * x) / x)),
    r === `ticks` ? ((S = Math.floor(m / b) * b), (C = Math.ceil(h / b) * b)) : ((S = m), (C = h)),
    g && _ && i && it((o - a) / i, b / 1e3)
      ? ((w = Math.round(Math.min((o - a) / b, l))), (b = (o - a) / w), (S = a), (C = o))
      : v
        ? ((S = g ? a : S), (C = _ ? o : C), (w = c - 1), (b = (C - S) / w))
        : ((w = (C - S) / b), (w = $e(w, Math.round(w), b / 1e3) ? Math.round(w) : Math.ceil(w)));
  const T = Math.max(ct(b), ct(S));
  (x = 10 ** (M(s) ? T : s)), (S = Math.round(S * x) / x), (C = Math.round(C * x) / x);
  let E = 0;
  for (
    g &&
    (d && S !== a
      ? (n.push({ value: a }),
        S < a && E++,
        $e(Math.round((S + E * b) * x) / x, a, nc(a, y, e)) && E++)
      : S < a && E++);
    E < w;
    ++E
  ) {
    const e = Math.round((S + E * b) * x) / x;
    if (_ && e > o) break;
    n.push({ value: e });
  }
  return (
    _ && d && C !== o
      ? n.length && $e(n[n.length - 1].value, o, nc(o, y, e))
        ? (n[n.length - 1].value = o)
        : n.push({ value: o })
      : (!_ || C === o) && n.push({ value: C }),
    n
  );
}
function nc(e, t, { horizontal: n, minRotation: r }) {
  const i = ot(r),
    a = (n ? Math.sin(i) : Math.cos(i)) || 0.001,
    o = 0.75 * t * (`` + e).length;
  return Math.min(t / a, o);
}
var rc = class extends no {
    constructor(e) {
      super(e),
        (this.start = void 0),
        (this.end = void 0),
        (this._startValue = void 0),
        (this._endValue = void 0),
        (this._valueRange = 0);
    }
    parse(e, t) {
      return M(e) || ((typeof e == `number` || e instanceof Number) && !isFinite(+e)) ? null : +e;
    }
    handleTickRangeOptions() {
      let { beginAtZero: e } = this.options,
        { minDefined: t, maxDefined: n } = this.getUserBounds(),
        { min: r, max: i } = this,
        a = (e) => (r = t ? r : e),
        o = (e) => (i = n ? i : e);
      if (e) {
        const e = Qe(r),
          t = Qe(i);
        e < 0 && t < 0 ? o(0) : e > 0 && t > 0 && a(0);
      }
      if (r === i) {
        const t = i === 0 ? 1 : Math.abs(i * 0.05);
        o(i + t), e || a(r - t);
      }
      (this.min = r), (this.max = i);
    }
    getTickLimit() {
      let { maxTicksLimit: e, stepSize: t } = this.options.ticks,
        n;
      return (
        t
          ? ((n = Math.ceil(this.max / t) - Math.floor(this.min / t) + 1),
            n > 1e3 &&
              (console.warn(
                `scales.${this.id}.ticks.stepSize: ${t} would result generating up to ${n} ticks. Limiting to 1000.`,
              ),
              (n = 1e3)))
          : ((n = this.computeTickLimit()), (e ||= 11)),
        e && (n = Math.min(e, n)),
        n
      );
    }
    computeTickLimit() {
      return 1 / 0;
    }
    buildTicks() {
      let e = this.options,
        t = e.ticks,
        n = this.getTickLimit();
      n = Math.max(2, n);
      const r = tc(
        {
          maxTicks: n,
          bounds: e.bounds,
          min: e.min,
          max: e.max,
          precision: t.precision,
          step: t.stepSize,
          count: t.count,
          maxDigits: this._maxDigits(),
          horizontal: this.isHorizontal(),
          minRotation: t.minRotation || 0,
          includeBounds: t.includeBounds !== !1,
        },
        this._range || this,
      );
      return (
        e.bounds === `ticks` && at(r, this, `value`),
        e.reverse
          ? (r.reverse(), (this.start = this.max), (this.end = this.min))
          : ((this.start = this.min), (this.end = this.max)),
        r
      );
    }
    configure() {
      let e = this.ticks,
        t = this.min,
        n = this.max;
      if ((super.configure(), this.options.offset && e.length)) {
        const r = (n - t) / Math.max(e.length - 1, 1) / 2;
        (t -= r), (n += r);
      }
      (this._startValue = t), (this._endValue = n), (this._valueRange = n - t);
    }
    getLabelForValue(e) {
      return Gt(e, this.chart.options.locale, this.options.ticks.format);
    }
  },
  ic = class extends rc {
    static id = `linear`;
    static defaults = { ticks: { callback: Jt.formatters.numeric } };
    determineDataLimits() {
      const { min: e, max: t } = this.getMinMax(!0);
      (this.min = we(e) ? e : 0), (this.max = we(t) ? t : 1), this.handleTickRangeOptions();
    }
    computeTickLimit() {
      const e = this.isHorizontal(),
        t = e ? this.width : this.height,
        n = ot(this.options.ticks.minRotation),
        r = (e ? Math.sin(n) : Math.cos(n)) || 0.001,
        i = this._resolveTickFontOptions(0);
      return Math.ceil(t / Math.min(40, i.lineHeight / r));
    }
    getPixelForValue(e) {
      return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
    }
    getValueForPixel(e) {
      return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
    }
  },
  ac = (e) => Math.floor(Ze(e)),
  oc = (e, t) => 10 ** (ac(e) + t);
function sc(e) {
  return e / 10 ** ac(e) == 1;
}
function cc(e, t, n) {
  const r = 10 ** n,
    i = Math.floor(e / r);
  return Math.ceil(t / r) - i;
}
function lc(e, t) {
  let n = ac(t - e);
  for (; cc(e, t, n) > 10; ) n++;
  for (; cc(e, t, n) < 10; ) n--;
  return Math.min(n, ac(e));
}
function uc(e, { min: t, max: n }) {
  t = Te(e.min, t);
  let r = [],
    i = ac(t),
    a = lc(t, n),
    o = a < 0 ? 10 ** Math.abs(a) : 1,
    s = 10 ** a,
    c = i > a ? 10 ** i : 0,
    l = Math.round((t - c) * o) / o,
    u = Math.floor((t - c) / s / 10) * s * 10,
    d = Math.floor((l - u) / 10 ** a),
    f = Te(e.min, Math.round((c + u + d * 10 ** a) * o) / o);
  for (; f < n; )
    r.push({ value: f, major: sc(f), significand: d }),
      d >= 10 ? (d = d < 15 ? 15 : 20) : d++,
      d >= 20 && (a++, (d = 2), (o = a >= 0 ? 1 : o)),
      (f = Math.round((c + u + d * 10 ** a) * o) / o);
  const p = Te(e.max, f);
  return r.push({ value: p, major: sc(p), significand: d }), r;
}
(class extends no {
  static id = `logarithmic`;
  static defaults = { ticks: { callback: Jt.formatters.logarithmic, major: { enabled: !0 } } };
  constructor(e) {
    super(e),
      (this.start = void 0),
      (this.end = void 0),
      (this._startValue = void 0),
      (this._valueRange = 0);
  }
  parse(e, t) {
    const n = rc.prototype.parse.apply(this, [e, t]);
    if (n === 0) {
      this._zero = !0;
      return;
    }
    return we(n) && n > 0 ? n : null;
  }
  determineDataLimits() {
    const { min: e, max: t } = this.getMinMax(!0);
    (this.min = we(e) ? Math.max(0, e) : null),
      (this.max = we(t) ? Math.max(0, t) : null),
      this.options.beginAtZero && (this._zero = !0),
      this._zero &&
        this.min !== this._suggestedMin &&
        !we(this._userMin) &&
        (this.min = e === oc(this.min, 0) ? oc(this.min, -1) : oc(this.min, 0)),
      this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    let { minDefined: e, maxDefined: t } = this.getUserBounds(),
      n = this.min,
      r = this.max,
      i = (t) => (n = e ? n : t),
      a = (e) => (r = t ? r : e);
    n === r && (n <= 0 ? (i(1), a(10)) : (i(oc(n, -1)), a(oc(r, 1)))),
      n <= 0 && i(oc(r, -1)),
      r <= 0 && a(oc(n, 1)),
      (this.min = n),
      (this.max = r);
  }
  buildTicks() {
    const e = this.options,
      t = uc({ min: this._userMin, max: this._userMax }, this);
    return (
      e.bounds === `ticks` && at(t, this, `value`),
      e.reverse
        ? (t.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      t
    );
  }
  getLabelForValue(e) {
    return e === void 0 ? `0` : Gt(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), (this._startValue = Ze(e)), (this._valueRange = Ze(this.max) - Ze(e));
  }
  getPixelForValue(e) {
    return (
      (e === void 0 || e === 0) && (e = this.min),
      e === null || isNaN(e)
        ? NaN
        : this.getPixelForDecimal(
            e === this.min ? 0 : (Ze(e) - this._startValue) / this._valueRange,
          )
    );
  }
  getValueForPixel(e) {
    const t = this.getDecimalForPixel(e);
    return 10 ** (this._startValue + t * this._valueRange);
  }
});
function dc(e) {
  const t = e.ticks;
  if (t.display && e.display) {
    const e = Tn(t.backdropPadding);
    return F(t.font && t.font.size, z.font.size) + e.height;
  }
  return 0;
}
function fc(e, t, n) {
  return (n = N(n) ? n : [n]), { w: nn(e, t.string, n), h: n.length * t.lineHeight };
}
function pc(e, t, n, r, i) {
  return e === r || e === i
    ? { start: t - n / 2, end: t + n / 2 }
    : e < r || e > i
      ? { start: t - n, end: t }
      : { start: t, end: t + n };
}
function mc(e) {
  const t = {
      l: e.left + e._padding.left,
      r: e.right - e._padding.right,
      t: e.top + e._padding.top,
      b: e.bottom - e._padding.bottom,
    },
    n = Object.assign({}, t),
    r = [],
    i = [],
    a = e._pointLabels.length,
    o = e.options.pointLabels,
    s = o.centerPointLabels ? R / a : 0;
  for (let c = 0; c < a; c++) {
    const a = o.setContext(e.getPointLabelContext(c));
    i[c] = a.padding;
    const l = e.getPointPosition(c, e.drawingArea + i[c], s),
      u = En(a.font),
      d = fc(e.ctx, u, e._pointLabels[c]);
    r[c] = d;
    const f = ft(e.getIndexAngle(c) + s),
      p = Math.round(st(f));
    hc(n, t, f, pc(p, l.x, d.w, 0, 180), pc(p, l.y, d.h, 90, 270));
  }
  e.setCenterPoint(t.l - n.l, n.r - t.r, t.t - n.t, n.b - t.b), (e._pointLabelItems = vc(e, r, i));
}
function hc(e, t, n, r, i) {
  let a = Math.abs(Math.sin(n)),
    o = Math.abs(Math.cos(n)),
    s = 0,
    c = 0;
  r.start < t.l
    ? ((s = (t.l - r.start) / a), (e.l = Math.min(e.l, t.l - s)))
    : r.end > t.r && ((s = (r.end - t.r) / a), (e.r = Math.max(e.r, t.r + s))),
    i.start < t.t
      ? ((c = (t.t - i.start) / o), (e.t = Math.min(e.t, t.t - c)))
      : i.end > t.b && ((c = (i.end - t.b) / o), (e.b = Math.max(e.b, t.b + c)));
}
function gc(e, t, n) {
  const r = e.drawingArea,
    { extra: i, additionalAngle: a, padding: o, size: s } = n,
    c = e.getPointPosition(t, r + i + o, a),
    l = Math.round(st(ft(c.angle + Je))),
    u = xc(c.y, s.h, l),
    d = yc(l),
    f = bc(c.x, s.w, d);
  return {
    visible: !0,
    x: c.x,
    y: u,
    textAlign: d,
    left: f,
    top: u,
    right: f + s.w,
    bottom: u + s.h,
  };
}
function _c(e, t) {
  if (!t) return !0;
  const { left: n, top: r, right: i, bottom: a } = e;
  return !(
    cn({ x: n, y: r }, t) ||
    cn({ x: n, y: a }, t) ||
    cn({ x: i, y: r }, t) ||
    cn({ x: i, y: a }, t)
  );
}
function vc(e, t, n) {
  let r = [],
    i = e._pointLabels.length,
    a = e.options,
    { centerPointLabels: o, display: s } = a.pointLabels,
    c = { extra: dc(a) / 2, additionalAngle: o ? R / i : 0 },
    l;
  for (let a = 0; a < i; a++) {
    (c.padding = n[a]), (c.size = t[a]);
    const i = gc(e, a, c);
    r.push(i), s === `auto` && ((i.visible = _c(i, l)), i.visible && (l = i));
  }
  return r;
}
function yc(e) {
  return e === 0 || e === 180 ? `center` : e < 180 ? `left` : `right`;
}
function bc(e, t, n) {
  return n === `right` ? (e -= t) : n === `center` && (e -= t / 2), e;
}
function xc(e, t, n) {
  return n === 90 || n === 270 ? (e -= t / 2) : (n > 270 || n < 90) && (e -= t), e;
}
function Sc(e, t, n) {
  const { left: r, top: i, right: a, bottom: o } = n,
    { backdropColor: s } = t;
  if (!M(s)) {
    const n = wn(t.borderRadius),
      c = Tn(t.backdropPadding);
    e.fillStyle = s;
    const l = r - c.left,
      u = i - c.top,
      d = a - r + c.width,
      f = o - i + c.height;
    Object.values(n).some((e) => e !== 0)
      ? (e.beginPath(), _n(e, { x: l, y: u, w: d, h: f, radius: n }), e.fill())
      : e.fillRect(l, u, d, f);
  }
}
function Cc(e, t) {
  const {
    ctx: n,
    options: { pointLabels: r },
  } = e;
  for (let i = t - 1; i >= 0; i--) {
    const t = e._pointLabelItems[i];
    if (!t.visible) continue;
    const a = r.setContext(e.getPointLabelContext(i));
    Sc(n, a, t);
    const o = En(a.font),
      { x: s, y: c, textAlign: l } = t;
    gn(n, e._pointLabels[i], s, c + o.lineHeight / 2, o, {
      color: a.color,
      textAlign: l,
      textBaseline: `middle`,
    });
  }
}
function wc(e, t, n, r) {
  const { ctx: i } = e;
  if (n) i.arc(e.xCenter, e.yCenter, t, 0, We);
  else {
    let n = e.getPointPosition(0, t);
    i.moveTo(n.x, n.y);
    for (let a = 1; a < r; a++) (n = e.getPointPosition(a, t)), i.lineTo(n.x, n.y);
  }
}
function Tc(e, t, n, r, i) {
  const a = e.ctx,
    o = t.circular,
    { color: s, lineWidth: c } = t;
  (!o && !r) ||
    !s ||
    !c ||
    n < 0 ||
    (a.save(),
    (a.strokeStyle = s),
    (a.lineWidth = c),
    a.setLineDash(i.dash || []),
    (a.lineDashOffset = i.dashOffset),
    a.beginPath(),
    wc(e, n, o, r),
    a.closePath(),
    a.stroke(),
    a.restore());
}
function Ec(e, t, n) {
  return kn(e, { label: n, index: t, type: `pointLabel` });
}
(class extends rc {
  static id = `radialLinear`;
  static defaults = {
    display: !0,
    animate: !0,
    position: `chartArea`,
    angleLines: { display: !0, lineWidth: 1, borderDash: [], borderDashOffset: 0 },
    grid: { circular: !1 },
    startAngle: 0,
    ticks: { showLabelBackdrop: !0, callback: Jt.formatters.numeric },
    pointLabels: {
      backdropColor: void 0,
      backdropPadding: 2,
      display: !0,
      font: { size: 10 },
      callback(e) {
        return e;
      },
      padding: 5,
      centerPointLabels: !1,
    },
  };
  static defaultRoutes = {
    'angleLines.color': `borderColor`,
    'pointLabels.color': `color`,
    'ticks.color': `color`,
  };
  static descriptors = { angleLines: { _fallback: `grid` } };
  constructor(e) {
    super(e),
      (this.xCenter = void 0),
      (this.yCenter = void 0),
      (this.drawingArea = void 0),
      (this._pointLabels = []),
      (this._pointLabelItems = []);
  }
  setDimensions() {
    const e = (this._padding = Tn(dc(this.options) / 2)),
      t = (this.width = this.maxWidth - e.width),
      n = (this.height = this.maxHeight - e.height);
    (this.xCenter = Math.floor(this.left + t / 2 + e.left)),
      (this.yCenter = Math.floor(this.top + n / 2 + e.top)),
      (this.drawingArea = Math.floor(Math.min(t, n) / 2));
  }
  determineDataLimits() {
    const { min: e, max: t } = this.getMinMax(!1);
    (this.min = we(e) && !isNaN(e) ? e : 0),
      (this.max = we(t) && !isNaN(t) ? t : 0),
      this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / dc(this.options));
  }
  generateTickLabels(e) {
    rc.prototype.generateTickLabels.call(this, e),
      (this._pointLabels = this.getLabels()
        .map((e, t) => {
          const n = I(this.options.pointLabels.callback, [e, t], this);
          return n || n === 0 ? n : ``;
        })
        .filter((e, t) => this.chart.getDataVisibility(t)));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? mc(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, t, n, r) {
    (this.xCenter += Math.floor((e - t) / 2)),
      (this.yCenter += Math.floor((n - r) / 2)),
      (this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, t, n, r)));
  }
  getIndexAngle(e) {
    const t = We / (this._pointLabels.length || 1),
      n = this.options.startAngle || 0;
    return ft(e * t + ot(n));
  }
  getDistanceFromCenterForValue(e) {
    if (M(e)) return NaN;
    const t = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - e) * t : (e - this.min) * t;
  }
  getValueForDistanceFromCenter(e) {
    if (M(e)) return NaN;
    const t = e / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - t : this.min + t;
  }
  getPointLabelContext(e) {
    const t = this._pointLabels || [];
    if (e >= 0 && e < t.length) {
      const n = t[e];
      return Ec(this.getContext(), e, n);
    }
  }
  getPointPosition(e, t, n = 0) {
    const r = this.getIndexAngle(e) - Je + n;
    return { x: Math.cos(r) * t + this.xCenter, y: Math.sin(r) * t + this.yCenter, angle: r };
  }
  getPointPositionForValue(e, t) {
    return this.getPointPosition(e, this.getDistanceFromCenterForValue(t));
  }
  getBasePosition(e) {
    return this.getPointPositionForValue(e || 0, this.getBaseValue());
  }
  getPointLabelPosition(e) {
    const { left: t, top: n, right: r, bottom: i } = this._pointLabelItems[e];
    return { left: t, top: n, right: r, bottom: i };
  }
  drawBackground() {
    const {
      backgroundColor: e,
      grid: { circular: t },
    } = this.options;
    if (e) {
      const n = this.ctx;
      n.save(),
        n.beginPath(),
        wc(this, this.getDistanceFromCenterForValue(this._endValue), t, this._pointLabels.length),
        n.closePath(),
        (n.fillStyle = e),
        n.fill(),
        n.restore();
    }
  }
  drawGrid() {
    let e = this.ctx,
      t = this.options,
      { angleLines: n, grid: r, border: i } = t,
      a = this._pointLabels.length,
      o,
      s,
      c;
    if (
      (t.pointLabels.display && Cc(this, a),
      r.display &&
        this.ticks.forEach((e, t) => {
          if (t !== 0 || (t === 0 && this.min < 0)) {
            s = this.getDistanceFromCenterForValue(e.value);
            const n = this.getContext(t),
              o = r.setContext(n),
              c = i.setContext(n);
            Tc(this, o, s, a, c);
          }
        }),
      n.display)
    ) {
      for (e.save(), o = a - 1; o >= 0; o--) {
        const r = n.setContext(this.getPointLabelContext(o)),
          { color: i, lineWidth: a } = r;
        !a ||
          !i ||
          ((e.lineWidth = a),
          (e.strokeStyle = i),
          e.setLineDash(r.borderDash),
          (e.lineDashOffset = r.borderDashOffset),
          (s = this.getDistanceFromCenterForValue(t.reverse ? this.min : this.max)),
          (c = this.getPointPosition(o, s)),
          e.beginPath(),
          e.moveTo(this.xCenter, this.yCenter),
          e.lineTo(c.x, c.y),
          e.stroke());
      }
      e.restore();
    }
  }
  drawBorder() {}
  drawLabels() {
    const e = this.ctx,
      t = this.options,
      n = t.ticks;
    if (!n.display) return;
    let r = this.getIndexAngle(0),
      i,
      a;
    e.save(),
      e.translate(this.xCenter, this.yCenter),
      e.rotate(r),
      (e.textAlign = `center`),
      (e.textBaseline = `middle`),
      this.ticks.forEach((r, o) => {
        if (o === 0 && this.min >= 0 && !t.reverse) return;
        const s = n.setContext(this.getContext(o)),
          c = En(s.font);
        if (((i = this.getDistanceFromCenterForValue(this.ticks[o].value)), s.showLabelBackdrop)) {
          (e.font = c.string), (a = e.measureText(r.label).width), (e.fillStyle = s.backdropColor);
          const t = Tn(s.backdropPadding);
          e.fillRect(-a / 2 - t.left, -i - c.size / 2 - t.top, a + t.width, c.size + t.height);
        }
        gn(e, r.label, 0, -i, c, {
          color: s.color,
          strokeColor: s.textStrokeColor,
          strokeWidth: s.textStrokeWidth,
        });
      }),
      e.restore();
  }
  drawTitle() {}
});
var Dc = {
    millisecond: { common: !0, size: 1, steps: 1e3 },
    second: { common: !0, size: 1e3, steps: 60 },
    minute: { common: !0, size: 6e4, steps: 60 },
    hour: { common: !0, size: 36e5, steps: 24 },
    day: { common: !0, size: 864e5, steps: 30 },
    week: { common: !1, size: 6048e5, steps: 4 },
    month: { common: !0, size: 2628e6, steps: 12 },
    quarter: { common: !1, size: 7884e6, steps: 4 },
    year: { common: !0, size: 3154e7 },
  },
  Oc = Object.keys(Dc);
function kc(e, t) {
  return e - t;
}
function Ac(e, t) {
  if (M(t)) return null;
  let n = e._adapter,
    { parser: r, round: i, isoWeekday: a } = e._parseOpts,
    o = t;
  return (
    typeof r == `function` && (o = r(o)),
    we(o) || (o = typeof r == `string` ? n.parse(o, r) : n.parse(o)),
    o === null
      ? null
      : (i &&
          (o = i === `week` && (rt(a) || a === !0) ? n.startOf(o, `isoWeek`, a) : n.startOf(o, i)),
        +o)
  );
}
function jc(e, t, n, r) {
  const i = Oc.length;
  for (let a = Oc.indexOf(e); a < i - 1; ++a) {
    const e = Dc[Oc[a]],
      i = e.steps ? e.steps : 2 ** 53 - 1;
    if (e.common && Math.ceil((n - t) / (i * e.size)) <= r) return Oc[a];
  }
  return Oc[i - 1];
}
function Mc(e, t, n, r, i) {
  for (let a = Oc.length - 1; a >= Oc.indexOf(n); a--) {
    const n = Oc[a];
    if (Dc[n].common && e._adapter.diff(i, r, n) >= t - 1) return n;
  }
  return Oc[n ? Oc.indexOf(n) : 0];
}
function Nc(e) {
  for (let t = Oc.indexOf(e) + 1, n = Oc.length; t < n; ++t) if (Dc[Oc[t]].common) return Oc[t];
}
function Pc(e, t, n) {
  if (!n) e[t] = !0;
  else if (n.length) {
    const { lo: r, hi: i } = _t(n, t),
      a = n[r] >= t ? n[r] : n[i];
    e[a] = !0;
  }
}
function Fc(e, t, n, r) {
  let i = e._adapter,
    a = +i.startOf(t[0].value, r),
    o = t[t.length - 1].value,
    s,
    c;
  for (s = a; s <= o; s = +i.add(s, 1, r)) (c = n[s]), c >= 0 && (t[c].major = !0);
  return t;
}
function Ic(e, t, n) {
  let r = [],
    i = {},
    a = t.length,
    o,
    s;
  for (o = 0; o < a; ++o) (s = t[o]), (i[s] = o), r.push({ value: s, major: !1 });
  return a === 0 || !n ? r : Fc(e, r, i, n);
}
var Lc = class extends no {
  static id = `time`;
  static defaults = {
    bounds: `data`,
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: `millisecond`,
      displayFormats: {},
    },
    ticks: { source: `auto`, callback: !1, major: { enabled: !1 } },
  };
  constructor(e) {
    super(e),
      (this._cache = { data: [], labels: [], all: [] }),
      (this._unit = `day`),
      (this._majorUnit = void 0),
      (this._offsets = {}),
      (this._normalized = !1),
      (this._parseOpts = void 0);
  }
  init(e, t = {}) {
    const n = (e.time ||= {}),
      r = (this._adapter = new Bi._date(e.adapters.date));
    r.init(t),
      Ne(n.displayFormats, r.formats()),
      (this._parseOpts = { parser: n.parser, round: n.round, isoWeekday: n.isoWeekday }),
      super.init(e),
      (this._normalized = t.normalized);
  }
  parse(e, t) {
    return e === void 0 ? null : Ac(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] });
  }
  determineDataLimits() {
    let e = this.options,
      t = this._adapter,
      n = e.time.unit || `day`,
      { min: r, max: i, minDefined: a, maxDefined: o } = this.getUserBounds();
    function s(e) {
      !a && !isNaN(e.min) && (r = Math.min(r, e.min)),
        !o && !isNaN(e.max) && (i = Math.max(i, e.max));
    }
    (!a || !o) &&
      (s(this._getLabelBounds()),
      (e.bounds !== `ticks` || e.ticks.source !== `labels`) && s(this.getMinMax(!1))),
      (r = we(r) && !isNaN(r) ? r : +t.startOf(Date.now(), n)),
      (i = we(i) && !isNaN(i) ? i : +t.endOf(Date.now(), n) + 1),
      (this.min = Math.min(r, i - 1)),
      (this.max = Math.max(r + 1, i));
  }
  _getLabelBounds() {
    let e = this.getLabelTimestamps(),
      t = 1 / 0,
      n = -1 / 0;
    return e.length && ((t = e[0]), (n = e[e.length - 1])), { min: t, max: n };
  }
  buildTicks() {
    const e = this.options,
      t = e.time,
      n = e.ticks,
      r = n.source === `labels` ? this.getLabelTimestamps() : this._generate();
    e.bounds === `ticks` &&
      r.length &&
      ((this.min = this._userMin || r[0]), (this.max = this._userMax || r[r.length - 1]));
    const i = this.min,
      a = this.max,
      o = bt(r, i, a);
    return (
      (this._unit =
        t.unit ||
        (n.autoSkip
          ? jc(t.minUnit, this.min, this.max, this._getLabelCapacity(i))
          : Mc(this, o.length, t.minUnit, this.min, this.max))),
      (this._majorUnit = !n.major.enabled || this._unit === `year` ? void 0 : Nc(this._unit)),
      this.initOffsets(r),
      e.reverse && o.reverse(),
      Ic(this, o, this._majorUnit)
    );
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let t = 0,
      n = 0,
      r,
      i;
    this.options.offset &&
      e.length &&
      ((r = this.getDecimalForValue(e[0])),
      (t = e.length === 1 ? 1 - r : (this.getDecimalForValue(e[1]) - r) / 2),
      (i = this.getDecimalForValue(e[e.length - 1])),
      (n = e.length === 1 ? i : (i - this.getDecimalForValue(e[e.length - 2])) / 2));
    const a = e.length < 3 ? 0.5 : 0.25;
    (t = mt(t, 0, a)),
      (n = mt(n, 0, a)),
      (this._offsets = { start: t, end: n, factor: 1 / (t + 1 + n) });
  }
  _generate() {
    let e = this._adapter,
      t = this.min,
      n = this.max,
      r = this.options,
      i = r.time,
      a = i.unit || jc(i.minUnit, t, n, this._getLabelCapacity(t)),
      o = F(r.ticks.stepSize, 1),
      s = a === `week` ? i.isoWeekday : !1,
      c = rt(s) || s === !0,
      l = {},
      u = t,
      d,
      f;
    if (
      (c && (u = +e.startOf(u, `isoWeek`, s)),
      (u = +e.startOf(u, c ? `day` : a)),
      e.diff(n, t, a) > 1e5 * o)
    )
      throw Error(t + ` and ` + n + ` are too far apart with stepSize of ` + o + ` ` + a);
    const p = r.ticks.source === `data` && this.getDataTimestamps();
    for (d = u, f = 0; d < n; d = +e.add(d, o, a), f++) Pc(l, d, p);
    return (
      (d === n || r.bounds === `ticks` || f === 1) && Pc(l, d, p),
      Object.keys(l)
        .sort(kc)
        .map((e) => +e)
    );
  }
  getLabelForValue(e) {
    const t = this._adapter,
      n = this.options.time;
    return n.tooltipFormat ? t.format(e, n.tooltipFormat) : t.format(e, n.displayFormats.datetime);
  }
  format(e, t) {
    const n = this.options.time.displayFormats,
      r = this._unit,
      i = t || n[r];
    return this._adapter.format(e, i);
  }
  _tickFormatFunction(e, t, n, r) {
    const i = this.options,
      a = i.ticks.callback;
    if (a) return I(a, [e, t, n], this);
    const o = i.time.displayFormats,
      s = this._unit,
      c = this._majorUnit,
      l = s && o[s],
      u = c && o[c],
      d = n[t],
      f = c && u && d && d.major;
    return this._adapter.format(e, r || (f ? u : l));
  }
  generateTickLabels(e) {
    let t, n, r;
    for (t = 0, n = e.length; t < n; ++t)
      (r = e[t]), (r.label = this._tickFormatFunction(r.value, t, e));
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const t = this._offsets,
      n = this.getDecimalForValue(e);
    return this.getPixelForDecimal((t.start + n) * t.factor);
  }
  getValueForPixel(e) {
    const t = this._offsets,
      n = this.getDecimalForPixel(e) / t.factor - t.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(e) {
    const t = this.options.ticks,
      n = this.ctx.measureText(e).width,
      r = ot(this.isHorizontal() ? t.maxRotation : t.minRotation),
      i = Math.cos(r),
      a = Math.sin(r),
      o = this._resolveTickFontOptions(0).size;
    return { w: n * i + o * a, h: n * a + o * i };
  }
  _getLabelCapacity(e) {
    const t = this.options.time,
      n = t.displayFormats,
      r = n[t.unit] || n.millisecond,
      i = this._tickFormatFunction(e, 0, Ic(this, [e], this._majorUnit), r),
      a = this._getLabelSize(i),
      o = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return o > 0 ? o : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [],
      t,
      n;
    if (e.length) return e;
    const r = this.getMatchingVisibleMetas();
    if (this._normalized && r.length)
      return (this._cache.data = r[0].controller.getAllParsedValues(this));
    for (t = 0, n = r.length; t < n; ++t) e = e.concat(r[t].controller.getAllParsedValues(this));
    return (this._cache.data = this.normalize(e));
  }
  getLabelTimestamps() {
    let e = this._cache.labels || [],
      t,
      n;
    if (e.length) return e;
    const r = this.getLabels();
    for (t = 0, n = r.length; t < n; ++t) e.push(Ac(this, r[t]));
    return (this._cache.labels = this._normalized ? e : this.normalize(e));
  }
  normalize(e) {
    return wt(e.sort(kc));
  }
};
function Rc(e, t, n) {
  let r = 0,
    i = e.length - 1,
    a,
    o,
    s,
    c;
  n
    ? (t >= e[r].pos && t <= e[i].pos && ({ lo: r, hi: i } = vt(e, `pos`, t)),
      ({ pos: a, time: s } = e[r]),
      ({ pos: o, time: c } = e[i]))
    : (t >= e[r].time && t <= e[i].time && ({ lo: r, hi: i } = vt(e, `time`, t)),
      ({ time: a, pos: s } = e[r]),
      ({ time: o, pos: c } = e[i]));
  const l = o - a;
  return l ? s + ((c - s) * (t - a)) / l : s;
}
(class extends Lc {
  static id = `timeseries`;
  static defaults = Lc.defaults;
  constructor(e) {
    super(e), (this._table = []), (this._minPos = void 0), (this._tableRange = void 0);
  }
  initOffsets() {
    const e = this._getTimestampsForTable(),
      t = (this._table = this.buildLookupTable(e));
    (this._minPos = Rc(t, this.min)),
      (this._tableRange = Rc(t, this.max) - this._minPos),
      super.initOffsets(e);
  }
  buildLookupTable(e) {
    let { min: t, max: n } = this,
      r = [],
      i = [],
      a,
      o,
      s,
      c,
      l;
    for (a = 0, o = e.length; a < o; ++a) (c = e[a]), c >= t && c <= n && r.push(c);
    if (r.length < 2)
      return [
        { time: t, pos: 0 },
        { time: n, pos: 1 },
      ];
    for (a = 0, o = r.length; a < o; ++a)
      (l = r[a + 1]),
        (s = r[a - 1]),
        (c = r[a]),
        Math.round((l + s) / 2) !== c && i.push({ time: c, pos: a / (o - 1) });
    return i;
  }
  _generate() {
    const e = this.min,
      t = this.max,
      n = super.getDataTimestamps();
    return (
      (!n.includes(e) || !n.length) && n.splice(0, 0, e),
      (!n.includes(t) || n.length === 1) && n.push(t),
      n.sort((e, t) => e - t)
    );
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length) return e;
    const t = this.getDataTimestamps(),
      n = this.getLabelTimestamps();
    return (
      (e = t.length && n.length ? this.normalize(t.concat(n)) : t.length ? t : n),
      (e = this._cache.all = e),
      e
    );
  }
  getDecimalForValue(e) {
    return (Rc(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const t = this._offsets,
      n = this.getDecimalForPixel(e) / t.factor - t.end;
    return Rc(this._table, n * this._tableRange + this._minPos, !0);
  }
});
var zc =
  `dangerouslySetInnerHTML.onCopy.onCopyCapture.onCut.onCutCapture.onPaste.onPasteCapture.onCompositionEnd.onCompositionEndCapture.onCompositionStart.onCompositionStartCapture.onCompositionUpdate.onCompositionUpdateCapture.onFocus.onFocusCapture.onBlur.onBlurCapture.onChange.onChangeCapture.onBeforeInput.onBeforeInputCapture.onInput.onInputCapture.onReset.onResetCapture.onSubmit.onSubmitCapture.onInvalid.onInvalidCapture.onLoad.onLoadCapture.onError.onErrorCapture.onKeyDown.onKeyDownCapture.onKeyPress.onKeyPressCapture.onKeyUp.onKeyUpCapture.onAbort.onAbortCapture.onCanPlay.onCanPlayCapture.onCanPlayThrough.onCanPlayThroughCapture.onDurationChange.onDurationChangeCapture.onEmptied.onEmptiedCapture.onEncrypted.onEncryptedCapture.onEnded.onEndedCapture.onLoadedData.onLoadedDataCapture.onLoadedMetadata.onLoadedMetadataCapture.onLoadStart.onLoadStartCapture.onPause.onPauseCapture.onPlay.onPlayCapture.onPlaying.onPlayingCapture.onProgress.onProgressCapture.onRateChange.onRateChangeCapture.onSeeked.onSeekedCapture.onSeeking.onSeekingCapture.onStalled.onStalledCapture.onSuspend.onSuspendCapture.onTimeUpdate.onTimeUpdateCapture.onVolumeChange.onVolumeChangeCapture.onWaiting.onWaitingCapture.onAuxClick.onAuxClickCapture.onClick.onClickCapture.onContextMenu.onContextMenuCapture.onDoubleClick.onDoubleClickCapture.onDrag.onDragCapture.onDragEnd.onDragEndCapture.onDragEnter.onDragEnterCapture.onDragExit.onDragExitCapture.onDragLeave.onDragLeaveCapture.onDragOver.onDragOverCapture.onDragStart.onDragStartCapture.onDrop.onDropCapture.onMouseDown.onMouseDownCapture.onMouseEnter.onMouseLeave.onMouseMove.onMouseMoveCapture.onMouseOut.onMouseOutCapture.onMouseOver.onMouseOverCapture.onMouseUp.onMouseUpCapture.onSelect.onSelectCapture.onTouchCancel.onTouchCancelCapture.onTouchEnd.onTouchEndCapture.onTouchMove.onTouchMoveCapture.onTouchStart.onTouchStartCapture.onPointerDown.onPointerDownCapture.onPointerMove.onPointerMoveCapture.onPointerUp.onPointerUpCapture.onPointerCancel.onPointerCancelCapture.onPointerEnter.onPointerEnterCapture.onPointerLeave.onPointerLeaveCapture.onPointerOver.onPointerOverCapture.onPointerOut.onPointerOutCapture.onGotPointerCapture.onGotPointerCaptureCapture.onLostPointerCapture.onLostPointerCaptureCapture.onScroll.onScrollCapture.onWheel.onWheelCapture.onAnimationStart.onAnimationStartCapture.onAnimationEnd.onAnimationEndCapture.onAnimationIteration.onAnimationIterationCapture.onTransitionEnd.onTransitionEndCapture`.split(
    `.`,
  );
function Bc(e) {
  return typeof e == `string` ? zc.includes(e) : !1;
}
var Vc = new Set(
  `aria-activedescendant.aria-atomic.aria-autocomplete.aria-busy.aria-checked.aria-colcount.aria-colindex.aria-colspan.aria-controls.aria-current.aria-describedby.aria-details.aria-disabled.aria-errormessage.aria-expanded.aria-flowto.aria-haspopup.aria-hidden.aria-invalid.aria-keyshortcuts.aria-label.aria-labelledby.aria-level.aria-live.aria-modal.aria-multiline.aria-multiselectable.aria-orientation.aria-owns.aria-placeholder.aria-posinset.aria-pressed.aria-readonly.aria-relevant.aria-required.aria-roledescription.aria-rowcount.aria-rowindex.aria-rowspan.aria-selected.aria-setsize.aria-sort.aria-valuemax.aria-valuemin.aria-valuenow.aria-valuetext.className.color.height.id.lang.max.media.method.min.name.style.target.width.role.tabIndex.accentHeight.accumulate.additive.alignmentBaseline.allowReorder.alphabetic.amplitude.arabicForm.ascent.attributeName.attributeType.autoReverse.azimuth.baseFrequency.baselineShift.baseProfile.bbox.begin.bias.by.calcMode.capHeight.clip.clipPath.clipPathUnits.clipRule.colorInterpolation.colorInterpolationFilters.colorProfile.colorRendering.contentScriptType.contentStyleType.cursor.cx.cy.d.decelerate.descent.diffuseConstant.direction.display.divisor.dominantBaseline.dur.dx.dy.edgeMode.elevation.enableBackground.end.exponent.externalResourcesRequired.fill.fillOpacity.fillRule.filter.filterRes.filterUnits.floodColor.floodOpacity.focusable.fontFamily.fontSize.fontSizeAdjust.fontStretch.fontStyle.fontVariant.fontWeight.format.from.fx.fy.g1.g2.glyphName.glyphOrientationHorizontal.glyphOrientationVertical.glyphRef.gradientTransform.gradientUnits.hanging.horizAdvX.horizOriginX.href.ideographic.imageRendering.in2.in.intercept.k1.k2.k3.k4.k.kernelMatrix.kernelUnitLength.kerning.keyPoints.keySplines.keyTimes.lengthAdjust.letterSpacing.lightingColor.limitingConeAngle.local.markerEnd.markerHeight.markerMid.markerStart.markerUnits.markerWidth.mask.maskContentUnits.maskUnits.mathematical.mode.numOctaves.offset.opacity.operator.order.orient.orientation.origin.overflow.overlinePosition.overlineThickness.paintOrder.panose1.pathLength.patternContentUnits.patternTransform.patternUnits.pointerEvents.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.r.radius.refX.refY.renderingIntent.repeatCount.repeatDur.requiredExtensions.requiredFeatures.restart.result.rotate.rx.ry.seed.shapeRendering.slope.spacing.specularConstant.specularExponent.speed.spreadMethod.startOffset.stdDeviation.stemh.stemv.stitchTiles.stopColor.stopOpacity.strikethroughPosition.strikethroughThickness.string.stroke.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.strokeMiterlimit.strokeOpacity.strokeWidth.surfaceScale.systemLanguage.tableValues.targetX.targetY.textAnchor.textDecoration.textLength.textRendering.to.transform.u1.u2.underlinePosition.underlineThickness.unicode.unicodeBidi.unicodeRange.unitsPerEm.vAlphabetic.values.vectorEffect.version.vertAdvY.vertOriginX.vertOriginY.vHanging.vIdeographic.viewTarget.visibility.vMathematical.widths.wordSpacing.writingMode.x1.x2.x.xChannelSelector.xHeight.xlinkActuate.xlinkArcrole.xlinkHref.xlinkRole.xlinkShow.xlinkTitle.xlinkType.xmlBase.xmlLang.xmlns.xmlnsXlink.xmlSpace.y1.y2.y.yChannelSelector.z.zoomAndPan.ref.key.angle`.split(
    `.`,
  ),
);
function Hc(e) {
  return typeof e == `string` ? Vc.has(e) : !1;
}
function Uc(e) {
  return typeof e == `string` && e.startsWith(`data-`);
}
function Wc(e) {
  if (typeof e != `object` || !e) return {};
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (Hc(n) || Uc(n)) && (t[n] = e[n]);
  return t;
}
function Gc(e) {
  if (e == null) return null;
  if ((0, a.isValidElement)(e) && typeof e.props == `object` && e.props !== null) {
    var t = e.props;
    return Wc(t);
  }
  return typeof e == `object` && !Array.isArray(e) ? Wc(e) : null;
}
function Kc(e) {
  var t = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (Hc(n) || Uc(n) || Bc(n)) && (t[n] = e[n]);
  return t;
}
var qc = [`children`, `width`, `height`, `viewBox`, `className`, `style`, `title`, `desc`];
function Jc() {
  return (
    (Jc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Jc.apply(null, arguments)
  );
}
function Yc(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = Xc(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function Xc(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var Zc = (0, a.forwardRef)((e, t) => {
    var {
        children: n,
        width: r,
        height: i,
        viewBox: o,
        className: s,
        style: l,
        title: u,
        desc: d,
      } = e,
      f = Yc(e, qc),
      p = o || { width: r, height: i, x: 0, y: 0 },
      m = c(`recharts-surface`, s);
    return a.createElement(
      `svg`,
      Jc({}, Kc(f), {
        className: m,
        width: r,
        height: i,
        style: l,
        viewBox: `${p.x} ${p.y} ${p.width} ${p.height}`,
        ref: t,
      }),
      a.createElement(`title`, null, u),
      a.createElement(`desc`, null, d),
      n,
    );
  }),
  Qc = [`children`, `className`];
function $c() {
  return (
    ($c = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $c.apply(null, arguments)
  );
}
function el(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = tl(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function tl(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var nl = a.forwardRef((e, t) => {
    var { children: n, className: r } = e,
      i = el(e, Qc),
      o = c(`recharts-layer`, r);
    return a.createElement(`g`, $c({ className: o }, Kc(i), { ref: t }), n);
  }),
  rl = (0, a.createContext)(null);
function B(e) {
  return function () {
    return e;
  };
}
var il = Math.PI,
  al = 2 * il,
  ol = 1e-6,
  sl = al - ol;
function cl(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function ll(e) {
  const t = Math.floor(e);
  if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
  if (t > 15) return cl;
  const n = 10 ** t;
  return function (e) {
    this._ += e[0];
    for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
  };
}
var ul = class {
  constructor(e) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ``),
      (this._append = e == null ? cl : ll(e));
  }
  moveTo(e, t) {
    this._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +t)}`;
  }
  closePath() {
    this._x1 !== null && ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(e, t) {
    this._append`L${(this._x1 = +e)},${(this._y1 = +t)}`;
  }
  quadraticCurveTo(e, t, n, r) {
    this._append`Q${+e},${+t},${(this._x1 = +n)},${(this._y1 = +r)}`;
  }
  bezierCurveTo(e, t, n, r, i, a) {
    this._append`C${+e},${+t},${+n},${+r},${(this._x1 = +i)},${(this._y1 = +a)}`;
  }
  arcTo(e, t, n, r, i) {
    if (((e = +e), (t = +t), (n = +n), (r = +r), (i = +i), i < 0))
      throw Error(`negative radius: ${i}`);
    const a = this._x1,
      o = this._y1,
      s = n - e,
      c = r - t,
      l = a - e,
      u = o - t,
      d = l * l + u * u;
    if (this._x1 === null) this._append`M${(this._x1 = e)},${(this._y1 = t)}`;
    else if (d > ol)
      if (!(Math.abs(u * s - c * l) > ol) || !i) this._append`L${(this._x1 = e)},${(this._y1 = t)}`;
      else {
        const f = n - a,
          p = r - o,
          m = s * s + c * c,
          h = f * f + p * p,
          g = Math.sqrt(m),
          _ = Math.sqrt(d),
          v = i * Math.tan((il - Math.acos((m + d - h) / (2 * g * _))) / 2),
          y = v / _,
          b = v / g;
        Math.abs(y - 1) > ol && this._append`L${e + y * l},${t + y * u}`,
          this
            ._append`A${i},${i},0,0,${+(u * f > l * p)},${(this._x1 = e + b * s)},${(this._y1 = t + b * c)}`;
      }
  }
  arc(e, t, n, r, i, a) {
    if (((e = +e), (t = +t), (n = +n), (a = !!a), n < 0)) throw Error(`negative radius: ${n}`);
    let o = n * Math.cos(r),
      s = n * Math.sin(r),
      c = e + o,
      l = t + s,
      u = 1 ^ a,
      d = a ? r - i : i - r;
    this._x1 === null
      ? this._append`M${c},${l}`
      : (Math.abs(this._x1 - c) > ol || Math.abs(this._y1 - l) > ol) && this._append`L${c},${l}`,
      n &&
        (d < 0 && (d = (d % al) + al),
        d > sl
          ? this
              ._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${(this._x1 = c)},${(this._y1 = l)}`
          : d > ol &&
            this
              ._append`A${n},${n},0,${+(d >= il)},${u},${(this._x1 = e + n * Math.cos(i))},${(this._y1 = t + n * Math.sin(i))}`);
  }
  rect(e, t, n, r) {
    this
      ._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +t)}h${(n = +n)}v${+r}h${-n}Z`;
  }
  toString() {
    return this._;
  }
};
function dl() {
  return new ul();
}
dl.prototype = ul.prototype;
function fl(e) {
  let t = 3;
  return (
    (e.digits = function (n) {
      if (!arguments.length) return t;
      if (n == null) t = null;
      else {
        const e = Math.floor(n);
        if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
        t = e;
      }
      return e;
    }),
    () => new ul(t)
  );
}
Array.prototype.slice;
function pl(e) {
  return typeof e == `object` && `length` in e ? e : Array.from(e);
}
function ml(e) {
  this._context = e;
}
ml.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  },
};
function hl(e) {
  return new ml(e);
}
function gl(e) {
  return e[0];
}
function _l(e) {
  return e[1];
}
function vl(e, t) {
  var n = B(!0),
    r = null,
    i = hl,
    a = null,
    o = fl(s);
  (e = typeof e == `function` ? e : e === void 0 ? gl : B(e)),
    (t = typeof t == `function` ? t : t === void 0 ? _l : B(t));
  function s(s) {
    var c,
      l = (s = pl(s)).length,
      u,
      d = !1,
      f;
    for (r ?? (a = i((f = o()))), c = 0; c <= l; ++c)
      !(c < l && n((u = s[c]), c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()),
        d && a.point(+e(u, c, s), +t(u, c, s));
    if (f) return (a = null), f + `` || null;
  }
  return (
    (s.x = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : B(+t)), s) : e;
    }),
    (s.y = function (e) {
      return arguments.length ? ((t = typeof e == `function` ? e : B(+e)), s) : t;
    }),
    (s.defined = function (e) {
      return arguments.length ? ((n = typeof e == `function` ? e : B(!!e)), s) : n;
    }),
    (s.curve = function (e) {
      return arguments.length ? ((i = e), r != null && (a = i(r)), s) : i;
    }),
    (s.context = function (e) {
      return arguments.length ? (e == null ? (r = a = null) : (a = i((r = e))), s) : r;
    }),
    s
  );
}
function yl(e, t, n) {
  var r = null,
    i = B(!0),
    a = null,
    o = hl,
    s = null,
    c = fl(l);
  (e = typeof e == `function` ? e : e === void 0 ? gl : B(+e)),
    (t = typeof t == `function` ? t : B(t === void 0 ? 0 : +t)),
    (n = typeof n == `function` ? n : n === void 0 ? _l : B(+n));
  function l(l) {
    var u,
      d,
      f,
      p = (l = pl(l)).length,
      m,
      h = !1,
      g,
      _ = Array(p),
      v = Array(p);
    for (a ?? (s = o((g = c()))), u = 0; u <= p; ++u) {
      if (!(u < p && i((m = l[u]), u, l)) === h)
        if ((h = !h)) (d = u), s.areaStart(), s.lineStart();
        else {
          for (s.lineEnd(), s.lineStart(), f = u - 1; f >= d; --f) s.point(_[f], v[f]);
          s.lineEnd(), s.areaEnd();
        }
      h &&
        ((_[u] = +e(m, u, l)),
        (v[u] = +t(m, u, l)),
        s.point(r ? +r(m, u, l) : _[u], n ? +n(m, u, l) : v[u]));
    }
    if (g) return (s = null), g + `` || null;
  }
  function u() {
    return vl().defined(i).curve(o).context(a);
  }
  return (
    (l.x = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : B(+t)), (r = null), l) : e;
    }),
    (l.x0 = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : B(+t)), l) : e;
    }),
    (l.x1 = function (e) {
      return arguments.length
        ? ((r = e == null ? null : typeof e == `function` ? e : B(+e)), l)
        : r;
    }),
    (l.y = function (e) {
      return arguments.length ? ((t = typeof e == `function` ? e : B(+e)), (n = null), l) : t;
    }),
    (l.y0 = function (e) {
      return arguments.length ? ((t = typeof e == `function` ? e : B(+e)), l) : t;
    }),
    (l.y1 = function (e) {
      return arguments.length
        ? ((n = e == null ? null : typeof e == `function` ? e : B(+e)), l)
        : n;
    }),
    (l.lineX0 = l.lineY0 =
      function () {
        return u().x(e).y(t);
      }),
    (l.lineY1 = function () {
      return u().x(e).y(n);
    }),
    (l.lineX1 = function () {
      return u().x(r).y(t);
    }),
    (l.defined = function (e) {
      return arguments.length ? ((i = typeof e == `function` ? e : B(!!e)), l) : i;
    }),
    (l.curve = function (e) {
      return arguments.length ? ((o = e), a != null && (s = o(a)), l) : o;
    }),
    (l.context = function (e) {
      return arguments.length ? (e == null ? (a = s = null) : (s = o((a = e))), l) : a;
    }),
    l
  );
}
var bl = class {
  constructor(e, t) {
    (this._context = e), (this._x = t);
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line);
  }
  point(e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._x
          ? this._context.bezierCurveTo(
              (this._x0 = (this._x0 + e) / 2),
              this._y0,
              this._x0,
              t,
              e,
              t,
            )
          : this._context.bezierCurveTo(
              this._x0,
              (this._y0 = (this._y0 + t) / 2),
              e,
              this._y0,
              e,
              t,
            );
        break;
    }
    (this._x0 = e), (this._y0 = t);
  }
};
function xl(e) {
  return new bl(e, !0);
}
function Sl(e) {
  return new bl(e, !1);
}
function Cl() {}
function wl(e, t, n) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + n) / 6,
  );
}
function Tl(e) {
  this._context = e;
}
Tl.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        wl(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        (this._point = 3),
          this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        wl(this, e, t);
        break;
    }
    (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
  },
};
function El(e) {
  return new Tl(e);
}
function Dl(e) {
  this._context = e;
}
Dl.prototype = {
  areaStart: Cl,
  areaEnd: Cl,
  lineStart: function () {
    (this._x0 =
      this._x1 =
      this._x2 =
      this._x3 =
      this._x4 =
      this._y0 =
      this._y1 =
      this._y2 =
      this._y3 =
      this._y4 =
        NaN),
      (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      case 2:
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3),
          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3),
          this._context.closePath();
        break;
      case 3:
        this.point(this._x2, this._y2),
          this.point(this._x3, this._y3),
          this.point(this._x4, this._y4);
        break;
    }
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), (this._x2 = e), (this._y2 = t);
        break;
      case 1:
        (this._point = 2), (this._x3 = e), (this._y3 = t);
        break;
      case 2:
        (this._point = 3),
          (this._x4 = e),
          (this._y4 = t),
          this._context.moveTo(
            (this._x0 + 4 * this._x1 + e) / 6,
            (this._y0 + 4 * this._y1 + t) / 6,
          );
        break;
      default:
        wl(this, e, t);
        break;
    }
    (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
  },
};
function Ol(e) {
  return new Dl(e);
}
function kl(e) {
  this._context = e;
}
kl.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    (this._line || (this._line !== 0 && this._point === 3)) && this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var n = (this._x0 + 4 * this._x1 + e) / 6,
          r = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
        break;
      case 3:
        this._point = 4;
      default:
        wl(this, e, t);
        break;
    }
    (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t);
  },
};
function Al(e) {
  return new kl(e);
}
function jl(e) {
  this._context = e;
}
jl.prototype = {
  areaStart: Cl,
  areaEnd: Cl,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    this._point && this._context.closePath();
  },
  point: function (e, t) {
    (e = +e),
      (t = +t),
      this._point ? this._context.lineTo(e, t) : ((this._point = 1), this._context.moveTo(e, t));
  },
};
function Ml(e) {
  return new jl(e);
}
function Nl(e) {
  return e < 0 ? -1 : 1;
}
function Pl(e, t, n) {
  var r = e._x1 - e._x0,
    i = t - e._x1,
    a = (e._y1 - e._y0) / (r || (i < 0 && -0)),
    o = (n - e._y1) / (i || (r < 0 && -0)),
    s = (a * i + o * r) / (r + i);
  return (Nl(a) + Nl(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(s)) || 0;
}
function Fl(e, t) {
  var n = e._x1 - e._x0;
  return n ? ((3 * (e._y1 - e._y0)) / n - t) / 2 : t;
}
function Il(e, t, n) {
  var r = e._x0,
    i = e._y0,
    a = e._x1,
    o = e._y1,
    s = (a - r) / 3;
  e._context.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
}
function Ll(e) {
  this._context = e;
}
Ll.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN), (this._point = 0);
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Il(this, this._t0, Fl(this, this._t0));
        break;
    }
    (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      (this._line = 1 - this._line);
  },
  point: function (e, t) {
    var n = NaN;
    if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
      switch (this._point) {
        case 0:
          (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3), Il(this, Fl(this, (n = Pl(this, e, t))), n);
          break;
        default:
          Il(this, this._t0, (n = Pl(this, e, t)));
          break;
      }
      (this._x0 = this._x1), (this._x1 = e), (this._y0 = this._y1), (this._y1 = t), (this._t0 = n);
    }
  },
};
function Rl(e) {
  this._context = new zl(e);
}
(Rl.prototype = Object.create(Ll.prototype)).point = function (e, t) {
  Ll.prototype.point.call(this, t, e);
};
function zl(e) {
  this._context = e;
}
zl.prototype = {
  moveTo: function (e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function (e, t, n, r, i, a) {
    this._context.bezierCurveTo(t, e, r, n, a, i);
  },
};
function Bl(e) {
  return new Ll(e);
}
function Vl(e) {
  return new Rl(e);
}
function Hl(e) {
  this._context = e;
}
Hl.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x = []), (this._y = []);
  },
  lineEnd: function () {
    var e = this._x,
      t = this._y,
      n = e.length;
    if (n)
      if (
        (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2)
      )
        this._context.lineTo(e[1], t[1]);
      else
        for (var r = Ul(e), i = Ul(t), a = 0, o = 1; o < n; ++a, ++o)
          this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], e[o], t[o]);
    (this._line || (this._line !== 0 && n === 1)) && this._context.closePath(),
      (this._line = 1 - this._line),
      (this._x = this._y = null);
  },
  point: function (e, t) {
    this._x.push(+e), this._y.push(+t);
  },
};
function Ul(e) {
  var t,
    n = e.length - 1,
    r,
    i = Array(n),
    a = Array(n),
    o = Array(n);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t)
    (i[t] = 1), (a[t] = 4), (o[t] = 4 * e[t] + 2 * e[t + 1]);
  for (i[n - 1] = 2, a[n - 1] = 7, o[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t)
    (r = i[t] / a[t - 1]), (a[t] -= r), (o[t] -= r * o[t - 1]);
  for (i[n - 1] = o[n - 1] / a[n - 1], t = n - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function Wl(e) {
  return new Hl(e);
}
function Gl(e, t) {
  (this._context = e), (this._t = t);
}
Gl.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    (this._x = this._y = NaN), (this._point = 0);
  },
  lineEnd: function () {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y),
      (this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
      this._line >= 0 && ((this._t = 1 - this._t), (this._line = 1 - this._line));
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        (this._point = 1), this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var n = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(n, this._y), this._context.lineTo(n, t);
        }
        break;
    }
    (this._x = e), (this._y = t);
  },
};
function Kl(e) {
  return new Gl(e, 0.5);
}
function ql(e) {
  return new Gl(e, 0);
}
function Jl(e) {
  return new Gl(e, 1);
}
function Yl(e, t) {
  if ((o = e.length) > 1)
    for (var n = 1, r, i, a = e[t[0]], o, s = a.length; n < o; ++n)
      for (i = a, a = e[t[n]], r = 0; r < s; ++r)
        a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
function Xl(e) {
  for (var t = e.length, n = Array(t); --t >= 0; ) n[t] = t;
  return n;
}
function Zl(e, t) {
  return e[t];
}
function Ql(e) {
  const t = [];
  return (t.key = e), t;
}
function $l() {
  var e = B([]),
    t = Xl,
    n = Yl,
    r = Zl;
  function i(i) {
    var a = Array.from(e.apply(this, arguments), Ql),
      o,
      s = a.length,
      c = -1,
      l;
    for (const e of i) for (o = 0, ++c; o < s; ++o) (a[o][c] = [0, +r(e, a[o].key, c, i)]).data = e;
    for (o = 0, l = pl(t(a)); o < s; ++o) a[l[o]].index = o;
    return n(a, l), a;
  }
  return (
    (i.keys = function (t) {
      return arguments.length ? ((e = typeof t == `function` ? t : B(Array.from(t))), i) : e;
    }),
    (i.value = function (e) {
      return arguments.length ? ((r = typeof e == `function` ? e : B(+e)), i) : r;
    }),
    (i.order = function (e) {
      return arguments.length
        ? ((t = e == null ? Xl : typeof e == `function` ? e : B(Array.from(e))), i)
        : t;
    }),
    (i.offset = function (e) {
      return arguments.length ? ((n = e ?? Yl), i) : n;
    }),
    i
  );
}
function eu(e, t) {
  if ((r = e.length) > 0) {
    for (var n, r, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = n = 0; n < r; ++n) o += e[n][i][1] || 0;
      if (o) for (n = 0; n < r; ++n) e[n][i][1] /= o;
    }
    Yl(e, t);
  }
}
function tu(e, t) {
  if ((i = e.length) > 0) {
    for (var n = 0, r = e[t[0]], i, a = r.length; n < a; ++n) {
      for (var o = 0, s = 0; o < i; ++o) s += e[o][n][1] || 0;
      r[n][1] += r[n][0] = -s / 2;
    }
    Yl(e, t);
  }
}
function nu(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var n = 0, r = 1, i, a, o; r < a; ++r) {
      for (var s = 0, c = 0, l = 0; s < o; ++s) {
        for (
          var u = e[t[s]], d = u[r][1] || 0, f = (d - (u[r - 1][1] || 0)) / 2, p = 0;
          p < s;
          ++p
        ) {
          var m = e[t[p]],
            h = m[r][1] || 0,
            g = m[r - 1][1] || 0;
          f += h - g;
        }
        (c += d), (l += f * d);
      }
      (i[r - 1][1] += i[r - 1][0] = n), c && (n -= l / c);
    }
    (i[r - 1][1] += i[r - 1][0] = n), Yl(e, t);
  }
}
var ru = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return e === `__proto__`;
    }
    e.isUnsafeProperty = t;
  }),
  iu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      switch (typeof e) {
        case `number`:
        case `symbol`:
          return !1;
        case `string`:
          return e.includes(`.`) || e.includes(`[`) || e.includes(`]`);
      }
    }
    e.isDeepKey = t;
  }),
  au = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return typeof e == `string` || typeof e == `symbol`
        ? e
        : Object.is(e?.valueOf?.(), -0)
          ? `-0`
          : String(e);
    }
    e.toKey = t;
  }),
  ou = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      if (e == null) return ``;
      if (typeof e == `string`) return e;
      if (Array.isArray(e)) return e.map(t).join(`,`);
      const n = String(e);
      return n === `0` && Object.is(Number(e), -0) ? `-0` : n;
    }
    e.toString = t;
  }),
  su = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = ou(),
      n = au();
    function r(e) {
      if (Array.isArray(e)) return e.map(n.toKey);
      if (typeof e == `symbol`) return [e];
      e = t.toString(e);
      const r = [],
        i = e.length;
      if (i === 0) return r;
      let a = 0,
        o = ``,
        s = ``,
        c = !1;
      for (e.charCodeAt(0) === 46 && (r.push(``), a++); a < i; ) {
        const t = e[a];
        s
          ? t === `\\` && a + 1 < i
            ? (a++, (o += e[a]))
            : t === s
              ? (s = ``)
              : (o += t)
          : c
            ? t === `"` || t === `'`
              ? (s = t)
              : t === `]`
                ? ((c = !1), r.push(o), (o = ``))
                : (o += t)
            : t === `[`
              ? ((c = !0), (o &&= (r.push(o), ``)))
              : t === `.`
                ? (o &&= (r.push(o), ``))
                : (o += t),
          a++;
      }
      return o && r.push(o), r;
    }
    e.toPath = r;
  }),
  cu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = ru(),
      n = iu(),
      r = au(),
      i = su();
    function a(e, s, c) {
      if (e == null) return c;
      switch (typeof s) {
        case `string`: {
          if (t.isUnsafeProperty(s)) return c;
          const r = e[s];
          return r === void 0 ? (n.isDeepKey(s) ? a(e, i.toPath(s), c) : c) : r;
        }
        case `number`:
        case `symbol`: {
          typeof s == `number` && (s = r.toKey(s));
          const t = e[s];
          return t === void 0 ? c : t;
        }
        default: {
          if (Array.isArray(s)) return o(e, s, c);
          if (((s = Object.is(s?.valueOf(), -0) ? `-0` : String(s)), t.isUnsafeProperty(s)))
            return c;
          const n = e[s];
          return n === void 0 ? c : n;
        }
      }
    }
    function o(e, n, r) {
      if (n.length === 0) return r;
      let i = e;
      for (let e = 0; e < n.length; e++) {
        if (i == null || t.isUnsafeProperty(n[e])) return r;
        i = i[n[e]];
      }
      return i === void 0 ? r : i;
    }
    e.get = a;
  }),
  lu = e(
    n((e, t) => {
      t.exports = cu().get;
    })(),
  ),
  uu = 4;
function du(e) {
  var t = 10 ** (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : uu),
    n = Math.round(e * t) / t;
  return Object.is(n, -0) ? 0 : n;
}
function fu(e) {
  var t = [...arguments].slice(1);
  return e.reduce((e, n, r) => {
    var i = t[r - 1];
    return typeof i == `string` ? e + i + n : i === void 0 ? e + n : e + du(i) + n;
  }, ``);
}
var pu = (e) => (e === 0 ? 0 : e > 0 ? 1 : -1),
  mu = (e) => typeof e == `number` && e != +e,
  hu = (e) => typeof e == `string` && e.indexOf(`%`) === e.length - 1,
  V = (e) => (typeof e == `number` || e instanceof Number) && !mu(e),
  gu = (e) => V(e) || typeof e == `string`,
  _u = 0,
  vu = (e) => {
    var t = ++_u;
    return `${e || ``}${t}`;
  },
  yu = function (e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!V(e) && typeof e != `string`) return n;
    var i;
    if (hu(e)) {
      if (t == null) return n;
      var a = e.indexOf(`%`);
      i = (t * parseFloat(e.slice(0, a))) / 100;
    } else i = +e;
    return mu(i) && (i = n), r && t != null && i > t && (i = t), i;
  },
  bu = (e) => {
    if (!Array.isArray(e)) return !1;
    for (var t = e.length, n = {}, r = 0; r < t; r++)
      if (n[String(e[r])]) return !0;
      else n[String(e[r])] = !0;
    return !1;
  };
function xu(e, t, n) {
  return V(e) && V(t) ? du(e + n * (t - e)) : t;
}
function Su(e, t, n) {
  if (!(!e || !e.length))
    return e.find((e) => e && (typeof t == `function` ? t(e) : (0, lu.default)(e, t)) === n);
}
var Cu = (e) => e == null,
  wu = (e) => (Cu(e) ? e : `${e.charAt(0).toUpperCase()}${e.slice(1)}`);
function Tu(e) {
  return e != null;
}
function Eu() {}
var Du = (e) => `radius` in e && `startAngle` in e && `endAngle` in e,
  Ou = (e, t) => {
    if (!e || typeof e == `function` || typeof e == `boolean`) return null;
    var n = e;
    if (((0, a.isValidElement)(e) && (n = e.props), typeof n != `object` && typeof n != `function`))
      return null;
    var r = {};
    return (
      Object.keys(n).forEach((e) => {
        Bc(e) && typeof n[e] == `function` && (r[e] = t || ((t) => n[e](n, t)));
      }),
      r
    );
  };
function ku(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Au(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? ku(Object(n), !0).forEach(function (t) {
          ju(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ku(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function ju(e, t, n) {
  return (
    (t = Mu(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Mu(e) {
  var t = Nu(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Nu(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Pu(e, t) {
  var n = Au({}, e),
    r = t;
  return Object.keys(t).reduce(
    (e, t) => (e[t] === void 0 && r[t] !== void 0 && (e[t] = r[t]), e),
    n,
  );
}
var Fu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e, t) {
      const n = new Map();
      for (let r = 0; r < e.length; r++) {
        const i = e[r],
          a = t(i, r, e);
        n.has(a) || n.set(a, i);
      }
      return Array.from(n.values());
    }
    e.uniqBy = t;
  }),
  Iu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e, t) {
      return function (...n) {
        return e.apply(this, n.slice(0, t));
      };
    }
    e.ary = t;
  }),
  Lu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return e;
    }
    e.identity = t;
  }),
  Ru = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return Number.isSafeInteger(e) && e >= 0;
    }
    e.isLength = t;
  }),
  zu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Ru();
    function n(e) {
      return e != null && typeof e != `function` && t.isLength(e.length);
    }
    e.isArrayLike = n;
  }),
  Bu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return typeof e == `object` && !!e;
    }
    e.isObjectLike = t;
  }),
  Vu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = zu(),
      n = Bu();
    function r(e) {
      return n.isObjectLike(e) && t.isArrayLike(e);
    }
    e.isArrayLikeObject = r;
  }),
  Hu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = cu();
    function n(e) {
      return function (n) {
        return t.get(n, e);
      };
    }
    e.property = n;
  }),
  Uu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return e !== null && (typeof e == `object` || typeof e == `function`);
    }
    e.isObject = t;
  }),
  Wu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return e == null || (typeof e != `object` && typeof e != `function`);
    }
    e.isPrimitive = t;
  }),
  Gu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e, t) {
      return e === t || (Number.isNaN(e) && Number.isNaN(t));
    }
    e.isEqualsSameValueZero = t;
  }),
  Ku = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Uu(),
      n = Wu(),
      r = Gu();
    function i(e, t, n) {
      return typeof n == `function`
        ? a(
            e,
            t,
            function e(t, r, i, o, s, c) {
              const l = n(t, r, i, o, s, c);
              return l === void 0 ? a(t, r, e, c) : !!l;
            },
            new Map(),
          )
        : i(e, t, () => void 0);
    }
    function a(e, n, i, s) {
      if (n === e) return !0;
      switch (typeof n) {
        case `object`:
          return o(e, n, i, s);
        case `function`:
          return Object.keys(n).length > 0 ? a(e, { ...n }, i, s) : r.isEqualsSameValueZero(e, n);
        default:
          return t.isObject(e)
            ? typeof n == `string`
              ? n === ``
              : !0
            : r.isEqualsSameValueZero(e, n);
      }
    }
    function o(e, t, r, i) {
      if (t == null) return !0;
      if (Array.isArray(t)) return c(e, t, r, i);
      if (t instanceof Map) return s(e, t, r, i);
      if (t instanceof Set) return l(e, t, r, i);
      const a = Object.keys(t);
      if (e == null || n.isPrimitive(e)) return a.length === 0;
      if (a.length === 0) return !0;
      if (i?.has(t)) return i.get(t) === e;
      i?.set(t, e);
      try {
        for (let o = 0; o < a.length; o++) {
          const s = a[o];
          if (
            (!n.isPrimitive(e) && !(s in e)) ||
            (t[s] === void 0 && e[s] !== void 0) ||
            (t[s] === null && e[s] !== null) ||
            !r(e[s], t[s], s, e, t, i)
          )
            return !1;
        }
        return !0;
      } finally {
        i?.delete(t);
      }
    }
    function s(e, t, n, r) {
      if (t.size === 0) return !0;
      if (!(e instanceof Map)) return !1;
      for (const [i, a] of t.entries()) if (n(e.get(i), a, i, e, t, r) === !1) return !1;
      return !0;
    }
    function c(e, t, n, r) {
      if (t.length === 0) return !0;
      if (!Array.isArray(e)) return !1;
      const i = new Set();
      for (let a = 0; a < t.length; a++) {
        let o = t[a],
          s = !1;
        for (let c = 0; c < e.length; c++) {
          if (i.has(c)) continue;
          let l = e[c],
            u = !1;
          if ((n(l, o, a, e, t, r) && (u = !0), u)) {
            i.add(c), (s = !0);
            break;
          }
        }
        if (!s) return !1;
      }
      return !0;
    }
    function l(e, t, n, r) {
      return t.size === 0 ? !0 : e instanceof Set ? c([...e], [...t], n, r) : !1;
    }
    (e.isMatchWith = i), (e.isSetMatch = l);
  }),
  qu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Ku();
    function n(e, n) {
      return t.isMatchWith(e, n, () => void 0);
    }
    e.isMatch = n;
  }),
  Ju = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return Object.getOwnPropertySymbols(e).filter((t) =>
        Object.prototype.propertyIsEnumerable.call(e, t),
      );
    }
    e.getSymbols = t;
  }),
  Yu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return e == null
        ? e === void 0
          ? `[object Undefined]`
          : `[object Null]`
        : Object.prototype.toString.call(e);
    }
    e.getTag = t;
  }),
  Xu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` }),
      (e.argumentsTag = `[object Arguments]`),
      (e.arrayBufferTag = `[object ArrayBuffer]`),
      (e.arrayTag = `[object Array]`),
      (e.bigInt64ArrayTag = `[object BigInt64Array]`),
      (e.bigUint64ArrayTag = `[object BigUint64Array]`),
      (e.booleanTag = `[object Boolean]`),
      (e.dataViewTag = `[object DataView]`),
      (e.dateTag = `[object Date]`),
      (e.errorTag = `[object Error]`),
      (e.float32ArrayTag = `[object Float32Array]`),
      (e.float64ArrayTag = `[object Float64Array]`),
      (e.functionTag = `[object Function]`),
      (e.int16ArrayTag = `[object Int16Array]`),
      (e.int32ArrayTag = `[object Int32Array]`),
      (e.int8ArrayTag = `[object Int8Array]`),
      (e.mapTag = `[object Map]`),
      (e.numberTag = `[object Number]`),
      (e.objectTag = `[object Object]`),
      (e.regexpTag = `[object RegExp]`),
      (e.setTag = `[object Set]`),
      (e.stringTag = `[object String]`),
      (e.symbolTag = `[object Symbol]`),
      (e.uint16ArrayTag = `[object Uint16Array]`),
      (e.uint32ArrayTag = `[object Uint32Array]`),
      (e.uint8ArrayTag = `[object Uint8Array]`),
      (e.uint8ClampedArrayTag = `[object Uint8ClampedArray]`);
  }),
  Zu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return ArrayBuffer.isView(e) && !(e instanceof DataView);
    }
    e.isTypedArray = t;
  }),
  Qu = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Ju(),
      n = Yu(),
      r = Xu(),
      i = Wu(),
      a = Zu();
    function o(e, t) {
      return s(e, void 0, e, new Map(), t);
    }
    function s(e, t, n, r = new Map(), o = void 0) {
      const u = o?.(e, t, n, r);
      if (u !== void 0) return u;
      if (i.isPrimitive(e)) return e;
      if (r.has(e)) return r.get(e);
      if (Array.isArray(e)) {
        const t = Array(e.length);
        r.set(e, t);
        for (let i = 0; i < e.length; i++) t[i] = s(e[i], i, n, r, o);
        return (
          Object.hasOwn(e, `index`) && (t.index = e.index),
          Object.hasOwn(e, `input`) && (t.input = e.input),
          t
        );
      }
      if (e instanceof Date) return new Date(e.getTime());
      if (e instanceof RegExp) {
        const t = new RegExp(e.source, e.flags);
        return (t.lastIndex = e.lastIndex), t;
      }
      if (e instanceof Map) {
        const t = new Map();
        r.set(e, t);
        for (const [i, a] of e) t.set(i, s(a, i, n, r, o));
        return t;
      }
      if (e instanceof Set) {
        const t = new Set();
        r.set(e, t);
        for (const i of e) t.add(s(i, void 0, n, r, o));
        return t;
      }
      if (typeof Buffer < `u` && Buffer.isBuffer(e)) return e.subarray();
      if (a.isTypedArray(e)) {
        const t = new (Object.getPrototypeOf(e).constructor)(e.length);
        r.set(e, t);
        for (let i = 0; i < e.length; i++) t[i] = s(e[i], i, n, r, o);
        return t;
      }
      if (
        e instanceof ArrayBuffer ||
        (typeof SharedArrayBuffer < `u` && e instanceof SharedArrayBuffer)
      )
        return e.slice(0);
      if (e instanceof DataView) {
        const t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
        return r.set(e, t), c(t, e, n, r, o), t;
      }
      if (typeof File < `u` && e instanceof File) {
        const t = new File([e], e.name, { type: e.type });
        return r.set(e, t), c(t, e, n, r, o), t;
      }
      if (typeof Blob < `u` && e instanceof Blob) {
        const t = new Blob([e], { type: e.type });
        return r.set(e, t), c(t, e, n, r, o), t;
      }
      if (e instanceof Error) {
        const t = structuredClone(e);
        return (
          r.set(e, t),
          (t.message = e.message),
          (t.name = e.name),
          (t.stack = e.stack),
          (t.cause = e.cause),
          (t.constructor = e.constructor),
          c(t, e, n, r, o),
          t
        );
      }
      if (e instanceof Boolean) {
        const t = new Boolean(e.valueOf());
        return r.set(e, t), c(t, e, n, r, o), t;
      }
      if (e instanceof Number) {
        const t = new Number(e.valueOf());
        return r.set(e, t), c(t, e, n, r, o), t;
      }
      if (e instanceof String) {
        const t = new String(e.valueOf());
        return r.set(e, t), c(t, e, n, r, o), t;
      }
      if (typeof e == `object` && l(e)) {
        const t = Object.create(Object.getPrototypeOf(e));
        return r.set(e, t), c(t, e, n, r, o), t;
      }
      return e;
    }
    function c(e, n, r = e, i, a) {
      const o = [...Object.keys(n), ...t.getSymbols(n)];
      for (let t = 0; t < o.length; t++) {
        const c = o[t],
          l = Object.getOwnPropertyDescriptor(e, c);
        (l == null || l.writable) && (e[c] = s(n[c], c, r, i, a));
      }
    }
    function l(e) {
      switch (n.getTag(e)) {
        case r.argumentsTag:
        case r.arrayTag:
        case r.arrayBufferTag:
        case r.dataViewTag:
        case r.booleanTag:
        case r.dateTag:
        case r.float32ArrayTag:
        case r.float64ArrayTag:
        case r.int8ArrayTag:
        case r.int16ArrayTag:
        case r.int32ArrayTag:
        case r.mapTag:
        case r.numberTag:
        case r.objectTag:
        case r.regexpTag:
        case r.setTag:
        case r.stringTag:
        case r.symbolTag:
        case r.uint8ArrayTag:
        case r.uint8ClampedArrayTag:
        case r.uint16ArrayTag:
        case r.uint32ArrayTag:
          return !0;
        default:
          return !1;
      }
    }
    (e.cloneDeepWith = o), (e.cloneDeepWithImpl = s), (e.copyProperties = c);
  }),
  $u = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Qu();
    function n(e) {
      return t.cloneDeepWithImpl(e, void 0, e, new Map(), void 0);
    }
    e.cloneDeep = n;
  }),
  ed = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = qu(),
      n = $u();
    function r(e) {
      return (e = n.cloneDeep(e)), (n) => t.isMatch(n, e);
    }
    e.matches = r;
  }),
  td = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Qu(),
      n = Yu(),
      r = Xu();
    function i(e, i) {
      return t.cloneDeepWith(e, (a, o, s, c) => {
        const l = i?.(a, o, s, c);
        if (l !== void 0) return l;
        if (typeof e == `object`) {
          if (n.getTag(e) === r.objectTag && typeof e.constructor != `function`) {
            const n = {};
            return c.set(e, n), t.copyProperties(n, e, s, c), n;
          }
          switch (Object.prototype.toString.call(e)) {
            case r.numberTag:
            case r.stringTag:
            case r.booleanTag: {
              const n = new e.constructor(e?.valueOf());
              return t.copyProperties(n, e), n;
            }
            case r.argumentsTag: {
              const n = {};
              return (
                t.copyProperties(n, e),
                (n.length = e.length),
                (n[Symbol.iterator] = e[Symbol.iterator]),
                n
              );
            }
            default:
              return;
          }
        }
      });
    }
    e.cloneDeepWith = i;
  }),
  nd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = td();
    function n(e) {
      return t.cloneDeepWith(e);
    }
    e.cloneDeep = n;
  }),
  rd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = /^(?:0|[1-9]\d*)$/;
    function n(e, n = 2 ** 53 - 1) {
      switch (typeof e) {
        case `number`:
          return Number.isInteger(e) && e >= 0 && e < n;
        case `symbol`:
          return !1;
        case `string`:
          return t.test(e);
      }
    }
    e.isIndex = n;
  }),
  id = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Yu();
    function n(e) {
      return typeof e == `object` && !!e && t.getTag(e) === `[object Arguments]`;
    }
    e.isArguments = n;
  }),
  ad = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = iu(),
      n = rd(),
      r = id(),
      i = su();
    function a(e, a) {
      let o;
      if (
        ((o = Array.isArray(a)
          ? a
          : typeof a == `string` && t.isDeepKey(a) && e?.[a] == null
            ? i.toPath(a)
            : [a]),
        o.length === 0)
      )
        return !1;
      let s = e;
      for (let e = 0; e < o.length; e++) {
        const t = o[e];
        if (
          (s == null || !Object.hasOwn(s, t)) &&
          !((Array.isArray(s) || r.isArguments(s)) && n.isIndex(t) && t < s.length)
        )
          return !1;
        s = s[t];
      }
      return !0;
    }
    e.has = a;
  }),
  od = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = qu(),
      n = au(),
      r = nd(),
      i = cu(),
      a = ad();
    function o(e, o) {
      switch (typeof e) {
        case `object`:
          Object.is(e?.valueOf(), -0) && (e = `-0`);
          break;
        case `number`:
          e = n.toKey(e);
          break;
      }
      return (
        (o = r.cloneDeep(o)),
        function (n) {
          const r = i.get(n, e);
          return r === void 0 ? a.has(n, e) : o === void 0 ? r === void 0 : t.isMatch(r, o);
        }
      );
    }
    e.matchesProperty = o;
  }),
  sd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Lu(),
      n = Hu(),
      r = ed(),
      i = od();
    function a(e) {
      if (e == null) return t.identity;
      switch (typeof e) {
        case `function`:
          return e;
        case `object`:
          return Array.isArray(e) && e.length === 2 ? i.matchesProperty(e[0], e[1]) : r.matches(e);
        case `string`:
        case `symbol`:
        case `number`:
          return n.property(e);
      }
    }
    e.iteratee = a;
  }),
  cd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Fu(),
      n = Iu(),
      r = Lu(),
      i = Vu(),
      a = sd();
    function o(e, o = r.identity) {
      return i.isArrayLikeObject(e) ? t.uniqBy(Array.from(e), n.ary(a.iteratee(o), 1)) : [];
    }
    e.uniqBy = o;
  }),
  ld = e(
    n((e, t) => {
      t.exports = cd().uniqBy;
    })(),
  );
function ud(e, t, n) {
  return t === !0 ? (0, ld.default)(e, n) : typeof t == `function` ? (0, ld.default)(e, t) : e;
}
var dd = n((e) => {
    var t = r();
    function n(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var i = typeof Object.is == `function` ? Object.is : n,
      a = t.useState,
      o = t.useEffect,
      s = t.useLayoutEffect,
      c = t.useDebugValue;
    function l(e, t) {
      var n = t(),
        r = a({ inst: { value: n, getSnapshot: t } }),
        i = r[0].inst,
        l = r[1];
      return (
        s(
          function () {
            (i.value = n), (i.getSnapshot = t), u(i) && l({ inst: i });
          },
          [e, n, t],
        ),
        o(
          function () {
            return (
              u(i) && l({ inst: i }),
              e(function () {
                u(i) && l({ inst: i });
              })
            );
          },
          [e],
        ),
        c(n),
        n
      );
    }
    function u(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !i(e, n);
      } catch {
        return !0;
      }
    }
    function d(e, t) {
      return t();
    }
    var f =
      typeof window > `u` || window.document === void 0 || window.document.createElement === void 0
        ? d
        : l;
    e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? f : t.useSyncExternalStore;
  }),
  fd = n((e, t) => {
    t.exports = dd();
  }),
  pd = n((e) => {
    var t = r(),
      n = fd();
    function i(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var a = typeof Object.is == `function` ? Object.is : i,
      o = n.useSyncExternalStore,
      s = t.useRef,
      c = t.useEffect,
      l = t.useMemo,
      u = t.useDebugValue;
    e.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
      var d = s(null);
      if (d.current === null) {
        var f = { hasValue: !1, value: null };
        d.current = f;
      } else f = d.current;
      d = l(
        function () {
          function e(e) {
            if (!o) {
              if (((o = !0), (s = e), (e = r(e)), i !== void 0 && f.hasValue)) {
                var t = f.value;
                if (i(t, e)) return (c = t);
              }
              return (c = e);
            }
            if (((t = c), a(s, e))) return t;
            var n = r(e);
            return i !== void 0 && i(t, n) ? ((s = e), t) : ((s = e), (c = n));
          }
          var o = !1,
            s,
            c,
            l = n === void 0 ? null : n;
          return [
            function () {
              return e(t());
            },
            l === null
              ? void 0
              : function () {
                  return e(l());
                },
          ];
        },
        [t, n, r, i],
      );
      var p = o(e, d[0], d[1]);
      return (
        c(
          function () {
            (f.hasValue = !0), (f.value = p);
          },
          [p],
        ),
        u(p),
        p
      );
    };
  }),
  md = n((e, t) => {
    t.exports = pd();
  })(),
  hd = (0, a.createContext)(null),
  gd = (e) => e,
  _d = () => {
    var e = (0, a.useContext)(hd);
    return e ? e.store.dispatch : gd;
  },
  vd = () => {},
  yd = () => vd,
  bd = (e, t) => e === t;
function H(e) {
  var t = (0, a.useContext)(hd),
    n = (0, a.useMemo)(
      () =>
        t
          ? (t) => {
              if (t != null) return e(t);
            }
          : vd,
      [t, e],
    );
  return (0, md.useSyncExternalStoreWithSelector)(
    t ? t.subscription.addNestedSub : yd,
    t ? t.store.getState : vd,
    t ? t.store.getState : vd,
    n,
    bd,
  );
}
function xd(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != `function`) throw TypeError(t);
}
function Sd(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != `object`) throw TypeError(t);
}
function Cd(e, t = `expected all items to be functions, instead received the following types: `) {
  if (!e.every((e) => typeof e == `function`)) {
    const n = e
      .map((e) => (typeof e == `function` ? `function ${e.name || `unnamed`}()` : typeof e))
      .join(`, `);
    throw TypeError(`${t}[${n}]`);
  }
}
var wd = (e) => (Array.isArray(e) ? e : [e]);
function Td(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    Cd(
      t,
      `createSelector expects all input-selectors to be functions, but received the following types: `,
    ),
    t
  );
}
function Ed(e, t) {
  const n = [],
    { length: r } = e;
  for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
  return n;
}
var Dd = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  Od = typeof WeakRef < `u` ? WeakRef : Dd,
  kd = 0,
  Ad = 1;
function jd() {
  return { s: kd, v: void 0, o: null, p: null };
}
function Md(e, t = {}) {
  let n = jd(),
    { resultEqualityCheck: r } = t,
    i,
    a = 0;
  function o() {
    let t = n,
      { length: o } = arguments;
    for (let e = 0, n = o; e < n; e++) {
      const n = arguments[e];
      if (typeof n == `function` || (typeof n == `object` && n)) {
        let e = t.o;
        e === null && (t.o = e = new WeakMap());
        const r = e.get(n);
        r === void 0 ? ((t = jd()), e.set(n, t)) : (t = r);
      } else {
        let e = t.p;
        e === null && (t.p = e = new Map());
        const r = e.get(n);
        r === void 0 ? ((t = jd()), e.set(n, t)) : (t = r);
      }
    }
    let s = t,
      c;
    if (t.s === Ad) c = t.v;
    else if (((c = e.apply(null, arguments)), a++, r)) {
      const e = i?.deref?.() ?? i;
      e != null && r(e, c) && ((c = e), a !== 0 && a--),
        (i = (typeof c == `object` && c) || typeof c == `function` ? new Od(c) : c);
    }
    return (s.s = Ad), (s.v = c), c;
  }
  return (
    (o.clearCache = () => {
      (n = jd()), o.resetResultsCount();
    }),
    (o.resultsCount = () => a),
    (o.resetResultsCount = () => {
      a = 0;
    }),
    o
  );
}
function Nd(e, ...t) {
  const n = typeof e == `function` ? { memoize: e, memoizeOptions: t } : e,
    r = (...e) => {
      let t = 0,
        r = 0,
        i,
        a = {},
        o = e.pop();
      typeof o == `object` && ((a = o), (o = e.pop())),
        xd(
          o,
          `createSelector expects an output function after the inputs, but received: [${typeof o}]`,
        );
      const {
          memoize: s,
          memoizeOptions: c = [],
          argsMemoize: l = Md,
          argsMemoizeOptions: u = [],
          devModeChecks: d = {},
        } = { ...n, ...a },
        f = wd(c),
        p = wd(u),
        m = Td(e),
        h = s(
          function () {
            return t++, o.apply(null, arguments);
          },
          ...f,
        ),
        g = l(
          function () {
            r++;
            const e = Ed(m, arguments);
            return (i = h.apply(null, e)), i;
          },
          ...p,
        );
      return Object.assign(g, {
        resultFunc: o,
        memoizedResultFunc: h,
        dependencies: m,
        dependencyRecomputations: () => r,
        resetDependencyRecomputations: () => {
          r = 0;
        },
        lastResult: () => i,
        recomputations: () => t,
        resetRecomputations: () => {
          t = 0;
        },
        memoize: s,
        argsMemoize: l,
      });
    };
  return Object.assign(r, { withTypes: () => r }), r;
}
var U = Nd(Md),
  Pd = Object.assign(
    (e, t = U) => {
      Sd(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
      );
      const n = Object.keys(e);
      return t(
        n.map((t) => e[t]),
        (...e) => e.reduce((e, t, r) => ((e[n[r]] = t), e), {}),
      );
    },
    { withTypes: () => Pd },
  ),
  Fd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return typeof e == `symbol` ? 1 : e === null ? 2 : e === void 0 ? 3 : e === e ? 0 : 4;
    }
    e.compareValues = (e, n, r) => {
      if (e !== n) {
        const i = t(e),
          a = t(n);
        if (i === a && i === 0) {
          if (e < n) return r === `desc` ? 1 : -1;
          if (e > n) return r === `desc` ? -1 : 1;
        }
        return r === `desc` ? a - i : i - a;
      }
      return 0;
    };
  }),
  Id = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e) {
      return typeof e == `symbol` || e instanceof Symbol;
    }
    e.isSymbol = t;
  }),
  Ld = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Id(),
      n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      r = /^\w*$/;
    function i(e, i) {
      return Array.isArray(e)
        ? !1
        : typeof e == `number` || typeof e == `boolean` || e == null || t.isSymbol(e)
          ? !0
          : (typeof e == `string` && (r.test(e) || !n.test(e))) ||
            (i != null && Object.hasOwn(i, e));
    }
    e.isKey = i;
  }),
  Rd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Fd(),
      n = Ld(),
      r = su();
    function i(e, i, a, o) {
      if (e == null) return [];
      (a = o ? void 0 : a),
        Array.isArray(e) || (e = Object.values(e)),
        Array.isArray(i) || (i = i == null ? [null] : [i]),
        i.length === 0 && (i = [null]),
        Array.isArray(a) || (a = a == null ? [] : [a]),
        (a = a.map((e) => String(e)));
      const s = (e, t) => {
          let n = e;
          for (let e = 0; e < t.length && n != null; ++e) n = n[t[e]];
          return n;
        },
        c = (e, t) =>
          t == null || e == null
            ? t
            : typeof e == `object` && `key` in e
              ? Object.hasOwn(t, e.key)
                ? t[e.key]
                : s(t, e.path)
              : typeof e == `function`
                ? e(t)
                : Array.isArray(e)
                  ? s(t, e)
                  : typeof t == `object`
                    ? t[e]
                    : t,
        l = i.map(
          (e) => (
            Array.isArray(e) && e.length === 1 && (e = e[0]),
            e == null || typeof e == `function` || Array.isArray(e) || n.isKey(e)
              ? e
              : { key: e, path: r.toPath(e) }
          ),
        );
      return e
        .map((e) => ({ original: e, criteria: l.map((t) => c(t, e)) }))
        .slice()
        .sort((e, n) => {
          for (let r = 0; r < l.length; r++) {
            const i = t.compareValues(e.criteria[r], n.criteria[r], a[r]);
            if (i !== 0) return i;
          }
          return 0;
        })
        .map((e) => e.original);
    }
    e.orderBy = i;
  }),
  zd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e, t = 1) {
      const n = [],
        r = Math.floor(t),
        i = (e, t) => {
          for (let a = 0; a < e.length; a++) {
            const o = e[a];
            Array.isArray(o) && t < r ? i(o, t + 1) : n.push(o);
          }
        };
      return i(e, 0), n;
    }
    e.flatten = t;
  }),
  Bd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = rd(),
      n = zu(),
      r = Uu(),
      i = Gu();
    function a(e, a, o) {
      return r.isObject(o) &&
        ((typeof a == `number` && n.isArrayLike(o) && t.isIndex(a) && a < o.length) ||
          (typeof a == `string` && a in o))
        ? i.isEqualsSameValueZero(o[a], e)
        : !1;
    }
    e.isIterateeCall = a;
  }),
  Vd = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Rd(),
      n = zd(),
      r = Bd();
    function i(e, ...i) {
      const a = i.length;
      return (
        a > 1 && r.isIterateeCall(e, i[0], i[1])
          ? (i = [])
          : a > 2 && r.isIterateeCall(i[0], i[1], i[2]) && (i = [i[0]]),
        t.orderBy(e, n.flatten(i), [`asc`])
      );
    }
    e.sortBy = i;
  }),
  Hd = e(
    n((e, t) => {
      t.exports = Vd().sortBy;
    })(),
  ),
  Ud = (e) => e.legend.settings,
  Wd = (e) => e.legend.size;
U([(e) => e.legend.payload, Ud], (e, t) => {
  var { itemSorter: n } = t,
    r = e.flat(1);
  return n ? (0, Hd.default)(r, n) : r;
});
var Gd = 1;
function Kd() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    [t, n] = (0, a.useState)({ height: 0, left: 0, top: 0, width: 0 });
  return [
    t,
    (0, a.useCallback)(
      (e) => {
        if (e != null) {
          var r = e.getBoundingClientRect(),
            i = { height: r.height, left: r.left, top: r.top, width: r.width };
          (Math.abs(i.height - t.height) > Gd ||
            Math.abs(i.left - t.left) > Gd ||
            Math.abs(i.top - t.top) > Gd ||
            Math.abs(i.width - t.width) > Gd) &&
            n({ height: i.height, left: i.left, top: i.top, width: i.width });
        }
      },
      [t.width, t.height, t.top, t.left, ...e],
    ),
  ];
}
function qd(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Jd = (typeof Symbol == `function` && Symbol.observable) || `@@observable`,
  Yd = () => Math.random().toString(36).substring(7).split(``).join(`.`),
  Xd = {
    INIT: `@@redux/INIT${Yd()}`,
    REPLACE: `@@redux/REPLACE${Yd()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Yd()}`,
  };
function Zd(e) {
  if (typeof e != `object` || !e) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Qd(e, t, n) {
  if (typeof e != `function`) throw Error(qd(2));
  if (
    (typeof t == `function` && typeof n == `function`) ||
    (typeof n == `function` && typeof arguments[3] == `function`)
  )
    throw Error(qd(0));
  if ((typeof t == `function` && n === void 0 && ((n = t), (t = void 0)), n !== void 0)) {
    if (typeof n != `function`) throw Error(qd(1));
    return n(Qd)(e, t);
  }
  let r = e,
    i = t,
    a = new Map(),
    o = a,
    s = 0,
    c = !1;
  function l() {
    o === a &&
      ((o = new Map()),
      a.forEach((e, t) => {
        o.set(t, e);
      }));
  }
  function u() {
    if (c) throw Error(qd(3));
    return i;
  }
  function d(e) {
    if (typeof e != `function`) throw Error(qd(4));
    if (c) throw Error(qd(5));
    let t = !0;
    l();
    const n = s++;
    return (
      o.set(n, e),
      function () {
        if (t) {
          if (c) throw Error(qd(6));
          (t = !1), l(), o.delete(n), (a = null);
        }
      }
    );
  }
  function f(e) {
    if (!Zd(e)) throw Error(qd(7));
    if (e.type === void 0) throw Error(qd(8));
    if (typeof e.type != `string`) throw Error(qd(17));
    if (c) throw Error(qd(9));
    try {
      (c = !0), (i = r(i, e));
    } finally {
      c = !1;
    }
    return (
      (a = o).forEach((e) => {
        e();
      }),
      e
    );
  }
  function p(e) {
    if (typeof e != `function`) throw Error(qd(10));
    (r = e), f({ type: Xd.REPLACE });
  }
  function m() {
    const e = d;
    return {
      subscribe(t) {
        if (typeof t != `object` || !t) throw Error(qd(11));
        function n() {
          const e = t;
          e.next && e.next(u());
        }
        return n(), { unsubscribe: e(n) };
      },
      [Jd]() {
        return this;
      },
    };
  }
  return (
    f({ type: Xd.INIT }), { dispatch: f, subscribe: d, getState: u, replaceReducer: p, [Jd]: m }
  );
}
function $d(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (n(void 0, { type: Xd.INIT }) === void 0) throw Error(qd(12));
    if (n(void 0, { type: Xd.PROBE_UNKNOWN_ACTION() }) === void 0) throw Error(qd(13));
  });
}
function ef(e) {
  const t = Object.keys(e),
    n = {};
  for (let r = 0; r < t.length; r++) {
    const i = t[r];
    typeof e[i] == `function` && (n[i] = e[i]);
  }
  let r = Object.keys(n),
    i;
  try {
    $d(n);
  } catch (e) {
    i = e;
  }
  return function (e = {}, t) {
    if (i) throw i;
    let a = !1,
      o = {};
    for (let i = 0; i < r.length; i++) {
      const s = r[i],
        c = n[s],
        l = e[s],
        u = c(l, t);
      if (u === void 0) throw (t && t.type, Error(qd(14)));
      (o[s] = u), (a ||= u !== l);
    }
    return (a ||= r.length !== Object.keys(e).length), a ? o : e;
  };
}
function tf(...e) {
  return e.length === 0
    ? (e) => e
    : e.length === 1
      ? e[0]
      : e.reduce(
          (e, t) =>
            (...n) =>
              e(t(...n)),
        );
}
function nf(...e) {
  return (t) => (n, r) => {
    let i = t(n, r),
      a = () => {
        throw Error(qd(15));
      },
      o = { getState: i.getState, dispatch: (e, ...t) => a(e, ...t) };
    return (a = tf(...e.map((e) => e(o)))(i.dispatch)), { ...i, dispatch: a };
  };
}
function rf(e) {
  return Zd(e) && `type` in e && typeof e.type == `string`;
}
var af = Symbol.for(`immer-nothing`),
  of = Symbol.for(`immer-draftable`),
  sf = Symbol.for(`immer-state`);
function cf(e, ...t) {
  throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var lf = Object,
  uf = lf.getPrototypeOf,
  df = `constructor`,
  ff = `prototype`,
  pf = `configurable`,
  mf = `enumerable`,
  hf = `writable`,
  gf = `value`,
  _f = (e) => !!e && !!e[sf];
function vf(e) {
  return e ? xf(e) || Of(e) || !!e[of] || !!e[df]?.[of] || kf(e) || Af(e) : !1;
}
var yf = lf[ff][df].toString(),
  bf = new WeakMap();
function xf(e) {
  if (!e || !jf(e)) return !1;
  const t = uf(e);
  if (t === null || t === lf[ff]) return !0;
  const n = lf.hasOwnProperty.call(t, df) && t[df];
  if (n === Object) return !0;
  if (!Mf(n)) return !1;
  let r = bf.get(n);
  return r === void 0 && ((r = Function.toString.call(n)), bf.set(n, r)), r === yf;
}
function Sf(e, t, n = !0) {
  Cf(e) === 0
    ? (n ? Reflect.ownKeys(e) : lf.keys(e)).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function Cf(e) {
  const t = e[sf];
  return t ? t.type_ : Of(e) ? 1 : kf(e) ? 2 : Af(e) ? 3 : 0;
}
var wf = (e, t, n = Cf(e)) => (n === 2 ? e.has(t) : lf[ff].hasOwnProperty.call(e, t)),
  Tf = (e, t, n = Cf(e)) => (n === 2 ? e.get(t) : e[t]),
  Ef = (e, t, n, r = Cf(e)) => {
    r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
  };
function Df(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
var Of = Array.isArray,
  kf = (e) => e instanceof Map,
  Af = (e) => e instanceof Set,
  jf = (e) => typeof e == `object`,
  Mf = (e) => typeof e == `function`,
  Nf = (e) => typeof e == `boolean`;
function Pf(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var Ff = (e) => e.copy_ || e.base_,
  If = (e) => (e.modified_ ? e.copy_ : e.base_);
function Lf(e, t) {
  if (kf(e)) return new Map(e);
  if (Af(e)) return new Set(e);
  if (Of(e)) return Array[ff].slice.call(e);
  const n = xf(e);
  if (t === !0 || (t === `class_only` && !n)) {
    const t = lf.getOwnPropertyDescriptors(e);
    delete t[sf];
    const n = Reflect.ownKeys(t);
    for (let r = 0; r < n.length; r++) {
      const i = n[r],
        a = t[i];
      a[hf] === !1 && ((a[hf] = !0), (a[pf] = !0)),
        (a.get || a.set) && (t[i] = { [pf]: !0, [hf]: !0, [mf]: a[mf], [gf]: e[i] });
    }
    return lf.create(uf(e), t);
  } else {
    const t = uf(e);
    if (t !== null && n) return { ...e };
    const r = lf.create(t);
    return lf.assign(r, e);
  }
}
function Rf(e, t = !1) {
  return Vf(e) || _f(e) || !vf(e)
    ? e
    : (Cf(e) > 1 && lf.defineProperties(e, { set: Bf, add: Bf, clear: Bf, delete: Bf }),
      lf.freeze(e),
      t &&
        Sf(
          e,
          (e, t) => {
            Rf(t, !0);
          },
          !1,
        ),
      e);
}
function zf() {
  cf(2);
}
var Bf = { [gf]: zf };
function Vf(e) {
  return e === null || !jf(e) ? !0 : lf.isFrozen(e);
}
var Hf = `MapSet`,
  Uf = `Patches`,
  Wf = `ArrayMethods`,
  Gf = {};
function Kf(e) {
  const t = Gf[e];
  return t || cf(0, e), t;
}
var qf = (e) => !!Gf[e],
  Jf,
  Yf = () => Jf,
  Xf = (e, t) => ({
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
    handledSet_: new Set(),
    processedForPatches_: new Set(),
    mapSetPlugin_: qf(Hf) ? Kf(Hf) : void 0,
    arrayMethodsPlugin_: qf(Wf) ? Kf(Wf) : void 0,
  });
function Zf(e, t) {
  t &&
    ((e.patchPlugin_ = Kf(Uf)),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function Qf(e) {
  $f(e), e.drafts_.forEach(tp), (e.drafts_ = null);
}
function $f(e) {
  e === Jf && (Jf = e.parent_);
}
var ep = (e) => (Jf = Xf(Jf, e));
function tp(e) {
  const t = e[sf];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function np(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  if (e !== void 0 && e !== n) {
    n[sf].modified_ && (Qf(t), cf(4)), vf(e) && (e = rp(t, e));
    const { patchPlugin_: r } = t;
    r && r.generateReplacementPatches_(n[sf].base_, e, t);
  } else e = rp(t, n);
  return (
    ip(t, e, !0),
    Qf(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e === af ? void 0 : e
  );
}
function rp(e, t) {
  if (Vf(t)) return t;
  const n = t[sf];
  if (!n) return fp(t, e.handledSet_, e);
  if (!op(n, e)) return t;
  if (!n.modified_) return n.base_;
  if (!n.finalized_) {
    const { callbacks_: t } = n;
    if (t) for (; t.length > 0; ) t.pop()(e);
    up(n, e);
  }
  return n.copy_;
}
function ip(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Rf(t, n);
}
function ap(e) {
  (e.finalized_ = !0), e.scope_.unfinalizedDrafts_--;
}
var op = (e, t) => e.scope_ === t,
  sp = [];
function cp(e, t, n, r) {
  const i = Ff(e),
    a = e.type_;
  if (r !== void 0 && Tf(i, r, a) === t) {
    Ef(i, r, n, a);
    return;
  }
  if (!e.draftLocations_) {
    const t = (e.draftLocations_ = new Map());
    Sf(i, (e, n) => {
      if (_f(n)) {
        const r = t.get(n) || [];
        r.push(e), t.set(n, r);
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? sp;
  for (const e of o) Ef(i, e, n, a);
}
function lp(e, t, n) {
  e.callbacks_.push(function (r) {
    const i = t;
    if (!i || !op(i, r)) return;
    r.mapSetPlugin_?.fixSetContents(i);
    const a = If(i);
    cp(e, i.draft_ ?? i, a, n), up(i, r);
  });
}
function up(e, t) {
  if (
    e.modified_ &&
    !e.finalized_ &&
    (e.type_ === 3 || (e.type_ === 1 && e.allIndicesReassigned_) || (e.assigned_?.size ?? 0) > 0)
  ) {
    const { patchPlugin_: n } = t;
    if (n) {
      const r = n.getPath(e);
      r && n.generatePatches_(e, r, t);
    }
    ap(e);
  }
}
function dp(e, t, n) {
  const { scope_: r } = e;
  if (_f(n)) {
    const i = n[sf];
    op(i, r) &&
      i.callbacks_.push(function () {
        bp(e), cp(e, n, If(i), t);
      });
  } else
    vf(n) &&
      e.callbacks_.push(function () {
        const i = Ff(e);
        e.type_ === 3
          ? i.has(n) && fp(n, r.handledSet_, r)
          : Tf(i, t, e.type_) === n &&
            r.drafts_.length > 1 &&
            (e.assigned_.get(t) ?? !1) === !0 &&
            e.copy_ &&
            fp(Tf(e.copy_, t, e.type_), r.handledSet_, r);
      });
}
function fp(e, t, n) {
  return (!n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1) || _f(e) || t.has(e) || !vf(e) || Vf(e)
    ? e
    : (t.add(e),
      Sf(e, (r, i) => {
        if (_f(i)) {
          const t = i[sf];
          op(t, n) && (Ef(e, r, If(t), e.type_), ap(t));
        } else vf(i) && fp(i, t, n);
      }),
      e);
}
function pp(e, t) {
  let n = Of(e),
    r = {
      type_: +!!n,
      scope_: t ? t.scope_ : Yf(),
      modified_: !1,
      finalized_: !1,
      assigned_: void 0,
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
      callbacks_: void 0,
    },
    i = r,
    a = mp;
  n && ((i = [r]), (a = hp));
  const { revoke: o, proxy: s } = Proxy.revocable(i, a);
  return (r.draft_ = s), (r.revoke_ = o), [s, r];
}
var mp = {
    get(e, t) {
      if (t === sf) return e;
      const n = e.scope_.arrayMethodsPlugin_,
        r = e.type_ === 1 && typeof t == `string`;
      if (r && n?.isArrayOperationMethod(t)) return n.createMethodInterceptor(e, t);
      const i = Ff(e);
      if (!wf(i, t, e.type_)) return _p(e, i, t);
      const a = i[t];
      if (
        e.finalized_ ||
        !vf(a) ||
        (r && e.operationMethod && n?.isMutatingArrayMethod(e.operationMethod) && Pf(t))
      )
        return a;
      if (a === gp(e.base_, t)) {
        bp(e);
        const n = e.type_ === 1 ? +t : t,
          r = Sp(e.scope_, a, e, n);
        return (e.copy_[n] = r);
      }
      return a;
    },
    has(e, t) {
      return t in Ff(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Ff(e));
    },
    set(e, t, n) {
      const r = vp(Ff(e), t);
      if (r?.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const r = gp(Ff(e), t),
          i = r?.[sf];
        if (i && i.base_ === n) return (e.copy_[t] = n), e.assigned_.set(t, !1), !0;
        if (Df(n, r) && (n !== void 0 || wf(e.base_, t, e.type_))) return !0;
        bp(e), yp(e);
      }
      return (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
        (Number.isNaN(n) && Number.isNaN(e.copy_[t]))
        ? !0
        : ((e.copy_[t] = n), e.assigned_.set(t, !0), dp(e, t, n), !0);
    },
    deleteProperty(e, t) {
      return (
        bp(e),
        gp(e.base_, t) !== void 0 || t in e.base_
          ? (e.assigned_.set(t, !1), yp(e))
          : e.assigned_.delete(t),
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = Ff(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return r && { [hf]: !0, [pf]: e.type_ !== 1 || t !== `length`, [mf]: r[mf], [gf]: n[t] };
    },
    defineProperty() {
      cf(11);
    },
    getPrototypeOf(e) {
      return uf(e.base_);
    },
    setPrototypeOf() {
      cf(12);
    },
  },
  hp = {};
for (const e in mp) {
  const t = mp[e];
  hp[e] = function () {
    const e = arguments;
    return (e[0] = e[0][0]), t.apply(this, e);
  };
}
(hp.deleteProperty = function (e, t) {
  return hp.set.call(this, e, t, void 0);
}),
  (hp.set = function (e, t, n) {
    return mp.set.call(this, e[0], t, n, e[0]);
  });
function gp(e, t) {
  const n = e[sf];
  return (n ? Ff(n) : e)[t];
}
function _p(e, t, n) {
  const r = vp(t, n);
  return r ? (gf in r ? r[gf] : r.get?.call(e.draft_)) : void 0;
}
function vp(e, t) {
  if (!(t in e)) return;
  let n = uf(e);
  for (; n; ) {
    const e = Object.getOwnPropertyDescriptor(n, t);
    if (e) return e;
    n = uf(n);
  }
}
function yp(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && yp(e.parent_));
}
function bp(e) {
  e.copy_ ||= ((e.assigned_ = new Map()), Lf(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var xp = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.useStrictIteration_ = !1),
      (this.produce = (e, t, n) => {
        if (Mf(e) && !Mf(t)) {
          const n = t;
          t = e;
          const r = this;
          return function (e = n, ...i) {
            return r.produce(e, (e) => t.call(this, e, ...i));
          };
        }
        Mf(t) || cf(6), n !== void 0 && !Mf(n) && cf(7);
        let r;
        if (vf(e)) {
          let i = ep(this),
            a = Sp(i, e, void 0),
            o = !0;
          try {
            (r = t(a)), (o = !1);
          } finally {
            o ? Qf(i) : $f(i);
          }
          return Zf(i, n), np(r, i);
        } else if (!e || !jf(e)) {
          if (
            ((r = t(e)),
            r === void 0 && (r = e),
            r === af && (r = void 0),
            this.autoFreeze_ && Rf(r, !0),
            n)
          ) {
            const t = [],
              i = [];
            Kf(Uf).generateReplacementPatches_(e, r, { patches_: t, inversePatches_: i }), n(t, i);
          }
          return r;
        } else cf(1, e);
      }),
      (this.produceWithPatches = (e, t) => {
        if (Mf(e)) return (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n));
        let n, r;
        return [
          this.produce(e, t, (e, t) => {
            (n = e), (r = t);
          }),
          n,
          r,
        ];
      }),
      Nf(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze),
      Nf(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy),
      Nf(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    vf(e) || cf(8), _f(e) && (e = Cp(e));
    const t = ep(this),
      n = Sp(t, e, void 0);
    return (n[sf].isManual_ = !0), $f(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[sf];
    (!n || !n.isManual_) && cf(9);
    const { scope_: r } = n;
    return Zf(r, t), np(void 0, r);
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const r = t[n];
      if (r.path.length === 0 && r.op === `replace`) {
        e = r.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = Kf(Uf).applyPatches_;
    return _f(e) ? r(e, t) : this.produce(e, (e) => r(e, t));
  }
};
function Sp(e, t, n, r) {
  const [i, a] = kf(t) ? Kf(Hf).proxyMap_(t, n) : Af(t) ? Kf(Hf).proxySet_(t, n) : pp(t, n);
  return (
    (n?.scope_ ?? Yf()).drafts_.push(i),
    (a.callbacks_ = n?.callbacks_ ?? []),
    (a.key_ = r),
    n && r !== void 0
      ? lp(n, a, r)
      : a.callbacks_.push(function (e) {
          e.mapSetPlugin_?.fixSetContents(a);
          const { patchPlugin_: t } = e;
          a.modified_ && t && t.generatePatches_(a, [], e);
        }),
    i
  );
}
function Cp(e) {
  return _f(e) || cf(10, e), wp(e);
}
function wp(e) {
  if (!vf(e) || Vf(e)) return e;
  let t = e[sf],
    n,
    r = !0;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0),
      (n = Lf(e, t.scope_.immer_.useStrictShallowCopy_)),
      (r = t.scope_.immer_.shouldUseStrictIteration());
  } else n = Lf(e, !0);
  return (
    Sf(
      n,
      (e, t) => {
        Ef(n, e, wp(t));
      },
      r,
    ),
    t && (t.finalized_ = !1),
    n
  );
}
var Tp = new xp().produce;
function Ep(e) {
  return ({ dispatch: t, getState: n }) =>
    (r) =>
    (i) =>
      typeof i == `function` ? i(t, n, e) : r(i);
}
var Dp = Ep(),
  Op = Ep,
  kp =
    typeof window < `u` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == `object` ? tf : tf.apply(null, arguments);
        };
typeof window < `u` && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function Ap(e, t) {
  function n(...n) {
    if (t) {
      const r = t(...n);
      if (!r) throw Error(Lm(0));
      return {
        type: e,
        payload: r.payload,
        ...(`meta` in r && { meta: r.meta }),
        ...(`error` in r && { error: r.error }),
      };
    }
    return { type: e, payload: n[0] };
  }
  return (n.toString = () => `${e}`), (n.type = e), (n.match = (t) => rf(t) && t.type === e), n;
}
var jp = class e extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, e.prototype);
  }
  static get [Symbol.species]() {
    return e;
  }
  concat(...e) {
    return super.concat.apply(this, e);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0])
      ? new e(...t[0].concat(this))
      : new e(...t.concat(this));
  }
};
function Mp(e) {
  return vf(e) ? Tp(e, () => {}) : e;
}
function Np(e, t, n) {
  return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function Pp(e) {
  return typeof e == `boolean`;
}
var Fp = () =>
    function (e) {
      const {
          thunk: t = !0,
          immutableCheck: n = !0,
          serializableCheck: r = !0,
          actionCreatorCheck: i = !0,
        } = e ?? {},
        a = new jp();
      return t && (Pp(t) ? a.push(Dp) : a.push(Op(t.extraArgument))), a;
    },
  Ip = `RTK_autoBatch`,
  W = () => (e) => ({ payload: e, meta: { [Ip]: !0 } }),
  Lp = (e) => (t) => {
    setTimeout(t, e);
  },
  Rp =
    (e = { type: `raf` }) =>
    (t) =>
    (...n) => {
      let r = t(...n),
        i = !0,
        a = !1,
        o = !1,
        s = new Set(),
        c =
          e.type === `tick`
            ? queueMicrotask
            : e.type === `raf`
              ? typeof window < `u` && window.requestAnimationFrame
                ? window.requestAnimationFrame
                : Lp(10)
              : e.type === `callback`
                ? e.queueNotification
                : Lp(e.timeout),
        l = () => {
          (o = !1), a && ((a = !1), s.forEach((e) => e()));
        };
      return Object.assign({}, r, {
        subscribe(e) {
          const t = r.subscribe(() => i && e());
          return (
            s.add(e),
            () => {
              t(), s.delete(e);
            }
          );
        },
        dispatch(e) {
          try {
            return (i = !e?.meta?.[Ip]), (a = !i), a && (o || ((o = !0), c(l))), r.dispatch(e);
          } finally {
            i = !0;
          }
        },
      });
    },
  zp = (e) =>
    function (t) {
      const { autoBatch: n = !0 } = t ?? {},
        r = new jp(e);
      return n && r.push(Rp(typeof n == `object` ? n : void 0)), r;
    };
function Bp(e) {
  let t = Fp(),
    {
      reducer: n = void 0,
      middleware: r,
      devTools: i = !0,
      duplicateMiddlewareCheck: a = !0,
      preloadedState: o = void 0,
      enhancers: s = void 0,
    } = e || {},
    c;
  if (typeof n == `function`) c = n;
  else if (Zd(n)) c = ef(n);
  else throw Error(Lm(1));
  let l;
  l = typeof r == `function` ? r(t) : t();
  let u = tf;
  i && (u = kp({ trace: !1, ...(typeof i == `object` && i) }));
  const d = zp(nf(...l)),
    f = typeof s == `function` ? s(d) : d(),
    p = u(...f);
  return Qd(c, o, p);
}
function Vp(e) {
  let t = {},
    n = [],
    r,
    i = {
      addCase(e, n) {
        const r = typeof e == `string` ? e : e.type;
        if (!r) throw Error(Lm(28));
        if (r in t) throw Error(Lm(29));
        return (t[r] = n), i;
      },
      addAsyncThunk(e, r) {
        return (
          r.pending && (t[e.pending.type] = r.pending),
          r.rejected && (t[e.rejected.type] = r.rejected),
          r.fulfilled && (t[e.fulfilled.type] = r.fulfilled),
          r.settled && n.push({ matcher: e.settled, reducer: r.settled }),
          i
        );
      },
      addMatcher(e, t) {
        return n.push({ matcher: e, reducer: t }), i;
      },
      addDefaultCase(e) {
        return (r = e), i;
      },
    };
  return e(i), [t, n, r];
}
function Hp(e) {
  return typeof e == `function`;
}
function Up(e, t) {
  let [n, r, i] = Vp(t),
    a;
  if (Hp(e)) a = () => Mp(e());
  else {
    const t = Mp(e);
    a = () => t;
  }
  function o(e = a(), t) {
    let o = [n[t.type], ...r.filter(({ matcher: e }) => e(t)).map(({ reducer: e }) => e)];
    return (
      o.filter((e) => !!e).length === 0 && (o = [i]),
      o.reduce((e, n) => {
        if (n)
          if (_f(e)) {
            const r = n(e, t);
            return r === void 0 ? e : r;
          } else if (vf(e)) return Tp(e, (e) => n(e, t));
          else {
            const r = n(e, t);
            if (r === void 0) {
              if (e === null) return e;
              throw Error(`A case reducer on a non-draftable value must not return undefined`);
            }
            return r;
          }
        return e;
      }, e)
    );
  }
  return (o.getInitialState = a), o;
}
var Wp = `ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW`,
  Gp = (e = 21) => {
    let t = ``,
      n = e;
    for (; n--; ) t += Wp[(Math.random() * 64) | 0];
    return t;
  },
  Kp = Symbol.for(`rtk-slice-createasyncthunk`);
function qp(e, t) {
  return `${e}/${t}`;
}
function Jp({ creators: e } = {}) {
  const t = e?.asyncThunk?.[Kp];
  return function (e) {
    const { name: n, reducerPath: r = n } = e;
    if (!n) throw Error(Lm(11));
    const i = (typeof e.reducers == `function` ? e.reducers(Zp()) : e.reducers) || {},
      a = Object.keys(i),
      o = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      s = {
        addCase(e, t) {
          const n = typeof e == `string` ? e : e.type;
          if (!n) throw Error(Lm(12));
          if (n in o.sliceCaseReducersByType) throw Error(Lm(13));
          return (o.sliceCaseReducersByType[n] = t), s;
        },
        addMatcher(e, t) {
          return o.sliceMatchers.push({ matcher: e, reducer: t }), s;
        },
        exposeAction(e, t) {
          return (o.actionCreators[e] = t), s;
        },
        exposeCaseReducer(e, t) {
          return (o.sliceCaseReducersByName[e] = t), s;
        },
      };
    a.forEach((r) => {
      const a = i[r],
        o = { reducerName: r, type: qp(n, r), createNotation: typeof e.reducers == `function` };
      $p(a) ? tm(o, a, s, t) : Qp(o, a, s);
    });
    function c() {
      const [t = {}, n = [], r = void 0] =
          typeof e.extraReducers == `function` ? Vp(e.extraReducers) : [e.extraReducers],
        i = { ...t, ...o.sliceCaseReducersByType };
      return Up(e.initialState, (e) => {
        for (const t in i) e.addCase(t, i[t]);
        for (const t of o.sliceMatchers) e.addMatcher(t.matcher, t.reducer);
        for (const t of n) e.addMatcher(t.matcher, t.reducer);
        r && e.addDefaultCase(r);
      });
    }
    let l = (e) => e,
      u = new Map(),
      d = new WeakMap(),
      f;
    function p(e, t) {
      return (f ||= c()), f(e, t);
    }
    function m() {
      return (f ||= c()), f.getInitialState();
    }
    function h(t, n = !1) {
      function r(e) {
        let i = e[t];
        return i === void 0 && n && (i = Np(d, r, m)), i;
      }
      function i(t = l) {
        return Np(
          Np(u, n, () => new WeakMap()),
          t,
          () => {
            const r = {};
            for (const [i, a] of Object.entries(e.selectors ?? {}))
              r[i] = Yp(a, t, () => Np(d, t, m), n);
            return r;
          },
        );
      }
      return {
        reducerPath: t,
        getSelectors: i,
        get selectors() {
          return i(r);
        },
        selectSlice: r,
      };
    }
    const g = {
      name: n,
      reducer: p,
      actions: o.actionCreators,
      caseReducers: o.sliceCaseReducersByName,
      getInitialState: m,
      ...h(r),
      injectInto(e, { reducerPath: t, ...n } = {}) {
        const i = t ?? r;
        return e.inject({ reducerPath: i, reducer: p }, n), { ...g, ...h(i, !0) };
      },
    };
    return g;
  };
}
function Yp(e, t, n, r) {
  function i(i, ...a) {
    let o = t(i);
    return o === void 0 && r && (o = n()), e(o, ...a);
  }
  return (i.unwrapped = e), i;
}
var Xp = Jp();
function Zp() {
  function e(e, t) {
    return { _reducerDefinitionType: `asyncThunk`, payloadCreator: e, ...t };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(e) {
        return Object.assign(
          {
            [e.name](...t) {
              return e(...t);
            },
          }[e.name],
          { _reducerDefinitionType: `reducer` },
        );
      },
      preparedReducer(e, t) {
        return { _reducerDefinitionType: `reducerWithPrepare`, prepare: e, reducer: t };
      },
      asyncThunk: e,
    }
  );
}
function Qp({ type: e, reducerName: t, createNotation: n }, r, i) {
  let a, o;
  if (`reducer` in r) {
    if (n && !em(r)) throw Error(Lm(17));
    (a = r.reducer), (o = r.prepare);
  } else a = r;
  i.addCase(e, a)
    .exposeCaseReducer(t, a)
    .exposeAction(t, o ? Ap(e, o) : Ap(e));
}
function $p(e) {
  return e._reducerDefinitionType === `asyncThunk`;
}
function em(e) {
  return e._reducerDefinitionType === `reducerWithPrepare`;
}
function tm({ type: e, reducerName: t }, n, r, i) {
  if (!i) throw Error(Lm(18));
  const { payloadCreator: a, fulfilled: o, pending: s, rejected: c, settled: l, options: u } = n,
    d = i(e, a, u);
  r.exposeAction(t, d),
    o && r.addCase(d.fulfilled, o),
    s && r.addCase(d.pending, s),
    c && r.addCase(d.rejected, c),
    l && r.addMatcher(d.settled, l),
    r.exposeCaseReducer(t, {
      fulfilled: o || nm,
      pending: s || nm,
      rejected: c || nm,
      settled: l || nm,
    });
}
function nm() {}
var rm = `task`,
  im = `listener`,
  am = `completed`,
  om = `cancelled`,
  sm = `task-${om}`,
  cm = `task-${am}`,
  lm = `${im}-${om}`,
  um = `${im}-${am}`,
  dm = class {
    constructor(e) {
      (this.code = e), (this.message = `${rm} ${om} (reason: ${e})`);
    }
    name = `TaskAbortError`;
    message;
  },
  fm = (e, t) => {
    if (typeof e != `function`) throw TypeError(Lm(32));
  },
  pm = () => {},
  mm = (e, t = pm) => (e.catch(t), e),
  hm = (e, t) => (
    e.addEventListener(`abort`, t, { once: !0 }), () => e.removeEventListener(`abort`, t)
  ),
  gm = (e) => {
    if (e.aborted) throw new dm(e.reason);
  };
function _m(e, t) {
  let n = pm;
  return new Promise((r, i) => {
    const a = () => i(new dm(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    (n = hm(e, a)), t.finally(() => n()).then(r, i);
  }).finally(() => {
    n = pm;
  });
}
var vm = async (e, t) => {
    try {
      return await Promise.resolve(), { status: `ok`, value: await e() };
    } catch (e) {
      return { status: e instanceof dm ? `cancelled` : `rejected`, error: e };
    } finally {
      t?.();
    }
  },
  ym = (e) => (t) => mm(_m(e, t).then((t) => (gm(e), t))),
  bm = (e) => {
    const t = ym(e);
    return (e) => t(new Promise((t) => setTimeout(t, e)));
  },
  { assign: xm } = Object,
  Sm = {},
  Cm = `listenerMiddleware`,
  wm = (e, t) => {
    const n = (t) => hm(e, () => t.abort(e.reason));
    return (r, i) => {
      fm(r, `taskExecutor`);
      const a = new AbortController();
      n(a);
      const o = vm(
        async () => {
          gm(e), gm(a.signal);
          const t = await r({ pause: ym(a.signal), delay: bm(a.signal), signal: a.signal });
          return gm(a.signal), t;
        },
        () => a.abort(cm),
      );
      return (
        i?.autoJoin && t.push(o.catch(pm)),
        {
          result: ym(e)(o),
          cancel() {
            a.abort(sm);
          },
        }
      );
    };
  },
  Tm = (e, t) => {
    const n = async (n, r) => {
      gm(t);
      let i = () => {},
        a = [
          new Promise((t, r) => {
            const a = e({
              predicate: n,
              effect: (e, n) => {
                n.unsubscribe(), t([e, n.getState(), n.getOriginalState()]);
              },
            });
            i = () => {
              a(), r();
            };
          }),
        ];
      r != null && a.push(new Promise((e) => setTimeout(e, r, null)));
      try {
        const e = await _m(t, Promise.race(a));
        return gm(t), e;
      } finally {
        i();
      }
    };
    return (e, t) => mm(n(e, t));
  },
  Em = (e) => {
    let { type: t, actionCreator: n, matcher: r, predicate: i, effect: a } = e;
    if (t) i = Ap(t).match;
    else if (n) (t = n.type), (i = n.match);
    else if (r) i = r;
    else if (!i) throw Error(Lm(21));
    return fm(a, `options.listener`), { predicate: i, type: t, effect: a };
  },
  Dm = xm(
    (e) => {
      const { type: t, predicate: n, effect: r } = Em(e);
      return {
        id: Gp(),
        effect: r,
        type: t,
        predicate: n,
        pending: new Set(),
        unsubscribe: () => {
          throw Error(Lm(22));
        },
      };
    },
    { withTypes: () => Dm },
  ),
  Om = (e, t) => {
    const { type: n, effect: r, predicate: i } = Em(t);
    return Array.from(e.values()).find(
      (e) => (typeof n == `string` ? e.type === n : e.predicate === i) && e.effect === r,
    );
  },
  km = (e) => {
    e.pending.forEach((e) => {
      e.abort(lm);
    });
  },
  Am = (e, t) => () => {
    for (const e of t.keys()) km(e);
    e.clear();
  },
  jm = (e, t, n) => {
    try {
      e(t, n);
    } catch (e) {
      setTimeout(() => {
        throw e;
      }, 0);
    }
  },
  Mm = xm(Ap(`${Cm}/add`), { withTypes: () => Mm }),
  Nm = Ap(`${Cm}/removeAll`),
  Pm = xm(Ap(`${Cm}/remove`), { withTypes: () => Pm }),
  Fm = (...e) => {
    console.error(`${Cm}/error`, ...e);
  },
  Im = (e = {}) => {
    const t = new Map(),
      n = new Map(),
      r = (e) => {
        const t = n.get(e) ?? 0;
        n.set(e, t + 1);
      },
      i = (e) => {
        const t = n.get(e) ?? 1;
        t === 1 ? n.delete(e) : n.set(e, t - 1);
      },
      { extra: a, onError: o = Fm } = e;
    fm(o, `onError`);
    const s = (e) => (
        (e.unsubscribe = () => t.delete(e.id)),
        t.set(e.id, e),
        (t) => {
          e.unsubscribe(), t?.cancelActive && km(e);
        }
      ),
      c = (e) => s(Om(t, e) ?? Dm(e));
    xm(c, { withTypes: () => c });
    const l = (e) => {
      const n = Om(t, e);
      return n && (n.unsubscribe(), e.cancelActive && km(n)), !!n;
    };
    xm(l, { withTypes: () => l });
    const u = async (e, n, s, l) => {
        const u = new AbortController(),
          d = Tm(c, u.signal),
          f = [];
        try {
          e.pending.add(u),
            r(e),
            await Promise.resolve(
              e.effect(
                n,
                xm({}, s, {
                  getOriginalState: l,
                  condition: (e, t) => d(e, t).then(Boolean),
                  take: d,
                  delay: bm(u.signal),
                  pause: ym(u.signal),
                  extra: a,
                  signal: u.signal,
                  fork: wm(u.signal, f),
                  unsubscribe: e.unsubscribe,
                  subscribe: () => {
                    t.set(e.id, e);
                  },
                  cancelActiveListeners: () => {
                    e.pending.forEach((e, t, n) => {
                      e !== u && (e.abort(lm), n.delete(e));
                    });
                  },
                  cancel: () => {
                    u.abort(lm), e.pending.delete(u);
                  },
                  throwIfCancelled: () => {
                    gm(u.signal);
                  },
                }),
              ),
            );
        } catch (e) {
          e instanceof dm || jm(o, e, { raisedBy: `effect` });
        } finally {
          await Promise.all(f), u.abort(um), i(e), e.pending.delete(u);
        }
      },
      d = Am(t, n);
    return {
      middleware: (e) => (n) => (r) => {
        if (!rf(r)) return n(r);
        if (Mm.match(r)) return c(r.payload);
        if (Nm.match(r)) {
          d();
          return;
        }
        if (Pm.match(r)) return l(r.payload);
        let i = e.getState(),
          a = () => {
            if (i === Sm) throw Error(Lm(23));
            return i;
          },
          s;
        try {
          if (((s = n(r)), t.size > 0)) {
            const n = e.getState(),
              s = Array.from(t.values());
            for (const t of s) {
              let s = !1;
              try {
                s = t.predicate(r, n, i);
              } catch (e) {
                (s = !1), jm(o, e, { raisedBy: `predicate` });
              }
              s && u(t, r, e, a);
            }
          }
        } finally {
          i = Sm;
        }
        return s;
      },
      startListening: c,
      stopListening: l,
      clearListeners: d,
    };
  };
function Lm(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Rm = Xp({
    name: `chartLayout`,
    initialState: {
      layoutType: `horizontal`,
      width: 0,
      height: 0,
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
      scale: 1,
    },
    reducers: {
      setLayout(e, t) {
        e.layoutType = t.payload;
      },
      setChartSize(e, t) {
        (e.width = t.payload.width), (e.height = t.payload.height);
      },
      setMargin(e, t) {
        (e.margin.top = t.payload.top ?? 0),
          (e.margin.right = t.payload.right ?? 0),
          (e.margin.bottom = t.payload.bottom ?? 0),
          (e.margin.left = t.payload.left ?? 0);
      },
      setScale(e, t) {
        e.scale = t.payload;
      },
    },
  }),
  { setMargin: zm, setLayout: Bm, setChartSize: Vm, setScale: Hm } = Rm.actions,
  Um = Rm.reducer;
function Wm(e, t, n) {
  return Array.isArray(e) && e && t + n !== 0 ? e.slice(t, n + 1) : e;
}
function G(e) {
  return Number.isFinite(e);
}
function Gm(e) {
  return typeof e == `number` && e > 0 && Number.isFinite(e);
}
function Km(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function qm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Km(Object(n), !0).forEach(function (t) {
          Jm(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Km(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Jm(e, t, n) {
  return (
    (t = Ym(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Ym(e) {
  var t = Xm(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Xm(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function K(e, t, n) {
  return Cu(e) || Cu(t) ? n : gu(t) ? (0, lu.default)(e, t, n) : typeof t == `function` ? t(e) : n;
}
var Zm = (e, t, n) => {
    if (t && n) {
      var { width: r, height: i } = n,
        { align: a, verticalAlign: o, layout: s } = t;
      if ((s === `vertical` || (s === `horizontal` && o === `middle`)) && a !== `center` && V(e[a]))
        return qm(qm({}, e), {}, { [a]: e[a] + (r || 0) });
      if ((s === `horizontal` || (s === `vertical` && a === `center`)) && o !== `middle` && V(e[o]))
        return qm(qm({}, e), {}, { [o]: e[o] + (i || 0) });
    }
    return e;
  },
  Qm = (e, t) =>
    (e === `horizontal` && t === `xAxis`) ||
    (e === `vertical` && t === `yAxis`) ||
    (e === `centric` && t === `angleAxis`) ||
    (e === `radial` && t === `radiusAxis`),
  $m = {
    sign: (e) => {
      var t = e.length;
      if (!(t <= 0)) {
        var n = e[0]?.length;
        if (!(n == null || n <= 0))
          for (var r = 0; r < n; ++r)
            for (var i = 0, a = 0, o = 0; o < t; ++o) {
              var s = e[o]?.[r];
              if (s != null) {
                var c = s[1],
                  l = s[0],
                  u = mu(c) ? l : c;
                u >= 0 ? ((s[0] = i), (i += u), (s[1] = i)) : ((s[0] = a), (a += u), (s[1] = a));
              }
            }
      }
    },
    expand: eu,
    none: Yl,
    silhouette: tu,
    wiggle: nu,
    positive: (e) => {
      var t = e.length;
      if (!(t <= 0)) {
        var n = e[0]?.length;
        if (!(n == null || n <= 0))
          for (var r = 0; r < n; ++r)
            for (var i = 0, a = 0; a < t; ++a) {
              var o = e[a]?.[r];
              if (o != null) {
                var s = mu(o[1]) ? o[0] : o[1];
                s >= 0 ? ((o[0] = i), (i += s), (o[1] = i)) : ((o[0] = 0), (o[1] = 0));
              }
            }
      }
    },
  },
  eh = (e, t, n) => {
    var r = $m[n] ?? Yl,
      i = $l()
        .keys(t)
        .value((e, t) => Number(K(e, t, 0)))
        .order(Xl)
        .offset(r)(e);
    return (
      i.forEach((n, r) => {
        n.forEach((n, i) => {
          var a = K(e[i], t[r], 0);
          Array.isArray(a) &&
            a.length === 2 &&
            V(a[0]) &&
            V(a[1]) &&
            ((n[0] = a[0]), (n[1] = a[1]));
        });
      }),
      i
    );
  },
  th = (e) => {
    var t = e.flat(2).filter(V);
    return [Math.min(...t), Math.max(...t)];
  },
  nh = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]],
  rh = (e, t, n) => {
    if (e != null)
      return nh(
        Object.keys(e).reduce(
          (r, i) => {
            var a = e[i];
            if (!a) return r;
            var { stackedData: o } = a,
              s = o.reduce(
                (e, r) => {
                  var i = th(Wm(r, t, n));
                  return !G(i[0]) || !G(i[1]) ? e : [Math.min(e[0], i[0]), Math.max(e[1], i[1])];
                },
                [1 / 0, -1 / 0],
              );
            return [Math.min(s[0], r[0]), Math.max(s[1], r[1])];
          },
          [1 / 0, -1 / 0],
        ),
      );
  },
  ih = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  ah = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  oh = (e, t, n) => {
    if (e && e.scale && e.scale.bandwidth) {
      var r = e.scale.bandwidth();
      if (!n || r > 0) return r;
    }
    if (e && t && t.length >= 2) {
      for (
        var i = (0, Hd.default)(t, (e) => e.coordinate), a = 1 / 0, o = 1, s = i.length;
        o < s;
        o++
      ) {
        var c = i[o],
          l = i[o - 1];
        a = Math.min((c?.coordinate || 0) - (l?.coordinate || 0), a);
      }
      return a === 1 / 0 ? 0 : a;
    }
    return n ? void 0 : 0;
  };
function sh(e) {
  var { tooltipEntrySettings: t, dataKey: n, payload: r, value: i, name: a } = e;
  return qm(qm({}, t), {}, { dataKey: n, payload: r, value: i, name: a });
}
var ch = (e, t) => {
    if (t === `horizontal`) return e.relativeX;
    if (t === `vertical`) return e.relativeY;
  },
  lh = (e, t) => (t === `centric` ? e.angle : e.radius),
  uh = (e) => e.layout.width,
  dh = (e) => e.layout.height,
  fh = (e) => e.layout.scale,
  ph = (e) => e.layout.margin,
  mh = U(
    (e) => e.cartesianAxis.xAxis,
    (e) => Object.values(e),
  ),
  hh = U(
    (e) => e.cartesianAxis.yAxis,
    (e) => Object.values(e),
  ),
  gh = `data-recharts-item-index`;
function _h(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function vh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? _h(Object(n), !0).forEach(function (t) {
          yh(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : _h(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function yh(e, t, n) {
  return (
    (t = bh(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function bh(e) {
  var t = xh(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function xh(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Sh = (e) => e.brush.height;
function Ch(e) {
  return hh(e).reduce(
    (e, t) =>
      t.orientation === `left` && !t.mirror && !t.hide
        ? e + (typeof t.width == `number` ? t.width : 60)
        : e,
    0,
  );
}
function wh(e) {
  return hh(e).reduce(
    (e, t) =>
      t.orientation === `right` && !t.mirror && !t.hide
        ? e + (typeof t.width == `number` ? t.width : 60)
        : e,
    0,
  );
}
function Th(e) {
  return mh(e).reduce(
    (e, t) => (t.orientation === `top` && !t.mirror && !t.hide ? e + t.height : e),
    0,
  );
}
function Eh(e) {
  return mh(e).reduce(
    (e, t) => (t.orientation === `bottom` && !t.mirror && !t.hide ? e + t.height : e),
    0,
  );
}
var Dh = U([uh, dh, ph, Sh, Ch, wh, Th, Eh, Ud, Wd], (e, t, n, r, i, a, o, s, c, l) => {
    var u = { left: (n.left || 0) + i, right: (n.right || 0) + a },
      d = vh(vh({}, { top: (n.top || 0) + o, bottom: (n.bottom || 0) + s }), u),
      f = d.bottom;
    (d.bottom += r), (d = Zm(d, c, l));
    var p = e - d.left - d.right,
      m = t - d.top - d.bottom;
    return vh(vh({ brushBottom: f }, d), {}, { width: Math.max(p, 0), height: Math.max(m, 0) });
  }),
  Oh = U(Dh, (e) => ({ x: e.left, y: e.top, width: e.width, height: e.height }));
U(uh, dh, (e, t) => ({ x: 0, y: 0, width: e, height: t }));
var kh = (0, a.createContext)(null),
  Ah = () => (0, a.useContext)(kh) != null,
  jh = (e) => e.brush,
  Mh = U([jh, Dh, ph], (e, t, n) => ({
    height: e.height,
    x: V(e.x) ? e.x : t.left,
    y: V(e.y) ? e.y : t.top + t.height + t.brushBottom - (n?.bottom || 0),
    width: V(e.width) ? e.width : t.width,
  })),
  Nh = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e, t, { signal: n, edges: r } = {}) {
      let i,
        a = null,
        o = r != null && r.includes(`leading`),
        s = r == null || r.includes(`trailing`),
        c = () => {
          a !== null && (e.apply(i, a), (i = void 0), (a = null));
        },
        l = () => {
          s && c(), p();
        },
        u = null,
        d = () => {
          u != null && clearTimeout(u),
            (u = setTimeout(() => {
              (u = null), l();
            }, t));
        },
        f = () => {
          u !== null && (clearTimeout(u), (u = null));
        },
        p = () => {
          f(), (i = void 0), (a = null);
        },
        m = () => {
          c();
        },
        h = function (...e) {
          if (n?.aborted) return;
          (i = this), (a = e);
          const t = u == null;
          d(), o && t && c();
        };
      return (
        (h.schedule = d),
        (h.cancel = p),
        (h.flush = m),
        n?.addEventListener(`abort`, p, { once: !0 }),
        h
      );
    }
    e.debounce = t;
  }),
  Ph = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Nh();
    function n(e, n = 0, r = {}) {
      typeof r != `object` && (r = {});
      const { leading: i = !1, trailing: a = !0, maxWait: o } = r,
        s = [, ,];
      i && (s[0] = `leading`), a && (s[1] = `trailing`);
      let c,
        l = null,
        u = t.debounce(
          function (...t) {
            (c = e.apply(this, t)), (l = null);
          },
          n,
          { edges: s },
        ),
        d = function (...t) {
          return o != null && (l === null && (l = Date.now()), Date.now() - l >= o)
            ? ((c = e.apply(this, t)), (l = Date.now()), u.cancel(), u.schedule(), c)
            : (u.apply(this, t), c);
        };
      return (d.cancel = u.cancel), (d.flush = () => (u.flush(), c)), d;
    }
    e.debounce = n;
  }),
  Fh = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Ph();
    function n(e, n = 0, r = {}) {
      const { leading: i = !0, trailing: a = !0 } = r;
      return t.debounce(e, n, { leading: i, maxWait: n, trailing: a });
    }
    e.throttle = n;
  }),
  Ih = e(
    n((e, t) => {
      t.exports = Fh().throttle;
    })(),
  ),
  Lh = !0,
  Rh = function (e, t) {
    var n = [...arguments].slice(2);
    if (
      Lh &&
      typeof console < `u` &&
      console.warn &&
      (t === void 0 && console.warn(`LogUtils requires an error message argument`), !e)
    )
      if (t === void 0)
        console.warn(
          `Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.`,
        );
      else {
        var r = 0;
        console.warn(t.replace(/%s/g, () => n[r++]));
      }
  },
  zh = {
    width: `100%`,
    height: `100%`,
    debounce: 0,
    minWidth: 0,
    initialDimension: { width: -1, height: -1 },
  },
  Bh = (e, t, n) => {
    var { width: r = zh.width, height: i = zh.height, aspect: a, maxHeight: o } = n,
      s = hu(r) ? e : Number(r),
      c = hu(i) ? t : Number(i);
    return (
      a && a > 0 && (s ? (c = s / a) : c && (s = c * a), o && c != null && c > o && (c = o)),
      { calculatedWidth: s, calculatedHeight: c }
    );
  },
  Vh = { width: 0, height: 0, overflow: `visible` },
  Hh = { width: 0, overflowX: `visible` },
  Uh = { height: 0, overflowY: `visible` },
  Wh = {},
  Gh = (e) => {
    var { width: t, height: n } = e,
      r = hu(t),
      i = hu(n);
    return r && i ? Vh : r ? Hh : i ? Uh : Wh;
  };
function Kh(e) {
  var { width: t, height: n, aspect: r } = e,
    i = t,
    a = n;
  return (
    i === void 0 && a === void 0
      ? ((i = zh.width), (a = zh.height))
      : i === void 0
        ? (i = r && r > 0 ? void 0 : zh.width)
        : a === void 0 && (a = r && r > 0 ? void 0 : zh.height),
    { width: i, height: a }
  );
}
function qh() {
  return (
    (qh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    qh.apply(null, arguments)
  );
}
function Jh(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Yh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Jh(Object(n), !0).forEach(function (t) {
          Xh(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Jh(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Xh(e, t, n) {
  return (
    (t = Zh(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Zh(e) {
  var t = Qh(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Qh(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var $h = (0, a.createContext)(zh.initialDimension);
function eg(e) {
  return Gm(e.width) && Gm(e.height);
}
function tg(e) {
  var { children: t, width: n, height: r } = e,
    i = (0, a.useMemo)(() => ({ width: n, height: r }), [n, r]);
  return eg(i) ? a.createElement($h.Provider, { value: i }, t) : null;
}
var ng = () => (0, a.useContext)($h),
  rg = (0, a.forwardRef)((e, t) => {
    var {
        aspect: n,
        initialDimension: r = zh.initialDimension,
        width: i,
        height: o,
        minWidth: s = zh.minWidth,
        minHeight: l,
        maxHeight: u,
        children: d,
        debounce: f = zh.debounce,
        id: p,
        className: m,
        onResize: h,
        style: g = {},
      } = e,
      _ = (0, a.useRef)(null),
      v = (0, a.useRef)();
    (v.current = h), (0, a.useImperativeHandle)(t, () => _.current);
    var [y, b] = (0, a.useState)({ containerWidth: r.width, containerHeight: r.height }),
      x = (0, a.useCallback)((e, t) => {
        b((n) => {
          var r = Math.round(e),
            i = Math.round(t);
          return n.containerWidth === r && n.containerHeight === i
            ? n
            : { containerWidth: r, containerHeight: i };
        });
      }, []);
    (0, a.useEffect)(() => {
      if (_.current == null || typeof ResizeObserver > `u`) return Eu;
      var e = (e) => {
        var t,
          n = e[0];
        if (n != null) {
          var { width: r, height: i } = n.contentRect;
          x(r, i), (t = v.current) == null || t.call(v, r, i);
        }
      };
      f > 0 && (e = (0, Ih.default)(e, f, { trailing: !0, leading: !1 }));
      var t = new ResizeObserver(e),
        { width: n, height: r } = _.current.getBoundingClientRect();
      return (
        x(n, r),
        t.observe(_.current),
        () => {
          t.disconnect();
        }
      );
    }, [x, f]);
    var { containerWidth: S, containerHeight: C } = y;
    Rh(!n || n > 0, `The aspect(%s) must be greater than zero.`, n);
    var { calculatedWidth: w, calculatedHeight: T } = Bh(S, C, {
      width: i,
      height: o,
      aspect: n,
      maxHeight: u,
    });
    return (
      Rh(
        (w != null && w > 0) || (T != null && T > 0),
        `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
        w,
        T,
        i,
        o,
        s,
        l,
        n,
      ),
      a.createElement(
        `div`,
        {
          id: p ? `${p}` : void 0,
          className: c(`recharts-responsive-container`, m),
          style: Yh(
            Yh({}, g),
            {},
            { width: i, height: o, minWidth: s, minHeight: l, maxHeight: u },
          ),
          ref: _,
        },
        a.createElement(
          `div`,
          { style: Gh({ width: i, height: o }) },
          a.createElement(tg, { width: w, height: T }, d),
        ),
      )
    );
  }),
  ig = (0, a.forwardRef)((e, t) => {
    var n = ng();
    if (Gm(n.width) && Gm(n.height)) return e.children;
    var { width: r, height: i } = Kh({ width: e.width, height: e.height, aspect: e.aspect }),
      { calculatedWidth: o, calculatedHeight: s } = Bh(void 0, void 0, {
        width: r,
        height: i,
        aspect: e.aspect,
        maxHeight: e.maxHeight,
      });
    return V(o) && V(s)
      ? a.createElement(tg, { width: o, height: s }, e.children)
      : a.createElement(rg, qh({}, e, { width: r, height: i, ref: t }));
  }),
  ag = () => {
    var e = Ah(),
      t = H(Oh),
      n = H(Mh),
      r = H(jh)?.padding;
    return !e || !n || !r
      ? t
      : {
          width: n.width - r.left - r.right,
          height: n.height - r.top - r.bottom,
          x: r.left,
          y: r.top,
        };
  },
  og = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, brushBottom: 0 },
  sg = () => H(Dh) ?? og,
  cg = () => H(uh),
  lg = () => H(dh),
  q = (e) => e.layout.layoutType,
  ug = () => H(q),
  dg = (e) => {
    var t = e.layout.layoutType;
    if (t === `centric` || t === `radial`) return t;
  },
  fg = () => ug() !== void 0,
  pg = (e) => {
    var t = _d(),
      n = Ah(),
      { width: r, height: i } = e,
      o = ng(),
      s = r,
      c = i;
    return (
      o && ((s = o.width > 0 ? o.width : r), (c = o.height > 0 ? o.height : i)),
      (0, a.useEffect)(() => {
        !n && Gm(s) && Gm(c) && t(Vm({ width: s, height: c }));
      }, [t, n, s, c]),
      null
    );
  },
  mg = (e) => {
    var { margin: t } = e,
      n = _d();
    return (
      (0, a.useEffect)(() => {
        n(zm(t));
      }, [n, t]),
      null
    );
  },
  hg = Symbol.for(`immer-nothing`),
  gg = Symbol.for(`immer-draftable`),
  _g = Symbol.for(`immer-state`);
function vg(e, ...t) {
  throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var yg = Object.getPrototypeOf;
function bg(e) {
  return !!e && !!e[_g];
}
function xg(e) {
  return e ? wg(e) || Array.isArray(e) || !!e[gg] || !!e.constructor?.[gg] || Ag(e) || jg(e) : !1;
}
var Sg = Object.prototype.constructor.toString(),
  Cg = new WeakMap();
function wg(e) {
  if (!e || typeof e != `object`) return !1;
  const t = Object.getPrototypeOf(e);
  if (t === null || t === Object.prototype) return !0;
  const n = Object.hasOwnProperty.call(t, `constructor`) && t.constructor;
  if (n === Object) return !0;
  if (typeof n != `function`) return !1;
  let r = Cg.get(n);
  return r === void 0 && ((r = Function.toString.call(n)), Cg.set(n, r)), r === Sg;
}
function Tg(e, t, n = !0) {
  Eg(e) === 0
    ? (n ? Reflect.ownKeys(e) : Object.keys(e)).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function Eg(e) {
  const t = e[_g];
  return t ? t.type_ : Array.isArray(e) ? 1 : Ag(e) ? 2 : jg(e) ? 3 : 0;
}
function Dg(e, t) {
  return Eg(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Og(e, t, n) {
  const r = Eg(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function kg(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
function Ag(e) {
  return e instanceof Map;
}
function jg(e) {
  return e instanceof Set;
}
function Mg(e) {
  return e.copy_ || e.base_;
}
function Ng(e, t) {
  if (Ag(e)) return new Map(e);
  if (jg(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const n = wg(e);
  if (t === !0 || (t === `class_only` && !n)) {
    const t = Object.getOwnPropertyDescriptors(e);
    delete t[_g];
    const n = Reflect.ownKeys(t);
    for (let r = 0; r < n.length; r++) {
      const i = n[r],
        a = t[i];
      a.writable === !1 && ((a.writable = !0), (a.configurable = !0)),
        (a.get || a.set) &&
          (t[i] = { configurable: !0, writable: !0, enumerable: a.enumerable, value: e[i] });
    }
    return Object.create(yg(e), t);
  } else {
    const t = yg(e);
    return t !== null && n ? { ...e } : Object.assign(Object.create(t), e);
  }
}
function Pg(e, t = !1) {
  return Lg(e) || bg(e) || !xg(e)
    ? e
    : (Eg(e) > 1 && Object.defineProperties(e, { set: Ig, add: Ig, clear: Ig, delete: Ig }),
      Object.freeze(e),
      t && Object.values(e).forEach((e) => Pg(e, !0)),
      e);
}
function Fg() {
  vg(2);
}
var Ig = { value: Fg };
function Lg(e) {
  return typeof e != `object` || !e ? !0 : Object.isFrozen(e);
}
var Rg = {};
function zg(e) {
  const t = Rg[e];
  return t || vg(0, e), t;
}
var Bg;
function Vg() {
  return Bg;
}
function Hg(e, t) {
  return { drafts_: [], parent_: e, immer_: t, canAutoFreeze_: !0, unfinalizedDrafts_: 0 };
}
function Ug(e, t) {
  t && (zg(`Patches`), (e.patches_ = []), (e.inversePatches_ = []), (e.patchListener_ = t));
}
function Wg(e) {
  Gg(e), e.drafts_.forEach(qg), (e.drafts_ = null);
}
function Gg(e) {
  e === Bg && (Bg = e.parent_);
}
function Kg(e) {
  return (Bg = Hg(Bg, e));
}
function qg(e) {
  const t = e[_g];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function Jg(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[_g].modified_ && (Wg(t), vg(4)),
        xg(e) && ((e = Yg(t, e)), t.parent_ || Zg(t, e)),
        t.patches_ &&
          zg(`Patches`).generateReplacementPatches_(n[_g].base_, e, t.patches_, t.inversePatches_))
      : (e = Yg(t, n, [])),
    Wg(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e === hg ? void 0 : e
  );
}
function Yg(e, t, n) {
  if (Lg(t)) return t;
  const r = e.immer_.shouldUseStrictIteration(),
    i = t[_g];
  if (!i) return Tg(t, (r, a) => Xg(e, i, t, r, a, n), r), t;
  if (i.scope_ !== e) return t;
  if (!i.modified_) return Zg(e, i.base_, !0), i.base_;
  if (!i.finalized_) {
    (i.finalized_ = !0), i.scope_.unfinalizedDrafts_--;
    let t = i.copy_,
      a = t,
      o = !1;
    i.type_ === 3 && ((a = new Set(t)), t.clear(), (o = !0)),
      Tg(a, (r, a) => Xg(e, i, t, r, a, n, o), r),
      Zg(e, t, !1),
      n && e.patches_ && zg(`Patches`).generatePatches_(i, n, e.patches_, e.inversePatches_);
  }
  return i.copy_;
}
function Xg(e, t, n, r, i, a, o) {
  if (i == null || (typeof i != `object` && !o)) return;
  const s = Lg(i);
  if (!(s && !o)) {
    if (bg(i)) {
      const o = Yg(e, i, a && t && t.type_ !== 3 && !Dg(t.assigned_, r) ? a.concat(r) : void 0);
      if ((Og(n, r, o), bg(o))) e.canAutoFreeze_ = !1;
      else return;
    } else o && n.add(i);
    if (xg(i) && !s) {
      if (
        (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) ||
        (t && t.base_ && t.base_[r] === i && s)
      )
        return;
      Yg(e, i),
        (!t || !t.scope_.parent_) &&
          typeof r != `symbol` &&
          (Ag(n) ? n.has(r) : Object.prototype.propertyIsEnumerable.call(n, r)) &&
          Zg(e, i);
    }
  }
}
function Zg(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Pg(t, n);
}
function Qg(e, t) {
  let n = Array.isArray(e),
    r = {
      type_: +!!n,
      scope_: t ? t.scope_ : Vg(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    },
    i = r,
    a = $g;
  n && ((i = [r]), (a = e_));
  const { revoke: o, proxy: s } = Proxy.revocable(i, a);
  return (r.draft_ = s), (r.revoke_ = o), s;
}
var $g = {
    get(e, t) {
      if (t === _g) return e;
      const n = Mg(e);
      if (!Dg(n, t)) return n_(e, n, t);
      const r = n[t];
      return e.finalized_ || !xg(r)
        ? r
        : r === t_(e.base_, t)
          ? (a_(e), (e.copy_[t] = s_(r, e)))
          : r;
    },
    has(e, t) {
      return t in Mg(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Mg(e));
    },
    set(e, t, n) {
      const r = r_(Mg(e), t);
      if (r?.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const r = t_(Mg(e), t),
          i = r?.[_g];
        if (i && i.base_ === n) return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (kg(n, r) && (n !== void 0 || Dg(e.base_, t))) return !0;
        a_(e), i_(e);
      }
      return (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
        (Number.isNaN(n) && Number.isNaN(e.copy_[t]))
        ? !0
        : ((e.copy_[t] = n), (e.assigned_[t] = !0), !0);
    },
    deleteProperty(e, t) {
      return (
        t_(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), a_(e), i_(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = Mg(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== `length`,
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      vg(11);
    },
    getPrototypeOf(e) {
      return yg(e.base_);
    },
    setPrototypeOf() {
      vg(12);
    },
  },
  e_ = {};
Tg($g, (e, t) => {
  e_[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
}),
  (e_.deleteProperty = function (e, t) {
    return e_.set.call(this, e, t, void 0);
  }),
  (e_.set = function (e, t, n) {
    return $g.set.call(this, e[0], t, n, e[0]);
  });
function t_(e, t) {
  const n = e[_g];
  return (n ? Mg(n) : e)[t];
}
function n_(e, t, n) {
  const r = r_(t, n);
  return r ? (`value` in r ? r.value : r.get?.call(e.draft_)) : void 0;
}
function r_(e, t) {
  if (!(t in e)) return;
  let n = yg(e);
  for (; n; ) {
    const e = Object.getOwnPropertyDescriptor(n, t);
    if (e) return e;
    n = yg(n);
  }
}
function i_(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && i_(e.parent_));
}
function a_(e) {
  e.copy_ ||= Ng(e.base_, e.scope_.immer_.useStrictShallowCopy_);
}
var o_ = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.useStrictIteration_ = !0),
      (this.produce = (e, t, n) => {
        if (typeof e == `function` && typeof t != `function`) {
          const n = t;
          t = e;
          const r = this;
          return function (e = n, ...i) {
            return r.produce(e, (e) => t.call(this, e, ...i));
          };
        }
        typeof t != `function` && vg(6), n !== void 0 && typeof n != `function` && vg(7);
        let r;
        if (xg(e)) {
          let i = Kg(this),
            a = s_(e, void 0),
            o = !0;
          try {
            (r = t(a)), (o = !1);
          } finally {
            o ? Wg(i) : Gg(i);
          }
          return Ug(i, n), Jg(r, i);
        } else if (!e || typeof e != `object`) {
          if (
            ((r = t(e)),
            r === void 0 && (r = e),
            r === hg && (r = void 0),
            this.autoFreeze_ && Pg(r, !0),
            n)
          ) {
            const t = [],
              i = [];
            zg(`Patches`).generateReplacementPatches_(e, r, t, i), n(t, i);
          }
          return r;
        } else vg(1, e);
      }),
      (this.produceWithPatches = (e, t) => {
        if (typeof e == `function`)
          return (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n));
        let n, r;
        return [
          this.produce(e, t, (e, t) => {
            (n = e), (r = t);
          }),
          n,
          r,
        ];
      }),
      typeof e?.autoFreeze == `boolean` && this.setAutoFreeze(e.autoFreeze),
      typeof e?.useStrictShallowCopy == `boolean` &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy),
      typeof e?.useStrictIteration == `boolean` && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    xg(e) || vg(8), bg(e) && (e = c_(e));
    const t = Kg(this),
      n = s_(e, void 0);
    return (n[_g].isManual_ = !0), Gg(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[_g];
    (!n || !n.isManual_) && vg(9);
    const { scope_: r } = n;
    return Ug(r, t), Jg(void 0, r);
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const r = t[n];
      if (r.path.length === 0 && r.op === `replace`) {
        e = r.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = zg(`Patches`).applyPatches_;
    return bg(e) ? r(e, t) : this.produce(e, (e) => r(e, t));
  }
};
function s_(e, t) {
  const n = Ag(e) ? zg(`MapSet`).proxyMap_(e, t) : jg(e) ? zg(`MapSet`).proxySet_(e, t) : Qg(e, t);
  return (t ? t.scope_ : Vg()).drafts_.push(n), n;
}
function c_(e) {
  return bg(e) || vg(10, e), l_(e);
}
function l_(e) {
  if (!xg(e) || Lg(e)) return e;
  let t = e[_g],
    n,
    r = !0;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0),
      (n = Ng(e, t.scope_.immer_.useStrictShallowCopy_)),
      (r = t.scope_.immer_.shouldUseStrictIteration());
  } else n = Ng(e, !0);
  return (
    Tg(
      n,
      (e, t) => {
        Og(n, e, l_(t));
      },
      r,
    ),
    t && (t.finalized_ = !1),
    n
  );
}
new o_().produce;
function J(e) {
  return e;
}
var u_ = Xp({
    name: `legend`,
    initialState: {
      settings: {
        layout: `horizontal`,
        align: `center`,
        verticalAlign: `middle`,
        itemSorter: `value`,
      },
      size: { width: 0, height: 0 },
      payload: [],
    },
    reducers: {
      setLegendSize(e, t) {
        (e.size.width = t.payload.width), (e.size.height = t.payload.height);
      },
      setLegendSettings(e, t) {
        (e.settings.align = t.payload.align),
          (e.settings.layout = t.payload.layout),
          (e.settings.verticalAlign = t.payload.verticalAlign),
          (e.settings.itemSorter = t.payload.itemSorter);
      },
      addLegendPayload: {
        reducer(e, t) {
          e.payload.push(J(t.payload));
        },
        prepare: W(),
      },
      replaceLegendPayload: {
        reducer(e, t) {
          var { prev: n, next: r } = t.payload,
            i = Cp(e).payload.indexOf(J(n));
          i > -1 && (e.payload[i] = J(r));
        },
        prepare: W(),
      },
      removeLegendPayload: {
        reducer(e, t) {
          var n = Cp(e).payload.indexOf(J(t.payload));
          n > -1 && e.payload.splice(n, 1);
        },
        prepare: W(),
      },
    },
  }),
  {
    setLegendSize: d_,
    setLegendSettings: f_,
    addLegendPayload: p_,
    replaceLegendPayload: m_,
    removeLegendPayload: h_,
  } = u_.actions,
  g_ = u_.reducer,
  __ = n((e) => {
    var t = r();
    t.useSyncExternalStore, t.useRef, t.useEffect, t.useMemo, t.useDebugValue;
  });
n((e, t) => {
  t.exports = __();
})();
function v_(e) {
  e();
}
function y_() {
  let e = null,
    t = null;
  return {
    clear() {
      (e = null), (t = null);
    },
    notify() {
      v_(() => {
        let t = e;
        for (; t; ) t.callback(), (t = t.next);
      });
    },
    get() {
      let t = [],
        n = e;
      for (; n; ) t.push(n), (n = n.next);
      return t;
    },
    subscribe(n) {
      let r = !0,
        i = (t = { callback: n, next: null, prev: t });
      return (
        i.prev ? (i.prev.next = i) : (e = i),
        function () {
          !r ||
            e === null ||
            ((r = !1),
            i.next ? (i.next.prev = i.prev) : (t = i.prev),
            i.prev ? (i.prev.next = i.next) : (e = i.next));
        }
      );
    },
  };
}
var b_ = { notify() {}, get: () => [] };
function x_(e, t) {
  let n,
    r = b_,
    i = 0,
    a = !1;
  function o(e) {
    u();
    let t = r.subscribe(e),
      n = !1;
    return () => {
      n || ((n = !0), t(), d());
    };
  }
  function s() {
    r.notify();
  }
  function c() {
    m.onStateChange && m.onStateChange();
  }
  function l() {
    return a;
  }
  function u() {
    i++, n || ((n = t ? t.addNestedSub(c) : e.subscribe(c)), (r = y_()));
  }
  function d() {
    i--, n && i === 0 && (n(), (n = void 0), r.clear(), (r = b_));
  }
  function f() {
    a || ((a = !0), u());
  }
  function p() {
    a && ((a = !1), d());
  }
  const m = {
    addNestedSub: o,
    notifyNestedSubs: s,
    handleChangeWrapper: c,
    isSubscribed: l,
    trySubscribe: f,
    tryUnsubscribe: p,
    getListeners: () => r,
  };
  return m;
}
var S_ =
    typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0,
  C_ = typeof navigator < `u` && navigator.product === `ReactNative`,
  w_ = S_ || C_ ? a.useLayoutEffect : a.useEffect;
function T_(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
function E_(e, t) {
  if (T_(e, t)) return !0;
  if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
  const n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (let r = 0; r < n.length; r++)
    if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !T_(e[n[r]], t[n[r]])) return !1;
  return !0;
}
var D_ = Symbol.for(`react-redux-context`),
  O_ = typeof globalThis < `u` ? globalThis : {};
function k_() {
  if (!a.createContext) return {};
  let e = (O_[D_] ??= new Map()),
    t = e.get(a.createContext);
  return t || ((t = a.createContext(null)), e.set(a.createContext, t)), t;
}
var A_ = k_();
function j_(e) {
  const { children: t, context: n, serverState: r, store: i } = e,
    o = a.useMemo(
      () => ({ store: i, subscription: x_(i), getServerState: r ? () => r : void 0 }),
      [i, r],
    ),
    s = a.useMemo(() => i.getState(), [i]);
  w_(() => {
    const { subscription: e } = o;
    return (
      (e.onStateChange = e.notifyNestedSubs),
      e.trySubscribe(),
      s !== i.getState() && e.notifyNestedSubs(),
      () => {
        e.tryUnsubscribe(), (e.onStateChange = void 0);
      }
    );
  }, [o, s]);
  const c = n || A_;
  return a.createElement(c.Provider, { value: o }, t);
}
var M_ = j_,
  N_ = new Set([
    `axisLine`,
    `tickLine`,
    `activeBar`,
    `activeDot`,
    `activeLabel`,
    `activeShape`,
    `allowEscapeViewBox`,
    `background`,
    `cursor`,
    `dot`,
    `label`,
    `line`,
    `margin`,
    `padding`,
    `position`,
    `shape`,
    `style`,
    `tick`,
    `wrapperStyle`,
    `radius`,
    `throttledEvents`,
  ]);
function P_(e, t) {
  return e == null && t == null
    ? !0
    : typeof e == `number` && typeof t == `number`
      ? e === t || (e !== e && t !== t)
      : e === t;
}
function F_(e, t) {
  for (var n of new Set([...Object.keys(e), ...Object.keys(t)]))
    if (N_.has(n)) {
      if (e[n] == null && t[n] == null) continue;
      if (!E_(e[n], t[n])) return !1;
    } else if (!P_(e[n], t[n])) return !1;
  return !0;
}
function I_() {
  return (
    (I_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    I_.apply(null, arguments)
  );
}
function L_(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function R_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? L_(Object(n), !0).forEach(function (t) {
          z_(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : L_(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function z_(e, t, n) {
  return (
    (t = B_(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function B_(e) {
  var t = V_(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function V_(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function H_(e) {
  return Array.isArray(e) && gu(e[0]) && gu(e[1]) ? e.join(` ~ `) : e;
}
var U_ = {
  separator: ` : `,
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: `#fff`,
    border: `1px solid #ccc`,
    whiteSpace: `nowrap`,
  },
  itemStyle: { display: `block`, paddingTop: 4, paddingBottom: 4, color: `#000` },
  labelStyle: {},
  accessibilityLayer: !1,
};
function W_(e, t) {
  return t == null ? e : (0, Hd.default)(e, t);
}
var G_ = (e) => {
    var {
        separator: t = U_.separator,
        contentStyle: n,
        itemStyle: r,
        labelStyle: i = U_.labelStyle,
        payload: o,
        formatter: s,
        itemSorter: l,
        wrapperClassName: u,
        labelClassName: d,
        label: f,
        labelFormatter: p,
        accessibilityLayer: m = U_.accessibilityLayer,
      } = e,
      h = () => {
        if (o && o.length) {
          var e = { padding: 0, margin: 0 },
            n = W_(o, l).map((e, n) => {
              if (!e || e.type === `none`) return null;
              var i = e.formatter || s || H_,
                { value: c, name: l } = e,
                u = c,
                d = l;
              if (i) {
                var f = i(c, l, e, n, o);
                if (Array.isArray(f)) [u, d] = f;
                else if (f == null) return null;
                else u = f;
              }
              var p = R_(R_({}, U_.itemStyle), {}, { color: e.color || U_.itemStyle.color }, r);
              return a.createElement(
                `li`,
                { className: `recharts-tooltip-item`, key: `tooltip-item-${n}`, style: p },
                gu(d)
                  ? a.createElement(`span`, { className: `recharts-tooltip-item-name` }, d)
                  : null,
                gu(d)
                  ? a.createElement(`span`, { className: `recharts-tooltip-item-separator` }, t)
                  : null,
                a.createElement(`span`, { className: `recharts-tooltip-item-value` }, u),
                a.createElement(`span`, { className: `recharts-tooltip-item-unit` }, e.unit || ``),
              );
            });
          return a.createElement(`ul`, { className: `recharts-tooltip-item-list`, style: e }, n);
        }
        return null;
      },
      g = R_(R_({}, U_.contentStyle), n),
      _ = R_({ margin: 0 }, i),
      v = !Cu(f),
      y = v ? f : ``,
      b = c(`recharts-default-tooltip`, u),
      x = c(`recharts-tooltip-label`, d);
    v && p && o != null && (y = p(f, o));
    var S = m ? { role: `status`, 'aria-live': `assertive` } : {};
    return a.createElement(
      `div`,
      I_({ className: b, style: g }, S),
      a.createElement(`p`, { className: x, style: _ }, a.isValidElement(y) ? y : `${y}`),
      h(),
    );
  },
  K_ = `recharts-tooltip-wrapper`,
  q_ = { visibility: `hidden` };
function J_(e) {
  var { coordinate: t, translateX: n, translateY: r } = e;
  return c(K_, {
    [`${K_}-right`]: V(n) && t && V(t.x) && n >= t.x,
    [`${K_}-left`]: V(n) && t && V(t.x) && n < t.x,
    [`${K_}-bottom`]: V(r) && t && V(t.y) && r >= t.y,
    [`${K_}-top`]: V(r) && t && V(t.y) && r < t.y,
  });
}
function Y_(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: n,
    key: r,
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: s,
    viewBox: c,
    viewBoxDimension: l,
  } = e;
  if (a && V(a[r])) return a[r];
  var u = n[r] - s - (i > 0 ? i : 0),
    d = n[r] + i;
  if (t[r]) return o[r] ? u : d;
  var f = c[r];
  return f == null
    ? 0
    : o[r]
      ? Math.max(u < f ? d : u, f)
      : l == null
        ? 0
        : d + s > f + l
          ? Math.max(u, f)
          : Math.max(d, f);
}
function X_(e) {
  var { translateX: t, translateY: n, useTranslate3d: r } = e;
  return { transform: r ? `translate3d(${t}px, ${n}px, 0)` : `translate(${t}px, ${n}px)` };
}
function Z_(e) {
  var {
      allowEscapeViewBox: t,
      coordinate: n,
      offsetTop: r,
      offsetLeft: i,
      position: a,
      reverseDirection: o,
      tooltipBox: s,
      useTranslate3d: c,
      viewBox: l,
    } = e,
    u,
    d,
    f;
  return (
    s.height > 0 && s.width > 0 && n
      ? ((d = Y_({
          allowEscapeViewBox: t,
          coordinate: n,
          key: `x`,
          offset: i,
          position: a,
          reverseDirection: o,
          tooltipDimension: s.width,
          viewBox: l,
          viewBoxDimension: l.width,
        })),
        (f = Y_({
          allowEscapeViewBox: t,
          coordinate: n,
          key: `y`,
          offset: r,
          position: a,
          reverseDirection: o,
          tooltipDimension: s.height,
          viewBox: l,
          viewBoxDimension: l.height,
        })),
        (u = X_({ translateX: d, translateY: f, useTranslate3d: c })))
      : (u = q_),
    { cssProperties: u, cssClasses: J_({ translateX: d, translateY: f, coordinate: n }) }
  );
}
var Q_ = {
  devToolsEnabled: !0,
  isSsr: !(
    typeof window < `u` &&
    window.document &&
    window.document.createElement &&
    window.setTimeout
  ),
};
function $_() {
  var [e, t] = (0, a.useState)(() =>
    Q_.isSsr || !window.matchMedia
      ? !1
      : window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  );
  return (
    (0, a.useEffect)(() => {
      if (window.matchMedia) {
        var e = window.matchMedia(`(prefers-reduced-motion: reduce)`),
          n = () => {
            t(e.matches);
          };
        return (
          e.addEventListener(`change`, n),
          () => {
            e.removeEventListener(`change`, n);
          }
        );
      }
    }, []),
    e
  );
}
function ev(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function tv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? ev(Object(n), !0).forEach(function (t) {
          nv(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : ev(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function nv(e, t, n) {
  return (
    (t = rv(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function rv(e) {
  var t = iv(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function iv(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function av(e) {
  if (
    !(e.prefersReducedMotion && e.isAnimationActive === `auto`) &&
    e.isAnimationActive &&
    e.active
  )
    return `transform ${e.animationDuration}ms ${e.animationEasing}`;
}
function ov(e) {
  var t = $_(),
    [n, r] = a.useState(() => ({ dismissed: !1, dismissedAtCoordinate: { x: 0, y: 0 } }));
  a.useEffect(() => {
    var t = (t) => {
      t.key === `Escape` &&
        r({
          dismissed: !0,
          dismissedAtCoordinate: { x: e.coordinate?.x ?? 0, y: e.coordinate?.y ?? 0 },
        });
    };
    return (
      document.addEventListener(`keydown`, t),
      () => {
        document.removeEventListener(`keydown`, t);
      }
    );
  }, [e.coordinate?.x, e.coordinate?.y]),
    n.dismissed &&
      ((e.coordinate?.x ?? 0) !== n.dismissedAtCoordinate.x ||
        (e.coordinate?.y ?? 0) !== n.dismissedAtCoordinate.y) &&
      r(tv(tv({}, n), {}, { dismissed: !1 }));
  var { cssClasses: i, cssProperties: o } = Z_({
      allowEscapeViewBox: e.allowEscapeViewBox,
      coordinate: e.coordinate,
      offsetLeft: typeof e.offset == `number` ? e.offset : e.offset.x,
      offsetTop: typeof e.offset == `number` ? e.offset : e.offset.y,
      position: e.position,
      reverseDirection: e.reverseDirection,
      tooltipBox: { height: e.lastBoundingBox.height, width: e.lastBoundingBox.width },
      useTranslate3d: e.useTranslate3d,
      viewBox: e.viewBox,
    }),
    s = tv(
      tv(
        {},
        e.hasPortalFromProps
          ? {}
          : tv(
              tv(
                {
                  transition: av({
                    prefersReducedMotion: t,
                    isAnimationActive: e.isAnimationActive,
                    active: e.active,
                    animationDuration: e.animationDuration,
                    animationEasing: e.animationEasing,
                  }),
                },
                o,
              ),
              {},
              { pointerEvents: `none`, position: `absolute`, top: 0, left: 0 },
            ),
      ),
      {},
      { visibility: !n.dismissed && e.active && e.hasPayload ? `visible` : `hidden` },
      e.wrapperStyle,
    );
  return a.createElement(
    `div`,
    {
      xmlns: `http://www.w3.org/1999/xhtml`,
      tabIndex: -1,
      className: i,
      style: s,
      ref: e.innerRef,
    },
    e.children,
  );
}
var sv = a.memo(ov),
  cv = () => H((e) => e.rootProps.accessibilityLayer) ?? !0;
function lv() {
  return (
    (lv = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    lv.apply(null, arguments)
  );
}
function uv(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function dv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? uv(Object(n), !0).forEach(function (t) {
          fv(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : uv(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function fv(e, t, n) {
  return (
    (t = pv(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function pv(e) {
  var t = mv(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function mv(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var hv = {
    curveBasisClosed: Ol,
    curveBasisOpen: Al,
    curveBasis: El,
    curveBumpX: xl,
    curveBumpY: Sl,
    curveLinearClosed: Ml,
    curveLinear: hl,
    curveMonotoneX: Bl,
    curveMonotoneY: Vl,
    curveNatural: Wl,
    curveStep: Kl,
    curveStepAfter: Jl,
    curveStepBefore: ql,
  },
  gv = (e) => G(e.x) && G(e.y),
  _v = (e) => e.base != null && gv(e.base) && gv(e),
  vv = (e) => e.x,
  yv = (e) => e.y,
  bv = (e, t) => {
    if (typeof e == `function`) return e;
    var n = `curve${wu(e)}`;
    if ((n === `curveMonotone` || n === `curveBump`) && t) {
      var r = hv[`${n}${t === `vertical` ? `Y` : `X`}`];
      if (r) return r;
    }
    return hv[n] || hl;
  },
  xv = { connectNulls: !1, type: `linear` },
  Sv = (e) => {
    var {
        type: t = xv.type,
        points: n = [],
        baseLine: r,
        layout: i,
        connectNulls: a = xv.connectNulls,
      } = e,
      o = bv(t, i),
      s = a ? n.filter(gv) : n;
    if (Array.isArray(r)) {
      var c,
        l = n.map((e, t) => dv(dv({}, e), {}, { base: r[t] }));
      return (
        (c =
          i === `vertical`
            ? yl()
                .y(yv)
                .x1(vv)
                .x0((e) => e.base.x)
            : yl()
                .x(vv)
                .y1(yv)
                .y0((e) => e.base.y)),
        c.defined(_v).curve(o)(a ? l.filter(_v) : l)
      );
    }
    return (
      i === `vertical` && V(r)
        ? yl().y(yv).x1(vv).x0(r)
        : V(r)
          ? yl().x(vv).y1(yv).y0(r)
          : vl().x(vv).y(yv)
    )
      .defined(gv)
      .curve(o)(s);
  },
  Cv = (e) => {
    var { className: t, points: n, path: r, pathRef: i } = e,
      o = ug();
    if ((!n || !n.length) && !r) return null;
    var s = {
        type: e.type,
        points: e.points,
        baseLine: e.baseLine,
        layout: e.layout || o,
        connectNulls: e.connectNulls,
      },
      l = n && n.length ? Sv(s) : r;
    return a.createElement(
      `path`,
      lv({}, Wc(e), Ou(e), {
        className: c(`recharts-curve`, t),
        d: l === null ? void 0 : l,
        ref: i,
      }),
    );
  },
  wv = [`x`, `y`, `top`, `left`, `width`, `height`, `className`];
function Tv() {
  return (
    (Tv = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Tv.apply(null, arguments)
  );
}
function Ev(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Dv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Ev(Object(n), !0).forEach(function (t) {
          Ov(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ev(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Ov(e, t, n) {
  return (
    (t = kv(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function kv(e) {
  var t = Av(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Av(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function jv(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = Mv(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function Mv(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var Nv = (e, t, n, r, i, a) => `M${e},${i}v${r}M${a},${t}h${n}`,
  Pv = (e) => {
    var {
        x: t = 0,
        y: n = 0,
        top: r = 0,
        left: i = 0,
        width: o = 0,
        height: s = 0,
        className: l,
      } = e,
      u = jv(e, wv),
      d = Dv({ x: t, y: n, top: r, left: i, width: o, height: s }, u);
    return !V(t) || !V(n) || !V(o) || !V(s) || !V(r) || !V(i)
      ? null
      : a.createElement(
          `path`,
          Tv({}, Kc(d), { className: c(`recharts-cross`, l), d: Nv(t, n, o, s, r, i) }),
        );
  };
function Fv(e, t, n, r) {
  var i = r / 2;
  return {
    stroke: `none`,
    fill: `#ccc`,
    x: e === `horizontal` ? t.x - i : n.left + 0.5,
    y: e === `horizontal` ? n.top + 0.5 : t.y - i,
    width: e === `horizontal` ? r : n.width - 1,
    height: e === `horizontal` ? n.height - 1 : r,
  };
}
function Iv(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Lv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Iv(Object(n), !0).forEach(function (t) {
          Rv(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Iv(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Rv(e, t, n) {
  return (
    (t = zv(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function zv(e) {
  var t = Bv(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Bv(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Vv = (e) => e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`),
  Hv = (e, t, n) => e.map((e) => `${Vv(e)} ${t}ms ${n}`).join(`,`),
  Uv = (e, t) => [Object.keys(e), Object.keys(t)].reduce((e, t) => e.filter((e) => t.includes(e))),
  Wv = (e, t) => Object.keys(t).reduce((n, r) => Lv(Lv({}, n), {}, { [r]: e(r, t[r]) }), {});
function Gv(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Y(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Gv(Object(n), !0).forEach(function (t) {
          Kv(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Gv(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Kv(e, t, n) {
  return (
    (t = qv(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function qv(e) {
  var t = Jv(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Jv(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Yv = (e, t, n) => e + (t - e) * n,
  Xv = (e) => {
    var { from: t, to: n } = e;
    return t !== n;
  },
  Zv = (e, t, n) => {
    var r = Wv((t, n) => {
      if (Xv(n)) {
        var [r, i] = e(n.from, n.to, n.velocity);
        return Y(Y({}, n), {}, { from: r, velocity: i });
      }
      return n;
    }, t);
    return n < 1
      ? Wv(
          (e, t) =>
            Xv(t) && r[e] != null
              ? Y(
                  Y({}, t),
                  {},
                  { velocity: Yv(t.velocity, r[e].velocity, n), from: Yv(t.from, r[e].from, n) },
                )
              : t,
          t,
        )
      : Zv(e, r, n - 1);
  };
function Qv(e, t, n, r, i, a) {
  var o,
    s = r.reduce((n, r) => Y(Y({}, n), {}, { [r]: { from: e[r], velocity: 0, to: t[r] } }), {}),
    c = () => Wv((e, t) => t.from, s),
    l = () => !Object.values(s).filter(Xv).length,
    u = null,
    d = (r) => {
      o ||= r;
      var f = (r - o) / n.dt;
      (s = Zv(n, s, f)), i(Y(Y(Y({}, e), t), c())), (o = r), l() || (u = a.setTimeout(d));
    };
  return () => (
    (u = a.setTimeout(d)),
    () => {
      var e;
      (e = u) == null || e();
    }
  );
}
function $v(e, t, n, r, i, a, o) {
  var s = null,
    c = i.reduce((n, r) => {
      var i = e[r],
        a = t[r];
      return i == null || a == null ? n : Y(Y({}, n), {}, { [r]: [i, a] });
    }, {}),
    l,
    u = (i) => {
      l ||= i;
      var d = (i - l) / r,
        f = Wv((e, t) => Yv(...t, n(d)), c);
      if ((a(Y(Y(Y({}, e), t), f)), d < 1)) s = o.setTimeout(u);
      else {
        var p = Wv((e, t) => Yv(...t, n(1)), c);
        a(Y(Y(Y({}, e), t), p));
      }
    };
  return () => (
    (s = o.setTimeout(u)),
    () => {
      var e;
      (e = s) == null || e();
    }
  );
}
var ey = (e, t, n, r, i, a) => {
    var o = Uv(e, t);
    return n == null
      ? () => (i(Y(Y({}, e), t)), () => {})
      : n.isStepper === !0
        ? Qv(e, t, n, o, i, a)
        : $v(e, t, n, r, o, i, a);
  },
  ty = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1],
  ny = (e, t) => e.map((e, n) => e * t ** n).reduce((e, t) => e + t),
  ry = (e, t) => (n) => ny(ty(e, t), n),
  iy = (e, t) => (n) =>
    ny(
      [
        ...ty(e, t)
          .map((e, t) => e * t)
          .slice(1),
        0,
      ],
      n,
    ),
  ay = (e) => {
    var t,
      n = e.split(`(`);
    if (n.length !== 2 || n[0] !== `cubic-bezier`) return null;
    var r = (t = n[1]) == null || (t = t.split(`)`)[0]) == null ? void 0 : t.split(`,`);
    if (r == null || r.length !== 4) return null;
    var i = r.map((e) => parseFloat(e));
    return [i[0], i[1], i[2], i[3]];
  },
  oy = function () {
    var e = [...arguments];
    if (e.length === 1)
      switch (e[0]) {
        case `linear`:
          return [0, 0, 1, 1];
        case `ease`:
          return [0.25, 0.1, 0.25, 1];
        case `ease-in`:
          return [0.42, 0, 1, 1];
        case `ease-out`:
          return [0.42, 0, 0.58, 1];
        case `ease-in-out`:
          return [0, 0, 0.58, 1];
        default:
          var t = ay(e[0]);
          if (t) return t;
      }
    return e.length === 4 ? e : [0, 0, 1, 1];
  },
  sy = (e, t, n, r) => {
    var i = ry(e, n),
      a = ry(t, r),
      o = iy(e, n),
      s = (e) => (e > 1 ? 1 : e < 0 ? 0 : e),
      c = (e) => {
        for (var t = e > 1 ? 1 : e, n = t, r = 0; r < 8; ++r) {
          var c = i(n) - t,
            l = o(n);
          if (Math.abs(c - t) < 1e-4 || l < 1e-4) return a(n);
          n = s(n - c / l);
        }
        return a(n);
      };
    return (c.isStepper = !1), c;
  },
  cy = function () {
    return sy(...oy(...arguments));
  },
  ly = function () {
    var {
        stiff: e = 100,
        damping: t = 8,
        dt: n = 17,
      } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = (r, i, a) => {
        var o = a + ((-(r - i) * e - a * t) * n) / 1e3,
          s = (a * n) / 1e3 + r;
        return Math.abs(s - i) < 1e-4 && Math.abs(o) < 1e-4 ? [i, 0] : [s, o];
      };
    return (r.isStepper = !0), (r.dt = n), r;
  },
  uy = (e) => {
    if (typeof e == `string`)
      switch (e) {
        case `ease`:
        case `ease-in-out`:
        case `ease-out`:
        case `ease-in`:
        case `linear`:
          return cy(e);
        case `spring`:
          return ly();
        default:
          if (e.split(`(`)[0] === `cubic-bezier`) return cy(e);
      }
    return typeof e == `function` ? e : null;
  };
function dy(e) {
  var t,
    n = () => null,
    r = !1,
    i = null,
    a = (o) => {
      if (!r) {
        if (Array.isArray(o)) {
          if (!o.length) return;
          var [s, ...c] = o;
          if (typeof s == `number`) {
            i = e.setTimeout(a.bind(null, c), s);
            return;
          }
          a(s), (i = e.setTimeout(a.bind(null, c)));
          return;
        }
        typeof o == `string` && ((t = o), n(t)),
          typeof o == `object` && ((t = o), n(t)),
          typeof o == `function` && o();
      }
    };
  return {
    stop: () => {
      r = !0;
    },
    start: (e) => {
      (r = !1), (i &&= (i(), null)), a(e);
    },
    subscribe: (e) => (
      (n = e),
      () => {
        n = () => null;
      }
    ),
    getTimeoutController: () => e,
  };
}
var fy = class {
  setTimeout(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      n = performance.now(),
      r = null,
      i = (a) => {
        a - n >= t
          ? e(a)
          : typeof requestAnimationFrame == `function` && (r = requestAnimationFrame(i));
      };
    return (
      (r = requestAnimationFrame(i)),
      () => {
        r != null && cancelAnimationFrame(r);
      }
    );
  }
};
function py() {
  return dy(new fy());
}
var my = (0, a.createContext)(py);
function hy(e, t) {
  var n = (0, a.useContext)(my);
  return (0, a.useMemo)(() => t ?? n(e), [e, t, n]);
}
var gy = {
    begin: 0,
    duration: 1e3,
    easing: `ease`,
    isActive: !0,
    canBegin: !0,
    onAnimationEnd: () => {},
    onAnimationStart: () => {},
  },
  _y = { t: 0 },
  vy = { t: 1 };
function yy(e) {
  var t = Pu(e, gy),
    {
      isActive: n,
      canBegin: r,
      duration: i,
      easing: o,
      begin: s,
      onAnimationEnd: c,
      onAnimationStart: l,
      children: u,
    } = t,
    d = $_(),
    f = n === `auto` ? !Q_.isSsr && !d : n,
    p = hy(t.animationId, t.animationManager),
    [m, h] = (0, a.useState)(f ? _y : vy),
    g = (0, a.useRef)(null);
  return (
    (0, a.useEffect)(() => {
      f || h(vy);
    }, [f]),
    (0, a.useEffect)(() => {
      if (!f || !r) return Eu;
      var e = ey(_y, vy, uy(o), i, h, p.getTimeoutController());
      return (
        p.start([
          l,
          s,
          () => {
            g.current = e();
          },
          i,
          c,
        ]),
        () => {
          p.stop(), g.current && g.current(), c();
        }
      );
    }, [f, r, i, o, s, l, c, p]),
    u(m.t)
  );
}
function by(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : `animation-`,
    n = (0, a.useRef)(vu(t)),
    r = (0, a.useRef)(e);
  return r.current !== e && ((n.current = vu(t)), (r.current = e)), n.current;
}
var xy = [`radius`],
  Sy = [`radius`],
  Cy,
  wy,
  Ty,
  Ey,
  Dy,
  Oy,
  ky,
  Ay,
  jy,
  My;
function Ny(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Py(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Ny(Object(n), !0).forEach(function (t) {
          Fy(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ny(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Fy(e, t, n) {
  return (
    (t = Iy(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Iy(e) {
  var t = Ly(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Ly(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Ry() {
  return (
    (Ry = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ry.apply(null, arguments)
  );
}
function zy(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = By(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function By(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
function Vy(e, t) {
  return (
    (t ||= e.slice(0)),
    Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }))
  );
}
var Hy = (e, t, n, r, i) => {
    var a = du(n),
      o = du(r),
      s = Math.min(Math.abs(a) / 2, Math.abs(o) / 2),
      c = o >= 0 ? 1 : -1,
      l = a >= 0 ? 1 : -1,
      u = +((o >= 0 && a >= 0) || (o < 0 && a < 0)),
      d;
    if (s > 0 && Array.isArray(i)) {
      for (var f = [0, 0, 0, 0], p = 0, m = 4; p < m; p++) {
        var h = i[p] ?? 0;
        f[p] = h > s ? s : h;
      }
      (d = fu((Cy ||= Vy([`M`, `,`, ``])), e, t + c * f[0])),
        f[0] > 0 &&
          (d += fu(
            (wy ||= Vy([`A `, `,`, `,0,0,`, `,`, `,`, ``])),
            f[0],
            f[0],
            u,
            e + l * f[0],
            t,
          )),
        (d += fu((Ty ||= Vy([`L `, `,`, ``])), e + n - l * f[1], t)),
        f[1] > 0 &&
          (d += fu(
            (Ey ||= Vy([
              `A `,
              `,`,
              `,0,0,`,
              `,
        `,
              `,`,
              ``,
            ])),
            f[1],
            f[1],
            u,
            e + n,
            t + c * f[1],
          )),
        (d += fu((Dy ||= Vy([`L `, `,`, ``])), e + n, t + r - c * f[2])),
        f[2] > 0 &&
          (d += fu(
            (Oy ||= Vy([
              `A `,
              `,`,
              `,0,0,`,
              `,
        `,
              `,`,
              ``,
            ])),
            f[2],
            f[2],
            u,
            e + n - l * f[2],
            t + r,
          )),
        (d += fu((ky ||= Vy([`L `, `,`, ``])), e + l * f[3], t + r)),
        f[3] > 0 &&
          (d += fu(
            (Ay ||= Vy([
              `A `,
              `,`,
              `,0,0,`,
              `,
        `,
              `,`,
              ``,
            ])),
            f[3],
            f[3],
            u,
            e,
            t + r - c * f[3],
          )),
        (d += `Z`);
    } else if (s > 0 && i === +i && i > 0) {
      var g = Math.min(s, i);
      d = fu(
        (jy ||= Vy(
          `M .,.
            A .,.,0,0,.,.,.
            L .,.
            A .,.,0,0,.,.,.
            L .,.
            A .,.,0,0,.,.,.
            L .,.
            A .,.,0,0,.,.,. Z`.split(`.`),
        )),
        e,
        t + c * g,
        g,
        g,
        u,
        e + l * g,
        t,
        e + n - l * g,
        t,
        g,
        g,
        u,
        e + n,
        t + c * g,
        e + n,
        t + r - c * g,
        g,
        g,
        u,
        e + n - l * g,
        t + r,
        e + l * g,
        t + r,
        g,
        g,
        u,
        e,
        t + r - c * g,
      );
    } else d = fu((My ||= Vy([`M `, `,`, ` h `, ` v `, ` h `, ` Z`])), e, t, n, r, -n);
    return d;
  },
  Uy = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: `ease`,
  },
  Wy = (e) => {
    var t = Pu(e, Uy),
      n = (0, a.useRef)(null),
      [r, i] = (0, a.useState)(-1);
    (0, a.useEffect)(() => {
      if (n.current && n.current.getTotalLength)
        try {
          var e = n.current.getTotalLength();
          e && i(e);
        } catch {}
    }, []);
    var { x: o, y: s, width: l, height: u, radius: d, className: f } = t,
      {
        animationEasing: p,
        animationDuration: m,
        animationBegin: h,
        isAnimationActive: g,
        isUpdateAnimationActive: _,
      } = t,
      v = (0, a.useRef)(l),
      y = (0, a.useRef)(u),
      b = (0, a.useRef)(o),
      x = (0, a.useRef)(s),
      S = by(
        (0, a.useMemo)(() => ({ x: o, y: s, width: l, height: u, radius: d }), [o, s, l, u, d]),
        `rectangle-`,
      );
    if (o !== +o || s !== +s || l !== +l || u !== +u || l === 0 || u === 0) return null;
    var C = c(`recharts-rectangle`, f);
    if (!_) {
      var w = Kc(t),
        { radius: T } = w,
        E = zy(w, xy);
      return a.createElement(
        `path`,
        Ry({}, E, {
          x: du(o),
          y: du(s),
          width: du(l),
          height: du(u),
          radius: typeof d == `number` ? d : void 0,
          className: C,
          d: Hy(o, s, l, u, d),
        }),
      );
    }
    var D = v.current,
      O = y.current,
      k = b.current,
      ee = x.current,
      te = `0px ${r === -1 ? 1 : r}px`,
      A = `${r}px ${r}px`,
      j = Hv([`strokeDasharray`], m, typeof p == `string` ? p : Uy.animationEasing);
    return a.createElement(
      yy,
      { animationId: S, key: S, canBegin: r > 0, duration: m, easing: p, isActive: _, begin: h },
      (e) => {
        var r = xu(D, l, e),
          i = xu(O, u, e),
          c = xu(k, o, e),
          f = xu(ee, s, e);
        n.current && ((v.current = r), (y.current = i), (b.current = c), (x.current = f));
        var p = g
            ? e > 0
              ? { transition: j, strokeDasharray: A }
              : { strokeDasharray: te }
            : { strokeDasharray: A },
          m = Kc(t),
          { radius: h } = m,
          _ = zy(m, Sy);
        return a.createElement(
          `path`,
          Ry({}, _, {
            radius: typeof d == `number` ? d : void 0,
            className: C,
            d: Hy(c, f, r, i, d),
            ref: n,
            style: Py(Py({}, p), t.style),
          }),
        );
      },
    );
  };
function Gy(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ky(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Gy(Object(n), !0).forEach(function (t) {
          qy(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Gy(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function qy(e, t, n) {
  return (
    (t = Jy(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Jy(e) {
  var t = Yy(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Yy(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var Xy = Math.PI / 180,
  Zy = (e) => (e * 180) / Math.PI,
  Qy = (e, t, n, r) => ({ x: e + Math.cos(-Xy * r) * n, y: t + Math.sin(-Xy * r) * n }),
  $y = function (e, t) {
    var n =
      arguments.length > 2 && arguments[2] !== void 0
        ? arguments[2]
        : { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0, brushBottom: 0 };
    return (
      Math.min(
        Math.abs(e - (n.left || 0) - (n.right || 0)),
        Math.abs(t - (n.top || 0) - (n.bottom || 0)),
      ) / 2
    );
  },
  eb = (e, t) => {
    var { x: n, y: r } = e,
      { x: i, y: a } = t;
    return Math.sqrt((n - i) ** 2 + (r - a) ** 2);
  },
  tb = (e, t) => {
    var { x: n, y: r } = e,
      { cx: i, cy: a } = t,
      o = eb({ x: n, y: r }, { x: i, y: a });
    if (o <= 0) return { radius: o, angle: 0 };
    var s = (n - i) / o,
      c = Math.acos(s);
    return r > a && (c = 2 * Math.PI - c), { radius: o, angle: Zy(c), angleInRadian: c };
  },
  nb = (e) => {
    var { startAngle: t, endAngle: n } = e,
      r = Math.floor(t / 360),
      i = Math.floor(n / 360),
      a = Math.min(r, i);
    return { startAngle: t - a * 360, endAngle: n - a * 360 };
  },
  rb = (e, t) => {
    var { startAngle: n, endAngle: r } = t,
      i = Math.floor(n / 360),
      a = Math.floor(r / 360);
    return e + Math.min(i, a) * 360;
  },
  ib = (e, t) => {
    var { relativeX: n, relativeY: r } = e,
      { radius: i, angle: a } = tb({ x: n, y: r }, t),
      { innerRadius: o, outerRadius: s } = t;
    if (i < o || i > s || i === 0) return null;
    var { startAngle: c, endAngle: l } = nb(t),
      u = a,
      d;
    if (c <= l) {
      for (; u > l; ) u -= 360;
      for (; u < c; ) u += 360;
      d = u >= c && u <= l;
    } else {
      for (; u > c; ) u -= 360;
      for (; u < l; ) u += 360;
      d = u >= l && u <= c;
    }
    return d ? Ky(Ky({}, t), {}, { radius: i, angle: rb(u, t) }) : null;
  };
function ab(e) {
  var { cx: t, cy: n, radius: r, startAngle: i, endAngle: a } = e;
  return {
    points: [Qy(t, n, r, i), Qy(t, n, r, a)],
    cx: t,
    cy: n,
    radius: r,
    startAngle: i,
    endAngle: a,
  };
}
var ob, sb, cb, lb, ub, db, fb;
function pb() {
  return (
    (pb = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    pb.apply(null, arguments)
  );
}
function mb(e, t) {
  return (
    (t ||= e.slice(0)),
    Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }))
  );
}
var hb = (e, t) => pu(t - e) * Math.min(Math.abs(t - e), 359.999),
  gb = (e) => {
    var {
        cx: t,
        cy: n,
        radius: r,
        angle: i,
        sign: a,
        isExternal: o,
        cornerRadius: s,
        cornerIsExternal: c,
      } = e,
      l = s * (o ? 1 : -1) + r,
      u = Math.asin(s / l) / Xy,
      d = c ? i : i + a * u,
      f = Qy(t, n, l, d),
      p = Qy(t, n, r, d),
      m = c ? i - a * u : i;
    return {
      center: f,
      circleTangency: p,
      lineTangency: Qy(t, n, l * Math.cos(u * Xy), m),
      theta: u,
    };
  },
  _b = (e) => {
    var { cx: t, cy: n, innerRadius: r, outerRadius: i, startAngle: a, endAngle: o } = e,
      s = hb(a, o),
      c = a + s,
      l = Qy(t, n, i, a),
      u = Qy(t, n, i, c),
      d = fu(
        (ob ||= mb([
          `M `,
          `,`,
          `
    A `,
          `,`,
          `,0,
    `,
          `,`,
          `,
    `,
          `,`,
          `
  `,
        ])),
        l.x,
        l.y,
        i,
        i,
        +(Math.abs(s) > 180),
        +(a > c),
        u.x,
        u.y,
      );
    if (r > 0) {
      var f = Qy(t, n, r, a),
        p = Qy(t, n, r, c);
      d += fu(
        (sb ||= mb([
          `L `,
          `,`,
          `
            A `,
          `,`,
          `,0,
            `,
          `,`,
          `,
            `,
          `,`,
          ` Z`,
        ])),
        p.x,
        p.y,
        r,
        r,
        +(Math.abs(s) > 180),
        +(a <= c),
        f.x,
        f.y,
      );
    } else d += fu((cb ||= mb([`L `, `,`, ` Z`])), t, n);
    return d;
  },
  vb = (e) => {
    var {
        cx: t,
        cy: n,
        innerRadius: r,
        outerRadius: i,
        cornerRadius: a,
        forceCornerRadius: o,
        cornerIsExternal: s,
        startAngle: c,
        endAngle: l,
      } = e,
      u = pu(l - c),
      {
        circleTangency: d,
        lineTangency: f,
        theta: p,
      } = gb({ cx: t, cy: n, radius: i, angle: c, sign: u, cornerRadius: a, cornerIsExternal: s }),
      {
        circleTangency: m,
        lineTangency: h,
        theta: g,
      } = gb({ cx: t, cy: n, radius: i, angle: l, sign: -u, cornerRadius: a, cornerIsExternal: s }),
      _ = s ? Math.abs(c - l) : Math.abs(c - l) - p - g;
    if (_ < 0)
      return o
        ? fu(
            (lb ||= mb([
              `M `,
              `,`,
              `
        a`,
              `,`,
              `,0,0,1,`,
              `,0
        a`,
              `,`,
              `,0,0,1,`,
              `,0
      `,
            ])),
            f.x,
            f.y,
            a,
            a,
            a * 2,
            a,
            a,
            -a * 2,
          )
        : _b({ cx: t, cy: n, innerRadius: r, outerRadius: i, startAngle: c, endAngle: l });
    var v = fu(
      (ub ||= mb([
        `M `,
        `,`,
        `
    A`,
        `,`,
        `,0,0,`,
        `,`,
        `,`,
        `
    A`,
        `,`,
        `,0,`,
        `,`,
        `,`,
        `,`,
        `
    A`,
        `,`,
        `,0,0,`,
        `,`,
        `,`,
        `
  `,
      ])),
      f.x,
      f.y,
      a,
      a,
      +(u < 0),
      d.x,
      d.y,
      i,
      i,
      +(_ > 180),
      +(u < 0),
      m.x,
      m.y,
      a,
      a,
      +(u < 0),
      h.x,
      h.y,
    );
    if (r > 0) {
      var {
          circleTangency: y,
          lineTangency: b,
          theta: x,
        } = gb({
          cx: t,
          cy: n,
          radius: r,
          angle: c,
          sign: u,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s,
        }),
        {
          circleTangency: S,
          lineTangency: C,
          theta: w,
        } = gb({
          cx: t,
          cy: n,
          radius: r,
          angle: l,
          sign: -u,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s,
        }),
        T = s ? Math.abs(c - l) : Math.abs(c - l) - x - w;
      if (T < 0 && a === 0) return `${v}L${t},${n}Z`;
      v += fu(
        (db ||= mb([
          `L`,
          `,`,
          `
      A`,
          `,`,
          `,0,0,`,
          `,`,
          `,`,
          `
      A`,
          `,`,
          `,0,`,
          `,`,
          `,`,
          `,`,
          `
      A`,
          `,`,
          `,0,0,`,
          `,`,
          `,`,
          `Z`,
        ])),
        C.x,
        C.y,
        a,
        a,
        +(u < 0),
        S.x,
        S.y,
        r,
        r,
        +(T > 180),
        +(u > 0),
        y.x,
        y.y,
        a,
        a,
        +(u < 0),
        b.x,
        b.y,
      );
    } else v += fu((fb ||= mb([`L`, `,`, `Z`])), t, n);
    return v;
  },
  yb = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1,
  },
  bb = (e) => {
    var t = Pu(e, yb),
      {
        cx: n,
        cy: r,
        innerRadius: i,
        outerRadius: o,
        cornerRadius: s,
        forceCornerRadius: l,
        cornerIsExternal: u,
        startAngle: d,
        endAngle: f,
        className: p,
      } = t;
    if (o < i || d === f) return null;
    var m = c(`recharts-sector`, p),
      h = o - i,
      g = yu(s, h, 0, !0),
      _ =
        g > 0 && Math.abs(d - f) < 360
          ? vb({
              cx: n,
              cy: r,
              innerRadius: i,
              outerRadius: o,
              cornerRadius: Math.min(g, h / 2),
              forceCornerRadius: l,
              cornerIsExternal: u,
              startAngle: d,
              endAngle: f,
            })
          : _b({ cx: n, cy: r, innerRadius: i, outerRadius: o, startAngle: d, endAngle: f });
    return a.createElement(`path`, pb({}, Kc(t), { className: m, d: _ }));
  };
function xb(e, t, n) {
  if (e === `horizontal`)
    return [
      { x: t.x, y: n.top },
      { x: t.x, y: n.top + n.height },
    ];
  if (e === `vertical`)
    return [
      { x: n.left, y: t.y },
      { x: n.left + n.width, y: t.y },
    ];
  if (Du(t)) {
    if (e === `centric`) {
      var { cx: r, cy: i, innerRadius: a, outerRadius: o, angle: s } = t,
        c = Qy(r, i, a, s),
        l = Qy(r, i, o, s);
      return [
        { x: c.x, y: c.y },
        { x: l.x, y: l.y },
      ];
    }
    return ab(t);
  }
}
var Sb = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Id();
    function n(e) {
      return t.isSymbol(e) ? NaN : Number(e);
    }
    e.toNumber = n;
  }),
  Cb = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Sb();
    function n(e) {
      return e
        ? ((e = t.toNumber(e)),
          e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0)
        : e === 0
          ? e
          : 0;
    }
    e.toFinite = n;
  }),
  wb = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = Bd(),
      n = Cb();
    function r(e, r, i) {
      i && typeof i != `number` && t.isIterateeCall(e, r, i) && (r = i = void 0),
        (e = n.toFinite(e)),
        r === void 0 ? ((r = e), (e = 0)) : (r = n.toFinite(r)),
        (i = i === void 0 ? (e < r ? 1 : -1) : n.toFinite(i));
      const a = Math.max(Math.ceil((r - e) / (i || 1)), 0),
        o = Array(a);
      for (let t = 0; t < a; t++) (o[t] = e), (e += i);
      return o;
    }
    e.range = r;
  }),
  Tb = e(
    n((e, t) => {
      t.exports = wb().range;
    })(),
  ),
  Eb = (e) => e.chartData,
  Db = U([Eb], (e) => {
    var t = e.chartData == null ? 0 : e.chartData.length - 1;
    return {
      chartData: e.chartData,
      computedData: e.computedData,
      dataEndIndex: t,
      dataStartIndex: 0,
    };
  }),
  Ob = (e, t, n, r) => (r ? Db(e) : Eb(e)),
  kb = U([Ob], (e) => {
    var { chartData: t, dataStartIndex: n, dataEndIndex: r } = e;
    return t == null ? [] : t.slice(n, r + 1);
  });
U([Db], (e) => {
  var { chartData: t, dataStartIndex: n, dataEndIndex: r } = e;
  return t == null ? [] : t.slice(n, r + 1);
});
var Ab = U([Eb], (e) => {
  var { chartData: t, dataStartIndex: n, dataEndIndex: r } = e;
  return t == null ? [] : t.slice(n, r + 1);
});
function jb(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, n] = e;
    if (G(t) && G(n)) return !0;
  }
  return !1;
}
function Mb(e, t, n) {
  return n ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function Nb(e, t) {
  if (t && typeof e != `function` && Array.isArray(e) && e.length === 2) {
    var [n, r] = e,
      i,
      a;
    if (G(n)) i = n;
    else if (typeof n == `function`) return;
    if (G(r)) a = r;
    else if (typeof r == `function`) return;
    var o = [i, a];
    if (jb(o)) return o;
  }
}
function Pb(e, t, n) {
  if (!(!n && t == null)) {
    if (typeof e == `function` && t != null)
      try {
        var r = e(t, n);
        if (jb(r)) return Mb(r, t, n);
      } catch {}
    if (Array.isArray(e) && e.length === 2) {
      var [i, a] = e,
        o,
        s;
      if (i === `auto`) t != null && (o = Math.min(...t));
      else if (V(i)) o = i;
      else if (typeof i == `function`)
        try {
          t != null && (o = i(t?.[0]));
        } catch {}
      else if (typeof i == `string` && ih.test(i)) {
        var c = ih.exec(i);
        if (c == null || c[1] == null || t == null) o = void 0;
        else {
          var l = +c[1];
          o = t[0] - l;
        }
      } else o = t?.[0];
      if (a === `auto`) t != null && (s = Math.max(...t));
      else if (V(a)) s = a;
      else if (typeof a == `function`)
        try {
          t != null && (s = a(t?.[1]));
        } catch {}
      else if (typeof a == `string` && ah.test(a)) {
        var u = ah.exec(a);
        if (u == null || u[1] == null || t == null) s = void 0;
        else {
          var d = +u[1];
          s = t[1] + d;
        }
      } else s = t?.[1];
      var f = [o, s];
      if (jb(f)) return t == null ? f : Mb(f, t, n);
    }
  }
}
var X = e(
  n((e, t) => {
    (function (e) {
      var n = 1e9,
        r = {
          precision: 20,
          rounding: 4,
          toExpNeg: -7,
          toExpPos: 21,
          LN10: `2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286`,
        },
        i = !0,
        a = `[DecimalError] `,
        o = a + `Invalid argument: `,
        s = a + `Exponent out of range: `,
        c = Math.floor,
        l = Math.pow,
        u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        d,
        f = 1e7,
        p = 7,
        m = 9007199254740991,
        h = c(m / p),
        g = {};
      (g.absoluteValue = g.abs =
        function () {
          var e = new this.constructor(this);
          return (e.s &&= 1), e;
        }),
        (g.comparedTo = g.cmp =
          function (e) {
            var t,
              n,
              r,
              i,
              a = this;
            if (((e = new a.constructor(e)), a.s !== e.s)) return a.s || -e.s;
            if (a.e !== e.e) return (a.e > e.e) ^ (a.s < 0) ? 1 : -1;
            for (r = a.d.length, i = e.d.length, t = 0, n = r < i ? r : i; t < n; ++t)
              if (a.d[t] !== e.d[t]) return (a.d[t] > e.d[t]) ^ (a.s < 0) ? 1 : -1;
            return r === i ? 0 : (r > i) ^ (a.s < 0) ? 1 : -1;
          }),
        (g.decimalPlaces = g.dp =
          function () {
            var e = this,
              t = e.d.length - 1,
              n = (t - e.e) * p;
            if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) n--;
            return n < 0 ? 0 : n;
          }),
        (g.dividedBy = g.div =
          function (e) {
            return b(this, new this.constructor(e));
          }),
        (g.dividedToIntegerBy = g.idiv =
          function (e) {
            var t = this,
              n = t.constructor;
            return D(b(t, new n(e), 0, 1), n.precision);
          }),
        (g.equals = g.eq =
          function (e) {
            return !this.cmp(e);
          }),
        (g.exponent = function () {
          return S(this);
        }),
        (g.greaterThan = g.gt =
          function (e) {
            return this.cmp(e) > 0;
          }),
        (g.greaterThanOrEqualTo = g.gte =
          function (e) {
            return this.cmp(e) >= 0;
          }),
        (g.isInteger = g.isint =
          function () {
            return this.e > this.d.length - 2;
          }),
        (g.isNegative = g.isneg =
          function () {
            return this.s < 0;
          }),
        (g.isPositive = g.ispos =
          function () {
            return this.s > 0;
          }),
        (g.isZero = function () {
          return this.s === 0;
        }),
        (g.lessThan = g.lt =
          function (e) {
            return this.cmp(e) < 0;
          }),
        (g.lessThanOrEqualTo = g.lte =
          function (e) {
            return this.cmp(e) < 1;
          }),
        (g.logarithm = g.log =
          function (e) {
            var t,
              n = this,
              r = n.constructor,
              o = r.precision,
              s = o + 5;
            if (e === void 0) e = new r(10);
            else if (((e = new r(e)), e.s < 1 || e.eq(d))) throw Error(a + `NaN`);
            if (n.s < 1) throw Error(a + (n.s ? `NaN` : `-Infinity`));
            return n.eq(d) ? new r(0) : ((i = !1), (t = b(T(n, s), T(e, s), s)), (i = !0), D(t, o));
          }),
        (g.minus = g.sub =
          function (e) {
            var t = this;
            return (e = new t.constructor(e)), t.s == e.s ? O(t, e) : _(t, ((e.s = -e.s), e));
          }),
        (g.modulo = g.mod =
          function (e) {
            var t,
              n = this,
              r = n.constructor,
              o = r.precision;
            if (((e = new r(e)), !e.s)) throw Error(a + `NaN`);
            return n.s
              ? ((i = !1), (t = b(n, e, 0, 1).times(e)), (i = !0), n.minus(t))
              : D(new r(n), o);
          }),
        (g.naturalExponential = g.exp =
          function () {
            return x(this);
          }),
        (g.naturalLogarithm = g.ln =
          function () {
            return T(this);
          }),
        (g.negated = g.neg =
          function () {
            var e = new this.constructor(this);
            return (e.s = -e.s || 0), e;
          }),
        (g.plus = g.add =
          function (e) {
            var t = this;
            return (e = new t.constructor(e)), t.s == e.s ? _(t, e) : O(t, ((e.s = -e.s), e));
          }),
        (g.precision = g.sd =
          function (e) {
            var t,
              n,
              r,
              i = this;
            if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(o + e);
            if (((t = S(i) + 1), (r = i.d.length - 1), (n = r * p + 1), (r = i.d[r]), r)) {
              for (; r % 10 == 0; r /= 10) n--;
              for (r = i.d[0]; r >= 10; r /= 10) n++;
            }
            return e && t > n ? t : n;
          }),
        (g.squareRoot = g.sqrt =
          function () {
            var e,
              t,
              n,
              r,
              o,
              s,
              l,
              u = this,
              d = u.constructor;
            if (u.s < 1) {
              if (!u.s) return new d(0);
              throw Error(a + `NaN`);
            }
            for (
              e = S(u),
                i = !1,
                o = Math.sqrt(+u),
                o == 0 || o == 1 / 0
                  ? ((t = y(u.d)),
                    (t.length + e) % 2 == 0 && (t += `0`),
                    (o = Math.sqrt(t)),
                    (e = c((e + 1) / 2) - (e < 0 || e % 2)),
                    o == 1 / 0
                      ? (t = `5e` + e)
                      : ((t = o.toExponential()), (t = t.slice(0, t.indexOf(`e`) + 1) + e)),
                    (r = new d(t)))
                  : (r = new d(o.toString())),
                n = d.precision,
                o = l = n + 3;
              ;
            )
              if (
                ((s = r),
                (r = s.plus(b(u, s, l + 2)).times(0.5)),
                y(s.d).slice(0, l) === (t = y(r.d)).slice(0, l))
              ) {
                if (((t = t.slice(l - 3, l + 1)), o == l && t == `4999`)) {
                  if ((D(s, n + 1, 0), s.times(s).eq(u))) {
                    r = s;
                    break;
                  }
                } else if (t != `9999`) break;
                l += 4;
              }
            return (i = !0), D(r, n);
          }),
        (g.times = g.mul =
          function (e) {
            var t,
              n,
              r,
              a,
              o,
              s,
              c,
              l,
              u,
              d = this,
              p = d.constructor,
              m = d.d,
              h = (e = new p(e)).d;
            if (!d.s || !e.s) return new p(0);
            for (
              e.s *= d.s,
                n = d.e + e.e,
                l = m.length,
                u = h.length,
                l < u && ((o = m), (m = h), (h = o), (s = l), (l = u), (u = s)),
                o = [],
                s = l + u,
                r = s;
              r--;
            )
              o.push(0);
            for (r = u; --r >= 0; ) {
              for (t = 0, a = l + r; a > r; )
                (c = o[a] + h[r] * m[a - r - 1] + t), (o[a--] = (c % f) | 0), (t = (c / f) | 0);
              o[a] = ((o[a] + t) % f) | 0;
            }
            for (; !o[--s]; ) o.pop();
            return t ? ++n : o.shift(), (e.d = o), (e.e = n), i ? D(e, p.precision) : e;
          }),
        (g.toDecimalPlaces = g.todp =
          function (e, t) {
            var r = this,
              i = r.constructor;
            return (
              (r = new i(r)),
              e === void 0
                ? r
                : (v(e, 0, n), t === void 0 ? (t = i.rounding) : v(t, 0, 8), D(r, e + S(r) + 1, t))
            );
          }),
        (g.toExponential = function (e, t) {
          var r,
            i = this,
            a = i.constructor;
          return (
            e === void 0
              ? (r = k(i, !0))
              : (v(e, 0, n),
                t === void 0 ? (t = a.rounding) : v(t, 0, 8),
                (i = D(new a(i), e + 1, t)),
                (r = k(i, !0, e + 1))),
            r
          );
        }),
        (g.toFixed = function (e, t) {
          var r,
            i,
            a = this,
            o = a.constructor;
          return e === void 0
            ? k(a)
            : (v(e, 0, n),
              t === void 0 ? (t = o.rounding) : v(t, 0, 8),
              (i = D(new o(a), e + S(a) + 1, t)),
              (r = k(i.abs(), !1, e + S(i) + 1)),
              a.isneg() && !a.isZero() ? `-` + r : r);
        }),
        (g.toInteger = g.toint =
          function () {
            var e = this,
              t = e.constructor;
            return D(new t(e), S(e) + 1, t.rounding);
          }),
        (g.toNumber = function () {
          return +this;
        }),
        (g.toPower = g.pow =
          function (e) {
            var t,
              n,
              r,
              o,
              s,
              l,
              u = this,
              f = u.constructor,
              h = 12,
              g = +(e = new f(e));
            if (!e.s) return new f(d);
            if (((u = new f(u)), !u.s)) {
              if (e.s < 1) throw Error(a + `Infinity`);
              return u;
            }
            if (u.eq(d)) return u;
            if (((r = f.precision), e.eq(d))) return D(u, r);
            if (((t = e.e), (n = e.d.length - 1), (l = t >= n), (s = u.s), !l)) {
              if (s < 0) throw Error(a + `NaN`);
            } else if ((n = g < 0 ? -g : g) <= m) {
              for (
                o = new f(d), t = Math.ceil(r / p + 4), i = !1;
                n % 2 && ((o = o.times(u)), ee(o.d, t)), (n = c(n / 2)), n !== 0;
              )
                (u = u.times(u)), ee(u.d, t);
              return (i = !0), e.s < 0 ? new f(d).div(o) : D(o, r);
            }
            return (
              (s = s < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1),
              (u.s = 1),
              (i = !1),
              (o = e.times(T(u, r + h))),
              (i = !0),
              (o = x(o)),
              (o.s = s),
              o
            );
          }),
        (g.toPrecision = function (e, t) {
          var r,
            i,
            a = this,
            o = a.constructor;
          return (
            e === void 0
              ? ((r = S(a)), (i = k(a, r <= o.toExpNeg || r >= o.toExpPos)))
              : (v(e, 1, n),
                t === void 0 ? (t = o.rounding) : v(t, 0, 8),
                (a = D(new o(a), e, t)),
                (r = S(a)),
                (i = k(a, e <= r || r <= o.toExpNeg, e))),
            i
          );
        }),
        (g.toSignificantDigits = g.tosd =
          function (e, t) {
            var r = this,
              i = r.constructor;
            return (
              e === void 0
                ? ((e = i.precision), (t = i.rounding))
                : (v(e, 1, n), t === void 0 ? (t = i.rounding) : v(t, 0, 8)),
              D(new i(r), e, t)
            );
          }),
        (g.toString =
          g.valueOf =
          g.val =
          g.toJSON =
            function () {
              var e = this,
                t = S(e),
                n = e.constructor;
              return k(e, t <= n.toExpNeg || t >= n.toExpPos);
            });
      function _(e, t) {
        var n,
          r,
          a,
          o,
          s,
          c,
          l,
          u,
          d = e.constructor,
          m = d.precision;
        if (!e.s || !t.s) return t.s || (t = new d(e)), i ? D(t, m) : t;
        if (((l = e.d), (u = t.d), (s = e.e), (a = t.e), (l = l.slice()), (o = s - a), o)) {
          for (
            o < 0 ? ((r = l), (o = -o), (c = u.length)) : ((r = u), (a = s), (c = l.length)),
              s = Math.ceil(m / p),
              c = s > c ? s + 1 : c + 1,
              o > c && ((o = c), (r.length = 1)),
              r.reverse();
            o--;
          )
            r.push(0);
          r.reverse();
        }
        for (
          c = l.length, o = u.length, c - o < 0 && ((o = c), (r = u), (u = l), (l = r)), n = 0;
          o;
        )
          (n = ((l[--o] = l[o] + u[o] + n) / f) | 0), (l[o] %= f);
        for (n && (l.unshift(n), ++a), c = l.length; l[--c] == 0; ) l.pop();
        return (t.d = l), (t.e = a), i ? D(t, m) : t;
      }
      function v(e, t, n) {
        if (e !== ~~e || e < t || e > n) throw Error(o + e);
      }
      function y(e) {
        var t,
          n,
          r,
          i = e.length - 1,
          a = ``,
          o = e[0];
        if (i > 0) {
          for (a += o, t = 1; t < i; t++)
            (r = e[t] + ``), (n = p - r.length), n && (a += w(n)), (a += r);
          (o = e[t]), (r = o + ``), (n = p - r.length), n && (a += w(n));
        } else if (o === 0) return `0`;
        for (; o % 10 == 0; ) o /= 10;
        return a + o;
      }
      var b = (function () {
        function e(e, t) {
          var n,
            r = 0,
            i = e.length;
          for (e = e.slice(); i--; ) (n = e[i] * t + r), (e[i] = (n % f) | 0), (r = (n / f) | 0);
          return r && e.unshift(r), e;
        }
        function t(e, t, n, r) {
          var i, a;
          if (n == r)
            for (i = a = 0; i < n; i++)
              if (e[i] != t[i]) {
                a = e[i] > t[i] ? 1 : -1;
                break;
              } else a = n > r ? 1 : -1;
          return a;
        }
        function n(e, t, n) {
          for (var r = 0; n--; ) (e[n] -= r), (r = +(e[n] < t[n])), (e[n] = r * f + e[n] - t[n]);
          for (; !e[0] && e.length > 1; ) e.shift();
        }
        return function (r, i, o, s) {
          var c,
            l,
            u,
            d,
            m,
            h,
            g,
            _,
            v,
            y,
            b,
            x,
            C,
            w,
            T,
            E,
            O,
            k,
            ee = r.constructor,
            te = r.s == i.s ? 1 : -1,
            A = r.d,
            j = i.d;
          if (!r.s) return new ee(r);
          if (!i.s) throw Error(a + `Division by zero`);
          for (
            l = r.e - i.e, O = j.length, T = A.length, g = new ee(te), _ = g.d = [], u = 0;
            j[u] == (A[u] || 0);
          )
            ++u;
          if (
            (j[u] > (A[u] || 0) && --l,
            (x = o == null ? (o = ee.precision) : s ? o + (S(r) - S(i)) + 1 : o),
            x < 0)
          )
            return new ee(0);
          if (((x = (x / p + 2) | 0), (u = 0), O == 1))
            for (d = 0, j = j[0], x++; (u < T || d) && x--; u++)
              (C = d * f + (A[u] || 0)), (_[u] = (C / j) | 0), (d = (C % j) | 0);
          else {
            for (
              d = (f / (j[0] + 1)) | 0,
                d > 1 && ((j = e(j, d)), (A = e(A, d)), (O = j.length), (T = A.length)),
                w = O,
                v = A.slice(0, O),
                y = v.length;
              y < O;
            )
              v[y++] = 0;
            (k = j.slice()), k.unshift(0), (E = j[0]), j[1] >= f / 2 && ++E;
            do
              (d = 0),
                (c = t(j, v, O, y)),
                c < 0
                  ? ((b = v[0]),
                    O != y && (b = b * f + (v[1] || 0)),
                    (d = (b / E) | 0),
                    d > 1
                      ? (d >= f && (d = f - 1),
                        (m = e(j, d)),
                        (h = m.length),
                        (y = v.length),
                        (c = t(m, v, h, y)),
                        c == 1 && (d--, n(m, O < h ? k : j, h)))
                      : (d == 0 && (c = d = 1), (m = j.slice())),
                    (h = m.length),
                    h < y && m.unshift(0),
                    n(v, m, y),
                    c == -1 &&
                      ((y = v.length), (c = t(j, v, O, y)), c < 1 && (d++, n(v, O < y ? k : j, y))),
                    (y = v.length))
                  : c === 0 && (d++, (v = [0])),
                (_[u++] = d),
                c && v[0] ? (v[y++] = A[w] || 0) : ((v = [A[w]]), (y = 1));
            while ((w++ < T || v[0] !== void 0) && x--);
          }
          return _[0] || _.shift(), (g.e = l), D(g, s ? o + S(g) + 1 : o);
        };
      })();
      function x(e, t) {
        var n,
          r,
          a,
          o,
          c,
          u,
          f = 0,
          p = 0,
          m = e.constructor,
          h = m.precision;
        if (S(e) > 16) throw Error(s + S(e));
        if (!e.s) return new m(d);
        for (t == null ? ((i = !1), (u = h)) : (u = t), c = new m(0.03125); e.abs().gte(0.1); )
          (e = e.times(c)), (p += 5);
        for (
          r = ((Math.log(l(2, p)) / Math.LN10) * 2 + 5) | 0,
            u += r,
            n = a = o = new m(d),
            m.precision = u;
          ;
        ) {
          if (
            ((a = D(a.times(e), u)),
            (n = n.times(++f)),
            (c = o.plus(b(a, n, u))),
            y(c.d).slice(0, u) === y(o.d).slice(0, u))
          ) {
            for (; p--; ) o = D(o.times(o), u);
            return (m.precision = h), t == null ? ((i = !0), D(o, h)) : o;
          }
          o = c;
        }
      }
      function S(e) {
        for (var t = e.e * p, n = e.d[0]; n >= 10; n /= 10) t++;
        return t;
      }
      function C(e, t, n) {
        if (t > e.LN10.sd())
          throw ((i = !0), n && (e.precision = n), Error(a + `LN10 precision limit exceeded`));
        return D(new e(e.LN10), t);
      }
      function w(e) {
        for (var t = ``; e--; ) t += `0`;
        return t;
      }
      function T(e, t) {
        var n,
          r,
          o,
          s,
          c,
          l,
          u,
          f,
          p,
          m = 1,
          h = 10,
          g = e,
          _ = g.d,
          v = g.constructor,
          x = v.precision;
        if (g.s < 1) throw Error(a + (g.s ? `NaN` : `-Infinity`));
        if (g.eq(d)) return new v(0);
        if ((t == null ? ((i = !1), (f = x)) : (f = t), g.eq(10))) return t ?? (i = !0), C(v, f);
        if (
          ((f += h),
          (v.precision = f),
          (n = y(_)),
          (r = n.charAt(0)),
          (s = S(g)),
          Math.abs(s) < 0x5543df729c000)
        ) {
          for (; (r < 7 && r != 1) || (r == 1 && n.charAt(1) > 3); )
            (g = g.times(e)), (n = y(g.d)), (r = n.charAt(0)), m++;
          (s = S(g)), r > 1 ? ((g = new v(`0.` + n)), s++) : (g = new v(r + `.` + n.slice(1)));
        } else
          return (
            (u = C(v, f + 2, x).times(s + ``)),
            (g = T(new v(r + `.` + n.slice(1)), f - h).plus(u)),
            (v.precision = x),
            t == null ? ((i = !0), D(g, x)) : g
          );
        for (l = c = g = b(g.minus(d), g.plus(d), f), p = D(g.times(g), f), o = 3; ; ) {
          if (
            ((c = D(c.times(p), f)),
            (u = l.plus(b(c, new v(o), f))),
            y(u.d).slice(0, f) === y(l.d).slice(0, f))
          )
            return (
              (l = l.times(2)),
              s !== 0 && (l = l.plus(C(v, f + 2, x).times(s + ``))),
              (l = b(l, new v(m), f)),
              (v.precision = x),
              t == null ? ((i = !0), D(l, x)) : l
            );
          (l = u), (o += 2);
        }
      }
      function E(e, t) {
        var n, r, a;
        for (
          (n = t.indexOf(`.`)) > -1 && (t = t.replace(`.`, ``)),
            (r = t.search(/e/i)) > 0
              ? (n < 0 && (n = r), (n += +t.slice(r + 1)), (t = t.substring(0, r)))
              : n < 0 && (n = t.length),
            r = 0;
          t.charCodeAt(r) === 48;
        )
          ++r;
        for (a = t.length; t.charCodeAt(a - 1) === 48; ) --a;
        if (((t = t.slice(r, a)), t)) {
          if (
            ((a -= r),
            (n = n - r - 1),
            (e.e = c(n / p)),
            (e.d = []),
            (r = (n + 1) % p),
            n < 0 && (r += p),
            r < a)
          ) {
            for (r && e.d.push(+t.slice(0, r)), a -= p; r < a; ) e.d.push(+t.slice(r, (r += p)));
            (t = t.slice(r)), (r = p - t.length);
          } else r -= a;
          for (; r--; ) t += `0`;
          if ((e.d.push(+t), i && (e.e > h || e.e < -h))) throw Error(s + n);
        } else (e.s = 0), (e.e = 0), (e.d = [0]);
        return e;
      }
      function D(e, t, n) {
        var r,
          a,
          o,
          u,
          d,
          m,
          g,
          _,
          v = e.d;
        for (u = 1, o = v[0]; o >= 10; o /= 10) u++;
        if (((r = t - u), r < 0)) (r += p), (a = t), (g = v[(_ = 0)]);
        else {
          if (((_ = Math.ceil((r + 1) / p)), (o = v.length), _ >= o)) return e;
          for (g = o = v[_], u = 1; o >= 10; o /= 10) u++;
          (r %= p), (a = r - p + u);
        }
        if (
          (n !== void 0 &&
            ((o = l(10, u - a - 1)),
            (d = ((g / o) % 10) | 0),
            (m = t < 0 || v[_ + 1] !== void 0 || g % o),
            (m =
              n < 4
                ? (d || m) && (n == 0 || n == (e.s < 0 ? 3 : 2))
                : d > 5 ||
                  (d == 5 &&
                    (n == 4 ||
                      m ||
                      (n == 6 && ((r > 0 ? (a > 0 ? g / l(10, u - a) : 0) : v[_ - 1]) % 10) & 1) ||
                      n == (e.s < 0 ? 8 : 7))))),
          t < 1 || !v[0])
        )
          return (
            m
              ? ((o = S(e)),
                (v.length = 1),
                (t = t - o - 1),
                (v[0] = l(10, (p - (t % p)) % p)),
                (e.e = c(-t / p) || 0))
              : ((v.length = 1), (v[0] = e.e = e.s = 0)),
            e
          );
        if (
          (r == 0
            ? ((v.length = _), (o = 1), _--)
            : ((v.length = _ + 1),
              (o = l(10, p - r)),
              (v[_] = a > 0 ? (((g / l(10, u - a)) % l(10, a)) | 0) * o : 0)),
          m)
        )
          for (;;)
            if (_ == 0) {
              (v[0] += o) == f && ((v[0] = 1), ++e.e);
              break;
            } else {
              if (((v[_] += o), v[_] != f)) break;
              (v[_--] = 0), (o = 1);
            }
        for (r = v.length; v[--r] === 0; ) v.pop();
        if (i && (e.e > h || e.e < -h)) throw Error(s + S(e));
        return e;
      }
      function O(e, t) {
        var n,
          r,
          a,
          o,
          s,
          c,
          l,
          u,
          d,
          m,
          h = e.constructor,
          g = h.precision;
        if (!e.s || !t.s) return t.s ? (t.s = -t.s) : (t = new h(e)), i ? D(t, g) : t;
        if (((l = e.d), (m = t.d), (r = t.e), (u = e.e), (l = l.slice()), (s = u - r), s)) {
          for (
            d = s < 0,
              d ? ((n = l), (s = -s), (c = m.length)) : ((n = m), (r = u), (c = l.length)),
              a = Math.max(Math.ceil(g / p), c) + 2,
              s > a && ((s = a), (n.length = 1)),
              n.reverse(),
              a = s;
            a--;
          )
            n.push(0);
          n.reverse();
        } else {
          for (a = l.length, c = m.length, d = a < c, d && (c = a), a = 0; a < c; a++)
            if (l[a] != m[a]) {
              d = l[a] < m[a];
              break;
            }
          s = 0;
        }
        for (
          d && ((n = l), (l = m), (m = n), (t.s = -t.s)), c = l.length, a = m.length - c;
          a > 0;
          --a
        )
          l[c++] = 0;
        for (a = m.length; a > s; ) {
          if (l[--a] < m[a]) {
            for (o = a; o && l[--o] === 0; ) l[o] = f - 1;
            --l[o], (l[a] += f);
          }
          l[a] -= m[a];
        }
        for (; l[--c] === 0; ) l.pop();
        for (; l[0] === 0; l.shift()) --r;
        return l[0] ? ((t.d = l), (t.e = r), i ? D(t, g) : t) : new h(0);
      }
      function k(e, t, n) {
        var r,
          i = S(e),
          a = y(e.d),
          o = a.length;
        return (
          t
            ? (n && (r = n - o) > 0
                ? (a = a.charAt(0) + `.` + a.slice(1) + w(r))
                : o > 1 && (a = a.charAt(0) + `.` + a.slice(1)),
              (a = a + (i < 0 ? `e` : `e+`) + i))
            : i < 0
              ? ((a = `0.` + w(-i - 1) + a), n && (r = n - o) > 0 && (a += w(r)))
              : i >= o
                ? ((a += w(i + 1 - o)), n && (r = n - i - 1) > 0 && (a = a + `.` + w(r)))
                : ((r = i + 1) < o && (a = a.slice(0, r) + `.` + a.slice(r)),
                  n && (r = n - o) > 0 && (i + 1 === o && (a += `.`), (a += w(r)))),
          e.s < 0 ? `-` + a : a
        );
      }
      function ee(e, t) {
        if (e.length > t) return (e.length = t), !0;
      }
      function te(e) {
        var t, n, r;
        function i(e) {
          var t = this;
          if (!(t instanceof i)) return new i(e);
          if (((t.constructor = i), e instanceof i)) {
            (t.s = e.s), (t.e = e.e), (t.d = (e = e.d) ? e.slice() : e);
            return;
          }
          if (typeof e == `number`) {
            if (e * 0 != 0) throw Error(o + e);
            if (e > 0) t.s = 1;
            else if (e < 0) (e = -e), (t.s = -1);
            else {
              (t.s = 0), (t.e = 0), (t.d = [0]);
              return;
            }
            if (e === ~~e && e < 1e7) {
              (t.e = 0), (t.d = [e]);
              return;
            }
            return E(t, e.toString());
          } else if (typeof e != `string`) throw Error(o + e);
          if ((e.charCodeAt(0) === 45 ? ((e = e.slice(1)), (t.s = -1)) : (t.s = 1), u.test(e)))
            E(t, e);
          else throw Error(o + e);
        }
        if (
          ((i.prototype = g),
          (i.ROUND_UP = 0),
          (i.ROUND_DOWN = 1),
          (i.ROUND_CEIL = 2),
          (i.ROUND_FLOOR = 3),
          (i.ROUND_HALF_UP = 4),
          (i.ROUND_HALF_DOWN = 5),
          (i.ROUND_HALF_EVEN = 6),
          (i.ROUND_HALF_CEIL = 7),
          (i.ROUND_HALF_FLOOR = 8),
          (i.clone = te),
          (i.config = i.set = A),
          e === void 0 && (e = {}),
          e)
        )
          for (r = [`precision`, `rounding`, `toExpNeg`, `toExpPos`, `LN10`], t = 0; t < r.length; )
            e.hasOwnProperty((n = r[t++])) || (e[n] = this[n]);
        return i.config(e), i;
      }
      function A(e) {
        if (!e || typeof e != `object`) throw Error(a + `Object expected`);
        var t,
          r,
          i,
          s = [`precision`, 1, n, `rounding`, 0, 8, `toExpNeg`, -1 / 0, 0, `toExpPos`, 0, 1 / 0];
        for (t = 0; t < s.length; t += 3)
          if ((i = e[(r = s[t])]) !== void 0)
            if (c(i) === i && i >= s[t + 1] && i <= s[t + 2]) this[r] = i;
            else throw Error(o + r + `: ` + i);
        if ((i = e[(r = `LN10`)]) !== void 0)
          if (i == Math.LN10) this[r] = new this(i);
          else throw Error(o + r + `: ` + i);
        return this;
      }
      (r = te(r)),
        (r.default = r.Decimal = r),
        (d = new r(1)),
        typeof define == `function` && define.amd
          ? define(function () {
              return r;
            })
          : t !== void 0 && t.exports
            ? (t.exports = r)
            : ((e ||=
                typeof self < `u` && self && self.self == self ? self : Function(`return this`)()),
              (e.Decimal = r));
    })(e);
  })(),
);
function Fb(e) {
  return e === 0 ? 1 : Math.floor(new X.default(e).abs().log(10).toNumber()) + 1;
}
function Ib(e, t, n) {
  for (var r = new X.default(e), i = 0, a = []; r.lt(t) && i < 1e5; )
    a.push(r.toNumber()), (r = r.add(n)), i++;
  return a;
}
var Lb = (e) => {
    var [t, n] = e,
      [r, i] = [t, n];
    return t > n && ([r, i] = [n, t]), [r, i];
  },
  Rb = (e, t, n) => {
    if (e.lte(0)) return new X.default(0);
    var r = Fb(e.toNumber()),
      i = new X.default(10).pow(r),
      a = e.div(i),
      o = r === 1 ? 0.1 : 0.05,
      s = new X.default(Math.ceil(a.div(o).toNumber())).add(n).mul(o).mul(i);
    return t ? new X.default(s.toNumber()) : new X.default(Math.ceil(s.toNumber()));
  },
  zb = (e, t, n) => {
    if (e.lte(0)) return new X.default(0);
    var r = [1, 2, 2.5, 5],
      i = e.toNumber(),
      a = Math.floor(new X.default(i).abs().log(10).toNumber()),
      o = new X.default(10).pow(a),
      s = e.div(o).toNumber(),
      c = r.findIndex((e) => e >= s - 1e-10);
    if ((c === -1 && ((o = o.mul(10)), (c = 0)), (c += n), c >= r.length)) {
      var l = Math.floor(c / r.length);
      (c %= r.length), (o = o.mul(new X.default(10).pow(l)));
    }
    var u = new X.default(r[c] ?? 1).mul(o);
    return t ? u : new X.default(Math.ceil(u.toNumber()));
  },
  Bb = (e, t, n) => {
    var r = new X.default(1),
      i = new X.default(e);
    if (!i.isint() && n) {
      var a = Math.abs(e);
      a < 1
        ? ((r = new X.default(10).pow(Fb(e) - 1)),
          (i = new X.default(Math.floor(i.div(r).toNumber())).mul(r)))
        : a > 1 && (i = new X.default(Math.floor(e)));
    } else
      e === 0
        ? (i = new X.default(Math.floor((t - 1) / 2)))
        : n || (i = new X.default(Math.floor(e)));
    for (var o = Math.floor((t - 1) / 2), s = [], c = 0; c < t; c++)
      s.push(i.add(new X.default(c - o).mul(r)).toNumber());
    return s;
  },
  Vb = function (e, t, n, r) {
    var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0,
      a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Rb;
    if (!Number.isFinite((t - e) / (n - 1)))
      return { step: new X.default(0), tickMin: new X.default(0), tickMax: new X.default(0) };
    var o = a(new X.default(t).sub(e).div(n - 1), r, i),
      s;
    e <= 0 && t >= 0
      ? (s = new X.default(0))
      : ((s = new X.default(e).add(t).div(2)), (s = s.sub(new X.default(s).mod(o))));
    var c = Math.ceil(s.sub(e).div(o).toNumber()),
      l = Math.ceil(new X.default(t).sub(s).div(o).toNumber()),
      u = c + l + 1;
    return u > n
      ? Vb(e, t, n, r, i + 1, a)
      : (u < n && ((l = t > 0 ? l + (n - u) : l), (c = t > 0 ? c : c + (n - u))),
        {
          step: o,
          tickMin: s.sub(new X.default(c).mul(o)),
          tickMax: s.add(new X.default(l).mul(o)),
        });
  },
  Hb = function (e) {
    var [t, n] = e,
      r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
      i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
      a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : `auto`,
      o = Math.max(r, 2),
      [s, c] = Lb([t, n]);
    if (s === -1 / 0 || c === 1 / 0) {
      var l = c === 1 / 0 ? [s, ...Array(r - 1).fill(1 / 0)] : [...Array(r - 1).fill(-1 / 0), c];
      return t > n ? l.reverse() : l;
    }
    if (s === c) return Bb(s, r, i);
    var { step: u, tickMin: d, tickMax: f } = Vb(s, c, o, i, 0, a === `snap125` ? zb : Rb),
      p = Ib(d, f.add(new X.default(0.1).mul(u)), u);
    return t > n ? p.reverse() : p;
  },
  Ub = function (e, t) {
    var [n, r] = e,
      i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
      a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : `auto`,
      [o, s] = Lb([n, r]);
    if (o === -1 / 0 || s === 1 / 0) return [n, r];
    if (o === s) return [o];
    var c = a === `snap125` ? zb : Rb,
      l = Math.max(t, 2),
      u = c(new X.default(s).sub(o).div(l - 1), i, 0),
      d = [...Ib(new X.default(o), new X.default(s), u), s];
    return i === !1 && (d = d.map((e) => Math.round(e))), n > r ? d.reverse() : d;
  },
  Wb = (e) => e.rootProps.barCategoryGap,
  Gb = (e) => e.rootProps.stackOffset,
  Kb = (e) => e.rootProps.reverseStackOrder,
  qb = (e) => e.options.chartName,
  Jb = (e) => e.rootProps.syncId,
  Yb = (e) => e.rootProps.syncMethod,
  Xb = (e) => e.options.eventEmitter,
  Zb = {
    grid: -100,
    barBackground: -50,
    area: 100,
    cursorRectangle: 200,
    bar: 300,
    line: 400,
    axis: 500,
    scatter: 600,
    activeBar: 1e3,
    cursorLine: 1100,
    activeDot: 1200,
    label: 2e3,
  },
  Qb = {
    allowDecimals: !1,
    allowDuplicatedCategory: !0,
    allowDataOverflow: !1,
    angle: 0,
    angleAxisId: 0,
    axisLine: !0,
    axisLineType: `polygon`,
    cx: 0,
    cy: 0,
    hide: !1,
    includeHidden: !1,
    label: !1,
    niceTicks: `auto`,
    orientation: `outer`,
    reversed: !1,
    scale: `auto`,
    tick: !0,
    tickLine: !0,
    tickSize: 8,
    type: `auto`,
    zIndex: Zb.axis,
  },
  $b = {
    allowDataOverflow: !1,
    allowDecimals: !1,
    allowDuplicatedCategory: !0,
    angle: 0,
    axisLine: !0,
    includeHidden: !1,
    hide: !1,
    niceTicks: `auto`,
    label: !1,
    orientation: `right`,
    radiusAxisId: 0,
    reversed: !1,
    scale: `auto`,
    stroke: `#ccc`,
    tick: !0,
    tickCount: 5,
    tickLine: !0,
    type: `auto`,
    zIndex: Zb.axis,
  },
  ex = (e, t) => {
    if (!(!e || !t)) return e != null && e.reversed ? [t[1], t[0]] : t;
  };
function tx(e, t, n) {
  if (n !== `auto`) return n;
  if (e != null) return Qm(e, t) ? `category` : `number`;
}
function nx(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function rx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? nx(Object(n), !0).forEach(function (t) {
          ix(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : nx(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function ix(e, t, n) {
  return (
    (t = ax(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function ax(e) {
  var t = ox(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function ox(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var sx = {
    allowDataOverflow: Qb.allowDataOverflow,
    allowDecimals: Qb.allowDecimals,
    allowDuplicatedCategory: !1,
    dataKey: void 0,
    domain: void 0,
    id: Qb.angleAxisId,
    includeHidden: !1,
    name: void 0,
    reversed: Qb.reversed,
    scale: Qb.scale,
    tick: Qb.tick,
    tickCount: void 0,
    ticks: void 0,
    type: Qb.type,
    unit: void 0,
    niceTicks: `auto`,
  },
  cx = {
    allowDataOverflow: $b.allowDataOverflow,
    allowDecimals: $b.allowDecimals,
    allowDuplicatedCategory: $b.allowDuplicatedCategory,
    dataKey: void 0,
    domain: void 0,
    id: $b.radiusAxisId,
    includeHidden: $b.includeHidden,
    name: void 0,
    reversed: $b.reversed,
    scale: $b.scale,
    tick: $b.tick,
    tickCount: $b.tickCount,
    ticks: void 0,
    type: $b.type,
    unit: void 0,
    niceTicks: `auto`,
  },
  lx = U(
    [
      (e, t) => {
        if (t != null) return e.polarAxis.angleAxis[t];
      },
      dg,
    ],
    (e, t) => {
      if (e != null) return e;
      var n = tx(t, `angleAxis`, sx.type) ?? `category`;
      return rx(rx({}, sx), {}, { type: n });
    },
  ),
  ux = U([(e, t) => e.polarAxis.radiusAxis[t], dg], (e, t) => {
    if (e != null) return e;
    var n = tx(t, `radiusAxis`, cx.type) ?? `category`;
    return rx(rx({}, cx), {}, { type: n });
  }),
  dx = (e) => e.polarOptions,
  fx = U([uh, dh, Dh], $y),
  px = U([dx, fx], (e, t) => {
    if (e != null) return yu(e.innerRadius, t, 0);
  }),
  mx = U([dx, fx], (e, t) => {
    if (e != null) return yu(e.outerRadius, t, t * 0.8);
  }),
  hx = U([dx], (e) => {
    if (e == null) return [0, 0];
    var { startAngle: t, endAngle: n } = e;
    return [t, n];
  });
U([lx, hx], ex);
var gx = U([fx, px, mx], (e, t, n) => {
  if (!(e == null || t == null || n == null)) return [t, n];
});
U([ux, gx], ex);
var _x = U([q, dx, px, mx, uh, dh], (e, t, n, r, i, a) => {
    if (!((e !== `centric` && e !== `radial`) || t == null || n == null || r == null)) {
      var { cx: o, cy: s, startAngle: c, endAngle: l } = t;
      return {
        cx: yu(o, i, i / 2),
        cy: yu(s, a, a / 2),
        innerRadius: n,
        outerRadius: r,
        startAngle: c,
        endAngle: l,
        clockWise: !1,
      };
    }
  }),
  vx = (e, t) => t,
  yx = (e, t, n) => n;
function bx(e) {
  return e?.id;
}
function xx(e, t, n) {
  var { chartData: r = [] } = t,
    { allowDuplicatedCategory: i, dataKey: a } = n,
    o = new Map();
  return (
    e.forEach((e) => {
      var t = e.data ?? r;
      if (!(t == null || t.length === 0)) {
        var n = bx(e);
        t.forEach((t, r) => {
          var s = a == null || i ? r : String(K(t, a, null)),
            c = K(t, e.dataKey, 0),
            l = o.has(s) ? o.get(s) : {};
          Object.assign(l, { [n]: c }), o.set(s, l);
        });
      }
    }),
    Array.from(o.values())
  );
}
function Sx(e) {
  return `stackId` in e && e.stackId != null && e.dataKey != null;
}
var Cx = (e, t) => (e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1]);
function wx(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function Tx(e, t) {
  if (e.length === t.length) {
    for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
    return !0;
  }
  return !1;
}
var Ex = (e) => {
    var t = q(e);
    return t === `horizontal`
      ? `xAxis`
      : t === `vertical`
        ? `yAxis`
        : t === `centric`
          ? `angleAxis`
          : `radiusAxis`;
  },
  Dx = (e) => e.tooltip.settings.axisId;
function Ox(e) {
  if (e != null) {
    var t = e.ticks,
      n = e.bandwidth,
      r = e.range(),
      i = [Math.min(...r), Math.max(...r)];
    return {
      domain: () => e.domain(),
      range: (function (e) {
        function t() {
          return e.apply(this, arguments);
        }
        return (
          (t.toString = function () {
            return e.toString();
          }),
          t
        );
      })(() => i),
      rangeMin: () => i[0],
      rangeMax: () => i[1],
      isInRange(e) {
        var t = i[0],
          n = i[1];
        return t <= n ? e >= t && e <= n : e >= n && e <= t;
      },
      bandwidth: n ? () => n.call(e) : void 0,
      ticks: t ? (n) => t.call(e, n) : void 0,
      map: (t, n) => {
        var r = e(t);
        if (r != null) {
          if (e.bandwidth && n != null && n.position) {
            var i = e.bandwidth();
            switch (n.position) {
              case `middle`:
                r += i / 2;
                break;
              case `end`:
                r += i;
                break;
              default:
                break;
            }
          }
          return r;
        }
      },
    };
  }
}
var kx = (e, t) => {
  if (t != null)
    switch (e) {
      case `linear`:
        if (!jb(t)) {
          for (var n, r, i = 0; i < t.length; i++) {
            var a = t[i];
            G(a) && ((n === void 0 || a < n) && (n = a), (r === void 0 || a > r) && (r = a));
          }
          return n !== void 0 && r !== void 0 ? [n, r] : void 0;
        }
        return t;
      default:
        return t;
    }
};
function Ax(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function jx(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Mx(e) {
  let t, n, r;
  e.length === 2
    ? ((t = e === Ax || e === jx ? e : Nx), (n = e), (r = e))
    : ((t = Ax), (n = (t, n) => Ax(e(t), n)), (r = (t, n) => e(t) - n));
  function i(e, r, i = 0, a = e.length) {
    if (i < a) {
      if (t(r, r) !== 0) return a;
      do {
        const t = (i + a) >>> 1;
        n(e[t], r) < 0 ? (i = t + 1) : (a = t);
      } while (i < a);
    }
    return i;
  }
  function a(e, r, i = 0, a = e.length) {
    if (i < a) {
      if (t(r, r) !== 0) return a;
      do {
        const t = (i + a) >>> 1;
        n(e[t], r) <= 0 ? (i = t + 1) : (a = t);
      } while (i < a);
    }
    return i;
  }
  function o(e, t, n = 0, a = e.length) {
    const o = i(e, t, n, a - 1);
    return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
  }
  return { left: i, center: o, right: a };
}
function Nx() {
  return 0;
}
function Px(e) {
  return e === null ? NaN : +e;
}
function* Fx(e, t) {
  if (t === void 0) for (let t of e) t != null && (t = +t) >= t && (yield t);
  else {
    let n = -1;
    for (let r of e) (r = t(r, ++n, e)) != null && (r = +r) >= r && (yield r);
  }
}
var Ix = Mx(Ax),
  Lx = Ix.right;
Ix.left, Mx(Px).center;
var Rx = class extends Map {
  constructor(e, t = Hx) {
    if (
      (super(),
      Object.defineProperties(this, { _intern: { value: new Map() }, _key: { value: t } }),
      e != null)
    )
      for (const [t, n] of e) this.set(t, n);
  }
  get(e) {
    return super.get(zx(this, e));
  }
  has(e) {
    return super.has(zx(this, e));
  }
  set(e, t) {
    return super.set(Bx(this, e), t);
  }
  delete(e) {
    return super.delete(Vx(this, e));
  }
};
function zx({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : n;
}
function Bx({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function Vx({ _intern: e, _key: t }, n) {
  const r = t(n);
  return e.has(r) && ((n = e.get(r)), e.delete(r)), n;
}
function Hx(e) {
  return typeof e == `object` && e ? e.valueOf() : e;
}
function Ux(e = Ax) {
  if (e === Ax) return Wx;
  if (typeof e != `function`) throw TypeError(`compare is not a function`);
  return (t, n) => {
    const r = e(t, n);
    return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
  };
}
function Wx(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : +(e > t));
}
var Gx = Math.sqrt(50),
  Kx = Math.sqrt(10),
  qx = Math.sqrt(2);
function Jx(e, t, n) {
  let r = (t - e) / Math.max(0, n),
    i = Math.floor(Math.log10(r)),
    a = r / 10 ** i,
    o = a >= Gx ? 10 : a >= Kx ? 5 : a >= qx ? 2 : 1,
    s,
    c,
    l;
  return (
    i < 0
      ? ((l = 10 ** -i / o),
        (s = Math.round(e * l)),
        (c = Math.round(t * l)),
        s / l < e && ++s,
        c / l > t && --c,
        (l = -l))
      : ((l = 10 ** i * o),
        (s = Math.round(e / l)),
        (c = Math.round(t / l)),
        s * l < e && ++s,
        c * l > t && --c),
    c < s && 0.5 <= n && n < 2 ? Jx(e, t, n * 2) : [s, c, l]
  );
}
function Yx(e, t, n) {
  if (((t = +t), (e = +e), (n = +n), !(n > 0))) return [];
  if (e === t) return [e];
  const r = t < e,
    [i, a, o] = r ? Jx(t, e, n) : Jx(e, t, n);
  if (!(a >= i)) return [];
  const s = a - i + 1,
    c = Array(s);
  if (r)
    if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
    else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
  else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
  else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
  return c;
}
function Xx(e, t, n) {
  return (t = +t), (e = +e), (n = +n), Jx(e, t, n)[2];
}
function Zx(e, t, n) {
  (t = +t), (e = +e), (n = +n);
  const r = t < e,
    i = r ? Xx(t, e, n) : Xx(e, t, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Qx(e, t) {
  let n;
  if (t === void 0) for (const t of e) t != null && (n < t || (n === void 0 && t >= t)) && (n = t);
  else {
    let r = -1;
    for (let i of e) (i = t(i, ++r, e)) != null && (n < i || (n === void 0 && i >= i)) && (n = i);
  }
  return n;
}
function $x(e, t) {
  let n;
  if (t === void 0) for (const t of e) t != null && (n > t || (n === void 0 && t >= t)) && (n = t);
  else {
    let r = -1;
    for (let i of e) (i = t(i, ++r, e)) != null && (n > i || (n === void 0 && i >= i)) && (n = i);
  }
  return n;
}
function eS(e, t, n = 0, r = 1 / 0, i) {
  if (
    ((t = Math.floor(t)),
    (n = Math.floor(Math.max(0, n))),
    (r = Math.floor(Math.min(e.length - 1, r))),
    !(n <= t && t <= r))
  )
    return e;
  for (i = i === void 0 ? Wx : Ux(i); r > n; ) {
    if (r - n > 600) {
      const a = r - n + 1,
        o = t - n + 1,
        s = Math.log(a),
        c = 0.5 * Math.exp((2 * s) / 3),
        l = 0.5 * Math.sqrt((s * c * (a - c)) / a) * (o - a / 2 < 0 ? -1 : 1),
        u = Math.max(n, Math.floor(t - (o * c) / a + l)),
        d = Math.min(r, Math.floor(t + ((a - o) * c) / a + l));
      eS(e, t, u, d, i);
    }
    let a = e[t],
      o = n,
      s = r;
    for (tS(e, n, t), i(e[r], a) > 0 && tS(e, n, r); o < s; ) {
      for (tS(e, o, s), ++o, --s; i(e[o], a) < 0; ) ++o;
      for (; i(e[s], a) > 0; ) --s;
    }
    i(e[n], a) === 0 ? tS(e, n, s) : (++s, tS(e, s, r)),
      s <= t && (n = s + 1),
      t <= s && (r = s - 1);
  }
  return e;
}
function tS(e, t, n) {
  const r = e[t];
  (e[t] = e[n]), (e[n] = r);
}
function nS(e, t, n) {
  if (((e = Float64Array.from(Fx(e, n))), !(!(r = e.length) || isNaN((t = +t))))) {
    if (t <= 0 || r < 2) return $x(e);
    if (t >= 1) return Qx(e);
    var r,
      i = (r - 1) * t,
      a = Math.floor(i),
      o = Qx(eS(e, a).subarray(0, a + 1));
    return o + ($x(e.subarray(a + 1)) - o) * (i - a);
  }
}
function rS(e, t, n = Px) {
  if (!(!(r = e.length) || isNaN((t = +t)))) {
    if (t <= 0 || r < 2) return +n(e[0], 0, e);
    if (t >= 1) return +n(e[r - 1], r - 1, e);
    var r,
      i = (r - 1) * t,
      a = Math.floor(i),
      o = +n(e[a], a, e);
    return o + (+n(e[a + 1], a + 1, e) - o) * (i - a);
  }
}
function iS(e, t, n) {
  (e = +e), (t = +t), (n = (i = arguments.length) < 2 ? ((t = e), (e = 0), 1) : i < 3 ? 1 : +n);
  for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, a = Array(i); ++r < i; )
    a[r] = e + r * n;
  return a;
}
function aS(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function oS(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      typeof e == `function` ? this.interpolator(e) : this.range(e);
      break;
    default:
      this.domain(e), typeof t == `function` ? this.interpolator(t) : this.range(t);
      break;
  }
  return this;
}
var sS = Symbol(`implicit`);
function cS() {
  var e = new Rx(),
    t = [],
    n = [],
    r = sS;
  function i(i) {
    let a = e.get(i);
    if (a === void 0) {
      if (r !== sS) return r;
      e.set(i, (a = t.push(i) - 1));
    }
    return n[a % n.length];
  }
  return (
    (i.domain = function (n) {
      if (!arguments.length) return t.slice();
      (t = []), (e = new Rx());
      for (const r of n) e.has(r) || e.set(r, t.push(r) - 1);
      return i;
    }),
    (i.range = function (e) {
      return arguments.length ? ((n = Array.from(e)), i) : n.slice();
    }),
    (i.unknown = function (e) {
      return arguments.length ? ((r = e), i) : r;
    }),
    (i.copy = function () {
      return cS(t, n).unknown(r);
    }),
    aS.apply(i, arguments),
    i
  );
}
function lS() {
  var e = cS().unknown(void 0),
    t = e.domain,
    n = e.range,
    r = 0,
    i = 1,
    a,
    o,
    s = !1,
    c = 0,
    l = 0,
    u = 0.5;
  delete e.unknown;
  function d() {
    var e = t().length,
      d = i < r,
      f = d ? i : r,
      p = d ? r : i;
    (a = (p - f) / Math.max(1, e - c + l * 2)),
      s && (a = Math.floor(a)),
      (f += (p - f - a * (e - c)) * u),
      (o = a * (1 - c)),
      s && ((f = Math.round(f)), (o = Math.round(o)));
    var m = iS(e).map(function (e) {
      return f + a * e;
    });
    return n(d ? m.reverse() : m);
  }
  return (
    (e.domain = function (e) {
      return arguments.length ? (t(e), d()) : t();
    }),
    (e.range = function (e) {
      return arguments.length ? (([r, i] = e), (r = +r), (i = +i), d()) : [r, i];
    }),
    (e.rangeRound = function (e) {
      return ([r, i] = e), (r = +r), (i = +i), (s = !0), d();
    }),
    (e.bandwidth = function () {
      return o;
    }),
    (e.step = function () {
      return a;
    }),
    (e.round = function (e) {
      return arguments.length ? ((s = !!e), d()) : s;
    }),
    (e.padding = function (e) {
      return arguments.length ? ((c = Math.min(1, (l = +e))), d()) : c;
    }),
    (e.paddingInner = function (e) {
      return arguments.length ? ((c = Math.min(1, e)), d()) : c;
    }),
    (e.paddingOuter = function (e) {
      return arguments.length ? ((l = +e), d()) : l;
    }),
    (e.align = function (e) {
      return arguments.length ? ((u = Math.max(0, Math.min(1, e))), d()) : u;
    }),
    (e.copy = function () {
      return lS(t(), [r, i]).round(s).paddingInner(c).paddingOuter(l).align(u);
    }),
    aS.apply(d(), arguments)
  );
}
function uS(e) {
  var t = e.copy;
  return (
    (e.padding = e.paddingOuter),
    delete e.paddingInner,
    delete e.paddingOuter,
    (e.copy = function () {
      return uS(t());
    }),
    e
  );
}
function dS() {
  return uS(lS.apply(null, arguments).paddingInner(1));
}
function fS(e, t, n) {
  (e.prototype = t.prototype = n), (n.constructor = e);
}
function pS(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function mS() {}
var hS = 0.7,
  gS = 1 / hS,
  _S = `\\s*([+-]?\\d+)\\s*`,
  vS = `\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*`,
  yS = `\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*`,
  bS = /^#([0-9a-f]{3,8})$/,
  xS = RegExp(`^rgb\\(${_S},${_S},${_S}\\)$`),
  SS = RegExp(`^rgb\\(${yS},${yS},${yS}\\)$`),
  CS = RegExp(`^rgba\\(${_S},${_S},${_S},${vS}\\)$`),
  wS = RegExp(`^rgba\\(${yS},${yS},${yS},${vS}\\)$`),
  TS = RegExp(`^hsl\\(${vS},${yS},${yS}\\)$`),
  ES = RegExp(`^hsla\\(${vS},${yS},${yS},${vS}\\)$`),
  DS = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
fS(mS, MS, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: OS,
  formatHex: OS,
  formatHex8: kS,
  formatHsl: AS,
  formatRgb: jS,
  toString: jS,
});
function OS() {
  return this.rgb().formatHex();
}
function kS() {
  return this.rgb().formatHex8();
}
function AS() {
  return GS(this).formatHsl();
}
function jS() {
  return this.rgb().formatRgb();
}
function MS(e) {
  var t, n;
  return (
    (e = (e + ``).trim().toLowerCase()),
    (t = bS.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? NS(t)
          : n === 3
            ? new LS(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : n === 8
              ? PS((t >> 24) & 255, (t >> 16) & 255, (t >> 8) & 255, (t & 255) / 255)
              : n === 4
                ? PS(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = xS.exec(e))
        ? new LS(t[1], t[2], t[3], 1)
        : (t = SS.exec(e))
          ? new LS((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, 1)
          : (t = CS.exec(e))
            ? PS(t[1], t[2], t[3], t[4])
            : (t = wS.exec(e))
              ? PS((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, t[4])
              : (t = TS.exec(e))
                ? WS(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = ES.exec(e))
                  ? WS(t[1], t[2] / 100, t[3] / 100, t[4])
                  : DS.hasOwnProperty(e)
                    ? NS(DS[e])
                    : e === `transparent`
                      ? new LS(NaN, NaN, NaN, 0)
                      : null
  );
}
function NS(e) {
  return new LS((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function PS(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new LS(e, t, n, r);
}
function FS(e) {
  return (
    e instanceof mS || (e = MS(e)), e ? ((e = e.rgb()), new LS(e.r, e.g, e.b, e.opacity)) : new LS()
  );
}
function IS(e, t, n, r) {
  return arguments.length === 1 ? FS(e) : new LS(e, t, n, r ?? 1);
}
function LS(e, t, n, r) {
  (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r);
}
fS(
  LS,
  IS,
  pS(mS, {
    brighter(e) {
      return (
        (e = e == null ? gS : gS ** +e), new LS(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? hS : hS ** +e), new LS(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new LS(HS(this.r), HS(this.g), HS(this.b), VS(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: RS,
    formatHex: RS,
    formatHex8: zS,
    formatRgb: BS,
    toString: BS,
  }),
);
function RS() {
  return `#${US(this.r)}${US(this.g)}${US(this.b)}`;
}
function zS() {
  return `#${US(this.r)}${US(this.g)}${US(this.b)}${US((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function BS() {
  const e = VS(this.opacity);
  return `${e === 1 ? `rgb(` : `rgba(`}${HS(this.r)}, ${HS(this.g)}, ${HS(this.b)}${e === 1 ? `)` : `, ${e})`}`;
}
function VS(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function HS(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function US(e) {
  return (e = HS(e)), (e < 16 ? `0` : ``) + e.toString(16);
}
function WS(e, t, n, r) {
  return (
    r <= 0 ? (e = t = n = NaN) : n <= 0 || n >= 1 ? (e = t = NaN) : t <= 0 && (e = NaN),
    new qS(e, t, n, r)
  );
}
function GS(e) {
  if (e instanceof qS) return new qS(e.h, e.s, e.l, e.opacity);
  if ((e instanceof mS || (e = MS(e)), !e)) return new qS();
  if (e instanceof qS) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    i = Math.min(t, n, r),
    a = Math.max(t, n, r),
    o = NaN,
    s = a - i,
    c = (a + i) / 2;
  return (
    s
      ? ((o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4),
        (s /= c < 0.5 ? a + i : 2 - a - i),
        (o *= 60))
      : (s = c > 0 && c < 1 ? 0 : o),
    new qS(o, s, c, e.opacity)
  );
}
function KS(e, t, n, r) {
  return arguments.length === 1 ? GS(e) : new qS(e, t, n, r ?? 1);
}
function qS(e, t, n, r) {
  (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r);
}
fS(
  qS,
  KS,
  pS(mS, {
    brighter(e) {
      return (e = e == null ? gS : gS ** +e), new qS(this.h, this.s, this.l * e, this.opacity);
    },
    darker(e) {
      return (e = e == null ? hS : hS ** +e), new qS(this.h, this.s, this.l * e, this.opacity);
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        i = 2 * n - r;
      return new LS(
        XS(e >= 240 ? e - 240 : e + 120, i, r),
        XS(e, i, r),
        XS(e < 120 ? e + 240 : e - 120, i, r),
        this.opacity,
      );
    },
    clamp() {
      return new qS(JS(this.h), YS(this.s), YS(this.l), VS(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = VS(this.opacity);
      return `${e === 1 ? `hsl(` : `hsla(`}${JS(this.h)}, ${YS(this.s) * 100}%, ${YS(this.l) * 100}%${e === 1 ? `)` : `, ${e})`}`;
    },
  }),
);
function JS(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function YS(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function XS(e, t, n) {
  return (
    (e < 60 ? t + ((n - t) * e) / 60 : e < 180 ? n : e < 240 ? t + ((n - t) * (240 - e)) / 60 : t) *
    255
  );
}
var ZS = (e) => () => e;
function QS(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function $S(e, t, n) {
  return (
    (e **= +n),
    (t = t ** +n - e),
    (n = 1 / n),
    function (r) {
      return (e + r * t) ** +n;
    }
  );
}
function eC(e) {
  return (e = +e) == 1
    ? tC
    : function (t, n) {
        return n - t ? $S(t, n, e) : ZS(isNaN(t) ? n : t);
      };
}
function tC(e, t) {
  var n = t - e;
  return n ? QS(e, n) : ZS(isNaN(e) ? t : e);
}
var nC = (function e(t) {
  var n = eC(t);
  function r(e, t) {
    var r = n((e = IS(e)).r, (t = IS(t)).r),
      i = n(e.g, t.g),
      a = n(e.b, t.b),
      o = tC(e.opacity, t.opacity);
    return function (t) {
      return (e.r = r(t)), (e.g = i(t)), (e.b = a(t)), (e.opacity = o(t)), e + ``;
    };
  }
  return (r.gamma = e), r;
})(1);
function rC(e, t) {
  t ||= [];
  var n = e ? Math.min(t.length, e.length) : 0,
    r = t.slice(),
    i;
  return function (a) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
    return r;
  };
}
function iC(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function aC(e, t) {
  var n = t ? t.length : 0,
    r = e ? Math.min(n, e.length) : 0,
    i = Array(r),
    a = Array(n),
    o;
  for (o = 0; o < r; ++o) i[o] = mC(e[o], t[o]);
  for (; o < n; ++o) a[o] = t[o];
  return function (e) {
    for (o = 0; o < r; ++o) a[o] = i[o](e);
    return a;
  };
}
function oC(e, t) {
  var n = new Date();
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return n.setTime(e * (1 - r) + t * r), n;
    }
  );
}
function sC(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
function cC(e, t) {
  var n = {},
    r = {},
    i;
  for (i in ((typeof e != `object` || !e) && (e = {}), (typeof t != `object` || !t) && (t = {}), t))
    i in e ? (n[i] = mC(e[i], t[i])) : (r[i] = t[i]);
  return function (e) {
    for (i in n) r[i] = n[i](e);
    return r;
  };
}
var lC = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  uC = new RegExp(lC.source, `g`);
function dC(e) {
  return function () {
    return e;
  };
}
function fC(e) {
  return function (t) {
    return e(t) + ``;
  };
}
function pC(e, t) {
  var n = (lC.lastIndex = uC.lastIndex = 0),
    r,
    i,
    a,
    o = -1,
    s = [],
    c = [];
  for (e += ``, t += ``; (r = lC.exec(e)) && (i = uC.exec(t)); )
    (a = i.index) > n && ((a = t.slice(n, a)), s[o] ? (s[o] += a) : (s[++o] = a)),
      (r = r[0]) === (i = i[0])
        ? s[o]
          ? (s[o] += i)
          : (s[++o] = i)
        : ((s[++o] = null), c.push({ i: o, x: sC(r, i) })),
      (n = uC.lastIndex);
  return (
    n < t.length && ((a = t.slice(n)), s[o] ? (s[o] += a) : (s[++o] = a)),
    s.length < 2
      ? c[0]
        ? fC(c[0].x)
        : dC(t)
      : ((t = c.length),
        function (e) {
          for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
          return s.join(``);
        })
  );
}
function mC(e, t) {
  var n = typeof t,
    r;
  return t == null || n === `boolean`
    ? ZS(t)
    : (n === `number`
        ? sC
        : n === `string`
          ? (r = MS(t))
            ? ((t = r), nC)
            : pC
          : t instanceof MS
            ? nC
            : t instanceof Date
              ? oC
              : iC(t)
                ? rC
                : Array.isArray(t)
                  ? aC
                  : (typeof t.valueOf != `function` && typeof t.toString != `function`) || isNaN(t)
                    ? cC
                    : sC)(e, t);
}
function hC(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return Math.round(e * (1 - n) + t * n);
    }
  );
}
function gC(e, t) {
  t === void 0 && ((t = e), (e = mC));
  for (var n = 0, r = t.length - 1, i = t[0], a = Array(r < 0 ? 0 : r); n < r; )
    a[n] = e(i, (i = t[++n]));
  return function (e) {
    var t = Math.max(0, Math.min(r - 1, Math.floor((e *= r))));
    return a[t](e - t);
  };
}
function _C(e) {
  return function () {
    return e;
  };
}
function vC(e) {
  return +e;
}
var yC = [0, 1];
function bC(e) {
  return e;
}
function xC(e, t) {
  return (t -= e = +e)
    ? function (n) {
        return (n - e) / t;
      }
    : _C(isNaN(t) ? NaN : 0.5);
}
function SC(e, t) {
  var n;
  return (
    e > t && ((n = e), (e = t), (t = n)),
    function (n) {
      return Math.max(e, Math.min(t, n));
    }
  );
}
function CC(e, t, n) {
  var r = e[0],
    i = e[1],
    a = t[0],
    o = t[1];
  return (
    i < r ? ((r = xC(i, r)), (a = n(o, a))) : ((r = xC(r, i)), (a = n(a, o))),
    function (e) {
      return a(r(e));
    }
  );
}
function wC(e, t, n) {
  var r = Math.min(e.length, t.length) - 1,
    i = Array(r),
    a = Array(r),
    o = -1;
  for (e[r] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse())); ++o < r; )
    (i[o] = xC(e[o], e[o + 1])), (a[o] = n(t[o], t[o + 1]));
  return function (t) {
    var n = Lx(e, t, 1, r) - 1;
    return a[n](i[n](t));
  };
}
function TC(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function EC() {
  var e = yC,
    t = yC,
    n = mC,
    r,
    i,
    a,
    o = bC,
    s,
    c,
    l;
  function u() {
    var n = Math.min(e.length, t.length);
    return o !== bC && (o = SC(e[0], e[n - 1])), (s = n > 2 ? wC : CC), (c = l = null), d;
  }
  function d(i) {
    return i == null || isNaN((i = +i)) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
  }
  return (
    (d.invert = function (n) {
      return o(i((l ||= s(t, e.map(r), sC))(n)));
    }),
    (d.domain = function (t) {
      return arguments.length ? ((e = Array.from(t, vC)), u()) : e.slice();
    }),
    (d.range = function (e) {
      return arguments.length ? ((t = Array.from(e)), u()) : t.slice();
    }),
    (d.rangeRound = function (e) {
      return (t = Array.from(e)), (n = hC), u();
    }),
    (d.clamp = function (e) {
      return arguments.length ? ((o = e ? !0 : bC), u()) : o !== bC;
    }),
    (d.interpolate = function (e) {
      return arguments.length ? ((n = e), u()) : n;
    }),
    (d.unknown = function (e) {
      return arguments.length ? ((a = e), d) : a;
    }),
    function (e, t) {
      return (r = e), (i = t), u();
    }
  );
}
function DC() {
  return EC()(bC, bC);
}
function OC(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString(`en`).replace(/,/g, ``)
    : e.toString(10);
}
function kC(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf(`e`),
    r = e.slice(0, n);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function AC(e) {
  return (e = kC(Math.abs(e))), e ? e[1] : NaN;
}
function jC(e, t) {
  return function (n, r) {
    for (
      var i = n.length, a = [], o = 0, s = e[0], c = 0;
      i > 0 &&
      s > 0 &&
      (c + s + 1 > r && (s = Math.max(1, r - c)),
      a.push(n.substring((i -= s), i + s)),
      !((c += s + 1) > r));
    )
      s = e[(o = (o + 1) % e.length)];
    return a.reverse().join(t);
  };
}
function MC(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (t) {
      return e[+t];
    });
  };
}
var NC = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function PC(e) {
  if (!(t = NC.exec(e))) throw Error(`invalid format: ` + e);
  var t;
  return new FC({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
PC.prototype = FC.prototype;
function FC(e) {
  (this.fill = e.fill === void 0 ? ` ` : e.fill + ``),
    (this.align = e.align === void 0 ? `>` : e.align + ``),
    (this.sign = e.sign === void 0 ? `-` : e.sign + ``),
    (this.symbol = e.symbol === void 0 ? `` : e.symbol + ``),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? `` : e.type + ``);
}
FC.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? `0` : ``) +
    (this.width === void 0 ? `` : Math.max(1, this.width | 0)) +
    (this.comma ? `,` : ``) +
    (this.precision === void 0 ? `` : `.` + Math.max(0, this.precision | 0)) +
    (this.trim ? `~` : ``) +
    this.type
  );
};
function IC(e) {
  out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n)
    switch (e[n]) {
      case `.`:
        r = i = n;
        break;
      case `0`:
        r === 0 && (r = n), (i = n);
        break;
      default:
        if (!+e[n]) break out;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var LC;
function RC(e, t) {
  var n = kC(e, t);
  if (!n) return (LC = void 0), e.toPrecision(t);
  var r = n[0],
    i = n[1],
    a = i - (LC = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    o = r.length;
  return a === o
    ? r
    : a > o
      ? r + Array(a - o + 1).join(`0`)
      : a > 0
        ? r.slice(0, a) + `.` + r.slice(a)
        : `0.` + Array(1 - a).join(`0`) + kC(e, Math.max(0, t + a - 1))[0];
}
function zC(e, t) {
  var n = kC(e, t);
  if (!n) return e + ``;
  var r = n[0],
    i = n[1];
  return i < 0
    ? `0.` + Array(-i).join(`0`) + r
    : r.length > i + 1
      ? r.slice(0, i + 1) + `.` + r.slice(i + 1)
      : r + Array(i - r.length + 2).join(`0`);
}
var BC = {
  '%': (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + ``,
  d: OC,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => zC(e * 100, t),
  r: zC,
  s: RC,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function VC(e) {
  return e;
}
var HC = Array.prototype.map,
  UC = [`y`, `z`, `a`, `f`, `p`, `n`, `µ`, `m`, ``, `k`, `M`, `G`, `T`, `P`, `E`, `Z`, `Y`];
function WC(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? VC
        : jC(HC.call(e.grouping, Number), e.thousands + ``),
    n = e.currency === void 0 ? `` : e.currency[0] + ``,
    r = e.currency === void 0 ? `` : e.currency[1] + ``,
    i = e.decimal === void 0 ? `.` : e.decimal + ``,
    a = e.numerals === void 0 ? VC : MC(HC.call(e.numerals, String)),
    o = e.percent === void 0 ? `%` : e.percent + ``,
    s = e.minus === void 0 ? `−` : e.minus + ``,
    c = e.nan === void 0 ? `NaN` : e.nan + ``;
  function l(e, l) {
    e = PC(e);
    var u = e.fill,
      d = e.align,
      f = e.sign,
      p = e.symbol,
      m = e.zero,
      h = e.width,
      g = e.comma,
      _ = e.precision,
      v = e.trim,
      y = e.type;
    y === `n` ? ((g = !0), (y = `g`)) : BC[y] || (_ === void 0 && (_ = 12), (v = !0), (y = `g`)),
      (m || (u === `0` && d === `=`)) && ((m = !0), (u = `0`), (d = `=`));
    var b =
        (l && l.prefix !== void 0 ? l.prefix : ``) +
        (p === `$` ? n : p === `#` && /[boxX]/.test(y) ? `0` + y.toLowerCase() : ``),
      x = (p === `$` ? r : /[%p]/.test(y) ? o : ``) + (l && l.suffix !== void 0 ? l.suffix : ``),
      S = BC[y],
      C = /[defgprs%]/.test(y);
    _ =
      _ === void 0
        ? 6
        : /[gprs]/.test(y)
          ? Math.max(1, Math.min(21, _))
          : Math.max(0, Math.min(20, _));
    function w(e) {
      var n = b,
        r = x,
        o,
        l,
        p;
      if (y === `c`) (r = S(e) + r), (e = ``);
      else {
        e = +e;
        var w = e < 0 || 1 / e < 0;
        if (
          ((e = isNaN(e) ? c : S(Math.abs(e), _)),
          v && (e = IC(e)),
          w && +e == 0 && f !== `+` && (w = !1),
          (n = (w ? (f === `(` ? f : s) : f === `-` || f === `(` ? `` : f) + n),
          (r =
            (y === `s` && !isNaN(e) && LC !== void 0 ? UC[8 + LC / 3] : ``) +
            r +
            (w && f === `(` ? `)` : ``)),
          C)
        ) {
          for (o = -1, l = e.length; ++o < l; )
            if (((p = e.charCodeAt(o)), 48 > p || p > 57)) {
              (r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r), (e = e.slice(0, o));
              break;
            }
        }
      }
      g && !m && (e = t(e, 1 / 0));
      var T = n.length + e.length + r.length,
        E = T < h ? Array(h - T + 1).join(u) : ``;
      switch ((g && m && ((e = t(E + e, E.length ? h - r.length : 1 / 0)), (E = ``)), d)) {
        case `<`:
          e = n + e + r + E;
          break;
        case `=`:
          e = n + E + e + r;
          break;
        case `^`:
          e = E.slice(0, (T = E.length >> 1)) + n + e + r + E.slice(T);
          break;
        default:
          e = E + n + e + r;
          break;
      }
      return a(e);
    }
    return (
      (w.toString = function () {
        return e + ``;
      }),
      w
    );
  }
  function u(e, t) {
    var n = Math.max(-8, Math.min(8, Math.floor(AC(t) / 3))) * 3,
      r = 10 ** -n,
      i = l(((e = PC(e)), (e.type = `f`), e), { suffix: UC[8 + n / 3] });
    return function (e) {
      return i(r * e);
    };
  }
  return { format: l, formatPrefix: u };
}
var GC, KC, qC;
JC({ thousands: `,`, grouping: [3], currency: [`$`, ``] });
function JC(e) {
  return (GC = WC(e)), (KC = GC.format), (qC = GC.formatPrefix), GC;
}
function YC(e) {
  return Math.max(0, -AC(Math.abs(e)));
}
function XC(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(AC(t) / 3))) * 3 - AC(Math.abs(e)));
}
function ZC(e, t) {
  return (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, AC(t) - AC(e)) + 1;
}
function QC(e, t, n, r) {
  var i = Zx(e, t, n),
    a;
  switch (((r = PC(r ?? `,f`)), r.type)) {
    case `s`:
      var o = Math.max(Math.abs(e), Math.abs(t));
      return r.precision == null && !isNaN((a = XC(i, o))) && (r.precision = a), qC(r, o);
    case ``:
    case `e`:
    case `g`:
    case `p`:
    case `r`:
      r.precision == null &&
        !isNaN((a = ZC(i, Math.max(Math.abs(e), Math.abs(t))))) &&
        (r.precision = a - (r.type === `e`));
      break;
    case `f`:
    case `%`:
      r.precision == null && !isNaN((a = YC(i))) && (r.precision = a - (r.type === `%`) * 2);
      break;
  }
  return KC(r);
}
function $C(e) {
  var t = e.domain;
  return (
    (e.ticks = function (e) {
      var n = t();
      return Yx(n[0], n[n.length - 1], e ?? 10);
    }),
    (e.tickFormat = function (e, n) {
      var r = t();
      return QC(r[0], r[r.length - 1], e ?? 10, n);
    }),
    (e.nice = function (n) {
      n ??= 10;
      var r = t(),
        i = 0,
        a = r.length - 1,
        o = r[i],
        s = r[a],
        c,
        l,
        u = 10;
      for (s < o && ((l = o), (o = s), (s = l), (l = i), (i = a), (a = l)); u-- > 0; ) {
        if (((l = Xx(o, s, n)), l === c)) return (r[i] = o), (r[a] = s), t(r);
        if (l > 0) (o = Math.floor(o / l) * l), (s = Math.ceil(s / l) * l);
        else if (l < 0) (o = Math.ceil(o * l) / l), (s = Math.floor(s * l) / l);
        else break;
        c = l;
      }
      return e;
    }),
    e
  );
}
function ew() {
  var e = DC();
  return (
    (e.copy = function () {
      return TC(e, ew());
    }),
    aS.apply(e, arguments),
    $C(e)
  );
}
function tw(e) {
  var t;
  function n(e) {
    return e == null || isNaN((e = +e)) ? t : e;
  }
  return (
    (n.invert = n),
    (n.domain = n.range =
      function (t) {
        return arguments.length ? ((e = Array.from(t, vC)), n) : e.slice();
      }),
    (n.unknown = function (e) {
      return arguments.length ? ((t = e), n) : t;
    }),
    (n.copy = function () {
      return tw(e).unknown(t);
    }),
    (e = arguments.length ? Array.from(e, vC) : [0, 1]),
    $C(n)
  );
}
function nw(e, t) {
  e = e.slice();
  var n = 0,
    r = e.length - 1,
    i = e[n],
    a = e[r],
    o;
  return (
    a < i && ((o = n), (n = r), (r = o), (o = i), (i = a), (a = o)),
    (e[n] = t.floor(i)),
    (e[r] = t.ceil(a)),
    e
  );
}
function rw(e) {
  return Math.log(e);
}
function iw(e) {
  return Math.exp(e);
}
function aw(e) {
  return -Math.log(-e);
}
function ow(e) {
  return -Math.exp(-e);
}
function sw(e) {
  return isFinite(e) ? +(`1e` + e) : e < 0 ? 0 : e;
}
function cw(e) {
  return e === 10 ? sw : e === Math.E ? Math.exp : (t) => e ** +t;
}
function lw(e) {
  return e === Math.E
    ? Math.log
    : (e === 10 && Math.log10) ||
        (e === 2 && Math.log2) ||
        ((e = Math.log(e)), (t) => Math.log(t) / e);
}
function uw(e) {
  return (t, n) => -e(-t, n);
}
function dw(e) {
  let t = e(rw, iw),
    n = t.domain,
    r = 10,
    i,
    a;
  function o() {
    return (
      (i = lw(r)), (a = cw(r)), n()[0] < 0 ? ((i = uw(i)), (a = uw(a)), e(aw, ow)) : e(rw, iw), t
    );
  }
  return (
    (t.base = function (e) {
      return arguments.length ? ((r = +e), o()) : r;
    }),
    (t.domain = function (e) {
      return arguments.length ? (n(e), o()) : n();
    }),
    (t.ticks = (e) => {
      let t = n(),
        o = t[0],
        s = t[t.length - 1],
        c = s < o;
      c && ([o, s] = [s, o]);
      let l = i(o),
        u = i(s),
        d,
        f,
        p = e == null ? 10 : +e,
        m = [];
      if (!(r % 1) && u - l < p) {
        if (((l = Math.floor(l)), (u = Math.ceil(u)), o > 0)) {
          for (; l <= u; ++l)
            for (d = 1; d < r; ++d)
              if (((f = l < 0 ? d / a(-l) : d * a(l)), !(f < o))) {
                if (f > s) break;
                m.push(f);
              }
        } else
          for (; l <= u; ++l)
            for (d = r - 1; d >= 1; --d)
              if (((f = l > 0 ? d / a(-l) : d * a(l)), !(f < o))) {
                if (f > s) break;
                m.push(f);
              }
        m.length * 2 < p && (m = Yx(o, s, p));
      } else m = Yx(l, u, Math.min(u - l, p)).map(a);
      return c ? m.reverse() : m;
    }),
    (t.tickFormat = (e, n) => {
      if (
        ((e ??= 10),
        (n ??= r === 10 ? `s` : `,`),
        typeof n != `function` &&
          (!(r % 1) && (n = PC(n)).precision == null && (n.trim = !0), (n = KC(n))),
        e === 1 / 0)
      )
        return n;
      const o = Math.max(1, (r * e) / t.ticks().length);
      return (e) => {
        let t = e / a(Math.round(i(e)));
        return t * r < r - 0.5 && (t *= r), t <= o ? n(e) : ``;
      };
    }),
    (t.nice = () =>
      n(nw(n(), { floor: (e) => a(Math.floor(i(e))), ceil: (e) => a(Math.ceil(i(e))) }))),
    t
  );
}
function fw() {
  const e = dw(EC()).domain([1, 10]);
  return (e.copy = () => TC(e, fw()).base(e.base())), aS.apply(e, arguments), e;
}
function pw(e) {
  return function (t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function mw(e) {
  return function (t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function hw(e) {
  var t = 1,
    n = e(pw(t), mw(t));
  return (
    (n.constant = function (n) {
      return arguments.length ? e(pw((t = +n)), mw(t)) : t;
    }),
    $C(n)
  );
}
function gw() {
  var e = hw(EC());
  return (
    (e.copy = function () {
      return TC(e, gw()).constant(e.constant());
    }),
    aS.apply(e, arguments)
  );
}
function _w(e) {
  return function (t) {
    return t < 0 ? -((-t) ** +e) : t ** +e;
  };
}
function vw(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function yw(e) {
  return e < 0 ? -e * e : e * e;
}
function bw(e) {
  var t = e(bC, bC),
    n = 1;
  function r() {
    return n === 1 ? e(bC, bC) : n === 0.5 ? e(vw, yw) : e(_w(n), _w(1 / n));
  }
  return (
    (t.exponent = function (e) {
      return arguments.length ? ((n = +e), r()) : n;
    }),
    $C(t)
  );
}
function xw() {
  var e = bw(EC());
  return (
    (e.copy = function () {
      return TC(e, xw()).exponent(e.exponent());
    }),
    aS.apply(e, arguments),
    e
  );
}
function Sw() {
  return xw.apply(null, arguments).exponent(0.5);
}
function Cw(e) {
  return Math.sign(e) * e * e;
}
function ww(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Tw() {
  var e = DC(),
    t = [0, 1],
    n = !1,
    r;
  function i(t) {
    var i = ww(e(t));
    return isNaN(i) ? r : n ? Math.round(i) : i;
  }
  return (
    (i.invert = function (t) {
      return e.invert(Cw(t));
    }),
    (i.domain = function (t) {
      return arguments.length ? (e.domain(t), i) : e.domain();
    }),
    (i.range = function (n) {
      return arguments.length ? (e.range((t = Array.from(n, vC)).map(Cw)), i) : t.slice();
    }),
    (i.rangeRound = function (e) {
      return i.range(e).round(!0);
    }),
    (i.round = function (e) {
      return arguments.length ? ((n = !!e), i) : n;
    }),
    (i.clamp = function (t) {
      return arguments.length ? (e.clamp(t), i) : e.clamp();
    }),
    (i.unknown = function (e) {
      return arguments.length ? ((r = e), i) : r;
    }),
    (i.copy = function () {
      return Tw(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
    }),
    aS.apply(i, arguments),
    $C(i)
  );
}
function Ew() {
  var e = [],
    t = [],
    n = [],
    r;
  function i() {
    var r = 0,
      i = Math.max(1, t.length);
    for (n = Array(i - 1); ++r < i; ) n[r - 1] = rS(e, r / i);
    return a;
  }
  function a(e) {
    return e == null || isNaN((e = +e)) ? r : t[Lx(n, e)];
  }
  return (
    (a.invertExtent = function (r) {
      var i = t.indexOf(r);
      return i < 0 ? [NaN, NaN] : [i > 0 ? n[i - 1] : e[0], i < n.length ? n[i] : e[e.length - 1]];
    }),
    (a.domain = function (t) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let n of t) n != null && !isNaN((n = +n)) && e.push(n);
      return e.sort(Ax), i();
    }),
    (a.range = function (e) {
      return arguments.length ? ((t = Array.from(e)), i()) : t.slice();
    }),
    (a.unknown = function (e) {
      return arguments.length ? ((r = e), a) : r;
    }),
    (a.quantiles = function () {
      return n.slice();
    }),
    (a.copy = function () {
      return Ew().domain(e).range(t).unknown(r);
    }),
    aS.apply(a, arguments)
  );
}
function Dw() {
  var e = 0,
    t = 1,
    n = 1,
    r = [0.5],
    i = [0, 1],
    a;
  function o(e) {
    return e != null && e <= e ? i[Lx(r, e, 0, n)] : a;
  }
  function s() {
    var i = -1;
    for (r = Array(n); ++i < n; ) r[i] = ((i + 1) * t - (i - n) * e) / (n + 1);
    return o;
  }
  return (
    (o.domain = function (n) {
      return arguments.length ? (([e, t] = n), (e = +e), (t = +t), s()) : [e, t];
    }),
    (o.range = function (e) {
      return arguments.length ? ((n = (i = Array.from(e)).length - 1), s()) : i.slice();
    }),
    (o.invertExtent = function (a) {
      var o = i.indexOf(a);
      return o < 0 ? [NaN, NaN] : o < 1 ? [e, r[0]] : o >= n ? [r[n - 1], t] : [r[o - 1], r[o]];
    }),
    (o.unknown = function (e) {
      return arguments.length && (a = e), o;
    }),
    (o.thresholds = function () {
      return r.slice();
    }),
    (o.copy = function () {
      return Dw().domain([e, t]).range(i).unknown(a);
    }),
    aS.apply($C(o), arguments)
  );
}
function Ow() {
  var e = [0.5],
    t = [0, 1],
    n,
    r = 1;
  function i(i) {
    return i != null && i <= i ? t[Lx(e, i, 0, r)] : n;
  }
  return (
    (i.domain = function (n) {
      return arguments.length
        ? ((e = Array.from(n)), (r = Math.min(e.length, t.length - 1)), i)
        : e.slice();
    }),
    (i.range = function (n) {
      return arguments.length
        ? ((t = Array.from(n)), (r = Math.min(e.length, t.length - 1)), i)
        : t.slice();
    }),
    (i.invertExtent = function (n) {
      var r = t.indexOf(n);
      return [e[r - 1], e[r]];
    }),
    (i.unknown = function (e) {
      return arguments.length ? ((n = e), i) : n;
    }),
    (i.copy = function () {
      return Ow().domain(e).range(t).unknown(n);
    }),
    aS.apply(i, arguments)
  );
}
var kw = new Date(),
  Aw = new Date();
function Z(e, t, n, r) {
  function i(t) {
    return e((t = arguments.length === 0 ? new Date() : new Date(+t))), t;
  }
  return (
    (i.floor = (t) => (e((t = new Date(+t))), t)),
    (i.ceil = (n) => (e((n = new Date(n - 1))), t(n, 1), e(n), n)),
    (i.round = (e) => {
      const t = i(e),
        n = i.ceil(e);
      return e - t < n - e ? t : n;
    }),
    (i.offset = (e, n) => (t((e = new Date(+e)), n == null ? 1 : Math.floor(n)), e)),
    (i.range = (n, r, a) => {
      const o = [];
      if (((n = i.ceil(n)), (a = a == null ? 1 : Math.floor(a)), !(n < r) || !(a > 0))) return o;
      let s;
      do o.push((s = new Date(+n))), t(n, a), e(n);
      while (s < n && n < r);
      return o;
    }),
    (i.filter = (n) =>
      Z(
        (t) => {
          if (t >= t) for (; e(t), !n(t); ) t.setTime(t - 1);
        },
        (e, r) => {
          if (e >= e)
            if (r < 0) for (; ++r <= 0; ) for (; t(e, -1), !n(e); );
            else for (; --r >= 0; ) for (; t(e, 1), !n(e); );
        },
      )),
    n &&
      ((i.count = (t, r) => (kw.setTime(+t), Aw.setTime(+r), e(kw), e(Aw), Math.floor(n(kw, Aw)))),
      (i.every = (e) => (
        (e = Math.floor(e)),
        !isFinite(e) || !(e > 0)
          ? null
          : e > 1
            ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0)
            : i
      ))),
    i
  );
}
var jw = Z(
  () => {},
  (e, t) => {
    e.setTime(+e + t);
  },
  (e, t) => t - e,
);
(jw.every = (e) => (
  (e = Math.floor(e)),
  !isFinite(e) || !(e > 0)
    ? null
    : e > 1
      ? Z(
          (t) => {
            t.setTime(Math.floor(t / e) * e);
          },
          (t, n) => {
            t.setTime(+t + n * e);
          },
          (t, n) => (n - t) / e,
        )
      : jw
)),
  jw.range;
var Mw = 1e3,
  Nw = Mw * 60,
  Pw = Nw * 60,
  Fw = Pw * 24,
  Iw = Fw * 7,
  Lw = Fw * 30,
  Rw = Fw * 365,
  zw = Z(
    (e) => {
      e.setTime(e - e.getMilliseconds());
    },
    (e, t) => {
      e.setTime(+e + t * Mw);
    },
    (e, t) => (t - e) / Mw,
    (e) => e.getUTCSeconds(),
  );
zw.range;
var Bw = Z(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * Mw);
  },
  (e, t) => {
    e.setTime(+e + t * Nw);
  },
  (e, t) => (t - e) / Nw,
  (e) => e.getMinutes(),
);
Bw.range;
var Vw = Z(
  (e) => {
    e.setUTCSeconds(0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * Nw);
  },
  (e, t) => (t - e) / Nw,
  (e) => e.getUTCMinutes(),
);
Vw.range;
var Hw = Z(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * Mw - e.getMinutes() * Nw);
  },
  (e, t) => {
    e.setTime(+e + t * Pw);
  },
  (e, t) => (t - e) / Pw,
  (e) => e.getHours(),
);
Hw.range;
var Uw = Z(
  (e) => {
    e.setUTCMinutes(0, 0, 0);
  },
  (e, t) => {
    e.setTime(+e + t * Pw);
  },
  (e, t) => (t - e) / Pw,
  (e) => e.getUTCHours(),
);
Uw.range;
var Ww = Z(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Nw) / Fw,
  (e) => e.getDate() - 1,
);
Ww.range;
var Gw = Z(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Fw,
  (e) => e.getUTCDate() - 1,
);
Gw.range;
var Kw = Z(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Fw,
  (e) => Math.floor(e / Fw),
);
Kw.range;
function qw(e) {
  return Z(
    (t) => {
      t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)), t.setHours(0, 0, 0, 0);
    },
    (e, t) => {
      e.setDate(e.getDate() + t * 7);
    },
    (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Nw) / Iw,
  );
}
var Jw = qw(0),
  Yw = qw(1),
  Xw = qw(2),
  Zw = qw(3),
  Qw = qw(4),
  $w = qw(5),
  eT = qw(6);
Jw.range, Yw.range, Xw.range, Zw.range, Qw.range, $w.range, eT.range;
function tT(e) {
  return Z(
    (t) => {
      t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)), t.setUTCHours(0, 0, 0, 0);
    },
    (e, t) => {
      e.setUTCDate(e.getUTCDate() + t * 7);
    },
    (e, t) => (t - e) / Iw,
  );
}
var nT = tT(0),
  rT = tT(1),
  iT = tT(2),
  aT = tT(3),
  oT = tT(4),
  sT = tT(5),
  cT = tT(6);
nT.range, rT.range, iT.range, aT.range, oT.range, sT.range, cT.range;
var lT = Z(
  (e) => {
    e.setDate(1), e.setHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setMonth(e.getMonth() + t);
  },
  (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
  (e) => e.getMonth(),
);
lT.range;
var uT = Z(
  (e) => {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t);
  },
  (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12,
  (e) => e.getUTCMonth(),
);
uT.range;
var dT = Z(
  (e) => {
    e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t);
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear(),
);
(dT.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : Z(
        (t) => {
          t.setFullYear(Math.floor(t.getFullYear() / e) * e),
            t.setMonth(0, 1),
            t.setHours(0, 0, 0, 0);
        },
        (t, n) => {
          t.setFullYear(t.getFullYear() + n * e);
        },
      )),
  dT.range;
var fT = Z(
  (e) => {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear(),
);
(fT.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : Z(
        (t) => {
          t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
            t.setUTCMonth(0, 1),
            t.setUTCHours(0, 0, 0, 0);
        },
        (t, n) => {
          t.setUTCFullYear(t.getUTCFullYear() + n * e);
        },
      )),
  fT.range;
function pT(e, t, n, r, i, a) {
  const o = [
    [zw, 1, Mw],
    [zw, 5, 5 * Mw],
    [zw, 15, 15 * Mw],
    [zw, 30, 30 * Mw],
    [a, 1, Nw],
    [a, 5, 5 * Nw],
    [a, 15, 15 * Nw],
    [a, 30, 30 * Nw],
    [i, 1, Pw],
    [i, 3, 3 * Pw],
    [i, 6, 6 * Pw],
    [i, 12, 12 * Pw],
    [r, 1, Fw],
    [r, 2, 2 * Fw],
    [n, 1, Iw],
    [t, 1, Lw],
    [t, 3, 3 * Lw],
    [e, 1, Rw],
  ];
  function s(e, t, n) {
    const r = t < e;
    r && ([e, t] = [t, e]);
    const i = n && typeof n.range == `function` ? n : c(e, t, n),
      a = i ? i.range(e, +t + 1) : [];
    return r ? a.reverse() : a;
  }
  function c(t, n, r) {
    const i = Math.abs(n - t) / r,
      a = Mx(([, , e]) => e).right(o, i);
    if (a === o.length) return e.every(Zx(t / Rw, n / Rw, r));
    if (a === 0) return jw.every(Math.max(Zx(t, n, r), 1));
    const [s, c] = o[i / o[a - 1][2] < o[a][2] / i ? a - 1 : a];
    return s.every(c);
  }
  return [s, c];
}
var [mT, hT] = pT(fT, uT, nT, Kw, Uw, Vw),
  [gT, _T] = pT(dT, lT, Jw, Ww, Hw, Bw);
function vT(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function yT(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function bT(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function xT(e) {
  var t = e.dateTime,
    n = e.date,
    r = e.time,
    i = e.periods,
    a = e.days,
    o = e.shortDays,
    s = e.months,
    c = e.shortMonths,
    l = DT(i),
    u = OT(i),
    d = DT(a),
    f = OT(a),
    p = DT(o),
    m = OT(o),
    h = DT(s),
    g = OT(s),
    _ = DT(c),
    v = OT(c),
    y = {
      a: j,
      A: ne,
      b: re,
      B: ie,
      c: null,
      d: YT,
      e: YT,
      f: eE,
      g: dE,
      G: pE,
      H: XT,
      I: ZT,
      j: QT,
      L: $T,
      m: tE,
      M: nE,
      p: ae,
      q: oe,
      Q: IE,
      s: LE,
      S: rE,
      u: iE,
      U: aE,
      V: sE,
      w: cE,
      W: lE,
      x: null,
      X: null,
      y: uE,
      Y: fE,
      Z: mE,
      '%': FE,
    },
    b = {
      a: se,
      A: ce,
      b: le,
      B: ue,
      c: null,
      d: hE,
      e: hE,
      f: bE,
      g: jE,
      G: NE,
      H: gE,
      I: _E,
      j: vE,
      L: yE,
      m: xE,
      M: SE,
      p: de,
      q: fe,
      Q: IE,
      s: LE,
      S: CE,
      u: wE,
      U: TE,
      V: DE,
      w: OE,
      W: kE,
      x: null,
      X: null,
      y: AE,
      Y: ME,
      Z: PE,
      '%': FE,
    },
    x = {
      a: E,
      A: D,
      b: O,
      B: k,
      c: ee,
      d: zT,
      e: zT,
      f: GT,
      g: FT,
      G: PT,
      H: VT,
      I: VT,
      j: BT,
      L: WT,
      m: RT,
      M: HT,
      p: T,
      q: LT,
      Q: qT,
      s: JT,
      S: UT,
      u: AT,
      U: jT,
      V: MT,
      w: kT,
      W: NT,
      x: te,
      X: A,
      y: FT,
      Y: PT,
      Z: IT,
      '%': KT,
    };
  (y.x = S(n, y)),
    (y.X = S(r, y)),
    (y.c = S(t, y)),
    (b.x = S(n, b)),
    (b.X = S(r, b)),
    (b.c = S(t, b));
  function S(e, t) {
    return function (n) {
      var r = [],
        i = -1,
        a = 0,
        o = e.length,
        s,
        c,
        l;
      for (n instanceof Date || (n = new Date(+n)); ++i < o; )
        e.charCodeAt(i) === 37 &&
          (r.push(e.slice(a, i)),
          (c = ST[(s = e.charAt(++i))]) == null ? (c = s === `e` ? ` ` : `0`) : (s = e.charAt(++i)),
          (l = t[s]) && (s = l(n, c)),
          r.push(s),
          (a = i + 1));
      return r.push(e.slice(a, i)), r.join(``);
    };
  }
  function C(e, t) {
    return function (n) {
      var r = bT(1900, void 0, 1),
        i = w(r, e, (n += ``), 0),
        a,
        o;
      if (i != n.length) return null;
      if (`Q` in r) return new Date(r.Q);
      if (`s` in r) return new Date(r.s * 1e3 + (`L` in r ? r.L : 0));
      if (
        (t && !(`Z` in r) && (r.Z = 0),
        `p` in r && (r.H = (r.H % 12) + r.p * 12),
        r.m === void 0 && (r.m = `q` in r ? r.q : 0),
        `V` in r)
      ) {
        if (r.V < 1 || r.V > 53) return null;
        `w` in r || (r.w = 1),
          `Z` in r
            ? ((a = yT(bT(r.y, 0, 1))),
              (o = a.getUTCDay()),
              (a = o > 4 || o === 0 ? rT.ceil(a) : rT(a)),
              (a = Gw.offset(a, (r.V - 1) * 7)),
              (r.y = a.getUTCFullYear()),
              (r.m = a.getUTCMonth()),
              (r.d = a.getUTCDate() + ((r.w + 6) % 7)))
            : ((a = vT(bT(r.y, 0, 1))),
              (o = a.getDay()),
              (a = o > 4 || o === 0 ? Yw.ceil(a) : Yw(a)),
              (a = Ww.offset(a, (r.V - 1) * 7)),
              (r.y = a.getFullYear()),
              (r.m = a.getMonth()),
              (r.d = a.getDate() + ((r.w + 6) % 7)));
      } else
        (`W` in r || `U` in r) &&
          (`w` in r || (r.w = `u` in r ? r.u % 7 : +(`W` in r)),
          (o = `Z` in r ? yT(bT(r.y, 0, 1)).getUTCDay() : vT(bT(r.y, 0, 1)).getDay()),
          (r.m = 0),
          (r.d =
            `W` in r ? ((r.w + 6) % 7) + r.W * 7 - ((o + 5) % 7) : r.w + r.U * 7 - ((o + 6) % 7)));
      return `Z` in r ? ((r.H += (r.Z / 100) | 0), (r.M += r.Z % 100), yT(r)) : vT(r);
    };
  }
  function w(e, t, n, r) {
    for (var i = 0, a = t.length, o = n.length, s, c; i < a; ) {
      if (r >= o) return -1;
      if (((s = t.charCodeAt(i++)), s === 37)) {
        if (((s = t.charAt(i++)), (c = x[s in ST ? t.charAt(i++) : s]), !c || (r = c(e, n, r)) < 0))
          return -1;
      } else if (s != n.charCodeAt(r++)) return -1;
    }
    return r;
  }
  function T(e, t, n) {
    var r = l.exec(t.slice(n));
    return r ? ((e.p = u.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function E(e, t, n) {
    var r = p.exec(t.slice(n));
    return r ? ((e.w = m.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function D(e, t, n) {
    var r = d.exec(t.slice(n));
    return r ? ((e.w = f.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function O(e, t, n) {
    var r = _.exec(t.slice(n));
    return r ? ((e.m = v.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function k(e, t, n) {
    var r = h.exec(t.slice(n));
    return r ? ((e.m = g.get(r[0].toLowerCase())), n + r[0].length) : -1;
  }
  function ee(e, n, r) {
    return w(e, t, n, r);
  }
  function te(e, t, r) {
    return w(e, n, t, r);
  }
  function A(e, t, n) {
    return w(e, r, t, n);
  }
  function j(e) {
    return o[e.getDay()];
  }
  function ne(e) {
    return a[e.getDay()];
  }
  function re(e) {
    return c[e.getMonth()];
  }
  function ie(e) {
    return s[e.getMonth()];
  }
  function ae(e) {
    return i[+(e.getHours() >= 12)];
  }
  function oe(e) {
    return 1 + ~~(e.getMonth() / 3);
  }
  function se(e) {
    return o[e.getUTCDay()];
  }
  function ce(e) {
    return a[e.getUTCDay()];
  }
  function le(e) {
    return c[e.getUTCMonth()];
  }
  function ue(e) {
    return s[e.getUTCMonth()];
  }
  function de(e) {
    return i[+(e.getUTCHours() >= 12)];
  }
  function fe(e) {
    return 1 + ~~(e.getUTCMonth() / 3);
  }
  return {
    format: function (e) {
      var t = S((e += ``), y);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
    parse: function (e) {
      var t = C((e += ``), !1);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
    utcFormat: function (e) {
      var t = S((e += ``), b);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
    utcParse: function (e) {
      var t = C((e += ``), !0);
      return (
        (t.toString = function () {
          return e;
        }),
        t
      );
    },
  };
}
var ST = { '-': ``, _: ` `, 0: `0` },
  CT = /^\s*\d+/,
  wT = /^%/,
  TT = /[\\^$*+?|[\]().{}]/g;
function Q(e, t, n) {
  var r = e < 0 ? `-` : ``,
    i = (r ? -e : e) + ``,
    a = i.length;
  return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function ET(e) {
  return e.replace(TT, `\\$&`);
}
function DT(e) {
  return RegExp(`^(?:` + e.map(ET).join(`|`) + `)`, `i`);
}
function OT(e) {
  return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function kT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 1));
  return r ? ((e.w = +r[0]), n + r[0].length) : -1;
}
function AT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 1));
  return r ? ((e.u = +r[0]), n + r[0].length) : -1;
}
function jT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.U = +r[0]), n + r[0].length) : -1;
}
function MT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.V = +r[0]), n + r[0].length) : -1;
}
function NT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.W = +r[0]), n + r[0].length) : -1;
}
function PT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 4));
  return r ? ((e.y = +r[0]), n + r[0].length) : -1;
}
function FT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length) : -1;
}
function IT(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r ? ((e.Z = r[1] ? 0 : -(r[2] + (r[3] || `00`))), n + r[0].length) : -1;
}
function LT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 1));
  return r ? ((e.q = r[0] * 3 - 3), n + r[0].length) : -1;
}
function RT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.m = r[0] - 1), n + r[0].length) : -1;
}
function zT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.d = +r[0]), n + r[0].length) : -1;
}
function BT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 3));
  return r ? ((e.m = 0), (e.d = +r[0]), n + r[0].length) : -1;
}
function VT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.H = +r[0]), n + r[0].length) : -1;
}
function HT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.M = +r[0]), n + r[0].length) : -1;
}
function UT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 2));
  return r ? ((e.S = +r[0]), n + r[0].length) : -1;
}
function WT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 3));
  return r ? ((e.L = +r[0]), n + r[0].length) : -1;
}
function GT(e, t, n) {
  var r = CT.exec(t.slice(n, n + 6));
  return r ? ((e.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
}
function KT(e, t, n) {
  var r = wT.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function qT(e, t, n) {
  var r = CT.exec(t.slice(n));
  return r ? ((e.Q = +r[0]), n + r[0].length) : -1;
}
function JT(e, t, n) {
  var r = CT.exec(t.slice(n));
  return r ? ((e.s = +r[0]), n + r[0].length) : -1;
}
function YT(e, t) {
  return Q(e.getDate(), t, 2);
}
function XT(e, t) {
  return Q(e.getHours(), t, 2);
}
function ZT(e, t) {
  return Q(e.getHours() % 12 || 12, t, 2);
}
function QT(e, t) {
  return Q(1 + Ww.count(dT(e), e), t, 3);
}
function $T(e, t) {
  return Q(e.getMilliseconds(), t, 3);
}
function eE(e, t) {
  return $T(e, t) + `000`;
}
function tE(e, t) {
  return Q(e.getMonth() + 1, t, 2);
}
function nE(e, t) {
  return Q(e.getMinutes(), t, 2);
}
function rE(e, t) {
  return Q(e.getSeconds(), t, 2);
}
function iE(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function aE(e, t) {
  return Q(Jw.count(dT(e) - 1, e), t, 2);
}
function oE(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Qw(e) : Qw.ceil(e);
}
function sE(e, t) {
  return (e = oE(e)), Q(Qw.count(dT(e), e) + (dT(e).getDay() === 4), t, 2);
}
function cE(e) {
  return e.getDay();
}
function lE(e, t) {
  return Q(Yw.count(dT(e) - 1, e), t, 2);
}
function uE(e, t) {
  return Q(e.getFullYear() % 100, t, 2);
}
function dE(e, t) {
  return (e = oE(e)), Q(e.getFullYear() % 100, t, 2);
}
function fE(e, t) {
  return Q(e.getFullYear() % 1e4, t, 4);
}
function pE(e, t) {
  var n = e.getDay();
  return (e = n >= 4 || n === 0 ? Qw(e) : Qw.ceil(e)), Q(e.getFullYear() % 1e4, t, 4);
}
function mE(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? `-` : ((t *= -1), `+`)) + Q((t / 60) | 0, `0`, 2) + Q(t % 60, `0`, 2);
}
function hE(e, t) {
  return Q(e.getUTCDate(), t, 2);
}
function gE(e, t) {
  return Q(e.getUTCHours(), t, 2);
}
function _E(e, t) {
  return Q(e.getUTCHours() % 12 || 12, t, 2);
}
function vE(e, t) {
  return Q(1 + Gw.count(fT(e), e), t, 3);
}
function yE(e, t) {
  return Q(e.getUTCMilliseconds(), t, 3);
}
function bE(e, t) {
  return yE(e, t) + `000`;
}
function xE(e, t) {
  return Q(e.getUTCMonth() + 1, t, 2);
}
function SE(e, t) {
  return Q(e.getUTCMinutes(), t, 2);
}
function CE(e, t) {
  return Q(e.getUTCSeconds(), t, 2);
}
function wE(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function TE(e, t) {
  return Q(nT.count(fT(e) - 1, e), t, 2);
}
function EE(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? oT(e) : oT.ceil(e);
}
function DE(e, t) {
  return (e = EE(e)), Q(oT.count(fT(e), e) + (fT(e).getUTCDay() === 4), t, 2);
}
function OE(e) {
  return e.getUTCDay();
}
function kE(e, t) {
  return Q(rT.count(fT(e) - 1, e), t, 2);
}
function AE(e, t) {
  return Q(e.getUTCFullYear() % 100, t, 2);
}
function jE(e, t) {
  return (e = EE(e)), Q(e.getUTCFullYear() % 100, t, 2);
}
function ME(e, t) {
  return Q(e.getUTCFullYear() % 1e4, t, 4);
}
function NE(e, t) {
  var n = e.getUTCDay();
  return (e = n >= 4 || n === 0 ? oT(e) : oT.ceil(e)), Q(e.getUTCFullYear() % 1e4, t, 4);
}
function PE() {
  return `+0000`;
}
function FE() {
  return `%`;
}
function IE(e) {
  return +e;
}
function LE(e) {
  return Math.floor(e / 1e3);
}
var RE, zE, BE;
VE({
  dateTime: `%x, %X`,
  date: `%-m/%-d/%Y`,
  time: `%-I:%M:%S %p`,
  periods: [`AM`, `PM`],
  days: [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`],
  shortDays: [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`],
  months: [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ],
  shortMonths: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
});
function VE(e) {
  return (RE = xT(e)), (zE = RE.format), RE.parse, (BE = RE.utcFormat), RE.utcParse, RE;
}
function HE(e) {
  return new Date(e);
}
function UE(e) {
  return e instanceof Date ? +e : +new Date(+e);
}
function WE(e, t, n, r, i, a, o, s, c, l) {
  var u = DC(),
    d = u.invert,
    f = u.domain,
    p = l(`.%L`),
    m = l(`:%S`),
    h = l(`%I:%M`),
    g = l(`%I %p`),
    _ = l(`%a %d`),
    v = l(`%b %d`),
    y = l(`%B`),
    b = l(`%Y`);
  function x(e) {
    return (
      c(e) < e
        ? p
        : s(e) < e
          ? m
          : o(e) < e
            ? h
            : a(e) < e
              ? g
              : r(e) < e
                ? i(e) < e
                  ? _
                  : v
                : n(e) < e
                  ? y
                  : b
    )(e);
  }
  return (
    (u.invert = function (e) {
      return new Date(d(e));
    }),
    (u.domain = function (e) {
      return arguments.length ? f(Array.from(e, UE)) : f().map(HE);
    }),
    (u.ticks = function (t) {
      var n = f();
      return e(n[0], n[n.length - 1], t ?? 10);
    }),
    (u.tickFormat = function (e, t) {
      return t == null ? x : l(t);
    }),
    (u.nice = function (e) {
      var n = f();
      return (
        (!e || typeof e.range != `function`) && (e = t(n[0], n[n.length - 1], e ?? 10)),
        e ? f(nw(n, e)) : u
      );
    }),
    (u.copy = function () {
      return TC(u, WE(e, t, n, r, i, a, o, s, c, l));
    }),
    u
  );
}
function GE() {
  return aS.apply(
    WE(gT, _T, dT, lT, Jw, Ww, Hw, Bw, zw, zE).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]),
    arguments,
  );
}
function KE() {
  return aS.apply(
    WE(mT, hT, fT, uT, nT, Gw, Uw, Vw, zw, BE).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]),
    arguments,
  );
}
function qE() {
  var e = 0,
    t = 1,
    n,
    r,
    i,
    a,
    o = bC,
    s = !1,
    c;
  function l(e) {
    return e == null || isNaN((e = +e))
      ? c
      : o(i === 0 ? 0.5 : ((e = (a(e) - n) * i), s ? Math.max(0, Math.min(1, e)) : e));
  }
  (l.domain = function (o) {
    return arguments.length
      ? (([e, t] = o), (n = a((e = +e))), (r = a((t = +t))), (i = n === r ? 0 : 1 / (r - n)), l)
      : [e, t];
  }),
    (l.clamp = function (e) {
      return arguments.length ? ((s = !!e), l) : s;
    }),
    (l.interpolator = function (e) {
      return arguments.length ? ((o = e), l) : o;
    });
  function u(e) {
    return function (t) {
      var n, r;
      return arguments.length ? (([n, r] = t), (o = e(n, r)), l) : [o(0), o(1)];
    };
  }
  return (
    (l.range = u(mC)),
    (l.rangeRound = u(hC)),
    (l.unknown = function (e) {
      return arguments.length ? ((c = e), l) : c;
    }),
    function (o) {
      return (a = o), (n = o(e)), (r = o(t)), (i = n === r ? 0 : 1 / (r - n)), l;
    }
  );
}
function JE(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function YE() {
  var e = $C(qE()(bC));
  return (
    (e.copy = function () {
      return JE(e, YE());
    }),
    oS.apply(e, arguments)
  );
}
function XE() {
  var e = dw(qE()).domain([1, 10]);
  return (
    (e.copy = function () {
      return JE(e, XE()).base(e.base());
    }),
    oS.apply(e, arguments)
  );
}
function ZE() {
  var e = hw(qE());
  return (
    (e.copy = function () {
      return JE(e, ZE()).constant(e.constant());
    }),
    oS.apply(e, arguments)
  );
}
function QE() {
  var e = bw(qE());
  return (
    (e.copy = function () {
      return JE(e, QE()).exponent(e.exponent());
    }),
    oS.apply(e, arguments)
  );
}
function $E() {
  return QE.apply(null, arguments).exponent(0.5);
}
function eD() {
  var e = [],
    t = bC;
  function n(n) {
    if (n != null && !isNaN((n = +n))) return t((Lx(e, n, 1) - 1) / (e.length - 1));
  }
  return (
    (n.domain = function (t) {
      if (!arguments.length) return e.slice();
      e = [];
      for (let n of t) n != null && !isNaN((n = +n)) && e.push(n);
      return e.sort(Ax), n;
    }),
    (n.interpolator = function (e) {
      return arguments.length ? ((t = e), n) : t;
    }),
    (n.range = function () {
      return e.map((n, r) => t(r / (e.length - 1)));
    }),
    (n.quantiles = function (t) {
      return Array.from({ length: t + 1 }, (n, r) => nS(e, r / t));
    }),
    (n.copy = function () {
      return eD(t).domain(e);
    }),
    oS.apply(n, arguments)
  );
}
function tD() {
  var e = 0,
    t = 0.5,
    n = 1,
    r = 1,
    i,
    a,
    o,
    s,
    c,
    l = bC,
    u,
    d = !1,
    f;
  function p(e) {
    return isNaN((e = +e))
      ? f
      : ((e = 0.5 + ((e = +u(e)) - a) * (r * e < r * a ? s : c)),
        l(d ? Math.max(0, Math.min(1, e)) : e));
  }
  (p.domain = function (l) {
    return arguments.length
      ? (([e, t, n] = l),
        (i = u((e = +e))),
        (a = u((t = +t))),
        (o = u((n = +n))),
        (s = i === a ? 0 : 0.5 / (a - i)),
        (c = a === o ? 0 : 0.5 / (o - a)),
        (r = a < i ? -1 : 1),
        p)
      : [e, t, n];
  }),
    (p.clamp = function (e) {
      return arguments.length ? ((d = !!e), p) : d;
    }),
    (p.interpolator = function (e) {
      return arguments.length ? ((l = e), p) : l;
    });
  function m(e) {
    return function (t) {
      var n, r, i;
      return arguments.length ? (([n, r, i] = t), (l = gC(e, [n, r, i])), p) : [l(0), l(0.5), l(1)];
    };
  }
  return (
    (p.range = m(mC)),
    (p.rangeRound = m(hC)),
    (p.unknown = function (e) {
      return arguments.length ? ((f = e), p) : f;
    }),
    function (l) {
      return (
        (u = l),
        (i = l(e)),
        (a = l(t)),
        (o = l(n)),
        (s = i === a ? 0 : 0.5 / (a - i)),
        (c = a === o ? 0 : 0.5 / (o - a)),
        (r = a < i ? -1 : 1),
        p
      );
    }
  );
}
function nD() {
  var e = $C(tD()(bC));
  return (
    (e.copy = function () {
      return JE(e, nD());
    }),
    oS.apply(e, arguments)
  );
}
function rD() {
  var e = dw(tD()).domain([0.1, 1, 10]);
  return (
    (e.copy = function () {
      return JE(e, rD()).base(e.base());
    }),
    oS.apply(e, arguments)
  );
}
function iD() {
  var e = hw(tD());
  return (
    (e.copy = function () {
      return JE(e, iD()).constant(e.constant());
    }),
    oS.apply(e, arguments)
  );
}
function aD() {
  var e = bw(tD());
  return (
    (e.copy = function () {
      return JE(e, aD()).exponent(e.exponent());
    }),
    oS.apply(e, arguments)
  );
}
function oD() {
  return aD.apply(null, arguments).exponent(0.5);
}
var sD = t({
  scaleBand: () => lS,
  scaleDiverging: () => nD,
  scaleDivergingLog: () => rD,
  scaleDivergingPow: () => aD,
  scaleDivergingSqrt: () => oD,
  scaleDivergingSymlog: () => iD,
  scaleIdentity: () => tw,
  scaleImplicit: () => sS,
  scaleLinear: () => ew,
  scaleLog: () => fw,
  scaleOrdinal: () => cS,
  scalePoint: () => dS,
  scalePow: () => xw,
  scaleQuantile: () => Ew,
  scaleQuantize: () => Dw,
  scaleRadial: () => Tw,
  scaleSequential: () => YE,
  scaleSequentialLog: () => XE,
  scaleSequentialPow: () => QE,
  scaleSequentialQuantile: () => eD,
  scaleSequentialSqrt: () => $E,
  scaleSequentialSymlog: () => ZE,
  scaleSqrt: () => Sw,
  scaleSymlog: () => gw,
  scaleThreshold: () => Ow,
  scaleTime: () => GE,
  scaleUtc: () => KE,
  tickFormat: () => QC,
});
function cD(e) {
  var t = sD;
  if (e in t && typeof t[e] == `function`) return t[e]();
  var n = `scale${wu(e)}`;
  if (n in t && typeof t[n] == `function`) return t[n]();
}
function lD(e, t, n) {
  if (typeof e == `function`) return e.copy().domain(t).range(n);
  if (e != null) {
    var r = cD(e);
    if (r != null) return r.domain(t).range(n), r;
  }
}
function uD(e, t, n, r) {
  if (!(n == null || r == null))
    return typeof e.scale == `function` ? lD(e.scale, n, r) : lD(t, n, r);
}
function dD(e) {
  return `scale${wu(e)}`;
}
function fD(e) {
  return dD(e) in sD;
}
var pD = (e, t, n) => {
  if (e != null) {
    var { scale: r, type: i } = e;
    if (r === `auto`)
      return i === `category` &&
        n &&
        (n.indexOf(`LineChart`) >= 0 ||
          n.indexOf(`AreaChart`) >= 0 ||
          (n.indexOf(`ComposedChart`) >= 0 && !t))
        ? `point`
        : i === `category`
          ? `band`
          : `linear`;
    if (typeof r == `string`) return fD(r) ? r : `point`;
  }
};
function mD(e, t) {
  for (var n = 0, r = e.length, i = e[0] < e[e.length - 1]; n < r; ) {
    var a = Math.floor((n + r) / 2);
    (i ? e[a] < t : e[a] > t) ? (n = a + 1) : (r = a);
  }
  return n;
}
function hD(e, t) {
  if (e) {
    var n = t ?? e.domain(),
      r = n.map((t) => e(t) ?? 0),
      i = e.range();
    if (!(n.length === 0 || i.length < 2))
      return (e) => {
        var t = mD(r, e);
        if (t <= 0) return n[0];
        if (t >= n.length) return n[n.length - 1];
        var i = r[t - 1] ?? 0,
          a = r[t] ?? 0;
        return Math.abs(e - i) <= Math.abs(e - a) ? n[t - 1] : n[t];
      };
  }
}
function gD(e) {
  if (e != null)
    return `invert` in e && typeof e.invert == `function` ? e.invert.bind(e) : hD(e, void 0);
}
function _D(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function vD(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? _D(Object(n), !0).forEach(function (t) {
          yD(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : _D(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function yD(e, t, n) {
  return (
    (t = bD(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function bD(e) {
  var t = xD(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function xD(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var SD = [0, `auto`],
  CD = {
    allowDataOverflow: !1,
    allowDecimals: !0,
    allowDuplicatedCategory: !0,
    angle: 0,
    dataKey: void 0,
    domain: void 0,
    height: 30,
    hide: !0,
    id: 0,
    includeHidden: !1,
    interval: `preserveEnd`,
    minTickGap: 5,
    mirror: !1,
    name: void 0,
    orientation: `bottom`,
    padding: { left: 0, right: 0 },
    reversed: !1,
    scale: `auto`,
    tick: !0,
    tickCount: 5,
    tickFormatter: void 0,
    ticks: void 0,
    type: `category`,
    unit: void 0,
    niceTicks: `auto`,
  },
  wD = (e, t) => e.cartesianAxis.xAxis[t],
  TD = (e, t) => wD(e, t) ?? CD,
  ED = {
    allowDataOverflow: !1,
    allowDecimals: !0,
    allowDuplicatedCategory: !0,
    angle: 0,
    dataKey: void 0,
    domain: SD,
    hide: !0,
    id: 0,
    includeHidden: !1,
    interval: `preserveEnd`,
    minTickGap: 5,
    mirror: !1,
    name: void 0,
    orientation: `left`,
    padding: { top: 0, bottom: 0 },
    reversed: !1,
    scale: `auto`,
    tick: !0,
    tickCount: 5,
    tickFormatter: void 0,
    ticks: void 0,
    type: `number`,
    unit: void 0,
    niceTicks: `auto`,
    width: 60,
  },
  DD = (e, t) => e.cartesianAxis.yAxis[t],
  OD = (e, t) => DD(e, t) ?? ED,
  kD = {
    domain: [0, `auto`],
    includeHidden: !1,
    reversed: !1,
    allowDataOverflow: !1,
    allowDuplicatedCategory: !1,
    dataKey: void 0,
    id: 0,
    name: ``,
    range: [64, 64],
    scale: `auto`,
    type: `number`,
    unit: ``,
  },
  AD = (e, t) => e.cartesianAxis.zAxis[t] ?? kD,
  jD = (e, t, n) => {
    switch (t) {
      case `xAxis`:
        return TD(e, n);
      case `yAxis`:
        return OD(e, n);
      case `zAxis`:
        return AD(e, n);
      case `angleAxis`:
        return lx(e, n);
      case `radiusAxis`:
        return ux(e, n);
      default:
        throw Error(`Unexpected axis type: ${t}`);
    }
  },
  MD = (e, t, n) => {
    switch (t) {
      case `xAxis`:
        return TD(e, n);
      case `yAxis`:
        return OD(e, n);
      default:
        throw Error(`Unexpected axis type: ${t}`);
    }
  },
  ND = (e, t, n) => {
    switch (t) {
      case `xAxis`:
        return TD(e, n);
      case `yAxis`:
        return OD(e, n);
      case `angleAxis`:
        return lx(e, n);
      case `radiusAxis`:
        return ux(e, n);
      default:
        throw Error(`Unexpected axis type: ${t}`);
    }
  },
  PD = (e) =>
    e.graphicalItems.cartesianItems.some((e) => e.type === `bar`) ||
    e.graphicalItems.polarItems.some((e) => e.type === `radialBar`);
function FD(e, t) {
  return (n) => {
    switch (e) {
      case `xAxis`:
        return `xAxisId` in n && n.xAxisId === t;
      case `yAxis`:
        return `yAxisId` in n && n.yAxisId === t;
      case `zAxis`:
        return `zAxisId` in n && n.zAxisId === t;
      case `angleAxis`:
        return `angleAxisId` in n && n.angleAxisId === t;
      case `radiusAxis`:
        return `radiusAxisId` in n && n.radiusAxisId === t;
      default:
        return !1;
    }
  };
}
var ID = (e) => e.graphicalItems.cartesianItems,
  LD = U([vx, yx], FD),
  RD = (e, t, n) => e.filter(n).filter((e) => (t?.includeHidden === !0 ? !0 : !e.hide)),
  zD = U([ID, jD, LD], RD, { memoizeOptions: { resultEqualityCheck: wx } }),
  BD = U([zD], (e) => e.filter((e) => e.type === `area` || e.type === `bar`).filter(Sx)),
  VD = (e) => e.filter((e) => !(`stackId` in e) || e.stackId === void 0),
  HD = U([zD], VD),
  UD = (e) =>
    e
      .map((e) => e.data)
      .filter(Boolean)
      .flat(1),
  WD = U([zD], (e) => e.some((e) => !e.data)),
  GD = U([zD], UD, { memoizeOptions: { resultEqualityCheck: wx } }),
  KD = (e, t) => {
    var { chartData: n = [], dataStartIndex: r, dataEndIndex: i } = t;
    return e.length > 0 ? e : n.slice(r, i + 1);
  },
  qD = U([GD, Ob], KD),
  JD = (e, t, n) =>
    t?.dataKey == null
      ? n.length > 0
        ? n.map((e) => e.dataKey).flatMap((t) => e.map((e) => ({ value: K(e, t) })))
        : e.map((e) => ({ value: e }))
      : e.map((e) => ({ value: K(e, t.dataKey) })),
  YD = (e, t, n, r, i, a) => {
    var { chartData: o = [], dataStartIndex: s, dataEndIndex: c } = r,
      l = JD(e, t, n);
    return i && t?.dataKey != null && a.length > 0
      ? [
          ...o
            .slice(s, c + 1)
            .map((e) => ({ value: K(e, t.dataKey) }))
            .filter((e) => e.value != null),
          ...l,
        ]
      : l;
  },
  XD = U([qD, jD, zD, Ob, WD, GD], YD);
function ZD(e) {
  if (gu(e) || e instanceof Date) {
    var t = Number(e);
    if (G(t)) return t;
  }
}
function QD(e) {
  if (Array.isArray(e)) {
    var t = [ZD(e[0]), ZD(e[1])];
    return jb(t) ? t : void 0;
  }
  var n = ZD(e);
  if (n != null) return [n, n];
}
function $D(e) {
  return e.map(ZD).filter(Tu);
}
function eO(e, t) {
  var n = ZD(e),
    r = ZD(t);
  return n == null && r == null ? 0 : n == null ? -1 : r == null ? 1 : n - r;
}
var tO = U([XD], (e) => e?.map((e) => e.value).sort(eO));
function nO(e, t) {
  switch (e) {
    case `xAxis`:
      return t.direction === `x`;
    case `yAxis`:
      return t.direction === `y`;
    default:
      return !1;
  }
}
function rO(e, t, n) {
  if (!n || !n.length) return [];
  var r;
  if (typeof t == `number` && !mu(t)) r = t;
  else if (Array.isArray(t)) {
    var i = $D(t);
    i.length > 0 && (r = Math.max(...i));
  }
  return r == null
    ? []
    : $D(
        n.flatMap((t) => {
          var n = K(e, t.dataKey),
            i,
            a;
          if ((Array.isArray(n) ? ([i, a] = n) : (i = a = n), !(!G(i) || !G(a))))
            return [r - i, r + a];
        }),
      );
}
var $ = (e) => ND(e, Ex(e), Dx(e)),
  iO = U([$], (e) => e?.dataKey),
  aO = U([BD, Ob, $], xx),
  oO = (e, t, n, r) => {
    var i = t.reduce((e, t) => {
      if (t.stackId == null) return e;
      var n = e[t.stackId];
      return (n ??= []), n.push(t), (e[t.stackId] = n), e;
    }, {});
    return Object.fromEntries(
      Object.entries(i).map((t) => {
        var [i, a] = t,
          o = r ? [...a].reverse() : a;
        return [i, { stackedData: eh(e, o.map(bx), n), graphicalItems: o }];
      }),
    );
  },
  sO = U([aO, BD, Gb, Kb], oO),
  cO = (e, t, n, r) => {
    var { dataStartIndex: i, dataEndIndex: a } = t;
    if (r == null && n !== `zAxis`) {
      var o = rh(e, i, a);
      if (!(o != null && o[0] === 0 && o[1] === 0)) return o;
    }
  },
  lO = U([jD], (e) => e.allowDataOverflow),
  uO = (e) => {
    if (e == null || !(`domain` in e)) return SD;
    if (e.domain != null) return e.domain;
    if (`ticks` in e && e.ticks != null) {
      if (e.type === `number`) {
        var t = $D(e.ticks);
        return [Math.min(...t), Math.max(...t)];
      }
      if (e.type === `category`) return e.ticks.map(String);
    }
    return e?.domain ?? SD;
  },
  dO = U([jD], uO),
  fO = U([dO, lO], Nb),
  pO = U([sO, Eb, vx, fO], cO, { memoizeOptions: { resultEqualityCheck: Cx } }),
  mO = (e) => e.errorBars,
  hO = (e, t, n) =>
    e
      .flatMap((e) => t[e.id])
      .filter(Boolean)
      .filter((e) => nO(n, e)),
  gO = function () {
    var e = [...arguments].filter(Boolean);
    if (e.length !== 0) {
      var t = e.flat();
      return [Math.min(...t), Math.max(...t)];
    }
  },
  _O = function (e, t, n, r, i) {
    var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [],
      o,
      s;
    if (
      (n.length > 0 &&
        n.forEach((e) => {
          var n = e.data == null ? a : [...e.data],
            c = r[e.id]?.filter((e) => nO(i, e));
          n.forEach((n) => {
            var r = K(n, t.dataKey ?? e.dataKey),
              i = rO(n, r, c);
            if (i.length >= 2) {
              var a = Math.min(...i),
                l = Math.max(...i);
              (o == null || a < o) && (o = a), (s == null || l > s) && (s = l);
            }
            var u = QD(r);
            u != null &&
              ((o = o == null ? u[0] : Math.min(o, u[0])),
              (s = s == null ? u[1] : Math.max(s, u[1])));
          });
        }),
      t?.dataKey != null &&
        n.length === 0 &&
        e.forEach((e) => {
          var n = QD(K(e, t.dataKey));
          n != null &&
            ((o = o == null ? n[0] : Math.min(o, n[0])),
            (s = s == null ? n[1] : Math.max(s, n[1])));
        }),
      G(o) && G(s))
    )
      return [o, s];
  },
  vO = U([qD, jD, HD, mO, vx, kb], _O, { memoizeOptions: { resultEqualityCheck: Cx } });
function yO(e) {
  var { value: t } = e;
  if (gu(t) || t instanceof Date) return t;
}
var bO = (e, t, n) => {
    var r = e.map(yO).filter((e) => e != null);
    return n && (t.dataKey == null || (t.allowDuplicatedCategory && bu(r)))
      ? (0, Tb.default)(0, e.length)
      : t.allowDuplicatedCategory
        ? r
        : Array.from(new Set(r));
  },
  xO = (e) => e.referenceElements.dots,
  SO = (e, t, n) =>
    e
      .filter((e) => e.ifOverflow === `extendDomain`)
      .filter((e) => (t === `xAxis` ? e.xAxisId === n : e.yAxisId === n)),
  CO = U([xO, vx, yx], SO),
  wO = (e) => e.referenceElements.areas,
  TO = U([wO, vx, yx], SO),
  EO = (e) => e.referenceElements.lines,
  DO = U([EO, vx, yx], SO),
  OO = (e, t) => {
    if (e != null) {
      var n = $D(e.map((e) => (t === `xAxis` ? e.x : e.y)));
      if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
    }
  },
  kO = U(CO, vx, OO),
  AO = (e, t) => {
    if (e != null) {
      var n = $D(e.flatMap((e) => [t === `xAxis` ? e.x1 : e.y1, t === `xAxis` ? e.x2 : e.y2]));
      if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
    }
  },
  jO = U([TO, vx], AO);
function MO(e) {
  if (e.x != null) return $D([e.x]);
  var t = e.segment?.map((e) => e.x);
  return t == null || t.length === 0 ? [] : $D(t);
}
function NO(e) {
  if (e.y != null) return $D([e.y]);
  var t = e.segment?.map((e) => e.y);
  return t == null || t.length === 0 ? [] : $D(t);
}
var PO = (e, t) => {
    if (e != null) {
      var n = e.flatMap((e) => (t === `xAxis` ? MO(e) : NO(e)));
      if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
    }
  },
  FO = U(kO, U([DO, vx], PO), jO, (e, t, n) => gO(e, n, t)),
  IO = (e, t, n, r, i, a, o, s) =>
    n ??
    Pb(
      t,
      (o === `vertical` && s === `xAxis`) || (o === `horizontal` && s === `yAxis`)
        ? gO(r, a, i)
        : gO(a, i),
      e.allowDataOverflow,
    ),
  LO = U([jD, dO, fO, pO, vO, FO, q, vx], IO, { memoizeOptions: { resultEqualityCheck: Cx } }),
  RO = [0, 1],
  zO = (e, t, n, r, i, a, o) => {
    if (!((e == null || n == null || n.length === 0) && o === void 0)) {
      var { dataKey: s, type: c } = e,
        l = Qm(t, a);
      return l && s == null
        ? (0, Tb.default)(0, n?.length ?? 0)
        : c === `category`
          ? bO(r, e, l)
          : i === `expand` && !l
            ? RO
            : o;
    }
  },
  BO = U([jD, q, qD, XD, Gb, vx, LO], zO),
  VO = U([jD, PD, qb], pD),
  HO = (e, t, n) => {
    var { niceTicks: r } = t;
    if (r !== `none`) {
      var i = uO(t),
        a = Array.isArray(i) && (i[0] === `auto` || i[1] === `auto`);
      if ((r === `snap125` || r === `adaptive`) && t != null && t.tickCount && jb(e)) {
        if (a) return Hb(e, t.tickCount, t.allowDecimals, r);
        if (t.type === `number`) return Ub(e, t.tickCount, t.allowDecimals, r);
      }
      if (r === `auto` && n === `linear` && t != null && t.tickCount) {
        if (a && jb(e)) return Hb(e, t.tickCount, t.allowDecimals, `adaptive`);
        if (t.type === `number` && jb(e)) return Ub(e, t.tickCount, t.allowDecimals, `adaptive`);
      }
    }
  },
  UO = U([BO, ND, VO], HO),
  WO = (e, t, n, r) => {
    if (r !== `angleAxis` && e?.type === `number` && jb(t) && Array.isArray(n) && n.length > 0) {
      var i = t[0],
        a = n[0] ?? 0,
        o = t[1],
        s = n[n.length - 1] ?? 0;
      return [Math.min(i, a), Math.max(o, s)];
    }
    return t;
  },
  GO = U([jD, BO, UO, vx], WO),
  KO = U(
    U(XD, jD, (e, t) => {
      if (!(!t || t.type !== `number`)) {
        var n = 1 / 0,
          r = Array.from($D(e.map((e) => e.value))).sort((e, t) => e - t),
          i = r[0],
          a = r[r.length - 1];
        if (i == null || a == null) return 1 / 0;
        var o = a - i;
        if (o === 0) return 1 / 0;
        for (var s = 0; s < r.length - 1; s++) {
          var c = r[s],
            l = r[s + 1];
          if (!(c == null || l == null)) {
            var u = l - c;
            n = Math.min(n, u);
          }
        }
        return n / o;
      }
    }),
    q,
    Wb,
    Dh,
    (e, t, n, r, i) => i,
    (e, t, n, r, i) => {
      if (!G(e)) return 0;
      var a = t === `vertical` ? r.height : r.width;
      if (i === `gap`) return (e * a) / 2;
      if (i === `no-gap`) {
        var o = yu(n, e * a),
          s = (e * a) / 2;
        return s - o - ((s - o) / a) * o;
      }
      return 0;
    },
  ),
  qO = (e, t, n) => {
    var r = TD(e, t);
    return r == null || typeof r.padding != `string` ? 0 : KO(e, `xAxis`, t, n, r.padding);
  },
  JO = (e, t, n) => {
    var r = OD(e, t);
    return r == null || typeof r.padding != `string` ? 0 : KO(e, `yAxis`, t, n, r.padding);
  },
  YO = U(TD, qO, (e, t) => {
    if (e == null) return { left: 0, right: 0 };
    var { padding: n } = e;
    return typeof n == `string`
      ? { left: t, right: t }
      : { left: (n.left ?? 0) + t, right: (n.right ?? 0) + t };
  }),
  XO = U(OD, JO, (e, t) => {
    if (e == null) return { top: 0, bottom: 0 };
    var { padding: n } = e;
    return typeof n == `string`
      ? { top: t, bottom: t }
      : { top: (n.top ?? 0) + t, bottom: (n.bottom ?? 0) + t };
  }),
  ZO = U([Dh, YO, Mh, jh, (e, t, n) => n], (e, t, n, r, i) => {
    var { padding: a } = r;
    return i ? [a.left, n.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
  }),
  QO = U([Dh, q, XO, Mh, jh, (e, t, n) => n], (e, t, n, r, i, a) => {
    var { padding: o } = i;
    return a
      ? [r.height - o.bottom, o.top]
      : t === `horizontal`
        ? [e.top + e.height - n.bottom, e.top + n.top]
        : [e.top + n.top, e.top + e.height - n.bottom];
  }),
  $O = (e, t, n, r) => {
    switch (t) {
      case `xAxis`:
        return ZO(e, n, r);
      case `yAxis`:
        return QO(e, n, r);
      case `zAxis`:
        return AD(e, n)?.range;
      case `angleAxis`:
        return hx(e);
      case `radiusAxis`:
        return gx(e, n);
      default:
        return;
    }
  },
  ek = U([jD, $O], ex),
  tk = U([jD, VO, U([VO, GO], kx), ek], uD),
  nk = (e, t, n, r) => {
    if (!(n == null || n.dataKey == null)) {
      var { type: i, scale: a } = n;
      if (Qm(e, r) && (i === `number` || a !== `auto`)) return t.map((e) => e.value);
    }
  },
  rk = U([q, XD, ND, vx], nk),
  ik = U([tk], Ox);
U([tk], gD), U([tk, tO], hD), U([zD, mO, vx], hO);
function ak(e, t) {
  return e.id < t.id ? -1 : +(e.id > t.id);
}
var ok = (e, t) => t,
  sk = (e, t, n) => n,
  ck = U(mh, ok, sk, (e, t, n) =>
    e
      .filter((e) => e.orientation === t)
      .filter((e) => e.mirror === n)
      .sort(ak),
  ),
  lk = U(hh, ok, sk, (e, t, n) =>
    e
      .filter((e) => e.orientation === t)
      .filter((e) => e.mirror === n)
      .sort(ak),
  ),
  uk = (e, t) => ({ width: e.width, height: t.height }),
  dk = (e, t) => ({ width: typeof t.width == `number` ? t.width : 60, height: e.height });
U(Dh, TD, uk);
var fk = (e, t, n) => {
    switch (t) {
      case `top`:
        return e.top;
      case `bottom`:
        return n - e.bottom;
      default:
        return 0;
    }
  },
  pk = (e, t, n) => {
    switch (t) {
      case `left`:
        return e.left;
      case `right`:
        return n - e.right;
      default:
        return 0;
    }
  },
  mk = U(dh, Dh, ck, ok, sk, (e, t, n, r, i) => {
    var a = {},
      o;
    return (
      n.forEach((n) => {
        var s = uk(t, n);
        o ??= fk(t, r, e);
        var c = (r === `top` && !i) || (r === `bottom` && i);
        (a[n.id] = o - Number(c) * s.height), (o += (c ? -1 : 1) * s.height);
      }),
      a
    );
  }),
  hk = U(uh, Dh, lk, ok, sk, (e, t, n, r, i) => {
    var a = {},
      o;
    return (
      n.forEach((n) => {
        var s = dk(t, n);
        o ??= pk(t, r, e);
        var c = (r === `left` && !i) || (r === `right` && i);
        (a[n.id] = o - Number(c) * s.width), (o += (c ? -1 : 1) * s.width);
      }),
      a
    );
  });
U(
  [
    Dh,
    TD,
    (e, t) => {
      var n = TD(e, t);
      if (n != null) return mk(e, n.orientation, n.mirror);
    },
    (e, t) => t,
  ],
  (e, t, n, r) => {
    if (t != null) {
      var i = n?.[r];
      return i == null ? { x: e.left, y: 0 } : { x: e.left, y: i };
    }
  },
),
  U(
    [
      Dh,
      OD,
      (e, t) => {
        var n = OD(e, t);
        if (n != null) return hk(e, n.orientation, n.mirror);
      },
      (e, t) => t,
    ],
    (e, t, n, r) => {
      if (t != null) {
        var i = n?.[r];
        return i == null ? { x: 0, y: e.top } : { x: i, y: e.top };
      }
    },
  ),
  U(Dh, OD, (e, t) => ({ width: typeof t.width == `number` ? t.width : 60, height: e.height }));
var gk = (e, t, n, r) => {
    if (n != null) {
      var { allowDuplicatedCategory: i, type: a, dataKey: o } = n,
        s = Qm(e, r),
        c = t.map((e) => e.value),
        l = c.filter((e) => e != null);
      if (o && s && a === `category` && i && bu(l)) return c;
    }
  },
  _k = U([q, XD, jD, vx], gk);
U([q, MD, VO, ik, _k, rk, $O, UO, vx], (e, t, n, r, i, a, o, s, c) => {
  if (t != null) {
    var l = Qm(e, c);
    return {
      angle: t.angle,
      interval: t.interval,
      minTickGap: t.minTickGap,
      orientation: t.orientation,
      tick: t.tick,
      tickCount: t.tickCount,
      tickFormatter: t.tickFormatter,
      ticks: t.ticks,
      type: t.type,
      unit: t.unit,
      axisType: c,
      categoricalDomain: a,
      duplicateDomain: i,
      isCategorical: l,
      niceTicks: s,
      range: o,
      realScaleType: n,
      scale: r,
    };
  }
}),
  U([q, ND, VO, ik, UO, $O, _k, rk, vx], (e, t, n, r, i, a, o, s, c) => {
    if (!(t == null || r == null)) {
      var l = Qm(e, c),
        { type: u, ticks: d, tickCount: f } = t,
        p = n === `scaleBand` && typeof r.bandwidth == `function` ? r.bandwidth() / 2 : 2,
        m = u === `category` && r.bandwidth ? r.bandwidth() / p : 0;
      m = c === `angleAxis` && a != null && a.length >= 2 ? pu(a[0] - a[1]) * 2 * m : m;
      var h = d || i;
      return h
        ? h
            .map((e, t) => {
              var n = o ? o.indexOf(e) : e,
                i = r.map(n);
              return G(i) ? { index: t, coordinate: i + m, value: e, offset: m } : null;
            })
            .filter(Tu)
        : l && s
          ? s
              .map((e, t) => {
                var n = r.map(e);
                return G(n) ? { coordinate: n + m, value: e, index: t, offset: m } : null;
              })
              .filter(Tu)
          : r.ticks
            ? r
                .ticks(f)
                .map((e, t) => {
                  var n = r.map(e);
                  return G(n) ? { coordinate: n + m, value: e, index: t, offset: m } : null;
                })
                .filter(Tu)
            : r
                .domain()
                .map((e, t) => {
                  var n = r.map(e);
                  return G(n)
                    ? { coordinate: n + m, value: o ? o[e] : e, index: t, offset: m }
                    : null;
                })
                .filter(Tu);
    }
  }),
  U([q, ND, ik, $O, _k, rk, vx], (e, t, n, r, i, a, o) => {
    if (!(t == null || n == null || r == null || r[0] === r[1])) {
      var s = Qm(e, o),
        { tickCount: c } = t,
        l = 0;
      return (
        (l = o === `angleAxis` && r?.length >= 2 ? pu(r[0] - r[1]) * 2 * l : l),
        s && a
          ? a
              .map((e, t) => {
                var r = n.map(e);
                return G(r) ? { coordinate: r + l, value: e, index: t, offset: l } : null;
              })
              .filter(Tu)
          : n.ticks
            ? n
                .ticks(c)
                .map((e, t) => {
                  var r = n.map(e);
                  return G(r) ? { coordinate: r + l, value: e, index: t, offset: l } : null;
                })
                .filter(Tu)
            : n
                .domain()
                .map((e, t) => {
                  var r = n.map(e);
                  return G(r)
                    ? { coordinate: r + l, value: i ? i[e] : e, index: t, offset: l }
                    : null;
                })
                .filter(Tu)
      );
    }
  }),
  U(jD, ik, (e, t) => {
    if (!(e == null || t == null)) return vD(vD({}, e), {}, { scale: t });
  }),
  U(
    (e, t, n) => AD(e, n),
    U([U([jD, VO, BO, ek], uD)], Ox),
    (e, t) => {
      if (!(e == null || t == null)) return vD(vD({}, e), {}, { scale: t });
    },
  );
var vk = U([q, mh, hh], (e, t, n) => {
  switch (e) {
    case `horizontal`:
      return t.some((e) => e.reversed) ? `right-to-left` : `left-to-right`;
    case `vertical`:
      return n.some((e) => e.reversed) ? `bottom-to-top` : `top-to-bottom`;
    case `centric`:
    case `radial`:
      return `left-to-right`;
    default:
      return;
  }
});
U([(e, t, n) => e.renderedTicks[t]?.[n]], (e) => {
  if (!(!e || e.length === 0))
    return (t) => {
      var n = 1 / 0,
        r = e[0];
      for (var i of e) {
        var a = Math.abs(i.coordinate - t);
        a < n && ((n = a), (r = i));
      }
      return r?.value;
    };
});
var yk = (e) => e.options.defaultTooltipEventType,
  bk = (e) => e.options.validateTooltipEventTypes;
function xk(e, t, n) {
  if (e == null) return t;
  var r = e ? `axis` : `item`;
  return n == null ? t : n.includes(r) ? r : t;
}
function Sk(e, t) {
  return xk(t, yk(e), bk(e));
}
function Ck(e) {
  return H((t) => Sk(t, e));
}
var wk = (e, t) => {
    var n,
      r = Number(t);
    if (!(mu(r) || t == null))
      return r >= 0 ? (e == null || (n = e[r]) == null ? void 0 : n.value) : void 0;
  },
  Tk = (e) => e.tooltip.settings,
  Ek = { active: !1, index: null, dataKey: void 0, graphicalItemId: void 0, coordinate: void 0 },
  Dk = Xp({
    name: `tooltip`,
    initialState: {
      itemInteraction: { click: Ek, hover: Ek },
      axisInteraction: { click: Ek, hover: Ek },
      keyboardInteraction: Ek,
      syncInteraction: {
        active: !1,
        index: null,
        dataKey: void 0,
        label: void 0,
        coordinate: void 0,
        sourceViewBox: void 0,
        graphicalItemId: void 0,
      },
      tooltipItemPayloads: [],
      settings: { shared: void 0, trigger: `hover`, axisId: 0, active: !1, defaultIndex: void 0 },
    },
    reducers: {
      addTooltipEntrySettings: {
        reducer(e, t) {
          e.tooltipItemPayloads.push(J(t.payload));
        },
        prepare: W(),
      },
      replaceTooltipEntrySettings: {
        reducer(e, t) {
          var { prev: n, next: r } = t.payload,
            i = Cp(e).tooltipItemPayloads.indexOf(J(n));
          i > -1 && (e.tooltipItemPayloads[i] = J(r));
        },
        prepare: W(),
      },
      removeTooltipEntrySettings: {
        reducer(e, t) {
          var n = Cp(e).tooltipItemPayloads.indexOf(J(t.payload));
          n > -1 && e.tooltipItemPayloads.splice(n, 1);
        },
        prepare: W(),
      },
      setTooltipSettingsState(e, t) {
        e.settings = t.payload;
      },
      setActiveMouseOverItemIndex(e, t) {
        (e.syncInteraction.active = !1),
          (e.syncInteraction.sourceViewBox = void 0),
          (e.keyboardInteraction.active = !1),
          (e.itemInteraction.hover.active = !0),
          (e.itemInteraction.hover.index = t.payload.activeIndex),
          (e.itemInteraction.hover.dataKey = t.payload.activeDataKey),
          (e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId),
          (e.itemInteraction.hover.coordinate = t.payload.activeCoordinate);
      },
      mouseLeaveChart(e) {
        (e.itemInteraction.hover.active = !1), (e.axisInteraction.hover.active = !1);
      },
      mouseLeaveItem(e) {
        e.itemInteraction.hover.active = !1;
      },
      setActiveClickItemIndex(e, t) {
        (e.syncInteraction.active = !1),
          (e.syncInteraction.sourceViewBox = void 0),
          (e.itemInteraction.click.active = !0),
          (e.keyboardInteraction.active = !1),
          (e.itemInteraction.click.index = t.payload.activeIndex),
          (e.itemInteraction.click.dataKey = t.payload.activeDataKey),
          (e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId),
          (e.itemInteraction.click.coordinate = t.payload.activeCoordinate);
      },
      setMouseOverAxisIndex(e, t) {
        (e.syncInteraction.active = !1),
          (e.syncInteraction.sourceViewBox = void 0),
          (e.axisInteraction.hover.active = !0),
          (e.keyboardInteraction.active = !1),
          (e.axisInteraction.hover.index = t.payload.activeIndex),
          (e.axisInteraction.hover.dataKey = t.payload.activeDataKey),
          (e.axisInteraction.hover.coordinate = t.payload.activeCoordinate);
      },
      setMouseClickAxisIndex(e, t) {
        (e.syncInteraction.active = !1),
          (e.syncInteraction.sourceViewBox = void 0),
          (e.keyboardInteraction.active = !1),
          (e.axisInteraction.click.active = !0),
          (e.axisInteraction.click.index = t.payload.activeIndex),
          (e.axisInteraction.click.dataKey = t.payload.activeDataKey),
          (e.axisInteraction.click.coordinate = t.payload.activeCoordinate);
      },
      setSyncInteraction(e, t) {
        e.syncInteraction = t.payload;
      },
      setKeyboardInteraction(e, t) {
        (e.keyboardInteraction.active = t.payload.active),
          (e.keyboardInteraction.index = t.payload.activeIndex),
          (e.keyboardInteraction.coordinate = t.payload.activeCoordinate);
      },
    },
  }),
  {
    addTooltipEntrySettings: Ok,
    replaceTooltipEntrySettings: kk,
    removeTooltipEntrySettings: Ak,
    setTooltipSettingsState: jk,
    setActiveMouseOverItemIndex: Mk,
    mouseLeaveItem: Nk,
    mouseLeaveChart: Pk,
    setActiveClickItemIndex: Fk,
    setMouseOverAxisIndex: Ik,
    setMouseClickAxisIndex: Lk,
    setSyncInteraction: Rk,
    setKeyboardInteraction: zk,
  } = Dk.actions,
  Bk = Dk.reducer;
function Vk(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Hk(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Vk(Object(n), !0).forEach(function (t) {
          Uk(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Vk(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Uk(e, t, n) {
  return (
    (t = Wk(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Wk(e) {
  var t = Gk(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Gk(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Kk(e, t, n) {
  return t === `axis`
    ? n === `click`
      ? e.axisInteraction.click
      : e.axisInteraction.hover
    : n === `click`
      ? e.itemInteraction.click
      : e.itemInteraction.hover;
}
function qk(e) {
  return e.index != null;
}
var Jk = (e, t, n, r) => {
  if (t == null) return Ek;
  var i = Kk(e, t, n);
  if (i == null) return Ek;
  if (i.active) return i;
  if (e.keyboardInteraction.active) return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null) return e.syncInteraction;
  var a = e.settings.active === !0;
  if (qk(i)) {
    if (a) return Hk(Hk({}, i), {}, { active: !0 });
  } else if (r != null)
    return { active: !0, coordinate: void 0, dataKey: void 0, index: r, graphicalItemId: void 0 };
  return Hk(Hk({}, Ek), {}, { coordinate: i.coordinate });
};
function Yk(e) {
  if (typeof e == `number`) return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var n = Number(e);
  return Number.isFinite(n) ? n : void 0;
}
function Xk(e, t) {
  var n = Yk(e),
    r = t[0],
    i = t[1];
  return n === void 0 ? !1 : n >= Math.min(r, i) && n <= Math.max(r, i);
}
function Zk(e, t, n) {
  if (n == null || t == null) return !0;
  var r = K(e, t);
  return r == null || !jb(n) ? !0 : Xk(r, n);
}
var Qk = (e, t, n, r) => {
    var i = e?.index;
    if (i == null) return null;
    var a = Number(i);
    if (!G(a)) return i;
    var o = 0,
      s = 1 / 0;
    t.length > 0 && (s = t.length - 1);
    var c = Math.max(o, Math.min(a, s)),
      l = t[c];
    return l == null || Zk(l, n, r) ? String(c) : null;
  },
  $k = (e, t, n, r, i, a, o) => {
    if (a != null) {
      var s = o[0]?.getPosition(a);
      if (s != null) return s;
      var c = i?.[Number(a)];
      if (c)
        switch (n) {
          case `horizontal`:
            return { x: c.coordinate, y: (r.top + t) / 2 };
          default:
            return { x: (r.left + e) / 2, y: c.coordinate };
        }
    }
  },
  eA = (e, t, n, r) => {
    if (t === `axis`) return e.tooltipItemPayloads;
    if (e.tooltipItemPayloads.length === 0) return [];
    var i =
      n === `hover`
        ? e.itemInteraction.hover.graphicalItemId
        : e.itemInteraction.click.graphicalItemId;
    if (e.syncInteraction.active && i == null) return e.tooltipItemPayloads;
    if (i == null && (r != null || e.keyboardInteraction.active)) {
      var a = e.tooltipItemPayloads[0];
      return a == null ? [] : [a];
    }
    return e.tooltipItemPayloads.filter((e) => e.settings?.graphicalItemId === i);
  },
  tA = (e) => e.options.tooltipPayloadSearcher,
  nA = (e) => e.tooltip;
function rA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function iA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? rA(Object(n), !0).forEach(function (t) {
          aA(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : rA(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function aA(e, t, n) {
  return (
    (t = oA(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function oA(e) {
  var t = sA(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function sA(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function cA(e) {
  if (typeof e == `string` || typeof e == `number`) return e;
}
function lA(e) {
  if (typeof e == `string` || typeof e == `number` || typeof e == `boolean`) return e;
}
function uA(e) {
  if (typeof e == `string` || typeof e == `number`) return e;
  if (typeof e == `function`) return (t) => e(t);
}
function dA(e) {
  if (typeof e == `string`) return e;
}
function fA(e) {
  if (!(typeof e != `object` || !e))
    return {
      name: `name` in e ? cA(e.name) : void 0,
      unit: `unit` in e ? lA(e.unit) : void 0,
      dataKey: `dataKey` in e ? uA(e.dataKey) : void 0,
      payload: `payload` in e ? e.payload : void 0,
      color: `color` in e ? dA(e.color) : void 0,
      fill: `fill` in e ? dA(e.fill) : void 0,
    };
}
function pA(e, t) {
  return e ?? t;
}
var mA = (e, t, n, r, i, a, o) => {
    if (!(t == null || a == null)) {
      var { chartData: s, computedData: c, dataStartIndex: l, dataEndIndex: u } = n;
      return e.reduce((e, n) => {
        var { dataDefinedOnItem: d, settings: f } = n,
          p = pA(d, s),
          m = Array.isArray(p) ? Wm(p, l, u) : p,
          h = f?.dataKey ?? r,
          g = f?.nameKey,
          _ =
            r && Array.isArray(m) && !Array.isArray(m[0]) && o === `axis`
              ? Su(m, r, i)
              : a(m, t, c, g);
        return (
          Array.isArray(_)
            ? _.forEach((t) => {
                var n = fA(t),
                  r = n?.name,
                  i = n?.dataKey,
                  a = n?.payload,
                  o = iA(
                    iA({}, f),
                    {},
                    {
                      name: r,
                      unit: n?.unit,
                      color: n?.color ?? f?.color,
                      fill: n?.fill ?? f?.fill,
                    },
                  );
                e.push(
                  sh({
                    tooltipEntrySettings: o,
                    dataKey: i,
                    payload: a,
                    value: K(a, i),
                    name: r == null ? void 0 : String(r),
                  }),
                );
              })
            : e.push(
                sh({
                  tooltipEntrySettings: f,
                  dataKey: h,
                  payload: _,
                  value: K(_, h),
                  name: K(_, g) ?? f?.name,
                }),
              ),
          e
        );
      }, []);
    }
  },
  hA = U([$, PD, qb], pD),
  gA = U(
    [
      U([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [
        ...e,
        ...t,
      ]),
      $,
      U([Ex, Dx], FD),
    ],
    RD,
    { memoizeOptions: { resultEqualityCheck: wx } },
  ),
  _A = U([gA], (e) => e.filter(Sx)),
  vA = U([gA], UD, { memoizeOptions: { resultEqualityCheck: wx } }),
  yA = U([gA], (e) => e.some((e) => !e.data)),
  bA = U([vA, Eb], KD),
  xA = U([_A, Eb, $], xx),
  SA = U([bA, $, gA, Eb, yA, vA], YD),
  CA = U([$], uO),
  wA = U([CA, U([$], (e) => e.allowDataOverflow)], Nb),
  TA = U([U([xA, U([gA], (e) => e.filter(Sx)), Gb, Kb], oO), Eb, Ex, wA], cO),
  EA = U([bA, $, U([gA], VD), mO, Ex, Ab], _O, { memoizeOptions: { resultEqualityCheck: Cx } }),
  DA = U([U([xO, Ex, Dx], SO), Ex], OO),
  OA = U([U([wO, Ex, Dx], SO), Ex], AO),
  kA = U(
    [
      $,
      q,
      bA,
      SA,
      Gb,
      Ex,
      U([$, CA, wA, TA, EA, U([DA, U([U([EO, Ex, Dx], SO), Ex], PO), OA], gO), q, Ex], IO),
    ],
    zO,
  ),
  AA = U([$, kA, U([kA, $, hA], HO), Ex], WO),
  jA = (e) => $O(e, Ex(e), Dx(e), !1),
  MA = U([$, jA], ex),
  NA = U([U([$, hA, AA, MA], uD)], Ox),
  PA = U(
    [q, $, hA, NA, jA, U([q, SA, $, Ex], gk), U([q, SA, $, Ex], nk), Ex],
    (e, t, n, r, i, a, o, s) => {
      if (t) {
        var { type: c } = t,
          l = Qm(e, s);
        if (r) {
          var u = n === `scaleBand` && r.bandwidth ? r.bandwidth() / 2 : 2,
            d = c === `category` && r.bandwidth ? r.bandwidth() / u : 0;
          return (
            (d = s === `angleAxis` && i != null && i?.length >= 2 ? pu(i[0] - i[1]) * 2 * d : d),
            l && o
              ? o
                  .map((e, t) => {
                    var n = r.map(e);
                    return G(n) ? { coordinate: n + d, value: e, index: t, offset: d } : null;
                  })
                  .filter(Tu)
              : r
                  .domain()
                  .map((e, t) => {
                    var n = r.map(e);
                    return G(n)
                      ? { coordinate: n + d, value: a ? a[e] : e, index: t, offset: d }
                      : null;
                  })
                  .filter(Tu)
          );
        }
      }
    },
  ),
  FA = U([yk, bk, Tk], (e, t, n) => xk(n.shared, e, t)),
  IA = (e) => e.tooltip.settings.trigger,
  LA = (e) => e.tooltip.settings.defaultIndex,
  RA = U([nA, FA, IA, LA], Jk),
  zA = U([RA, bA, iO, kA], Qk),
  BA = U([PA, zA], wk),
  VA = U([RA], (e) => {
    if (e) return e.dataKey;
  }),
  HA = U([RA], (e) => {
    if (e) return e.graphicalItemId;
  }),
  UA = U([nA, FA, IA, LA], eA),
  WA = U([RA, U([uh, dh, q, Dh, PA, LA, UA], $k)], (e, t) =>
    e != null && e.coordinate ? e.coordinate : t,
  ),
  GA = U([RA], (e) => e?.active ?? !1);
U([U([UA, zA, Eb, iO, BA, tA, FA], mA)], (e) => {
  if (e != null) {
    var t = e.map((e) => e.payload).filter((e) => e != null);
    return Array.from(new Set(t));
  }
});
function KA(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function qA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? KA(Object(n), !0).forEach(function (t) {
          JA(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : KA(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function JA(e, t, n) {
  return (
    (t = YA(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function YA(e) {
  var t = XA(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function XA(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var ZA = () => H($),
  QA = () => {
    var e = ZA(),
      t = H(PA),
      n = H(NA);
    return oh(!e || !n ? void 0 : qA(qA({}, e), {}, { scale: n }), t);
  };
function $A(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function ej(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? $A(Object(n), !0).forEach(function (t) {
          tj(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : $A(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function tj(e, t, n) {
  return (
    (t = nj(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function nj(e) {
  var t = rj(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function rj(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var ij = (e, t, n, r) => {
    var i = t.find((e) => e && e.index === n);
    if (i) {
      if (e === `horizontal`) return { x: i.coordinate, y: r.relativeY };
      if (e === `vertical`) return { x: r.relativeX, y: i.coordinate };
    }
    return { x: 0, y: 0 };
  },
  aj = (e, t, n, r) => {
    var i = t.find((e) => e && e.index === n);
    if (i) {
      if (e === `centric`) {
        var a = i.coordinate,
          { radius: o } = r;
        return ej(ej(ej({}, r), Qy(r.cx, r.cy, o, a)), {}, { angle: a, radius: o });
      }
      var s = i.coordinate,
        { angle: c } = r;
      return ej(ej(ej({}, r), Qy(r.cx, r.cy, s, c)), {}, { angle: c, radius: s });
    }
    return {
      angle: 0,
      clockWise: !1,
      cx: 0,
      cy: 0,
      endAngle: 0,
      innerRadius: 0,
      outerRadius: 0,
      radius: 0,
      startAngle: 0,
      x: 0,
      y: 0,
    };
  };
function oj(e, t) {
  var { relativeX: n, relativeY: r } = e;
  return n >= t.left && n <= t.left + t.width && r >= t.top && r <= t.top + t.height;
}
var sj = (e, t, n, r, i) => {
    var a = t?.length ?? 0;
    if (a <= 1 || e == null) return 0;
    if (r === `angleAxis` && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6)
      for (var o = 0; o < a; o++) {
        var s = o > 0 ? n[o - 1]?.coordinate : n[a - 1]?.coordinate,
          c = n[o]?.coordinate,
          l = o >= a - 1 ? n[0]?.coordinate : n[o + 1]?.coordinate,
          u = void 0;
        if (!(s == null || c == null || l == null))
          if (pu(c - s) === pu(l - c)) {
            var h = Math.min(s, l),
              g = Math.max(s, l);
            if (e > (h + c) / 2 && e <= (g + c) / 2) return n[o]?.index;
          } else {
            var d = [];
            if (pu(l - c) === pu(i[1] - i[0])) {
              u = l;
              var f = c + i[1] - i[0];
              (d[0] = Math.min(f, (f + s) / 2)), (d[1] = Math.max(f, (f + s) / 2));
            } else {
              u = s;
              var p = l + i[1] - i[0];
              (d[0] = Math.min(c, (p + c) / 2)), (d[1] = Math.max(c, (p + c) / 2));
            }
            var m = [Math.min(c, (u + c) / 2), Math.max(c, (u + c) / 2)];
            if ((e > m[0] && e <= m[1]) || (e >= d[0] && e <= d[1])) return n[o]?.index;
          }
      }
    else if (t)
      for (var _ = 0; _ < a; _++) {
        var v = t[_];
        if (v != null) {
          var y = t[_ + 1],
            b = t[_ - 1];
          if (
            (_ === 0 && y != null && e <= (v.coordinate + y.coordinate) / 2) ||
            (_ === a - 1 && b != null && e > (v.coordinate + b.coordinate) / 2) ||
            (_ > 0 &&
              _ < a - 1 &&
              b != null &&
              y != null &&
              e > (v.coordinate + b.coordinate) / 2 &&
              e <= (v.coordinate + y.coordinate) / 2)
          )
            return v.index;
        }
      }
    return -1;
  },
  cj = () => H(qb),
  lj = (e, t) => t,
  uj = (e, t, n) => n,
  dj = (e, t, n, r) => r,
  fj = U(PA, (e) => (0, Hd.default)(e, (e) => e.coordinate)),
  pj = U([nA, lj, uj, dj], Jk),
  mj = U([pj, bA, iO, kA], Qk),
  hj = (e, t, n) => {
    if (t != null) {
      var r = nA(e);
      return t === `axis`
        ? n === `hover`
          ? r.axisInteraction.hover.dataKey
          : r.axisInteraction.click.dataKey
        : n === `hover`
          ? r.itemInteraction.hover.dataKey
          : r.itemInteraction.click.dataKey;
    }
  },
  gj = U([nA, lj, uj, dj], eA),
  _j = U([uh, dh, q, Dh, PA, dj, gj], $k),
  vj = U([pj, _j], (e, t) => e.coordinate ?? t),
  yj = U([PA, mj], wk),
  bj = U([gj, mj, Eb, iO, yj, tA, lj], mA),
  xj = U([pj, mj], (e, t) => ({ isActive: e.active && t != null, activeIndex: t })),
  Sj = (e, t, n, r, i, a, o) => {
    if (!(!e || !n || !r || !i) && oj(e, o)) {
      var s = sj(ch(e, t), a, i, n, r),
        c = ij(t, i, s, e);
      return { activeIndex: String(s), activeCoordinate: c };
    }
  },
  Cj = (e, t, n, r, i, a, o) => {
    if (!(!e || !r || !i || !a || !n)) {
      var s = ib(e, n);
      if (s) {
        var c = sj(lh(s, t), o, a, r, i),
          l = aj(t, a, c, s);
        return { activeIndex: String(c), activeCoordinate: l };
      }
    }
  },
  wj = (e, t, n, r, i, a, o, s) => {
    if (!(!e || !t || !r || !i || !a))
      return t === `horizontal` || t === `vertical`
        ? Sj(e, t, r, i, a, o, s)
        : Cj(e, t, n, r, i, a, o);
  },
  Tj = U(
    (e) => e.zIndex.zIndexMap,
    (e, t) => t,
    (e, t, n) => n,
    (e, t, n) => {
      if (t != null) {
        var r = e[t];
        if (r != null) return n ? r.panoramaElement : r.element;
      }
    },
  );
U(
  (e) => e.zIndex.zIndexMap,
  (e) => {
    var t = Object.keys(e)
      .map((e) => parseInt(e, 10))
      .concat(Object.values(Zb));
    return Array.from(new Set(t)).sort((e, t) => e - t);
  },
  { memoizeOptions: { resultEqualityCheck: Tx } },
);
function Ej(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Dj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Ej(Object(n), !0).forEach(function (t) {
          Oj(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ej(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Oj(e, t, n) {
  return (
    (t = kj(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function kj(e) {
  var t = Aj(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Aj(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var jj = {
    zIndexMap: Object.values(Zb).reduce(
      (e, t) =>
        Dj(Dj({}, e), {}, { [t]: { element: void 0, panoramaElement: void 0, consumers: 0 } }),
      {},
    ),
  },
  Mj = new Set(Object.values(Zb));
function Nj(e) {
  return Mj.has(e);
}
var Pj = Xp({
    name: `zIndex`,
    initialState: jj,
    reducers: {
      registerZIndexPortal: {
        reducer: (e, t) => {
          var { zIndex: n } = t.payload;
          e.zIndexMap[n]
            ? (e.zIndexMap[n].consumers += 1)
            : (e.zIndexMap[n] = { consumers: 1, element: void 0, panoramaElement: void 0 });
        },
        prepare: W(),
      },
      unregisterZIndexPortal: {
        reducer: (e, t) => {
          var { zIndex: n } = t.payload;
          e.zIndexMap[n] &&
            (--e.zIndexMap[n].consumers,
            e.zIndexMap[n].consumers <= 0 && !Nj(n) && delete e.zIndexMap[n]);
        },
        prepare: W(),
      },
      registerZIndexPortalElement: {
        reducer: (e, t) => {
          var { zIndex: n, element: r, isPanorama: i } = t.payload;
          e.zIndexMap[n]
            ? i
              ? (e.zIndexMap[n].panoramaElement = J(r))
              : (e.zIndexMap[n].element = J(r))
            : (e.zIndexMap[n] = {
                consumers: 0,
                element: i ? void 0 : J(r),
                panoramaElement: i ? J(r) : void 0,
              });
        },
        prepare: W(),
      },
      unregisterZIndexPortalElement: {
        reducer: (e, t) => {
          var { zIndex: n } = t.payload;
          e.zIndexMap[n] &&
            (t.payload.isPanorama
              ? (e.zIndexMap[n].panoramaElement = void 0)
              : (e.zIndexMap[n].element = void 0));
        },
        prepare: W(),
      },
    },
  }),
  {
    registerZIndexPortal: Fj,
    unregisterZIndexPortal: Ij,
    registerZIndexPortalElement: Lj,
    unregisterZIndexPortalElement: Rj,
  } = Pj.actions,
  zj = Pj.reducer;
function Bj(e) {
  var { zIndex: t, children: n } = e,
    r = fg() && t !== void 0 && t !== 0,
    i = Ah(),
    s = (0, a.useRef)(void 0),
    c = (0, a.useRef)(new Set()),
    l = _d(),
    u = H((e) => Tj(e, t, i));
  if (
    ((0, a.useLayoutEffect)(() => {
      if (!r) {
        var e = c.current;
        e.forEach((e) => {
          l(Ij({ zIndex: e }));
        }),
          e.clear(),
          (s.current = void 0);
        return;
      }
      if ((c.current.has(t) || (l(Fj({ zIndex: t })), c.current.add(t)), u)) {
        s.current = u;
        var n = c.current;
        n.forEach((e) => {
          e !== t && (l(Ij({ zIndex: e })), n.delete(e));
        });
      }
    }, [l, t, r, u]),
    (0, a.useLayoutEffect)(() => {
      var e = c.current;
      return () => {
        e.forEach((e) => {
          l(Ij({ zIndex: e }));
        }),
          e.clear();
      };
    }, [l]),
    !r)
  )
    return n;
  var d = u ?? s.current;
  return d ? (0, o.createPortal)(n, d) : null;
}
function Vj() {
  return (
    (Vj = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Vj.apply(null, arguments)
  );
}
function Hj(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Uj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Hj(Object(n), !0).forEach(function (t) {
          Wj(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Hj(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Wj(e, t, n) {
  return (
    (t = Gj(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Gj(e) {
  var t = Kj(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Kj(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function qj(e) {
  var { cursor: t, cursorComp: n, cursorProps: r } = e;
  return (0, a.isValidElement)(t) ? (0, a.cloneElement)(t, r) : (0, a.createElement)(n, r);
}
function Jj(e) {
  var {
      coordinate: t,
      payload: n,
      index: r,
      offset: i,
      tooltipAxisBandSize: o,
      layout: s,
      cursor: l,
      tooltipEventType: u,
      chartName: d,
    } = e,
    f = t,
    p = n,
    m = r;
  if (!l || !f || (d !== `ScatterChart` && u !== `axis`)) return null;
  var h, g, _;
  if (d === `ScatterChart`) (h = f), (g = Pv), (_ = Zb.cursorLine);
  else if (d === `BarChart`) (h = Fv(s, f, i, o)), (g = Wy), (_ = Zb.cursorRectangle);
  else if (s === `radial` && Du(f)) {
    var { cx: v, cy: y, radius: b, startAngle: x, endAngle: S } = ab(f);
    (h = { cx: v, cy: y, startAngle: x, endAngle: S, innerRadius: b, outerRadius: b }),
      (g = bb),
      (_ = Zb.cursorLine);
  } else (h = { points: xb(s, f, i) }), (g = Cv), (_ = Zb.cursorLine);
  var C = typeof l == `object` && `className` in l ? l.className : void 0,
    w = Uj(
      Uj(Uj(Uj({ stroke: `#ccc`, pointerEvents: `none` }, i), h), Gc(l)),
      {},
      { payload: p, payloadIndex: m, className: c(`recharts-tooltip-cursor`, C) },
    );
  return a.createElement(
    Bj,
    { zIndex: e.zIndex ?? _ },
    a.createElement(qj, { cursor: l, cursorComp: g, cursorProps: w }),
  );
}
function Yj(e) {
  var t = QA(),
    n = sg(),
    r = ug(),
    i = cj();
  return t == null || n == null || r == null || i == null
    ? null
    : a.createElement(
        Jj,
        Vj({}, e, { offset: n, layout: r, tooltipAxisBandSize: t, chartName: i }),
      );
}
var Xj = (0, a.createContext)(null),
  Zj = () => (0, a.useContext)(Xj),
  Qj = e(
    n((e, t) => {
      var n = Object.prototype.hasOwnProperty,
        r = `~`;
      function i() {}
      Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (r = !1));
      function a(e, t, n) {
        (this.fn = e), (this.context = t), (this.once = n || !1);
      }
      function o(e, t, n, i, o) {
        if (typeof n != `function`) throw TypeError(`The listener must be a function`);
        var s = new a(n, i || e, o),
          c = r ? r + t : t;
        return (
          e._events[c]
            ? e._events[c].fn
              ? (e._events[c] = [e._events[c], s])
              : e._events[c].push(s)
            : ((e._events[c] = s), e._eventsCount++),
          e
        );
      }
      function s(e, t) {
        --e._eventsCount === 0 ? (e._events = new i()) : delete e._events[t];
      }
      function c() {
        (this._events = new i()), (this._eventsCount = 0);
      }
      (c.prototype.eventNames = function () {
        var e = [],
          t,
          i;
        if (this._eventsCount === 0) return e;
        for (i in (t = this._events)) n.call(t, i) && e.push(r ? i.slice(1) : i);
        return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
      }),
        (c.prototype.listeners = function (e) {
          var t = r ? r + e : e,
            n = this._events[t];
          if (!n) return [];
          if (n.fn) return [n.fn];
          for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
          return o;
        }),
        (c.prototype.listenerCount = function (e) {
          var t = r ? r + e : e,
            n = this._events[t];
          return n ? (n.fn ? 1 : n.length) : 0;
        }),
        (c.prototype.emit = function (e, t, n, i, a, o) {
          var s = r ? r + e : e;
          if (!this._events[s]) return !1;
          var c = this._events[s],
            l = arguments.length,
            u,
            d;
          if (c.fn) {
            switch ((c.once && this.removeListener(e, c.fn, void 0, !0), l)) {
              case 1:
                return c.fn.call(c.context), !0;
              case 2:
                return c.fn.call(c.context, t), !0;
              case 3:
                return c.fn.call(c.context, t, n), !0;
              case 4:
                return c.fn.call(c.context, t, n, i), !0;
              case 5:
                return c.fn.call(c.context, t, n, i, a), !0;
              case 6:
                return c.fn.call(c.context, t, n, i, a, o), !0;
            }
            for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
            c.fn.apply(c.context, u);
          } else {
            var f = c.length,
              p;
            for (d = 0; d < f; d++)
              switch ((c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l)) {
                case 1:
                  c[d].fn.call(c[d].context);
                  break;
                case 2:
                  c[d].fn.call(c[d].context, t);
                  break;
                case 3:
                  c[d].fn.call(c[d].context, t, n);
                  break;
                case 4:
                  c[d].fn.call(c[d].context, t, n, i);
                  break;
                default:
                  if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
                  c[d].fn.apply(c[d].context, u);
              }
          }
          return !0;
        }),
        (c.prototype.on = function (e, t, n) {
          return o(this, e, t, n, !1);
        }),
        (c.prototype.once = function (e, t, n) {
          return o(this, e, t, n, !0);
        }),
        (c.prototype.removeListener = function (e, t, n, i) {
          var a = r ? r + e : e;
          if (!this._events[a]) return this;
          if (!t) return s(this, a), this;
          var o = this._events[a];
          if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
          else {
            for (var c = 0, l = [], u = o.length; c < u; c++)
              (o[c].fn !== t || (i && !o[c].once) || (n && o[c].context !== n)) && l.push(o[c]);
            l.length ? (this._events[a] = l.length === 1 ? l[0] : l) : s(this, a);
          }
          return this;
        }),
        (c.prototype.removeAllListeners = function (e) {
          var t;
          return (
            e
              ? ((t = r ? r + e : e), this._events[t] && s(this, t))
              : ((this._events = new i()), (this._eventsCount = 0)),
            this
          );
        }),
        (c.prototype.off = c.prototype.removeListener),
        (c.prototype.addListener = c.prototype.on),
        (c.prefixed = r),
        (c.EventEmitter = c),
        t !== void 0 && (t.exports = c);
    })(),
    1,
  ).default,
  $j = new Qj(),
  eM = `recharts.syncEvent.tooltip`,
  tM = `recharts.syncEvent.brush`,
  nM = Xp({
    name: `options`,
    initialState: {
      chartName: ``,
      tooltipPayloadSearcher: () => void 0,
      eventEmitter: void 0,
      defaultTooltipEventType: `axis`,
    },
    reducers: {
      createEventEmitter: (e) => {
        e.eventEmitter ??= Symbol(`rechartsEventEmitter`);
      },
    },
  }),
  rM = nM.reducer,
  { createEventEmitter: iM } = nM.actions;
function aM(e) {
  return e.tooltip.syncInteraction;
}
var oM = Xp({
    name: `chartData`,
    initialState: { chartData: void 0, computedData: void 0, dataStartIndex: 0, dataEndIndex: 0 },
    reducers: {
      setChartData(e, t) {
        if (((e.chartData = J(t.payload)), t.payload == null)) {
          (e.dataStartIndex = 0), (e.dataEndIndex = 0);
          return;
        }
        t.payload.length > 0 &&
          e.dataEndIndex !== t.payload.length - 1 &&
          (e.dataEndIndex = t.payload.length - 1);
      },
      setComputedData(e, t) {
        e.computedData = t.payload;
      },
      setDataStartEndIndexes(e, t) {
        var { startIndex: n, endIndex: r } = t.payload;
        n != null && (e.dataStartIndex = n), r != null && (e.dataEndIndex = r);
      },
    },
  }),
  { setChartData: sM, setDataStartEndIndexes: cM, setComputedData: lM } = oM.actions,
  uM = oM.reducer,
  dM = [`x`, `y`];
function fM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function pM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? fM(Object(n), !0).forEach(function (t) {
          mM(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : fM(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function mM(e, t, n) {
  return (
    (t = hM(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function hM(e) {
  var t = gM(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function gM(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function _M(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = vM(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function vM(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
function yM() {
  var e = H(Jb),
    t = H(Xb),
    n = _d(),
    r = H(Yb),
    i = H(PA),
    o = ug(),
    s = ag();
  (0, a.useEffect)(() => {
    if (e == null) return Eu;
    var a = (a, c, l) => {
      if (t !== l && e === a) {
        if (c.payload.active === !1) {
          n(
            Rk({
              active: !1,
              coordinate: void 0,
              dataKey: void 0,
              index: null,
              label: void 0,
              sourceViewBox: void 0,
              graphicalItemId: void 0,
            }),
          );
          return;
        }
        if (r === `index`) {
          var u;
          if (
            s &&
            c != null &&
            (u = c.payload) != null &&
            u.coordinate &&
            c.payload.sourceViewBox
          ) {
            var d = c.payload.coordinate,
              { x: f, y: p } = d,
              m = _M(d, dM),
              { x: h, y: g, width: _, height: v } = c.payload.sourceViewBox,
              y = pM(
                pM({}, m),
                {},
                {
                  x: s.x + (_ ? (f - h) / _ : 0) * s.width,
                  y: s.y + (v ? (p - g) / v : 0) * s.height,
                },
              );
            n(pM(pM({}, c), {}, { payload: pM(pM({}, c.payload), {}, { coordinate: y }) }));
          } else n(c);
          return;
        }
        if (i != null) {
          var b;
          typeof r == `function`
            ? (b =
                i[
                  r(i, {
                    activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
                    isTooltipActive: c.payload.active,
                    activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
                    activeLabel: c.payload.label,
                    activeDataKey: c.payload.dataKey,
                    activeCoordinate: c.payload.coordinate,
                  })
                ])
            : r === `value` && (b = i.find((e) => String(e.value) === c.payload.label));
          var { coordinate: x } = c.payload;
          if (x == null || s == null) {
            n(
              Rk({
                active: !1,
                coordinate: void 0,
                dataKey: void 0,
                index: null,
                label: void 0,
                sourceViewBox: void 0,
                graphicalItemId: void 0,
              }),
            );
            return;
          }
          if (b == null) {
            n(
              Rk({
                active: !1,
                coordinate: void 0,
                dataKey: void 0,
                index: null,
                label: void 0,
                sourceViewBox: c.payload.sourceViewBox,
                graphicalItemId: void 0,
              }),
            );
            return;
          }
          var { x: S, y: C } = x,
            w = Math.min(S, s.x + s.width),
            T = Math.min(C, s.y + s.height),
            E = {
              x: o === `horizontal` ? b.coordinate : w,
              y: o === `horizontal` ? T : b.coordinate,
            };
          n(
            Rk({
              active: c.payload.active,
              coordinate: E,
              dataKey: c.payload.dataKey,
              index: String(b.index),
              label: c.payload.label,
              sourceViewBox: c.payload.sourceViewBox,
              graphicalItemId: c.payload.graphicalItemId,
            }),
          );
        }
      }
    };
    return (
      $j.on(eM, a),
      () => {
        $j.off(eM, a);
      }
    );
  }, [H((e) => e.rootProps.className), n, t, e, r, i, o, s]);
}
function bM() {
  var e = H(Jb),
    t = H(Xb),
    n = _d();
  (0, a.useEffect)(() => {
    if (e == null) return Eu;
    var r = (r, i, a) => {
      t !== a && e === r && n(cM(i));
    };
    return (
      $j.on(tM, r),
      () => {
        $j.off(tM, r);
      }
    );
  }, [n, t, e]);
}
function xM() {
  var e = _d();
  (0, a.useEffect)(() => {
    e(iM());
  }, [e]),
    yM(),
    bM();
}
function SM(e, t, n, r, i, o) {
  var s = H((n) => hj(n, e, t)),
    c = H(HA),
    l = H(Xb),
    u = H(Jb),
    d = H(Yb),
    f = H(aM)?.sourceViewBox != null,
    p = ag();
  (0, a.useEffect)(() => {
    if (!f && u != null && l != null) {
      var e = Rk({
        active: o,
        coordinate: n,
        dataKey: s,
        index: i,
        label: typeof r == `number` ? String(r) : r,
        sourceViewBox: p,
        graphicalItemId: c,
      });
      $j.emit(eM, u, e, l);
    }
  }, [f, n, s, c, i, r, l, u, d, o, p]);
}
function CM(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function wM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? CM(Object(n), !0).forEach(function (t) {
          TM(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : CM(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function TM(e, t, n) {
  return (
    (t = EM(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function EM(e) {
  var t = DM(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function DM(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function OM(e) {
  return e.dataKey;
}
function kM(e, t) {
  return a.isValidElement(e)
    ? a.cloneElement(e, t)
    : typeof e == `function`
      ? a.createElement(e, t)
      : a.createElement(G_, t);
}
var AM = [],
  jM = {
    allowEscapeViewBox: { x: !1, y: !1 },
    animationDuration: 400,
    animationEasing: `ease`,
    axisId: 0,
    contentStyle: {},
    cursor: !0,
    filterNull: !0,
    includeHidden: !1,
    isAnimationActive: `auto`,
    itemSorter: `name`,
    itemStyle: {},
    labelStyle: {},
    offset: 10,
    reverseDirection: { x: !1, y: !1 },
    separator: ` : `,
    trigger: `hover`,
    useTranslate3d: !1,
    wrapperStyle: {},
  };
function MM(e) {
  var t = Pu(e, jM),
    {
      active: n,
      allowEscapeViewBox: r,
      animationDuration: i,
      animationEasing: s,
      content: c,
      filterNull: l,
      isAnimationActive: u,
      offset: d,
      payloadUniqBy: f,
      position: p,
      reverseDirection: m,
      useTranslate3d: h,
      wrapperStyle: g,
      cursor: _,
      shared: v,
      trigger: y,
      defaultIndex: b,
      portal: x,
      axisId: S,
    } = t,
    C = _d(),
    w = typeof b == `number` ? String(b) : b;
  (0, a.useEffect)(() => {
    C(jk({ shared: v, trigger: y, axisId: S, active: n, defaultIndex: w }));
  }, [C, v, y, S, n, w]);
  var T = ag(),
    E = cv(),
    D = Ck(v),
    { activeIndex: O, isActive: k } = H((e) => xj(e, D, y, w)) ?? {},
    ee = H((e) => bj(e, D, y, w)),
    te = H((e) => yj(e, D, y, w)),
    A = H((e) => vj(e, D, y, w)),
    j = ee,
    ne = Zj(),
    re = n ?? k ?? !1,
    [ie, ae] = Kd([j, re]),
    oe = D === `axis` ? te : void 0;
  SM(D, y, A, oe, O, re);
  var se = x ?? ne;
  if (se == null || T == null || D == null) return null;
  var ce = j ?? AM;
  re || (ce = AM),
    l &&
      ce.length &&
      (ce = ud(
        ce.filter((e) => e.value != null && (e.hide !== !0 || t.includeHidden)),
        f,
        OM,
      ));
  var le = ce.length > 0,
    ue = wM(
      wM({}, t),
      {},
      { payload: ce, label: oe, active: re, activeIndex: O, coordinate: A, accessibilityLayer: E },
    ),
    de = a.createElement(
      sv,
      {
        allowEscapeViewBox: r,
        animationDuration: i,
        animationEasing: s,
        isAnimationActive: u,
        active: re,
        coordinate: A,
        hasPayload: le,
        offset: d,
        position: p,
        reverseDirection: m,
        useTranslate3d: h,
        viewBox: T,
        wrapperStyle: g,
        lastBoundingBox: ie,
        innerRef: ae,
        hasPortalFromProps: !!x,
      },
      kM(c, ue),
    );
  return a.createElement(
    a.Fragment,
    null,
    (0, o.createPortal)(de, se),
    re &&
      a.createElement(Yj, { cursor: _, tooltipEventType: D, coordinate: A, payload: ce, index: O }),
  );
}
var NM = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    function t(e, t) {
      if (e.length === 0) return;
      let n = e[0],
        r = t(n, 0, e);
      for (let i = 1; i < e.length; i++) {
        const a = e[i],
          o = t(a, i, e);
        o > r && ((r = o), (n = a));
      }
      return n;
    }
    e.maxBy = t;
  }),
  PM = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = NM(),
      n = Lu(),
      r = sd();
    function i(e, i) {
      if (e != null) return t.maxBy(Array.from(e), r.iteratee(i ?? n.identity));
    }
    e.maxBy = i;
  }),
  FM = e(
    n((e, t) => {
      t.exports = PM().maxBy;
    })(),
  ),
  IM = Xp({
    name: `polarAxis`,
    initialState: { radiusAxis: {}, angleAxis: {} },
    reducers: {
      addRadiusAxis(e, t) {
        e.radiusAxis[t.payload.id] = J(t.payload);
      },
      removeRadiusAxis(e, t) {
        delete e.radiusAxis[t.payload.id];
      },
      addAngleAxis(e, t) {
        e.angleAxis[t.payload.id] = J(t.payload);
      },
      removeAngleAxis(e, t) {
        delete e.angleAxis[t.payload.id];
      },
    },
  }),
  { addRadiusAxis: LM, removeRadiusAxis: RM, addAngleAxis: zM, removeAngleAxis: BM } = IM.actions,
  VM = IM.reducer;
function HM(e) {
  var { tooltipEntrySettings: t } = e,
    n = _d(),
    r = Ah(),
    i = (0, a.useRef)(null);
  return (
    (0, a.useLayoutEffect)(() => {
      r ||
        (i.current === null ? n(Ok(t)) : i.current !== t && n(kk({ prev: i.current, next: t })),
        (i.current = t));
    }, [t, n, r]),
    (0, a.useLayoutEffect)(
      () => () => {
        i.current &&= (n(Ak(i.current)), null);
      },
      [n],
    ),
    null
  );
}
var UM =
  a.useId ??
  (() => {
    var [e] = a.useState(() => vu(`uid-`));
    return e;
  });
function WM(e, t) {
  var n = UM();
  return t || (e ? `${e}-${n}` : n);
}
var GM = (0, a.createContext)(void 0),
  KM = (e) => {
    var { id: t, type: n, children: r } = e,
      i = WM(`recharts-${n}`, t);
    return a.createElement(GM.Provider, { value: i }, r(i));
  },
  qM = Xp({
    name: `graphicalItems`,
    initialState: { cartesianItems: [], polarItems: [] },
    reducers: {
      addCartesianGraphicalItem: {
        reducer(e, t) {
          e.cartesianItems.push(J(t.payload));
        },
        prepare: W(),
      },
      replaceCartesianGraphicalItem: {
        reducer(e, t) {
          var { prev: n, next: r } = t.payload,
            i = Cp(e).cartesianItems.indexOf(J(n));
          i > -1 && (e.cartesianItems[i] = J(r));
        },
        prepare: W(),
      },
      removeCartesianGraphicalItem: {
        reducer(e, t) {
          var n = Cp(e).cartesianItems.indexOf(J(t.payload));
          n > -1 && e.cartesianItems.splice(n, 1);
        },
        prepare: W(),
      },
      addPolarGraphicalItem: {
        reducer(e, t) {
          e.polarItems.push(J(t.payload));
        },
        prepare: W(),
      },
      removePolarGraphicalItem: {
        reducer(e, t) {
          var n = Cp(e).polarItems.indexOf(J(t.payload));
          n > -1 && e.polarItems.splice(n, 1);
        },
        prepare: W(),
      },
      replacePolarGraphicalItem: {
        reducer(e, t) {
          var { prev: n, next: r } = t.payload,
            i = Cp(e).polarItems.indexOf(J(n));
          i > -1 && (e.polarItems[i] = J(r));
        },
        prepare: W(),
      },
    },
  }),
  {
    addCartesianGraphicalItem: JM,
    replaceCartesianGraphicalItem: YM,
    removeCartesianGraphicalItem: XM,
    addPolarGraphicalItem: ZM,
    removePolarGraphicalItem: QM,
    replacePolarGraphicalItem: $M,
  } = qM.actions,
  eN = qM.reducer;
function tN(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function nN(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? tN(Object(n), !0).forEach(function (t) {
          rN(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : tN(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function rN(e, t, n) {
  return (
    (t = iN(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function iN(e) {
  var t = aN(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function aN(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var oN = Xp({
    name: `cartesianAxis`,
    initialState: { xAxis: {}, yAxis: {}, zAxis: {} },
    reducers: {
      addXAxis: {
        reducer(e, t) {
          e.xAxis[t.payload.id] = J(t.payload);
        },
        prepare: W(),
      },
      replaceXAxis: {
        reducer(e, t) {
          var { prev: n, next: r } = t.payload;
          e.xAxis[n.id] !== void 0 &&
            (n.id !== r.id && delete e.xAxis[n.id], (e.xAxis[r.id] = J(r)));
        },
        prepare: W(),
      },
      removeXAxis: {
        reducer(e, t) {
          delete e.xAxis[t.payload.id];
        },
        prepare: W(),
      },
      addYAxis: {
        reducer(e, t) {
          e.yAxis[t.payload.id] = J(t.payload);
        },
        prepare: W(),
      },
      replaceYAxis: {
        reducer(e, t) {
          var { prev: n, next: r } = t.payload;
          e.yAxis[n.id] !== void 0 &&
            (n.id !== r.id && delete e.yAxis[n.id], (e.yAxis[r.id] = J(r)));
        },
        prepare: W(),
      },
      removeYAxis: {
        reducer(e, t) {
          delete e.yAxis[t.payload.id];
        },
        prepare: W(),
      },
      addZAxis: {
        reducer(e, t) {
          e.zAxis[t.payload.id] = J(t.payload);
        },
        prepare: W(),
      },
      replaceZAxis: {
        reducer(e, t) {
          var { prev: n, next: r } = t.payload;
          e.zAxis[n.id] !== void 0 &&
            (n.id !== r.id && delete e.zAxis[n.id], (e.zAxis[r.id] = J(r)));
        },
        prepare: W(),
      },
      removeZAxis: {
        reducer(e, t) {
          delete e.zAxis[t.payload.id];
        },
        prepare: W(),
      },
      updateYAxisWidth(e, t) {
        var { id: n, width: r } = t.payload,
          i = e.yAxis[n];
        if (i) {
          var a = i.widthHistory || [];
          if (
            a.length === 3 &&
            a[0] === a[2] &&
            r === a[1] &&
            r !== i.width &&
            Math.abs(r - (a[0] ?? 0)) <= 1
          )
            return;
          var o = [...a, r].slice(-3);
          e.yAxis[n] = nN(nN({}, i), {}, { width: r, widthHistory: o });
        }
      },
    },
  }),
  {
    addXAxis: sN,
    replaceXAxis: cN,
    removeXAxis: lN,
    addYAxis: uN,
    replaceYAxis: dN,
    removeYAxis: fN,
    addZAxis: pN,
    replaceZAxis: mN,
    removeZAxis: hN,
    updateYAxisWidth: gN,
  } = oN.actions,
  _N = oN.reducer,
  vN = (e) => {
    var { computedData: t } = e,
      n = _d();
    return (
      (0, a.useEffect)(
        () => (
          n(lM(t)),
          () => {
            n(sM(void 0));
          }
        ),
        [t, n],
      ),
      null
    );
  },
  yN = { x: 0, y: 0, width: 0, height: 0, padding: { top: 0, right: 0, bottom: 0, left: 0 } },
  bN = Xp({
    name: `brush`,
    initialState: yN,
    reducers: {
      setBrushSettings(e, t) {
        return t.payload == null ? yN : t.payload;
      },
    },
  }),
  { setBrushSettings: xN } = bN.actions,
  SN = bN.reducer,
  CN = Xp({
    name: `referenceElements`,
    initialState: { dots: [], areas: [], lines: [] },
    reducers: {
      addDot: (e, t) => {
        e.dots.push(t.payload);
      },
      removeDot: (e, t) => {
        var n = Cp(e).dots.findIndex((e) => e === t.payload);
        n !== -1 && e.dots.splice(n, 1);
      },
      addArea: (e, t) => {
        e.areas.push(t.payload);
      },
      removeArea: (e, t) => {
        var n = Cp(e).areas.findIndex((e) => e === t.payload);
        n !== -1 && e.areas.splice(n, 1);
      },
      addLine: (e, t) => {
        e.lines.push(J(t.payload));
      },
      removeLine: (e, t) => {
        var n = Cp(e).lines.findIndex((e) => e === t.payload);
        n !== -1 && e.lines.splice(n, 1);
      },
    },
  }),
  {
    addDot: wN,
    removeDot: TN,
    addArea: EN,
    removeArea: DN,
    addLine: ON,
    removeLine: kN,
  } = CN.actions,
  AN = CN.reducer,
  jN = Xp({
    name: `renderedTicks`,
    initialState: { xAxis: {}, yAxis: {} },
    reducers: {
      setRenderedTicks: (e, t) => {
        var { axisType: n, axisId: r, ticks: i } = t.payload;
        e[n][r] = J(i);
      },
      removeRenderedTicks: (e, t) => {
        var { axisType: n, axisId: r } = t.payload;
        delete e[n][r];
      },
    },
  }),
  { setRenderedTicks: MN, removeRenderedTicks: NN } = jN.actions,
  PN = jN.reducer,
  FN = Xp({
    name: `errorBars`,
    initialState: {},
    reducers: {
      addErrorBar: (e, t) => {
        var { itemId: n, errorBar: r } = t.payload;
        e[n] || (e[n] = []), e[n].push(r);
      },
      replaceErrorBar: (e, t) => {
        var { itemId: n, prev: r, next: i } = t.payload;
        e[n] &&
          (e[n] = e[n].map((e) =>
            e.dataKey === r.dataKey && e.direction === r.direction ? i : e,
          ));
      },
      removeErrorBar: (e, t) => {
        var { itemId: n, errorBar: r } = t.payload;
        e[n] && (e[n] = e[n].filter((e) => e.dataKey !== r.dataKey || e.direction !== r.direction));
      },
    },
  }),
  { addErrorBar: IN, replaceErrorBar: LN, removeErrorBar: RN } = FN.actions,
  zN = FN.reducer,
  BN = U([(e, t) => t, q, _x, Ex, MA, PA, fj, Dh], wj);
function VN(e) {
  return `getBBox` in e.currentTarget && typeof e.currentTarget.getBBox == `function`;
}
function HN(e) {
  var t = e.currentTarget.getBoundingClientRect(),
    n,
    r;
  if (VN(e)) {
    var i = e.currentTarget.getBBox();
    (n = i.width > 0 ? t.width / i.width : 1), (r = i.height > 0 ? t.height / i.height : 1);
  } else {
    var a = e.currentTarget;
    (n = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1),
      (r = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1);
  }
  var o = (e, i) => ({
    relativeX: Math.round((e - t.left) / n),
    relativeY: Math.round((i - t.top) / r),
  });
  return `touches` in e
    ? Array.from(e.touches).map((e) => o(e.clientX, e.clientY))
    : o(e.clientX, e.clientY);
}
var UN = Ap(`mouseClick`),
  WN = Im();
WN.startListening({
  actionCreator: UN,
  effect: (e, t) => {
    var n = e.payload,
      r = BN(t.getState(), HN(n));
    r?.activeIndex != null &&
      t.dispatch(
        Lk({
          activeIndex: r.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: r.activeCoordinate,
        }),
      );
  },
});
var GN = Ap(`mouseMove`),
  KN = Im(),
  qN = null,
  JN = null,
  YN = null;
KN.startListening({
  actionCreator: GN,
  effect: (e, t) => {
    var n = e.payload,
      { throttleDelay: r, throttledEvents: i } = t.getState().eventSettings,
      a = i === `all` || i?.includes(`mousemove`);
    qN !== null && (cancelAnimationFrame(qN), (qN = null)),
      JN !== null && (typeof r != `number` || !a) && (clearTimeout(JN), (JN = null)),
      (YN = HN(n));
    var o = () => {
      var e = t.getState(),
        n = Sk(e, e.tooltip.settings.shared);
      if (!YN) {
        (qN = null), (JN = null);
        return;
      }
      if (n === `axis`) {
        var r = BN(e, YN);
        r?.activeIndex == null
          ? t.dispatch(Pk())
          : t.dispatch(
              Ik({
                activeIndex: r.activeIndex,
                activeDataKey: void 0,
                activeCoordinate: r.activeCoordinate,
              }),
            );
      }
      (qN = null), (JN = null);
    };
    if (!a) {
      o();
      return;
    }
    r === `raf`
      ? (qN = requestAnimationFrame(o))
      : typeof r == `number` && JN === null && (JN = setTimeout(o, r));
  },
});
function XN(e, t) {
  return t instanceof HTMLElement
    ? `HTMLElement <${t.tagName} class="${t.className}">`
    : t === window
      ? `global.window`
      : e === `children` && typeof t == `object` && t
        ? `<<CHILDREN>>`
        : t;
}
var ZN = {
    accessibilityLayer: !0,
    barCategoryGap: `10%`,
    barGap: 4,
    barSize: void 0,
    className: void 0,
    maxBarSize: void 0,
    stackOffset: `none`,
    syncId: void 0,
    syncMethod: `index`,
    baseValue: void 0,
    reverseStackOrder: !1,
  },
  QN = Xp({
    name: `rootProps`,
    initialState: ZN,
    reducers: {
      updateOptions: (e, t) => {
        (e.accessibilityLayer = t.payload.accessibilityLayer),
          (e.barCategoryGap = t.payload.barCategoryGap),
          (e.barGap = t.payload.barGap ?? ZN.barGap),
          (e.barSize = t.payload.barSize),
          (e.maxBarSize = t.payload.maxBarSize),
          (e.stackOffset = t.payload.stackOffset),
          (e.syncId = t.payload.syncId),
          (e.syncMethod = t.payload.syncMethod),
          (e.className = t.payload.className),
          (e.baseValue = t.payload.baseValue),
          (e.reverseStackOrder = t.payload.reverseStackOrder);
      },
    },
  }),
  $N = QN.reducer,
  { updateOptions: eP } = QN.actions,
  tP = Xp({
    name: `polarOptions`,
    initialState: null,
    reducers: {
      updatePolarOptions: (e, t) =>
        e === null
          ? t.payload
          : ((e.startAngle = t.payload.startAngle),
            (e.endAngle = t.payload.endAngle),
            (e.cx = t.payload.cx),
            (e.cy = t.payload.cy),
            (e.innerRadius = t.payload.innerRadius),
            (e.outerRadius = t.payload.outerRadius),
            e),
    },
  }),
  { updatePolarOptions: nP } = tP.actions,
  rP = tP.reducer,
  iP = Ap(`keyDown`),
  aP = Ap(`focus`),
  oP = Ap(`blur`),
  sP = Im(),
  cP = null,
  lP = null,
  uP = null;
sP.startListening({
  actionCreator: iP,
  effect: (e, t) => {
    (uP = e.payload), cP !== null && (cancelAnimationFrame(cP), (cP = null));
    var { throttleDelay: n, throttledEvents: r } = t.getState().eventSettings,
      i = r === `all` || r.includes(`keydown`);
    lP !== null && (typeof n != `number` || !i) && (clearTimeout(lP), (lP = null));
    var a = () => {
      try {
        var e = t.getState();
        if (e.rootProps.accessibilityLayer === !1) return;
        var { keyboardInteraction: n } = e.tooltip,
          r = uP;
        if (r !== `ArrowRight` && r !== `ArrowLeft` && r !== `Enter`) return;
        var i = Qk(n, bA(e), iO(e), kA(e)),
          a = i == null ? -1 : Number(i),
          o = !Number.isFinite(a) || a < 0,
          s = PA(e),
          c = bA(e),
          l = Sk(e, e.tooltip.settings.shared);
        if (r === `Enter`) {
          if (o) return;
          var u = _j(e, l, `hover`, String(n.index));
          t.dispatch(zk({ active: !n.active, activeIndex: n.index, activeCoordinate: u }));
          return;
        }
        var d = vk(e) === `left-to-right` ? 1 : -1,
          f = r === `ArrowRight` ? 1 : -1,
          p;
        if (o) {
          var m = iO(e),
            h = kA(e),
            g = f * d,
            _ = (e) => ({
              active: !1,
              index: String(e),
              dataKey: void 0,
              graphicalItemId: void 0,
              coordinate: void 0,
            });
          if (((p = -1), g > 0)) {
            for (var v = 0; v < c.length; v++)
              if (Qk(_(v), c, m, h) != null) {
                p = v;
                break;
              }
          } else
            for (var y = c.length - 1; y >= 0; y--)
              if (Qk(_(y), c, m, h) != null) {
                p = y;
                break;
              }
          if (p < 0) return;
        } else {
          p = a + f * d;
          var b = s?.length || c.length;
          if (b === 0 || p >= b || p < 0) return;
        }
        var x = _j(e, l, `hover`, String(p));
        t.dispatch(zk({ active: !0, activeIndex: p.toString(), activeCoordinate: x }));
      } finally {
        (cP = null), (lP = null);
      }
    };
    if (!i) {
      a();
      return;
    }
    n === `raf`
      ? (cP = requestAnimationFrame(a))
      : typeof n == `number` &&
        lP === null &&
        (a(),
        (uP = null),
        (lP = setTimeout(() => {
          uP ? a() : ((lP = null), (cP = null));
        }, n)));
  },
}),
  sP.startListening({
    actionCreator: aP,
    effect: (e, t) => {
      var n = t.getState();
      if (n.rootProps.accessibilityLayer !== !1) {
        var { keyboardInteraction: r } = n.tooltip;
        if (!r.active && r.index == null) {
          var i = `0`,
            a = _j(n, Sk(n, n.tooltip.settings.shared), `hover`, String(i));
          t.dispatch(zk({ active: !0, activeIndex: i, activeCoordinate: a }));
        }
      }
    },
  }),
  sP.startListening({
    actionCreator: oP,
    effect: (e, t) => {
      var n = t.getState();
      if (n.rootProps.accessibilityLayer !== !1) {
        var { keyboardInteraction: r } = n.tooltip;
        r.active &&
          t.dispatch(zk({ active: !1, activeIndex: r.index, activeCoordinate: r.coordinate }));
      }
    },
  });
function dP(e) {
  e.persist();
  var { currentTarget: t } = e;
  return new Proxy(e, {
    get: (e, n) => {
      if (n === `currentTarget`) return t;
      var r = Reflect.get(e, n);
      return typeof r == `function` ? r.bind(e) : r;
    },
  });
}
var fP = Ap(`externalEvent`),
  pP = Im(),
  mP = new Map(),
  hP = new Map(),
  gP = new Map();
pP.startListening({
  actionCreator: fP,
  effect: (e, t) => {
    var { handler: n, reactEvent: r } = e.payload;
    if (n != null) {
      var i = r.type,
        a = dP(r);
      gP.set(i, { handler: n, reactEvent: a });
      var o = mP.get(i);
      o !== void 0 && (cancelAnimationFrame(o), mP.delete(i));
      var { throttleDelay: s, throttledEvents: c } = t.getState().eventSettings,
        l = c,
        u = l === `all` || l?.includes(i),
        d = hP.get(i);
      d !== void 0 && (typeof s != `number` || !u) && (clearTimeout(d), hP.delete(i));
      var f = () => {
        var e = gP.get(i);
        try {
          if (!e) return;
          var { handler: n, reactEvent: r } = e,
            a = t.getState(),
            o = {
              activeCoordinate: WA(a),
              activeDataKey: VA(a),
              activeIndex: zA(a),
              activeLabel: BA(a),
              activeTooltipIndex: zA(a),
              isTooltipActive: GA(a),
            };
          n && n(o, r);
        } finally {
          mP.delete(i), hP.delete(i), gP.delete(i);
        }
      };
      if (!u) {
        f();
        return;
      }
      if (s === `raf`) {
        var p = requestAnimationFrame(f);
        mP.set(i, p);
      } else if (typeof s == `number`) {
        if (!hP.has(i)) {
          f();
          var m = setTimeout(f, s);
          hP.set(i, m);
        }
      } else f();
    }
  },
});
var _P = U([U([nA], (e) => e.tooltipItemPayloads), (e, t) => t, (e, t, n) => n], (e, t, n) => {
    if (t != null) {
      var r = e.find((e) => e.settings.graphicalItemId === n);
      if (r != null) {
        var { getPosition: i } = r;
        if (i != null) return i(t);
      }
    }
  }),
  vP = Ap(`touchMove`),
  yP = Im(),
  bP = null,
  xP = null,
  SP = null,
  CP = null;
yP.startListening({
  actionCreator: vP,
  effect: (e, t) => {
    var n = e.payload;
    if (!(n.touches == null || n.touches.length === 0)) {
      CP = dP(n);
      var { throttleDelay: r, throttledEvents: i } = t.getState().eventSettings,
        a = i === `all` || i.includes(`touchmove`);
      bP !== null && (cancelAnimationFrame(bP), (bP = null)),
        xP !== null && (typeof r != `number` || !a) && (clearTimeout(xP), (xP = null)),
        (SP = Array.from(n.touches).map((e) =>
          HN({ clientX: e.clientX, clientY: e.clientY, currentTarget: n.currentTarget }),
        ));
      var o = () => {
        if (CP != null) {
          var e = t.getState(),
            n = Sk(e, e.tooltip.settings.shared);
          if (n === `axis`) {
            var r = SP?.[0];
            if (r == null) {
              (bP = null), (xP = null);
              return;
            }
            var i = BN(e, r);
            i?.activeIndex != null &&
              t.dispatch(
                Ik({
                  activeIndex: i.activeIndex,
                  activeDataKey: void 0,
                  activeCoordinate: i.activeCoordinate,
                }),
              );
          } else if (n === `item`) {
            var a = CP.touches[0];
            if (document.elementFromPoint == null || a == null) return;
            var o = document.elementFromPoint(a.clientX, a.clientY);
            if (!o || !o.getAttribute) return;
            var s = o.getAttribute(gh),
              c = o.getAttribute(`data-recharts-item-id`) ?? void 0,
              l = gA(e).find((e) => e.id === c);
            if (s == null || l == null || c == null) return;
            var { dataKey: u } = l,
              d = _P(e, s, c);
            t.dispatch(
              Mk({
                activeDataKey: u,
                activeIndex: s,
                activeCoordinate: d,
                activeGraphicalItemId: c,
              }),
            );
          }
          (bP = null), (xP = null);
        }
      };
      if (!a) {
        o();
        return;
      }
      r === `raf`
        ? (bP = requestAnimationFrame(o))
        : typeof r == `number` &&
          xP === null &&
          (o(),
          (CP = null),
          (xP = setTimeout(() => {
            CP ? o() : ((xP = null), (bP = null));
          }, r)));
    }
  },
});
var wP = {
    throttleDelay: `raf`,
    throttledEvents: [`mousemove`, `touchmove`, `pointermove`, `scroll`, `wheel`],
  },
  TP = Xp({
    name: `eventSettings`,
    initialState: wP,
    reducers: {
      setEventSettings: (e, t) => {
        t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay),
          t.payload.throttledEvents != null && (e.throttledEvents = J(t.payload.throttledEvents));
      },
    },
  }),
  { setEventSettings: EP } = TP.actions,
  DP = TP.reducer,
  OP = ef({
    brush: SN,
    cartesianAxis: _N,
    chartData: uM,
    errorBars: zN,
    eventSettings: DP,
    graphicalItems: eN,
    layout: Um,
    legend: g_,
    options: rM,
    polarAxis: VM,
    polarOptions: rP,
    referenceElements: AN,
    renderedTicks: PN,
    rootProps: $N,
    tooltip: Bk,
    zIndex: zj,
  }),
  kP = function (e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : `Chart`;
    return Bp({
      reducer: OP,
      preloadedState: e,
      middleware: (e) =>
        e({
          serializableCheck: !1,
          immutableCheck: ![`commonjs`, `es6`, `production`].includes(`es6`),
        }).concat([WN.middleware, KN.middleware, sP.middleware, pP.middleware, yP.middleware]),
      enhancers: (e) => {
        var t = e;
        return typeof e == `function` && (t = e()), t.concat(Rp({ type: `raf` }));
      },
      devTools: Q_.devToolsEnabled && { serialize: { replacer: XN }, name: `recharts-${t}` },
    });
  };
function AP(e) {
  var { preloadedState: t, children: n, reduxStoreName: r } = e,
    i = Ah(),
    o = (0, a.useRef)(null);
  if (i) return n;
  o.current ??= kP(t, r);
  var s = hd;
  return a.createElement(M_, { context: s, store: o.current }, n);
}
var jP = (0, a.memo)((e) => {
  var t = _d();
  return (
    (0, a.useEffect)(() => {
      t(EP(e));
    }, [t, e]),
    null
  );
}, F_);
function MP() {
  var e = _d(),
    [t, n] = (0, a.useState)(null),
    r = H(fh);
  return (
    (0, a.useEffect)(() => {
      if (t != null) {
        var n = t.getBoundingClientRect().width / t.offsetWidth;
        G(n) && n !== r && e(Hm(n));
      }
    }, [t, e, r]),
    n
  );
}
function NP(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function PP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? NP(Object(n), !0).forEach(function (t) {
          FP(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : NP(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function FP(e, t, n) {
  return (
    (t = IP(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function IP(e) {
  var t = LP(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function LP(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function RP() {
  return (
    (RP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    RP.apply(null, arguments)
  );
}
var zP = () => (xM(), null);
function BP(e) {
  if (typeof e == `number`) return e;
  if (typeof e == `string`) {
    var t = parseFloat(e);
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}
var VP = (0, a.forwardRef)((e, t) => {
    var n = (0, a.useRef)(null),
      [r, i] = (0, a.useState)({
        containerWidth: BP(e.style?.width),
        containerHeight: BP(e.style?.height),
      }),
      o = (0, a.useCallback)((e, t) => {
        i((n) => {
          var r = Math.round(e),
            i = Math.round(t);
          return n.containerWidth === r && n.containerHeight === i
            ? n
            : { containerWidth: r, containerHeight: i };
        });
      }, []),
      s = (0, a.useCallback)(
        (e) => {
          if (
            (typeof t == `function` && t(e),
            n.current != null && (n.current.disconnect(), (n.current = null)),
            e != null && typeof ResizeObserver < `u`)
          ) {
            var { width: r, height: i } = e.getBoundingClientRect();
            o(r, i);
            var a = new ResizeObserver((e) => {
              var t = e[0];
              if (t != null) {
                var { width: n, height: r } = t.contentRect;
                o(n, r);
              }
            });
            a.observe(e), (n.current = a);
          }
        },
        [t, o],
      );
    return (
      (0, a.useEffect)(
        () => () => {
          n.current?.disconnect();
        },
        [o],
      ),
      a.createElement(
        a.Fragment,
        null,
        a.createElement(pg, { width: r.containerWidth, height: r.containerHeight }),
        a.createElement(`div`, RP({ ref: s }, e)),
      )
    );
  }),
  HP = (0, a.forwardRef)((e, t) => {
    var { width: n, height: r } = e,
      [i, o] = (0, a.useState)({ containerWidth: BP(n), containerHeight: BP(r) }),
      s = (0, a.useCallback)((e, t) => {
        o((n) => {
          var r = Math.round(e),
            i = Math.round(t);
          return n.containerWidth === r && n.containerHeight === i
            ? n
            : { containerWidth: r, containerHeight: i };
        });
      }, []),
      c = (0, a.useCallback)(
        (e) => {
          if ((typeof t == `function` && t(e), e != null)) {
            var { width: n, height: r } = e.getBoundingClientRect();
            s(n, r);
          }
        },
        [t, s],
      );
    return a.createElement(
      a.Fragment,
      null,
      a.createElement(pg, { width: i.containerWidth, height: i.containerHeight }),
      a.createElement(`div`, RP({ ref: c }, e)),
    );
  }),
  UP = (0, a.forwardRef)((e, t) => {
    var { width: n, height: r } = e;
    return a.createElement(
      a.Fragment,
      null,
      a.createElement(pg, { width: n, height: r }),
      a.createElement(`div`, RP({ ref: t }, e)),
    );
  }),
  WP = (0, a.forwardRef)((e, t) => {
    var { width: n, height: r } = e;
    return typeof n == `string` || typeof r == `string`
      ? a.createElement(HP, RP({}, e, { ref: t }))
      : typeof n == `number` && typeof r == `number`
        ? a.createElement(UP, RP({}, e, { width: n, height: r, ref: t }))
        : a.createElement(
            a.Fragment,
            null,
            a.createElement(pg, { width: n, height: r }),
            a.createElement(`div`, RP({ ref: t }, e)),
          );
  });
function GP(e) {
  return e ? VP : WP;
}
var KP = (0, a.forwardRef)((e, t) => {
    var {
        children: n,
        className: r,
        height: i,
        onClick: o,
        onContextMenu: s,
        onDoubleClick: l,
        onMouseDown: u,
        onMouseEnter: d,
        onMouseLeave: f,
        onMouseMove: p,
        onMouseUp: m,
        onTouchEnd: h,
        onTouchMove: g,
        onTouchStart: _,
        style: v,
        width: y,
        responsive: b,
        dispatchTouchEvents: x = !0,
      } = e,
      S = (0, a.useRef)(null),
      C = _d(),
      [w, T] = (0, a.useState)(null),
      [E, D] = (0, a.useState)(null),
      O = MP(),
      k = ng(),
      ee = k?.width > 0 ? k.width : y,
      te = k?.height > 0 ? k.height : i,
      A = (0, a.useCallback)(
        (e) => {
          O(e), typeof t == `function` && t(e), T(e), D(e), e != null && (S.current = e);
        },
        [O, t, T, D],
      ),
      j = (0, a.useCallback)(
        (e) => {
          C(UN(e)), C(fP({ handler: o, reactEvent: e }));
        },
        [C, o],
      ),
      ne = (0, a.useCallback)(
        (e) => {
          C(GN(e)), C(fP({ handler: d, reactEvent: e }));
        },
        [C, d],
      ),
      re = (0, a.useCallback)(
        (e) => {
          C(Pk()), C(fP({ handler: f, reactEvent: e }));
        },
        [C, f],
      ),
      ie = (0, a.useCallback)(
        (e) => {
          C(GN(e)), C(fP({ handler: p, reactEvent: e }));
        },
        [C, p],
      ),
      ae = (0, a.useCallback)(() => {
        C(aP());
      }, [C]),
      oe = (0, a.useCallback)(() => {
        C(oP());
      }, [C]),
      se = (0, a.useCallback)(
        (e) => {
          C(iP(e.key));
        },
        [C],
      ),
      ce = (0, a.useCallback)(
        (e) => {
          C(fP({ handler: s, reactEvent: e }));
        },
        [C, s],
      ),
      le = (0, a.useCallback)(
        (e) => {
          C(fP({ handler: l, reactEvent: e }));
        },
        [C, l],
      ),
      ue = (0, a.useCallback)(
        (e) => {
          C(fP({ handler: u, reactEvent: e }));
        },
        [C, u],
      ),
      de = (0, a.useCallback)(
        (e) => {
          C(fP({ handler: m, reactEvent: e }));
        },
        [C, m],
      ),
      fe = (0, a.useCallback)(
        (e) => {
          C(fP({ handler: _, reactEvent: e }));
        },
        [C, _],
      ),
      pe = (0, a.useCallback)(
        (e) => {
          x && C(vP(e)), C(fP({ handler: g, reactEvent: e }));
        },
        [C, x, g],
      ),
      me = (0, a.useCallback)(
        (e) => {
          C(fP({ handler: h, reactEvent: e }));
        },
        [C, h],
      ),
      he = GP(b);
    return a.createElement(
      Xj.Provider,
      { value: w },
      a.createElement(
        rl.Provider,
        { value: E },
        a.createElement(
          he,
          {
            width: ee ?? v?.width,
            height: te ?? v?.height,
            className: c(`recharts-wrapper`, r),
            style: PP({ position: `relative`, cursor: `default`, width: ee, height: te }, v),
            onClick: j,
            onContextMenu: ce,
            onDoubleClick: le,
            onFocus: ae,
            onBlur: oe,
            onKeyDown: se,
            onMouseDown: ue,
            onMouseEnter: ne,
            onMouseLeave: re,
            onMouseMove: ie,
            onMouseUp: de,
            onTouchEnd: me,
            onTouchMove: pe,
            onTouchStart: fe,
            ref: A,
          },
          a.createElement(zP, null),
          n,
        ),
      ),
    );
  }),
  qP = n((e) => {
    Object.defineProperty(e, Symbol.toStringTag, { value: `Module` });
    var t = sd();
    function n(e, n) {
      if (!e || !e.length) return 0;
      n != null && (n = t.iteratee(n));
      let r;
      for (let t = 0; t < e.length; t++) {
        const i = n ? n(e[t]) : e[t];
        i !== void 0 && (r === void 0 ? (r = i) : (r += i));
      }
      return r;
    }
    e.sumBy = n;
  }),
  JP = e(
    n((e, t) => {
      t.exports = qP().sumBy;
    })(),
  ),
  YP = [
    `sourceX`,
    `sourceY`,
    `sourceControlX`,
    `targetX`,
    `targetY`,
    `targetControlX`,
    `linkWidth`,
  ],
  XP = [`className`, `style`, `children`, `id`];
function ZP() {
  return (
    (ZP = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ZP.apply(null, arguments)
  );
}
function QP(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = $P(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function $P(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
function eF(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function tF(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? eF(Object(n), !0).forEach(function (t) {
          nF(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : eF(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function nF(e, t, n) {
  return (
    (t = rF(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function rF(e) {
  var t = iF(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function iF(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
var aF = (e, t) => {
    var n = +e,
      r = t - n;
    return (e) => n + r * e;
  },
  oF = (e) => e.y + e.dy / 2,
  sF = (e) => (e && e.value) || 0,
  cF = (e, t) => t.reduce((t, n) => t + sF(e[n]), 0),
  lF = (e, t, n) =>
    n.reduce((n, r) => {
      var i = t[r];
      if (i == null) return n;
      var a = e[i.source];
      return a == null ? n : n + oF(a) * sF(t[r]);
    }, 0),
  uF = (e, t, n) =>
    n.reduce((n, r) => {
      var i = t[r];
      if (i == null) return n;
      var a = e[i.target];
      return a == null ? n : n + oF(a) * sF(t[r]);
    }, 0),
  dF = (e, t) => e.y - t.y,
  fF = (e, t) => {
    for (var n = [], r = [], i = [], a = [], o = 0, s = e.length; o < s; o++) {
      var c = e[o];
      c?.source === t && (i.push(c.target), a.push(o)),
        c?.target === t && (n.push(c.source), r.push(o));
    }
    return { sourceNodes: n, sourceLinks: r, targetLinks: a, targetNodes: i };
  },
  pF = (e, t) => {
    for (var { targetNodes: n } = t, r = 0, i = n.length; r < i; r++) {
      var a = n[r];
      if (a != null) {
        var o = e[a];
        o && ((o.depth = Math.max(t.depth + 1, o.depth)), pF(e, o));
      }
    }
  },
  mF = (e, t, n, r) => {
    for (
      var { nodes: i, links: a } = e,
        o = i.map((e, t) => {
          var n = fF(a, t);
          return tF(
            tF(tF({}, e), n),
            {},
            { value: Math.max(cF(a, n.sourceLinks), cF(a, n.targetLinks)), depth: 0 },
          );
        }),
        s = 0,
        c = o.length;
      s < c;
      s++
    ) {
      var l = o[s];
      l != null && !l.sourceNodes.length && pF(o, l);
    }
    var u = (0, FM.default)(o, (e) => e.depth)?.depth ?? 0;
    if (u >= 1)
      for (var d = (t - n) / u, f = 0, p = o.length; f < p; f++) {
        var m = o[f];
        m != null &&
          (m.targetNodes.length || (r === `justify` && (m.depth = u)),
          (m.x = m.depth * d),
          (m.dx = n));
      }
    return { tree: o, maxDepth: u };
  },
  hF = (e) => {
    for (var t = [], n = 0, r = e.length; n < r; n++) {
      var i,
        a = e[n];
      a != null && (t[a.depth] || (t[a.depth] = []), (i = t[a.depth]) == null || i.push(a));
    }
    return t;
  },
  gF = (e, t, n, r, i) => {
    for (
      var a = Math.min(...e.map((e) => (t - (e.length - 1) * n) / (0, JP.default)(e, sF))),
        o = 0,
        s = e.length;
      o < s;
      o++
    ) {
      var c = e[o];
      if (c != null)
        if (i === `top`)
          for (var l = 0, u = 0, d = c.length; u < d; u++) {
            var f = c[u];
            f != null && ((f.dy = f.value * a), (f.y = l), (l += f.dy + n));
          }
        else
          for (var p = 0, m = c.length; p < m; p++) {
            var h = c[p];
            h != null && ((h.y = p), (h.dy = h.value * a));
          }
    }
    return r.map((e) => tF(tF({}, e), {}, { dy: sF(e) * a }));
  },
  _F = function (e, t, n) {
    for (
      var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0,
        i = 0,
        a = e.length;
      i < a;
      i++
    ) {
      var o = e[i];
      if (o != null) {
        var s = o.length;
        r && o.sort(dF);
        for (var c = 0, l = 0; l < s; l++) {
          var u = o[l];
          if (u != null) {
            var d = c - u.y;
            d > 0 && (u.y += d), (c = u.y + u.dy + n);
          }
        }
        c = t + n;
        for (var f = s - 1; f >= 0; f--) {
          var p = o[f];
          if (p != null) {
            var m = p.y + p.dy + n - c;
            if (m > 0) (p.y -= m), (c = p.y);
            else break;
          }
        }
      }
    }
  },
  vF = (e, t, n, r) => {
    for (var i = 0, a = t.length; i < a; i++) {
      var o = t[i];
      if (o != null)
        for (var s = 0, c = o.length; s < c; s++) {
          var l = o[s];
          if (l != null && l.sourceLinks.length) {
            var u = cF(n, l.sourceLinks),
              d = lF(e, n, l.sourceLinks) / u;
            l.y += (d - oF(l)) * r;
          }
        }
    }
  },
  yF = (e, t, n, r) => {
    for (var i = t.length - 1; i >= 0; i--) {
      var a = t[i];
      if (a != null)
        for (var o = 0, s = a.length; o < s; o++) {
          var c = a[o];
          if (c != null && c.targetLinks.length) {
            var l = cF(n, c.targetLinks),
              u = uF(e, n, c.targetLinks) / l;
            c.y += (u - oF(c)) * r;
          }
        }
    }
  },
  bF = (e, t) => {
    for (var n = 0, r = e.length; n < r; n++) {
      var i = e[n];
      if (i != null) {
        var a = 0,
          o = 0;
        i.targetLinks.sort((n, r) => {
          var i = t[n]?.target,
            a = t[r]?.target;
          if (i == null || a == null) return 0;
          var o = e[i]?.y,
            s = e[a]?.y;
          return o == null || s == null ? 0 : o - s;
        }),
          i.sourceLinks.sort((n, r) => {
            var i = t[n]?.source,
              a = t[r]?.source;
            if (i == null || a == null) return 0;
            var o = e[i]?.y,
              s = e[a]?.y;
            return o == null || s == null ? 0 : o - s;
          });
        for (var s = 0, c = i.targetLinks.length; s < c; s++) {
          var l = i.targetLinks[s];
          if (l != null) {
            var u = t[l];
            u && ((u.sy = a), (a += u.dy));
          }
        }
        for (var d = 0, f = i.sourceLinks.length; d < f; d++) {
          var p = i.sourceLinks[d];
          if (p != null) {
            var m = t[p];
            m && ((m.ty = o), (o += m.dy));
          }
        }
      }
    }
  },
  xF = (e) => {
    var {
        data: t,
        width: n,
        height: r,
        iterations: i,
        nodeWidth: a,
        nodePadding: o,
        sort: s,
        verticalAlign: c,
        align: l,
      } = e,
      { links: u } = t,
      { tree: d } = mF(t, n, a, l),
      f = hF(d),
      p = gF(f, r, o, u, c);
    if ((_F(f, r, o, s), c === `justify`))
      for (var m = 1, h = 1; h <= i; h++)
        yF(d, f, p, (m *= 0.99)), _F(f, r, o, s), vF(d, f, p, m), _F(f, r, o, s);
    return bF(d, p), { nodes: d, links: p };
  },
  SF = (e) => ({ x: +e.x + e.width / 2, y: +e.y + e.height / 2 }),
  CF = (e) =>
    `sourceX` in e ? { x: (e.sourceX + e.targetX) / 2, y: (e.sourceY + e.targetY) / 2 } : void 0,
  wF = (e, t, n) => {
    var { payload: r } = e;
    if (t === `node`) return { payload: r, name: K(r, n, ``), value: K(r, `value`) };
    if (`source` in r && r.source && r.target)
      return {
        payload: r,
        name: `${K(r.source, n, ``)} - ${K(r.target, n, ``)}`,
        value: K(r, `value`),
      };
  },
  TF = {
    chartName: `Sankey`,
    defaultTooltipEventType: `item`,
    validateTooltipEventTypes: [`item`],
    tooltipPayloadSearcher: (e, t, n, r) => {
      if (!(t == null || typeof t != `string`) && !(typeof n != `object` || !n)) {
        var [i, a] = t.split(`-`),
          o = (0, lu.default)(n, `${i}s[${a}]`);
        if (o) return wF(o, i, r);
      }
    },
    eventEmitter: void 0,
  },
  EF = a.memo((e) => {
    var { dataKey: t, nameKey: n, stroke: r, strokeWidth: i, fill: o, name: s, data: c, id: l } = e,
      u = {
        dataDefinedOnItem: c,
        getPosition: Eu,
        settings: {
          stroke: r,
          strokeWidth: i,
          fill: o,
          dataKey: t,
          name: s,
          nameKey: n,
          hide: !1,
          type: void 0,
          color: o,
          unit: ``,
          graphicalItemId: l,
        },
      };
    return a.createElement(HM, { tooltipEntrySettings: u });
  });
function DF(e, t) {
  if (a.isValidElement(e)) return a.cloneElement(e, t);
  if (typeof e == `function`) return e(t);
  var {
      sourceX: n,
      sourceY: r,
      sourceControlX: i,
      targetX: o,
      targetY: s,
      targetControlX: c,
      linkWidth: l,
    } = t,
    u = QP(t, YP);
  return a.createElement(
    `path`,
    ZP(
      {
        className: `recharts-sankey-link`,
        d: `
          M${n},${r}
          C${i},${r} ${c},${s} ${o},${s}
        `,
        fill: `none`,
        stroke: `#333`,
        strokeWidth: l,
        strokeOpacity: `0.2`,
      },
      Wc(u),
    ),
  );
}
var OF = (e) => {
  var { link: t, nodes: n, left: r, top: i, i: a, linkContent: o, linkCurvature: s } = e,
    { sy: c, ty: l, dy: u } = t,
    d = n[t.source],
    f = n[t.target];
  if (!(d == null || f == null)) {
    var p = d.x + d.dx + r,
      m = f.x + r,
      h = aF(p, m),
      g = h(s),
      _ = h(1 - s);
    return tF(
      {
        sourceX: p,
        targetX: m,
        sourceY: d.y + c + u / 2 + i,
        targetY: f.y + l + u / 2 + i,
        sourceControlX: g,
        targetControlX: _,
        sourceRelativeY: c,
        targetRelativeY: l,
        linkWidth: u,
        index: a,
        payload: tF(tF({}, t), {}, { source: d, target: f }),
      },
      Gc(o),
    );
  }
};
function kF(e) {
  var {
      graphicalItemId: t,
      props: n,
      i: r,
      linkContent: i,
      onMouseEnter: o,
      onMouseLeave: s,
      onClick: c,
      dataKey: l,
    } = e,
    u = CF(n),
    d = `link-${r}`,
    f = _d();
  return a.createElement(
    nl,
    {
      onMouseEnter: (e) => {
        f(Mk({ activeIndex: d, activeDataKey: l, activeCoordinate: u, activeGraphicalItemId: t })),
          o(n, e);
      },
      onMouseLeave: (e) => {
        f(Nk()), s(n, e);
      },
      onClick: (e) => {
        f(Fk({ activeIndex: d, activeDataKey: l, activeCoordinate: u, activeGraphicalItemId: t })),
          c(n, e);
      },
    },
    DF(i, n),
  );
}
function AF(e) {
  var {
    graphicalItemId: t,
    modifiedLinks: n,
    links: r,
    linkContent: i,
    onMouseEnter: o,
    onMouseLeave: s,
    onClick: c,
    dataKey: l,
  } = e;
  return a.createElement(
    nl,
    { className: `recharts-sankey-links`, key: `recharts-sankey-links` },
    r.map((e, r) => {
      var u = n[r];
      return u == null
        ? null
        : a.createElement(kF, {
            graphicalItemId: t,
            key: `link-${e.source}-${e.target}-${e.value}`,
            props: u,
            linkContent: i,
            i: r,
            onMouseEnter: o,
            onMouseLeave: s,
            onClick: c,
            dataKey: l,
          });
    }),
  );
}
function jF(e, t) {
  return a.isValidElement(e)
    ? a.cloneElement(e, t)
    : typeof e == `function`
      ? e(t)
      : a.createElement(
          Wy,
          ZP({ className: `recharts-sankey-node`, fill: `#0088fe`, fillOpacity: `0.8` }, Wc(t)),
        );
}
var MF = (e) => {
  var { node: t, nodeContent: n, top: r, left: i, i: a } = e,
    { x: o, y: s, dx: c, dy: l } = t;
  return tF(tF({}, Gc(n)), {}, { x: o + i, y: s + r, width: c, height: l, index: a, payload: t });
};
function NF(e) {
  var {
      graphicalItemId: t,
      props: n,
      nodeContent: r,
      i,
      onMouseEnter: o,
      onMouseLeave: s,
      onClick: c,
      dataKey: l,
    } = e,
    u = _d(),
    d = SF(n),
    f = `node-${i}`;
  return a.createElement(
    nl,
    {
      onMouseEnter: (e) => {
        u(Mk({ activeIndex: f, activeDataKey: l, activeCoordinate: d, activeGraphicalItemId: t })),
          o(n, e);
      },
      onMouseLeave: (e) => {
        u(Nk()), s(n, e);
      },
      onClick: (e) => {
        u(Fk({ activeIndex: f, activeDataKey: l, activeCoordinate: d, activeGraphicalItemId: t })),
          c(n, e);
      },
    },
    jF(r, n),
  );
}
function PF(e) {
  var {
    graphicalItemId: t,
    modifiedNodes: n,
    nodeContent: r,
    onMouseEnter: i,
    onMouseLeave: o,
    onClick: s,
    dataKey: c,
  } = e;
  return a.createElement(
    nl,
    { className: `recharts-sankey-nodes`, key: `recharts-sankey-nodes` },
    n.map((e, n) =>
      a.createElement(NF, {
        graphicalItemId: t,
        key: `node-${e.index}-${e.x}-${e.y}`,
        props: e,
        nodeContent: r,
        i: n,
        onMouseEnter: i,
        onMouseLeave: o,
        onClick: s,
        dataKey: c,
      }),
    ),
  );
}
var FF = tF(
  {
    align: `justify`,
    dataKey: `value`,
    iterations: 32,
    linkCurvature: 0.5,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    nameKey: `name`,
    nodePadding: 10,
    nodeWidth: 10,
    sort: !0,
    verticalAlign: `justify`,
  },
  wP,
);
function IF(e) {
  var { className: t, style: n, children: r, id: i } = e,
    o = QP(e, XP),
    {
      link: s,
      dataKey: c,
      node: l,
      onMouseEnter: u,
      onMouseLeave: d,
      onClick: f,
      data: p,
      iterations: m,
      nodeWidth: h,
      nodePadding: g,
      sort: _,
      linkCurvature: v,
      margin: y,
      verticalAlign: b,
      align: x,
    } = e,
    S = Wc(o),
    C = cg(),
    w = lg(),
    {
      links: T,
      modifiedLinks: E,
      modifiedNodes: D,
    } = (0, a.useMemo)(() => {
      if (!p || !C || !w || C <= 0 || w <= 0)
        return { nodes: [], links: [], modifiedLinks: [], modifiedNodes: [] };
      var e = xF({
          data: p,
          width: C - (y.left ?? 0) - (y.right ?? 0),
          height: w - (y.top ?? 0) - (y.bottom ?? 0),
          iterations: m,
          nodeWidth: h,
          nodePadding: g,
          sort: _,
          verticalAlign: b,
          align: x,
        }),
        t = y.top || 0,
        n = y.left || 0,
        r = e.links
          .map((r, i) =>
            OF({ link: r, nodes: e.nodes, i, top: t, left: n, linkContent: s, linkCurvature: v }),
          )
          .filter(Tu),
        i = e.nodes.map((e, r) => MF({ node: e, nodeContent: l, i: r, top: t, left: n }));
      return { nodes: e.nodes, links: e.links, modifiedLinks: r, modifiedNodes: i };
    }, [p, C, w, y, m, h, g, _, s, l, v, x, b]),
    O = (0, a.useCallback)(
      (e, t, n) => {
        u && u(e, t, n);
      },
      [u],
    ),
    k = (0, a.useCallback)(
      (e, t, n) => {
        d && d(e, t, n);
      },
      [d],
    ),
    ee = (0, a.useCallback)(
      (e, t, n) => {
        f && f(e, t, n);
      },
      [f],
    );
  return !Gm(C) || !Gm(w) || !p || !p.links || !p.nodes
    ? null
    : a.createElement(
        a.Fragment,
        null,
        a.createElement(vN, { computedData: { links: E, nodes: D } }),
        a.createElement(
          Zc,
          ZP({}, S, { width: C, height: w }),
          r,
          a.createElement(AF, {
            graphicalItemId: i,
            links: T,
            modifiedLinks: E,
            linkContent: s,
            dataKey: c,
            onMouseEnter: (e, t) => O(e, `link`, t),
            onMouseLeave: (e, t) => k(e, `link`, t),
            onClick: (e, t) => ee(e, `link`, t),
          }),
          a.createElement(PF, {
            graphicalItemId: i,
            modifiedNodes: D,
            nodeContent: l,
            dataKey: c,
            onMouseEnter: (e, t) => O(e, `node`, t),
            onMouseLeave: (e, t) => k(e, `node`, t),
            onClick: (e, t) => ee(e, `node`, t),
          }),
        ),
      );
}
function LF(e) {
  var t = Pu(e, FF),
    {
      width: n,
      height: r,
      style: i,
      className: o,
      id: s,
      throttleDelay: c,
      throttledEvents: l,
    } = t,
    [u, d] = (0, a.useState)(null);
  return a.createElement(
    AP,
    { preloadedState: { options: TF }, reduxStoreName: o ?? `Sankey` },
    a.createElement(pg, { width: n, height: r }),
    a.createElement(mg, { margin: t.margin }),
    a.createElement(jP, { throttleDelay: c, throttledEvents: l }),
    a.createElement(
      KP,
      {
        className: o,
        style: i,
        width: n,
        height: r,
        responsive: !1,
        ref: (e) => {
          e && !u && d(e);
        },
        onMouseEnter: void 0,
        onMouseLeave: void 0,
        onClick: void 0,
        onMouseMove: void 0,
        onMouseDown: void 0,
        onMouseUp: void 0,
        onContextMenu: void 0,
        onDoubleClick: void 0,
        onTouchStart: void 0,
        onTouchMove: void 0,
        onTouchEnd: void 0,
      },
      a.createElement(
        Xj.Provider,
        { value: u },
        a.createElement(KM, { id: s, type: `sankey` }, (e) =>
          a.createElement(
            a.Fragment,
            null,
            a.createElement(EF, {
              dataKey: t.dataKey,
              nameKey: t.nameKey,
              stroke: t.stroke,
              strokeWidth: t.strokeWidth,
              fill: t.fill,
              name: t.name,
              data: t.data,
              id: e,
            }),
            a.createElement(IF, ZP({}, t, { id: e })),
          ),
        ),
      ),
    ),
  );
}
LF.displayName = `Sankey`;
export {
  _s as s,
  as as d,
  c as _,
  ec as c,
  Go as l,
  Ii as u,
  ic as f,
  ig as i,
  ks as h,
  LF as t,
  MM as n,
  Ni as o,
  nl as a,
  Ri as m,
  ss as p,
  Wy as r,
  Ys as g,
};
