import { useEffect, useState } from "react"

type Memory = {
    id: number
    width: number
    height: number
}

type Position = {
    x: number
    y: number
    rotation: number
}

export function useMemoryPositions(memories: Memory[]) {
    const [positions, setPositions] = useState<Position[]>([])

    useEffect(() => {
        const generatePositions = () => {
            const padding = 50
            const screenWidth = window.innerWidth

            const maxWidth = 300
            // 每列宽度至少是 maxWidth + 20（左右各10间距）
            const minColumnWidth = maxWidth + 20

            const columns = Math.max(1, Math.floor((screenWidth - padding * 2) / minColumnWidth))
            const columnWidth = (screenWidth - padding * 2) / columns
            const columnHeights = new Array(columns).fill(padding)

            const newPositions = memories.map((memory) => {
                const scale = Math.min(1, maxWidth / memory.width)
                const scaledHeight = memory.height * scale

                // 找最短列
                let targetColumn = 0
                let minHeight = columnHeights[0]
                columnHeights.forEach((height, col) => {
                    if (height < minHeight) {
                        minHeight = height
                        targetColumn = col
                    }
                })

                const baseX = padding + targetColumn * columnWidth + (columnWidth - maxWidth) / 2
                const baseY = minHeight

                // 缩小随机偏移，垂直方向只随机10px以内，水平不随机，防止错位重叠
                const randomOffsetX = 0
                const randomOffsetY = Math.random() * 10

                const x = baseX + randomOffsetX
                const y = baseY + randomOffsetY

                // 间距稍微大一点，避免垂直重叠
                const spacing = 40 + Math.random() * 20
                columnHeights[targetColumn] = y + scaledHeight + spacing

                const rotation = (Math.random() - 0.5) * 10

                return {
                    x,
                    y,
                    rotation,
                }
            })

            setPositions(newPositions)
        }


        generatePositions()
        window.addEventListener("resize", generatePositions)

        return () => window.removeEventListener("resize", generatePositions)
    }, [memories])

    return positions
}
