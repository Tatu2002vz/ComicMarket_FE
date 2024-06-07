import axios from '../axios'

export const apiGetGenres = () => axios({
    params: {
        limit: 50
    },
    url: 'genre',
    method: 'GET',
})