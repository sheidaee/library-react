import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Classes from './NavigationItem.scss';

const NavigationItem = ({ children, link, active, exact}) => (
    <li className={Classes.NavigationItem}>
        <NavLink 
            to={link}
            exact={exact}
            activeClassName={Classes.active} >
        { children }
        </NavLink>
    </li>
);

const { string, bool } = PropTypes;

NavigationItem.propTypes = {
    children: string.isRequired,
    link    : string.isRequired,
    active  : string,
    exact   : bool
}

export default NavigationItem;
