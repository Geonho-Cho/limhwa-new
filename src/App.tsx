import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quote from './pages/Quote'
import Products from './pages/Products'
import About from './pages/About'
import Equipment from './pages/Equipment'
import RnD from './pages/RnD'
import ESG from './pages/ESG'
import Quality from './pages/Quality'
import Careers from './pages/Careers'
import CareerApply from './pages/CareerApply'

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    // 해시 앵커(#greeting 등)가 있으면 해당 섹션으로, 없으면 맨 위로
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        // 고정 헤더(높이 80px) 만큼 위로 보정
        const y = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])
  return null
}

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="rnd" element={<RnD />} />
        <Route path="esg" element={<ESG />} />
        <Route path="quality" element={<Quality />} />
        <Route path="careers" element={<Careers />} />
        <Route path="careers/apply" element={<CareerApply />} />
        <Route path="quote" element={<Quote />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
