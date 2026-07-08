import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import esgData from '../data/esg.json'

interface Pillar {
  title: { ko: string; en: string }
  description: { ko: string; en: string }
  initiatives: { ko: string; en: string }[]
}

// 색상 테마 — 헤더만 초록/파랑/보라로 구분, 체크마크는 원본처럼 초록으로 통일
const themes = {
  environment: { header: 'from-green-500 to-emerald-600', border: 'border-green-200' },
  safety: { header: 'from-blue-500 to-blue-600', border: 'border-blue-200' },
  ethics: { header: 'from-violet-500 to-purple-600', border: 'border-violet-200' },
}

export default function ESG() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { intro, environment, safety, ethics } = esgData.esg

  const pillars: { key: keyof typeof themes; data: Pillar }[] = [
    { key: 'environment', data: environment },
    { key: 'safety', data: safety },
    { key: 'ethics', data: ethics },
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

        {/* 3대 경영 축 */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map(({ key, data }) => {
            const t = themes[key]
            return (
              <div
                key={key}
                className={`flex flex-col rounded-2xl border ${t.border} shadow-sm overflow-hidden bg-white hover-card`}
              >
                {/* 색상 헤더 */}
                <div className={`bg-gradient-to-br ${t.header} text-white px-6 py-5 flex items-center justify-between`}>
                  <h2 className="text-2xl font-bold">{data.title[lang]}</h2>
                  <PillarIcon type={key} />
                </div>

                {/* 본문 */}
                <div className="flex-1 flex flex-col p-6">
                  <p className="text-gray-600 leading-relaxed mb-6">{data.description[lang]}</p>
                  <h3 className="font-bold text-gray-800 mb-3">
                    {lang === 'ko' ? '주요 활동' : 'Key Initiatives'}
                  </h3>
                  <ul className="space-y-2.5">
                    {data.initiatives.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 mr-2 shrink-0 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 경영 축 아이콘
function PillarIcon({ type }: { type: string }) {
  if (type === 'safety') {
    // 안전보건 — 방패
    return (
      <svg className="w-10 h-10 opacity-90" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  }
  if (type === 'ethics') {
    // 윤리경영 — 저울
    return (
      <svg className="w-10 h-10 opacity-90" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    )
  }
  // 환경경영 — 새싹
  return (
    <svg className="w-10 h-10 opacity-90" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V10.5m0 0C12 7 9.25 4.75 5.5 5.5 5 9 8.25 11.25 12 10.5zm0 0c0-3 2.75-5.5 6.5-4.75.5 3.5-2.75 5.5-6.5 4.75z" />
    </svg>
  )
}
