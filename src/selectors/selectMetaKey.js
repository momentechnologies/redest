const getKey = (filter = null) => {
    if (isAll(filter)) return 'all';

    if (isMultiple(filter)) {
        return Object.keys(filter)
            .map(filterKey => filterKey + '_' + filter[filterKey])
            .join('_');
    }

    return filter;
};

export default (info = {}) => {
    return info.endpoint + '_' + getKey(info.filter);
};

export const isAll = filter => !filter || filter === 'all';
export const isSingle = filter => !isAll(filter) && typeof filter !== 'object';
export const isMultiple = filter => isAll(filter) || typeof filter === 'object';
