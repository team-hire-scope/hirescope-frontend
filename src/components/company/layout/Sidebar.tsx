import { NavLink } from 'react-router'
import { cn } from '../../../utils/cn'

const navItems = [
	{ to: '/jobs', label: '채용 공고' },
	{ to: '/jobs/create', label: '직무 등록' },
	{ to: '/settings/company', label: '기업 설정' },
]

export const Sidebar = () => {
	return (
		<aside className='hidden w-64 flex-col border-r border-slate-200 bg-white p-4 md:flex'>
			<div className='mb-6 px-2 text-lg font-bold text-slate-900'>HireScope</div>
			<nav className='flex flex-col gap-1'>
				{navItems.map(item => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							cn(
								'rounded-md px-3 py-2 text-sm font-medium transition-colors',
								isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
							)
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
		</aside>
	)
}
