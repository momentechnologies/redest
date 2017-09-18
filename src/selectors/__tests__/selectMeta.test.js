import selectMeta from '../selectMeta';

describe('selectMeta', () => {
    it('should return the correct meta', () => {
        const state = {
            entities: {
                1: {
                    attribute: 'value'
                },
                2: {
                    attribute: 'value'
                },
                3: {
                    attribute: 'value'
                }
            },
            meta: {
                all: {
                    testId: 123412,
                    ids: [1, 2, 3]
                },
                2: {
                    testId: 123412,
                    ids: [2]
                }
            }
        };

        const tests = [
            {
                filter: 'all',
                response: state.meta.all
            },
            {
                filter: 1,
                response: state.meta.all
            },
            {
                filter: 2,
                response: state.meta['2']
            },
            {
                filter: 4,
                response: {
                    isLoading: false,
                    loadedAt: false,
                    error: false,
                    ids: []
                }
            }
        ];

        tests.forEach((test) => {
            expect(selectMeta(state, test.filter)).toEqual(test.response);
        });
    });
});