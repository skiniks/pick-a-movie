import ProviderLogo from './ProviderLogo'
import { ProviderCategory, WatchProvider } from '~/types'

export interface ProviderCategorySectionProps {
  category: ProviderCategory
  providers: WatchProvider[]
}

const ProviderCategorySection: React.FC<ProviderCategorySectionProps> = ({ category, providers }) => {
  return (
    <div>
      <p className="font-semibold">
        {category.charAt(0).toUpperCase() + category.slice(1)}
        :
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {providers.map((provider, index) => (
          <ProviderLogo key={`${provider.id}-${index}`} provider={provider} />
        ))}
      </div>
    </div>
  )
}

export default ProviderCategorySection
