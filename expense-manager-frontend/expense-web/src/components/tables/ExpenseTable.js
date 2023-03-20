import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyExpenses } from "../../store/actions/companyAction";
import { getExpense } from "../../store/actions/expenseAction"
import { Typography, Container, Button, Stack, TableRow, TableCell, TableBody, TableHead, Table } from "@mui/material";

const columns = [
     'Title', 'Total Amount', 'Submitted By', 'Date', 'Status', 'Review'
];


const ExpenseTable = (props) => {
    const expenses = useSelector((state) => state.company.companyExpenses)
    const companyId = useSelector((state) => state.auth.user.company_id)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyExpenses(companyId))
    }, [dispatch, companyId]);

    const handleClick = (selectedExpense) =>{
        dispatch(getExpense(selectedExpense.id, companyId))
        props.history.push({
            pathname:"/expense",
            state:{
                expenseId: selectedExpense.id,
                companyId: companyId
            }
        })
        
    }



    return (
        <Container sx={{ pt: 4 }}>
            <Stack spacing={4} direction="row">
                <Typography variant="h4">Expenses </Typography>
            </Stack>
            <div style={{ height: 600 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow component="th">
                            {columns.map((col) => (
                                <TableCell>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {expenses.map((row) => (
                            <TableRow>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.total}</TableCell>
                                <TableCell>{row.user_name}</TableCell>
                                <TableCell>{row.created_date}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleClick(row)}
                                    >
                                        Review
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Container>

    );
};

export default ExpenseTable;
