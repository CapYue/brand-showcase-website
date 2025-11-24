import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import TechnologyPage from '../pages/TechnologyPage'
import NewsPage from '../pages/NewsPage'
import NewsDetailPage from '../pages/NewsDetailPage'
import ContactPage from '../pages/ContactPage'
import AdminDashboard from '../components/AdminDashboard'

// 定义路由配置
const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'products',
                element: <ProductsPage />
            },
            {
                path: 'products/:id',
                element: <ProductDetailPage />
            },
            {
                path: 'technology',
                element: <TechnologyPage />
            },
            {
                path: 'news',
                element: <NewsPage />
            },
            {
                path: 'news/:id',
                element: <NewsDetailPage />
            },
            {
                path: 'contact',
                element: <ContactPage />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminDashboard />
    }
]

export const router = createBrowserRouter(routes)

export default function Router() {
    return <RouterProvider router={router} />
}
