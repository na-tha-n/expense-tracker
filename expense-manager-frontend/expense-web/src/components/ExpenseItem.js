import React from "react";
import { Typography, ListItemText, ListItem } from "@mui/material";



const ExpenseItem = (props) => {
    console.log(props.item)
    return (
        <ListItem>
            <ListItemText
                primary={props.item.name}
            >
            </ListItemText>
            <Typography>${props.item.amount}</Typography>
        </ListItem>

    );
};

export default ExpenseItem;
