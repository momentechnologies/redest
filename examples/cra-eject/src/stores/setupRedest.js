import Error from '../components/Error';
import Loading from '../components/Loading';
import { reducerSetup } from 'redest';

export default () => {
    return reducerSetup({
        components: {
            error: Error,
            loading: Loading,
        },
        requests: {
            prefix: '/api',
            retrievePaginationData: response => response._pagination,
            isErrorResponse: (statusCode, response) => {
                return statusCode >= 400;
            },
            processError: requestError => {
                let error = {
                    uid: 0,
                    message: 'Something went wrong',
                    extra: {},
                };

                if (requestError) {
                    if (requestError.uid) error.uid = requestError.uid;
                    if (requestError.message)
                        error.message = requestError.message;
                    if (requestError.extra) error.extra = requestError.extra;
                }
                return error;
            },
            batch: {
                enabled: false,
                buildRequestBody: requests => ({
                    batch: requests.map((request, index) => ({
                        ...request,
                        'content-type': 'application/json',
                        name: index,
                    })),
                }),

                parseResponse: response => {
                    return response.map(singleResponse => ({
                        body: singleResponse.body,
                        statusCode: singleResponse.code,
                    }));
                },
            },
        },
    });
};
