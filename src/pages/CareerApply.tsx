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

// FormSubmit 전송 주소 (채용지원 → team@limhwa.com).
// ⚠️ 첫 제출 시 team@limhwa.com 으로 오는 "활성화 확인" 메일의 링크를 클릭해야 실제 배달이 시작됩니다.
// 활성화 후 랜덤 해시 주소(https://formsubmit.co/xxxxxxxx)로 교체하면 소스에 이메일이 노출되지 않습니다.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/team@limhwa.com'

export default function CareerApply() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const positionId = searchParams.get('position')
  const submitted = searchParams.get('submitted') === '1'

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    // required 속성으로 브라우저가 필수값을 검증한 뒤, FormSubmit으로 전송(이력서 첨부 포함)하고
    // _next 주소(?submitted=1)로 되돌아온다.
    setIsSubmitting(true)
  }

  // 제출 후 ?submitted=1 로 돌아왔을 때 — 접수 완료 화면
  if (submitted) {
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
            {lang === 'ko' ? '지원이 접수되었습니다' : 'Application Received'}
          </h2>
          <p className="text-gray-600 mb-2">
            {lang === 'ko'
              ? '소중한 지원에 감사드립니다. 검토 후 개별적으로 연락드리겠습니다.'
              : 'Thank you for your application. We will contact you individually after review.'}
          </p>
          <p className="text-gray-500 text-sm mb-8">
            team@limhwa.com
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

        <form
          action={FORMSUBMIT_ENDPOINT}
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* FormSubmit 설정 (화면에 보이지 않는 항목) */}
          <input type="hidden" name="_subject" defaultValue="[임화금속 홈페이지] 새 입사지원" />
          <input type="hidden" name="_template" defaultValue="table" />
          <input type="hidden" name="_captcha" defaultValue="false" />
          <input
            type="hidden"
            name="_next"
            defaultValue={typeof window !== 'undefined' ? `${window.location.origin}/careers/apply?submitted=1` : ''}
          />
          {matchedPosition && (
            <input type="hidden" name="지원포지션" defaultValue={`${matchedPosition.title[lang]} - ${matchedPosition.department[lang]}`} />
          )}
          {/* 스팸봇 함정 — 사람에겐 보이지 않는 칸 */}
          <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

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

          {/* Resume (이력서 첨부 — FormSubmit, 합계 10MB까지) */}
          <div>
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ko' ? '이력서 첨부' : 'Resume'}
              <span className="text-gray-400 font-normal ml-1">
                ({lang === 'ko' ? '선택 · 합계 10MB 이하' : 'Optional · up to 10MB total'})
              </span>
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              multiple
              accept=".pdf,.doc,.docx,.hwp,.jpg,.jpeg,.png,.zip"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <p className="text-gray-400 text-xs mt-1">
              {lang === 'ko'
                ? 'PDF, DOC, DOCX, HWP 등 · 파일이 크거나 첨부가 되지 않는 경우 team@limhwa.com 으로 보내주시면 감사하겠습니다.'
                : "PDF, DOC, DOCX, etc. · If the file is too large or won't upload, please email it to team@limhwa.com."}
            </p>
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
              disabled={isSubmitting}
              className={`flex-1 text-white px-6 py-3 rounded-lg transition-colors font-medium ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isSubmitting ? (lang === 'ko' ? '전송 중...' : 'Sending...') : (lang === 'ko' ? '지원하기' : 'Apply')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
