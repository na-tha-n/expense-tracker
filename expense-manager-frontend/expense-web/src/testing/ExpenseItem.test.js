import {render, screen} from '@testing-library/react'
import ExpenseItem from '../components/ExpenseItem'

test('Display ExpenseItem Component', ()=>{
    const item = {
        name: 'Name1',
        amount: 20
    }
    render(<ExpenseItem  item={item} />)
    screen.debug()
    ;
});