import {fireEvent, render, screen} from '@testing-library/react'
import NavBar from '../components/nav/NavBar.js';
import store from "../store/store.js"
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const MockNavBar = () => {
    return (
        <Provider store = {store}>
            <BrowserRouter>
                <NavBar>

                </NavBar>
            </BrowserRouter>
        </Provider>
    )

}

describe("Nav Bar", () => {

    test("Render NavBar", () => {
        render(<MockNavBar/>)
        screen.debug();
    });

    test("Home button exits", () => {
        render(<MockNavBar/>);
        const button = screen.getByRole('link', {
            name:/Express Expense/i
        })
        expect(button).toBeVisible();
    })
})