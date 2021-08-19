import React, { useState, useEffect } from "react";

import { Grid, Box, Typography } from "@material-ui/core";

import DocsDropzone from "../../components/docsDropzone/DocsDropzone";
import DocElement from "../../components/docElement/DocElement";

export default function DocumentUpload({requestFiles, rid, handleDocs}) {
   const [docList, setDocList] = useState(requestFiles);

   const changeDocField = (index, parameter, value) => {
      const newArray = [...docList];
      newArray[index][parameter] = value;
      setDocList(newArray);
   };

   useEffect(() => {
      docList.forEach((doc, index) => {
         if (doc.status === "FINISH" || doc.status === "UPLOADING") return;
         changeDocField(index, "status", "UPLOADING");
         const uploadTask = doc.storageRef.put(doc.file);
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
    handleDocs('FILES')(docList)
   },[docList])

   return (
     <React.Fragment>
       <Typography variant="h6" gutterBottom>
        Upload Related Files
      </Typography>
      <Grid container direction="column" alignItems="center" spacing={2}>
         <Box border={1} margin={4} padding={3}>
            <Grid
               item
               container
               direction="column"
               alignItems="center"
               xs={12}
               spacing={1}
            >
               <Grid item container xs={12} justify="center">
                  <DocsDropzone setDocList={setDocList} rid={rid}/>
               </Grid>
            </Grid>
         </Box>
         {docList.length > 0 && (
            <Box bgcolor="primary.light" p={4}>
               {requestFiles.map((doc, index) => {
                  return (
                     <Grid item key={doc.file.size + index}>
                        <DocElement
                           doc={doc}
                           index={index}
                        />
                     </Grid>
                  );
               })}
            </Box>
         )}
      </Grid>
      </React.Fragment>
   );
}
