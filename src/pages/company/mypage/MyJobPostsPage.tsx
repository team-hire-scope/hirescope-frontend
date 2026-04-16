import { Link } from 'react-router'
import { Button } from '../../../components/common/Button'
import { Badge } from '../../../components/common/Badge'
import { useJobPosts } from '../../../hooks/company/useJobPosts'

const formatDate = (value: string) =>
	new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(new Date(value))

const MyJobPostsPage = () => {
	const { data: jobPosts, isFetching } = useJobPosts({ page: 0, size: 10 })
	const content = jobPosts?.content ?? []

	return (
		<section className='space-y-4'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-semibold text-hs-deep-green'>내 공고 관리</h2>
					<p className='mt-1 text-sm text-black'>
						내가 올린 공고를 확인하고 새 공고를 등록할 수 있습니다. 새 공고 등록 시 5대 평가 기준 가중치를 직접 설정할
						수 있습니다.
					</p>
				</div>
				<Link to='/jobs/create'>
					<Button>새 공고 올리기</Button>
				</Link>
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
				<div className='rounded-xl border border-hs-cream bg-white p-4 shadow-sm'>
					<p className='text-sm text-hs-deep-green'>전체 공고 수</p>
					<p className='mt-1 text-2xl font-semibold text-black'>{jobPosts?.totalElements ?? 0}</p>
				</div>
				<div className='rounded-xl border border-hs-cream bg-white p-4 shadow-sm'>
					<p className='text-sm text-hs-deep-green'>현재 페이지</p>
					<p className='mt-1 text-2xl font-semibold text-black'>
						{(jobPosts?.number ?? 0) + 1} / {jobPosts?.totalPages ?? 0}
					</p>
				</div>
				<div className='rounded-xl border border-hs-cream bg-white p-4 shadow-sm'>
					<p className='text-sm text-hs-deep-green'>페이지당 개수</p>
					<p className='mt-1 text-2xl font-semibold text-black'>{jobPosts?.size ?? 0}</p>
				</div>
			</div>

			{isFetching && <p className='text-xs text-black/60'>불러오는 중...</p>}

			<div className='space-y-3'>
				{content.map(job => (
					<div
						key={job.id}
						className='rounded-xl border border-hs-cream bg-white p-4 shadow-sm transition hover:border-hs-yellow'
					>
						<div className='mb-3 flex flex-wrap items-start justify-between gap-3'>
							<div className='min-w-0 flex-1'>
								<h3 className='text-base font-semibold text-black'>{job.jobTitle}</h3>
								<p className='mt-1 text-sm text-black'>{job.companyName}</p>
							</div>
							<div className='shrink-0 text-right text-sm text-black'>
								<p>등록일 {formatDate(job.createdAt)}</p>
								<p className='mt-1 text-black/60'>수정일 {formatDate(job.updatedAt)}</p>
							</div>
						</div>

						<p className='text-sm leading-6 text-black'>{job.jobDescription}</p>

						<div className='mt-3 flex flex-wrap gap-2'>
							<Badge className='bg-hs-yellow/30 text-hs-deep-green'>{job.requiredSkills}</Badge>
							<Badge className='bg-hs-green/20 text-hs-deep-green'>{job.preferredQualifications}</Badge>
						</div>

						<div className='mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-5'>
							<div className='rounded-md bg-hs-cream/40 px-3 py-2'>
								<p className='text-hs-deep-green'>직무적합</p>
								<p className='font-semibold text-black'>{job.weightJobFit}</p>
							</div>
							<div className='rounded-md bg-hs-cream/40 px-3 py-2'>
								<p className='text-hs-deep-green'>경력일관</p>
								<p className='font-semibold text-black'>{job.weightCareerConsistency}</p>
							</div>
							<div className='rounded-md bg-hs-cream/40 px-3 py-2'>
								<p className='text-hs-deep-green'>기술매칭</p>
								<p className='font-semibold text-black'>{job.weightSkillMatch}</p>
							</div>
							<div className='rounded-md bg-hs-cream/40 px-3 py-2'>
								<p className='text-hs-deep-green'>정량성과</p>
								<p className='font-semibold text-black'>{job.weightQuantitativeAchievement}</p>
							</div>
							<div className='rounded-md bg-hs-cream/40 px-3 py-2'>
								<p className='text-hs-deep-green'>문서품질</p>
								<p className='font-semibold text-black'>{job.weightDocumentQuality}</p>
							</div>
						</div>

						<div className='mt-4 flex flex-wrap items-center gap-2'>
							<Link to={`/jobs/${job.id}`}>
								<Button variant='secondary' size='sm'>
									공고글 보러가기
								</Button>
							</Link>
							<Link to={`/com-mypage/jobs/${job.id}`}>
								<Button variant='secondary' size='sm'>
									지원자 관리
								</Button>
							</Link>
							<Link to={`/jobs/${job.id}/edit`}>
								<Button variant='secondary' size='sm'>
									글 수정하기
								</Button>
							</Link>
						</div>
					</div>
				))}

				{!isFetching && content.length === 0 && (
					<div className='rounded-xl border border-hs-cream bg-white p-10 text-center text-sm text-black/60 shadow-sm'>
						표시할 공고가 없습니다.
					</div>
				)}
			</div>
		</section>
	)
}

export default MyJobPostsPage
