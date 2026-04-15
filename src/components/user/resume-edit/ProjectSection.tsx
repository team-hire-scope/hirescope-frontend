import type { UseFormRegister, FieldArrayWithId } from 'react-hook-form'
import { Trash2, FolderGit2 } from 'lucide-react'
import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import type { Resume } from '@/types/resume'

interface ProjectSectionProps {
	register: UseFormRegister<Resume>
	fields: FieldArrayWithId<Resume, 'projects', 'id'>[]
	onAdd: () => void
	onRemove: (index: number) => void
}

export const ProjectSection = ({ register, fields, onAdd, onRemove }: ProjectSectionProps) => {
	return (
		<div id='projects' className='scroll-mt-28'>
			<ResumeSectionCard title='프로젝트' onAdd={onAdd}>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='group/item relative flex flex-col gap-8 bg-hs-cream/10 p-8 rounded-[32px] border border-transparent transition-all hover:border-hs-yellow/20 hover:bg-white'
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<Input
								label='프로젝트명'
								placeholder='예: AI 기반 채용 플랫폼 하이어스코프'
								{...register(`projects.${index}.projectName` as const)}
							/>
							<Input
								label='역할'
								placeholder='예: 프론트엔드 리드 개발자'
								{...register(`projects.${index}.role` as const)}
							/>
							<Input
								label='기간'
								placeholder='예: 2023.01 - 2023.03'
								{...register(`projects.${index}.duration` as const)}
							/>
							<Input
								label='사용 기술'
								placeholder='예: React, TypeScript, Tailwind CSS'
								{...register(`projects.${index}.techStack` as const)}
							/>
						</div>

						<Textarea
							label='주요 성과 및 설명'
							className='min-h-[120px]'
							placeholder='프로젝트의 핵심 기능과 본인이 기여한 구체적인 성과를 적어주세요. (예: 페이지 로딩 속도 30% 개선 등)'
							{...register(`projects.${index}.achievementsDescription` as const)}
						/>

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
							<FolderGit2 size={32} className='text-hs-deep-green opacity-40' />
						</div>
						<p className='text-slate-400 font-bold mb-6'>진행하셨던 주요 프로젝트를 추가해보세요.</p>
						<button
							type='button'
							onClick={onAdd}
							className='inline-flex items-center gap-2 px-8 py-4 bg-hs-yellow text-hs-deep-green rounded-full font-black shadow-lg hover:shadow-xl transition-all active:scale-95'
						>
							<span className='text-xl'>+</span> 프로젝트 추가하기
						</button>
					</div>
				)}
			</ResumeSectionCard>
		</div>
	)
}
