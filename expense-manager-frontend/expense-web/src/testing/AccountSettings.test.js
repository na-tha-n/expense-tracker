
import {render, screen} from '@testing-library/react'
import Signup from '../components/Signup'

test('Display AccountSettings Component', ()=>{
    const user = {
        email:'test@test.com',
        first_name:'test',
        last_name:'test2',
        id:2,
        department:'department',
        errors: {
            email: "Invalid Email"
        }
    }

    const userUpdated = {
        email:'test@test.com',
        first_name:'test',
        last_name:'test2',
        password:'',
        id:2,
        confirmPassword:'',
        department:'department',
        errors: {
            email: "Invalid Email"
        }
    }
    render(<Signup user={user} userUpdated={userUpdated}  />)
    screen.debug()
    ;
});