import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Modal, Form } from 'react-bootstrap';
import { CircularProgress, Chip } from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  Phone,
  Email,
  LocationOn,
  Cancel,
  Edit,
  CheckCircle
} from '@mui/icons-material';
import moment, { Moment } from 'moment';
import NetworkService from '../services/networkService';
import { Appointment, PayingClient, JobStatus } from '../models/models';
import './schedule-appointment.css';

interface ExtendedAppointment extends Appointment {
  cancelled?: boolean;
  cancelledAt?: any;
  cancelledBy?: string;
}

interface ManageAppointmentData {
  appointment: ExtendedAppointment;
  client: PayingClient;
}

const ManageAppointment: React.FC = () => {
  const { appointmentId, token } = useParams<{ appointmentId: string; token: string }>();
  const navigate = useNavigate();
  const networkService = new NetworkService();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [data, setData] = useState<ManageAppointmentData | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [processing, setProcessing] = useState(false);

  // Time slots for rescheduling
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    fetchAppointmentData();
  }, [appointmentId, token]);

  const fetchAppointmentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await networkService.get(
        `/appointments/public/manage/${appointmentId}/${token}`
      );
      
      if (response.status === 'success' && response.data) {
        setData(response.data);
      } else {
        setError('Appointment not found or invalid access token.');
      }
    } catch (err: any) {
      console.error('Error fetching appointment:', err);
      setError('Failed to load appointment details. Please check your link and try again.');
    } finally {
      setLoading(false);
    }
  };

  const canModifyAppointment = (): boolean => {
    if (!data?.appointment?.dateOfService) return false;
    
    const appointmentDate = moment(data.appointment.dateOfService);
    const now = moment();
    const hoursUntilAppointment = appointmentDate.diff(now, 'hours');
    
    return hoursUntilAppointment >= 24;
  };

  const formatAppointmentDateTime = (appointment: Appointment): string => {
    if (!appointment.dateOfService) return 'Date not set';
    
    const date = moment(appointment.dateOfService);
    const dateStr = date.format('MMMM D, YYYY');
    
    const startTime = appointment.startTime || '9:00 AM';
    const endTime = appointment.endTime || '5:00 PM';
    
    return `${dateStr} from ${startTime} to ${endTime}`;
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time.');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Parse the selected time
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':');
      let hour = parseInt(hours);
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;

      // Create new date with selected date and time
      const newDate = moment(selectedDate)
        .set({ hour, minute: parseInt(minutes), second: 0, millisecond: 0 })
        .toDate();

      // Calculate end time (1 hour later)
      const endHour = hour + 1;
      const endPeriod = endHour >= 12 ? 'PM' : 'AM';
      const displayEndHour = endHour > 12 ? endHour - 12 : (endHour === 0 ? 12 : endHour);
      const endTime = `${displayEndHour.toString().padStart(2, '0')}:${minutes} ${endPeriod}`;

      const updates = {
        dateOfService: newDate,
        startTime: selectedTime,
        endTime: endTime
      };

      const response = await networkService.patch(
        `/appointments/public/manage/${appointmentId}/${token}`,
        updates
      );

      if (response.status === 'success') {
        setSuccess('Appointment rescheduled successfully!');
        setShowRescheduleModal(false);
        // Refresh appointment data
        await fetchAppointmentData();
      } else {
        setError('Failed to reschedule appointment. Please try again.');
      }
    } catch (err: any) {
      console.error('Error rescheduling appointment:', err);
      setError(err.message || 'Failed to reschedule appointment.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    setProcessing(true);
    setError(null);

    try {
      const response = await networkService.delete(
        `/appointments/public/manage/${appointmentId}/${token}`
      );

      if (response.status === 'success') {
        setSuccess('Appointment cancelled successfully.');
        setShowCancelModal(false);
        // Update local state to show cancelled status
        if (data) {
          setData({
            ...data,
            appointment: {
              ...data.appointment,
              status: 'finished' as JobStatus,
              cancelled: true
            }
          });
        }
      } else {
        setError('Failed to cancel appointment. Please try again.');
      }
    } catch (err: any) {
      console.error('Error cancelling appointment:', err);
      setError(err.message || 'Failed to cancel appointment.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !data) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <h4>Error</h4>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <h4>Appointment Not Found</h4>
          <p>The appointment you're looking for could not be found.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </Alert>
      </Container>
    );
  }

  const { appointment, client } = data;
  const canModify = canModifyAppointment();
  const isCancelled = appointment.cancelled === true;

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Manage Your Appointment</h2>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}

          <Card className="mb-4">
            <Card.Header className="bg-primary">
              <h4 className="mb-0 text-white">Appointment Details</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <CalendarToday className="me-2 text-primary" />
                      <strong>Date & Time:</strong>
                    </div>
                    <p className="ms-4">{formatAppointmentDateTime(appointment)}</p>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <LocationOn className="me-2 text-primary" />
                      <strong>Service Type:</strong>
                    </div>
                    <p className="ms-4">{appointment.servicesProvided?.join(', ') || 'General Cleaning'}</p>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <CheckCircle className="me-2 text-primary" />
                      <strong>Status:</strong>
                    </div>
                    <div className="ms-4">
                      <Chip
                        label={appointment.cancelled ? 'Cancelled' : (appointment.status || 'Scheduled')}
                        color={
                          appointment.cancelled ? 'error' :
                          appointment.status === 'finished' ? 'success' :
                          appointment.status === 'scheduled' ? 'primary' :
                          'warning'
                        }
                        size="small"
                      />
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <h5 className="mb-3">Customer Information</h5>
                  
                  <div className="mb-2">
                    <div className="d-flex align-items-center">
                      <Person className="me-2 text-primary" />
                      <span>{client.firstName} {client.lastName}</span>
                    </div>
                  </div>

                  {client.phoneNumber && (
                    <div className="mb-2">
                      <div className="d-flex align-items-center">
                        <Phone className="me-2 text-primary" />
                        <span>{client.phoneNumber}</span>
                      </div>
                    </div>
                  )}

                  {client.email && (
                    <div className="mb-2">
                      <div className="d-flex align-items-center">
                        <Email className="me-2 text-primary" />
                        <span>{client.email}</span>
                      </div>
                    </div>
                  )}

                  {client.address && (
                    <div className="mb-2">
                      <div className="d-flex align-items-center">
                        <LocationOn className="me-2 text-primary" />
                        <span>{client.address}</span>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>

              {appointment.notes && (
                <Row className="mt-3">
                  <Col>
                    <strong>Notes:</strong>
                    <p className="mt-1">{appointment.notes}</p>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>

          {!isCancelled && (
            <Card>
              <Card.Body>
                <h5 className="mb-3">Actions</h5>
                
                {!canModify && (
                  <Alert variant="warning" className="mb-3">
                    <small>
                      Appointments can only be modified or cancelled at least 24 hours before the scheduled time.
                    </small>
                  </Alert>
                )}

                <div className="d-flex gap-3">
                  <Button
                    variant="warning"
                    onClick={() => setShowRescheduleModal(true)}
                    disabled={!canModify}
                  >
                    <Edit className="me-2" />
                    Reschedule Appointment
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => setShowCancelModal(true)}
                    disabled={!canModify}
                  >
                    <Cancel className="me-2" />
                    Cancel Appointment
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {isCancelled && (
            <Alert variant="info" className="mt-3">
              This appointment has been cancelled. If you'd like to schedule a new appointment, 
              please <a href="/schedule">click here</a>.
            </Alert>
          )}
        </Col>
      </Row>

      {/* Reschedule Modal */}
      <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select New Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={moment().add(1, 'day').format('YYYY-MM-DD')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select New Time</Form.Label>
              <Form.Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Choose a time...</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRescheduleModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleReschedule}
            disabled={processing || !selectedDate || !selectedTime}
          >
            {processing ? <CircularProgress size={20} /> : 'Confirm Reschedule'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel this appointment?</p>
          <p><strong>Date:</strong> {formatAppointmentDateTime(appointment)}</p>
          <Alert variant="warning">
            This action cannot be undone. You will need to schedule a new appointment if you change your mind.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Keep Appointment
          </Button>
          <Button
            variant="danger"
            onClick={handleCancel}
            disabled={processing}
          >
            {processing ? <CircularProgress size={20} /> : 'Yes, Cancel Appointment'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAppointment;