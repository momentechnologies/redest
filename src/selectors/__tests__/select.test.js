import select from '../select';
import selectMeta from '../selectMeta';

describe('select', () => {
    it('should return correct data', () => {
        const state = {
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
                all: {
                    testId: 123412,
                    ids: [1, 2, 3],
                },
                2: {
                    testId: 123412,
                    ids: [2],
                },
            },
        };

        const tests = [
            {
                filter: 'all',
                response: {
                    entities: [
                        state.entities[1],
                        state.entities[2],
                        state.entities[3],
                    ],
                    meta: selectMeta(state, 'all'),
                },
            },
            {
                filter: 1,
                response: {
                    entity: state.entities[1],
                    meta: selectMeta(state, 1),
                },
            },
            {
                filter: 2,
                response: {
                    entity: state.entities[2],
                    meta: selectMeta(state, 2),
                },
            },
        ];

        tests.forEach(test => {
            expect(select(state, test.filter)).toEqual(test.response);
        });
    });
});
