import { Link, NavLink, useNavigate } from 'react-router'
import { cn } from '../../utils/cn'
import { useAuthContext } from '../../contexts/AuthContext'

const navItems = [{ to: '/jobs', label: '모집공고', end: true }]

export const TopNav = () => {
	const navigate = useNavigate()
	const { user, setUser } = useAuthContext()

	const handleLogout = () => {
		setUser(null)
		navigate('/', { replace: true })
	}

	const isCompany = user?.role === 'HR'
	const isApplicant = user?.role === 'APPLICANT'

	return (
		<header className='grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center border-b border-hs-cream bg-hs-yellow px-6'>
			<Link to='/' className='text-lg font-bold text-hs-deep-green'>
				HireScope
			</Link>

			{!isApplicant ? (
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
				{isCompany && (
					<div className='flex items-center gap-3 text-sm font-medium'>
						<span className='text-hs-deep-green'>{user.name}님 안녕하세요.</span>
						<Link to='com-mypage/company' className='text-black hover:text-hs-deep-green'>
							마이페이지
						</Link>
						<button onClick={handleLogout} className='text-black hover:text-hs-deep-green cursor-pointer'>
							로그아웃
						</button>
					</div>
				)}
				{isApplicant && (
					<div className='flex items-center gap-3 text-sm font-medium'>
						<span className='text-hs-deep-green'>{user.name}님 안녕하세요.</span>
						<Link to='/applicant-main' className='text-black hover:text-hs-deep-green'>
							대시보드
						</Link>
						<button onClick={handleLogout} className='text-black hover:text-hs-deep-green cursor-pointer'>
							로그아웃
						</button>
					</div>
				)}
				{!user && (
					<Link to='/auth/select' className='text-sm font-medium text-black hover:text-hs-deep-green'>
						로그인
					</Link>
				)}
			</div>
		</header>
	)
}
