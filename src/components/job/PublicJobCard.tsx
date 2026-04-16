import { MapPin, Calendar, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'

interface PublicJobCardProps {
	id: string
	companyName: string
	title: string
	location: string
	tags: string[]
	deadline: string
	isNew?: boolean
	onApply?: (id: string) => void
}

export const PublicJobCard = ({ id, companyName, title, location, tags, deadline, isNew, onApply }: PublicJobCardProps) => {
	const initial = companyName.charAt(0)

	return (
		<div className='group relative bg-white rounded-3xl p-7 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-hs-deep-green/8 hover:border-hs-yellow/30 flex flex-col h-full'>
			{/* 호버 시 좌측 포인트 */}
			<div className='absolute left-0 top-8 h-10 w-1.5 rounded-r-full bg-hs-yellow scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-300' />

			<div className='flex flex-col flex-1 space-y-5'>
				{/* 상단: 회사 + NEW 뱃지 */}
				<div className='flex justify-between items-start'>
					<div className='flex items-center gap-3'>
						<div className='w-11 h-11 bg-hs-deep-green rounded-2xl flex items-center justify-center flex-shrink-0'>
							<span className='text-hs-yellow font-black text-base'>{initial}</span>
						</div>
						<div>
							<span className='font-bold text-slate-500 text-sm'>{companyName}</span>
						</div>
					</div>
					{isNew && (
						<Badge variant='success' className='px-3 py-1 rounded-lg text-xs font-black tracking-wide'>
							NEW
						</Badge>
					)}
				</div>

				{/* 공고 제목 */}
				<h3 className='text-lg font-black text-hs-deep-green leading-snug group-hover:text-hs-deep-green/80 transition-colors'>
					{title}
				</h3>

				{/* 태그 */}
				<div className='flex flex-wrap gap-1.5'>
					{tags.map(tag => (
						<span key={tag} className='text-xs font-bold px-3 py-1.5 bg-hs-cream text-hs-deep-green/70 rounded-full'>
							{tag}
						</span>
					))}
				</div>
			</div>

			{/* 하단: 위치·마감일 + 버튼 */}
			<div className='mt-6 pt-5 border-t border-slate-50 space-y-4'>
				<div className='flex items-center justify-between text-xs text-slate-400 font-medium'>
					<div className='flex items-center gap-1.5'>
						<MapPin size={13} />
						{location}
					</div>
					<div className='flex items-center gap-1.5'>
						<Calendar size={13} />
						{deadline}
					</div>
				</div>
				<Button
					className='w-full py-3.5 font-black text-sm rounded-2xl shadow-none gap-2 group-hover:shadow-lg group-hover:shadow-hs-yellow/20 transition-shadow'
					onClick={() => onApply?.(id)}
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
