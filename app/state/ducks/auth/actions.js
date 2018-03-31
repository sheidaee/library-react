import * as types from './types';

export const loginComplete = ( idToken, userId ) => ( {
    type: types.LOGIN_COMPLETED,
    payload: {
        idToken, userId
    }
} );

export const loginFail = ( error ) => ( {
    type: types.LOGIN_FAILED,
    payload: { error }
} );

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: types.LOGOUT
    }
}

export const initializeAuth = ( ) => ( {
    type: types.INITIALIZE,
} );

export const setRedirectAfterLogin = ( url ) => ( {
    type: types.SET_REDIRECT_AFTER_LOGIN,
    payload: { url }
} );