var validate = {

    params: function(params, allowedParams) {
        for (var param in params) {
            if (allowedParams.indexOf(param) < 0) {
                return false
            }
        }

        return true;
    }

};

module.exports = validate;
