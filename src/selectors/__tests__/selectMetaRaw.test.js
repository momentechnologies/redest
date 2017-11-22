import selectMeta from '../selectMeta';

describe('selectMetaRaw', () => {
    const state = {
        redest: {
            test: {
                entities: {
                    1: {
                        attribute: 'value',
                    },
                    2: {
                        attribute: 'value',
                    },
                    3: {
                        attribute: 'value',
                    },
                },
                meta: {
                    _all_: {
                        testId: 123412,
                        ids: [1, 2, 3],
                    },
                    2: {
                        testId: 123412,
                        ids: [2],
                    },
                },
            },
        },
    };

    const tests = [
        {
            info: {
                filter: 'all',
                reducer: 'test',
            },
            response: state.redest.test.meta._all_,
        },
        {
            info: {
                filter: 1,
                reducer: 'test',
            },
            response: state.redest.test.meta._all_,
        },
        {
            info: {
                filter: 2,
                reducer: 'test',
            },
            response: state.redest.test.meta['2'],
        },
        {
            info: {
                filter: 4,
                reducer: 'test',
            },
            response: {
                isLoading: false,
                loadedAt: false,
                error: false,
                ids: [],
            },
        },
    ];

    tests.forEach(test => {
        it('should return the correct meta', () => {
            expect(selectMeta(state, test.info)).toEqual(test.response);
        });
    });
});
