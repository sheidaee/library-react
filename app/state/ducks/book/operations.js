import { 
    fetchListComplete, 
    fetchListFailed, 
    fetchDetailsComplete, 
    fetchDetailsFailed, 
    resetDetails,
    addComplete,
    addFailed,
    addInit,
    setRedirectAfterAdd
} from './actions';
import { axios, updateObject } from './../../../utilities';

const fetchList = (token, userId, personal = false) => (dispatch) => {
    let url = 'books.json';
    if (token && userId && personal) {
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        url = `personalBooks.json${queryParams}`;
    }
    axios.get(url)
        .then(response => {
            let books = [];

            /* adding ID to book object */
            const parseBooks = (id, book) => ({ id, ...book })
            books = Object.keys(response.data).map(id => parseBooks(id, response.data[id]));

            dispatch(fetchListComplete(books))
        })
        .catch(error => {
            dispatch(fetchListFailed())
        })
}

const fetchDetails = (id, token, userId, personal = 'false') => (dispatch) => { 
    let viewUrl = `books/${id}.json`;
    if (personal === 'true') {
        const queryParams = `?auth=${token}`
        viewUrl = `personalBooks/${id}.json${queryParams}`;
    }
    
    axios.get(viewUrl)
        .then(response => {
            const book = updateObject(response.data, { id });

            dispatch(fetchDetailsComplete(book))
        })
        .catch(error => {
            dispatch(fetchDetailsFailed())
        })  
}

const addBook = (bookData, token) => (dispatch) => {
    dispatch(addInit())
    axios.post(`/personalBooks.json?auth=${token}` , bookData)
            .then(
                response => {
                    dispatch(addComplete(response.data.name, bookData))
                    dispatch(setRedirectAfterAdd('/'))
                }
            )
            .catch(
                error => {
                    dispatch(addFailed(error))
                }
            )    
}

export {    
    fetchList,
    fetchDetails,
    resetDetails,
    addBook,
    setRedirectAfterAdd    
};