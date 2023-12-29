import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movie_id } = req.query

  const TMDB_API_KEY = process.env.TMDB_API_KEY
  const language = req.query.language || 'en-US'
  const append_to_response = req.query.append_to_response || ''

  if (!movie_id)
    return res.status(400).json({ message: 'Movie ID is required' })

  try {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}&language=${language}${append_to_response ? `&append_to_response=${append_to_response}` : ''}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok)
      res.status(200).json(data)
    else
      res.status(response.status).json({ message: 'Failed to fetch movie details', error: data.status_message })
  }
  catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message })
    }
    else {
      res.status(500).json({ message: 'Unknown server error' })
    }
  }
}
