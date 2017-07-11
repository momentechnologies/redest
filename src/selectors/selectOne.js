export default (state, id) => {
    return {
        entity: state.entities[id] ? state.entities[id] : {},
        meta: state.getMeta[id] ? state.getMeta[id] : {}
    }
}