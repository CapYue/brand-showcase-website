/**
 * 配置读取器 - 用于读取外部配置文件
 */
export class ConfigReader {
    
    /**
     * 异步加载配置文件
     */
    static async loadConfig() {
        // 根据当前URL判断环境
        const isDevelopment = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' ||
                            window.location.hostname.includes('dev') ||
                            window.location.hostname.includes('test');
        
        const configFile = isDevelopment ? '/config-dev.json' : '/config.json';
        
        try {
            const response = await fetch(configFile);
            if (!response.ok) {
                throw new Error(`配置文件加载失败: ${response.status}`);
            }
            const config = await response.json();
            // 默认禁用csvModifier工具，只有在配置中明确启用才会开启
            if (!config.features) {
                config.features = {};
            }
            if (config.features.csvModifier === undefined) {
                config.features.csvModifier = { enabled: false };
            }
            return config;
        } catch (error) {
            console.warn(`无法加载配置文件 ${configFile}，使用默认配置:`, error.message);
            // 返回默认配置
            return {
                features: {
                    csvModifier: { enabled: false }, // 默认禁用，不让用户看到
                    excelGenerator: { enabled: false },
                    debugMode: { enabled: isDevelopment }
                },
                environment: isDevelopment ? 'development' : 'production',
                version: isDevelopment ? '1.0.0-dev' : '1.0.0'
            };
        }
    }
    
    /**
     * 检查特定功能是否启用
     * @param {string} featureName - 功能名称
     * @returns {Promise<boolean>} 是否启用
     */
    static async isFeatureEnabled(featureName) {
        const config = await this.loadConfig();
        return config.features[featureName]?.enabled || false;
    }
    
    /**
     * 获取当前环境
     * @returns {Promise<string>} 环境名称
     */
    static async getEnvironment() {
        const config = await this.loadConfig();
        return config.environment || 'production';
    }
    
    /**
     * 检查是否为开发环境
     * @returns {Promise<boolean>} 是否为开发环境
     */
    static async isDevelopment() {
        const env = await this.getEnvironment();
        return env === 'development';
    }
    
    /**
     * 检查是否为生产环境
     * @returns {Promise<boolean>} 是否为生产环境
     */
    static async isProduction() {
        const env = await this.getEnvironment();
        return env === 'production';
    }
    
    /**
     * 获取所有配置
     * @returns {Promise<Object>} 完整配置对象
     */
    static async getAllConfig() {
        return await this.loadConfig();
    }
}

export default ConfigReader;