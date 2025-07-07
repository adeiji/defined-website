import React, { useState } from 'react'
import { Modal, Form, Col, Button, Row } from 'react-bootstrap'
import CONSTANTS from '../constants'
import { Estimate, Misc } from '../models/models'
import NetworkService from '../services/networkService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faCalculator } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/home.css'

const EndEstimator = (props: { setEstimate: any, estimate: Estimate, previousPage: () => void, nextPage: () => void }) => {

    const networkService = new NetworkService();
    const [validated, setValidated] = useState(false)

    let misc: Misc = props.estimate.Misc ?? {}

    const handleSubmit = (event: any) => {
        console.log("EndEstimator handleSubmit called");
        event.preventDefault();
        event.stopPropagation();
        
        const form = event.currentTarget;
        const isValid = form.checkValidity();
        console.log("Form validity:", isValid);
        
        if (isValid === false) {
            console.log("Form validation failed, not proceeding");
            setValidated(true);
            return;
        }

        console.log("Form is valid, proceeding to next page");
        props.estimate.Misc = misc        
        props.setEstimate(props.estimate)
        saveQuote(props.estimate)
        props.nextPage()
        setValidated(true);
    }

    const saveQuote = (estimate: any) => {
        // Only save if customer has an email
        if (estimate.Customer?.email) {
            // TODO: Replace with backend API call when implemented
            console.log('TODO: Save quote to backend API - online-quotes collection not yet migrated to backend');
            // const response = await networkService.post('/online-quotes', estimate);
        }
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton className="border-0">
                    <div className="section-heading-with-icon w-100 justify-content-center">
                        <h2 className="section-title mb-0">Additional Information</h2>
                    </div>
                </Modal.Header>
                
                <Modal.Body className="px-4">
                    <p className="text-center mb-4">Almost there! Please provide any additional details and communication preferences.</p>
                    
                    <div className="numbered-list-container my-4">
                        <Row>
                            {/* Anything else */}
                            <Form.Group as={Col} xs={12} className="mb-4" controlId="formAdditionalInfo">
                                <Form.Label className="font-weight-bold">Is there anything else that you'd like to tell us?</Form.Label>
                                <Form.Control
                                    onChange={e => misc.additionalInfo = e.target.value}
                                    defaultValue={props.estimate.Misc?.additionalInfo ?? ""}
                                    as="textarea" 
                                    rows={4}
                                    className="rounded" />
                            </Form.Group>

                            {/* Two columns for contact preferences */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formContactEmail">
                                <Form.Label className="font-weight-bold">Email Contact Permission</Form.Label>
                                <Form.Control
                                    onChange={e => misc.canEmail = e.target.value == CONSTANTS.YES ? true : false}
                                    defaultValue={props.estimate.Misc?.canEmail == true ? CONSTANTS.YES : CONSTANTS.NO}
                                    as="select"
                                    className="rounded-pill">
                                    <option>Yes</option>
                                    <option>No</option>
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    May we contact you via email?</Form.Text>
                            </Form.Group>

                            {/* Phone Number  */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formContactPhoneNumber">
                                <Form.Label className="font-weight-bold">Phone Contact Permission</Form.Label>
                                <Form.Control
                                    onChange={e => misc.canText = e.target.value == CONSTANTS.YES ? true : false}
                                    defaultValue={props.estimate.Misc?.canText == true ? CONSTANTS.YES : CONSTANTS.NO}
                                    as="select"
                                    className="rounded-pill">
                                    <option>Yes</option>
                                    <option>No</option>
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    May we contact you via phone call or text?</Form.Text>
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
                        type="submit">
                        Generate Estimate <FontAwesomeIcon icon={faCalculator} className="ml-2" />
                    </Button>
                </Modal.Footer>
            </Form>
        </div>
    )
}

export default EndEstimator