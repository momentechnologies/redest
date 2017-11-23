import axios from 'axios';
import { getSettings } from '../settings';

describe('fetch', () => {
    afterEach(() => {
        jest.resetModules('axios');
        jest.resetModules('../settings');
    });
    test('should make a request', () => {
        jest.mock('axios', () => {
            return jest.fn(setup => {
                return Promise.resolve({ data: 'test', status: 200 });
            });
        });

        const fetch = require('../fetch').default;

        return fetch('/api/status').then(success => {
            expect(success).toEqual('test');
            expect(require('axios').mock.calls.length).toEqual(1);
        });
    });

    test('should not batch by default', () => {
        jest.mock('axios', () => {
            return jest.fn(setup => {
                return Promise.resolve({ data: 'test', status: 200 });
            });
        });

        const fetch = require('../fetch').default;

        return Promise.all([fetch('/api/status'), fetch('/api/status2')]).then(
            success => {
                expect(require('axios').mock.calls.length).toEqual(2);
                expect(success).toEqual(['test', 'test']);
            }
        );
    });

    test('should batch the request', () => {
        jest.mock('axios', () => {
            return jest.fn(setup => {
                return Promise.resolve({
                    data: [
                        {
                            body: 'test',
                            statusCode: 200,
                        },
                        {
                            body: 'test',
                            statusCode: 200,
                        },
                    ],
                    status: 200,
                });
            });
        });

        jest.mock('../settings', () => {
            return {
                getSettings: jest.fn(setup => {
                    return {
                        requests: {
                            prefix: '',
                            batch: {
                                enabled: true,
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
                                        body: singleResponse.body,
                                        statusCode: singleResponse.statusCode,
                                    })),
                            },
                            isErrorResponse: (statusCode, response) =>
                                statusCode >= 400,
                            processError: error => error,
                        },
                    };
                }),
            };
        });

        const fetch = require('../fetch').default;

        return Promise.all([fetch('/api/status'), fetch('/api/status2')]).then(
            success => {
                const calls = require('axios').mock.calls;
                expect(calls.length).toEqual(1);
                expect(calls[0][0]).toEqual({
                    method: 'POST',
                    url: '/batch',
                    data: {
                        batch: [
                            { body: null, method: 'GET', url: '/api/status' },
                            { body: null, method: 'GET', url: '/api/status2' },
                        ],
                    },
                    params: null,
                    withCredentials: true,
                });
                expect(success).toEqual(['test', 'test']);
            }
        );
    });
});
