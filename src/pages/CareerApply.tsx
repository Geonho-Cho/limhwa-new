import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import careersData from '../data/careers.json'

interface FormData {
  name: string
  email: string
  phone: string
  department: string
  message: string
}

export default function CareerApply() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const positionId = searchParams.get('position')

  const { positions } = careersData.careers
  const departments = [...new Set(positions.map(p => p.department[lang]))]

  const matchedPosition = positions.find(p => p.id === positionId)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    department: matchedPosition?.department[lang] || '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // mailto link with form data
    const subject = encodeURIComponent(
      lang === 'ko'
        ? `[입사지원] ${formData.department} - ${formData.name}`
        : `[Job Application] ${formData.department} - ${formData.name}`
    )
    const body = encodeURIComponent(
      lang === 'ko'
        ? `이름: ${formData.name}\n이메일: ${formData.email}\n연락처: ${formData.phone}\n지원부서: ${formData.department}\n\n자기소개:\n${formData.message}\n\n※ 이력서는 이 메일에 첨부하여 보내주세요.`
        : `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDepartment: ${formData.department}\n\nIntroduction:\n${formData.message}\n\n※ Please attach your resume to this email.`
    )

    window.location.href = `mailto:hr@limhwa.co.kr?subject=${subject}&body=${body}`
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <PageBanner
          title={lang === 'ko' ? '입사지원' : 'Job Application'}
          titleEn="Career Application"
          breadcrumb={[
            { label: 'HOME', path: '/' },
            { label: 'CAREERS', path: '/careers' },
            { label: 'APPLY' },
          ]}
        />
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="text-6xl mb-6">&#9993;</div>
          <h2 className="text-2xl font-bold text-primary mb-4">
            {lang === 'ko' ? '이메일 앱이 열렸습니다' : 'Email App Opened'}
          </h2>
          <p className="text-gray-600 mb-2">
            {lang === 'ko'
              ? '이력서를 첨부하여 메일을 발송해주세요.'
              : 'Please attach your resume and send the email.'}
          </p>
          <p className="text-gray-500 text-sm mb-8">
            hr@limhwa.co.kr
          </p>
          <button
            onClick={() => navigate('/careers')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {lang === 'ko' ? '채용안내로 돌아가기' : 'Back to Careers'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PageBanner
        title={lang === 'ko' ? '입사지원' : 'Job Application'}
        titleEn="Career Application"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'CAREERS', path: '/careers' },
          { label: 'APPLY' },
        ]}
      />

      <div className="max-w-2xl mx-auto px-6 py-16">
        {matchedPosition && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <p className="text-sm text-primary font-medium mb-1">
              {lang === 'ko' ? '지원 포지션' : 'Applying for'}
            </p>
            <h3 className="text-lg font-bold text-gray-800">
              {matchedPosition.title[lang]} - {matchedPosition.department[lang]}
            </h3>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ko' ? '이름' : 'Name'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder={lang === 'ko' ? '홍길동' : 'John Doe'}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ko' ? '이메일' : 'Email'} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="example@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ko' ? '연락처' : 'Phone'} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="010-0000-0000"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ko' ? '지원부서' : 'Department'} <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            >
              <option value="">{lang === 'ko' ? '선택해주세요' : 'Select department'}</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
              <option value={lang === 'ko' ? '기타' : 'Other'}>
                {lang === 'ko' ? '기타' : 'Other'}
              </option>
            </select>
          </div>

          {/* Resume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ko' ? '이력서 첨부' : 'Resume'}
              <span className="text-gray-400 font-normal ml-1">
                ({lang === 'ko' ? '메일에 직접 첨부' : 'Attach via email'})
              </span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-sm">
                {lang === 'ko'
                  ? '지원하기 클릭 시 메일 앱이 열립니다. 이력서를 메일에 첨부해주세요.'
                  : 'Click Apply to open your email app. Please attach your resume to the email.'}
              </p>
              <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX (10MB)</p>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ko' ? '자기소개 / 지원동기' : 'Introduction / Motivation'}
            </label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              placeholder={lang === 'ko' ? '간단한 자기소개와 지원동기를 작성해주세요.' : 'Please introduce yourself and your motivation.'}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/careers')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {lang === 'ko' ? '취소' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {lang === 'ko' ? '지원하기' : 'Apply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
