import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import productsData from '../data/products.json'

interface Spec {
  label: { ko: string; en: string }
  value: string
}

// 사진 + 캡션 1장 (일반품·특수품 공용)
interface PhotoItem {
  image: string
  label: { ko: string; en: string }
}

// 일반품 — 폭넓은 규격의 양산 표준 부품(공통 스펙 + 사진 갤러리)
interface Standard {
  title: { ko: string; en: string }
  description: { ko: string; en: string }
  specs: Spec[]
  items: PhotoItem[]
}

// 특수품 — 맞춤 단조 부품 사진 갤러리
interface Special {
  title: { ko: string; en: string }
  description: { ko: string; en: string }
  items: PhotoItem[]
}

// 적용 분야 아이콘 박스 컬러 테마 — Tailwind가 인식하도록 클래스명을 완전한 문자열로 정의
const industryThemes: Record<string, { iconBox: string }> = {
  mobility: { iconBox: 'bg-emerald-50 text-emerald-600' },
  telecom: { iconBox: 'bg-blue-50 text-blue-600' },
  semicon: { iconBox: 'bg-violet-50 text-violet-600' },
  default: { iconBox: 'bg-primary/10 text-primary' },
}

// 3대 차별점 (회사소개서: Core Competencies)
const competencies = [
  {
    no: '01',
    titleEn: 'Cost Innovation',
    title: { ko: '원가 혁신', en: 'Cost Innovation' },
    desc: {
      ko: '6-Stations Former 단조로 기존 CNC 절삭 가공 부품을 대체하여, 재료 손실을 줄이고 단가를 획기적으로 낮춥니다.',
      en: 'Our 6-station formers replace CNC-machined parts, cutting material loss and dramatically lowering unit cost.',
    },
  },
  {
    no: '02',
    titleEn: 'Zero-Defect System',
    title: { ko: '무결점 품질', en: 'Zero-Defect Quality' },
    desc: {
      ko: '비전 소팅 머신(Vision Sorting)으로 100% 전수검사하여 PPM 단위의 불량률을 보증합니다.',
      en: 'Vision sorting machines inspect 100% of output, guaranteeing defect rates measured in PPM.',
    },
  },
  {
    no: '03',
    titleEn: 'Advanced Materials',
    title: { ko: '특수 소재 가공', en: 'Advanced Materials' },
    desc: {
      ko: '일반 철강뿐 아니라 무산소동·황동·구리·알루미늄·스테인리스 등 특수 합금 및 비철 단조 역량을 보유합니다.',
      en: 'Beyond steel, we forge special alloys and non-ferrous metals — oxygen-free copper, brass, copper, aluminum and stainless.',
    },
  },
]

// 주요 적용 분야 (회사소개서: Target Applications)
const applications = [
  {
    no: '01',
    type: 'mobility',
    title: { ko: '전기차 & 모빌리티', en: 'EV & Future Mobility' },
    desc: {
      ko: '배터리 팩 내부 전력 연결용 특수 버스바, 조향·제동 장치용 초고강도 정밀 샤프트.',
      en: 'Special busbars for battery-pack power connections and ultra-high-strength precision shafts for steering and braking.',
    },
  },
  {
    no: '02',
    type: 'telecom',
    title: { ko: '5G · 6G 통신', en: '5G · 6G Telecommunication' },
    desc: {
      ko: 'RF 증폭기 내부 5μm 극한 공차를 요구하는 정밀 부품, 특수 비철 커넥터 핀.',
      en: 'Precision parts demanding 5μm extreme tolerances inside RF amplifiers, and special non-ferrous connector pins.',
    },
  },
  {
    no: '03',
    type: 'semicon',
    title: { ko: '반도체 & 로봇', en: 'Semiconductor & Robotics' },
    desc: {
      ko: '반도체 진공 챔버용 내식성 피팅류, 산업용 로봇 관절용 고강도 마이크로 체결 부품.',
      en: 'Corrosion-resistant fittings for semiconductor vacuum chambers and high-strength micro fasteners for robot joints.',
    },
  },
]

