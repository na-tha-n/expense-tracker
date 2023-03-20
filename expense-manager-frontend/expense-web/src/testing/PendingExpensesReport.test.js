


import {render, screen} from '@testing-library/react'
import PendingExpensesReport from '../components/reports/PendingExpensesReport'

test('Display PendingExpenses Component', ()=>{
    const pendingExpenses = [
        {
            title:"Textbooks",
            subtitle:"John submitted at 9/21/2021",
            initials: "JD",
            totalAmount:500
        },
        {
            title:"Coffee",
            subtitle:"Anthony submitted at 9/26/2021",
            initials: "AA",
            totalAmount:5
        },
        {
            title:"Lunch",
            subtitle:"Jeff submitted at 9/20/2021",
            initials: "JL",
            totalAmount:20
        },
    ];
    render(<PendingExpensesReport pendingExpenses={pendingExpenses}  />)
    screen.debug();
});