import mainReducer from './mainReducer';
import { setSettings } from './settings';

export default (userSettings = {}) => {
    setSettings(userSettings);
    return mainReducer;
};
