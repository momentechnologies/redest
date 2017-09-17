export default (state, action) => ({
    ...state,
    entities: {
        ...state.entities,
        [action.payload.id]: action.payload
    }
});