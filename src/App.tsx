import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
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
  )
}

export default App
