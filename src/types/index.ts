export interface Language {
  iso_639_1: string
  english_name: string
}

export interface Movie {
  id: number
  poster_path: string
  backdrop_path: string
  title: string
  release_date: string
  original_language: string
  overview: string
  genre_ids: number[]
}

export interface WatchProvider {
  id: number
  logo_path: string
  provider_name: string
}

export interface WatchProviders {
  [country: string]: {
    link: string
    flatrate?: WatchProvider[]
    rent?: WatchProvider[]
    buy?: WatchProvider[]
    ads?: WatchProvider[]
  }
}

export type ProviderCategory = 'flatrate' | 'rent' | 'buy' | 'ads'

export interface MovieDetails {
  vote_average: number
  runtime: number
}

export interface CastMember {
  name: string
  character: string
  profile_path: string | null
}
