import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faPhone,
    faAngleRight,
    faEnvelope,
    faHome,
    faTools,
    faDroplet,
    faHandSparkles,
    faWindowMaximize,
    faSun,
    faCar
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import '../assets/css/home.css';
import { Config } from '../config';

const Footer = () => {
    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`;
    const phoneNumber = Config.Env.PhoneNumbers.Main;

    return (
        <footer className="site-footer" style={{ margin: 0, padding: "60px 0 0 0", flexShrink: 0 }}>
            <Container>
                <Row>
                    <Col md={3} sm={6} className="footer-column">
                        <h4>Our Services</h4>
                        <ul>
                            <li><a href="/"><FontAwesomeIcon icon={faWindowMaximize} className="elegant-icon-white" /> Window Cleaning</a></li>
                            <li><a href="/powerwashing"><FontAwesomeIcon icon={faDroplet} className="elegant-icon-white" /> Power Washing</a></li>
                            <li><a href="/#screen-repair"><FontAwesomeIcon icon={faTools} className="elegant-icon-white" /> Screen Repair & Installation</a></li>
                            <li><a href="/track-cleaning"><FontAwesomeIcon icon={faHandSparkles} className="elegant-icon-white" /> Track & Sill Cleaning</a></li>
                            <li><a href="/solar-screens"><FontAwesomeIcon icon={faSun} className="elegant-icon-white" /> Solar Screen Installation</a></li>
                            <li><a href="/car-detailing-las-vegas"><FontAwesomeIcon icon={faCar} className="elegant-icon-white" /> Car Detailing</a></li>
                        </ul>
                    </Col>

                    <Col md={3} sm={6} className="footer-column">
                        <h4>Service Areas</h4>
                        <div className="footer-areas">
                            <ul>
                                <li><a href="/service-areas/las-vegas">Las Vegas</a></li>
                                <li><a href="/service-areas/henderson">Henderson</a></li>
                                <li><a href="/service-areas/summerlin">Summerlin</a></li>
                                <li><a href="/service-areas/north-las-vegas">North Las Vegas</a></li>
                                <li><a href="/service-areas/spring-valley">Spring Valley</a></li>
                                <li><a href="/service-areas/enterprise">Enterprise</a></li>
                                <li><a href="/service-areas/boulder-city">Boulder City</a></li>
                                <li><a href="/service-areas/mesquite">Mesquite</a></li>
                                <li><a href="/service-areas/paradise">Paradise</a></li>
                                <li><a href="/service-areas/centennial-hills">Centennial Hills</a></li>
                            </ul>
                        </div>
                    </Col>

                    <Col md={3} sm={6} className="footer-column">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="elegant-icon-white" /> Home</a></li>
                            <li><a href="/powerwashing"><FontAwesomeIcon icon={faAngleRight} className="elegant-icon-white" /> Power Washing</a></li>
                            <li><a href="/#screen-repair"><FontAwesomeIcon icon={faAngleRight} className="elegant-icon-white" /> Screen Services</a></li>
                            <li><a href="/#water-fed-pole-design"><FontAwesomeIcon icon={faAngleRight} className="elegant-icon-white" /> Water-Fed Pole System</a></li>
                            <li><a href="#estimate"><FontAwesomeIcon icon={faAngleRight} className="elegant-icon-white" /> Get an Estimate</a></li>
                        </ul>
                    </Col>

                    <Col md={3} sm={6} className="footer-column">
                        <h4>Contact Information</h4>
                        <div className="footer-contact-info">
                            <p><FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> {phoneNumber}</p>
                            <p><FontAwesomeIcon icon={faEnvelope} className="elegant-icon-white" /> info@definedcleaning.com</p>
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon-white" /> Serving Las Vegas & Surrounding Areas</p>
                        </div>
                        <div className="footer-social">
                            <a href={phoneNumberLink}><FontAwesomeIcon icon={faPhone} size="lg" /></a>
                            <a href="mailto:info@definedcleaning.com"><FontAwesomeIcon icon={faEnvelope} size="lg" /></a>
                            <a href="/"><FontAwesomeIcon icon={faHome} size="lg" /></a>
                        </div>
                    </Col>
                </Row>
                <div className="footer-bottom" style={{ paddingBottom: '20px' }}>
                    <p style={{ marginBottom: 0 }}>&copy; {new Date().getFullYear()} Defined Home Services, LLC. All Rights Reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;