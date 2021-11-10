import "./profile.scss";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { IDUKKI_DATA } from "../register/laList";
import axios from "axios";
//import { makeStyles } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Appbar from "../../components/topbar/Appbar"
import CreateIcon from "@material-ui/icons/Create";




export default function Profile() {
  const [success, setSuccess] = useState(false);
  const [edit, setEdit] = useState(false);
  const baseUrl =
    "https://asia-south1-mpportal-e9873.cloudfunctions.net/app/users/";

  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
