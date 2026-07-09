import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import companyData from '../data/company.json'

export default function About() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { info, ceoMessage, history, certifications } = companyData

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '회사소개' : 'About Us'}
        titleEn="Company Introduction"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'ABOUT' },
        ]}
      />

      {/* 회사 개요 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover-card">
              <p className="text-5xl font-bold text-primary mb-2">{info.established}</p>
              <p className="text-gray-600">{lang === 'ko' ? '설립년도' : 'Established'}</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover-card">
              <p className="text-5xl font-bold text-primary mb-2">{info.employees}+</p>
              <p className="text-gray-600">{lang === 'ko' ? '임직원' : 'Employees'}</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover-card">
              <p className="text-5xl font-bold text-primary mb-2">{info.monthlyCapacity}</p>
              <p className="text-gray-600">{lang === 'ko' ? '월 생산능력' : 'Monthly Capacity'}</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover-card">
              <p className="text-5xl font-bold text-primary mb-2">{certifications.length}</p>
              <p className="text-gray-600">{lang === 'ko' ? '인증 보유' : 'Certifications'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 인사말 (임직원 일동) */}
      <section className="relative overflow-hidden py-20 bg-gray-50" id="greeting">
        {/* 배경 사진 (옅게) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.15] pointer-events-none"
          style={{ backgroundImage: "url('/images/company-factory.png')" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-en text-sm text-accent mb-4">TOGETHER</h2>
            <h3 className="text-3xl font-bold">{ceoMessage.title[lang]}</h3>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm">
            <p className="text-gray-700 whitespace-pre-line leading-loose text-lg">
              {ceoMessage.content[lang]}
            </p>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="relative overflow-hidden py-20 bg-white" id="history">
        {/* 배경 사진 (옅게) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.15] pointer-events-none"
          style={{ backgroundImage: "url('/images/company-factory-2.png')" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-en text-sm text-accent mb-4">HISTORY</h2>
            <h3 className="text-3xl font-bold">{lang === 'ko' ? '연혁' : 'History'}</h3>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
            {history.map((item, index) => (
              <div key={index} className="relative flex items-start mb-10 pl-20 md:pl-0">
                {/* 연도 (왼쪽) */}
                <div className={`hidden md:block w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'order-last text-left pl-12'}`}>
                  {index % 2 === 0 && (
                    <span className="text-3xl font-bold text-primary">{item.year}</span>
                  )}
                  {index % 2 !== 0 && (
                    <p className="text-gray-700">{item.event[lang]}</p>
                  )}
                </div>

                {/* 점 */}
                <div className="absolute left-6 md:static md:w-2/12 md:flex md:justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20" />
                </div>

                {/* 내용 (오른쪽) */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'text-left md:pl-12' : 'order-first text-right md:pr-12'}`}>
                  {index % 2 === 0 && (
                    <p className="text-gray-700">{item.event[lang]}</p>
                  )}
                  {index % 2 !== 0 && (
                    <span className="text-3xl font-bold text-primary">{item.year}</span>
                  )}
                </div>

                {/* 모바일용 */}
                <div className="md:hidden">
                  <span className="text-2xl font-bold text-primary block mb-1">{item.year}</span>
                  <p className="text-gray-700">{item.event[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 인증현황 */}
      <section className="py-20 bg-gray-50" id="certifications">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-en text-sm text-accent mb-4">CERTIFICATION</h2>
            <h3 className="text-3xl font-bold">{lang === 'ko' ? '인증현황' : 'Certifications'}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl shadow-sm p-4 mb-3 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    loading="lazy"
                    className="w-full h-80 object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="py-20 bg-white" id="location">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-en text-sm text-accent mb-4">LOCATION</h2>
            <h3 className="text-3xl font-bold">{lang === 'ko' ? '오시는 길' : 'Location'}</h3>
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            {/* 지도 (약도) */}
            <img
              src="/images/location-map.png"
              alt={lang === 'ko' ? '㈜임화금속 오시는 길 약도' : 'Directions to LIMHWA METAL'}
              className="w-full h-auto"
            />
            {/* 주소 정보 */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">{lang === 'ko' ? '주소' : 'Address'}</h4>
                  <p className="text-gray-600">{info.address[lang]}</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">{lang === 'ko' ? '연락처' : 'Contact'}</h4>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium text-dark">Tel</span> {info.tel}</p>
                    <p><span className="font-medium text-dark">Fax</span> {info.fax}</p>
                    <p><span className="font-medium text-dark">Email</span> {info.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
