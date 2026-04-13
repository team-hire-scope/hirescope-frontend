import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

export const CompanyLayout = () => {
	return (
		<div className='min-h-screen bg-slate-50 text-slate-900'>
			<div className='mx-auto flex min-h-screen max-w-[1440px]'>
				<Sidebar />
				<div className='flex flex-1 flex-col'>
					<TopNav />
					<main className='flex-1 p-4 md:p-6'>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	)
}
