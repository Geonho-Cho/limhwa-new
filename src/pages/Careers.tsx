import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import careersData from '../data/careers.json'

export default function Careers() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const { intro, benefits, positions } = careersData.careers

  const activePositions = positions.filter(p => p.isActive)

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '채용안내' : 'Careers'}
        titleEn="Join Our Team"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'CAREERS' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 설명 */}
        <div className="text-center mb-12">
          <p className="section-subtitle">{intro[lang]}</p>
        </div>

        {/* 복리후생 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '복리후생' : 'Benefits'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-medium text-gray-700">{benefit[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 채용공고 */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {lang === 'ko' ? '채용공고' : 'Job Openings'}
          </h2>

          {activePositions.length > 0 ? (
            <div className="space-y-6">
              {activePositions.map((position) => (
                <div key={position.id} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {position.department[lang]}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">{position.title[lang]}</h3>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {lang === 'ko' ? '채용중' : 'Hiring'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{position.description[lang]}</p>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      {lang === 'ko' ? '자격요건' : 'Requirements'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {position.requirements.map((req: any, i: number) => (
                        <li key={i}>{req[lang]}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <a
                      href={`/careers/apply?position=${position.id}`}
                      className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      {lang === 'ko' ? '지원하기' : 'Apply Now'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {lang === 'ko' ? '현재 채용중인 공고가 없습니다' : 'No Current Openings'}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === 'ko'
                  ? '채용 공고가 등록되면 이곳에 표시됩니다.'
                  : 'Job openings will be displayed here when available.'}
              </p>
              <a
                href="/careers/apply"
                className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                {lang === 'ko' ? '입사 문의하기' : 'Contact Us'}
              </a>
            </div>
          )}
        </section>

        {/* 연락처 안내 */}
        <section className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold text-primary mb-4">
            {lang === 'ko' ? '입사 문의' : 'Employment Inquiries'}
          </h2>
          <p className="text-gray-600 mb-4">
            {lang === 'ko'
              ? '채용 관련 문의는 아래 연락처로 연락 주시기 바랍니다.'
              : 'For employment inquiries, please contact us.'}
          </p>
          <p className="text-lg">
            <span className="font-medium">Email:</span> sales@limhwa.com
          </p>
          <p className="text-lg">
            <span className="font-medium">Tel:</span> 031-366-8585
          </p>
        </section>
      </div>
    </div>
  )
}
