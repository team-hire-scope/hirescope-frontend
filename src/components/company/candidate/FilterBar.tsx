import { Input } from '../../common/Input'
import { Select } from '../../common/Select'

interface FilterBarProps {
	status: 'all' | '검토중' | '서류 통과' | '면접 예정' | '탈락'
	scoreBand: 'all' | '90+' | '80-89' | 'under-80'
	keyword: string
	onStatusChange: (status: FilterBarProps['status']) => void
	onScoreBandChange: (scoreBand: FilterBarProps['scoreBand']) => void
	onKeywordChange: (keyword: string) => void
}

export const FilterBar = ({ status, scoreBand, keyword, onStatusChange, onScoreBandChange, onKeywordChange }: FilterBarProps) => {
	const statusOptions = [
		{ value: 'all', label: '전체 상태' },
		{ value: '검토중', label: '검토중' },
		{ value: '서류 통과', label: '서류 통과' },
		{ value: '면접 예정', label: '면접 예정' },
		{ value: '탈락', label: '탈락' },
	]

	const scoreBandOptions = [
		{ value: 'all', label: '전체 점수' },
		{ value: '90+', label: '90점 이상' },
		{ value: '80-89', label: '80-89점' },
		{ value: 'under-80', label: '80점 미만' },
	]

	return (
		<div className='grid w-full grid-cols-3 gap-3 rounded-xl border border-hs-cream bg-white p-4'>
			<div>
				<label htmlFor='status-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
					상태 필터
				</label>
				<Select
					id='status-filter'
					value={status}
					options={statusOptions}
					onChange={val => onStatusChange(val as FilterBarProps['status'])}
				/>
			</div>
			<div>
				<label htmlFor='score-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
					점수 구간
				</label>
				<Select
					id='score-filter'
					value={scoreBand}
					options={scoreBandOptions}
					onChange={val => onScoreBandChange(val as FilterBarProps['scoreBand'])}
				/>
			</div>
			<div>
				<label htmlFor='keyword-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
					이름 검색
				</label>
				<Input
					id='keyword-filter'
					value={keyword}
					onChange={event => onKeywordChange(event.target.value)}
					placeholder='지원자 이름 입력'
				/>
			</div>
		</div>
	)
}
