import React from 'react';
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Button, Typography, TextField,
  IconButton, Select, MenuItem, InputLabel} from "@material-ui/core";


export default function RequestForm({values:{requestSubject, requestBody}, handleChange}) {
    const { user } = useAuth()

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
            onChange={handleChange('SUBJECT')}
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
            onChange={handleChange('BODY')}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}