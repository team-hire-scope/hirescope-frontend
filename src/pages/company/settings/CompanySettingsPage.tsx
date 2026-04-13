import { Button } from '../../../components/company/common/Button'
import { Input } from '../../../components/company/common/Input'
import { Select } from '../../../components/company/common/Select'

const CompanySettingsPage = () => {
	return (
		<section className='w-full space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-slate-900'>기업 정보 설정</h2>
				<p className='mt-1 text-sm text-slate-600'>회사 정보와 산업군을 입력해 기본 프로필을 완성하세요.</p>
			</div>
			<div className='w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
				<form className='space-y-4'>
					<Input id='company-name' label='회사명' placeholder='주식회사 하이어스코프' />
					<Input id='company-logo' label='로고 URL' placeholder='https://example.com/logo.png' />
					<Select id='industry' label='산업군' defaultValue=''>
						<option value='' disabled>
							산업군을 선택하세요
						</option>
						<option value='it'>IT/소프트웨어</option>
						<option value='finance'>금융/핀테크</option>
						<option value='manufacturing'>제조업</option>
						<option value='other'>기타</option>
					</Select>
					<Button>저장</Button>
				</form>
			</div>
		</section>
	)
}

export default CompanySettingsPage
