'use client'

import {useMemoryPositions} from "@/hook/useMemoryPositions";
import {AnimatedMemoryPhoto} from "@/components/AnimatedMemoryPhoto";
import {Memory} from "@/lib/notionhq";
import FullPhoto from "@/components/fullPhoto";
import React, {useState} from "react";

export function MemoryWall({memories}:{memories:Memory[]}   ) {
  const {positions,photoWidth} = useMemoryPositions(memories)
    const [showImage, setShowImage] = useState(false)
    const [currentImage, setCurrentImage] = useState('')
    const handleShowImage = (imageSrc: string) => {
        setCurrentImage(imageSrc)
        setShowImage(true)
    }
  return (
      <>
      <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-amber-50/50 via-white to-rose-50/50">
        {/* 照片墙 */}
        <div className="relative pb-20">
          {memories.map((memory, index:number) => {
            const position = positions[index]
            if (!position) return null

            return (
                <AnimatedMemoryPhoto
                    key={memory.id}
                    memory={memory}
                    index={index}
                    position={position}
                    photoWidth={photoWidth}
                    handleShowImage={handleShowImage}
                />
            )
          })}
        </div>
      </div>
      <FullPhoto
          src={currentImage}
          alt="全屏展示的图片"
          isOpen={showImage}
          onClose={() => setShowImage(false)}

      />
      </>
  )
}
