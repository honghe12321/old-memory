'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react' // 如果你使用lucide-react图标库

interface FullScreenImageProps {
    src: string
    alt?: string
    onClose?: () => void
    isOpen?: boolean
}

const FullPhoto: React.FC<FullScreenImageProps> = ({
                                                             src,
                                                             alt = "Full screen image",
                                                             onClose,
                                                             isOpen = true
                                                         }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    // ESC键关闭功能
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && onClose) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // 防止背景滚动
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* 关闭按钮 */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
                    aria-label="关闭图片"
                >
                    <X size={24} />
                </button>
            )}

            {/* 图片容器 */}
            <div
                className="relative max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()} // 防止点击图片时触发关闭
            >
                {/* 加载状态 */}
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                )}

                {/* 错误状态 */}
                {imageError && (
                    <div className="flex flex-col items-center justify-center text-white p-8">
                        <div className="text-6xl mb-4">📷</div>
                        <p className="text-xl mb-2">图片加载失败</p>
                        <p className="text-gray-300">请检查图片链接是否正确</p>
                    </div>
                )}

                {/* 图片 */}
                <div className="relative">
                    <Image
                        src={src}
                        alt={alt}
                        width={1200}
                        height={800}
                        className={`max-w-full max-h-[90vh] object-contain transition-opacity duration-300 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        priority
                        unoptimized
                        referrerPolicy='no-referrer'
                    />
                </div>
            </div>
        </div>
    )
}

export default FullPhoto