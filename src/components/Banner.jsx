import { useState, useEffect } from 'react'
import '../styles/banner.css'

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(true)

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
            title: '创新科技 启未来',
            subtitle: '专业、可靠、领先的品牌形象'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
            title: '数字转型 赋能业务',
            subtitle: '全方位的解决方案和专业服务'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=600&fit=crop',
            title: '品质保证 值得信赖',
            subtitle: '行业领先的技术实力和研发能力'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
            title: '携手共赢 创造价值',
            subtitle: '与全球合作伙伴共创美好未来'
        }
    ]

    useEffect(() => {
        if (!isAutoPlay) return

        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [isAutoPlay, slides.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
        setIsAutoPlay(false)
    }

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
        setIsAutoPlay(false)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
        setIsAutoPlay(false)
    }

    return (
        <section className="banner" id="home">
            <div className="banner-slides">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${slide.image})`
                        }}
                    >
                        <div className="slide-overlay"></div>
                        <div className="slide-content">
                            <h1 className="slide-title">{slide.title}</h1>
                            <p className="slide-subtitle">{slide.subtitle}</p>
                            <button className="btn btn-primary">了解更多</button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="banner-control prev"
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                ‹
            </button>
            <button
                className="banner-control next"
                onClick={nextSlide}
                aria-label="Next slide"
            >
                ›
            </button>

            <div className="banner-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <button
                className={`autoplay-btn ${isAutoPlay ? 'playing' : ''}`}
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                title={isAutoPlay ? '暂停' : '播放'}
            >
                {isAutoPlay ? '⏸' : '▶'}
            </button>
        </section>
    )
}

export default Banner
