import { useOutletContext, useState } from 'react'
import { updateMetaTags } from '../utils/seo'
import '../styles/contact.css'
import Contact from '../components/Contact'

function ContactPage() {
    const { language } = useOutletContext()

    useState(() => {
        updateMetaTags({
            title: language === 'zh' ? '联系我们' : 'Contact Us',
        })
    }, [language])

    return (
        <div className="contact-page page-container">
            <div className="page-header">
                <h1>{language === 'zh' ? '联系我们' : 'Contact Us'}</h1>
            </div>
            <Contact language={language} />
        </div>
    )
}

export default ContactPage