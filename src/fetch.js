import axios from 'axios';
import { getSettings } from './settings';

let queue = [];
let timeout = null;
const defaultErrorResponse = {
    uid: 0,
    message: 'Something went wrong',
    extra: {},
};

const fetch = (url, method = 'GET', data = null, axiosOptions = {}) => {
    const axiosConfigured = getSettings().requests.configureAxios(axios);
    return axiosConfigured({
        method,
        url: getSettings().requests.prefix + url,
        data: method !== 'GET' ? data : null,
        params: method === 'GET' ? data : null,
        withCredentials: true,
        ...axiosOptions,
    });
};

const fetchAndProcess = (url, method, data, axiosOptions, resolve, reject) => {
    const settings = getSettings();

    fetch(url, method, data, axiosOptions)
        .then(
            response => {
                return response;
            },
            error => {
                if (!error.response) throw error;
                return error.response;
            }
        )
        .then(response => {
            if (
                settings.requests.isErrorResponse(
                    response.status,
                    response.data
                )
            ) {
                throw response.data;
            } else {
                resolve(response.data);
            }
        })
        .catch(error => {
            reject(settings.requests.processError(error));
        });
};

export default (url, method = 'GET', data = null, axiosOptions = {}) =>
    new Promise((resolve, reject) => {
        const settings = getSettings();

        if (!settings.requests.batch.enabled) {
            return fetchAndProcess(
                url,
                method,
                data,
                axiosOptions,
                resolve,
                reject
            );
        }

        if (timeout) clearTimeout(timeout);
        queue.push({
            url,
            method,
            data,
            axiosOptions,
            resolve,
            reject,
        });

        timeout = setTimeout(() => {
            const processQueue = queue;
            queue = [];
            if (processQueue.length === 1) {
                fetchAndProcess(
                    processQueue[0].url,
                    processQueue[0].method,
                    processQueue[0].data,
                    processQueue[0].axiosOptions,
                    processQueue[0].resolve,
                    processQueue[0].reject
                );
                return;
            }

            fetch(
                settings.requests.batch.url,
                settings.requests.batch.method,
                settings.requests.batch.buildRequestBody(
                    processQueue.map((request, index) => {
                        let url = request.url;
                        let body = request.data;
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
                            url: settings.requests.prefix + url,
                            body,
                        };
                    })
                ),
                axiosOptions
            )
                .then(response => {
                    if (response.status !== 200) throw 'Request not successful';
                    settings.requests.batch
                        .parseResponse(response.data)
                        .forEach((response, index) => {
                            const requestObject = processQueue[index];
                            if (
                                settings.requests.isErrorResponse(
                                    response.statusCode,
                                    response.body
                                )
                            ) {
                                processQueue[0].reject(
                                    settings.requests.processError(
                                        response.body
                                    )
                                );
                            } else {
                                requestObject.resolve(response.body);
                            }
                        });
                })
                .catch(error => {
                    processQueue.forEach((queueItem, index) => {
                        processQueue[index].reject(
                            settings.requests.processError(error)
                        );
                    });
                });
        }, settings.requests.batch.delayTimeMS);
    });
