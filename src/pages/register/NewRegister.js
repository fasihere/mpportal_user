import React, {useState, useMemo, useEffect} from 'react';
import { IDUKKI_DATA } from './laList'
import { useAuth } from '../../context/AuthContext'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Grid, makeStyles, Button, Typography, TextField,
  IconButton, Select, MenuItem, InputLabel, Paper} from "@material-ui/core";

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
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function NewRegister() {
    const { user, auth, isRegister, setIsRegister } = useAuth()
    const classes = useStyles()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState(null)
    const [error, setError] = useState(false)
    const [loksabha, setLoksabha] = useState('Idukki')
    const [la, setLa] = useState([])
    const [panchayat, setPanchayat] = useState([])
    const [wards, setWards] = useState([])
    const [selectedLa, setSelectedLa] = useState()
    const [selectedPanchayat, setSelectedPanchayat] = useState()
    const [selectedWard, setSelectedWard] = useState()
    const [loading, setLoading] = useState(false)

    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/users'
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            var body = {
                name,
                mobileNo: user.phoneNumber.slice(3,13),
                address,
                loksabha,
                pincode
            }
            if(email){
              body = {...body, email}
            }
            if(loksabha == 'Idukki')
            body = {
              ...body,
              assembly: selectedLa,
              panchayat: selectedPanchayat,
              ward: selectedWard, 
            }
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const res = await axios.post(baseUrl + '/new', body, config);
            console.log(res)
            res && await auth.currentUser.updateProfile({
                displayName: 'registered',
              }).then(() => {
                console.log("User has been registered")
              }).catch((error) => {
                console.log(error)
              });
            res && console.log("Registered Successfully")  
            res && setIsRegister(true)
            res && window.location.replace("/dashboard")
        }
        catch(err){
            setError(true)
            console.log(err)
            console.log(err.response)
            window.location.replace("/dashboard")
        }
    }

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
                list.push(i.toString())
        }
        setWards(list)
        }
    }
  if(isRegister){
    console.log("Already Registered?")
    return <Redirect to="/dashboard" />
  }
  return (
    <Grid container  className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
            Personal Details
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="fullName"
                name="fullName"
                label="Full name"
                fullWidth
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                id="email"
                name="email"
                label="Email Id"
                fullWidth
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="shipping address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="pincode"
                name="pincode"
                label="Pincode"
                fullWidth
                autoComplete="shipping postal-code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm ={6}>
            <TextField
                id="loksabha"
                name="loksabha"
                label="Loksabha Constituency"
                value={loksabha}
                onChange={(e) => setLoksabha(e.target.value)}
                select
                fullWidth
            >
               <MenuItem value="Idukki">Idukki</MenuItem>
               <MenuItem value="Other">Other</MenuItem>
            </TextField>
            </Grid>
            {loksabha === "Idukki" && 
            <>
              <Grid
              item
              md={4}
              xs={12}
              >
              <TextField
              required
              select
              fullWidth
              label="LA Constituency"
              value={selectedLa}
              onChange={changeLa}
              inputProps={{ 'aria-label': 'Without label' }}
              >
                  {la.map(x => {
                  return <MenuItem value={x.name}>{x.name}</MenuItem>
                  })}
              </TextField>
              </Grid>
              <Grid
              item
              md={4}
              xs={12}
              >
              <TextField
              required
              select
              fullWidth
              label="Panchayat"
              value={selectedPanchayat}
              onChange={changePanchayat}
              >
              {panchayat.map(x => {
                  return <MenuItem value={x.panchayat[0]}>{x.panchayat[0]}</MenuItem>
              })}
              </TextField>
              </Grid>
              <Grid
              item
              md={4}
              xs={12}
              >
              <TextField
              required
              select
              fullWidth
              label="Ward"
              value={selectedWard}
              onChange={(e) => {
                  setSelectedWard(e.target.value)
              }}>
                  {wards.map(x => {
                      return <MenuItem value={x}>{x}</MenuItem>
                  })}
              </TextField>
              </Grid>
            </>}
        </Grid> 
        <div className={classes.button}>
            <Button 
            onClick={(e) => handleSubmit(e)} 
            className={classes.button} 
            variant="contained"
            color="primary"
            disabled={loading}>
                Register
            </Button>
        </div>
      </Paper>
    </Grid>
  );
}