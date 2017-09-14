import resetMeta from '../resetMeta';

export default (state) => ({
    ...state,
    meta: resetMeta(state.meta)
})