import axios from "../axios"
export const apiGetCommentWithComic = (id) => axios({
    method: 'GET',
    url: `comment/${id}`,
})
export const apiGetCommentWithChapter = (id) => axios({
    method: 'GET',
    url: `comment/chapter/${id}`
})
export const apiCreateComment = ({id, isComic, content,}) => axios({
    method: 'POST',
    url: `comment/${id}`,
    data: {
        content,
        isComic
    }
})