import { createBrowserRouter } from 'react-router'
import { CompanyLayout } from '../../components/company/layout/CompanyLayout'
import { MyPageLayout } from '../../components/company/mypage/MyPageLayout'
import AuthPage from '../../pages/company/auth/AuthPage'
import LoginTypeSelectPage from '../../pages/company/auth/LoginTypeSelectPage'
import CandidateDetailPage from '../../pages/company/candidates/CandidateDetailPage'
import JobCandidatesPage from '../../pages/company/candidates/JobCandidatesPage'
import JobCreatePage from '../../pages/company/jobs/JobCreatePage'
import JobListPage from '../../pages/company/jobs/JobListPage'
import LandingPage from '../../pages/company/landing/LandingPage'
import MyCompanyInfoPage from '../../pages/company/mypage/MyCompanyInfoPage'
import MyJobApplicantsDashboardPage from '../../pages/company/mypage/MyJobApplicantsDashboardPage'
import MyJobPostsPage from '../../pages/company/mypage/MyJobPostsPage'
import CompanySettingsPage from '../../pages/company/settings/CompanySettingsPage'

export const companyRouter = createBrowserRouter([
	{
		path: '/auth',
		element: <AuthPage />,
	},
	{
		path: '/auth/select',
		element: <LoginTypeSelectPage />,
	},
	{
		path: '/',
		element: <CompanyLayout />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
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
			{
				path: 'mypage',
				element: <MyPageLayout />,
				children: [
					{
						path: 'company',
						element: <MyCompanyInfoPage />,
					},
					{
						path: 'jobs',
						element: <MyJobPostsPage />,
					},
					{
						path: 'jobs/:jobId',
						element: <MyJobApplicantsDashboardPage />,
					},
				],
			},
		],
	},
])
