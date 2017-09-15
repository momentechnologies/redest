import selectMeta from './selectMeta';
import selectMetaKey, { isSingle } from './selectMetaKey';

export default (state, filter = null) => {
    const meta = selectMeta(state, filter);
    if (isSingle(filter)) {
        if (!state) return { entity: {}, meta };
        return {
            entity: state.entities[selectMetaKey(filter)],
            meta
        };
    }

    if (!state) return { entities: {}, meta };

    let entities = [];
    if (meta.ids && state && state.entities) {
        entities = meta.ids.map((id) => state.entities[id]).filter((entity) => entity);
    }
    return {
        entities,
        meta
    }
}
