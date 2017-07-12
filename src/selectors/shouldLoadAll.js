import selectMetaKey from './selectMetaKey';

export default (state, filter = null) => {
    const metaKey = selectMetaKey(filter);
    if (!state.meta[metaKey]) {
        return true;
    }
    return !(state.meta[metaKey].isLoading || state.meta[metaKey].loadedAt || state.meta[metaKey].error);
}