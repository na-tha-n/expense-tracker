import {fireEvent, render, screen} from '@testing-library/react'
import ExpensePage from '../components/containers/ExpensePage'
import store from "../store/store.js"
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const MockExpensePage = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ExpensePage>

                </ExpensePage>
            </BrowserRouter>
        </Provider>
    );
}

describe("Expense Page", () => {


    test("Render Expense Page", () => {
        render(<MockExpensePage/>)
        screen.debug();
    });
})
