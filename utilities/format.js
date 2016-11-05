var format = {
    
    geocodedPlace: function(data) {
        return {
            address: data.formattedAddress,
            state: data.administrativeLevels.level1long,
            county: data.administrativeLevels.level2long,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            neighborhood: data.extra.neighborhood || null
        };
    }
    
};

module.exports = format;