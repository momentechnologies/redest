import { createSelector } from 'reselect';
import selectMeta from './selectMeta';

export default createSelector(
    (state, info) => selectMeta(state, info),
    meta => !(meta.isLoading || meta.loadedAt || meta.error)
);
