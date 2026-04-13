import { Button } from '../../../components/company/common/Button'
import { Input } from '../../../components/company/common/Input'
import { Select } from '../../../components/company/common/Select'

const JobCreatePage = () => {
	return (
		<section className='space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-slate-900'>직무 공고 등록</h2>
				<p className='mt-1 text-sm text-slate-600'>채용 공고와 JD를 등록해 AI 분석을 준비합니다.</p>
			</div>
			<div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
				<form className='space-y-4'>
					<Input id='job-title' label='직무명' placeholder='예: 프론트엔드 개발자' />
					<Select id='employment-type' label='고용 형태' defaultValue=''>
						<option value='' disabled>
							고용 형태를 선택하세요
						</option>
						<option value='full-time'>정규직</option>
						<option value='contract'>계약직</option>
						<option value='intern'>인턴</option>
					</Select>
					<div className='space-y-1.5'>
						<label htmlFor='jd' className='text-sm font-medium text-slate-700'>
							JD 내용
						</label>
						<textarea
							id='jd'
							rows={8}
							className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
							placeholder='주요 업무, 자격 요건, 우대 사항을 입력하세요.'
						/>
					</div>
					<Button>JD 저장</Button>
				</form>
			</div>
		</section>
	)
}

export default JobCreatePage
