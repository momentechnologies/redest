export default (meta) => Object.keys(meta).reduce((acc, getKey) => {
    return {
        ...acc,
        [getKey]: {
            ...meta[getKey],
            loadedAt: false
        }
    };
}, {});