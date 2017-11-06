import { isSingle, isAll, isMultiple } from './selectMetaKey';

export default (info = {}) => {
    if (isSingle(info.filter)) return null;
    if (!info.pagination && isAll(info.filter)) {
        return null;
    }
    return {
        ...info.filter,
        ...info.pagination,
    };
};
