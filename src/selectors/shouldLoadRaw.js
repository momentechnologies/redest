import selectMetaRaw from './selectMetaRaw';

export default (state, filter = null) => {
    const meta = selectMetaRaw(state, filter);
    return !(meta.isLoading || meta.loadedAt || meta.error);
}