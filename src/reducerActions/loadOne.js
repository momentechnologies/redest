const currentTimestamp = () => new Date().getTime();

export default (state, action) => {
    switch (action.status) {
        case 'start':
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [action.payload]: {
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
                    [action.payload.id]: {
                        isLoading: false,
                        error: false,
                        loadedAt: currentTimestamp()
                    }
                },
                entities: {
                    ...state.entities,
                    [action.payload.id]: action.payload
                }
            };
        case 'error':
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [action.payload.id]: {
                        isLoading: false,
                        error: action.payload.error,
                        loadedAt: false
                    }
                }
            };
        default:
            return state;
    }
}