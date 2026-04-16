import { isAxiosError } from 'axios'
import { useParams } from 'react-router'
import { Badge } from '../../../components/common/Badge'
import { useApplicationDetail } from '../../../hooks/company/useApplicationDetail'

const statusVariant = (status: string): 'default' | 'success' | 'warning' | 'danger' => {
	if (status === 'COMPLETED') return 'success'
	if (status === 'PROCESSING') return 'warning'
	if (status === 'FAILED') return 'danger'
	return 'default'
}

const formatDate = (value: string) => {
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return value
	return date.toLocaleString('ko-KR')
}

const CandidateDetailPage = () => {
	const { candidateId } = useParams()
	const { data, isFetching, isError, error } = useApplicationDetail(candidateId ?? '')

	if (isFetching) {
		return (
			<section className='w-full rounded-xl border border-hs-cream bg-white p-6 text-sm text-black'>불러오는 중...</section>
		)
	}

	if (isError) {
		const message =
			isAxiosError(error) && error.response?.data?.message
				? String(error.response.data.message)
				: '지원자 상세 정보를 불러오지 못했습니다.'
		return (
			<section className='w-full rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm font-medium text-rose-600'>
				{message}
			</section>
		)
	}

	if (!data) {
		return (
			<section className='w-full rounded-xl border border-hs-cream bg-white p-6 text-sm text-black'>
				데이터가 없습니다.
			</section>
		)
	}

	return (
		<section className='w-full space-y-6'>
			<div className='flex flex-wrap items-center gap-2'>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>지원자 상세 리포트</h2>
				<Badge variant='info'>APPLICATION ID: {data.applicationId}</Badge>
				<Badge variant={statusVariant(data.status)}>{data.status}</Badge>
			</div>

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-3 text-base font-semibold text-black'>지원 정보</h3>
					<div className='space-y-2 text-sm text-black'>
						<p>공고 ID: {data.jobPostingId}</p>
						<p>이력서 ID: {data.resumeId}</p>
						<p>지원일: {formatDate(data.appliedAt)}</p>
					</div>
				</div>

				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-3 text-base font-semibold text-black'>AI 분석 점수</h3>
					{data.analysisResult ? (
						<div className='space-y-2 text-sm text-black'>
							<p className='text-base font-semibold'>총점 {Math.round(data.analysisResult.totalScore)}</p>
							<p>직무 적합도: {Math.round(data.analysisResult.scoreJobFit)}</p>
							<p>경력 일관성: {Math.round(data.analysisResult.scoreCareerConsistency)}</p>
							<p>기술 매칭: {Math.round(data.analysisResult.scoreSkillMatch)}</p>
							<p>정량 성과: {Math.round(data.analysisResult.scoreQuantitativeAchievement)}</p>
							<p>문서 품질: {Math.round(data.analysisResult.scoreDocumentQuality)}</p>
							<p className='text-xs text-black/60'>분석일: {formatDate(data.analysisResult.analyzedAt)}</p>
						</div>
					) : (
						<p className='text-sm text-black/70'>아직 분석 결과가 없습니다.</p>
					)}
				</div>
			</div>

			<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
				<h3 className='mb-3 text-base font-semibold text-black'>이력서 요약</h3>
				<p className='text-sm font-semibold text-black'>{data.resume.title}</p>
				<p className='mt-2 whitespace-pre-wrap text-sm text-black'>{data.resume.summary || '-'}</p>
			</div>

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-3 text-base font-semibold text-black'>경력</h3>
					<div className='space-y-3'>
						{data.resume.careers.length ? (
							data.resume.careers.map(career => (
								<div
									key={career.id}
									className='rounded-lg border border-hs-cream bg-hs-cream/20 p-3 text-sm text-black'
								>
									<p className='font-semibold'>
										{career.companyName} · {career.position}
									</p>
									<p className='text-xs text-black/60'>
										{career.startDate} ~ {career.endDate}
									</p>
									<p className='mt-1'>{career.description}</p>
								</div>
							))
						) : (
							<p className='text-sm text-black/70'>경력 정보가 없습니다.</p>
						)}
					</div>
				</div>

				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-3 text-base font-semibold text-black'>학력</h3>
					<div className='space-y-3'>
						{data.resume.educations.length ? (
							data.resume.educations.map(education => (
								<div
									key={education.id}
									className='rounded-lg border border-hs-cream bg-hs-cream/20 p-3 text-sm text-black'
								>
									<p className='font-semibold'>
										{education.schoolName} · {education.major}
									</p>
									<p>{education.degree}</p>
									<p className='text-xs text-black/60'>
										{education.enrollmentDate} ~ {education.graduationDate}
									</p>
								</div>
							))
						) : (
							<p className='text-sm text-black/70'>학력 정보가 없습니다.</p>
						)}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-3 text-base font-semibold text-black'>기술 스택</h3>
					<div className='flex flex-wrap gap-2'>
						{data.resume.skills.length ? (
							data.resume.skills.map(skill => (
								<Badge key={skill.id} variant='default'>
									{skill.skillName} · {skill.proficiency}
								</Badge>
							))
						) : (
							<p className='text-sm text-black/70'>기술 스택 정보가 없습니다.</p>
						)}
					</div>
				</div>

				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-3 text-base font-semibold text-black'>자격증</h3>
					<div className='space-y-2 text-sm text-black'>
						{data.resume.certifications.length ? (
							data.resume.certifications.map(certification => (
								<p key={certification.id}>
									{certification.certificationName} ({certification.issuingOrganization}) -{' '}
									{certification.acquiredDate}
								</p>
							))
						) : (
							<p className='text-black/70'>자격증 정보가 없습니다.</p>
						)}
					</div>
				</div>
			</div>

			<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
				<h3 className='mb-3 text-base font-semibold text-black'>프로젝트</h3>
				<div className='space-y-3'>
					{data.resume.projects.length ? (
						data.resume.projects.map(project => (
							<div
								key={project.id}
								className='rounded-lg border border-hs-cream bg-hs-cream/20 p-3 text-sm text-black'
							>
								<p className='font-semibold'>
									{project.projectName} · {project.role}
								</p>
								<p className='text-xs text-black/60'>{project.period}</p>
								<p className='mt-1'>{project.technologies}</p>
								<p className='mt-1 text-black/80'>{project.achievement}</p>
							</div>
						))
					) : (
						<p className='text-sm text-black/70'>프로젝트 정보가 없습니다.</p>
					)}
				</div>
			</div>

			{data.analysisResult?.summary && (
				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-3 text-base font-semibold text-black'>AI 요약 리포트</h3>
					<p className='whitespace-pre-wrap text-sm text-black'>{data.analysisResult.summary}</p>
				</div>
			)}
		</section>
	)
}

export default CandidateDetailPage
