import React from "react";
import { Container, Draggable } from "react-smooth-dnd";
import PropTypes from "prop-types";
import { applyDrag } from "./utils";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, Clear } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	itemStyle: {
		margin: theme.spacing(0, 3),
	},
}));

const DragDropList = (props) => {
	const { items, setItems, handleRemove, lookupKey } = props;
	const classes = useStyles();

	return (
		<Container
			onDrop={(e) => setItems(applyDrag(items, e))}
			style={{ height: "calc(100% - 30px)" }}
		>
			{items.map((item, index) => {
				return (
					<Draggable key={index}>
						<div className={classes.itemStyle}>
							{item[lookupKey]} <Menu />
							<IconButton onClick={() => handleRemove(item)}>
								<Clear />
							</IconButton>
						</div>
					</Draggable>
				);
			})}
		</Container>
	);
};

DragDropList.defaultProps = {
	lookupKey: "label",
};

DragDropList.propTypes = {
	items: PropTypes.array.isRequired,
	setItems: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	lookupKey: PropTypes.string.isRequired,
};

export default DragDropList;