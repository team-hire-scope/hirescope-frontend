import { Building2, MapPin, Calendar } from 'lucide-react'
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
	return (
		<div className='group bg-white rounded-[32px] p-8 border border-hs-yellow/10 transition-all hover:border-hs-yellow/40 hover:shadow-xl hover:shadow-hs-yellow/5 flex flex-col justify-between h-full'>
			<div className='space-y-5'>
				<div className='flex justify-between items-start'>
					<div className='flex items-center gap-2.5'>
						<div className='w-12 h-12 bg-hs-cream rounded-2xl flex items-center justify-center'>
							<Building2 className='text-hs-deep-green/40' size={24} />
						</div>
						<span className='font-bold text-hs-deep-green/60 text-sm'>{companyName}</span>
					</div>
					{isNew && (
						<Badge variant='success' className='px-3 py-1 rounded-lg'>
							NEW
						</Badge>
					)}
				</div>

				<h3 className='text-xl font-black text-hs-deep-green leading-snug'>{title}</h3>

				<div className='flex flex-wrap gap-2'>
					{tags.map(tag => (
						<Badge key={tag} className='bg-hs-cream/50 text-hs-deep-green/70 border-none px-3'>
							{tag}
						</Badge>
					))}
				</div>
			</div>

			<div className='mt-8 pt-6 border-t border-slate-50 space-y-4'>
				<div className='flex items-center justify-between text-sm text-slate-400 font-medium'>
					<div className='flex items-center gap-1.5'>
						<MapPin size={16} />
						{location}
					</div>
					<div className='flex items-center gap-1.5'>
						<Calendar size={16} />
						{deadline}
					</div>
				</div>
				<Button className='w-full rounded-2xl py-4 font-black text-base shadow-none' onClick={() => onApply?.(id)}>
					지원하기
				</Button>
			</div>
		</div>
	)
}
