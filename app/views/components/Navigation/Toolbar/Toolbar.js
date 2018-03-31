import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toolbar.scss'
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';
import { classNames } from '../../../../utilities';

const toolbar = ({ DrawerToggleClicked, isAuth} ) => {
    return (
        <header className={classes.Toolbar}>    
            <DrawerToggle clicked={DrawerToggleClicked} />        
            <div className={classNames( [classes.Logo, classes.DesktopOnly] )}><Logo /></div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={isAuth} />
            </nav>
        </header>
    );
};

const { func, bool } = PropTypes;

toolbar.propTypes = {
    DrawerToggleClicked: func.isRequired,
    isAuth             : bool.isRequired
}

export default toolbar;