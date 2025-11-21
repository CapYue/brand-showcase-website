import React, { useState, useRef, useEffect } from 'react';
import { CSVTemplateGenerator } from '../utils/csvGenerator';
import { WebsiteModifier } from '../utils/websiteModifier';
import { ConfigReader } from '../utils/configReader';
import './CSVModifier.css';

const CSVModifier = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [modifications, setModifications] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isToolEnabled, setIsToolEnabled] = useState(false);
    const fileInputRef = useRef(null);

    // 检查配置，确定是否显示工具
    useEffect(() => {
        const checkConfig = async () => {
            try {
                const enabled = await ConfigReader.isFeatureEnabled('csvModifier');
                setIsToolEnabled(enabled);
                
                if (enabled) {
                    console.log('CSV修改工具已启用 - 内部版本');
                } else {
                    console.log('CSV修改工具已禁用 - 正常用户版本');
                }
            } catch (error) {
                console.error('配置检查失败:', error);
                setIsToolEnabled(false); // 默认禁用
            }
        };

        checkConfig();
    }, []);

    // 生成CSV模板
    const handleGenerateTemplate = () => {
        CSVTemplateGenerator.generateWebsiteCSVTemplate();
        setUploadStatus('CSV模板已生成，请下载并填写');
    };

    // 生成简化模板
    const handleGenerateSimpleTemplate = () => {
        CSVTemplateGenerator.generateSimpleCSVTemplate();
        setUploadStatus('简化CSV模板已生成，请下载并填写');
    };

    // 处理文件上传
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.csv')) {
            setUploadStatus('请上传CSV格式的文件');
            return;
        }

        setIsProcessing(true);
        setUploadStatus('正在解析CSV文件...');

        try {
            const mods = await WebsiteModifier.modifyFromCSV(file, (update) => {
                setModifications(prev => [...prev, update]);
                setUploadStatus(`正在应用修改: ${update.type} - ${update.item}`);
            });

            setUploadStatus(`修改完成！共应用了 ${Object.keys(mods).reduce((acc, key) => acc + Object.keys(mods[key]).length, 0)} 处修改`);
            
            // 生成修改报告
            const report = WebsiteModifier.generateModificationReport(mods);
            console.log('修改报告:', report);
            
        } catch (error) {
            setUploadStatus(`处理失败: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    // 触发文件选择
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // 重置修改
    const handleReset = () => {
        window.location.reload();
    };

    // 切换工具面板显示
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // 如果工具未启用，不渲染任何内容
    if (!isToolEnabled) {
        return null;
    }

    return (
        <>
            {/* 浮动按钮 */}
            <button 
                className="csv-modifier-toggle"
                onClick={toggleVisibility}
                title="CSV修改工具"
            >
                📊
            </button>

            {/* 工具面板 */}
            {isVisible && (
                <div className="csv-modifier-panel">
                    <div className="csv-modifier-header">
                        <h3>网站内容修改工具</h3>
                        <button 
                            className="close-btn"
                            onClick={toggleVisibility}
                        >
                            ×
                        </button>
                    </div>

                    <div className="csv-modifier-content">
                        {/* 模板生成区域 */}
                        <div className="template-section">
                            <h4>1. 下载填写模板</h4>
                            <div className="button-group">
                                <button 
                                    className="btn btn-primary"
                                    onClick={handleGenerateTemplate}
                                    disabled={isProcessing}
                                >
                                    下载完整模板
                                </button>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={handleGenerateSimpleTemplate}
                                    disabled={isProcessing}
                                >
                                    下载简化模板
                                </button>
                            </div>
                            <p className="help-text">
                                下载模板后，在"客户填写值"列中填写您的信息，然后上传修改
                            </p>
                        </div>

                        {/* 文件上传区域 */}
                        <div className="upload-section">
                            <h4>2. 上传修改文件</h4>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                            <button 
                                className="btn btn-upload"
                                onClick={handleUploadClick}
                                disabled={isProcessing}
                            >
                                {isProcessing ? '处理中...' : '选择CSV文件'}
                            </button>
                        </div>

                        {/* 状态显示 */}
                        {uploadStatus && (
                            <div className="status-section">
                                <h4>处理状态</h4>
                                <div className={`status-message ${isProcessing ? 'processing' : 'completed'}`}>
                                    {uploadStatus}
                                </div>
                            </div>
                        )}

                        {/* 修改记录 */}
                        {modifications.length > 0 && (
                            <div className="modifications-section">
                                <h4>修改记录</h4>
                                <div className="modifications-list">
                                    {modifications.map((mod, index) => (
                                        <div 
                                            key={index} 
                                            className={`modification-item ${mod.success ? 'success' : 'error'}`}
                                        >
                                            <span className="mod-type">{mod.type}</span>
                                            <span className="mod-item">{mod.item}</span>
                                            <span className="mod-status">
                                                {mod.success ? '✓' : '✗'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 操作按钮 */}
                        <div className="action-section">
                            <button 
                                className="btn btn-reset"
                                onClick={handleReset}
                            >
                                重置页面
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CSVModifier;