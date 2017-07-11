export default (state, id) => ({
    entity: state.entities[id] ? state.entities[id] : {},
    meta: state.meta[id] ? state.meta[id] : {}
});