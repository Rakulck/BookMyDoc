import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
  Card,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { FaPlus, FaTrash, FaClone } from 'react-icons/fa';
import './Availability.css';
import {
  useGetAvailabilitySlotsQuery,
  useSaveAvailabilitySlotsMutation,
} from './../../store/slices';
import Loading from './../common/Loading';
import { ToastMessage } from '../../components/common/ToastMessageWrapper';
import {
  generateTimeOptions,
  prepareAvailabilitySlots,
} from './../../lib/utils';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const predefinedTimeSlots = [
  {
    start_time: '09:00',
    start: { value: '09:00', label: '09:00 AM' },
    end_time: '12:00',
    end: { value: '12:00', label: '12:00 PM' },
  },
  {
    start_time: '14:00',
    start: { value: '14:00', label: '02:00 PM' },
    end_time: '17:00',
    end: { value: '17:00', label: '05:00 PM' },
  },
  {
    start_time: '18:00',
    start: { value: '18:00', label: '06:00 PM' },
    end_time: '21:00',
    end: { value: '21:00', label: '09:00 PM' },
  },
  {
    start_time: '09:00',
    start: { value: '09:00', label: '09:00 AM' },
    end_time: '17:00',
    end: { value: '17:00', label: '05:00 PM' },
  },
];

const initialTimeSlot = predefinedTimeSlots[0];

const startTimeOptions = generateTimeOptions('start');
const endTimeOptions = generateTimeOptions('end');

