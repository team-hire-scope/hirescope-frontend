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
		<div className='sticky top-0 z-30 bg-[#faf9f6]/80 backdrop-blur-md py-6 px-3'>
			<div className='flex flex-col md:flex-row gap-6 items-center justify-between'>
				{/* 직무 필터 탭 */}
				<div className='flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full md:w-auto'>
					{categories.map(category => (
						<button
							key={category.id}
							onClick={() => onSelectCategory(category.id)}
							className={cn(
								'px-6 py-3 rounded-full text-[15px] font-bold transition-all whitespace-nowrap border border-transparent',
								selectedCategory === category.id
									? 'bg-hs-deep-green text-white shadow-lg shadow-hs-deep-green/20'
									: 'bg-white text-slate-400 hover:text-hs-deep-green hover:border-hs-yellow/20'
							)}
						>
							{category.label}
						</button>
					))}
				</div>

				{/* 검색창 */}
				<div className='relative w-full md:w-80 lg:w-96'>
					<Search className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
					<input
						type='text'
						placeholder='회사명이나 직무를 검색해보세요'
						value={searchQuery}
						onChange={e => onSearchChange(e.target.value)}
						className='w-full pl-12 pr-6 py-3.5 bg-white rounded-full border border-hs-yellow/10 outline-none focus:border-hs-yellow/40 focus:ring-4 focus:ring-hs-yellow/5 transition-all text-sm font-medium shadow-sm'
					/>
				</div>
			</div>
		</div>
	)
}
