import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import rndData from '../data/rnd.json'

export default function RnD() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { intro, technologies, patents, certifications } = rndData.rnd

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? 'R&D센터' : 'R&D Center'}
        titleEn="Research & Development"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'R&D CENTER' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 설명 */}
        <div className="text-center mb-12">
          <p className="section-subtitle">{intro[lang]}</p>
        </div>

        {/* 핵심 기술 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '핵심 기술' : 'Core Technologies'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech) => (
              <TechCard key={tech.id} tech={tech} lang={lang} />
            ))}
          </div>
        </section>

        {/* 특허현황 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '특허현황' : 'Patents'}
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">{lang === 'ko' ? '특허명' : 'Patent Name'}</th>
                    <th className="text-left py-3 px-4">{lang === 'ko' ? '등록번호' : 'Number'}</th>
                    <th className="text-left py-3 px-4">{lang === 'ko' ? '등록일' : 'Date'}</th>
                  </tr>
                </thead>
                <tbody>
                  {patents.map((patent) => (
                    <tr key={patent.id} className="border-b last:border-0">
                      <td className="py-3 px-4">{patent.name[lang]}</td>
                      <td className="py-3 px-4 text-gray-600">{patent.number}</td>
                      <td className="py-3 px-4 text-gray-600">{patent.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 인증현황 */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '인증현황' : 'Certifications'}
          </h2>
          <div className="flex justify-center gap-8 flex-wrap">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xs font-medium text-gray-600">{cert.name}</span>
                </div>
                <p className="font-medium">{cert.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function TechCard({ tech, lang }: { tech: any; lang: 'ko' | 'en' }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {imageError ? (
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        ) : (
          <img
            src={tech.image}
            alt={tech.name[lang]}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{tech.name[lang]}</h3>
        <p className="text-gray-600">{tech.description[lang]}</p>
      </div>
    </div>
  )
}
