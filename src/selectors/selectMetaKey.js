export const getFilterOnlyKey = (info = null) => {
    if (isAll(info.filter)) return 'all';

    if (isMultiple(info.filter)) {
        return Object.keys(info.filter)
            .map(filterKey => filterKey + '_' + info.filter[filterKey])
            .join('_');
    }

    return info.filter;
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
        getFilterOnlyKey(info),
        getPagination(info.pagination),
    ].join('_');
};

export const isAll = filter => !filter || filter === 'all';
export const isSingle = filter => !isAll(filter) && typeof filter !== 'object';
export const isMultiple = filter => isAll(filter) || typeof filter === 'object';
