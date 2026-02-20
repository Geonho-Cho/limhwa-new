import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import esgData from '../data/esg.json'

export default function ESG() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { intro, environment, safety, ethics } = esgData.esg

  const sections = [
    { data: environment, icon: '🌱', color: 'bg-green-500' },
    { data: safety, icon: '🛡️', color: 'bg-blue-500' },
    { data: ethics, icon: '⚖️', color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title="ESG"
        titleEn="Environment, Social, Governance"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'ESG' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 설명 */}
        <div className="text-center mb-12">
          <p className="section-subtitle">{intro[lang]}</p>
        </div>

        {/* ESG 섹션들 */}
        <div className="space-y-12">
          {sections.map(({ data, icon, color }, index) => (
            <section key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className={`${color} md:w-1/3 p-8 flex items-center justify-center`}>
                  <span className="text-6xl">{icon}</span>
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {data.title[lang]}
                  </h2>
                  <p className="text-gray-600 mb-6">{data.description[lang]}</p>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">
                      {lang === 'ko' ? '주요 활동' : 'Key Initiatives'}
                    </h3>
                    <ul className="space-y-2">
                      {data.initiatives.map((item: any, i: number) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
