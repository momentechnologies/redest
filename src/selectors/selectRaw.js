import { createSelector } from 'reselect';
import selectMetaRaw from './selectMetaRaw';
import selectMetaKey from './selectMetaKey';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => selectMetaRaw(state, info),
    (state, info) => info,
    (reducerState, meta, info) => ({
        meta,
        data:
            reducerState &&
            reducerState.data &&
            reducerState.data[selectMetaKey(info)]
                ? reducerState.data[selectMetaKey(info)]
                : {},
    })
);
