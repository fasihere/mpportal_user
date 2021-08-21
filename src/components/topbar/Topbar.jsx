import { useState } from "react";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useAuth } from "../../context/AuthContext";
import "./topbar.scss";
import burgerIcon from "./burgerIcon.svg";
import closeIcon from "./closeIcon.svg";
import deanDp from "./dean_dp.webp";

export default function Topbar() {
  const { isSignedIn, user, auth } = useAuth();
  const history = useHistory();
  const [error, setError] = useState();
  const [menu, setMenu] = useState("");

  const handleLogout = async () => {
    setError("");
    try {
      await auth.signOut();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  if (window.location.pathname == "/dashboard") {
    return <></>;
  }
  return (
    <div className="topbar ">
      <div className="left">
        <a href="/">
          <img className="deanDp" src={deanDp} alt="" />
        </a>
      </div>

      <div className={"center item " + menu} id="center">
        <ul className="item">
          <li className="item">
            <img
              className="closeIcon"
              onClick={() => setMenu("")}
              src={closeIcon}
              alt=""
            />
          </li>
          <li className="item">
            <Link className="link" to="/#intro" onClick={() => setMenu("")}>
              HOME
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/#about" onClick={() => setMenu("")}>
              ABOUT
            </Link>
          </li>
          {isSignedIn ? (
            <li className="item">
              <Link
                className="link"
                to="/dashboard"
                onClick={() => setMenu("")}
              >
                DASHBOARD
              </Link>
            </li>
          ) : (
            <></>
          )}

          <li className="item">
            <Link className="link" to="/media" onClick={() => setMenu("")}>
              MEDIA
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/#contact" onClick={() => setMenu("")}>
              CONTACT
            </Link>
          </li>

          <li className="item">
            <a
              className="link text-light"
              href="http://www.idukkicare.org/"
              onClick={() => setMenu("")}
              target="_blank"
            >
              IDUKKI CARE
            </a>
          </li>
          <li className="item">
            <a
              className="link text-light"
              href="https://inc.in/work-for-us"
              onClick={() => setMenu("")}
              target="_blank"
            >
              JOIN THE MOVEMENT
            </a>
          </li>
        </ul>

        {isSignedIn ? (
          <ul className="list loggedIn">
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
              <Link className="link" to="/login" onClick={() => setMenu("")}>
                LOGIN/REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
      <ul className="item burger">
        <li className="item">
          <img
            id="burger-icon"
            onClick={() => setMenu("active")}
            src={burgerIcon}
            alt=""
          />
        </li>
      </ul>
    </div>
  );
}
