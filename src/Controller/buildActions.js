import loopDataToRetrive from './loopDataToRetrive';
import restAction from '../actions';

export default (dataToRetrieve, props) => {
    let actions = {};
    loopDataToRetrive(dataToRetrieve, props, info => {
        if (info.onlyPagination) return;
        const restActions = restAction(info);
        Object.keys(restActions).forEach(actionName => {
            actions[info.reducer + '_' + actionName] = (...args) =>
                props.dispatch(restActions[actionName](...args));
        });
    });
    return actions;
};
