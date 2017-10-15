import { createSelector } from 'reselect';
import selectMetaKey from './selectMetaKey';
import { newMetaRaw } from '../reducerActions/utils/newMeta';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => info ? info.filter : null,
    (reducerState, filter = null) => {
        const metaKey = selectMetaKey(filter);
        if (!reducerState || !reducerState.meta) return newMetaRaw();
        if (!reducerState.meta[metaKey]) return newMetaRaw();
        return reducerState.meta[metaKey];
    }
);