import { isAll, isSingle } from './selectMetaKey';

export default (info = {}) => {
    if (isAll(info.filter) || isSingle(info.filter)) return info.filter;

    return Object.keys(info.filter)
        .map(filterKey => filterKey + '_' + info.filter[filterKey])
        .join('_');
};
