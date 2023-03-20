
import {render, screen} from '@testing-library/react'
import Landing from '../components/Landing'

test('Display Landing Component', ()=>{
    render(<Landing />)
    screen.debug()
    ;
});