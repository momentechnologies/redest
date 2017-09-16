export default (retrieveData, props, callback) => {
    const data = retrieveData(props);
    Object.keys(data).forEach((key) => {
        let info = {
            endpoint: '/' + key,
            reducer: key,
            raw: false,
            filter: null
        };

        if (data[key] && typeof data[key] === 'object') {
            if (data[key].endpoint) info.endpoint = data[key].endpoint;
            if (data[key].reducer) info.reducer = data[key].reducer;
            if (data[key].raw === true) info.raw = true;
            info.filter = data[key].filter;
        } else {
            info.filter = data[key];
        }

        callback(info);
    });
};

const testSetup = (props) => ({
    users: {
        filter: {}
    },
    chargeSetup: {
        raw: true,
        endpoint: ''
    }
});