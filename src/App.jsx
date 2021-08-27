import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import NewLogin from "./pages/login/NewLogin";
import ViewRequestcopy from "./pages/viewRequest/ViewRequestcopy";
import RequestTable from "./components/requestTable/requestNewTable/RequestTable";
import NewDashboard from "./pages/dashboard/NewDashboard";
import Checkout from "./pages/newRequest/Checkout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import NewRegister from "./pages/register/NewRegister";
import ErrorPage from "./components/errorPage/ErrorPage";
import Journey from "./pages/journey/Journey";
import Draft from "./pages/editRequest/Draft";

function Copyright() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Typography variant="body2" color="white" align="center">
          <Link color="inherit" href="">
            Privacy Policy
          </Link>{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body2" color="white" align="center">
          Powered By{" "}
          <Link href="https://tensors.in">
            <img src="/assets/images/logof.png" width="90px" />
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body2" color="white" align="center">
          © {new Date().getFullYear()} Dean Kuriakose. All rights reserved
        </Typography>
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Route
            path="/"
            component={(props) => (
              <Topbar {...props} key={window.location.pathname} />
            )}
          />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/journey">
              <Journey />
            </Route>
            <PrivateRoute exact path="/dashboard" component={NewDashboard} />
            <Route path="/login">
              <NewLogin />
            </Route>
            <PrivateRoute path="/request/new" component={Checkout} />
            <PrivateRoute exact path="/register" component={NewRegister} />
            <PrivateRoute exact path="/table" component={RequestTable} />
            <PrivateRoute
              path="/request/:rid/view"
              component={ViewRequestcopy}
            />
            <PrivateRoute path="/draft/:rid/view" component={Draft} />
            <PrivateRoute exact path="/user/" component={Profile} />
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
          <Box my={1} bgcolor="grey.500" color="white">
            <Copyright />
          </Box>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
