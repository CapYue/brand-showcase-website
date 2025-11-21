/**
 * API 客户端工具类
 * 处理所有前后端通信
 * 支持本地开发和生产环境配置
 */

const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
    mock: true // 开发环境支持 Mock 数据
  },
  production: {
    baseURL: 'https://api.yourdomain.com/api',
    timeout: 10000,
    mock: false
  }
};

class APIClient {
  constructor(env = 'development') {
    this.config = API_CONFIG[env];
    this.baseURL = this.config.baseURL;
    this.timeout = this.config.timeout;
    this.mock = this.config.mock;
  }

  /**
   * 发起 HTTP 请求
   * @param {string} endpoint - API 端点
   * @param {string} method - 请求方法 (GET, POST, etc)
   * @param {object} data - 请求数据
   */
  async request(endpoint, method = 'GET', data = null) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
      }

      const response = await Promise.race([
        fetch(`${this.baseURL}${endpoint}`, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), this.timeout)
        )
      ]);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * 获取首页轮播数据
   */
  async getBannerData() {
    return this.request('/website/banner');
  }

  /**
   * 获取企业简介数据
   */
  async getAboutData() {
    return this.request('/website/about');
  }

  /**
   * 获取产品数据
   */
  async getProducts(category = null) {
    const endpoint = category ? `/website/products?category=${category}` : '/website/products';
    return this.request(endpoint);
  }

  /**
   * 获取资质荣誉数据
   */
  async getCertifications() {
    return this.request('/website/certifications');
  }

  /**
   * 获取新闻列表
   */
  async getNews(type = 'all', page = 1, pageSize = 5) {
    return this.request(`/website/news?type=${type}&page=${page}&pageSize=${pageSize}`);
  }

  /**
   * 获取联系信息
   */
  async getContactInfo() {
    return this.request('/website/contact');
  }

  /**
   * 获取导航栏数据
   */
  async getNavbarData() {
    return this.request('/website/navbar');
  }

  /**
   * 获取页脚数据
   */
  async getFooterData() {
    return this.request('/website/footer');
  }

  /**
   * 获取网站配置（颜色、标题等）
   */
  async getWebsiteConfig() {
    return this.request('/website/config');
  }

  /**
   * 提交联系表单
   */
  async submitContactForm(formData) {
    return this.request('/website/contact/submit', 'POST', formData);
  }

  /**
   * 上传图片
   */
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseURL}/upload/image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  /**
   * 批量获取所有网站数据
   */
  async getAllWebsiteData() {
    return Promise.all([
      this.getNavbarData(),
      this.getBannerData(),
      this.getAboutData(),
      this.getProducts(),
      this.getCertifications(),
      this.getNews(),
      this.getContactInfo(),
      this.getFooterData(),
      this.getWebsiteConfig()
    ]).then(([navbar, banner, about, products, certifications, news, contact, footer, config]) => ({
      navbar,
      banner,
      about,
      products,
      certifications,
      news,
      contact,
      footer,
      config
    }));
  }
}

// 根据环境自动选择配置
const env = process.env.NODE_ENV || 'development';
export const apiClient = new APIClient(env);

export default APIClient;
