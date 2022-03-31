import axios from 'axios'
const API_ROOT = 'https://622efc023ff58f023c123c84.mockapi.io'

export const getListUser = async () => {
    const request = await axios.get(`${API_ROOT}/v1/users`)
    return request.data
}

export const deleteUser = async id => {
    const request = await axios.delete(`${API_ROOT}/v1/users/${id}`)
    return request.data
}

export const updateUser = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/v1/users/${id}`, data)
    return request.data
}

export const createUser = async data => {
    const request = await axios.post(`${API_ROOT}/v1/users`, data)
    return request.data
}
