import React, {useState, useMemo, useEffect} from 'react';
import { IDUKKI_DATA } from '../register/laList'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Grid, makeStyles, Button, Typography, TextField,
  IconButton, Select, MenuItem, InputLabel} from "@material-ui/core";

export default function PersonalForm() {
  const { pending, isSignedIn, user, auth } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState(0)
    const [error, setError] = useState(false)
    const [la, setLa] = useState([])
    const [panchayat, setPanchayat] = useState([])
    const [wards, setWards] = useState([])
    const [selectedLa, setSelectedLa] = useState("")
    const [selectedPanchayat, setSelectedPanchayat] = useState("")
    const [selectedWard, setSelectedWard] = useState(1)
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/'
    const location = useLocation()
    const path = location.pathname.split("/")[2];

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
    <React.Fragment>
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNo"
            name="phoneNo"
            label="Phone No"
            fullWidth
            autoComplete="phone-number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email Id"
            fullWidth
            autoComplete="email"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="loksabha"
            name="loksabha"
            label="Loksabha Constituency"
            defaultValue="Idukki"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
          onChange={(e) => setSelectedWard(e.target.value)}
          >
            {wards.map(x => {
                return <MenuItem value={x}>{x}</MenuItem>
            })}
         </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}