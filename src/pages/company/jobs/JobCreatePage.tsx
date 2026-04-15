import { Link } from 'react-router'
import { Button } from '../../../components/common/Button'
import { JDForm } from '../../../components/company/job/JDForm'

const JobCreatePage = () => {
	return (
		<section className='w-full space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>직무 공고 등록</h2>
				<p className='mt-1 text-sm text-black'>채용 공고와 JD를 등록해 AI 분석을 준비합니다.</p>
			</div>
			<div className='w-full rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<JDForm />
				<div className='mt-4 flex items-center justify-between border-t border-hs-cream pt-4'>
					<Link to='/settings/company' className='text-sm font-medium text-hs-deep-green'>
						이전 단계
					</Link>
					<Link to='/jobs'>
						<Button>대시보드 보기</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default JobCreatePage
