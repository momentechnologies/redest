import { createSelector } from 'reselect';
import selectMetaRaw from './selectMetaRaw';
import selectMetaKey from './selectMetaKey';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => selectMetaRaw(state, info),
    (state, info) => selectMetaKey(info),
    (reducerState, meta, metaKey) => {
        return {
            meta,
            data:
                reducerState && reducerState.data && reducerState.data[metaKey]
                    ? reducerState.data[metaKey]
                    : {},
        };
    }
);
