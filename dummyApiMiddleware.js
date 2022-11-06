module.exports = (req, res, next) => {

	let dummyData = require('./dummyApi.json');

	if (req.method === 'PUT' && req.url === '/account') {

		Object.keys(req.body).forEach(key => {

			const existingValue = dummyData.account[key];

			if (Array.isArray(existingValue)) {

				const updatedData = [ ...new Set([ ...existingValue, req.body[key] ]) ];

				req.body[key] = updatedData;
				dummyData.account[key] = updatedData;

			}

		});

	}

	next();

}
