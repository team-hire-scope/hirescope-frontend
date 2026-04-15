import { useResumeForm } from '@/hooks/user/resume-edit/useResumeForm'
import { ResumeSidebar } from '@/components/user/resume-edit/ResumeSidebar'
import { BasicInfoSection } from '@/components/user/resume-edit/BasicInfoSection'
import { EducationSection } from '@/components/user/resume-edit/EducationSection'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'

export default function ResumeEditPage() {
	const { register, control, handleSubmit, errors, onSubmit, eduFields, appendEdu, removeEdu, navigate } = useResumeForm()

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

							{/* 나머지 섹션들 (준비 중) */}
							<div id='career' className='scroll-mt-32 opacity-60 grayscale-[0.5]'>
								<ResumeSectionCard title='경력'>
									<p className='text-base font-bold text-slate-400 text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
										준비 중인 섹션입니다.
									</p>
								</ResumeSectionCard>
							</div>
							<div id='skills' className='scroll-mt-32 opacity-60 grayscale-[0.5]'>
								<ResumeSectionCard title='기술 스택'>
									<p className='text-base font-bold text-slate-400 text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
										준비 중인 섹션입니다.
									</p>
								</ResumeSectionCard>
							</div>
							<div id='projects' className='scroll-mt-32 opacity-60 grayscale-[0.5]'>
								<ResumeSectionCard title='프로젝트'>
									<p className='text-base font-bold text-slate-400 text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
										준비 중인 섹션입니다.
									</p>
								</ResumeSectionCard>
							</div>
							<div id='certifications' className='scroll-mt-32 opacity-60 grayscale-[0.5]'>
								<ResumeSectionCard title='자격증'>
									<p className='text-base font-bold text-slate-400 text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
										준비 중인 섹션입니다.
									</p>
								</ResumeSectionCard>
							</div>
						</form>
					</main>
				</div>
			</div>
		</div>
	)
}
