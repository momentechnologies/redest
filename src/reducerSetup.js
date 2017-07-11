import reducer from './reducer';

export default (reducers) => {
    let stores = {};
    reducers.forEach((reducerInfo) => {
        if (typeof reducerInfo !== 'object') {
            stores[reducerInfo] = reducer(reducerInfo, '/' + reducerInfo);
        } else {
            stores[reducerInfo.storeName] = reducer(reducerInfo.prefix, reducerInfo.baseUrl);
        }
    });
    return stores;
};