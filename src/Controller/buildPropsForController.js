import loopDataToRetrive from './loopDataToRetrive';
import { select, selectOne } from '../selectors';
import getKeyInfo from './getKeyInfo';

export default (dataToRetrieve, state, props) => {
    let newProps = {};
    loopDataToRetrive(dataToRetrieve, props, (key, filter) => {
        const info = getKeyInfo(key);

        newProps[info.reducer] = select(state.redest[info.reducer], filter);
    });

    return newProps;
}