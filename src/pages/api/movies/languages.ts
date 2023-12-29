import type { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY

    const languageData = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${TMDB_API_KEY}`,
    )

    if (!languageData.ok)
      throw new Error('Failed to fetch language data')

    const languageJson = await languageData.json()

    res.status(200).json({ languages: languageJson })
  }
  catch (error) {
    console.error('Error fetching languages:', error)
    res.status(500).json({ error: 'Failed to fetch language data' })
  }
}
