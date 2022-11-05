module.exports = (req, res, next) => {

	const dummyData = require('./dummyApi.json');

	if (req.method === 'PUT' && req.url === '/account') {

		Object.keys(req.body).forEach(key => {

			const existingValue = dummyData.account[key];

			if (Array.isArray(existingValue)) {

				req.body[key] = [ ...new Set([ ...existingValue, req.body[key] ]) ];

			}

		});

	}

	next();

}
