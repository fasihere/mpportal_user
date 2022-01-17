import { useLocation } from "react-router-dom";
import "./viewRequestcopy.scss";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../context/Firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RequestPdf from "./RequestPdf";
import Action from "./Action";
import dk from "../../assets/images/dp.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Appbar from "../../components/topbar/Appbar";
import Fab from "@material-ui/core/Fab";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { useTranslation } from "react-i18next";

export default function ViewRequestcopy() {
  const { user } = useAuth();
  const [req, setReq] = useState();
  const location = useLocation();
  const [actions, setActions] = useState([]);
  const path = location.pathname.split("/")[2];
  const baseRequestUrl =
    "https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests/";
  const baseActionUrl =
    "https://asia-south1-mpportal-e9873.cloudfunctions.net/app/";
  const { t } = useTranslation();

  const tempDocArray = useRef();

  useEffect(() => {
    const getReq = async () => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + (await user.getIdToken()),
          },
        };
        const res = await axios.get(baseRequestUrl + path, config);
        console.log("response :", res.data);
        res && setReq(res.data);
        var storageRef = storage.ref(
          `mpportal/user/${user.phoneNumber.slice(3, 13)}/${path}`
        );
        res && console.log(res.data.documents);
        res.data.documents.map((fileName) => {
          storageRef
            .child(`/${fileName}`)
            .getDownloadURL()
            .then((url) => {
              const newDoc = {
                name: fileName,
                url,
              };
              tempDocArray.current.innerHTML += `<li>
                          <a href=${newDoc.url}>${newDoc.name}</a>
                        </li>`;

              console.log("tdoc", tempDocArray);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } catch (err) {
        console.log(err);
      }
    };
    getReq();

    const fetchActions = async () => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + (await user.getIdToken()),
          },
        };
        const res = await axios.get(
          baseActionUrl + "requests/actions/" + path,
          config
        );
        console.log("res", res);
        setActions(res.data.details);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchActions();
  }, []);

  if (!req) {
    return (
      <div className="loadingContainer">
        <span></span>
        <span className="second"></span>
      </div>
    );
  }
  return (
    <div className="viewRequest" style={{ backgroundColor: "#e9ecef" }}>
      <Appbar appBarTitle={t("viewRequest")} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={8} md={2}>
            <Stack direction="column" spacing={4} className="leftColumn">
              <PDFDownloadLink
                document={<RequestPdf path={path} req={req} />}
                fileName={`request-${path}.pdf`}
                aria-label="Save PDF"
              >
                <Fab
                  variant="extended"
                  size="large"
                  color="primary"
                  className="SavePdfButton"
                >
                  <SaveAltIcon /> &nbsp; {t("savePdf")}
                </Fab>
              </PDFDownloadLink>
              <Paper className="attachedDocs">
                <div>
                  <h5>{t("documentsAttached")}</h5>
                  <Divider />
                  <ul ref={tempDocArray} className="docsList"></ul>
                </div>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={8} md={6}>
            <Paper className="pdfPaper">
              <div className="mt4">
                <div className="pdfTitle">
                  <img src={dk} className="mpImage" />
                  <div className="title">{t("requestToDeanKuriakoseMP")}</div>
                </div>
                <div className="mainContainer">
                  <div className="sectionTitle">{t("requestDetails")}</div>
                  <div>
                    <div className="flexTitleContainer">
                      <div className="flexHeader">{t("requestNo")}</div>
                      <div className="flexHeader">{t("category")}</div>
                      <div className="flexHeader">{t("subject")}</div>
                      <div className="flexHeader">{t("date")}</div>
                      <div className="flexHeader">{t("requestedBy")}</div>
                    </div>
                    <div className="flexContentContainer">
                      <div className="flexItem">{path}</div>
                      <div className="flexItem">
                        {req && req.requestCategory}
                      </div>
                      <div className="flexItem">
                        {req && req.requestSubject}
                      </div>
                      <div className="flexItem">
                        {req &&
                          req.postedTime
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                      </div>
                      <div className="flexItem">{req && req.name}</div>
                    </div>
                  </div>
                  <div className="sectionTitle">{t("applicantDetails")}</div>
                  <div className="flexTitleContainer">
                    <div className="flexHeader">{t("LAConstituency")}</div>
                    <div className="flexHeader">{t("LSConstituency")}</div>
                    <div className="flexHeader">{t("panchayat")}</div>
                    <div className="flexHeader">{t("ward")}</div>
                  </div>
                  <div className="flexContentContainer">
                    <div className="flexItem">
                      {req && t(`${req.assembly}`)}
                    </div>
                    <div className="flexItem">
                      {req && t(`${req.loksabha}`)}
                    </div>
                    <div className="flexItem">
                      {req && t(`${req.panchayat}`)}
                    </div>
                    <div className="flexItem">{req && req.ward}</div>
                  </div>
                  <div className="addressContainer">
                    <div className="addressTitle">{t("address")}</div>
                    <div className="addressContent">
                      {req && req.address}
                      {req && req.pincode}
                    </div>
                  </div>

                  <div className="sectionTitle">{t("requestDescription")}</div>
                  <div className="requestDescription">
                    {req && req.requestBody}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4} sm={8} md={4}>
            <Paper className="actionPaper">
              <h3 className="actionTitle"> {t("Actions")} </h3>
              <Divider variant="middle" />
              {actions.length > 0 ? (
                actions.map((val, key) => {
                  return (
                    <Action
                      aid={val.aid}
                      actionSubject={val.actionSubject}
                      actionBody={val.actionBody}
                      actionNo={val.actionNo}
                      actionReply={val.actionReply}
                    />
                  );
                })
              ) : (
                <h5 className="noActions">- {t("noActionsTaken")} -</h5>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
