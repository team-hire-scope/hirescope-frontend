import { useNavigate, useParams, useBlocker } from 'react-router'
import { useResumeForm } from '@/hooks/user/resume-edit/useResumeForm'
import { ResumeSidebar } from '@/components/user/resume-edit/ResumeSidebar'
import { BasicInfoSection } from '@/components/user/resume-edit/BasicInfoSection'
import { EducationSection } from '@/components/user/resume-edit/EducationSection'
import { CareerSection } from '@/components/user/resume-edit/CareerSection'
import { SkillSection } from '@/components/user/resume-edit/SkillSection'
import { ProjectSection } from '@/components/user/resume-edit/ProjectSection'
import { CertificationSection } from '@/components/user/resume-edit/CertificationSection'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'

export default function ResumeEditPage() {
	const navigate = useNavigate()
	const { resumeId } = useParams<{ resumeId: string }>()

	const {
		register,
		control,
		handleSubmit,
		errors,
		isPending,
		isDirty,
		isLoadingDetail,
		onSubmit,
		eduFields,
		appendEdu,
		removeEdu,
		careerFields,
		appendCareer,
		removeCareer,
		skillFields,
		appendSkill,
		removeSkill,
		projectFields,
		appendProject,
		removeProject,
		certFields,
		appendCert,
		removeCert,
	} = useResumeForm(resumeId)

	// 수정 사항이 있고 저장 중이 아닐 때만 이탈 방지
	const blocker = useBlocker(isDirty && !isPending)

	return (
		<div className='min-h-screen bg-[#faf9f6] pb-20'>
			<div className='container mx-auto max-w-7xl p-8'>
				<div className='flex flex-col lg:flex-row gap-20 items-start'>
					<ResumeSidebar onCancel={() => navigate(-1)} isPending={isPending} />

					<main className='flex-1 w-full space-y-16'>
						{isLoadingDetail ? (
							<div className='flex flex-col items-center justify-center py-40 gap-4'>
								<div className='w-10 h-10 animate-spin rounded-full border-4 border-hs-yellow/20 border-t-hs-yellow' />
								<p className='text-slate-400 font-medium text-sm'>이력서를 불러오는 중이에요...</p>
							</div>
						) : (
							<form id='resume-form' onSubmit={handleSubmit(onSubmit)} className='space-y-16'>
								<BasicInfoSection register={register} errors={errors} />

								<EducationSection
									register={register}
									control={control}
									fields={eduFields}
									onAdd={() => appendEdu({ schoolName: '', major: '', degree: '', startDate: '', endDate: '' })}
									onRemove={removeEdu}
								/>

								<CareerSection
									register={register}
									control={control}
									fields={careerFields}
									onAdd={() =>
										appendCareer({
											companyName: '',
											jobTitle: '',
											position: '',
											startDate: '',
											jobDescription: '',
											quantitativeResults: '',
										})
									}
									onRemove={removeCareer}
								/>

								<SkillSection
									register={register}
									control={control}
									fields={skillFields}
									onAdd={initialData =>
										appendSkill({
											skillName: '',
											proficiency: 'mid',
											durationMonths: 24,
											...initialData,
										})
									}
									onRemove={removeSkill}
								/>

								<ProjectSection
									register={register}
									fields={projectFields}
									onAdd={() =>
										appendProject({
											projectName: '',
											role: '',
											duration: '',
											techStack: '',
											achievementsDescription: '',
										})
									}
									onRemove={removeProject}
								/>

								<CertificationSection
									register={register}
									fields={certFields}
									onAdd={() => appendCert({ certificationName: '', issuer: '', acquisitionDate: '' })}
									onRemove={removeCert}
								/>
							</form>
						)}
					</main>
				</div>
			</div>

			{/* 미저장 이탈 방지 다이얼로그 */}
			<ConfirmDialog
				open={blocker.state === 'blocked'}
				title='저장하지 않은 변경사항'
				description={
					<>
						수정한 내용이 저장되지 않습니다.
						<br />
						페이지를 나가시겠습니까?
					</>
				}
				cancelLabel='계속 편집'
				confirmLabel='나가기'
				onCancel={() => blocker.state === 'blocked' && blocker.reset()}
				onConfirm={() => blocker.state === 'blocked' && blocker.proceed()}
			/>
		</div>
	)
}
