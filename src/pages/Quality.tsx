import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'

export default function Quality() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'

  const qualityPoints = [
    {
      title: { ko: '입고 검사', en: 'Incoming Inspection' },
      desc: { ko: '원자재 품질 검사를 통한 불량 사전 차단', en: 'Raw material quality inspection to prevent defects' },
      icon: '📦',
    },
    {
      title: { ko: '공정 검사', en: 'Process Inspection' },
      desc: { ko: '생산 공정 중 실시간 품질 모니터링', en: 'Real-time quality monitoring during production' },
      icon: '⚙️',
    },
    {
      title: { ko: '출하 검사', en: 'Final Inspection' },
      desc: { ko: '출하 전 최종 품질 검사 및 포장 확인', en: 'Final quality check and packaging verification before shipment' },
      icon: '✅',
    },
  ]

  const certifications = [
    { name: 'ISO 9001', desc: { ko: '품질경영시스템', en: 'Quality Management System' } },
    { name: 'IATF 16949', desc: { ko: '자동차 품질경영시스템', en: 'Automotive Quality Management' } },
    { name: 'ISO 14001', desc: { ko: '환경경영시스템', en: 'Environmental Management System' } },
  ]

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '품질관리' : 'Quality Control'}
        titleEn="Quality Management System"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'R&D CENTER', path: '/rnd' },
          { label: 'QUALITY' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 설명 */}
        <div className="text-center mb-12">
          <p className="section-subtitle">
            {lang === 'ko'
              ? '철저한 품질관리 시스템으로 최고의 제품을 제공합니다.'
              : 'Providing the best products through thorough quality management.'}
          </p>
        </div>

        {/* 품질 방침 */}
        <section className="mb-16">
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {lang === 'ko' ? '품질 방침' : 'Quality Policy'}
            </h2>
            <p className="text-lg opacity-90">
              {lang === 'ko'
                ? '"고객 만족을 최우선으로, 지속적인 개선을 통해 무결점 품질을 추구합니다."'
                : '"Customer satisfaction first, pursuing zero-defect quality through continuous improvement."'}
            </p>
          </div>
        </section>

        {/* 품질관리 프로세스 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '품질관리 프로세스' : 'Quality Control Process'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {qualityPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">{point.icon}</div>
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                  STEP {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{point.title[lang]}</h3>
                <p className="text-gray-600">{point.desc[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 인증현황 */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '품질 인증' : 'Quality Certifications'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">{cert.name.split(' ')[0]}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.desc[lang]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
