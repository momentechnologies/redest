import fetch from './fetch';
import { types } from './reducer';
import { shouldLoad, shouldLoadRaw, selectMetaKey } from './selectors';
import { isSingle, isAll, isMultiple } from './selectors/selectMetaKey';
import selectPaginationKey from './selectors/selectPaginationKey';
import selectRequestData from './selectors/selectRequestData';

const action = (info, action) => ({
    ...action,
    redest: {
        reducer: info.reducer,
        raw: info.raw,
    },
});

const getIfNeeded = info => () => (dispatch, getState) => {
    if (info.raw) {
        if (shouldLoadRaw(getState(), info)) {
            dispatch(get(info));
        }
    } else {
        if (shouldLoad(getState(), info)) {
            dispatch(get(info));
        }
    }
};

const get = info => dispatch => {
    const metaKey = selectMetaKey(info);
    const type = info.raw ? types.LOAD_RAW : types.LOAD;

    dispatch(
        action(info, {
            type,
            status: 'start',
            payload: {
                metaKey,
            },
        })
    );

    let url = info.endpoint;

    if (isSingle(info.filter)) {
        url += '/' + info.filter;
    }

    fetch(url, 'GET', selectRequestData(info)).then(
        response => {
            if (info.raw) {
                dispatch(
                    action(info, {
                        type,
                        status: 'success',
                        payload: {
                            metaKey,
                            data: response.data,
                        },
                    })
                );
            } else {
                let entities = {};
                let ids = [];
                let pagination = {};

                if (isMultiple(info.filter)) {
                    entities = response.data.reduce((acc, entity) => {
                        acc[entity.id] = entity;
                        ids.push(String(entity.id));
                        return acc;
                    }, {});
                    if (response._pagination) {
                        pagination = {
                            pagination: {
                                total: response._pagination.total,
                                limit: response._pagination.limit,
                            },
                            paginationKey: selectPaginationKey(info),
                        };
                    }
                } else {
                    entities[response.data.id] = response.data;
                    ids.push(String(response.data.id));
                }

                dispatch(
                    action(info, {
                        type,
                        status: 'success',
                        payload: {
                            metaKey,
                            entities,
                            ids,
                            ...pagination,
                        },
                    })
                );
            }
        },
        error => {
            dispatch(
                action(info, {
                    type,
                    status: 'error',
                    payload: {
                        metaKey,
                        error,
                    },
                })
            );
        }
    );
};

const create = info => data => dispatch =>
    new Promise((resolve, reject) => {
        fetch(info.endpoint, 'POST', data).then(
            success => {
                dispatch(
                    action(info, {
                        type: types.CREATE,
                        payload: success.data,
                    })
                );
                resolve(success.data);
            },
            error => {
                reject(error);
            }
        );
    });

const update = info => (id, data) => dispatch =>
    new Promise((resolve, reject) => {
        fetch(info.endpoint + '/' + id, 'POST', data).then(
            success => {
                dispatch(
                    action(info, {
                        type: types.UPDATE,
                        payload: success.data,
                    })
                );
                resolve(success);
            },
            error => {
                reject(error);
            }
        );
    });

const remove = info => id => dispatch =>
    new Promise((resolve, reject) => {
        fetch(info.endpoint + '/' + id, 'DELETE').then(
            success => {
                dispatch(
                    action(info, {
                        type: types.DELETE,
                        payload: id,
                    })
                );
                resolve(success.data);
            },
            error => {
                reject(error);
            }
        );
    });

const invalidate = info => () =>
    action(info, {
        type: types.INVALIDATE,
    });

const actions = {
    getIfNeeded,
    get,
    create,
    update,
    remove,
    invalidate,
};

const fillActions = info => {
    let response = {};
    Object.keys(actions).forEach(actionKey => {
        response[actionKey] = actions[actionKey](info);
    });
    return response;
};

export default info => fillActions(info);
