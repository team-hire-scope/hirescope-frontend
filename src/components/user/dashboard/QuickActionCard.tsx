import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'

interface QuickActionCardProps {
	title: string
	description: string
	icon: ReactNode
	iconBgColor?: string
	iconColor?: string
	children: ReactNode
	className?: string
}

export const QuickActionCard = ({
	title,
	description,
	icon,
	iconBgColor = 'bg-hs-yellow/20',
	iconColor = 'text-hs-yellow',
	children,
	className,
}: QuickActionCardProps) => {
	return (
		<ResumeSectionCard title={title} className={cn('flex flex-col h-full', className)}>
			<div className='flex-1 mb-6'>
				<div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-4', iconBgColor, iconColor)}>
					{icon}
				</div>
				<p className='text-sm leading-relaxed opacity-70'>{description}</p>
			</div>
			{children}
		</ResumeSectionCard>
	)
}
