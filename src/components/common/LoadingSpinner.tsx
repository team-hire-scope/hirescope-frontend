import { Sparkles } from 'lucide-react'

interface LoadingSpinnerProps {
	message?: string
}

export const LoadingSpinner = ({ message = 'AI가 이력서와 공고를 분석하고 있습니다...' }: LoadingSpinnerProps) => {
	return (
		<div className='flex min-h-[60vh] flex-col items-center justify-center space-y-8'>
			<div className='relative'>
				{/* 메인 회전 링 */}
				<div className='h-24 w-24 animate-spin rounded-full border-4 border-hs-yellow/20 border-t-hs-yellow' />

				{/* 중앙 아이콘 (반짝이는 효과) */}
				<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
					<Sparkles size={32} className='animate-pulse text-hs-yellow' />
				</div>
			</div>

			<div className='text-center space-y-3'>
				<h2 className='text-2xl font-black text-hs-deep-green tracking-tight animate-bounce'>분석 중</h2>
				<p className='text-slate-400 font-medium'>{message}</p>
				<p className='text-xs text-slate-300'>잠시만 기다려주세요. 약 5~10초 정도 소요될 수 있습니다.</p>
			</div>
		</div>
	)
}
