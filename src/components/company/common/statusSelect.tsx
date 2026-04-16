import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/utils/cn'

export type StatusSelectValue = '검토중' | '서류 통과' | '면접 예정' | '탈락'

interface StatusOption {
	value: StatusSelectValue
	label: string
}

interface StatusSelectProps {
	value?: StatusSelectValue
	onChange?: (value: StatusSelectValue) => void
	options: StatusOption[]
	className?: string
}

const triggerVariantStyles: Record<StatusSelectValue, string> = {
	검토중: 'bg-hs-cream text-hs-deep-green',
	'서류 통과': 'bg-hs-green/20 text-hs-deep-green',
	'면접 예정': 'bg-hs-yellow text-hs-deep-green',
	탈락: 'bg-rose-100 text-black',
}

export const StatusSelect = ({ options, value, onChange, className }: StatusSelectProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const selectedOption = options.find(opt => opt.value === value)
	const selectedValue = selectedOption?.value ?? options[0]?.value

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleOptionClick = (nextValue: StatusSelectValue) => {
		onChange?.(nextValue)
		setIsOpen(false)
	}

	return (
		<div className={cn('relative inline-flex', className)} ref={containerRef}>
			<button type='button' onClick={() => setIsOpen(!isOpen)} className='inline-flex items-center'>
				<span
					className={cn(
						'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
						selectedValue ? triggerVariantStyles[selectedValue] : 'bg-hs-cream text-hs-deep-green'
					)}
				>
					<span>{selectedOption?.label ?? '선택해주세요'}</span>
					<ChevronDown size={14} className={cn('transition-transform duration-300', isOpen && 'rotate-180')} />
				</span>
			</button>

			{isOpen && (
				<div className='absolute left-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-2xl border border-hs-yellow/20 bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-200'>
					<div className='max-h-60 overflow-y-auto space-y-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
						{options.map(opt => (
							<button
								key={opt.value}
								type='button'
								onClick={() => handleOptionClick(opt.value)}
								className={cn(
									'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-bold transition-all',
									opt.value === value
										? 'bg-hs-cream text-hs-deep-green'
										: 'text-slate-600 hover:bg-hs-cream/40 hover:text-hs-deep-green'
								)}
							>
								{opt.label}
								{opt.value === value && <Check size={18} className='text-hs-deep-green' />}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
