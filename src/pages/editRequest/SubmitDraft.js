import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function SubmitDraft({values, handleChange}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Request Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="subject"
            name="subject"
            label="Subject"
            fullWidth
            value={values.requestSubject}
            onChange={handleChange('SUBJECT')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="body"
            name="body"
            label="Request Content"
            fullWidth
            variant="filled"
            helperText="Write your request here"
            multiline
            rows={10}
            value={values.requestBody}
            onChange={handleChange('BODY')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Personal details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
                <Typography gutterBottom>Full Name</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{values.name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Phone Number</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>+91 {values.mobileNo}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Email</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{values.email}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Address</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{values.address}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Pincode</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{values.pincode}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Loksabha Constituency</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Idukki</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>LA Constituency</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{values.assembly}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Panchayat</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{values.panchayat}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Ward</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{values.ward}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}