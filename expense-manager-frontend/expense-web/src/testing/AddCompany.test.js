
import {render, screen} from '@testing-library/react'
import AddCompany from '../components/AddCompany'

test('Display AddCompany Component', ()=>{
    const company = {
        name:'Company',
        description:'description of the company that is being added'
    };
    const error= '';
    render(<AddCompany company={company} error={error}/>);
    screen.debug();
});