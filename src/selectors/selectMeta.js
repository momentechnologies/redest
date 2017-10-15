import { createSelector } from 'reselect';
import selectMetaKey, { isSingle } from './selectMetaKey';
import newMeta from '../reducerActions/utils/newMeta';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => info,
    (reducerState, info = null) => {
        const filter = info ? info.filter : null;
        const metaKey = selectMetaKey(filter);
        if (!reducerState || !reducerState.meta) return newMeta();
        if (isSingle(filter) && reducerState.entities[metaKey]) {
            const metaWithId = Object.keys(reducerState.meta).find((currentMetaKey) => {
                if (!reducerState.meta[currentMetaKey].ids) return false;
                return reducerState.meta[currentMetaKey].ids.indexOf(filter) !== -1
            });
            if (metaWithId) return reducerState.meta[metaWithId];
            return newMeta();
        }
        if (!reducerState.meta[metaKey]) return newMeta();
        return reducerState.meta[metaKey];
    }
);