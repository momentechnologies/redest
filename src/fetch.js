import axios from 'axios';
import { getSettings } from './settings';

let queue = [];
let timeout = null;
const waitTimeMS = 10;
const defaultErrorResponse = {
    uid: 0,
    message: 'Something went wrong',
    extra: {},
};

const fetch = (url, method = 'GET', data = null) => {
    return axios({
        method,
        url: getSettings().requests.prefix + url,
        data: method !== 'GET' ? data : null,
        params: method === 'GET' ? data : null,
        withCredentials: true,
    });
};

export default (url, method = 'GET', data = null) =>
    new Promise((resolve, reject) => {
        if (timeout) clearTimeout(timeout);
        queue.push({
            url,
            method,
            data,
            resolve,
            reject,
        });

        timeout = setTimeout(() => {
            const processQueue = queue;
            queue = [];
            if (processQueue.length === 1) {
                fetch(
                    processQueue[0].url,
                    processQueue[0].method,
                    processQueue[0].data
                )
                    .then(response => {
                        if (response.status >= 500) {
                            throw defaultErrorResponse;
                        }
                        return response.data;
                    })
                    .then(json => {
                        if (!json.success) {
                            throw json;
                        }
                        processQueue[0].resolve(json);
                    })
                    .catch(thrownError => {
                        let error = defaultErrorResponse;
                        if (thrownError) {
                            if (thrownError.uid) error.uid = thrownError.uid;
                            if (thrownError.message)
                                error.message = thrownError.message;
                            if (thrownError.extra)
                                error.extra = thrownError.extra;
                        }
                        processQueue[0].reject(error);
                    });

                return;
            }

            fetch('/batch', 'POST', {
                batch: processQueue.map((request, index) => {
                    let url = request.url;
                    let body = JSON.stringify(request.data);
                    if (request.method === 'GET' && request.data !== null) {
                        url +=
                            '?' +
                            Object.keys(request.data)
                                .map(key => key + '=' + request.data[key])
                                .join('&');
                        body = null;
                    }
                    return {
                        method: request.method,
                        url: getSettings().requests.prefix + url,
                        body,
                        'content-type': 'application/json',
                        name: index,
                    };
                }),
            })
                .then(response => {
                    if (response.status !== 200) throw 'Request not successful';
                    response.data.forEach((response, index) => {
                        const requestObject = processQueue[index];
                        if (response.code >= 500 || !response.body) {
                            return requestObject.reject(defaultErrorResponse);
                        }

                        const body = response.body;

                        if (!response.body.success) {
                            let error = defaultErrorResponse;
                            if (response.body.uid) error.uid = thrownError.uid;
                            if (response.body.message)
                                error.message = thrownError.message;
                            if (response.body.extra)
                                error.extra = thrownError.extra;
                            return requestObject.reject(error);
                        }

                        return requestObject.resolve(response.body);
                    });
                })
                .catch(error => {
                    processQueue.forEach((queueItem, index) => {
                        processQueue[index].reject(defaultErrorResponse);
                    });
                });
        }, waitTimeMS);
    });

export const errorCodes = {
    FATAL: 0,
    ALREADY_EXISTS: 1,
    INVALID_REQUEST: 2,
    NOT_FOUND: 3,
    PARAMETER_MISSING: 4,
    UNAUTHORIZED: 5,
    VALIDATION: 6,
};
