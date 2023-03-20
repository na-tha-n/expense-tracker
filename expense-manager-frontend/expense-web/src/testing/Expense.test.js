import {render, screen} from '@testing-library/react'
import Expense from '../components/Expense'

describe("Expense", () => {
    test('Display Expense Component', ()=>{
        const expense = {
            id:4,
            title:'test',
            created_on:'10/11/21',
            vendor:'vend',
            description: 'description',
            items:[
                {
                    name: 'Name1',
                    amount: 20
                }
            ]
        }
        render(<Expense  currentExpense={expense} />)
        screen.debug()
        ;
    });

    test('Approve Button Enabled', () => {
        const expense = {
            id:4,
            title:'test',
            created_on:'10/11/21',
            vendor:'vend',
            description: 'description',
            status: 'Submitted',
            items:[
                {
                    name: 'Name1',
                    amount: 20
                }
            ]
        }
        render(<Expense  currentExpense={expense} />)
        const approveButton = screen.getByRole('button', {
            name: /Approve/i
        })
        expect(approveButton).not.toHaveClass('Mui-disabled')
    })

    test('Reject Button Enabled', () => {
        const expense = {
            id:4,
            title:'test',
            created_on:'10/11/21',
            vendor:'vend',
            description: 'description',
            status: 'Submitted',
            items:[
                {
                    name: 'Name1',
                    amount: 20
                }
            ]
        }
        render(<Expense  currentExpense={expense} />)
        const Button = screen.getByRole('button', {
            name: /Reject/i
        })
        expect(Button).not.toHaveClass('Mui-disabled')
    })

    test('Approve Button Disabled', () => {
        const expense = {
            id:4,
            title:'test',
            created_on:'10/11/21',
            vendor:'vend',
            description: 'description',
            status: 'Approved',
            items:[
                {
                    name: 'Name1',
                    amount: 20
                }
            ]
        }
        render(<Expense  currentExpense={expense} />)
        const approveButton = screen.getByRole('button', {
            name: /Approve/i
        })
        expect(approveButton).toHaveClass('Mui-disabled')
    })


    test('Reject Button Disabled', () => {
        const expense = {
            id:4,
            title:'test',
            created_on:'10/11/21',
            vendor:'vend',
            description: 'description',
            status: 'Approved',
            items:[
                {
                    name: 'Name1',
                    amount: 20
                }
            ]
        }
        render(<Expense  currentExpense={expense} />)
        const rejectButton = screen.getByRole('button', {
            name: /Reject/i
        })
        expect(rejectButton).toHaveClass('Mui-disabled')
    })
})
