var validate = {

    queryParams: function(query, allowedParams) {
        for (var param in query) {
            if (allowedParams.indexOf(param) < 0) {
                return false
            }
        }

        return true;
    }

};

module.exports = validate;
