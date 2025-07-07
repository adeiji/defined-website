import { WindowCleaningEstimate } from '../models/models';
import { Config } from '../config';

/**
 * Make API request without authentication (public website)
 */
const makeRequest = async (url: string, options: RequestInit = {}, requireAuth: boolean = false): Promise<Response> => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // No authentication needed for public website
    if (requireAuth) {
        console.warn('Authentication requested but not available in public website');
    }

    return fetch(url, {
        ...options,
        headers,
    });
};

/**
 * Saves a window cleaning estimate via backend API
 * @param estimate The window cleaning estimate to save
 * @returns Promise with the saved estimate ID
 */
export const saveWindowCleaningEstimate = async (estimate: WindowCleaningEstimate): Promise<string> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning`, {
            method: 'POST',
            body: JSON.stringify({ estimate }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save window cleaning estimate');
        }

        const result = await response.json();
        return result.data.estimateId;
    } catch (error) {
        console.error('Error saving window cleaning estimate:', error);
        throw error;
    }
};

/**
 * Gets a window cleaning estimate by ID via backend API
 * @param estimateId The ID of the estimate to retrieve
 * @returns Promise with the estimate or null if not found
 */
export const getWindowCleaningEstimateById = async (estimateId: string): Promise<WindowCleaningEstimate | null> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning/${estimateId}`);
        
        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get window cleaning estimate');
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error getting window cleaning estimate:', error);
        throw error;
    }
};

/**
 * Gets window cleaning estimates by email via backend API
 * @param email The email address to search for
 * @returns Promise with an array of matching estimates
 */
export const getWindowCleaningEstimatesByEmail = async (email: string): Promise<WindowCleaningEstimate[]> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning/by-email/${encodeURIComponent(email)}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get window cleaning estimates by email');
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error getting window cleaning estimates by email:', error);
        throw error;
    }
};

/**
 * Gets all window cleaning estimates (admin only)
 * @returns Promise with an array of all estimates
 */
export const getAllWindowCleaningEstimates = async (): Promise<WindowCleaningEstimate[]> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning/admin/all`, {}, true);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get all window cleaning estimates');
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error getting all window cleaning estimates:', error);
        throw error;
    }
};

/**
 * Search window cleaning estimates (admin only)
 * @param searchCriteria Search criteria object
 * @returns Promise with an array of matching estimates
 */
export const searchWindowCleaningEstimates = async (searchCriteria: {
    email?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
}): Promise<WindowCleaningEstimate[]> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning/admin/search`, {
            method: 'POST',
            body: JSON.stringify(searchCriteria),
        }, true);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to search window cleaning estimates');
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error searching window cleaning estimates:', error);
        throw error;
    }
};

/**
 * Update window cleaning estimate status (admin only)
 * @param estimateId The ID of the estimate
 * @param status The new status
 * @returns Promise<void>
 */
export const updateWindowCleaningEstimateStatus = async (estimateId: string, status: string): Promise<void> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning/${estimateId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }, true);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update window cleaning estimate status');
        }
    } catch (error) {
        console.error('Error updating window cleaning estimate status:', error);
        throw error;
    }
};

/**
 * Update window cleaning estimate data (admin only)
 * @param estimateId The ID of the estimate
 * @param updateData The data to update
 * @returns Promise<void>
 */
export const updateWindowCleaningEstimate = async (estimateId: string, updateData: Partial<WindowCleaningEstimate>): Promise<void> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning/${estimateId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        }, true);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update window cleaning estimate');
        }
    } catch (error) {
        console.error('Error updating window cleaning estimate:', error);
        throw error;
    }
};

/**
 * Delete window cleaning estimate (admin only)
 * @param estimateId The ID of the estimate
 * @returns Promise<void>
 */
export const deleteWindowCleaningEstimate = async (estimateId: string): Promise<void> => {
    try {
        const response = await makeRequest(`${Config.Env.ApiBaseUrl}/window-cleaning/${estimateId}`, {
            method: 'DELETE',
        }, true);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete window cleaning estimate');
        }
    } catch (error) {
        console.error('Error deleting window cleaning estimate:', error);
        throw error;
    }
};