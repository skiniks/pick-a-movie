import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY

    const languageData = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${TMDB_API_KEY}`,
    )

    if (!languageData.ok)
      throw new Error('Failed to fetch language data')

    const languageJson = await languageData.json()

    return new NextResponse(JSON.stringify({ languages: languageJson }), { status: 200 })
  }
  catch (error) {
    console.error('Error fetching languages:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch language data', message: errorMessage }), { status: 500 })
  }
}
