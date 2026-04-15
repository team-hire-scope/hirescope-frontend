import { cn } from '@/utils/cn'

interface Option {
	value: string | number
	label: string
}

interface SegmentedControlProps {
	label?: string
	options: Option[]
	value: string | number
	onChange: (value: string | number) => void
	className?: string
}

export const SegmentedControl = ({ label, options, value, onChange, className }: SegmentedControlProps) => {
	return (
		<div className={cn('flex flex-col gap-2.5', className)}>
			{label && <label className='text-base font-bold text-hs-deep-green ml-1 uppercase tracking-tight'>{label}</label>}
			<div className='flex h-12 w-full overflow-hidden rounded-xl border border-hs-yellow/40 bg-white p-1'>
				{options.map(option => {
					const isSelected = option.value === value
					return (
						<button
							key={option.value}
							type='button'
							onClick={() => onChange(option.value)}
							className={cn(
								'flex flex-1 items-center justify-center text-[15px] font-bold transition-all duration-200 rounded-lg',
								isSelected
									? 'bg-hs-yellow text-hs-deep-green shadow-sm'
									: 'text-slate-400 hover:text-hs-deep-green hover:bg-hs-cream/30'
							)}
						>
							{option.label}
						</button>
					)
				})}
			</div>
		</div>
	)
}
