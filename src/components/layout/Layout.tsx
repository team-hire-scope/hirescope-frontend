import { Outlet } from 'react-router'
import { TopNav } from './TopNav'

export const Layout = () => {
	return (
		<div className='min-h-screen w-full bg-white text-black'>
			<div className='flex min-h-screen w-full flex-col'>
				<TopNav />
				<main className='flex-1 w-full p-6'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
