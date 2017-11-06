export default (retrieveData, props, callback) => {
    const data = retrieveData(props);
    Object.keys(data).forEach(key => {
        let info = {
            endpoint: '/' + key,
            reducer: key,
            raw: false,
            filter: null,
            onlyActions: false,
            onlyPagination: false,
            pagination: null,
        };

        if (data[key] && typeof data[key] === 'object') {
            if (data[key].endpoint) info.endpoint = data[key].endpoint;
            if (data[key].reducer) info.reducer = data[key].reducer;
            if (data[key].onlyActions) info.onlyActions = data[key].onlyActions;
            if (data[key].onlyPagination)
                info.onlyPagination = data[key].onlyPagination;
            if (data[key].raw === true) info.raw = true;
            if (data[key].pagination) info.pagination = data[key].pagination;
            info.filter = data[key].filter;
        } else {
            info.filter = data[key];
        }

        if (!info.raw && info.filter && typeof info.filter !== 'object') {
            info.filter = String(info.filter);
        }

        callback(info);
    });
};
