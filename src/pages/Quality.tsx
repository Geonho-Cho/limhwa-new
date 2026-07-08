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

  const inspectionEquipment: {
    name: { ko: string; en: string }
    model: string
    image: string
  }[] = [
    { name: { ko: '형상측정기', en: 'Contour Measuring Machine' }, model: 'Mitutoyo C-3000', image: '/images/quality/inspection-1.jpg' },
    { name: { ko: '비커스 경도기', en: 'Vickers Hardness Tester' }, model: 'Mitutoyo HM-200', image: '/images/quality/inspection-2.jpg' },
    { name: { ko: '로크웰 경도기', en: 'Rockwell Hardness Tester' }, model: 'Mitutoyo HR-530', image: '/images/quality/inspection-3.jpg' },
    { name: { ko: '금속현미경', en: 'Metallurgical Microscope' }, model: 'OLYMPUS PME3', image: '/images/quality/inspection-4.jpg' },
    { name: { ko: '도금두께 측정기', en: 'Coating Thickness Analyzer' }, model: 'iEDX-150T', image: '/images/quality/inspection-5.jpg' },
    { name: { ko: '확대경', en: 'Magnifying Inspection' }, model: 'SOMETECH VISION', image: '/images/quality/inspection-6.jpg' },
    { name: { ko: '비디오 미터', en: 'Video Measuring System' }, model: 'VMS-1510', image: '/images/quality/inspection-7.jpg' },
    { name: { ko: '광학 측정기', en: 'Optical Measuring System' }, model: 'Keyence LMX-X100T', image: '/images/quality/inspection-8.jpg' },
  ]

  const visionPhotos = ['/images/quality/vision-1.jpg', '/images/quality/vision-2.jpg']

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

        {/* 검사설비 현황 */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '검사설비 현황' : 'Inspection Equipment'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {inspectionEquipment.map((eq, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover-card"
              >
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                  <img
                    src={eq.image}
                    alt={eq.name[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-800 text-base">{eq.name[lang]}</h3>
                  <p className="mt-1 text-sm font-medium text-primary/70">{eq.model}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 비전 설비 보유 */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '비전 설비 보유' : 'Vision Inspection Systems'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {visionPhotos.map((src, i) => (
              <div
                key={i}
                className="group aspect-[3/4] rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-50"
              >
                <img
                  src={src}
                  alt={`비전 설비 ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
