import settings from '../settings';
import buildActions from './buildActions';

export default (dataToRetrieve, props) => {
    let newProps = {};

    Object.keys(props).forEach((propKey) => {
        if (!propKey.startsWith(settings.internalPropPrefix)) {
            newProps[propKey] = props[propKey];
        }
    });

    return {
        ...newProps,
        ...buildActions(dataToRetrieve, props)
    }
};