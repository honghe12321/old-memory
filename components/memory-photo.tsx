"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Heart } from "lucide-react"
import {Memory} from "@/lib/notionhq";

interface MemoryPhotoProps {
  memory: Memory
  style?: React.CSSProperties
  maxWidth: number
    handleShowImage:(src:string)=>void

}

export function MemoryPhoto({ memory, style,maxWidth,handleShowImage}: MemoryPhotoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // 计算显示尺寸（限制最大宽度为300px，保持宽高比）
  const scale = Math.min(1, maxWidth / memory.width)
  const displayWidth = memory.width * scale
  const displayHeight = memory.height * scale

  return (
      <div
          className={`cursor-pointer transition-all duration-500 hover:scale-105 hover:z-40`}
          style={{
            width: displayWidth + 24, // 加上padding
            height: displayHeight + 56, // 加上padding和底部留白
            ...style,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        {/* 照片容器 */}
        <div className="relative w-full h-full group">
          {/* 照片边框和阴影 */}
          <div className="absolute inset-0 bg-white rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300 transform rotate-0 group-hover:rotate-0">
            {/* 胶带效果 */}
            <div className="absolute -top-2 left-4 w-8 h-4 bg-amber-200/80 rounded-sm transform -rotate-12 shadow-sm"></div>
            <div className="absolute -top-2 right-6 w-6 h-4 bg-amber-200/80 rounded-sm transform rotate-12 shadow-sm"></div>
          </div>

          {/* 照片内容 */}
          <div className="relative w-full h-full p-3">
            <div
                className="relative overflow-hidden rounded"
                style={{
                  width: displayWidth,
                  height: displayHeight,
                }}
            >
              <Image
                  src={memory.src || "/placeholder.svg"}
                  alt={memory.title}
                  width={memory.width}
                  height={memory.height}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                  referrerPolicy='no-referrer'
              />

              {/* 悬停信息覆盖层 */}
              <div
                  className={`absolute inset-0 bg-black/10 backdrop-blur-sm duration-300 flex flex-col justify-end p-4 ${
                      isHovered ? "opacity-100" : "opacity-0"
                  }`}
              >
                  <div className="text-white space-y-2">
                      <h3 className="font-bold text-lg leading-tight">{memory.title}</h3>

                      <div className="flex items-center gap-2 text-sm opacity-90">
                          <Calendar className="w-3 h-3"/>
                          <span>{memory.date}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm opacity-90">
                          <MapPin className="w-3 h-3"/>
                          <span>{memory.location}</span>
                      </div>

                      <p className="text-sm opacity-80 leading-relaxed line-clamp-2">{memory.description}</p>

                      {/* 点赞按钮 与全屏 */}
                      <div className='flex items-center gap-2 text-sm opacity-90'>
                          <button
                              onClick={(e) => {
                                  e.stopPropagation()
                                  setIsLiked(!isLiked)
                              }}
                              className="flex items-center gap-1 text-sm hover:text-red-400 transition-colors mt-2"
                          >
                              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-400 text-red-400" : ""}`}/>
                              <span>{isLiked ? "已收藏" : "收藏"}</span>
                          </button>
                          <button
                              onClick={(e) => {
                                  e.stopPropagation()
                                  handleShowImage(memory.src)
                              }}
                              className="flex items-center gap-1 text-sm transition-colors mt-2"
                          >
                              <span>查看大图</span>
                          </button>
                      </div>
                  </div>

              </div>
            </div>
          </div>

        </div>
      </div>
  )
}
