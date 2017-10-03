export default (url, method = 'GET', data = null) => new Promise((resolve, reject) => {
    let fetchData = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (method !== 'GET' && data !== null) {
        fetchData.body = JSON.stringify(data);
    }

    if (localStorage.getItem('jwt')) {
        fetchData.headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');
    }

    if (method === 'GET' && data !== null) {
        url += '?' + Object.keys(data).map((key) => key + '=' + data[key]).join('&');
    }

    fetch('/api' + url, fetchData)
        .then((response) => {
            if (!response.ok) {
                throw {
                    uid: 0,
                    message: 'Something went wrong',
                    extra: {}
                };
            }
            return response;
        })
        .then((response) => response.json())
        .then((json) => {
            if (!json.success) {
                throw json;
            }
            resolve(json.data);
        })
        .catch((error) => {
            reject(error);
        });
});

export const errorCodes = {
    FATAL: 0,
    ALREADY_EXISTS: 1,
    INVALID_REQUEST: 2,
    NOT_FOUND: 3,
    PARAMETER_MISSING: 4,
    UNAUTHORIZED: 5,
    VALIDATION: 6
};