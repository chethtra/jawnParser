const conditions = require('../src/type/conditions');
const valueTypes = require('../src/type/value');
const currencyHandler = require('../src/util/currencyHandler');
const castAndFilter = require('../src/util/castAndFilter');

function between(array, query){
    return array.filter((e)=> {
        let queryFirstValue = query.values[0];
        let querySecondValue = query.values[1];
        let arrayValue = e[query.key];

        if(query.type === valueTypes.currency){
            [queryFirstValue, querySecondValue, arrayValue]  = currencyHandler.convertToFloat([queryFirstValue, querySecondValue, arrayValue]);
        }

        return queryFirstValue <= arrayValue && querySecondValue >= arrayValue;
    });
}


function greaterThanOrEqual(array, query){
    return array.filter((e)=> {
        function condition(queryValue, arrayValue){
            if(query.condition.includes('equal')){
                return queryValue <= arrayValue;
            }
            
            return queryValue < arrayValue;
        }

        return currencyHandler.runSingleQueryValueCondition(query, e[query.key], condition);
    });
}

function lessThanOrEqual(array, query){
    return array.filter((e)=> {
        function condition(queryValue, arrayValue){
            if(query.condition.includes('equal')){
                return queryValue >= arrayValue;
            }

            return queryValue > arrayValue;
        }
        
        return currencyHandler.runSingleQueryValueCondition(query, e[query.key], condition);
    });
}

function equalOrNot(array, query){
    function condition(queryValue, dataValue){
        return queryValue === dataValue;
    }
    
    return castAndFilter(array, query, condition);
}


function includesOrNot(array, query){
    function condition(queryValue, dataValue){
        return dataValue.includes(queryValue);
    }

    return castAndFilter(array, query, condition);
}

module.exports = {
    between,
    greaterThanOrEqual,
    equalOrNot,
    includesOrNot,
    lessThanOrEqual
}