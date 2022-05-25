import axios from "axios";

const client = axios.create({
    baseURL: 'https://zsoon.shop',
    withCredentials: true,
})

const instance = axios.create({
    baseURL: 'https://imonit.co.kr',
    withCredentials: true,
})

client.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('token')
    config.headers.common['Authorization'] = `${accessToken}`;
    return config;
});

export const getApi = (path, config) => {
    return client.get(path, config)
}
export const getApi2 = (path, config) => {
    return instance.get(path, config)
}

export const postApi = (path, data, config) => {
    return client.post(path, data, config)
}

export const patchApi = (path, data, config) => {
    return client.patch(path, data, config)
}

export const putApi = (path, data, config) => {
    return client.put(path, data, config)
}

export const deleteApi = (path, config) => {
    return client.delete(path, config)
}

export default client