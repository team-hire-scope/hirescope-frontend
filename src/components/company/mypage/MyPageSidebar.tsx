import { NavLink } from 'react-router'
import { cn } from '../../../utils/cn'

const myPageMenus = [
	{ to: '/mypage/company', label: '회사 정보' },
	{ to: '/mypage/jobs', label: '내 공고 관리' },
]

export const MyPageSidebar = () => {
	return (
		<aside className='w-56 shrink-0 rounded-xl border border-hs-cream bg-white p-4 shadow-sm'>
			<h3 className='mb-4 text-base font-semibold text-hs-deep-green'>마이페이지</h3>
			<nav className='flex flex-col gap-1'>
				{myPageMenus.map(menu => (
					<NavLink
						key={menu.to}
						to={menu.to}
						className={({ isActive }) =>
							cn(
								'rounded-md px-3 py-2 text-sm font-medium',
								isActive ? 'bg-hs-yellow text-hs-deep-green' : 'text-black hover:bg-hs-cream'
							)
						}
					>
						{menu.label}
					</NavLink>
				))}
			</nav>
		</aside>
	)
}
