import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
  import { useTranslation } from "react-i18next";  


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

export default function Review({ values }) {
          const { t } = useTranslation();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t("requestDetails")}
      </Typography>
      <List disablePadding>
        <ListItem className="" key="">
          <ListItemText
            primary={values.requestSubject}
            secondary={values.requestBody}
          />
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {t("personalDetails")}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("fullName")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("phoneNo")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>+91 {values.mobileNo}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("emailId")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("address")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.address}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("pincode")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.pincode}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("loksabhaConstituency")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("Idukki")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("LAConstituency")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t(`${values.assembly}`)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("panchayat")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t(`${values.panchayat}`)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{t("ward")}</Typography>
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