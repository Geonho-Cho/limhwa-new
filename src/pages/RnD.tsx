import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import rndData from '../data/rnd.json'

interface Tech {
  id: string
  icon: string
  image?: string
  name: { ko: string; en: string }
  description: { ko: string; en: string }
}

export default function RnD() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { intro, technologies } = rndData.rnd

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
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '핵심 기술' : 'Core Technologies'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(technologies as Tech[]).map((tech) => (
              <TechCard key={tech.id} tech={tech} lang={lang} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// 핵심 기술 카드 — 미디어 헤더(사진 있으면 사진, 없으면 아이콘) + 제목 + 설명
function TechCard({ tech, lang }: { tech: Tech; lang: 'ko' | 'en' }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover-card overflow-hidden">
      {/* 미디어 헤더 — 사진은 85% 크기로 여백(매트)을 두고 표시, 두 카드 높이 통일 */}
      <div className="aspect-[3/2] bg-gray-50 flex items-center justify-center overflow-hidden">
        {tech.image ? (
          <img
            src={tech.image}
            alt={tech.name[lang]}
            className="w-[85%] h-[85%] object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <TechIcon type={tech.icon} />
          </div>
        )}
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{tech.name[lang]}</h3>
        <p className="text-gray-600 leading-relaxed">{tech.description[lang]}</p>
      </div>
    </div>
  )
}

// 기술 아이콘
function TechIcon({ type }: { type: string }) {
  if (type === 'die') {
    // 금형 설계 — 3D 큐브(금형/부품 형상)
    return (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    )
  }
  // 냉간단조 — 위아래 금형판 사이에서 성형되는 소재(프레스)
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16M4 20h16M9 8h6v3l-3 2.5L9 11V8z" />
    </svg>
  )
}
