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
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { FaPlus, FaTrash, FaClone } from 'react-icons/fa';
import './Availability.css';
import {
  useGetAvailabilitySlotsQuery,
  useSaveAvailabilitySlotsMutation,
} from './../../store/slices';
import Loader from './../common/Loader';
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

const initialTimeSlot = {
  start_time: '09:00',
  start: { value: '09:00', label: '09:00 AM' },
  end_time: '09:00',
  end: { value: '17:00', label: '05:00 PM' },
};

const startTimeOptions = generateTimeOptions('start');
const endTimeOptions = generateTimeOptions('end');

const Availability = () => {
  const { data, isLoading, isError } = useGetAvailabilitySlotsQuery({});
  const [saveAvailabilitySlots, saveAvailabilitySlotsResult] =
    useSaveAvailabilitySlotsMutation();
  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((results, day) => {
      results[day.toLocaleLowerCase()] = {
        day,
        enabled: false,
        timeSlots: [
          {
            day: day.toLocaleLowerCase(),
            ...initialTimeSlot,
          },
        ],
      };
      return results;
    }, {}),
  );

  useEffect(() => {
    if (data && !isError) {
      const results = prepareAvailabilitySlots(data);
      setAvailability({ ...availability, ...results });
    }
  }, [data]);

  const handleToggle = (dayKey) => {
    console.log(dayKey);
    const updatedAvailability = { ...availability };
    updatedAvailability[dayKey].enabled = !updatedAvailability[dayKey].enabled;
    setAvailability(updatedAvailability);
  };

  const handleTimeChange = (dayKey, slotIndex, field, value) => {
    const updatedAvailability = { ...availability };
    const timeData = JSON.parse(value);
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
        title: 'Invalid date slot. Please select correct time',
        message:
          "You can't select end time smaller then stat time and cross the day.",
        options: { type: 'danger' },
      });
    } else {
      setAvailability(updatedAvailability);
    }
  };

  const handleAddSlot = (dayKey) => {
    const updatedAvailability = { ...availability };
    updatedAvailability[dayKey].timeSlots.push({
      ...initialTimeSlot,
      day: dayKey,
    });
    setAvailability(updatedAvailability);
  };

  const handleRemoveSlot = (dayKey, slotIndex) => {
    const updatedAvailability = { ...availability };
    updatedAvailability[dayKey].timeSlots.splice(slotIndex, 1);
    if (updatedAvailability[dayKey].timeSlots?.length <= 0) {
      updatedAvailability[dayKey].enabled = false;
    }
    setAvailability(updatedAvailability);
  };

  const handleCloneSlot = (dayKey, slotIndex) => {
    const updatedAvailability = { ...availability };
    const clonedSlot = {
      ...updatedAvailability[dayKey].timeSlots[slotIndex],
    };
    updatedAvailability[dayKey].timeSlots.splice(slotIndex + 1, 0, clonedSlot);
    setAvailability(updatedAvailability);
  };

  const handleSave = () => {
    const payload = [];
    const data = { ...availability };
    for (const slotKey in data) {
      const slots = data[slotKey];
      if (slots?.enabled) {
        payload.push(...slots.timeSlots);
      }
    }
    saveAvailabilitySlots(payload);
  };

  // console.log('availability', availability);

  return (
    <div id="availability">
      <div className="container mt-4 d-flex justify-content-center align-items-center">
        <Loader loading={isLoading} />
        <ToastContainer />
        <Card
          className="shadow-lg p-4"
          style={{ width: '100%', maxWidth: '800px' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center mb-0">Set Your Availability</h1>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={saveAvailabilitySlotsResult?.isLoading}
            >
              <Loading loading={saveAvailabilitySlotsResult?.isLoading}>
                Save
              </Loading>
            </Button>
          </div>
          <Form>
            {Object.keys(availability).map((dayKey, dayIndex) => {
              const day = availability[dayKey];
              return (
                <Row
                  key={day.day}
                  className="day-container mb-3 align-items-center"
                >
                  <Col xs={3} className="d-flex align-items-center">
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
                  <Col xs={9}>
                    {day.enabled && (
                      <div className="time-slots-container">
                        {day.timeSlots.map((slot, slotIndex) => (
                          <InputGroup
                            key={slotIndex}
                            className="mb-2 align-items-center"
                          >
                            <DropdownButton
                              as={InputGroup.Prepend}
                              variant="outline-secondary"
                              title={slot.start?.label}
                              id={`dropdown-start-${dayIndex}-${slotIndex}`}
                              className="time-dropdown"
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

                            <InputGroup.Text> - </InputGroup.Text>

                            <DropdownButton
                              as={InputGroup.Append}
                              variant="outline-secondary"
                              title={slot.end?.label}
                              id={`dropdown-end-${dayIndex}-${slotIndex}`}
                              className="time-dropdown"
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
                              onClick={() => handleCloneSlot(dayKey, slotIndex)}
                              className="ml-2"
                            >
                              <FaClone />
                            </Button>
                            <Button
                              variant="outline-danger"
                              onClick={() =>
                                handleRemoveSlot(dayKey, slotIndex)
                              }
                              className="ml-2"
                            >
                              <FaTrash />
                            </Button>
                          </InputGroup>
                        ))}
                        <Button
                          variant="outline-primary"
                          onClick={() => handleAddSlot(dayKey)}
                        >
                          <FaPlus /> Add Time Slot
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              );
            })}
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Availability;
