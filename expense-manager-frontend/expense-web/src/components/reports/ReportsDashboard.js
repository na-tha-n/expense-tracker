import React, {useEffect} from "react";
import MonthlyExpenseChart from "./MonthlyExpenseChart.js";
import PendingExpensesReport from "./PendingExpensesReport.js";
import {Grid} from "@mui/material";
import { getCompanyExpensePending } from "../../store/actions/companyAction.js";
import { getCompanyExpenseTotals } from "../../store/actions/companyAction.js";
import { useSelector, useDispatch } from "react-redux";



const ReportsDashboard = () =>{

    const pendingExpenses = useSelector((state) => state.company.companyPending);
    const totals = useSelector((state) => state.company.companyTotals);
    const companyId = useSelector((state) => state.auth.user.company_id)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyExpenseTotals(companyId));
        dispatch(getCompanyExpensePending(companyId));
    }, [dispatch, companyId]);


    return(
        <Grid container 
            sx={{pt:6}}
            >
            <Grid item xs={6}>
                <MonthlyExpenseChart
                    totals={totals}
                />
            </Grid>
            <Grid item xs={4}>
                <PendingExpensesReport
                    pendingExpenses={pendingExpenses}
                />
            </Grid>
        </Grid>
    );
}

export default ReportsDashboard;