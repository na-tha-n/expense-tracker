import {fireEvent, render, screen} from '@testing-library/react'
import SignupPage from '../components/containers/SignupPage'
import store from "../store/store.js"
import {Provider} from "react-redux";

const MockSignupPage = () => {
    return (
        <Provider store={store}>
            <SignupPage>

            </SignupPage>
        </Provider>
    );
}

describe("Signup Page", () => {

    test('Display SignupPage Component', ()=>{
        render(<MockSignupPage/>)
        screen.debug();
    });

    test("User input email", () => {
        render(<MockSignupPage />);
        const element = screen.getByRole('textbox', {
            name: /email/i
        } );
        fireEvent.change(element, {target: {value: 'test123@test.com'}});
        expect(element.value).toBe('test123@test.com');
    });

    test("User input first name", () => {
        render(<MockSignupPage />);
        const element = screen.getByRole('textbox', {
            name: /first name/i
        } );
        fireEvent.change(element, {target: {value: 'Fname'}});
        expect(element.value).toBe('Fname');
    });

    test("User input last name", () => {
        render(<MockSignupPage />);
        const element = screen.getByRole('textbox', {
            name: /last name/i
        } );
        fireEvent.change(element, {target: {value: 'Lname'}});
        expect(element.value).toBe('Lname');
    });

    test("User input password", () => {
        render(<MockSignupPage />);
        const passElement = screen.getByLabelText("Password");
        fireEvent.change(passElement, {target: {value: '123456'}});
        expect(passElement.value).toBe("123456");
    });

    test("User input confirm pass", () => {
        render(<MockSignupPage />);
        const passElement = screen.getByLabelText(/confirm password/i);
        fireEvent.change(passElement, {target: {value: '123456'}});
        expect(passElement.value).toBe("123456");
    });

    test("input incorrect confirmPassword", () => {
        render(<MockSignupPage />);
        const passElement = screen.getByLabelText("Password");
        const confirmPassElement = screen.getByLabelText(/confirm password/i);
        const button = screen.getByRole('button', {
            name: /Sign Up/i
        })
        fireEvent.change(passElement, {target: {value: '123456'}});
        fireEvent.change(confirmPassElement, {target: {value: '1234567'}});
        
        expect(button).toHaveClass('Mui-disabled')
    });

    test("input correct confirmPassword", () => {
        render(<MockSignupPage />);
        const passElement = screen.getByLabelText("Password");
        const confirmPassElement = screen.getByLabelText(/confirm password/i);
        const button = screen.getByRole('button', {
            name: /Sign Up/i
        })
        fireEvent.change(passElement, {target: {value: '123456'}});
        fireEvent.change(confirmPassElement, {target: {value: '123456'}});
        
        expect(button).not.toHaveClass('Mui-disabled')
    });





})