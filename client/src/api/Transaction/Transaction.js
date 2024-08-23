import { Api } from '../../lib/common/index'


export const getAllTransactionFn = async () => {
	const response = await Api.get('/loan/all-loans')
	return response.data
}

export const insertTransactionFn = async (data) => {
	const response = await Api.post('/loan/create-loan', data)
	return response.data
}

export const returnBookFn = async (id, data) => {
	const response = await Api.put(`/loan/return-book/${id}`, data)
	return response.data
}

