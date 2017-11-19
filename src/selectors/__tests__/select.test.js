import select from '../select';
import selectMeta from '../selectMeta';

describe('select', () => {
    it('should return correct data', () => {
        const state = {
            redest: {
                testReducer: {
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
                    reducer: 'testReducer',
                },
                response: {
                    entities: [
                        state.redest.testReducer.entities[1],
                        state.redest.testReducer.entities[2],
                        state.redest.testReducer.entities[3],
                    ],
                    meta: selectMeta(state, {
                        filter: 'all',
                        reducer: 'testReducer',
                    }),
                    pagination: null,
                },
            },
            {
                info: {
                    filter: 1,
                    reducer: 'testReducer',
                },
                response: {
                    entity: state.redest.testReducer.entities[1],
                    meta: selectMeta(state, {
                        filter: 1,
                        reducer: 'testReducer',
                    }),
                    pagination: null,
                },
            },
            {
                info: {
                    filter: 2,
                    reducer: 'testReducer',
                },
                response: {
                    entity: state.redest.testReducer.entities[2],
                    meta: selectMeta(state, {
                        filter: 2,
                        reducer: 'testReducer',
                    }),
                    pagination: null,
                },
            },
        ];

        tests.forEach(test => {
            expect(select(state, test.info)).toEqual(test.response);
        });
    });
});
