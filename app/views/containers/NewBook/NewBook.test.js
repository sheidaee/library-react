import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';

import { NewBook } from './NewBook';
import Spinner from '../../components/UI/Spinner';

configure({ adapter: new Adapter() })

describe('<NewBook', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<NewBook onSetRedirectAfterAdd={() => {} }/>)
    })

    it('should render <Spinner /> when loading prop is true', () => {
        wrapper.setProps({
            loading: true          
        })

        expect(wrapper.contains(<Spinner />)).toEqual(true)
    }) 

    it('should render <Redirect /> if has redirectUrl', () => {
        wrapper.setProps({
            redirectUrl: 'url'
        })

        expect(wrapper.contains(<Redirect to='url'/>)).toEqual(true)
    })    
})