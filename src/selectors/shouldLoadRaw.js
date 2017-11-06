import { createSelector } from 'reselect';
import selectMetaRaw from './selectMetaRaw';

export default createSelector(
    (state, info) => selectMetaRaw(state, info),
    meta => !(meta.isLoading || meta.loadedAt || meta.error)
);
