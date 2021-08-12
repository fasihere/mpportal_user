import React from 'react'
import { Grid, makeStyles, Stepper, Step, StepLabel, Button, Typography, Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    IconButton, Container, Select, MenuItem, InputLabel} from "@material-ui/core";

export default function PersonalDetails() {
    const useStyles = makeStyles((theme) => ({
        label: {
            backgroundColor: "white"
        }
    }))
    const classes = useStyles()
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
              label="Full Name"
              name="fullName"
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
              name="email"
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
              name="phoneNo"
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
              defaultValue="Idukki"
              disabled
            />
          </Grid>
          <Grid
          item
          md={4}
          xs={12}
          >
          <InputLabel id="LAConstituency" >LA Constituency</InputLabel>
          <Select
          displayEmpty
          fullWidth
          labelId="LAConstituency"
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
}
