import routes from '../../../routes';

export default pathname => {

	const { 1: baseRoute } = pathname.match(/^\/(\w*)/);

	switch (baseRoute) {

		case routes.TALE:

			return '/';

		default:

			return null;

	}

};
