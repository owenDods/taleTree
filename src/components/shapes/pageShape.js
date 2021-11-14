import PropTypes from 'prop-types';

export default {
	title: PropTypes.string,
	text: PropTypes.string,
	img: PropTypes.string,
	destinations: PropTypes.arrayOf(PropTypes.shape({
		destination: PropTypes.string,
		label: PropTypes.string
	}))
};
