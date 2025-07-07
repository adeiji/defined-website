import React, { useState } from 'react'
import { Image, Form, Col, Button, Modal, Row, Container } from 'react-bootstrap'
import CONSTANTS from '../constants'
import { Estimate, Screens } from '../models/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/home.css'

const ScreenCount = (props: { setEstimate: any, estimate: Estimate, previousPage: () => void, nextPage: () => void }) => {

    const [validated, setValidated] = useState(true)

    let screens: Screens = props.estimate.Screens ?? {}

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        props.estimate.Screens = screens
        props.setEstimate(props.estimate)
        props.nextPage()

        setValidated(true);
    };

    return (
        <div>
            <Modal.Header closeButton className="border-0">
                <div className="section-heading-with-icon w-100 justify-content-center">
                    <h2 className="section-title mb-0">Screen Cleaning</h2>
                </div>
            </Modal.Header>

            <Modal.Body className="px-4">
                <p className="text-center mb-4">Would you like your window screens cleaned as well? Tell us how many of each type you have.</p>
                
                <div className="numbered-list-container my-4">
                    <Row>
                        {/* Two columns in a single row */}
                        <Form.Group as={Col} md={6} xs={12} className="mb-4" controlId="normalScreens">
                            <Form.Label className="font-weight-bold">Normal Screens</Form.Label>
                            <div className="text-center mb-3">
                                <Image src="screen-half.jpg" thumbnail style={{ maxHeight: '180px' }} />
                            </div>
                            <p className="text-muted mb-3"><i>Normal screens only cover half of the window.</i></p>
                            <Form.Control
                                min={0}
                                onChange={e => screens.normal = parseInt(e.target.value)}
                                defaultValue={props.estimate.Screens?.normal ?? ""}
                                className="rounded-pill"
                                type="number" 
                                placeholder="How many normal screens?" />
                        </Form.Group>

                        <Form.Group as={Col} md={6} xs={12} className="mb-4" controlId="sunScreens">
                            <Form.Label className="font-weight-bold">Sun Screens</Form.Label>
                            <div className="text-center mb-3">
                                <Image src="solar-screen.jpg" thumbnail style={{ maxHeight: '180px' }} />
                            </div>
                            <p className="text-muted mb-3"><i>Sun screens cover the entire window and are made to keep the sun out of your home. They can be white, beige, black, or gray.</i></p>
                            <Form.Control
                                min={0}
                                onChange={e => screens.sun = parseInt(e.target.value)}
                                defaultValue={props.estimate.Screens?.sun ?? ""}
                                className="rounded-pill"
                                type="number" 
                                placeholder="How many sun screens?" />
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
        </div>
    )
}

export default ScreenCount