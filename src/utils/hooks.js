// 图片懒加载 Hook
import { useEffect, useRef, useState } from 'react'

export const useImageLazyLoad = () => {
    const ref = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target
                        img.src = img.dataset.src
                        img.onload = () => {
                            setIsLoaded(true)
                            observer.unobserve(img)
                        }
                    }
                })
            },
            { rootMargin: '50px' }
        )

        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return { ref, isLoaded }
}

// 性能监控工具
export const performanceMonitor = {
    // 测量页面加载时间
    measurePageLoad: () => {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
                    console.log(`页面加载时间: ${pageLoadTime}ms`)

                    // 发送到分析服务
                    if (window.analyticsQueue) {
                        window.analyticsQueue.push({
                            event: 'page_load_time',
                            time: pageLoadTime
                        })
                    }
                }, 0)
            })
        }
    },

    // 测量资源加载时间
    measureResourceTiming: () => {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver(list => {
                list.getEntries().forEach(entry => {
                    if (entry.duration > 1000) {
                        console.warn(`${entry.name} 加载时间过长: ${entry.duration}ms`)
                    }
                })
            })
            observer.observe({ entryTypes: ['resource'] })
        }
    },

    // 获取核心网页指标 (Core Web Vitals)
    measureCoreWebVitals: () => {
        // LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver(list => {
                const entries = list.getEntries()
                const lastEntry = entries[entries.length - 1]
                console.log(`LCP: ${lastEntry.renderTime || lastEntry.loadTime}ms`)
            })
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

            // FID (First Input Delay) - 已弃用，使用 INP
            const fidObserver = new PerformanceObserver(list => {
                list.getEntries().forEach(entry => {
                    console.log(`FID: ${entry.processingDuration}ms`)
                })
            })
            fidObserver.observe({ entryTypes: ['first-input'] })

            // CLS (Cumulative Layout Shift)
            const clsObserver = new PerformanceObserver(list => {
                let cls = 0
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        cls += entry.value
                    }
                })
                console.log(`CLS: ${cls}`)
            })
            clsObserver.observe({ entryTypes: ['layout-shift'] })
        }
    }
}

// 网络状态检测
export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return isOnline
}

// 防抖 Hook
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

// 节流 Hook
export const useThrottle = (value, delay) => {
    const [throttledValue, setThrottledValue] = useState(value)
    const lastRun = useRef(Date.now())

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRun.current >= delay) {
                setThrottledValue(value)
                lastRun.current = Date.now()
            }
        }, delay - (Date.now() - lastRun.current))

        return () => clearTimeout(handler)
    }, [value, delay])

    return throttledValue
}
