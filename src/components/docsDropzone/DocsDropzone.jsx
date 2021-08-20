import React from "react";
import { storage } from "../../context/Firebase";
import { useDropzone } from "react-dropzone";
import { Grid, Typography, Button } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";

export default function DocsDropzone({ setDocList, rid }) { 
   const { user } = useAuth()
   const maxSize = 3145728;
   const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
         const newDocs = Array.from(acceptedFiles).map((file) => {
            return {
               file: file,
               fileName: file.name,
               status: "CREATED",
               storageRef: storage.ref().child(`mpportal/user/${user.phoneNumber.slice(3,13)}/${rid}/${file.name}`),
               downloadURL: "",
               description: "",
            };
         });

         setDocList((prevState) => [...prevState, ...newDocs]);
      }
   };

   const {getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles, open} = useDropzone({
      onDrop,
      accept: 'image/jpeg, image/png, image/jpg, audio/*, video/*, application/pdf, application/msword',
      maxSize:{maxSize},
      noClick: true,
      noKeyboard: true,
   });
   const isFileTooLarge = rejectedFiles && rejectedFiles[0].size > maxSize;
   return (
      <div {...getRootProps()}>
         <input {...getInputProps()} />
         <Grid container direction="column" spacing={2}>
            <Grid
               item
               container
               direction="column"
               alignItems="center"
               spacing={1}
            >
                <Grid item>
                  <Typography variant="subtitle1" align="center">
                    Image, audio, video and document files are accepted. <br /> (max-size per file: 3MB)
                 </Typography>
               </Grid>
               <Grid item>
                  <Typography variant="subtitle2" align="center">
                    Upto 3 documents are accepted.
                 </Typography>
               </Grid>
               <Grid item>
                  <Typography variant="h6" align="center">
                     {isDragActive
                        ? (isDragReject ? ("File type not accepted, sorry!"):("Drop Docs here ..."))
                        : "Drag 'n' drop Docs here, or:"}
                    {isFileTooLarge && (
                        <div className="text-danger mt-2">
                        File is too large.
                        </div>
                    )}
                    {isFileTooLarge && "File Size too large"}
                  </Typography>
               </Grid>
               <Grid item>
                  <Button onClick={open} variant="contained" color="primary">
                     Select Docs...
                  </Button>
               </Grid>
            </Grid>
         </Grid>
      </div>
   );
}