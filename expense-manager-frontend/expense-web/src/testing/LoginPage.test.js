import {fireEvent, render, screen} from '@testing-library/react'
import LoginPage from '../components/containers/LoginPage'
import store from "../store/store.js"
import {Provider} from "react-redux";

const MockLoginPage = () => {
    return (
        <Provider store={store}>
            <LoginPage>

            </LoginPage>
        </Provider>
    );
}

describe("Login Page", () => {

    test('Display Login Component', ()=>{
        render(<MockLoginPage/>)
        screen.debug();
    });

    test("User input email", () => {
        render(<MockLoginPage />);
        const emailElement = screen.getByLabelText(/email/i);
        fireEvent.change(emailElement, {target: {value: 'test123@test.com'}});
        expect(emailElement.value).toBe('test123@test.com');
    });

    test("User input password", () => {
        render(<MockLoginPage />);
        const passElement = screen.getByLabelText(/password/i);
        fireEvent.change(passElement, {target: {value: '123456'}});
        expect(passElement.value).toBe("123456");
    });



})