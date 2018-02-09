import reducer, { types } from './reducer';

const fetchActionLogReducer = (state = [], action) => {
    switch (action.type) {
        case types.LOAD:
        case types.LOAD_RAW:
            return [...state, action];
        default:
            return state;
    }
};

export default (state = { _fetchActionLog: [] }, action) => {
    if (action.redest) {
        return {
            ...state,
            _fetchActionLog: fetchActionLogReducer(
                state._fetchActionLog,
                action
            ),
            [action.redest.reducer]: reducer()(
                state[action.redest.reducer],
                action
            ),
        };
    }
    return state;
};
