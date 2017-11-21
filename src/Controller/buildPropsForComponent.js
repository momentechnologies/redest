import { getSettings } from '../settings';
import loopDataToRetrive from './loopDataToRetrive';
import buildReducerActions from './buildReducerActions';

export default (dataToRetrieve, props, other) => {
    let newProps = {};

    Object.keys(props).forEach(propKey => {
        if (!propKey.startsWith(getSettings().internalPropPrefix)) {
            newProps[propKey] = props[propKey];
        }
    });

    loopDataToRetrive(dataToRetrieve, props, info => {
        if (!newProps[info.reducer]) return;
        newProps[info.reducer] = {
            ...newProps[info.reducer],
            actions: buildReducerActions(info, props),
        };
    });

    return {
        ...newProps,
        ...other,
    };
};