const TimeSlotModal = ({ show, onHide, onSelect, dayKey }) => {
  if (!show) return null;

  return (
    <div
      className="modal show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Time Slot</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-grid gap-2">
              {predefinedTimeSlots.map((slot, idx) => (
                <Button
                  key={idx}
                  variant="outline-primary"
                  size="lg"
                  className="text-start"
                  onClick={() => onSelect(slot)}
                >
                  {`${slot.start.label} - ${slot.end.label}`}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Availability = () => {
  const { data, isLoading, isError } = useGetAvailabilitySlotsQuery({});
  const [saveAvailabilitySlots, saveAvailabilitySlotsResult] =
    useSaveAvailabilitySlotsMutation();
  const [showTimeModal, setShowTimeModal] = useState({
    show: false,
    dayKey: null,
  });
  const [availability, setAvailability] = useState(() =>
    daysOfWeek.reduce((results, day) => {
      results[day.toLowerCase()] = {
        day,
        enabled: false,
        timeSlots: [],
      };
      return results;
    }, {}),
  );

  useEffect(() => {
    if (data && !isError) {
      const results = prepareAvailabilitySlots(data);
      setAvailability((prevAvailability) => ({
        ...prevAvailability,
        ...results,
      }));
    }
  }, [data, isError]);

  const handleToggle = (dayKey) => {
    setAvailability((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        enabled: !prev[dayKey].enabled,
        timeSlots: prev[dayKey].enabled ? prev[dayKey].timeSlots : [],
      },
    }));
  };

  const handleTimeChange = (dayKey, slotIndex, field, value) => {
    const timeData = JSON.parse(value);

    setAvailability((prev) => {
      const updatedAvailability = { ...prev };
      updatedAvailability[dayKey].timeSlots[slotIndex][field] = timeData;
      updatedAvailability[dayKey].timeSlots[slotIndex][field + '_time'] =
        timeData.value;

      const startTime =
        updatedAvailability[dayKey].timeSlots[slotIndex].start_time?.split(':');
      let endTime =
        field === 'end' && timeData.value === '0:00' ? '24:00' : timeData.value;
      endTime = endTime?.split(':');

      const compareTime =
        new Date(0, 0, 0, endTime?.[0], +endTime?.[1]) -
        new Date(0, 0, 0, startTime?.[0], startTime?.[1]);

      if (field === 'end' && compareTime < 0) {
        ToastMessage({
          title: 'Invalid time slot. Please select correct time',
          message:
            "You can't select end time smaller than start time and cross the day.",
          options: { type: 'danger' },
        });
        return prev; // Don't update state if invalid
      }

      return updatedAvailability;
    });
  };

  const handleAddSlot = (dayKey, slot = initialTimeSlot) => {
    setAvailability((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        timeSlots: [
          ...(prev[dayKey].timeSlots || []),
          {
            ...slot,
            day: dayKey,
          },
        ],
      },
    }));
  };

  const handleRemoveSlot = (dayKey, slotIndex) => {
    setAvailability((prev) => {
      const updatedAvailability = { ...prev };
      updatedAvailability[dayKey].timeSlots.splice(slotIndex, 1);
      if (updatedAvailability[dayKey].timeSlots?.length <= 0) {
        updatedAvailability[dayKey].enabled = false;
      }
      return updatedAvailability;
    });
  };

  const handleCloneSlot = (dayKey, slotIndex) => {
    setAvailability((prev) => {
      const updatedAvailability = { ...prev };
      const clonedSlot = {
        ...updatedAvailability[dayKey].timeSlots[slotIndex],
      };
      updatedAvailability[dayKey].timeSlots.splice(
        slotIndex + 1,
        0,
        clonedSlot,
      );
      return updatedAvailability;
    });
  };

  const handleSave = () => {
    const payload = [];
    const availabilityData = { ...availability };
    for (const slotKey in availabilityData) {
      const slots = availabilityData[slotKey];
      if (slots?.enabled) {
        payload.push(...slots.timeSlots);
      }
    }
    saveAvailabilitySlots(payload);
  };

  const handleTimeSlotSelect = (slot) => {
    const dayKey = showTimeModal.dayKey;
    if (!dayKey || !availability[dayKey]) return;

    // Enable the day if it's not enabled
    if (!availability[dayKey].enabled) {
      setAvailability((prev) => ({
        ...prev,
        [dayKey]: {
          ...prev[dayKey],
          enabled: true,
          timeSlots: [
            {
              day: dayKey,
              start: slot.start,
              end: slot.end,
              start_time: slot.start_time,
              end_time: slot.end_time,
            },
          ],
        },
      }));
    } else {
      // Add new slot to existing slots
      setAvailability((prev) => ({
        ...prev,
        [dayKey]: {
          ...prev[dayKey],
          timeSlots: [
            ...(prev[dayKey].timeSlots || []),
            {
              day: dayKey,
              start: slot.start,
              end: slot.end,
              start_time: slot.start_time,
              end_time: slot.end_time,
            },
          ],
        },
      }));
    }

    setShowTimeModal({ show: false, dayKey: null });
  };

  return (
    <div id="availability">
      <TimeSlotModal
        show={showTimeModal.show}
        onHide={() => setShowTimeModal({ show: false, dayKey: null })}
        onSelect={handleTimeSlotSelect}
        dayKey={showTimeModal.dayKey}
      />
      <div className="container mt-3 d-flex justify-content-center align-items-center">
        {isLoading && <Loading type="overlay" text="Loading availability..." />}
        <ToastContainer />
        <Card
          className="shadow-sm p-3"
          style={{ width: '100%', maxWidth: '700px' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="mb-0">Schedule</h1>
          </div>
          <Form>
            {Object.keys(availability).map((dayKey, dayIndex) => {
              const day = availability[dayKey];
              return (
                <Row
                  key={day.day}
                  className="day-container mb-2 align-items-center"
                >
                  <Col
                    xs={12}
                    sm={3}
                    className="d-flex align-items-center mb-2 mb-sm-0"
                  >
                    <Form.Check
                      type="switch"
                      id={`switch-${day.day}`}
                      label={day.day}
                      checked={day.enabled}
                      onChange={() => handleToggle(dayKey)}
                      className="day-switch custom-switch"
                      style={{ textTransform: 'capitalize' }}
                    />
                  </Col>
                  <Col xs={12} sm={9}>
                    {day.enabled && (
                      <div className="time-slots-container">
                        {day.timeSlots.length === 0 ? (
                          <div className="text-center p-3 border rounded mb-3 bg-light">
                            <p className="mb-2 text-muted">
                              No availability added for {day.day}
                            </p>
                            <Button
                              variant="primary"
                              onClick={() =>
                                setShowTimeModal({ show: true, dayKey })
                              }
                              size="sm"
                            >
                              <FaPlus className="me-1" /> Add Your First Time
                              Slot
                            </Button>
                          </div>
                        ) : (
                          <>
                            {day.timeSlots.map((slot, slotIndex) => (
                              <InputGroup
                                key={slotIndex}
                                className="mb-2 align-items-center"
                                size="sm"
                              >
                                <DropdownButton
                                  as={InputGroup.Prepend}
                                  variant="outline-secondary"
                                  title={slot.start?.label}
                                  id={`dropdown-start-${dayIndex}-${slotIndex}`}
                                  className="time-dropdown"
                                  size="sm"
                                  onSelect={(value) =>
                                    handleTimeChange(
                                      dayKey,
                                      slotIndex,
                                      'start',
                                      value,
                                    )
                                  }
                                >
                                  <div className="dropdown-scrollable">
                                    {startTimeOptions.map((time, index) => (
                                      <Dropdown.Item
                                        key={index}
                                        eventKey={JSON.stringify(time)}
                                      >
                                        {time?.label}
                                      </Dropdown.Item>
                                    ))}
                                  </div>
                                </DropdownButton>

                                <InputGroup.Text>-</InputGroup.Text>

                                <DropdownButton
                                  as={InputGroup.Append}
                                  variant="outline-secondary"
                                  title={slot.end?.label}
                                  id={`dropdown-end-${dayIndex}-${slotIndex}`}
                                  className="time-dropdown"
                                  size="sm"
                                  onSelect={(value) =>
                                    handleTimeChange(
                                      dayKey,
                                      slotIndex,
                                      'end',
                                      value,
                                    )
                                  }
                                >
                                  <div className="dropdown-scrollable">
                                    {endTimeOptions.map((time, index) => (
                                      <Dropdown.Item
                                        key={index}
                                        eventKey={JSON.stringify(time)}
                                      >
                                        {time?.label}
                                      </Dropdown.Item>
                                    ))}
                                  </div>
                                </DropdownButton>
                                <Button
                                  variant="outline-secondary"
                                  onClick={() =>
                                    handleCloneSlot(dayKey, slotIndex)
                                  }
                                  size="sm"
                                  className="ms-1"
                                >
                                  <FaClone className="me-1" />
                                  Copy
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() =>
                                    handleRemoveSlot(dayKey, slotIndex)
                                  }
                                  size="sm"
                                  className="ms-1"
                                >
                                  <FaTrash className="me-1" />
                                  Delete
                                </Button>
                              </InputGroup>
                            ))}
                            <div className="mt-3">
                              <Button
                                variant="outline-primary"
                                onClick={() =>
                                  setShowTimeModal({ show: true, dayKey })
                                }
                                size="sm"
                              >
                                <FaPlus className="me-1" /> Add Another Time
                                Slot
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </Col>
                </Row>
              );
            })}
          </Form>

          {/* Global Save Button */}
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={saveAvailabilitySlotsResult?.isLoading}
              size="lg"
              className="save-button"
            >
              {saveAvailabilitySlotsResult?.isLoading ? (
                <Loading type="inline" size="small" text="Saving..." />
              ) : (
                'Save Schedule'
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Availability;
