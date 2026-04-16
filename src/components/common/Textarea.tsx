import { type TextareaHTMLAttributes, forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { cn } from '@/utils/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, label, error, id, onChange, value, ...props }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null)

		// 텍스트 내용에 따라 높이 자동 조절
		const adjustHeight = () => {
			const textarea = textareaRef.current
			if (textarea) {
				textarea.style.height = 'auto'
				textarea.style.height = `${textarea.scrollHeight}px`
			}
		}

		// 외부에서 전달된 ref와 내부 ref 동기화
		useImperativeHandle(ref, () => textareaRef.current!)

		// 마운트 시와 value 변경 시 높이 조절
		useEffect(() => {
			adjustHeight()
		}, [value])

		return (
			<div className='flex w-full flex-col gap-2.5'>
				{label && (
					<label htmlFor={id} className='text-base font-bold text-hs-deep-green ml-1 uppercase tracking-tight'>
						{label}
					</label>
				)}
				<textarea
					id={id}
					ref={textareaRef}
					className={cn(
						'w-full resize-none rounded-[28px] border border-hs-yellow/40 bg-white p-7 text-base leading-relaxed text-black shadow-sm outline-none transition-all placeholder:text-slate-300 focus:border-hs-yellow focus:ring-4 focus:ring-hs-yellow/10 overflow-hidden',
						error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
						className
					)}
					value={value}
					onChange={e => {
						onChange?.(e)
						adjustHeight()
					}}
					{...props}
				/>
				{error && <p className='ml-1 text-sm font-medium text-rose-500'>{error}</p>}
			</div>
		)
	}
)

Textarea.displayName = 'Textarea'
