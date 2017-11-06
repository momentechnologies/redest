import loopDataToRetrive from './loopDataToRetrive';
import { select, selectRaw } from '../selectors';

export default (dataToRetrieve, state, props) => {
    let newProps = {};
    loopDataToRetrive(dataToRetrieve, props, info => {
        if (info.onlyActions) return;

        if (info.raw) {
            newProps[info.reducer] = selectRaw(state, info);
        } else {
            newProps[info.reducer] = select(state, info);
        }
    });

    return newProps;
};
