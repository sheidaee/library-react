import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BookBoard } from './BookBoard';
import BookList from '../../components/Book/BookList';
import Spinner from '../../components/UI/Spinner';

configure({ adapter: new Adapter() })

describe('<BookBoard />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BookBoard onFetchList={() => {} }/>)
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

    it('should render <BookList /> when receiving books', () => {
        wrapper.setProps({ books: [{
            id: '1',
            title: 'title',
            description: 'description',
            image: 'image', 
        }] })
        
        expect(wrapper.find(BookList)).toHaveLength(1)
    })
})
