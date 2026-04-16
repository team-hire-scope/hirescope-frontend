import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import type { Resume } from '@/types/resume'
import { getResumeDetail } from '@/api/resume'
import { mapResponseToForm } from '@/utils/resumeMappers'
import { useCreateResume } from '@/hooks/user/useCreateResume'
import { useUpdateResume } from '@/hooks/user/useUpdateResume'

const EMPTY_DEFAULTS: Resume = {
	userId: '',
	title: '',
	summary: '',
	educations: [{ schoolName: '', major: '', degree: '', startDate: '', endDate: '' }],
	careers: [],
	skills: [],
	projects: [],
	certifications: [],
}

export const useResumeForm = (resumeId?: string) => {
	const isEditMode = !!resumeId
	const numericId = resumeId ? Number(resumeId) : null

	const { mutate: createResume, isPending: isCreating } = useCreateResume()
	const { mutate: updateResume, isPending: isUpdating } = useUpdateResume()
	const isPending = isCreating || isUpdating

	const { data: resumeDetail, isLoading: isLoadingDetail } = useQuery({
		queryKey: ['resumes', numericId],
		queryFn: () => getResumeDetail(numericId!),
		enabled: isEditMode,
	})

	const {
		register,
		control,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isDirty },
	} = useForm<Resume>({ defaultValues: EMPTY_DEFAULTS })

	// 편집 모드: 데이터 로드 후 폼 초기화
	useEffect(() => {
		if (resumeDetail) {
			reset(mapResponseToForm(resumeDetail))
		}
	}, [resumeDetail, reset])

	const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'educations' })
	const { fields: careerFields, append: appendCareer, remove: removeCareer } = useFieldArray({ control, name: 'careers' })
	const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' })
	const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control, name: 'projects' })
	const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: 'certifications' })

	const onSubmit = (data: Resume) => {
		const onError = (err: unknown) => {
			const message =
				isAxiosError(err) && err.response?.data?.message
					? err.response.data.message
					: '이력서 저장에 실패했습니다. 다시 시도해주세요.'
			setError('root', { message })
		}

		if (isEditMode && numericId) {
			updateResume({ id: numericId, form: data }, { onError })
		} else {
			createResume(data, { onError })
		}
	}

	return {
		register,
		control,
		handleSubmit,
		errors,
		isPending,
		isDirty,
		isLoadingDetail,
		isEditMode,
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
	}
}
