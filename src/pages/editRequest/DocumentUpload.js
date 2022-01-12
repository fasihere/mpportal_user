import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Divider } from "@material-ui/core";
import { storage } from "../../context/Firebase";
import { useAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconButton from "@mui/material/IconButton";
import { CircularProgress } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";

export default function DocumentUpload({ requestFiles, rid, handleDocs }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState(requestFiles);
  const [isSizeExceeded, setIsSizeExceeded] = useState(false);
  const [isFileTypeNotAllowed, setIsFileTypeNotAllowed] = useState(false);
  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "application/msword",
    "video/*",
    "audio/*",
  ];

  const maxSize = 3145728;
  const { user } = useAuth();

  const checkIsFileTypeNotAllowed = (file) => {
    if (
      ALLOWED_FILE_TYPES.includes(file.type) ||
      file.type.split("/")[0] === "video" ||
      file.type.split("/")[0] === "audio"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const changeDocField = (index, parameter, value) => {
    const newArray = [...fileList];
    newArray[index][parameter] = value;
    setFileList(newArray);
  };

  useEffect(() => {
    fileList.forEach((item, index) => {
      if (item.status === "FINISH" || item.status === "UPLOADING") return;
      changeDocField(index, "status", "UPLOADING");
      const uploadTask = item.storageRef.put(item.file);
      uploadTask.on(
        "state_changed",
        null,
        function error(err) {
          console.log("Error Doc Upload:", err);
        },
        async function complete() {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          changeDocField(index, "downloadURL", downloadURL);
          changeDocField(index, "status", "FINISH");
        }
      );
    });
  });
  useEffect(() => {
    handleDocs("FILES")(fileList);
  }, [fileList]);

  function handleFileChange(e) {
    setIsSizeExceeded(false);
    setIsFileTypeNotAllowed(false);
    if (e.target.files[0].size > maxSize) {
      setIsSizeExceeded(true);
      setFile(null);
    } else if (!checkIsFileTypeNotAllowed(e.target.files[0])) {
      setIsFileTypeNotAllowed(true);
      setFile(null);
    } else {
      setIsSizeExceeded(false);
      setIsFileTypeNotAllowed(false);
      setFile(e.target.files[0]);
    }
  }

  function handleFileNameChange(e) {
    setFileName(e.target.value);
  }

  function handleAddFile() {
    const newArray = [...fileList];
    newArray.push({
      file: file,
      fileName: fileName,
      status: "CREATED",
      storageRef: storage
        .ref()
        .child(
          `mpportal/user/${user.phoneNumber.slice(3, 13)}/${rid}/${fileName}`
        ),
      downloadURL: "",
      description: "",
    });
    setFileList(newArray);
    setFile(null);
    setFileName("");
  }

  function handleRemoveFile(fileName) {
    const newArray = [...fileList];
    newArray.splice(
      newArray.findIndex((file) => file.fileName === fileName),
      1
    );
    setFileList(newArray);
  }

  function handleDownloadFile(fileName) {
    const file = fileList.find((file) => file.fileName === fileName);
    window.open(file.downloadURL);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Related Files (Optional)
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Files added: {fileList.length}/3
      </Typography>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Box border={1} margin={4} padding={3}>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            xs={12}
            spacing={2}
          >
            <Grid item container xs={12} justify="center">
              <Grid item xs={12}>
                <Typography variant="subtitle1" align="center">
                  Image, audio, video and document files are accepted. <br />{" "}
                  (max-size per file: 3MB)
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="center">
                  Upto 3 documents are accepted.
                </Typography>
              </Grid>
              {file ? (
                <Grid item xs={12} justify="center">
                  <TextField
                    id="outlined-basic"
                    label="File Name"
                    variant="standard"
                    onChange={handleFileNameChange}
                    helperText="Enter a name for this file"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            size="small"
                            onClick={handleAddFile}
                          >
                            Add
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    style={{
                      marginLeft: "50%",
                      transform: "translate(-50%, 0px)",
                      marginTop: "5%",
                    }}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  {fileList.length < 3 ? (
                    <label
                      htmlFor="contained-button-file"
                      style={{
                        marginLeft: "50%",
                        transform: "translate(-50%, 0px)",
                        marginTop: "5%",
                      }}
                    >
                      <input
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none", width: "0px" }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Select File
                      </Button>
                    </label>
                  ) : (
                    <Typography
                      variant="subtitle2"
                      align="center"
                      color="error"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      You cannot add any more files.
                    </Typography>
                  )}
                </Grid>
              )}
              <Grid item xs={12}>
                {isSizeExceeded ? (
                  <Typography
                    variant="subtitle2"
                    align="center"
                    color="error"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    File size exceeded.
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                {isFileTypeNotAllowed ? (
                  <Typography
                    variant="subtitle2"
                    align="center"
                    color="error"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    File type not allowed.
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12} md={6} alignItems="center" justify="center">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" align="center">
            Uploaded Files
          </Typography>
          {fileList.length > 0 ? (
            <List dense={true}>
              {fileList.map((file) => {
                return (
                  <>
                    <ListItem
                      style={
                        file.status === "FINISH"
                          ? { backgroundColor: "#d4edda", width: "100%" }
                          : { width: "100%", backgroundColor: "#f8d7da" }
                      }
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveFile(file.fileName)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      index={file.fileName}
                    >
                      <ListItemText primary={file.fileName} />
                      {file.downloadURL ? (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDownloadFile(file.fileName)}
                        >
                          <FileDownloadIcon />
                        </IconButton>
                      ) : (
                        <CircularProgress size={20} sx={{ ml: 8 }} />
                      )}
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          ) : (
            <Typography variant="subtitle1" align="center">
              -No files uploaded-
            </Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
