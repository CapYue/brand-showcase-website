/**
 * API 客户端的工具类
 * 支持惨新的 RESTful API (v1) 和 旧式 API
 */

import mockData from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:3001/api/admin'

class APIClient {
    /**
     * 发送 HTTP 请求
     */
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...options.headers
                }
            })

            if (!response.ok) {
                console.error(`API Error: ${response.status}`)
                // 只有是人为是程序作业，不要抛出错误，䮵免中断渲染
                return { data: [] }
            }

            const data = await response.json()
            return data.data || data  // 支持新的 code/message/data 格式
        } catch (error) {
            console.error('Request error:', error)
            return { data: [] }  // 一三上晶，错误也返回空数据
        }
    }

    /**
     * 获取轮播数据
     */
    async getBanners() {
        const response = await this.request('/banners')
        return response.data || response || mockData.banners
    }

    /**
     * 获取企业信息
     */
    async getCompanyInfo() {
        const response = await this.request('/company/info')
        return response.data || response || {}
    }

    /**
     * 获取产品列表
     */
    async getProducts(category = null) {
        let endpoint = '/products'
        if (category) {
            endpoint += `?category=${encodeURIComponent(category)}`
        }
        const response = await this.request(endpoint)
        return response.data || response || mockData.products
    }

    /**
     * 获取资质荣誉
     */
    async getCertifications() {
        const response = await this.request('/honors')
        return response.data || response || mockData.certifications
    }

    /**
     * 获取新闻列表
     */
    async getNews(type = 'all', page = 1, pageSize = 10) {
        let endpoint = `/news?page=${page}&pageSize=${pageSize}`
        if (type && type !== 'all') {
            endpoint += `&type=${encodeURIComponent(type)}`
        }
        const response = await this.request(endpoint)
        const newsData = response.data || response || { data: mockData.news }
        return newsData.data ? newsData : { data: mockData.news }
    }

    /**
     * 提交联系表单
     */
    async submitContactForm(formData) {
        const response = await this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        return response
    }

}

// 导出单例
export const apiClient = new APIClient()
export default apiClient
