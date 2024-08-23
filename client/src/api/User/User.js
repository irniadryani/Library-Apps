import { Api } from '../../lib/common/index'

export const getAllUserFn = async () => {
	const response = await Api.get('/getAllUser')
	return response.data
}
