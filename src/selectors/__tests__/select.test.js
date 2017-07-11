import select from '../select';

test('"select" selects the right entities in the state', () => {
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
                ids: [1, 2, 3]
            }
        }
    };

    const response = {
        entities: [state.entities[1], state.entities[2], state.entities[3]],
        meta: state.meta.all
    };

    expect(select(state)).toEqual(response);
});