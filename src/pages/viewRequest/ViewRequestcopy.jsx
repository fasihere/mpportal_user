import { Link, useLocation } from "react-router-dom";
import "./viewRequestcopy.scss";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../context/Firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RequestPdf from "./RequestPdf";
import Action from "./Action"
import dk from "../../assets/images/dp.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Appbar from "../../components/topbar/Appbar";
import Fab from "@material-ui/core/Fab";
import SaveAltIcon from "@material-ui/icons/SaveAlt";



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
        console.log("res", res)
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
      <Appbar appBarTitle="View Request" />
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
                 <SaveAltIcon /> &nbsp; Save PDF
                </Fab>
              </PDFDownloadLink>
              <Paper className="attachedDocs">
                <div>
                  <h5>Documents Attached</h5>
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
                  <div className="title">Request to Dean Kuriakose M P</div>
                </div>
                <div className="mainContainer">
                  <div className="sectionTitle">REQUEST DETAILS</div>
                  <div>
                    <div className="flexTitleContainer">
                      <div className="flexHeader">Request No</div>
                      <div className="flexHeader">Category</div>
                      <div className="flexHeader">Subject</div>
                      <div className="flexHeader">Date</div>
                      <div className="flexHeader">Requested By</div>
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
                  <div className="sectionTitle">APPLICANT DETAILS</div>
                  <div className="flexTitleContainer">
                    <div className="flexHeader">L A Constituency</div>
                    <div className="flexHeader">L S Constituency</div>
                    <div className="flexHeader">Panchayat</div>
                    <div className="flexHeader">Ward</div>
                  </div>
                  <div className="flexContentContainer">
                    <div className="flexItem">{req && req.loksabha}</div>
                    <div className="flexItem">{req && req.assembly}</div>
                    <div className="flexItem">{req && req.panchayat}</div>
                    <div className="flexItem">{req && req.ward}</div>
                  </div>
                  <div className="addressContainer">
                    <div className="addressTitle">Address</div>
                    <div className="addressContent">
                      {req && req.address}
                      {req && req.pincode}
                    </div>
                  </div>

                  <div className="sectionTitle">REQUEST DESCRIPTION</div>
                  <div className="requestDescription">
                    {req && req.requestBody}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4} sm={8} md={4}>
            <Paper className="actionPaper">
              <h3 className="actionTitle"> Actions </h3>
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
                <h4 className="noActions">- No actions taken -</h4>
              )}{" "}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

