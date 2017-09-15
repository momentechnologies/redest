import loopDataToRetrive from './loopDataToRetrive';
import restAction from '../actions';
import getKeyInfo from './getKeyInfo';

export default (dataToRetrieve, props) => {
    let actions = {};
    loopDataToRetrive(dataToRetrieve, props, (key) => {
        const info = getKeyInfo(key);
        const restActions = restAction(key);
        Object.keys(restActions).forEach((actionName) => {
            actions[info.reducer + '_' + actionName] = (...args) => props.dispatch(restActions[actionName](...args))
        });
    });
    return actions;
};