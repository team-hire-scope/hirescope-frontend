import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
	default: 'bg-hs-cream text-hs-deep-green',
	success: 'bg-hs-green/20 text-hs-deep-green',
	warning: 'bg-hs-yellow text-hs-deep-green',
	danger: 'bg-rose-100 text-black',
	info: 'bg-hs-cream text-hs-deep-green',
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
				variantStyles[variant],
				className
			)}
			{...props}
		/>
	)
}
