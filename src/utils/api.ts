import type { CastMember, Language, WatchProviders } from '~/types'

export async function fetchGenres(): Promise<{ [key: string]: string }> {
  try {
    const response = await fetch('/api/movies/genres')
    const data = await response.json()
    const genresMap = data.genres.reduce((acc: { [key: string]: string }, genre: { id: string | number, name: string }) => {
      acc[genre.id.toString()] = genre.name
      return acc
    }, {})
    return genresMap
  }
  catch (error) {
    console.error('Error fetching genres:', error)
    return {}
  }
}

export async function fetchLanguages(): Promise<Language[]> {
  try {
    const response = await fetch('/api/movies/languages')
    const data = await response.json()
    return data.languages
  }
  catch (error) {
    console.error('Error fetching languages:', error)
    return []
  }
}

export async function fetchWatchProviders(movieId: number): Promise<WatchProviders> {
  try {
    const response = await fetch(`/api/movies/${movieId}/providers`)
    const data = await response.json()
    return data.results
  }
  catch (error) {
    console.error('Failed to fetch watch providers:', error)
    return {}
  }
}

export async function fetchMovieCast(movieId: number): Promise<CastMember[]> {
  try {
    const response = await fetch(`/api/movies/${movieId}/credits`)
    const data = await response.json()
    return data.cast
  }
  catch (error) {
    console.error('Failed to fetch movie cast:', error)
    return []
  }
}

export async function fetchMovieVideos(movieId: number) {
  try {
    const response = await fetch(`/api/movies/${movieId}/videos`)
    const data = await response.json()
    return data.results
  }
  catch (error) {
    console.error('Failed to fetch movie videos:', error)
    return []
  }
}
