import { createBrowserRouter } from 'react-router'
import { CompanyLayout } from '../../components/company/layout/CompanyLayout'
import AuthPage from '../../pages/company/auth/AuthPage'
import CandidateDetailPage from '../../pages/company/candidates/CandidateDetailPage'
import JobCandidatesPage from '../../pages/company/candidates/JobCandidatesPage'
import JobCreatePage from '../../pages/company/jobs/JobCreatePage'
import JobListPage from '../../pages/company/jobs/JobListPage'
import CompanySettingsPage from '../../pages/company/settings/CompanySettingsPage'

export const companyRouter = createBrowserRouter([
	{
		path: '/auth',
		element: <AuthPage />,
	},
	{
		path: '/',
		element: <CompanyLayout />,
		children: [
			{
				path: 'settings/company',
				element: <CompanySettingsPage />,
			},
			{
				path: 'jobs',
				element: <JobListPage />,
			},
			{
				path: 'jobs/create',
				element: <JobCreatePage />,
			},
			{
				path: 'jobs/:jobId/candidates',
				element: <JobCandidatesPage />,
			},
			{
				path: 'candidates/:candidateId',
				element: <CandidateDetailPage />,
			},
		],
	},
])
