import React, { useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import './Bookings.css';
import { CURRENCY_SYMBOL } from './../../types/const';
import ConfirmModal from '../common/ConfirmModal';
import Loading from './../common/Loading';
import Reschedule from './Reschedule';
import { useUpdateBookingMutation } from './../../store/slices';
import { formatTime, isExpireDate } from './../../lib/utils';

const BookingCard = ({ booking }) => {
  const [updateBooking, updateBookingResult] = useUpdateBookingMutation();
  const [confirmModal, setConfirmModal] = useState({
    title: '',
    open: false,
    action: '',
  });

  const handleBooking = (status) => {
    const payload = {
      id: booking?.booking_id,
      data: {
        status,
      },
    };
    updateBooking(payload);
    setConfirmModal((state) => ({ ...state, open: false }));
  };

  const RenderActions = () => {
    let buttonAction = null;
    switch (booking?.status) {
      case 'pending':
        if (isExpireDate(booking?.date)) {
          buttonAction = (
            <Button
              variant="primary"
              className="ms-2"
              size="sm"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Reschedule Booking',
                  children: 'Are you sure want to reschedule this booking?',
                  confirmButton: 'Yes, Reschedule',
                  onConfirm: () =>
                    setConfirmModal({ open: false, action: 'reschedule' }),
                })
              }
            >
              <Loading
                loading={
                  updateBookingResult?.isLoading &&
                  setConfirmModal?.action === 'reschedule'
                }
              >
                Reschedule
              </Loading>
            </Button>
          );
        } else {
          buttonAction = (
            <Button
              variant="primary"
              className="ms-2"
              size="sm"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Confirm Booking',
                  body: 'Are you sure want to confirm this booking?',
                  confirmButton: 'Yes, Confirm',
                  onConfirm: () => handleBooking('confirmed'),
                  action: 'confirmed',
                })
              }
            >
              <Loading
                loading={
                  updateBookingResult?.isLoading &&
                  confirmModal?.action === 'confirmed'
                }
              >
                Confirm
              </Loading>
            </Button>
          );
        }
        break;
      case 'confirmed':
        const isDatePassed = isExpireDate(booking?.date);
        buttonAction = (
          <>
            <Button
              variant="primary"
              className={isDatePassed ? `ms-2 mb-2`: 'ms-2'}
              size="sm"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Reschedule Booking',
                  confirmButton: 'Yes, Reschedule',
                  children: 'Are you sure want to reschedule this booking?',
                  onConfirm: () =>
                    setConfirmModal({ open: false, action: 'reschedule' }),
                })
              }
            >
              <Loading
                loading={
                  updateBookingResult?.isLoading &&
                  confirmModal?.action === 'reschedule'
                }
              >
                Reschedule
              </Loading>
            </Button>
            {isDatePassed && <Button
              variant="primary"
              className="ms-2 mb-2"
              size="sm"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Completed Booking',
                  confirmButton: 'Yes, Completed',
                  children: 'Are you sure want to completed this booking?',
                  onConfirm: () => handleBooking('completed'),
                  action: 'completed',
                })
              }
            >
              <Loading
                loading={
                  updateBookingResult?.isLoading &&
                  confirmModal?.action === 'completed'
                }
              >
                Completed
              </Loading>
            </Button>}
          </>
        );
        break;
      case 'canceled':
        buttonAction = (
          <Button
            variant="primary"
            className="ms-2"
            size="sm"
            onClick={() =>
              setConfirmModal({
                open: true,
                title: 'Resume Booking',
                body: 'Are you sure want to resume this booking?',
                confirmButton: 'Yes, Resume',
                onConfirm: () => handleBooking('pending'),
                action: 'pending',
              })
            }
          >
            <Loading
              loading={
                updateBookingResult?.isLoading &&
                confirmModal?.action === 'pending'
              }
            >
              Resume
            </Loading>
          </Button>
        );
        break;
      default:
        buttonAction = null;
    }
    if (buttonAction) {
      return buttonAction;
    }
    return <></>;
  };

  return (
    <Card className="mb-3" style={{ width: '100%' }}>
      {confirmModal?.action === 'reschedule' ? (
        <Reschedule booking={booking}></Reschedule>
      ) : (
        <ConfirmModal
          {...confirmModal}
          onClose={() => setConfirmModal({ open: false })}
        >
          {confirmModal?.children}
        </ConfirmModal>
      )}

      <Card.Body>
        <Row>
          <Col xs={8}>
            <Card.Title className="card-title">
              {booking?.customer.display_name}
            </Card.Title>
            <Card.Text className="card-text">
              {booking.date},{' '}
              <span className="text-capitalize">{booking?.slot?.day}</span>,{' '}
              {formatTime(booking?.slot?.start_time)} -{' '}
              {formatTime(booking?.slot?.end_time)}
            </Card.Text>
            <Card.Text className="card-text">
              {booking?.service?.name} - ({CURRENCY_SYMBOL}
              {booking?.service?.price_amount})
              <br />
              Payment: <Badge>{booking?.payment?.status}</Badge>
            </Card.Text>
          </Col>
          <Col xs={4} className="text-right">
            <RenderActions />
            {['pending', 'confirmed'].includes(booking?.status) && (
              <Button
                variant="danger"
                className="ms-2"
                size="sm"
                onClick={() => {
                  setConfirmModal({
                    open: true,
                    type: 'danger',
                    title: 'Cancel Booking',
                    confirmButton: 'Yes, Cancel',
                    body: 'Are you sure want to cancel this booking?',
                    onConfirm: () => {
                      handleBooking('canceled');
                    },
                    action: 'canceled',
                  });
                }}
              >
                <Loading
                  loading={
                    updateBookingResult?.isLoading &&
                    confirmModal?.action === 'canceled'
                  }
                >
                  Cancel
                </Loading>
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
