import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'
import equipmentData from '../data/equipment.json'

interface EqItem {
  spec: string
  qty: number
}

interface Process {
  no: string
  key: string
  title: string
  short: { ko: string; en: string }
  subtitle: { ko: string; en: string }
  maxSpec: string
  photos?: string[]
  items: EqItem[]
}

export default function Equipment() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ko' | 'en'
  const processes = equipmentData.processes as Process[]

  const totals = processes.map((p) => p.items.reduce((s, i) => s + i.qty, 0))

  return (
    <div className="min-h-screen">
      {/* 페이지 배너 */}
      <PageBanner
        title={lang === 'ko' ? '제조설비' : 'Equipment'}
        titleEn="Manufacturing Equipment"
        breadcrumb={[
          { label: 'HOME', path: '/' },
          { label: 'R&D CENTER', path: '/rnd' },
          { label: 'EQUIPMENT' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 섹션 헤더 */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-1.5 h-7 bg-primary rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            {lang === 'ko' ? '설비 보유 현황' : 'Equipment Holdings'}
          </h2>
          <span className="heading-en text-sm text-gray-400 font-semibold tracking-wider">
            EQUIPMENT HOLDINGS
          </span>
        </div>
        <p className="text-gray-600 mb-10">
          {lang === 'ko'
            ? '최신 설비와 기술력으로 최고의 품질을 보장합니다.'
            : 'Ensuring the highest quality with state-of-the-art equipment.'}
        </p>

        {/* 3열 공정 — 사진(있으면) + 보유현황 카드 */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {processes.map((p, i) => (
            <div key={p.key}>
              {p.photos && p.photos.length > 0 && (
                <div className="space-y-4 mb-4">
                  {p.photos.map((src, j) => (
                    <div
                      key={j}
                      className="group aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50"
                    >
                      <img
                        src={src}
                        alt={`${p.title} 설비 ${j + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
              <ProcessCard p={p} total={totals[i]} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 공정별 설비 보유 카드
function ProcessCard({ p, total, lang }: { p: Process; total: number; lang: 'ko' | 'en' }) {
  const maxQty = Math.max(...p.items.map((i) => i.qty))

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      {/* 헤더 (다크) */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white px-6 py-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="heading-en text-xs text-blue-300 font-semibold tracking-widest mb-1">
              PROCESS {p.no}
            </p>
            <h3 className="text-2xl font-bold leading-none">{p.title}</h3>
            <p className="text-sm text-slate-300 mt-2">{p.subtitle[lang]}</p>
          </div>
          <div className="text-right shrink-0 pl-3">
            <div className="text-4xl font-bold leading-none">{total}</div>
            <div className="text-xs text-slate-300 mt-1">{lang === 'ko' ? '보유 대수' : 'units'}</div>
          </div>
        </div>
      </div>

      {/* 최대 규격 */}
      <div className="flex justify-between items-center px-6 py-3.5 bg-slate-50 border-b border-gray-200">
        <span className="text-sm text-gray-500">{lang === 'ko' ? '최대 규격' : 'Max spec'}</span>
        <span className="text-sm font-semibold text-dark bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
          {lang === 'ko' ? `최대 ${p.maxSpec}` : p.maxSpec}
        </span>
      </div>

      {/* 규격별 보유 목록 (막대 배경) */}
      <div>
        {p.items.map((it, i) => (
          <div
            key={i}
            className="relative flex justify-between items-center px-6 py-3 border-b border-gray-100 last:border-0"
          >
            {/* 수량 비례 막대 */}
            <div
              className="absolute inset-y-0 left-0 bg-blue-50"
              style={{ width: `${(it.qty / maxQty) * 100}%` }}
            />
            <span className="relative text-sm text-gray-700">{it.spec}</span>
            <span className="relative text-sm font-semibold text-primary">
              {it.qty}
              <span className="text-gray-400 font-normal">{lang === 'ko' ? '대' : ''}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
