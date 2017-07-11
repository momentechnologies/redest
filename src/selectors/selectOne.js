export default (state, id) => ({
    entity: state.entities[id] ? state.entities[id] : {},
    meta: state.getMeta[id] ? state.getMeta[id] : {}
});