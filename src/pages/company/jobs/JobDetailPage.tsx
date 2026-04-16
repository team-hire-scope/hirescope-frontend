import { isAxiosError } from 'axios'
import { Link, useParams } from 'react-router'
import { Button } from '../../../components/common/Button'
import { useJobDetail } from '../../../hooks/company/useJobDetail'

const formatDate = (value: string) =>
	new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(value))

const JobDetailPage = () => {
	const { jobId } = useParams()
	const id = jobId ?? ''

	const { data: job, isFetching, isError, error } = useJobDetail(id)

	if (isFetching) {
		return (
			<section className='w-full max-w-4xl space-y-4'>
				<p className='text-sm text-black/60'>불러오는 중...</p>
			</section>
		)
	}

	if (isError) {
		const message =
			isAxiosError(error) && error.response?.data?.message
				? String(error.response.data.message)
				: '공고 정보를 불러오지 못했습니다.'
		return (
			<section className='w-full max-w-4xl rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm font-medium text-rose-600'>
				{message}
			</section>
		)
	}

	if (!job) {
		return (
			<section className='w-full max-w-4xl rounded-xl border border-hs-cream bg-white p-6 text-sm text-black'>
				데이터가 없습니다.
			</section>
		)
	}

	return (
		<section className='w-full max-w-4xl space-y-6'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div>
					<h1 className='text-2xl font-semibold text-hs-deep-green'>{job.jobTitle}</h1>
					<p className='mt-1 text-sm text-black'>{job.companyName}</p>
					<p className='mt-1 text-xs text-black/60'>
						등록 {formatDate(job.createdAt)} · 수정 {formatDate(job.updatedAt)}
					</p>
				</div>
				<Link to={id ? `/com-mypage/jobs/${id}` : '/com-mypage/jobs'}>
					<Button variant='secondary'>지원자 대시보드로</Button>
				</Link>
			</div>

			<div className='rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<h2 className='mb-3 text-base font-semibold text-hs-deep-green'>JD · 업무 설명</h2>
				<p className='whitespace-pre-wrap text-sm leading-relaxed text-black'>{job.jobDescription}</p>
			</div>

			<div className='grid gap-4 md:grid-cols-2'>
				<div className='rounded-xl border border-hs-cream bg-hs-cream/30 p-5'>
					<h2 className='mb-2 text-base font-semibold text-hs-deep-green'>필수 자격 · 기술</h2>
					<p className='whitespace-pre-wrap text-sm text-black'>{job.requiredSkills || '-'}</p>
				</div>
				<div className='rounded-xl border border-hs-yellow/40 bg-hs-yellow/10 p-5'>
					<h2 className='mb-2 text-base font-semibold text-hs-deep-green'>우대 사항</h2>
					<p className='whitespace-pre-wrap text-sm text-black'>{job.preferredQualifications || '-'}</p>
				</div>
			</div>

			<div className='rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<h2 className='mb-4 text-base font-semibold text-hs-deep-green'>5대 평가 가중치 (%)</h2>
				<dl className='grid grid-cols-2 gap-3 text-sm text-black sm:grid-cols-5'>
					<div>
						<dt className='text-black/60'>직무 적합</dt>
						<dd className='mt-1 font-semibold'>{job.weightJobFit}</dd>
					</div>
					<div>
						<dt className='text-black/60'>경력 일관성</dt>
						<dd className='mt-1 font-semibold'>{job.weightCareerConsistency}</dd>
					</div>
					<div>
						<dt className='text-black/60'>기술 매칭</dt>
						<dd className='mt-1 font-semibold'>{job.weightSkillMatch}</dd>
					</div>
					<div>
						<dt className='text-black/60'>정량 성과</dt>
						<dd className='mt-1 font-semibold'>{job.weightQuantitativeAchievement}</dd>
					</div>
					<div>
						<dt className='text-black/60'>문서 품질</dt>
						<dd className='mt-1 font-semibold'>{job.weightDocumentQuality}</dd>
					</div>
				</dl>
				<p className='mt-3 text-xs text-black/60'>
					합계:{' '}
					{job.weightJobFit +
						job.weightCareerConsistency +
						job.weightSkillMatch +
						job.weightQuantitativeAchievement +
						job.weightDocumentQuality}
				</p>
			</div>
		</section>
	)
}

export default JobDetailPage
