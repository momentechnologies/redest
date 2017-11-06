import { createSelector } from 'reselect';
import selectMetaKey from './selectMetaKey';
import { newMetaRaw } from '../reducerActions/utils/newMeta';

export default createSelector(
    (state, info) => {
        if (state.redest[info.reducer] && state.redest[info.reducer].meta) {
            return state.redest[info.reducer].meta;
        }
        return null;
    },
    (state, info) => selectMetaKey(info),
    (meta, metaKey) => {
        if (!meta) return newMetaRaw();
        if (!meta[metaKey]) return newMetaRaw();
        return meta[metaKey];
    }
);
