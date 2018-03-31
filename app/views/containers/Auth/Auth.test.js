import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';

import { Auth } from './Auth';
import Spinner from '../../components/UI/Spinner';

configure({ adapter: new Adapter() })

describe('<Auth', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<Auth onSetAuthRedirectPath={() => {}} />)
    })

    it('should display error message when error prop is true ', () => {
        wrapper.setProps({
            error: true
        })

        expect(wrapper.find('p')).toHaveLength(1)
    })

    it('should render <Spinner /> when loading prop is true', () => {
        wrapper.setProps({
            loading: true          
        })

        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })

    it('should render <Redirect /> if isAuthenticated', () => {
        wrapper.setProps({
            isAuthenticated: true,
            authRedirectPath: 'url'
        })

        expect(wrapper.contains(<Redirect to='url'/>)).toEqual(true)
    })    
})