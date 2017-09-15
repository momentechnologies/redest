import reducer from './reducer';

export default (state = {}, action) => {
    if (action.redest) {
        return {
            ...state,
            [action.redest.reducer]: reducer()(state[action.redest.reducer], action)
        }
    }
    return state;
};