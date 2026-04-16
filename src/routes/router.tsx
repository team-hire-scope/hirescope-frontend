import { createBrowserRouter } from 'react-router'
import { Layout } from '../components/layout/Layout'
import { MyPageLayout } from '../components/company/mypage/MyPageLayout'
import CompanyAuthPage from '../pages/company/auth/AuthPage'
import UserAuthPage from '../pages/user/auth/UserAuthPage'
import LoginTypeSelectPage from '../pages/LoginTypeSelectPage'
import CandidateDetailPage from '../pages/company/candidates/CandidateDetailPage'
import JobCandidatesPage from '../pages/company/candidates/JobCandidatesPage'
import JobCreatePage from '../pages/company/jobs/JobCreatePage'
import JobListPage from '../pages/JobListPage'
import LandingPage from '../pages/LandingPage'
import MyCompanyInfoPage from '../pages/company/mypage/MyCompanyInfoPage'
import MyJobApplicantsDashboardPage from '../pages/company/mypage/MyJobApplicantsDashboardPage'
import MyJobPostsPage from '../pages/company/mypage/MyJobPostsPage'
import CompanySettingsPage from '../pages/company/settings/CompanySettingsPage'
import ResumeEditPage from '../pages/user/ResumeEditPage'
import AnalysisRequestPage from '../pages/user/AnalysisRequestPage'
import AnalysisResultPage from '../pages/user/AnalysisResultPage'
import ApplicantMainPage from '../pages/user/ApplicantMainPage'

const AuthRoutes = [
	{
		path: '/auth',
		element: <CompanyAuthPage />,
	},
	{
		path: '/auth/user',
		element: <UserAuthPage />,
	},
	{
		path: '/auth/select',
		element: <LoginTypeSelectPage />,
	},
] as const

const sharedShellChildren = [
	{
		index: true,
		element: <LandingPage />,
	},
]

const applicantAppChildren = [
	{
		path: 'applicant-main',
		element: <ApplicantMainPage />,
	},
	{
		path: 'jobs',
		element: <JobListPage />,
	},
	{
		path: 'resumes/new',
		element: <ResumeEditPage />,
	},
	{
		path: 'resumes/:resumeId/edit',
		element: <ResumeEditPage />,
	},
	{
		path: 'analysis/request',
		element: <AnalysisRequestPage />,
	},
	{
		path: 'analysis/result/:analysisId',
		element: <AnalysisResultPage />,
	},
]

const companyAppChildren = [
	{
		path: 'settings/company',
		element: <CompanySettingsPage />,
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
		path: 'com-mypage',
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
]

const mainShellRoute = {
	path: '/',
	element: <Layout />,
	children: [...sharedShellChildren, ...companyAppChildren, ...applicantAppChildren],
}

export const appRouter = createBrowserRouter([...AuthRoutes, mainShellRoute])
