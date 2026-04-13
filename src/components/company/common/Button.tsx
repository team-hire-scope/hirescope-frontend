import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: 'bg-hs-yellow text-hs-deep-green hover:bg-hs-yellow/90 focus-visible:ring-hs-yellow',
	secondary: 'border border-hs-green bg-white text-hs-deep-green hover:bg-hs-cream focus-visible:ring-hs-green',
	ghost: 'bg-transparent text-hs-deep-green hover:bg-hs-cream focus-visible:ring-hs-green',
	danger: 'bg-rose-600 text-black hover:bg-rose-700 focus-visible:ring-rose-500',
}

const sizeStyles: Record<ButtonSize, string> = {
	sm: 'h-8 px-3 text-sm',
	md: 'h-10 px-4 text-sm',
	lg: 'h-11 px-5 text-base',
}

export const Button = ({ className, variant = 'primary', size = 'md', type = 'button', ...props }: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(
				'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				variantStyles[variant],
				sizeStyles[size],
				className
			)}
			{...props}
		/>
	)
}
