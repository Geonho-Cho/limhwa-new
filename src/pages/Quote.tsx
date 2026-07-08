import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

interface FormData {
  companyName: string
  contactName: string
  email: string
  phone: string
  productType: string
  quantity: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const initialFormData: FormData = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  productType: '',
  quantity: '',
  message: '',
}

const productTypes = [
  { value: 'bolt', label: { ko: '볼트', en: 'Bolt' } },
  { value: 'nut', label: { ko: '너트', en: 'Nut' } },
  { value: 'gear', label: { ko: '기어', en: 'Gear' } },
  { value: 'custom', label: { ko: '주문제작', en: 'Custom' } },
  { value: 'other', label: { ko: '기타', en: 'Other' } },
]

// FormSubmit 전송 주소.
// ⚠️ 첫 제출 시 sales@limhwa.com 으로 오는 "활성화 확인" 메일의 링크를 클릭해야 실제 배달이 시작됩니다.
// 활성화 후 대시보드/확인메일에 나오는 랜덤 해시 주소(예: https://formsubmit.co/xxxxxxxx)로 교체하면
// 소스코드에 회사 이메일이 노출되지 않습니다.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/sales@limhwa.com'

export default function Quote() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const [searchParams] = useSearchParams()
  const submitted = searchParams.get('submitted') === '1'

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = lang === 'ko' ? '회사명을 입력해주세요.' : 'Company name is required.'
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = lang === 'ko' ? '담당자명을 입력해주세요.' : 'Contact name is required.'
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === 'ko' ? '이메일을 입력해주세요.' : 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === 'ko' ? '올바른 이메일 형식이 아닙니다.' : 'Invalid email format.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = lang === 'ko' ? '연락처를 입력해주세요.' : 'Phone number is required.'
    }
    if (!formData.productType) {
      newErrors.productType = lang === 'ko' ? '제품 종류를 선택해주세요.' : 'Please select a product type.'
    }
    if (!formData.message.trim()) {
      newErrors.message = lang === 'ko' ? '문의 내용을 입력해주세요.' : 'Message is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // 검증 실패 시에만 제출을 막는다. 통과하면 브라우저가 FormSubmit으로 그대로 전송(파일 첨부 포함)하고
  // _next 주소(우리 사이트 ?submitted=1)로 되돌아온다.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!validate()) {
      e.preventDefault()
      return
    }
    setIsSubmitting(true)
  }

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '견적 문의' : 'Quote Inquiry'}
        titleEn="Request a Quote"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'CONTACT' },
        ]}
      />

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* 설명 */}
        <div className="text-center mb-10">
          <p className="section-subtitle">
            {lang === 'ko'
              ? '제품에 대한 견적을 요청해 주세요. 빠른 시일 내에 답변 드리겠습니다.'
              : 'Request a quote for our products. We will respond as soon as possible.'}
          </p>
        </div>

        {/* 접수 완료 메시지 (FormSubmit 제출 후 ?submitted=1 로 돌아왔을 때) */}
        {submitted && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300">
            {lang === 'ko'
              ? '견적 요청이 정상적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.'
              : 'Your quote request has been received. We will respond as soon as possible.'}
          </div>
        )}

        {/* 폼 */}
        <form
          action={FORMSUBMIT_ENDPOINT}
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          noValidate
          className="bg-white shadow-lg rounded-lg p-8"
        >
          {/* FormSubmit 설정 (화면에 보이지 않는 항목) */}
          <input type="hidden" name="_subject" defaultValue="[임화금속 홈페이지] 새 견적문의" />
          <input type="hidden" name="_template" defaultValue="table" />
          <input type="hidden" name="_captcha" defaultValue="false" />
          <input
            type="hidden"
            name="_next"
            defaultValue={typeof window !== 'undefined' ? `${window.location.origin}/quote?submitted=1` : ''}
          />
          {/* 스팸봇 함정 — 사람에겐 보이지 않는 칸. 봇이 채우면 스팸으로 걸러진다. */}
          <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 회사명 */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'ko' ? '회사명' : 'Company Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={lang === 'ko' ? '회사명을 입력하세요' : 'Enter company name'}
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
            </div>

            {/* 담당자명 */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'ko' ? '담당자명' : 'Contact Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.contactName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={lang === 'ko' ? '담당자명을 입력하세요' : 'Enter contact name'}
              />
              {errors.contactName && <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>}
            </div>

            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'ko' ? '이메일' : 'Email'} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="example@company.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* 연락처 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'ko' ? '연락처' : 'Phone'} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="010-1234-5678"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* 제품 종류 */}
            <div>
              <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'ko' ? '제품 종류' : 'Product Type'} <span className="text-red-500">*</span>
              </label>
              <select
                id="productType"
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.productType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{lang === 'ko' ? '선택하세요' : 'Select'}</option>
                {productTypes.map((type) => (
                  <option key={type.value} value={type.label[lang]}>
                    {type.label[lang]}
                  </option>
                ))}
              </select>
              {errors.productType && <p className="mt-1 text-sm text-red-500">{errors.productType}</p>}
            </div>

            {/* 수량 */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'ko' ? '예상 수량' : 'Estimated Quantity'}
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={lang === 'ko' ? '예: 10,000개' : 'e.g., 10,000 pcs'}
              />
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'ko' ? '문의 내용' : 'Message'} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={
                lang === 'ko'
                  ? '제품 규격, 재질, 용도 등 상세 내용을 기재해 주세요.'
                  : 'Please describe product specifications, materials, usage, etc.'
              }
            />
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>

          {/* 파일 첨부 (FormSubmit — 합계 10MB까지) */}
          <div className="mt-6">
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'ko' ? '도면/파일 첨부' : 'Attach Files'}
              <span className="text-gray-500 font-normal ml-2">
                ({lang === 'ko' ? '선택 · 합계 10MB 이하' : 'Optional · up to 10MB total'})
              </span>
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.zip,.rar,.dwg,.dxf,.step,.stp,.igs,.iges"
            />
            {/* 대용량·첨부 실패 시 안내 */}
            <div className="mt-3 rounded-lg bg-blue-50 border border-blue-100 p-5 text-sm text-gray-600">
              <p className="text-base font-semibold text-gray-800 mb-2">
                {lang === 'ko' ? '📎 도면·모델링 파일 안내' : '📎 Sending Drawings / Model Files'}
              </p>
              <p>
                {lang === 'ko'
                  ? '· 도면·모델링 파일은 위 「도면/파일 첨부」에서 바로 올려주실 수 있습니다. (합계 10MB 이하)'
                  : '· You can upload drawings / model files directly in the field above (up to 10MB total).'}
              </p>
              <p className="mt-1">
                {lang === 'ko'
                  ? '· 파일이 크거나 첨부가 되지 않는 경우, 아래 이메일로 보내주시면 감사하겠습니다.'
                  : "· If your files are too large or won't upload, please email them to the address below."}
              </p>
              <p className="mt-3 text-center text-base font-semibold text-primary">sales@limhwa.com</p>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              {isSubmitting
                ? lang === 'ko'
                  ? '전송 중...'
                  : 'Sending...'
                : lang === 'ko'
                ? '견적 요청하기'
                : 'Request Quote'}
            </button>
          </div>
        </form>

        {/* 연락처 안내 */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            {lang === 'ko' ? '급한 문의는 전화로 연락 주세요.' : 'For urgent inquiries, please call us.'}
          </p>
          <p className="mt-2 text-lg font-medium text-primary">
            Tel: 031-366-8585
          </p>
        </div>
      </div>
    </div>
  )
}
