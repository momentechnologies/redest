import addPrefix from './addPrefix';
import create from './reducerActions/create';
import update from './reducerActions/update';
import remove from './reducerActions/remove';
import invalidate from './reducerActions/invalidate';
import load from './reducerActions/load';
import loadRaw from './reducerActions/loadRaw';

const newInitialState = () => ({
    entities: {},
    meta: {}
});

export const types = addPrefix('redest', {
    LOAD: 'LOAD',
    LOAD_RAW: 'LOAD_RAW',
    UPDATE: 'UPDATE',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    INVALIDATE: 'INVALIDATE'
});

const defaultReducer = (state, action) => state;

export default (reducer = defaultReducer) => (state = newInitialState(), action) => {
    switch (action.type) {
        case types.LOAD: return load(state, action);
        case types.LOAD_RAW: return loadRaw(state, action);
        case types.CREATE: return create(state, action);
        case types.UPDATE: return update(state, action);
        case types.DELETE: return remove(state, action);
        case types.INVALIDATE: return invalidate(state);
        default:
            return reducer(state, action);
    }
};