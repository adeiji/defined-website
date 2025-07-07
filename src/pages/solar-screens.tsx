import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../App.css';
import '../assets/css/home.css';
import Footer from '../components/Footer';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ContactForm from '../components/ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trackConversion } from '../utils/tracking';
import { Config } from '../config';
import {
    faSun,
    faCheckCircle,
    faShieldAlt,
    faPhone,
    faQuoteLeft,
    faAngleRight,
    faEnvelope,
    faHome,
    faMapMarkerAlt,
    faTools,
    faDroplet,
    faLeaf,
    faHandSparkles,
    faWindowMaximize,
    faMoneyBillWave,
    faCalendarAlt,
    faStar,
    faPercent,
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import CONSTANTS from '../constants';

const SolarScreens = () => {
    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`;
    const phoneNumber = Config.Env.PhoneNumbers.Main;
    const navigate = useNavigate();

    // Show seasonal discount if before April 30th
    const [showSeasonalDiscount, setShowSeasonalDiscount] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        const discountEndDate = new Date(currentDate.getFullYear(), 3, 30); // April 30th
        setShowSeasonalDiscount(currentDate <= discountEndDate);
    }, []);

    // UET conversion tracking functions for Microsoft Ads
    const uet_report_contact_conversion = () => {
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'contact', { "event_label": "74021ff0-ab17-4ffc-8ecd-60794b999081" });
    };

    const uet_report_schedule_conversion = () => {
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'outbound_click', { "event_label": "schedule_free_estimate" });
    };

    const uet_report_form_submission = () => {
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'submit_lead_form', { "event_label": "solar_screens" });
    };

    const handlePhoneClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // Track with existing Google Ads conversion
        trackConversion(CONSTANTS.CONVERSION_TRACKING.SOLAR_SCREENS.PHONE);
        // Track with Microsoft Ads UET
        uet_report_contact_conversion();
    };

    const handleScheduleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const acuityLink = "https://app.acuityscheduling.com/schedule/2442cc72/appointment/44616787/calendar/any?appointmentTypeIds[]=44616787";
        // Track with existing Google Ads conversion
        trackConversion(CONSTANTS.CONVERSION_TRACKING.SOLAR_SCREENS.ACUITY);
        // Track with Microsoft Ads UET for schedule action
        uet_report_schedule_conversion();
    };

    const CTA = () => {
        return (
            <div className="modern-cta">
                <h2 className="modern-cta-title">Join Our Satisfied Las Vegas Customers</h2>
                <p>Trust the solar screen experts with your home or business</p>

                <div className="modern-cta-discount">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="elegant-icon-white mr-2" /> 10% OFF
                </div>

                <p><FontAwesomeIcon icon={faCalendarAlt} className="elegant-icon-white mr-2" /> Book your solar screen installation before <strong>{moment().add(10, 'd').format('MMMM Do')}</strong> to claim your discount</p>

                <div>
                    <Button className="modern-cta-button" onClick={handlePhoneClick}>
                        <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call or Text {phoneNumber}
                    </Button>

                    <Button className="modern-cta-button" onClick={handleScheduleClick}>
                        <FontAwesomeIcon icon={faQuoteLeft} className="elegant-icon-white" /> Schedule Your FREE Estimate
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="solar-screens">
            <Navbar showEstimateButton={true} />

            <main style={{ width: "100%", fontSize: "18px", lineHeight: "2.0em", flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
                <Container style={{ backgroundColor: "white", padding: 0 }} fluid>
                    {/* Hero Section */}
                    <Row className="py-5">
                        <Col xs={12} className="text-center">
                            <h1 className="section-title mb-0 text-center">Solar Screens Las Vegas</h1>
                            <h2 className="mt-3" style={{ color: "#ff871e" }}>Defined Home Services, LLC</h2>
                            <p className="mt-2">New Solar Screens for Windows and Solar Screen Repair</p>
                        </Col>
                    </Row>

                    <div className="content-container">
                        {/* Featured Benefits Cards */}
                        <Row className="mb-5">
                            <Col xs={12} md={3}>
                                <div className="feature-card">
                                    <div className="feature-card-icon">
                                        <FontAwesomeIcon icon={faHome} />
                                    </div>
                                    <h4>HOA Compliant</h4>
                                    <p>Most styles and colors are approved by Las Vegas HOAs</p>
                                </div>
                            </Col>
                            <Col xs={12} md={3}>
                                <div className="feature-card">
                                    <div className="feature-card-icon">
                                        <FontAwesomeIcon icon={faShieldAlt} />
                                    </div>
                                    <h4>10-Year Warranty</h4>
                                    <p>Limited warranty on materials and workmanship</p>
                                </div>
                            </Col>
                            <Col xs={12} md={3}>
                                <div className="feature-card">
                                    <div className="feature-card-icon">
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                    <h4>5-Star Reviews</h4>
                                    <p>Over 150 positive reviews across platforms</p>
                                </div>
                            </Col>
                            <Col xs={12} md={3}>
                                <div className="feature-card">
                                    <div className="feature-card-icon">
                                        <FontAwesomeIcon icon={faCreditCard} />
                                    </div>
                                    <h4>Buy Now Pay Later</h4>
                                    <p>Financing options available to fit your budget</p>
                                </div>
                            </Col>
                        </Row>

                        {/* Seasonal Discount Alert */}
                        {showSeasonalDiscount && (
                            <Row className="mb-5">
                                <Col xs={12}>
                                    {CTA()}
                                </Col>
                            </Row>
                        )}

                        {/* Main Image Section */}
                        <Row className="mb-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Image src="/solar-screens-montage.png" fluid className="rounded shadow" style={{ maxWidth: '800px', maxHeight: '600px' }} />
                            </Col>
                        </Row>

                        {/* Service Areas */}
                        <Row className="mb-5">
                            <Col xs={12}>
                                <h2 className="section-title">Las Vegas Solar Screen Installation</h2>
                                <hr />
                                <p>
                                    We provide professional solar screen installation and repair services throughout the Las Vegas Valley, including:
                                </p>
                                <div className="service-areas">
                                    <div className="service-area-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon" /> Las Vegas
                                    </div>
                                    <div className="service-area-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon" /> Henderson
                                    </div>
                                    <div className="service-area-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon" /> Boulder City
                                    </div>
                                    <div className="service-area-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon" /> Summerlin
                                    </div>
                                    <div className="service-area-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon" /> North Las Vegas
                                    </div>
                                    <div className="service-area-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="elegant-icon" /> Spring Valley
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Benefits Section */}
                        <Row className="mb-5">
                            <Col md={6}>
                                <div className="numbered-list-container">
                                    <h3 className="mb-4">Benefits of Solar Screens:</h3>
                                    <ul className="numbered-list">
                                        <li><strong>UV Protection:</strong> Block 80-90% of harmful UV rays that fade furniture and flooring</li>
                                        <li><strong>Energy Savings:</strong> Reduce cooling costs by up to 25% by blocking heat before it enters your home</li>
                                        <li><strong>Glare Reduction:</strong> Eliminate harsh glare on TV and computer screens</li>
                                        <li><strong>Insect Protection:</strong> Keep bugs out while maintaining airflow with open windows</li>
                                        <li><strong>Increased Privacy:</strong> Enjoy daytime privacy while maintaining your view to the outside</li>
                                        <li><strong>Extended HVAC Life:</strong> Reduce strain on your air conditioning system</li>
                                        <li><strong>Improved Comfort:</strong> Create more consistent temperatures throughout your home</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={6}>
                                <h3 className="mb-4"><FontAwesomeIcon icon={faShieldAlt} className="elegant-icon" /> Perfect for Las Vegas Weather</h3>
                                <p>
                                    Las Vegas has some of the harshest sun exposure in the country. With temperatures regularly exceeding 110°F in summer months, solar screens are not just a luxury—they're a necessity for comfortable living and energy efficiency.
                                </p>
                                <p>
                                    Our premium solar screens block 80-90% of the sun's heat and UV rays before they even reach your window, making them significantly more effective than interior blinds or curtains at keeping your home cool.
                                </p>
                                <div className="icon-card mt-4">
                                    <div className="icon-wrapper">
                                        <FontAwesomeIcon icon={faSun} size="lg" />
                                    </div>
                                    <div className="icon-content">
                                        <h3>Did You Know?</h3>
                                        <p>
                                            Rooms with our solar screens installed can be up to 15°F cooler than rooms with standard windows during peak summer heat!
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Our Process Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Our Solar Screen Installation Process</h2>
                                <hr />
                                <p>
                                    At Defined Home Services, we offer complete custom solar screen solutions. Each screen is built specifically for your window, ensuring a perfect fit and maximum efficiency.
                                </p>

                                <div className="numbered-list-container my-4">
                                    <ul className="numbered-list">
                                        <li><strong>Free Consultation:</strong> We measure all your windows and discuss color options for both mesh and frames</li>
                                        <li><strong>Custom Building:</strong> We build each screen to your exact window dimensions using premium materials</li>
                                        <li><strong>Professional Installation:</strong> Our team expertly installs each screen for optimal performance</li>
                                        <li><strong>Quality Check:</strong> We ensure all screens fit properly and operate smoothly</li>
                                        <li><strong>Final Walkthrough:</strong> We review all installed screens with you to ensure your complete satisfaction</li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>

                        {/* Testimonials Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">What Our Customers Say</h2>
                                <hr />
                                <div className="testimonial-container">
                                    <div className="testimonial-card">
                                        <div className="testimonial-stars">
                                            ★★★★★
                                        </div>
                                        <p>"We've used Defined for window cleaning and recently had them install solar screens. Excellent service and product. The screens look great and have already made a big difference in keeping our house cooler."</p>
                                        <div className="testimonial-author">- Barbara Yumart</div>
                                    </div>
                                    <div className="testimonial-card">
                                        <div className="testimonial-stars">
                                            ★★★★★
                                        </div>
                                        <p>"Fast, professional solar screen replacement. Fair price, quality materials, and the installers were very respectful of our property. Would highly recommend to any homeowner in Vegas looking to beat the heat!"</p>
                                        <div className="testimonial-author">- Scott Kope</div>
                                    </div>
                                    <div className="testimonial-card">
                                        <div className="testimonial-stars">
                                            ★★★★★
                                        </div>
                                        <p>"Had 20+ solar screens installed. The whole process from estimate to installation was quick and professional. The team finished the job in just a few hours and the quality is excellent."</p>
                                        <div className="testimonial-author">- Ildefonso R.</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Twitchell Solar Screen Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">Premium Twitchell Textilene® Solar Screen Material</h2>
                                </div>
                                <hr />
                                <p>
                                    We use only the highest quality Twitchell Textilene® Solar Screen material, the industry leader in solar screen technology:
                                </p>
                                <div className="feature-list">
                                    <div className="feature-item">
                                        <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
                                        <div className="feature-text">
                                            <h4>Premium Vinyl-Coated Polyester</h4>
                                            <p>Durable and long-lasting material designed specifically for harsh desert climates</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
                                        <div className="feature-text">
                                            <h4>GREENGUARD Certified</h4>
                                            <p>Environmentally friendly materials that meet strict chemical emissions limits</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
                                        <div className="feature-text">
                                            <h4>Pet and Fade Resistant</h4>
                                            <p>Stands up to pets and maintains color integrity even in intense Las Vegas sun</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
                                        <div className="feature-text">
                                            <h4>Easy to Clean</h4>
                                            <p>Simple maintenance requires only occasional rinsing with a garden hose</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-4 p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px", borderLeft: "5px solid #074a5a" }}>
                                    <h3 className="mb-3">Why We Use Twitchell Solar Screens in Las Vegas</h3>
                                    <p>
                                        We utilize Textilene® Solar Screen, a product crafted by Twitchell, specifically designed to minimize heat transfer through windows. This innovative fabric significantly cuts down on the sun's damaging rays, effectively reducing heat and glare, while also offering privacy during the day.
                                    </p>
                                    <p>
                                        Made from a durable PVC coated polyester yarn, Textilene solar screen material is engineered to endure the rigors of sun exposure. Our solar screens are offered with varying levels of blockage—80% or 90%—to meet diverse requirements.
                                    </p>
                                    <p>
                                        Constructed with a premium quality frame in a variety of colors to complement your window frame, our screens feature internal aluminum corners for enhanced durability. Moreover, all our sun screens come with a 10-year warranty, ensuring long-term satisfaction and performance.
                                    </p>
                                </div>

                                {CTA()}

                                {/* Solar Screen Re-meshing Before/After Comparison */}
                                <div className="my-5">
                                    <h3 className="text-center mb-4">See the Difference: Before & After Re-Meshing</h3>
                                    <p className="text-center mb-4">Slide the divider to compare old, discolored solar screens with our re-meshed screens. Get the look of new screens at half the cost!</p>

                                    <BeforeAfterSlider
                                        afterImage="/solar-screen-examples/solar-screen-repaired.jpg"
                                        beforeImage="/solar-screen-examples/solar-screen-damaged.jpg"
                                        afterLabel="REPAIRED"
                                        beforeLabel="DAMAGED"
                                    />
                                </div>
                            </Col>
                        </Row>

                        {/* Color Options Section */}
                        <Row className="my-5">
                            <Col xs={12} md={6}>
                                <h3 className="mb-4"><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Screen Mesh Color Options</h3>
                                <Image src="/solar-screen-colors-scaled.jpg" fluid className="rounded shadow" />
                                <p className="mt-3">
                                    We offer a variety of mesh colors to complement your home's exterior. Popular choices include black (best for outward visibility), charcoal, brown, beige, and white. All colors provide the same level of heat reduction.
                                </p>
                            </Col>
                            <Col xs={12} md={6}>
                                <h3 className="mb-4"><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Frame Color Options</h3>
                                <Image src="/screenframecolors-scaled.jpg" fluid className="rounded shadow" />
                                <p className="mt-3">
                                    Our frame colors include white, bronze, tan, champagne, and silver to match your window frames and home exterior. All of our styles are HOA compliant for most Las Vegas communities.
                                </p>
                            </Col>
                        </Row>

                        {/* Solar Screen Examples Gallery */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">Recent Solar Screen Installations</h2>
                                </div>
                                <hr />
                                <p className="text-center mb-4">
                                    Browse our gallery of recently completed solar screen installations in Las Vegas and surrounding areas.
                                </p>

                                <div className="gallery-container">
                                    <div className="masonry-grid">
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/70250164810__43BEE050-2E9B-4A71-8248-51729EB366EC-scaled-1186374524-e1709564743524.jpg" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_1606-600x400.jpg" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_1610-600x400.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_1616-600x400.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_1747-450x600.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_1749-450x600.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_1752-450x600.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_3145-1-600x450.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_3198-600x450.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_3212-600x450.jpg" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_5279-600x450.jpg" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_5613-450x600.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_5615-450x600.webp" fluid className="rounded" />
                                        </div>
                                        <div className="masonry-item">
                                            <Image src="/solar-screen-examples/IMG_5635-450x600.jpg" fluid className="rounded" />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-center mt-4">
                                    <FontAwesomeIcon icon={faLeaf} className="elegant-icon" /> Each installation is custom-designed to perfectly fit your windows and complement your home's exterior.
                                </p>
                            </Col>
                        </Row>

                        {/* Call to Action */}
                        <Row className="my-5">
                            <Col>
                                {CTA()}
                            </Col>
                        </Row>

                        {/* Contact Form Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <ContactForm
                                    title="Request a Free Consultation"
                                    description="Fill out the form below to request a free consultation for solar screens or any of our other services. We'll contact you within 24 hours to discuss your needs."
                                    sourcePage="solar-screens-page"
                                    defaultServices={{
                                        windowCleaning: false,
                                        windowTinting: false,
                                        pressureWashing: false,
                                        solarScreens: true, // Pre-select solar screens
                                        normalScreens: false
                                    }}
                                    notificationPhone={Config.Env.PhoneNumbers.MainRaw}
                                    conversionId={CONSTANTS.CONVERSION_TRACKING.SOLAR_SCREENS.FORM_SUBMIT}
                                    onSubmitSuccess={uet_report_form_submission}
                                />
                            </Col>
                        </Row>

                        {/* Financing Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faCreditCard} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">Buy Now, Pay Later Options Available</h2>
                                </div>
                                <hr />
                                <p className="text-center">
                                    We offer flexible financing options to make your solar screen investment more affordable:
                                </p>

                                <p className="text-center mt-4">
                                    Ask about our financing options during your free consultation!
                                </p>
                            </Col>
                        </Row>

                        {/* Pricing Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Solar Screen Pricing</h2>
                                <hr />
                                <p>
                                    Our solar screen pricing is straightforward and competitive. The average cost for solar screens in Las Vegas is approximately $200 per window, depending on size.
                                </p>
                                <div className="pricing-table">
                                    <div className="pricing-header">
                                        <div className="pricing-cell">Service</div>
                                        <div className="pricing-cell">Price</div>
                                        <div className="pricing-cell">Notes</div>
                                    </div>
                                    <div className="pricing-row">
                                        <div className="pricing-cell">Standard Solar Screens</div>
                                        <div className="pricing-cell">$10 - $13 per sq ft</div>
                                        <div className="pricing-cell">$100 minimum per screen</div>
                                    </div>
                                    <div className="pricing-row">
                                        <div className="pricing-cell">Large/Specialty Windows</div>
                                        <div className="pricing-cell">$12-15 per sq ft</div>
                                        <div className="pricing-cell">Varies by complexity</div>
                                    </div>
                                    <div className="pricing-row">
                                        <div className="pricing-cell">Screen Re-mesh</div>
                                        <div className="pricing-cell">$8 per sq ft</div>
                                        <div className="pricing-cell">Using existing frames</div>
                                    </div>
                                </div>
                                <p className="mt-2">
                                    <i style={{ fontSize: "14px" }}>Financing available at higher rates.</i>
                                </p>
                                <p className="mt-4">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="elegant-icon" /> <strong>Current Promotion:</strong> 10% off all solar screen installations for a limited time!
                                </p>

                            </Col>
                        </Row>

                        {/* FAQ Section */}
                        <Row className="my-5">
                            <Col xs={12}>
                                <h2 className="section-title">Frequently Asked Questions</h2>
                                <hr />

                                <div className="my-4">
                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> How much energy can I save with solar screens?</h4>
                                    <p>Most homeowners in Las Vegas see a 15-25% reduction in cooling costs after installing solar screens. Your actual savings will depend on your home's orientation, window sizes, and current energy efficiency.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> How long do solar screens last?</h4>
                                    <p>With proper care, our premium solar screens typically last 10-15 years in the Las Vegas climate. The frames may last even longer, with only the mesh needing replacement.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Can I still open my windows with solar screens?</h4>
                                    <p>Yes! Solar screens are installed similar to regular insect screens and do not impede window function. For sliding windows, we ensure proper tracks are maintained for smooth operation.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Do solar screens completely block the view?</h4>
                                    <p>No, you can still see through solar screens from the inside. The view is somewhat darker (similar to wearing sunglasses), but still clear. From outside, it's much more difficult to see in, providing privacy.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Are solar screens HOA approved?</h4>
                                    <p>Most of our solar screen options are approved by HOAs throughout Las Vegas. We'll help you select colors and styles that comply with your specific HOA regulations.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> How do I clean solar screens?</h4>
                                    <p>Solar screens require minimal maintenance. Simply rinse with a garden hose occasionally to remove dust and debris. For stubborn dirt, a soft brush with mild soapy water will do the trick.</p>

                                    <h4><FontAwesomeIcon icon={faCheckCircle} className="elegant-icon" /> Can solar screens be installed on any window?</h4>
                                    <p>Solar screens can be installed on most window types, including single-hung, double-hung, sliding, casement, and fixed windows. We'll assess your specific windows during the free consultation.</p>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <iframe src="https://app.acuityscheduling.com/schedule.php?owner=20558893&appointmentType=44616787&ref=embedded_csp" title="Schedule Appointment" width="100%" height="1400" frameBorder="0"></iframe><script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>

                    {/* Other Services Section - Outside content container */}
                    <div style={{ maxWidth: "1800px", margin: "0 auto", width: "95%", padding: "0 20px" }}>
                        <h2 className="section-title" style={{ marginTop: "60px" }}>Our Other Services</h2>
                        <hr style={{ maxWidth: "800px", margin: "0 auto 30px" }} />
                        <p className="text-center mb-5" style={{ maxWidth: "1000px", margin: "0 auto 40px" }}>
                            In addition to solar screens, we offer a variety of home and commercial services throughout Las Vegas:
                        </p>
                    </div>

                    <div className="nav-services-grid">
                        {/* Residential Window Cleaning */}
                        <a href="/" className="service-card">
                            <img src="/window-dirty-before-after.jpg" alt="Residential Window Cleaning" className="service-card-img" />
                            <div className="service-card-body">
                                <h3 className="service-card-title">Residential Window Cleaning</h3>
                                <p className="service-card-text">
                                    Cleaning includes windows, screens, and tracks. We use a custom-built water-fed pole system for spotless results.
                                </p>
                                <span className="service-card-link">
                                    Learn More <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </div>
                        </a>

                        {/* Pressure Washing */}
                        <a href="/powerwashing" className="service-card">
                            <img src="/power-washing/driveway-before-after.jpg" alt="Pressure Washing" className="service-card-img" />
                            <div className="service-card-body">
                                <h3 className="service-card-title">Pressure Washing</h3>
                                <p className="service-card-text">
                                    We clean driveways, patios, and the exterior walls of your home. Remove stubborn stains and years of built-up dirt.
                                </p>
                                <span className="service-card-link">
                                    Learn More <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </div>
                        </a>

                        {/* Commercial Window Cleaning */}
                        <a href="/" className="service-card">
                            <img src="/luxury/hudl-brewery.jpg" alt="Commercial Window Cleaning" className="service-card-img" />
                            <div className="service-card-body">
                                <h3 className="service-card-title">Commercial Window Cleaning</h3>
                                <p className="service-card-text">
                                    Store fronts or large commercial buildings. We do it all with professional equipment and experienced technicians.
                                </p>
                                <span className="service-card-link">
                                    Learn More <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </div>
                        </a>

                        {/* Soft (Home) Washing */}
                        <a href="/powerwashing" className="service-card">
                            <img src="/power-washing/stucco-clean.jpg" alt="Soft (Home) Washing" className="service-card-img" />
                            <div className="service-card-body">
                                <h3 className="service-card-title">Soft (Home) Washing</h3>
                                <p className="service-card-text">
                                    Clean the exterior of your home using low pressure and environmentally friendly chemicals for a safe, effective clean.
                                </p>
                                <span className="service-card-link">
                                    Learn More <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </div>
                        </a>

                        {/* Screen Repair */}
                        <a href="/#screen-repair" className="service-card">
                            <img src="/screen-rebuild.jpg" alt="Screen Repair & Replacement" className="service-card-img" />
                            <div className="service-card-body">
                                <h3 className="service-card-title">Screen Repair & Replacement</h3>
                                <p className="service-card-text">
                                    Fix or replace damaged window screens with high-quality materials. We custom build screens to fit any window.
                                </p>
                                <span className="service-card-link">
                                    Learn More <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </div>
                        </a>

                        {/* Mobile Detailing */}
                        <a href="/car-detailing-las-vegas" className="service-card">
                            <img src="/mobile_detailing/car-detail-1.jpg" alt="Mobile Detailing" className="service-card-img" />
                            <div className="service-card-body">
                                <h3 className="service-card-title">Mobile Detailing</h3>
                                <p className="service-card-text">
                                    Need high quality mobile detailing done for your vehicle? We offer comprehensive car detailing services.
                                </p>
                                <span className="service-card-link">
                                    Learn More <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </div>
                        </a>
                    </div>

                    <div className="content-container">
                        {/* Final CTA */}
                        <Row className="my-5">
                            <Col>
                                {CTA()}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default SolarScreens;