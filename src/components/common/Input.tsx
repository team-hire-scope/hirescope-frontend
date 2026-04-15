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
				<label htmlFor={id} className='text-base font-bold text-hs-deep-green ml-1 uppercase tracking-tight'>
					{label}
				</label>
			)}
			<input
				id={id}
				className={cn(
					'h-12 w-full rounded-xl border border-hs-yellow/40 bg-white px-4 text-base text-black shadow-sm outline-none transition placeholder:text-slate-300 focus:border-hs-yellow focus:ring-4 focus:ring-hs-yellow/10',
					error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
					className
				)}
				{...props}
			/>
			{error && <p className='text-xs text-black'>{error}</p>}
		</div>
	)
}
