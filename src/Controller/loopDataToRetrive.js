export default (dataToRetrieve, callback) => {
    dataToRetrieve.forEach((dataToRetrieve) => {
        callback(dataToRetrieve.reducer, dataToRetrieve.select);
    });
};