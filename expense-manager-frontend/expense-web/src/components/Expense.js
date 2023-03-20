import React from "react";
import ExpenseItem from "./ExpenseItem";
import { Button, Container, Typography, Box, Stack, Divider, List} from "@mui/material";




const Expense = (props) => {
    return (
        <Container maxWidth="xs" align="center">
            <Box
                sx={{
                    marginTop: 8,
                }}
            >
                <Box sx={{ pb: 2 }}>
                    <Typography 
                        component="h1" 
                        variant="h5"
                        >
                        Expense
                    </Typography>
                </Box>

                <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start" 

                    >
                    <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'left', pb: 1}}
                            >
                            Title
                    </Typography>
                    <Typography 
                            paragraph
                            variant="h7"
                            sx ={{textAlign: 'left', pb: 2}}
                            >
                            {props.currentExpense.title}
                    </Typography>
                </Stack>


                {/* <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start" 

                    >
                    <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'left', pb: 1}}
                            >
                            User 
                    </Typography>
                    <Typography 
                            paragraph
                            variant="h7"
                            sx ={{textAlign: 'left', pb: 2}}
                            >
                            {props.currentExpense.user_name}
                    </Typography>
                </Stack> */}
                <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start" 

                    >
                    <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'left', pb: 1}}
                            >
                            Created On 
                    </Typography>
                    <Typography 
                            paragraph
                            variant="h7"
                            sx ={{textAlign: 'left', pb: 2}}
                            >
                            {props.currentExpense.created_date}
                    </Typography>
                </Stack>
                <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start" 

                    >
                    <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'left', pb: 1}}
                            >
                            Vendor 
                    </Typography>
                    <Typography 
                            paragraph
                            variant="h7"
                            sx ={{textAlign: 'left', pb: 2}}
                            >
                            {props.currentExpense.vendor}
                    </Typography>
                </Stack>
                

                <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start" 

                    >
                    <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'left', pb: 1}}
                            >
                            Description
                    </Typography>
                    <Typography 
                            paragraph
                            variant="h7"
                            sx ={{textAlign: 'right', pb: 2}}
                            >
                            {props.currentExpense.description}
                    </Typography>
                </Stack>
                <Divider sx={{ pb: 2 }} />
                <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'center', pb: 2, pt:4}}
                            >
                            Items
                </Typography>
                <List sx={{overflow: 'auto'}}>
                {props.currentExpense.items && props.currentExpense.items.map((item) => 
                    <ExpenseItem 
                        item={item}
                    />
                )}
            </List>
            <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start" 

                    >
                    <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'left', pb: 1}}
                            >
                            Total  
                    </Typography>
                    <Typography 
                            paragraph
                            variant="h7"
                            sx ={{textAlign: 'left', pb: 2}}
                            >
                            ${props.currentExpense.total}
                    </Typography>
                </Stack>
            <Divider sx={{ pb: 2 }} />
            <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start"
                    sx={{ pt: 4 }} 

                    >
                    <Typography 
                            variant="h5"
                            align="left"
                            sx ={{textAlign: 'left', pb: 1}}
                            >
                            Status  
                    </Typography>
                    <Typography 
                            paragraph
                            variant="h7"
                            sx ={{textAlign: 'left', pb: 2}}
                            >
                            {props.currentExpense.status}
                    </Typography>
                </Stack>
                <Stack 
                    spacing={2} 
                    direction="row" 
                    justifyContent="center" 
                    alignItems="flex-start"
                    sx={{ pt: 4 }} 

                    >
                    <Button
                        //TODO Verify what the return status will be
                        disabled = {props.currentExpense.status !== 'Submitted'}
                        onClick={() => props.handleApprove(props.currentExpense)}
                    >
                        Approve
                    </Button>
                    <Button
                        //TODO Verify what the return status will be
                        disabled = {props.currentExpense.status !== 'Submitted'}
                        onClick={() => props.handleReject(props.currentExpense)}
                    >
                        Reject
                    </Button>
                    <Button
                        size="lg"
                        variant="contained"
                        onClick={(e) => props.handleClose(e)}
                    >
                        Cancel
                    </Button>
                </Stack>

            </Box>
        </Container>
    );
};

export default Expense;
