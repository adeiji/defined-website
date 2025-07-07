import { Customer, Message, PayingClient, Postcard } from "../models/models";
import { Config } from "../config";

enum CommunicationTypes {
    Postcard,
    TextMessage
}
class MessageService {
    
    /**
     * Normalize phone number to ensure it has +1 prefix
     * @param phoneNumber - Phone number to normalize
     * @returns Normalized phone number with +1 prefix
     */
    private normalizePhoneNumber(phoneNumber: string): string {
        if (!phoneNumber) return phoneNumber;
        
        // Remove all non-numeric characters
        let cleaned = phoneNumber.replace(/\D/g, '');
        
        // If it's 10 digits, add 1 at the beginning
        if (cleaned.length === 10) {
            cleaned = '1' + cleaned;
        }
        
        // If it's 11 digits and starts with 1, it's good
        if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return '+' + cleaned;
        }
        
        // If it already has the correct format, return as is
        if (phoneNumber.startsWith('+1') && phoneNumber.replace(/\D/g, '').length === 11) {
            return phoneNumber;
        }
        
        // For any other format, try to make it work
        if (cleaned.length === 11) {
            return '+' + cleaned;
        }
        
        // If we can't normalize it, return the original
        console.warn(`Could not normalize phone number: ${phoneNumber}`);
        return phoneNumber;
    }
    
    /**
     * Make API request without authentication (public website)
     */
    private async makeRequest(url: string, options: RequestInit = {}, requireAuth: boolean = true): Promise<Response> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // No authentication for public website
        if (requireAuth) {
            console.warn('Authentication requested but not available in public website');
        }

        return fetch(url, {
            ...options,
            headers,
        });
    }

    async sendPostcard(customer: PayingClient): Promise<any> {
        try {
            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/send-postcard`, {
                method: 'POST',
                body: JSON.stringify({ customer }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send postcard');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error sending postcard:', error);
            throw error;
        }
    }

    async canSendMessage(customer: PayingClient, type: CommunicationTypes = CommunicationTypes.TextMessage): Promise<boolean> {
        try {
            const messageType = type === CommunicationTypes.Postcard ? 'postcard' : 'sms';
            
            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/can-send`, {
                method: 'POST',
                body: JSON.stringify({ customer, type: messageType }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to check message eligibility');
            }

            const result = await response.json();
            return result.data.canSend;
        } catch (error) {
            console.error('Error checking message eligibility:', error);
            throw error;
        }
    }

    async sendNotification(customer: PayingClient, messageText: string, messageType: string, fromNumber?: string): Promise<any> {
        try {
            if (!customer.phoneNumber) {
                throw new Error("The user has no phone number. There's no way to send a message");
            }

            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/send-notification`, {
                method: 'POST',
                body: JSON.stringify({
                    customer,
                    messageText,
                    messageType,
                    fromNumber: fromNumber || Config.Env.PhoneNumbers.Twilio
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send notification');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }


    async messageSentWithinThirtyDays(messageDate: any): Promise<boolean> {
        try {
            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/check-thirty-days`, {
                method: 'POST',
                body: JSON.stringify({ messageDate }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to check thirty days');
            }

            const result = await response.json();
            return result.data.isWithinThirtyDays;
        } catch (error) {
            console.error('Error checking thirty days:', error);
            // Fallback to local calculation
            try {
                if (messageDate && messageDate.seconds) {
                    const daysDifference = (new Date().getTime() / 1000 - messageDate.seconds) / (3600 * 24);
                    return daysDifference < 30;
                }
                return false;
            } catch (fallbackError) {
                console.error('Error in fallback calculation:', fallbackError);
                return false;
            }
        }
    }

    /**
     * Send a lead notification (public method for website forms)
     */
    async sendLeadNotification(customer: Customer, serviceDetails?: any): Promise<any> {
        try {
            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/send-lead-notification`, {
                method: 'POST',
                body: JSON.stringify({ customer, serviceDetails }),
            }, false); // Don't require auth for public lead notifications

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send lead notification');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error sending lead notification:', error);
            throw error;
        }
    }

    /**
     * Send a chat message (requires auth but not admin)
     */
    async sendChatMessage(phoneNumber: string, message: string, fromNumber?: string, conversationId?: string): Promise<any> {
        try {
            const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
            const normalizedFrom = fromNumber ? this.normalizePhoneNumber(fromNumber) : undefined;
            
            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/send-chat`, {
                method: 'POST',
                body: JSON.stringify({ 
                    phoneNumber: normalizedPhone, 
                    message, 
                    fromNumber: normalizedFrom,
                    conversationId: conversationId 
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send chat message');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error sending chat message:', error);
            throw error;
        }
    }

    /**
     * Send a custom message (admin only)
     */
    async sendCustomMessage(phoneNumber: string, message: string, fromNumber?: string): Promise<any> {
        try {
            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/send-custom`, {
                method: 'POST',
                body: JSON.stringify({ phoneNumber, message, fromNumber }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send custom message');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error sending custom message:', error);
            throw error;
        }
    }

    /**
     * Get message history with search criteria
     */
    async getMessageHistory(searchCriteria: {
        phoneNumber?: string;
        conversationId?: string;
        address?: string;
        type?: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<Message[]> {
        try {
            // Normalize phone number if provided
            const normalizedCriteria = {
                ...searchCriteria,
                phoneNumber: searchCriteria.phoneNumber ? this.normalizePhoneNumber(searchCriteria.phoneNumber) : undefined
            };
            
            const response = await this.makeRequest(`${Config.Env.ApiBaseUrl}/messaging/history`, {
                method: 'POST',
                body: JSON.stringify(normalizedCriteria),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to get message history');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error getting message history:', error);
            throw error;
        }
    }

    /**
     * Send appointment reminder (placeholder for future implementation)
     */
    sendAppointmentReminder(monthsSinceService: number): Promise<any> {
        // TODO: Implement appointment reminder functionality
        return Promise.resolve();
    }

    /**
     * Get conversations list with optional search
     */
    async getConversations(search?: string): Promise<any[]> {
        try {
            const url = new URL(`${Config.Env.ApiBaseUrl}/messaging/conversations`);
            if (search) {
                url.searchParams.append('search', search);
            }
            
            const response = await this.makeRequest(url.toString(), {
                method: 'GET'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to get conversations');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error getting conversations:', error);
            throw error;
        }
    }

    /**
     * Subscribe to real-time message updates for a conversation
     * @param conversationId - The conversation ID to watch messages for
     * @param callback - Callback function that receives updated messages
     * @returns Unsubscribe function
     */
    async subscribeToMessages(
        conversationId: string,
        callback: (messages: any[]) => void
    ): Promise<() => void> {
        try {
            const firebase = await import('firebase');
            const db = firebase.default.firestore();
            
            // Subscribe to messages with this conversationId
            const messagesQuery = db.collection('messages')
                .where('conversationId', '==', conversationId);

            // Set up listener for messages
            const unsubscribe = messagesQuery.onSnapshot((snapshot: any) => {
                const messages: any[] = [];
                snapshot.forEach((doc: any) => {
                    const data = doc.data();
                    messages.push({ ...data, id: doc.id });
                });

                // Sort by date
                messages.sort((a, b) => {
                    const dateA = a.dateCreated?.seconds || a.date?.seconds || 0;
                    const dateB = b.dateCreated?.seconds || b.date?.seconds || 0;
                    return dateA - dateB;
                });

                callback(messages);
            });

            // Return unsubscribe function
            return unsubscribe;
        } catch (error) {
            console.error('Error setting up message subscription:', error);
            throw error;
        }
    }
}

export default MessageService