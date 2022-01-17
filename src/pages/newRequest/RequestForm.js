import React from 'react';
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Button, Typography, TextField,
  IconButton, Select, MenuItem, InputLabel
} from "@material-ui/core";
  import { useTranslation } from "react-i18next";  


export default function RequestForm({ values: { requestSubject, requestCategory, requestBody }, handleChange }) {
        const { t } = useTranslation();
    const { user } = useAuth()
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("requestDetails")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="subject"
            name="subject"
            label={t("subject")}
            fullWidth
            value={requestSubject}
            onChange={handleChange("SUBJECT")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            select
            id="category"
            name="category"
            label={t("category")}
            fullWidth
            value={requestCategory}
            onChange={handleChange("CATEGORY")}
          >
            <MenuItem key="a" value="a">
              a
            </MenuItem>
            <MenuItem key="b" value="b">
              b
            </MenuItem>
            <MenuItem key="c" value="c">
              c
            </MenuItem>
            <MenuItem key="d" value="d">
              d
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="body"
            name="body"
            label={t("requestContent")}
            fullWidth
            variant="filled"
            helperText={t("writeYourRequestHere")}
            multiline
            rows={10}
            value={requestBody}
            onChange={handleChange("BODY")}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}