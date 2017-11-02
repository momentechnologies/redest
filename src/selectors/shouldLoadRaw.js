import { createSelector } from 'reselect';
import selectMetaRaw from './selectMetaRaw';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => selectMetaRaw(state, info),
    (state, meta) => !(meta.isLoading || meta.loadedAt || meta.error)
);
