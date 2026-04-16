import { Outlet, ScrollRestoration } from 'react-router'
import { TopNav } from './TopNav'

export const Layout = () => {
	return (
		<div className='min-h-screen w-full bg-white text-black'>
			<ScrollRestoration />
			<div className='flex min-h-screen w-full flex-col'>
				<TopNav />
				<main className='flex-1 w-full'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
