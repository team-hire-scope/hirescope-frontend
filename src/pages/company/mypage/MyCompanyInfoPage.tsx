import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Select } from '../../../components/common/Select'

const INDUSTRY_OPTIONS = [
	{ value: 'it', label: 'IT/소프트웨어' },
	{ value: 'finance', label: '금융/핀테크' },
	{ value: 'manufacturing', label: '제조업' },
	{ value: 'other', label: '기타' },
]

const MyCompanyInfoPage = () => {
	return (
		<section className='space-y-4'>
			<div>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>회사 정보 관리</h2>
				<p className='mt-1 text-sm text-black'>마이페이지에서 우리 회사 프로필 정보를 직접 수정할 수 있습니다.</p>
			</div>
			<div className='rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<form className='space-y-4'>
					<Input id='mypage-company-name' label='회사명' defaultValue='하이어스코프' />
					<Input id='mypage-company-logo' label='로고 URL' placeholder='https://example.com/logo.png' />
					<Select id='mypage-industry' label='산업군' value='it' options={INDUSTRY_OPTIONS} />
					<div className='flex justify-end'>
						<Button>저장</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default MyCompanyInfoPage
