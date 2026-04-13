import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string
	error?: string
}

export const Select = ({ className, label, error, id, children, ...props }: SelectProps) => {
	return (
		<div className='flex w-full flex-col gap-1.5'>
			{label && (
				<label htmlFor={id} className='text-sm font-medium text-slate-700'>
					{label}
				</label>
			)}
			<select
				id={id}
				className={cn(
					'h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
					error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
					className
				)}
				{...props}
			>
				{children}
			</select>
			{error && <p className='text-xs text-rose-600'>{error}</p>}
		</div>
	)
}
