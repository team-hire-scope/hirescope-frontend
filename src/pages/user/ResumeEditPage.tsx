import { useResumeForm } from '@/hooks/user/resume-edit/useResumeForm'
import { ResumeSidebar } from '@/components/user/resume-edit/ResumeSidebar'
import { BasicInfoSection } from '@/components/user/resume-edit/BasicInfoSection'
import { EducationSection } from '@/components/user/resume-edit/EducationSection'
import { CareerSection } from '@/components/user/resume-edit/CareerSection'
import { SkillSection } from '@/components/user/resume-edit/SkillSection'
import { ProjectSection } from '@/components/user/resume-edit/ProjectSection'
import { CertificationSection } from '@/components/user/resume-edit/CertificationSection'

export default function ResumeEditPage() {
	const {
		register,
		control,
		handleSubmit,
		errors,
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
		navigate,
	} = useResumeForm()

	return (
		<div className='min-h-screen bg-[#faf9f6] pb-20'>
			<div className='container mx-auto max-w-7xl p-8'>
				<div className='flex flex-col lg:flex-row gap-20 items-start'>
					{/* 좌측 내비게이션 */}
					<ResumeSidebar onCancel={() => navigate(-1)} />

					{/* 메인 폼 영역 */}
					<main className='flex-1 w-full space-y-16'>
						<form id='resume-form' onSubmit={handleSubmit(onSubmit)} className='space-y-16'>
							{/* 기본 정보 섹션 */}
							<BasicInfoSection register={register} errors={errors} />

							{/* 학력 섹션 */}
							<EducationSection
								register={register}
								control={control}
								fields={eduFields}
								onAdd={() => appendEdu({ schoolName: '', major: '', degree: '', startDate: '', endDate: '' })}
								onRemove={removeEdu}
							/>

							{/* 경력 섹션 */}
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

							{/* 기술 스택 섹션 */}
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

							{/* 프로젝트 섹션 */}
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

							{/* 자격증 섹션 */}
							<CertificationSection
								register={register}
								fields={certFields}
								onAdd={() => appendCert({ certificationName: '', issuer: '', acquisitionDate: '' })}
								onRemove={removeCert}
							/>
						</form>
					</main>
				</div>
			</div>
		</div>
	)
}
