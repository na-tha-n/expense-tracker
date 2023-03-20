
import {fireEvent, render, screen} from '@testing-library/react'
import Login from '../components/Login'

const MockLogin = () => {
    const user = {
        email:'test@test.com',
        password:'password123',
        
    }
    const error= ''

    return (<Login 
        user={user} 
        error={error} 
        handleChange={() => {}}/>
        );
}

describe("Login", () => {
    test('Display Login Component', ()=>{
        render(<MockLogin/>)
        screen.debug()
        ;
    });

    test("User default email", () => {
        render(<MockLogin />);
        const emailElement = screen.getByLabelText(/email/i);
        expect(emailElement.value).toBe("test@test.com");
    })

    test("User default password", () => {
        render(<MockLogin />);
        const passElement = screen.getByLabelText(/password/i);
        expect(passElement.value).toBe("password123");
    })

})
