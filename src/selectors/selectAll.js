import selectMetaKey from './selectMetaKey';

export default (state, filter = null) => {
    const metaKey = selectMetaKey(filter);
    const meta = state.getMeta[metaKey];
    let entities = [];
    if (meta && meta.ids) {
        entities = meta.ids.map(id => {
            return state.entities[id];
        }).filter(entity => entity);
    }
    return {
        entities: entities,
        meta: meta
    }
}
