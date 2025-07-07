import { Config } from '../config';
import CacheService from './CacheService';
import { EmployeeDocument } from '../models/models';

// Backend API base URL
const API_BASE_URL = Config.Env.ApiBaseUrl

class NetworkService {
  private cacheService: CacheService;
  private static pendingRequests: Map<string, Promise<any>> = new Map();

  constructor() {
    this.cacheService = CacheService.getInstance();
  }

  /**
   * Sends an estimate email to a customer
   * @param {string} customerEmail - The email address of the customer
   * @param {string} customerName - The name of the customer
   * @param {string} estimateId - The ID of the estimate
   * @param {string} message - Optional customer message to include in the email
   * @param {string} customerPhone - Optional customer phone number for SMS
   * @returns {Promise<any>} A promise that resolves to the API response
   */
  sendEstimateEmail(customerEmail: string, customerName: string, estimateId: string, message?: string, customerPhone?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/estimates/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          customerName,
          estimateId,
          message, // Include customer message in the request
          customerPhone // Include customer phone for SMS
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Log to console instead of analytics
          console.log("Estimate email sent:", {
            customerEmail,
            customerName,
            estimateId,
          });
          resolve(data);
        })
        .catch((error) => {
          console.error("Failed to send estimate email:", error);
          reject(error);
        });
    });
  }

  /**
   * Creates an invoice for an appointment without sending it
   * @param {any} appointment - The appointment to create an invoice for
   * @param {any} client - The client the invoice is for
   * @returns {Promise<any>} A promise that resolves to the API response with the invoice ID
   */
  createInvoice(appointment: any, client: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // No auth needed for public website
        const token = null;
        
        if (!appointment.id) {
          throw new Error('Appointment ID is required');
        }

        fetch(`${API_BASE_URL}/appointments/${appointment.id}/invoice/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.message || `HTTP Error: ${response.status}`);
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log("Invoice created:", {
              appointmentId: appointment.id,
              clientId: client.id,
              invoiceId: data.data?.invoiceId
            });
            resolve(data);
          })
          .catch((error) => {
            console.error("Error creating invoice:", error);
            reject(error);
          });
      } catch (error) {
        console.error("Error getting auth token:", error);
        reject(error);
      }
    });
  }

  createAndSendInvoice(appointment: any, client: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // No auth needed for public website
        const token = null;
        
        if (!appointment.id) {
          throw new Error('Appointment ID is required');
        }

        fetch(`${API_BASE_URL}/appointments/${appointment.id}/invoice/create-and-send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.message || `HTTP Error: ${response.status}`);
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log("Invoice created and sent:", {
              appointmentId: appointment.id,
              clientId: client.id,
              invoiceId: data.data?.invoiceId
            });
            resolve(data);
          })
          .catch((error) => {
            console.error("Error creating and sending invoice:", error);
            reject(error);
          });
      } catch (error) {
        console.error("Error getting auth token:", error);
        reject(error);
      }
    });
  }

  /**
   * Generic GET request without authentication
   */
  async get(url: string, options?: { responseType?: 'json' | 'blob' }): Promise<any> {
    // No auth needed for public website
    const user = null;
    const token = null;
    
    console.log('🔐 [NetworkService] GET request to:', `${API_BASE_URL}${url}`);
    console.log('👤 [NetworkService] Current user:', 'No user');
    console.log('🔑 [NetworkService] Has token:', false);

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log('📨 [NetworkService] Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [NetworkService] HTTP Error:', response.status, errorText);
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    if (options?.responseType === 'blob') {
      const blob = await response.blob();
      return { data: blob };
    }

    const result = await response.json();
    console.log('📊 [NetworkService] Response data:', result);
    return result;
  }

  /**
   * Generic POST request without authentication
   */
  async post(url: string, data: any): Promise<any> {
    // No auth needed for public website
    const user = null;
    const token = null;
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Generic PUT request without authentication
   */
  async put(url: string, data: any): Promise<any> {
    // No auth needed for public website
    const user = null;
    const token = null;
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Generic PATCH request without authentication
   */
  async patch(url: string, data: any): Promise<any> {
    // No auth needed for public website
    const user = null;
    const token = null;
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Generic DELETE request without authentication
   */
  async delete(url: string): Promise<any> {
    // No auth needed for public website
    const user = null;
    const token = null;
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Fetches the list of appointments for employees
   * This is a public API that doesn't require authentication
   */
  async fetchEmployeesAndTakenTimes(): Promise<EmployeeDocument[]> {
    // Cache key with 5-minute TTL
    const cacheKey = 'employees_and_taken_times';
    const cacheTTL = 5 * 60 * 1000; // 5 minutes

    // Check if request is already pending
    const pendingRequest = NetworkService.pendingRequests.get(cacheKey);
    if (pendingRequest) {
      console.log('Using pending request for employees and taken times');
      return pendingRequest;
    }

    // Check cache first
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      console.log('Using cached employees and taken times data');
      return cachedData as EmployeeDocument[];
    }

    // Create new request promise
    const requestPromise = fetch(`${API_BASE_URL}/appointments/public/employees-taken-times`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Cache the successful response
        this.cacheService.set(cacheKey, data, cacheTTL);
        // Remove from pending requests
        NetworkService.pendingRequests.delete(cacheKey);
        return data;
      })
      .catch(error => {
        console.error('Error fetching employees and taken times:', error);
        // Remove from pending requests on error
        NetworkService.pendingRequests.delete(cacheKey);
        throw error;
      });

    // Store as pending request
    NetworkService.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  /**
   * Creates a public appointment (no authentication required)
   */
  async createPublicAppointment(appointmentData: any): Promise<any> {
    return fetch(`${API_BASE_URL}/appointments/public/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || `HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Public appointment created successfully:', data);
        return data;
      })
      .catch(error => {
        console.error('Error creating public appointment:', error);
        throw error;
      });
  }

  /**
   * Gets public appointment details using appointmentId and token
   */
  async getPublicAppointment(appointmentId: string, token: string): Promise<any> {
    return fetch(`${API_BASE_URL}/appointments/public/${appointmentId}?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || `HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Public appointment fetched successfully:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching public appointment:', error);
        throw error;
      });
  }

  /**
   * Updates a public appointment (reschedule/cancel)
   */
  async updatePublicAppointment(appointmentId: string, token: string, updateData: any): Promise<any> {
    return fetch(`${API_BASE_URL}/appointments/public/${appointmentId}?token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || `HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Public appointment updated successfully:', data);
        return data;
      })
      .catch(error => {
        console.error('Error updating public appointment:', error);
        throw error;
      });
  }

  /**
   * Gets the details of a company by its ID (public API)
   */
  async getPublicCompanyDetails(companyId: string): Promise<any> {
    const cacheKey = `company_${companyId}`;
    const cacheTTL = 60 * 60 * 1000; // 1 hour

    // Check cache first
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      console.log('Using cached company data for:', companyId);
      return cachedData;
    }

    return fetch(`${API_BASE_URL}/companies/public/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Cache the successful response
        this.cacheService.set(cacheKey, data, cacheTTL);
        return data;
      })
      .catch(error => {
        console.error('Error fetching company details:', error);
        throw error;
      });
  }
}

export default NetworkService;