import { createSelector } from 'reselect';
import selectMeta from './selectMeta';
import selectMetaKey, { isSingle, getFilterOnlyKey } from './selectMetaKey';

export default createSelector(
    (state, info) => selectMeta(state, info),
    (state, info) =>
        state.redest[info.reducer] ? state.redest[info.reducer].entities : null,
    (state, info) =>
        state.redest[info.reducer]
            ? state.redest[info.reducer].pagination
            : null,
    (state, info) => info,
    (meta, entities, pagination, info) => {
        const filter = info ? info.filter : null;
        if (isSingle(filter)) {
            if (!entities) return { entity: {}, meta, pagination: null };
            return {
                entity: info.selector
                    ? info.selector(entities[filter])
                    : entities[filter],
                meta,
                pagination: null,
            };
        }

        if (!entities) return { entities: {}, meta, pagination: null };

        let returnEntities = [];
        if (meta.ids && entities) {
            returnEntities = meta.ids
                .map(id => entities[id])
                .filter(entity => entity);
        }
        let returnPagination = null;
        const paginationKey = getFilterOnlyKey(info);
        if (paginationKey && pagination && pagination[paginationKey]) {
            returnPagination = pagination[paginationKey];
        }

        return {
            entities: info.selector
                ? info.selector(returnEntities)
                : returnEntities,
            meta,
            pagination: returnPagination,
        };
    }
);
