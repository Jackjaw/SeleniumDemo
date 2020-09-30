const Fetch = async (url, option) => {
    let res = await fetch(url, option);
    if (res.status >= 400 && res.status < 500) {
        return location.replace('/error/4xx.html');
    }
    if (res.status >= 500 && res.status < 600) {
        return location.replace('/error/5xx.html');
    }
    if (res.status < 200 || res.status >= 300) {
        return Promise.reject(res.status);
    }
    return res.json();
};

export default Fetch;