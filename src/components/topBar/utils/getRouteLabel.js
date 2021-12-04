import { useLocation } from 'react-router-dom';
import getOr from 'lodash/fp/getOr';

import { dataByRoute } from '../../../routes';

export default () => {

	const topRoute = useLocation().pathname.match(/^\/\w*/)[0];

	return getOr('', `${topRoute}.label`, dataByRoute);

};
