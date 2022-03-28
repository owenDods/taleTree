import PropTypes from 'prop-types';

const taleTreeShape = {
	value: PropTypes.string.isRequired
};
taleTreeShape.children = PropTypes.arrayOf(PropTypes.shape(taleTreeShape));

export default taleTreeShape;
