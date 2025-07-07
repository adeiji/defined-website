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

const Enterprise = () => {
    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`;
    const phoneNumber = Config.Env.PhoneNumbers.Main;
    const city = "Enterprise";

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
                                    {city} presents unique challenges for window cleaning. As one of the fastest-growing areas in the Las Vegas Valley with numerous new developments, homes here face the typical desert conditions but often have modern architectural features that require special attention. At Defined Cleaning, we've developed solutions specifically designed for Enterprise properties.
                                </p>

                                <div className="numbered-list-container my-4">
                                    <h3 className="mb-4">{city}-Specific Window Challenges:</h3>
                                    <ul className="numbered-list">
                                        <li><strong>Desert Dust:</strong> Our gentle but effective scrubbing removes stuck-on dust and debris</li>
                                        <li><strong>Hard Water Spots:</strong> Our custom water filtration system prevents new spots and removes existing mineral deposits</li>
                                        <li><strong>New Construction:</strong> Special techniques for newly built homes with construction residue</li>
                                        <li><strong>Modern Architecture:</strong> Equipment and methods to safely access uniquely designed windows and features</li>
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
                                        <li>Southern Highlands</li>
                                        <li>Mountains Edge</li>
                                        <li>Silverado Ranch</li>
                                        <li>Inspirada</li>
                                        <li>Seven Hills</li>
                                        <li>Anthem</li>
                                        <li>Frontage Road</li>
                                        <li>Cactus</li>
                                        <li>South Valley View</li>
                                        <li>All other Enterprise neighborhoods</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="icon-card mt-4">
                                    <div className="icon-wrapper">
                                        <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
                                    </div>
                                    <div className="icon-content">
                                        <h3>Local Expertise</h3>
                                        <p>
                                            We've cleaned thousands of windows in {city}, giving us unmatched local expertise in dealing with the unique conditions of this growing area. We understand the specific needs of different neighborhoods and home styles throughout Enterprise.
                                        </p>
                                    </div>
                                </div>
                                <div className="icon-card mt-4">
                                    <div className="icon-wrapper">
                                        <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                                    </div>
                                    <div className="icon-content">
                                        <h3>New Home Specialists</h3>
                                        <p>
                                            Enterprise has many new developments. Our team is experienced in cleaning windows on new construction homes, removing builder residue and ensuring your windows start off in perfect condition.
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
                                                <h5 className="mb-3">Complete Package</h5>
                                                <p className="mb-4">
                                                    "Defined Cleaning handles all our window and exterior cleaning needs in Mountains Edge. Their attention to detail and consistency keeps us coming back. Truly the best in Enterprise!"
                                                </p>
                                                <div className="text-right font-italic">
                                                    <strong>- Michael S., Mountains Edge</strong>
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
                                                <h5 className="mb-3">Solar Screen Installation</h5>
                                                <p className="mb-4">
                                                    "The solar screens Defined Cleaning installed on our Silverado Ranch home have made an incredible difference in our energy bills and comfort. Perfect installation and great service!"
                                                </p>
                                                <div className="text-right font-italic">
                                                    <strong>- Jessica W., Silverado Ranch</strong>
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

export default Enterprise;