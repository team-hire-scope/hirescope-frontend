import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

export const CompanyLayout = () => {
	return (
		<div className='min-h-screen w-full bg-slate-50 text-slate-900'>
			<div className='flex min-h-screen w-full'>
				<Sidebar />
				<div className='flex flex-1 flex-col'>
					<TopNav />
					<main className='flex-1 w-full p-6'>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	)
}
