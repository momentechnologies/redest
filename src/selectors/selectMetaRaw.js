import selectMetaKey from './selectMetaKey';
import { newMetaRaw } from '../reducerActions/utils/newMeta';

export default (state, filter = null) => {
    const metaKey = selectMetaKey(filter);
    if (!state || !state.meta) return newMetaRaw();
    if (!state.meta[metaKey]) return newMetaRaw();
    return state.meta[metaKey];
}