import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Form, Modal, ListGroup } from 'react-bootstrap';
import { TextField, Chip, CircularProgress, ToggleButton, ToggleButtonGroup, Autocomplete } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment, { Moment } from 'moment';
import { CheckCircle, Schedule, LocationOn, Person, Email, Phone, Notes } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import AppointmentService from '../services/AppointmentService';
import { Appointment } from '../models/models';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './schedule-appointment.css';
import { Config } from '../config';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  servicesRequested: string[];
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const ScheduleAppointment: React.FC = () => {
  const { companyId } = useParams<{ companyId?: string }>();
  const appointmentService = new AppointmentService();

  // State management
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(2); // Default 2 hours
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([]);
  
  // Customer search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    servicesRequested: []
  });

  // Available services
  const availableServices = [
    'Window Cleaning - Interior',
    'Window Cleaning - Exterior',
    'Track Cleaning',
    'Screen Cleaning',
    'Solar Panel Cleaning',
    'Gutter Cleaning',
    'Power Washing'
  ];

  // Search for customers
  const searchCustomers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    setShowSearchResults(true);

    try {
      console.log('Searching for customers with query:', query);
      // Build URL with query parameter
      let searchUrl = `${Config.Env.ApiBaseUrl}/appointments/public/customers/search?query=${encodeURIComponent(query)}`;
      
      // Add companyId if available
      if (companyId) {
        searchUrl += `&companyId=${encodeURIComponent(companyId)}`;
      }

      const response = await fetch(
        searchUrl,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Search response status:', response.status);
      
      if (!response.ok) {
        throw new Error('Failed to search customers');
      }

      const result = await response.json();
      console.log('Search results:', result);
      setSearchResults(result.data || []);
    } catch (err) {
      console.error('Error searching customers:', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle customer selection
  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      ...formData,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phoneNumber,
      address: customer.address
    });
    setShowSearchResults(false);
    setSearchQuery(`${customer.firstName} ${customer.lastName}`);
  };

  // Handle first name change with debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formData.firstName && !selectedCustomer) {
        searchCustomers(formData.firstName);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.firstName]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.customer-search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate time slots from 8 AM to 5 PM
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const time = moment().hour(hour).minute(minutes).format('HH:mm');
        slots.push({ time, available: true });
      }
    }

    return slots;
  };

  // Check availability for selected date
  const checkAvailability = async (date: Moment) => {
    setLoading(true);
    setError('');
    
    console.log('=== checkAvailability called ===', {
      date: date.format('YYYY-MM-DD'),
      duration: duration,
      dateType: typeof date,
      isValid: date.isValid()
    });

    try {
      // Build availability URL with date
      let availabilityUrl = `${Config.Env.ApiBaseUrl}/appointments/public/availability?date=${date.format('YYYY-MM-DD')}`;
      
      // Add companyId if available
      if (companyId) {
        availabilityUrl += `&companyId=${encodeURIComponent(companyId)}`;
      }

      // Call public availability endpoint
      const response = await fetch(
        availabilityUrl,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check availability');
      }

      const result = await response.json();
      const appointments = result.data || [];
      setExistingAppointments(appointments);
      
      // Debug logging
      console.log('Received appointments:', appointments);
      appointments.forEach((apt: any) => {
        console.log('Appointment:', {
          id: apt.id,
          dateOfService: apt.dateOfService,
          dateType: typeof apt.dateOfService,
          startTime: apt.startTime,
          endTime: apt.endTime,
          status: apt.status
        });
      });

      // Generate available time slots
      const allSlots = generateTimeSlots();

      // Filter only active appointments
      const activeAppointments = appointments.filter((apt: any) => apt.status !== 'cancelled');

      // Mark slots as unavailable based on existing appointments
      const updatedSlots = allSlots.map(slot => {
        const slotStart = date.clone().set({
          hour: parseInt(slot.time.split(':')[0]),
          minute: parseInt(slot.time.split(':')[1]),
          second: 0,
          millisecond: 0
        });
        const slotEnd = slotStart.clone().add(duration, 'hours');

        // Check if this slot conflicts with any existing appointment
        const hasConflict = activeAppointments.some((apt: any) => {
          try {
            // Ensure we have required fields
            if (!apt.startTime || !apt.endTime) {
              console.warn('Appointment missing time fields:', apt);
              return false;
            }
            
            // The appointment times (startTime, endTime) are stored separately from the date
            // They represent the LOCAL time when the appointment occurs
            // So we need to apply them to the selected date, not the stored UTC date
            
            const [startHour, startMin] = apt.startTime.split(':').map(Number);
            const [endHour, endMin] = apt.endTime.split(':').map(Number);
            
            // Create appointment times on the selected date
            // This is because the appointment was scheduled for this date in local time
            const aptStart = date.clone().set({
              hour: startHour,
              minute: startMin,
              second: 0,
              millisecond: 0
            });
            
            const aptEnd = date.clone().set({
              hour: endHour,
              minute: endMin,
              second: 0,
              millisecond: 0
            });
            
            // For now, we'll just log and continue
            // The time comparison below will handle the actual overlap check
            console.log('Processing appointment for selected date:', {
              appointmentId: apt.id,
              storedDate: apt.dateOfService,
              selectedDate: date.format('YYYY-MM-DD'),
              startTime: apt.startTime,
              endTime: apt.endTime
            });
            
            // Log the comparison details
            console.log(`Checking slot ${slot.time} against appointment:`, {
              slotStart: slotStart.format('YYYY-MM-DD HH:mm'),
              slotEnd: slotEnd.format('YYYY-MM-DD HH:mm'),
              aptStart: aptStart.format('YYYY-MM-DD HH:mm'),
              aptEnd: aptEnd.format('YYYY-MM-DD HH:mm'),
              appointment: {
                id: apt.id,
                startTime: apt.startTime,
                endTime: apt.endTime
              }
            });
            
            const overlaps = slotStart.isBefore(aptEnd) && slotEnd.isAfter(aptStart);
            if (overlaps) {
              console.log(`✓ Slot ${slot.time} CONFLICTS with appointment ${apt.id}`);
            } else {
              console.log(`✗ Slot ${slot.time} does not conflict`);
            }
            
            return overlaps;
          } catch (error) {
            console.error('Error checking appointment conflict:', error, apt);
            return false;
          }
        });

        return { ...slot, available: !hasConflict };
      });

      setAvailableSlots(updatedSlots);
    } catch (err) {
      setError('Failed to check availability. Please try again.');
      console.error('Error checking availability:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: any) => {
    // Convert to Moment if needed
    const momentDate = moment.isMoment(date) ? date : moment(date);

    // Check if date is valid, not in the past, not today, and not weekend
    if (momentDate && momentDate.isValid() && momentDate.isAfter(moment())) {
      // Check if it's Saturday (6) or Sunday (0)
      if (momentDate.day() === 0 || momentDate.day() === 6) {
        setError('Appointments cannot be scheduled on weekends. Please select a weekday.');
        return;
      }
      
      setSelectedDate(momentDate);
      setSelectedTime('');
      setError(''); // Clear any previous errors
      checkAvailability(momentDate);
    }
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle service selection
  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      servicesRequested: prev.servicesRequested.includes(service)
        ? prev.servicesRequested.filter(s => s !== service)
        : [...prev.servicesRequested, service]
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Create appointment object with proper date handling
      // Ensure the date is set to the start of the selected day in local time
      const appointmentDate = selectedDate!.clone().set({
        hour: parseInt(selectedTime.split(':')[0]),
        minute: parseInt(selectedTime.split(':')[1]),
        second: 0,
        millisecond: 0
      });
      
      const appointment: Partial<Appointment> = {
        dateOfService: appointmentDate.toDate(), // This will be in local time and converted to UTC for storage
        startTime: selectedTime,
        endTime: moment(selectedTime, 'HH:mm').add(duration, 'hours').format('HH:mm'),
        servicesProvided: formData.servicesRequested,
        notes: formData.notes,
        status: 'scheduled',
        isPublicBooking: true
      };
      
      console.log('Creating appointment:', {
        selectedDate: selectedDate!.format('YYYY-MM-DD'),
        selectedTime: selectedTime,
        appointmentDate: appointmentDate.format('YYYY-MM-DD HH:mm'),
        dateOfService: appointment.dateOfService
      });

      // Prepare request body
      const requestBody: any = {
        appointment,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          address: formData.address
        }
      };

      // Include companyId if it's provided in the URL
      if (companyId) {
        requestBody.companyId = companyId;
      }

      // Submit appointment through API
      const response = await fetch(`${Config.Env.ApiBaseUrl}/appointments/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to schedule appointment');
      }

      setSuccess(true);
    } catch (err) {
      setError('Failed to schedule appointment. Please try again or call us directly.');
      console.error('Error scheduling appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  // Validate current step
  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return selectedDate !== null && selectedTime !== '';
      case 2:
        return formData.servicesRequested.length > 0;
      case 3:
        return (
          formData.firstName !== '' &&
          formData.lastName !== '' &&
          formData.phone !== '' &&
          formData.address !== ''
        );
      default:
        return false;
    }
  };

  // Render success message
  if (success) {
    return (
      <>
        <Navbar />
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="text-center p-5">
                <CheckCircle style={{ fontSize: 80, color: '#28a745', margin: '0 auto 20px' }} />
                <h2>Appointment Scheduled Successfully!</h2>
                <p className="mt-3">
                  Thank you for scheduling with Defined Cleaning. We've sent a confirmation email to {formData.email}.
                </p>
                <p>
                  <strong>Date:</strong> {selectedDate?.format('MMMM Do, YYYY')}<br />
                  <strong>Time:</strong> {moment(selectedTime, 'HH:mm').format('h:mm A')}<br />
                  <strong>Duration:</strong> {duration} hours<br />
                  <strong>Services:</strong> {formData.servicesRequested.join(', ')}
                </p>
                <p className="mt-4">
                  We'll call you the day before to confirm your appointment.
                </p>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = '/'}
                  className="mt-3"
                >
                  Return to Home
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <h1 className="text-center mb-5">Schedule Your Appointment</h1>

            {/* Progress indicators */}
            <div className="d-flex justify-content-center mb-5">
              <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Date & Time</div>
              </div>
              <div className="step-line"></div>
              <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Services</div>
              </div>
              <div className="step-line"></div>
              <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Your Info</div>
              </div>
            </div>

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {/* Step 1: Date & Time Selection */}
            {step === 1 && (
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="mb-4">
                    <Schedule className="me-2" />
                    Select Date & Time
                  </h3>

                  <Row>
                    <Col md={6}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateCalendar
                          value={selectedDate}
                          onChange={handleDateSelect}
                          disablePast
                          loading={loading}
                          shouldDisableDate={(date) => {
                            // Convert to moment if it's not already
                            const momentDate = moment.isMoment(date) ? date : moment(date);
                            // Disable today, weekends, and past dates
                            return momentDate.isSameOrBefore(moment(), 'day') || 
                                   momentDate.day() === 0 || 
                                   momentDate.day() === 6;
                          }}
                        />
                      </LocalizationProvider>
                    </Col>

                    <Col md={6}>
                      {selectedDate && (
                        <>
                          <h5 className="mb-3">Available Times on {selectedDate.format('MMM Do')}</h5>
                          <p className="text-muted mb-3">Service duration: 2 hours</p>

                          {loading ? (
                            <div className="text-center py-4">
                              <CircularProgress />
                            </div>
                          ) : (
                            <div className="time-slots">
                              {availableSlots.map(slot => (
                                <Button
                                  key={slot.time}
                                  variant={selectedTime === slot.time ? 'primary' : 'outline-primary'}
                                  disabled={!slot.available}
                                  onClick={() => handleTimeSelect(slot.time)}
                                  className="m-1"
                                  size="sm"
                                  title={!slot.available ? 'This time slot is already booked' : `Select ${moment(slot.time, 'HH:mm').format('h:mm A')}`}
                                >
                                  {moment(slot.time, 'HH:mm').format('h:mm A')}
                                </Button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>

                  <div className="text-end mt-4">
                    <Button
                      variant="primary"
                      onClick={() => setStep(2)}
                      disabled={!canProceed()}
                    >
                      Next: Select Services
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Step 2: Service Selection */}
            {step === 2 && (
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="mb-4">
                    <CheckCircle className="me-2" />
                    Select Services
                  </h3>

                  <p className="mb-4">Select all services you need during this appointment:</p>

                  <div className="service-selection">
                    {availableServices.map(service => (
                      <Chip
                        key={service}
                        label={service}
                        onClick={() => handleServiceToggle(service)}
                        color={formData.servicesRequested.includes(service) ? 'primary' : 'default'}
                        variant={formData.servicesRequested.includes(service) ? 'filled' : 'outlined'}
                        className="m-1"
                        clickable
                      />
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="outline-secondary" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setStep(3)}
                      disabled={!canProceed()}
                    >
                      Next: Your Information
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="mb-4">
                    <Person className="me-2" />
                    Your Information
                  </h3>

                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3 position-relative customer-search-container">
                          <Form.Label>First Name *</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => {
                              setFormData({ ...formData, firstName: e.target.value });
                              setSelectedCustomer(null);
                            }}
                            onFocus={() => {
                              if (formData.firstName && searchResults.length > 0) {
                                setShowSearchResults(true);
                              }
                            }}
                            required
                          />
                          {showSearchResults && searchResults.length > 0 && (
                            <ListGroup className="position-absolute w-100 mt-1" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                              {searchLoading ? (
                                <ListGroup.Item className="text-center">
                                  <CircularProgress size={20} />
                                </ListGroup.Item>
                              ) : (
                                searchResults.map((customer) => (
                                  <ListGroup.Item
                                    key={customer.id}
                                    action
                                    onClick={() => handleCustomerSelect(customer)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <strong>{customer.firstName} {customer.lastName}</strong>
                                        <br />
                                        <small className="text-muted">{customer.address}</small>
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                ))
                              )}
                            </ListGroup>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name *</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone *</Form.Label>
                          <Form.Control
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Service Address *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Main St, Las Vegas, NV 89101"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Special Instructions (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Gate code, parking instructions, specific areas to focus on, etc."
                      />
                    </Form.Group>
                  </Form>

                  <div className="appointment-summary mt-4 p-3 bg-light rounded">
                    <h5>Appointment Summary</h5>
                    <p className="mb-1">
                      <strong>Date:</strong> {selectedDate?.format('MMMM Do, YYYY')}
                    </p>
                    <p className="mb-1">
                      <strong>Time:</strong> {moment(selectedTime, 'HH:mm').format('h:mm A')} - {moment(selectedTime, 'HH:mm').add(duration, 'hours').format('h:mm A')}
                    </p>
                    <p className="mb-1">
                      <strong>Services:</strong> {formData.servicesRequested.join(', ')}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="outline-secondary" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={!canProceed() || loading}
                    >
                      {loading ? <CircularProgress size={20} /> : 'Schedule Appointment'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ScheduleAppointment;