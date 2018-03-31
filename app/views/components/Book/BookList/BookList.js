import React from 'react';
import PropTypes from 'prop-types'
import Book from '../Book';
import Grid from '../../UI/Grid';

const BookList = ({ books, col, personal }) => {
    return (
        <Grid>
            {
                books.map(
                    book =>
                        <Grid.Column    col='col1Of3'
                                        key={book.id} >
                            <Book   
                                book={book} 
                                isPersonal={personal} />
                        </Grid.Column>
                )
            }
        </Grid>
    );
};

const { array, string } = PropTypes;

BookList.propTypes = {
    books: array.isRequired,
    col  : string.isRequired
};

export default BookList;