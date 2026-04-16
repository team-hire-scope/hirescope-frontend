import type { ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Button } from './Button'

interface ConfirmDialogProps {
	open: boolean
	title: string
	description: ReactNode
	confirmLabel?: string
	cancelLabel?: string
	confirmVariant?: 'primary' | 'secondary' | 'danger'
	icon?: ReactNode
	onConfirm: () => void
	onCancel?: () => void
}

export const ConfirmDialog = ({
	open,
	title,
	description,
	confirmLabel = '확인',
	cancelLabel = '취소',
	confirmVariant = 'danger',
	icon,
	onConfirm,
	onCancel,
}: ConfirmDialogProps) => {
	if (!open) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
			<div className='bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl'>
				<div className='w-12 h-12 bg-hs-yellow/15 rounded-2xl flex items-center justify-center mb-4'>
					{icon ?? <TriangleAlert size={22} className='text-hs-yellow' />}
				</div>
				<h3 className='text-lg font-black text-hs-deep-green mb-2'>{title}</h3>
				<p className='text-sm text-slate-500 leading-relaxed mb-6'>{description}</p>
				<div className='flex gap-3'>
					{onCancel && (
						<Button variant='secondary' className='flex-1 py-3' onClick={onCancel}>
							{cancelLabel}
						</Button>
					)}
					<Button variant={confirmVariant} className='flex-1 py-3' onClick={onConfirm}>
						{confirmLabel}
					</Button>
				</div>
			</div>
		</div>
	)
}
