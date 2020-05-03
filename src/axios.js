import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://socialads-for-everyone.firebaseio.com/'
})

export default instance;