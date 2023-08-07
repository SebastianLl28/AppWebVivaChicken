import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/locales'
})

export const getLocales = async () => { 
    const { data } = await api.get('/')
    return data
}

export const postLocal = async (local) => {
    const { data } = await api.post('/create', local)
    return data
}

export const putLocal = async (local) => {
    const { data } = await api.put(`/update/${local.id}`, local)
    return data
}

export const deleteLocal = async (id) => {
    const { data } = await api.delete(`/delete/${id}`)
    return data
}