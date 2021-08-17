import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home'
import Footer from './components/footer/Footer';
import Register from './pages/register/Register';
import NewRequest from './pages/newRequest/NewRequest_duplicate';
import NewRequestorg from './pages/newRequest/NewRequest';
import SubmitRequest from './pages/submitRequest/SubmitRequest';
import PrintRequest from './pages/printRequest/PrintRequest';
import Profile from './pages/profile/Profile';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import NewLogin from './pages/login/NewLogin';
import EditRequest from './pages/editRequest/EditRequest';
import ViewRequest from './pages/viewRequest/ViewRequest';
import RequestTable from './components/requestTable/requestNewTable/RequestTable'
import NewDashboard from './pages/dashboard/NewDashboard'
import Checkout from './pages/newRequest/Checkout';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
        <Route path='/' component={(props) => <Topbar {...props} key={window.location.pathname}/>}/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute exact path="/dashboard" component={NewDashboard}/>
            <Route path="/login"><NewLogin /></Route>
            <Route path="/request/new" component={Checkout} />
            <PrivateRoute exact path="/register" component={Register}/>
            <PrivateRoute exact path="/table" component={RequestTable}/>
            <PrivateRoute path="/request/new" component={NewRequest} />
            <PrivateRoute path="/request/:rid/view" component={ViewRequest} />
            <PrivateRoute path="/user/" component={Profile} />
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
