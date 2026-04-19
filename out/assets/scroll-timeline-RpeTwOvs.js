var e = Object.defineProperty,
  t = (t, n, r) =>
    n in t ? e(t, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[n] = r),
  n = (e, n, r) => (t(e, typeof n == `symbol` ? n : n + ``, r), r);
(function () {
  class e {}
  class t extends e {
    constructor(e) {
      super(), n(this, `value`), (this.value = e);
    }
  }
  class r extends e {
    constructor(e) {
      super(), n(this, `value`), (this.value = e);
    }
  }
  class i extends e {
    constructor(e) {
      super(), n(this, `value`), (this.value = e);
    }
  }
  class a extends e {
    constructor(e, t = `unrestricted`) {
      super(), n(this, `type`), n(this, `value`), (this.value = e), (this.type = t);
    }
  }
  class o extends e {
    constructor(e) {
      super(), n(this, `value`), (this.value = e);
    }
  }
  class s extends e {}
  class c extends e {
    constructor(e) {
      super(), n(this, `value`), (this.value = e);
    }
  }
  class l extends e {}
  class u extends e {
    constructor(e) {
      super(), n(this, `value`), (this.value = e);
    }
  }
  class d extends e {
    constructor(e, t = `integer`) {
      super(), n(this, `value`), n(this, `type`), (this.value = e), (this.type = t);
    }
  }
  class f extends e {
    constructor(e) {
      super(), n(this, `value`), (this.value = e);
    }
  }
  class p extends e {
    constructor(e, t, r) {
      super(),
        n(this, `value`),
        n(this, `type`),
        n(this, `unit`),
        (this.value = e),
        (this.type = t),
        (this.unit = r);
    }
  }
  class m extends e {}
  class h extends e {}
  class g extends e {}
  class _ extends e {}
  class ee extends e {}
  class te extends e {}
  class ne extends e {}
  class re extends e {}
  class v extends e {}
  class y extends e {}
  class ie extends e {}
  class ae extends e {}
  class oe {
    constructor(e) {
      n(this, `input`), n(this, `index`, 0), (this.input = e);
    }
    consume() {
      const e = this.input.codePointAt(this.index);
      return e !== void 0 && (this.index += String.fromCodePoint(e).length), e;
    }
    reconsume(e) {
      e !== void 0 && (this.index -= String.fromCodePoint(e).length);
    }
    peek() {
      let e = [],
        t = this.index;
      for (let n = 0; n < 3 && t < this.input.length; n++) {
        const n = this.input.codePointAt(t);
        e.push(n), (t += String.fromCodePoint(n).length);
      }
      return e;
    }
  }
  function se(e) {
    return e === 10;
  }
  function b(e) {
    return se(e) || e === 8192 || e === 32;
  }
  function x(e) {
    return e >= 48 && e <= 57;
  }
  function ce(e) {
    return x(e) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102);
  }
  function S(e) {
    return (
      (function (e) {
        return (
          (function (e) {
            return e >= 65 && e <= 90;
          })(e) ||
          (function (e) {
            return e >= 97 && e <= 122;
          })(e)
        );
      })(e) ||
      (function (e) {
        return e >= 128;
      })(e) ||
      e === 95
    );
  }
  function le(e) {
    return S(e) || x(e) || e === 45;
  }
  function ue(e) {
    return (e >= 0 && e <= 8) || e === 11 || (e >= 14 && e <= 31) || e === 127;
  }
  function C(e, t) {
    return e === 92 && !se(t);
  }
  function w(e, t, n) {
    return e === 45 ? S(t) || t === 45 || C(t, n) : !!S(e) || (e === 92 && C(e, t));
  }
  function de(e, t, n) {
    return e === 43 || e === 45 ? x(t) || (t === 46 && x(n)) : x(e === 46 ? t : e);
  }
  function fe(e) {
    const t = e.consume();
    if (ce(t)) {
      const n = [t];
      for (; ce(...e.peek()) && n.length < 5; ) n.push(e.consume());
      b(...e.peek()) && e.consume();
      const r = parseInt(String.fromCodePoint(...n), 16);
      return r === 0 || r > 1114111 ? 65533 : r;
    }
    return t === void 0 ? 65533 : t;
  }
  function pe(e, t) {
    const n = new o(``);
    for (;;) {
      const r = e.consume();
      if (r === t || r === void 0) return n;
      if (r === 10) return e.reconsume(r), new s();
      if (r === 92) {
        const t = e.peek()[0];
        t === void 0 || (se(t) ? e.consume() : (n.value += String.fromCodePoint(fe(e))));
      } else n.value += String.fromCodePoint(r);
    }
  }
  function me(e) {
    let t = ``;
    for (;;) {
      const n = e.consume();
      if (le(n)) t += String.fromCodePoint(n);
      else {
        if (!C(...e.peek())) return e.reconsume(n), t;
        t += String.fromCodePoint(fe(e));
      }
    }
  }
  function he(e) {
    const t = (function (e) {
      let t = `integer`,
        n = ``;
      for (
        [43, 45].includes(e.peek()[0]) && (n += String.fromCodePoint(e.consume()));
        x(...e.peek());
      )
        n += String.fromCodePoint(e.consume());
      if (e.peek()[0] === 46 && x(e.peek()[1]))
        for (n += String.fromCodePoint(e.consume(), e.consume()), t = `number`; x(...e.peek()); )
          n += String.fromCodePoint(e.consume());
      return (
        [69, 101].includes(e.peek()[0]) &&
          ([45, 43].includes(e.peek()[1]) && x(e.peek()[2])
            ? ((n += String.fromCodePoint(e.consume(), e.consume(), e.consume())), (t = `number`))
            : x(e.peek()[1]) &&
              ((n += String.fromCodePoint(e.consume(), e.consume())), (t = `number`))),
        { value: parseFloat(n), type: t }
      );
    })(e);
    return w(...e.peek())
      ? new p(t.value, t.type, me(e))
      : e.peek()[0] === 37
        ? (e.consume(), new f(t.value))
        : new d(t.value, t.type);
  }
  function ge(e) {
    for (;;) {
      const t = e.consume();
      if (t === 41 || t === void 0) return;
      C(...e.peek()) && fe(e);
    }
  }
  function _e(e) {
    const n = me(e);
    if (n.match(/url/i) && e.peek()[0] === 40) {
      for (e.consume(); b(e.peek()[0]) && b(e.peek()[1]); ) e.consume();
      return [34, 39].includes(e.peek()[0]) || (b(e.peek()[0]) && [34, 39].includes(e.peek()[1]))
        ? new r(n)
        : (function (e) {
            const t = new c(``);
            for (; b(...e.peek()); ) e.consume();
            for (;;) {
              const n = e.consume();
              if (n === 41 || n === void 0) return t;
              if (b(n)) {
                for (; b(...e.peek()); ) e.consume();
                return e.peek()[0] === 41 || e.peek()[0] === void 0
                  ? (e.consume(), t)
                  : (ge(e), new l());
              }
              if ([34, 39, 40].includes(n) || ue(n)) return ge(e), new l();
              if (n === 92) {
                if (!C(...e.peek())) return ge(e), new l();
                t.value += fe(e);
              } else t.value += String.fromCodePoint(n);
            }
          })(e);
    }
    return e.peek()[0] === 40 ? (e.consume(), new r(n)) : new t(n);
  }
  function ve(e) {
    const t = e.consume(),
      n = e.peek();
    if (b(t)) {
      for (; b(...e.peek()); ) e.consume();
      return new m();
    }
    if (t === 34) return pe(e, t);
    if (t === 35) {
      if (le(n[0]) || C(...n)) {
        const t = new a();
        return w(...n) && (t.type = `id`), (t.value = me(e)), t;
      }
      return new u(String.fromCodePoint(t));
    }
    return t === 39
      ? pe(e, t)
      : t === 40
        ? new v()
        : t === 41
          ? new y()
          : t === 43
            ? de(...n)
              ? (e.reconsume(t), he(e))
              : new u(String.fromCodePoint(t))
            : t === 44
              ? new te()
              : t === 45
                ? de(...e.peek())
                  ? (e.reconsume(t), he(e))
                  : e.peek()[0] === 45 && e.peek()[1] === 62
                    ? (e.consume(), e.consume(), new g())
                    : w(...e.peek())
                      ? (e.reconsume(t), _e(e))
                      : new u(String.fromCodePoint(t))
                : t === 46
                  ? de(...e.peek())
                    ? (e.reconsume(t), he(e))
                    : new u(String.fromCodePoint(t))
                  : t === 58
                    ? new _()
                    : t === 59
                      ? new ee()
                      : t === 60
                        ? n[0] === 33 && n[1] === 45 && n[2] === 45
                          ? (e.consume(), e.consume(), e.consume(), new h())
                          : new u(String.fromCodePoint(t))
                        : t === 64
                          ? w(...n)
                            ? new i(me(e))
                            : new u(String.fromCodePoint(t))
                          : t === 91
                            ? new ne()
                            : t === 92
                              ? C(...n)
                                ? (e.reconsume(t), _e(e))
                                : new u(String.fromCodePoint(t))
                              : t === 93
                                ? new re()
                                : t === 123
                                  ? new ie()
                                  : t === 125
                                    ? new ae()
                                    : x(t)
                                      ? (e.reconsume(t), he(e))
                                      : S(t)
                                        ? (e.reconsume(t), _e(e))
                                        : t === void 0
                                          ? void 0
                                          : new u(String.fromCodePoint(t));
  }
  const ye = new Set([`px`, `deg`, `s`, `hz`, `dppx`, `number`, `fr`]);
  function be(e) {
    return ye.has(e.toLowerCase());
  }
  function xe(e, t) {
    if ([`x`, `y`].includes(e)) return e;
    if (!t)
      throw Error(`To determine the normalized axis the computedStyle of the source is required.`);
    const n = t.writingMode == `horizontal-tb`;
    if (e === `block`) e = n ? `y` : `x`;
    else {
      if (e !== `inline`) throw TypeError(`Invalid axis “${e}”`);
      e = n ? `x` : `y`;
    }
    return e;
  }
  function Se(e) {
    let t = [],
      n = 0;
    function r() {
      let t = 0,
        r = n;
      for (; n < e.length; ) {
        const r = e.slice(n, n + 1);
        if (/\s/.test(r) && t === 0) break;
        if (r === `(`) t += 1;
        else if (r === `)` && (--t, t === 0)) {
          n++;
          break;
        }
        n++;
      }
      return e.slice(r, n);
    }
    function i() {
      for (; /\s/.test(e.slice(n, n + 1)); ) n++;
    }
    for (; n < e.length; ) {
      const a = e.slice(n, n + 1);
      /\s/.test(a) ? i() : t.push(r());
    }
    return t;
  }
  function Ce(e, t) {
    return e.reduce((e, n) => (e.has(n[t]) ? e.get(n[t]).push(n) : e.set(n[t], [n]), e), new Map());
  }
  function we(e, t) {
    const n = [],
      r = [];
    for (const i of e) t(i) ? n.push(i) : r.push(i);
    return [n, r];
  }
  function T(e, t = {}) {
    function n(e) {
      return Array.from(e).map((e) => T(e, t));
    }
    if (e instanceof CSSUnitValue) {
      if (e.unit === `percent` && t.percentageReference) {
        const n = (e.value / 100) * t.percentageReference.value,
          r = t.percentageReference.unit;
        return new CSSUnitValue(n, r);
      }
      const n = e.toSum();
      if (
        (n && n.values.length === 1 && (e = n.values[0]),
        e instanceof CSSUnitValue &&
          e.unit === `em` &&
          t.fontSize &&
          (e = new CSSUnitValue(e.value * t.fontSize.value, t.fontSize.unit)),
        e instanceof CSSKeywordValue)
      ) {
        if (e.value === `e`) return new CSSUnitValue(Math.E, `number`);
        if (e.value === `pi`) return new CSSUnitValue(Math.PI, `number`);
      }
      return e;
    }
    if (!e.operator) return e;
    switch (e.operator) {
      case `sum`:
        e = new CSSMathSum(...n(e.values));
        break;
      case `product`:
        e = new CSSMathProduct(...n(e.values));
        break;
      case `negate`:
        e = new CSSMathNegate(T(e.value, t));
        break;
      case `clamp`:
        e = new CSSMathClamp(T(e.lower, t), T(e.value, t), T(e.upper, t));
        break;
      case `invert`:
        e = new CSSMathInvert(T(e.value, t));
        break;
      case `min`:
        e = new CSSMathMin(...n(e.values));
        break;
      case `max`:
        e = new CSSMathMax(...n(e.values));
    }
    if (e instanceof CSSMathMin || e instanceof CSSMathMax) {
      const t = Array.from(e.values);
      if (
        t.every(
          (e) =>
            e instanceof CSSUnitValue && e.unit !== `percent` && be(e.unit) && e.unit === t[0].unit,
        )
      ) {
        const n = Math[e.operator].apply(
          Math,
          t.map(({ value: e }) => e),
        );
        return new CSSUnitValue(n, t[0].unit);
      }
    }
    if (e instanceof CSSMathMin || e instanceof CSSMathMax) {
      const t = Array.from(e.values),
        [n, r] = we(t, (e) => e instanceof CSSUnitValue && e.unit !== `percent`),
        i = Array.from(Ce(n, `unit`).values());
      if (i.some((e) => e.length > 0)) {
        const t = i.map((t) => {
          const n = Math[e.operator].apply(
            Math,
            t.map(({ value: e }) => e),
          );
          return new CSSUnitValue(n, t[0].unit);
        });
        e = e instanceof CSSMathMin ? new CSSMathMin(...t, ...r) : new CSSMathMax(...t, ...r);
      }
      return t.length === 1 ? t[0] : e;
    }
    if (e instanceof CSSMathNegate)
      return e.value instanceof CSSUnitValue
        ? new CSSUnitValue(0 - e.value.value, e.value.unit)
        : e.value instanceof CSSMathNegate
          ? e.value.value
          : e;
    if (e instanceof CSSMathInvert) return e.value instanceof CSSMathInvert ? e.value.value : e;
    if (e instanceof CSSMathSum) {
      let t = function (e) {
          const t = e.filter((e) => e instanceof CSSUnitValue);
          return [
            ...e.filter((e) => !(e instanceof CSSUnitValue)),
            ...Array.from(Ce(t, `unit`).entries()).map(([e, t]) => {
              const n = t.reduce((e, { value: t }) => e + t, 0);
              return new CSSUnitValue(n, e);
            }),
          ];
        },
        n = [];
      for (const t of e.values) t instanceof CSSMathSum ? n.push(...t.values) : n.push(t);
      return (n = t(n)), n.length === 1 ? n[0] : new CSSMathSum(...n);
    }
    if (e instanceof CSSMathProduct) {
      let t = [];
      for (const n of e.values) n instanceof CSSMathProduct ? t.push(...n.values) : t.push(n);
      const [n, r] = we(t, (e) => e instanceof CSSUnitValue && e.unit === `number`);
      if (n.length > 1) {
        const e = n.reduce((e, { value: t }) => e * t, 1);
        t = [new CSSUnitValue(e, `number`), ...r];
      }
      if (t.length === 2) {
        let e, n;
        for (const r of t)
          r instanceof CSSUnitValue && r.unit === `number`
            ? (e = r)
            : r instanceof CSSMathSum &&
              [...r.values].every((e) => e instanceof CSSUnitValue) &&
              (n = r);
        if (e && n)
          return new CSSMathSum(
            ...[...n.values].map((t) => new CSSUnitValue(t.value * e.value, t.unit)),
          );
      }
      if (
        t.every(
          (e) =>
            (e instanceof CSSUnitValue && be(e.unit)) ||
            (e instanceof CSSMathInvert && e.value instanceof CSSUnitValue && be(e.value.unit)),
        )
      ) {
        const e = new CSSMathProduct(...t).toSum();
        if (e && e.values.length === 1) return e.values[0];
      }
      return new CSSMathProduct(...t);
    }
    return e;
  }
  const Te = [`percent`, `length`, `angle`, `time`, `frequency`, `resolution`, `flex`],
    E = {
      fontRelativeLengths: {
        units: new Set([
          `em`,
          `rem`,
          `ex`,
          `rex`,
          `cap`,
          `rcap`,
          `ch`,
          `rch`,
          `ic`,
          `ric`,
          `lh`,
          `rlh`,
        ]),
      },
      viewportRelativeLengths: {
        units: new Set([
          `vw`,
          `lvw`,
          `svw`,
          `dvw`,
          `vh`,
          `lvh`,
          `svh`,
          `dvh`,
          `vi`,
          `lvi`,
          `svi`,
          `dvi`,
          `vb`,
          `lvb`,
          `svb`,
          `dvb`,
          `vmin`,
          `lvmin`,
          `svmin`,
          `dvmin`,
          `vmax`,
          `lvmax`,
          `svmax`,
          `dvmax`,
        ]),
      },
      absoluteLengths: {
        units: new Set([`cm`, `mm`, `Q`, `in`, `pt`, `pc`, `px`]),
        compatible: !0,
        canonicalUnit: `px`,
        ratios: {
          cm: 96 / 2.54,
          mm: 96 / 2.54 / 10,
          Q: 96 / 2.54 / 40,
          in: 96,
          pc: 16,
          pt: 96 / 72,
          px: 1,
        },
      },
      angle: {
        units: new Set([`deg`, `grad`, `rad`, `turn`]),
        compatible: !0,
        canonicalUnit: `deg`,
        ratios: { deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 },
      },
      time: {
        units: new Set([`s`, `ms`]),
        compatible: !0,
        canonicalUnit: `s`,
        ratios: { s: 1, ms: 0.001 },
      },
      frequency: {
        units: new Set([`hz`, `khz`]),
        compatible: !0,
        canonicalUnit: `hz`,
        ratios: { hz: 1, khz: 1e3 },
      },
      resolution: {
        units: new Set([`dpi`, `dpcm`, `dppx`]),
        compatible: !0,
        canonicalUnit: `dppx`,
        ratios: { dpi: 1 / 96, dpcm: 2.54 / 96, dppx: 1 },
      },
    },
    Ee = new Map();
  for (const e of Object.values(E)) if (e.compatible) for (const t of e.units) Ee.set(t, e);
  function De(e) {
    return Ee.get(e);
  }
  function Oe(e, t) {
    const n = { ...e };
    for (const e of Object.keys(t)) n[e] ? (n[e] += t[e]) : (n[e] = t[e]);
    return n;
  }
  function ke(e) {
    return e === `number`
      ? {}
      : e === `percent`
        ? { percent: 1 }
        : E.absoluteLengths.units.has(e) ||
            E.fontRelativeLengths.units.has(e) ||
            E.viewportRelativeLengths.units.has(e)
          ? { length: 1 }
          : E.angle.units.has(e)
            ? { angle: 1 }
            : E.time.units.has(e)
              ? { time: 1 }
              : E.frequency.units.has(e)
                ? { frequency: 1 }
                : E.resolution.units.has(e)
                  ? { resolution: 1 }
                  : e === `fr`
                    ? { flex: 1 }
                    : null;
  }
  function D(e) {
    if (e instanceof CSSUnitValue) {
      let { unit: t, value: n } = e,
        r = De(e.unit);
      return (
        r && t !== r.canonicalUnit && ((n *= r.ratios[t]), (t = r.canonicalUnit)),
        t === `number` ? [[n, {}]] : [[n, { [t]: 1 }]]
      );
    }
    if (e instanceof CSSMathInvert) {
      if (!(e.value instanceof CSSUnitValue)) throw Error(`Not implemented`);
      const t = D(e.value);
      if (t === null || t.length > 1) return null;
      const n = t[0],
        r = {};
      for (const [e, t] of Object.entries(n[1])) r[e] = -1 * t;
      return (t[0] = [1 / n[0], r]), t;
    }
    if (e instanceof CSSMathProduct) {
      let t = [[1, {}]];
      for (const n of e.values) {
        const e = D(n),
          r = [];
        if (e === null) return null;
        for (const n of t) for (const t of e) r.push([n[0] * t[0], Oe(n[1], t[1])]);
        t = r;
      }
      return t;
    }
    throw Error(`Not implemented`);
  }
  function Ae(e, t) {
    if (ke(t) === null) throw SyntaxError(`The string did not match the expected pattern.`);
    const n = D(e);
    if (!n) throw TypeError();
    if (n.length > 1) throw TypeError(`Sum has more than one item`);
    const r = (function (e, t) {
      const n = e.unit,
        r = e.value,
        i = De(n),
        a = De(t);
      return !a || i !== a ? null : new CSSUnitValue((r * a.ratios[n]) / a.ratios[t], t);
    })(je(n[0]), t);
    if (r === null) throw TypeError();
    return r;
  }
  function je(e) {
    const [t, n] = e,
      r = Object.entries(n);
    if (r.length > 1) return null;
    if (r.length === 0) return new CSSUnitValue(t, `number`);
    const i = r[0];
    return i[1] === 1 ? new CSSUnitValue(t, i[0]) : null;
  }
  function Me(e, ...t) {
    if (t && t.length) throw Error(`Not implemented`);
    const n = D(e).map((e) => je(e));
    if (n.some((e) => e === null)) throw TypeError(`Type error`);
    return new CSSMathSum(...n);
  }
  function Ne(e, t) {
    if (e.percentHint && t.percentHint && e.percentHint !== t.percentHint) return null;
    const n = { ...e, percentHint: e.percentHint ?? t.percentHint };
    for (const e of Te) t[e] && (n[e] ?? (n[e] = 0), (n[e] += t[e]));
    return n;
  }
  class O {
    constructor(e, t) {
      n(this, `name`), n(this, `values`), (this.name = e), (this.values = t);
    }
  }
  class Pe {
    constructor(e, t) {
      n(this, `value`), n(this, `associatedToken`), (this.value = e), (this.associatedToken = t);
    }
  }
  function Fe(e) {
    if (Array.isArray(e)) return e;
    if (typeof e == `string`)
      return (function (e) {
        const t = new oe(e),
          n = [];
        for (;;) {
          const e = ve(t);
          if (e === void 0) return n;
          n.push(e);
        }
      })(e);
    throw TypeError(`Invalid input type ` + typeof e);
  }
  function Ie(e) {
    const t = e.shift();
    return t instanceof ie || t instanceof ne || t instanceof v
      ? (function (e, t) {
          let n;
          if (t instanceof ie) n = ae;
          else if (t instanceof v) n = y;
          else {
            if (!(t instanceof ne)) return;
            n = re;
          }
          const r = new Pe([], t);
          for (;;) {
            const t = e.shift();
            if (t instanceof n || t === void 0) return r;
            e.unshift(t), r.value.push(Ie(e));
          }
        })(e, t)
      : t instanceof r
        ? (function (e, t) {
            const n = new O(e.value, []);
            for (;;) {
              const e = t.shift();
              if (e instanceof y || e === void 0) return n;
              t.unshift(e), n.values.push(Ie(t));
            }
          })(t, e)
        : t;
  }
  function Le(e) {
    if (e instanceof v || e instanceof y) return 6;
    if (e instanceof u)
      switch (e.value) {
        case `*`:
        case `/`:
          return 4;
        case `+`:
        case `-`:
          return 2;
      }
  }
  function k(e) {
    return e[e.length - 1];
  }
  function Re(e, t, n) {
    const r = [`+`, `-`].includes(e.value) ? `ADDITION` : `MULTIPLICATION`,
      i = t.type === r ? t.values : [t],
      a = n.type === r ? n.values : [n];
    return (
      e.value === `-`
        ? (a[0] = { type: `NEGATE`, value: a[0] })
        : e.value === `/` && (a[0] = { type: `INVERT`, value: a[0] }),
      { type: r, values: [...i, ...a] }
    );
  }
  function A(e) {
    if (e.type === `ADDITION`) return new CSSMathSum(...e.values.map((e) => A(e)));
    if (e.type === `MULTIPLICATION`) return new CSSMathProduct(...e.values.map((e) => A(e)));
    if (e.type === `NEGATE`) return new CSSMathNegate(A(e.value));
    if (e.type === `INVERT`) return new CSSMathInvert(A(e.value));
    if (e instanceof Pe) return ze(new O(`calc`, e.value));
    if (e instanceof t) {
      if (e.value === `e`) return new CSSUnitValue(Math.E, `number`);
      if (e.value === `pi`) return new CSSUnitValue(Math.PI, `number`);
      throw SyntaxError(`Invalid math expression`);
    }
    return Be(e);
  }
  function ze(e) {
    if (e.name === `min` || e.name === `max`) {
      const t = e.values
        .filter((e) => !(e instanceof m || e instanceof te))
        .map((e) => T(ze(new O(`calc`, e))));
      return e.name === `min` ? new CSSMathMin(...t) : new CSSMathMax(...t);
    }
    if (e.name !== `calc`) return null;
    let n = A(
        (function (e) {
          const n = [],
            r = [];
          for (; e.length; ) {
            const i = e.shift();
            if (
              i instanceof d ||
              i instanceof p ||
              i instanceof f ||
              i instanceof O ||
              i instanceof Pe ||
              i instanceof t
            )
              r.push(i);
            else if (i instanceof u && [`*`, `/`, `+`, `-`].includes(i.value)) {
              for (; n.length && !(k(n) instanceof v) && Le(k(n)) > Le(i); ) {
                const e = n.pop(),
                  t = r.pop(),
                  i = r.pop();
                r.push(Re(e, i, t));
              }
              n.push(i);
            } else if (i instanceof v) n.push(i);
            else if (i instanceof y) {
              if (!n.length) return null;
              for (; !(k(n) instanceof v); ) {
                const e = n.pop(),
                  t = r.pop(),
                  i = r.pop();
                r.push(Re(e, i, t));
              }
              if (!(k(n) instanceof v)) return null;
              n.pop();
            } else if (!(i instanceof m)) return null;
          }
          for (; n.length; ) {
            if (k(n) instanceof v) return null;
            const e = n.pop(),
              t = r.pop(),
              i = r.pop();
            r.push(Re(e, i, t));
          }
          return r[0];
        })([...e.values]),
      ),
      r;
    try {
      r = T(n);
    } catch {
      new CSSStyleSheet().insertRule(`error`, 0);
    }
    return r instanceof CSSUnitValue ? new CSSMathSum(r) : r;
  }
  function Be(e) {
    return e instanceof O && [`calc`, `min`, `max`, `clamp`].includes(e.name)
      ? ze(e)
      : e instanceof d && e.value === 0 && !e.unit
        ? new CSSUnitValue(0, `px`)
        : e instanceof d
          ? new CSSUnitValue(e.value, `number`)
          : e instanceof f
            ? new CSSUnitValue(e.value, `percent`)
            : e instanceof p
              ? new CSSUnitValue(e.value, e.unit)
              : void 0;
  }
  function Ve(e) {
    const t = (function (e) {
      const t = Fe(e);
      for (; t[0] instanceof m; ) t.shift();
      if (t[0] === void 0) return null;
      const n = Ie(t);
      for (; t[0] instanceof m; ) t.shift();
      return t[0] === void 0 ? n : null;
    })(e);
    return (
      t === null && new CSSStyleSheet().insertRule(`error`, 0),
      t instanceof d ||
        t instanceof f ||
        t instanceof p ||
        t instanceof O ||
        new CSSStyleSheet().insertRule(`error`, 0),
      t instanceof p && ke(t.unit) === null && new CSSStyleSheet().insertRule(`error`, 0),
      Be(t)
    );
  }
  (function () {
    const e = new WeakMap();
    function t(e) {
      const t = [];
      for (let r = 0; r < e.length; r++)
        t[r] = typeof (n = e[r]) == `number` ? new CSSUnitValue(n, `number`) : n;
      var n;
      return t;
    }
    class n {
      static parse(e) {
        return e instanceof n ? e : T(Ve(e), {});
      }
    }
    class r extends n {
      constructor(n, r, i, a) {
        super(), e.set(this, { values: t(n), operator: r, name: i || r, delimiter: a || `, ` });
      }
      get operator() {
        return e.get(this).operator;
      }
      get values() {
        return e.get(this).values;
      }
      toString() {
        const t = e.get(this);
        return `${t.name}(${t.values.join(t.delimiter)})`;
      }
    }
    const i = {
      CSSNumericValue: n,
      CSSMathValue: r,
      CSSUnitValue: class extends n {
        constructor(t, n) {
          super(), e.set(this, { value: t, unit: n });
        }
        get value() {
          return e.get(this).value;
        }
        set value(t) {
          e.get(this).value = t;
        }
        get unit() {
          return e.get(this).unit;
        }
        to(e) {
          return Ae(this, e);
        }
        toSum(...e) {
          return Me(this, ...e);
        }
        type() {
          return ke(e.get(this).unit);
        }
        toString() {
          const t = e.get(this);
          return `${t.value}${(function (e) {
            switch (e) {
              case `percent`:
                return `%`;
              case `number`:
                return ``;
              default:
                return e.toLowerCase();
            }
          })(t.unit)}`;
        }
      },
      CSSKeywordValue: class {
        constructor(e) {
          this.value = e;
        }
        toString() {
          return this.value.toString();
        }
      },
      CSSMathSum: class extends r {
        constructor(e) {
          super(arguments, `sum`, `calc`, ` + `);
        }
      },
      CSSMathProduct: class extends r {
        constructor(e) {
          super(arguments, `product`, `calc`, ` * `);
        }
        toSum(...e) {
          return Me(this, ...e);
        }
        type() {
          return e
            .get(this)
            .values.map((e) => e.type())
            .reduce(Ne);
        }
      },
      CSSMathNegate: class extends r {
        constructor(e) {
          super([arguments[0]], `negate`, `-`);
        }
        get value() {
          return e.get(this).values[0];
        }
        type() {
          return this.value.type();
        }
      },
      CSSMathInvert: class extends r {
        constructor(e) {
          super([1, arguments[0]], `invert`, `calc`, ` / `);
        }
        get value() {
          return e.get(this).values[1];
        }
        type() {
          return (function (e) {
            const t = {};
            for (const n of Te) t[n] = -1 * e[n];
            return t;
          })(e.get(this).values[1].type());
        }
      },
      CSSMathMax: class extends r {
        constructor() {
          super(arguments, `max`);
        }
      },
      CSSMathMin: class extends r {
        constructor() {
          super(arguments, `min`);
        }
      },
    };
    if (!window.CSS && !Reflect.defineProperty(window, `CSS`, { value: {} }))
      throw Error(`Error installing CSSOM support`);
    window.CSSUnitValue ||
      `number.percent.em.ex.px.cm.mm.in.pt.pc.Q.vw.vh.vmin.vmax.rems.ch.deg.rad.grad.turn.ms.s.Hz.kHz.dppx.dpi.dpcm.fr`
        .split(`.`)
        .forEach((e) => {
          if (!Reflect.defineProperty(CSS, e, { value: (t) => new CSSUnitValue(t, e) }))
            throw Error(`Error installing CSS.${e}`);
        });
    for (const [e, t] of Object.entries(i))
      if (!(e in window) && !Reflect.defineProperty(window, e, { value: t }))
        throw Error(`Error installing CSSOM support for ${e}`);
  })();
  const He = `block`,
    j = new WeakMap(),
    M = new WeakMap(),
    N = [`entry`, `exit`, `cover`, `contain`, `entry-crossing`, `exit-crossing`];
  function Ue(e) {
    return e === document.scrollingElement ? document : e;
  }
  function P(e) {
    Ke(e);
    const t = j.get(e).animations;
    if (t.length === 0) return;
    const n = e.currentTime;
    for (let e = 0; e < t.length; e++) t[e].tickAnimation(n);
  }
  function We(e, t) {
    if (!e) return null;
    let n = M.get(e).sourceMeasurements,
      r = getComputedStyle(e),
      i = n.scrollTop;
    return xe(t, r) === `x` && (i = Math.abs(n.scrollLeft)), i;
  }
  function Ge(e, t) {
    const n = T(e, t);
    if (n instanceof CSSUnitValue) {
      if (n.unit === `px`) return n.value;
      throw TypeError(`Unhandled unit type ` + n.unit);
    }
    throw TypeError(`Unsupported value type: ` + typeof e);
  }
  function Ke(e) {
    if (!(e instanceof R))
      return void (function (e) {
        const t = j.get(e);
        t.anonymousSource && F(e, et(t.anonymousSource, t.anonymousTarget));
      })(e);
    const t = e.subject;
    if (!t || getComputedStyle(t).display == `none`) return void F(e, null);
    F(e, at(t));
  }
  function qe(e) {
    return [`block`, `inline`, `x`, `y`].includes(e);
  }
  function Je(e) {
    const t = getComputedStyle(e);
    return {
      scrollLeft: e.scrollLeft,
      scrollTop: e.scrollTop,
      scrollWidth: e.scrollWidth,
      scrollHeight: e.scrollHeight,
      clientWidth: e.clientWidth,
      clientHeight: e.clientHeight,
      writingMode: t.writingMode,
      direction: t.direction,
      scrollPaddingTop: t.scrollPaddingTop,
      scrollPaddingBottom: t.scrollPaddingBottom,
      scrollPaddingLeft: t.scrollPaddingLeft,
      scrollPaddingRight: t.scrollPaddingRight,
    };
  }
  function Ye(e, t) {
    if (!e || !t) return;
    let n = 0,
      r = 0,
      i = t,
      a = e.offsetParent;
    for (; i && i != a; ) (r += i.offsetLeft), (n += i.offsetTop), (i = i.offsetParent);
    (r -= e.offsetLeft + e.clientLeft), (n -= e.offsetTop + e.clientTop);
    const o = getComputedStyle(t);
    return {
      top: n,
      left: r,
      offsetWidth: t.offsetWidth,
      offsetHeight: t.offsetHeight,
      fontSize: o.fontSize,
    };
  }
  function Xe(e) {
    const t = M.get(e);
    t.sourceMeasurements = Je(e);
    for (const n of t.timelineRefs) {
      const t = n.deref();
      t instanceof R && (j.get(t).subjectMeasurements = Ye(e, t.subject));
    }
    t.updateScheduled ||=
      (setTimeout(() => {
        for (const e of t.timelineRefs) {
          const t = e.deref();
          t && P(t);
        }
        t.updateScheduled = !1;
      }),
      !0);
  }
  function F(e, t) {
    const n = j.get(e),
      r = n.source;
    if (r != t) {
      if (r) {
        const t = M.get(r);
        if (t) {
          t.timelineRefs.delete(e);
          const n = Array.from(t.timelineRefs).filter((e) => e.deref() === void 0);
          for (const e of n) t.timelineRefs.delete(e);
          t.timelineRefs.size === 0 && (t.disconnect(), M.delete(r));
        }
      }
      if (((n.source = t), t)) {
        let r = M.get(t);
        if (!r) {
          (r = { timelineRefs: new Set(), sourceMeasurements: Je(t) }), M.set(t, r);
          const e = new ResizeObserver(() => {
            Xe(n.source);
          });
          e.observe(t);
          for (const n of t.children) e.observe(n);
          const i = new MutationObserver((e) => {
            for (const t of e) Xe(t.target);
          });
          i.observe(t, { attributes: !0, attributeFilter: [`style`, `class`] });
          const a = () => {
            (r.sourceMeasurements.scrollLeft = t.scrollLeft),
              (r.sourceMeasurements.scrollTop = t.scrollTop);
            for (const e of r.timelineRefs) {
              const t = e.deref();
              t && P(t);
            }
          };
          Ue(t).addEventListener(`scroll`, a),
            (r.disconnect = () => {
              e.disconnect(), i.disconnect(), Ue(t).removeEventListener(`scroll`, a);
            });
        }
        r.timelineRefs.add(new WeakRef(e));
      }
    }
  }
  function Ze(e, t) {
    const n = j.get(e).animations;
    for (let e = 0; e < n.length; e++) n[e].animation == t && n.splice(e, 1);
  }
  function Qe(e, t, n) {
    const r = j.get(e).animations;
    for (let e = 0; e < r.length; e++) if (r[e].animation == t) return;
    r.push({ animation: t, tickAnimation: n }),
      queueMicrotask(() => {
        P(e);
      });
  }
  class I {
    constructor(e) {
      if (
        (j.set(this, {
          source: null,
          axis: He,
          anonymousSource: e ? e.anonymousSource : null,
          anonymousTarget: e ? e.anonymousTarget : null,
          subject: null,
          inset: null,
          animations: [],
          subjectMeasurements: null,
        }),
        F(this, e && e.source !== void 0 ? e.source : document.scrollingElement),
        e && e.axis !== void 0 && e.axis != He)
      ) {
        if (!qe(e.axis)) throw TypeError(`Invalid axis`);
        j.get(this).axis = e.axis;
      }
      P(this);
    }
    set source(e) {
      F(this, e), P(this);
    }
    get source() {
      return j.get(this).source;
    }
    set axis(e) {
      if (!qe(e)) throw TypeError(`Invalid axis`);
      (j.get(this).axis = e), P(this);
    }
    get axis() {
      return j.get(this).axis;
    }
    get duration() {
      return CSS.percent(100);
    }
    get phase() {
      const e = this.source;
      if (!e) return `inactive`;
      const t = getComputedStyle(e);
      return t.display == `none`
        ? `inactive`
        : e == document.scrollingElement || (t.overflow != `visible` && t.overflow != `clip`)
          ? `active`
          : `inactive`;
    }
    get currentTime() {
      const e = this.source;
      if (!e || !e.isConnected || this.phase == `inactive`) return null;
      const t = getComputedStyle(e);
      if (t.display === `inline` || t.display === `none`) return null;
      const n = this.axis,
        r = We(e, n),
        i = (function (e, t) {
          const n = M.get(e).sourceMeasurements,
            r = getComputedStyle(e).writingMode == `horizontal-tb`;
          return (
            t === `block` ? (t = r ? `y` : `x`) : t === `inline` && (t = r ? `x` : `y`),
            t === `y`
              ? n.scrollHeight - n.clientHeight
              : t === `x`
                ? n.scrollWidth - n.clientWidth
                : void 0
          );
        })(e, n);
      return i > 0 ? CSS.percent((100 * r) / i) : CSS.percent(100);
    }
    get __polyfill() {
      return !0;
    }
  }
  function $e(e, t) {
    let n = e.parentElement;
    for (; n != null; ) {
      if (t(n)) return n;
      n = n.parentElement;
    }
  }
  function et(e, t) {
    switch (e) {
      case `root`:
        return document.scrollingElement;
      case `nearest`:
        return at(t);
      case `self`:
        return t;
      default:
        throw TypeError(`Invalid ScrollTimeline Source Type.`);
    }
  }
  function tt(e) {
    switch (getComputedStyle(e).display) {
      case `block`:
      case `inline-block`:
      case `list-item`:
      case `table`:
      case `table-caption`:
      case `flow-root`:
      case `flex`:
      case `grid`:
        return !0;
    }
    return !1;
  }
  function nt(e) {
    const t = getComputedStyle(e);
    return (
      t.transform != `none` ||
      t.perspective != `none` ||
      t.willChange == `transform` ||
      t.willChange == `perspective` ||
      t.filter != `none` ||
      t.willChange == `filter` ||
      t.backdropFilter != `none`
    );
  }
  function rt(e) {
    return getComputedStyle(e).position != `static` || nt(e);
  }
  function it(e) {
    switch (getComputedStyle(e).position) {
      case `static`:
      case `relative`:
      case `sticky`:
        return $e(e, tt);
      case `absolute`:
        return $e(e, rt);
      case `fixed`:
        return $e(e, nt);
    }
  }
  function at(e) {
    if (e && e.isConnected) {
      for (; (e = it(e)); )
        switch (getComputedStyle(e)[`overflow-x`]) {
          case `auto`:
          case `scroll`:
          case `hidden`:
            return e == document.body &&
              getComputedStyle(document.scrollingElement).overflow == `visible`
              ? document.scrollingElement
              : e;
        }
      return document.scrollingElement;
    }
  }
  function L(e, t) {
    const n = j.get(e),
      r = n.subjectMeasurements,
      i = M.get(n.source).sourceMeasurements;
    return e.phase === `inactive` ? null : e instanceof R ? ot(t, i, r, n.axis, n.inset) : null;
  }
  function ot(e, t, n, r, i) {
    let a = t.direction == `rtl` || t.writingMode == `vertical-rl`,
      o,
      s,
      c = { fontSize: n.fontSize };
    xe(r, t) === `x`
      ? ((o = n.offsetWidth),
        (s = n.left),
        (c.scrollPadding = [t.scrollPaddingLeft, t.scrollPaddingRight]),
        a &&
          ((s += t.scrollWidth - t.clientWidth),
          (c.scrollPadding = [t.scrollPaddingRight, t.scrollPaddingLeft])),
        (c.containerSize = t.clientWidth))
      : ((o = n.offsetHeight),
        (s = n.top),
        (c.scrollPadding = [t.scrollPaddingTop, t.scrollPaddingBottom]),
        (c.containerSize = t.clientHeight));
    let l = (function (e, t) {
        const n = { start: 0, end: 0 };
        if (!e) return n;
        const [r, i] = [e.start, e.end].map((e, n) =>
          e === `auto`
            ? t.scrollPadding[n] === `auto`
              ? 0
              : parseFloat(t.scrollPadding[n])
            : Ge(e, {
                percentageReference: CSS.px(t.containerSize),
                fontSize: CSS.px(parseFloat(t.fontSize)),
              }),
        );
        return { start: r, end: i };
      })(i, c),
      u = s - c.containerSize + l.end,
      d = s + o - l.start,
      f = u + o,
      p = d - o,
      m = Math.min(f, p),
      h = Math.max(f, p),
      g,
      _,
      ee = o > c.containerSize - l.start - l.end;
    switch (e) {
      case `cover`:
        (g = u), (_ = d);
        break;
      case `contain`:
        (g = m), (_ = h);
        break;
      case `entry`:
        (g = u), (_ = m);
        break;
      case `exit`:
        (g = h), (_ = d);
        break;
      case `entry-crossing`:
        (g = u), (_ = ee ? h : m);
        break;
      case `exit-crossing`:
        (g = ee ? m : h), (_ = d);
    }
    return { start: g, end: _ };
  }
  function st(e, t) {
    if (e instanceof R) {
      const { rangeName: n, offset: r } = t;
      return ct(L(e, n), r, L(e, `cover`), e.subject);
    }
    if (e instanceof I) {
      let { axis: n, source: r } = e,
        { sourceMeasurements: i } = M.get(r),
        a;
      return (
        (a = xe(n, i) === `x` ? i.scrollWidth - i.clientWidth : i.scrollHeight - i.clientHeight),
        Ge(t, { percentageReference: CSS.px(a) }) / a
      );
    }
    unsupportedTimeline(e);
  }
  function ct(e, t, n, r) {
    if (!e || !n) return 0;
    const i = getComputedStyle(r);
    return (
      (Ge(t, {
        percentageReference: CSS.px(e.end - e.start),
        fontSize: CSS.px(parseFloat(i.fontSize)),
      }) +
        e.start -
        n.start) /
      (n.end - n.start)
    );
  }
  const R = class extends I {
      constructor(e) {
        super(e);
        const t = j.get(this);
        (t.subject = e && e.subject ? e.subject : void 0),
          e &&
            e.inset &&
            (t.inset = (function (e) {
              if (!e) return { start: 0, end: 0 };
              let t;
              if (
                ((t =
                  typeof e == `string`
                    ? Se(e).map((t) => {
                        if (t === `auto`) return `auto`;
                        try {
                          return CSSNumericValue.parse(t);
                        } catch {
                          throw TypeError(`Could not parse inset "${e}"`);
                        }
                      })
                    : Array.isArray(e)
                      ? e
                      : [e]),
                t.length === 0 || t.length > 2)
              )
                throw TypeError(`Invalid inset`);
              for (const e of t) {
                if (e === `auto`) continue;
                const t = e.type();
                if (t.length !== 1 && t.percent !== 1) throw TypeError(`Invalid inset`);
              }
              return { start: t[0], end: t[1] ?? t[0] };
            })(e.inset)),
          t.subject &&
            (new ResizeObserver(() => {
              Xe(t.source);
            }).observe(t.subject),
            new MutationObserver(() => {
              Xe(t.source);
            }).observe(t.subject, { attributes: !0, attributeFilter: [`class`, `style`] })),
          Ke(this),
          (t.subjectMeasurements = Ye(t.source, t.subject)),
          P(this);
      }
      get source() {
        return Ke(this), j.get(this).source;
      }
      set source(e) {
        throw Error(`Cannot set the source of a view timeline`);
      }
      get subject() {
        return j.get(this).subject;
      }
      get axis() {
        return j.get(this).axis;
      }
      get currentTime() {
        const e = We(this.source, this.axis);
        if (e == null) return null;
        const t = L(this, `cover`);
        if (!t) return null;
        const n = (e - t.start) / (t.end - t.start);
        return CSS.percent(100 * n);
      }
      get startOffset() {
        return CSS.px(L(this, `cover`).start);
      }
      get endOffset() {
        return CSS.px(L(this, `cover`).end);
      }
    },
    lt = document.getAnimations,
    ut = window.Element.prototype.getAnimations,
    dt = window.Element.prototype.animate,
    ft = window.Animation;
  class z {
    constructor() {
      (this.state = `pending`),
        (this.nativeResolve = this.nativeReject = null),
        (this.promise = new Promise((e, t) => {
          (this.nativeResolve = e), (this.nativeReject = t);
        }));
    }
    resolve(e) {
      (this.state = `resolved`), this.nativeResolve(e);
    }
    reject(e) {
      (this.state = `rejected`), this.promise.catch(() => {}), this.nativeReject(e);
    }
  }
  function B(e) {
    (e.readyPromise = new z()),
      requestAnimationFrame(() => {
        (e.timeline?.currentTime ?? null) !== null &&
          (Y(e),
          e.pendingTask !== `play` || (e.startTime === null && e.holdTime === null)
            ? e.pendingTask === `pause` && ht(e)
            : mt(e));
      });
  }
  function pt() {
    return new DOMException(`The user aborted a request`, `AbortError`);
  }
  function V(e, t) {
    if (t === null) return t;
    if (typeof t != `number`)
      throw new DOMException(
        `Unexpected value: ${t}.  Cannot convert to CssNumberish`,
        `InvalidStateError`,
      );
    const n = e.rangeDuration ?? 100,
      r = K(e),
      i = r ? (n * t) / r : 0;
    return CSS.percent(i);
  }
  function H(e, t) {
    if (e.timeline) {
      if (t === null) return t;
      if (t.unit === `percent`) {
        const n = e.rangeDuration ?? 100,
          r = K(e);
        return (t.value * r) / n;
      }
      throw new DOMException(
        `CSSNumericValue must be a percentage for progress based animations.`,
        `NotSupportedError`,
      );
    }
    {
      if (t == null || typeof t == `number`) return t;
      const e = t.to(`ms`);
      if (e) return e.value;
      throw new DOMException(
        `CSSNumericValue must be either a number or a time value for time based animations.`,
        `InvalidStateError`,
      );
    }
  }
  function mt(e) {
    const t = H(e, e.timeline.currentTime);
    if (e.holdTime != null)
      W(e),
        e.animation.playbackRate == 0
          ? (e.startTime = t)
          : ((e.startTime = t - e.holdTime / e.animation.playbackRate), (e.holdTime = null));
    else if (e.startTime !== null && e.pendingPlaybackRate !== null) {
      const n = (t - e.startTime) * e.animation.playbackRate;
      W(e);
      const r = e.animation.playbackRate;
      r == 0 ? ((e.holdTime = null), (e.startTime = t)) : (e.startTime = t - n / r);
    }
    e.readyPromise && e.readyPromise.state == `pending` && e.readyPromise.resolve(e.proxy),
      G(e, !1, !1),
      q(e),
      (e.pendingTask = null);
  }
  function ht(e) {
    const t = H(e, e.timeline.currentTime);
    e.startTime != null &&
      e.holdTime == null &&
      (e.holdTime = (t - e.startTime) * e.animation.playbackRate),
      W(e),
      (e.startTime = null),
      e.readyPromise.resolve(e.proxy),
      G(e, !1, !1),
      q(e),
      (e.pendingTask = null);
  }
  function gt(e) {
    if (
      !e.finishedPromise ||
      e.finishedPromise.state != `pending` ||
      e.proxy.playState != `finished`
    )
      return;
    e.finishedPromise.resolve(e.proxy), e.animation.pause();
    const t = new CustomEvent(`finish`, {
      detail: { currentTime: e.proxy.currentTime, timelineTime: e.proxy.timeline.currentTime },
    });
    Object.defineProperty(t, `currentTime`, {
      get: function () {
        return this.detail.currentTime;
      },
    }),
      Object.defineProperty(t, `timelineTime`, {
        get: function () {
          return this.detail.timelineTime;
        },
      }),
      requestAnimationFrame(() => {
        queueMicrotask(() => {
          e.animation.dispatchEvent(t);
        });
      });
  }
  function U(e) {
    return e.pendingPlaybackRate === null ? e.animation.playbackRate : e.pendingPlaybackRate;
  }
  function W(e) {
    e.pendingPlaybackRate !== null &&
      ((e.animation.playbackRate = e.pendingPlaybackRate), (e.pendingPlaybackRate = null));
  }
  function _t(e) {
    if (!e.timeline) return null;
    const t = H(e, e.timeline.currentTime);
    if (t === null || e.startTime === null) return null;
    let n = (t - e.startTime) * e.animation.playbackRate;
    return n == -0 && (n = 0), n;
  }
  function G(e, t, n) {
    if (!e.timeline) return;
    const r = t ? H(e, e.proxy.currentTime) : _t(e);
    if (r && e.startTime != null && !e.proxy.pending) {
      let n = U(e),
        i = K(e),
        a = e.previousCurrentTime;
      n > 0 && r >= i && e.previousCurrentTime != null
        ? ((a === null || a < i) && (a = i), (e.holdTime = t ? r : a))
        : n < 0 && r <= 0
          ? ((a == null || a > 0) && (a = 0), (e.holdTime = t ? r : a))
          : n != 0 &&
            (t &&
              e.holdTime !== null &&
              (e.startTime = (function (e, t) {
                if (!e.timeline) return null;
                const n = H(e, e.timeline.currentTime);
                return n == null ? null : n - t / e.animation.playbackRate;
              })(e, e.holdTime)),
            (e.holdTime = null));
    }
    q(e),
      (e.previousCurrentTime = H(e, e.proxy.currentTime)),
      e.proxy.playState == `finished`
        ? ((e.finishedPromise ||= new z()),
          e.finishedPromise.state == `pending` &&
            (n
              ? gt(e)
              : Promise.resolve().then(() => {
                  gt(e);
                })))
        : (e.finishedPromise &&
            e.finishedPromise.state == `resolved` &&
            (e.finishedPromise = new z()),
          e.animation.playState != `paused` && e.animation.pause());
  }
  function K(e) {
    const t = (function (e) {
        const t = e.proxy.effect.getTiming();
        return e.normalizedTiming || t;
      })(e),
      n = t.delay + t.endDelay + t.iterations * t.duration;
    return Math.max(0, n);
  }
  function q(e) {
    if (e.timeline)
      if (e.startTime === null) e.holdTime !== null && vt(e, e.holdTime);
      else {
        const t = e.timeline.currentTime;
        if (t == null) return;
        vt(e, (H(e, t) - e.startTime) * e.animation.playbackRate);
      }
  }
  function vt(e, t) {
    const n = e.timeline,
      r = e.animation.playbackRate,
      i = n.currentTime && n.currentTime.value == (r < 0 ? 0 : 100) ? (r < 0 ? 0.001 : -0.001) : 0;
    e.animation.currentTime = t + i;
  }
  function yt(e, t) {
    if (!e.timeline) return;
    let n = e.proxy.playState == `paused` && e.proxy.pending,
      r = !1,
      i = H(e, e.proxy.currentTime);
    U(e) == 0 && i == null && (e.holdTime = 0),
      i ?? (e.autoAlignStartTime = !0),
      (e.proxy.playState === `finished` || n) &&
        ((e.holdTime = null), (e.startTime = null), (e.autoAlignStartTime = !0)),
      e.holdTime && (e.startTime = null),
      e.pendingTask && ((e.pendingTask = null), (r = !0)),
      (e.holdTime !== null || e.autoAlignStartTime || n || e.pendingPlaybackRate !== null) &&
        (e.readyPromise && !r && (e.readyPromise = null),
        q(e),
        e.readyPromise || B(e),
        (e.pendingTask = `play`),
        Qe(e.timeline, e.animation, bt.bind(e.proxy)),
        G(e, !1, !1));
  }
  function bt(e) {
    const t = J.get(this);
    if (!t) return;
    if (e == null)
      return void (
        t.proxy.playState !== `paused` &&
        t.animation.playState != `idle` &&
        t.animation.cancel()
      );
    Y(t),
      t.pendingTask &&
        requestAnimationFrame(() => {
          t.pendingTask !== `play` || (t.startTime === null && t.holdTime === null)
            ? t.pendingTask === `pause` && ht(t)
            : mt(t);
        });
    const n = this.playState;
    (n == `running` || n == `finished`) &&
      (vt(t, (H(t, e) - H(t, this.startTime)) * this.playbackRate), G(t, !1, !1));
  }
  function xt(e) {
    e.specifiedTiming = null;
  }
  let J = new WeakMap();
  window.addEventListener(
    `pagehide`,
    (e) => {
      J = new WeakMap();
    },
    !1,
  );
  const St = new WeakMap();
  function Y(e) {
    if (
      !e.autoAlignStartTime ||
      !e.timeline ||
      !e.timeline.currentTime ||
      e.proxy.playState === `idle` ||
      (e.proxy.playState === `paused` && e.holdTime !== null)
    )
      return;
    let t = e.rangeDuration,
      n,
      r;
    try {
      n = CSS.percent(
        100 *
          (function (e) {
            if (!e.animationRange) return 0;
            const t = e.animationRange.start === `normal` ? wt(e.timeline) : e.animationRange.start;
            return st(e.timeline, t);
          })(e),
      );
    } catch (t) {
      (n = CSS.percent(0)),
        (e.animationRange.start = `normal`),
        console.warn(`Exception when calculating start offset`, t);
    }
    try {
      r = CSS.percent(
        100 *
          (1 -
            (function (e) {
              if (!e.animationRange) return 0;
              const t = e.animationRange.end === `normal` ? Tt(e.timeline) : e.animationRange.end;
              return 1 - st(e.timeline, t);
            })(e)),
      );
    } catch (t) {
      (r = CSS.percent(100)),
        (e.animationRange.end = `normal`),
        console.warn(`Exception when calculating end offset`, t);
    }
    (e.rangeDuration = r.value - n.value),
      (e.startTime = H(e, U(e) >= 0 ? n : r)),
      (e.holdTime = null),
      e.rangeDuration !== t && xt(e);
  }
  function Ct(e) {
    throw Error(`Unsupported timeline class`);
  }
  function wt(e) {
    return e instanceof ViewTimeline
      ? { rangeName: `cover`, offset: CSS.percent(0) }
      : e instanceof I
        ? CSS.percent(0)
        : void Ct();
  }
  function Tt(e) {
    return e instanceof ViewTimeline
      ? { rangeName: `cover`, offset: CSS.percent(100) }
      : e instanceof I
        ? CSS.percent(100)
        : void Ct();
  }
  function Et(e, t) {
    if (!t) return { start: `normal`, end: `normal` };
    const n = { start: wt(e), end: Tt(e) };
    if (e instanceof ViewTimeline) {
      const e = Se(t),
        r = [],
        i = [];
      if (
        (e.forEach((e) => {
          if (N.includes(e)) r.push(e);
          else
            try {
              i.push(CSSNumericValue.parse(e));
            } catch {
              throw TypeError(`Could not parse range "${t}"`);
            }
        }),
        r.length > 2 || i.length > 2 || i.length == 1)
      )
        throw TypeError(`Invalid time range or unsupported time range format.`);
      return (
        r.length && ((n.start.rangeName = r[0]), (n.end.rangeName = r.length > 1 ? r[1] : r[0])),
        i.length > 1 && ((n.start.offset = i[0]), (n.end.offset = i[1])),
        n
      );
    }
    if (e instanceof I) {
      const e = t.split(` `);
      if (e.length != 2) throw TypeError(`Invalid time range or unsupported time range format.`);
      return (n.start = CSSNumericValue.parse(e[0])), (n.end = CSSNumericValue.parse(e[1])), n;
    }
    Ct();
  }
  function Dt(e, t, n) {
    if (!t || t === `normal`) return `normal`;
    if (e instanceof ViewTimeline) {
      let e = `cover`,
        r = n === `start` ? CSS.percent(0) : CSS.percent(100);
      if (t instanceof Object)
        t.rangeName !== void 0 && (e = t.rangeName), t.offset !== void 0 && (r = t.offset);
      else {
        const n = Se(t);
        n.length === 1
          ? N.includes(n[0])
            ? (e = n[0])
            : (r = T(CSSNumericValue.parse(n[0]), {}))
          : n.length === 2 && ((e = n[0]), (r = T(CSSNumericValue.parse(n[1]), {})));
      }
      if (!N.includes(e)) throw TypeError(`Invalid range name`);
      return { rangeName: e, offset: r };
    }
    if (e instanceof I) return CSSNumericValue.parse(t);
    Ct();
  }
  class X {
    constructor(e, t, n = {}) {
      const r = t instanceof I,
        i = e instanceof ft ? e : new ft(e, r ? void 0 : t);
      St.set(i, this),
        J.set(this, {
          animation: i,
          timeline: r ? t : void 0,
          playState: r ? `idle` : null,
          readyPromise: null,
          finishedPromise: null,
          startTime: null,
          holdTime: null,
          rangeDuration: null,
          previousCurrentTime: null,
          autoAlignStartTime: !1,
          pendingPlaybackRate: null,
          pendingTask: null,
          specifiedTiming: null,
          normalizedTiming: null,
          effect: null,
          animationRange: r ? Et(t, n[`animation-range`]) : null,
          proxy: this,
        });
    }
    get effect() {
      const e = J.get(this);
      return e.timeline
        ? ((e.effect ||= (function (e) {
            const t = e.animation.effect,
              n = t.updateTiming,
              r = {
                apply: function (n) {
                  t.getTiming();
                  const r = n.apply(t);
                  if (e.timeline) {
                    const t = e.duration ?? 100;
                    (r.localTime = V(e, r.localTime)),
                      (r.endTime = V(e, r.endTime)),
                      (r.activeDuration = V(e, r.activeDuration));
                    const n = K(e),
                      i = r.iterations ? (n - r.delay - r.endDelay) / r.iterations : 0;
                    (r.duration = n ? CSS.percent((t * i) / n) : CSS.percent(0)),
                      e.timeline.currentTime === void 0 && (r.localTime = null);
                  }
                  return r;
                },
              },
              i = {
                apply: function (r, i) {
                  if (e.specifiedTiming) return e.specifiedTiming;
                  e.specifiedTiming = r.apply(t);
                  let a,
                    o = Object.assign({}, e.specifiedTiming);
                  if (o.duration === 1 / 0)
                    throw TypeError(
                      `Effect duration cannot be Infinity when used with Scroll Timelines`,
                    );
                  return (
                    (o.duration === null || o.duration === `auto` || e.autoDurationEffect) &&
                      e.timeline &&
                      ((e.autoDurationEffect = !0),
                      (o.delay = 0),
                      (o.endDelay = 0),
                      (a = o.iterations ? 1e5 : 0),
                      (o.duration = o.iterations ? (a - o.delay - o.endDelay) / o.iterations : 0),
                      o.duration < 0 && ((o.duration = 0), (o.endDelay = a - o.delay)),
                      n.apply(t, [o])),
                    (e.normalizedTiming = o),
                    e.specifiedTiming
                  );
                },
              },
              a = {
                apply: function (n, r, i) {
                  if (i && i.length) {
                    if (e.timeline && i[0]) {
                      const t = i[0],
                        n = t.duration;
                      if (n === 1 / 0)
                        throw TypeError(
                          `Effect duration cannot be Infinity when used with Scroll Timelines`,
                        );
                      if (t.iterations === 1 / 0)
                        throw TypeError(
                          `Effect iterations cannot be Infinity when used with Scroll Timelines`,
                        );
                      n !== void 0 && n !== `auto` && (e.autoDurationEffect = null);
                    }
                    e.specifiedTiming && n.apply(t, [e.specifiedTiming]), n.apply(t, i), xt(e);
                  }
                },
              },
              o = new Proxy(t, {
                get: function (e, n) {
                  const r = e[n];
                  return typeof r == `function` ? r.bind(t) : r;
                },
                set: function (e, t, n) {
                  return (e[t] = n), !0;
                },
              });
            return (
              (o.getComputedTiming = new Proxy(t.getComputedTiming, r)),
              (o.getTiming = new Proxy(t.getTiming, i)),
              (o.updateTiming = new Proxy(t.updateTiming, a)),
              o
            );
          })(e)),
          e.effect)
        : e.animation.effect;
    }
    set effect(e) {
      const t = J.get(this);
      (t.animation.effect = e), (t.effect = null), (t.autoDurationEffect = null);
    }
    get timeline() {
      const e = J.get(this);
      return e.timeline || e.animation.timeline;
    }
    set timeline(e) {
      const t = J.get(this),
        n = this.timeline;
      if (n == e) return;
      let r = this.playState,
        i = this.currentTime,
        a,
        o = K(t);
      a = i === null ? null : o === 0 ? 0 : H(t, i) / o;
      const s = n instanceof I,
        c = e instanceof I,
        l = this.pending;
      if ((s && Ze(t.timeline, t.animation), c))
        return (
          (t.timeline = e),
          W(t),
          (t.autoAlignStartTime = !0),
          (t.startTime = null),
          (t.holdTime = null),
          (r !== `running` && r !== `finished`) ||
            ((t.readyPromise && t.readyPromise.state !== `resolved`) || B(t),
            (t.pendingTask = `play`),
            Qe(t.timeline, t.animation, bt.bind(this))),
          r === `paused` && a !== null && (t.holdTime = a * o),
          l &&
            ((t.readyPromise && t.readyPromise.state != `resolved`) || B(t),
            (t.pendingTask = r == `paused` ? `pause` : `play`)),
          t.startTime !== null && (t.holdTime = null),
          void G(t, !1, !1)
        );
      if (t.animation.timeline != e) throw TypeError(`Unsupported timeline: ` + e);
      if ((Ze(t.timeline, t.animation), (t.timeline = null), s))
        switch ((i !== null && (t.animation.currentTime = a * K(t)), r)) {
          case `paused`:
            t.animation.pause();
            break;
          case `running`:
          case `finished`:
            t.animation.play();
        }
    }
    get startTime() {
      const e = J.get(this);
      return e.timeline ? V(e, e.startTime) : e.animation.startTime;
    }
    set startTime(e) {
      const t = J.get(this);
      if (((e = H(t, e)), !t.timeline)) return void (t.animation.startTime = e);
      (t.autoAlignStartTime = !1),
        H(t, t.timeline.currentTime) == null && t.startTime != null && ((t.holdTime = null), q(t));
      const n = H(t, this.currentTime);
      W(t),
        (t.startTime = e),
        t.startTime !== null && t.animation.playbackRate != 0
          ? (t.holdTime = null)
          : (t.holdTime = n),
        t.pendingTask && ((t.pendingTask = null), t.readyPromise.resolve(this)),
        G(t, !0, !1),
        q(t);
    }
    get currentTime() {
      const e = J.get(this);
      return e.timeline
        ? e.holdTime == null
          ? V(e, _t(e))
          : V(e, e.holdTime)
        : e.animation.currentTime;
    }
    set currentTime(e) {
      const t = J.get(this);
      t.timeline
        ? ((function (e, t) {
            if (t == null && e.currentTime !== null) throw TypeError();
            (t = H(e, t)),
              (e.autoAlignStartTime = !1),
              e.holdTime !== null ||
              e.startTime === null ||
              e.timeline.phase === `inactive` ||
              e.animation.playbackRate === 0
                ? (e.holdTime = t)
                : (e.startTime = H(e, e.timeline.currentTime) - t / e.animation.playbackRate),
              e.timeline.phase === `inactive` && (e.startTime = null),
              (e.previousCurrentTime = null);
          })(t, e),
          t.pendingTask == `pause` &&
            ((t.holdTime = H(t, e)),
            W(t),
            (t.startTime = null),
            (t.pendingTask = null),
            t.readyPromise.resolve(this)),
          G(t, !0, !1))
        : (t.animation.currentTime = e);
    }
    get playbackRate() {
      return J.get(this).animation.playbackRate;
    }
    set playbackRate(e) {
      const t = J.get(this);
      if (!t.timeline) return void (t.animation.playbackRate = e);
      t.pendingPlaybackRate = null;
      const n = this.currentTime;
      (t.animation.playbackRate = e), n !== null && (this.currentTime = n);
    }
    get playState() {
      const e = J.get(this);
      if (!e.timeline) return e.animation.playState;
      const t = H(e, this.currentTime);
      return t === null && e.startTime === null && e.pendingTask == null
        ? `idle`
        : e.pendingTask == `pause` || (e.startTime === null && e.pendingTask != `play`)
          ? `paused`
          : t != null &&
              ((e.animation.playbackRate > 0 && t >= K(e)) ||
                (e.animation.playbackRate < 0 && t <= 0))
            ? `finished`
            : `running`;
    }
    get rangeStart() {
      return J.get(this).animationRange?.start ?? `normal`;
    }
    set rangeStart(e) {
      const t = J.get(this);
      if (!t.timeline) return (t.animation.rangeStart = e);
      t.timeline instanceof I &&
        ((t.animationRange.start = Dt(t.timeline, e, `start`)), Y(t), q(t));
    }
    get rangeEnd() {
      return J.get(this).animationRange?.end ?? `normal`;
    }
    set rangeEnd(e) {
      const t = J.get(this);
      if (!t.timeline) return (t.animation.rangeEnd = e);
      t.timeline instanceof I && ((t.animationRange.end = Dt(t.timeline, e, `end`)), Y(t), q(t));
    }
    get replaceState() {
      return J.get(this).animation.pending;
    }
    get pending() {
      const e = J.get(this);
      return e.timeline
        ? !!e.readyPromise && e.readyPromise.state == `pending`
        : e.animation.pending;
    }
    finish() {
      const e = J.get(this);
      if (!e.timeline) return void e.animation.finish();
      const t = U(e),
        n = K(e);
      if (t == 0)
        throw new DOMException(
          `Cannot finish Animation with a playbackRate of 0.`,
          `InvalidStateError`,
        );
      if (t > 0 && n == 1 / 0)
        throw new DOMException(
          `Cannot finish Animation with an infinite target effect end.`,
          `InvalidStateError`,
        );
      W(e);
      const r = t < 0 ? 0 : n;
      this.currentTime = V(e, r);
      const i = H(e, e.timeline.currentTime);
      e.startTime === null && i !== null && (e.startTime = i - r / e.animation.playbackRate),
        e.pendingTask == `pause` &&
          e.startTime !== null &&
          ((e.holdTime = null), (e.pendingTask = null), e.readyPromise.resolve(this)),
        e.pendingTask == `play` &&
          e.startTime !== null &&
          ((e.pendingTask = null), e.readyPromise.resolve(this)),
        G(e, !0, !0);
    }
    play() {
      const e = J.get(this);
      e.timeline ? yt(e) : e.animation.play();
    }
    pause() {
      const e = J.get(this);
      e.timeline
        ? this.playState != `paused` &&
          (e.animation.currentTime === null && (e.autoAlignStartTime = !0),
          e.pendingTask == `play` ? (e.pendingTask = null) : (e.readyPromise = null),
          e.readyPromise || B(e),
          (e.pendingTask = `pause`),
          Qe(e.timeline, e.animation, bt.bind(e.proxy)))
        : e.animation.pause();
    }
    reverse() {
      const e = J.get(this),
        t = U(e),
        n = H(e, this.currentTime),
        r = K(e) == 1 / 0,
        i = t != 0 && (t < 0 || n > 0 || !r);
      if (!e.timeline || !i)
        return i && (e.pendingPlaybackRate = -U(e)), void e.animation.reverse();
      if (e.timeline.phase == `inactive`)
        throw new DOMException(
          `Cannot reverse an animation with no active timeline`,
          `InvalidStateError`,
        );
      this.updatePlaybackRate(-t), yt(e);
    }
    updatePlaybackRate(e) {
      const t = J.get(this);
      if (((t.pendingPlaybackRate = e), !t.timeline)) return void t.animation.updatePlaybackRate(e);
      const n = this.playState;
      if (!t.readyPromise || t.readyPromise.state != `pending`)
        switch (n) {
          case `idle`:
          case `paused`:
            W(t);
            break;
          case `finished`:
            const n = H(t, t.timeline.currentTime),
              r = n === null ? null : (n - t.startTime) * t.animation.playbackRate;
            (t.startTime = e == 0 ? n : n != null && r != null ? (n - r) / e : null),
              W(t),
              G(t, !1, !1),
              q(t);
            break;
          default:
            yt(t);
        }
    }
    persist() {
      J.get(this).animation.persist();
    }
    get id() {
      return J.get(this).animation.id;
    }
    set id(e) {
      J.get(this).animation.id = e;
    }
    cancel() {
      const e = J.get(this);
      e.timeline
        ? (this.playState != `idle` &&
            ((function (e) {
              e.pendingTask &&
                ((e.pendingTask = null),
                W(e),
                e.readyPromise.reject(pt()),
                B(e),
                e.readyPromise.resolve(e.proxy));
            })(e),
            e.finishedPromise &&
              e.finishedPromise.state == `pending` &&
              e.finishedPromise.reject(pt()),
            (e.finishedPromise = new z()),
            e.animation.cancel()),
          (e.startTime = null),
          (e.holdTime = null),
          Ze(e.timeline, e.animation))
        : e.animation.cancel();
    }
    get onfinish() {
      return J.get(this).animation.onfinish;
    }
    set onfinish(e) {
      J.get(this).animation.onfinish = e;
    }
    get oncancel() {
      return J.get(this).animation.oncancel;
    }
    set oncancel(e) {
      J.get(this).animation.oncancel = e;
    }
    get onremove() {
      return J.get(this).animation.onremove;
    }
    set onremove(e) {
      J.get(this).animation.onremove = e;
    }
    get finished() {
      const e = J.get(this);
      return e.timeline
        ? ((e.finishedPromise ||= new z()), e.finishedPromise.promise)
        : e.animation.finished;
    }
    get ready() {
      const e = J.get(this);
      return e.timeline
        ? (e.readyPromise || ((e.readyPromise = new z()), e.readyPromise.resolve(this)),
          e.readyPromise.promise)
        : e.animation.ready;
    }
    addEventListener(e, t, n) {
      J.get(this).animation.addEventListener(e, t, n);
    }
    removeEventListener(e, t, n) {
      J.get(this).animation.removeEventListener(e, t, n);
    }
    dispatchEvent(e) {
      J.get(this).animation.dispatchEvent(e);
    }
  }
  function Ot(e, t) {
    const n = t.timeline;
    n instanceof I && delete t.timeline;
    const r = dt.apply(this, [e, t]),
      i = new X(r, n);
    return (
      n instanceof I &&
        (r.pause(),
        (J.get(i).animationRange = {
          start: Dt(n, t.rangeStart, `start`),
          end: Dt(n, t.rangeEnd, `end`),
        }),
        i.play()),
      i
    );
  }
  function kt(e) {
    for (let t = 0; t < e.length; ++t) {
      const n = St.get(e[t]);
      n && (e[t] = n);
    }
    return e;
  }
  function At(e) {
    return kt(ut.apply(this, [e]));
  }
  function jt(e) {
    return kt(lt.apply(this, [e]));
  }
  const Z = {
      IDENTIFIER: /[\w\\\@_-]+/g,
      WHITE_SPACE: /\s*/g,
      NUMBER: /^[0-9]+/,
      TIME: /^[0-9]+(s|ms)/,
      SCROLL_TIMELINE: /scroll-timeline\s*:([^;}]+)/,
      SCROLL_TIMELINE_NAME: /scroll-timeline-name\s*:([^;}]+)/,
      SCROLL_TIMELINE_AXIS: /scroll-timeline-axis\s*:([^;}]+)/,
      VIEW_TIMELINE: /view-timeline\s*:([^;}]+)/,
      VIEW_TIMELINE_NAME: /view-timeline-name\s*:([^;}]+)/,
      VIEW_TIMELINE_AXIS: /view-timeline-axis\s*:([^;}]+)/,
      VIEW_TIMELINE_INSET: /view-timeline-inset\s*:([^;}]+)/,
      ANIMATION_TIMELINE: /animation-timeline\s*:([^;}]+)/,
      ANIMATION_TIME_RANGE: /animation-range\s*:([^;}]+)/,
      ANIMATION_NAME: /animation-name\s*:([^;}]+)/,
      ANIMATION: /animation\s*:([^;}]+)/,
      ANONYMOUS_SCROLL_TIMELINE: /scroll\(([^)]*)\)/,
      ANONYMOUS_VIEW_TIMELINE: /view\(([^)]*)\)/,
    },
    Q = [`block`, `inline`, `x`, `y`],
    Mt = [`nearest`, `root`, `self`],
    $ = new (class {
      constructor() {
        (this.cssRulesWithTimelineName = []),
          (this.nextAnonymousTimelineNameIndex = 0),
          (this.anonymousScrollTimelineOptions = new Map()),
          (this.anonymousViewTimelineOptions = new Map()),
          (this.sourceSelectorToScrollTimeline = []),
          (this.subjectSelectorToViewTimeline = []),
          (this.keyframeNamesSelectors = new Map());
      }
      transpileStyleSheet(e, t, n) {
        const r = { sheetSrc: e, index: 0, name: n };
        for (
          ;
          r.index < r.sheetSrc.length && (this.eatWhitespace(r), !(r.index >= r.sheetSrc.length));
        ) {
          if (this.lookAhead(`/*`, r)) {
            for (; this.lookAhead(`/*`, r); ) this.eatComment(r), this.eatWhitespace(r);
            continue;
          }
          const e = this.parseQualifiedRule(r);
          e &&
            (t
              ? this.parseKeyframesAndSaveNameMapping(e, r)
              : this.handleScrollTimelineProps(e, r));
        }
        return this.replaceUrlFunctions(r.sheetSrc, n);
      }
      replaceUrlFunctions(e, t) {
        if (!t) return e;
        const n = new URL(t).origin,
          r = t.lastIndexOf(`/`) > n.length ? t.substring(0, t.lastIndexOf(`/`)) : n;
        return e
          .replace(
            /url\((?:(['"])(?!https?:\/\/|data:|blob:|\/)|(?!['"]?(?:https?:\/\/|data:|blob:|\/)))(?:\.\/)?/gm,
            `url($1${r}/`,
          )
          .replace(/url\((['"])?\//gm, `url($1${n}/`);
      }
      getAnimationTimelineOptions(e, t) {
        for (let n = this.cssRulesWithTimelineName.length - 1; n >= 0; n--) {
          const r = this.cssRulesWithTimelineName[n];
          try {
            if (t.matches(r.selector) && (!r[`animation-name`] || r[`animation-name`] == e))
              return {
                'animation-timeline': r[`animation-timeline`],
                'animation-range': r[`animation-range`],
              };
          } catch {}
        }
        return null;
      }
      getAnonymousScrollTimelineOptions(e, t) {
        const n = this.anonymousScrollTimelineOptions.get(e);
        return n
          ? {
              anonymousSource: n.source,
              anonymousTarget: t,
              source: et(n.source ?? `nearest`, t),
              axis: n.axis ? n.axis : `block`,
            }
          : null;
      }
      getScrollTimelineOptions(e, t) {
        const n = this.getAnonymousScrollTimelineOptions(e, t);
        if (n) return n;
        for (let n = this.sourceSelectorToScrollTimeline.length - 1; n >= 0; n--) {
          const r = this.sourceSelectorToScrollTimeline[n];
          if (r.name == e) {
            const e = this.findPreviousSiblingOrAncestorMatchingSelector(t, r.selector);
            if (e) return { source: e, ...(r.axis ? { axis: r.axis } : {}) };
          }
        }
        return null;
      }
      findPreviousSiblingOrAncestorMatchingSelector(e, t) {
        let n = e;
        for (; n; ) {
          if (n.matches(t)) return n;
          n = n.previousElementSibling || n.parentElement;
        }
        return null;
      }
      getAnonymousViewTimelineOptions(e, t) {
        const n = this.anonymousViewTimelineOptions.get(e);
        return n
          ? { subject: t, axis: n.axis ? n.axis : `block`, inset: n.inset ? n.inset : `auto` }
          : null;
      }
      getViewTimelineOptions(e, t) {
        const n = this.getAnonymousViewTimelineOptions(e, t);
        if (n) return n;
        for (let n = this.subjectSelectorToViewTimeline.length - 1; n >= 0; n--) {
          const r = this.subjectSelectorToViewTimeline[n];
          if (r.name == e) {
            const e = this.findPreviousSiblingOrAncestorMatchingSelector(t, r.selector);
            if (e) return { subject: e, axis: r.axis, inset: r.inset };
          }
        }
        return null;
      }
      handleScrollTimelineProps(e, t) {
        if (e.selector.includes(`@keyframes`)) return;
        const n = e.block.contents.includes(`animation-name:`),
          r = e.block.contents.includes(`animation-timeline:`),
          i = e.block.contents.includes(`animation:`);
        if (
          (this.saveSourceSelectorToScrollTimeline(e),
          this.saveSubjectSelectorToViewTimeline(e),
          !r && !n && !i)
        )
          return;
        let a = [],
          o = [],
          s = !1;
        r && (a = this.extractScrollTimelineNames(e.block.contents)),
          n && (o = this.extractMatches(e.block.contents, Z.ANIMATION_NAME)),
          (r && n) ||
            (i &&
              this.extractMatches(e.block.contents, Z.ANIMATION).forEach((t) => {
                const n = this.extractAnimationName(t);
                n && r && o.push(n),
                  r &&
                    (this.hasDuration(t) ||
                      (this.hasAutoDuration(t) &&
                        (e.block.contents = e.block.contents.replace(`auto`, `    `)),
                      (e.block.contents = e.block.contents.replace(t, ` 1s ` + t)),
                      (s = !0)));
              }),
            s && this.replacePart(e.block.startIndex, e.block.endIndex, e.block.contents, t)),
          this.saveRelationInList(e, a, o);
      }
      saveSourceSelectorToScrollTimeline(e) {
        const t = e.block.contents.includes(`scroll-timeline:`),
          n = e.block.contents.includes(`scroll-timeline-name:`),
          r = e.block.contents.includes(`scroll-timeline-axis:`);
        if (!t && !n) return;
        const i = [];
        if (t) {
          const t = this.extractMatches(e.block.contents, Z.SCROLL_TIMELINE);
          for (const n of t) {
            const t = this.split(n),
              r = { selector: e.selector, name: `` };
            t.length == 1
              ? (r.name = t[0])
              : t.length == 2 &&
                (Q.includes(t[0])
                  ? ((r.axis = t[0]), (r.name = t[1]))
                  : ((r.axis = t[1]), (r.name = t[0]))),
              i.push(r);
          }
        }
        if (n) {
          const t = this.extractMatches(e.block.contents, Z.SCROLL_TIMELINE_NAME);
          for (let n = 0; n < t.length; n++)
            if (n < i.length) i[n].name = t[n];
            else {
              const r = { selector: e.selector, name: t[n] };
              i.push(r);
            }
        }
        let a = [];
        if (r) {
          const t = this.extractMatches(e.block.contents, Z.SCROLL_TIMELINE_AXIS);
          if (((a = t.filter((e) => Q.includes(e))), a.length != t.length))
            throw Error(`Invalid axis`);
        }
        for (let e = 0; e < i.length; e++) a.length && (i[e].axis = a[e % i.length]);
        this.sourceSelectorToScrollTimeline.push(...i);
      }
      saveSubjectSelectorToViewTimeline(e) {
        const t = e.block.contents.includes(`view-timeline:`),
          n = e.block.contents.includes(`view-timeline-name:`),
          r = e.block.contents.includes(`view-timeline-axis:`),
          i = e.block.contents.includes(`view-timeline-inset:`);
        if (!t && !n) return;
        const a = [];
        if (t) {
          const t = this.extractMatches(e.block.contents, Z.VIEW_TIMELINE);
          for (const n of t) {
            const t = this.split(n),
              r = { selector: e.selector, name: ``, inset: null };
            t.length == 1
              ? (r.name = t[0])
              : t.length == 2 &&
                (Q.includes(t[0])
                  ? ((r.axis = t[0]), (r.name = t[1]))
                  : ((r.axis = t[1]), (r.name = t[0]))),
              a.push(r);
          }
        }
        if (n) {
          const t = this.extractMatches(e.block.contents, Z.VIEW_TIMELINE_NAME);
          for (let n = 0; n < t.length; n++)
            if (n < a.length) a[n].name = t[n];
            else {
              const r = { selector: e.selector, name: t[n], inset: null };
              a.push(r);
            }
        }
        let o = [],
          s = [];
        if ((i && (o = this.extractMatches(e.block.contents, Z.VIEW_TIMELINE_INSET)), r)) {
          const t = this.extractMatches(e.block.contents, Z.VIEW_TIMELINE_AXIS);
          if (((s = t.filter((e) => Q.includes(e))), s.length != t.length))
            throw Error(`Invalid axis`);
        }
        for (let e = 0; e < a.length; e++)
          o.length && (a[e].inset = o[e % a.length]), s.length && (a[e].axis = s[e % a.length]);
        this.subjectSelectorToViewTimeline.push(...a);
      }
      hasDuration(e) {
        return e.split(` `).filter((e) => Z.TIME.exec(e)).length >= 1;
      }
      hasAutoDuration(e) {
        return e.split(` `).filter((e) => e === `auto`).length >= 1;
      }
      saveRelationInList(e, t, n) {
        let r = [];
        e.block.contents.includes(`animation-range:`) &&
          (r = this.extractMatches(e.block.contents, Z.ANIMATION_TIME_RANGE));
        const i = Math.max(t.length, n.length, r.length);
        for (let a = 0; a < i; a++)
          this.cssRulesWithTimelineName.push({
            selector: e.selector,
            'animation-timeline': t[a % t.length],
            ...(n.length ? { 'animation-name': n[a % n.length] } : {}),
            ...(r.length ? { 'animation-range': r[a % r.length] } : {}),
          });
      }
      extractScrollTimelineNames(e) {
        const t = Z.ANIMATION_TIMELINE.exec(e)[1].trim(),
          n = [];
        return (
          t
            .split(`,`)
            .map((e) => e.trim())
            .forEach((e) => {
              if (
                (function (e) {
                  return (e.startsWith(`scroll`) || e.startsWith(`view`)) && e.includes(`(`);
                })(e)
              ) {
                const t = this.saveAnonymousTimelineName(e);
                n.push(t);
              } else n.push(e);
            }),
          n
        );
      }
      saveAnonymousTimelineName(e) {
        const t = `:t` + this.nextAnonymousTimelineNameIndex++;
        return (
          e.startsWith(`scroll(`)
            ? this.anonymousScrollTimelineOptions.set(t, this.parseAnonymousScrollTimeline(e))
            : this.anonymousViewTimelineOptions.set(t, this.parseAnonymousViewTimeline(e)),
          t
        );
      }
      parseAnonymousScrollTimeline(e) {
        const t = Z.ANONYMOUS_SCROLL_TIMELINE.exec(e);
        if (!t) return null;
        const n = t[1],
          r = {};
        return (
          n.split(` `).forEach((e) => {
            Q.includes(e) ? (r.axis = e) : Mt.includes(e) && (r.source = e);
          }),
          r
        );
      }
      parseAnonymousViewTimeline(e) {
        const t = Z.ANONYMOUS_VIEW_TIMELINE.exec(e);
        if (!t) return null;
        const n = t[1],
          r = {};
        return (
          n.split(` `).forEach((e) => {
            Q.includes(e) ? (r.axis = e) : (r.inset = r.inset ? `${r.inset} ${e}` : e);
          }),
          r
        );
      }
      extractAnimationName(e) {
        return this.findMatchingEntryInContainer(e, this.keyframeNamesSelectors);
      }
      findMatchingEntryInContainer(e, t) {
        const n = e.split(` `).filter((e) => t.has(e));
        return n ? n[0] : null;
      }
      parseIdentifier(e) {
        Z.IDENTIFIER.lastIndex = e.index;
        const t = Z.IDENTIFIER.exec(e.sheetSrc);
        if (!t) throw this.parseError(e, `Expected an identifier`);
        return (e.index += t[0].length), t[0];
      }
      parseKeyframesAndSaveNameMapping(e, t) {
        if (e.selector.startsWith(`@keyframes`)) {
          const n = this.replaceKeyframesAndGetMapping(e, t);
          e.selector.split(` `).forEach((e, t) => {
            t > 0 && this.keyframeNamesSelectors.set(e, n);
          });
        }
      }
      replaceKeyframesAndGetMapping(e, t) {
        function n(e) {
          return N.some((t) => e.startsWith(t));
        }
        const r = e.block.contents,
          i = (function (e) {
            let t = 0,
              n = -1,
              r = -1,
              i = [];
            for (let a = 0; a < e.length; a++)
              e[a] == `{` ? t++ : e[a] == `}` && t--,
                t == 1 && e[a] != `{` && e[a] != `}` && n == -1 && (n = a),
                t == 2 && e[a] == `{` && ((r = a), i.push({ start: n, end: r }), (n = r = -1));
            return i;
          })(r);
        if (i.length == 0) return new Map();
        let a = new Map(),
          o = !1,
          s = [];
        s.push(r.substring(0, i[0].start));
        for (let e = 0; e < i.length; e++) {
          const t = r.substring(i[e].start, i[e].end),
            c = [];
          t.split(`,`).forEach((e) => {
            const t = e
                .split(` `)
                .map((e) => e.trim())
                .filter((e) => e != ``)
                .join(` `),
              r = a.size;
            a.set(r, t), c.push(`${r}%`), n(t) && (o = !0);
          }),
            s.push(c.join(`,`)),
            e == i.length - 1
              ? s.push(r.substring(i[e].end))
              : s.push(r.substring(i[e].end, i[e + 1].start));
        }
        return o
          ? ((e.block.contents = s.join(``)),
            this.replacePart(e.block.startIndex, e.block.endIndex, e.block.contents, t),
            a)
          : new Map();
      }
      parseQualifiedRule(e) {
        const t = e.index,
          n = this.parseSelector(e).trim();
        if (n) return { selector: n, block: this.eatBlock(e), startIndex: t, endIndex: e.index };
      }
      removeEnclosingDoubleQuotes(e) {
        const t = +(e[0] == `"`),
          n = e[e.length - 1] == `"` ? e.length - 1 : e.length;
        return e.substring(t, n);
      }
      assertString(e, t) {
        if (e.sheetSrc.substr(e.index, t.length) != t)
          throw this.parseError(e, `Did not find expected sequence ${t}`);
        e.index += t.length;
      }
      replacePart(e, t, n, r) {
        if (((r.sheetSrc = r.sheetSrc.slice(0, e) + n + r.sheetSrc.slice(t)), r.index >= t)) {
          const i = r.index - t;
          r.index = e + n.length + i;
        }
      }
      eatComment(e) {
        this.assertString(e, `/*`), this.eatUntil(`*/`, e, !0), this.assertString(e, `*/`);
      }
      eatBlock(e) {
        const t = e.index;
        this.assertString(e, `{`);
        let n = 1;
        for (; n != 0; )
          this.lookAhead(`/*`, e)
            ? this.eatComment(e)
            : (e.sheetSrc[e.index] === `{` ? n++ : e.sheetSrc[e.index] === `}` && n--,
              this.advance(e));
        const r = e.index;
        return { startIndex: t, endIndex: r, contents: e.sheetSrc.slice(t, r) };
      }
      advance(e) {
        if ((e.index++, e.index > e.sheetSrc.length))
          throw this.parseError(e, `Advanced beyond the end`);
      }
      parseError(e, t) {
        return Error(`(${e.name ? e.name : `<anonymous file>`}): ${t}`);
      }
      eatUntil(e, t, n = !1) {
        const r = t.index;
        for (; !this.lookAhead(e, t); ) this.advance(t);
        return (
          n &&
            (t.sheetSrc =
              t.sheetSrc.slice(0, r) + ` `.repeat(t.index - r) + t.sheetSrc.slice(t.index)),
          t.sheetSrc.slice(r, t.index)
        );
      }
      parseSelector(e) {
        const t = e.index;
        if ((this.eatUntil(`{`, e), t === e.index)) throw Error(`Empty selector`);
        return e.sheetSrc.slice(t, e.index);
      }
      eatWhitespace(e) {
        Z.WHITE_SPACE.lastIndex = e.index;
        const t = Z.WHITE_SPACE.exec(e.sheetSrc);
        t && (e.index += t[0].length);
      }
      lookAhead(e, t) {
        return t.sheetSrc.substr(t.index, e.length) == e;
      }
      peek(e) {
        return e.sheetSrc[e.index];
      }
      extractMatches(e, t, n = `,`) {
        return t
          .exec(e)[1]
          .trim()
          .split(n)
          .map((e) => e.trim());
      }
      split(e) {
        return e
          .split(` `)
          .map((e) => e.trim())
          .filter((e) => e != ``);
      }
    })();
  function Nt(e, t, n, r, i, a) {
    const o = Je(t),
      s = Ye(t, n);
    return ct(ot(e, o, s, r, i), a, ot(`cover`, o, s, r, i), n);
  }
  function Pt(e, t, n) {
    const r = $.getAnimationTimelineOptions(t, n);
    if (!r) return null;
    const i = r[`animation-timeline`];
    if (!i) return null;
    const a = $.getScrollTimelineOptions(i, n) || $.getViewTimelineOptions(i, n);
    return a
      ? (a.subject &&
          (function (e, t) {
            const n = at(t.subject),
              r = t.axis;
            function i(e, i) {
              let a = null;
              for (const [o, s] of e)
                if (o == 100 * i.offset) {
                  if (s == `from`) a = 0;
                  else if (s == `to`) a = 100;
                  else {
                    const e = s.split(` `);
                    a =
                      e.length == 1
                        ? parseFloat(e[0])
                        : 100 * Nt(e[0], n, t.subject, r, t.inset, CSS.percent(parseFloat(e[1])));
                  }
                  break;
                }
              return a;
            }
            const a = $.keyframeNamesSelectors.get(e.animationName);
            if (a && a.size) {
              const t = [];
              e.effect.getKeyframes().forEach((e) => {
                const n = i(a, e);
                n !== null && n >= 0 && n <= 100 && ((e.offset = n / 100), t.push(e));
              });
              const n = t.sort((e, t) => (e.offset < t.offset ? -1 : +(e.affset > t.offset)));
              e.effect.setKeyframes(n);
            }
          })(e, a),
        { timeline: a.source ? new I(a) : new R(a), animOptions: r })
      : null;
  }
  function Ft() {
    if (CSS.supports(`animation-timeline: --works`)) return !0;
    (function () {
      function e(e) {
        if (e.innerHTML.trim().length === 0 || `aphrodite` in e.dataset) return;
        let t = $.transpileStyleSheet(e.innerHTML, !0);
        (t = $.transpileStyleSheet(t, !1)), (e.innerHTML = t);
      }
      function t(e) {
        (e.type != `text/css` && e.rel != `stylesheet`) ||
          !e.href ||
          (new URL(e.href, document.baseURI).origin == location.origin &&
            fetch(e.getAttribute(`href`)).then(async (t) => {
              let n = await t.text(),
                r = $.transpileStyleSheet(n, !0);
              if (((r = $.transpileStyleSheet(r, !1, t.url)), r !== n)) {
                const t = new Blob([r], { type: `text/css` }),
                  n = URL.createObjectURL(t);
                e.setAttribute(`href`, n);
              }
            }));
      }
      new MutationObserver((n) => {
        for (const r of n)
          for (const n of r.addedNodes)
            n instanceof HTMLStyleElement && e(n), n instanceof HTMLLinkElement && t(n);
      }).observe(document.documentElement, { childList: !0, subtree: !0 }),
        document.querySelectorAll(`style`).forEach((t) => e(t)),
        document.querySelectorAll(`link`).forEach((e) => t(e));
    })();
    const e = CSS.supports;
    (CSS.supports = (t) => (
      (t = t.replaceAll(
        /(animation-timeline|scroll-timeline(-(name|axis))?|view-timeline(-(name|axis|inset))?|timeline-scope)\s*:/g,
        `--supported-property:`,
      )),
      e(t)
    )),
      window.addEventListener(`animationstart`, (e) => {
        e.target
          .getAnimations()
          .filter((t) => t.animationName === e.animationName)
          .forEach((t) => {
            const n = Pt(t, t.animationName, e.target);
            if (n)
              if (!n.timeline || t instanceof X) t.timeline = n.timeline;
              else {
                const e = new X(t, n.timeline, n.animOptions);
                t.pause(), e.play();
              }
          });
      });
  }
  Ft()
    ? console.debug(`Polyfill skipped because browser supports Scroll Timeline.`)
    : (function () {
        if (window.ViewTimeline !== void 0) return !0;
        if (!Reflect.defineProperty(window, `ScrollTimeline`, { value: I }))
          throw Error(
            `Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window`,
          );
        if (!Reflect.defineProperty(window, `ViewTimeline`, { value: R }))
          throw Error(
            `Error installing ViewTimeline polyfill: could not attach ViewTimeline to window`,
          );
        if (!Reflect.defineProperty(Element.prototype, `animate`, { value: Ot }))
          throw Error(
            `Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element`,
          );
        if (!Reflect.defineProperty(window, `Animation`, { value: X }))
          throw Error(`Error installing Animation constructor.`);
        if (!Reflect.defineProperty(Element.prototype, `getAnimations`, { value: At }))
          throw Error(
            `Error installing ScrollTimeline polyfill: could not attach WAAPI's getAnimations to DOM Element`,
          );
        if (!Reflect.defineProperty(document, `getAnimations`, { value: jt }))
          throw Error(
            `Error installing ScrollTimeline polyfill: could not attach WAAPI's getAnimations to document`,
          );
      })();
})();
