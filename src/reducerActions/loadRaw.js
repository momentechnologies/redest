const currentTimestamp = () => new Date().getTime();

export default (state, action) => {
    let key = action.payload.metaKey;
    switch (action.status) {
        case 'start':
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [key]: {
                        ...state.meta[key],
                        isLoading: true,
                        error: false,
                        loadedAt: null
                    }
                }
            };
        case 'success':
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [key]: {
                        isLoading: false,
                        error: false,
                        loadedAt: currentTimestamp()
                    }
                },
                data: {
                    ...state.data,
                    [key]: action.payload.data
                }
            };
        case 'error':
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [key]: {
                        isLoading: false,
                        error: action.payload.error,
                        loadedAt: currentTimestamp(),
                    }
                }
            };
        default:
            return state;
    }
}