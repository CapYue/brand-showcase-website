import '../styles/footer.css'

const Footer = ({ language }) => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        company: [
            { label: language === 'zh' ? '关于我们' : 'About Us', href: '#about' },
            { label: language === 'zh' ? '企业文化' : 'Culture', href: '#' },
            { label: language === 'zh' ? '招聘信息' : 'Careers', href: '#' },
            { label: language === 'zh' ? '新闻中心' : 'News', href: '#news' }
        ],
        products: [
            { label: language === 'zh' ? '产品中心' : 'Products', href: '#products' },
            { label: language === 'zh' ? '解决方案' : 'Solutions', href: '#products' },
            { label: language === 'zh' ? '服务支持' : 'Support', href: '#' },
            { label: language === 'zh' ? '文档下载' : 'Downloads', href: '#' }
        ],
        resources: [
            { label: language === 'zh' ? '在线文档' : 'Documentation', href: '#' },
            { label: language === 'zh' ? '教程' : 'Tutorials', href: '#' },
            { label: language === 'zh' ? '常见问题' : 'FAQ', href: '#' },
            { label: language === 'zh' ? '联系我们' : 'Contact', href: '#contact' }
        ]
    }

    const socialLinks = [
        { icon: 'f', name: 'WeChat', href: '#' },
        { icon: 'w', name: 'Weibo', href: '#' },
        { icon: 'd', name: 'Douyin', href: '#' },
        { icon: 'l', name: 'LinkedIn', href: '#' }
    ]

    return (
        <footer className="footer">
            <div className="container">
                {/* 顶部链接区 */}
                <div className="footer-content">
                    <div className="footer-section">
                        <h5>{language === 'zh' ? '公司' : 'Company'}</h5>
                        <ul>
                            {footerLinks.company.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h5>{language === 'zh' ? '产品' : 'Products'}</h5>
                        <ul>
                            {footerLinks.products.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h5>{language === 'zh' ? '资源' : 'Resources'}</h5>
                        <ul>
                            {footerLinks.resources.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section brand">
                        <div className="brand-logo">BRAND</div>
                        <p className="brand-desc">
                            {language === 'zh'
                                ? '致力于为全球客户提供专业、可靠、创新的解决方案'
                                : 'Committed to providing professional, reliable and innovative solutions'}
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    title={social.name}
                                    className="social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.name === 'WeChat' && '微'}
                                    {social.name === 'Weibo' && '微'}
                                    {social.name === 'Douyin' && '抖'}
                                    {social.name === 'LinkedIn' && 'in'}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 底部链接 */}
                <div className="footer-bottom">
                    <div className="footer-info">
                        <p>{language === 'zh' ? '地址：北京市朝阳区科技园路1号' : 'Address: 1 Technology Park Road, Beijing'}</p>
                        <p>{language === 'zh' ? '电话：+86 10-1234-5678' : 'Phone: +86 10-1234-5678'}</p>
                        <p>{language === 'zh' ? '邮箱：contact@brand.com' : 'Email: contact@brand.com'}</p>
                    </div>

                    <div className="footer-links">
                        <a href="#">{language === 'zh' ? '隐私政策' : 'Privacy Policy'}</a>
                        <span className="divider">|</span>
                        <a href="#">{language === 'zh' ? '使用条款' : 'Terms of Use'}</a>
                        <span className="divider">|</span>
                        <a href="#">{language === 'zh' ? '网站地图' : 'Sitemap'}</a>
                        <span className="divider">|</span>
                        <a href="#">{language === 'zh' ? 'Cookie 政策' : 'Cookie Policy'}</a>
                    </div>

                    <div className="copyright">
                        <p>&copy; {currentYear} Brand Showcase. {language === 'zh' ? '版权所有' : 'All rights reserved.'}</p>
                        <p>{language === 'zh' ? '京ICP备20003721号-1' : 'Registration number: ICP20003721-1'}</p>
                    </div>
                </div>
            </div>

            {/* 回到顶部按钮 */}
            <button
                className="back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={language === 'zh' ? '回到顶部' : 'Back to top'}
            >
                ↑
            </button>
        </footer>
    )
}

export default Footer
