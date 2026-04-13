interface FilterBarProps {
	status: 'all' | '검토중' | '서류 통과' | '면접 예정' | '탈락'
	scoreBand: 'all' | '90+' | '80-89' | 'under-80'
	keyword: string
	onStatusChange: (status: FilterBarProps['status']) => void
	onScoreBandChange: (scoreBand: FilterBarProps['scoreBand']) => void
	onKeywordChange: (keyword: string) => void
}

export const FilterBar = ({ status, scoreBand, keyword, onStatusChange, onScoreBandChange, onKeywordChange }: FilterBarProps) => {
	return (
		<div className='grid w-full grid-cols-3 gap-3 rounded-xl border border-hs-cream bg-white p-4'>
			<div>
				<label htmlFor='status-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
					상태 필터
				</label>
				<select
					id='status-filter'
					value={status}
					onChange={event => onStatusChange(event.target.value as FilterBarProps['status'])}
					className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-black shadow-sm outline-none transition focus:border-hs-yellow focus:ring-2 focus:ring-hs-yellow/40'
				>
					<option value='all'>전체 상태</option>
					<option value='검토중'>검토중</option>
					<option value='서류 통과'>서류 통과</option>
					<option value='면접 예정'>면접 예정</option>
					<option value='탈락'>탈락</option>
				</select>
			</div>
			<div>
				<label htmlFor='score-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
					점수 구간
				</label>
				<select
					id='score-filter'
					value={scoreBand}
					onChange={event => onScoreBandChange(event.target.value as FilterBarProps['scoreBand'])}
					className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-black shadow-sm outline-none transition focus:border-hs-yellow focus:ring-2 focus:ring-hs-yellow/40'
				>
					<option value='all'>전체 점수</option>
					<option value='90+'>90점 이상</option>
					<option value='80-89'>80-89점</option>
					<option value='under-80'>80점 미만</option>
				</select>
			</div>
			<div>
				<label htmlFor='keyword-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
					이름 검색
				</label>
				<input
					id='keyword-filter'
					value={keyword}
					onChange={event => onKeywordChange(event.target.value)}
					placeholder='지원자 이름 입력'
					className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-black shadow-sm outline-none transition placeholder:text-black/50 focus:border-hs-yellow focus:ring-2 focus:ring-hs-yellow/40'
				/>
			</div>
		</div>
	)
}