export default function Products() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const standard: Standard = productsData.standard
  const special: Special = productsData.special

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '제품소개' : 'Products'}
        titleEn="Product Introduction"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'PRODUCT' },
        ]}
      />

      {/* 인트로 — 비전 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="heading-en text-sm text-accent mb-4">PRODUCT SOLUTIONS</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {lang === 'ko' ? '제조를 넘어, 솔루션을 제공합니다' : (
              <>Beyond Manufacturing,<br />We Deliver Solutions</>
            )}
          </h3>
          <p className="section-subtitle">
            {lang === 'ko'
              ? '임화금속은 절삭 가공에 의존하던 고난도 부품을 정밀 냉간단조로 전환하여, 재료 손실과 원가를 줄이고 더 안정적인 품질을 구현합니다.'
              : 'LIMHWA METAL converts high-difficulty machined parts into precision cold forgings — reducing material loss and cost while delivering more consistent quality.'}
          </p>
        </div>
      </section>

      {/* 3대 차별점 */}
      <section className="py-20 bg-gray-50" id="competencies">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-en text-sm text-accent mb-4">CORE COMPETENCIES</h2>
            <h3 className="text-3xl font-bold">{lang === 'ko' ? '3가지 결정적 차별점' : 'Three Decisive Strengths'}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {competencies.map((c) => (
              <div key={c.no} className="bg-white p-8 rounded-2xl shadow-sm hover-card">
                <span className="text-4xl font-bold text-primary/20">{c.no}</span>
                <p className="heading-en text-xs text-accent mt-2 mb-1">{c.titleEn}</p>
                <h4 className="text-xl font-bold mb-3">{c.title[lang]}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{c.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 제품 라인업 — 일반품 / 특수품 */}
      <section className="py-20 bg-white" id="lineup">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {/* 일반품 */}
          <div>
            <div className="text-center mb-10">
              <h2 className="heading-en text-sm text-accent mb-4">STANDARD PRODUCTS</h2>
              <h3 className="text-3xl font-bold">{standard.title[lang]}</h3>
              <p className="section-subtitle mt-4">{standard.description[lang]}</p>
              {/* 규격 칩 — 전체 라인업에 공통 적용되는 생산 범위 */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {standard.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm"
                  >
                    <span className="text-gray-500">{spec.label[lang]}</span>
                    <span className="font-semibold text-primary">{spec.value}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* 라인업 갤러리 — 가로 라인업 샷이라 넓은 카드로 전체가 보이게 (전체 폭은 살짝 좁혀 가운데 정렬) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {standard.items.map((item, i) => (
                <PhotoCard key={i} src={item.image} alt={item.label[lang]} caption={item.label[lang]} />
              ))}
            </div>
          </div>

          {/* 특수품 */}
          <div>
            <div className="text-center mb-10">
              <h2 className="heading-en text-sm text-accent mb-4">SPECIAL PRODUCTS</h2>
              <h3 className="text-3xl font-bold">{special.title[lang]}</h3>
              <p className="section-subtitle mt-4">{special.description[lang]}</p>
            </div>
            {/* 맞춤 부품 갤러리 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {special.items.map((item, i) => (
                <PhotoCard key={i} src={item.image} alt={item.label[lang]} caption={item.label[lang]} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 주요 적용 분야 */}
      <section className="py-20 bg-gray-50" id="applications">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-en text-sm text-accent mb-4">TARGET APPLICATIONS</h2>
            <h3 className="text-3xl font-bold">{lang === 'ko' ? '주요 적용 분야' : 'Target Applications'}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((a) => {
              const t = industryThemes[a.type] ?? industryThemes.default
              return (
                <div key={a.no} className="bg-white p-8 rounded-2xl shadow-sm hover-card flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${t.iconBox}`}>
                      <AppIcon type={a.type} />
                    </div>
                    <span className="heading-en text-xs text-gray-400">APPLICATION {a.no}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{a.title[lang]}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{a.desc[lang]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 문의 CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center bg-gray-50 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {lang === 'ko' ? '필요하신 부품이 있으신가요?' : 'Looking for a specific part?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {lang === 'ko'
              ? '도면·사양을 보내주시면 설계 단계부터 가장 합리적인 냉간단조 공정을 함께 제안해 드립니다.'
              : 'Send us your drawings or specifications, and we will propose the optimal cold-forging process from the design stage.'}
          </p>
          <Link
            to="/quote"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            {lang === 'ko' ? '견적문의' : 'Request Quote'}
          </Link>
        </div>
      </section>
    </div>
  )
}

// 제품 사진 카드 — 안쪽 테두리 액자 + 여백으로 사진을 살짝 줄여 표시, 아래 캡션 (일반품·특수품 공용)
function PhotoCard({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover-card p-3">
      <div className="aspect-[3/2] bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      {caption && (
        <p className="mt-3 mb-1 text-center font-semibold text-gray-800">{caption}</p>
      )}
    </div>
  )
}

// 적용 분야 산업 아이콘
function AppIcon({ type }: { type: string }) {
  if (type === 'telecom') {
    // 통신 — 신호 파동
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.121a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788M12 12h.008v.008H12V12z" />
      </svg>
    )
  }
  if (type === 'semicon') {
    // 반도체 & 로봇 — 칩
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    )
  }
  // 전기차 & 모빌리티 — 번개(전동화)
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}
