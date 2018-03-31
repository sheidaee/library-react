import * as types from './types';
import { createReducer } from '../../utils';
import { updateObject } from '../../../utilities';

/* State shape 
{
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
} */

/* 
List completed reducer 

this will get called after ending ajax request
and set books to store and false for error by using update date
make changes immutable
*/

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authReducer = createReducer( initialState )({        
    [types.LOGIN_COMPLETED]: (state, action) => updateObject(state, {
        token  : action.payload.idToken,
        userId : action.payload.userId,
        error  : null,
        loading: false
    }),        
    [types.LOGIN_FAILED]: (state, action) => updateObject(state, {      
        error  : action.payload.error,
        loading: false
    }),   
    [types.LOGOUT]: (state, action) => updateObject(state, { token: null, userId: null }),                   
    [types.SET_REDIRECT_AFTER_LOGIN]: (state, action) => updateObject(state, { authRedirectPath: action.payload.url }),
});


export default authReducer;