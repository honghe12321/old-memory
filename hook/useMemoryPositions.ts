import { useEffect, useState } from "react"

type Memory = {
    id: string
    width: number
    height: number
}

type Position = {
    x: number
    y: number
    rotation: number
}

type Result = {
    positions: Position[]
    photoWidth: number
}

export function useMemoryPositions(memories: Memory[]): Result {
    const [positions, setPositions] = useState<Position[]>([])
    const [photoWidth, setPhotoWidth] = useState<number>(300)

    useEffect(() => {
        const generatePositions = () => {
            const screenWidth = window.innerWidth
            const minPhotoWidth = 170
            const maxPhotoWidth = 300
            const minPadding = 10
            const maxPadding = 50
            const minGap = 10 // 列之间的最小间距

            // 计算最大可能的列数
            let columns = 1
            let padding = maxPadding
            let photoWidth = maxPhotoWidth

            // 尝试不同的列数，找到最适合的布局
            for (let tryColumns = 4; tryColumns >= 1; tryColumns--) {
                // 计算在该列数下需要的最小宽度
                const minRequiredWidth = tryColumns * minPhotoWidth + (tryColumns - 1) * minGap + minPadding * 2

                if (screenWidth >= minRequiredWidth) {
                    // 可以容纳这个列数，计算实际的参数
                    const availableWidth = screenWidth - minPadding * 2
                    const totalGapWidth = (tryColumns - 1) * minGap
                    const availablePhotoWidth = availableWidth - totalGapWidth
                    const idealPhotoWidth = availablePhotoWidth / tryColumns

                    // 如果理想宽度在合理范围内，使用这个配置
                    if (idealPhotoWidth >= minPhotoWidth) {
                        columns = tryColumns
                        photoWidth = Math.min(maxPhotoWidth, idealPhotoWidth)

                        // 根据屏幕大小动态调整padding
                        const paddingRatio = Math.max(0, Math.min(1, (screenWidth - 320) / (1024 - 320)))
                        padding = minPadding + (maxPadding - minPadding) * paddingRatio

                        break
                    }
                }
            }

            // 重新计算实际可用宽度和列宽
            const availableWidth = screenWidth - padding * 2
            const columnWidth = availableWidth / columns
            const columnHeights = new Array(columns).fill(padding)

            const newPositions = memories.map((memory) => {
                const scale = Math.min(1, photoWidth / memory.width)
                const scaledHeight = memory.height * scale

                // 找最短列
                let targetColumn = 0
                let minHeight = columnHeights[0]
                for (let i = 1; i < columns; i++) {
                    if (columnHeights[i] < minHeight) {
                        minHeight = columnHeights[i]
                        targetColumn = i
                    }
                }

                // 计算位置
                const baseX = padding + targetColumn * columnWidth + (columnWidth - photoWidth) / 2
                const baseY = minHeight

                const x = baseX
                const y = baseY + Math.random() * 10
                const rotation = (Math.random() - 0.5) * 10

                // 动态调整间距
                const minSpacing = 20
                const maxSpacing = 60
                const spacingRatio = Math.max(0, Math.min(1, (screenWidth - 320) / (1024 - 320)))
                const spacing = minSpacing + (maxSpacing - minSpacing) * spacingRatio + Math.random() * 20

                columnHeights[targetColumn] = y + scaledHeight + spacing

                return { x, y, rotation }
            })

            setPositions(newPositions)
            setPhotoWidth(photoWidth)
        }

        generatePositions()
        window.addEventListener("resize", generatePositions)
        return () => window.removeEventListener("resize", generatePositions)
    }, [memories])

    return { positions, photoWidth }
}