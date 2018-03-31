import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { axios, dictionary } from '../../../utilities';
import BookList from '../../components/Book/BookList';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { bookOperations } from '../../../state/ducks/book';
import { bookShape } from '../../propTypes';

const { arrayOf, func } = PropTypes;

/**
 * Book board
 * 
 * @class BookBoard
 * @extends {Component}
 */
export class BookBoard extends Component {    
    static defaultProps = {
        books: null,
        error: false
    }

    static propTypes = {
        books      : arrayOf(bookShape),
        onFetchList: func.isRequired,
    }

    componentDidMount() {
        /* Fetching data from the server */
        this.props.onFetchList(this.props.token, this.props.userId, this.props.personal);            
    }        

    render() {
        const { error, books } = this.props;

        let bookBoard          = null;
        /* Check if there is an error */
        bookBoard              = error ? <p>{ dictionary.errorLoadMsg }</p> : <Spinner />;

        /* display book list item */
        if (books) {
            bookBoard = <BookList books={books} personal={this.props.personal} col="col1Of3" />;
        }

        return bookBoard;
    }
}

const mapStateToProps = ( state ) => ({
    books : state.book.list.books,
    error : state.book.list.error,
    token : state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = {
    onFetchList: bookOperations.fetchList    
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BookBoard, axios));