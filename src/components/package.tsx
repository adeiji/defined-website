import React, { useEffect, useState } from 'react'
import { Card, Button, FormControl, Form } from 'react-bootstrap'
import './package.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/home.css'

const Package = (props: {
    header: string | React.ReactNode,
    services: any[],
    price?: number,
    color?: string,
    textFieldUpdated?: any,
    buttonText?: string,
    buttonPressed?: any,
    textFieldPlaceholder?: string,
    selected?: boolean
}) => {

    const [styleClassName, setStyleClassName] = useState("")
    
    // Map color names to brand colors
    const getColorValue = (colorName: string) => {
        switch(colorName) {
            case 'primary': return '#074a5a';
            case 'success': return '#28a745';
            case 'warning': return '#ff871e';
            case 'info': return '#17a2b8';
            default: return '#074a5a';
        }
    };

    useEffect(() => {
        if (props.selected) {
            setStyleClassName("selected-package")
            return
        }

        setStyleClassName("white-bg")
    }, [props.selected])

    const color = props.color ?? "primary";
    const brandColor = getColorValue(color);
    
    // Determine if this is a Defined or Standard package based on header text
    // Use the color prop to determine the package type
    // This is much more reliable than trying to parse the header content
    let isDefinedPackage = color === "primary";
    let isStandardPackage = color === "secondary";
    
    // Define the style type explicitly to satisfy TypeScript
    type HeaderStyleType = {
        textAlign: "center";
        color: string;
        borderBottom: number;
        padding: string;
        background?: string;
        backgroundColor?: string;
        boxShadow?: string;
    };
    
    // Choose gradient backgrounds
    let headerStyle: HeaderStyleType = { 
        textAlign: "center", 
        color: "white", 
        borderBottom: 0,
        padding: "15px 10px"
    };
    
    if (isDefinedPackage) {
        headerStyle = {
            ...headerStyle,
            backgroundColor: "#e67e22",  // Orange color
            boxShadow: "0 3px 5px rgba(230, 126, 34, 0.2)"
        };
    } else if (isStandardPackage) {
        headerStyle = {
            ...headerStyle,
            backgroundColor: "#074a5a",  // Blue color
            boxShadow: "0 3px 5px rgba(7, 74, 90, 0.2)"
        };
    } else {
        headerStyle = {
            ...headerStyle,
            backgroundColor: brandColor
        };
    }
    
    return (
        <Card className="package-card h-100">
            <Card.Header style={{...headerStyle, position: 'relative'}}>
                <h4 className="mb-0">{props.header}</h4>
            </Card.Header>
            <Card.Body className={props.selected ? "selected-package" : ""} >
                <Card.Text>
                    {
                        props.services.map((s, index) => {
                            const isCheckmark = s.toString().startsWith("✓");
                            const isXmark = s.toString().startsWith("✗");
                            return (
                                <div key={index} className="service-item text-center" style={{ marginBottom: '10px' }}>
                                    <div className="service-text">
                                        {isCheckmark ? (
                                            <span>
                                                <FontAwesomeIcon icon={faCheck} style={{ color: '#28a745', marginRight: '8px', fontSize: '16px' }} />
                                                {s.toString().substring(1).trim()}
                                            </span>
                                        ) : isXmark ? (
                                            <span>
                                                <FontAwesomeIcon icon={faTimes} style={{ color: '#dc3545', marginRight: '8px', fontSize: '16px' }} />
                                                <span style={{ opacity: '0.75' }}>{s.toString().substring(1).trim()}</span>
                                            </span>
                                        ) : s}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Card.Text>
                {
                    props.textFieldPlaceholder &&
                    <FormControl 
                        min={0} 
                        type="number"
                        className="rounded-pill my-3"
                        disabled={props.selected == true} 
                        onChange={(e) => props.textFieldUpdated(e.target.value)} 
                        placeholder={props.textFieldPlaceholder} />
                }
                {
                    props.price &&
                    <div className="text-center mt-4 price-container">
                        <h2 style={{ color: brandColor, fontFamily: "'Lemonmilk', Arial, sans-serif" }}>${props.price}</h2>
                    </div>
                }
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "transparent", textAlign: "center", border: 0 }}>
                <Button 
                    onClick={props.buttonPressed} 
                    className={props.selected ? "modern-cta-button selected-button" : "modern-cta-button"}
                    style={{ backgroundColor: props.selected ? "#074a5a" : brandColor }}
                >
                    {
                        !props.selected ? (props.buttonText ?? "Select Service") :
                            <><FontAwesomeIcon icon={faCheck} /> Selected</>
                    }
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default Package