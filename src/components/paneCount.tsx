import React, { useState } from 'react'
import { Button, Col, Form, Image, Modal, Row, Container } from 'react-bootstrap'
import { Estimate, Panes } from '../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/home.css'

const PaneCount = (props: { setEstimate: any, estimate: Estimate, previousPage: () => void, nextPage: () => void }) => {

    const [validated, setValidated] = useState(false)

    let panes: Panes = props.estimate.Panes ?? {}

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        props.estimate.Panes = panes
        props.setEstimate(props.estimate)
        props.nextPage()

        setValidated(true);
    };

    return (
        <div>
            <Modal.Header closeButton className="border-0">
                <div className="section-heading-with-icon w-100 justify-content-center">
                    <h2 className="section-title mb-0">Window Pane Count</h2>
                </div>
            </Modal.Header>
            
            <Modal.Body className="px-4">
                <p className="text-center mb-4">
                    Window panes are counted by separate pieces of glass that have framing around them. 
                    The diagrams below will help you with the pane count.
                </p>
                
                <div className="numbered-list-container my-4">
                    <Row className="mt-3">
                        {/* First Row - 2 columns */}
                        <Form.Group as={Col} md={6} xs={12} className="mb-4 text-center" controlId="mediumPanes">
                            <Form.Label className="font-weight-bold">Medium Sized Panes</Form.Label>
                            <div className="mb-2">
                                <Image src="medium.png" thumbnail className="mb-3" style={{ maxHeight: '150px' }} />
                            </div>
                            <Form.Control
                                min={0}
                                onChange={e => panes.medium = parseInt(e.target.value)}
                                defaultValue={props.estimate.Panes?.medium ?? ""}
                                className="rounded-pill"
                                placeholder="How many medium panes?" 
                                type="number" />
                        </Form.Group>

                        <Form.Group as={Col} md={6} xs={12} className="mb-4 text-center" controlId="veryLargePanes">
                            <Form.Label className="font-weight-bold">Very Large Panes</Form.Label>
                            <div className="mb-2">
                                <Image src="very-large.png" thumbnail className="mb-3" style={{ maxHeight: '150px' }} />
                            </div>
                            <Form.Control
                                min={0}
                                onChange={e => panes.veryLarge = parseInt(e.target.value)}
                                defaultValue={props.estimate.Panes?.veryLarge ?? ""}
                                className="rounded-pill"
                                placeholder="How many very large panes?" 
                                type="number" />
                        </Form.Group>

                        {/* Second Row - 2 columns */}
                        <Form.Group as={Col} md={6} xs={12} className="mb-4 text-center" controlId="largePanes">
                            <Form.Label className="font-weight-bold">Large Panes</Form.Label>
                            <div className="mb-2">
                                <Image src="large.png" thumbnail className="mb-3" style={{ maxHeight: '150px' }} />
                            </div>
                            <Form.Control
                                min={0}
                                onChange={e => panes.large = parseInt(e.target.value)}
                                defaultValue={props.estimate.Panes?.large ?? ""}
                                className="rounded-pill"
                                placeholder="How many large panes?" 
                                type="number" />
                        </Form.Group>

                        <Form.Group as={Col} md={6} xs={12} className="mb-4 text-center" controlId="smallPanes">
                            <Form.Label className="font-weight-bold">Small Panes</Form.Label>
                            <div className="mb-2">
                                <Image src="small.png" thumbnail className="mb-3" style={{ maxHeight: '150px' }} />
                            </div>
                            <Form.Control
                                min={0}
                                onChange={e => panes.small = parseInt(e.target.value)}
                                defaultValue={props.estimate.Panes?.small ?? ""}
                                className="rounded-pill"
                                placeholder="How many small panes?" 
                                type="number" />
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

export default PaneCount