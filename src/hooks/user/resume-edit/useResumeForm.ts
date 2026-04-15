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

	// 경력 섹션 필드 배열
	const {
		fields: careerFields,
		append: appendCareer,
		remove: removeCareer,
	} = useFieldArray({
		control,
		name: 'careers',
	})

	// 기술 스택 섹션 필드 배열
	const {
		fields: skillFields,
		append: appendSkill,
		remove: removeSkill,
	} = useFieldArray({
		control,
		name: 'skills',
	})

	// 프로젝트 섹션 필드 배열
	const {
		fields: projectFields,
		append: appendProject,
		remove: removeProject,
	} = useFieldArray({
		control,
		name: 'projects',
	})

	// 자격증 섹션 필드 배열
	const {
		fields: certFields,
		append: appendCert,
		remove: removeCert,
	} = useFieldArray({
		control,
		name: 'certifications',
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
		careerFields,
		appendCareer,
		removeCareer,
		skillFields,
		appendSkill,
		removeSkill,
		projectFields,
		appendProject,
		removeProject,
		certFields,
		appendCert,
		removeCert,
		navigate,
	}
}
