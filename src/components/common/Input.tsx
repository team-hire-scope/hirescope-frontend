import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

export const Input = ({ className, label, error, id, ...props }: InputProps) => {
	return (
		<div className='flex w-full flex-col gap-1.5'>
			{label && (
				<label htmlFor={id} className='text-sm font-medium text-hs-deep-green'>
					{label}
				</label>
			)}
			<input
				id={id}
				className={cn(
					'h-10 w-full rounded-md border border-hs-yellow bg-white px-3 text-sm text-black shadow-sm outline-none transition placeholder:text-black/50 focus:ring-2 focus:ring-hs-yellow/40',
					error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
					className
				)}
				{...props}
			/>
			{error && <p className='text-xs text-black'>{error}</p>}
		</div>
	)
}
