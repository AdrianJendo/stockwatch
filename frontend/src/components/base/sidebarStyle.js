import { makeStyles } from "@material-ui/core/styles";

export const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      width: props.drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: props.drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }));
