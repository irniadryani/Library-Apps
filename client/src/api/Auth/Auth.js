import { Api } from '../../lib/common/index'


export const loginUserFn = async (data) => {
	const response = await Api.post('/login', data)
	return response.data
}

export const registerUserFn = async (data) => {
	const response = await Api.post('/users/create-user', data)
	return response.data
}

export const currentUserFn = async () => {
	const response = await Api.get('/me')
	return response.data
}

export const logoutUserFn = async (user) => {
	const response = await Api.delete('/logout', user)
	return response.data
}
