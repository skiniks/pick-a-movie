import { useEffect, useState } from 'react'
import Head from 'next/head'
import type { CastMember, Language, Movie, MovieDetails, WatchProviders } from '~/types'
import { fetchGenres, fetchLanguages, fetchMovieCast, fetchMovieVideos, fetchWatchProviders } from '~/utils/api'
import MovieCard from '~/components/MovieCard'
import SearchForm from '~/components/SearchForm'
import Container from '~/components/Container'
import Logo from '~/components/Logo'
import Wrapper from '~/components/Wrapper'

function Home() {
  const [startYear, setStartYear] = useState<string>('')
  const [endYear, setEndYear] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [shownMovieIds, setShownMovieIds] = useState<Set<number>>(new Set())
  const [watchProviders, setWatchProviders] = useState<Record<number, WatchProviders>>({})
  const [languages, setLanguages] = useState<Language[]>([])
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [cast, setCast] = useState<CastMember[]>([])
  const [videos, setVideos] = useState<{ key: string }[]>([])
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchGenres().then(genresMap => setGenres(genresMap))
    fetchLanguages().then(languages => setLanguages(languages))
  }, [])

  useEffect(() => {
    if (searchResults.length > 0) {
      const movieId = searchResults[0]?.id

      if (movieId !== undefined) {
        fetchMovieCast(movieId).then((castData) => {
          setCast(castData?.filter(c => c.profile_path).slice(0, 12) || [])
        })

        fetchMovieVideos(movieId).then((videoData) => {
          const trailer = videoData.find((video: { type: string }) => video.type === 'Trailer')
          setVideos(trailer ? [trailer] : [])
        })

        fetch(`/api/movies/${movieId}/details`)
          .then(res => res.json())
          .then((data) => {
            setMovieDetails(data)
          })
          .catch(error => console.error('Failed to fetch movie details:', error))
      }
    }
  }, [searchResults])

  const searchMovies = async () => {
    if (!startYear.trim())
      return

    try {
      const query = `startYear=${startYear}${endYear ? `&endYear=${endYear}` : ''}&excludedIds=${[...shownMovieIds].join(',')}`
      const response = await fetch(`/api/movies/search-movies?${query}`)
      const data = await response.json()

      if (!shownMovieIds.has(data.id)) {
        setSearchResults([data])
        setShownMovieIds(new Set(shownMovieIds).add(data.id))
        const providers = await fetchWatchProviders(data.id)
        setWatchProviders({ ...watchProviders, [data.id]: providers })
      }
      else {
        searchMovies()
      }
    }
    catch (error) {
      console.error('Failed to search for movies:', error)
    }
  }

  const handleStartYearChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setStartYear(e.target.value)
  }

  const handleEndYearChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEndYear(e.target.value)
  }

  const handleSearch = async () => {
    await searchMovies()
  }

  const resetSearch = () => {
    setStartYear('')
    setEndYear('')
    setSearchResults([])
    setShownMovieIds(new Set())
    setWatchProviders({})
    setCast([])
    setVideos([])
    setMovieDetails(null)
    setErrorMessage('')
  }

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i)
  const endYearOptions = yearOptions.filter(year => Number(year) >= Number(startYear) || Number(endYear) === year)

  return (
    <Container>
      <Head>
        <title>Pick a Movie</title>
        <meta name="description" content="Get a randomized movie recommendation." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Logo />
        <SearchForm
          startYear={startYear}
          endYear={endYear}
          onSearch={handleSearch}
          onReset={resetSearch}
          onStartYearChange={handleStartYearChange}
          onEndYearChange={handleEndYearChange}
          yearOptions={yearOptions}
          endYearOptions={endYearOptions}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        {searchResults.map(result => (
          <MovieCard
            key={result.id}
            movie={result}
            movieDetails={movieDetails}
            watchProviders={watchProviders}
            languages={languages}
            genres={genres}
            cast={cast}
            videos={videos}
          />
        ))}
      </Wrapper>
    </Container>
  )
}

export default Home
