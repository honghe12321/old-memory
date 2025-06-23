'use client'

import {useMemoryPositions} from "@/hook/useMemoryPositions";
import {AnimatedMemoryPhoto} from "@/components/AnimatedMemoryPhoto";

const memories = [
    {
        id: 1,
        src: "https://picsum.photos/400/300",  // 宽400高300
        title: "夏日海边",
        date: "2023年7月15日",
        location: "青岛海滩",
        description: "那个炎热的夏天，我们在海边度过了美好的一天",
        width: 400,
        height: 300,
    },
    {
        id: 2,
        src: "https://picsum.photos/250/350",
        title: "生日聚会",
        date: "2023年3月22日",
        location: "家里",
        description: "朋友们为我准备的惊喜生日派对",
        width: 250,
        height: 350,
    },
    {
        id: 3,
        src: "https://picsum.photos/320/280",
        title: "山顶日出",
        date: "2023年9月8日",
        location: "泰山",
        description: "凌晨4点爬山看到的绝美日出",
        width: 320,
        height: 280,
    },
    {
        id: 4,
        src: "https://picsum.photos/360/200",
        title: "咖啡时光",
        date: "2023年11月3日",
        location: "街角咖啡店",
        description: "一个人的午后，享受安静的咖啡时光",
        width: 360,
        height: 200,
    },
    {
        id: 5,
        src: "https://picsum.photos/280/450",
        title: "雨后彩虹",
        date: "2023年6月12日",
        location: "公园",
        description: "雨过天晴后出现的双彩虹，太美了",
        width: 280,
        height: 450,
    },
    {
        id: 6,
        src: "https://picsum.photos/380/320",
        title: "毕业典礼",
        date: "2023年6月30日",
        location: "大学礼堂",
        description: "四年大学生涯的完美句号",
        width: 380,
        height: 320,
    },
    {
        id: 7,
        src: "https://picsum.photos/300/240",
        title: "小猫咪",
        date: "2023年4月5日",
        location: "宠物店",
        description: "第一次见到这只可爱的小猫",
        width: 300,
        height: 240,
    },
    {
        id: 8,
        src: "https://picsum.photos/300/350",
        title: "秋叶满地",
        date: "2023年10月20日",
        location: "校园小径",
        description: "秋天的校园，金黄的叶子铺了一地",
        width: 300,
        height: 350,
    },
    {
        id: 9,
        src: "https://picsum.photos/400/220",
        title: "家庭聚餐",
        date: "2023年12月25日",
        location: "奶奶家",
        description: "圣诞节全家人聚在一起吃饭",
        width: 400,
        height: 220,
    },
    {
        id: 10,
        src: "https://picsum.photos/250/380",
        title: "书店一角",
        date: "2023年8月14日",
        location: "独立书店",
        description: "在书店里发现了一本很棒的书",
        width: 250,
        height: 380,
    },
]


export function MemoryWall() {
  const positions = useMemoryPositions(memories)

  return (
      <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-amber-50/50 via-white to-rose-50/50">
        {/* 照片墙 */}
        <div className="relative pb-20">
          {memories.map((memory, index) => {
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
