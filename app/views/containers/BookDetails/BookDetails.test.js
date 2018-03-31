import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BookDetails } from './BookDetails';
import Spinner from '../../components/UI/Spinner';

configure({ adapter: new Adapter() })

describe('<BookDetails />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
        <BookDetails 
            match={{ params: { id: 1 } }}
            onFetchBook={() => {}} />)
    })

    it('should display error message when error prop is true ', () => {
        wrapper.setProps({
            error: true
        })

        expect(wrapper.find('p')).toHaveLength(1)
    })

    it('should render <Spinner /> when error prop is false and books is null', () => {
        wrapper.setProps({
            books: null, error: false
        })

        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })

    it('should display book details when receiving book', () => {
        wrapper.setProps({
            book: {}
        })

        expect(wrapper.find('img')).toHaveLength(1)
    })    
})
