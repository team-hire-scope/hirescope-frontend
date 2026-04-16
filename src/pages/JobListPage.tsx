import { useState } from 'react'
import { useNavigate } from 'react-router'
import { JobFilterBar } from '@/components/job/JobFilterBar'
import { PublicJobCard } from '@/components/job/PublicJobCard'

// 직무 카테고리 정의
const CATEGORIES = [
	{ id: 'all', label: '전체' },
	{ id: 'frontend', label: '프론트엔드' },
	{ id: 'backend', label: '백엔드' },
	{ id: 'design', label: '디자인' },
	{ id: 'pm', label: '기획/PM' },
	{ id: 'data', label: '데이터' },
]

// 샘플 공고 데이터
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

	// 지원하기 핸들러
	const handleApply = (id: string) => {
		// AI 분석 결과 페이지로 이동 (분석 프로세스 시뮬레이션 시작)
		navigate(`/analysis/result/${id}`)
	}

	// 필터링 로직
	const filteredJobs = MOCK_JOBS.filter(job => {
		const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
		const matchesSearch =
			job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
		return matchesCategory && matchesSearch
	})

	return (
		<div className='w-full max-w-7xl mx-auto space-y-12 pb-20'>
			{/* 상단 헤더 섹션 */}
			<div className='text-center space-y-4 pt-12'>
				<h1 className='text-4xl font-black text-hs-deep-green tracking-tight'>
					나에게 딱 맞는 <span className='text-hs-yellow underline underline-offset-8'>커리어</span>를 찾아보세요
				</h1>
				<p className='text-lg text-slate-500 font-medium'>
					하이어스코프의 AI 분석으로 합격 확률이 높은 공고를 추천해 드립니다.
				</p>
			</div>

			{/* 검색 및 필터 영역 */}
			<JobFilterBar
				categories={CATEGORIES}
				selectedCategory={selectedCategory}
				onSelectCategory={setSelectedCategory}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
			/>

			{/* 공고 리스트 영역 */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{filteredJobs.map(job => (
					<PublicJobCard key={job.id} {...job} onApply={handleApply} />
				))}
			</div>

			{/* 검색 결과 없을 때 */}
			{filteredJobs.length === 0 && (
				<div className='text-center py-40 bg-white rounded-[40px] border-2 border-dashed border-hs-yellow/10'>
					<p className='text-xl font-bold text-slate-300'>검색 결과와 일치하는 공고가 없습니다.</p>
					<button
						onClick={() => {
							setSearchQuery('')
							setSelectedCategory('all')
						}}
						className='mt-4 text-hs-yellow font-bold underline underline-offset-4'
					>
						필터 초기화하기
					</button>
				</div>
			)}
		</div>
	)
}
