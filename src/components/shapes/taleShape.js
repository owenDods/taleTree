import PropTypes from 'prop-types';

export default {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	backgroundImg: PropTypes.string,
	startPage: PropTypes.string,
	pages: PropTypes.objectOf(PropTypes.shape({
		title: PropTypes.string,
		text: PropTypes.string,
		img: PropTypes.string,
		destinations: PropTypes.arrayOf(PropTypes.shape({
			destination: PropTypes.string,
			label: PropTypes.string
		}))
	}))
};
