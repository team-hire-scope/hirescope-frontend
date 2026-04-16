import { JDForm } from '../../../components/company/job/JDForm'
import { MyPageSidebar } from '../../../components/company/mypage/MyPageSidebar'

const JobCreatePage = () => {
	return (
		<section className='flex w-full gap-6'>
			<MyPageSidebar />
			<div className='min-w-0 flex-1 space-y-6'>
				<div>
					<h2 className='text-2xl font-semibold text-hs-deep-green'>직무 공고 등록</h2>
					<p className='mt-1 text-sm text-black'>채용 공고와 JD를 등록해 AI 분석을 준비합니다.</p>
				</div>
				<div className='w-full rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
					<JDForm />
				</div>
			</div>
		</section>
	)
}

export default JobCreatePage
