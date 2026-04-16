import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Sparkles, Building2 } from 'lucide-react'
import { JobFilterBar } from '@/components/job/JobFilterBar'
import { PublicJobCard } from '@/components/job/PublicJobCard'

const CATEGORIES = [
	{ id: 'all', label: '전체' },
	{ id: 'frontend', label: '프론트엔드' },
	{ id: 'backend', label: '백엔드' },
	{ id: 'design', label: '디자인' },
	{ id: 'pm', label: '기획/PM' },
	{ id: 'data', label: '데이터' },
]

const MOCK_JOBS = [
	{
		id: '1',
		companyName: '하이어스코프',
		title: '시니어 프론트엔드 개발자 (React)',
		location: '서울 강남구',
		category: 'frontend',
		tags: ['React', 'TypeScript', 'Next.js'],
		deadline: '2024.05.30',
		isNew: true,
	},
	{
		id: '2',
		companyName: '테크이노베이터',
		title: '백엔드 엔지니어 (Python/FastAPI)',
		location: '서울 서초구',
		category: 'backend',
		tags: ['Python', 'FastAPI', 'PostgreSQL'],
		deadline: '상시 채용',
		isNew: false,
	},
	{
		id: '3',
		companyName: '디자인랩',
		title: '프로덕트 디자이너',
		location: '서울 성동구',
		category: 'design',
		tags: ['Figma', 'Prototyping', 'UI/UX'],
		deadline: '2024.05.15',
		isNew: true,
	},
	{
		id: '4',
		companyName: '데이터마인드',
		title: '데이터 사이언티스트',
		location: '서울 송파구',
		category: 'data',
		tags: ['Python', 'PyTorch', 'MLOps'],
		deadline: '2024.06.10',
		isNew: false,
	},
	{
		id: '5',
		companyName: '플랜잇',
		title: '서비스 기획자 (PM)',
		location: '판교역 인근',
		category: 'pm',
		tags: ['Jira', 'Confluence', 'Agile'],
		deadline: '2024.05.20',
		isNew: false,
	},
]

export default function JobListPage() {
	const navigate = useNavigate()
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')

	const handleApply = (id: string) => {
		navigate(`/analysis/result/${id}`)
	}

	const filteredJobs = MOCK_JOBS.filter(job => {
		const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
		const matchesSearch =
			job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
		return matchesCategory && matchesSearch
	})

	return (
		<div className='w-full max-w-7xl mx-auto pb-24'>
			{/* 히어로 섹션 */}
			<div className='relative overflow-hidden rounded-[40px] bg-hs-deep-green mx-6 mt-8 px-10 py-14 mb-12'>
				{/* 배경 장식 */}
				<div className='absolute top-0 right-0 w-96 h-96 bg-hs-yellow/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none' />
				<div className='absolute bottom-0 left-20 w-64 h-64 bg-white/3 rounded-full translate-y-1/2 pointer-events-none' />

				<div className='relative z-10'>
					<div className='inline-flex items-center gap-2 bg-hs-yellow/15 text-hs-yellow text-sm font-bold px-4 py-2 rounded-full mb-5'>
						<Sparkles size={14} />
						AI 기반 채용 매칭
					</div>
					<h1 className='text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-3'>
						나에게 딱 맞는 <span className='text-hs-yellow'>커리어</span>를 찾아보세요
					</h1>
					<p className='text-white/50 text-base font-medium'>AI 분석으로 합격 확률이 높은 공고를 추천해 드립니다.</p>
				</div>
			</div>

			<div className='px-6'>
				{/* 검색 및 필터 */}
				<JobFilterBar
					categories={CATEGORIES}
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
				/>

				{/* 결과 카운트 */}
				<div className='flex items-center justify-between mb-8'>
					<p className='text-slate-500 font-medium'>
						<span className='text-hs-deep-green font-black text-lg'>{filteredJobs.length}</span>개의 공고
					</p>
					{(searchQuery || selectedCategory !== 'all') && (
						<button
							onClick={() => {
								setSearchQuery('')
								setSelectedCategory('all')
							}}
							className='text-sm text-slate-400 font-bold hover:text-hs-deep-green transition-colors underline underline-offset-4'
						>
							필터 초기화
						</button>
					)}
				</div>

				{/* 공고 그리드 */}
				{filteredJobs.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredJobs.map(job => (
							<PublicJobCard key={job.id} {...job} onApply={handleApply} />
						))}
					</div>
				) : (
					<div className='text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-hs-yellow/10'>
						<div className='w-16 h-16 bg-hs-cream rounded-3xl flex items-center justify-center mx-auto mb-4'>
							<Building2 size={28} className='text-hs-deep-green/30' />
						</div>
						<p className='text-xl font-black text-slate-300'>검색 결과가 없습니다</p>
						<p className='text-slate-400 font-medium mt-1 text-sm'>다른 키워드나 카테고리로 시도해보세요</p>
						<button
							onClick={() => {
								setSearchQuery('')
								setSelectedCategory('all')
							}}
							className='mt-6 px-6 py-3 bg-hs-deep-green text-white font-bold rounded-full text-sm hover:bg-hs-deep-green/90 transition-colors'
						>
							전체 공고 보기
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
