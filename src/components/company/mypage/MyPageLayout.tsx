import { Outlet } from 'react-router'
import { MyPageSidebar } from './MyPageSidebar'

export const MyPageLayout = () => {
	return (
		<section className='mx-6 my-6 flex w-auto gap-6'>
			<MyPageSidebar />
			<div className='min-w-0 flex-1'>
				<Outlet />
			</div>
		</section>
	)
}
