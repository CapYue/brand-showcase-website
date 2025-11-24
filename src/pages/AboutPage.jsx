import { useOutletContext, useEffect } from 'react-router-dom'
import { updateMetaTags } from '../utils/seo'
import '../styles/about.css'

function AboutPage() {
    const { language } = useOutletContext()

    useEffect(() => {
        updateMetaTags({
            title: language === 'zh' ? '关于我们 - 企业简介' : 'About Us - Company Profile',
            description: language === 'zh' ? '了解我们的企业故事、发展历程和核心团队' : 'Learn about our company story, development timeline and core team',
            keywords: language === 'zh' ? '企业简介,公司介绍,企业文化,团队' : 'about,company,culture,team'
        })
    }, [language])

    const content = language === 'zh' ? {
        title: '关于我们',
        subtitle: '企业简介详情'
    } : {
        title: 'About Us',
        subtitle: 'Company Profile'
    }

    return (
        <div className="about-page page-container">
            <div className="page-header">
                <h1>{content.title}</h1>
                <p>{content.subtitle}</p>
            </div>
            <div className="page-content">
                <p>{language === 'zh' ? '我们是一家致力于创新的企业...' : 'We are a company dedicated to innovation...'}</p>
            </div>
        </div>
    )
}

export default AboutPage