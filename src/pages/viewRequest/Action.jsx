import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  Typography,
  Collapse,
  styled,
  TextField,
  makeStyles,
  Button,
  Divider,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { Edit, Reply, Done, Cancel } from "@material-ui/icons";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  actionCard: {
    width: "90%",
    margin: "2% 5%",
  },
  textField: {
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Action({
  aid,
  actionSubject,
  actionBody,
  actionNo,
  actionReply,
}) {
  const [reply, setReply] = useState(actionReply);
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.actionCard}>
      <CardHeader subheader={`Subject:  ${actionSubject}`} />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack divider={<Divider flexItem />} spacing={2}>
            <Typography variant="body2" align="center">
              Description
            </Typography>

            <Typography variant="body2">{actionBody}</Typography>
          </Stack>
          <Stack divider={<Divider flexItem />} spacing={2}>
            <Typography variant="body2" align="center">
              Attachments
            </Typography>
            <Typography variant="body2">No attachments</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        {actionReply && (
          <Button
            onClick={handleExpandClick}
            color="primary"
            variant={expanded ? "outlined" : "contained"}
            size="small"
          >
            {expanded ? "Hide" : "view"} Reply
          </Button>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack divider={<Divider flexItem />} spacing={2}>
              <Typography variant="body2" align="center">
                Reply
              </Typography>

              <Typography variant="body2">{actionReply}</Typography>
            </Stack>
            <Stack divider={<Divider flexItem />} spacing={2}>
              <Typography variant="body2" align="center">
                Attachments
              </Typography>
              <Typography variant="body2">No attachments</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
