import { useLocation, useNavigate } from 'react-router'
import { Building2, Briefcase, Lightbulb } from 'lucide-react'
import { cn } from '../../../utils/cn'

const myPageMenus = [
	{ to: '/com-mypage/company', label: '회사 정보', icon: Building2 },
	{ to: '/com-mypage/jobs', label: '내 공고 관리', icon: Briefcase },
]

export const MyPageSidebar = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const isActiveMenu = (to: string) => {
		if (to === '/com-mypage/jobs') {
			return pathname === to || pathname.startsWith(`${to}/`) || pathname === '/jobs/create'
		}
		return pathname === to || pathname.startsWith(`${to}/`)
	}

	return (
		<aside className='lg:sticky lg:top-28 w-full lg:w-80 shrink-0'>
			<div className='rounded-3xl border border-hs-yellow/30 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
				<div className='mb-8 px-2 flex items-center justify-between'>
					<h2 className='text-sm font-black uppercase tracking-widest text-hs-deep-green opacity-60'>마이페이지</h2>
					<div className='h-2.5 w-2.5 rounded-full bg-hs-green animate-pulse' />
				</div>

				<nav className='space-y-3'>
					{myPageMenus.map(menu => {
						const Icon = menu.icon
						const isActive = isActiveMenu(menu.to)

						return (
							<button
								key={menu.to}
								type='button'
								onClick={() => navigate(menu.to)}
								className={cn(
									'group relative w-full flex items-center gap-4 px-5 py-4 text-[16px] rounded-2xl transition-all duration-300 font-extrabold',
									isActive
										? 'bg-hs-cream text-hs-deep-green shadow-sm ring-1 ring-hs-yellow/20'
										: 'text-slate-400 hover:bg-hs-cream/30 hover:text-hs-deep-green'
								)}
							>
								{isActive && <div className='absolute left-0 h-1/2 w-2 rounded-r-full bg-hs-yellow' />}
								<Icon
									size={20}
									className={cn(
										'transition-transform group-hover:scale-110',
										isActive ? 'text-hs-deep-green opacity-100' : 'opacity-40'
									)}
								/>
								{menu.label}
							</button>
						)
					})}
				</nav>
			</div>

			<div className='mt-8 p-6 bg-hs-deep-green text-white rounded-[32px] shadow-xl shadow-hs-deep-green/10'>
				<h4 className='text-[14px] font-bold mb-3 flex items-center gap-2'>
					<Lightbulb size={16} className='text-hs-yellow' /> AI 마이페이지 Tip
				</h4>
				<p className='text-[12px] leading-relaxed opacity-80 font-medium'>
					공고/지원자 현황을 주기적으로 확인하고, 필요 시 상세 리포트를 통해 개선 포인트를 빠르게 찾아보세요.
				</p>
			</div>
		</aside>
	)
}
