import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
	default: 'bg-slate-100 text-slate-700',
	success: 'bg-emerald-100 text-emerald-700',
	warning: 'bg-amber-100 text-amber-700',
	danger: 'bg-rose-100 text-rose-700',
	info: 'bg-blue-100 text-blue-700',
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
