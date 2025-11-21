import { useState, useEffect } from 'react'
import '../styles/navbar.css'

const Navbar = ({ language, setLanguage }) => {
    const [isFixed, setIsFixed] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { label: language === 'zh' ? '首页' : 'Home', href: '#home' },
        { label: language === 'zh' ? '关于我们' : 'About', href: '#about' },
        { label: language === 'zh' ? '产品中心' : 'Products', href: '#products' },
        { label: language === 'zh' ? '技术实力' : 'Technology', href: '#tech' },
        { label: language === 'zh' ? '新闻动态' : 'News', href: '#news' },
        { label: language === 'zh' ? '联系我们' : 'Contact', href: '#contact' }
    ]

    return (
        <nav className={`navbar ${isFixed ? 'fixed' : ''}`}>
            <div className="container navbar-container">
                <div className="navbar-brand">
                    <span className="brand-logo">元途</span>
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <button
                        className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
                        onClick={() => setLanguage('zh')}
                    >
                        中文
                    </button>
                    <button
                        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                        onClick={() => setLanguage('en')}
                    >
                        EN
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
