import React, { useState, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PersonalForm from './PersonalForm';
import Review from './Review';
import RequestForm from './RequestForm'
import DocumentUpload from './DocumentUpload';
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';
import '../../components/loading.scss'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    minHeight: 'calc(100vh - 50px)',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const reducer = (state, action) => {
  switch(action.type){
    case "NAME":
      return { ...state, name: action.payload }
    case "PHONE":
      return { ...state, mobileNo: action.payload }
    case "EMAIL":
      return { ...state, email: action.payload }
    case "ADDRESS":
      return { ...state, address: action.payload }
    case "PINCODE":
      return { ...state, pincode: action.payload }
    case "ASSEMBLY":
      return { ...state, assembly: action.payload }
    case "PANCHAYAT":
      return { ...state, panchayat: action.payload }
    case "WARD":
      return { ...state, ward: action.payload }
    case "SUBJECT":
      return { ...state, requestSubject: action.payload}
    case "BODY":
      return { ...state, requestBody: action.payload}
    case "FILES":
      return {...state, requestFiles: action.payload}
    case "ALL":
      return {}
    default: 
      return state
  }
}
const initiailValues = {
   name: "", email: "", mobileNo: "", address: "", 
   pincode: 0, assembly: "", panchayat: "", 
   ward: "1", requestSubject: null, requestBody: null,
   requestFiles: []
  }

export default function Checkout() {
  const { user } = useAuth()
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0)
  const [state, dispatch] = useReducer(reducer, initiailValues)
  const [rid, setRid] = useState()
  const [draft, setDraft] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/'
  const location = useLocation()
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getReq = async() => {
        try{
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            console.log(await user.getIdToken())
            const res = await axios.get(baseUrl+"users/", config);
            dispatch({type: "NAME", payload: res.data.name})
            dispatch({type: "PHONE", payload: res.data.mobileNo})
            dispatch({type: "EMAIL", payload: res.data.email})
            dispatch({type: "ADDRESS", payload: res.data.address})
            dispatch({type: "PINCODE", payload: res.data.pincode})
            dispatch({type: "ASSEMBLY", payload: res.data.assembly})
            dispatch({type: "PANCHAYAT", payload: res.data.panchayat})
            dispatch({type: "WARD", payload: res.data.ward})
         } catch(err){
            console.log(err)
        }
    }
     getReq()
},[])
  const values =  {
    name: state.name,
    mobileNo: state.mobileNo,
    email: state.email,
    address: state.address,
    pincode: state.pincode,
    assembly: state.assembly,
    panchayat: state.panchayat,
    ward: state.ward,
    requestSubject: state.requestSubject,
    requestBody: state.requestBody,
  }
  const handleChange = selected => e => {
    dispatch({type: selected, payload: e.target.value})
  }

  const handleDocs = selected => files => {
    dispatch({type: selected, payload: files})
  }

  const handleDraft = async () => {
    setLoading(true)
    var body = {
        ...values,
        loksabha:"Idukki",
        status: "DRAFT",
        statusUser: "DRAFT"
    }
    const config = {
        headers: {
          'Authorization':'Bearer '+ await user.getIdToken()
        }
    }
    try{
        const res =  await axios.post(baseUrl+'requests/new', body, config);
        console.log(res.data)
        res.data && setRid(res.data.rid)
        setLoading(false)
        setError()
    } catch(err){
        console.log(err.response.data)
        setError(err.response.data)
    }
};

  const handleSubmit = async () => {
    setLoading(true)
    var body = {
        status: "UNREAD",
        statusUser: "PENDING"
    }
    const config = {
        headers: {
          'Authorization':'Bearer '+ await user.getIdToken()
        }
    }
    try{
        const res =  await axios.patch(baseUrl+`requests/${rid}`, body, config);
        console.log(res)
        setError()
    } catch(err){
        console.log(err.response.data)
        setError(err.response.data)
    }
  };

  const handleNext = () => {
    if(activeStep === steps.length - 3 && !rid){
      console.log('Drafted')
      handleDraft()
    }
    else if(activeStep === steps.length - 1 && !draft){
      handleSubmit()
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const steps = ['Personal details', 'Request details', 'Documents Upload', 'Review your request']

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalForm values={values} handleChange={handleChange}/>;
      case 1:
        return <RequestForm values={values} handleChange={handleChange}/>;
      case 2:
        if(rid){return <DocumentUpload requestFiles={state.requestFiles} handleDocs={handleDocs} rid={rid}/>}
        else{
          return (
          <div className="loadingContainer">
              <span></span>
              <span className="second"></span>
          </div>
      )}
      case 3:
        return <Review values={values}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Request Portal
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            New Request {rid}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? ( !error ? (
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  {draft ? "Your request has been saved as draft.":"Thank you for your submission."}
                </Typography>
                { !draft && 
                <Typography variant="subtitle1">
                  Your Request Id is <strong>#{rid}</strong>. You will be sent an sms to the provided phone number as confirmation.
                </Typography>
                }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => window.location.replace('/dashboard')}
                    className={classes.button}
                  >
                      RETURN TO DASHBOARD
                  </Button>
              </React.Fragment> ) : (
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                  Sorry, your request failed.
                  </Typography>
                  {error && <Typography variant="subtitle1">Please fill Request subject and content</Typography>}
                  <div className={classes.button}>
                    <Button 
                    onClick={handleBack} 
                    className={classes.button} 
                    variant="contained"
                    color="primary">
                        Back
                    </Button>
                  </div>
                </React.Fragment>)
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} 
                    className={classes.button}
                    variant="contained"
                    color="primary">
                      Back
                    </Button>
                  )}
                  {activeStep === (steps.length - 1) && (
                    <Button onClick={(e) => {
                      setDraft(true);
                      handleNext(e);}} 
                      color="primary"
                      variant="contained"
                      className={classes.button}>
                      Submit Later
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit Request' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}