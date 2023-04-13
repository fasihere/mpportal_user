import React, {useState, useMemo, useEffect} from 'react';
import { IDUKKI_DATA } from '../register/laList'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Grid, makeStyles, Button, Typography, TextField,
  IconButton, Select, MenuItem, InputLabel
} from "@material-ui/core";
  import { useTranslation } from "react-i18next";


export default function PersonalForm({ values: { name, email, mobileNo, address, pincode, loksabha }, handleChange }) {
      const { t } = useTranslation();
  const { pending, isSignedIn, user, auth } = useAuth()
    const [error, setError] = useState(false)
    const [la, setLa] = useState([])
    const [panchayat, setPanchayat] = useState([])
    const [wards, setWards] = useState([])
    const [selectedLa, setSelectedLa] = useState("")
    const [selectedPanchayat, setSelectedPanchayat] = useState("")
    const [selectedWard, setSelectedWard] = useState(1)
    const baseUrl = 'https://idukkimpportal.azurewebsites.net/'
    const location = useLocation()
    const path = location.pathname.split("/")[2];

    const laList = useMemo(() => IDUKKI_DATA)
    useEffect(() => {
        setLa(laList)
    },[laList])

    const changeLa = (e) => {
        handleChange('ASSEMBLY')(e)
        setSelectedLa(e.target.value)
        if(la.find(x=>x.name===e.target.value)){
            setPanchayat(la.find(x=>x.name===e.target.value).panchayatList)
        }
        setWards([])
    }
    const changePanchayat = (e) => {
        handleChange('PANCHAYAT')(e)
        setSelectedPanchayat(e.target.value)
        if(panchayat.find(x=>x.panchayat[0]===e.target.value)){
            const ward = panchayat.find(x=>x.panchayat[0]===e.target.value).panchayat[1]
            const list = []
            for(let i=1; i<=ward; i++) {
                list.push(i.toString())
        }
        setWards(list)
        }
    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("personalDetails")} {t(`${loksabha}`)}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label={t("fullName")}
            fullWidth
            autoComplete="given-name"
            value={name}
            onChange={handleChange("NAME")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNo"
            name="phoneNo"
            label={t("phoneNo")}
            fullWidth
            autoComplete="phone-number"
            value={mobileNo}
            onChange={handleChange("PHONE")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label={t("emailId")}
            fullWidth
            autoComplete="email"
            value={email}
            onChange={handleChange("EMAIL")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label={t("address")}
            fullWidth
            autoComplete="shipping address"
            value={address}
            onChange={handleChange("ADDRESS")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pincode"
            name="pincode"
            label={t("pincode")}
            fullWidth
            autoComplete="shipping postal-code"
            value={pincode}
            onChange={handleChange("PINCODE")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            id="loksabha"
            name="loksabha"
            label={t("loksabhaConstituency")}
            value={loksabha}
            onChange={handleChange("LOKSABHA")}
            fullWidth
          >
            <MenuItem selected value="Idukki">
              {t("Idukki")}
            </MenuItem>
            <MenuItem value="Other">{t("Other")}</MenuItem>
          </TextField>
        </Grid>
        {loksabha == "Idukki" && (
          <>
            <Grid item md={4} xs={12}>
              <TextField
                required
                select
                fullWidth
                label={t("LAConstituency")}
                value={selectedLa}
                onChange={changeLa}
                inputProps={{ "aria-label": "Without label" }}
              >
                {la.map((x) => {
                  return (
                    <MenuItem value={x.name}>
                      {t(`${x.name}`)}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                required
                select
                fullWidth
                label={t("panchayat")}
                value={selectedPanchayat}
                onChange={changePanchayat}
              >
                {panchayat.map((x) => {
                  return (
                    <MenuItem value={x.panchayat[0]}>
                      {t(`${x.panchayat[0]}`)}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                required
                select
                fullWidth
                label={t("ward")}
                value={selectedWard}
                onChange={(e) => {
                  setSelectedWard(e.target.value);
                  handleChange("WARD")(e);
                }}
              >
                {wards.map((x) => {
                  return <MenuItem value={x}>{x}</MenuItem>;
                })}
              </TextField>
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}