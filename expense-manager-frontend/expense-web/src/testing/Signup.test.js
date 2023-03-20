
import {render, screen} from '@testing-library/react'
import Signup from '../components/Signup'


test('Display Signup Component', ()=>{
    const user = {
        email:'test@test.com',
        first_name:'test',
        last_name:'test2',
        password:'password123',
        errors: {
            email: "Invalid Email"
        }
    }
    const error= ''
    const confirmPassword='password123'
    render(<Signup user={user} error={error} confirmPassword={confirmPassword} />)
    screen.debug()
    ;
});