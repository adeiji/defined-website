import React from 'react';
import { Navbar as BootstrapNavbar, Button, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Config } from '../config';

const Navbar = (props: { showEstimateButton?: boolean }) => {
    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`;
    const phoneNumber = Config.Env.PhoneNumbers.Main;
    const navigate = useNavigate()

    // UET conversion tracking function for Microsoft Ads
    const uet_report_conversion = () => {
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'click_call_navbar', {});
    }

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <BootstrapNavbar.Brand href="/">
                <img
                    alt=""
                    src="/logo.png"
                    width="150"
                    height="30"
                    className="d-inline-block align-top"
                    style={{ marginLeft: 30 }}
                />
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Services" id="services-dropdown">
                        <NavDropdown.Item href="/screens">Window Cleaning</NavDropdown.Item>
                        <NavDropdown.Item href="/solar-screens">Solar Screens</NavDropdown.Item>
                        <NavDropdown.Item href="/powerwashing">Power Washing</NavDropdown.Item>
                        <NavDropdown.Item href="/gutter-cleaning">Gutter Cleaning</NavDropdown.Item>
                        <NavDropdown.Item href="/track-cleaning">Track Cleaning</NavDropdown.Item>
                        <NavDropdown.Item href="/car-detailing-las-vegas">Car Detailing</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </BootstrapNavbar.Collapse>
            <Button className="modern-cta-button m-2" href={phoneNumberLink} onClick={() => { uet_report_conversion() }}>
                <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call {phoneNumber}
            </Button>
            {
                props.showEstimateButton === true &&
                <Button className="modern-cta-button m-2" onClick={() => navigate("/estimate")}>
                    Get Instant Quote
                </Button>
            }
        </BootstrapNavbar >
    );
};

export default Navbar;