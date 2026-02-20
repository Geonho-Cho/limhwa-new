import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import companyData from '../data/company.json'

export default function Home() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { info } = companyData

  // 현재 연도 기준 업력 계산
  const yearsInBusiness = new Date().getFullYear() - info.established

  const categories = [
    { id: 'bolt', name: lang === 'ko' ? '볼트' : 'Bolt' },
    { id: 'nut', name: lang === 'ko' ? '너트' : 'Nut' },
    { id: 'gear', name: lang === 'ko' ? '기어' : 'Gear' },
    { id: 'rivet', name: lang === 'ko' ? '리벳' : 'Rivet' },
    { id: 'etc', name: 'ETC' },
  ]

  const technologies = [
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      description: lang === 'ko'
        ? '고도의 기술력과 자동화 설비를 기반으로 정밀한 제품을 생산합니다.'
        : 'Precision manufacturing with advanced technology and automated equipment.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'quality',
      title: 'Quality',
      description: lang === 'ko'
        ? '전 공정에 걸친 엄격한 품질 관리로 고객 신뢰를 확보하고 있습니다.'
        : 'Building customer trust through rigorous quality control across all processes.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'design',
      title: 'Design',
      description: lang === 'ko'
        ? '고객 맞춤형 제품 개발을 위해 최적의 설계 솔루션을 제공합니다.'
        : 'Providing optimal design solutions for customized product development.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
    {
      id: 'logistics',
      title: 'Logistics',
      description: lang === 'ko'
        ? '신속하고 효율적인 물류 시스템으로 안정적인 공급 체계를 운영합니다.'
        : 'Operating stable supply systems with fast and efficient logistics.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
  ]

  return (
    <div>
      {/* 히어로 슬라이더 */}
      <HeroSlider />

      {/* About Us 섹션 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 이미지/로고 */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/images/logo.png"
                  alt="LIMHWA METAL"
                  className="w-full h-full object-contain p-12"
                />
              </div>
              {/* 장식 요소 */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-lg -z-10" />
            </div>

            {/* 텍스트 */}
            <div>
              <h2 className="heading-en text-sm text-accent mb-4">About us</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-dark mb-6 leading-tight">
                {lang === 'ko' ? (
                  <>냉간단조 분야에서 축적된<br />기술력과 품질</>
                ) : (
                  <>Accumulated Technology<br />and Quality in Cold Forging</>
                )}
              </h3>
              <p className="section-subtitle mb-8">
                {lang === 'ko'
                  ? '임화금속은 1995년 설립 이래 냉간단조 전문기업으로서 자동차 핵심 부품을 안정적으로 공급하고 있습니다. 30년간 축적된 기술력과 품질에 대한 자부심으로 고객 신뢰를 쌓아왔습니다.'
                  : 'Since its establishment in 1995, LIMHWA METAL has been reliably supplying core automotive components as a cold forging specialist. We have built customer trust through 30 years of accumulated technology and quality pride.'}
              </p>
              <Link to="/about" className="link-more">
                View More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PRODUCT 섹션 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* 왼쪽: 텍스트 */}
            <div>
              <h2 className="heading-en text-4xl md:text-5xl font-bold mb-6">
                OUR<br />PRODUCT
              </h2>
              <p className="section-subtitle mb-8">
                {lang === 'ko'
                  ? '축적된 제품에 대한 노하우로 다변화하는 시장 속에서 중심을 잡고 일관된 품질의 제품을 제조합니다.'
                  : 'With accumulated product expertise, we manufacture consistent quality products while maintaining stability in a diversifying market.'}
              </p>
              <Link to="/products" className="link-more">
                View More
              </Link>
            </div>

            {/* 오른쪽: 이미지 placeholder */}
            <div className="relative">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <span className="text-6xl">🔩</span>
                </div>
              </div>
            </div>
          </div>

          {/* 카테고리 버튼 */}
          <div className="flex flex-wrap gap-3 mt-12">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="tab-btn"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology 섹션 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-en text-4xl md:text-5xl font-bold mb-6">Technology</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              {lang === 'ko'
                ? '혁신과 품질 경쟁력으로 글로벌 시장에서 신뢰받는 기업으로 도약했습니다.'
                : 'We have emerged as a trusted company in the global market through innovation and quality competitiveness.'}
            </p>
          </div>

          {/* Technology 카드 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className="group bg-gray-50 rounded-xl p-8 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <span className="text-primary group-hover:text-white transition-colors">
                    {tech.icon}
                  </span>
                </div>
                <h3 className="heading-en text-lg font-bold mb-3">{tech.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-white/80">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/rnd" className="link-more">
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 섹션 */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">{yearsInBusiness}+</div>
              <div className="text-white/70">{lang === 'ko' ? '년 업력' : 'Years'}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">{info.employees}+</div>
              <div className="text-white/70">{lang === 'ko' ? '명 전문 인력' : 'Experts'}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">{info.monthlyCapacity}</div>
              <div className="text-white/70">{lang === 'ko' ? '월 생산량' : 'Monthly'}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">3</div>
              <div className="text-white/70">{lang === 'ko' ? '국제 인증' : 'Certifications'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Support 섹션 (CTA) */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 */}
            <div>
              <h2 className="heading-en text-4xl md:text-5xl font-bold mb-6">Support</h2>
              <p className="text-gray-400 text-lg mb-8">
                {lang === 'ko'
                  ? '견적 문의부터 기술 상담까지, 임화금속이 함께합니다.'
                  : 'From quote inquiries to technical consultation, LIMHWA METAL is with you.'}
              </p>
            </div>

            {/* 오른쪽: 링크 카드 */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/quote"
                className="group bg-gray-800 rounded-xl p-6 hover:bg-accent transition-colors"
              >
                <h3 className="heading-en font-bold mb-2">Online Inquiry</h3>
                <span className="text-gray-400 group-hover:text-white/80 text-sm">
                  {lang === 'ko' ? '온라인 문의' : 'Contact Us'} →
                </span>
              </Link>
              <Link
                to="/careers"
                className="group bg-gray-800 rounded-xl p-6 hover:bg-accent transition-colors"
              >
                <h3 className="heading-en font-bold mb-2">Career</h3>
                <span className="text-gray-400 group-hover:text-white/80 text-sm">
                  {lang === 'ko' ? '채용안내' : 'Join Us'} →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
