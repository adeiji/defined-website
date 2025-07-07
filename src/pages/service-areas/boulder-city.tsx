import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import '../../App.css';
import '../../assets/css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Config } from '../../config';
import {
    faMapMarkerAlt,
    faCheckCircle,
    faPhone,
    faQuoteLeft,
    faTools,
    faDroplet,
    faHandSparkles,
    faWindowMaximize,
    faSun,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';

const BoulderCity = () => {
    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`;
    const phoneNumber = Config.Env.PhoneNumbers.Main;
    const city = "Boulder City";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ width: "100%", fontSize: "18px", lineHeight: "2.0em", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
                <Container style={{ backgroundColor: "white", padding: 0 }} fluid>
                    {/* Hero Section */}
                    <Row className="py-5">
                        <Col xs={12} className="text-center">
                            <div className="section-heading-with-icon">
                                <div className="icon-circle">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                                </div>
                                <h1 className="section-title mb-0">Window Cleaning in {city}</h1>
                            </div>
                            <p className="mt-4">Professional window cleaning services customized for {city} homes and businesses</p>
                        </Col>
                    </Row>

                    <div className="content-container">
                        {/* Main Image Section */}
                        <Row className="mb-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Image src="/gallary16.jpg" fluid className="rounded shadow" style={{ maxWidth: '600px' }} />
                            </Col>
                        </Row>

                        {/* Local Area Info */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Window Cleaning Solutions for {city} Homes</h2>
                                <hr />
                                <p>
                                    {city} presents unique challenges for window cleaning. With its historic homes, proximity to Lake Mead, and the intense desert sun, properties here require specialized cleaning techniques. At Defined Cleaning, we've developed custom solutions specifically designed for Boulder City's unique environment.
                                </p>

                                <div className="numbered-list-container my-4">
                                    <h3 className="mb-4">{city}-Specific Window Challenges:</h3>
                                    <ul className="numbered-list">
                                        <li><strong>Historic Properties:</strong> Gentle techniques for older, delicate windows and frames</li>
                                        <li><strong>Hard Water Spots:</strong> Our custom water filtration system prevents new spots and can remove existing mineral deposits</li>
                                        <li><strong>Lake Proximity:</strong> Special treatments for windows affected by lake spray and humidity</li>
                                        <li><strong>Intense Sun Exposure:</strong> Restoration techniques for windows with sun damage and fading</li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>

                        {/* Local Neighborhoods */}
                        <Row className="my-5">
                            <Col xs={12} md={6}>
                                <h3 className="mb-4"><FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon" /> {city} Neighborhoods We Serve</h3>
                                <div className="numbered-list-container">
                                    <ul className="numbered-list">
                                        <li>Historic District</li>
                                        <li>Del Prado</li>
                                        <li>Marina Highlands</li>
                                        <li>Lake Mountain Estates</li>
                                        <li>Keys Village</li>
                                        <li>Golf Course Estates</li>
                                        <li>Lake View</li>
                                        <li>Villa Del Prado</li>
                                        <li>Desert Hills</li>
                                        <li>All other Boulder City neighborhoods</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="icon-card mt-4">
                                    <div className="icon-wrapper">
                                        <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
                                    </div>
                                    <div className="icon-content">
                                        <h3>Historic Home Specialists</h3>
                                        <p>
                                            We understand the special care needed for Boulder City's historic properties. Our technicians use gentler methods and appropriate cleaning solutions for older windows and frames.
                                        </p>
                                    </div>
                                </div>
                                <div className="icon-card mt-4">
                                    <div className="icon-wrapper">
                                        <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                                    </div>
                                    <div className="icon-content">
                                        <h3>Lake View Enhancement</h3>
                                        <p>
                                            Many Boulder City homes have spectacular views of Lake Mead. Our streak-free cleaning ensures you can enjoy those views without distraction or obstruction.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Our Services Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Our {city} Services</h2>
                                <hr />
                                <p>
                                    We offer a comprehensive range of services to keep your {city} home looking its best:
                                </p>

                                <Row className="mt-4">
                                    <Col md={4} sm={6} className="mb-4">
                                        <div className="icon-card">
                                            <div className="icon-wrapper">
                                                <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
                                            </div>
                                            <div className="icon-content">
                                                <h3>Window Cleaning</h3>
                                                <p>Interior and exterior cleaning with streak-free results</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={6} className="mb-4">
                                        <div className="icon-card">
                                            <div className="icon-wrapper">
                                                <FontAwesomeIcon icon={faDroplet} size="lg" />
                                            </div>
                                            <div className="icon-content">
                                                <h3>Power Washing</h3>
                                                <p>Clean driveways, patios, and exterior surfaces</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={6} className="mb-4">
                                        <div className="icon-card">
                                            <div className="icon-content">
                                                <h3>Gutter Cleaning</h3>
                                                <p>Remove debris and ensure proper drainage</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={6} className="mb-4">
                                        <div className="icon-card">
                                            <div className="icon-wrapper">
                                                <FontAwesomeIcon icon={faTools} size="lg" />
                                            </div>
                                            <div className="icon-content">
                                                <h3>Screen Services</h3>
                                                <p>Repair and replacement of window screens</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={6} className="mb-4">
                                        <div className="icon-card">
                                            <div className="icon-wrapper">
                                                <FontAwesomeIcon icon={faHandSparkles} size="lg" />
                                            </div>
                                            <div className="icon-content">
                                                <h3>Track Cleaning</h3>
                                                <p>Thorough cleaning of window tracks and sills</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={6} className="mb-4">
                                        <div className="icon-card">
                                            <div className="icon-wrapper">
                                                <FontAwesomeIcon icon={faSun} size="lg" />
                                            </div>
                                            <div className="icon-content">
                                                <h3>Solar Screens</h3>
                                                <p>Custom installation to reduce heat and glare</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Call to Action */}
                        <Row className="my-5">
                            <Col>
                                <div className="modern-cta">
                                    <h2 className="modern-cta-title">{city}'s Premier Window Cleaning Service</h2>
                                    <p>Join over 1,800 satisfied customers in the Las Vegas Valley</p>

                                    <div>
                                        <Button className="modern-cta-button" href={phoneNumberLink}>
                                            <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call or Text {phoneNumber}
                                        </Button>

                                        <Button className="modern-cta-button" href="#estimate">
                                            <FontAwesomeIcon icon={faQuoteLeft} className="elegant-icon-white" /> Get Your Instant Quote
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Testimonials */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">{city} Customer Reviews</h2>
                                <hr />

                                <Row className="mt-4">
                                    <Col md={4} className="mb-4">
                                        <div className="gallery-card h-100">
                                            <div className="p-4">
                                                <div className="mb-3">
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                </div>
                                                <h5 className="mb-3">Excellent Service</h5>
                                                <p className="mb-4">
                                                    "Awesome experience from start to finish. On time, reliable, and fantastic work I highly recommend."
                                                </p>
                                                <div className="text-right font-italic">
                                                    <strong>- D. Rapp</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-4">
                                        <div className="gallery-card h-100">
                                            <div className="p-4">
                                                <div className="mb-3">
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                </div>
                                                <h5 className="mb-3">Lake View Enhancement</h5>
                                                <p className="mb-4">
                                                    "Our Lake Mountain Estates home has amazing views of Lake Mead, and Defined Cleaning made them even better! Their thorough cleaning removed years of hard water spots and mineral buildup."
                                                </p>
                                                <div className="text-right font-italic">
                                                    <strong>- William D., Lake Mountain Estates</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-4">
                                        <div className="gallery-card h-100">
                                            <div className="p-4">
                                                <div className="mb-3">
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                </div>
                                                <h5 className="mb-3">Complete Home Services</h5>
                                                <p className="mb-4">
                                                    "We've used Defined Cleaning for window cleaning, power washing, and solar screen installation. Every service has been exceptional, and their team is always professional and courteous."
                                                </p>
                                                <div className="text-right font-italic">
                                                    <strong>- Catherine H., Del Prado</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default BoulderCity;