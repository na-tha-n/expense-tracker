import {render, screen} from '@testing-library/react'
import JoinCompany from '../components/JoinCompany'
import {Provider} from "react-redux";
import store from "../store/store.js"

const match = {
    params: {
        company: 999999
    }
};
const MockJoinCompany = () => {
    return (
        <Provider store={store}>
                <JoinCompany 
                    match={match}
                />
        </Provider>
    )
}
describe('Join Company', () => {
    test('Display Join Company Component', ()=>{
        render(<MockJoinCompany/>)
        screen.debug()
        ;
    });
})