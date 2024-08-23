import { Api } from '../../lib/common/index'


export const listBookFn = async () => {
	const response = await Api.get('/book/all-books')
	return response.data
}

export const insertBookFn = async (data) => {
	const response = await Api.post('/book/insert-book', data)
	return response.data
}

export const singleBookFn = async (id) => {
	const response = await Api.get(`/book/detail-book/${id}`)
	return response.data
}

export const updateBookFn = async (id, data) => {
	const response = await Api.put(`/book/update-book/${id}`, data)
	return response.data
}

export const deleteBookFn = async (id) => {
	const response = await Api.delete(`/book/delete-book/${id}`)
	return response.data
}

