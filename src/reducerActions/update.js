export default (state, action) => ({
    ...state,
    entities: {
        ...state.entities,
        [action.payload.response[action.payload.idKey]]:
            action.payload.response,
    },
});
