import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url)
  const fontName = params.name

  if (!fontName) return new Response('no font name')

  const res = await fetch(`${url.origin}/font/${fontName}`)
  const fontFile = await res.arrayBuffer()

  return new Response(fontFile, {
    headers: {
      'Content-Type': 'font/woff2',
      'Cache-Control': 'public, max-age=315360000, immutable'
    } satisfies HeadersInit
  })
}
