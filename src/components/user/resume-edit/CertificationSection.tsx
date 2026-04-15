import type { UseFormRegister, FieldArrayWithId } from 'react-hook-form'
import { Trash2, Award } from 'lucide-react'
import { Input } from '@/components/common/Input'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import type { Resume } from '@/types/resume'

interface CertificationSectionProps {
	register: UseFormRegister<Resume>
	fields: FieldArrayWithId<Resume, 'certifications', 'id'>[]
	onAdd: () => void
	onRemove: (index: number) => void
}

export const CertificationSection = ({ register, fields, onAdd, onRemove }: CertificationSectionProps) => {
	return (
		<div id='certifications' className='scroll-mt-28'>
			<ResumeSectionCard title='자격증' onAdd={onAdd}>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className='group/item relative flex flex-col gap-6 bg-hs-cream/10 p-7 rounded-[32px] border border-transparent transition-all hover:border-hs-yellow/20 hover:bg-white'
						>
							<Input
								label='자격증명'
								placeholder='예: 정보처리기사'
								{...register(`certifications.${index}.certificationName` as const)}
							/>
							<div className='grid grid-cols-2 gap-4'>
								<Input
									label='발행처'
									placeholder='예: 한국산업인력공단'
									{...register(`certifications.${index}.issuer` as const)}
								/>
								<Input
									label='취득일'
									placeholder='예: 2023.05'
									{...register(`certifications.${index}.acquisitionDate` as const)}
								/>
							</div>

							<button
								type='button'
								onClick={() => onRemove(index)}
								className='absolute -right-3 -top-3 rounded-full bg-white p-2.5 text-rose-400 shadow-md opacity-0 transition-all hover:text-rose-600 group-hover/item:opacity-100 group-hover/item:translate-x-2'
							>
								<Trash2 size={20} />
							</button>
						</div>
					))}
				</div>

				{fields.length === 0 && (
					<div className='text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px]'>
						<div className='mx-auto w-16 h-16 bg-hs-cream rounded-full flex items-center justify-center mb-4'>
							<Award size={32} className='text-hs-deep-green opacity-40' />
						</div>
						<p className='text-slate-400 font-bold mb-6'>보유하신 자격증이나 어학 성적을 추가해보세요.</p>
						<button
							type='button'
							onClick={onAdd}
							className='inline-flex items-center gap-2 px-8 py-4 bg-hs-yellow text-hs-deep-green rounded-full font-black shadow-lg hover:shadow-xl transition-all active:scale-95'
						>
							<span className='text-xl'>+</span> 자격증 추가하기
						</button>
					</div>
				)}
			</ResumeSectionCard>
		</div>
	)
}
