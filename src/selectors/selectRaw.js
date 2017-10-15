import { createSelector } from 'reselect';
import selectMetaRaw from './selectMetaRaw';
import selectMetaKey from './selectMetaKey';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => selectMetaRaw(state, info),
    (state, info) => info ? info.filter : null,
    (reducerState, meta, filter) => ({
        meta,
        data: (reducerState && reducerState.data && reducerState.data[selectMetaKey(filter)]) ? reducerState.data[selectMetaKey(filter)]: {}
    })
);
