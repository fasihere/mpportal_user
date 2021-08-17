import {Route, Redirect} from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import './loading.scss'

export default function PrivateRoute({ component: RouteComponent, ...others }) {
    const { pending, isSignedIn, user } = useAuth()

    return (
        <Route {...others}
        render={ routeProps =>
        !isSignedIn ? (
            <RouteComponent {...routeProps} />
        ) : (
            <Redirect to="/dashboard" />
        )}
        />
    )
}
