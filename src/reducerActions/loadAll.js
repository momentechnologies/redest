import { selectMetaKey } from '../selectors';
const currentTimestamp = () => new Date().getTime();

export default (state, action) => {
    let key = selectMetaKey(action.payload.filter);
    switch (action.status) {
        case 'start':
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [key]: {
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
                        loadedAt: currentTimestamp(),
                        ids: Object.keys(action.payload.entities)
                    }
                },
                entities: {
                    ...action.payload.entities
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