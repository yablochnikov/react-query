import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:4000' })

export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = response => {
        console.debug('Request Successful!', response)
        return response
    }
    const onError = error => {
        // optionally catch errors and add additional logging here
        console.error('Request Failed:', error.config)
        if (error.response) {
            console.error('Status:', error.response.status)
            console.error('Data:', error.response.data)
            console.error('Headers:', error.response.headers)
        } else {
            console.error('Error Message:', error.message)
        }
        return Promise.reject(error.response || error.message)
    }

    return client(options).then(onSuccess).catch(onError)
}