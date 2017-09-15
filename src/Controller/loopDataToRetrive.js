export default (retrieveData, props, callback) => {
    const data = retrieveData(props);
    Object.keys(data).forEach((key) => {
        callback(key, data[key]);
    });
};