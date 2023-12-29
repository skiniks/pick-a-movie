import type { Language } from '~/types'

export function getLanguageName(languages: Language[], languageCode: string) {
  const language = languages.find(lang => lang.iso_639_1 === languageCode)
  return language ? language.english_name : languageCode
}

export function getGenreNames(genres: Record<number, string>, genreIds: number[]) {
  return genreIds.map(id => genres[id]).filter(Boolean)
}
