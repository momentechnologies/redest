import selectMetaKey from './selectMetaKey';

export default (state, filter = null) => {
    const metaKey = selectMetaKey(filter);
    if (!state.getMeta[metaKey]) {
        return true;
    }
    return !(state.getMeta[metaKey].isLoading || state.getMeta[metaKey].loadedAt);
}