import loopDataToRetrive from './loopDataToRetrive';
import { select, selectRaw } from '../selectors';

export default (dataToRetrieve, state, props) => {
    let newProps = {};
    loopDataToRetrive(dataToRetrieve, props, (info) => {
        if (info.raw) {
            newProps[info.reducer] = selectRaw(state.redest[info.reducer], info.filter);
        } else {
            newProps[info.reducer] = select(state.redest[info.reducer], info.filter);
        }
    });

    return newProps;
}