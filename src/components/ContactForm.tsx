import React, { useState, useRef } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trackConversion } from '../utils/tracking';
import {
    faUser,
    faAt,
    faPhone,
    faLocationDot,
    faTools,
    faComment,
    faPaperPlane,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { Config } from '../config';
import NetworkService from '../services/networkService';

// Styles for the contact form
export const contactFormStyles = `
.contact-form-container {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
}

.contact-form-container h2 {
    color: #074a5a;
}

.services-checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.submit-button {
    background-color: #074a5a;
    border-color: #074a5a;
    padding: 0.75rem 2rem;
    transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
    background-color: #053744;
    border-color: #053744;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .services-checkboxes {
        grid-template-columns: 1fr;
    }
}
`;

interface ContactFormProps {
    title?: string;
    description?: string;
    sourcePage?: string;
    defaultServices?: {
        windowCleaning?: boolean;
        windowTinting?: boolean;
        pressureWashing?: boolean;
        solarScreens?: boolean;
        normalScreens?: boolean;
    };
    customServices?: Array<{
        id: string;
        label: string;
        name: string;
        defaultChecked?: boolean;
    }>;
    notificationPhone?: string;
    conversionId?: string;
    onSubmitSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
    title = "Request a Free Consultation",
    description = "Fill out the form below to request a free consultation. We'll contact you within 24 hours to discuss your needs.",
    sourcePage = "website",
    defaultServices = {
        windowCleaning: false,
        windowTinting: false,
        pressureWashing: false,
        solarScreens: false,
        normalScreens: false
    },
    customServices,
    notificationPhone = Config.Env.PhoneNumbers.Notification,
    conversionId,
    onSubmitSuccess
}) => {
    // Form state
    const [formState, setFormState] = useState(() => {
        const initialServices: any = {};
        
        if (customServices) {
            // Use custom services
            customServices.forEach(service => {
                initialServices[service.name] = service.defaultChecked || false;
            });
        } else {
            // Use default services
            initialServices.windowCleaning = defaultServices.windowCleaning || false;
            initialServices.windowTinting = defaultServices.windowTinting || false;
            initialServices.pressureWashing = defaultServices.pressureWashing || false;
            initialServices.solarScreens = defaultServices.solarScreens || false;
            initialServices.normalScreens = defaultServices.normalScreens || false;
        }
        
        return {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            message: '',
            services: initialServices
        };
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    // Form refs
    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle checkbox changes
    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormState(prev => ({
            ...prev,
            services: {
                ...prev.services,
                [name]: checked
            }
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        e.stopPropagation(); // Stop event propagation
        if (submitting) return false; // Prevent multiple submissions
        setSubmitting(true);
        setFormError('');

        // Get the form data from the event
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const formValues = Object.fromEntries(formData.entries());

        // Get the current form target to extract service checkboxes
        // (since checkboxes don't appear in formData if unchecked)
        const form = e.currentTarget;
        const serviceCheckboxes = form.querySelectorAll('input[type="checkbox"]');

        // Basic validation
        if (!formValues.fullName || !formValues.email || !formValues.phone || !formValues.address) {
            setFormError('Please fill in all required fields');
            setSubmitting(false);
            return;
        }

        try {
            const networkService = new NetworkService();

            // Get selected services as an array by checking DOM elements
            const selectedServices: string[] = [];
            serviceCheckboxes.forEach((checkbox: Element) => {
                if ((checkbox as HTMLInputElement).checked) {
                    // Extract service name from the checkbox name
                    const serviceName = (checkbox as HTMLInputElement).name;
                    selectedServices.push(serviceName);
                }
            });

            // Submit the contact request via API
            const contactResponse = await networkService.post('/contact-requests', {
                fullName: formValues.fullName,
                email: formValues.email,
                phone: formValues.phone,
                address: formValues.address,
                message: formValues.message || '',
                services: selectedServices,
                source: sourcePage
            });

            // Track conversion if conversionId is provided
            if (conversionId) {
                trackConversion(conversionId, formValues.phone as string, formValues.email as string);
            }

            // Send text message with form information
            try {
                // Format the services into a readable list
                const servicesText = selectedServices.length > 0
                    ? selectedServices.map(s => {
                        // Convert camelCase to readable format (e.g., windowCleaning -> Window Cleaning)
                        return s.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    }).join(', ')
                    : 'None selected';

                // Prepare the message text
                const messageText: string = `
New Contact Request:
Name: ${formValues.fullName}
Email: ${formValues.email}
Phone: ${formValues.phone}
Address: ${formValues.address}
Services: ${servicesText}
Message: ${formValues.message || 'None provided'}
ID: ${contactResponse.data?.id || 'Unknown'}
Source: ${sourcePage}
`;

                // For debugging - log the notification phone and the URL
                console.log('Notification phone:', notificationPhone);
                console.log('Message URL:', `${Config.Env.ApiBaseUrl}/sendCustomMessage`);
                console.log('From number:', Config.Env.PhoneNumbers.Twilio);

                // Send the text message to the notification phone
                const response = await fetch(`${Config.Env.ApiBaseUrl}/sendCustomMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phoneNumber: notificationPhone,
                        message: messageText,
                        fromNumber: Config.Env.PhoneNumbers.Twilio,
                    })
                });

                // Log the entire response for debugging
                console.log('Response status:', response.status);
                const responseText = await response.text();
                console.log('Response body:', responseText);

                if (!response.ok) {
                    console.error('Error sending text notification:', responseText);
                } else {
                    console.log('Message sent successfully!');
                }
            } catch (error) {
                // Log error but don't fail the form submission if text fails
                console.error('Error sending text message notification:', error);
            }

            setFormSubmitted(true);

            // Call the onSubmitSuccess callback if provided
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }

            // Reset the form to empty values
            const resetServices: any = {};
            if (customServices) {
                customServices.forEach(service => {
                    resetServices[service.name] = false;
                });
            } else {
                resetServices.windowCleaning = false;
                resetServices.windowTinting = false;
                resetServices.pressureWashing = false;
                resetServices.solarScreens = false;
                resetServices.normalScreens = false;
            }
            
            setFormState({
                fullName: '',
                email: '',
                phone: '',
                address: '',
                message: '',
                services: resetServices
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setFormError('There was an error submitting the form. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-form-container">
            <style>{contactFormStyles}</style>
            <h2 className="section-title">{title}</h2>
            <hr />
            <p className="text-center mb-4">
                {description}
            </p>

            {formSubmitted ? (
                <Alert variant="success" className="text-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="mb-3" size="2x" />
                    <h4>Thank You!</h4>
                    <p>Your request has been submitted successfully. One of our representatives will contact you shortly.</p>
                </Alert>
            ) : (
                <Form onSubmit={handleSubmit} id="contactForm">
                    {formError && (
                        <Alert variant="danger">
                            {formError}
                        </Alert>
                    )}

                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>
                            <FontAwesomeIcon icon={faUser} className="me-2" /> Full Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            ref={fullNameRef}
                            type="text"
                            name="fullName"
                            value={formState.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            autoComplete="name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>
                            <FontAwesomeIcon icon={faAt} className="me-2" /> Email Address <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            ref={emailRef}
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                            autoComplete="email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>
                            <FontAwesomeIcon icon={faPhone} className="me-2" /> Phone Number <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            ref={phoneRef}
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                            autoComplete="tel"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>
                            <FontAwesomeIcon icon={faLocationDot} className="me-2" /> Address <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            ref={addressRef}
                            type="text"
                            name="address"
                            value={formState.address}
                            onChange={handleInputChange}
                            placeholder="Enter your full address"
                            required
                            autoComplete="street-address"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formServices">
                        <Form.Label>
                            <FontAwesomeIcon icon={faTools} className="me-2" /> Services Needed (Select all that apply)
                        </Form.Label>
                        <div className="services-checkboxes">
                            {customServices ? (
                                // Render custom services
                                customServices.map((service) => (
                                    <Form.Check
                                        key={service.id}
                                        type="checkbox"
                                        id={service.id}
                                        label={service.label}
                                        name={service.name}
                                        checked={formState.services[service.name] || false}
                                        onChange={handleServiceChange}
                                        className="mb-2"
                                    />
                                ))
                            ) : (
                                // Render default services
                                <>
                                    <Form.Check
                                        type="checkbox"
                                        id="service-window-cleaning"
                                        label="Window Cleaning"
                                        name="windowCleaning"
                                        checked={formState.services.windowCleaning}
                                        onChange={handleServiceChange}
                                        className="mb-2"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="service-window-tinting"
                                        label="Window Tinting"
                                        name="windowTinting"
                                        checked={formState.services.windowTinting}
                                        onChange={handleServiceChange}
                                        className="mb-2"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="service-pressure-washing"
                                        label="Pressure Washing"
                                        name="pressureWashing"
                                        checked={formState.services.pressureWashing}
                                        onChange={handleServiceChange}
                                        className="mb-2"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="service-solar-screens"
                                        label="Solar Screens"
                                        name="solarScreens"
                                        checked={formState.services.solarScreens}
                                        onChange={handleServiceChange}
                                        className="mb-2"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        id="service-normal-screens"
                                        label="Normal Screens"
                                        name="normalScreens"
                                        checked={formState.services.normalScreens}
                                        onChange={handleServiceChange}
                                        className="mb-2"
                                    />
                                </>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formMessage">
                        <Form.Label>
                            <FontAwesomeIcon icon={faComment} className="me-2" /> Additional Message (Optional)
                        </Form.Label>
                        <Form.Control
                            ref={messageRef}
                            as="textarea"
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            placeholder="Enter any additional details or questions you have"
                            rows={4}
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="submit-button"
                            size="lg"
                        >
                            {submitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" /> Submit Request
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default ContactForm;