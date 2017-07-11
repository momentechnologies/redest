import { selectMetaKey } from './selectors';
import addPrefix from './addPrefix';

const newInitialState = (prefix, baseUrl) => {
    return {
        entities: {},
        meta: {},
        prefix,
        baseUrl
    }
};

export const typesCreator = (prefix) => {
    return addPrefix(prefix, {
        LOAD_ALL: 'LOAD_ALL',
        LOAD_ONE: 'LOAD_ONE',
        UPDATE: 'UPDATE',
        CREATE: 'CREATE',
        DELETE: 'DELETE',
        INVALIDATE: 'INVALIDATE'
    });
};

const defaultReducer = (state, action) => {
    return state;
};

const resetMeta = (meta) => {
    let newGetMeta = {};
    Object.keys(meta).forEach(getKey => {
        newGetMeta[getKey] = {
            ...meta[getKey],
            loadedAt: false
        }
    });
    return newGetMeta
};

const currentTimestamp = () => {
    return new Date().getTime();
};

export default (prefix, baseUrl, reducer = defaultReducer) => {
    const types = typesCreator(prefix);

    return (state = newInitialState(prefix, baseUrl), action) => {
        switch (action.type) {
            case types.LOAD_ALL:
                let key = selectMetaKey(action.payload.filter);
                switch (action.status) {
                    case 'start':
                        return {
                            ...state,
                            meta: {
                                ...state.meta,
                                [key]: {
                                    isLoading: true,
                                    error: false,
                                    loadedAt: null
                                }
                            }
                        };
                    case 'success':
                        return {
                            ...state,
                            meta: {
                                ...state.meta,
                                [key]: {
                                    isLoading: false,
                                    error: false,
                                    loadedAt: currentTimestamp(),
                                    ids: Object.keys(action.payload.entities)
                                }
                            },
                            entities: action.payload.entities
                        };
                    case 'error':
                        return {
                            ...state,
                            meta: {
                                ...state.meta,
                                [key]: {
                                    isLoading: false,
                                    error: action.payload.error,
                                    loadedAt: currentTimestamp(),
                                }
                            }
                        };
                    default:
                        return state;
                }
            case types.LOAD_ONE:
                switch (action.status) {
                    case 'start':
                        return {
                            ...state,
                            meta: {
                                ...state.meta,
                                [action.payload]: {
                                    isLoading: true,
                                    error: false,
                                    loadedAt: null
                                }
                            }
                        };
                    case 'success':
                        return {
                            ...state,
                            meta: {
                                ...state.meta,
                                [action.payload.id]: {
                                    isLoading: false,
                                    error: false,
                                    loadedAt: currentTimestamp()
                                }
                            },
                            entities: {
                                ...state.entities,
                                [action.payload.id]: action.payload
                            }
                        };
                    case 'error':
                        return {
                            ...state,
                            meta: {
                                ...state.meta,
                                [action.payload.id]: {
                                    isLoading: false,
                                    error: action.payload.error,
                                    loadedAt: false
                                }
                            }
                        };
                    default:
                        return state;
                }
            case types.CREATE:
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        [action.payload.id]: action.payload
                    },
                    meta: resetMeta(state.meta)
                };
            case types.UPDATE:
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        [action.payload.id]: action.payload
                    },
                    meta: resetMeta(state.meta)
                };
            case types.DELETE:
                let newEntities = {...state.entities};
                delete newEntities[action.payload];
                return {
                    ...state,
                    entities: newEntities,
                    meta: resetMeta(state.meta)
                };
            case types.INVALIDATE:
                return {
                    ...state,
                    meta: resetMeta(state.meta)
                };
            default:
                return reducer(state, action);
        }
    }
};