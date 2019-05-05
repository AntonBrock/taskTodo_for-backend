import axios from 'axios'

let Api = axios.create({
    baseURL: 'http://195.128.96.20:9990' //Адрес сервера
})

export default Api
