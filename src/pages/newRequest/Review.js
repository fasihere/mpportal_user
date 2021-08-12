import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Request Details 
      </Typography>
      <List disablePadding>
          <ListItem className="" key="">
            <ListItemText primary="This is a very important request" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
          </ListItem>
      </List>
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
                <Typography gutterBottom>Faseeh Ahmed</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Phone Number</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>+91 7034073143</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Email</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>fasihere@email.com</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Address</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>This is my address</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Pincode</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>000000</Typography>
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
                <Typography gutterBottom>Devikulam</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Panchayat</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Hellowowo</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>Ward</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>8</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}