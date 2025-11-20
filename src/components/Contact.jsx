import { useState } from 'react'
import '../styles/contact.css'

const Contact = ({ language }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        description: '',
        captcha: ''
    })
    const [captchaCode, setCaptchaCode] = useState(generateCaptcha())
    const [submitMessage, setSubmitMessage] = useState('')

    function generateCaptcha() {
        return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRefreshCaptcha = () => {
        setCaptchaCode(generateCaptcha())
        setFormData(prev => ({ ...prev, captcha: '' }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.phone || !formData.description) {
            setSubmitMessage(language === 'zh' ? '请填写必填项' : 'Please fill required fields')
            return
        }

        if (formData.captcha.toUpperCase() !== captchaCode) {
            setSubmitMessage(language === 'zh' ? '验证码错误' : 'Incorrect captcha')
            setCaptchaCode(generateCaptcha())
            setFormData(prev => ({ ...prev, captcha: '' }))
            return
        }

        setSubmitMessage(language === 'zh' ? '提交成功！我们会尽快与您联系。' : 'Submitted successfully! We will contact you soon.')
        setFormData({ name: '', phone: '', email: '', description: '', captcha: '' })
        handleRefreshCaptcha()

        setTimeout(() => setSubmitMessage(''), 3000)
    }

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-title">
                    <h2>{language === 'zh' ? '联系我们' : 'Contact Us'}</h2>
                    <p>{language === 'zh' ? '有任何问题，我们随时准备好为您服务' : 'Any questions? We are ready to help'}</p>
                </div>

                <div className="contact-content">
                    {/* 联系信息 */}
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon">📍</div>
                            <h4>{language === 'zh' ? '公司地址' : 'Address'}</h4>
                            <p>{language === 'zh' ? '北京市朝阳区科技园路1号' : '1 Technology Park Road, Chaoyang District, Beijing'}</p>
                            <p className="info-detail">{language === 'zh' ? '邮编：100000' : 'ZIP: 100000'}</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">📞</div>
                            <h4>{language === 'zh' ? '联系电话' : 'Phone'}</h4>
                            <p>+86 10-1234-5678</p>
                            <p className="info-detail">{language === 'zh' ? '工作时间：周一至周五 9:00-18:00' : 'Mon-Fri 9:00-18:00'}</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">📧</div>
                            <h4>{language === 'zh' ? '电子邮箱' : 'Email'}</h4>
                            <p>contact@brand.com</p>
                            <p className="info-detail">service@brand.com</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">💬</div>
                            <h4>{language === 'zh' ? '在线咨询' : 'Online Chat'}</h4>
                            <p>{language === 'zh' ? '实时客服支持' : '24/7 Customer Support'}</p>
                            <button
                                className="btn btn-secondary"
                                style={{ marginTop: '12px' }}
                                onClick={() => {
                                    const formElement = document.querySelector('.contact-form-section')
                                    if (formElement) {
                                        formElement.scrollIntoView({ behavior: 'smooth' })
                                        const firstInput = formElement.querySelector('input')
                                        if (firstInput) firstInput.focus()
                                    }
                                }}
                            >
                                {language === 'zh' ? '开始对话' : 'Start Chat'}
                            </button>
                        </div>
                    </div>

                    {/* 地图 */}
                    <div className="contact-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.7911352654263!2d116.40529627604307!3d39.91459697144444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f052e22e8e1eef%3A0xa8d1b8f8b8e8e8e!2sBeijing%2C%20China!5e0!3m2!1sen!2s!4v1234567890"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* 联系表单 */}
                <div className="contact-form-section">
                    <h3>{language === 'zh' ? '在线留言' : 'Leave a Message'}</h3>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>{language === 'zh' ? '姓名' : 'Name'} *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={language === 'zh' ? '请输入您的姓名' : 'Enter your name'}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>{language === 'zh' ? '电话' : 'Phone'} *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder={language === 'zh' ? '请输入您的电话' : 'Enter your phone'}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>{language === 'zh' ? '邮箱' : 'Email'}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={language === 'zh' ? '请输入您的邮箱' : 'Enter your email'}
                            />
                        </div>

                        <div className="form-group">
                            <label>{language === 'zh' ? '需求描述' : 'Description'} *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder={language === 'zh' ? '请描述您的需求' : 'Describe your needs'}
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <div className="form-group captcha-group">
                            <div className="captcha-input">
                                <label>{language === 'zh' ? '验证码' : 'Captcha'} *</label>
                                <input
                                    type="text"
                                    name="captcha"
                                    value={formData.captcha}
                                    onChange={handleInputChange}
                                    placeholder={language === 'zh' ? '请输入验证码' : 'Enter captcha'}
                                    required
                                />
                            </div>
                            <div className="captcha-code">
                                <div className="code-display">{captchaCode}</div>
                                <button
                                    type="button"
                                    className="refresh-btn"
                                    onClick={handleRefreshCaptcha}
                                    title={language === 'zh' ? '刷新验证码' : 'Refresh'}
                                >
                                    🔄
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            {language === 'zh' ? '提交' : 'Submit'}
                        </button>

                        {submitMessage && <div className="submit-message">{submitMessage}</div>}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
