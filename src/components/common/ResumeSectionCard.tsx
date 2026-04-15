import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ResumeSectionCardProps {
	title: string
	children: ReactNode
	className?: string
	onAdd?: () => void
	addLabel?: string
}

export const ResumeSectionCard = ({ title, children, className, onAdd, addLabel = '추가하기' }: ResumeSectionCardProps) => {
	return (
		<section
			className={cn(
				'group relative rounded-2xl border border-hs-yellow/20 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
				className
			)}
		>
			{/* 왼쪽 포인트 보더 */}
			<div className='absolute left-0 top-8 h-8 w-1.5 rounded-r-full bg-hs-yellow opacity-0 transition-opacity group-hover:opacity-100' />

			<div className='mb-8 flex items-end justify-between border-b border-hs-yellow/20 pb-5'>
				<div>
					<h3 className='text-2xl font-extrabold tracking-tight text-hs-deep-green'>{title}</h3>
					<div className='mt-1.5 h-1.5 w-10 rounded-full bg-hs-yellow/40' />
				</div>
				{onAdd && (
					<button
						type='button'
						onClick={onAdd}
						className='inline-flex items-center gap-1.5 rounded-full bg-hs-cream px-4 py-1.5 text-sm font-bold text-hs-deep-green transition-all hover:bg-hs-yellow hover:shadow-md'
					>
						<span className='text-lg'>+</span> {addLabel}
					</button>
				)}
			</div>
			<div className='space-y-6'>{children}</div>
		</section>
	)
}
