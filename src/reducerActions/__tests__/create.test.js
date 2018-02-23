import create from '../create';

describe('create', () => {
    it('should return correct object', () => {
        const action = {
            payload: {
                id: 1,
                test: test,
            },
        };
        const response = {
            entities: {
                1: action.payload,
            },
            meta: {},
        };

        expect(create({ entities: {}, meta: {} }, action)).toEqual(response);
    });
});
