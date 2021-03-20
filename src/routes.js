const routeConstants = {
	TALE: '/tale'
};

export const dataByRoute = {
	'/': {
		label: 'Tale Selection',
		lostSuggestion: true
	},
	[routeConstants.TALE]: {
		label: 'Tale',
		backData: {
			destination: '/',
			routeToMatch: new RegExp(`^${routeConstants.TALE}/[a-z0-9]*/start`, 'i')
		}
	}
};

export default routeConstants;
