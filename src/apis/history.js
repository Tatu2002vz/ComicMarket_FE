import axios from '../axios'
export const apiCreateHistory = (payload) => axios({
    method: 'POST',
    url: `history`,
    data: {
        ...payload
    }
})

export const apiGetHistory = () => axios({
    method: 'GET',
    url: `history`,
})