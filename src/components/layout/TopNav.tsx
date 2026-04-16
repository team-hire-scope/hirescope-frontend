import { Link, NavLink, useNavigate } from 'react-router'
import { LayoutDashboard, LogOut, UserRound, Briefcase, FileText } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useAuthContext } from '../../contexts/AuthContext'
import { useMyResume } from '../../hooks/user/useMyResume'

const companyNavItems = [{ to: '/jobs', label: '채용 공고', icon: Briefcase, end: true }]

const applicantNavItems = [
	{ to: '/jobs', label: '채용 공고', icon: Briefcase, end: true },
	{ to: '/resumes', label: '이력서', icon: FileText, end: false },
]

export const TopNav = () => {
	const navigate = useNavigate()
	const { user, setUser } = useAuthContext()

	const handleLogout = () => {
		setUser(null)
		navigate('/', { replace: true })
	}

	const isCompany = user?.role === 'HR'
	const isApplicant = user?.role === 'APPLICANT'
	const dashboardHref = isCompany ? '/com-mypage/company' : '/applicant-main'
	const dashboardLabel = isCompany ? '마이페이지' : '대시보드'
	const { resume } = useMyResume()
	const activeNavItems = isApplicant ? applicantNavItems : companyNavItems

	return (
		<header className='sticky top-0 z-40 w-full border-b border-slate-100 bg-white/85 backdrop-blur-md'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10'>
				{/* 로고 */}
				<Link to='/' className='flex items-center gap-2.5 group'>
					<div className='w-9 h-9 rounded-xl bg-hs-deep-green flex items-center justify-center shadow-sm shadow-hs-deep-green/20 transition-transform group-hover:scale-105'>
						<span className='text-hs-yellow font-black text-base tracking-tight'>H</span>
					</div>
					<span className='text-lg font-black tracking-tight text-hs-deep-green'>HireScope</span>
				</Link>

				{/* 네비게이션 */}
				{user && (
					<nav className='hidden md:flex items-center gap-1'>
						{activeNavItems.map(item => {
							const Icon = item.icon
							const href =
								item.to === '/resumes' ? (resume ? `/resumes/${resume.id}/edit` : '/resumes/new') : item.to

							return (
								<NavLink
									key={item.to}
									to={href}
									end={item.end}
									className={({ isActive }) =>
										cn(
											'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all',
											isActive
												? 'bg-hs-deep-green text-hs-yellow shadow-sm shadow-hs-deep-green/20'
												: 'text-slate-500 hover:bg-slate-50 hover:text-hs-deep-green'
										)
									}
								>
									<Icon size={14} />
									{item.label}
								</NavLink>
							)
						})}
					</nav>
				)}

				{/* 우측 사용자 영역 */}
				<div className='flex items-center gap-2'>
					{user ? (
						<>
							{/* 대시보드/마이페이지 링크 (아이콘만) */}
							<Link
								to={dashboardHref}
								aria-label={dashboardLabel}
								className='hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:bg-slate-50 hover:text-hs-deep-green transition-all'
							>
								<LayoutDashboard size={18} />
							</Link>

							{/* 사용자 칩 */}
							<Link
								to={dashboardHref}
								className='inline-flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-hs-cream/60 hover:bg-hs-cream transition-colors group'
							>
								<div className='w-7 h-7 rounded-full bg-hs-deep-green flex items-center justify-center shrink-0'>
									<span className='text-hs-yellow font-black text-xs'>{user.name.charAt(0)}</span>
								</div>
								<span className='text-sm font-bold text-hs-deep-green max-w-[120px] truncate'>{user.name}</span>
							</Link>

							{/* 로그아웃 */}
							<button
								onClick={handleLogout}
								aria-label='로그아웃'
								className='inline-flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all'
							>
								<LogOut size={17} />
							</button>
						</>
					) : (
						<Link
							to='/auth/select'
							className='inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-hs-deep-green text-hs-yellow text-sm font-black hover:bg-hs-deep-green/90 transition-colors shadow-sm shadow-hs-deep-green/20'
						>
							<UserRound size={14} />
							로그인
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}
