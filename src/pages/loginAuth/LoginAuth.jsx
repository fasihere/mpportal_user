import './loginAuth.scss'
import { useRef } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import firebase from '../../context/Firebase'

export default function LoginAuth() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const onSignInSubmit = () => {
        const mobileNo = "+917034073143";
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(mobileNo, appVerifier)
        .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        }).catch((error) => {
        // Error; SMS not sent
        // ...
        });
    }
    /*
    const userRef =  useRef()
    const passRef = useRef()
    const {dispatch, isFetching} = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("/auth/login", {
            username: userRef.current.value,
            password: passRef.current.value,
          });
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE" });
        }
      };
    */
    return (
        <div className="loginAuth">
            <div className="wrapper">
                <div className="left">
                    <div className="info">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non 
                            odit iste necessitatibus, eveniet saepe autem, cupiditate vitae
                            sunt quasi deleniti tempore
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <div className="inputItem">
                                <label>Mobile Number :</label>
                                <input type="tel" required="true" />
                            </div>
                            <div className="inputItem">
                                <label>OTP :</label>
                                <input type="tel" required="true" />
                            </div>
                        </div>
                        <button type="submit" className="btn">Submit</button>
                    </form>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}
