import { isAxiosError } from 'axios'
import { useParams } from 'react-router'
import { JDForm } from '../../../components/company/job/JDForm'
import { MyPageSidebar } from '../../../components/company/mypage/MyPageSidebar'
import { useJobDetail } from '../../../hooks/company/useJobDetail'

const JobEditPage = () => {
	const { jobId } = useParams()
	const id = jobId ?? ''
	const { data: job, isFetching, isError, error } = useJobDetail(id)

	if (!id) {
		return (
			<section className='flex w-full gap-6'>
				<MyPageSidebar />
				<div className='min-w-0 flex-1 rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
					<p className='text-sm text-black/60'>공고 ID가 없습니다.</p>
				</div>
			</section>
		)
	}

	if (isFetching) {
		return (
			<section className='flex w-full gap-6'>
				<MyPageSidebar />
				<div className='min-w-0 flex-1 rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
					<p className='text-sm text-black/60'>불러오는 중...</p>
				</div>
			</section>
		)
	}

	if (isError || !job) {
		const message =
			isAxiosError(error) && error.response?.data?.message
				? String(error.response.data.message)
				: '공고 정보를 불러오지 못했습니다.'
		return (
			<section className='flex w-full gap-6'>
				<MyPageSidebar />
				<div className='min-w-0 flex-1 rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm font-medium text-rose-600'>
					{message}
				</div>
			</section>
		)
	}

	return (
		<section className='flex w-full gap-6'>
			<MyPageSidebar />
			<div className='min-w-0 flex-1 space-y-6'>
				<div>
					<h2 className='text-2xl font-semibold text-hs-deep-green'>직무 공고 수정</h2>
					<p className='mt-1 text-sm text-black'>등록된 공고 내용과 가중치를 수정합니다.</p>
				</div>
				<div className='w-full rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
					<JDForm key={id} editJobId={id} initialJob={job} />
				</div>
			</div>
		</section>
	)
}

export default JobEditPage
