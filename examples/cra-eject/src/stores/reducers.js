import { combineReducers } from 'redux';
import setupRedest from './setupRedest';

export const makeRootReducer = () => {
    return combineReducers({
        redest: setupRedest(),
    });
};

export default makeRootReducer;
