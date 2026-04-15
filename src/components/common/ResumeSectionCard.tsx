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
		<section className={cn('rounded-lg border border-hs-yellow bg-white p-6 shadow-sm', className)}>
			<div className='mb-4 flex items-center justify-between border-b border-hs-yellow/30 pb-3'>
				<h3 className='text-lg font-bold text-hs-deep-green'>{title}</h3>
				{onAdd && (
					<button
						type='button'
						onClick={onAdd}
						className='text-sm font-semibold text-hs-green hover:text-hs-deep-green transition-colors'
					>
						+ {addLabel}
					</button>
				)}
			</div>
			<div className='space-y-4'>{children}</div>
		</section>
	)
}
