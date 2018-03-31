import React from 'react';
import PropTypes from 'prop-types';

import burgerLogo from '../../../../assets/images/../../assets/images/library-logo.png';
import classes from './Logo.scss';
import { dictionary } from '../../../utilities';

const logo = ({ height }) => (
    <div className={classes.Logo} style={{ height }}>
        <img src={burgerLogo} alt={dictionary.projectTitle} />
    </div>
);

const { string } = PropTypes;

logo.propTypes = {
    height: string,    
}

export default logo;