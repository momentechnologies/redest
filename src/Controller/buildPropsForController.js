import loopDataToRetrive from './loopDataToRetrive';
import { select, selectOne } from '../selectors';
import settings from '../settings';

export default (dataToRetrieve, state, props) => {
    let newProps = {};
    loopDataToRetrive(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
        if (!state[reducer]) {
            const error = 'The endpoint ' + reducer + ' hasn\'t been setup in the create store section of your application.';
            console.error(error);
            newProps[settings.internalPropPrefix + 'error'] = error;
            return;
        }
        newProps[propReducer] = {
            prefix: state[reducer].prefix,
            baseUrl: state[reducer].baseUrl
        };
        let propName = reducer;
        if (dataToRetrieve.propName) propName = dataToRetrieve.propName;

        const filter = dataToRetrieve.select(props);
        if (filter && typeof filter === 'object') {
            newProps[propName] = select(state[reducer], filter);
        } else if (filter === 'all') {
            newProps[propName] = select(state[reducer]);
        } else if (filter) {
            newProps[propName] = selectOne(state[reducer], filter);
        }
    });

    return newProps;
}