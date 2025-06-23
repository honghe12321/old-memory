import {getMemory} from "@/lib/notionhq";

export default async function App() {
    await getMemory()
    return(
        <div>
         111
        </div>
    )

}