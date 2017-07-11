export default (state, id) => {
    if (state.entities[id]) {
        return false;
    }
    if (!state.getMeta[id]) {
        return true;
    }
    return !(state.getMeta[id].isLoading || state.getMeta[id].loadedAt);
}