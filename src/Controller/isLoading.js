import loopDataToRetrive from './loopDataToRetrive';

const isLoading = meta => meta.isLoading || !meta.loadedAt;

export default (dataToRetrieve, props) => {
    let loading = false;
    loopDataToRetrive(dataToRetrieve, props, info => {
        if (info.onlyActions) return;
        if (!loading) {
            const meta = props[info.reducer].meta;
            loading = meta ? isLoading(props[info.reducer].meta) : true;
        }
    });
    return loading;
};
