import type { UseFormRegister, Control, FieldArrayWithId } from 'react-hook-form'
import { Trash2, Briefcase } from 'lucide-react'
import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import type { Resume } from '@/types/resume'

interface CareerSectionProps {
	register: UseFormRegister<Resume>
	control: Control<Resume>
	fields: FieldArrayWithId<Resume, 'careers', 'id'>[]
	onAdd: () => void
	onRemove: (index: number) => void
}

export const CareerSection = ({ register, fields, onAdd, onRemove }: CareerSectionProps) => {
	return (
		<div id='career' className='scroll-mt-28'>
			<ResumeSectionCard title='경력' onAdd={onAdd}>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='group/item relative flex flex-col gap-8 bg-hs-cream/10 p-8 rounded-[32px] border border-transparent transition-all hover:border-hs-yellow/20 hover:bg-white'
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<Input
								label='회사명'
								placeholder='예: 하이어스코프'
								{...register(`careers.${index}.companyName` as const)}
							/>
							<div className='grid grid-cols-2 gap-4'>
								<Input
									label='직무'
									placeholder='예: 프론트엔드 개발자'
									{...register(`careers.${index}.jobTitle` as const)}
								/>
								<Input label='직급' placeholder='예: 대리' {...register(`careers.${index}.position` as const)} />
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<Input
									label='입사일'
									placeholder='예: 2022.01'
									{...register(`careers.${index}.startDate` as const)}
								/>
								<Input
									label='퇴사일'
									placeholder='예: 2024.03 (재직 중이면 비워두세요)'
									{...register(`careers.${index}.endDate` as const)}
								/>
							</div>
						</div>

						<div className='space-y-6'>
							<Textarea
								label='담당 업무 설명'
								className='min-h-[120px]'
								placeholder='주요 담당 업무와 수행 역할을 구체적으로 적어주세요.'
								{...register(`careers.${index}.jobDescription` as const)}
							/>
							<Textarea
								label='정량적 성과'
								className='min-h-[100px]'
								placeholder='구체적인 수치나 데이터를 활용한 성과가 있다면 적어주세요. AI 분석 시 큰 가점이 됩니다.'
								{...register(`careers.${index}.quantitativeResults` as const)}
							/>
						</div>

						{fields.length > 0 && (
							<button
								type='button'
								onClick={() => onRemove(index)}
								className='absolute -right-4 top-0 rounded-full bg-white p-3 text-rose-400 shadow-md opacity-0 transition-all hover:text-rose-600 group-hover/item:opacity-100 group-hover/item:translate-x-4'
							>
								<Trash2 size={22} />
							</button>
						)}
					</div>
				))}
				{fields.length === 0 && (
					<div className='text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
						<div className='mx-auto w-16 h-16 bg-hs-cream rounded-full flex items-center justify-center mb-4'>
							<Briefcase size={32} className='text-hs-deep-green opacity-40' />
						</div>
						<p className='text-slate-400 font-bold mb-6'>경력 사항을 추가하고 직무 적합도를 분석해보세요.</p>
						<button
							type='button'
							onClick={onAdd}
							className='inline-flex items-center gap-2 px-8 py-4 bg-hs-yellow text-hs-deep-green rounded-full font-black shadow-lg hover:shadow-xl transition-all active:scale-95'
						>
							<span className='text-xl'>+</span> 경력 추가하기
						</button>
					</div>
				)}
			</ResumeSectionCard>
		</div>
	)
}
