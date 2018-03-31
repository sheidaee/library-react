import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.scss';

const DrawerToggle = ({ clicked } ) => {
    return (
        <div className={classes.DrawerToggle} onClick={clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

const { func } = PropTypes;

DrawerToggle.propTypes = {
    clicked: func.isRequired
}

export default DrawerToggle;