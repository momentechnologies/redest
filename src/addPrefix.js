export default (prefix, constants) => {
    let newObject = {};
    Object.keys(constants).forEach((key) => {
        newObject[key] = prefix + '/' + constants[key];
    });
    return newObject;
};