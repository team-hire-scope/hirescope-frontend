import { useEffect, useState } from 'react'
import { User, GraduationCap, Briefcase, Wrench, Rocket, FileCheck, Save, X, Lightbulb } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { cn } from '@/utils/cn'

const SECTIONS = [
	{ id: 'basic', label: '기본 정보', icon: User },
	{ id: 'education', label: '학력', icon: GraduationCap },
	{ id: 'career', label: '경력', icon: Briefcase },
	{ id: 'skills', label: '기술 스택', icon: Wrench },
	{ id: 'projects', label: '프로젝트', icon: Rocket },
	{ id: 'certifications', label: '자격증', icon: FileCheck },
]

interface ResumeSidebarProps {
	onCancel: () => void
	isPending?: boolean
}

export const ResumeSidebar = ({ onCancel, isPending = false }: ResumeSidebarProps) => {
	const [activeSection, setActiveSection] = useState('basic')

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: '-30% 0px -60% 0px',
			threshold: 0,
		}

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id)
				}
			})
		}

		const observer = new IntersectionObserver(observerCallback, observerOptions)
		SECTIONS.forEach(section => {
			const element = document.getElementById(section.id)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [])

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			const offset = 120
			const bodyRect = document.body.getBoundingClientRect().top
			const elementRect = element.getBoundingClientRect().top
			const elementPosition = elementRect - bodyRect
			const offsetPosition = elementPosition - offset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	}

	return (
		<aside className='lg:sticky lg:top-28 w-full lg:w-80 shrink-0'>
			<div className='rounded-3xl border border-hs-yellow/30 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
				<div className='mb-8 px-2 flex items-center justify-between'>
					<h2 className='text-sm font-black uppercase tracking-widest text-hs-deep-green opacity-60'>항목</h2>
					<div className='h-2.5 w-2.5 rounded-full bg-hs-green animate-pulse' />
				</div>

				<nav className='space-y-3'>
					{SECTIONS.map(section => {
						const Icon = section.icon
						return (
							<button
								key={section.id}
								type='button'
								onClick={() => scrollToSection(section.id)}
								className={cn(
									'group relative w-full flex items-center gap-4 px-5 py-4 text-[16px] rounded-2xl transition-all duration-300 font-extrabold',
									activeSection === section.id
										? 'bg-hs-cream text-hs-deep-green shadow-sm ring-1 ring-hs-yellow/20'
										: 'text-slate-400 hover:bg-hs-cream/30 hover:text-hs-deep-green'
								)}
							>
								{activeSection === section.id && (
									<div className='absolute left-0 h-1/2 w-2 rounded-r-full bg-hs-yellow' />
								)}
								<Icon
									size={20}
									className={cn(
										'transition-transform group-hover:scale-110',
										activeSection === section.id ? 'text-hs-deep-green opacity-100' : 'opacity-40'
									)}
								/>
								{section.label}
							</button>
						)
					})}
				</nav>

				<div className='mt-12 pt-8 border-t border-hs-yellow/10 flex flex-col gap-4'>
					<Button
						type='submit'
						form='resume-form'
						disabled={isPending}
						className='w-full py-7 text-lg font-black shadow-lg shadow-hs-yellow/20 gap-2'
					>
						<Save size={22} /> 저장하기
					</Button>
					<Button
						variant='secondary'
						onClick={onCancel}
						className='w-full border-none bg-hs-cream/50 text-slate-500 hover:bg-hs-cream gap-2 py-5'
					>
						<X size={20} /> 취소
					</Button>
				</div>
			</div>

			<div className='mt-8 p-6 bg-hs-deep-green text-white rounded-[32px] shadow-xl shadow-hs-deep-green/10'>
				<h4 className='text-[14px] font-bold mb-3 flex items-center gap-2'>
					<Lightbulb size={16} className='text-hs-yellow' /> AI 분석 Tip
				</h4>
				<p className='text-[12px] leading-relaxed opacity-80 font-medium'>
					최신순으로 경력을 작성하고 구체적인 수치를 활용해 정량적인 성과를 보여주세요.
				</p>
			</div>
		</aside>
	)
}
