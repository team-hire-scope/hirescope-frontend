import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string
	error?: string
}

export const Select = ({ className, label, error, id, children, ...props }: SelectProps) => {
	return (
		<div className='flex w-full flex-col gap-1.5'>
			{label && (
				<label htmlFor={id} className='text-sm font-medium text-hs-deep-green'>
					{label}
				</label>
			)}
			<select
				id={id}
				className={cn(
					'h-10 w-full rounded-md border border-hs-yellow bg-white px-3 text-sm text-black shadow-sm outline-none transition focus:ring-2 focus:ring-hs-yellow/40',
					error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
					className
				)}
				{...props}
			>
				{children}
			</select>
			{error && <p className='text-xs text-black'>{error}</p>}
		</div>
	)
}
