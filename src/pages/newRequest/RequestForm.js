import React, {useState} from 'react';
import { IDUKKI_DATA } from '../register/laList'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Grid, makeStyles, Button, Typography, TextField,
  IconButton, Select, MenuItem, InputLabel} from "@material-ui/core";
import { AssignmentReturned } from '@material-ui/icons';

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

export default function RequestForm({values:{requestSubject, requestBody}, handleChange}) {
    const { user } = useAuth()
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/'
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const classes = useStyles()
    const [files, setFiles] = useState([])

    const handleUpload = (e) => {
      for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = Math.random();
        setFiles(prevState => [...prevState, newFile]);
      }
    }
    const handleRemove = (x) => {
      setFiles(files.filter( obj => obj.id !== x.id))
    }
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
        <div className={classes.root}>
          <input
            className={classes.input}
            id="contained-button-file"
            type="file"
            multiple
            onChange={handleUpload}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
            {console.log(files)}
            {files.map((x) => <p>{x.name}<i class="fas fa-times" onClick={(e) => handleRemove(x)} style={{marginLeft:"5px"}}></i></p>)}
            <p>(images/audio/video less than 5MP)</p>
        </div>
      </Grid>
    </React.Fragment>
  );
}