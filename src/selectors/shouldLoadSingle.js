export default (state, id) => {
    if (!state.meta[id]) {
        return true;
    }

    return !(state.meta[id].isLoading || state.meta[id].loadedAt || state.meta[id].error);
}