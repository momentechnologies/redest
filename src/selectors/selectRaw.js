import selectMetaRaw from './selectMetaRaw';
import selectMetaKey from './selectMetaKey';

export default (state, filter = null) => ({
    meta: selectMetaRaw(state, filter),
    data: (state && state[selectMetaKey(filter)]) ? state[selectMetaKey(filter)]: {}
})
