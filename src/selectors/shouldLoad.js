import selectMeta from './selectMeta';

export default (state, filter = null) => {
    const meta = selectMeta(state, filter);
    return !(meta.isLoading || meta.loadedAt || meta.error);
}