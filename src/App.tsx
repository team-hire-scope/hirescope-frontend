import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appRouter } from './routes/router'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 3,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={appRouter} />
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	)
}

export default App
