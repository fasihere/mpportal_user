import React, { useState, useReducer, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PersonalForm from './PersonalForm';
import Review from './Review';
import RequestForm from './RequestForm'
import DocumentUpload from './DocumentUpload';
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';
import '../../components/loading.scss'
import Appbar from '../../components/topbar/Appbar';
  import { useTranslation } from "react-i18next";  

function Copyright() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link color="inherit" href="">
            Privacy Policy
          </Link>{' '}
        </Typography>
      </Grid>
      <Grid item xs={6}>
      <Typography variant="body2" color="textSecondary" align="center">
          Powered By <Link href="https://tensors.in"><img src="/assets/images/logof.png" width="100px"/></Link>
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Dean Kuriakose. All rights reserved
        </Typography>
      </Grid>
    </Grid>
  );
}

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
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.payload };
    case "PHONE":
      return { ...state, mobileNo: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "ADDRESS":
      return { ...state, address: action.payload };
    case "PINCODE":
      return { ...state, pincode: action.payload };
    case "LOKSABHA":
      return { ...state, loksabha: action.payload };
    case "ASSEMBLY":
      return { ...state, assembly: action.payload };
    case "PANCHAYAT":
      return { ...state, panchayat: action.payload };
    case "WARD":
      return { ...state, ward: action.payload };
    case "SUBJECT":
      return { ...state, requestSubject: action.payload };
    case "CATEGORY":
      return { ...state, requestCategory: action.payload };
    case "BODY":
      return { ...state, requestBody: action.payload };
    case "FILES":
      return { ...state, requestFiles: action.payload };
    case "ALL":
      return {};
    default:
      return state;
  }
}
const initiailValues = {
   name: "", email: "", mobileNo: "", address: "", 
   pincode: 0, loksabha: "Idukki", assembly: "", panchayat: "", 
  ward: "1", requestSubject: null, requestCategory: null, requestBody: null,
   requestFiles: []
  }

export default function Checkout() {
              const { t } = useTranslation();
  const { user } = useAuth()
  const history = useHistory()
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
  const [orientation, setOrientation] = useState("horizontal")

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setOrientation("vertical")
    }
    else {
      setOrientation("horizontal");
    }
  },[]);

  useEffect(() => {
    console.log("state", state)
  }, [state])

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
            dispatch({type: "LOKSABHA", payload: res.data.loksabha})
            dispatch({type: "ASSEMBLY", payload: res.data.assembly})
            dispatch({type: "PANCHAYAT", payload: res.data.panchayat})
            dispatch({type: "WARD", payload: res.data.ward})
         } catch(err){
            console.log(err)
        }
    }
     getReq()
},[])
  const values = {
    name: state.name,
    mobileNo: state.mobileNo,
    email: state.email,
    address: state.address,
    pincode: state.pincode,
    loksabha: state.loksabha,
    assembly: state.assembly,
    panchayat: state.panchayat,
    ward: state.ward,
    requestSubject: state.requestSubject,
    requestCategory: state.requestCategory,
    requestBody: state.requestBody,
  };
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
        status: "DRAFT",
        statusUser: "DRAFT"
    }
    if(state.loksabha == 'Other'){
      delete body['assembly']
      delete body['panchayat']
      delete body['ward']
    }
    if(!state.email){
      delete body['email']
    }
    const config = {
        headers: {
          'Authorization':'Bearer '+ await user.getIdToken()
        }
    }
    try {
      console.log("body : ", body);
      console.log("config : ", config);
        const res =  await axios.post(baseUrl+'requests/new', body, config);
        console.log("response : ", res.data)
        res.data && setRid(res.data.rid)
        console.log("response : ", res.data)
        setLoading(false)
        setDraft(true)
        setError()
    } catch(err){
        err.response && console.log("error : ", err.response.data)
    }
};

  const handleSubmit = async () => {
      setLoading(true)
      var documents = []
      if(state.requestFiles.length > 0){
        state.requestFiles.map((doc) => {
          documents = [...documents, doc.fileName]  
        })
      }
      console.log(documents)
      var body = {
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
          const res =  await axios.patch(baseUrl+`requests/${rid}`, body, config);
          console.log(res)
          setError()
      } catch(err){
          console.log(err.response.data)
      }
  };

  const handleNext = () => {

    var go = true
    if(activeStep == 0){
      if(!state.name){
        setError('Please fill your name')
        go = false
      }
      else if(!state.mobileNo){
        setError('Please fill your Mobile No')
        go = false
      }
      else if(!state.address){
        setError('Please fill your Address')
        go = false
      }
      else if(!state.pincode){
        setError('Please fill your Pincode')
        go = false
      }
      else if(!state.loksabha){
        setError('Please fill your Loksabha details')
        go = false
      }
      else if(state.loksabha == 'Idukki'){
        if(!state.assembly){
          setError('Please fill your Loksabha Assembly')
          go = false
        }
        else if(!state.panchayat){
          setError('Please fill your Panchayat')
          go = false
        }
        else if(!state.ward){
          setError('Please fill your Ward')
          go = false
        }
        else{
          setError()
        }
      }
      else{
        setError()
      }
    }
    if(activeStep === steps.length - 3 && !rid){
      if(!state.requestBody || !state.requestSubject){
        setError('Please fill request subject and content');
        go = false;
      }
      else if (!state.requestCategory) {
        setError('Please select a request category');
        go = false;
      }
      else{
        setError()
      }
      console.log('Drafted')
      handleDraft()
    }
    if(activeStep === steps.length - 1){
      setDraft(false)
      handleSubmit()
      console.log('Submitted')
    }
    if(go){
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setError()
    setActiveStep(activeStep - 1);
  };
  const steps = [
    t("personalDetails"),
    t("RequestDetails"),
    t("documentsUpload"),
    t("reviewYourRequest"),
  ];

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
        return <><PersonalForm values={values} handleChange={handleChange}/>{error && 
          <Typography variant="subtitle1" color="error" align="center">
            {error}
          </Typography>}</>;
      case 1:
        return <><RequestForm values={values} handleChange={handleChange}/>{error && 
          <Typography variant="subtitle1" color="error" align="center">
            {error}
          </Typography>
        }</>;
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
      <Appbar appBarTitle={t("newRequest")} />
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
            {t("newRequest")} {rid}
          </Typography>
          <Stepper
            activeStep={activeStep}
            className={classes.stepper}
            orientation={orientation}
          >
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
                  <Typography variant="h6" gutterBottom>
                    {draft
                      ? "Your request has been saved as draft."
                      : t("thankyouForYourSubmission")}
                  </Typography>
                  {!draft && (
                    <Typography variant="subtitle1">
                      {t("yourRequestIdIs")} <strong>#{rid}</strong>.{" "}
                      {t("YouWillBeSentAn")}
                      confirmation.
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    align="center"
                    onClick={() => history.push("/dashboard")}
                    className={classes.button}
                  >
                    {t("returnToDashboard")}
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Sorry, your request failed.
                  </Typography>
                  {error && (
                    <Typography variant="subtitle1">
                      Please fill Request subject and content
                    </Typography>
                  )}
                  <div className={classes.button}>
                    <Button
                      onClick={handleBack}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      {t("back")}
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
                      {t("back")}
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button
                      onClick={() => setActiveStep(activeStep + 1)}
                      color="primary"
                      variant="contained"
                      className={classes.button}
                    >
                      {t("submitLater")}
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
                      ? t("submitRequest")
                      : t("next")}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
      {/* <Box pt={4} borderTop={1} borderColor="grey.300" bgcolor="grey.300">
        <Copyright />
      </Box> */}
    </React.Fragment>
  );
}