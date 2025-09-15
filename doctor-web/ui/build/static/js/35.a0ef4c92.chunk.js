'use strict';
(self.webpackChunkdoctor_appointment_booking =
  self.webpackChunkdoctor_appointment_booking || []).push([
  [35],
  {
    723: (e, t, n) => {
      n.d(t, { A: () => g });
      var r = n(9379),
        o = n(45),
        i = n(8293),
        a = n(4874),
        s = n(1225),
        c = n(8139),
        l = n.n(c),
        f = n(5043),
        u = n(4282),
        d = n(7852),
        p = n(1609),
        m = n(579);
      const h = ['bsPrefix', 'split', 'className', 'childBsPrefix', 'as'],
        v = f.forwardRef((e, t) => {
          let {
              bsPrefix: n,
              split: c,
              className: v,
              childBsPrefix: g,
              as: b = u.A,
            } = e,
            y = (0, o.A)(e, h);
          const w = (0, d.oU)(n, 'dropdown-toggle'),
            x = (0, f.useContext)(a.A);
          void 0 !== g && (y.bsPrefix = g);
          const [A] = (0, s.Be)();
          return (
            (A.ref = (0, i.A)(A.ref, (0, p.A)(t, 'DropdownToggle'))),
            (0, m.jsx)(
              b,
              (0, r.A)(
                (0, r.A)(
                  {
                    className: l()(
                      v,
                      w,
                      c && ''.concat(w, '-split'),
                      (null == x ? void 0 : x.show) && 'show',
                    ),
                  },
                  A,
                ),
                y,
              ),
            )
          );
        });
      v.displayName = 'DropdownToggle';
      const g = v;
    },
    1225: (e, t, n) => {
      n.d(t, { Ay: () => u, Be: () => l, uX: () => s });
      var r = n(5043),
        o = n(60),
        i = n(4874),
        a = n(579);
      const s = (e) => {
          var t;
          return (
            'menu' ===
            (null == (t = e.getAttribute('role')) ? void 0 : t.toLowerCase())
          );
        },
        c = () => {};
      function l() {
        const e = (0, o.Cc)(),
          {
            show: t = !1,
            toggle: n = c,
            setToggle: a,
            menuElement: l,
          } = (0, r.useContext)(i.A) || {},
          f = (0, r.useCallback)(
            (e) => {
              n(!t, e);
            },
            [t, n],
          ),
          u = { id: e, ref: a || c, onClick: f, 'aria-expanded': !!t };
        return (
          l && s(l) && (u['aria-haspopup'] = !0),
          [u, { show: t, toggle: n }]
        );
      }
      function f(e) {
        let { children: t } = e;
        const [n, r] = l();
        return (0, a.jsx)(a.Fragment, { children: t(n, r) });
      }
      f.displayName = 'DropdownToggle';
      const u = f;
    },
    1467: (e, t, n) => {
      n.d(t, { A: () => Q });
      var r = n(9379),
        o = n(45),
        i = n(8139),
        a = n.n(i),
        s = n(5043),
        c = n(3818),
        l = n(3043),
        f = n(6350),
        u = n(4696),
        d = n(8843),
        p = n(9753),
        m = n(8894),
        h = n(4874),
        v = n(6804),
        g = n(1225),
        b = n(5901),
        y = n(9048),
        w = n(4140),
        x = n(5425),
        A = n(579);
      const O = ['eventKey', 'disabled', 'onClick', 'active', 'as'];
      function j(e) {
        let { key: t, href: n, active: r, disabled: o, onClick: i } = e;
        const a = (0, s.useContext)(b.A),
          c = (0, s.useContext)(y.A),
          { activeKey: l } = c || {},
          f = (0, b.u)(t, n),
          u = null == r && null != t ? (0, b.u)(l) === f : r;
        return [
          {
            onClick: (0, m.A)((e) => {
              o ||
                (null == i || i(e), a && !e.isPropagationStopped() && a(f, e));
            }),
            'aria-disabled': o || void 0,
            'aria-selected': u,
            [(0, x.sE)('dropdown-item')]: '',
          },
          { isActive: u },
        ];
      }
      const E = s.forwardRef((e, t) => {
        let {
            eventKey: n,
            disabled: r,
            onClick: o,
            active: i,
            as: a = w.Ay,
          } = e,
          s = (function (e, t) {
            if (null == e) return {};
            var n = {};
            for (var r in e)
              if ({}.hasOwnProperty.call(e, r)) {
                if (t.indexOf(r) >= 0) continue;
                n[r] = e[r];
              }
            return n;
          })(e, O);
        const [c] = j({
          key: n,
          href: s.href,
          disabled: r,
          onClick: o,
          active: i,
        });
        return (0, A.jsx)(a, Object.assign({}, s, { ref: t }, c));
      });
      E.displayName = 'DropdownItem';
      const C = E;
      var k = n(1701);
      function P() {
        const e = (0, d.A)(),
          t = (0, s.useRef)(null),
          n = (0, s.useCallback)(
            (n) => {
              ((t.current = n), e());
            },
            [e],
          );
        return [t, n];
      }
      function D(e) {
        let {
          defaultShow: t,
          show: n,
          onSelect: r,
          onToggle: o,
          itemSelector: i = '* ['.concat((0, x.sE)('dropdown-item'), ']'),
          focusFirstItemOnShow: a,
          placement: d = 'bottom-start',
          children: v,
        } = e;
        const y = (0, k.A)(),
          [w, O] = (0, f.iC)(n, t, o),
          [j, E] = P(),
          C = j.current,
          [D, N] = P(),
          M = D.current,
          R = (0, u.A)(w),
          T = (0, s.useRef)(null),
          L = (0, s.useRef)(!1),
          S = (0, s.useContext)(b.A),
          B = (0, s.useCallback)(
            function (e, t) {
              let n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null == t
                    ? void 0
                    : t.type;
              O(e, { originalEvent: t, source: n });
            },
            [O],
          ),
          W = (0, m.A)((e, t) => {
            (null == r || r(e, t),
              B(!1, t, 'select'),
              t.isPropagationStopped() || null == S || S(e, t));
          }),
          I = (0, s.useMemo)(
            () => ({
              toggle: B,
              placement: d,
              show: w,
              menuElement: C,
              toggleElement: M,
              setMenu: E,
              setToggle: N,
            }),
            [B, d, w, C, M, E, N],
          );
        C && R && !w && (L.current = C.contains(C.ownerDocument.activeElement));
        const H = (0, m.A)(() => {
            M && M.focus && M.focus();
          }),
          U = (0, m.A)(() => {
            const e = T.current;
            let t = a;
            if (
              (null == t &&
                (t = !(!j.current || !(0, g.uX)(j.current)) && 'keyboard'),
              !1 === t || ('keyboard' === t && !/^key.+$/.test(e)))
            )
              return;
            const n = (0, c.A)(j.current, i)[0];
            n && n.focus && n.focus();
          });
        ((0, s.useEffect)(() => {
          w ? U() : L.current && ((L.current = !1), H());
        }, [w, L, H, U]),
          (0, s.useEffect)(() => {
            T.current = null;
          }));
        const V = (e, t) => {
          if (!j.current) return null;
          const n = (0, c.A)(j.current, i);
          let r = n.indexOf(e) + t;
          return ((r = Math.max(0, Math.min(r, n.length))), n[r]);
        };
        return (
          (0, p.A)(
            (0, s.useCallback)(() => y.document, [y]),
            'keydown',
            (e) => {
              var t, n;
              const { key: r } = e,
                o = e.target,
                i = null == (t = j.current) ? void 0 : t.contains(o),
                a = null == (n = D.current) ? void 0 : n.contains(o);
              if (
                /input|textarea/i.test(o.tagName) &&
                (' ' === r ||
                  ('Escape' !== r && i) ||
                  ('Escape' === r && 'search' === o.type))
              )
                return;
              if (!i && !a) return;
              if ('Tab' === r && (!j.current || !w)) return;
              T.current = e.type;
              const s = { originalEvent: e, source: e.type };
              switch (r) {
                case 'ArrowUp': {
                  const t = V(o, -1);
                  return (t && t.focus && t.focus(), void e.preventDefault());
                }
                case 'ArrowDown':
                  if ((e.preventDefault(), w)) {
                    const e = V(o, 1);
                    e && e.focus && e.focus();
                  } else O(!0, s);
                  return;
                case 'Tab':
                  (0, l.Ay)(
                    o.ownerDocument,
                    'keyup',
                    (e) => {
                      var t;
                      (('Tab' !== e.key || e.target) &&
                        null != (t = j.current) &&
                        t.contains(e.target)) ||
                        O(!1, s);
                    },
                    { once: !0 },
                  );
                  break;
                case 'Escape':
                  ('Escape' === r && (e.preventDefault(), e.stopPropagation()),
                    O(!1, s));
              }
            },
          ),
          (0, A.jsx)(b.A.Provider, {
            value: W,
            children: (0, A.jsx)(h.A.Provider, { value: I, children: v }),
          })
        );
      }
      ((D.displayName = 'Dropdown'),
        (D.Menu = v.A),
        (D.Toggle = g.Ay),
        (D.Item = C));
      const N = D;
      var M = n(1969),
        R = n(6618),
        T = n(2392),
        L = n(7852);
      const S = ['className', 'bsPrefix', 'as', 'role'],
        B = s.forwardRef((e, t) => {
          let {
              className: n,
              bsPrefix: i,
              as: s = 'hr',
              role: c = 'separator',
            } = e,
            l = (0, o.A)(e, S);
          return (
            (i = (0, L.oU)(i, 'dropdown-divider')),
            (0, A.jsx)(
              s,
              (0, r.A)({ ref: t, className: a()(n, i), role: c }, l),
            )
          );
        });
      B.displayName = 'DropdownDivider';
      const W = B,
        I = ['className', 'bsPrefix', 'as', 'role'],
        H = s.forwardRef((e, t) => {
          let {
              className: n,
              bsPrefix: i,
              as: s = 'div',
              role: c = 'heading',
            } = e,
            l = (0, o.A)(e, I);
          return (
            (i = (0, L.oU)(i, 'dropdown-header')),
            (0, A.jsx)(
              s,
              (0, r.A)({ ref: t, className: a()(n, i), role: c }, l),
            )
          );
        });
      H.displayName = 'DropdownHeader';
      const U = H;
      var V = n(7071);
      const z = [
          'bsPrefix',
          'className',
          'eventKey',
          'disabled',
          'onClick',
          'active',
          'as',
        ],
        q = s.forwardRef((e, t) => {
          let {
              bsPrefix: n,
              className: i,
              eventKey: s,
              disabled: c = !1,
              onClick: l,
              active: f,
              as: u = V.A,
            } = e,
            d = (0, o.A)(e, z);
          const p = (0, L.oU)(n, 'dropdown-item'),
            [m, h] = j({
              key: s,
              href: d.href,
              disabled: c,
              onClick: l,
              active: f,
            });
          return (0, A.jsx)(
            u,
            (0, r.A)(
              (0, r.A)((0, r.A)({}, d), m),
              {},
              {
                ref: t,
                className: a()(i, p, h.isActive && 'active', c && 'disabled'),
              },
            ),
          );
        });
      q.displayName = 'DropdownItem';
      const F = q,
        K = ['className', 'bsPrefix', 'as'],
        _ = s.forwardRef((e, t) => {
          let { className: n, bsPrefix: i, as: s = 'span' } = e,
            c = (0, o.A)(e, K);
          return (
            (i = (0, L.oU)(i, 'dropdown-item-text')),
            (0, A.jsx)(s, (0, r.A)({ ref: t, className: a()(n, i) }, c))
          );
        });
      _.displayName = 'DropdownItemText';
      const G = _;
      var X = n(1992),
        Y = n(723),
        Z = n(9334);
      const $ = [
          'bsPrefix',
          'drop',
          'show',
          'className',
          'align',
          'onSelect',
          'onToggle',
          'focusFirstItemOnShow',
          'as',
          'navbar',
          'autoClose',
        ],
        J = s.forwardRef((e, t) => {
          const n = (0, M.Zw)(e, { show: 'onToggle' }),
            {
              bsPrefix: i,
              drop: c = 'down',
              show: l,
              className: f,
              align: u = 'start',
              onSelect: d,
              onToggle: p,
              focusFirstItemOnShow: m,
              as: h = 'div',
              navbar: v,
              autoClose: g = !0,
            } = n,
            b = (0, o.A)(n, $),
            y = (0, s.useContext)(Z.A),
            w = (0, L.oU)(i, 'dropdown'),
            x = (0, L.Wz)(),
            O = (0, R.A)((e, t) => {
              var n;
              var r;
              ((null == (n = t.originalEvent) || null == (n = n.target)
                ? void 0
                : n.classList.contains('dropdown-toggle')) &&
                'mousedown' === t.source) ||
                (t.originalEvent.currentTarget !== document ||
                  ('keydown' === t.source &&
                    'Escape' !== t.originalEvent.key) ||
                  (t.source = 'rootClose'),
                (r = t.source),
                (!1 === g
                  ? 'click' === r
                  : 'inside' === g
                    ? 'rootClose' !== r
                    : 'outside' !== g || 'select' !== r) &&
                  (null == p || p(e, t)));
            }),
            j = 'end' === u,
            E = (0, X.S)(j, c, x),
            C = (0, s.useMemo)(
              () => ({ align: u, drop: c, isRTL: x }),
              [u, c, x],
            ),
            k = {
              down: w,
              'down-centered': ''.concat(w, '-center'),
              up: 'dropup',
              'up-centered': 'dropup-center dropup',
              end: 'dropend',
              start: 'dropstart',
            };
          return (0, A.jsx)(T.A.Provider, {
            value: C,
            children: (0, A.jsx)(N, {
              placement: E,
              show: l,
              onSelect: d,
              onToggle: O,
              focusFirstItemOnShow: m,
              itemSelector: '.'.concat(
                w,
                '-item:not(.disabled):not(:disabled)',
              ),
              children: y
                ? b.children
                : (0, A.jsx)(
                    h,
                    (0, r.A)(
                      (0, r.A)({}, b),
                      {},
                      { ref: t, className: a()(f, l && 'show', k[c]) },
                    ),
                  ),
            }),
          });
        });
      J.displayName = 'Dropdown';
      const Q = Object.assign(J, {
        Toggle: Y.A,
        Menu: X.A,
        Item: F,
        ItemText: G,
        Divider: W,
        Header: U,
      });
    },
    1609: (e, t, n) => {
      n.d(t, { A: () => r });
      (n(2740), n(5043), n(8293));
      function r(e, t) {
        return e;
      }
    },
    1992: (e, t, n) => {
      n.d(t, { A: () => x, S: () => y });
      var r = n(9379),
        o = n(45),
        i = n(8139),
        a = n.n(i),
        s = n(5043),
        c = n(6804);
      const l =
          'undefined' !== typeof n.g &&
          n.g.navigator &&
          'ReactNative' === n.g.navigator.product,
        f =
          'undefined' !== typeof document || l
            ? s.useLayoutEffect
            : s.useEffect;
      var u = n(8293),
        d = (n(6440), n(2392)),
        p = n(9334),
        m = n(9125),
        h = n(7852),
        v = n(1609),
        g = n(579);
      const b = [
        'bsPrefix',
        'className',
        'align',
        'rootCloseEvent',
        'flip',
        'show',
        'renderOnMount',
        'as',
        'popperConfig',
        'variant',
      ];
      function y(e, t, n) {
        let r = e
          ? n
            ? 'bottom-start'
            : 'bottom-end'
          : n
            ? 'bottom-end'
            : 'bottom-start';
        return (
          'up' === t
            ? (r = e
                ? n
                  ? 'top-start'
                  : 'top-end'
                : n
                  ? 'top-end'
                  : 'top-start')
            : 'end' === t
              ? (r = e
                  ? n
                    ? 'left-end'
                    : 'right-end'
                  : n
                    ? 'left-start'
                    : 'right-start')
              : 'start' === t
                ? (r = e
                    ? n
                      ? 'right-end'
                      : 'left-end'
                    : n
                      ? 'right-start'
                      : 'left-start')
                : 'down-centered' === t
                  ? (r = 'bottom')
                  : 'up-centered' === t && (r = 'top'),
          r
        );
      }
      const w = s.forwardRef((e, t) => {
        let {
            bsPrefix: n,
            className: i,
            align: l,
            rootCloseEvent: w,
            flip: x = !0,
            show: A,
            renderOnMount: O,
            as: j = 'div',
            popperConfig: E,
            variant: C,
          } = e,
          k = (0, o.A)(e, b),
          P = !1;
        const D = (0, s.useContext)(m.A),
          N = (0, h.oU)(n, 'dropdown-menu'),
          { align: M, drop: R, isRTL: T } = (0, s.useContext)(d.A);
        l = l || M;
        const L = (0, s.useContext)(p.A),
          S = [];
        if (l)
          if ('object' === typeof l) {
            const e = Object.keys(l);
            if (e.length) {
              const t = e[0],
                n = l[t];
              ((P = 'start' === n),
                S.push(''.concat(N, '-').concat(t, '-').concat(n)));
            }
          } else 'end' === l && (P = !0);
        const B = y(P, R, T),
          [W, { hasShown: I, popper: H, show: U, toggle: V }] = (0, c.G)({
            flip: x,
            rootCloseEvent: w,
            show: A,
            usePopper: !D && 0 === S.length,
            offset: [0, 2],
            popperConfig: E,
            placement: B,
          });
        if (
          ((W.ref = (0, u.A)((0, v.A)(t, 'DropdownMenu'), W.ref)),
          f(() => {
            U && (null == H || H.update());
          }, [U]),
          !I && !O && !L)
        )
          return null;
        'string' !== typeof j &&
          ((W.show = U),
          (W.close = () => (null == V ? void 0 : V(!1))),
          (W.align = l));
        let z = k.style;
        return (
          null != H &&
            H.placement &&
            ((z = (0, r.A)((0, r.A)({}, k.style), W.style)),
            (k['x-placement'] = H.placement)),
          (0, g.jsx)(
            j,
            (0, r.A)(
              (0, r.A)(
                (0, r.A)((0, r.A)({}, k), W),
                {},
                { style: z },
                (S.length || D) && { 'data-bs-popper': 'static' },
              ),
              {},
              {
                className: a()(
                  i,
                  N,
                  U && 'show',
                  P && ''.concat(N, '-end'),
                  C && ''.concat(N, '-').concat(C),
                  ...S,
                ),
              },
            ),
          )
        );
      });
      w.displayName = 'DropdownMenu';
      const x = w;
    },
    2392: (e, t, n) => {
      n.d(t, { A: () => o });
      const r = n(5043).createContext({});
      r.displayName = 'DropdownContext';
      const o = r;
    },
    3688: (e, t, n) => {
      n.d(t, { A: () => g });
      var r = n(9379),
        o = n(45),
        i = n(5043),
        a = n(5173),
        s = n.n(a),
        c = n(1467),
        l = n(723),
        f = n(1992);
      const u = s().oneOf(['start', 'end']),
        d = s().oneOfType([
          u,
          s().shape({ sm: u }),
          s().shape({ md: u }),
          s().shape({ lg: u }),
          s().shape({ xl: u }),
          s().shape({ xxl: u }),
          s().object,
        ]);
      var p = n(579);
      const m = [
          'title',
          'children',
          'bsPrefix',
          'rootCloseEvent',
          'variant',
          'size',
          'menuRole',
          'renderMenuOnMount',
          'disabled',
          'href',
          'id',
          'menuVariant',
          'flip',
        ],
        h = {
          id: s().string,
          href: s().string,
          onClick: s().func,
          title: s().node.isRequired,
          disabled: s().bool,
          align: d,
          menuRole: s().string,
          renderMenuOnMount: s().bool,
          rootCloseEvent: s().string,
          menuVariant: s().oneOf(['dark']),
          flip: s().bool,
          bsPrefix: s().string,
          variant: s().string,
          size: s().string,
        },
        v = i.forwardRef((e, t) => {
          let {
              title: n,
              children: i,
              bsPrefix: a,
              rootCloseEvent: s,
              variant: u,
              size: d,
              menuRole: h,
              renderMenuOnMount: v,
              disabled: g,
              href: b,
              id: y,
              menuVariant: w,
              flip: x,
            } = e,
            A = (0, o.A)(e, m);
          return (0, p.jsxs)(
            c.A,
            (0, r.A)(
              (0, r.A)({ ref: t }, A),
              {},
              {
                children: [
                  (0, p.jsx)(l.A, {
                    id: y,
                    href: b,
                    size: d,
                    variant: u,
                    disabled: g,
                    childBsPrefix: a,
                    children: n,
                  }),
                  (0, p.jsx)(f.A, {
                    role: h,
                    renderOnMount: v,
                    rootCloseEvent: s,
                    variant: w,
                    flip: x,
                    children: i,
                  }),
                ],
              },
            ),
          );
        });
      ((v.displayName = 'DropdownButton'), (v.propTypes = h));
      const g = v;
    },
    4874: (e, t, n) => {
      n.d(t, { A: () => r });
      const r = n(5043).createContext(null);
    },
    6804: (e, t, n) => {
      n.d(t, { A: () => _e, G: () => Fe });
      var r = n(5043),
        o = n(8457),
        i = n(4874),
        a = Object.prototype.hasOwnProperty;
      function s(e, t, n) {
        for (n of e.keys()) if (c(n, t)) return n;
      }
      function c(e, t) {
        var n, r, o;
        if (e === t) return !0;
        if (e && t && (n = e.constructor) === t.constructor) {
          if (n === Date) return e.getTime() === t.getTime();
          if (n === RegExp) return e.toString() === t.toString();
          if (n === Array) {
            if ((r = e.length) === t.length) for (; r-- && c(e[r], t[r]); );
            return -1 === r;
          }
          if (n === Set) {
            if (e.size !== t.size) return !1;
            for (r of e) {
              if ((o = r) && 'object' === typeof o && !(o = s(t, o))) return !1;
              if (!t.has(o)) return !1;
            }
            return !0;
          }
          if (n === Map) {
            if (e.size !== t.size) return !1;
            for (r of e) {
              if ((o = r[0]) && 'object' === typeof o && !(o = s(t, o)))
                return !1;
              if (!c(r[1], t.get(o))) return !1;
            }
            return !0;
          }
          if (n === ArrayBuffer)
            ((e = new Uint8Array(e)), (t = new Uint8Array(t)));
          else if (n === DataView) {
            if ((r = e.byteLength) === t.byteLength)
              for (; r-- && e.getInt8(r) === t.getInt8(r); );
            return -1 === r;
          }
          if (ArrayBuffer.isView(e)) {
            if ((r = e.byteLength) === t.byteLength)
              for (; r-- && e[r] === t[r]; );
            return -1 === r;
          }
          if (!n || 'object' === typeof e) {
            for (n in ((r = 0), e)) {
              if (a.call(e, n) && ++r && !a.call(t, n)) return !1;
              if (!(n in t) || !c(e[n], t[n])) return !1;
            }
            return Object.keys(t).length === r;
          }
        }
        return e !== e && t !== t;
      }
      var l = n(2665);
      const f = function (e) {
        const t = (0, l.A)();
        return [
          e[0],
          (0, r.useCallback)(
            (n) => {
              if (t()) return e[1](n);
            },
            [t, e[1]],
          ),
        ];
      };
      function u(e) {
        return e.split('-')[0];
      }
      function d(e) {
        if (null == e) return window;
        if ('[object Window]' !== e.toString()) {
          var t = e.ownerDocument;
          return (t && t.defaultView) || window;
        }
        return e;
      }
      function p(e) {
        return e instanceof d(e).Element || e instanceof Element;
      }
      function m(e) {
        return e instanceof d(e).HTMLElement || e instanceof HTMLElement;
      }
      function h(e) {
        return (
          'undefined' !== typeof ShadowRoot &&
          (e instanceof d(e).ShadowRoot || e instanceof ShadowRoot)
        );
      }
      var v = Math.max,
        g = Math.min,
        b = Math.round;
      function y() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands)
          ? e.brands
              .map(function (e) {
                return e.brand + '/' + e.version;
              })
              .join(' ')
          : navigator.userAgent;
      }
      function w() {
        return !/^((?!chrome|android).)*safari/i.test(y());
      }
      function x(e, t, n) {
        (void 0 === t && (t = !1), void 0 === n && (n = !1));
        var r = e.getBoundingClientRect(),
          o = 1,
          i = 1;
        t &&
          m(e) &&
          ((o = (e.offsetWidth > 0 && b(r.width) / e.offsetWidth) || 1),
          (i = (e.offsetHeight > 0 && b(r.height) / e.offsetHeight) || 1));
        var a = (p(e) ? d(e) : window).visualViewport,
          s = !w() && n,
          c = (r.left + (s && a ? a.offsetLeft : 0)) / o,
          l = (r.top + (s && a ? a.offsetTop : 0)) / i,
          f = r.width / o,
          u = r.height / i;
        return {
          width: f,
          height: u,
          top: l,
          right: c + f,
          bottom: l + u,
          left: c,
          x: c,
          y: l,
        };
      }
      function A(e) {
        var t = x(e),
          n = e.offsetWidth,
          r = e.offsetHeight;
        return (
          Math.abs(t.width - n) <= 1 && (n = t.width),
          Math.abs(t.height - r) <= 1 && (r = t.height),
          { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
        );
      }
      function O(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && h(n)) {
          var r = t;
          do {
            if (r && e.isSameNode(r)) return !0;
            r = r.parentNode || r.host;
          } while (r);
        }
        return !1;
      }
      function j(e) {
        return e ? (e.nodeName || '').toLowerCase() : null;
      }
      function E(e) {
        return d(e).getComputedStyle(e);
      }
      function C(e) {
        return ['table', 'td', 'th'].indexOf(j(e)) >= 0;
      }
      function k(e) {
        return ((p(e) ? e.ownerDocument : e.document) || window.document)
          .documentElement;
      }
      function P(e) {
        return 'html' === j(e)
          ? e
          : e.assignedSlot || e.parentNode || (h(e) ? e.host : null) || k(e);
      }
      function D(e) {
        return m(e) && 'fixed' !== E(e).position ? e.offsetParent : null;
      }
      function N(e) {
        for (var t = d(e), n = D(e); n && C(n) && 'static' === E(n).position; )
          n = D(n);
        return n &&
          ('html' === j(n) || ('body' === j(n) && 'static' === E(n).position))
          ? t
          : n ||
              (function (e) {
                var t = /firefox/i.test(y());
                if (/Trident/i.test(y()) && m(e) && 'fixed' === E(e).position)
                  return null;
                var n = P(e);
                for (
                  h(n) && (n = n.host);
                  m(n) && ['html', 'body'].indexOf(j(n)) < 0;

                ) {
                  var r = E(n);
                  if (
                    'none' !== r.transform ||
                    'none' !== r.perspective ||
                    'paint' === r.contain ||
                    -1 !== ['transform', 'perspective'].indexOf(r.willChange) ||
                    (t && 'filter' === r.willChange) ||
                    (t && r.filter && 'none' !== r.filter)
                  )
                    return n;
                  n = n.parentNode;
                }
                return null;
              })(e) ||
              t;
      }
      function M(e) {
        return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
      }
      function R(e, t, n) {
        return v(e, g(t, n));
      }
      function T(e) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
      }
      function L(e, t) {
        return t.reduce(function (t, n) {
          return ((t[n] = e), t);
        }, {});
      }
      var S = 'top',
        B = 'bottom',
        W = 'right',
        I = 'left',
        H = 'auto',
        U = [S, B, W, I],
        V = 'start',
        z = 'end',
        q = 'viewport',
        F = 'popper',
        K = U.reduce(function (e, t) {
          return e.concat([t + '-' + V, t + '-' + z]);
        }, []),
        _ = [].concat(U, [H]).reduce(function (e, t) {
          return e.concat([t, t + '-' + V, t + '-' + z]);
        }, []),
        G = [
          'beforeRead',
          'read',
          'afterRead',
          'beforeMain',
          'main',
          'afterMain',
          'beforeWrite',
          'write',
          'afterWrite',
        ];
      const X = {
        name: 'arrow',
        enabled: !0,
        phase: 'main',
        fn: function (e) {
          var t,
            n = e.state,
            r = e.name,
            o = e.options,
            i = n.elements.arrow,
            a = n.modifiersData.popperOffsets,
            s = u(n.placement),
            c = M(s),
            l = [I, W].indexOf(s) >= 0 ? 'height' : 'width';
          if (i && a) {
            var f = (function (e, t) {
                return T(
                  'number' !==
                    typeof (e =
                      'function' === typeof e
                        ? e(
                            Object.assign({}, t.rects, {
                              placement: t.placement,
                            }),
                          )
                        : e)
                    ? e
                    : L(e, U),
                );
              })(o.padding, n),
              d = A(i),
              p = 'y' === c ? S : I,
              m = 'y' === c ? B : W,
              h =
                n.rects.reference[l] +
                n.rects.reference[c] -
                a[c] -
                n.rects.popper[l],
              v = a[c] - n.rects.reference[c],
              g = N(i),
              b = g
                ? 'y' === c
                  ? g.clientHeight || 0
                  : g.clientWidth || 0
                : 0,
              y = h / 2 - v / 2,
              w = f[p],
              x = b - d[l] - f[m],
              O = b / 2 - d[l] / 2 + y,
              j = R(w, O, x),
              E = c;
            n.modifiersData[r] =
              (((t = {})[E] = j), (t.centerOffset = j - O), t);
          }
        },
        effect: function (e) {
          var t = e.state,
            n = e.options.element,
            r = void 0 === n ? '[data-popper-arrow]' : n;
          null != r &&
            ('string' !== typeof r ||
              (r = t.elements.popper.querySelector(r))) &&
            O(t.elements.popper, r) &&
            (t.elements.arrow = r);
        },
        requires: ['popperOffsets'],
        requiresIfExists: ['preventOverflow'],
      };
      function Y(e) {
        return e.split('-')[1];
      }
      var Z = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
      function $(e) {
        var t,
          n = e.popper,
          r = e.popperRect,
          o = e.placement,
          i = e.variation,
          a = e.offsets,
          s = e.position,
          c = e.gpuAcceleration,
          l = e.adaptive,
          f = e.roundOffsets,
          u = e.isFixed,
          p = a.x,
          m = void 0 === p ? 0 : p,
          h = a.y,
          v = void 0 === h ? 0 : h,
          g = 'function' === typeof f ? f({ x: m, y: v }) : { x: m, y: v };
        ((m = g.x), (v = g.y));
        var y = a.hasOwnProperty('x'),
          w = a.hasOwnProperty('y'),
          x = I,
          A = S,
          O = window;
        if (l) {
          var j = N(n),
            C = 'clientHeight',
            P = 'clientWidth';
          if (
            (j === d(n) &&
              'static' !== E((j = k(n))).position &&
              'absolute' === s &&
              ((C = 'scrollHeight'), (P = 'scrollWidth')),
            o === S || ((o === I || o === W) && i === z))
          )
            ((A = B),
              (v -=
                (u && j === O && O.visualViewport
                  ? O.visualViewport.height
                  : j[C]) - r.height),
              (v *= c ? 1 : -1));
          if (o === I || ((o === S || o === B) && i === z))
            ((x = W),
              (m -=
                (u && j === O && O.visualViewport
                  ? O.visualViewport.width
                  : j[P]) - r.width),
              (m *= c ? 1 : -1));
        }
        var D,
          M = Object.assign({ position: s }, l && Z),
          R =
            !0 === f
              ? (function (e, t) {
                  var n = e.x,
                    r = e.y,
                    o = t.devicePixelRatio || 1;
                  return { x: b(n * o) / o || 0, y: b(r * o) / o || 0 };
                })({ x: m, y: v }, d(n))
              : { x: m, y: v };
        return (
          (m = R.x),
          (v = R.y),
          c
            ? Object.assign(
                {},
                M,
                (((D = {})[A] = w ? '0' : ''),
                (D[x] = y ? '0' : ''),
                (D.transform =
                  (O.devicePixelRatio || 1) <= 1
                    ? 'translate(' + m + 'px, ' + v + 'px)'
                    : 'translate3d(' + m + 'px, ' + v + 'px, 0)'),
                D),
              )
            : Object.assign(
                {},
                M,
                (((t = {})[A] = w ? v + 'px' : ''),
                (t[x] = y ? m + 'px' : ''),
                (t.transform = ''),
                t),
              )
        );
      }
      var J = { passive: !0 };
      var Q = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
      function ee(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return Q[e];
        });
      }
      var te = { start: 'end', end: 'start' };
      function ne(e) {
        return e.replace(/start|end/g, function (e) {
          return te[e];
        });
      }
      function re(e) {
        var t = d(e);
        return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
      }
      function oe(e) {
        return x(k(e)).left + re(e).scrollLeft;
      }
      function ie(e) {
        var t = E(e),
          n = t.overflow,
          r = t.overflowX,
          o = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + r);
      }
      function ae(e) {
        return ['html', 'body', '#document'].indexOf(j(e)) >= 0
          ? e.ownerDocument.body
          : m(e) && ie(e)
            ? e
            : ae(P(e));
      }
      function se(e, t) {
        var n;
        void 0 === t && (t = []);
        var r = ae(e),
          o = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
          i = d(r),
          a = o ? [i].concat(i.visualViewport || [], ie(r) ? r : []) : r,
          s = t.concat(a);
        return o ? s : s.concat(se(P(a)));
      }
      function ce(e) {
        return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height,
        });
      }
      function le(e, t, n) {
        return t === q
          ? ce(
              (function (e, t) {
                var n = d(e),
                  r = k(e),
                  o = n.visualViewport,
                  i = r.clientWidth,
                  a = r.clientHeight,
                  s = 0,
                  c = 0;
                if (o) {
                  ((i = o.width), (a = o.height));
                  var l = w();
                  (l || (!l && 'fixed' === t)) &&
                    ((s = o.offsetLeft), (c = o.offsetTop));
                }
                return { width: i, height: a, x: s + oe(e), y: c };
              })(e, n),
            )
          : p(t)
            ? (function (e, t) {
                var n = x(e, !1, 'fixed' === t);
                return (
                  (n.top = n.top + e.clientTop),
                  (n.left = n.left + e.clientLeft),
                  (n.bottom = n.top + e.clientHeight),
                  (n.right = n.left + e.clientWidth),
                  (n.width = e.clientWidth),
                  (n.height = e.clientHeight),
                  (n.x = n.left),
                  (n.y = n.top),
                  n
                );
              })(t, n)
            : ce(
                (function (e) {
                  var t,
                    n = k(e),
                    r = re(e),
                    o = null == (t = e.ownerDocument) ? void 0 : t.body,
                    i = v(
                      n.scrollWidth,
                      n.clientWidth,
                      o ? o.scrollWidth : 0,
                      o ? o.clientWidth : 0,
                    ),
                    a = v(
                      n.scrollHeight,
                      n.clientHeight,
                      o ? o.scrollHeight : 0,
                      o ? o.clientHeight : 0,
                    ),
                    s = -r.scrollLeft + oe(e),
                    c = -r.scrollTop;
                  return (
                    'rtl' === E(o || n).direction &&
                      (s += v(n.clientWidth, o ? o.clientWidth : 0) - i),
                    { width: i, height: a, x: s, y: c }
                  );
                })(k(e)),
              );
      }
      function fe(e, t, n, r) {
        var o =
            'clippingParents' === t
              ? (function (e) {
                  var t = se(P(e)),
                    n =
                      ['absolute', 'fixed'].indexOf(E(e).position) >= 0 && m(e)
                        ? N(e)
                        : e;
                  return p(n)
                    ? t.filter(function (e) {
                        return p(e) && O(e, n) && 'body' !== j(e);
                      })
                    : [];
                })(e)
              : [].concat(t),
          i = [].concat(o, [n]),
          a = i[0],
          s = i.reduce(
            function (t, n) {
              var o = le(e, n, r);
              return (
                (t.top = v(o.top, t.top)),
                (t.right = g(o.right, t.right)),
                (t.bottom = g(o.bottom, t.bottom)),
                (t.left = v(o.left, t.left)),
                t
              );
            },
            le(e, a, r),
          );
        return (
          (s.width = s.right - s.left),
          (s.height = s.bottom - s.top),
          (s.x = s.left),
          (s.y = s.top),
          s
        );
      }
      function ue(e) {
        var t,
          n = e.reference,
          r = e.element,
          o = e.placement,
          i = o ? u(o) : null,
          a = o ? Y(o) : null,
          s = n.x + n.width / 2 - r.width / 2,
          c = n.y + n.height / 2 - r.height / 2;
        switch (i) {
          case S:
            t = { x: s, y: n.y - r.height };
            break;
          case B:
            t = { x: s, y: n.y + n.height };
            break;
          case W:
            t = { x: n.x + n.width, y: c };
            break;
          case I:
            t = { x: n.x - r.width, y: c };
            break;
          default:
            t = { x: n.x, y: n.y };
        }
        var l = i ? M(i) : null;
        if (null != l) {
          var f = 'y' === l ? 'height' : 'width';
          switch (a) {
            case V:
              t[l] = t[l] - (n[f] / 2 - r[f] / 2);
              break;
            case z:
              t[l] = t[l] + (n[f] / 2 - r[f] / 2);
          }
        }
        return t;
      }
      function de(e, t) {
        void 0 === t && (t = {});
        var n = t,
          r = n.placement,
          o = void 0 === r ? e.placement : r,
          i = n.strategy,
          a = void 0 === i ? e.strategy : i,
          s = n.boundary,
          c = void 0 === s ? 'clippingParents' : s,
          l = n.rootBoundary,
          f = void 0 === l ? q : l,
          u = n.elementContext,
          d = void 0 === u ? F : u,
          m = n.altBoundary,
          h = void 0 !== m && m,
          v = n.padding,
          g = void 0 === v ? 0 : v,
          b = T('number' !== typeof g ? g : L(g, U)),
          y = d === F ? 'reference' : F,
          w = e.rects.popper,
          A = e.elements[h ? y : d],
          O = fe(p(A) ? A : A.contextElement || k(e.elements.popper), c, f, a),
          j = x(e.elements.reference),
          E = ue({
            reference: j,
            element: w,
            strategy: 'absolute',
            placement: o,
          }),
          C = ce(Object.assign({}, w, E)),
          P = d === F ? C : j,
          D = {
            top: O.top - P.top + b.top,
            bottom: P.bottom - O.bottom + b.bottom,
            left: O.left - P.left + b.left,
            right: P.right - O.right + b.right,
          },
          N = e.modifiersData.offset;
        if (d === F && N) {
          var M = N[o];
          Object.keys(D).forEach(function (e) {
            var t = [W, B].indexOf(e) >= 0 ? 1 : -1,
              n = [S, B].indexOf(e) >= 0 ? 'y' : 'x';
            D[e] += M[n] * t;
          });
        }
        return D;
      }
      function pe(e, t, n) {
        return (
          void 0 === n && (n = { x: 0, y: 0 }),
          {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x,
          }
        );
      }
      function me(e) {
        return [S, W, B, I].some(function (t) {
          return e[t] >= 0;
        });
      }
      const he = {
        name: 'offset',
        enabled: !0,
        phase: 'main',
        requires: ['popperOffsets'],
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name,
            o = n.offset,
            i = void 0 === o ? [0, 0] : o,
            a = _.reduce(function (e, n) {
              return (
                (e[n] = (function (e, t, n) {
                  var r = u(e),
                    o = [I, S].indexOf(r) >= 0 ? -1 : 1,
                    i =
                      'function' === typeof n
                        ? n(Object.assign({}, t, { placement: e }))
                        : n,
                    a = i[0],
                    s = i[1];
                  return (
                    (a = a || 0),
                    (s = (s || 0) * o),
                    [I, W].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s }
                  );
                })(n, t.rects, i)),
                e
              );
            }, {}),
            s = a[t.placement],
            c = s.x,
            l = s.y;
          (null != t.modifiersData.popperOffsets &&
            ((t.modifiersData.popperOffsets.x += c),
            (t.modifiersData.popperOffsets.y += l)),
            (t.modifiersData[r] = a));
        },
      };
      const ve = {
        name: 'preventOverflow',
        enabled: !0,
        phase: 'main',
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name,
            o = n.mainAxis,
            i = void 0 === o || o,
            a = n.altAxis,
            s = void 0 !== a && a,
            c = n.boundary,
            l = n.rootBoundary,
            f = n.altBoundary,
            d = n.padding,
            p = n.tether,
            m = void 0 === p || p,
            h = n.tetherOffset,
            b = void 0 === h ? 0 : h,
            y = de(t, {
              boundary: c,
              rootBoundary: l,
              padding: d,
              altBoundary: f,
            }),
            w = u(t.placement),
            x = Y(t.placement),
            O = !x,
            j = M(w),
            E = 'x' === j ? 'y' : 'x',
            C = t.modifiersData.popperOffsets,
            k = t.rects.reference,
            P = t.rects.popper,
            D =
              'function' === typeof b
                ? b(Object.assign({}, t.rects, { placement: t.placement }))
                : b,
            T =
              'number' === typeof D
                ? { mainAxis: D, altAxis: D }
                : Object.assign({ mainAxis: 0, altAxis: 0 }, D),
            L = t.modifiersData.offset
              ? t.modifiersData.offset[t.placement]
              : null,
            H = { x: 0, y: 0 };
          if (C) {
            if (i) {
              var U,
                z = 'y' === j ? S : I,
                q = 'y' === j ? B : W,
                F = 'y' === j ? 'height' : 'width',
                K = C[j],
                _ = K + y[z],
                G = K - y[q],
                X = m ? -P[F] / 2 : 0,
                Z = x === V ? k[F] : P[F],
                $ = x === V ? -P[F] : -k[F],
                J = t.elements.arrow,
                Q = m && J ? A(J) : { width: 0, height: 0 },
                ee = t.modifiersData['arrow#persistent']
                  ? t.modifiersData['arrow#persistent'].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 },
                te = ee[z],
                ne = ee[q],
                re = R(0, k[F], Q[F]),
                oe = O
                  ? k[F] / 2 - X - re - te - T.mainAxis
                  : Z - re - te - T.mainAxis,
                ie = O
                  ? -k[F] / 2 + X + re + ne + T.mainAxis
                  : $ + re + ne + T.mainAxis,
                ae = t.elements.arrow && N(t.elements.arrow),
                se = ae
                  ? 'y' === j
                    ? ae.clientTop || 0
                    : ae.clientLeft || 0
                  : 0,
                ce = null != (U = null == L ? void 0 : L[j]) ? U : 0,
                le = K + ie - ce,
                fe = R(m ? g(_, K + oe - ce - se) : _, K, m ? v(G, le) : G);
              ((C[j] = fe), (H[j] = fe - K));
            }
            if (s) {
              var ue,
                pe = 'x' === j ? S : I,
                me = 'x' === j ? B : W,
                he = C[E],
                ve = 'y' === E ? 'height' : 'width',
                ge = he + y[pe],
                be = he - y[me],
                ye = -1 !== [S, I].indexOf(w),
                we = null != (ue = null == L ? void 0 : L[E]) ? ue : 0,
                xe = ye ? ge : he - k[ve] - P[ve] - we + T.altAxis,
                Ae = ye ? he + k[ve] + P[ve] - we - T.altAxis : be,
                Oe =
                  m && ye
                    ? (function (e, t, n) {
                        var r = R(e, t, n);
                        return r > n ? n : r;
                      })(xe, he, Ae)
                    : R(m ? xe : ge, he, m ? Ae : be);
              ((C[E] = Oe), (H[E] = Oe - he));
            }
            t.modifiersData[r] = H;
          }
        },
        requiresIfExists: ['offset'],
      };
      function ge(e, t, n) {
        void 0 === n && (n = !1);
        var r = m(t),
          o =
            m(t) &&
            (function (e) {
              var t = e.getBoundingClientRect(),
                n = b(t.width) / e.offsetWidth || 1,
                r = b(t.height) / e.offsetHeight || 1;
              return 1 !== n || 1 !== r;
            })(t),
          i = k(t),
          a = x(e, o, n),
          s = { scrollLeft: 0, scrollTop: 0 },
          c = { x: 0, y: 0 };
        return (
          (r || (!r && !n)) &&
            (('body' !== j(t) || ie(i)) &&
              (s = (function (e) {
                return e !== d(e) && m(e)
                  ? { scrollLeft: (t = e).scrollLeft, scrollTop: t.scrollTop }
                  : re(e);
                var t;
              })(t)),
            m(t)
              ? (((c = x(t, !0)).x += t.clientLeft), (c.y += t.clientTop))
              : i && (c.x = oe(i))),
          {
            x: a.left + s.scrollLeft - c.x,
            y: a.top + s.scrollTop - c.y,
            width: a.width,
            height: a.height,
          }
        );
      }
      function be(e) {
        var t = new Map(),
          n = new Set(),
          r = [];
        function o(e) {
          (n.add(e.name),
            []
              .concat(e.requires || [], e.requiresIfExists || [])
              .forEach(function (e) {
                if (!n.has(e)) {
                  var r = t.get(e);
                  r && o(r);
                }
              }),
            r.push(e));
        }
        return (
          e.forEach(function (e) {
            t.set(e.name, e);
          }),
          e.forEach(function (e) {
            n.has(e.name) || o(e);
          }),
          r
        );
      }
      function ye(e) {
        var t;
        return function () {
          return (
            t ||
              (t = new Promise(function (n) {
                Promise.resolve().then(function () {
                  ((t = void 0), n(e()));
                });
              })),
            t
          );
        };
      }
      var we = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
      function xe() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return !t.some(function (e) {
          return !(e && 'function' === typeof e.getBoundingClientRect);
        });
      }
      function Ae(e) {
        void 0 === e && (e = {});
        var t = e,
          n = t.defaultModifiers,
          r = void 0 === n ? [] : n,
          o = t.defaultOptions,
          i = void 0 === o ? we : o;
        return function (e, t, n) {
          void 0 === n && (n = i);
          var o = {
              placement: 'bottom',
              orderedModifiers: [],
              options: Object.assign({}, we, i),
              modifiersData: {},
              elements: { reference: e, popper: t },
              attributes: {},
              styles: {},
            },
            a = [],
            s = !1,
            c = {
              state: o,
              setOptions: function (n) {
                var s = 'function' === typeof n ? n(o.options) : n;
                (l(),
                  (o.options = Object.assign({}, i, o.options, s)),
                  (o.scrollParents = {
                    reference: p(e)
                      ? se(e)
                      : e.contextElement
                        ? se(e.contextElement)
                        : [],
                    popper: se(t),
                  }));
                var f = (function (e) {
                  var t = be(e);
                  return G.reduce(function (e, n) {
                    return e.concat(
                      t.filter(function (e) {
                        return e.phase === n;
                      }),
                    );
                  }, []);
                })(
                  (function (e) {
                    var t = e.reduce(function (e, t) {
                      var n = e[t.name];
                      return (
                        (e[t.name] = n
                          ? Object.assign({}, n, t, {
                              options: Object.assign({}, n.options, t.options),
                              data: Object.assign({}, n.data, t.data),
                            })
                          : t),
                        e
                      );
                    }, {});
                    return Object.keys(t).map(function (e) {
                      return t[e];
                    });
                  })([].concat(r, o.options.modifiers)),
                );
                return (
                  (o.orderedModifiers = f.filter(function (e) {
                    return e.enabled;
                  })),
                  o.orderedModifiers.forEach(function (e) {
                    var t = e.name,
                      n = e.options,
                      r = void 0 === n ? {} : n,
                      i = e.effect;
                    if ('function' === typeof i) {
                      var s = i({ state: o, name: t, instance: c, options: r }),
                        l = function () {};
                      a.push(s || l);
                    }
                  }),
                  c.update()
                );
              },
              forceUpdate: function () {
                if (!s) {
                  var e = o.elements,
                    t = e.reference,
                    n = e.popper;
                  if (xe(t, n)) {
                    ((o.rects = {
                      reference: ge(t, N(n), 'fixed' === o.options.strategy),
                      popper: A(n),
                    }),
                      (o.reset = !1),
                      (o.placement = o.options.placement),
                      o.orderedModifiers.forEach(function (e) {
                        return (o.modifiersData[e.name] = Object.assign(
                          {},
                          e.data,
                        ));
                      }));
                    for (var r = 0; r < o.orderedModifiers.length; r++)
                      if (!0 !== o.reset) {
                        var i = o.orderedModifiers[r],
                          a = i.fn,
                          l = i.options,
                          f = void 0 === l ? {} : l,
                          u = i.name;
                        'function' === typeof a &&
                          (o =
                            a({ state: o, options: f, name: u, instance: c }) ||
                            o);
                      } else ((o.reset = !1), (r = -1));
                  }
                }
              },
              update: ye(function () {
                return new Promise(function (e) {
                  (c.forceUpdate(), e(o));
                });
              }),
              destroy: function () {
                (l(), (s = !0));
              },
            };
          if (!xe(e, t)) return c;
          function l() {
            (a.forEach(function (e) {
              return e();
            }),
              (a = []));
          }
          return (
            c.setOptions(n).then(function (e) {
              !s && n.onFirstUpdate && n.onFirstUpdate(e);
            }),
            c
          );
        };
      }
      const Oe = Ae({
          defaultModifiers: [
            {
              name: 'hide',
              enabled: !0,
              phase: 'main',
              requiresIfExists: ['preventOverflow'],
              fn: function (e) {
                var t = e.state,
                  n = e.name,
                  r = t.rects.reference,
                  o = t.rects.popper,
                  i = t.modifiersData.preventOverflow,
                  a = de(t, { elementContext: 'reference' }),
                  s = de(t, { altBoundary: !0 }),
                  c = pe(a, r),
                  l = pe(s, o, i),
                  f = me(c),
                  u = me(l);
                ((t.modifiersData[n] = {
                  referenceClippingOffsets: c,
                  popperEscapeOffsets: l,
                  isReferenceHidden: f,
                  hasPopperEscaped: u,
                }),
                  (t.attributes.popper = Object.assign(
                    {},
                    t.attributes.popper,
                    {
                      'data-popper-reference-hidden': f,
                      'data-popper-escaped': u,
                    },
                  )));
              },
            },
            {
              name: 'popperOffsets',
              enabled: !0,
              phase: 'read',
              fn: function (e) {
                var t = e.state,
                  n = e.name;
                t.modifiersData[n] = ue({
                  reference: t.rects.reference,
                  element: t.rects.popper,
                  strategy: 'absolute',
                  placement: t.placement,
                });
              },
              data: {},
            },
            {
              name: 'computeStyles',
              enabled: !0,
              phase: 'beforeWrite',
              fn: function (e) {
                var t = e.state,
                  n = e.options,
                  r = n.gpuAcceleration,
                  o = void 0 === r || r,
                  i = n.adaptive,
                  a = void 0 === i || i,
                  s = n.roundOffsets,
                  c = void 0 === s || s,
                  l = {
                    placement: u(t.placement),
                    variation: Y(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: o,
                    isFixed: 'fixed' === t.options.strategy,
                  };
                (null != t.modifiersData.popperOffsets &&
                  (t.styles.popper = Object.assign(
                    {},
                    t.styles.popper,
                    $(
                      Object.assign({}, l, {
                        offsets: t.modifiersData.popperOffsets,
                        position: t.options.strategy,
                        adaptive: a,
                        roundOffsets: c,
                      }),
                    ),
                  )),
                  null != t.modifiersData.arrow &&
                    (t.styles.arrow = Object.assign(
                      {},
                      t.styles.arrow,
                      $(
                        Object.assign({}, l, {
                          offsets: t.modifiersData.arrow,
                          position: 'absolute',
                          adaptive: !1,
                          roundOffsets: c,
                        }),
                      ),
                    )),
                  (t.attributes.popper = Object.assign(
                    {},
                    t.attributes.popper,
                    { 'data-popper-placement': t.placement },
                  )));
              },
              data: {},
            },
            {
              name: 'eventListeners',
              enabled: !0,
              phase: 'write',
              fn: function () {},
              effect: function (e) {
                var t = e.state,
                  n = e.instance,
                  r = e.options,
                  o = r.scroll,
                  i = void 0 === o || o,
                  a = r.resize,
                  s = void 0 === a || a,
                  c = d(t.elements.popper),
                  l = [].concat(
                    t.scrollParents.reference,
                    t.scrollParents.popper,
                  );
                return (
                  i &&
                    l.forEach(function (e) {
                      e.addEventListener('scroll', n.update, J);
                    }),
                  s && c.addEventListener('resize', n.update, J),
                  function () {
                    (i &&
                      l.forEach(function (e) {
                        e.removeEventListener('scroll', n.update, J);
                      }),
                      s && c.removeEventListener('resize', n.update, J));
                  }
                );
              },
              data: {},
            },
            he,
            {
              name: 'flip',
              enabled: !0,
              phase: 'main',
              fn: function (e) {
                var t = e.state,
                  n = e.options,
                  r = e.name;
                if (!t.modifiersData[r]._skip) {
                  for (
                    var o = n.mainAxis,
                      i = void 0 === o || o,
                      a = n.altAxis,
                      s = void 0 === a || a,
                      c = n.fallbackPlacements,
                      l = n.padding,
                      f = n.boundary,
                      d = n.rootBoundary,
                      p = n.altBoundary,
                      m = n.flipVariations,
                      h = void 0 === m || m,
                      v = n.allowedAutoPlacements,
                      g = t.options.placement,
                      b = u(g),
                      y =
                        c ||
                        (b === g || !h
                          ? [ee(g)]
                          : (function (e) {
                              if (u(e) === H) return [];
                              var t = ee(e);
                              return [ne(e), t, ne(t)];
                            })(g)),
                      w = [g].concat(y).reduce(function (e, n) {
                        return e.concat(
                          u(n) === H
                            ? (function (e, t) {
                                void 0 === t && (t = {});
                                var n = t,
                                  r = n.placement,
                                  o = n.boundary,
                                  i = n.rootBoundary,
                                  a = n.padding,
                                  s = n.flipVariations,
                                  c = n.allowedAutoPlacements,
                                  l = void 0 === c ? _ : c,
                                  f = Y(r),
                                  d = f
                                    ? s
                                      ? K
                                      : K.filter(function (e) {
                                          return Y(e) === f;
                                        })
                                    : U,
                                  p = d.filter(function (e) {
                                    return l.indexOf(e) >= 0;
                                  });
                                0 === p.length && (p = d);
                                var m = p.reduce(function (t, n) {
                                  return (
                                    (t[n] = de(e, {
                                      placement: n,
                                      boundary: o,
                                      rootBoundary: i,
                                      padding: a,
                                    })[u(n)]),
                                    t
                                  );
                                }, {});
                                return Object.keys(m).sort(function (e, t) {
                                  return m[e] - m[t];
                                });
                              })(t, {
                                placement: n,
                                boundary: f,
                                rootBoundary: d,
                                padding: l,
                                flipVariations: h,
                                allowedAutoPlacements: v,
                              })
                            : n,
                        );
                      }, []),
                      x = t.rects.reference,
                      A = t.rects.popper,
                      O = new Map(),
                      j = !0,
                      E = w[0],
                      C = 0;
                    C < w.length;
                    C++
                  ) {
                    var k = w[C],
                      P = u(k),
                      D = Y(k) === V,
                      N = [S, B].indexOf(P) >= 0,
                      M = N ? 'width' : 'height',
                      R = de(t, {
                        placement: k,
                        boundary: f,
                        rootBoundary: d,
                        altBoundary: p,
                        padding: l,
                      }),
                      T = N ? (D ? W : I) : D ? B : S;
                    x[M] > A[M] && (T = ee(T));
                    var L = ee(T),
                      z = [];
                    if (
                      (i && z.push(R[P] <= 0),
                      s && z.push(R[T] <= 0, R[L] <= 0),
                      z.every(function (e) {
                        return e;
                      }))
                    ) {
                      ((E = k), (j = !1));
                      break;
                    }
                    O.set(k, z);
                  }
                  if (j)
                    for (
                      var q = function (e) {
                          var t = w.find(function (t) {
                            var n = O.get(t);
                            if (n)
                              return n.slice(0, e).every(function (e) {
                                return e;
                              });
                          });
                          if (t) return ((E = t), 'break');
                        },
                        F = h ? 3 : 1;
                      F > 0;
                      F--
                    ) {
                      if ('break' === q(F)) break;
                    }
                  t.placement !== E &&
                    ((t.modifiersData[r]._skip = !0),
                    (t.placement = E),
                    (t.reset = !0));
                }
              },
              requiresIfExists: ['offset'],
              data: { _skip: !1 },
            },
            ve,
            X,
          ],
        }),
        je = ['enabled', 'placement', 'strategy', 'modifiers'];
      const Ee = {
          name: 'applyStyles',
          enabled: !1,
          phase: 'afterWrite',
          fn: () => {},
        },
        Ce = {
          name: 'ariaDescribedBy',
          enabled: !0,
          phase: 'afterWrite',
          effect: (e) => {
            let { state: t } = e;
            return () => {
              const { reference: e, popper: n } = t.elements;
              if ('removeAttribute' in e) {
                const t = (e.getAttribute('aria-describedby') || '')
                  .split(',')
                  .filter((e) => e.trim() !== n.id);
                t.length
                  ? e.setAttribute('aria-describedby', t.join(','))
                  : e.removeAttribute('aria-describedby');
              }
            };
          },
          fn: (e) => {
            let { state: t } = e;
            var n;
            const { popper: r, reference: o } = t.elements,
              i =
                null == (n = r.getAttribute('role')) ? void 0 : n.toLowerCase();
            if (r.id && 'tooltip' === i && 'setAttribute' in o) {
              const e = o.getAttribute('aria-describedby');
              if (e && -1 !== e.split(',').indexOf(r.id)) return;
              o.setAttribute(
                'aria-describedby',
                e ? ''.concat(e, ',').concat(r.id) : r.id,
              );
            }
          },
        },
        ke = [];
      const Pe = function (e, t) {
        let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          {
            enabled: o = !0,
            placement: i = 'bottom',
            strategy: a = 'absolute',
            modifiers: s = ke,
          } = n,
          l = (function (e, t) {
            if (null == e) return {};
            var n = {};
            for (var r in e)
              if ({}.hasOwnProperty.call(e, r)) {
                if (t.indexOf(r) >= 0) continue;
                n[r] = e[r];
              }
            return n;
          })(n, je);
        const u = (0, r.useRef)(s),
          d = (0, r.useRef)(),
          p = (0, r.useCallback)(() => {
            var e;
            null == (e = d.current) || e.update();
          }, []),
          m = (0, r.useCallback)(() => {
            var e;
            null == (e = d.current) || e.forceUpdate();
          }, []),
          [h, v] = f(
            (0, r.useState)({
              placement: i,
              update: p,
              forceUpdate: m,
              attributes: {},
              styles: { popper: {}, arrow: {} },
            }),
          ),
          g = (0, r.useMemo)(
            () => ({
              name: 'updateStateModifier',
              enabled: !0,
              phase: 'write',
              requires: ['computeStyles'],
              fn: (e) => {
                let { state: t } = e;
                const n = {},
                  r = {};
                (Object.keys(t.elements).forEach((e) => {
                  ((n[e] = t.styles[e]), (r[e] = t.attributes[e]));
                }),
                  v({
                    state: t,
                    styles: n,
                    attributes: r,
                    update: p,
                    forceUpdate: m,
                    placement: t.placement,
                  }));
              },
            }),
            [p, m, v],
          ),
          b = (0, r.useMemo)(
            () => (c(u.current, s) || (u.current = s), u.current),
            [s],
          );
        return (
          (0, r.useEffect)(() => {
            d.current &&
              o &&
              d.current.setOptions({
                placement: i,
                strategy: a,
                modifiers: [...b, g, Ee],
              });
          }, [a, i, g, o, b]),
          (0, r.useEffect)(() => {
            if (o && null != e && null != t)
              return (
                (d.current = Oe(
                  e,
                  t,
                  Object.assign({}, l, {
                    placement: i,
                    strategy: a,
                    modifiers: [...b, Ce, g],
                  }),
                )),
                () => {
                  null != d.current &&
                    (d.current.destroy(),
                    (d.current = void 0),
                    v((e) =>
                      Object.assign({}, e, {
                        attributes: {},
                        styles: { popper: {} },
                      }),
                    ));
                }
              );
          }, [o, e, t]),
          h
        );
      };
      var De = n(2631),
        Ne = n(753),
        Me = n(182),
        Re = n(8894),
        Te = n(6440),
        Le = n.n(Te);
      const Se = () => {};
      const Be = (e) => e && ('current' in e ? e.current : e),
        We = {
          click: 'mousedown',
          mouseup: 'mousedown',
          pointerup: 'pointerdown',
        };
      const Ie = function (e) {
        let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Se,
          { disabled: n, clickTrigger: o = 'click' } =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        const i = (0, r.useRef)(!1),
          a = (0, r.useRef)(!1),
          s = (0, r.useCallback)(
            (t) => {
              const n = Be(e);
              var r;
              (Le()(
                !!n,
                'ClickOutside captured a close event but does not have a ref to compare it to. useClickOutside(), should be passed a ref that resolves to a DOM node',
              ),
                (i.current =
                  !n ||
                  !!((r = t).metaKey || r.altKey || r.ctrlKey || r.shiftKey) ||
                  !(function (e) {
                    return 0 === e.button;
                  })(t) ||
                  !!(0, De.A)(n, t.target) ||
                  a.current),
                (a.current = !1));
            },
            [e],
          ),
          c = (0, Re.A)((t) => {
            const n = Be(e);
            n && (0, De.A)(n, t.target) ? (a.current = !0) : (a.current = !1);
          }),
          l = (0, Re.A)((e) => {
            i.current || t(e);
          });
        (0, r.useEffect)(() => {
          var t, r;
          if (n || null == e) return;
          const i = (0, Me.A)(Be(e)),
            a = i.defaultView || window;
          let f =
              null != (t = a.event)
                ? t
                : null == (r = a.parent)
                  ? void 0
                  : r.event,
            u = null;
          We[o] && (u = (0, Ne.A)(i, We[o], c, !0));
          const d = (0, Ne.A)(i, o, s, !0),
            p = (0, Ne.A)(i, o, (e) => {
              e !== f ? l(e) : (f = void 0);
            });
          let m = [];
          return (
            'ontouchstart' in i.documentElement &&
              (m = [].slice
                .call(i.body.children)
                .map((e) => (0, Ne.A)(e, 'mousemove', Se))),
            () => {
              (null == u || u(), d(), p(), m.forEach((e) => e()));
            }
          );
        }, [e, n, o, s, c, l]);
      };
      function He() {
        let e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return Array.isArray(e)
          ? e
          : Object.keys(e).map((t) => ((e[t].name = t), e[t]));
      }
      function Ue(e) {
        let {
          enabled: t,
          enableEvents: n,
          placement: r,
          flip: o,
          offset: i,
          fixed: a,
          containerPadding: s,
          arrowElement: c,
          popperConfig: l = {},
        } = e;
        var f, u, d, p, m;
        const h = (function (e) {
          const t = {};
          return Array.isArray(e)
            ? (null == e ||
                e.forEach((e) => {
                  t[e.name] = e;
                }),
              t)
            : e || t;
        })(l.modifiers);
        return Object.assign({}, l, {
          placement: r,
          enabled: t,
          strategy: a ? 'fixed' : l.strategy,
          modifiers: He(
            Object.assign({}, h, {
              eventListeners: {
                enabled: n,
                options: null == (f = h.eventListeners) ? void 0 : f.options,
              },
              preventOverflow: Object.assign({}, h.preventOverflow, {
                options: s
                  ? Object.assign(
                      { padding: s },
                      null == (u = h.preventOverflow) ? void 0 : u.options,
                    )
                  : null == (d = h.preventOverflow)
                    ? void 0
                    : d.options,
              }),
              offset: {
                options: Object.assign(
                  { offset: i },
                  null == (p = h.offset) ? void 0 : p.options,
                ),
              },
              arrow: Object.assign({}, h.arrow, {
                enabled: !!c,
                options: Object.assign(
                  {},
                  null == (m = h.arrow) ? void 0 : m.options,
                  { element: c },
                ),
              }),
              flip: Object.assign({ enabled: !!o }, h.flip),
            }),
          ),
        });
      }
      var Ve = n(579);
      const ze = ['children', 'usePopper'];
      const qe = () => {};
      function Fe() {
        let e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        const t = (0, r.useContext)(i.A),
          [n, a] = (0, o.A)(),
          s = (0, r.useRef)(!1),
          {
            flip: c,
            offset: l,
            rootCloseEvent: f,
            fixed: u = !1,
            placement: d,
            popperConfig: p = {},
            enableEventListeners: m = !0,
            usePopper: h = !!t,
          } = e,
          v = null == (null == t ? void 0 : t.show) ? !!e.show : t.show;
        v && !s.current && (s.current = !0);
        const {
            placement: g,
            setMenu: b,
            menuElement: y,
            toggleElement: w,
          } = t || {},
          x = Pe(
            w,
            y,
            Ue({
              placement: d || g || 'bottom-start',
              enabled: h,
              enableEvents: null == m ? v : m,
              offset: l,
              flip: c,
              fixed: u,
              arrowElement: n,
              popperConfig: p,
            }),
          ),
          A = Object.assign(
            { ref: b || qe, 'aria-labelledby': null == w ? void 0 : w.id },
            x.attributes.popper,
            { style: x.styles.popper },
          ),
          O = {
            show: v,
            placement: g,
            hasShown: s.current,
            toggle: null == t ? void 0 : t.toggle,
            popper: h ? x : null,
            arrowProps: h
              ? Object.assign({ ref: a }, x.attributes.arrow, {
                  style: x.styles.arrow,
                })
              : {},
          };
        return (
          Ie(
            y,
            (e) => {
              null == t || t.toggle(!1, e);
            },
            { clickTrigger: f, disabled: !v },
          ),
          [A, O]
        );
      }
      function Ke(e) {
        let { children: t, usePopper: n = !0 } = e,
          r = (function (e, t) {
            if (null == e) return {};
            var n = {};
            for (var r in e)
              if ({}.hasOwnProperty.call(e, r)) {
                if (t.indexOf(r) >= 0) continue;
                n[r] = e[r];
              }
            return n;
          })(e, ze);
        const [o, i] = Fe(Object.assign({}, r, { usePopper: n }));
        return (0, Ve.jsx)(Ve.Fragment, { children: t(o, i) });
      }
      Ke.displayName = 'DropdownMenu';
      const _e = Ke;
    },
    7994: (e, t, n) => {
      n.d(t, { A: () => g });
      var r = n(45),
        o = n(9379),
        i = n(8139),
        a = n.n(i),
        s = n(5043),
        c = n(7852),
        l = n(1068),
        f = n(9334),
        u = n(579);
      const d = ['className', 'bsPrefix', 'as'],
        p = s.forwardRef((e, t) => {
          let { className: n, bsPrefix: i, as: s = 'span' } = e,
            l = (0, r.A)(e, d);
          return (
            (i = (0, c.oU)(i, 'input-group-text')),
            (0, u.jsx)(s, (0, o.A)({ ref: t, className: a()(n, i) }, l))
          );
        });
      p.displayName = 'InputGroupText';
      const m = p,
        h = ['bsPrefix', 'size', 'hasValidation', 'className', 'as'],
        v = s.forwardRef((e, t) => {
          let {
              bsPrefix: n,
              size: i,
              hasValidation: l,
              className: d,
              as: p = 'div',
            } = e,
            m = (0, r.A)(e, h);
          n = (0, c.oU)(n, 'input-group');
          const v = (0, s.useMemo)(() => ({}), []);
          return (0, u.jsx)(f.A.Provider, {
            value: v,
            children: (0, u.jsx)(
              p,
              (0, o.A)(
                (0, o.A)({ ref: t }, m),
                {},
                {
                  className: a()(
                    d,
                    n,
                    i && ''.concat(n, '-').concat(i),
                    l && 'has-validation',
                  ),
                },
              ),
            ),
          });
        });
      v.displayName = 'InputGroup';
      const g = Object.assign(v, {
        Text: m,
        Radio: (e) =>
          (0, u.jsx)(m, {
            children: (0, u.jsx)(l.A, (0, o.A)({ type: 'radio' }, e)),
          }),
        Checkbox: (e) =>
          (0, u.jsx)(m, {
            children: (0, u.jsx)(l.A, (0, o.A)({ type: 'checkbox' }, e)),
          }),
      });
    },
    9334: (e, t, n) => {
      n.d(t, { A: () => o });
      const r = n(5043).createContext(null);
      r.displayName = 'InputGroupContext';
      const o = r;
    },
  },
]);
//# sourceMappingURL=35.a0ef4c92.chunk.js.map
