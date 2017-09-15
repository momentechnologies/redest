import selectMetaKey, { isSingle } from './selectMetaKey';
import newMeta from '../reducerActions/utils/newMeta';

export default (state, filter = null) => {
    const metaKey = selectMetaKey(filter);
    if (!state || !state.meta) return newMeta();
    if (isSingle(filter) && state.entities[metaKey]) {
        const metaWithId = Object.keys(state.meta).find((currentMetaKey) => state.meta[currentMetaKey].ids.indexOf(metaKey) !== -1);
        if (metaWithId) return state.meta[metaWithId];
        return newMeta();
    }
    if (!state.meta[metaKey]) return newMeta();
    return state.meta[metaKey];
}