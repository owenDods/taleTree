const routeConstants = {
	TALE: '/tale'
};

export const dataByRoute = {
	'/': {
		label: 'Tale Selection'
	},
	[routeConstants.TALE]: {
		label: 'Tale',
		backDestination: '/'
	}
};

export default routeConstants;
