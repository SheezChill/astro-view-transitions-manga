import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url)
  const fontName = params.name

  if (!fontName) return new Response('no font name')

  const res = await fetch(`${url.origin}/font/${fontName}`)
  const stream = res.body

  const contentType = res.headers.get('Content-Type')!

  return new Response(stream, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=315360000'
    } satisfies HeadersInit
  })
}
