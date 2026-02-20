import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Slide {
  id: number
  image: string
  title: string[]
  subtitle: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero/slide1.jpg',
    title: ['냉간단조의 미래를 위한', '글로벌 체결 솔루션'],
    subtitle: '품질로 앞서가고 혁신으로 성장하는 - 임화금속',
  },
  {
    id: 2,
    image: '/images/hero/slide2.jpg',
    title: ['정밀함으로', '신뢰를 만듭니다'],
    subtitle: '30년 축적된 기술력과 품질의 자부심',
  },
  {
    id: 3,
    image: '/images/hero/slide3.jpg',
    title: ['자동차 핵심 부품', '안정적 공급'],
    subtitle: '볼트, 너트, 기어 - 최고 품질의 냉간단조 부품',
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'

  // 자동 슬라이드 (5초 간격)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 슬라이드 배경 */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 배경 이미지 또는 placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundColor: '#2a2a2a',
            }}
          >
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        </div>
      ))}

      {/* 콘텐츠 */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 absolute'
                }`}
              >
                {index === currentSlide && (
                  <>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                      {slide.title.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mb-10">
                      {slide.subtitle}
                    </p>
                  </>
                )}
              </div>
            ))}

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4">
              <Link to="/quote" className="btn-primary">
                {lang === 'ko' ? '견적 문의하기' : 'Request Quote'}
              </Link>
              <Link to="/products" className="btn-outline">
                {lang === 'ko' ? '제품 보기' : 'View Products'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 스크롤 다운 힌트 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
