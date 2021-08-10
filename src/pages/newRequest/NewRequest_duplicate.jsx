import './newRequest.scss'
import axios from 'axios'
import { useState, useContext, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { IDUKKI_DATA } from '../register/laList'
import { Grid, makeStyles, Stepper, Step, StepLabel, Button, Typography, Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  IconButton, Container, Select, MenuItem, InputLabel} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minHeight: 'calc(100vh - 100px)'
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));
  
  function getSteps() {
    return ['Enter your details', 'Enter request', 'Review Request'];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <form
          autoComplete="off"
          noValidate
          encType="multipart/form-data"
        >
          <Card>
            <CardHeader
              title="Edit Details"
              subheader="basic details except email can be edited"   
            />
            <Divider />
            <CardContent>
            <Grid
              container
              spacing={3}
            >       
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email ID"
                name="lastName"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone No"
                helperText="You can't edit your email Id"
                name="email"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="phoneNo"
                variant="outlined"
                disabled
              />
            </Grid> 
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pin Code"
                name="organization"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Lok Sabha Constituency"
                name="dateOfBirth"
                variant="outlined"
              />
            </Grid>
            <Grid
            item
            md={4}
            xs={12}
            >
            <InputLabel id="LAConstituency" >Age</InputLabel>
            <Select
            displayEmpty
            fullWidth
            labelId="LAConstituency"
            variant="outlined"
            inputProps={{ 'aria-label': 'Without label' }}
            >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
           </Select>
            </Grid>
            <Grid
            item
            md={4}
            xs={12}
            >
            <InputLabel id="panchayat" >Panchayat</InputLabel>
            <Select
            displayEmpty
            fullWidth
            labelId="panchayat"
            variant="outlined"
            >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
           </Select>
            </Grid>
            <Grid
            item
            md={4}
            xs={12}
            >
            <InputLabel id="ward" >Ward</InputLabel>
            <Select
            displayEmpty
            fullWidth
            labelId="ward"
            variant="outlined"
            >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
           </Select>
            </Grid>
            </Grid>
            </CardContent>  
          </Card>
        </form>
        )
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
    }
  }
export default function NewRequest() {
    const { pending, isSignedIn, user, auth } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState(null)
    const [error, setError] = useState(false)
    const [la, setLa] = useState([])
    const [panchayat, setPanchayat] = useState([])
    const [wards, setWards] = useState([])
    const [selectedLa, setSelectedLa] = useState()
    const [selectedPanchayat, setSelectedPanchayat] = useState()
    const [selectedWard, setSelectedWard] = useState()
    const [requestSubject, setRequestSubject] = useState()
    const [requestBody, setRequestBody] = useState()
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/'
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

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
                setName(res.data.name)
                setEmail(res.data.email)
                setMobileNo(res.data.mobileNo)
                setAddress(res.data.address)
                setPincode(res.data.pincode)
             } catch(err){
                console.log(err)
            }
        }
         getReq()
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name,
            email,
            mobileNo: mobileNo,
            address,
            loksabha:"Idukki",
            assembly: selectedLa,
            panchayat: selectedPanchayat,
            ward: selectedWard,
            pincode,
            requestSubject,
            requestBody,
            status: "UNREAD",
            statusUser: "PENDING"
        }
        const config = {
            headers: {
              'Authorization':'Bearer '+ await user.getIdToken()
            }
        }
        try{
            const res =  await axios.post(baseUrl+'requests/new', body, config);
            console.log(res.data)
            res.data && window.location.replace('/request/'+res.data.rid+'/submit')
        } catch(err){
            console.log(err.response.data)
            setError(true)
        }
    };

    const laList = useMemo(() => IDUKKI_DATA)
    useEffect(() => {
        setLa(laList)
    },[laList])

    const changeLa = (e) => {
        setSelectedLa(e.target.value)
        if(la.find(x=>x.name===e.target.value)){
            setPanchayat(la.find(x=>x.name===e.target.value).panchayatList)
        }
        setWards([])
    }
    const changePanchayat = (e) => {
        setSelectedPanchayat(e.target.value)
        if(panchayat.find(x=>x.panchayat[0]===e.target.value)){
            const ward = panchayat.find(x=>x.panchayat[0]===e.target.value).panchayat[1]
            const list = []
            for(let i=1; i<=ward; i++) {
                list.push(i)
        }
        setWards(list)
        }
    }

    return (
      <Container>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        </Container>
      );
}
