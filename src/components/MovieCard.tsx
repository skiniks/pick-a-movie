import React from 'react'
import type { CastMember, Language, Movie, MovieDetails, ProviderCategory, WatchProviders } from '~/types'
import { getGenreNames, getLanguageName } from '~/utils/helpers'
import ProviderCategorySection from '~/components/ProviderCategorySection'

interface MovieCardProps {
  movie: Movie
  movieDetails: MovieDetails | null
  watchProviders: Record<number, WatchProviders>
  languages: Language[]
  genres: Record<number, string>
  cast: CastMember[]
  videos: { key: string }[]
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, movieDetails, watchProviders, languages, genres, cast, videos }) => {
  const renderProviderSection = (countryProviders: WatchProviders[string]) => {
    const categories = ['flatrate', 'rent', 'buy', 'ads']
    return categories.map((category) => {
      const providers = countryProviders[category as keyof typeof countryProviders]
      return Array.isArray(providers) && <ProviderCategorySection key={category} category={category as ProviderCategory} providers={providers} />
    })
  }

  const renderCast = () => {
    return cast.map((castMember, index) => (
      <div key={index} className="mb-2">
        <span className="bg-gray-200 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
          {castMember.name}
        </span>
      </div>
    ))
  }

  const renderVideo = () => {
    const video = videos.find(video => video.key)
    if (!video)
      return null

    const videoSrc = `https://www.youtube.com/embed/${video.key}`

    return (
      <div className="video-container mt-4" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src={videoSrc}
          title="Movie Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  const getStarRating = (voteAverage: number) => {
    const rating = (voteAverage / 10) * 5; // Convert vote average to a 5-star scale
    return Math.round(rating * 2) / 2; // Round to nearest half
  }

  const renderStarRating = () => {
    const starRating = movieDetails ? getStarRating(movieDetails.vote_average) : 0;
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 >= 0.5;
    const totalHalves = 10;

    return (
      <div className="rating rating-lg rating-half">
        {[...Array(totalHalves)].map((_, index) => {
          const isFullStar = index < fullStars * 2;
          const isHalfStar = index === fullStars * 2 && hasHalfStar;
          const isChecked = isFullStar || isHalfStar;

          return (
            <input
              key={index}
              type="radio"
              name="rating-10"
              className={`bg-yellow-500 mask mask-star-2 ${index % 2 === 0 ? 'mask-half-1' : 'mask-half-2'}`}
              checked={isChecked}
              readOnly
              disabled
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative mt-8 mb-4">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-2xl p-6"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
      </div>
      <div className="relative flex md:flex-row flex-col bg-black bg-opacity-75 p-2 sm:p-8 rounded-2xl shadow-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="sm:w-64 sm:h-96 mb-4 sm:mb-0 object-cover rounded-xl shadow-lg"
        />
        <div className="ml-4">
          <h4 className="text-5xl text-gray-100 font-semibold pb-2 hidden sm:block">{movie.title}</h4>
          <div className="flex flex-wrap gap-2 my-2">
            <span className="bg-blue-500 text-white rounded-full px-4 py-1">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
            <span className="bg-green-500 text-white rounded-full px-4 py-1">
              {getLanguageName(languages, movie.original_language)}
            </span>

            {movieDetails && (
              <>
                <span className="bg-accent text-white rounded-full px-4 py-1">
                  {movieDetails.runtime}
                  {' '}
                  minutes
                </span>
              </>
            )}

            {getGenreNames(genres, movie.genre_ids).map((genreName, genreIndex) => (
              <span key={genreIndex} className="bg-indigo-500 text-white rounded-full px-4 py-1">
                {genreName}
              </span>
            ))}
          </div>

          {movieDetails && (
            <>
              {movieDetails && renderStarRating()}
            </>
          )}

          <p className="text-xl text-gray-100 pt-2 pb-2">{movie.overview}</p>

          <div className="flex flex-wrap mt-2">
            {renderCast()}
          </div>

          {renderVideo()}

          <div className="mt-4">
            {['US', 'CA'].map((countryCode) => {
              const countryProviders = watchProviders[movie.id]?.[countryCode]
              if (!countryProviders)
                return null
              return (
                <div key={countryCode} className="collapse collapse-plus bg-base-200 bg-opacity-80 p-2 mb-2">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    {countryCode === 'US' ? '🇺🇸 US Providers' : '🇨🇦 CA Providers'}
                  </div>
                  <div className="collapse-content">
                    {renderProviderSection(countryProviders)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
