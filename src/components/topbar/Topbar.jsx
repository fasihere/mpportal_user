import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { useAuth } from "../../context/AuthContext";
import "./topbar.scss"

export default function Topbar() {
    const { isSignedIn, user, auth } = useAuth()
    const history = useHistory()
    const [error, setError] = useState()

    const handleLogout = async () => {
        setError("")
        try {
        await auth.signOut()
        history.push("/")
        } catch {
        setError("Failed to log out")
        }
    }

    return (
        <div className="topbar">
            <div className="left">
                <img className="" src="public/assets/images/dean_img.png" alt=""/>
            </div>

            <div className="center">
                <ul className="list">
                    <li className="item">
                        <Link className="link" to="/#intro">HOME</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/#about">ABOUT</Link>
                    </li>
                    {
                    isSignedIn ? (
                        <li className="item">
                            <Link className="link" to="/dashboard">DASHBOARD</Link>
                        </li>
                    ) : (<></>)
                        }
                    <li className="item">
                        <Link className="link" to="/#contact">CONTACT</Link>
                    </li>
                </ul>
            </div>
            <div className="right">
                {
                    isSignedIn ? (
                        <ul className="list">
                            <div className="iconContainer item">
                                <Link className="link" to="/user/">
                                    <i class="fas fa-user"></i>
                                </Link>
                            </div>
                            <Link className="link loginBtn item" to="/" onClick={handleLogout}>LOGOUT</Link>
                        </ul>
                    ) : (
                        <ul className="list">
                            <li className="item loginBtn">
                                <Link className="link" to="/login">LOGIN/REGISTER</Link>
                            </li>
                        </ul>
                    )}
            </div>

        </div>
    )
}

