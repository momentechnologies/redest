export default (state, id) => {
    if (state.entities[id]) {
        return false;
    }
    if (!state.meta[id]) {
        return true;
    }
    return !(state.meta[id].isLoading || state.meta[id].loadedAt);
}