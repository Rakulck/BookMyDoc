import React, { useEffect, useState } from 'react';
import { Container, Nav, Tab, Card, Row, Col } from 'react-bootstrap';
import './Bookings.css';
import { ToastContainer } from 'react-toastify';
import BookingCard from './BookingCard';
import Loader from './../common/Loader';
import { useGetBookingsQuery } from './../../store/slices';

const Bookings = () => {
  const [key, setKey] = useState('upcoming');
  const [bookings, setBookings] = useState({
    upcoming: [],
    pending: [],
    completed: [],
    canceled: [],
  });
  const { data, isLoading, isFetching } = useGetBookingsQuery({});

  useEffect(() => {
    if (data) {
      const upcoming = data.filter((item) => item?.status === 'confirmed');
      const pending = data.filter((item) => item?.status === 'pending');
      const completed = data.filter((item) => item?.status === 'completed');
      const canceled = data.filter((item) => item?.status === 'canceled');
      setBookings({
        upcoming,
        pending,
        completed,
        canceled,
      });
    }
  }, [data]);

  return (
    <div id="booking">
      <Container className="container mt-4 d-flex flex-column justify-content-center align-items-center">
        <ToastContainer />
        <Loader loading={isLoading || isFetching} />
        <Row className="justify-content-center" style={{ width: '100%' }}>
          <Col xs={6}>
            <h1 className="mb-4">Bookings</h1>
            <p>
              See upcoming and past events booked through your event type links.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ width: '100%' }}>
          <Col xs={8}>
            <Tab.Container
              id="bookings-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="upcoming">
                    Upcoming ({bookings?.upcoming?.length})
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="unconfirmed">
                    Unconfirmed ({bookings?.pending?.length})
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="past">
                    Past / Completed ({bookings?.completed?.length})
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="canceled">
                    Canceled ({bookings?.canceled?.length})
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="upcoming">
                  {bookings?.upcoming?.length > 0 ? (
                    bookings?.upcoming.map((booking) => (
                      <BookingCard key={booking.booking_id} booking={booking} />
                    ))
                  ) : (
                    <NoBookingsMessage title="upcoming" />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="unconfirmed">
                  {bookings?.pending?.length > 0 ? (
                    bookings?.pending.map((booking) => (
                      <BookingCard key={booking.booking_id} booking={booking} />
                    ))
                  ) : (
                    <NoBookingsMessage title="unconfirmed" />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="past">
                  {bookings?.completed?.length > 0 ? (
                    bookings?.completed.map((booking) => (
                      <BookingCard key={booking.booking_id} booking={booking} />
                    ))
                  ) : (
                    <NoBookingsMessage title="completed" />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="canceled">
                  {bookings?.canceled?.length > 0 ? (
                    bookings?.canceled.map((booking) => (
                      <BookingCard key={booking.booking_id} booking={booking} />
                    ))
                  ) : (
                    <NoBookingsMessage title="canceled" />
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const NoBookingsMessage = ({ title }) => (
  <Card
    className="text-center p-4"
    style={{ minHeight: '300px', minWidth: '400px' }}
  >
    <Card.Body>
      <Card.Title>No {title} bookings</Card.Title>
      <Card.Text>
        You have no {title} bookings. As soon as someone books a time with you
        it will show up here.
      </Card.Text>
    </Card.Body>
  </Card>
);

export default Bookings;
