import { useWatch, Controller } from 'react-hook-form'
import type { UseFormRegister, Control, FieldArrayWithId } from 'react-hook-form'
import { Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import type { Resume } from '@/types/resume'

interface EducationSectionProps {
	register: UseFormRegister<Resume>
	control: Control<Resume>
	fields: FieldArrayWithId<Resume, 'educations', 'id'>[]
	onAdd: () => void
	onRemove: (index: number) => void
}

const DEGREE_OPTIONS = [
	{ value: 'high_school', label: '고등학교' },
	{ value: 'associate', label: '전문학사' },
	{ value: 'bachelor', label: '학사' },
	{ value: 'master', label: '석사' },
	{ value: 'doctor', label: '박사' },
]

export const EducationSection = ({ register, control, fields, onAdd, onRemove }: EducationSectionProps) => {
	const watchEducations = useWatch({
		control,
		name: 'educations',
	})

	return (
		<div id='education' className='scroll-mt-28'>
			<ResumeSectionCard title='학력' onAdd={onAdd}>
				{fields.map((field, index) => {
					const selectedDegree = watchEducations?.[index]?.degree

					return (
						<div
							key={field.id}
							className='group/item relative flex flex-col gap-8 bg-hs-cream/10 p-8 rounded-[32px] border border-transparent transition-all hover:border-hs-yellow/20 hover:bg-white'
						>
							<div className='max-w-xs'>
								<Controller
									control={control}
									name={`educations.${index}.degree` as const}
									rules={{ required: '학위 선택은 필수입니다.' }}
									render={({ field: { onChange, value }, fieldState: { error } }) => (
										<Select
											label='학위'
											placeholder='학위 선택'
											options={DEGREE_OPTIONS}
											value={value}
											onChange={onChange}
											error={error?.message}
										/>
									)}
								/>
							</div>

							{selectedDegree && (
								<div className='grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500'>
									<Input
										label='학교명'
										placeholder='예: 하이어대학교'
										{...register(`educations.${index}.schoolName` as const)}
									/>
									{selectedDegree !== 'high_school' && (
										<Input
											label='전공'
											placeholder='예: 컴퓨터공학부'
											{...register(`educations.${index}.major` as const)}
										/>
									)}
									<div className='grid grid-cols-2 gap-4'>
										<Input
											label='입학일'
											type='month'
											{...register(`educations.${index}.startDate` as const)}
										/>
										<Input
											label='졸업일'
											type='month'
											{...register(`educations.${index}.endDate` as const)}
										/>
									</div>
								</div>
							)}

							{fields.length > 1 && (
								<button
									type='button'
									onClick={() => onRemove(index)}
									className='absolute -right-4 top-0 rounded-full bg-white p-3 text-rose-400 shadow-md opacity-0 transition-all hover:text-rose-600 group-hover/item:opacity-100 group-hover/item:translate-x-4'
								>
									<Trash2 size={22} />
								</button>
							)}
						</div>
					)
				})}

				{fields.length === 0 && (
					<div className='text-center py-12 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
						<p className='text-slate-400 font-medium mb-4'>학력 사항을 추가하고 AI 분석의 정확도를 높여보세요.</p>
						<button
							type='button'
							onClick={onAdd}
							className='inline-flex items-center gap-2 px-6 py-3 bg-hs-yellow text-hs-deep-green rounded-full font-black shadow-lg hover:shadow-xl transition-all'
						>
							<Plus size={20} /> 학력 추가하기
						</button>
					</div>
				)}
			</ResumeSectionCard>
		</div>
	)
}
