
import {render, screen} from '@testing-library/react'
import EditDepartment from '../components/EditDepartment'
import {Provider} from "react-redux";
import store from "../store/store.js"

const department = {
    name: "name",
    description: "description"
};

const MockEditDepartment = () => {
    return (
        <Provider store={store}>
                <EditDepartment  
                    department={department}
                />
        </Provider>
    )
}
describe('Edit Department', () => {
    test('Display EditDepartment Component', ()=>{
        render(<MockEditDepartment/>)
        screen.debug()
        ;
    });
})
