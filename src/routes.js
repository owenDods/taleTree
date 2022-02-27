import Cross from './img/cross.svg';

const routeConstants = {
	TALE: '/tale'
};

export const uuidRegexPattern = '[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}';
export const dataByRoute = {
	'/': {
		label: 'Tale Selection',
		lostSuggestion: true
	},
	[routeConstants.TALE]: {
		label: 'Tale',
		backData: [
			{
				destination: '/',
				routeToMatch: new RegExp(`^${routeConstants.TALE}/${uuidRegexPattern}/start`, 'i')
			},
			{
				destination: '/',
				destinationLabel: 'Exit Tale',
				icon: Cross,
				customClass: 'exitTale',
				routeToMatch: new RegExp(`^${routeConstants.TALE}/${uuidRegexPattern}/${uuidRegexPattern}`, 'i')
			}
		]
	}
};

export default routeConstants;
