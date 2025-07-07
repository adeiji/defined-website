import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import '../App.css';
import '../assets/css/home.css';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faShieldAlt,
    faPhone,
    faQuoteLeft,
    faTools
} from '@fortawesome/free-solid-svg-icons';
import { Config } from '../config';

const GutterCleaning = () => {
    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`;
    const phoneNumber = Config.Env.PhoneNumbers.Main;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ width: "100%", fontSize: "18px", lineHeight: "2.0em", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
                <Container style={{ backgroundColor: "white", padding: 0 }} fluid>
                    {/* Hero Section */}
                    <Row className="py-5">
                        <Col xs={12} className="text-center">
                            <div className="section-heading-with-icon">

                                <h1 className="section-title mb-0">Professional Gutter Cleaning Services in Las Vegas</h1>
                            </div>
                            <p className="mt-4">Keep your home protected from water damage with our thorough gutter cleaning services</p>
                        </Col>
                    </Row>

                    <div className="content-container">
                        {/* Main Content Section */}
                        <Row className="mb-5">
                            <Col md={6}>
                                <div className="numbered-list-container">
                                    <h3 className="mb-4">Why Gutter Cleaning Is Essential:</h3>
                                    <ul className="numbered-list">
                                        <li><strong>Prevents Water Damage:</strong> Clogged gutters can cause water to overflow and damage your roof, siding, and foundation</li>
                                        <li><strong>Extends Roof Life:</strong> Proper drainage helps extend the life of your roof and prevents costly repairs</li>
                                        <li><strong>Pest Prevention:</strong> Clean gutters eliminate standing water that attracts mosquitoes and other pests</li>
                                        <li><strong>Protects Landscaping:</strong> Prevents water overflow that can damage your garden and landscaping</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={6}>
                                <Image src="/gallary13.jpg" fluid className="rounded shadow" />
                            </Col>
                        </Row>

                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Our Gutter Cleaning Process</h2>
                                <hr />
                                <p>
                                    At Defined Cleaning, we take pride in providing thorough gutter cleaning services to Las Vegas homeowners. Our comprehensive process ensures your gutters function properly and protect your home from water damage, especially during the rare but heavy Las Vegas rain storms.
                                </p>

                                <div className="numbered-list-container my-4">
                                    <ul className="numbered-list">
                                        <li><strong>Inspection:</strong> We thoroughly inspect your gutters and downspouts to identify problem areas</li>
                                        <li><strong>Debris Removal:</strong> We remove all leaves, twigs, and debris by hand to ensure complete cleaning</li>
                                        <li><strong>Downspout Clearing:</strong> We ensure downspouts are clear and flowing properly</li>
                                        <li><strong>Flushing:</strong> We flush the entire system with water to verify proper drainage</li>
                                        <li><strong>Final Inspection:</strong> We conduct a final check to ensure everything is working properly</li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>

                        {/* Call to Action */}
                        <Row className="my-5">
                            <Col>
                                <div className="modern-cta">
                                    <h2 className="modern-cta-title">Schedule Your Gutter Cleaning Today</h2>
                                    <p>Protect your home from water damage with our professional gutter cleaning services</p>

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

                        {/* FAQ Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Frequently Asked Questions</h2>
                                <hr />

                                <div className="my-4">
                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> How often should I clean my gutters?</h4>
                                    <p>In Las Vegas, we recommend cleaning your gutters at least twice a year, especially before and after the monsoon season (July-September). If you have trees nearby, you may need more frequent cleanings.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> How long does gutter cleaning take?</h4>
                                    <p>Depending on the size of your home and the condition of your gutters, our professional service typically takes 1-3 hours.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Do you repair damaged gutters?</h4>
                                    <p>Yes, we offer minor gutter repair services. For major repairs or replacements, we can recommend trusted partners.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Is gutter cleaning necessary in Las Vegas?</h4>
                                    <p>Absolutely! While Las Vegas receives less rainfall than other cities, when it does rain, it often comes in heavy downpours. Clean gutters are essential to properly channel this water away from your home during these intense rain events.</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default GutterCleaning;