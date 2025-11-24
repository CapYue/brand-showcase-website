import { useOutletContext, useState, useEffect } from 'react-router-dom'
import { updateMetaTags } from '../utils/seo'
import { apiClient } from '../utils/apiClient'
import '../styles/certifications.css'

function TechnologyPage() {
    const { language } = useOutletContext()
    const [certifications, setCertifications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        updateMetaTags({
            title: language === 'zh' ? '技术实力' : 'Technology',
        })
        loadCertifications()
    }, [language])

    const loadCertifications = async () => {
        try {
            setLoading(true)
            const data = await apiClient.getCertifications()
            setCertifications(data)
        } catch (error) {
            console.error('Failed to load certifications:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="technology-page page-container">
            <div className="page-header">
                <h1>{language === 'zh' ? '技术实力' : 'Technology Strength'}</h1>
            </div>
            {loading ? <div>{language === 'zh' ? '加载中...' : 'Loading...'}</div> : (
                <div className="certifications-grid">
                    {certifications.map(cert => (
                        <div key={cert.id} className="cert-card">
                            <img src={cert.image} alt={cert.name} />
                            <h3>{cert.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TechnologyPage