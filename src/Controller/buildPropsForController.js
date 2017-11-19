import loopDataToRetrive from './loopDataToRetrive';
import { select, selectRaw } from '../selectors';

const getData = (state, info) => {
    if (info.onlyActions) return {};
    if (info.raw) {
        return selectRaw(state, info);
    }
    return select(state, info);
};

export default (dataToRetrieve, state, props) => {
    let newProps = {};

    loopDataToRetrive(dataToRetrieve, props, info => {
        newProps[info.reducer] = getData(state, info);
    });

    return newProps;
};
