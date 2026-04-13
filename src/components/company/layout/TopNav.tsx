import { Link, NavLink } from 'react-router'
import { cn } from '../../../utils/cn'

const navItems = [
	{ to: '/jobs', label: '채용 공고', end: true },
	{ to: '/jobs/create', label: '직무 등록', end: true },
	{ to: '/settings/company', label: '기업 설정', end: true },
]

export const TopNav = () => {
	return (
		<header className='grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center border-b border-hs-cream bg-hs-yellow px-6'>
			<Link to='/' className='text-lg font-bold text-hs-deep-green'>
				HireScope
			</Link>
			<nav className='flex items-center gap-2'>
				{navItems.map(item => (
					<NavLink
						key={item.to}
						to={item.to}
						end={item.end}
						className={({ isActive }) =>
							cn(
								'rounded-md px-3 py-2 text-sm font-medium transition-colors',
								isActive
									? 'bg-hs-yellow text-hs-deep-green font-bold'
									: 'text-black hover:bg-hs-cream hover:text-hs-deep-green'
							)
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
			<Link to='/auth' className='justify-self-end text-sm font-medium text-black hover:text-hs-deep-green'>
				로그아웃
			</Link>
		</header>
	)
}
