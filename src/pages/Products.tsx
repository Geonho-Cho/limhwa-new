import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import productsData from '../data/products.json'

type Category = 'all' | 'bolt' | 'nut' | 'gear'

interface Product {
  id: string
  category: string
  name: { ko: string; en: string }
  description: { ko: string; en: string }
  image: string
  specifications: {
    material: string
    sizeRange: string
    standard: string
  }
  featured: boolean
  order: number
}

const categories: { value: Category; label: { ko: string; en: string } }[] = [
  { value: 'all', label: { ko: '전체', en: 'All' } },
  { value: 'bolt', label: { ko: '볼트', en: 'Bolt' } },
  { value: 'nut', label: { ko: '너트', en: 'Nut' } },
  { value: 'gear', label: { ko: '기어', en: 'Gear' } },
]

export default function Products() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const products: Product[] = productsData.products

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

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

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 설명 */}
        <div className="text-center mb-12">
          <p className="section-subtitle">
            {lang === 'ko'
              ? '임화금속의 고품질 냉간단조 제품을 소개합니다.'
              : 'Discover our high-quality cold forged products.'}
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat.value
                  ? 'bg-primary text-white shadow-md transform -translate-y-1 scale-105'
                  : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {/* 제품 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...filteredProducts]
            .sort((a, b) => a.order - b.order)
            .map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
        </div>

        {/* 문의 안내 */}
        <div className="mt-16 text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-primary mb-4">
            {lang === 'ko' ? '원하시는 제품을 찾지 못하셨나요?' : "Can't find what you're looking for?"}
          </h2>
          <p className="text-gray-600 mb-6">
            {lang === 'ko'
              ? '고객 맞춤형 제품 제작이 가능합니다. 견적문의를 남겨주세요.'
              : 'We offer custom manufacturing. Please contact us for a quote.'}
          </p>
          <a
            href="/quote"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            {lang === 'ko' ? '견적문의' : 'Request Quote'}
          </a>
        </div>
      </div>
    </div>
  )
}

// 제품 카드 컴포넌트
function ProductCard({ product, lang }: { product: Product; lang: 'ko' | 'en' }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-card flex flex-col h-full group">
      {/* 이미지 영역 */}
      <div className="h-64 bg-gray-50 flex items-center justify-center relative overflow-hidden">
        {imageError ? (
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{product.name[lang]}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name[lang]}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* 정보 영역 */}
      <div className="p-6">
        {/* 카테고리 뱃지 */}
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
          {product.category.toUpperCase()}
        </span>

        {/* 제품명 */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {product.name[lang]}
        </h3>

        {/* 설명 */}
        <p className="text-gray-600 text-sm mb-4">
          {product.description[lang]}
        </p>

        {/* 스펙 */}
        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{lang === 'ko' ? '재질' : 'Material'}</span>
            <span className="font-medium">{product.specifications.material}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{lang === 'ko' ? '규격' : 'Size'}</span>
            <span className="font-medium">{product.specifications.sizeRange}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{lang === 'ko' ? '표준' : 'Standard'}</span>
            <span className="font-medium">{product.specifications.standard}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
