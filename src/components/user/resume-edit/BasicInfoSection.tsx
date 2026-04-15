import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/common/Input'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import type { Resume } from '@/types/resume'

interface BasicInfoSectionProps {
	register: UseFormRegister<Resume>
	errors: FieldErrors<Resume>
}

export const BasicInfoSection = ({ register, errors }: BasicInfoSectionProps) => {
	return (
		<div id='basic' className='scroll-mt-28'>
			<ResumeSectionCard title='기본 정보'>
				<Input
					label='이력서 제목'
					placeholder='자신을 가장 잘 나타내는 제목을 지어보세요.'
					className='text-2xl font-black py-7 h-16'
					{...register('title', { required: '제목은 필수입니다.' })}
					error={errors.title?.message}
				/>
				<div className='flex flex-col gap-2.5'>
					<label className='text-base font-bold text-hs-deep-green uppercase tracking-tight ml-1'>자기소개 요약</label>
					<textarea
						className='min-h-[220px] w-full rounded-[28px] border border-hs-yellow/40 bg-white p-7 text-base leading-relaxed outline-none transition-all focus:border-hs-yellow focus:ring-4 focus:ring-hs-yellow/10 placeholder:text-slate-300'
						placeholder='이력서의 첫인상이 될 요약글을 작성해주세요. 핵심 역량 위주로 작성하는 것이 좋습니다.'
						{...register('summary')}
					/>
				</div>
			</ResumeSectionCard>
		</div>
	)
}
