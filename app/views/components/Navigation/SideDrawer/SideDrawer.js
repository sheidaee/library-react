import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDrawer.scss';
import Backdrop from '../../UI/Backdrop';
import Aux from '../../../hoc/AX'; 
import { classNames } from '../../../../utilities';

const SideDrawer = ({ open, closed }) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={open} clicked={closed} />
            <div className={classNames( attachedClasses )}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

const { bool, func } = PropTypes;

SideDrawer.propTypes = {
    open  : bool.isRequired,
    closed: func.isRequired
}

export default SideDrawer;
