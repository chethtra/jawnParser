const valueTypes = require('../type/value');

function castAndFilter(array, query, condition){
    return array.filter((e)=> {
        let dataValue = e[query.key];

        const result = query.values.some(function(queryValue){
            if(query.type === valueTypes.TEXT){
                queryValue = queryValue.toLowerCase();
                dataValue = dataValue.toLowerCase();
            }
            return condition(queryValue, dataValue)
        });

        if(query.condition.includes('not')){
            return !result;
        } 
        return result
    });
};

module.exports = castAndFilter;