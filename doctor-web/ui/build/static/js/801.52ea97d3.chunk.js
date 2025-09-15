'use strict';
(self.webpackChunkdoctor_appointment_booking =
  self.webpackChunkdoctor_appointment_booking || []).push([
  [801],
  {
    1089: (e, t, n) => {
      n.d(t, { I4: () => s, Qj: () => o, fU: () => i, pP: () => a });
      var l = n(9379);
      const i = (e) => {
          if (!e) return '00:00';
          let [t, n] = null === e || void 0 === e ? void 0 : e.split(':');
          const l = t < 12 ? 'AM' : 'PM';
          return (
            (t = t % 12 || 12),
            ''
              .concat(t.toString().padStart(2, '0'), ':')
              .concat(n.toString().padStart(2, '0'), ' ')
              .concat(l)
          );
        },
        s = (e) => {
          const t = new Date(),
            n = new Date(
              Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()),
            );
          return (e = new Date(e)).toISOString() < n.toISOString();
        },
        a = (e) => {
          const t = [],
            n = new Date(0, 0, 0, 0, 'start' === e ? 0 : 30, 0),
            l = new Date(
              0,
              0,
              0,
              'start' === e ? 23 : 24,
              'start' === e ? 30 : 0,
              0,
            );
          for (; n <= l; ) {
            const e = n.getHours() % 12 || 12,
              l = n.getMinutes().toString().padStart(2, '0'),
              i = n.getHours() < 12 ? 'AM' : 'PM';
            (t.push({
              value: ''.concat(n.getHours(), ':').concat(l),
              label: ''
                .concat(e.toString().padStart(2, '0'), ':')
                .concat(l, ' ')
                .concat(i),
            }),
              n.setMinutes(n.getMinutes() + 30));
          }
          return t;
        },
        o = function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          const t = [];
          for (const o of e) {
            var n, s, a;
            if (
              t[
                null === o ||
                void 0 === o ||
                null === (n = o.day) ||
                void 0 === n
                  ? void 0
                  : n.toLowerCase()
              ]
            )
              t[
                null === o ||
                void 0 === o ||
                null === (s = o.day) ||
                void 0 === s
                  ? void 0
                  : s.toLowerCase()
              ].timeSlots.push(
                (0, l.A)(
                  (0, l.A)({}, o),
                  {},
                  {
                    start: {
                      value: null === o || void 0 === o ? void 0 : o.start_time,
                      label: i(
                        null === o || void 0 === o ? void 0 : o.start_time,
                      ),
                    },
                    end: {
                      value: null === o || void 0 === o ? void 0 : o.end_time,
                      label: i(
                        null === o || void 0 === o ? void 0 : o.end_time,
                      ),
                    },
                  },
                ),
              );
            else
              t[
                null === o ||
                void 0 === o ||
                null === (a = o.day) ||
                void 0 === a
                  ? void 0
                  : a.toLowerCase()
              ] = {
                enabled: !0,
                day: null === o || void 0 === o ? void 0 : o.day,
                timeSlots: [
                  (0, l.A)(
                    (0, l.A)({}, o),
                    {},
                    {
                      start: {
                        value:
                          null === o || void 0 === o ? void 0 : o.start_time,
                        label: i(
                          null === o || void 0 === o ? void 0 : o.start_time,
                        ),
                      },
                      end: {
                        value: null === o || void 0 === o ? void 0 : o.end_time,
                        label: i(
                          null === o || void 0 === o ? void 0 : o.end_time,
                        ),
                      },
                    },
                  ),
                ],
              };
          }
          return t;
        };
    },
    1801: (e, t, n) => {
      (n.r(t), n.d(t, { default: () => N }));
      var l = n(9379),
        i = n(5043),
        s = (n(8421), n(8628)),
        a = n(4282),
        o = n(6522),
        d = n(1072),
        r = n(8602),
        c = n(7994),
        v = n(3688),
        m = n(1467),
        u = n(3401),
        h = n(3204),
        A = n(4749),
        p = n(1685),
        x = n(6867),
        g = n(7044),
        j = n(1089),
        y = n(579);
      const b = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        S = {
          start_time: '09:00',
          start: { value: '09:00', label: '09:00 AM' },
          end_time: '17:00',
          end: { value: '17:00', label: '05:00 PM' },
        },
        w = (0, j.pP)('start'),
        f = (0, j.pP)('end'),
        N = () => {
          const { data: e, isLoading: t, isError: n } = (0, A.eI)({}),
            [N, C] = (0, A.Ce)(),
            [_, k] = (0, i.useState)(() =>
              b.reduce(
                (e, t) => (
                  (e[t.toLowerCase()] = {
                    day: t,
                    enabled: !1,
                    timeSlots: [(0, l.A)({ day: t.toLowerCase() }, S)],
                  }),
                  e
                ),
                {},
              ),
            );
          (0, i.useEffect)(() => {
            if (e && !n) {
              const t = (0, j.Qj)(e);
              k((e) => (0, l.A)((0, l.A)({}, e), t));
            }
          }, [e, n]);
          const M = (e, t, n, i) => {
            const s = JSON.parse(i);
            k((i) => {
              var a, o, d, r;
              const c = (0, l.A)({}, i);
              ((c[e].timeSlots[t][n] = s),
                (c[e].timeSlots[t][n + '_time'] = s.value));
              const v =
                null === (a = c[e].timeSlots[t].start_time) || void 0 === a
                  ? void 0
                  : a.split(':');
              let m = 'end' === n && '0:00' === s.value ? '24:00' : s.value;
              m = null === (o = m) || void 0 === o ? void 0 : o.split(':');
              const u =
                new Date(
                  0,
                  0,
                  0,
                  null === (d = m) || void 0 === d ? void 0 : d[0],
                  +(null === (r = m) || void 0 === r ? void 0 : r[1]),
                ) -
                new Date(
                  0,
                  0,
                  0,
                  null === v || void 0 === v ? void 0 : v[0],
                  null === v || void 0 === v ? void 0 : v[1],
                );
              return 'end' === n && u < 0
                ? ((0, g.FH)({
                    title: 'Invalid time slot. Please select correct time',
                    message:
                      "You can't select end time smaller than start time and cross the day.",
                    options: { type: 'danger' },
                  }),
                  i)
                : c;
            });
          };
          return (0, y.jsx)('div', {
            id: 'availability',
            children: (0, y.jsxs)('div', {
              className:
                'container mt-3 d-flex justify-content-center align-items-center',
              children: [
                (0, y.jsx)(p.A, { loading: t }),
                (0, y.jsx)(u.N9, {}),
                (0, y.jsxs)(s.A, {
                  className: 'shadow-sm p-3',
                  style: { width: '100%', maxWidth: '700px' },
                  children: [
                    (0, y.jsxs)('div', {
                      className:
                        'd-flex justify-content-between align-items-center mb-3',
                      children: [
                        (0, y.jsx)('h1', {
                          className: 'text-center mb-0',
                          children: 'Schedule',
                        }),
                        (0, y.jsx)(a.A, {
                          variant: 'primary',
                          onClick: () => {
                            const e = [],
                              t = (0, l.A)({}, _);
                            for (const n in t) {
                              const l = t[n];
                              null !== l &&
                                void 0 !== l &&
                                l.enabled &&
                                e.push(...l.timeSlots);
                            }
                            N(e);
                          },
                          disabled:
                            null === C || void 0 === C ? void 0 : C.isLoading,
                          children: (0, y.jsx)(x.A, {
                            loading:
                              null === C || void 0 === C ? void 0 : C.isLoading,
                            children: 'Save',
                          }),
                        }),
                      ],
                    }),
                    (0, y.jsx)(o.A, {
                      children: Object.keys(_).map((e, t) => {
                        const n = _[e];
                        return (0, y.jsxs)(
                          d.A,
                          {
                            className: 'day-container mb-2 align-items-center',
                            children: [
                              (0, y.jsx)(r.A, {
                                xs: 12,
                                sm: 3,
                                className:
                                  'd-flex align-items-center mb-2 mb-sm-0',
                                children: (0, y.jsx)(o.A.Check, {
                                  type: 'switch',
                                  id: 'switch-'.concat(n.day),
                                  label: n.day,
                                  checked: n.enabled,
                                  onChange: () =>
                                    ((e) => {
                                      k((t) =>
                                        (0, l.A)(
                                          (0, l.A)({}, t),
                                          {},
                                          {
                                            [e]: (0, l.A)(
                                              (0, l.A)({}, t[e]),
                                              {},
                                              { enabled: !t[e].enabled },
                                            ),
                                          },
                                        ),
                                      );
                                    })(e),
                                  className: 'day-switch custom-switch',
                                  style: { textTransform: 'capitalize' },
                                }),
                              }),
                              (0, y.jsx)(r.A, {
                                xs: 12,
                                sm: 9,
                                children:
                                  n.enabled &&
                                  (0, y.jsxs)('div', {
                                    className: 'time-slots-container',
                                    children: [
                                      n.timeSlots.map((n, i) => {
                                        var s, o;
                                        return (0, y.jsxs)(
                                          c.A,
                                          {
                                            className:
                                              'mb-2 align-items-center',
                                            size: 'sm',
                                            children: [
                                              (0, y.jsx)(v.A, {
                                                as: c.A.Prepend,
                                                variant: 'outline-secondary',
                                                title:
                                                  null === (s = n.start) ||
                                                  void 0 === s
                                                    ? void 0
                                                    : s.label,
                                                id: 'dropdown-start-'
                                                  .concat(t, '-')
                                                  .concat(i),
                                                className: 'time-dropdown',
                                                size: 'sm',
                                                onSelect: (t) =>
                                                  M(e, i, 'start', t),
                                                children: (0, y.jsx)('div', {
                                                  className:
                                                    'dropdown-scrollable',
                                                  children: w.map((e, t) =>
                                                    (0, y.jsx)(
                                                      m.A.Item,
                                                      {
                                                        eventKey:
                                                          JSON.stringify(e),
                                                        children:
                                                          null === e ||
                                                          void 0 === e
                                                            ? void 0
                                                            : e.label,
                                                      },
                                                      t,
                                                    ),
                                                  ),
                                                }),
                                              }),
                                              (0, y.jsx)(c.A.Text, {
                                                children: '-',
                                              }),
                                              (0, y.jsx)(v.A, {
                                                as: c.A.Append,
                                                variant: 'outline-secondary',
                                                title:
                                                  null === (o = n.end) ||
                                                  void 0 === o
                                                    ? void 0
                                                    : o.label,
                                                id: 'dropdown-end-'
                                                  .concat(t, '-')
                                                  .concat(i),
                                                className: 'time-dropdown',
                                                size: 'sm',
                                                onSelect: (t) =>
                                                  M(e, i, 'end', t),
                                                children: (0, y.jsx)('div', {
                                                  className:
                                                    'dropdown-scrollable',
                                                  children: f.map((e, t) =>
                                                    (0, y.jsx)(
                                                      m.A.Item,
                                                      {
                                                        eventKey:
                                                          JSON.stringify(e),
                                                        children:
                                                          null === e ||
                                                          void 0 === e
                                                            ? void 0
                                                            : e.label,
                                                      },
                                                      t,
                                                    ),
                                                  ),
                                                }),
                                              }),
                                              (0, y.jsx)(a.A, {
                                                variant: 'outline-secondary',
                                                onClick: () =>
                                                  ((e, t) => {
                                                    k((n) => {
                                                      const i = (0, l.A)({}, n),
                                                        s = (0, l.A)(
                                                          {},
                                                          i[e].timeSlots[t],
                                                        );
                                                      return (
                                                        i[e].timeSlots.splice(
                                                          t + 1,
                                                          0,
                                                          s,
                                                        ),
                                                        i
                                                      );
                                                    });
                                                  })(e, i),
                                                size: 'sm',
                                                className: 'ms-1',
                                                children: (0, y.jsx)(h.LF8, {}),
                                              }),
                                              (0, y.jsx)(a.A, {
                                                variant: 'outline-danger',
                                                onClick: () =>
                                                  ((e, t) => {
                                                    k((n) => {
                                                      var i;
                                                      const s = (0, l.A)({}, n);
                                                      return (
                                                        s[e].timeSlots.splice(
                                                          t,
                                                          1,
                                                        ),
                                                        (null ===
                                                          (i =
                                                            s[e].timeSlots) ||
                                                        void 0 === i
                                                          ? void 0
                                                          : i.length) <= 0 &&
                                                          (s[e].enabled = !1),
                                                        s
                                                      );
                                                    });
                                                  })(e, i),
                                                size: 'sm',
                                                className: 'ms-1',
                                                children: (0, y.jsx)(h.qbC, {}),
                                              }),
                                            ],
                                          },
                                          i,
                                        );
                                      }),
                                      (0, y.jsxs)(a.A, {
                                        variant: 'outline-primary',
                                        onClick: () =>
                                          ((e) => {
                                            k((t) =>
                                              (0, l.A)(
                                                (0, l.A)({}, t),
                                                {},
                                                {
                                                  [e]: (0, l.A)(
                                                    (0, l.A)({}, t[e]),
                                                    {},
                                                    {
                                                      timeSlots: [
                                                        ...t[e].timeSlots,
                                                        (0, l.A)(
                                                          (0, l.A)({}, S),
                                                          {},
                                                          { day: e },
                                                        ),
                                                      ],
                                                    },
                                                  ),
                                                },
                                              ),
                                            );
                                          })(e),
                                        size: 'sm',
                                        children: [
                                          (0, y.jsx)(h.OiG, {
                                            className: 'me-1',
                                          }),
                                          ' Add Slot',
                                        ],
                                      }),
                                    ],
                                  }),
                              }),
                            ],
                          },
                          n.day,
                        );
                      }),
                    }),
                  ],
                }),
              ],
            }),
          });
        };
    },
    6867: (e, t, n) => {
      n.d(t, { A: () => a });
      var l = n(9379),
        i = n(4201),
        s = n(579);
      function a(e) {
        return null !== e && void 0 !== e && e.children
          ? (0, s.jsxs)('div', {
              className:
                'd-flex flex-col justify-content-center align-items-center gap-1',
              children: [
                (0, s.jsx)(i.A, (0, l.A)({ height: 25, color: '#18A0FB' }, e)),
                (0, s.jsx)('strong', {
                  children: null === e || void 0 === e ? void 0 : e.children,
                }),
              ],
            })
          : (0, s.jsx)(i.A, (0, l.A)({ height: 25, color: '#18A0FB' }, e));
      }
    },
  },
]);
//# sourceMappingURL=801.52ea97d3.chunk.js.map
