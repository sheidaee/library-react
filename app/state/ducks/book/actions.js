import * as types from './types';

export const fetchListComplete = (books) => ({
    type: types.FETCH_LIST_COMPLETED,
    payload: {
        books
    }    
});

export const fetchListFailed = () => {
    return {
        type: types.FETCH_LIST_FAILED
    }
}

export const fetchDetailsComplete = (book) => ({
    type: types.FETCH_DETAILS_COMPLETED,
    payload: {
        book
    }
});

export const fetchDetailsFailed = () => {
    return {
        type: types.FETCH_DETAILS_FAILED        
    }
}

export const resetDetails = () => {
    return {
        type: types.RESET_DETAILS
    }
}

export const addInit = () => ({
    type: types.ADD_INIT,
});

export const addComplete = (id, book) => ({
    type: types.ADD_COMPLETED,
    payload: {        
        book: { ...book, id }
    }
});

export const addFailed = (error) => {
    return {
        type: types.ADD_FAILED,
        payload: {
            error
        }
    }
}

export const setRedirectAfterAdd = (url) => {
    return {
        type: types.SET_REDIRECT_AFTER_ADD,
        payload: {
            url
        }
    }
}