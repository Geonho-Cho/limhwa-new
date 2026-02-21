import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import equipmentData from '../data/equipment.json'

export default function Equipment() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { equipment, inspection } = equipmentData

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '제조설비' : 'Equipment'}
        titleEn="Manufacturing Equipment"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'R&D CENTER', path: '/rnd' },
          { label: 'EQUIPMENT' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 설명 */}
        <div className="text-center mb-12">
          <p className="section-subtitle">
            {lang === 'ko'
              ? '최신 설비와 기술력으로 최고의 품질을 보장합니다.'
              : 'Ensuring the highest quality with state-of-the-art equipment.'}
          </p>
        </div>

        {/* 생산설비 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">
            {lang === 'ko' ? '생산설비' : 'Production Equipment'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[...equipment].sort((a, b) => a.order - b.order).map((item) => (
              <EquipmentCard key={item.id} item={item} lang={lang} />
            ))}
          </div>
        </section>

        {/* 검사장비 */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8">
            {lang === 'ko' ? '검사/측정 장비' : 'Inspection Equipment'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[...inspection].sort((a, b) => a.order - b.order).map((item) => (
              <EquipmentCard key={item.id} item={item} lang={lang} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function EquipmentCard({ item, lang }: {
  item: any;
  lang: 'ko' | 'en';
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover-card flex flex-col h-full group">
      <div className="h-56 bg-gray-50 flex items-center justify-center relative overflow-hidden">
        {imageError ? (
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name[lang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{item.name[lang]}</h3>
        <p className="text-gray-600 mb-6 flex-1">{item.description[lang]}</p>
        {item.specs && (
          <div className="border-t pt-4 space-y-3 text-sm bg-gray-50 -mx-6 -mb-6 p-6 mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">{lang === 'ko' ? '장비 성능/규격' : 'Capacity'}</span>
              <span className="font-bold text-dark bg-white px-3 py-1 rounded-md shadow-sm">{item.specs.capacity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">{lang === 'ko' ? '보유수량' : 'Quantity'}</span>
              <span className="font-bold text-primary">{item.specs.quantity}{lang === 'ko' ? '대' : ' units'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
