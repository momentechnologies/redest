import { combineReducers } from 'redux';
import { reducerSetup } from 'redest';

export combineReducers({
    ...storeSetup(['users', 'repos'])
});