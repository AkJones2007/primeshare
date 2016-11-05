var error = {

	unknown: {
		message: 'An unknown error occured. Please try again later.',
		dateOccured: new Date().toISOString()
	},

	notFound: {
		message: 'Record not found.',
		dateOccured: new Date().toISOString()
	},

	invalidParams: {
		message: 'Invalid filter parameters.',
		dateOccured: new Date().toISOString()
	},

	resultsNotFound: {
		message: 'No results found.',
		dateOccured: new Date().toISOString()
	}

};

module.exports = error;
