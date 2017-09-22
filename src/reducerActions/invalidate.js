import resetMeta from './utils/resetMeta';

export default (state) => ({
    ...state,
    meta: resetMeta(state.meta)
});