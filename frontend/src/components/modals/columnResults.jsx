import React from "react";
import findIndex from "components/helpers/findIndex.js";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Check } from "@mui/icons-material";

const ColumnResults = (props) => {
    const { column, selectedColumns, handleToggleFromSelection } = props;
    return (
        <ListItem
            button
            onClick={() => handleToggleFromSelection(column)}
            key={column.id}
        >
            {findIndex(selectedColumns, column.label) !== -1 && (
                <ListItemIcon>
                    <Check fontSize="medium" />
                </ListItemIcon>
            )}
            <ListItemText
                disableTypography
                secondary={
                    <Typography
                        sx={
                            findIndex(selectedColumns, column.label) !== -1
                                ? {
                                      color: "green",
                                  }
                                : {}
                        }
                    >
                        {column.label}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default ColumnResults;
