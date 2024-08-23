import { Api } from '../../lib/common/index'


export const getAllCategoryFn = async () => {
	const response = await Api.get('/category')
	return response.data
}
