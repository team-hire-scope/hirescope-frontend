import { Outlet } from 'react-router'
import { MyPageSidebar } from './MyPageSidebar'

export const MyPageLayout = () => {
	return (
		<section className='flex w-full gap-6'>
			<MyPageSidebar />
			<div className='min-w-0 flex-1'>
				<Outlet />
			</div>
		</section>
	)
}
