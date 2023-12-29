import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { startYear, endYear, genreId } = req.query
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

    if (!initialData || !initialData.total_pages) {
      res.status(500).json({ message: 'Error fetching total pages' })
      return
    }

    const totalPages = Math.min(initialData.total_pages, 500)
    const randomPage = Math.floor(Math.random() * totalPages) + 1
    const randomPageResponse = await fetch(`${url}&page=${randomPage}`)
    const randomPageData = await randomPageResponse.json()

    if (!randomPageData.results || randomPageData.results.length === 0) {
      res.status(404).json({ message: 'No movies found' })
      return
    }

    const randomIndex = Math.floor(Math.random() * randomPageData.results.length)
    const randomMovie = randomPageData.results[randomIndex]
    res.status(200).json(randomMovie)
  }
  catch (error: unknown) {
    console.error('TMDB API request failed:', error)
    if (error instanceof Error)
      res.status(500).json({ message: 'Failed to search for movies', error: error.message })
    else
      res.status(500).json({ message: 'Failed to search for movies', error: 'An unknown error occurred' })
  }
}
