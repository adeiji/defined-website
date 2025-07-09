import NetworkService from '../services/networkService'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Image } from 'react-bootstrap'
import CONSTANTS from '../constants'
import { SurveyObject } from '../models/models'
import { FacebookIcon, FacebookShareButton } from 'react-share'

type Referral = {
    name: string,
    contactInfo: string
}

const Survey = () => {

    const networkService = new NetworkService();

    /// Service provided
    const [servicesProvided, setServicesProvided] = useState<string[]>([])

    /// Why did the customer chose us?
    const [whyUs, setWhyUs] = useState<string>()

    /// Did the customer feel they got their moneys worth?
    const [moneysWorth, setMoneysWorth] = useState<string>()

    /// What did the customer enjoy about the service?
    const [enjoyedAboutService, setEnjoyedAboutService] = useState<string>()

    /// What improvements could be made?
    const [improvements, setImprovements] = useState<string>()

    /// What rating did the customer give us?
    const [rating, setRating] = useState<number>()

    /// Any referrals that the customer gave us
    const [referrals, setReferrals] = useState<Referral[]>([])

    /// If the user has finishe submitting the survey
    const [finished, setFinished] = useState(false)

    const [processing, setProcessing] = useState(false)

    const [email, setEmail] = useState("")

    const [name, setName] = useState("")

    const serviceClicked = (event: any) => {

        const service = event.target.name
        if (event.target.checked) {
            const myServicesProvided = servicesProvided.concat(service)
            setServicesProvided(myServicesProvided)
        } else {
            let index = servicesProvided.indexOf(service)
            if (index != -1) {
                const myServicesProvided = servicesProvided
                setServicesProvided(myServicesProvided.splice(index))
            }
        }
    }

    const submitSurvey = async () => {
        var myReferrals = referrals.filter(function (x) {
            return x !== undefined;
        });

        const survey: SurveyObject = {
            servicesProvided: servicesProvided ?? [],
            whyUs: whyUs ?? "",
            moneysWorth: moneysWorth ?? "",
            enjoyedAboutService: enjoyedAboutService ?? "",
            improvements: improvements ?? "",
            rating: rating ?? 0,
            referrals: myReferrals ?? [],
            email: email ?? "",
            name: name ?? "",
            dateAdded: new Date(),
            contactedReferrals: false
        }

        setProcessing(true)
        try {
            // TODO: Replace with backend API call when implemented
            console.log('TODO: Save survey to backend API - surveys collection not yet migrated to backend');
            // const response = await networkService.post('/surveys', survey);
            
            // Simulate async operation
            setTimeout(() => {
                setProcessing(false)
                setFinished(true)
            }, 1000);
        } catch (error) {
            console.error('Error submitting survey:', error);
            setProcessing(false)
        }
    }

    const Referral = (props: { index: number }) => {
        return (
            <div>
                <Row className="m-3">
                    <Col xs="6">
                        <Form.Group>
                            <Form.Control onChange={(event) => addReferralName(props.index, event.target.value)} type="text"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs="6">
                        <Form.Group>
                            <Form.Control onChange={(event) => addReferralContact(props.index, event.target.value)} type="text"></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        )
    }

    const addReferralContact = (index: number, contactInfo: string) => {
        const myReferrals = referrals
        myReferrals[index] = {
            name: myReferrals[index]?.name ?? "",
            contactInfo: contactInfo
        }

        setReferrals(myReferrals)
    }

    const addReferralName = (index: number, name: string) => {
        const myReferrals = referrals
        myReferrals[index] = {
            name: name,
            contactInfo: myReferrals[index]?.contactInfo ?? ""
        }

        setReferrals(myReferrals)
    }

    return (

        <div style={{ backgroundColor: "white" }}>
            <Form>
                <Modal show={true}>
                    {
                        !finished &&
                        <div>
                            <Container style={{ fontSize: "20px" }}>
                                <Modal.Header>
                                    <h3>Survey for Defined Window Cleaning</h3>
                                </Modal.Header>
                                <Row className="m-3">
                                    <Col >
                                        <strong>
                                            Thank you so much for taking the time to answer a few questions so that we can provide better service to our customers.
                                        </strong>
                                    </Col>
                                </Row>

                                <Row className="m-3">
                                    <Col xs="12">
                                        <strong>Your Name</strong>
                                    </Col>
                                </Row>

                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Control
                                                onChange={(event) => setName(event.target.value)}
                                                type="text" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="m-3">
                                    <Col xs="12">
                                        <strong>Email</strong>
                                    </Col>
                                </Row>

                                <Row className="m-3">
                                    <Col xs="12">
                                        If you would like to receive information on discounts and new services that we will be offering please enter your email below.
                                    </Col>
                                </Row>


                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formUserEmail">
                                            <Form.Control
                                                onChange={(event) => setEmail(event.target.value)}
                                                type="text" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group
                                            className="mb-3" controlId="formServices">
                                            <Form.Label >Which service(s) did you receive from us (please check all that apply)?</Form.Label>

                                            <h5 className="mt-3">
                                                Window Cleaning
                                            </h5>
                                            <Form.Check
                                                name={CONSTANTS.SERVICES.EXT_WINDOW_CLEANING} id="exteriorWindowCleaning" type="checkbox" label={CONSTANTS.SERVICES.EXT_WINDOW_CLEANING} onChange={(event) => serviceClicked(event)} />
                                            <Form.Check
                                                name={CONSTANTS.SERVICES.INT_WINDOW_CLEANING} id="interiorWindowCleaning" type="checkbox" label={CONSTANTS.SERVICES.INT_WINDOW_CLEANING} onChange={(event) => serviceClicked(event)} />

                                            <h5 className="mt-3">
                                                Window Screens
                                            </h5>

                                            <Form.Check
                                                name={CONSTANTS.SERVICES.SCREEN_BUILDING} id="screenBuilding" type="checkbox" label={CONSTANTS.SERVICES.SCREEN_BUILDING} onChange={(event) => serviceClicked(event)} />
                                            <Form.Check
                                                name={CONSTANTS.SERVICES.SCREEN_REPAIR} id="screenRepair" type="checkbox" label={CONSTANTS.SERVICES.SCREEN_REPAIR} onChange={(event) => serviceClicked(event)} />

                                            <h5 className="mt-3">
                                                Pressure Washing
                                            </h5>

                                            <Form.Check
                                                name={CONSTANTS.SERVICES.DRIVEWAY_PRESSURE_WASHING} id="windowTint" type="checkbox" label={CONSTANTS.SERVICES.DRIVEWAY_PRESSURE_WASHING} onChange={(event) => serviceClicked(event)} />
                                            <Form.Check
                                                name={CONSTANTS.SERVICES.PATIO_PRESSURE_WASHING} id="windowTint" type="checkbox" label={CONSTANTS.SERVICES.PATIO_PRESSURE_WASHING} onChange={(event) => serviceClicked(event)} />
                                            <Form.Check
                                                name={CONSTANTS.SERVICES.DRIVEWAY_PRESSURE_WASHING} id="windowTint" type="checkbox" label={CONSTANTS.SERVICES.
                                                    DRIVEWAY_PRESSURE_WASHING} onChange={(event) => serviceClicked(event)} />

                                            <h5 className="mt-3">
                                                Other
                                            </h5>

                                            <Form.Check
                                                name={CONSTANTS.SERVICES.WINDOW_TINT} id="windowTint" type="checkbox" label={CONSTANTS.SERVICES.WINDOW_TINT} onChange={(event) => serviceClicked(event)} />
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <hr />

                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formCost">
                                            <Form.Label>1. What made you decide to choose us for the service(s)?</Form.Label>
                                            <Form.Control
                                                onChange={(event) => setWhyUs(event.target.value)}
                                                as="textarea" placeholder="" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />
                                
                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formCost">
                                            <Form.Label>2. Did you feel you got your money's worth?</Form.Label>
                                            <Form.Control
                                                onChange={(event) => setMoneysWorth(event.target.value)}
                                                as="textarea" placeholder="" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formCost">
                                            <Form.Label>3. Was there anything you particularly enjoyed about the service(s)?</Form.Label>
                                            <Form.Control
                                                onChange={(event) => setEnjoyedAboutService(event.target.value)}
                                                as="textarea" placeholder="" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formCost">
                                            <Form.Label>4. Is there anything you feel we can improve on?</Form.Label>
                                            <Form.Control
                                                onChange={(event) => setImprovements(event.target.value)}
                                                as="textarea" placeholder="" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formCost">
                                            <Form.Label>5. On a scale of 1-5 how would you rate the experience working with us overall?</Form.Label>
                                            <Form.Control
                                                onChange={(event) => setRating(Number(event.target.value))}
                                                type="number" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="m-3">
                                    <Col xs="12">
                                        <Form.Group className="mb-3" controlId="formCost">
                                            <Form.Label>
                                                <p>
                                                    6. Do you have any neighbors, friends, or family members that you feel would appreciate any of the services that we offer?
                                                </p>
                                                <p>
                                                    If you do, would you mind writing down their email or their phone number below? <strong>Each of your referrals will get a 15% discount.</strong>
                                                </p>
                                            </Form.Label>

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="m-3">
                                    <Col xs="6">
                                        Name
                                    </Col>
                                    <Col xs="6">
                                        Phone Number or Email
                                    </Col>
                                </Row>
                                {
                                    [0, 1, 2, 3, 4].map((index) => {
                                        return (
                                            <Referral index={index} />
                                        )
                                    })
                                }
                            </Container>
                            <Modal.Footer>
                                {
                                    // If the customer is being saved to the database then display a loading gif
                                    processing && <Image src="loading.gif" />
                                }
                                {
                                    !processing &&
                                    <Button onClick={submitSurvey} variant="success">
                                        Submit
                                    </Button>
                                }
                            </Modal.Footer>
                        </div>
                    }
                    {
                        finished &&
                        <Container>
                            <Row>
                                <Col>
                                    <Modal.Header>
                                        <h1>Thank you!</h1>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>
                                            Thank you for taking the time to fill out this survey. We appreciate your help so much and we hope to work with you again in the future.
                                        </p>
                                        <p>
                                            <strong>If you'd like to share our services with any others, please click the Facebook Share button below.</strong>
                                        </p>
                                        <p>
                                            <FacebookShareButton url="https://definedcleaning.com">
                                                <FacebookIcon size={32} round={true}></FacebookIcon> Please click to share us on Facebook
                                            </FacebookShareButton>
                                        </p>
                                    </Modal.Body>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Modal>
            </Form>

        </div>
    )

}

export default Survey