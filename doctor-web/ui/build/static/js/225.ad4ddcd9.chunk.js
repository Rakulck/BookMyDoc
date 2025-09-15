'use strict';
(self.webpackChunkdoctor_appointment_booking =
  self.webpackChunkdoctor_appointment_booking || []).push([
  [225],
  {
    8225: (e, s, n) => {
      (n.r(s), n.d(s, { default: () => l }));
      var a = n(9379),
        i = n(5043),
        o = n(9369),
        t = n(579);
      const l = () => {
        const [e, s] = (0, i.useState)(!1),
          [n, l] = (0, i.useState)({
            name: '',
            duration: '',
            price: '',
            description: '',
          }),
          { consultations: r, addConsultation: c } = (0, o.M)(),
          d = r,
          u = (e, s) => {
            l((n) => (0, a.A)((0, a.A)({}, n), {}, { [e]: s }));
          };
        return (0, t.jsxs)('div', {
          className: 'services-container',
          children: [
            (0, t.jsxs)('div', {
              className: 'services-header',
              children: [
                (0, t.jsx)('h1', { children: 'Manage Consultation Types' }),
                (0, t.jsx)('p', {
                  children:
                    'Create and manage your consultation offerings for patients',
                }),
                (0, t.jsx)('button', {
                  className: 'create-consultation-btn',
                  onClick: () => {
                    s(!0);
                  },
                  children: '+ Create New Consultation Type',
                }),
              ],
            }),
            (0, t.jsx)('div', {
              className: 'services-grid',
              children: (d || []).map((e) =>
                (0, t.jsxs)(
                  'div',
                  {
                    className: 'service-card '.concat(
                      e.popular ? 'popular' : '',
                    ),
                    children: [
                      e.popular &&
                        (0, t.jsx)('div', {
                          className: 'popular-badge',
                          children: 'Most Popular',
                        }),
                      (0, t.jsxs)('div', {
                        className: 'service-header',
                        children: [
                          (0, t.jsx)('h3', { children: e.name }),
                          (0, t.jsxs)('div', {
                            className: 'service-duration',
                            children: [
                              (0, t.jsxs)('svg', {
                                width: '20',
                                height: '20',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                xmlns: 'http://www.w3.org/2000/svg',
                                children: [
                                  (0, t.jsx)('path', {
                                    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
                                    fill: 'currentColor',
                                  }),
                                  (0, t.jsx)('path', {
                                    d: 'M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
                                    fill: 'currentColor',
                                  }),
                                ],
                              }),
                              (0, t.jsx)('span', { children: e.duration }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsxs)('div', {
                        className: 'service-price',
                        children: [
                          (0, t.jsx)('span', {
                            className: 'currency',
                            children: '\u20b9',
                          }),
                          (0, t.jsx)('span', {
                            className: 'amount',
                            children: e.price,
                          }),
                        ],
                      }),
                      (0, t.jsx)('div', {
                        className: 'service-description',
                        children: (0, t.jsx)('p', { children: e.description }),
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
            e &&
              (0, t.jsx)('div', {
                className: 'booking-modal-overlay',
                children: (0, t.jsxs)('div', {
                  className: 'booking-modal',
                  children: [
                    (0, t.jsxs)('div', {
                      className: 'modal-header',
                      children: [
                        (0, t.jsx)('h3', {
                          children: 'Create New Consultation Type',
                        }),
                        (0, t.jsx)('button', {
                          className: 'close-modal',
                          onClick: () => s(!1),
                          children: '\xd7',
                        }),
                      ],
                    }),
                    (0, t.jsxs)('div', {
                      className: 'modal-content',
                      children: [
                        (0, t.jsxs)('div', {
                          className: 'create-form',
                          children: [
                            (0, t.jsxs)('div', {
                              className: 'form-group',
                              children: [
                                (0, t.jsx)('label', {
                                  htmlFor: 'consultation-name',
                                  children: 'Consultation Name',
                                }),
                                (0, t.jsx)('input', {
                                  id: 'consultation-name',
                                  type: 'text',
                                  placeholder: 'e.g., Quick Consultation',
                                  value: n.name,
                                  onChange: (e) => u('name', e.target.value),
                                }),
                              ],
                            }),
                            (0, t.jsxs)('div', {
                              className: 'form-group',
                              children: [
                                (0, t.jsx)('label', {
                                  htmlFor: 'consultation-duration',
                                  children: 'Duration',
                                }),
                                (0, t.jsx)('input', {
                                  id: 'consultation-duration',
                                  type: 'text',
                                  placeholder: 'e.g., 30 minutes',
                                  value: n.duration,
                                  onChange: (e) =>
                                    u('duration', e.target.value),
                                }),
                              ],
                            }),
                            (0, t.jsxs)('div', {
                              className: 'form-group',
                              children: [
                                (0, t.jsx)('label', {
                                  htmlFor: 'consultation-price',
                                  children: 'Price (\u20b9)',
                                }),
                                (0, t.jsx)('input', {
                                  id: 'consultation-price',
                                  type: 'number',
                                  placeholder: 'e.g., 500',
                                  value: n.price,
                                  onChange: (e) => u('price', e.target.value),
                                }),
                              ],
                            }),
                            (0, t.jsxs)('div', {
                              className: 'form-group',
                              children: [
                                (0, t.jsx)('label', {
                                  htmlFor: 'consultation-description',
                                  children: 'Description (Optional)',
                                }),
                                (0, t.jsx)('textarea', {
                                  id: 'consultation-description',
                                  placeholder:
                                    'Brief description of this consultation type',
                                  value: n.description,
                                  onChange: (e) =>
                                    u('description', e.target.value),
                                  rows: '3',
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)('div', {
                          className: 'modal-actions',
                          children: [
                            (0, t.jsx)('button', {
                              className: 'cancel-btn',
                              onClick: () => s(!1),
                              children: 'Cancel',
                            }),
                            (0, t.jsx)('button', {
                              className: 'confirm-book-btn',
                              onClick: () => {
                                if (n.name && n.duration && n.price) {
                                  const e = {
                                    id: Date.now(),
                                    name: n.name,
                                    duration: n.duration,
                                    price: parseInt(n.price),
                                    description:
                                      n.description ||
                                      'Custom consultation type',
                                    features: [
                                      'Custom consultation',
                                      'Professional medical advice',
                                    ],
                                    isCustom: !0,
                                  };
                                  (c(e),
                                    l({
                                      name: '',
                                      duration: '',
                                      price: '',
                                      description: '',
                                    }),
                                    s(!1),
                                    console.log(
                                      'Created new consultation:',
                                      e,
                                    ));
                                }
                              },
                              disabled: !n.name || !n.duration || !n.price,
                              children: 'Create Consultation',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        });
      };
    },
  },
]);
//# sourceMappingURL=225.ad4ddcd9.chunk.js.map
