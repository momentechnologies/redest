import { isSingle, isAll, isMultiple } from './selectMetaKey';

export default (info = {}) => {
    if (isSingle(info.filter)) return null;
    if (isAll(info.filter)) {
        return {
            ...info.pagination,
        };
    }
    return {
        ...info.filter,
        ...info.pagination,
    };
};
