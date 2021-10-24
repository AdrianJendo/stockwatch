import { IconButton, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

const styles = (theme) => ({
	root: {
		margin: 0,
		marginLeft: "10px",
		padding: theme.spacing(2),
		paddingBottom: "0px",
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<Close />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

export default DialogTitle;
