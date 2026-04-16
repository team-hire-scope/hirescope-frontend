import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import type { JobListItem } from '@/types/job'

interface PublicJobCardProps {
	job: JobListItem
	onApply?: (id: number) => void
}

const parseSkills = (raw: string): string[] =>
	raw
		.split(',')
		.map(s => s.trim())
		.filter(Boolean)
		.slice(0, 4)

const isNewJob = (createdAt: string): boolean => {
	const diff = Date.now() - new Date(createdAt).getTime()
	return diff < 7 * 24 * 60 * 60 * 1000
}

const formatDate = (iso: string): string => {
	const d = new Date(iso)
	return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export const PublicJobCard = ({ job, onApply }: PublicJobCardProps) => {
	const initial = job.companyName.charAt(0)
	const skills = parseSkills(job.requiredSkills)
	const isNew = isNewJob(job.createdAt)

	return (
		<div className='group relative bg-white rounded-3xl p-7 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-hs-deep-green/8 hover:border-hs-yellow/30 flex flex-col h-full'>
			<div className='absolute left-0 top-8 h-10 w-1.5 rounded-r-full bg-hs-yellow scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-300' />

			<div className='flex flex-col flex-1 space-y-5'>
				{/* 회사 + NEW */}
				<div className='flex justify-between items-start'>
					<div className='flex items-center gap-3'>
						<div className='w-11 h-11 bg-hs-deep-green rounded-2xl flex items-center justify-center shrink-0'>
							<span className='text-hs-yellow font-black text-base'>{initial}</span>
						</div>
						<span className='font-bold text-slate-500 text-sm'>{job.companyName}</span>
					</div>
					{isNew && (
						<span className='text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg tracking-wide'>
							NEW
						</span>
					)}
				</div>

				{/* 공고 제목 */}
				<h3 className='text-lg font-black text-hs-deep-green leading-snug group-hover:text-hs-deep-green/80 transition-colors'>
					{job.jobTitle}
				</h3>

				{/* 필수 스킬 태그 */}
				{skills.length > 0 && (
					<div className='flex flex-wrap gap-1.5'>
						{skills.map(skill => (
							<span
								key={skill}
								className='text-xs font-bold px-3 py-1.5 bg-hs-cream text-hs-deep-green/70 rounded-full'
							>
								{skill}
							</span>
						))}
					</div>
				)}
			</div>

			{/* 하단: 등록일 + 버튼 */}
			<div className='mt-6 pt-5 border-t border-slate-50 space-y-4'>
				<p className='text-xs text-slate-400 font-medium'>등록일 {formatDate(job.createdAt)}</p>
				<Button
					className='w-full py-3.5 font-black text-sm rounded-2xl shadow-none gap-2 group-hover:shadow-lg group-hover:shadow-hs-yellow/20 transition-shadow'
					onClick={() => onApply?.(job.id)}
				>
					지원하기
					<ArrowUpRight
						size={15}
						className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
					/>
				</Button>
			</div>
		</div>
	)
}
