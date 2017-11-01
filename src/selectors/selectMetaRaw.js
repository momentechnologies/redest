import { createSelector } from 'reselect';
import selectMetaKey from './selectMetaKey';
import { newMetaRaw } from '../reducerActions/utils/newMeta';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => info,
    (reducerState, info) => {
        const metaKey = selectMetaKey(info);
        if (!reducerState || !reducerState.meta) return newMetaRaw();
        if (!reducerState.meta[metaKey]) return newMetaRaw();
        return reducerState.meta[metaKey];
    }
);
