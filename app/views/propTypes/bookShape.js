import PropTypes from 'prop-types';

const { shape, string } = PropTypes;

export default shape({
    id         : string.isRequired,
    title      : string.isRequired,
    description: string.isRequired,
    image      : string.isRequired,    
});