import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import Classes from './Book.scss';

const Book = ( props ) => {
    const { title, image, id } = props.book;
    const personalParam = props.isPersonal ? `/${true}` : '';
    return (
        <div className={Classes.Book} >
            <Link to={`book/${id}${personalParam}`} className={Classes.bookLink}>
                <img src={image} alt={title} className={Classes.img} />
                <div className={Classes.desc}>
                    <h4>{title}</h4>
                </div>
            </Link>
        </div> 
    );
};

const { object, bool } = PropTypes;

Book.propTypes = {
    book    : object.isRequired,
    personal: bool
};

export default Book;
