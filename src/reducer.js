import addPrefix from './addPrefix';
import create from './reducerActions/create';
import update from './reducerActions/update';
import remove from './reducerActions/remove';
import invalidate from './reducerActions/invalidate';
import loadAll from './reducerActions/loadAll';
import loadOne from './reducerActions/loadOne';

const newInitialState = (prefix, baseUrl) => ({
    entities: {},
    meta: {},
    prefix,
    baseUrl
});

export const typesCreator = (prefix) => addPrefix(prefix, {
    LOAD_ALL: 'LOAD_ALL',
    LOAD_ONE: 'LOAD_ONE',
    UPDATE: 'UPDATE',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    INVALIDATE: 'INVALIDATE'
});

const defaultReducer = (state, action) => state;

export default (prefix, baseUrl, reducer = defaultReducer) => {
    const types = typesCreator(prefix);
    return (state = newInitialState(prefix, baseUrl), action) => {
        switch (action.type) {
            case types.LOAD_ALL: return loadAll(state, action);
            case types.LOAD_ONE: return loadOne(state, action);
            case types.CREATE: return create(state, action);
            case types.UPDATE: return update(state, action);
            case types.DELETE: return remove(state, action);
            case types.INVALIDATE: return invalidate(state);
            default:
                return reducer(state, action);
        }
    }
};