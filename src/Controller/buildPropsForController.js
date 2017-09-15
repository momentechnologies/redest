import loopDataToRetrive from './loopDataToRetrive';
import { select, selectOne } from '../selectors';
import getKeyInfo from './getKeyInfo';

export default (dataToRetrieve, state, props) => {
    let newProps = {};
    loopDataToRetrive(dataToRetrieve, (key, filterForRequest) => {
        const info = getKeyInfo(key);

        newProps[info.reducer] = select(state.redest[info.reducer], filterForRequest(props));
    });

    return newProps;
}