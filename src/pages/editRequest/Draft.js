import React, { useState, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SubmitDraft from './SubmitDraft';
import DocumentUpload from './DocumentUpload';
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';
import '../../components/loading.scss'
import Appbar from '../../components/topbar/Appbar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    minHeight: 'calc(100vh - 100px)',
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

export default function Draft() {
  const { user } = useAuth()
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0)
  const [state, dispatch] = useReducer(reducer, initiailValues)
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
            const res = await axios.get(baseUrl+"requests/"+path, config);
            console.log(res.data)
            dispatch({type: "NAME", payload: res.data.name})
            dispatch({type: "PHONE", payload: res.data.mobileNo})
            dispatch({type: "EMAIL", payload: res.data.email})
            dispatch({type: "ADDRESS", payload: res.data.address})
            dispatch({type: "PINCODE", payload: res.data.pincode})
            dispatch({type: "LOKSABHA", payload: res.data.loksabha})
            dispatch({type: "ASSEMBLY", payload: res.data.assembly})
            dispatch({type: "PANCHAYAT", payload: res.data.panchayat})
            dispatch({type: "WARD", payload: res.data.ward})
            dispatch({type: "SUBJECT", payload: res.data.requestSubject})
            dispatch({type: "BODY", payload: res.data.requestBody})
            dispatch({type: "FILES", payload: res.data.documents})
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
    requestBody: state.requestBody
  }
  const handleChange = selected => e => {
    dispatch({type: selected, payload: e.target.value})
  }

  const handleDocs = selected => files => {
    dispatch({type: selected, payload: files})
  }

  const handleSubmit = async () => {
    setLoading(true)
    var documents = []
    if(state.requestFiles.length > 0){
      state.requestFiles.map((doc) => {
        documents = [...documents, doc.fileName]  
      })
    }
    var body = {
        requestBody: state.requestBody,
        requestSubject: state.requestSubject,
        status: "UNREAD",
        statusUser: "PENDING",
        documents
    }
    const config = {
        headers: {
          'Authorization':'Bearer '+ await user.getIdToken()
        }
    }
    try{
        const res =  await axios.patch(baseUrl+"requests/"+path, body, config);
        console.log(res)
        setError()
    } catch(err){
        err.response && console.log(err.response.data)
    }
  };

  const handleNext = () => {
    var go = true
    if(activeStep === steps.length - 1){
      handleSubmit();
    }
    if(activeStep === steps.length - 2){
        if(!state.requestBody || !state.requestSubject){
        setError('Please fill request subject and content');
        go = false;
      }
      else{
        setError()
      }
    }
    if(go){
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const steps = ['Submit Draft', 'Documents Upload']

  function getStepContent(step) {
    switch (step) {
      case 0:
        if(!state.name){
          return (
            <div className="loadingContainer">
                <span></span>
                <span className="second"></span>
            </div>
        )
        }
        return <><SubmitDraft values={values} handleChange={handleChange}/>{error && 
          <Typography variant="subtitle1" color="error" align="center">
            {error}
          </Typography>
        }</>;
      case 1:
        return <DocumentUpload requestFiles={state.requestFiles} handleDocs={handleDocs}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Appbar appBarTitle="Draft Request" />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Draft
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              !error ? (
                <React.Fragment>
                  <Typography variant="subtitle1">
                    Your Request Id is <strong>#{path}</strong>. You will be
                    sent an sms to the provided phone number as confirmation.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => window.location.replace("/dashboard")}
                    className={classes.button}
                  >
                    RETURN TO DASHBOARD
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Sorry, your request failed.
                  </Typography>
                  <div className={classes.button}>
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Back
                    </Button>
                  </div>
                </React.Fragment>
              )
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleNext();
                    }}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Submit Request"
                      : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}