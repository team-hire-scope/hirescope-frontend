import { Search } from 'lucide-react'
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
		<div className='sticky top-20 z-30 bg-[#faf9f6]/80 backdrop-blur-md py-6 space-y-6'>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
				{/* 직무 필터 탭 */}
				<div className='flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto'>
					{categories.map(category => (
						<button
							key={category.id}
							onClick={() => onSelectCategory(category.id)}
							className={cn(
								'px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap',
								selectedCategory === category.id
									? 'bg-hs-deep-green text-white shadow-lg shadow-hs-deep-green/20'
									: 'bg-white text-slate-400 hover:text-hs-deep-green hover:bg-hs-cream/40'
							)}
						>
							{category.label}
						</button>
					))}
				</div>

				{/* 검색창 */}
				<div className='relative w-full md:w-96'>
					<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
					<input
						type='text'
						placeholder='회사명이나 직무를 검색해보세요'
						value={searchQuery}
						onChange={e => onSearchChange(e.target.value)}
						className='w-full pl-11 pr-4 py-3 bg-white rounded-full border border-hs-yellow/20 outline-none focus:ring-4 focus:ring-hs-yellow/10 transition-all text-sm font-medium'
					/>
				</div>
			</div>
		</div>
	)
}
