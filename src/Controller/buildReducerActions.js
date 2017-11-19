import loopDataToRetrive from './loopDataToRetrive';
import restAction from '../actions';

export default (info, props) => {
    if (info.onlyPagination) return null;

    const restActions = restAction(info);

    return Object.keys(restActions).reduce((acc, actionName) => {
        acc[actionName] = (...args) => {
            return props.dispatch(restActions[actionName](...args));
        };
        return acc;
    }, {});
};
