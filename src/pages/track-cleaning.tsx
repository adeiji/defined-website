import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import '../App.css';
import '../assets/css/home.css';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandSparkles,
    faCheckCircle,
    faWindowMaximize,
    faPhone,
    faQuoteLeft,
    faAngleRight,
    faEnvelope,
    faHome,
    faMapMarkerAlt,
    faTools,
    faDroplet,
    faLeaf,
    faSun
} from '@fortawesome/free-solid-svg-icons';
import { Config } from '../config';

const TrackCleaning = () => {
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
                                <div className="icon-circle">
                                    <FontAwesomeIcon icon={faHandSparkles} size="lg" />
                                </div>
                                <h1 className="section-title mb-0">Window Track & Sill Cleaning Services</h1>
                            </div>
                            <p className="mt-4">Complete your window cleaning with our thorough track and sill cleaning service</p>
                        </Col>
                    </Row>

                    <div className="content-container">
                        {/* Main Image Section */}
                        <Row className="mb-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Image src="/tracks1.jpg" fluid className="rounded shadow" style={{ maxWidth: '600px' }} />
                            </Col>
                        </Row>

                        {/* Main Content Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Why Track & Sill Cleaning Matters</h2>
                                <hr />
                                <p>
                                    In Las Vegas, window tracks can get extremely dirty. The desert dust and debris build up quickly, creating an unsightly mess that can affect your window's function and appearance. A complete window cleaning should always include the tracks and sills - otherwise, it's only a partial cleaning!
                                </p>

                                <div className="numbered-list-container my-4">
                                    <h3 className="mb-4">The Four Key Components of a Window:</h3>
                                    <ul className="numbered-list">
                                        <li><strong>Glass panes</strong> - The transparent part of your window</li>
                                        <li><strong>Window screens</strong> - The mesh barriers that keep insects out</li>
                                        <li><strong>Window tracks</strong> - The channels that guide your window when opening and closing</li>
                                        <li><strong>Window sills</strong> - The framing elements of your window</li>
                                    </ul>
                                </div>

                                <p className="mt-4">
                                    <strong>The sills have to be cleaned in order to really have a clean looking window.</strong> If you've ever seen a window with clean glass but dirty sills, you'll notice that something is quite wrong. Properly cleaned tracks also ensure that your windows open and close smoothly.
                                </p>
                            </Col>
                        </Row>

                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Our Track & Sill Cleaning Process</h2>
                                <hr />
                                <p>
                                    <strong>In Las Vegas, window tracks get disgusting.</strong> If you let them go for any serious amount of time, you'll have a thick layer of dust in the tracks. This not only looks bad, but when water splashes on the tracks, it will end up getting onto the glass and screens. Here's how we get your tracks perfectly clean:
                                </p>

                                <div className="numbered-list-container my-4">
                                    <ul className="numbered-list">
                                        <li><strong>Loosen:</strong> We use a dry towel to loosen up the built-up dirt and debris</li>
                                        <li><strong>Deep Clean:</strong> After cleaning the glass, we use a wet towel to thoroughly clean the tracks</li>
                                        <li><strong>Interior Care:</strong> On the inside of your home, we use a wet towel to clean the remaining dirt out of the tracks</li>
                                        <li><strong>Final Inspection:</strong> We carefully check all tracks and sills to ensure they're completely clean</li>
                                    </ul>
                                </div>

                                <p>
                                    The end result? Beautiful tracks and sills that complete your window cleaning experience and make your windows look truly spotless.
                                </p>
                            </Col>
                        </Row>

                        {/* Before/After Section */}
                        <Row className="my-5">
                            <Col xs={12} md={6}>
                                <h3><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Before Track Cleaning</h3>
                                <Image src="/tracks-before-after.jpg" fluid className="rounded shadow" />
                                <p className="mt-2">Dirty tracks can collect dust, debris, and even mold over time.</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <h3><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> After Track Cleaning</h3>
                                <Image src="/tracks1.jpg" fluid className="rounded shadow" />
                                <p className="mt-2">Our thorough cleaning process leaves your tracks spotless and functional.</p>
                            </Col>
                        </Row>

                        {/* Call to Action */}
                        <Row className="my-5">
                            <Col>
                                <div className="modern-cta">
                                    <h2 className="modern-cta-title">Complete Your Window Cleaning</h2>
                                    <p>Get your window tracks and sills looking like new again</p>

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
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default TrackCleaning;