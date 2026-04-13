import { Link } from 'react-router'
import { Badge } from '../common/Badge'

export const TopNav = () => {
	return (
		<header className='flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6'>
			<div className='flex items-center gap-3'>
				<h1 className='text-base font-semibold text-slate-900'>HR 채용 관리</h1>
				<Badge variant='info'>Company</Badge>
			</div>
			<Link to='/auth' className='text-sm font-medium text-slate-600 hover:text-slate-900'>
				로그아웃
			</Link>
		</header>
	)
}
