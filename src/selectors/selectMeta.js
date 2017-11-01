import { createSelector } from 'reselect';
import selectMetaKey, { isSingle } from './selectMetaKey';
import newMeta from '../reducerActions/utils/newMeta';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => info,
    (reducerState, info = null) => {
        const filter = info ? info.filter : null;
        const metaKey = selectMetaKey(info);

        // If stuff are not set
        if (!reducerState || !reducerState.meta) return newMeta();

        // Search By meta key first and return if found
        if (reducerState.meta[metaKey]) return reducerState.meta[metaKey];

        // If single look for matching ids
        if (isSingle(filter) && reducerState.entities[filter]) {
            const metaWithId = Object.keys(
                reducerState.meta
            ).find(currentMetaKey => {
                if (!reducerState.meta[currentMetaKey].ids) return false;
                return (
                    reducerState.meta[currentMetaKey].ids.indexOf(filter) !== -1
                );
            });
            if (metaWithId) return reducerState.meta[metaWithId];
            return newMeta();
        }

        // fallback
        return newMeta();
    }
);
