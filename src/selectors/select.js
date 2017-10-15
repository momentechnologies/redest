import { createSelector } from 'reselect';
import selectMeta from './selectMeta';
import selectMetaKey, { isSingle } from './selectMetaKey';

export default createSelector(
    (state, info) => selectMeta(state, info),
    (state, info) => state.redest[info.reducer],
    (state, info) => info,
    (meta, reducerState, info = null) => {
        const filter = info ? info.filter : null;
        if (isSingle(filter)) {
            if (!reducerState) return { entity: {}, meta };
            return {
                entity: reducerState.entities[selectMetaKey(filter)],
                meta
            };
        }

        if (!reducerState) return { entities: {}, meta };

        let entities = [];
        if (meta.ids && reducerState && reducerState.entities) {
            entities = meta.ids.map((id) => reducerState.entities[id]).filter((entity) => entity);
        }
        return {
            entities,
            meta
        }
    }
);