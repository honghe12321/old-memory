import { MemoryWall } from "@/components/memory-wall"
import {getMemory} from "@/lib/notionhq";

export default async function HomePage() {
    const memories=await getMemory()
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
            <MemoryWall memories={memories}/>
        </div>
    )
}
