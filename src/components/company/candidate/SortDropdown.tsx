interface SortDropdownProps {
	value: 'score-desc' | 'score-asc' | 'latest'
	onChange: (value: 'score-desc' | 'score-asc' | 'latest') => void
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
	return (
		<div className='min-w-44'>
			<label htmlFor='candidate-sort' className='mb-1 block text-sm font-medium text-hs-deep-green'>
				정렬
			</label>
			<select
				id='candidate-sort'
				value={value}
				onChange={event => onChange(event.target.value as SortDropdownProps['value'])}
				className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-black shadow-sm outline-none transition focus:border-hs-yellow focus:ring-2 focus:ring-hs-yellow/40'
			>
				<option value='score-desc'>점수 높은 순</option>
				<option value='score-asc'>점수 낮은 순</option>
				<option value='latest'>최신 지원 순</option>
			</select>
		</div>
	)
}
