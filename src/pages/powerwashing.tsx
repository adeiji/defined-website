import { url } from 'inspector'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col, Container, Image, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDroplet,
    faCheckCircle,
    faTools,
    faHome,
    faPhone,
    faQuoteLeft,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
import ReactGA from 'react-ga'
import firebase from 'firebase'
import Navbar from '../components/Navbar'
import TestimonialObject from '../objects/testimonialobject'
import Estimator from '../components/estimator'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import { Config } from '../config'
import CONSTANTS from '../constants'
import '../App.css'
import '../assets/css/home.css'

const PowerWashing = () => {

    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`
    const phoneNumber = Config.Env.PhoneNumbers.Main
    const discount = "20%"
    const [showModal, setShowModal] = useState(false)
    const [showDangerModal, setShowDangerModal] = useState(false)

    useEffect(() => {
        if (!firebase.apps.length) {
            // Initialize Cloud Firestore through Firebase
            firebase.initializeApp(CONSTANTS.FIREBASE);
        }
    }, [])

    const CallNow = () => {
        return (
            <div className="alert alert-info p-1">
                <div className="ml-5 mt-5">All you need to do is answer 3 simple questions and you'll receive your free estimate. And you can schedule the job also, all online.</div>
                <Button className="m-5" onClick={() => { window.location.href = "https://5ve5c9rmseo.typeform.com/to/TF2lznW8" }}>Click Here To Get Your Instant Quote</Button>
            </div>
        )
    }

    const Testimonial = (props: {
        testimonial: TestimonialObject
    }) => {
        return (
            <Card bg="light" className="mb-2">
                <Card.Header>{props.testimonial.username} says:</Card.Header>
                <Card.Body>
                    <div className="mb-3">
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                    </div>
                    <Card.Title>{props.testimonial.title} </Card.Title>
                    <Card.Text>
                        {props.testimonial.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    const AreYouSure = () => {
        return (
            <Modal show={true} size="sm" onHide={() => setShowDangerModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    If you go back you'll lose any information that you've entered. Are you sure you want to go back?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setShowModal(false)
                        setShowDangerModal(false)
                    }} >Yes</Button>
                    <Button variant="success" onClick={() => setShowDangerModal(false)} >Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const markConversion = () => {
        ReactGA.event({
            category: 'User',
            action: 'User clicked phone number to call',
            label: "User clicked call button",
            value: 10
        })
    }

    // UET conversion tracking function for Microsoft Ads
    const uet_report_conversion = () => {
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'contact_pressure_washing_phone', {});
    }

    return (
        <div className="no-printme" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {
                showDangerModal && <AreYouSure />
            }
            <Modal show={showModal} size="lg" onHide={() => setShowDangerModal(true)}>
                <Estimator />
            </Modal>
            <Navbar />

            <main style={{ width: "100%", fontSize: "18px", lineHeight: "2.0em", flex: "1 0 auto", display: "flex", flexDirection: "column" }} >
                <Container style={{ backgroundColor: "white", padding: 0 }} fluid>
                    <Row>
                        <Col>
                            <div style={{ backgroundColor: 'white', padding: '3rem 2rem' }}>
                                <div className="header-links text-center mb-4">
                                    <a href="/">Window Cleaning</a> {'|'} <a href="/powerwashing">Power Washing</a> {'|'} <a href="/car-detailing-las-vegas">Car Detailing</a> {'|'} <a href="/#screen-repair">Screen Repair</a>
                                </div>

                                <div className="row align-items-start">
                                    <div className="col-lg-6">
                                        <div style={{ textAlign: 'left' }}>
                                            <h1 style={{ 
                                                color: "#092a3c", 
                                                marginBottom: '0.5rem',
                                                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                                                fontWeight: 'bold',
                                                lineHeight: '1.1'
                                            }}>Las Vegas</h1>
                                            <h1 style={{ 
                                                color: "#ff871e", 
                                                marginBottom: '2rem',
                                                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                                                fontWeight: 'bold',
                                                lineHeight: '1.1'
                                            }}>POWER WASHING!</h1>
                                            <Button className="pill-button" href="tel:7027470901" onClick={() => {
                                                markConversion()
                                                uet_report_conversion()
                                            }} style={{ marginBottom: '2rem' }}>Call or Text 702-747-0901</Button>
                                            
                                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                                <img 
                                                    src="power-washing/driveway-before-after.jpg" 
                                                    alt="Before and After Power Washing Results in Las Vegas" 
                                                    style={{ 
                                                        width: '100%', 
                                                        maxWidth: '500px',
                                                        borderRadius: '10px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                                        marginBottom: '1rem',
                                                        display: 'block',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                />
                                                <p style={{ 
                                                    color: '#074a5a', 
                                                    fontWeight: 'bold', 
                                                    fontSize: '1.2rem',
                                                    margin: '0',
                                                    textAlign: 'center'
                                                }}>
                                                    <strong>Real Results</strong> - Before & After
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div style={{ 
                                            backgroundColor: 'white', 
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                            padding: '1rem'
                                        }}>
                                            <ContactForm 
                                                title="Get Your Free Power Washing Quote"
                                                description="Fill out the form below and we'll provide you with a customized quote for your power washing needs."
                                                sourcePage="power-washing"
                                                customServices={[
                                                    { id: "service-2car-driveway", label: "2-Car Driveway", name: "2carDriveway", defaultChecked: false },
                                                    { id: "service-3car-driveway", label: "3-Car Driveway", name: "3carDriveway", defaultChecked: false },
                                                    { id: "service-2car-garage", label: "2-Car Garage", name: "2carGarage", defaultChecked: false },
                                                    { id: "service-3car-garage", label: "3-Car Garage", name: "3carGarage", defaultChecked: false },
                                                    { id: "service-house-washing", label: "Exterior House Washing", name: "houseWashing", defaultChecked: false },
                                                    { id: "service-patio", label: "Patio", name: "patio", defaultChecked: false },
                                                    { id: "service-pool-deck", label: "Pool Deck", name: "poolDeck", defaultChecked: false },
                                                    { id: "service-other", label: "Other", name: "other", defaultChecked: false }
                                                ]}
                                                conversionId="power_washing_form"
                                                onSubmitSuccess={() => {
                                                    markConversion()
                                                    uet_report_conversion()
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="content-container">
                        <Row className="mt-5">
                            <Col xs="12">
                                <h2 className="section-title mb-4">Best In Las Vegas Power Washing</h2>
                                <p className="text-center mb-5">
                                    We power wash <strong>driveways, patios, walkways, entrances, and exterior stucco.</strong>
                                    Our <strong>professional equipment</strong> and <strong>eco-friendly solutions</strong> deliver exceptional results that will <strong>transform your property</strong>.
                                </p>
                            </Col>
                        </Row>

                        {/* Pricing Section */}
                        <Row className="mb-5">
                            <Col xs="12">
                                <h3 className="text-center mb-5" style={{ color: '#074a5a' }}>Professional Power Washing Pricing</h3>
                                
                                {/* Driveway Pricing */}
                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-8">
                                        <div className="pricing-card mb-4" style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                            <h4 className="text-center mb-3" style={{ color: '#074a5a' }}>Driveway Power Washing</h4>
                                            <div className="row">
                                                <div className="col-md-6 text-center mb-3">
                                                    <div className="price-item">
                                                        <FontAwesomeIcon icon={faHome} className="mb-2" style={{ fontSize: '2rem', color: '#ff871e' }} />
                                                        <h5>2-Car Driveway</h5>
                                                        <h3 style={{ color: '#074a5a' }}>$200</h3>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-center mb-3">
                                                    <div className="price-item">
                                                        <FontAwesomeIcon icon={faHome} className="mb-2" style={{ fontSize: '2rem', color: '#ff871e' }} />
                                                        <h5>3-Car Driveway</h5>
                                                        <h3 style={{ color: '#074a5a' }}>$250</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Garage Pricing */}
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="pricing-card mb-4" style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                            <h4 className="text-center mb-3" style={{ color: '#074a5a' }}>Garage Floor Cleaning</h4>
                                            <div className="row">
                                                <div className="col-md-6 text-center mb-3">
                                                    <div className="price-item">
                                                        <FontAwesomeIcon icon={faTools} className="mb-2" style={{ fontSize: '2rem', color: '#ff871e' }} />
                                                        <h5>2-Car Garage</h5>
                                                        <h3 style={{ color: '#074a5a' }}>$250</h3>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-center mb-3">
                                                    <div className="price-item">
                                                        <FontAwesomeIcon icon={faTools} className="mb-2" style={{ fontSize: '2rem', color: '#ff871e' }} />
                                                        <h5>3-Car Garage</h5>
                                                        <h3 style={{ color: '#074a5a' }}>$300</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col md={6}>
                                <img
                                    src="power-washing/oil-before-after.jpg"
                                    alt="Power washing before and after in Las Vegas"
                                    className="img-fluid rounded shadow"
                                    style={{ width: '100%', objectFit: 'cover' }}
                                />
                            </Col>
                            <Col md={6} className="d-flex flex-column justify-content-center mt-4 mt-md-0">
                                <h3 style={{ color: '#074a5a' }}>Our Power Washing Services</h3>
                                <div className="numbered-list-container mt-3">
                                    <ul className="numbered-list">
                                        <li><strong>Stain removal</strong> from concrete, stone, and tile</li>
                                        <li><strong>Grease stains</strong> in your driveway from leaked automobile oil</li>
                                        <li><strong>Barbeque grill stains</strong> on your patio concrete</li>
                                        <li>Exterior <strong>tile</strong> including <strong>pool decks</strong></li>
                                        <li><strong>Exterior stucco</strong> on home or business walls</li>
                                        <li><strong>Stone</strong> walkways, driveways, and decorative stone</li>
                                        <li>Exterior <strong>concrete</strong> surfaces</li>
                                        <li><strong>Garage floors</strong> - interior and approaches</li>
                                        <li>1-story &amp; 2-story buildings</li>
                                        <li>Residential and commercial properties</li>
                                        <li>Luxury and non-luxury homes</li>
                                    </ul>
                                </div>
                                <p className="mt-3"><strong>* Licensed and Insured up to $1 million</strong></p>
                            </Col>
                        </Row>

                        <div className="modern-cta">
                            <h2 className="modern-cta-title">Ready to Transform Your Property?</h2>
                            <p>Get your instant quote now and see the difference professional power washing makes!</p>
                            <div>
                                {/* <Button className="modern-cta-button" onClick={() => { window.location.href = "https://5ve5c9rmseo.typeform.com/to/TF2lznW8" }}>
                                    <FontAwesomeIcon icon={faQuoteLeft} className="mr-2" /> Get Your Instant Quote
                                </Button> */}
                                <Button className="modern-cta-button" href={phoneNumberLink} onClick={() => {
                                    markConversion()
                                    uet_report_conversion()
                                }}>
                                    <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call {phoneNumber}
                                </Button>
                            </div>
                        </div>

                        <Row className="mt-5">
                            <Col xs="12">
                                <h2 className="section-title mb-5">Our Work in Las Vegas</h2>
                                <div className="gallery-container">
                                    <div className="gallery-card">
                                        <img src="power-washing/driveway-before-after.jpg" alt="Driveway cleaning in Las Vegas" />
                                        <div className="gallery-card-body">
                                            This driveway was filthy and had <strong>never been cleaned before</strong>. Look at how nice it looked after we were done with our <strong>hot water power washing</strong>.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/dirty-clean.jpg" alt="Custom concrete cleaning in Las Vegas" />
                                        <div className="gallery-card-body">
                                            <strong>Custom painted cement</strong> that needed cleaning without damage. The concrete was awful before, but the customer was <strong>thrilled with the results</strong>.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/driveway-after-2.jpg" alt="Large driveway transformation in Las Vegas" />
                                        <div className="gallery-card-body">
                                            <strong>Large concrete driveway</strong> completely transformed using our <strong>F9 professional chemicals</strong> and surface cleaner technology for <strong>streak-free results</strong>.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/tires-before-after.jpg" alt="Tire mark removal in Las Vegas" />
                                        <div className="gallery-card-body">
                                            <strong>Tire marks</strong> can really ruin your driveway's appearance. We can <strong>remove these stubborn marks</strong> and make your driveway look brand new again.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/house-wash-before-after.jpg" alt="House washing and concrete cleaning in Las Vegas" />
                                        <div className="gallery-card-body">
                                            <strong>Complete exterior cleaning</strong> - both house washing and concrete cleaning using our <strong>4,000 PSI hot water systems</strong> for professional results.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/stucco-wash after.jpg" alt="Stucco cleaning in Las Vegas" />
                                        <div className="gallery-card-body">
                                            <strong>Stucco exterior cleaning</strong> restored to like-new condition. Our <strong>professional-grade equipment</strong> safely cleans without damage to delicate surfaces.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/trash-before-after.jpg" alt="Trash bin cleaning in Las Vegas" />
                                        <div className="gallery-card-body">
                                            We also clean <strong>dirty trash bins</strong> to prevent odors and keep your property looking pristine.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/oil-before-after.jpg" alt="Oil stain removal in Las Vegas" />
                                        <div className="gallery-card-body">
                                            <strong>Oil stains</strong> are not just unsightly, they can also <strong>lead to HOA fines</strong>. Our <strong>F9 Double Eagle degreaser</strong> can effectively remove these stubborn stains.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="power-washing/oil-big-before.jpg" alt="Large oil stain removal in Las Vegas" />
                                        <div className="gallery-card-body">
                                            <strong>Massive oil stains</strong> from long-term vehicle leaks. Our <strong>professional chemical treatment</strong> penetrates deep to remove even the most embedded stains.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                            <video
                                                controls
                                                playsInline
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            >
                                                <source src="power-washing/cleaning-tires.mp4" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div className="gallery-card-body">
                                            Watch our <strong>surface cleaner technology</strong> strip away tire marks, leaving the concrete <strong>beautifully clean with no streaks</strong>.
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Sealing Services Section */}
                        <Row className="section-separator">
                            <Col xs="12" id="sealing-services">
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">Driveway & Paver Sealing Services</h2>
                                </div>
                                <hr />

                                <div className="mb-5">
                                    <p className="text-center mb-4" style={{ fontSize: '1.2rem' }}>
                                        <strong>Protect your investment!</strong> After we clean your concrete, pavers, or stone surfaces, 
                                        <strong>professional sealing extends their life and keeps them looking new longer</strong>.
                                    </p>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-md-6">
                                        <h4 style={{ color: '#074a5a' }}>Why Seal After Power Washing?</h4>
                                        <div className="numbered-list-container">
                                            <ul className="numbered-list">
                                                <li><strong>Stain Protection:</strong> <strong>Prevents oil, grease, and organic stains</strong> from penetrating deep into surfaces</li>
                                                <li><strong>Weather Resistance:</strong> <strong>Protects against Las Vegas sun</strong> and sudden weather changes</li>
                                                <li><strong>Easier Maintenance:</strong> <strong>Sealed surfaces clean easier</strong> and require less frequent deep cleaning</li>
                                                <li><strong>Enhanced Appearance:</strong> <strong>Brings out natural colors</strong> and provides subtle sheen</li>
                                                <li><strong>Prevents Erosion:</strong> <strong>Stops sand and joint material loss</strong> in pavers and decorative concrete</li>
                                                <li><strong>Weed Prevention:</strong> <strong>Sealed joints prevent weed growth</strong> between pavers and stones</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 style={{ color: '#074a5a' }}>What We Seal</h4>
                                        <div className="numbered-list-container">
                                            <ul className="numbered-list">
                                                <li><strong>Concrete Driveways:</strong> <strong>Penetrating sealers</strong> that don't change appearance</li>
                                                <li><strong>Decorative Concrete:</strong> <strong>Acrylic sealers</strong> that enhance colors and patterns</li>
                                                <li><strong>Paver Driveways:</strong> <strong>Joint stabilizing sealers</strong> that prevent shifting</li>
                                                <li><strong>Paver Patios:</strong> <strong>Wet-look or natural finish</strong> options available</li>
                                                <li><strong>Natural Stone:</strong> <strong>Breathable sealers</strong> that protect without trapping moisture</li>
                                                <li><strong>Pool Decks:</strong> <strong>Slip-resistant sealers</strong> for safety and protection</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h4 className="text-center mb-4" style={{ color: '#074a5a' }}>Our Professional Sealing Process</h4>
                                    <div className="row">
                                        <div className="col-md-3 text-center mb-4">
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', height: '100%' }}>
                                                <h5 style={{ color: '#ff871e' }}>Step 1</h5>
                                                <h6><strong>Deep Cleaning</strong></h6>
                                                <p>Hot water power washing with F9 chemicals removes all dirt, stains, and contaminants</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 text-center mb-4">
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', height: '100%' }}>
                                                <h5 style={{ color: '#ff871e' }}>Step 2</h5>
                                                <h6><strong>Surface Preparation</strong></h6>
                                                <p>Complete drying and any necessary joint sand replacement for pavers</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 text-center mb-4">
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', height: '100%' }}>
                                                <h5 style={{ color: '#ff871e' }}>Step 3</h5>
                                                <h6><strong>Professional Application</strong></h6>
                                                <p>Even application using professional spray equipment for consistent coverage</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 text-center mb-4">
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', height: '100%' }}>
                                                <h5 style={{ color: '#ff871e' }}>Step 4</h5>
                                                <h6><strong>Quality Inspection</strong></h6>
                                                <p>Final inspection and touch-ups to ensure complete, even coverage</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h4 style={{ color: '#074a5a' }}>Premium Sealing Products</h4>
                                    <p>We use only <strong>commercial-grade sealers</strong> from trusted manufacturers like SureCrete, Armor AR350, and Techniseal:</p>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 style={{ color: '#ff871e' }}>Penetrating Sealers</h5>
                                            <ul>
                                                <li><strong>Invisible protection</strong> - doesn't change surface appearance</li>
                                                <li><strong>Breathable formula</strong> prevents moisture entrapment</li>
                                                <li><strong>15+ year lifespan</strong> with proper maintenance</li>
                                                <li><strong>Ideal for plain concrete</strong> and natural stone</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 style={{ color: '#ff871e' }}>Acrylic Sealers</h5>
                                            <ul>
                                                <li><strong>Enhances colors</strong> and adds subtle gloss</li>
                                                <li><strong>Superior stain resistance</strong> for high-traffic areas</li>
                                                <li><strong>5-7 year lifespan</strong> depending on traffic</li>
                                                <li><strong>Perfect for decorative concrete</strong> and pavers</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mb-4">
                                    <div style={{ backgroundColor: '#e8f5e8', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
                                        <h4 style={{ color: '#074a5a', marginBottom: '1rem' }}><strong>Perfect Timing: Clean + Seal Packages</strong></h4>
                                        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                            <strong>Save time and money</strong> by combining power washing and sealing services. 
                                            Freshly cleaned surfaces accept sealers better, providing <strong>maximum protection and longevity</strong>.
                                        </p>
                                        <p style={{ marginBottom: 0 }}>
                                            <strong>Ask about our Clean + Seal packages</strong> when you call for your free estimate!
                                        </p>
                                    </div>
                                    <Button className="modern-cta-button" href={phoneNumberLink} onClick={() => {
                                        markConversion()
                                        uet_report_conversion()
                                    }}>
                                        <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call {phoneNumber} for Clean + Seal Quote
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <Row className="section-separator">
                            <Col xs="12" id="service-areas">
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0 mt-5">We Serve Las Vegas, Henderson, and Boulder City</h2>
                                </div>
                                <hr />

                                <p><strong>Driveway tire marks and oil stains are unsightly</strong> and can be embarrassing for homeowners who take pride in their property's appearance.</p>

                                <p>We understand that you care about the beauty of your home, both inside and out. That's why we work diligently to ensure that your <strong>driveway, patio, walkway, and home exterior look immaculate</strong> after our power washing services.</p>

                                <div className="numbered-list-container">
                                    <ul className="numbered-list">
                                        <li><strong>Eco-Friendly Solutions:</strong> Besides water, we always use <strong>natural, environmentally-friendly products</strong></li>
                                        <li><strong>Thorough Cleaning:</strong> We power wash <strong>every inch of the surface until it looks rejuvenated</strong></li>
                                        <li><strong>Pet-Friendly:</strong> All our cleaning solutions are <strong>safe for homes with pets</strong></li>
                                        <li><strong>Complete Service:</strong> We don't stop until your stone, concrete, tile, or stucco <strong>looks like new</strong></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>

                        <Row className="section-separator">
                            <Col xs="12" id="equipment">
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faDroplet} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">Superior Equipment & Professional-Grade Chemicals</h2>
                                </div>
                                <hr />

                                <div className="mb-5">
                                    <h4 style={{ color: '#074a5a' }}>Hot Water Power Washing - The Gold Standard</h4>
                                    <p>Unlike many competitors who use only cold water, we utilize <strong>hot water power washing systems</strong> that deliver water temperatures <strong>up to 200°F</strong>. This isn't just a luxury - <strong>it's a necessity for truly effective cleaning</strong>:</p>
                                    
                                    <div className="numbered-list-container">
                                        <ul className="numbered-list">
                                            <li><strong>Faster Stain Breakdown:</strong> Hot water breaks down grease, oil, and organic stains <strong>up to 3x faster</strong> than cold water</li>
                                            <li><strong>Superior Sanitization:</strong> High temperatures <strong>kill bacteria, mold, and mildew on contact</strong></li>
                                            <li><strong>Reduced Chemical Dependency:</strong> Hot water cleaning requires <strong>fewer chemicals while achieving better results</strong></li>
                                            <li><strong>Deeper Penetration:</strong> Heat opens pores in concrete and stone, allowing <strong>deeper cleaning</strong></li>
                                            <li><strong>Permanent Results:</strong> Hot water treatment helps <strong>prevent quick re-soiling</strong></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h4 style={{ color: '#074a5a' }}>F9 Professional Chemical Systems - Industry Leading</h4>
                                    <p>We exclusively use <strong>F9 Restore products</strong> - the same <strong>professional-grade chemicals trusted by commercial cleaning contractors nationwide</strong>. <strong>F9 isn't available in stores</strong> because it's formulated specifically for professional use:</p>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 style={{ color: '#ff871e' }}>F9 BARC (Barc Concrete Cleaner)</h5>
                                            <ul>
                                                <li><strong>Specialized for concrete and masonry surfaces</strong></li>
                                                <li><strong>Removes years of embedded dirt and stains</strong></li>
                                                <li><strong>Restores concrete to near-original color</strong></li>
                                                <li><strong>Biodegradable and environmentally responsible</strong></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 style={{ color: '#ff871e' }}>F9 Efflorescence Remover</h5>
                                            <ul>
                                                <li><strong>Eliminates white chalky buildup on concrete</strong></li>
                                                <li><strong>Penetrates deep into porous surfaces</strong></li>
                                                <li><strong>Prevents future efflorescence formation</strong></li>
                                                <li><strong>Safe for surrounding landscaping</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <h5 style={{ color: '#ff871e' }}>F9 Groundskeeper</h5>
                                            <ul>
                                                <li><strong>Removes organic stains and discoloration</strong></li>
                                                <li><strong>Eliminates algae, mold, and mildew</strong></li>
                                                <li><strong>Specially formulated for outdoor surfaces</strong></li>
                                                <li><strong>Long-lasting stain prevention</strong></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 style={{ color: '#ff871e' }}>F9 Double Eagle</h5>
                                            <ul>
                                                <li><strong>Heavy-duty degreaser for oil and grease stains</strong></li>
                                                <li><strong>Penetrates deep into concrete pores</strong></li>
                                                <li><strong>Removes embedded automotive fluids</strong></li>
                                                <li><strong>Restaurant-grade grease removal power</strong></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h5 style={{ color: '#074a5a' }}>Why F9 Products Are Environmentally Superior</h5>
                                        <p>F9 chemicals aren't just powerful - they're designed with environmental responsibility in mind:</p>
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="numbered-list-container">
                                                    <ul className="numbered-list">
                                                        <li><strong>Biodegradable:</strong> <strong>F9 products break down naturally</strong> in the environment, reducing their environmental impact</li>
                                                        <li><strong>Non-flammable:</strong> <strong>Safer to use and store</strong>, minimizing fire risks during application</li>
                                                        <li><strong>Free of Harsh Chemicals:</strong> <strong>F9 Double Eagle avoids using hydroxides</strong>, making them less harmful to the environment and skin</li>
                                                        <li><strong>Low Odor:</strong> <strong>F9 Double Eagle has minimal odor</strong>, making the cleaning process more pleasant</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="numbered-list-container">
                                                    <ul className="numbered-list">
                                                        <li><strong>Concentrated Formulas:</strong> <strong>A little goes a long way</strong>, reducing packaging waste and transport impact</li>
                                                        <li><strong>Eco-Conscious Ingredients:</strong> <strong>Safe to use around plants and landscaping</strong> without damage or contamination</li>
                                                        <li><strong>Sustainable Commitment:</strong> <strong>F9 partners with sustainable tech distribution</strong>, showing broader environmental responsibility</li>
                                                        <li><strong>Professional Efficiency:</strong> <strong>Less product needed</strong> for superior results compared to store-bought alternatives</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3" style={{ backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '8px' }}>
                                            <p style={{ marginBottom: 0, fontStyle: 'italic' }}>
                                                <strong>Environmental Peace of Mind:</strong> When we clean your property with F9 products, you can be confident that we're using <strong>environmentally responsible chemicals</strong> that won't harm your landscaping, pets, or the local ecosystem while delivering <strong>professional-grade cleaning power</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h4 style={{ color: '#074a5a' }}>Surface Cleaner Technology - No Streaks, No Lines</h4>
                                    <p>Our professional <strong>surface cleaning attachments</strong> are <strong>game-changers</strong> that most homeowners have never seen in action. Unlike traditional pressure washing wands that can leave streaks and lines, our surface cleaners provide:</p>
                                    
                                    <div className="numbered-list-container">
                                        <ul className="numbered-list">
                                            <li><strong>Uniform Cleaning Pattern:</strong> Dual rotating nozzles ensure <strong>even coverage across the entire surface</strong></li>
                                            <li><strong>Streak-Free Results:</strong> <strong>Eliminates the zebra-stripe effect</strong> common with wand-only cleaning</li>
                                            <li><strong>Contained Spray:</strong> Protective housing <strong>prevents overspray</strong> on windows, cars, and landscaping</li>
                                            <li><strong>Faster Coverage:</strong> Cleans large areas <strong>10x faster</strong> than traditional methods</li>
                                            <li><strong>Consistent Pressure:</strong> Maintains <strong>optimal pressure across the entire cleaning path</strong></li>
                                            <li><strong>Debris Collection:</strong> Vacuum recovery system <strong>removes loosened dirt and debris</strong></li>
                                        </ul>
                                    </div>
                                    
                                    <p className="mt-3" style={{ fontStyle: 'italic', color: '#666' }}>
                                        <strong>Pro Tip:</strong> Surface cleaners are essential for large flat surfaces like driveways, patios, and sidewalks. 
                                        They're why professional results look so much better than DIY attempts.
                                    </p>
                                </div>

                                <div className="mb-5">
                                    <h4 style={{ color: '#074a5a' }}>Commercial-Grade Pressure Systems</h4>
                                    <p>Our <strong>truck-mounted pressure washing systems</strong> deliver <strong>up to 4,000 PSI</strong> with <strong>4 GPM flow rates</strong>. This combination of <strong>high pressure and high volume</strong> is what <strong>separates professional results from homeowner-grade equipment</strong>:</p>
                                    
                                    <div className="row">
                                        <div className="col-md-4 text-center mb-3">
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                                                <h5 style={{ color: '#074a5a' }}>Pressure Power</h5>
                                                <h3 style={{ color: '#ff871e' }}>4,000 PSI</h3>
                                                <p>Professional-grade pressure for deep cleaning</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-center mb-3">
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                                                <h5 style={{ color: '#074a5a' }}>Water Flow</h5>
                                                <h3 style={{ color: '#ff871e' }}>4 GPM</h3>
                                                <p>High volume flow for thorough rinsing</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-center mb-3">
                                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                                                <h5 style={{ color: '#074a5a' }}>Water Temperature</h5>
                                                <h3 style={{ color: '#ff871e' }}>200°F</h3>
                                                <p>Hot water for superior cleaning power</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 style={{ color: '#074a5a' }}>Why Professional Equipment Matters</h4>
                                    <p><strong>Store-bought pressure washers typically deliver 1,500-2,500 PSI with cold water only.</strong> While this might seem sufficient, <strong>it's like trying to clean your dishes with a garden hose</strong> - you'll get some surface dirt off, but <strong>the deep, embedded stains remain</strong>. Our professional systems combine:</p>
                                    
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <div style={{ backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                                <h6 style={{ color: '#074a5a' }}>✓ Professional Results</h6>
                                                <p style={{ marginBottom: 0 }}>Hot water + professional chemicals + surface cleaners = restaurant-quality cleanliness</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{ backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                                <h6 style={{ color: '#074a5a' }}>✓ Safe for Surfaces</h6>
                                                <p style={{ marginBottom: 0 }}>Proper equipment prevents damage to concrete, stone, and decorative surfaces</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div style={{ backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                                <h6 style={{ color: '#074a5a' }}>✓ Long-Lasting Results</h6>
                                                <p style={{ marginBottom: 0 }}>Deep cleaning with hot water and professional chemicals keeps surfaces cleaner longer</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{ backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                                <h6 style={{ color: '#074a5a' }}>✓ Environmentally Responsible</h6>
                                                <p style={{ marginBottom: 0 }}>F9 products are biodegradable and won't harm your landscaping or local waterways</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 style={{ color: '#074a5a' }}>Las Vegas Power Washing Experts</h4>
                                <p>As <strong>local professionals with commercial-grade equipment and professional-only chemicals</strong>, we can <strong>remove stains that DIY methods simply can't touch</strong>. Our combination of <strong>hot water systems, F9 professional chemicals, and surface cleaner technology</strong> delivers results that will make your concrete, stucco, tile, or stone surfaces <strong>look fantastic</strong> - often <strong>restoring them to a condition that looks almost new!</strong></p>
                            </Col>
                        </Row>

                        <div id="screen-repair" className="section-separator">
                            <Row style={{ marginBottom: 0 }}>
                                <Col xs="12" md="6">
                                    <div>
                                        <div className="section-heading-with-icon">
                                            <div className="icon-circle">
                                                <FontAwesomeIcon icon={faTools} size="lg" />
                                            </div>
                                            <h2 className="section-title mb-0">Window Screen Repair and Installation</h2>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h5><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> We construct and install window screens.</h5>
                                    </div>
                                    <div className="mt-4">
                                        Because of the intense Las Vegas sun, window screens fade over time and become brittle. Even the frames themselves can become brittle and the corners can easily break.
                                    </div>

                                    <div>
                                        <strong><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> If you have...</strong>
                                        <div className="numbered-list-container">
                                            <ul className="numbered-list">
                                                <li><strong>Damaged:</strong> Old or bent screen frames</li>
                                                <li><strong>Worn:</strong> Faded or torn window screens</li>
                                                <li><strong>Missing:</strong> Windows that need new screens installed</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        ...then call us now for your <strong>FREE at home estimate.</strong> We will come out, measure all your windows and give you your personalized quote.
                                    </div>
                                    <div className="text-center mb-4 mt-4">
                                        <Button className="modern-cta-button" href={phoneNumberLink} onClick={() => {
                                            markConversion()
                                            uet_report_conversion()
                                        }}>
                                            <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call {phoneNumber}
                                        </Button>
                                    </div>
                                </Col>
                                <Col xs="12" md="6" className="text-center my-4 d-flex align-items-center">
                                    <Image src="/screen-rebuild.jpg" className="img-fluid rounded shadow" />
                                </Col>
                            </Row>
                        </div>
                    </div> {/* End of content-container */}
                </Container>
            </main>
            <Footer />
        </div >
    )
}

export default PowerWashing