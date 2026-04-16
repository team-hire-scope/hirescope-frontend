import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface Category {
	id: string
	label: string
}

interface JobFilterBarProps {
	categories: Category[]
	selectedCategory: string
	onSelectCategory: (id: string) => void
	searchQuery: string
	onSearchChange: (query: string) => void
}

export const JobFilterBar = ({
	categories,
	selectedCategory,
	onSelectCategory,
	searchQuery,
	onSearchChange,
}: JobFilterBarProps) => {
	return (
		<div className='sticky top-0 z-30 bg-[#faf9f6]/90 backdrop-blur-xl py-5 -mx-6 px-6 mb-8 border-b border-slate-100/80'>
			<div className='flex flex-col gap-4'>
				{/* 검색창 */}
				<div className='relative'>
					<Search className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-400' size={17} />
					<input
						type='text'
						placeholder='회사명이나 직무를 검색해보세요'
						value={searchQuery}
						onChange={e => onSearchChange(e.target.value)}
						className='w-full pl-12 pr-11 py-4 bg-white rounded-2xl border border-slate-200 outline-none focus:border-hs-yellow/60 focus:ring-4 focus:ring-hs-yellow/8 transition-all text-sm font-medium shadow-sm placeholder:text-slate-300'
					/>
					{searchQuery && (
						<button
							onClick={() => onSearchChange('')}
							className='absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors'
						>
							<X size={13} className='text-slate-500' />
						</button>
					)}
				</div>

				{/* 카테고리 탭 */}
				<div className='flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar'>
					{categories.map(category => (
						<button
							key={category.id}
							onClick={() => onSelectCategory(category.id)}
							className={cn(
								'px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap',
								selectedCategory === category.id
									? 'bg-hs-deep-green text-white shadow-lg shadow-hs-deep-green/25'
									: 'bg-white text-slate-400 border border-slate-200 hover:border-hs-yellow/40 hover:text-hs-deep-green'
							)}
						>
							{category.label}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
