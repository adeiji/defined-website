export type Message = {
    phoneNumber: string,
    date: any,
    type: string
}

export type Postcard = {
    address: string,
    date: any,
    type: string
}

export type Customer = {
    firstName?: string,
    lastName?: string,
    address?: string,
    phoneNumber?: string,
    zipCode?: number,
    email?: string,
    area?: string
}

export interface Invoice {
    fullName: string,
    address: string,
    title: string,
    message: string,
    amount: number,
    servicesDone: string[],
    invoiceLink: string,
    status: string,
    askFor?: string,
    clientId: string,
    id: string,
    email?: string,
    isEstimate?: boolean,
    estimateId?: string
}

export type SurveyObject = {
    name?: string,
    servicesProvided?: string[]
    whyUs?: string,
    moneysWorth?: string,
    enjoyedAboutService?: string,
    improvements?: string,
    rating?: number,
    referrals?: any[],
    email?: string,
    dateAdded?: any,
    contactedReferrals?: boolean
}

export type PayingClient = {
    firstName: string,
    lastName?: string,
    address: string,
    phoneNumber?: string,
    email?: string,
    zipCode: string,
    // Firebase saves date objects as a FirebaseTimestamp which Typescript is unaware of, so we need to handle the date as object type any
    dateOfService?: any,
    costOfService?: number,
    servicesProvided?: string[],
    notes?: string,
    id?: string,
    howCustomerFoundUs?: string,
    lineItems?: any[],
    services?: any[],
    misc?: any,
    appointments?: Appointment[],
    dateCreated?: any,
    discounts?: any[],
}

export type Panes = {
    small?: number,
    medium?: number,
    large?: number,
    veryLarge?: number
}

export type GeneralInformation = {
    howHearAboutUs?: string,
    floorsAboveGround?: string,
    basement?: boolean,
    houseSize?: string,
    residential?: boolean
}

export type Screens = {
    normal?: number,
    sun?: number
}

export type Misc = {
    canEmail?: boolean,
    canText?: boolean,
    additionalInfo?: string
}

export type Estimate = {
    Customer?: Customer,
    GeneralInformation?: GeneralInformation,
    Panes?: Panes,
    Screens?: Screens,
    Misc?: Misc
}

export type SelectedService = {
    service: string,
    price: number,
    amount?: number,
    packageType?: 'defined' | 'standard'
}

export type WindowCleaningEstimate = {
    id?: string,
    Customer?: Customer,
    GeneralInformation?: GeneralInformation,
    Panes?: Panes,
    Screens?: Screens,
    Misc?: Misc,
    mainService?: SelectedService,
    services?: SelectedService[],
    packageType?: 'defined' | 'standard',
    serviceFrequency?: 'one_time' | 'three_months' | 'six_months' | 'yearly',
    serviceFrequencyDiscount?: number,
    totalPrice: number,
    dateCreated?: any,
    dateModified?: any,
    status?: string,
    email?: string
}

export type JobStatus = 'scheduled' | 'heading_to_job' | 'at_job' | 'finished';

export type AppointmentStatusUpdate = {
    employeeId: string,
    status: JobStatus,
    timestamp: any,
    notes?: string,
    location?: {
        latitude: number,
        longitude: number
    },
    travelStartTime?: any,
    travelEndTime?: any,
    workStartTime?: any,
    workEndTime?: any
};

export type EmployeeTimesheet = {
    id?: string,                  // Document ID
    employeeId: string,           // Employee ID
    appointmentId: string,        // Associated appointment
    clientId?: string,            // Associated client
    dateOfService: any,           // Date of service (same as appointment)
    status: JobStatus,            // Current status
    statusHistory: AppointmentStatusUpdate[],  // History of status updates
    travelTimeMinutes: number,    // Total travel time in minutes
    workTimeMinutes: number,      // Total work time in minutes
    travelCost: number,           // Travel cost based on hourly rate
    workCost: number,             // Work cost based on hourly rate
    totalCost: number,            // Total labor cost
    createdAt: any,               // Creation timestamp
    updatedAt: any,               // Last update timestamp
    modified?: boolean            // Flag to track UI modifications
};

export type RecurrencePattern = 'weekly' | 'bi-weekly' | 'monthly' | 'yearly' | 'none';

export type Appointment = {
    clientId?: string,
    dateOfService: any,
    id?: string,
    services: string[],
    servicesProvided: string[],
    total: number,
    notes: string,
    misc?: any,
    startTime: string,
    endTime: string,
    assignedEmployees?: string[], // Array of employee IDs
    status?: JobStatus,
    statusHistory?: AppointmentStatusUpdate[],
    laborCosts?: {
        travelCost: number,
        workCost: number,
        totalCost: number,
        travelTimeMinutes: number,
        workTimeMinutes: number
    },
    servicePrices?: {[key: string]: number}, // Map of service name to price
    // Recurring appointment fields
    isRecurring?: boolean,
    recurrencePattern?: RecurrencePattern,
    recurrenceInterval?: number, // Every X weeks/months
    parentAppointmentId?: string, // For linked recurring appointments
    recurrenceGroup?: string, // ID to group related recurring appointments
    // Notification preferences
    sendNotifications?: boolean, // Whether to send phone and email notifications
    // Public booking
    isPublicBooking?: boolean // Whether this appointment was booked through public scheduling page
}

export type DayAvailability = {
    startTime: string, // format "HH:mm" - 24 hour format
    endTime: string,   // format "HH:mm" - 24 hour format
    isAvailable: boolean
}

export type WeeklyAvailability = {
    monday: DayAvailability,
    tuesday: DayAvailability,
    wednesday: DayAvailability,
    thursday: DayAvailability,
    friday: DayAvailability,
    saturday: DayAvailability,
    sunday: DayAvailability
}

export type EmployeeDocument = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string,
    address?: string,
    isActive: boolean,
    dateCreated: any,
    dateUpdated?: any,
    files: EmployeeFile[],
    notes?: string,
    userId?: string, // Firebase Auth UID for employee if they have an account
    hasAccount?: boolean, // Whether this employee has a user account
    activeAppointmentId?: string, // ID of appointment employee is currently working on
    currentJobStatus?: JobStatus, // Employee's current job status
    availability?: WeeklyAvailability // Employee's weekly availability
}

export type EmployeeFile = {
    id: string,
    name: string,
    type: string,
    url: string,
    dateUploaded: any
}

export type ImportantPlace = {
    id: string,
    name: string,
    address: string,
    email?: string,
    phoneNumber?: string,
    notes?: string,
    category?: string, // For categorizing (e.g., 'office', 'supplier', 'client')
    isFavorite?: boolean, // To prioritize certain places
    dateAdded: any,
    lastModified?: any,
    coordinates?: {
        lat: number,
        lng: number
    }
}

export type Document = {
    id: string,
    name: string,
    type: string,
    url: string,
    size?: number,
    description?: string,
    category?: string, // For categorizing documents (e.g., 'contract', 'manual', 'policy')
    tags?: string[],
    dateUploaded: any,
    lastAccessed?: any,
    lastModified?: any, // Timestamp when the document was last modified
    uploadedBy?: string // User ID who uploaded the document
}
