import React from 'react'
import { Button } from 'react-bootstrap'
import ReactGA from 'react-ga'
import { Config } from '../config'

const CTA = (props: {
    setShowModal: any,
    showQuickQuote?: boolean
}) => {

    const phoneNumberLink = `tel:${Config.Env.PhoneNumbers.MainRaw}`
    const phoneNumber = Config.Env.PhoneNumbers.Main

    const markConversion = () => {
        ReactGA.event({
            category: 'User',
            action: 'User clicked phone number to call',
            label: "User clicked call button",
            value: 10
        })
    }

    return (
        <div style={{ borderWidth: "1px", borderColor: "black", borderStyle: "dashed" }} className="alert alert-info text-center p-2">
            {/* <p className="mb-0 pb-0">Get your windows cleaned <strong>before {moment().add(7, 'd').format('MMMM Do')}</strong> and get <strong>{ discount } OFF.</strong></p> */}

            <Button className="mt-3 mb-3" href={phoneNumberLink} onClick={() => { markConversion() }}>Click to call or text 📞 {phoneNumber} NOW  for your<br />FREE estimate<br />(We accept calls 24 hrs a day)</Button>

            {
                props.showQuickQuote &&
                <div>
                    <p>or</p>
                    <div className="mb-3">
                        <Button onClick={() => props.setShowModal(true)}>Click Here To Get Your Instant Quote</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CTA