'use client'

import {useMemoryPositions} from "@/hook/useMemoryPositions";
import {AnimatedMemoryPhoto} from "@/components/AnimatedMemoryPhoto";
import {Memory} from "@/lib/notionhq";

export function MemoryWall({memories}:{memories:Memory[]}   ) {
  const positions = useMemoryPositions(memories)
    console.log(memories)
  return (
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
                />
            )
          })}
        </div>
      </div>
  )
}
