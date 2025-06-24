import {Client, isFullPageOrDatabase} from "@notionhq/client"

import type {
    PageObjectResponse, RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
    fetch:(url, init)=>{
        return fetch(url, {
            ...init,
            next:{
                tags:['notion']
            }
        })
    }
})

function getRichTextPlainText(rich_text: RichTextItemResponse[]): string {
    return rich_text.map(item => item.plain_text).join('')
}

export interface Memory {
    id: string
    title: string
    date: string
    location: string
    description: string
    src: string
    width: number
    height: number
}

function getPageMeta(page: PageObjectResponse): Memory {
    const properties = page.properties
    return {
        id: page.id,
        title: properties.Title.type === 'rich_text' ? getRichTextPlainText(properties.Title.rich_text) : '',
        date: properties.Date.type === 'rich_text' ? getRichTextPlainText(properties.Date.rich_text) : '',
        location: properties.Location.type === 'rich_text' ? getRichTextPlainText(properties.Location.rich_text) : '',
        description: properties.Description.type === 'rich_text' ? getRichTextPlainText(properties.Description.rich_text) : '',
        src: properties.Img.type === 'rich_text' ? getRichTextPlainText(properties.Img.rich_text) : '',
        width: properties.Width.type === 'number' ? properties.Width.number??0 : 0,
        height: properties.Height.type === 'number' ? properties.Height.number??0 : 0,
    }
}


export async function getMemory() {

    const response = await notion.databases.query({database_id: "21b0884bbac0807abfacfdf078f80c65",})

    const posts: Memory[] = []
    if ('list' === response.object) {
        for (const page of response.results) {
            if (isFullPageOrDatabase(page) && 'page' === page.object) {
                posts.push(getPageMeta(page))
            }
        }
    }
    return posts
}

