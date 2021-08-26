import React from "react";

import {
   Paper,
   Grid,
   CircularProgress,
   Box
} from "@material-ui/core";

export default function DocElement({ doc, index }) {
   return (
      <Box my={2} width={400}>
         <Paper>
            <Grid container direction="row" justify="center" spacing={2}>
               <Grid item container alignItems="center" justify="center">
                  {doc.downloadURL ? (
                     <a href={doc.downloadURL} target="_blank">{index+1}. {doc.fileName}</a>
                  ) : (
                     <Box p={2}>
                        <CircularProgress />
                     </Box>
                  )}
               </Grid>
            </Grid>
         </Paper>
      </Box>
   );
}