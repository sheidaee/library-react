import axios from 'axios';

import { loginComplete, loginFail, logout, initializeAuth, setRedirectAfterLogin } from './actions';

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

const login = ( email, password, isSignUp ) => ( dispatch ) => {
    dispatch(initializeAuth());

    const authData = {
        email, password, returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDtm7HX3aJ6pQcY3ErOefqR0ClyzXYq1oA';

    if (!isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDtm7HX3aJ6pQcY3ErOefqR0ClyzXYq1oA';
    }

    axios.post(url, authData)
        .then(response => {
            //console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); 
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)

            dispatch(loginComplete(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch( err => {
            dispatch(loginFail(err.response.data.error));                
        })
}

const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))

            if (expirationDate <= new Date()) {
                dispatch(logout())
            }
            else {
                const userId = localStorage.getItem('userId')
                dispatch(loginComplete(token, userId))
                // get time in milliseconds
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export {    
    login,  
    setRedirectAfterLogin,
    logout,
    authCheckState
};