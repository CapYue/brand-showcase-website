import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import About from './components/About'
import Products from './components/Products'
import Certifications from './components/Certifications'
import News from './components/News'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { updateMetaTags, getStructuredData } from './utils/seo'
import { performanceMonitor } from './utils/hooks'

function App() {
    const [language, setLanguage] = useState('zh')

    useEffect(() => {
        // SEO 配置
        updateMetaTags({
            title: language === 'zh' ? '品牌展示官网 - 专业、科技、创新' : 'Brand Showcase - Professional, Technology, Innovation',
            description: language === 'zh' ? '致力于为全球客户提供专业、可靠、创新的解决方案' : 'Committed to providing professional, reliable and innovative solutions to global customers',
            keywords: language === 'zh' ? '品牌,产品,解决方案,科技,创新' : 'brand,products,solutions,technology,innovation',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
            url: window.location.href
        })

        // 添加 JSON-LD 结构化数据
        const existingScript = document.querySelector('script[type="application/ld+json"]')
        if (existingScript) {
            existingScript.remove()
        }
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(getStructuredData())
        document.head.appendChild(script)

        // 性能监控
        performanceMonitor.measurePageLoad()
        performanceMonitor.measureResourceTiming()
        performanceMonitor.measureCoreWebVitals()
    }, [language])

    return (
        <div className="app">
            <Navbar language={language} setLanguage={setLanguage} />
            <Banner />
            <About language={language} />
            <Products language={language} />
            <Certifications language={language} />
            <News language={language} />
            <Contact language={language} />
            <Footer language={language} />
        </div>
    )
}

export default App
