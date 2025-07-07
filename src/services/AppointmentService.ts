import { Appointment } from '../models/models';
import NetworkService from './networkService';

class AppointmentService {
  private networkService: NetworkService;

  constructor() {
    this.networkService = new NetworkService();
  }

  /**
   * Get appointments within a date range
   * @param from Start date (optional, defaults to today)
   * @param to End date (optional)
   * @returns Array of appointments
   */
  async getAppointments(from?: Date, to?: Date): Promise<Appointment[]> {
    try {
      let url = '/appointments';
      const params = new URLSearchParams();
      
      if (from) {
        params.append('from', from.toISOString());
      }
      if (to) {
        params.append('to', to.toISOString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await this.networkService.get(url);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  /**
   * Get appointments for a specific employee
   * @param employeeId Employee ID
   * @param from Start date (optional)
   * @param to End date (optional)
   * @returns Array of appointments for the employee
   */
  async getAppointmentsByEmployee(employeeId: string, from?: Date, to?: Date): Promise<Appointment[]> {
    try {
      let url = `/appointments/employee/${employeeId}`;
      const params = new URLSearchParams();
      
      if (from) {
        params.append('from', from.toISOString());
      }
      if (to) {
        params.append('to', to.toISOString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await this.networkService.get(url);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching appointments by employee:', error);
      throw error;
    }
  }

  /**
   * Get appointments for a specific client
   * @param clientId Client ID
   * @returns Array of appointments for the client
   */
  async getAppointmentsByClient(clientId: string): Promise<Appointment[]> {
    try {
      const response = await this.networkService.get(`/appointments/client/${clientId}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching appointments by client:', error);
      throw error;
    }
  }

  /**
   * Get specific appointment by ID
   * @param appointmentId Appointment ID
   * @returns Appointment data or null
   */
  async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    try {
      const response = await this.networkService.get(`/appointments/${appointmentId}`);
      return response.data || null;
    } catch (error) {
      console.error('Error fetching appointment by ID:', error);
      throw error;
    }
  }

  /**
   * Create or update appointments (batch operation)
   * @param appointments Array of appointment objects
   * @returns Success response
   */
  async saveAppointments(appointments: Appointment[]): Promise<any> {
    try {
      // Normalize dates to ensure they're proper Date objects for Firestore Timestamps
      const normalizedAppointments = appointments.map(appointment => ({
        ...appointment,
        dateOfService: this.normalizeDateToDate(appointment.dateOfService)
      }));

      const response = await this.networkService.post('/appointments', { appointments: normalizedAppointments });
      return response;
    } catch (error) {
      console.error('Error saving appointments:', error);
      throw error;
    }
  }

  /**
   * Normalize various date formats to a proper Date object
   * @param dateValue Date in various formats (string, Date, Firestore Timestamp, etc.)
   * @returns Normalized Date object
   */
  private normalizeDateToDate(dateValue: any): Date {
    if (!dateValue) {
      throw new Error('Date value is required');
    }

    // If it's already a Date object, return it
    if (dateValue instanceof Date) {
      return dateValue;
    }

    // If it's a Firestore Timestamp, convert to Date
    if (dateValue && typeof dateValue.toDate === 'function') {
      return dateValue.toDate();
    }

    // If it's a string or number, try to parse it
    if (typeof dateValue === 'string' || typeof dateValue === 'number') {
      const parsedDate = new Date(dateValue);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date format: ${dateValue}`);
      }
      return parsedDate;
    }

    // If it has seconds/nanoseconds (Firestore Timestamp-like object)
    if (dateValue && typeof dateValue.seconds === 'number') {
      return new Date(dateValue.seconds * 1000 + (dateValue.nanoseconds || 0) / 1000000);
    }

    throw new Error(`Unsupported date format: ${typeof dateValue} - ${dateValue}`);
  }

  /**
   * Update appointment status
   * @param appointmentId Appointment ID
   * @param statusUpdate Status update object
   * @returns Success response
   */
  async updateAppointmentStatus(appointmentId: string, statusUpdate: any): Promise<any> {
    try {
      const response = await this.networkService.put(`/appointments/${appointmentId}/status`, statusUpdate);
      return response;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  }

  /**
   * Delete appointment
   * @param appointmentId Appointment ID
   * @param deleteRecurring Whether to delete entire recurring group
   * @returns Success response
   */
  async deleteAppointment(appointmentId: string, deleteRecurring: boolean = false): Promise<any> {
    try {
      let url = `/appointments/${appointmentId}`;
      if (deleteRecurring) {
        url += '?deleteRecurring=true';
      }
      
      const response = await this.networkService.delete(url);
      return response;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  /**
   * Get appointment statistics
   * @param from Start date (optional, defaults to today)
   * @param to End date (optional)
   * @returns Statistics object
   */
  async getAppointmentStats(from?: Date, to?: Date): Promise<any> {
    try {
      let url = '/appointments/stats/summary';
      const params = new URLSearchParams();
      
      if (from) {
        params.append('from', from.toISOString());
      }
      if (to) {
        params.append('to', to.toISOString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await this.networkService.get(url);
      return response.data || {};
    } catch (error) {
      console.error('Error fetching appointment stats:', error);
      throw error;
    }
  }
}

export default AppointmentService;