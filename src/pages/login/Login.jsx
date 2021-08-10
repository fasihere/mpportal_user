import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import firebase, { auth } from '../../context/Firebase'


export default function Login() {
  const mobileRef = useRef()
  const otpRef = useRef()
  const [gotOtp, setGotOtp] = useState(false)
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }
  const onSignInSubmit = (e) => {
    e.preventDefault()
    configureCaptcha()
    const phoneNumber = mobileRef.current.value
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    setGotOtp(true)
    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
        
  }
  const onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = otpRef.current.value
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          {!gotOtp? (<Form onSubmit={onSignInSubmit}>
            <Form.Group id="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" ref={mobileRef} required className="mb-4"/>
            </Form.Group>
            <div id="recaptcha-container"></div>
            <Button className="w-10 mb-10" type="submit" ref={mobileRef}>
              Get OTP
            </Button>
          </Form>) : (
          <Form onSubmit={onSubmitOTP}>
            <Form.Group id="otp">
                <Form.Label>OTP</Form.Label>
                <Form.Control type="tel" ref={otpRef} required className="mb-4"/>
            </Form.Group>
            <Button disabled={loading} className="w-10 mb-10" type="submit" ref={otpRef}>
              Submit
            </Button>
          </Form>)}
        </Card.Body>
      </Card>
    </>
  )
}
