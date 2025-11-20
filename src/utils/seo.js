// SEO and Meta Tags Management
export const updateMetaTags = (config) => {
    const { title, description, keywords, image, url } = config

    // 更新页面标题
    document.title = title || 'Brand Showcase'

    // 更新或创建 meta 标签
    updateOrCreateMeta('description', description)
    updateOrCreateMeta('keywords', keywords)
    updateOrCreateMeta('og:title', title)
    updateOrCreateMeta('og:description', description)
    updateOrCreateMeta('og:image', image)
    updateOrCreateMeta('og:url', url)
    updateOrCreateMeta('twitter:title', title)
    updateOrCreateMeta('twitter:description', description)
    updateOrCreateMeta('twitter:image', image)
}

function updateOrCreateMeta(name, content) {
    if (!content) return

    const isOgTag = name.startsWith('og:') || name.startsWith('twitter:')
    const attribute = isOgTag ? 'property' : 'name'

    let element = document.querySelector(`meta[${attribute}="${name}"]`)

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
    }

    element.setAttribute('content', content)
}

// 生成 Sitemap
export const generateSitemap = () => {
    const pages = [
        { url: '/', priority: 1.0, changefreq: 'weekly' },
        { url: '#about', priority: 0.8, changefreq: 'monthly' },
        { url: '#products', priority: 0.9, changefreq: 'weekly' },
        { url: '#tech', priority: 0.8, changefreq: 'monthly' },
        { url: '#news', priority: 0.7, changefreq: 'daily' },
        { url: '#contact', priority: 0.8, changefreq: 'monthly' }
    ]

    const baseUrl = window.location.origin

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    pages.forEach(page => {
        sitemap += '  <url>\n'
        sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`
        sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`
        sitemap += `    <priority>${page.priority}</priority>\n`
        sitemap += '  </url>\n'
    })

    sitemap += '</urlset>'

    return sitemap
}

// 结构化数据 (Schema.org)
export const getStructuredData = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Brand Showcase',
        'url': window.location.origin,
        'logo': `${window.location.origin}/logo.png`,
        'description': '致力于为全球客户提供专业、可靠、创新的解决方案',
        'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'Customer Service',
            'telephone': '+86 10-1234-5678',
            'email': 'contact@brand.com'
        },
        'sameAs': [
            'https://www.weibo.com/brand',
            'https://www.douyin.com/brand'
        ]
    }
}

// 在 App.jsx 中使用：
// useEffect(() => {
//   updateMetaTags({
//     title: '品牌展示官网 - 专业、科技、创新',
//     description: '致力于为全球客户提供专业、可靠、创新的解决方案',
//     keywords: '品牌,产品,解决方案,科技',
//     image: 'https://example.com/og-image.jpg',
//     url: window.location.href
//   })
//
//   // 添加 JSON-LD 结构化数据
//   const script = document.createElement('script')
//   script.type = 'application/ld+json'
//   script.textContent = JSON.stringify(getStructuredData())
//   document.head.appendChild(script)
// }, [])
