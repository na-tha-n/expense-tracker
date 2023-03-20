import React, { useState, useEffect }from "react";
import Expense from '../Expense'
import { useDispatch, useSelector, } from 'react-redux';
import { approveExpense } from "../../store/actions/expenseAction";
import { rejectExpense } from "../../store/actions/expenseAction";
import { useLocation } from "react-router-dom";




const ExpensePage = (props) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [expenseId] = useState(location.expenseId);
    const [companyId] = useState(location.companyId);
    const currentExpense = useSelector((state) => state.expense.currentExpense);
    console.log(currentExpense);

    useEffect(() => {
        //setCurrentExpense( useSelector((state) => state.expense.currentExpense))
     }, [dispatch, expenseId, companyId]);


    const handleApprove = (selectedExpense) => {
        dispatch(approveExpense(selectedExpense.id, companyId))
        props.history.push({
            pathname:"/expenses",
        })
    }

    const handleReject = (selectedExpense) => {
        dispatch(rejectExpense(selectedExpense.id, companyId))
        props.history.push({
            pathname:"/expenses",
        })
    }

    const handleClose = () =>{
        props.history.push({
            pathname:"/expenses",
        })
    }

    return (
       <Expense 
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleClose={handleClose}
            currentExpense={currentExpense}
       />
    );
};

export default ExpensePage;
