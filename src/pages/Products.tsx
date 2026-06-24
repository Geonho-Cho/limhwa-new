import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import productsData from '../data/products.json'

interface Spec {
  label: { ko: string; en: string }
  value: string
}

// 일반품 — 생산 스펙(규격/사이즈 등)을 가짐
interface StandardProduct {
  id: string
  name: { ko: string; en: string }
  image: string
  specs: Spec[]
  order: number
}

// 특수품 — 가능 소재 목록을 가짐
interface SpecialProduct {
  id: string
  name: { ko: string; en: string }
  description?: { ko: string; en: string }
  image: string
  materials: string[]
  order: number
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
  const standardProducts: StandardProduct[] = [...productsData.standardProducts].sort((a, b) => a.order - b.order)
  const specialProducts: SpecialProduct[] = [...productsData.specialProducts].sort((a, b) => a.order - b.order)

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
            <div className="text-center mb-12">
              <h2 className="heading-en text-sm text-accent mb-4">STANDARD PRODUCTS</h2>
              <h3 className="text-3xl font-bold">{lang === 'ko' ? '일반품' : 'Standard Products'}</h3>
              <p className="section-subtitle mt-4">
                {lang === 'ko'
                  ? '규격 · 사이즈 기준의 양산 표준 부품'
                  : 'Mass-production standard parts, organized by size and spec'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {standardProducts.map((product) => (
                <StandardCard key={product.id} product={product} lang={lang} />
              ))}
            </div>
          </div>

          {/* 특수품 */}
          <div>
            <div className="text-center mb-12">
              <h2 className="heading-en text-sm text-accent mb-4">SPECIAL PRODUCTS</h2>
              <h3 className="text-3xl font-bold">{lang === 'ko' ? '특수품' : 'Special Products'}</h3>
              <p className="section-subtitle mt-4">
                {lang === 'ko'
                  ? '가능 소재 기준의 고객 맞춤 특수 부품'
                  : 'Custom special parts, organized by available materials'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialProducts.map((product) => (
                <SpecialCard key={product.id} product={product} lang={lang} />
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

// 제품 이미지 — 이미지가 없으면 placeholder(아이콘 + 제품명) 표시
function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="h-56 bg-gray-50 flex items-center justify-center relative overflow-hidden">
      {imageError ? (
        <div className="text-center text-gray-400 px-4">
          <svg className="w-14 h-14 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => setImageError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

// 일반품 카드 — 생산 스펙(규격/사이즈 등) 표시
function StandardCard({ product, lang }: { product: StandardProduct; lang: 'ko' | 'en' }) {
  return (
    <div className="bg-white w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-card flex flex-col h-full group">
      <ProductImage src={product.image} alt={product.name[lang]} />
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block self-start px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full mb-3">
          {lang === 'ko' ? '일반품' : 'Standard'}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-4">{product.name[lang]}</h3>
        <div className="mt-auto border-t pt-4">
          <p className="heading-en text-xs text-accent mb-2">{lang === 'ko' ? '생산 스펙' : 'Production Spec'}</p>
          <div className="space-y-2 text-sm">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="text-gray-500 shrink-0">{spec.label[lang]}</span>
                <span className="font-medium text-right">{spec.value || '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 특수품 카드 — 가능 소재를 태그(알약)로 표시
function SpecialCard({ product, lang }: { product: SpecialProduct; lang: 'ko' | 'en' }) {
  return (
    <div className="bg-white w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-card flex flex-col h-full group">
      <ProductImage src={product.image} alt={product.name[lang]} />
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block self-start px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-3">
          {lang === 'ko' ? '특수품' : 'Special'}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name[lang]}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 flex-1">{product.description[lang]}</p>
        )}
        <div className="mt-auto border-t pt-4">
          <p className="heading-en text-xs text-accent mb-2">{lang === 'ko' ? '가능 소재' : 'Available Materials'}</p>
          <div className="flex flex-wrap gap-2">
            {product.materials.length === 0 ? (
              <span className="text-sm text-gray-400">—</span>
            ) : (
              product.materials.map((m, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {m}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
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
