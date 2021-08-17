import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

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

export default function Review({values}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Request Details 
      </Typography>
      <List disablePadding>
          <ListItem className="" key="">
            <ListItemText primary={values.requestSubject} secondary={values.requestBody} />
          </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h5" gutterBottom className={classes.title}>
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