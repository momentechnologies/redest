export default (state, action) => {
    const idToDelete = '' + action.payload;

    let newEntities = {...state.entities};
    delete newEntities[idToDelete];

    let newMeta = {...state.meta};
    Object.keys(state.meta).forEach((meta) => {
        if (newMeta[meta].ids.indexOf(idToDelete) !== -1) {
            newMeta[meta] = {
                ...newMeta[meta],
                ids: [...newMeta[meta].ids].filter((id) => idToDelete !== id)
            }
        }
    });

    return {
        ...state,
        entities: newEntities,
        meta: newMeta
    };
};