import React, {useState, useMemo, useEffect} from 'react';
import { IDUKKI_DATA } from '../register/laList'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Grid, makeStyles, Button, Typography, TextField,
  IconButton, Select, MenuItem, InputLabel} from "@material-ui/core";

export default function RequestForm() {
    const { pending, isSignedIn, user, auth } = useAuth()
    const [requestSubject, setRequestSubject] = useState("")
    const [requestBody, setRequestBody] = useState("")
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/'
    const location = useLocation()
    const path = location.pathname.split("/")[2];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Request Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="subject"
            name="subject"
            label="Subject"
            fullWidth
            value={requestSubject}
            onChange={(e) => setRequestSubject(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="body"
            name="body"
            label="Request Content"
            fullWidth
            variant="filled"
            helperText="Write your request here"
            multiline
            rows={10}
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}