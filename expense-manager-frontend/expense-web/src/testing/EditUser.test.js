
import {render, screen} from '@testing-library/react'
import EditUser from '../components/EditUser'
import {Provider} from "react-redux";
import store from "../store/store.js"

const user = {
    id:4,
    first_name:'test',
    last_name:'test2',
    department:'dept',
    role: 'role'
}
const MockEditUser = () => {
    return (
        <Provider store={store}>
                <EditUser user = {user} />
        </Provider>
    )
}
describe('Edit User', () => {
    test('Display EditUser Component', ()=>{
        render(<MockEditUser/>)
        screen.debug()
        ;
    });
})
