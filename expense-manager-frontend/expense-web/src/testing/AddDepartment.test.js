import {render, screen} from '@testing-library/react'
import AddDepartment from '../components/AddDepartment'
import {Provider} from "react-redux";
import store from "../store/store.js"

const department = {
    name: "name",
    description: "description"
};

const MockAddDepartment = () => {
    return (
        <Provider store={store}>
                <AddDepartment  
                    department={department}
                />
        </Provider>
    )
}
describe('Add Department', () => {
    test('Display AddDepartment Component', ()=>{
        render(<MockAddDepartment/>)
        screen.debug()
        ;
    });
})