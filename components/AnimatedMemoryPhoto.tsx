"use client"
import { motion } from "framer-motion"
import { MemoryPhoto } from "@/components/memory-photo"
import {Memory} from "@/lib/notionhq";


type Position = {
    x: number
    y: number
    rotation: number
}

type Props = {
    memory: Memory
    index: number
    position: Position
}

export function AnimatedMemoryPhoto({ memory, index, position }: Props) {
    return (
        <motion.div
            key={memory.id}
            className="absolute"
            initial={{
                left: position.x,
                top: -300,
                rotate: position.rotation * 2,
                scale: 0.8,
                opacity: 0,
            }}
            animate={{
                left: position.x,
                top: position.y,
                rotate: position.rotation,
                scale: 1,
                opacity: 1,
            }}
            transition={{
                delay: index * 0.12,
                duration: 0.8 + Math.random() * 0.4,
                ease: [0.16, 1, 0.3, 1],
                rotate: {
                    delay: index * 0.12 + 0.3,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                },
                scale: {
                    delay: index * 0.12,
                    duration: 0.5,
                },
                opacity: {
                    delay: index * 0.12,
                    duration: 0.3,
                },
            }}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 100,
                y: -10,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                },
            }}
        >
            <MemoryPhoto
                memory={memory}
                maxWidth={300}
                style={{
                    width: "auto",
                    height: "auto",
                    willChange: "transform",
                }}

            />
        </motion.div>
    )
}
