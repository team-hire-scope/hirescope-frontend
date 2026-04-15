import { useWatch } from 'react-hook-form'
import type { UseFormRegister, Control, FieldArrayWithId } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Trash2, Wrench, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Input } from '@/components/common/Input'
import { SegmentedControl } from '@/components/common/SegmentedControl'
import { Badge } from '@/components/common/Badge'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import type { Resume, Skill } from '@/types/resume'

interface SkillSectionProps {
	register: UseFormRegister<Resume>
	control: Control<Resume>
	fields: FieldArrayWithId<Resume, 'skills', 'id'>[]
	onAdd: (initialData?: Partial<Skill>) => void
	onRemove: (index: number) => void
}

const PROFICIENCY_OPTIONS = [
	{ value: 'low', label: '하' },
	{ value: 'mid', label: '중' },
	{ value: 'high', label: '상' },
]

const DURATION_OPTIONS = [
	{ value: 6, label: '1년 이하' },
	{ value: 24, label: '1~3년' },
	{ value: 60, label: '3년 이상' },
]

const RECOMMENDED_SKILLS = [
	'React',
	'TypeScript',
	'JavaScript',
	'Node.js',
	'Next.js',
	'Python',
	'Java',
	'Spring Boot',
	'SQL',
	'AWS',
	'Docker',
	'Git',
	'Figma',
]

export const SkillSection = ({ register, control, fields, onAdd, onRemove }: SkillSectionProps) => {
	// watch를 통해 폼의 최신 skills 상태를 가져옴 (중복 체크용)
	const watchedSkills = useWatch({
		control,
		name: 'skills',
	})

	const currentSkillNames = (watchedSkills || []).map((s: Skill) => s?.skillName)

	return (
		<div id='skills' className='scroll-mt-28'>
			<ResumeSectionCard title='기술 스택' onAdd={() => onAdd()}>
				<div className='mb-8 space-y-4 rounded-3xl bg-hs-cream/20 p-6 border border-hs-yellow/10'>
					<div className='flex items-center gap-2 text-hs-deep-green/80 font-bold text-sm'>
						<Sparkles size={16} className='text-hs-yellow' />
						자주 찾는 스킬이에요
					</div>
					<div className='flex flex-wrap gap-2'>
						{RECOMMENDED_SKILLS.map(skill => {
							const isAdded = currentSkillNames.includes(skill)
							return (
								<button
									key={skill}
									type='button'
									disabled={isAdded}
									onClick={() => onAdd({ skillName: skill, proficiency: 'mid', durationMonths: 24 })}
									className='group'
								>
									<Badge
										variant={isAdded ? 'success' : 'default'}
										className={cn(
											'px-4 py-2 text-sm transition-all border border-transparent',
											isAdded
												? 'opacity-50 cursor-not-allowed grayscale'
												: 'hover:border-hs-yellow hover:bg-white hover:shadow-sm group-active:scale-95 cursor-pointer'
										)}
									>
										{skill} {isAdded && '✓'}
									</Badge>
								</button>
							)
						})}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className='group/item relative flex flex-col gap-6 bg-hs-cream/10 p-7 rounded-[32px] border border-transparent transition-all hover:border-hs-yellow/20 hover:bg-white'
						>
							<Input
								label='기술명'
								placeholder='예: React, TypeScript, Python'
								{...register(`skills.${index}.skillName` as const)}
							/>

							<div className='flex flex-col gap-5'>
								<Controller
									control={control}
									name={`skills.${index}.proficiency` as const}
									render={({ field: { onChange, value } }) => (
										<SegmentedControl
											label='숙련도'
											options={PROFICIENCY_OPTIONS}
											value={value}
											onChange={onChange}
										/>
									)}
								/>
								<Controller
									control={control}
									name={`skills.${index}.durationMonths` as const}
									render={({ field: { onChange, value } }) => (
										<SegmentedControl
											label='사용 기간'
											options={DURATION_OPTIONS}
											value={value}
											onChange={onChange}
										/>
									)}
								/>
							</div>

							<button
								type='button'
								onClick={() => onRemove(index)}
								className='absolute -right-3 -top-3 rounded-full bg-white p-2.5 text-rose-400 shadow-md opacity-0 transition-all hover:text-rose-600 group-hover/item:opacity-100 group-hover/item:translate-x-4'
							>
								<Trash2 size={20} />
							</button>
						</div>
					))}
				</div>

				{fields.length === 0 && (
					<div className='text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
						<div className='mx-auto w-16 h-16 bg-hs-cream rounded-full flex items-center justify-center mb-4'>
							<Wrench size={32} className='text-hs-deep-green opacity-40' />
						</div>
						<p className='text-slate-400 font-bold mb-6'>보유하신 기술 스택을 추가해보세요.</p>
						<button
							type='button'
							onClick={() => onAdd()}
							className='inline-flex items-center gap-2 px-8 py-4 bg-hs-yellow text-hs-deep-green rounded-full font-black shadow-lg hover:shadow-xl transition-all active:scale-95'
						>
							<span className='text-xl'>+</span> 기술 추가하기
						</button>
					</div>
				)}
			</ResumeSectionCard>
		</div>
	)
}
