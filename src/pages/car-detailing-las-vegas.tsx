import React from 'react';
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPhoneAlt, faQuoteLeft, faCar, faSprayCan, faHandSparkles, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Quote from '../components/quote';
import '../assets/css/home.css';
import { Config } from '../config';

const CarDetailingLasVegas: React.FC = () => {
  // UET conversion tracking function for Microsoft Ads - Call buttons
  const uet_report_conversion = () => {
    window.uetq = window.uetq || [];
    window.uetq.push('event', 'mobile_detailing_call_clicked', {});
  }

  // UET conversion tracking function for Microsoft Ads - Book Online buttons
  const uet_report_booking_conversion = () => {
    window.uetq = window.uetq || [];
    window.uetq.push('event', 'book_appointment_mobile_detailing', {});
  }

  return (
    <div>
      <Navbar />
      <div className="image-text-overlay">
        <img
          src="/mobile_detailing/car-detail-1.jpg"
          alt="Professional car detailing service in Las Vegas"
          style={{ width: '100%', height: '600px', objectFit: 'cover' }}
        />
        <div className="text-overlay d-flex align-items-center">
          <div className="text-wrapper">
            <h1>Professional Car Detailing in Las Vegas</h1>
            <p>Restore your vehicle's showroom shine with our premium detailing services</p>
            <Button href="#packages" className="pill-button left-align-button mt-4">
              See Our Packages
            </Button>
          </div>
        </div>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <h2 className="section-title mb-4">Las Vegas' Premier Mobile Car Detailing Service</h2>
            <p className="text-center mb-5">
              With our professional detailing services, we bring the car spa to you. Our expert team uses
              premium products and proven techniques to restore your vehicle's appearance, preserve its
              value, and create a pristine driving environment. Serving all areas of Las Vegas, Henderson,
              Summerlin, and beyond.
            </p>

            <Row className="mb-5">
              <Col md={6}>
                <img
                  src="/mobile_detailing/car-detail-2.jpg"
                  alt="Interior car detailing in Las Vegas"
                  className="img-fluid rounded shadow"
                  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
              </Col>
              <Col md={6} className="d-flex flex-column justify-content-center mt-4 mt-md-0">
                <h3 style={{ color: '#074a5a' }}>Why Choose Our Detailing Service?</h3>
                <div className="numbered-list-container mt-3">
                  <ul className="numbered-list">
                    <li>Experienced and professional detailers</li>
                    <li>Premium cleaning products that protect your vehicle</li>
                    <li>Convenient mobile service at your location</li>
                    <li>Attention to detail for a truly exceptional finish</li>
                    <li>Competitive pricing with transparent packages</li>
                    <li>Satisfaction guaranteed on every service</li>
                  </ul>
                </div>
              </Col>
            </Row>

            <div id="packages" className="numbered-list-container my-5 py-4">
              <h2 className="section-title mb-5">Our Detailing Packages</h2>
              <Row>
                <Col lg={6} className="mb-4">
                  <Card className="h-100 package-card shadow border-0">
                    <Card.Header style={{ backgroundColor: '#074a5a', color: 'white', textAlign: 'center' }}>
                      <h3 className="mb-0">The Essentials Package</h3>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-4">
                        <h4 style={{ color: '#074a5a' }}>Exterior Treatment</h4>
                        <div className="numbered-list-container mb-4">
                          <ul className="numbered-list">
                            <li>Thorough hand wash with premium cleaning agents</li>
                            <li>Gentle hand drying to prevent water spots</li>
                            <li>Detailed cleaning of door jambs and edges</li>
                            <li>Crystal-clear window and mirror polishing</li>
                            <li>Application of protective agents to exterior surfaces</li>
                            <li>Tire and wheel deep cleaning and shine</li>
                            <li>Premium wax application for lasting protection</li>
                          </ul>
                        </div>
                      </div>

                      <div className="pricing-table-container mt-4">
                        <h5 className="text-center mb-3" style={{ color: '#074a5a' }}>Package Pricing</h5>
                        <div className="pricing-table">
                          <div className="pricing-header">
                            <div className="pricing-cell">Vehicle Type</div>
                            <div className="pricing-cell">Price</div>
                          </div>
                          <div className="pricing-row">
                            <div className="pricing-cell">Standard Car</div>
                            <div className="pricing-cell price">$120</div>
                          </div>
                          <div className="pricing-row">
                            <div className="pricing-cell">Minivan / Small SUV</div>
                            <div className="pricing-cell price">$140</div>
                          </div>
                          <div className="pricing-row">
                            <div className="pricing-cell">Large SUV / Truck</div>
                            <div className="pricing-cell price">$150</div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-center border-0 pb-4">
                      <Button href={`tel:${Config.Env.PhoneNumbers.MainRaw}`} className="modern-cta-button" onClick={() => { uet_report_conversion() }}>
                        <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> Call {Config.Env.PhoneNumbers.Main}
                      </Button>
                      <Button href="https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=75996606" className="modern-cta-button" onClick={() => { uet_report_booking_conversion() }}>
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Book Online Now
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>

                <Col lg={6} className="mb-4">
                  <Card className="h-100 package-card shadow border-0">
                    <Card.Header style={{ backgroundColor: '#ff871e', color: 'white', textAlign: 'center' }}>
                      <h3 className="mb-0">The Defined Package</h3>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-4">
                        <h4 style={{ color: '#074a5a' }}>Exterior Treatment</h4>
                        <div className="numbered-list-container mb-4">
                          <ul className="numbered-list">
                            <li>Thorough hand wash with premium cleaning agents</li>
                            <li>Gentle hand drying to prevent water spots</li>
                            <li>Detailed cleaning of door jambs and edges</li>
                            <li>Crystal-clear window and mirror polishing</li>
                            <li>Application of protective agents to exterior surfaces</li>
                            <li>Tire and wheel deep cleaning and shine</li>
                            <li>Premium wax application for lasting protection</li>
                          </ul>
                        </div>

                        <h4 style={{ color: '#074a5a' }}>Interior Treatment</h4>
                        <div className="numbered-list-container">
                          <ul className="numbered-list">
                            <li>Complete interior vacuuming including hard-to-reach areas</li>
                            <li>Carpet and floor mat shampooing and stain removal (if necessary)</li>
                            <li>Seat cleaning (fabric shampooing or leather conditioning)</li>
                            <li>Deep cleaning of all interior surfaces and trim</li>
                            <li>Sanitizing steam treatment for air vents, cupholders and compartments</li>
                            <li>Interior glass cleaning and polishing</li>
                            <li>Dashboard and console deep conditioning</li>
                          </ul>
                        </div>
                      </div>

                      <div className="pricing-table-container mt-4">
                        <h5 className="text-center mb-3" style={{ color: '#074a5a' }}>Package Pricing</h5>
                        <div className="pricing-table">
                          <div className="pricing-header">
                            <div className="pricing-cell">Vehicle Type</div>
                            <div className="pricing-cell">Price</div>
                          </div>
                          <div className="pricing-row">
                            <div className="pricing-cell">Standard Car</div>
                            <div className="pricing-cell price">$270</div>
                          </div>
                          <div className="pricing-row">
                            <div className="pricing-cell">Minivan / Small SUV</div>
                            <div className="pricing-cell price">$320</div>
                          </div>
                          <div className="pricing-row">
                            <div className="pricing-cell">Large SUV / Truck</div>
                            <div className="pricing-cell price">$350</div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-center border-0 pb-4">
                      <Button href={`tel:${Config.Env.PhoneNumbers.MainRaw}`} className="modern-cta-button" onClick={() => { uet_report_conversion() }}>
                        <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> Call {Config.Env.PhoneNumbers.Main}
                      </Button>
                      <Button href="https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=75996704" className="modern-cta-button" onClick={() => { uet_report_booking_conversion() }}>
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Book Online Now
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: '#f9f9f9' }} className="py-5">
        <Container>
          <h2 className="section-title mb-5">Our Detailing Process</h2>
          <Row className="mb-5">
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="icon-wrapper mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                  <FontAwesomeIcon icon={faCar} size="2x" />
                </div>
                <h4 style={{ color: '#074a5a' }}>Assessment</h4>
                <p>We begin by evaluating your vehicle's condition, noting areas that need special attention, and discussing your specific concerns.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="icon-wrapper mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                  <FontAwesomeIcon icon={faSprayCan} size="2x" />
                </div>
                <h4 style={{ color: '#074a5a' }}>Treatment</h4>
                <p>Using premium products and professional techniques, we meticulously clean, treat, and protect every surface of your vehicle.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="icon-wrapper mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                  <FontAwesomeIcon icon={faHandSparkles} size="2x" />
                </div>
                <h4 style={{ color: '#074a5a' }}>Final Inspection</h4>
                <p>We conduct a thorough final review, ensuring every detail meets our high standards before presenting your rejuvenated vehicle.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <h2 className="section-title mb-5">Our Work</h2>
            <Row>
              <Col md={6} className="mb-4">
                <img
                  src="/mobile_detailing/car-detail-3.jpg"
                  alt="Car detailing before and after in Las Vegas"
                  className="img-fluid rounded shadow"
                  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
              </Col>
              <Col md={6} className="mb-4">
                <img
                  src="/mobile_detailing/car-detail-4.jpg"
                  alt="Professional interior car cleaning Las Vegas"
                  className="img-fluid rounded shadow"
                  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
              </Col>
            </Row>

            <div className="text-center mt-4">
              <h4 style={{ color: '#074a5a' }}>See the difference professional detailing makes</h4>
              <p>From restoring faded exteriors to rejuvenating worn interiors, our detailing services transform vehicles throughout Las Vegas.</p>
            </div>

            <div className="modern-cta mt-5">
              <h2 className="modern-cta-title">Ready to Restore Your Vehicle's Beauty?</h2>
              <p>Book your car detailing service today and experience the difference of professional care.</p>
              <div className="d-flex justify-content-center flex-wrap">
                <Button href={`tel:${Config.Env.PhoneNumbers.MainRaw}`} className="modern-cta-button" onClick={() => { uet_report_conversion() }}>
                  <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> Call {Config.Env.PhoneNumbers.Main}
                </Button>
                <Button href="#packages" className="modern-cta-button">
                  <FontAwesomeIcon icon={faQuoteLeft} className="mr-2" /> View Packages
                </Button>
              </div>
            </div>

            <Row className="mt-5">
              <Col lg={12}>
                <div className="numbered-list-container">
                  <h3 className="mb-4" style={{ color: '#074a5a' }}>Las Vegas Car Detailing FAQs</h3>

                  <h5 style={{ color: '#074a5a' }}>How long does car detailing take?</h5>
                  <p>Our Essentials package typically takes 1-2 hours, while the Defined package may take 3-5 hours depending on your vehicle's condition and size.</p>

                  <h5 style={{ color: '#074a5a' }}>Do you come to my location?</h5>
                  <p>Yes! We offer mobile detailing throughout Las Vegas, Henderson, Summerlin, and nearby areas. We bring all necessary equipment and supplies to your location.</p>

                  <h5 style={{ color: '#074a5a' }}>What forms of payment do you accept?</h5>
                  <p>We accept cash, all major credit cards, and mobile payment options for your convenience.</p>

                  <h5 style={{ color: '#074a5a' }}>How often should I have my car detailed?</h5>
                  <p>For optimal results, we recommend detailing every 3-4 months. However, this may vary based on your driving conditions, vehicle exposure to elements, and personal preferences.</p>

                  <h5 style={{ color: '#074a5a' }}>Do you offer any guarantees?</h5>
                  <p>Absolutely! We stand behind our work with a satisfaction guarantee. If you're not completely satisfied, we'll address any concerns promptly.</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default CarDetailingLasVegas;