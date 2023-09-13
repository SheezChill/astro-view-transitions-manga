import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) return new Response('no url')

  const res = await fetch(url)
  const stream = res.body

  const contentType = res.headers.get('Content-Type')!

  return new Response(stream, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400'
    } satisfies HeadersInit
  })
}
