import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { cn } from '../../../utils/cn'

const navItems = [{ to: '/jobs', label: '모집공고', end: true }]
const COMPANY_AUTH_KEY = 'companyAuthName'

export const TopNav = () => {
	const [companyName, setCompanyName] = useState<string | null>(null)

	useEffect(() => {
		const syncAuthName = () => {
			const stored = window.localStorage.getItem(COMPANY_AUTH_KEY)
			setCompanyName(stored ? JSON.parse(stored) : null)
		}

		syncAuthName()
		window.addEventListener('storage', syncAuthName)
		window.addEventListener('company-auth-updated', syncAuthName)

		return () => {
			window.removeEventListener('storage', syncAuthName)
			window.removeEventListener('company-auth-updated', syncAuthName)
		}
	}, [])

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
			<div className='justify-self-end'>
				{companyName ? (
					<div className='flex items-center gap-3 text-sm font-medium'>
						<span className='text-hs-deep-green'>{companyName}님 안녕하세요.</span>
						<Link to='/mypage/company' className='text-black hover:text-hs-deep-green'>
							마이페이지
						</Link>
					</div>
				) : (
					<Link to='/auth/select' className='text-sm font-medium text-black hover:text-hs-deep-green'>
						로그인
					</Link>
				)}
			</div>
		</header>
	)
}
