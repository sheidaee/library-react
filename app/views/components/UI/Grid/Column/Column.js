import React from 'react';
import Classes from './Column.scss';

const Column = ({ children, col }) => {
    
    return (
        <div className={Classes[col]}>
            { children }
        </div>
    );
};

export default Column;