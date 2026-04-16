import { Select } from '../../common/Select'

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
			<Select
				id='candidate-sort'
				value={value}
				options={[
					{ value: 'score-desc', label: '점수 높은 순' },
					{ value: 'score-asc', label: '점수 낮은 순' },
					{ value: 'latest', label: '최신 지원 순' },
				]}
				onChange={val => onChange(val as SortDropdownProps['value'])}
			/>
		</div>
	)
}
