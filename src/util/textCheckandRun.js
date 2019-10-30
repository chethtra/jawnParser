const valueTypes = require('../type/value');

function textCheckandRun(arrayValue, query, condition){
    const result = query.values.some(function(queryValue){
        if(query.type === valueTypes.TEXT){
            queryValue = queryValue.toLowerCase();
            arrayValue = arrayValue.toLowerCase();
        }
        return condition(queryValue, arrayValue)
    });

    if(query.condition.includes('not')){
        return !result;
    } 
    return result
};

module.exports = textCheckandRun;