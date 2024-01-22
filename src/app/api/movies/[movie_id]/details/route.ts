import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const pathParts = req.nextUrl.pathname.split('/')
  const movie_id = pathParts[pathParts.length - 2]

  const TMDB_API_KEY = process.env.TMDB_API_KEY
  const language = req.nextUrl.searchParams.get('language') || 'en-US'
  const append_to_response = req.nextUrl.searchParams.get('append_to_response') || ''

  if (!movie_id)
    return new NextResponse(JSON.stringify({ message: 'Movie ID is required' }), { status: 400 })

  try {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}&language=${language}${append_to_response ? `&append_to_response=${append_to_response}` : ''}`
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok)
      return new NextResponse(JSON.stringify({ message: 'Failed to fetch movie details', error: data.status_message }), { status: response.status })

    return new NextResponse(JSON.stringify(data), { status: 200 })
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new NextResponse(JSON.stringify({ message: 'Server error', error: errorMessage }), { status: 500 })
  }
}
