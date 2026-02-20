import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
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

export default function Quote() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    // 입력 시 해당 필드 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const maxFiles = 5
    const maxSize = 10 * 1024 * 1024 // 10MB

    // 파일 개수 체크
    if (files.length + selectedFiles.length > maxFiles) {
      alert(lang === 'ko' ? `파일은 최대 ${maxFiles}개까지 첨부할 수 있습니다.` : `Maximum ${maxFiles} files allowed.`)
      return
    }

    // 파일 크기 체크
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > maxSize) {
        alert(lang === 'ko' ? `${file.name}: 파일 크기는 10MB를 초과할 수 없습니다.` : `${file.name}: File size exceeds 10MB.`)
        return false
      }
      return true
    })

    setFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitResult(null)

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      files.forEach((file) => {
        formDataToSend.append('files', file)
      })

      const response = await fetch('http://localhost:3001/api/quote', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitResult({ success: true, message: result.message })
        // 폼 초기화
        setFormData(initialFormData)
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        setSubmitResult({ success: false, message: result.message })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: lang === 'ko' ? '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.' : 'Server connection failed. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '온라인 문의' : 'Online Inquiry'}
        titleEn="Contact Us"
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

        {/* 결과 메시지 */}
        {submitResult && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitResult.success ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {submitResult.message}
          </div>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
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

          {/* 파일 첨부 */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'ko' ? '도면/파일 첨부' : 'Attach Files'}
              <span className="text-gray-500 font-normal ml-2">
                ({lang === 'ko' ? '최대 5개, 각 10MB 이하' : 'Max 5 files, 10MB each'})
              </span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.zip,.rar,.dwg,.dxf,.step,.stp,.igs,.iges"
            />
            <p className="mt-1 text-sm text-gray-500">
              {lang === 'ko'
                ? 'PDF, 이미지, 문서, CAD 파일(DWG, DXF, STEP 등) 가능'
                : 'PDF, images, documents, CAD files (DWG, DXF, STEP, etc.)'}
            </p>

            {/* 첨부된 파일 목록 */}
            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      {lang === 'ko' ? '삭제' : 'Remove'}
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            Tel: 031-123-4567
          </p>
        </div>
      </div>
    </div>
  )
}
