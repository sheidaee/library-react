import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { axios, dictionary } from '../../../utilities';
import Classes from './BookDetails.scss';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { bookOperations } from '../../../state/ducks/book';
import { bookShape } from '../../propTypes';

const { func } = PropTypes;

/**
 * View book
 * 
 * @class BookDetails
 * @extends {Component}
 */
export class BookDetails extends Component {    
    static defaultProps = {
        book : null,
        error: false
    }

    static propTypes = {
        book       : bookShape,
        onFetchBook: func.isRequired,
    }

    componentDidMount() {
        /* Fetching data from google firebase */
        this.props.onFetchBook(this.props.match.params.id, this.props.token, this.props.userId, this.props.match.params.personal)  
    }

    componentWillUnmount() {
        this.props.onResetBook();
    }    

    render() {
        const { error, book } = this.props;

        let bookEl = null;
        
        /* Check if there is an error */
        bookEl = error ? <p>{ dictionary.errorLoadMsg }</p> : <Spinner />;

        if (book) {
            bookEl = (
            <div className={Classes.BookDetails}>
                <h1 className={Classes.bookTitle}>{book.title}</h1>

                <div className={Classes.imgContainer}>
                    <img src={book.image} alt="" className={Classes.img} />
                </div>
                <p className={Classes.textContainer}>{book.description}</p>
            </div>);
        }        
     
        return bookEl;
    }
}  

const mapStateToProps = ( state ) => {
    return {
        book  : state.book.details.book, 
        error : state.book.details.error,
        token : state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchBook: (id, token, userId, personal) => dispatch(bookOperations.fetchDetails(id, token, userId, personal)),
        onResetBook: () => dispatch(bookOperations.resetDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BookDetails, axios));