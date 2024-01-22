import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const startYear = searchParams.get('startYear')
  const endYear = searchParams.get('endYear')
  const genreId = searchParams.get('genreId')
  const TMDB_API_KEY = process.env.TMDB_API_KEY

  try {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&vote_count.gte=500`

    if (startYear && !endYear)
      url += `&primary_release_year=${startYear}`
    else if (startYear && endYear)
      url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`

    if (genreId)
      url += `&with_genres=${genreId}`

    const initialResponse = await fetch(`${url}&page=1`)
    const initialData = await initialResponse.json()

    if (!initialData || !initialData.total_pages)
      return new NextResponse(JSON.stringify({ message: 'Error fetching total pages' }), { status: 500 })

    const totalPages = Math.min(initialData.total_pages, 500)
    const randomPage = Math.floor(Math.random() * totalPages) + 1
    const randomPageResponse = await fetch(`${url}&page=${randomPage}`)
    const randomPageData = await randomPageResponse.json()

    if (!randomPageData.results || randomPageData.results.length === 0)
      return new NextResponse(JSON.stringify({ message: 'No movies found' }), { status: 404 })

    const randomIndex = Math.floor(Math.random() * randomPageData.results.length)
    const randomMovie = randomPageData.results[randomIndex]
    return new NextResponse(JSON.stringify(randomMovie), { status: 200 })
  }
  catch (error) {
    console.error('TMDB API request failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new NextResponse(JSON.stringify({ message: 'Failed to search for movies', error: errorMessage }), { status: 500 })
  }
}
