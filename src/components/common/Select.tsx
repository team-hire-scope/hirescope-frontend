import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SelectOption {
	value: string
	label: string
}

interface SelectProps {
	id?: string
	label?: string
	error?: string
	options: SelectOption[]
	value?: string
	onChange?: (value: string) => void
	placeholder?: string
	className?: string
}

export const Select = ({ label, error, options, value, onChange, placeholder = '선택해주세요', className }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	// 현재 선택된 옵션 찾기
	const selectedOption = options.find(opt => opt.value === value)

	// 외부 클릭 시 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleOptionClick = (val: string) => {
		onChange?.(val)
		setIsOpen(false)
	}

	return (
		<div className={cn('flex w-full flex-col gap-2.5', className)} ref={containerRef}>
			{label && <label className='text-base font-bold text-hs-deep-green ml-1 uppercase tracking-tight'>{label}</label>}

			<div className='relative'>
				{/* 드롭다운 트리거 버튼 */}
				<button
					type='button'
					onClick={() => setIsOpen(!isOpen)}
					className={cn(
						'flex h-12 w-full items-center justify-between rounded-xl border border-hs-yellow/40 bg-white px-5 text-base text-black shadow-sm outline-none transition-all hover:border-hs-yellow focus:border-hs-yellow focus:ring-4 focus:ring-hs-yellow/10',
						isOpen && 'border-hs-yellow ring-4 ring-hs-yellow/10',
						error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
					)}
				>
					<span className={cn('truncate', !selectedOption && 'text-slate-300')}>
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<ChevronDown
						size={20}
						className={cn(
							'text-hs-deep-green/40 transition-transform duration-300',
							isOpen && 'rotate-180 text-hs-deep-green'
						)}
					/>
				</button>

				{/* 커스텀 옵션 리스트 */}
				{isOpen && (
					<div className='absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-hs-yellow/20 bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-200'>
						<div className='max-h-60 overflow-y-auto space-y-1 custom-scrollbar'>
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
			{error && <p className='ml-1 text-sm font-medium text-rose-500'>{error}</p>}
		</div>
	)
}
