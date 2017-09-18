import selectMetaRaw from './selectMetaRaw';
import selectMetaKey from './selectMetaKey';

export default (state, filter = null) => ({
    meta: selectMetaRaw(state, filter),
    data: (state && state.data && state.data[selectMetaKey(filter)]) ? state.data[selectMetaKey(filter)]: {}
});
