import { Link } from 'react-router'
import { Button } from '../../common/Button'
import { Input } from '../../common/Input'
import { Select } from '../../common/Select'
import { Textarea } from '../../common/Textarea'

const EMPLOYMENT_OPTIONS = [
	{ value: 'full-time', label: '정규직' },
	{ value: 'contract', label: '계약직' },
	{ value: 'intern', label: '인턴' },
]

const EXPERIENCE_OPTIONS = [
	{ value: 'junior', label: '주니어(1~3년)' },
	{ value: 'mid', label: '미들(4~7년)' },
	{ value: 'senior', label: '시니어(8년 이상)' },
]

export const JDForm = () => {
	return (
		<form className='space-y-5'>
			<div className='grid grid-cols-2 gap-4'>
				<Input id='job-title' label='직무명' placeholder='예: 프론트엔드 개발자' />
				<Select
					id='employment-type'
					label='고용 형태'
					placeholder='고용 형태를 선택하세요'
					options={EMPLOYMENT_OPTIONS}
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<Select
					id='experience-level'
					label='경력 레벨'
					placeholder='경력 레벨을 선택하세요'
					options={EXPERIENCE_OPTIONS}
				/>
				<Input id='hiring-count' label='채용 인원' type='number' placeholder='예: 2' min={1} />
			</div>

			<Textarea id='jd' label='JD 내용' placeholder='주요 업무, 자격 요건, 우대 사항을 입력하세요.' />

			<Textarea
				id='screening-criteria'
				label='핵심 평가 기준'
				placeholder='예: 문제 해결력, 협업 커뮤니케이션, React 실무 경험'
			/>

			<div className='space-y-3 rounded-lg border border-hs-cream bg-hs-cream/30 p-4'>
				<h4 className='text-sm font-semibold text-hs-deep-green'>5대 평가 기준 가중치 설정(%)</h4>
				<div className='grid grid-cols-5 gap-3'>
					<Input id='weight-fit' label='직무 적합도' type='number' min={0} max={100} defaultValue={30} />
					<Input id='weight-career' label='경력 일관성' type='number' min={0} max={100} defaultValue={20} />
					<Input id='weight-stack' label='기술 스택 매칭' type='number' min={0} max={100} defaultValue={25} />
					<Input id='weight-achievement' label='정량적 성과' type='number' min={0} max={100} defaultValue={15} />
					<Input id='weight-doc' label='문서 품질' type='number' min={0} max={100} defaultValue={10} />
				</div>
			</div>

			<div className='flex items-center justify-between gap-2'>
				<Link to='/company-main' className='text-sm font-medium text-hs-deep-green'>
					이전 단계
				</Link>
				<div className='flex items-center gap-2'>
					<Button variant='secondary'>임시 저장</Button>
					<Button>JD 저장</Button>
				</div>
			</div>
		</form>
	)
}
