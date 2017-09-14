import settings from '../settings';

export default (dataToRetrieve, callback) => {
    dataToRetrieve.forEach((dataToRetrieve) => {
        callback(dataToRetrieve.reducer, settings.internalPropPrefix + dataToRetrieve.reducer, dataToRetrieve);
    });
};