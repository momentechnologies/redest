import { createSelector } from 'reselect';
import selectMetaRaw from './selectMetaRaw';
import selectMetaKey from './selectMetaKey';

export default createSelector(
    (state, info) => state.redest[info.reducer],
    (state, info) => selectMetaRaw(state, info),
    (state, info) => selectMetaKey(info),
    (state, info) => info.selector,
    (reducerState, meta, metaKey, selector) => {
        const data =
            reducerState && reducerState.data && reducerState.data[metaKey]
                ? reducerState.data[metaKey]
                : {};
        return {
            meta,
            data: selector ? selector(data) : data,
        };
    }
);
