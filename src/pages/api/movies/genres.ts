import type { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const TMDB_API_KEY = process.env.TMDB_API_KEY

  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`)
    const data = await response.json()
    res.status(200).json(data)
  }
  catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).json({ message: 'Failed to fetch genres', error: error.message })
    else
      res.status(500).json({ message: 'Failed to fetch genres', error: 'An unknown error occurred' })
  }
}
