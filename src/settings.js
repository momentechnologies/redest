import deepmerge from 'deepmerge';

let settings = {
    internalPropPrefix: '__redest__',
    components: {
        loading: null,
        error: null,
    },
    requests: {
        prefix: '',
        batch: {
            enabled: false,
            delayTimeMS: 10,
            url: '/batch',
            method: 'POST',
            buildRequestBody: requests => {
                return {
                    batch: requests,
                };
            },
            parseResponse: response =>
                response.map(singleResponse => ({
                    body: response.data,
                    statusCode: response.statusCode,
                })),
        },
        retrieveRequestData: response => response.data,
        retrievePaginationData: response => response._pagination,
        isErrorResponse: (statusCode, response) => statusCode >= 400,
        processError: error => error,
    },
};

export const setSettings = (updatedSettings = {}) => {
    settings = deepmerge(settings, updatedSettings, {
        arrayMerge: (destination, source) => source,
    });
};

export const getSettings = () => {
    return settings;
};
