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
            .then(handleErrors(reject))
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            });
    });

const handleErrors = (reject) => (response) => {
        if (!response.ok) {
            return response.json().then(
                (success) => {
                    reject(success);
                },
                () => {
                    reject(response.statusText);
                }
            );
        }
        return response;
    };