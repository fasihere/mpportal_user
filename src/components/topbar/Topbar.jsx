import { useState } from "react";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useAuth } from "../../context/AuthContext";
import "./topbar.scss";
import burgerIcon from './burgerIcon.svg';
import closeIcon from './closeIcon.svg';
import deanDp from './dean_dp.webp';

export default function Topbar() {
  const { isSignedIn, user, auth } = useAuth();
  const history = useHistory();
  const [error, setError] = useState();
  const [display, setDisplay] = useState(true)

  const handleLogout = async () => {
    setError("");
    try {
      await auth.signOut();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  const hideDrawer = () => {
    document.getElementById("center").style.visibility = "hidden";
  };
  const showDrawer = () => {
    document.getElementById("center").style.visibility = "visible";
  };
  if(window.location.pathname === '/dashboard'){
    return <></>
  }
  else{
    return (
      <div className="topbar">
        <div className="left">
         <a href="/"><img className="deanDp" src={deanDp} alt="" /></a>
        </div>
  
        <div className="center item" id="center">
          <ul className="item">
            <li className="item">
              <img
                className="closeIcon"
                onClick={hideDrawer}
                src={closeIcon}
                alt=""
              />
            </li>
            <li className="item">
              <Link className="link" to="/#intro">
                HOME
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/#about">
                ABOUT
              </Link>
            </li>
            {isSignedIn ? (
              <li className="item">
                <Link className="link" to="/dashboard">
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <></>
            )}
  
            <li className="item">
              <Link className="link" to="/#media">
                MEDIA
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/#contact">
                CONTACT
              </Link>
            </li>
  
            <li className="item">
              <a className="link text-light" href="http://www.idukkicare.org/">
                IDUKKICARE
              </a>
            </li>
            <li className="item">
              <a className="link text-light" href="https://inc.in/work-for-us">
                JOIN <span>THE MOVEMENT</span>
              </a>
            </li>
          </ul>
  
          {isSignedIn ? (
            <ul className="list">
              <div className="iconContainer item">
                <Link className="link" to="/user/">
                  <i class="fas fa-user"></i>
                </Link>
              </div>
              <Link className="link loginBtn item" to="/" onClick={handleLogout}>
                LOGOUT
              </Link>
            </ul>
          ) : (
            <ul className="list">
              <li className="item loginBtn m-0" style={{}}>
                <Link className="link" to="/login">
                  LOGIN/REGISTER
                </Link>
              </li>
            </ul>
          )}
        </div>
        <ul className="item">
          <li className="item">
            <img id="burger-icon" onClick={showDrawer} src={burgerIcon} alt="" />
          </li>
        </ul>
      </div>
    );
  }
  
}
