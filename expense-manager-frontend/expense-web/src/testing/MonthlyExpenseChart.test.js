


import {render, screen} from '@testing-library/react'
import MonthlyExpenseChart from '../components/reports/MonthlyExpenseChart'

test('Display MonthlyExpenseChart Component', ()=>{
    const totals = [
        {month: 'Jan', amount: 100},
        {month: 'Feb', amount: 400},
        {month: 'Mar', amount: 600},
        {month: 'April', amount: 100},


    ];
    render(<MonthlyExpenseChart totals={totals}  />)
    screen.debug();
});