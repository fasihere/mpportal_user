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
import NewRequest from './pages/newRequest/NewRequest';
import SubmitRequest from './pages/submitRequest/SubmitRequest';
import PrintRequest from './pages/printRequest/PrintRequest';
import Profile from './pages/profile/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import NewLogin from './pages/login/NewLogin';
import EditRequest from './pages/editRequest/EditRequest';
import ViewRequest from './pages/viewRequest/ViewRequest';

function App() {
  return (
    <div className="app">
        <Router>
        <AuthProvider>
          <Topbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login"><NewLogin /></Route>
            <PrivateRoute exact path="/register" component={Register}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute path="/newRequest" component={NewRequest} />
            <PrivateRoute path="/request/:rid/print" component={PrintRequest} />
            <PrivateRoute path="/request/:rid/edit" component={EditRequest} />
            <PrivateRoute path="/request/:rid/submit" component={SubmitRequest} />
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
