import resetMeta from './utils/resetMeta';

export default (state, action) => ({
    ...state,
    entities: {
        ...state.entities,
        [action.payload.id]: action.payload
    },
    meta: resetMeta(state.meta)
})