import { Link } from 'react-router'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Select } from '../../../components/common/Select'

const INDUSTRY_OPTIONS = [
	{ value: 'it', label: 'IT/소프트웨어' },
	{ value: 'finance', label: '금융/핀테크' },
	{ value: 'manufacturing', label: '제조업' },
	{ value: 'other', label: '기타' },
]

const CompanySettingsPage = () => {
	return (
		<section className='w-full space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>기업 정보 설정</h2>
				<p className='mt-1 text-sm text-black'>회사 정보와 산업군을 입력해 기본 프로필을 완성하세요.</p>
			</div>
			<div className='w-full rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<form className='space-y-4'>
					<Input id='company-name' label='회사명' placeholder='주식회사 하이어스코프' />
					<Input id='company-logo' label='로고 URL' placeholder='https://example.com/logo.png' />
					<Select id='industry' label='산업군' placeholder='산업군을 선택하세요' options={INDUSTRY_OPTIONS} />
					<div className='flex items-center justify-between'>
						<Link to='/auth' className='text-sm font-medium text-hs-deep-green'>
							이전 단계
						</Link>
						<div className='flex items-center gap-2'>
							<Button variant='secondary'>저장</Button>
							<Link to='/jobs/create'>
								<Button>다음 단계</Button>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</section>
	)
}

export default CompanySettingsPage
