import { createSelector } from 'reselect';
import selectMeta from './selectMeta';
import selectMetaKey, { isSingle } from './selectMetaKey';
import selectPaginationKey from './selectPaginationKey';

export default createSelector(
    (state, info) => selectMeta(state, info),
    (state, info) =>
        state.redest[info.reducer] ? state.redest[info.reducer].entities : null,
    (state, info) =>
        state.redest[info.reducer]
            ? state.redest[info.reducer].pagination
            : null,
    (state, info) => info,
    (meta, entities, pagination, info = null) => {
        const filter = info ? info.filter : null;
        if (isSingle(filter)) {
            if (!entities) return { entity: {}, meta };
            return {
                entity: entities[filter],
                meta,
            };
        }

        if (!entities) return { entities: {}, meta };

        let returnEntities = [];
        if (meta.ids && entities) {
            returnEntities = meta.ids
                .map(id => entities[id])
                .filter(entity => entity);
        }
        let returnPagination = null;
        const paginationKey = selectPaginationKey(info);
        if (paginationKey && pagination && pagination[paginationKey]) {
            returnPagination = pagination[paginationKey];
        }

        return {
            entities: returnEntities,
            meta,
            pagination: returnPagination,
        };
    }
);
