import fillActions from './actions';

export default (store, baseUrl) => {
    const state = store.getState();
    return Promise.all(
        state.redest._fetchActionLog.map(action => {
            return fillActions(action.payload.info, baseUrl).get(
                store.dispatch
            );
        })
    );
};
