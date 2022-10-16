import {
	useLocation,
	useParams
} from 'react-router-dom';

import getPageId from './getPageId';

function useGetDataFromCurrentRoute() {

	const { taleId, '*': stringAfterTalePath } = useParams();

	const location = useLocation();
	const { pathname } = location;
	const pageId = getPageId(stringAfterTalePath);

	return { taleId, pageId, location, pathname };

}

export default useGetDataFromCurrentRoute;
