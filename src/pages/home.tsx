import { url } from 'inspector'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, Card, Row, Col, Container, Image, Modal } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import '../App.css'
import TestimonialObject from '../objects/testimonialobject'
import ReactGA from 'react-ga'
import Estimator from '../components/estimator'
import '../components/quote.css'
import Pricing from '../components/pricing'
import "../assets/css/home.css"
import Features from '../components/feature/features'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Config } from '../config'
import {
    faTint as faDroplet,
    faStar,
    faCheckCircle,
    faShieldAlt,
    faSun,
    faTools,
    faHome,
    faPhone,
    faQuoteLeft,
    faWater,
    faWindowMaximize,
    faHandSparkles,
    faAngleRight,
    faTrophy,
    faCalendarAlt,
    faMoneyBillWave,
    faExclamationTriangle,
    faEnvelope,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import CONSTANTS from '../constants'
import { trackConversion } from '../utils/tracking'

const Home = () => {

    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`
    const phoneNumber = Config.Env.PhoneNumbers.Main
    const discount = "20%"
    const [showModal, setShowModal] = useState(false)
    const [showDangerModal, setShowDangerModal] = useState(false)

    const navigate = useNavigate()

    const CTA = () => {
        return (
            <>
                <hr />
                <div className="modern-cta">
                    <h2 className="modern-cta-title">Join Over 1836 Satisfied Las Vegas Customers</h2>
                    <p>Trust the window cleaning experts with your home or business</p>

                    <div className="modern-cta-discount">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="elegant-icon-white mr-2" /> 10% OFF
                    </div>

                    <p><FontAwesomeIcon icon={faCalendarAlt} className="elegant-icon-white mr-2" /> Book your window cleaning online before <strong>{moment().add(10, 'd').format('MMMM Do')}</strong> to claim your discount</p>

                    <div>
                        <Button className="modern-cta-button" href={phoneNumberLink} onClick={() => { markConversion() }}>
                            <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call or Text {phoneNumber}
                        </Button>

                        <Button className="modern-cta-button" onClick={() => navigate('/estimate')}>
                            <FontAwesomeIcon icon={faQuoteLeft} className="elegant-icon-white" /> Get Your Instant Quote
                        </Button>
                    </div>

                </div>
                <hr />
            </>
        )
    }

    // UET conversion tracking function for Microsoft Ads
    const uet_report_home_phone_conversion = () => {
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'call_or_text_home_page', {});
    };

    const markConversion = () => {
        // Track with existing Google Ads conversion
        trackConversion(CONSTANTS.CONVERSION_TRACKING.WINDOW_CLEANING.PHONE);
        // Track with Microsoft Ads UET
        uet_report_home_phone_conversion();
    }

    const CallNow = () => {
        return (
            <Button className="modern-cta-button" href={phoneNumberLink} onClick={() => { markConversion() }}>
                Call or Text {phoneNumber}
            </Button>
        )
    }

    const Testimonial = (props: {
        testimonial: TestimonialObject
    }) => {

        return (
            <div className="gallery-card">
                <div className="p-4">
                    <div className="mb-3">
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                        <Image src="/star.png" width="24" />
                    </div>
                    <h5 className="mb-3">{props.testimonial.title}</h5>
                    <p className="mb-4">
                        {props.testimonial.content}
                    </p>
                    <div className="text-right font-italic">
                        <strong>{props.testimonial.username}</strong>
                    </div>
                </div>
            </div>
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {
                showDangerModal && <AreYouSure />
            }
            <Modal show={showModal} size="lg" onHide={() => setShowDangerModal(true)}>
                <Estimator />
            </Modal>
            <Navbar showEstimateButton={true} />


            <main style={{ width: "100%", fontSize: "18px", lineHeight: "2.0em", flex: "1 0 auto", display: "flex", flexDirection: "column" }} >
                <Container style={{ backgroundColor: "white", padding: 0 }} fluid>
                    <Row noGutters>
                        <Col className="image-text-overlay">
                            <Image src="/luxury-front-page.JPG" fluid style={{ width: "100%", height: "850px", objectFit: "cover" }} />

                            <div className="text-overlay">

                                <div className="header-links">
                                    <a href="/">Window Cleaning</a> {'|'} <a href="/solar-screens">Solar Screens</a> {'|'} <a href="/powerwashing">Power Washing</a> {'|'} <a href="/car-detailing-las-vegas">Car Detailing</a> {'|'} <a href="/#screen-repair">Screen Repair</a>
                                </div>

                                <div className="text-wrapper">
                                    <h1 style={{ color: "#092a3c" }}>Best In Las Vegas</h1>
                                    <h1 style={{ color: "#ff871e" }}>WINDOW CLEANING!</h1>
                                    <Button className="pill-button left-align-button" onClick={() => { navigate("/estimate") }}>Get Your FREE Estimate Now!</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="content-container">
                        <Row>
                            <Features />
                        </Row>

                        <Row>
                            <Col xs="12" className="my-5">
                                <h1 className="section-title">Some Previous Work in Las Vegas</h1>
                                <hr />
                            </Col>
                            <Col>
                                <div className="gallery-container">
                                    <div className="gallery-card">
                                        <img src="gallary8.jpeg" alt="Window cleaning before and after in Las Vegas" />
                                        <div className="gallery-card-body">
                                            Look at the difference between how the window looked before we cleaned it and after. This home in Centennial Hills was a lot of work and <strong>the customer loved the results</strong>.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="window-dirty-before-after.jpg" alt="Clean windows comparison in Las Vegas" />
                                        <div className="gallery-card-body">
                                            This image gives you a good idea of how clean your windows will look when we're done.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="hazy-before-after.jpg" alt="Hazy windows cleaned in Las Vegas" />
                                        <div className="gallery-card-body">
                                            These windows were covered with a thick film. We had to use our water fed pole machine and a special cleaning brush to remove it properly. But look at how clean we were able to get it.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="paint-spray-before-after.png" alt="Paint spray removal for window cleaning in Las Vegas" />
                                        <div className="gallery-card-body">
                                            Previous window cleaners had come to clean these windows but did not remove any of the paint spray. We came and removed the paint spray free of charge.
                                        </div>
                                    </div>
                                    <div className="gallery-card">
                                        <img src="tracks-before-after.jpg" alt="Clean window tracks in Las Vegas" />
                                        <div className="gallery-card-body">
                                            Look how clean we got these filthy tracks! We had to really scrub to get it cleaned, but the results were worth the effort.
                                        </div>
                                    </div>

                                    <div className="gallery-card">
                                        <img src="gallary13.jpg" alt="Large home window cleaning in Las Vegas" />
                                        <div className="gallery-card-body">
                                            We can clean homes of any size. This home was 16,000 Square Feet, but it was no problem. We have the team and the equipment to take care of it!
                                        </div>
                                    </div>

                                    <div className="gallery-card">
                                        <img src="gallary16.jpg" alt="Luxury home cleaning" />
                                        <div className="gallery-card-body">
                                            Luxury home we cleaned in Anthem. We cleaned these windows with a Water Fed Pole.
                                        </div>
                                    </div>

                                    <div className="gallery-card">
                                        <img src="/tracks1.jpg" alt="Clean window tracks in Las Vegas" />
                                        <div className="gallery-card-body">
                                            Look at how clean we got these window tracks
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* <div className="section-separator">
                            <Pricing />
                        </div> */}
                        <Row>
                            <Col>
                                <CTA />
                            </Col>
                        </Row>

                        <Row className="section-separator">
                            <Col xs="12" id="water-fed-pole-design">
                                <h2 className="section-title">We Serve Las Vegas, Henderson, Boulder City, and now Mesquite!</h2>
                                <hr />

                                <p>In Vegas, windows get dusty! And <strong>unfiltered Vegas water CANNOT be used to clean our windows because it will leave spots.</strong> 😬 That's why we work extra hard though to ensure that your windows look great after our cleaning services. <strong>We always use natural products, and we make sure that when cleaning your windows we scrub every inch until they look like new.</strong></p>
                                <p>Also...</p>
                            </Col>
                        </Row>

                        {/* Water-fed RO system section with text wrapping around image */}
                        <Row>
                            <Col xs="12" className="mb-3" id="water-fed-pole-design">
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faWater} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">Our Custom-Built Water-Fed R.O. System Leaves Fewer Spots and Streaks!</h2>
                                </div>
                                <hr />
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col xs="12">
                                <div className="text-wrap-section">
                                    <Image src="/water-fed-pole.jpg" className="floating-image-right" alt="Water-Fed RO System built specifically for Las Vegas" />

                                    <p>We <strong>built our own $2,000+ water-fed R.O. system</strong> so we can remove more impurities from our Las Vegas water, cut through the desert dust, and <strong>LEAVE FEWER SPOTS &amp; STREAKS</strong>!</p>
                                    <h4><FontAwesomeIcon icon={faTrophy} className="elegant-icon" /> How our water-fed pole cleans better</h4>
                                    <p>
                                        Our Water-Fed Pole is equipped with a natural Hog's Hair brush, <strong>which allows us to really get the windows clean due to its special scrubbing ability.</strong>
                                    </p>
                                    <p>
                                        <strong>We use two types of water filtration units.</strong>The first is a RO filter. The RO filter removes the larger particles from the water. The second is the DI filter. The DI filter removes the tiny particles that leave a spots and streaks on your glass. After the water goes through our dual filtration unit, <strong>the water we use to clean your windows is ultra-pure</strong><a href="https://www.ktnv.com/news/las-vegas-has-2nd-hardest-water-in-the-nation#:~:text=Water%20is%20considered%20%22hard%22%20when,it%20is%20%22extremely%20hard.%22" />
                                    </p>
                                    <p>
                                        Our city <strong>tap water here in Las Vegas is 278 parts-per-million</strong> (Reference: KTNV ABC Channel 13, Published: June 17, 2019, Accessed: November 26, 2020)A bottle of <a href="https://en.wikipedia.org/wiki/Dasani#:~:text=Dasani%20has%20%3C35%20ppm%20of%20total%20dissolved%20mineral%20salts."><strong>Dasani water has around 35 parts-per-million</strong></a> (Reference: Wikepedia.org, Article: "Dasani", Accessed: November 26, 2020).
                                    </p>
                                    <div className="icon-card mt-4">

                                        <div className="icon-content">
                                            <h3>Ultra-Pure Results</h3>
                                            <p>
                                                <span style={{ color: "#074a5a" }}>The ultra-pure water coming out of <span style={{ textDecoration: "underline", fontWeight: "bold" }}>our water fed pole is less than 3 parts-per-million.</span></span> The water coming out of our custom-built system is so good, on average there is <span style={{ color: "#074a5a" }}>only 1 grain in every 6 gallons of water.</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3">That's how our custom-built system helps us get your windows cleaner, with fewer spots and streaks.</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="section-separator">
                            <Col>
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faHandSparkles} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">Screen Cleaning is Included in Every Service</h2>
                                </div>
                                <hr />
                                <div className="my-5 d-flex justify-content-center">
                                    <video
                                        controls
                                        width="100%"
                                        style={{ maxWidth: '600px', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: 400 }}
                                    >
                                        <source src="/clean-screens.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <p>
                                    Every window cleaning really should include a screen cleaning.  Why is that?  Because especially here in Las Vegas, screens can get very, very dirty!  <strong>So if you don't clean the screens, than your going to have a job that doesn't look finished.</strong>  Really, not cleaning your window screens is like only cleaning your car windows, but not the rest of the car.  That obviously would be a huge no, no.  So why do that with your home?  If you're going to spend the money to get your windows cleaned, than a screen cleaning has to be included in that. There's just really no other option. That's why <strong>we throw in the screens for FREE!</strong> But why else should you get those screens cleaned?
                                </p>

                                <h5><FontAwesomeIcon icon={faExclamationTriangle} className="elegant-icon" /> Effect of Not Cleaning the Window Screens</h5>

                                <p>
                                    If you clean the window and do not clean the screen, what will be the result?  Water will go through the screen, pick up dirt, and than end up on your window.  That's the last thing that you would want to happen after you've just spent money to get the windows cleaned, right?  <strong>This is why we always include a screen cleaning with your window cleaning service.</strong>  It's our way of <strong>making sure your windows stay clean much longer.</strong>  But what is included in this service?  Here's our five-step process:
                                </p>

                                <div className="numbered-list-container">
                                    <ul className="numbered-list">
                                        <li><strong>Remove:</strong> We carefully remove the screens from the window frames</li>
                                        <li><strong>Clean:</strong> We brush the screens vigorously with soap and water to remove dirt</li>
                                        <li><strong>Dry:</strong> We let the screens sit outside in the sun to dry thoroughly</li>
                                        <li><strong>Frame Cleaning:</strong> We clean the outside frames of the screens</li>
                                        <li><strong>Reinstall:</strong> We put the screens back into the window frames they came from</li>
                                    </ul>
                                </div>

                                <p>
                                    <strong>This five-step process leaves your window screens looking amazing.  People say that when we are done, their screens look better than brand new.</strong> This is a must have service that <strong>we are more than happy to provide free of charge.</strong>
                                </p>

                                <CTA />
                            </Col>
                        </Row>
                        <Row className="section-separator">
                            <Col>

                                <div className="section-heading-with-icon">
                                    <h2 className="section-title mb-0">Get Window Cleaning Specific to Our Las Vegas Needs</h2>
                                </div>
                                <hr />

                                <div className="my-5 d-flex justify-content-center">
                                    <Image src="/gallary8.jpeg" rounded />
                                </div>

                                <p>
                                    Las Vegas has tons of sun.  Almost every day of the year, homes have the sun beat down on their windows.  And what is the result of this?  Well, windows become much harder to clean because the sun basically bakes the dirt and grime into the window.  Is this impossible to get off?  Most of the times no.  But there are some things that must be done in order to get the windows properly cleaned.  So with that in mind, what do we do to make sure that your windows are cleaned like they should be?
                                </p>
                                <h3><FontAwesomeIcon icon={faHandSparkles} className="elegant-icon" /> Scrubbing and Water Fed Pole</h3>
                                <p>
                                    We will do one of two things.  <strong>The first is we will scrub the windows with steel wool.  This steel wool is super fine.  It's so fine that it won't scratch the window at all.  The steel wool will get that stuck on dirt off those windows, and make them sparkle like brand new.</strong>
                                </p>

                                <p>
                                    Something else that we do is we use a Water-Fed System.  A Water-Fed System is a tool which first purifies water and then sends it through a pole with a brush at the end, which we than use to scrub and clean your windows. (To <a href="#water-fed-pole-design">learn more about our custom-built, water-fed RO system</a> please refer to the information above.)
                                </p>

                                <p>
                                    After we are done with the cleaning we also will check the home and make sure that we've left no streaks by using a dry piece of steel wool to clean up any areas that we missed.
                                </p>
                                <h3>
                                    <FontAwesomeIcon icon={faHome} className="elegant-icon" /> How We Clean The Inside of Your Las Vegas Home
                                </h3>
                                <p>
                                    When we are on the inside of the home, we take extreme care to make sure that everything is out of the way of the windows.  This is to ensure that we do not accidentally hit or damage any of your belongings.  Also, <strong>we put towels down on the floor and around the window frame to ensure that we do not get any excess water anywhere where it shouldn't be.</strong>  We will also be polite and use booties or take off our shoes when inside your home. And with COVID-19 right now, <strong>we'll never enter your home without wearing a mask.</strong>
                                </p>

                                <p>
                                    <strong>We use only eco-friendly solutions that will not damage anything within your home</strong> as well.  So you can <strong>feel good knowing that your home is safe when we are in there for the cleaning</strong>.
                                </p>

                                <p>
                                    All in all, you will be very happy with the window washing services provided.
                                </p>
                                <CTA />
                            </Col>
                        </Row>

                        <Row className="section-separator">
                            <Col>
                                <div className="section-heading-with-icon">
                                    <div className="icon-circle">
                                        <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
                                    </div>
                                    <h2 className="section-title mb-0">We Clean Window Tracks and Window Sills</h2>
                                </div>
                                <hr />
                                <div className="my-5 d-flex justify-content-center">
                                    <Image src="/tracks1.jpg" rounded />
                                </div>
                                <p>
                                    What is a window sill?  Why does it need to be cleaned?  Well, a window really consist of four things:
                                </p>

                                <div className="numbered-list-container">
                                    <ul className="numbered-list">
                                        <li>Glass panes</li>
                                        <li>Window screens</li>
                                        <li>The window tracks</li>
                                        <li>The window sills</li>
                                    </ul>
                                </div>
                                <p>
                                    A window cleaning, should obviously involve cleaning ALL four parts, otherwise, it would be called a partial-window cleaning.  The sills is basically another way of saying the window frames.  It's the outer edge of the window that is made of some form of plastic or metal.  <strong>The sills have to be cleaned in order to really have a clean looking window.</strong>  If you've ever seen a window with clean glass but dirty sills, you'll notice that something is quiet wrong.
                                </p>

                                <p>
                                    But what about the tracks?
                                </p>
                                <p>
                                    <strong>In Las Vegas, window tracks get disgusting.</strong>  If you let them go for any serious amount of time, than you will have a thick layer of dust in the tracks.  This does not look good at all.  And also, when water splashes on the tracks, than it will end up getting onto the glass and onto the screens.  So you can see why it's so important to make sure that you clean those tracks.  So how do we get them clean?
                                </p>
                                <div className="numbered-list-container">
                                    <ul className="numbered-list">
                                        <li><strong>Loosen:</strong> We use a dry towel to loosen up the built-up dirt and debris</li>
                                        <li><strong>Deep Clean:</strong> After cleaning the glass, we use a wet towel to thoroughly clean the tracks</li>
                                    </ul>
                                </div>
                                <p>
                                    On the inside of the home we use a wet towel to clean the rest of the dirt out of those tracks.
                                </p>
                                <p>
                                    The end result?  Beautiful tracks, which make for a beautiful window.  So what are you waiting for.  Click on the button below to schedule your free at-home estimate now, and get your windows cleaned like never before.
                                </p>

                                <CTA />
                            </Col>
                        </Row>

                        <div id="screen-repair">
                            <Row style={{ marginBottom: 0 }} className="section-separator">
                                <Col xs="12" md="6">
                                    <div>
                                        <div className="section-heading-with-icon">
                                            <div className="icon-circle">
                                                <FontAwesomeIcon icon={faTools} size="lg" />
                                            </div>
                                            <h2 className="section-title mb-0">Window Screen Repair and Installation</h2>
                                        </div>
                                    </div>
                                    <div>
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
                                        ...then call us now for your <strong>FREE at home estimate.</strong>  We will come out, measure all your windows and give you your personalized quote.
                                    </div>
                                    <div className="text-center mb-4">
                                        <Button className="modern-cta-button" href={phoneNumberLink} onClick={() => { markConversion() }}>
                                            <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call or Text {phoneNumber}
                                        </Button>
                                    </div>
                                </Col>
                                <Col xs="12" md="6" className="text-center my-4 d-flex align-items-center">
                                    <Image src="/screen-rebuild.jpg" thumbnail />
                                </Col>
                            </Row>
                        </div>
                    </div> {/* End of content-container */}

                </Container>
            </main>

            <Footer />
        </div>
    )
}

export default Home