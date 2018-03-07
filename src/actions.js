import fetch from './fetch';
import { types } from './reducer';
import { shouldLoad, shouldLoadRaw, selectMetaKey } from './selectors';
import {
    isSingle,
    isAll,
    isMultiple,
    getFilterOnlyKey,
} from './selectors/selectMetaKey';
import selectRequestData from './selectors/selectRequestData';
import { getSettings } from './settings';

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

const get = (info, axiosOptions) => dispatch => {
    const metaKey = selectMetaKey(info);
    const type = info.raw ? types.LOAD_RAW : types.LOAD;

    let url = info.endpoint;

    if (isSingle(info.filter)) {
        url += '/' + info.filter;
    }

    const data = selectRequestData(info);

    dispatch(
        action(info, {
            type,
            status: 'start',
            payload: {
                metaKey,
                info,
            },
        })
    );

    return new Promise(resolve => {
        fetch(url, 'GET', data, axiosOptions).then(
            response => {
                const settings = getSettings();
                const requestData = settings.requests.retrieveRequestData(
                    response
                );
                if (info.raw) {
                    dispatch(
                        action(info, {
                            type,
                            status: 'success',
                            payload: {
                                metaKey,
                                data: requestData,
                            },
                        })
                    );
                } else {
                    let entities = {};
                    let ids = [];
                    let pagination = {};

                    if (isMultiple(info.filter)) {
                        entities = requestData.reduce((acc, entity) => {
                            acc[entity[info.idKey]] = entity;
                            ids.push(String(entity[info.idKey]));
                            return acc;
                        }, {});

                        const paginationData = settings.requests.retrievePaginationData(
                            response
                        );

                        if (paginationData) {
                            pagination = {
                                pagination: paginationData,
                                paginationKey: getFilterOnlyKey(info),
                            };
                        }
                    } else {
                        entities[requestData[info.idKey]] = requestData;
                        ids.push(String(requestData[info.idKey]));
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
                resolve();
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
                resolve();
            }
        );
    });
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
                        payload: {
                            response: success.data,
                            idKey: info.idKey,
                        },
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

export default (info, axiosOptions = {}) => {
    let response = {};
    Object.keys(actions).forEach(actionKey => {
        response[actionKey] = actions[actionKey](info, axiosOptions);
    });
    return response;
};
