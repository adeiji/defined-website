import React from 'react'
import { useState } from 'react'
import PersonalInformationForm from './personalInfo'
import GeneralInformationForm from './generalInformation'
import PaneCount from './paneCount'
import ScreenCount from './screenCount'
import EndEstimator from './endEstimator'
import { Estimate, WindowCleaningEstimate } from '../models/models'
import Quote from './quote'
import CONSTANTS from '../constants'
import { Modal, ProgressBar, Image } from 'react-bootstrap'
import { useEffect } from 'react'
import { getWindowCleaningEstimateById, getWindowCleaningEstimatesByEmail } from '../services/WindowCleaningService'
import '../assets/css/home.css'

const Estimator = () => {

    const PERSONAL_INFORMATION = 1, GENERAL_INFORMATION = 2, PANE_COUNT = 3, SCREEN_COUNT = 4, END_ESTIMATOR = 5, QUOTE = 6
    const TOTAL_STEPS = 6


    // Function to parse URL parameters
    const getUrlParameter = (name: string): string | null => {
        const url = window.location.href;
        name = name.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Check if we have an email parameter in the URL
    const emailParam = getUrlParameter('email');

    // Set initial page - always start from PERSONAL_INFORMATION for public users
    const getInitialPage = () => {
        if (emailParam) {
            return PERSONAL_INFORMATION; // Will be changed to QUOTE after loading estimate
        }
        return PERSONAL_INFORMATION;
    };

    const [page, setPage] = useState(() => {
        const initialPage = getInitialPage();
        console.log("Initial page set to:", initialPage);
        return initialPage;
    })
    
    // State for loading estimates
    const [loadingEstimate, setLoadingEstimate] = useState(false)
    const [estimateId, setEstimateId] = useState<string>('')

    // Initialize the estimate with the email from URL parameter if available
    const [estimate, setEstimate] = useState<Estimate>({
        Misc: {
            canEmail: true,
            canText: true
        },
        Customer: {
            area: CONSTANTS.SUMMERLIN,
            email: emailParam || undefined
        },
        GeneralInformation: {
            howHearAboutUs: CONSTANTS.YELP,
            floorsAboveGround: CONSTANTS.FLOORS.ONE_STORY,
            basement: false,
            houseSize: CONSTANTS.HOUSESIZE.SMALLEST,
            residential: true
        }
    })

    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const nextPage = () => {
        console.log("nextPage called, current page:", page, "QUOTE:", QUOTE);
        if (page < QUOTE) {
            console.log("Setting page to:", page + 1);
            setPage(page + 1)
        } else {
            console.log("Already at final page, not advancing");
        }
    }

    // Function to load an estimate from ID (email) parameter in the URL
    const loadEstimateFromUrl = async () => {
        if (!emailParam) {
            return false; // No email parameter found
        }

        setLoadingEstimate(true);
        console.log("Looking for estimate with email:", emailParam);

        try {
            // First try to get by ID directly (if we're using email as ID)
            let estimateData = await getWindowCleaningEstimateById(emailParam);

            // If not found by ID, try to search by email field
            if (!estimateData) {
                const estimates = await getWindowCleaningEstimatesByEmail(emailParam);
                if (estimates && estimates.length > 0) {
                    // Get the most recent estimate
                    estimateData = estimates[0];
                }
            }

            if (estimateData) {
                console.log("Found estimate:", estimateData);
                setEstimate(estimateData);
                setEstimateId(estimateData.id || emailParam);
                
                // Move to QUOTE page since we loaded an estimate
                setPage(QUOTE);
                
                setLoadingEstimate(false);
                return true;
            }
        } catch (error) {
            console.error("Error loading estimate:", error);
        }

        setLoadingEstimate(false);
        return false;
    }

    // Load estimate from URL when component mounts
    useEffect(() => {
        if (emailParam) {
            loadEstimateFromUrl();
        }
    }, []);

    
    // Debug: Track page changes
    useEffect(() => {
        console.log("Page changed to:", page);
    }, [page]);
    
    // Calculate progress percentage for the progress bar
    const progressPercentage = (page / TOTAL_STEPS) * 100

    return (
        <div className="estimator-container">
            {loadingEstimate &&
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <Modal.Header className="border-0">
                        <div className="section-heading-with-icon w-100 justify-content-center">
                            <h2 className="section-title mb-0">Loading Your Estimate</h2>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="px-4 text-center">
                        <div className="my-5">
                            <Image src="/loading.gif" className="mb-4" />
                            <p>We're retrieving your estimate. Please wait a moment...</p>
                        </div>
                    </Modal.Body>
                </div>
            }
            {/* Only show progress bar if not in direct quote mode (when started with email param) */}
            {!emailParam && (
                <div className="progress-container px-4 pt-3">
                    <ProgressBar
                        now={progressPercentage}
                        variant="info"
                        style={{
                            height: '10px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '10px'
                        }}
                    />
                    <p className="text-center mt-2 text-muted">Step {page} of {TOTAL_STEPS}</p>
                </div>
            )}

            {page == PERSONAL_INFORMATION && <PersonalInformationForm estimate={estimate} setEstimate={setEstimate} nextPage={nextPage} previousPage={previousPage} />}
            {page == GENERAL_INFORMATION && <GeneralInformationForm estimate={estimate} setEstimate={setEstimate} nextPage={nextPage} previousPage={previousPage} />}
            {page == PANE_COUNT && <PaneCount estimate={estimate} setEstimate={setEstimate} nextPage={nextPage} previousPage={previousPage} />}
            {page == SCREEN_COUNT && <ScreenCount estimate={estimate} setEstimate={setEstimate} nextPage={nextPage} previousPage={previousPage} />}
            {page == END_ESTIMATOR && <EndEstimator estimate={estimate} setEstimate={setEstimate} nextPage={nextPage} previousPage={previousPage} />}
            {page == QUOTE && <Quote estimateObject={estimate} previousPage={previousPage} />}
        </div>
    )
}

export default Estimator