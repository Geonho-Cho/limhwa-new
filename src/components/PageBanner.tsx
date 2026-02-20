import { Link } from 'react-router-dom'

interface PageBannerProps {
  title: string
  titleEn: string
  breadcrumb: { label: string; path?: string }[]
  backgroundImage?: string
}

export default function PageBanner({ title, titleEn, breadcrumb, backgroundImage }: PageBannerProps) {
  return (
    <div
      className="page-banner"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(10, 61, 98, 0.85), rgba(8, 45, 73, 0.9)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {/* 브레드크럼 */}
      <nav className="breadcrumb mb-4 relative z-10">
        {breadcrumb.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-white/50">•</span>}
            {item.path ? (
              <Link to={item.path} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* 페이지 타이틀 */}
      <div className="text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
        <p className="heading-en text-lg text-white/70">{titleEn}</p>
      </div>
    </div>
  )
}
