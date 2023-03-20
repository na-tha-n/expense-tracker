import React from "react";
import { 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    Stack, 
  } from "@mui/material";


const PendingExpensesReport = (props) =>{
    return (
        <React.Fragment>
            
            <Typography variant="h4" sx={{pb:2}}>Pending Expense Report </Typography>
            <List sx={{overflow: 'auto', maxHeight: '40vh' }}>
                {props.pendingExpenses !== "Not Found" && props.pendingExpenses.map((expense, index) => 
                    <React.Fragment>
                        <Stack 
                            spacing={4} 
                            direction="row" 
                            sx={{padding: 2}} 
                            key={index}
                        >
                            <ListItemText 
                                primary= {expense.user_name}
                                key={index + 'user-name'}
                            />
                            <ListItemText  
                                primary= {expense.title}
                                secondary={expense.created_date}
                                key={index + 'expense'}
                            />
                            <ListItem key={index + 'total'}>
                                <Typography key={index + 'total-amount'}>${expense.total}</Typography>
                            </ListItem>

                        </Stack>
                        
                        
                    </React.Fragment>
                )}
                {props.pendingExpenses === "Not Found" &&
                    <Typography variant="paragraph">
                        No Expenses Pending
                    </Typography>
                }
            </List>
            
        </React.Fragment>
    );
}

export default PendingExpensesReport;