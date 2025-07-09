import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Image, Modal, Button, Row, Col, Alert, Toast, CardGroup, Form } from 'react-bootstrap'
import CONSTANTS from '../constants'
import { Estimate, WindowCleaningEstimate } from '../models/models'
import Package from './package'
import './quote.css'
import { trackConversion } from '../utils/tracking'
import { saveWindowCleaningEstimate, getWindowCleaningEstimateById, getWindowCleaningEstimatesByEmail } from '../services/WindowCleaningService'
import { Config } from '../config'
import NetworkService from '../services/networkService'

type Pricing = {
    basicBoth?: number,
    basicExt?: number,
    standardBoth?: number,
    standardExt?: number,
    driveway?: number,
    exteriorHouseWashing?: number,
    screenRepair?: number,
    screenBuilding?: number,
    blinds?: number
}

type SelectedService = {
    service: string,
    price: number,
    amount?: number,
    packageType?: 'defined' | 'standard'
}

const Quote = (props: {
    estimateObject: Estimate,
    previousPage: any
}
) => {

    /** The pricing for each service that we offer */
    const [pricing, setPricing] = useState<Pricing>({})
    const [estimate, setEstimate] = useState<Estimate>(props.estimateObject)

    /** The main service that the user has selected */
    const [mainService, setMainService] = useState<SelectedService & { packageType?: string }>()

    /** The list of services that the user has selected. Not including the main service. */
    const [services, setServices] = useState<SelectedService[]>([])

    /** The service object for screen repair */
    const [screenRepairService, setScreenRepairService] = useState<SelectedService>({
        service: CONSTANTS.SCREENS.REPAIR,
        price: 0
    })

    /** The service object for screen building */
    const [screenBuildingService, setScreenBuildingService] = useState<SelectedService>({
        service: CONSTANTS.SCREENS.BUILDING,
        price: 0
    })

    const [blindsService, setBlindsService] = useState<SelectedService>({
        service: CONSTANTS.BLINDS,
        price: 0
    })

    /** Whether or not to show the modal explaining to the user the dangers of going back */
    const [showPreviousModal, setShowPreviousModal] = useState(false)

    const [finished, setFinished] = useState(false)

    const [error, setError] = useState("")

    const [processing, setProcessing] = useState(false)

    const [noPackage, setNoPackage] = useState(false)

    // State for toast notification
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    // State to track if the estimate has been saved to Firestore
    const [estimateSaved, setEstimateSaved] = useState(false)
    const [estimateId, setEstimateId] = useState<string>('')

    // State to track if the current user is an admin
    const [isAdmin, setIsAdmin] = useState(false)

    // State to track if minimum pricing is applied
    const [isMinimumApplied, setIsMinimumApplied] = useState(false)

    // Service frequency state
    const [selectedServiceFrequency, setSelectedServiceFrequency] = useState<'one_time' | 'three_months' | 'six_months' | 'yearly'>('one_time')
    // Service frequency options with their discounts
    const serviceFrequencies = [
        { id: 'one_time', name: 'One Time Service', description: 'Single service, no commitment', discountPercent: 0 },
        { id: 'three_months', name: 'Every 3 Months', description: 'Quarterly service schedule', discountPercent: 20 },
        { id: 'six_months', name: 'Every 6 Months', description: 'Bi-annual service schedule', discountPercent: 15 },
        { id: 'yearly', name: 'Once a Year', description: 'Annual service schedule', discountPercent: 10 }
    ]

    // Function to apply service frequency discount to a price
    const applyServiceFrequencyDiscount = (basePrice: number): number => {
        const frequencyDiscount = serviceFrequencies.find(f => f.id === selectedServiceFrequency)?.discountPercent || 0;
        return Math.round(basePrice * (1 - frequencyDiscount / 100));
    }

    const updateMainService = (service: SelectedService & { packageType?: string }) => {

        if (mainService?.service === service.service && mainService?.packageType === service.packageType) {
            setMainService(undefined)
            // Save update to Firestore after state update
            setTimeout(() => updateSavedEstimate(), 0)
            return
        }

        setMainService(service)
        // Save update to Firestore after state update
        setTimeout(() => updateSavedEstimate(), 0)
    }

    const getHouseSize = () => {

        if (!estimate.GeneralInformation?.houseSize) { return }

        switch (estimate.GeneralInformation.houseSize) {
            case CONSTANTS.HOUSESIZE.SMALLEST:
                return 1600
            case CONSTANTS.HOUSESIZE.SMALLER:
                return 1800
            case CONSTANTS.HOUSESIZE.SMALL:
                return 2300
            case CONSTANTS.HOUSESIZE.MEDIUM:
                return 2800
            case CONSTANTS.HOUSESIZE.MEDIUMLARGE:
                return 3300
            case CONSTANTS.HOUSESIZE.LARGE:
                return 3800
            case CONSTANTS.HOUSESIZE.VERYLARGE:
                return 4500
            case CONSTANTS.HOUSESIZE.HUGE:
                return 5000
            default:
                return 0
        }
    }

    const getHouseStories = () => {
        if (!estimate.GeneralInformation?.floorsAboveGround) { return }

        switch (estimate.GeneralInformation.floorsAboveGround) {
            case CONSTANTS.FLOORS.ONE_STORY:
                return 1
            case CONSTANTS.FLOORS.TWO_STORY:
                return 2
            case CONSTANTS.FLOORS.THREE_STORY:
                return 3
            default:
                return 0
        }
    }

    // This functionality has been moved to estimator.tsx
    const getUrlParameter = (name: string): string | null => {
        const url = window.location.href;
        name = name.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Function to save the initial estimate to Firestore
    const saveInitialEstimate = () => {
        if (estimateSaved || !estimate.Customer?.email) {
            return;
        }

        // Prepare initial estimate data
        const initialEstimate: WindowCleaningEstimate = {
            ...estimate,
            totalPrice: 0, // Initial total price is 0 since no service is selected yet
            email: estimate.Customer?.email,
            status: 'started',
            dateCreated: new Date(), // Will be converted to Firebase timestamp on save
        }

        // Save to Firestore
        saveWindowCleaningEstimate(initialEstimate)
            .then(id => {
                console.log("Initial estimate saved with ID:", id);
                setEstimateId(id);
                setEstimateSaved(true);
            })
            .catch(err => {
                console.error("Error saving initial estimate:", err);
            });
    }

    // Function to update the estimate when services change
    const updateSavedEstimate = () => {
        if (!estimateSaved || !estimateId) {
            return;
        }

        // Calculate current total price
        const mainServicePrice = mainService?.price || 0;
        const addOnsPrice = services.reduce((total, service) => total + service.price, 0) || 0;
        const totalPrice = mainServicePrice + addOnsPrice;

        // Prepare updated estimate
        const updatedEstimate: WindowCleaningEstimate = {
            ...estimate,
            id: estimateId,
            mainService,
            services,
            packageType: mainService?.packageType || undefined,
            serviceFrequency: selectedServiceFrequency,
            serviceFrequencyDiscount: serviceFrequencies.find(f => f.id === selectedServiceFrequency)?.discountPercent || 0,
            totalPrice,
            email: estimate.Customer?.email,
            status: 'in_progress',
        }

        // Save updated estimate
        saveWindowCleaningEstimate(updatedEstimate)
            .then(() => {
                console.log("Estimate updated with selected services");
            })
            .catch(err => {
                console.error("Error updating estimate:", err);
            });
    }

    // Initialize the estimate when it's provided
    useEffect(() => {
        // If the estimate has an email and is not already saved, save it
        if (estimate.Customer?.email && !estimateSaved) {
            saveInitialEstimate();
        }
    }, [estimate.Customer?.email, estimateSaved]);

    // Initialize network service
    const networkService = new NetworkService();

    // Always set isAdmin to false for public users
    useEffect(() => {
        setIsAdmin(false);
    }, []);

    // Handle pricing calculation
    useEffect(() => {

        let panes = estimate.Panes
        let screens = estimate.Screens

        if (!panes || !screens) { return }

        let paneCount = (panes.small ?? 0) + (panes.medium ?? 0) + (panes.large ?? 0) + (panes.veryLarge ?? 0)

        let screenPrice = 0
        screenPrice = screenPrice + ((screens.sun ?? 0) * 10)

        let windowCleaningBoth = (((panes.small ?? 0) * 7.0 + (panes.medium ?? 0) * 10.0 + (panes.large ?? 0) * 9 + (panes.veryLarge ?? 0) * 10) ?? 0) + screenPrice

        let windowCleaningExt = (((panes.small ?? 0) * 4.0 + (panes.medium ?? 0) * 5.0 + (panes.large ?? 0) * 6 + (panes.veryLarge ?? 0) * 7) ?? 0) + screenPrice

        // Calculate standard package prices (1/2 of defined package price)
        let originalStandardBoth = Math.round(windowCleaningBoth * 0.5)
        let originalStandardExt = Math.round(windowCleaningExt * 0.5)
        let standardWindowCleaningBoth = Math.max(150, originalStandardBoth)
        let standardWindowCleaningExt = Math.max(150, originalStandardExt)

        // 1-story and 2-story buildings have the same price
        // Only 3-story buildings have a multiplier
        if (getHouseStories() == 3) {
            windowCleaningExt = windowCleaningExt * 2.2
            windowCleaningBoth = windowCleaningBoth * 2.2
        }

        // Store original calculated prices before applying minimum
        let originalDefinedExt = windowCleaningExt
        let originalDefinedBoth = windowCleaningBoth

        // Apply minimum price of $150 to Defined packages
        windowCleaningExt = Math.max(150, windowCleaningExt)
        windowCleaningBoth = Math.max(150, windowCleaningBoth)

        // Check if minimum pricing is being applied to any package
        let minimumApplied = originalDefinedExt < 150 || originalDefinedBoth < 150 ||
            originalStandardExt < 150 || originalStandardBoth < 150
        setIsMinimumApplied(minimumApplied)

        let myPricing = pricing
        myPricing.basicBoth = windowCleaningBoth
        myPricing.basicExt = windowCleaningExt
        myPricing.standardBoth = standardWindowCleaningBoth
        myPricing.standardExt = standardWindowCleaningExt
        myPricing.driveway = (getHouseSize() ?? 0) * .15
        myPricing.exteriorHouseWashing = ((getHouseSize() ?? 0) * .3) * (getHouseStories() ?? 0)
        myPricing.blinds = paneCount * 5

        setBlindsService({
            service: CONSTANTS.BLINDS,
            price: myPricing.blinds
        })

        setPricing((prevState) => ({
            ...prevState,
            basicBoth: windowCleaningBoth,
            basicExt: windowCleaningExt,
            standardBoth: standardWindowCleaningBoth,
            standardExt: standardWindowCleaningExt,
            driveway: myPricing.driveway,
            exteriorHouseWashing: myPricing.exteriorHouseWashing,
            blinds: myPricing.blinds
        }))

    }, [estimate])

    // Update saved estimate when service frequency changes
    useEffect(() => {
        if (estimateSaved && estimateId && mainService) {
            // Update the main service price with the new discount
            const updatedMainService = {
                ...mainService,
                price: applyServiceFrequencyDiscount(
                    mainService.packageType === 'defined' ?
                        (mainService.service === CONSTANTS.WINDOWS.BOTH ? (pricing.basicBoth ?? 0) : (pricing.basicExt ?? 0)) :
                        (mainService.service === CONSTANTS.WINDOWS.BOTH ? (pricing.standardBoth ?? 0) : (pricing.standardExt ?? 0))
                )
            };
            setMainService(updatedMainService);
            updateSavedEstimate();
        }
    }, [selectedServiceFrequency]);

    const screensToRepair = (numOfScreens: string) => {
        let myPricing = pricing

        myPricing.screenRepair = 25 * parseInt(numOfScreens)
        setPricing((prevState) => ({
            ...prevState,
            screenRepair: myPricing.screenRepair
        }))

        setScreenRepairService({
            service: CONSTANTS.SCREENS.REPAIR,
            price: myPricing.screenRepair,
            amount: parseInt(numOfScreens)
        })
    }

    const screensToBuild = (numOfScreens: string) => {
        let myPricing = pricing

        myPricing.screenBuilding = 50 * parseInt(numOfScreens)
        setPricing((prevState) => ({
            ...prevState,
            screenBuilding: myPricing.screenBuilding
        }))

        setScreenBuildingService({
            service: CONSTANTS.SCREENS.BUILDING,
            price: myPricing.screenBuilding,
            amount: parseInt(numOfScreens)
        })
    }

    const addService = (service: SelectedService) => {

        if (serviceSelected(service)) {
            removeService(service)
            return
        }

        setServices(services => [...services, service])
        // Save update to Firestore after state update
        setTimeout(() => updateSavedEstimate(), 0)
    }

    const removeService = (service: SelectedService) => {
        let myServices = [...services]
        let index = myServices.map(s => s.service).indexOf(service.service)
        myServices.splice(index, 1)
        setServices(myServices)
        // Save update to Firestore after state update
        setTimeout(() => updateSavedEstimate(), 0)
    }

    const serviceSelected = (service: SelectedService) => {
        let myServices = services

        for (let index = 0; index < services.length; index++) {
            const s = services[index];

            if (s.service == service.service) {
                return true
            }
        }

        return false
    }

    const getAddOnsPrice = () => {
        return services.reduce((a, b) => a + b.price, 0)
    }

    // UET conversion tracking function for Microsoft Ads
    const uet_report_booking_conversion = () => {
        const totalPrice = getAddOnsPrice() + (mainService?.price ?? 0);
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'book_appointment', { "revenue_value": totalPrice, "currency": "USD" });
    };

    const AreYouSure = () => {
        return (
            <Modal show={true} size="lg" onHide={() => setShowPreviousModal(false)} backdrop="static" centered>
                <Modal.Header closeButton className="border-0">
                    <div className="section-heading-with-icon w-100 justify-content-center">
                        <h2 className="section-title mb-0">Are you sure?</h2>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-4 text-center">
                    <div className="numbered-list-container my-3">
                        <p>If you go back, you'll lose any information you've entered on this page.</p>
                        <p className="mt-3 mb-0">Are you sure you want to go back?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center pb-4">
                    <Button
                        className="modern-cta-button mr-3"
                        style={{ backgroundColor: "#074a5a", color: "white" }}
                        onClick={() => setShowPreviousModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        className="modern-cta-button"
                        onClick={props.previousPage}>
                        Yes, Go Back
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const NoPackageSelected = () => {
        return (
            <Modal show={true} size="lg" onHide={() => setNoPackage(false)} backdrop="static" centered>
                <Modal.Header closeButton className="border-0">
                    <div className="section-heading-with-icon w-100 justify-content-center">
                        <h2 className="section-title mb-0">Please Select a Service</h2>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-4 text-center">
                    <div className="numbered-list-container my-3">
                        <p>In order to book, you must select at least one service.</p>
                        <p className="mt-3 mb-0">Please choose a window cleaning option or add-on service.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center pb-4">
                    <Button
                        className="modern-cta-button"
                        onClick={() => setNoPackage(false)}>
                        Okay, I'll Select a Service
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const sendQuote = () => {
        console.log('sendQuote function started')

        if (!mainService && services.length == 0) {
            console.log('No service selected, showing no package modal')
            setNoPackage(true)
            return
        }

        console.log('Setting processing state to true')
        setProcessing(true)
        setError("") // Clear any previous errors

        console.log('Preparing estimate data')
        let estimate: any = props.estimateObject
        estimate.mainService = mainService
        estimate.packageType = mainService?.packageType || 'defined' // Save package type
        estimate.services = services
        estimate.email = estimate.Customer?.email || ''
        estimate.serviceFrequency = selectedServiceFrequency
        estimate.serviceFrequencyDiscount = serviceFrequencies.find(f => f.id === selectedServiceFrequency)?.discountPercent || 0

        // Calculate total price
        const mainServicePrice = mainService?.price || 0
        const addOnsPrice = services.reduce((total, service) => total + service.price, 0) || 0
        estimate.totalPrice = mainServicePrice + addOnsPrice

        console.log('Estimate data prepared:', {
            mainService,
            packageType: estimate.packageType,
            services,
            totalPrice: estimate.totalPrice
        })

        // Save the package type with the estimate
        if (mainService?.packageType) {
            estimate.packageType = mainService.packageType
        }

        // Save estimate to Firestore with completed status
        const windowCleaningEstimate: WindowCleaningEstimate = {
            ...estimate,
            id: estimateId || undefined,
            totalPrice: estimate.totalPrice,
            status: 'completed' // Mark as completed when user is ready to book
        }

        console.log('Attempting to save to Firestore')
        // Save to Firestore first
        saveWindowCleaningEstimate(windowCleaningEstimate)
            .then(savedEstimateId => {
                console.log("Saved completed estimate to Firestore with ID:", savedEstimateId)
                if (!estimateId) {
                    setEstimateId(savedEstimateId);
                    setEstimateSaved(true);
                }

                console.log('Preparing API request')
                // Then send to backend API
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(estimate)
                }

                console.log('Sending API request to:', `${Config.Env.ApiBaseUrl}/sendMessage`)
                return fetch(`${Config.Env.ApiBaseUrl}/sendMessage`, requestOptions)
            })
            .then(response => {
                console.log('API response received:', response.status)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Successfully sent quote:", data)
                setFinished(true)
                setProcessing(false)
            })
            .catch(error => {
                console.error("Error in quote submission process:", error)

                // If the Firestore save succeeded but API call failed, still allow proceeding
                if (estimateId || estimateSaved) {
                    console.log("Firestore save succeeded, proceeding despite API error")
                    setFinished(true)
                    setProcessing(false)
                } else {
                    console.error("Both Firestore and API calls failed")
                    setError(`Error processing your request: ${error.message}. Please try again or contact us directly.`)
                    setProcessing(false)
                }
            })
    }

    /**
     * Sends the estimate as an email to the customer and to the company
     */
    const sendEstimateEmail = () => {
        // For admins, only require email and first name
        if (!estimate.Customer?.email) {
            setError("Customer email is required to send estimate")
            return
        }

        if (!estimate.Customer?.firstName) {
            setError("Customer first name is required to send estimate")
            return
        }

        setProcessing(true)

        // Prepare the estimate data for saving
        let estimateData: any = { ...estimate }
        estimateData.mainService = mainService
        estimateData.packageType = mainService?.packageType || 'defined'
        estimateData.services = services
        estimateData.email = estimate.Customer?.email
        estimateData.serviceFrequency = selectedServiceFrequency
        estimateData.serviceFrequencyDiscount = serviceFrequencies.find(f => f.id === selectedServiceFrequency)?.discountPercent || 0

        // Calculate total price
        const mainServicePrice = mainService?.price || 0
        const addOnsPrice = services.reduce((total, service) => total + service.price, 0) || 0
        estimateData.totalPrice = mainServicePrice + addOnsPrice

        // Make sure we have an ID for this estimate
        if (!estimateId && estimateData.email) {
            // Save the estimate first to generate an ID
            const windowCleaningEstimate: WindowCleaningEstimate = {
                ...estimateData,
                totalPrice: estimateData.totalPrice,
                status: 'sent_email' // Track that we sent an email for this estimate
            }

            saveWindowCleaningEstimate(windowCleaningEstimate)
                .then(savedEstimateId => {
                    console.log("Saved estimate before sending email. ID:", savedEstimateId)
                    setEstimateId(savedEstimateId)
                    setEstimateSaved(true)
                    sendEmail(savedEstimateId, estimateData)
                })
                .catch(error => {
                    console.error("Error saving estimate:", error)
                    setError(error.message)
                    setProcessing(false)
                })
        } else {
            // We already have an ID, send the email directly
            sendEmail(estimateId, estimateData)
        }
    }

    /**
     * Helper function to send the actual email request to the backend
     */
    const sendEmail = (estimateId: string, estimateData: any) => {
        // Prepare the email data
        // For admins, lastName is optional
        const customerName = estimate.Customer?.lastName
            ? `${estimate.Customer?.firstName} ${estimate.Customer?.lastName}`
            : estimate.Customer?.firstName || '';

        const emailData = {
            customerName: customerName,
            customerEmail: estimate.Customer?.email,
            ccEmail: 'info@definedcleaning.com', // Always send a copy to the company
            estimateId: estimateId,
            estimate: estimateData
        }

        // Send to backend API
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        }

        fetch(`${Config.Env.ApiBaseUrl}/estimates/window-cleaning/send-email`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                console.log("Email sent successfully:", data)
                setProcessing(false)
                // Show success toast
                setToastMessage(`Email sent successfully to ${estimate.Customer?.email}`)
                setShowToast(true)
            })
            .catch(error => {
                console.error("Error sending email:", error)
                setError(error.message)
                setProcessing(false)
            })
    }

    const Quote = () => {
        return (
            <div className="printme" style={{ backgroundColor: 'white' }}>
                {
                    noPackage && <NoPackageSelected />
                }
                <div className="mb-4">
                    <div className="my-4">
                        <h5>THE SERVICES YOU'VE SELECTED:</h5>
                    </div>

                    {/* PERSONAL INFORMATION */}
                    <Row className="mb-3">
                        <Col xs="10">
                            <strong>Personal Information</strong>
                            <div className="mt-2">{estimate.Customer?.firstName} {estimate.Customer?.lastName}</div>
                            <div>{estimate.Customer?.address}, {estimate.Customer?.zipCode}, {estimate.Customer?.area}</div>
                            <div>{estimate.Customer?.phoneNumber}</div>
                            <div>{estimate.Customer?.email}</div>
                        </Col>
                    </Row>
                    <hr />

                    {/* GENERAL INFORMATION */}
                    <Row className="mb-3">
                        <Col xs="10">
                            <strong>General Information</strong>
                            <div className="mt-2">{estimate.GeneralInformation?.floorsAboveGround}</div>
                            <div className="mt-2">{estimate.GeneralInformation?.houseSize}</div>
                            <div className="mt-2">{estimate.GeneralInformation?.residential == true ?
                                "Residential" : "Commercial"}</div>
                            <div className="mt-3"><strong>NOTES:</strong> </div>
                            {estimate.Misc?.additionalInfo}
                        </Col>
                    </Row>
                    <hr />

                    <div className="my-2"><strong>Services</strong></div>

                    {
                        mainService &&
                        <div>
                            <Row className="my-2">
                                <Col xs="10">
                                    <div>
                                        <strong>{mainService?.packageType === 'standard' ? 'Standard' : 'Defined'} Package: {mainService?.service}</strong>
                                    </div>
                                    <div className="ml-4">
                                        Window Panes x {(estimate.Panes?.small ?? 0) + (estimate.Panes?.medium ?? 0) + (estimate.Panes?.large ?? 0) + (estimate.Panes?.veryLarge ?? 0)}
                                    </div>
                                    <div className="ml-4">
                                        Window Screens x {
                                            (estimate.Screens?.normal ?? 0) + (estimate.Screens?.sun ?? 0)
                                        }
                                    </div>
                                    {mainService?.packageType && (
                                        <div className="ml-4">
                                            {mainService.packageType === 'defined' ?
                                                "Includes: Window cleaning, screen polishing, track cleaning" :
                                                "Includes: Window cleaning only"}
                                        </div>
                                    )}
                                </Col>
                                <Col xs="2">
                                    <strong>${mainService?.price ?? 0}</strong>
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        services.map(s => {
                            return (
                                <Row>
                                    <Col xs="10">
                                        <div><strong>{s.service} </strong>{!s.amount ? "" : `x ${s.amount}`}</div>
                                    </Col>
                                    <Col xs="2">
                                        <strong>${s.price}</strong>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    <hr />
                    {/* Service Frequency Discount */}
                    {selectedServiceFrequency !== 'one_time' && (
                        <>
                            <Row className="text-success">
                                <Col xs="10">
                                    <strong>{serviceFrequencies.find(f => f.id === selectedServiceFrequency)?.name} Discount ({serviceFrequencies.find(f => f.id === selectedServiceFrequency)?.discountPercent}%)</strong>
                                </Col>
                                <Col xs="2">
                                    <strong>Applied</strong>
                                </Col>
                            </Row>
                            <hr />
                        </>
                    )}
                    {/* TOTAL PRICE */}
                    <Row>
                        <Col xs="10">
                            <strong>Total Price{selectedServiceFrequency !== 'one_time' ? ' (Per Visit)' : ''}</strong>
                        </Col>
                        <Col xs="2">
                            <strong>${getAddOnsPrice() + (mainService?.price ?? 0)}</strong>
                        </Col>
                    </Row>



                </div>
            </div>
        )
    }

    const print = () => {
        window.print()
    }

    const scheduleAppointment = () => {
        let totalPrice = getAddOnsPrice() + (mainService?.price ?? 0)
        let appointmentUrl = ""

        if (totalPrice < 150) {
            // Job should take about 1 hour
            appointmentUrl = "https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=16635721"
        } else if (totalPrice < 200) {
            // Job should take about 2 hours
            appointmentUrl = "https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=39980877"
        } else if (totalPrice < 300) {
            // Job should take about 3 hours
            appointmentUrl = "https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=40345092"
        } else if (totalPrice < 400) {
            // Job should take about 4 hours
            appointmentUrl = "https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=40345584"
        } else if (totalPrice < 500) {
            // Job should take about 5 hours
            appointmentUrl = "https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=40345587"
        } else {
            // Job should take about 6 hours
            appointmentUrl = "https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=40345591"
        }

        try {
            // Use window.open first as a fallback, then try replace
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                // On mobile, use window.location.href for better compatibility
                window.location.href = appointmentUrl
            } else {
                // On desktop, use replace
                window.location.replace(appointmentUrl)
            }
        } catch (error) {
            console.error("Error navigating to appointment scheduling:", error)
            // Fallback: open in new tab
            window.open(appointmentUrl, '_blank')
        }
    }

    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* Toast notification for email sent */}
            <Toast
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    minWidth: '300px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={5000}
                autohide
            >
                <Toast.Header style={{ backgroundColor: '#388e3c', color: 'white', borderBottom: '1px solid #2e7d32' }}>
                    <strong className="mr-auto">Email Sent</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>

            {/* Toast notification for errors */}
            <Toast
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    minWidth: '300px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
                onClose={() => setError("")}
                show={!!error}
                delay={5000}
                autohide
            >
                <Toast.Header style={{ backgroundColor: '#d32f2f', color: 'white', borderBottom: '1px solid #c62828' }}>
                    <strong className="mr-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{error}</Toast.Body>
            </Toast>

            {/* Loading UI is now handled in estimator.tsx */}
            {
                finished &&
                <div style={{ maxWidth: "900px", margin: "0 auto", backgroundColor: "white" }}>
                    <Modal.Header className="no-printme border-0">
                        <div className="section-heading-with-icon w-100 justify-content-center">
                            <h2 className="section-title mb-0">Thank You!</h2>
                        </div>
                        <Button className="modern-cta-button ml-3 no-printme" onClick={print}>
                            Print Quote
                        </Button>
                    </Modal.Header>
                    <Modal.Body className="px-4" style={{ backgroundColor: "white" }}>

                        <div className="mb-4 no-printme text-center">
                            <p>Thank you so much for reaching out to us! Please click 'Schedule Appointment' below and schedule a date and time for your appointment.</p>
                        </div>
                        <div className="d-flex justify-content-center no-printme mb-4">
                            <Button className="modern-cta-button" onClick={scheduleAppointment}>
                                Schedule Appointment
                            </Button>
                        </div>
                        <hr className="no-printme" />
                        <Quote />
                    </Modal.Body>
                </div>
            }
            {
                !finished &&
                <div style={{ maxWidth: "900px", margin: "0 auto", backgroundColor: "white" }}>
                    <Modal.Header closeButton className="border-0">
                        <div className="section-heading-with-icon w-100 justify-content-center flex-column">
                            <h2 style={{ fontSize: '1.7rem' }} className="section-title mb-0">{estimate.Customer?.firstName}'s quote</h2>
                            <p style={{ fontSize: '1rem', color: '#666', marginTop: '5px' }}>from Defined Window Cleaning and Screens</p>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="px-4" style={{ backgroundColor: "white" }}>

                        {/* Service Frequency Section */}
                        <div className="my-4">
                            <h4 className="text-center my-3" style={{ color: "#074a5a" }}>Service Package Options</h4>
                            <Alert variant="success" className="text-center">
                                <h5>Choose Your Service Frequency & Save!</h5>
                                <p className="mb-0">Regular service packages come with automatic discounts applied to every visit.</p>
                            </Alert>
                            <hr />
                            <div className="row">
                                {serviceFrequencies.map(frequency => (
                                    <div key={frequency.id} className="col-md-6 mb-3">
                                        <div
                                            className={`border rounded p-4 cursor-pointer ${selectedServiceFrequency === frequency.id ? 'border-success bg-light' : ''}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setSelectedServiceFrequency(frequency.id as 'one_time' | 'three_months' | 'six_months' | 'yearly')}
                                        >
                                            <div className="d-flex align-items-center mb-2">
                                                <Form.Check
                                                    type="radio"
                                                    id={`frequency-${frequency.id}`}
                                                    name="service-frequency"
                                                    checked={selectedServiceFrequency === frequency.id}
                                                    onChange={() => setSelectedServiceFrequency(frequency.id as 'one_time' | 'three_months' | 'six_months' | 'yearly')}
                                                    className="me-3"
                                                />
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-0 fw-bold">{frequency.name}</h6>
                                                    <div className="small text-muted">{frequency.description}</div>
                                                </div>
                                                {frequency.discountPercent > 0 && (
                                                    <div className="text-end">
                                                        <span className="badge bg-success fs-6">
                                                            {frequency.discountPercent}% OFF
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {frequency.discountPercent > 0 && (
                                                <div className="mt-2 small text-success">
                                                    <i className="fas fa-tag me-1"></i>
                                                    Save {frequency.discountPercent}% on every service!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {
                            pricing.basicExt != 0 &&
                            <div>
                                <h4 className="text-center my-3" style={{ color: "#074a5a" }}>Window Cleaning</h4>
                                {
                                    isMinimumApplied &&
                                    <Alert style={{ textAlign: "center" }} className="mt-3" variant="info">
                                        <h5><strong>Minimum Service Charge Applied</strong></h5>
                                        <div>Our minimum charge for window cleaning services is $150. This ensures we can provide quality service and cover our operating costs for smaller jobs.</div>
                                    </Alert>
                                }
                                <hr />
                                <h4 className="text-center my-3" style={{ color: "#074a5a", fontWeight: "bold" }}>Defined Package - Premium Service</h4>
                                <div className="row mb-3">
                                    <div className="col-md-6 mb-4" style={{ position: 'relative' }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '-15px',
                                            left: '0',
                                            right: '0',
                                            zIndex: 2,
                                            textAlign: 'center'
                                        }}>
                                            <span style={{
                                                background: '#ffd700', /* Brighter yellow */
                                                color: '#000000',
                                                padding: '5px 25px',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                fontWeight: 'bold',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                display: 'inline-block',
                                                minWidth: '200px'
                                            }}>Most Popular</span>
                                        </div>
                                        <Package
                                            header={<div>
                                                <div>Defined Package</div>
                                                <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>Interior & Exterior</div>
                                            </div>}
                                            services={[
                                                "✓ Windows cleaned inside and outside",
                                                "✓ $1 Million insurance protection",
                                                "✓ Screens removed, brushed, and polished",
                                                "✓ Window tracks cleaned",
                                                "✓ Frames and sills wiped down"]}
                                            buttonPressed={() => updateMainService(
                                                {
                                                    service: CONSTANTS.WINDOWS.BOTH,
                                                    price: applyServiceFrequencyDiscount(pricing.basicBoth ?? 0),
                                                    packageType: 'defined'
                                                })
                                            }
                                            price={applyServiceFrequencyDiscount(pricing.basicBoth ?? 0)}
                                            selected={mainService?.service == CONSTANTS.WINDOWS.BOTH && mainService?.packageType == 'defined'}
                                            color="primary"
                                        ></Package>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Package
                                            header={<div>
                                                <div>Defined Package</div>
                                                <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>Exterior Only</div>
                                            </div>}
                                            services={[
                                                "✓ Windows cleaned outside only",
                                                "✓ $1 Million insurance protection",
                                                "✓ Screens removed, brushed, and polished",
                                                "✓ Window tracks cleaned",
                                                "✓ Frames and sills wiped down"]}
                                            buttonPressed={() => updateMainService(
                                                {
                                                    service: CONSTANTS.WINDOWS.EXTERIOR,
                                                    price: applyServiceFrequencyDiscount(pricing.basicExt ?? 0),
                                                    packageType: 'defined'
                                                })
                                            }
                                            price={applyServiceFrequencyDiscount(pricing.basicExt ?? 0)}
                                            selected={mainService?.service == CONSTANTS.WINDOWS.EXTERIOR && mainService?.packageType == 'defined'}
                                            color="primary"
                                        ></Package>
                                    </div>
                                </div>

                                <h4 className="text-center my-3" style={{ color: "#495057", fontWeight: "bold" }}>Standard Package - Basic Service</h4>
                                <div className="row mb-3">
                                    <div className="col-md-6 mb-4">
                                        <Package
                                            header={<div>
                                                <div>Standard Package</div>
                                                <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>Interior & Exterior</div>
                                            </div>}
                                            services={[
                                                "✓ Windows cleaned inside and outside",
                                                "✓ $1 Million insurance protection",
                                                "✗ Screens removed and polished",
                                                "✗ Window tracks cleaned",
                                                "✗ Frames and sills wiped down"]}
                                            buttonPressed={() => updateMainService(
                                                {
                                                    service: CONSTANTS.WINDOWS.BOTH,
                                                    price: applyServiceFrequencyDiscount(pricing.standardBoth ?? 0),
                                                    packageType: 'standard'
                                                })
                                            }
                                            price={applyServiceFrequencyDiscount(pricing.standardBoth ?? 0)}
                                            selected={mainService?.service == CONSTANTS.WINDOWS.BOTH && mainService?.packageType == 'standard'}
                                            color="secondary"
                                        ></Package>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Package
                                            header={<div>
                                                <div>Standard Package</div>
                                                <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>Exterior Only</div>
                                            </div>}
                                            services={[
                                                "✓ Windows cleaned outside only",
                                                "✓ $1 Million insurance protection",
                                                "✗ Screens removed and polished",
                                                "✗ Window tracks cleaned",
                                                "✗ Frames and sills wiped down"]}
                                            buttonPressed={() => updateMainService(
                                                {
                                                    service: CONSTANTS.WINDOWS.EXTERIOR,
                                                    price: applyServiceFrequencyDiscount(pricing.standardExt ?? 0),
                                                    packageType: 'standard'
                                                })
                                            }
                                            price={applyServiceFrequencyDiscount(pricing.standardExt ?? 0)}
                                            selected={mainService?.service == CONSTANTS.WINDOWS.EXTERIOR && mainService?.packageType == 'standard'}
                                            color="secondary"
                                        ></Package>
                                    </div>
                                </div>
                            </div>
                        }

                        <h4 className="text-center my-3" style={{ color: "#074a5a" }}>Power Washing</h4>
                        <hr />
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <Package
                                    header={CONSTANTS.POWERWASH.DRIVEWAY}
                                    services={["Using a power washer we remove any tire marks and dirt and grime from your driveway. "]}
                                    buttonText="Add Service"
                                    buttonPressed={() => {
                                        addService({
                                            service: CONSTANTS.POWERWASH.DRIVEWAY,
                                            price: applyServiceFrequencyDiscount(pricing.driveway ?? 0)
                                        })
                                    }}
                                    selected={
                                        serviceSelected({
                                            service: CONSTANTS.POWERWASH.DRIVEWAY,
                                            price: applyServiceFrequencyDiscount(pricing.driveway ?? 0)
                                        })
                                    }
                                    price={applyServiceFrequencyDiscount(pricing.driveway ?? 0)}
                                    color="success" />
                            </div>
                            <div className="col-md-6 mb-4">
                                <Package
                                    header="Exterior House Washing"
                                    services={["Using a low-pressure washer and specialized solutions we safely remove stains and gunk from the outside of your home."]}
                                    buttonText="Add Service"
                                    buttonPressed={() => {
                                        addService({
                                            service: CONSTANTS.POWERWASH.HOME,
                                            price: applyServiceFrequencyDiscount(pricing.exteriorHouseWashing ?? 0)
                                        })
                                    }}
                                    selected={
                                        serviceSelected({
                                            service: CONSTANTS.POWERWASH.HOME,
                                            price: applyServiceFrequencyDiscount(pricing.exteriorHouseWashing ?? 0)
                                        })
                                    }
                                    price={applyServiceFrequencyDiscount(pricing.exteriorHouseWashing ?? 0)}
                                    color="success" />
                            </div>
                        </div>

                        <h4 className="text-center my-3" style={{ color: "#074a5a" }}>Window Screen Repair and Rebuilding</h4>
                        <hr />
                        <div className="row">
                            {/* SCREEN REPAIR */}
                            <div className="col-md-6 mb-4">
                                <Package
                                    header="Screen Repair"
                                    services={["Do you have any screens that are faded or torn that need to be repaired?", "Let us know how many screens need to be repaired and we can repair them at the appointment."]}
                                    textFieldPlaceholder="Enter the amount of screens to repair"
                                    textFieldUpdated={screensToRepair}
                                    price={pricing.screenRepair}
                                    buttonText="Add Service"
                                    buttonPressed={() => {
                                        addService(screenRepairService)
                                    }}
                                    selected={
                                        serviceSelected(screenRepairService)
                                    }
                                    color="warning" />
                            </div>

                            {/* SCREEN BUILDING */}
                            <div className="col-md-6 mb-4">
                                <Package
                                    header="Screen Building"
                                    services={["Do you have any windows that are missing screens? Do you have any window screen frames that are badly bent or broken?", "Let us know how many screens you need to be built and we can build them at the appointment."]}
                                    textFieldPlaceholder="Enter the amount of screens to build"
                                    textFieldUpdated={screensToBuild}
                                    price={pricing.screenBuilding}
                                    buttonText="Add Service"
                                    buttonPressed={() => {
                                        addService(screenBuildingService)
                                    }}
                                    selected={
                                        serviceSelected(screenBuildingService)
                                    }
                                    color="warning" />
                            </div>
                        </div>

                        {
                            pricing.blinds != 0 &&
                            <div>
                                <h4 className="text-center my-3" style={{ color: "#074a5a" }}>Blind Cleaning</h4>
                                <hr />

                                <div className="row">
                                    <div className="col-md-6 mb-4 mx-auto">
                                        <Package
                                            header="Clean Blinds"
                                            services={["Are your windows covered by blinds? If so, you should get them cleaned regularly as well. Dirty blinds can detract from your clean windows."]}
                                            price={pricing.blinds}
                                            buttonText="Add Service"
                                            buttonPressed={() => {
                                                addService(blindsService)
                                            }}
                                            selected={
                                                serviceSelected(blindsService)
                                            }
                                            color="info" />
                                    </div>
                                </div>
                            </div>
                        }
                        <hr />
                        <div className="numbered-list-container my-3">
                            <p className="text-center">
                                <i>We know that you've done your best making sure that the information is as accurate as possible. But mistakes happen. Before we start on your home, we'll walk around to make sure that the information entered is accurate to a reasonable degree. If we find that the information entered is off by a large degree then we'll let you know the price before we begin. 😁</i>
                            </p>
                        </div>


                        <div className="numbered-list-container my-4">
                            <Quote />
                        </div>
                        {/* Admin info message */}
                        {isAdmin && (
                            <div className="mt-3">
                                <Alert variant="info" className="text-center">
                                    <small>
                                        <strong>Admin:</strong> You can send estimates with just an email and first name.
                                    </small>
                                </Alert>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="border-0 justify-content-center">
                        {error && (
                            <div className="w-100 mb-3">
                                <Alert variant="danger" className="text-center">
                                    {error}
                                    <div className="mt-2">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => {
                                                // Skip the API call and go directly to booking
                                                setFinished(true)
                                                setError("")
                                            }}>
                                            Skip to Booking
                                        </Button>
                                    </div>
                                </Alert>
                            </div>
                        )}
                        <Button
                            className="modern-cta-button mr-2"
                            style={{ backgroundColor: "#074a5a", color: "white" }}
                            onClick={() => setShowPreviousModal(true)}>
                            Previous
                        </Button>
                        {
                            processing && <Image src="loading.gif" />
                        }
                        {
                            !processing && !finished && (
                                <div className="d-flex gap-2">
                                    {isAdmin ? (
                                        <Button
                                            className="modern-cta-button"
                                            onClick={sendEstimateEmail}>
                                            Send Estimate
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                className="modern-cta-button"
                                                variant="outline-primary"
                                                onClick={sendEstimateEmail}>
                                                Save Estimate
                                            </Button>
                                            <Button
                                                className="modern-cta-button"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()

                                                    sendQuote()
                                                    // Track with existing Google Ads conversion
                                                    trackConversion(CONSTANTS.CONVERSION_TRACKING.ACCEPT_QUOTE, estimate.Customer?.phoneNumber, estimate.Customer?.email)
                                                    // Track with Microsoft Ads UET
                                                    uet_report_booking_conversion()

                                                }}>
                                                I'm Ready To Book
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )
                        }
                    </Modal.Footer>
                </div>
            }

            {
                showPreviousModal && <AreYouSure />
            }
        </div >
    )
}

export default Quote