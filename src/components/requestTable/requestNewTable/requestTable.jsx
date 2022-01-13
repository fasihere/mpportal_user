import "./requestTable.scss";
import { Table } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import MOCK_DATA from "../../../MOCK_DATA.json";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import DoneIcon from "@material-ui/icons/Done";
import DraftsIcon from "@material-ui/icons/Drafts";
import { useTranslation } from "react-i18next";


export default function RequestTable({ selected, setSelected, date }) {
  console.log("selected", selected);
    const { t } = useTranslation();
  const { user } = useAuth();
  const columns = [
    { key: "1", title: `${t("requestID")}`, dataIndex: "rid" },
    {
      key: "2",
      title: `${t("category")}`,
      dataIndex: "requestCategory",
      sorter: (record1, record2) => {
        return record1.requestCategory > record2.requestCategory;
      },
    },
    {
      key: "3",
      title: `${t("subject")}`,
      dataIndex: "requestSubject",
      sorter: (record1, record2) => {
        return record1.requestSubject > record2.requestSubject;
      },
    },
    {
      key: "4",
      title: `${t("date")}`,
      dataIndex: "postedTime",
      render: (date) => (
        <div>{date.slice(0, 10).split("-").reverse().join("-")}</div>
      ),
      sorter: (record1, record2) => {
        return record1.postedTime > record2.postedTime;
      },
    },
    { key: "5", title: `${t("status")}`, dataIndex: "statusUser" },
    {
      key: "6",
      title: `${t("action")}`,
      render: (rowData) => {
        if (selected === "DRAFT") {
          return (
            <Link className="btn" to={"/draft/" + rowData.rid + "/view"}>
              {t("view")}
            </Link>
          );
        }
        return (
          <Link className="btn" to={"/request/" + rowData.rid + "/view"}>
            {t("view")}
          </Link>
        );
      },
    },
  ];
  const [data, setData] = useState([]);
  const baseUrl =
    "https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests/";
  function yyyymmdd(dateIn) {
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    return (
      String(10000 * yyyy + 100 * mm + dd).slice(0, 4) +
      "-" +
      String(10000 * yyyy + 100 * mm + dd).slice(4, 6) +
      "-" +
      String(10000 * yyyy + 100 * mm + dd).slice(6, 8)
    ); // Leading zeros for mm and dd
  }
  useEffect(() => {
    const fetchData = async () => {
      console.log(await user.getIdToken());
      if (date) {
        try {
          const config = {
            headers: {
              Authorization: "Bearer " + (await user.getIdToken()),
            },
          };
          const body = {
            statusUser: selected,
            date: yyyymmdd(date),
          };
          const res = await axios.post(baseUrl, body, config);
          setData(res.data.details);
          console.log(yyyymmdd(date));
          res && console.log("Fetched requests using Date");
        } catch (err) {
          console.log(err.response);
          if (err.response && err.response.data.details == "No requests yet") {
            setData([]);
          }
        }
      } else {
        try {
          const config = {
            headers: {
              Authorization: "Bearer " + (await user.getIdToken()),
            },
          };
          const body = { statusUser: selected };
          console.log("body :", body);
          const res = await axios.post(baseUrl, body, config);
          console.log(await user.getIdToken());
          setData(res.data.details);
          res && console.log("Fetched requests");
          console.log("response", res);
        } catch (err) {
          console.log(await user.getIdToken());
          console.log(err.response);
          if (err.response && err.response.data.details == "No requests yet") {
            setData([]);
          }
        }
      }
    };
    fetchData();
  }, [selected, date]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="requestTable">
      <h1 style={{ align: "center" }}>{t(`${selected}`)}</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        variant="fullWidth"
        className="tabsForMob"
      >
        <Tab
          icon={<HourglassFullIcon />}
          label={t("PENDING")}
          onClick={() => setSelected("PENDING")}
        />
        <Tab
          icon={<DoneIcon />}
          label={t("COMPLETED")}
          onClick={() => setSelected("COMPLETED")}
        />
        <Tab
          icon={<DraftsIcon />}
          label={t("DRAFT")}
          onClick={() => setSelected("DRAFT")}
        />
      </Tabs>
      <Table columns={columns} dataSource={data} pagination={true} />
    </div>
  );
}
