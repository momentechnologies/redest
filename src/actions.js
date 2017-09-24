import fetch from './fetch';
import { types } from './reducer';
import {
    shouldLoad,
    shouldLoadRaw,
    selectMetaKey
} from './selectors';
import { isSingle, isAll, isMultiple } from './selectors/selectMetaKey';

const action = (info, action) => ({
    ...action,
    redest: {
        reducer: info.reducer,
        raw: info.raw
    }
});

const getIfNeeded = (info) => (filter) => (dispatch, getState) => {
    if (info.raw) {
        if (shouldLoadRaw(getState().redest[info.reducer], filter)) {
            dispatch(get(info)(filter));
        }
    } else {
        if (shouldLoad(getState().redest[info.reducer], filter)) {
            dispatch(get(info)(filter));
        }
    }
};

const get = (info) => (filter) => (dispatch) => {
    const metaKey = selectMetaKey(filter);
    const type = info.raw ? types.LOAD_RAW : types.LOAD;

    dispatch(action(info, {
        type,
        status: 'start',
        payload: {
            metaKey
        }
    }));

    let url = info.endpoint;
    let requestData = filter;
    if (isSingle(filter)) {
        url += '/' + metaKey;
        requestData = null;
    }
    if (isAll(filter)) requestData = null;

    fetch(url, 'GET', requestData).then(
        (response) => {
            if (info.raw) {
                dispatch(action(info, {
                    type,
                    status: 'success',
                    payload: {
                        metaKey,
                        data: response
                    }
                }));
            } else {
                let entities = {};
                let ids = [];

                if (isMultiple(filter)) {
                    entities = response.reduce((acc, entity) => {
                        acc[entity.id] = entity;
                        ids.push(entity.id);
                        return acc;
                    }, {});
                } else {
                    entities[response.id] = response;
                    ids.push(response.id);
                }

                dispatch(action(info, {
                    type,
                    status: 'success',
                    payload: {
                        metaKey,
                        entities,
                        ids
                    }
                }));
            }
        },
        (error) => {
            dispatch(action(info, {
                type,
                status: 'error',
                payload: {
                    metaKey,
                    error
                }
            }));
        }
    );
};

const create = (info) => (data) => (dispatch) => new Promise((resolve, reject) => {
    fetch(info.endpoint, 'POST', data).then(
        (success) => {
            dispatch(action(info, {
                type: types.CREATE,
                payload: success
            }));
            resolve(success);
        },
        (error) => {
            reject(error);
        }
    );
});

const update = (info) => (id, data) => (dispatch) => new Promise((resolve, reject) => {
    fetch(info.endpoint + '/' + id, 'POST', data).then(
        (success) => {
            dispatch(action(info, {
                type: types.UPDATE,
                payload: success
            }));
            resolve(success);
        },
        (error) => {
            reject(error);
        }
    );
});

const remove = (info) => (id) => (dispatch) => new Promise((resolve, reject) => {
    fetch(info.endpoint + '/' + id, 'DELETE').then(
        (success) => {
            dispatch(action(info, {
                type: types.DELETE,
                payload: id
            }));
            resolve(success);
        },
        (error) => {
            reject(error);
        }
    );
});

const invalidate = (info) => () => (action(info, {
    type: types.INVALIDATE
}));

const actions = {
    getIfNeeded,
    get,
    create,
    update,
    remove,
    invalidate
};

const fillActions = (info) => {
    let response = {};
    Object.keys(actions).forEach((actionKey) => {
        response[actionKey] = actions[actionKey](info);
    });
    return response;
};

export default (info) => fillActions(info)