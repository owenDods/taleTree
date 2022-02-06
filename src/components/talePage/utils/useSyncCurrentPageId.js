import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

export default setPageId => {

	const { params = {} } = useRouteMatch();
	const { pageId } = params;

	useEffect(() => {

		setPageId(pageId);

	}, [ pageId ]);

};
