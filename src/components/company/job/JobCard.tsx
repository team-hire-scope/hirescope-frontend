import { Badge } from '@/components/common/Badge'

interface JobCardProps {
	title: string
	department: string
	status: '진행중' | '검토중' | '마감임박' | '마감'
	applicants: number
	passed: number
	progress: number
}

const statusVariantMap: Record<JobCardProps['status'], 'success' | 'default' | 'warning' | 'danger'> = {
	진행중: 'success',
	검토중: 'default',
	마감임박: 'warning',
	마감: 'danger',
}

export const JobCard = ({ title, department, status, applicants, passed, progress }: JobCardProps) => {
	return (
		<article className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
			<div className='mb-3 flex items-start justify-between'>
				<div>
					<h3 className='text-base font-semibold text-black'>{title}</h3>
					<p className='mt-1 text-sm text-black'>{department}</p>
				</div>
				<Badge variant={statusVariantMap[status]}>{status}</Badge>
			</div>

			<div className='mb-3 grid grid-cols-2 gap-2 text-sm'>
				<div className='rounded-md bg-hs-cream/40 px-3 py-2'>
					<p className='text-hs-deep-green'>지원자 수</p>
					<p className='text-lg font-semibold text-black'>{applicants}명</p>
				</div>
				<div className='rounded-md bg-hs-cream/40 px-3 py-2'>
					<p className='text-hs-deep-green'>서류 통과</p>
					<p className='text-lg font-semibold text-black'>{passed}명</p>
				</div>
			</div>

			<div>
				<div className='mb-1 flex items-center justify-between text-sm'>
					<span className='text-hs-deep-green'>진행률</span>
					<span className='font-medium text-black'>{progress}%</span>
				</div>
				<div className='h-2 w-full rounded-full bg-hs-cream'>
					<div className='h-2 rounded-full bg-hs-yellow' style={{ width: `${progress}%` }} />
				</div>
			</div>
		</article>
	)
}
