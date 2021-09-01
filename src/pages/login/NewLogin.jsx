import React from 'react'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react'
import firebase from '../../context/Firebase'
import { useAuth } from '../../context/AuthContext'
import './login.scss'
import { Redirect } from 'react-router-dom'


export default function NewLogin() {
    const { isSignedIn, user, auth, isRegister } = useAuth()
    useEffect(() => {
        const uiConfig = {
            signInOptions: [{
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image',
                    size: 'normal',
                    badge: 'bottomleft'
                },
                defaultCountry: 'IN'
            }],
            callbacks: {
                signInSuccessWithAuthResult: (authResult) => {
                  const userInfo = authResult.additionalUserInfo;
                  console.log(userInfo)
                  if (userInfo.isNewUser) {
                    window.location.replace('/register')
                  }
                  else{
                    window.location.replace('/dashboard')
                  }
                  return false;
                },
              }
       };
        var ui = new firebaseui.auth.AuthUI(auth)
        ui.start('#firebaseui-auth-container', uiConfig)
        ui.disableAutoSignIn();
    },[])

    if(isSignedIn){
        if(isRegister){
            return <Redirect to="/dashboard" />
        }
        return <Redirect to="/register" />
    }
    return (
        <div className="login">
            <div className="wrapper">
                <div className="left">
                    <div className="info">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non 
                            odit iste necessitatibus, eveniet saepe autem, cupiditate vitae
                            sunt quasi deleniti tempore
                        </p>
                    </div>
                    {/* <Login /> */}
                    <div id="firebaseui-auth-container" className="signin">
                    </div>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}

