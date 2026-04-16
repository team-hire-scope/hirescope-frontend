import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { cn } from '../../utils/cn'

const navItems = [{ to: '/jobs', label: '모집공고', end: true }]

const COMPANY_AUTH_KEY = 'companyAuthName'
const USER_AUTH_KEY = 'userAuthName'

export const TopNav = () => {
	const navigate = useNavigate()
	const [userType, setUserType] = useState<'company' | 'user' | null>(null)
	const [displayName, setDisplayName] = useState('')

	useEffect(() => {
		const checkAuth = () => {
			const companyAuth = window.localStorage.getItem(COMPANY_AUTH_KEY)
			const userAuth = window.localStorage.getItem(USER_AUTH_KEY)

			if (companyAuth) {
				setUserType('company')
				setDisplayName(JSON.parse(companyAuth))
			} else if (userAuth) {
				setUserType('user')
				setDisplayName(JSON.parse(userAuth))
			} else {
				setUserType(null)
			}
		}

		checkAuth()
		window.addEventListener('storage', checkAuth)
		return () => window.removeEventListener('storage', checkAuth)
	}, [])

	const handleLogout = () => {
		window.localStorage.removeItem(COMPANY_AUTH_KEY)
		window.localStorage.removeItem(USER_AUTH_KEY)
		setUserType(null)
		navigate('/', { replace: true })
	}

	const showNav = userType !== 'user'

	return (
		<header className='grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center border-b border-hs-cream bg-hs-yellow px-6'>
			<Link to='/' className='text-lg font-bold text-hs-deep-green'>
				HireScope
			</Link>
			{showNav ? (
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
			) : (
				<div />
			)}
			<div className='justify-self-end flex items-center gap-4'>
				{userType === 'company' && (
					<div className='flex items-center gap-3 text-sm font-medium'>
						<span className='text-hs-deep-green'>{displayName}님 안녕하세요.</span>
						<Link to='company-main' className='text-black hover:text-hs-deep-green'>
							마이페이지
						</Link>
						<button onClick={handleLogout} className='text-black hover:text-hs-deep-green cursor-pointer'>
							로그아웃
						</button>
					</div>
				)}
				{userType === 'user' && (
					<div className='flex items-center gap-3 text-sm font-medium'>
						<span className='text-hs-deep-green'>{displayName}님 안녕하세요.</span>
						<Link to='/applicant-main' className='text-black hover:text-hs-deep-green'>
							대시보드
						</Link>
						<button onClick={handleLogout} className='text-black hover:text-hs-deep-green cursor-pointer'>
							로그아웃
						</button>
					</div>
				)}
				{userType === null && (
					<Link to='/auth/select' className='text-sm font-medium text-black hover:text-hs-deep-green'>
						로그인
					</Link>
				)}
			</div>
		</header>
	)
}
