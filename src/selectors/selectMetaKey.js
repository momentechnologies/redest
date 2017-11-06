const getKey = (filter = null) => {
    if (isAll(filter)) return 'all';

    if (isMultiple(filter)) {
        return Object.keys(filter)
            .map(filterKey => filterKey + '_' + filter[filterKey])
            .join('_');
    }

    return filter;
};

const getPagination = pagination => {
    if (!pagination) return '';
    return Object.keys(pagination)
        .map(filterKey => filterKey + '_' + pagination[filterKey])
        .join('_');
};

export default (info = {}) => {
    return [
        info.endpoint,
        getKey(info.filter),
        getPagination(info.pagination),
    ].join('_');
};

export const isAll = filter => !filter || filter === 'all';
export const isSingle = filter => !isAll(filter) && typeof filter !== 'object';
export const isMultiple = filter => isAll(filter) || typeof filter === 'object';
