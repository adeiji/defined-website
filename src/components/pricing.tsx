import React from 'react';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import './pricing.css';

const Pricing = () => {

    const PricingRow = (props: { item: string, initialPrice: number, currentPrice: number }) => {
        return (
            <div className="pricing-row">
                <div className="pricing-item">
                    {props.item}
                </div>
                <div className="pricing-dots d-none d-md-block">
                    <hr style={{ borderTop: "1px dashed #ccc" }} />
                </div>
                <div className="pricing-price">
                    <span className="pricing-current">${props.currentPrice - 20} - ${props.currentPrice + 20}</span> 
                    <span className="pricing-original">${props.initialPrice - 20} - ${props.initialPrice + 20}</span>
                </div>
            </div>
        )
    }

    const PricingSection = (props: {
        item: string,
        insideOutsideIntialPrice: number,
        insideOutsideCurrentPrice: number,
        exteriorInitialPrice: number,
        exteriorCurrentPrice: number
    }) => {
        return (
            <div className="mb-4">
                <h5 className="pricing-section-title">{props.item}</h5>
                <PricingRow item="Outside Only" initialPrice={props.exteriorInitialPrice} currentPrice={props.exteriorCurrentPrice} />
                <PricingRow item="Inside and Outside" initialPrice={props.insideOutsideIntialPrice} currentPrice={props.insideOutsideCurrentPrice} />
                <hr className="mt-3" />
            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col className="my-4">
                    <h1 className="pricing-title">Our Pricing</h1>
                </Col>
            </Row>
            <Accordion>
                <Card className="pricing-card">
                    <Accordion.Header className="pricing-card-header">
                        Click to View Pricing for Single Story Homes
                    </Accordion.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <p className="pricing-note">
                                The prices may vary depending on the configuration of your home, but we have found that the following prices are a good estimate for almost all homes. If you would like to get an exact pricing, please click on the button that says "Click Here To Get Your Instant Quote" above.
                            </p>

                            <PricingSection item="Under 2000 Square Feet" insideOutsideIntialPrice={240} insideOutsideCurrentPrice={190} exteriorInitialPrice={150} exteriorCurrentPrice={120} />

                            <PricingSection item="2000 - 2499 Square Feet" insideOutsideIntialPrice={322} insideOutsideCurrentPrice={255} exteriorInitialPrice={190} exteriorCurrentPrice={150} />

                            <PricingSection item="2500 - 2999 Square Feet" insideOutsideIntialPrice={390} insideOutsideCurrentPrice={310} exteriorInitialPrice={220} exteriorCurrentPrice={175} />

                            <PricingSection item="3000 - 3499 Square Feet" insideOutsideIntialPrice={445} insideOutsideCurrentPrice={355} exteriorInitialPrice={250} exteriorCurrentPrice={200} />

                            <PricingSection item="3500 - 3999 Square Feet" insideOutsideIntialPrice={490} insideOutsideCurrentPrice={395} exteriorInitialPrice={280} exteriorCurrentPrice={225} />

                            <PricingSection item="4000 - 4499 Square Feet" insideOutsideIntialPrice={560} insideOutsideCurrentPrice={450} exteriorInitialPrice={310} exteriorCurrentPrice={250} />

                            <PricingSection item="4500 - 4999 Square Feet" insideOutsideIntialPrice={625} insideOutsideCurrentPrice={500} exteriorInitialPrice={375} exteriorCurrentPrice={300} />

                            <h5 className="pricing-section-title">Over 5000 Square Feet</h5>
                            <p>Please contact us if your home is over 5000 square feet and we can provide you with your on-site FREE estimate.</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="pricing-card">
                    <Accordion.Header className="pricing-card-header">
                        Click to View Pricing for Two Story Homes
                    </Accordion.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <p className="pricing-note">
                                The prices may vary depending on the configuration of your home, but we have found that the following prices are a good estimate for almost all homes. If you would like to get an exact pricing, please click on the button that says "Click Here To Get Your Instant Quote" above.
                            </p>

                            <PricingSection item="Under 2000 Square Feet" insideOutsideIntialPrice={310} insideOutsideCurrentPrice={250} exteriorInitialPrice={190} exteriorCurrentPrice={150} />

                            <PricingSection item="2000 - 2499 Square Feet" insideOutsideIntialPrice={400} insideOutsideCurrentPrice={320} exteriorInitialPrice={220} exteriorCurrentPrice={175} />

                            <PricingSection item="2500 - 2999 Square Feet" insideOutsideIntialPrice={490} insideOutsideCurrentPrice={390} exteriorInitialPrice={260} exteriorCurrentPrice={210} />

                            <PricingSection item="3000 - 3499 Square Feet" insideOutsideIntialPrice={525} insideOutsideCurrentPrice={420} exteriorInitialPrice={280} exteriorCurrentPrice={225} />

                            <PricingSection item="3500 - 3999 Square Feet" insideOutsideIntialPrice={610} insideOutsideCurrentPrice={490} exteriorInitialPrice={350} exteriorCurrentPrice={280} />

                            <PricingSection item="4000 - 4499 Square Feet" insideOutsideIntialPrice={690} insideOutsideCurrentPrice={550} exteriorInitialPrice={400} exteriorCurrentPrice={320} />

                            <PricingSection item="4500 - 4999 Square Feet" insideOutsideIntialPrice={750} insideOutsideCurrentPrice={600} exteriorInitialPrice={470} exteriorCurrentPrice={375} />

                            <h5 className="pricing-section-title">Over 5000 Square Feet</h5>
                            <p>Please contact us if your home is over 5000 square feet and we can provide you with your on-site FREE estimate.</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

        </Container>
    )
}

export default Pricing;