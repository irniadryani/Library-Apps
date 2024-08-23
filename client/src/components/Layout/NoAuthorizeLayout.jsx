import { Outlet } from 'react-router-dom';  

export default function NoAuthorizeLayout(props) {
	const { content } = props;  
	return <main className='h-full'>{content ?? <Outlet />}</main>;
}
