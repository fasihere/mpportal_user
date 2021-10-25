import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import CreateIcon from '@material-ui/icons/Create';
import RequestTable from '../../components/requestTable/requestNewTable/requestTable.jsx'
import { useAuth } from '../../context/AuthContext';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Appbar from '../../components/topbar/Appbar';
import { useHistory, Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://deankuriakose.in/">
        Dean Kuriakose
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  create: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Dashboard() {
  const { user, auth, selected, isRegister } = useAuth()
  const history = useHistory()
  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if(!isRegister){
    <Redirect to="/register" />
  }
  return (
    <div className={classes.root}>
      <Appbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={3} style={{textAlign: "center"}}>
              <Link to="/request/new" style={{textDecoration: "none", color: "white"}}>
                <Fab
                  variant="extended"
                  size="large"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={() => history.push('/request/new')}
                >
                  <CreateIcon className={classes.create}/>
                    New Request
                </Fab>
              </Link>
            </Grid>
            <Grid item xs={12} lg={9}>
              <Paper className={classes.paper}>
                <Typography  color="inherit" variant="body2" component="body2" className={classes.title}>
                {isRegister && "Welcome Registered Person" } Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem 
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {/* Requests */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <RequestTable selected={selected.toUpperCase()}/>
              </Paper>
            </Grid>
          </Grid>
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
    </div>
  );
}