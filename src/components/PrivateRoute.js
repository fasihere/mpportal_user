import {Route, Redirect} from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import './loading.scss'

export default function PrivateRoute({ component: RouteComponent, ...others }) {
    const { pending, isSignedIn, user } = useAuth()
    if(pending){
        return (
        <div className="loadingContainer">
            <span></span>
            <span className="second"></span>
        </div>
    )}
    return (
        <Route {...others}
        render={ routeProps => 
        isSignedIn ? (
            <RouteComponent {...routeProps} />
        ) : (
            <Redirect to="/login" />
        )}
        />
    )
}
