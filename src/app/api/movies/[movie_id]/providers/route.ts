import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const pathParts = req.nextUrl.pathname.split('/')
  const movie_id = pathParts[pathParts.length - 2]

  const TMDB_API_KEY = process.env.TMDB_API_KEY

  if (!movie_id)
    return new NextResponse(JSON.stringify({ message: 'Movie ID is required as a query parameter' }), { status: 400 })

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${TMDB_API_KEY}`)
    const data = await response.json()

    if (!response.ok)
      return new NextResponse(JSON.stringify({ message: 'Failed to fetch watch providers', error: data.status_message }), { status: response.status })

    return new NextResponse(JSON.stringify(data), { status: 200 })
  }
  catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch watch providers', error: errorMessage }), { status: 500 })
  }
}
