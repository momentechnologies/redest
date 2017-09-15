import fetch from './fetch';
import { types } from './reducer';
import {
    shouldLoad,
    selectMetaKey
} from './selectors';
import { isSingle, isAll, isMultiple } from './selectors/selectMetaKey';

import getKeyInfo from './Controller/getKeyInfo';

const action = (key, action) => ({
    ...action,
    redest: getKeyInfo(key)
});

const getIfNeeded = (key) => (filter) => (dispatch, getState) => {
    const info = getKeyInfo(key);
    if (shouldLoad(getState().redest[info.reducer], filter)) {
        dispatch(get(key)(filter));
    }
};

const get = (key) => (filter) => (dispatch) => {
    const info = getKeyInfo(key);
    const metaKey = selectMetaKey(filter);

    dispatch(action(key, {
        type: types.LOAD,
        status: 'start',
        payload: {
            metaKey
        }
    }));

    let url = info.url;
    let requestData = filter;
    if (isSingle(filter)) {
        url += '/' + metaKey;
        requestData = null;
    }
    if (isAll(filter)) requestData = null;

    fetch(url, 'GET', requestData).then(
        (response) => {
            let entities = {};

            if (isMultiple(filter)) {
                entities = response.reduce((acc, entity) => {
                    acc[entity.id] = entity;
                    return acc;
                }, {});
            } else {
                entities[response.id] = response;
            }

            dispatch(action(key, {
                type: types.LOAD,
                status: 'success',
                payload: {
                    metaKey,
                    entities
                }
            }));
        },
        (error) => {
            dispatch(action(key, {
                type: types.LOAD,
                status: 'error',
                payload: {
                    metaKey,
                    error
                }
            }));
        }
    );
};

const create = (key) => (data) => (dispatch) => new Promise((resolve, reject) => {
    const info = getKeyInfo(key);
    fetch(info.url, 'POST', data).then(
        (success) => {
            dispatch(action(key, {
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

const update = (key) => (id, data) => (dispatch) => new Promise((resolve, reject) => {
    const info = getKeyInfo(key);
    fetch(info.url + '/' + id, 'POST', data).then(
        (success) => {
            dispatch(action(key, {
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

const remove = (key) => (id) => (dispatch) => new Promise((resolve, reject) => {
    const info = getKeyInfo(key);
    fetch(info.url + '/' + id, 'DELETE').then(
        (success) => {
            dispatch(action(key, {
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

const invalidate = (key) => () => (action(key, {
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

const fillActions = (key) => {
    let response = {};
    Object.keys(actions).forEach((actionKey) => {
        response[actionKey] = actions[actionKey](key);
    });
    return response;
};

export default (key) => fillActions(key)