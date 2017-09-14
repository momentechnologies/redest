import loopDataToRetrive from './loopDataToRetrive';
import restAction from '../actions';

export default (dataToRetrieve, props) => {
    let actions = {};
    loopDataToRetrive(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
        const endpointInfo = props[propReducer];
        const restActions = restAction(endpointInfo.prefix, endpointInfo.baseUrl);
        Object.keys(restActions).forEach((actionName) => {
            actions[dataToRetrieve.reducer + '_' + actionName] = (...args) => props.dispatch(restActions[actionName](...args))
        });
    });
    return actions;
};