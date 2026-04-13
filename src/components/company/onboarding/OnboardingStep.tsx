interface OnboardingStepProps {
	currentStep: 1 | 2 | 3
}

const steps = [
	{ id: 1, title: '회사 로그인' },
	{ id: 2, title: '기업 정보 설정' },
	{ id: 3, title: '직무 공고 등록' },
] as const

export const OnboardingStep = ({ currentStep }: OnboardingStepProps) => {
	return (
		<div className='w-full rounded-lg border border-hs-cream bg-white p-4'>
			<div className='grid grid-cols-3 gap-2'>
				{steps.map(step => {
					const isActive = step.id === currentStep
					const isDone = step.id < currentStep

					return (
						<div
							key={step.id}
							className={`rounded-md border px-3 py-2 text-sm font-medium ${
								isActive
									? 'border-hs-yellow bg-hs-yellow text-hs-deep-green'
									: isDone
										? 'border-hs-green bg-hs-cream text-hs-deep-green'
										: 'border-hs-cream bg-white text-black'
							}`}
						>
							{step.id}. {step.title}
						</div>
					)
				})}
			</div>
		</div>
	)
}
