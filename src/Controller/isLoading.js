import loopDataToRetrive from './loopDataToRetrive';

const isLoading = (meta) => meta.isLoading || !meta.loadedAt;

export default (dataToRetrieve, props) => {
    let loading = false;
    loopDataToRetrive(dataToRetrieve, (reducer, propReducer, dataToRetrieve) => {
        if (!loading) {
            const meta = props[reducer].meta;
            loading = meta ? isLoading(props[reducer].meta) : true;
        }
    });
    return loading;
}