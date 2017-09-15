import loopDataToRetrive from './loopDataToRetrive';

const hasError = (meta) => meta.error && !meta.isLoading;

export default (dataToRetrieve, props) => {
    let error = false;
    loopDataToRetrive(dataToRetrieve, (reducer) => {
        if (!error) {
            const meta = props[reducer].meta;
            if (meta) error = hasError(props[reducer].meta);
        }
    });
    return error;
}