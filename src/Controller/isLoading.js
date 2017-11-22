import loopDataToRetrive from './loopDataToRetrive';

const isLoading = meta => meta.isLoading || !meta.loadedAt;

export default (dataToRetrieve, props) => {
    let loading = false;
    loopDataToRetrive(dataToRetrieve, props, info => {
        if (info.onlyActions) return;
        if (info.onlyPagination) return;
        if (!loading) {
            const meta = props[info.reducer].meta;
            loading = meta ? isLoading(meta) : true;
        }
    });
    return loading;
};
