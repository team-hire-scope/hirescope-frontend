import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router'
import type { Resume } from '@/types/resume'

export const useResumeForm = () => {
	const navigate = useNavigate()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Resume>({
		defaultValues: {
			title: '',
			summary: '',
			educations: [{ schoolName: '', major: '', degree: '', startDate: '', endDate: '' }],
			careers: [],
			skills: [],
			projects: [],
			certifications: [],
		},
	})

	// 학력 섹션 필드 배열
	const {
		fields: eduFields,
		append: appendEdu,
		remove: removeEdu,
	} = useFieldArray({
		control,
		name: 'educations',
	})

	const onSubmit = (data: Resume) => {
		console.log('Resume Data:', data)
		// TODO: API 연결 시 저장 로직 구현
		alert('이력서가 저장되었습니다.')
		navigate('/resumes')
	}

	return {
		register,
		control,
		handleSubmit,
		errors,
		onSubmit,
		eduFields,
		appendEdu,
		removeEdu,
		navigate,
	}
}
