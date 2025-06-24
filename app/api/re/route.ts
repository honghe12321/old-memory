import { revalidateTag } from 'next/cache'

export async function GET() {

    revalidateTag('notion')

    return new Response('OK', {
        status: 200,
    })
}