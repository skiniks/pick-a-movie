import type { WatchProvider } from '~/types'

export interface ProviderLogoProps {
  provider: WatchProvider
}

const ProviderLogo: React.FC<ProviderLogoProps> = ({ provider }) => {
  return (
    <div key={provider.id} className="flex items-center gap-2">
      <img
        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
        alt={provider.provider_name}
        className="w-12 h-12 rounded-xl mb-2"
      />
    </div>
  )
}

export default ProviderLogo
