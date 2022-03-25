import { IconButton, Typography, DialogTitle, styled } from "@mui/material";
import { Close } from "@mui/icons-material";

const StyledMuiDialogTitle = styled(DialogTitle)(({ theme }) => ({
    margin: 0,
    marginLeft: "10px",
    padding: theme.spacing(2),
    paddingBottom: "0px",
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
}));

const ModalHeader = (props) => {
    const { children, onClose } = props;
    return (
        <StyledMuiDialogTitle>
            {children}
            {onClose ? (
                <StyledCloseButton aria-label="close" onClick={onClose}>
                    <Close />
                </StyledCloseButton>
            ) : null}
        </StyledMuiDialogTitle>
    );
};

export default ModalHeader;
