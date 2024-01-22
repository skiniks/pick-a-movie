import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY

  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`)
    const data = await response.json()

    if (!response.ok)
      throw new Error('Failed to fetch genres')

    return new NextResponse(JSON.stringify(data), { status: 200 })
  }
  catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch genres', error: errorMessage }), { status: 500 })
  }
}
