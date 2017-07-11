export default (filter = null) => {
    if (filter) {
        return Object.keys(filter).map((filterKey) => filterKey + '_' + filter[filterKey]).join('_');
    }

    return 'all';
}