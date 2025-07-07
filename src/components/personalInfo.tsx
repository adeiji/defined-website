import React, { useEffect } from 'react'
import { useState } from 'react'
import { Row, Col, Button, Form, InputGroup, Modal, ModalBody, Container } from 'react-bootstrap'
import { Estimate, Customer } from '../models/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/home.css'

const PersonalInformationForm = (props: { setEstimate: any, estimate: Estimate, previousPage: () => void, nextPage: () => void }) => {

    const [validated, setValidated] = useState(false)

    let customer: Customer = props.estimate.Customer ?? {}

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        } else {
            props.nextPage()
            props.estimate.Customer = customer
            props.setEstimate(props.estimate)
        }

        setValidated(true);
    };

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton className="border-0">
                    <div className="section-heading-with-icon w-100 justify-content-center">
                        <h2 className="section-title mb-0">Personal Information</h2>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <p className="text-center mb-4">Please provide your contact information to get started with your free estimate.</p>

                    <div className="numbered-list-container my-4">
                        <Row>
                            {/* First Name */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    onChange={e => customer.firstName = e.target.value}
                                    defaultValue={props.estimate.Customer?.firstName ?? ""}
                                    type="text"
                                    className="rounded-pill"
                                    placeholder="Enter Your First Name" />
                                <Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>
                            </Form.Group>

                            {/* Last Name */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    className="rounded-pill"
                                    placeholder="Enter Your Last Name"
                                    onChange={e => customer.lastName = e.target.value}
                                    defaultValue={props.estimate.Customer?.lastName ?? ""} />
                                <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                            </Form.Group>


                            {/* Street Address */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formStreetAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    className="rounded-pill"
                                    placeholder="Enter Your Address"
                                    onChange={e => customer.address = e.target.value}
                                    defaultValue={props.estimate.Customer?.address ?? ""} />
                                <Form.Control.Feedback type="invalid">Please enter your address</Form.Control.Feedback>
                            </Form.Group>

                            {/* Phone Number */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className="rounded-pill"
                                    placeholder="Enter Your Phone Number"
                                    onChange={e => customer.phoneNumber = e.target.value}
                                    defaultValue={props.estimate.Customer?.phoneNumber ?? ""} />
                                <Form.Control.Feedback type="invalid">Please enter your phone number</Form.Control.Feedback>
                            </Form.Group>

                            {/* Zip Code */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formZipCode">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    className="rounded-pill"
                                    placeholder="Enter Your Zip Code"
                                    onChange={e => customer.zipCode = parseInt(e.target.value)}
                                    defaultValue={props.estimate.Customer?.zipCode ?? ""} />
                                <Form.Control.Feedback type="invalid">Please enter your zip code</Form.Control.Feedback>
                            </Form.Group>

                            {/* Email Address */}
                            <Form.Group as={Col} md={6} xs={12} className="mb-3" controlId="formEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    className="rounded-pill"
                                    placeholder="Enter Your Email Address"
                                    onChange={e => customer.email = e.target.value}
                                    defaultValue={props.estimate.Customer?.email ?? ""} />
                                <Form.Control.Feedback type="invalid">Please enter your email address</Form.Control.Feedback>
                            </Form.Group>

                            {/* Area */}
                            <Form.Group as={Col} md={12} xs={12} className="mb-3">
                                <Form.Label>Area</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="rounded-pill"
                                    onChange={e => customer.area = e.target.value}
                                    defaultValue={props.estimate.Customer?.area ?? ""}>
                                    <option>North Las Vegas</option>
                                    <option>Henderson</option>
                                    <option>Lake Las Vegas</option>
                                    <option>Summerlin</option>
                                    <option>Boulder City</option>
                                    <option>Aliante</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center">
                    <Button
                        className="modern-cta-button"
                        type="submit">
                        Next Step <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Button>
                </Modal.Footer>
            </Form>
        </div>
    )
}

export default PersonalInformationForm