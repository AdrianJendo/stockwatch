import { makeStyles, alpha } from "@material-ui/core";

export const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: props.headerHeight,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      width: `${240}px`,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
        // marginRight: theme.spacing(2),
        textAlign: "center",
      },
    },
    toolbar: {
      padding: 0,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
      },
    },
  }));
