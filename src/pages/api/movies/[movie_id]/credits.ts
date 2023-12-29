import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { movie_id } = req.query
  const TMDB_API_KEY = process.env.TMDB_API_KEY

  if (!movie_id)
    return res.status(400).json({ message: 'Movie ID is required as a query parameter' })

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${TMDB_API_KEY}`,
    )
    const data = await response.json()

    if (response.ok)
      res.status(200).json(data)
    else
      res.status(response.status).json({ message: 'Failed to fetch movie cast', error: data.status_message })
  }
  catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).json({ message: 'Failed to fetch movie cast', error: error.message })
    else
      res.status(500).json({ message: 'Failed to fetch movie cast', error: 'An unknown error occurred' })
  }
}
