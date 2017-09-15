export default (meta) => {
    let newGetMeta = {};
    Object.keys(meta).forEach((getKey) => {
        newGetMeta[getKey] = {
            ...meta[getKey],
            loadedAt: false
        }
    });
    return newGetMeta
};