import { type FormEvent, useMemo, useState } from 'react'
import { isAxiosError } from 'axios'
import { Link, useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../../common/Button'
import { Input } from '../../common/Input'
import { Select } from '../../common/Select'
import { Textarea } from '../../common/Textarea'
import { useCreateJob, useUpdateJob } from '../../../hooks/company/useJobMutations'
import { jobDetailQueryKey } from '../../../hooks/company/useJobDetail'
import { jobPostsQueryKey } from '../../../hooks/company/useJobPosts'
import type { JobPost } from '../../../types/job'

const EMPLOYMENT_OPTIONS = [
	{ value: 'full-time', label: '정규직' },
	{ value: 'contract', label: '계약직' },
	{ value: 'intern', label: '인턴' },
]

const EXPERIENCE_OPTIONS = [
	{ value: 'junior', label: '주니어(1~3년)' },
	{ value: 'mid', label: '미들(4~7년)' },
	{ value: 'senior', label: '시니어(8년 이상)' },
]

type FormState = {
	companyName: string
	jobTitle: string
	employmentType: string
	experienceLevel: string
	hiringCount: string
	jobDescription: string
	requiredSkills: string
	preferredQualifications: string
	weightJobFit: string
	weightCareerConsistency: string
	weightSkillMatch: string
	weightQuantitativeAchievement: string
	weightDocumentQuality: string
}

const emptyForm = (): FormState => ({
	companyName: '',
	jobTitle: '',
	employmentType: '',
	experienceLevel: '',
	hiringCount: '',
	jobDescription: '',
	requiredSkills: '',
	preferredQualifications: '',
	weightJobFit: '30',
	weightCareerConsistency: '20',
	weightSkillMatch: '25',
	weightQuantitativeAchievement: '15',
	weightDocumentQuality: '10',
})

const formFromJob = (job: JobPost): FormState => ({
	companyName: job.companyName,
	jobTitle: job.jobTitle,
	employmentType: '',
	experienceLevel: '',
	hiringCount: '',
	jobDescription: job.jobDescription,
	requiredSkills: job.requiredSkills,
	preferredQualifications: job.preferredQualifications,
	weightJobFit: String(job.weightJobFit),
	weightCareerConsistency: String(job.weightCareerConsistency),
	weightSkillMatch: String(job.weightSkillMatch),
	weightQuantitativeAchievement: String(job.weightQuantitativeAchievement),
	weightDocumentQuality: String(job.weightDocumentQuality),
})

interface JDFormProps {
	editJobId?: string
	initialJob?: JobPost
}

export const JDForm = ({ editJobId, initialJob }: JDFormProps) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const createJobMutation = useCreateJob()
	const updateJobMutation = useUpdateJob()
	const isEdit = Boolean(editJobId)

	const [errorMessage, setErrorMessage] = useState('')
	const [form, setForm] = useState<FormState>(() => (initialJob ? formFromJob(initialJob) : emptyForm()))

	const totalWeight = useMemo(() => {
		const values = [
			form.weightJobFit,
			form.weightCareerConsistency,
			form.weightSkillMatch,
			form.weightQuantitativeAchievement,
			form.weightDocumentQuality,
		]
		return values.reduce((sum, value) => sum + Number(value || 0), 0)
	}, [
		form.weightCareerConsistency,
		form.weightDocumentQuality,
		form.weightJobFit,
		form.weightQuantitativeAchievement,
		form.weightSkillMatch,
	])

	const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	const getCompanyName = () => {
		const raw = window.localStorage.getItem('companyAuthName')
		if (!raw) return ''
		try {
			return JSON.parse(raw) as string
		} catch {
			return raw
		}
	}

	const buildPayload = () => {
		const companyName = isEdit ? form.companyName.trim() : getCompanyName()
		const preferredQualifications = isEdit
			? form.preferredQualifications.trim()
			: `고용형태: ${form.employmentType || '-'} / 경력레벨: ${form.experienceLevel || '-'} / 채용인원: ${form.hiringCount || '-'}`

		return {
			companyName,
			jobTitle: form.jobTitle.trim(),
			jobDescription: form.jobDescription.trim(),
			requiredSkills: form.requiredSkills.trim(),
			preferredQualifications,
			weightJobFit: Number(form.weightJobFit || 0),
			weightCareerConsistency: Number(form.weightCareerConsistency || 0),
			weightSkillMatch: Number(form.weightSkillMatch || 0),
			weightQuantitativeAchievement: Number(form.weightQuantitativeAchievement || 0),
			weightDocumentQuality: Number(form.weightDocumentQuality || 0),
			weightSkillMatchOrDefault: 0,
			weightJobFitOrDefault: 0,
			weightCareerConsistencyOrDefault: 0,
			weightQuantitativeAchievementOrDefault: 0,
			weightDocumentQualityOrDefault: 0,
			totalWeight,
		}
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setErrorMessage('')

		if (!form.jobTitle.trim() || !form.jobDescription.trim()) {
			setErrorMessage('직무명과 JD 내용을 입력해주세요.')
			return
		}

		if (isEdit && !form.companyName.trim()) {
			setErrorMessage('회사명을 입력해주세요.')
			return
		}

		if (totalWeight !== 100) {
			setErrorMessage('5개 가중치 합계는 100이어야 합니다.')
			return
		}

		const payload = buildPayload()

		const onSuccess = () => {
			void queryClient.invalidateQueries({ queryKey: jobPostsQueryKey({ page: 0, size: 10 }) })
			if (isEdit && editJobId) {
				void queryClient.invalidateQueries({ queryKey: jobDetailQueryKey(editJobId) })
				navigate(`/jobs/${editJobId}`)
			} else {
				navigate('/com-mypage/jobs')
			}
		}

		const onMutationError = (err: unknown) => {
			const message =
				isAxiosError(err) && err.response?.data?.message
					? String(err.response.data.message)
					: isEdit
						? '채용 공고 수정에 실패했습니다.'
						: '채용 공고 등록에 실패했습니다.'
			setErrorMessage(message)
		}

		if (isEdit && editJobId) {
			updateJobMutation.mutate(
				{ id: editJobId, payload },
				{
					onSuccess,
					onError: onMutationError,
				}
			)
		} else {
			createJobMutation.mutate(payload, {
				onSuccess,
				onError: onMutationError,
			})
		}
	}

	const isPending = createJobMutation.isPending || updateJobMutation.isPending

	return (
		<form className='space-y-5' onSubmit={handleSubmit}>
			{isEdit && (
				<Input
					id='company-name'
					label='회사명'
					placeholder='회사명'
					value={form.companyName}
					onChange={event => updateField('companyName', event.target.value)}
				/>
			)}

			<div className='grid grid-cols-2 gap-4'>
				<Input
					id='job-title'
					label='직무명'
					placeholder='예: 프론트엔드 개발자'
					value={form.jobTitle}
					onChange={event => updateField('jobTitle', event.target.value)}
				/>
				<Select
					id='employment-type'
					label='고용 형태'
					placeholder='고용 형태를 선택하세요'
					options={EMPLOYMENT_OPTIONS}
					value={form.employmentType}
					onChange={value => updateField('employmentType', value)}
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<Select
					id='experience-level'
					label='경력 레벨'
					placeholder='경력 레벨을 선택하세요'
					options={EXPERIENCE_OPTIONS}
					value={form.experienceLevel}
					onChange={value => updateField('experienceLevel', value)}
				/>
				<Input
					id='hiring-count'
					label='채용 인원'
					type='number'
					placeholder='예: 2'
					min={1}
					value={form.hiringCount}
					onChange={event => updateField('hiringCount', event.target.value)}
				/>
			</div>

			<Textarea
				id='jd'
				label='JD 내용'
				placeholder='주요 업무, 자격 요건, 우대 사항을 입력하세요.'
				value={form.jobDescription}
				onChange={event => updateField('jobDescription', event.target.value)}
			/>

			<Textarea
				id='screening-criteria'
				label='핵심 평가 기준'
				placeholder='예: 문제 해결력, 협업 커뮤니케이션, React 실무 경험'
				value={form.requiredSkills}
				onChange={event => updateField('requiredSkills', event.target.value)}
			/>

			{isEdit && (
				<Textarea
					id='preferred-qualifications'
					label='우대 사항'
					placeholder='우대 사항을 입력하세요.'
					value={form.preferredQualifications}
					onChange={event => updateField('preferredQualifications', event.target.value)}
				/>
			)}

			<div className='space-y-3 rounded-lg border border-hs-cream bg-hs-cream/30 p-4'>
				<h4 className='text-sm font-semibold text-hs-deep-green'>5대 평가 기준 가중치 설정(%) - 합계 {totalWeight}</h4>
				<div className='grid grid-cols-5 gap-3'>
					<Input
						id='weight-fit'
						label='직무 적합도'
						type='number'
						min={0}
						max={100}
						value={form.weightJobFit}
						onChange={event => updateField('weightJobFit', event.target.value)}
					/>
					<Input
						id='weight-career'
						label='경력 일관성'
						type='number'
						min={0}
						max={100}
						value={form.weightCareerConsistency}
						onChange={event => updateField('weightCareerConsistency', event.target.value)}
					/>
					<Input
						id='weight-stack'
						label='기술 스택 매칭'
						type='number'
						min={0}
						max={100}
						value={form.weightSkillMatch}
						onChange={event => updateField('weightSkillMatch', event.target.value)}
					/>
					<Input
						id='weight-achievement'
						label='정량적 성과'
						type='number'
						min={0}
						max={100}
						value={form.weightQuantitativeAchievement}
						onChange={event => updateField('weightQuantitativeAchievement', event.target.value)}
					/>
					<Input
						id='weight-doc'
						label='문서 품질'
						type='number'
						min={0}
						max={100}
						value={form.weightDocumentQuality}
						onChange={event => updateField('weightDocumentQuality', event.target.value)}
					/>
				</div>
			</div>

			{errorMessage && <p className='rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600'>{errorMessage}</p>}

			<div className='flex items-center justify-between gap-2'>
				<Link
					to={isEdit && editJobId ? `/jobs/${editJobId}` : '/company-main'}
					className='text-sm font-medium text-hs-deep-green'
				>
					이전 단계
				</Link>
				<div className='flex items-center gap-2'>
					<Button variant='secondary' type='button' disabled={isPending}>
						임시 저장
					</Button>
					<Button type='submit' disabled={isPending}>
						{isPending ? '저장 중...' : isEdit ? '수정 저장' : 'JD 저장'}
					</Button>
				</div>
			</div>
		</form>
	)
}
