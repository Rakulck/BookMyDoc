'use strict';
(self.webpackChunkdoctor_appointment_booking =
  self.webpackChunkdoctor_appointment_booking || []).push([
  [725],
  {
    5725: (s, e, a) => {
      (a.r(e), a.d(e, { default: () => p }));
      var n = a(5043),
        t = a(3003),
        i = a(1462),
        l = a(7753),
        c = a(1660),
        o = a(2080),
        d = a(9369),
        r = a(6867),
        h = a(7514),
        m = a(579);
      const p = () => {
        const s = (0, t.wA)(),
          {
            user: e,
            isAuthenticated: a,
            loading: p,
          } = (0, t.d4)((s) => s.auth),
          { consultations: x } = (0, d.M)();
        (0, n.useEffect)(() => {
          a && !e && s((0, c.l2)());
        }, [s, a, e]);
        const { data: j, isLoading: u } = (0, i.aE)({
            status: 'all',
            limit: 10,
          }),
          { data: v, isLoading: g } = (0, l.eI)({}),
          N = j || [],
          f = v || [],
          D = (() => {
            const s = new Date(),
              e = new Date(s.setHours(0, 0, 0, 0)),
              a = new Date(s.setHours(23, 59, 59, 999)),
              n = N.filter((s) => {
                const n = new Date(s.appointmentDate);
                return n >= e && n <= a;
              }),
              t = N.filter((s) => 'confirmed' === s.status),
              i = N.filter((s) => 'pending' === s.status),
              l = N.filter((s) => 'completed' === s.status);
            return {
              totalBookings: N.length,
              todayBookings: n.length,
              confirmedBookings: t.length,
              pendingBookings: i.length,
              completedBookings: l.length,
              availableSlots: f.length,
            };
          })(),
          A = N.sort(
            (s, e) => new Date(e.createdAt) - new Date(s.createdAt),
          ).slice(0, 5),
          w = N.filter(
            (s) =>
              new Date(s.appointmentDate) > new Date() &&
              'confirmed' === s.status,
          )
            .sort(
              (s, e) =>
                new Date(s.appointmentDate) - new Date(e.appointmentDate),
            )
            .slice(0, 3),
          b = (s) =>
            new Date(s).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
          k = (s) =>
            new Date(s).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          y = (s) => {
            switch (s) {
              case 'confirmed':
                return 'badge-success';
              case 'pending':
                return 'badge-warning';
              case 'completed':
                return 'badge-info';
              case 'cancelled':
                return 'badge-danger';
              default:
                return 'badge-secondary';
            }
          };
        return a
          ? u || g || p
            ? (0, m.jsx)(r.A, {})
            : (0, m.jsxs)('div', {
                className: 'dashboard-container',
                children: [
                  (0, m.jsxs)('div', {
                    className: 'welcome-section',
                    children: [
                      (0, m.jsxs)('div', {
                        className: 'welcome-content',
                        children: [
                          (0, m.jsxs)('h1', {
                            children: [
                              'Welcome back, Dr.',
                              ' ',
                              (null === e || void 0 === e
                                ? void 0
                                : e.display_name) ||
                                (null === e || void 0 === e
                                  ? void 0
                                  : e.firstName) ||
                                'Doctor',
                              '!',
                            ],
                          }),
                          (0, m.jsx)('p', {
                            className: 'welcome-subtitle',
                            children:
                              "Here's what's happening with your practice today",
                          }),
                        ],
                      }),
                      (0, m.jsx)('div', {
                        className: 'welcome-date',
                        children: (0, m.jsx)('span', {
                          children: new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }),
                        }),
                      }),
                    ],
                  }),
                  (0, m.jsxs)('div', {
                    className: 'stats-grid',
                    children: [
                      (0, m.jsxs)('div', {
                        className: 'stat-card stat-card-success',
                        children: [
                          (0, m.jsx)('div', {
                            className: 'stat-icon',
                            children: (0, m.jsx)('i', {
                              className: 'fas fa-calendar-alt',
                            }),
                          }),
                          (0, m.jsxs)('div', {
                            className: 'stat-content',
                            children: [
                              (0, m.jsx)('h3', { children: D.totalBookings }),
                              (0, m.jsx)('p', { children: 'Total Bookings' }),
                            ],
                          }),
                        ],
                      }),
                      (0, m.jsxs)('div', {
                        className: 'stat-card stat-card-primary',
                        children: [
                          (0, m.jsx)('div', {
                            className: 'stat-icon',
                            children: (0, m.jsx)('i', {
                              className: 'fas fa-calendar-check',
                            }),
                          }),
                          (0, m.jsxs)('div', {
                            className: 'stat-content',
                            children: [
                              (0, m.jsx)('h3', { children: D.todayBookings }),
                              (0, m.jsx)('p', {
                                children: "Today's Appointments",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, m.jsxs)('div', {
                        className: 'stat-card stat-card-warning',
                        children: [
                          (0, m.jsx)('div', {
                            className: 'stat-icon',
                            children: (0, m.jsx)('i', {
                              className: 'fas fa-clock',
                            }),
                          }),
                          (0, m.jsxs)('div', {
                            className: 'stat-content',
                            children: [
                              (0, m.jsx)('h3', { children: D.pendingBookings }),
                              (0, m.jsx)('p', { children: 'Pending Approval' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, m.jsxs)('div', {
                    className: 'dashboard-grid',
                    children: [
                      (0, m.jsxs)('div', {
                        className: 'dashboard-card',
                        children: [
                          (0, m.jsxs)('div', {
                            className: 'card-header',
                            children: [
                              (0, m.jsx)('h3', {
                                children: 'Upcoming Appointments',
                              }),
                              (0, m.jsx)('span', {
                                className: 'card-count',
                                children: w.length,
                              }),
                            ],
                          }),
                          (0, m.jsx)('div', {
                            className: 'card-content',
                            children:
                              w.length > 0
                                ? (0, m.jsx)('div', {
                                    className: 'appointments-list',
                                    children: w.map((s) =>
                                      (0, m.jsxs)(
                                        'div',
                                        {
                                          className: 'appointment-item',
                                          children: [
                                            (0, m.jsxs)('div', {
                                              className: 'appointment-time',
                                              children: [
                                                (0, m.jsx)('span', {
                                                  className: 'time',
                                                  children: k(
                                                    s.appointmentDate,
                                                  ),
                                                }),
                                                (0, m.jsx)('span', {
                                                  className: 'date',
                                                  children: b(
                                                    s.appointmentDate,
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, m.jsxs)('div', {
                                              className: 'appointment-details',
                                              children: [
                                                (0, m.jsx)('h4', {
                                                  children:
                                                    s.patientName || 'Patient',
                                                }),
                                                (0, m.jsx)('p', {
                                                  children:
                                                    s.service ||
                                                    'General Consultation',
                                                }),
                                              ],
                                            }),
                                            (0, m.jsx)('div', {
                                              className: 'appointment-status',
                                              children: (0, m.jsx)('span', {
                                                className:
                                                  'status-badge '.concat(
                                                    y(s.status),
                                                  ),
                                                children: s.status,
                                              }),
                                            }),
                                          ],
                                        },
                                        s.id,
                                      ),
                                    ),
                                  })
                                : (0, m.jsxs)('div', {
                                    className: 'empty-state',
                                    children: [
                                      (0, m.jsx)('i', {
                                        className: 'fas fa-calendar-times',
                                      }),
                                      (0, m.jsx)('p', {
                                        children: 'No upcoming appointments',
                                      }),
                                    ],
                                  }),
                          }),
                        ],
                      }),
                      (0, m.jsxs)('div', {
                        className: 'dashboard-card',
                        children: [
                          (0, m.jsxs)('div', {
                            className: 'card-header',
                            children: [
                              (0, m.jsx)('h3', { children: 'Recent Bookings' }),
                              (0, m.jsx)('span', {
                                className: 'card-count',
                                children: A.length,
                              }),
                            ],
                          }),
                          (0, m.jsx)('div', {
                            className: 'card-content',
                            children:
                              A.length > 0
                                ? (0, m.jsx)('div', {
                                    className: 'bookings-list',
                                    children: A.map((s) =>
                                      (0, m.jsxs)(
                                        'div',
                                        {
                                          className: 'booking-item',
                                          children: [
                                            (0, m.jsxs)('div', {
                                              className: 'booking-info',
                                              children: [
                                                (0, m.jsx)('h4', {
                                                  children:
                                                    s.patientName || 'Patient',
                                                }),
                                                (0, m.jsxs)('p', {
                                                  children: [
                                                    b(s.appointmentDate),
                                                    ' at',
                                                    ' ',
                                                    k(s.appointmentDate),
                                                  ],
                                                }),
                                                (0, m.jsx)('span', {
                                                  className: 'booking-service',
                                                  children:
                                                    s.service ||
                                                    'General Consultation',
                                                }),
                                              ],
                                            }),
                                            (0, m.jsx)('div', {
                                              className: 'booking-status',
                                              children: (0, m.jsx)('span', {
                                                className:
                                                  'status-badge '.concat(
                                                    y(s.status),
                                                  ),
                                                children: s.status,
                                              }),
                                            }),
                                          ],
                                        },
                                        s.id,
                                      ),
                                    ),
                                  })
                                : (0, m.jsxs)('div', {
                                    className: 'empty-state',
                                    children: [
                                      (0, m.jsx)('i', {
                                        className: 'fas fa-inbox',
                                      }),
                                      (0, m.jsx)('p', {
                                        children: 'No recent bookings',
                                      }),
                                    ],
                                  }),
                          }),
                        ],
                      }),
                      (0, m.jsxs)('div', {
                        className: 'dashboard-card doctor-profile-card',
                        children: [
                          (0, m.jsx)('div', {
                            className: 'card-header',
                            children: (0, m.jsx)('h3', {
                              children: 'Profile Overview',
                            }),
                          }),
                          (0, m.jsx)('div', {
                            className: 'card-content',
                            children: (0, m.jsxs)('div', {
                              className: 'doctor-info',
                              children: [
                                (0, m.jsxs)('div', {
                                  className: 'doctor-avatar',
                                  children: [
                                    (0, m.jsx)('img', {
                                      src: (() => {
                                        if (
                                          (console.log(
                                            '\ud83d\uddbc\ufe0f [DASHBOARD] User object:',
                                            e,
                                          ),
                                          console.log(
                                            '\ud83d\uddbc\ufe0f [DASHBOARD] PhotoUrl field:',
                                            null === e || void 0 === e
                                              ? void 0
                                              : e.photoUrl,
                                          ),
                                          console.log(
                                            '\ud83d\uddbc\ufe0f [DASHBOARD] API Base URL:',
                                            o.J,
                                          ),
                                          null !== e &&
                                            void 0 !== e &&
                                            e.photoUrl)
                                        ) {
                                          if (e.photoUrl.startsWith('http'))
                                            return (
                                              console.log(
                                                '\ud83d\uddbc\ufe0f [DASHBOARD] Using full URL:',
                                                e.photoUrl,
                                              ),
                                              e.photoUrl
                                            );
                                          const s = e.photoUrl.startsWith('/')
                                              ? e.photoUrl.substring(1)
                                              : e.photoUrl,
                                            a = ''.concat(o.J).concat(s);
                                          return (
                                            console.log(
                                              '\ud83d\uddbc\ufe0f [DASHBOARD] Constructed image URL:',
                                              a,
                                            ),
                                            a
                                          );
                                        }
                                        return (
                                          console.log(
                                            '\ud83d\uddbc\ufe0f [DASHBOARD] No photoUrl found, using placeholder',
                                          ),
                                          '/placeholder.png'
                                        );
                                      })(),
                                      alt: 'Doctor Avatar',
                                      onError: (s) => {
                                        (console.log(
                                          '\ud83d\uddbc\ufe0f [DASHBOARD] Image failed to load, using placeholder',
                                        ),
                                          console.log(
                                            '\ud83d\uddbc\ufe0f [DASHBOARD] Failed URL was:',
                                            s.target.src,
                                          ),
                                          (s.target.src = '/placeholder.png'));
                                      },
                                      onLoad: () => {
                                        console.log(
                                          '\ud83d\uddbc\ufe0f [DASHBOARD] Image loaded successfully',
                                        );
                                      },
                                    }),
                                    (0, m.jsx)('div', {
                                      className: 'avatar-status',
                                      children: (0, m.jsx)('i', {
                                        className: 'fas fa-circle',
                                      }),
                                    }),
                                  ],
                                }),
                                (0, m.jsxs)('div', {
                                  className: 'doctor-details',
                                  children: [
                                    (0, m.jsxs)('h4', {
                                      children: [
                                        'Dr.',
                                        ' ',
                                        (null === e || void 0 === e
                                          ? void 0
                                          : e.display_name) ||
                                          ''
                                            .concat(
                                              null === e || void 0 === e
                                                ? void 0
                                                : e.firstName,
                                              ' ',
                                            )
                                            .concat(
                                              null === e || void 0 === e
                                                ? void 0
                                                : e.lastName,
                                            ) ||
                                          'Doctor',
                                      ],
                                    }),
                                    (0, m.jsx)('p', {
                                      className: 'doctor-specialty',
                                      children:
                                        (null === e || void 0 === e
                                          ? void 0
                                          : e.title) ||
                                        (null === e || void 0 === e
                                          ? void 0
                                          : e.specialty) ||
                                        'General Medicine',
                                    }),
                                    (0, m.jsxs)('div', {
                                      className: 'doctor-contact',
                                      children: [
                                        (0, m.jsxs)('div', {
                                          className: 'contact-item',
                                          children: [
                                            (0, m.jsx)('i', {
                                              className: 'fas fa-envelope',
                                            }),
                                            (0, m.jsx)('span', {
                                              children:
                                                null === e || void 0 === e
                                                  ? void 0
                                                  : e.email,
                                            }),
                                          ],
                                        }),
                                        (0, m.jsxs)('div', {
                                          className: 'contact-item',
                                          children: [
                                            (0, m.jsx)('i', {
                                              className: 'fas fa-phone',
                                            }),
                                            (0, m.jsx)('span', {
                                              children:
                                                (null === e || void 0 === e
                                                  ? void 0
                                                  : e.phone) ||
                                                'Phone not provided',
                                            }),
                                          ],
                                        }),
                                        (null === e || void 0 === e
                                          ? void 0
                                          : e.address) &&
                                          (0, m.jsxs)('div', {
                                            className: 'contact-item',
                                            children: [
                                              (0, m.jsx)('i', {
                                                className:
                                                  'fas fa-map-marker-alt',
                                              }),
                                              (0, m.jsx)('span', {
                                                children: e.address,
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    (0, m.jsx)('div', {
                                      className: 'doctor-consultations',
                                      children: (0, m.jsx)(h.A, {
                                        consultations: x,
                                        maxItems: 3,
                                        showTitle: !0,
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              })
          : (0, m.jsx)('div', {
              children: 'Please log in to view the dashboard',
            });
      };
    },
    6867: (s, e, a) => {
      a.d(e, { A: () => l });
      var n = a(9379),
        t = a(4201),
        i = a(579);
      function l(s) {
        return null !== s && void 0 !== s && s.children
          ? (0, i.jsxs)('div', {
              className:
                'd-flex flex-col justify-content-center align-items-center gap-1',
              children: [
                (0, i.jsx)(t.A, (0, n.A)({ height: 25, color: '#18A0FB' }, s)),
                (0, i.jsx)('strong', {
                  children: null === s || void 0 === s ? void 0 : s.children,
                }),
              ],
            })
          : (0, i.jsx)(t.A, (0, n.A)({ height: 25, color: '#18A0FB' }, s));
      }
    },
    7514: (s, e, a) => {
      a.d(e, { A: () => t });
      a(5043);
      var n = a(579);
      const t = (s) => {
        let { consultations: e, showTitle: a = !0, maxItems: t = null } = s;
        const i = t ? e.slice(0, t) : e;
        return (0, n.jsxs)('div', {
          className: 'consultation-list-container',
          children: [
            a && (0, n.jsx)('h5', { children: 'Consultation Services' }),
            (0, n.jsx)('div', {
              className: 'consultations-wrapper',
              children:
                i && i.length > 0
                  ? i.map((s) =>
                      (0, n.jsx)(
                        'div',
                        {
                          className: 'consultation-item',
                          children: (0, n.jsxs)('div', {
                            className: 'consultation-info',
                            children: [
                              (0, n.jsx)('h6', {
                                className: 'consultation-name',
                                children: s.name,
                              }),
                              (0, n.jsxs)('div', {
                                className: 'consultation-details',
                                children: [
                                  (0, n.jsxs)('span', {
                                    className: 'consultation-duration',
                                    children: [
                                      (0, n.jsxs)('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        children: [
                                          (0, n.jsx)('path', {
                                            d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
                                            fill: 'currentColor',
                                          }),
                                          (0, n.jsx)('path', {
                                            d: 'M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
                                            fill: 'currentColor',
                                          }),
                                        ],
                                      }),
                                      s.duration,
                                    ],
                                  }),
                                  (0, n.jsxs)('span', {
                                    className: 'consultation-price',
                                    children: ['\u20b9', s.price],
                                  }),
                                ],
                              }),
                              s.description &&
                                (0, n.jsx)('p', {
                                  className: 'consultation-description',
                                  children: s.description,
                                }),
                            ],
                          }),
                        },
                        s.id,
                      ),
                    )
                  : (0, n.jsxs)('div', {
                      className: 'empty-consultations',
                      children: [
                        (0, n.jsx)('p', {
                          children: 'No consultation services created yet.',
                        }),
                        (0, n.jsx)('small', {
                          children:
                            'Create your first consultation service to get started.',
                        }),
                      ],
                    }),
            }),
            e.length > t &&
              t &&
              (0, n.jsx)('div', {
                className: 'more-consultations',
                children: (0, n.jsxs)('small', {
                  children: ['+', e.length - t, ' more services'],
                }),
              }),
          ],
        });
      };
    },
  },
]);
//# sourceMappingURL=725.f45167ab.chunk.js.map
