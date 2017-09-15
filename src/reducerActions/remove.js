import resetMeta from './utils/resetMeta';

export default (state, action) => {
    let newEntities = {...state.entities};
    delete newEntities[action.payload];
    return {
        ...state,
        entities: newEntities,
        meta: resetMeta(state.meta)
    };
}