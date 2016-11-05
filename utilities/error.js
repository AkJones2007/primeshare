var error = {

	unknown: {
		message: 'An unknown error occured. Please try again later.',
		dateOccured: new Date().toISOString()
	},

	notFound: {
		message: 'Record not found.',
		dateOccured: new Date().toISOString()
	}

};

module.exports = error;
