import { combineReducers } from 'redux';

import * as types from './types';
import { createReducer } from '../../utils';
import { updateObject } from '../../../utilities';

/* State shape 
{
    books: array,
    book:array,
    error: bool
} */

/* 
List completed reducer 

this will get called after ending ajax request
and set books to store and false for error by using update date
make changes immutable
*/

const addCompleted = (state, action) => {
    return (state.books)
    ? updateObject(state, { books: state.books.concat(action.payload.book), error: false, loading: false, })
    : updateObject(state, { error: false, loading: false, })
}

const listReducer = createReducer([])({        
    [types.FETCH_LIST_COMPLETED]  : (state, action) => updateObject( state, { books: action.payload.books, error: false } ),
    [types.FETCH_LIST_FAILED]     : (state, action) => updateObject( state, { error: true } ),

    [types.ADD_INIT]              : (state, action) => updateObject(state, { loading: true }),
    [types.ADD_COMPLETED]         : (state, action) => addCompleted(state, action),
    [types.ADD_FAILED]            : (state, action) => updateObject(state, { error: action.payload.error, loading: false }),
    [types.SET_REDIRECT_AFTER_ADD]: (state, action) => updateObject(state, { redirectUrl: action.payload.url }),
});

const detailsReducer = createReducer([])({
    [types.FETCH_DETAILS_COMPLETED]: (state, action) => updateObject( state, { book: action.payload.book, error: false } ),
    [types.FETCH_DETAILS_FAILED]   : (state, action) => updateObject( state, { error: true } ),
    [types.RESET_DETAILS]          : (state, action) => updateObject(state, { book: null, error: false}),
});

export default combineReducers({
    list   : listReducer,
    details: detailsReducer
});