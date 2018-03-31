import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItems.scss';
import NavigationItem from './NavigationItem';
import { dictionary } from '../../../../utilities';

const NavigationItems = ({ isAuthenticated }) => (        
    <ul className={classes.NavigationItems} >
        <NavigationItem link="/" exact={true}>{ dictionary.library }</NavigationItem>   
        { isAuthenticated ? <NavigationItem link="/uploaded">{ dictionary.uploaded }</NavigationItem> : null }
        { isAuthenticated ? <NavigationItem link="/new-book">{ dictionary.addBook }</NavigationItem> : null }
        {
            !isAuthenticated     
            ? <NavigationItem link="/auth">{dictionary.login}</NavigationItem>
            : <NavigationItem link="/logout">{dictionary.logout}</NavigationItem>
        }                 
    </ul>        
);

const { bool } = PropTypes;

NavigationItems.propTypes = {    
    isAuthenticated       : bool
}

export default NavigationItems;