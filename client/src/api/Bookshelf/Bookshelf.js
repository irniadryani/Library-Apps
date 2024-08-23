import { Api } from '../../lib/common/index'


export const getAllBookshelfFn = async () => {
	const response = await Api.get('/bookshelf')
	return response.data
}
