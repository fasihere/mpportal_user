import React from "react";
import {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import dk from "../../assets/images/dp.png"


const styles = StyleSheet.create({
  pdfTitle: {
    textAlign: "center",
    margin: "20px 20px 0px 20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 800,
    fontSize: "25px",
    paddingTop: "10px",
  },
  mpImage: { height: "50px", width: "50px" },
  mainContainer: {
    color: "black",
    margin: "20px",
    width: "554px",
    height: "714px",
    borderColor: "grey",
    borderWidth: "1px",
  },
  sectionTitle: {
    width: "100%",
    backgroundColor: "#72ddf7",
    padding: "5px",
    borderColor: "grey",
    borderWidth: "1px",
    textAlign: "center",
    fontSize: "15px",
  },
  flexTitleContainer: {
    display: "table",
    flexDirection: "row",
  },
  flexContentContainer: {
    display: "table",
    flexDirection: "row",
  },
  flexHeader: {
    backgroundColor: "#b4e3ff",
    borderWidth: "1px",
    width: "25%",
    padding: "5px",
    textAlign: "center",
    fontSize: "13px",
  },
  flexItem: {
    borderColor: "grey",
    borderWidth: "1px",
    width: "25%",
    padding: "5px",
    textAlign: "center",
    fontSize: "13px",
  },
  addressContainer: {
    width: "100%",
  },
  addressTitle: {
    backgroundColor: "#b4e3ff",
    borderColor: "grey",
    borderWidth: "1px",
    width: "100%",
    alignItems: "center",
    padding: "5px",
    fontSize: "13px",
  },
  addressContent: {
    borderColor: "grey",
    borderWidth: "1px",
    width: "100%",
    padding: "10px 40px 10px 40px",
    fontSize: "13px",
    paddingRight: "50%",
  },
  requestDescription: {
    fontSize: "13px",
    width: "100%",
    padding: "40px",
  },
});

const RequestPdf = ({path, req}) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.pdfTitle}>
          <Image src={dk} style={styles.mpImage} />
          <Text style={styles.title}>Request to Dean Kuriakose M P</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.sectionTitle}>
            <Text>REQUEST DETAILS</Text>
          </View>
          <View>
            <div style={styles.flexTitleContainer}>
              <div style={styles.flexHeader}>
                <Text>Request No</Text>
              </div>
              <div style={styles.flexHeader}>
                <Text>Category</Text>
              </div>
              <div style={styles.flexHeader}>
                <Text>Subject</Text>
              </div>
              <div style={styles.flexHeader}>
                <Text>Date</Text>
              </div>
              <div style={styles.flexHeader}>
                <Text>Requested By</Text>
              </div>
            </div>
            <div style={styles.flexContentContainer}>
              <div style={styles.flexItem}>
                <Text>{path}</Text>
              </div>
              <div style={styles.flexItem}>
                <Text>{req && req.requestCategory}</Text>
              </div>
              <div style={styles.flexItem}>
                <Text>{req && req.requestSubject}</Text>
              </div>
              <div style={styles.flexItem}>
                <Text>
                  {req &&
                    req.postedTime.slice(0, 10).split("-").reverse().join("-")}
                </Text>
              </div>
              <div style={styles.flexItem}>
                <Text>{req && req.name}</Text>
              </div>
            </div>
          </View>
          <View style={styles.sectionTitle}>
            <Text>APPLICANT DETAILS</Text>
          </View>
          <div style={styles.flexTitleContainer}>
            <div style={styles.flexHeader}>
              <Text>L A Constituency</Text>
            </div>
            <div style={styles.flexHeader}>
              <Text>L S Constituency</Text>
            </div>
            <div style={styles.flexHeader}>
              <Text>Panchayat</Text>
            </div>
            <div style={styles.flexHeader}>
              <Text>Ward</Text>
            </div>
          </div>
          <div style={styles.flexContentContainer}>
            <div style={styles.flexItem}>
              <Text>{req && req.loksabha}</Text>
            </div>
            <div style={styles.flexItem}>
              <Text>{req && req.assembly}</Text>
            </div>
            <div style={styles.flexItem}>
              <Text>{req && req.panchayat}</Text>
            </div>
            <div style={styles.flexItem}>
              <Text>{req && req.ward}</Text>
            </div>
          </div>
          <div style={styles.addressContainer}>
            <div style={styles.addressTitle}>
              <Text>Address</Text>
            </div>
            <div style={styles.addressContent}>
              <Text>{req && req.address}</Text>
              <Text>{req && req.pincode}</Text>
            </div>
          </div>

          <View style={styles.sectionTitle}>
            <Text>REQUEST DESCRIPTION</Text>
          </View>
          <View style={styles.requestDescription}>
            <Text>{req && req.requestBody}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RequestPdf;
