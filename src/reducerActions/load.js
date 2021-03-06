const currentTimestamp = () => new Date().getTime();

export default (state = {}, action) => {
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
                    },
                },
            };
        case 'success':
            let pagination = {};
            if (action.payload.paginationKey) {
                pagination = {
                    pagination: {
                        ...state.pagination,
                        [action.payload.paginationKey]:
                            action.payload.pagination,
                    },
                };
            }
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [key]: {
                        isLoading: false,
                        error: false,
                        loadedAt: currentTimestamp(),
                        ids: action.payload.ids,
                    },
                },
                entities: {
                    ...state.entities,
                    ...action.payload.entities,
                },
                ...pagination,
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
                    },
                },
            };
        default:
            return state;
    }
};
