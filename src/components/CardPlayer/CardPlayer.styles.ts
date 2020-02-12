import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  audio: {
    display: "none"
  },
  root: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));
