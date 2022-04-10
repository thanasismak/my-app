import axios from "axios";
import Axios from "axios";

const baseAPI = Axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public'
})
let cancel
cancel = axios.CancelToken(c => cancel = c);
const key = '04aace4f699fa3248ccc7d117714e1da';

export { baseAPI, key, cancel }