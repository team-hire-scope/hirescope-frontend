import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
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
				<Textarea
					label='자기소개 요약'
					className='min-h-[220px]'
					placeholder='이력서의 첫인상이 될 요약글을 작성해주세요. 핵심 역량 위주로 작성하는 것이 좋습니다.'
					{...register('summary')}
				/>
			</ResumeSectionCard>
		</div>
	)
}
