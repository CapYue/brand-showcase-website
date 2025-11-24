import { useOutletContext } from 'react-router-dom'
import Banner from '../components/Banner'
import About from '../components/About'
import Products from '../components/Products'
import Certifications from '../components/Certifications'
import News from '../components/News'
import Contact from '../components/Contact'

function HomePage() {
    const { language } = useOutletContext()

    return (
        <div className="home-page">
            <section id="home">
                <Banner />
            </section>
            
            <section id="about">
                <About language={language} />
            </section>
            
            <section id="products">
                <Products language={language} />
            </section>
            
            <section id="tech">
                <Certifications language={language} />
            </section>
            
            <section id="news">
                <News language={language} />
            </section>
            
            <section id="contact">
                <Contact language={language} />
            </section>
        </div>
    )
}

export default HomePage
