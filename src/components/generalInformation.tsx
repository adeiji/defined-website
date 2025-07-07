import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Row, Col, Button, Form, InputGroup, Modal, ModalBody, Container } from 'react-bootstrap'
import CONSTANTS from '../constants'
import { Estimate, GeneralInformation } from '../models/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faPhone, faHome, faBuilding } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/home.css'
import { Config } from '../config'

const GeneralInformationForm = (props: { setEstimate: any, estimate: Estimate, previousPage: () => void, nextPage: () => void }) => {

    const YELP = "Yelp"

    let generalInformation: GeneralInformation = props.estimate.GeneralInformation ?? {}

    const [validated, setValidated] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [showCommercialModal, setShowCommercialModal] = useState(false)

    const [isResidential, setIsResidential] = useState(true)

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (generalInformation.houseSize == CONSTANTS.HOUSESIZE.HUGE) {
            setShowModal(true)
            return
        }

        if (isResidential == false) {
            setShowCommercialModal(true)
            return
        }

        props.estimate.GeneralInformation = generalInformation
        props.setEstimate(props.estimate)
        props.nextPage()

        setValidated(true);
    };

    const HouseTooBig = () => {
        return (
            <Modal show={true} size="lg" onHide={() => setShowModal(false)} >
                <Modal.Header closeButton className="border-0">
                    <div className="section-heading-with-icon w-100 justify-content-center">
                        <h2 className="section-title mb-0">House Too Big For Instant Quote</h2>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-4 text-center">
                    <div className="numbered-list-container my-4">
                        <p>For houses 5000 sq ft or larger we need to do the estimate in person. Please call or text us now so we can provide you your estimate.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center">
                    <Button
                        className="modern-cta-button"
                        href={`tel:${Config.Env.PhoneNumbers.MainRaw}`}
                        onClick={() => setShowModal(false)}>
                        <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call or Text (702) 747-0901
                    </Button>
                    <Button
                        className="modern-cta-button"
                        style={{ backgroundColor: "#074a5a", color: "white" }}
                        onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const CommercialJob = () => {
        return (
            <Modal show={true} size="lg" onHide={() => setShowCommercialModal(false)} >
                <Modal.Header closeButton className="border-0">
                    <div className="section-heading-with-icon w-100 justify-content-center">
                        <h2 className="section-title mb-0">Commercial Estimate</h2>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-4 text-center">
                    <div className="numbered-list-container my-4">
                        <p>Sorry, but you can't use the instant quote service for commercial buildings. Please call or text us now so we can provide you your estimate.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center">
                    <Button
                        className="modern-cta-button"
                        href="tel:7027470901"
                        onClick={() => setShowCommercialModal(false)}>
                        <FontAwesomeIcon icon={faPhone} className="elegant-icon-white" /> Call or Text (702) 747-0901
                    </Button>
                    <Button
                        className="modern-cta-button"
                        style={{ backgroundColor: "#074a5a", color: "white" }}
                        onClick={() => setShowCommercialModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div>
            {showModal && <HouseTooBig />}
            {showCommercialModal && <CommercialJob />}

            <Modal.Header closeButton className="border-0">
                <div className="section-heading-with-icon w-100 justify-content-center">
                    <h2 className="section-title mb-0">Property Information</h2>
                </div>
            </Modal.Header>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className="px-4">
                    <p className="text-center mb-4">Please tell us more about your property for an accurate estimate.</p>

                    <div className="numbered-list-container my-4">
                        <Row>
                            {/* How hear about us */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formHowHeard">
                                <Form.Label>Where did you hear about us?</Form.Label>
                                <Form.Control
                                    onChange={e => generalInformation.howHearAboutUs = e.target.value}
                                    defaultValue={props.estimate.GeneralInformation?.howHearAboutUs ?? ""}
                                    as="select"
                                    className="rounded-pill">
                                    <option>{YELP}</option>
                                    <option>Google</option>
                                    <option>Bing</option>
                                    <option>Flyer</option>
                                    <option>Referral</option>
                                    <option>Real Estate Agent</option>
                                </Form.Control>
                            </Form.Group>

                            {/* Number of floors */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formFloors">
                                <Form.Label>Number of floors above ground?</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="rounded-pill"
                                    onChange={e => generalInformation.floorsAboveGround = e.target.value}
                                    defaultValue={props.estimate.GeneralInformation?.floorsAboveGround ?? ""}>
                                    <option> {CONSTANTS.FLOORS.ONE_STORY} </option>
                                    <option> {CONSTANTS.FLOORS.TWO_STORY} </option>
                                    <option> {CONSTANTS.FLOORS.THREE_STORY} </option>
                                </Form.Control>
                            </Form.Group>

                            {/* Has basement */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formBasement">
                                <Form.Label>Do you have a basement?</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="rounded-pill"
                                    onChange={e => generalInformation.basement = e.target.value == CONSTANTS.BASEMENT.YES ? true : false}
                                    defaultValue={props.estimate.GeneralInformation?.basement == true ? CONSTANTS.YES : CONSTANTS.NO}>
                                    <option>{CONSTANTS.BASEMENT.NO}</option>
                                    <option> {CONSTANTS.BASEMENT.YES} </option>
                                </Form.Control>
                            </Form.Group>

                            {/* House size */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formHouseSize">
                                <Form.Label>House size</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="rounded-pill"
                                    onChange={e => generalInformation.houseSize = e.target.value}
                                    defaultValue={props.estimate.GeneralInformation?.houseSize ?? ""}>
                                    <option> {CONSTANTS.HOUSESIZE.SMALLEST} </option>
                                    <option> {CONSTANTS.HOUSESIZE.SMALLER} </option>
                                    <option> {CONSTANTS.HOUSESIZE.SMALL} </option>
                                    <option> {CONSTANTS.HOUSESIZE.MEDIUM} </option>
                                    <option> {CONSTANTS.HOUSESIZE.MEDIUMLARGE} </option>
                                    <option> {CONSTANTS.HOUSESIZE.LARGE} </option>
                                    <option> {CONSTANTS.HOUSESIZE.VERYLARGE} </option>
                                    <option> {CONSTANTS.HOUSESIZE.HUGE} </option>
                                </Form.Control>
                            </Form.Group>

                            {/* Residential or Commercial */}
                            <Form.Group as={Col} md={12} xs={12} className="mb-3" controlId="formPropertyType">
                                <Form.Label>Property Type</Form.Label>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        className={`flex-grow-1 mr-2 ${isResidential === false ? 'modern-cta-button' : 'modern-cta-button-selected'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsResidential(true)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faHome} className="mr-2" /> Residential
                                    </Button>
                                    <Button
                                        className={`flex-grow-1 ml-2 ${isResidential === true ? 'modern-cta-button' : 'modern-cta-button-selected'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsResidential(false)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBuilding} className="mr-2" /> Commercial
                                    </Button>
                                </div>
                            </Form.Group>
                        </Row>
                    </div>
                </Modal.Body>

                <Modal.Footer className="border-0 justify-content-center">
                    <Button
                        className="modern-cta-button mr-2"
                        style={{ backgroundColor: "#074a5a", color: "white" }}
                        onClick={() => props.previousPage()}>
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Previous
                    </Button>
                    <Button
                        className="modern-cta-button ml-2"
                        onClick={handleSubmit}>
                        Next Step <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Button>
                </Modal.Footer>
            </Form>
        </div>
    )
}

export default GeneralInformationForm