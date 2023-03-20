import {fireEvent, render, screen} from '@testing-library/react'
import UserTable from '../components/tables/UserTable'
import store from "../store/store.js"
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const MockUserTable = () => {
    return (
        <Provider store = {store}>
            <BrowserRouter>
                <UserTable>

                </UserTable>
            </BrowserRouter>
        </Provider>
    )

}

describe("User Table", () => {


    test("Render UserTable", () => {
        render(<MockUserTable/>)
        screen.debug();
    });

})