import { useState, useEffect, useMemo } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface SubMenuItem {
  path: string
  label: string
}

interface NavItem {
  path: string
  label: string
  submenu?: SubMenuItem[]
}

function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)

  const isHomePage = location.pathname === '/'
  const lang = i18n.language

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setMobileSubmenu(null)
  }, [location.pathname])

  const navItems: NavItem[] = useMemo(() => [
    {
      path: '/about',
      label: t('nav.about'),
      submenu: [
        { path: '/about', label: lang === 'ko' ? 'CEO 인사말' : 'CEO Message' },
        { path: '/about#history', label: lang === 'ko' ? '연혁' : 'History' },
        { path: '/about#location', label: lang === 'ko' ? '오시는 길' : 'Location' },
      ],
    },
    {
      path: '/products',
      label: t('nav.products'),
      submenu: [
        { path: '/products?category=bolt', label: lang === 'ko' ? '볼트' : 'Bolt' },
        { path: '/products?category=nut', label: lang === 'ko' ? '너트' : 'Nut' },
        { path: '/products?category=gear', label: lang === 'ko' ? '기어' : 'Gear' },
      ],
    },
    {
      path: '/rnd',
      label: 'R&D CENTER',
      submenu: [
        { path: '/rnd', label: lang === 'ko' ? 'R&D센터' : 'R&D Center' },
        { path: '/equipment', label: lang === 'ko' ? '제조설비' : 'Equipment' },
        { path: '/quality', label: lang === 'ko' ? '품질관리' : 'Quality' },
      ],
    },
    { path: '/esg', label: 'ESG' },
    { path: '/careers', label: t('nav.careers') },
    {
      path: '/quote',
      label: lang === 'ko' ? '고객센터' : 'Contact',
      submenu: [
        { path: '/quote', label: lang === 'ko' ? '온라인 문의' : 'Online Inquiry' },
      ],
    },
  ], [t, lang])

  const isDarkHeader = isHomePage && !isScrolled

  const headerBg = isDarkHeader ? 'bg-transparent' : 'bg-white shadow-sm'
  const textColor = isDarkHeader ? 'text-white' : 'text-gray-800'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - crossfade */}
          <Link to="/" className="relative h-12 w-52 flex-shrink-0">
            <img
              src="/images/LIMHWA_METAL_black_version.png"
              alt="LIMHWA METAL"
              className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${isDarkHeader ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
              src="/images/LIMHWA_METAL_white_version.png"
              alt="LIMHWA METAL"
              className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${isDarkHeader ? 'opacity-0' : 'opacity-100'}`}
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setHoveredMenu(item.path)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  to={item.path}
                  className={`py-6 font-medium transition-colors hover:text-accent ${textColor}`}
                >
                  {item.label}
                </Link>

                {item.submenu && hoveredMenu === item.path && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="bg-white rounded-lg shadow-xl py-2 min-w-[180px] border border-gray-100">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors text-sm"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Language */}
          <div className="hidden lg:flex items-center space-x-2 text-sm">
            <button
              onClick={() => i18n.changeLanguage('ko')}
              className={`px-2 py-1 transition-colors ${
                lang === 'ko'
                  ? 'text-accent font-semibold'
                  : isDarkHeader ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Korean
            </button>
            <span className={isDarkHeader ? 'text-white/50' : 'text-gray-300'}>·</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-2 py-1 transition-colors ${
                lang === 'en'
                  ? 'text-accent font-semibold'
                  : isDarkHeader ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              English
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="py-2">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.submenu ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-6 py-3.5 text-gray-800 hover:bg-gray-50 font-medium"
                        onClick={() => setMobileSubmenu(mobileSubmenu === item.path ? null : item.path)}
                      >
                        {item.label}
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileSubmenu === item.path ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileSubmenu === item.path && (
                        <div className="bg-gray-50">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className="block pl-10 pr-6 py-3 text-sm text-gray-600 hover:text-accent hover:bg-gray-100 transition-colors"
                              onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null) }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-6 py-3.5 text-gray-800 hover:bg-gray-50 font-medium"
                      onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null) }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-6 py-3 border-t mt-2 flex items-center space-x-3 text-sm">
                <button
                  onClick={() => { i18n.changeLanguage('ko'); setIsMobileMenuOpen(false) }}
                  className={`px-3 py-1.5 rounded-full transition-colors ${lang === 'ko' ? 'bg-accent text-white font-semibold' : 'text-gray-600 bg-gray-100'}`}
                >
                  Korean
                </button>
                <button
                  onClick={() => { i18n.changeLanguage('en'); setIsMobileMenuOpen(false) }}
                  className={`px-3 py-1.5 rounded-full transition-colors ${lang === 'en' ? 'bg-accent text-white font-semibold' : 'text-gray-600 bg-gray-100'}`}
                >
                  English
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function Footer() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          <div className="flex-shrink-0">
            <img
              src="/images/LIMHWA_METAL_black_version.png"
              alt="LIMHWA METAL"
              className="h-10 opacity-80"
            />
          </div>
          <div className="text-gray-400 text-sm space-y-1">
            <p>[12345] 경기도 화성시 OO읍 OO로 123</p>
            <p>TEL 031-000-0000 &nbsp;&nbsp; FAX 031-000-0001</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Copyright © {new Date().getFullYear()} 임화금속 ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              {lang === 'ko' ? '이메일 무단수집거부' : 'Email Collection Prohibition'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {lang === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
