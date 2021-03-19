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
		backDestination: '/'
	}
};

export default routeConstants;
