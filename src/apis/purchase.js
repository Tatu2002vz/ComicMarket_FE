import axios from '../axios'
export const apiGetPurchase = ({ id}) => axios({
    method: 'GET',
    url: `purchase/${id}`,
})

export const apiBuyChapter = ({payload, id}) => axios({
    method: 'POST',
    url: `purchase/${id}`,
    data: {
        comicID: payload
    }
})
export const apiGetAllPurchase = () => axios({
    method: 'GET',
    url: `purchase`
})

export const createPaymentURL = (amount) => axios({
    method: 'POST',
    url: `purchase/create_payment_url`,
    data: {
        amount: amount,
    }
})
export const getPaymentReturn = (payload) => axios({
    method: 'PUT',
    url: `purchase/vnpay_return`,
    data: payload
})