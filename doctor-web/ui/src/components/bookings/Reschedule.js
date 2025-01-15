import { useEffect, useState } from 'react';
import {
  useGetAvailabilitySlotsQuery,
  useUpdateBookingMutation,
} from './../../store/slices';
import { formatTime } from './../../lib/utils';
import {
  Modal,
  Form,
  Badge,
  Stack,
  Row,
  Col,
  Alert,
  Button,
} from 'react-bootstrap';
import Loading from './../common/Loading';

const TimeSlot = ({ slot }) => {
  return (
    <Stack direction="horizontal" gap={2}>
      <Badge bg="secondary">{formatTime(slot?.start_time)}</Badge>
      <span> - </span>
      <Badge bg="secondary">{formatTime(slot?.end_time)}</Badge>
    </Stack>
  );
};

const Reschedule = ({ booking }) => {
  const [show, setShow] = useState(true);
  const [validation, setValidation] = useState({ valid: true });
  const [formData, setFormData] = useState({
    booking_id: booking?.booking_id,
    date: booking?.date,
    slot_id: booking?.slot?.slot_id,
  });

  const { data, isLoading, isFetching } = useGetAvailabilitySlotsQuery({
    date: formData?.date,
  });
  const [updateBooking, updateBookingResult] = useUpdateBookingMutation();

  useEffect(() => {
    if (Array.isArray(data) && data?.length) {
      const slot = data.find(
        (item) => item?.slot_id === booking?.slot?.slot_id,
      );
      setFormData({
        ...formData,
        slot_id: slot?.slot_id,
      });
    } else {
      setFormData({
        ...formData,
        slot_id: null,
      });
    }
  }, [data, booking?.slot?.slot_id, formData]);

  const handleChange = (field, event) => {
    let data = { ...formData };
    if (event?.target?.value) {
      data = { ...formData, [field]: event.target.value };
    } else if (field && event) {
      data = { ...formData, ...{ [field]: event } };
    } else {
      data = { ...formData, ...field };
    }
    setFormData(data);
    handleValidation(data);
  };

  const handleValidation = ({ ...payload }) => {
    let valid = true;
    setValidation({
      valid,
    });

    if (!payload?.date) {
      valid = false;
      setValidation({
        ...validation,
        valid,
        date: 'Please select booking date',
      });
    } else {
      const toDate = new Date();
      const isValidDate =
        new Date(payload?.date) >=
        new Date(
          toDate.getUTCFullYear(),
          toDate.getUTCMonth(),
          toDate.getUTCDate(),
          0,
          0,
          0,
        );
      if (!isValidDate) {
        valid = false;
        setValidation({
          ...validation,
          valid,
          date: 'Please select valid date',
        });
      }
    }
    if (data?.length && !payload?.slot_id) {
      valid = false;
      setValidation({
        ...validation,
        valid,
        slot: 'Please select booking slot',
      });
    }

    return valid;
  };

  const handleSubmit = async () => {
    const valid = handleValidation(formData);
    if (valid) {
      const bookingId = formData.booking_id;
      delete formData.booking_id;
      await updateBooking({ id: bookingId, data: formData });
      setShow(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validation.valid}>
            <Form.Control
              type="date"
              value={formData?.date}
              onChange={(event) => handleChange('date', event)}
              isInvalid={!!validation?.date}
            />
            {validation?.date && (
              <Form.Control.Feedback type="invalid">
                {validation.date}
              </Form.Control.Feedback>
            )}
            {isLoading || isFetching ? (
              <Loading loading={isLoading || isFetching} children=" " />
            ) : (
              <>
                <Row className="mt-3">
                  <Col xs={12}>
                    <Form.Label className="text-capitalize">
                      {data?.length ? (
                        data?.[0].day
                      ) : (
                        <Alert key="warning" variant="warning">
                          No availability slot found. Set slot from Availability
                          option.
                        </Alert>
                      )}
                    </Form.Label>
                  </Col>
                </Row>
                {(data || []).map((slot) => (
                  <Row>
                    <Col xs={12}>
                      <Form.Check
                        disabled={false}
                        checked={formData?.slot_id === slot?.slot_id}
                        type="radio"
                        onChange={() => handleChange('slot_id', slot?.slot_id)}
                        label={<TimeSlot slot={slot} />}
                        id={slot?.slot_id}
                        isInvalid={true}
                      />
                    </Col>
                  </Row>
                ))}
                {validation?.slot && (
                  <span className="text-danger" style={{ fontSize: '.87rem' }}>
                    {validation.slot}
                  </span>
                )}
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              isLoading ||
              isFetching ||
              updateBookingResult?.isLoading ||
              !formData?.slot_id
            }
            onClick={handleSubmit}
          >
            <Loading loading={updateBookingResult?.isLoading}>
              Reschedule
            </Loading>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reschedule;
