import "./profile.scss";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { IDUKKI_DATA } from "../register/laList";
import axios from "axios";
//import { makeStyles } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Appbar from "../../components/topbar/Appbar"
import CreateIcon from "@material-ui/icons/Create";
import {
  Grid,
  makeStyles,
  Button,
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from "@material-ui/core";

 const useStyles = makeStyles((theme) => ({
   layout: {
     minHeight: "calc(100vh - 50px)",
     width: "auto",
     marginLeft: theme.spacing(2),
     marginRight: theme.spacing(2),
     [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
       width: 600,
       marginLeft: "auto",
       marginRight: "auto",
     },
   },
   paper: {
     marginTop: theme.spacing(10),
     marginBottom: theme.spacing(3),
     padding: theme.spacing(2),
     [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
       marginTop: theme.spacing(6),
       marginBottom: theme.spacing(6),
       padding: theme.spacing(3),
     },
   },
   buttons: {
     display: "flex",
     justifyContent: "flex-end",
   },
   button: {
     marginTop: theme.spacing(3),
   },
 }));


export default function Profile() {
      const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [edit, setEdit] = useState(false);
  const baseUrl =
    "https://idukkimpportal.azurewebsites.net/users/";

  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loksabha, setLoksabha] = useState("Idukki");
  const [mobileNo, setMobileNo] = useState();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState(null);
  const [error, setError] = useState(false);
  const [la, setLa] = useState([]);
  const [panchayat, setPanchayat] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedLa, setSelectedLa] = useState();
  const [selectedPanchayat, setSelectedPanchayat] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [storedLa, setStoredLa] = useState("");
  const [storedPanchayat, setStoredPanchayat] = useState("");
  const [storedWard, setStoredWard] = useState();

  useEffect(() => {
    const getUser = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + (await user.getIdToken()),
        },
      };
      const res = await axios.get(baseUrl, config);
      setName(res.data.name);
      setEmail(res.data.email);
      setMobileNo(res.data.mobileNo);
      setAddress(res.data.address);
      setPincode(res.data.pincode);
      setLoksabha(res.data.loksabha);
      setStoredLa(res.data.assembly);
      setStoredPanchayat(res.data.panchayat);
      setStoredWard(res.data.ward);
    };
    getUser();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch({ type: "UPDATE_START" });
    setEdit(!edit);
    var assembly = selectedLa;
    var panch = selectedPanchayat;
    var ward = selectedWard;
    if (!assembly) {
      assembly = storedLa;
    }
    if (!panch) {
      panch = storedPanchayat;
    }
    if (!ward) {
      ward = storedWard;
    }
    setStoredLa(assembly);
    setStoredPanchayat(panch);
    setStoredWard(ward);
    const body = {
      name,
      email,
      address,
      assembly,
      panchayat: panch,
      ward,
      pincode,
    };
    const config = {
      headers: {
        Authorization: "Bearer " + (await user.getIdToken()),
      },
    };
    try {
      const res = await axios.patch(baseUrl, body, config);
      console.log(res);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const laList = useMemo(() => IDUKKI_DATA);
  useEffect(() => {
    setLa(laList);
  }, [laList]);

  const changeLa = (e) => {
    setSelectedLa(e.target.value);
    if (la.find((x) => x.name === e.target.value)) {
      setPanchayat(la.find((x) => x.name === e.target.value).panchayatList);
    }
    setWards([]);
  };
  const changePanchayat = (e) => {
    setSelectedPanchayat(e.target.value);
    if (panchayat.find((x) => x.panchayat[0] === e.target.value)) {
      const ward = panchayat.find((x) => x.panchayat[0] === e.target.value)
        .panchayat[1];
      const list = [];
      for (let i = 1; i <= ward; i++) {
        list.push(i);
      }
      setWards(list);
    }
  };

  return (
    <Grid container className={classes.layout}>
      <Appbar appBarTitle="My Profile" />
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              disabled={!edit}
              id="fullName"
              name="fullName"
              label="Full name"
              fullWidth
              autoComplete="given-name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              id="email"
              name="email"
              label="Email Id"
              fullWidth
              autoComplete="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              maxRows={4}
              disabled={!edit}
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address"
              defaultValue={address}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="pincode"
              name="pincode"
              label="Pincode"
              fullWidth
              autoComplete="shipping postal-code"
              defaultValue={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              disabled={!edit}
              id="loksabha"
              name="loksabha"
              label="Loksabha Constituency"
              defaultValue={loksabha}
              onChange={(e) => setLoksabha(e.target.value)}
              select
              fullWidth
            >
              <MenuItem value="Idukki">Idukki</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          {loksabha === "Idukki" && (
            <>
              <Grid item md={4} xs={12}>
                <TextField
                  disabled={!edit}
                  required
                  select
                  fullWidth
                  label="LA Constituency"
                  value={selectedLa}
                  onChange={(e) => changeLa(e)}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled>-- Select --</MenuItem>
                  {la.map((x) => {
                    return (
                      <MenuItem key={x.name} value={x.name}>
                        {x.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  disabled={!edit}
                  required
                  select
                  fullWidth
                  label="Panchayat"
                  value={selectedPanchayat}
                  onChange={(e) => changePanchayat(e)}
                >
                  <MenuItem disabled>-- Select --</MenuItem>
                  {panchayat.map((x) => {
                    return (
                      <MenuItem key={x.panchayat[0]} value={x.panchayat[0]}>
                        {x.panchayat[0]}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  disabled={!edit}
                  required
                  select
                  fullWidth
                  label="Ward"
                  value={selectedWard}
                  onChange={(e) => {
                    setSelectedWard(e.target.value);
                  }}
                >
                  <MenuItem disabled>-- Select --</MenuItem>
                  {wards.map((x) => {
                    return (
                      <MenuItem key={x} value={x}>
                        {x}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            </>
          )}
        </Grid>
        {edit ? (
          <div>
            <Button
              className={classes.button}
              color="success"
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleEdit}
            >
              Edit &nbsp;
              <CreateIcon />
            </Button>
          </div>
        )}
      </Paper>
    </Grid>
  );

  return (
    <div className="profile">
      <Appbar appBarTitle="My Profile" />
      <h2 className="title">Profile</h2>
      <div className="wrapper">
        <Paper
          className="paper"
          sx={{
            padding: "40px",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ flexGrow: 1 }}
            onSubmit={handleSubmit}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={4} md={6}>
                <TextField
                  required
                  label="Full Name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  fullWidth
                  disabled={!edit}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <TextField
                  label="Email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  fullWidth
                  disabled={!edit}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <TextField
                  required
                  label="LokSabha Constituency"
                  fullWidth
                  defaultValue="Idukki"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled={!edit}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <TextField
                  required
                  select
                  label="LA Constituency"
                  value={selectedLa}
                  onChange={(e) => changeLa(e)}
                  fullWidth
                  margin="normal"
                  disabled={!edit}
                  variant="standard"
                >
                  <MenuItem disabled>-- Select --</MenuItem>
                  {la.map((x) => {
                    return (
                      <MenuItem key={x.name} value={x.name}>
                        {x.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <TextField
                  required
                  select
                  label="Panchayat"
                  value={selectedPanchayat}
                  onChange={(e) => changePanchayat(e)}
                  fullWidth
                  margin="normal"
                  disabled={!edit}
                  variant="standard"
                >
                  <MenuItem disabled>-- Select --</MenuItem>
                  {panchayat.map((x) => {
                    return (
                      <MenuItem key={x.panchayat[0]} value={x.panchayat[0]}>
                        {x.panchayat[0]}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={6}>
                <TextField
                  required
                  select
                  label="Ward"
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  fullWidth
                  margin="normal"
                  disabled={!edit}
                  variant="standard"
                >
                  <MenuItem disabled>-- Select --</MenuItem>
                  {wards.map((x) => {
                    return (
                      <MenuItem key={x} value={x}>
                        {x}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                <TextField
                  required
                  label="Address"
                  multiline
                  maxRows={4}
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  shrink
                  margin="normal"
                  disabled={!edit}
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                <TextField
                  required
                  label="Pincode"
                  defaultValue={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  fullWidth
                  margin="normal"
                  disabled={!edit}
                  variant="standard"
                />
              </Grid>
            </Grid>

            {edit ? (
              <Button
                color="success"
                variant="contained"
                onClick={handleSubmit}
              >
                Save &nbsp;<i className="fas fa-edit"></i>
              </Button>
            ) : (
              <Button color="primary" variant="contained" onClick={handleEdit}>
                Edit &nbsp;
                <CreateIcon />
              </Button>
            )}
          </Box>
        </Paper>
        {/* <div className="right">
                    <h2 className="title">Request Summary</h2>
                    <div className="pendingNum">
                        <span className="indicator"></span>
                        <span>Pending Requests: 3 </span>
                    </div>
                </div> */}
      </div>
    </div>
  );
}
