interface SearchFormProps {
  startYear: string
  endYear: string
  onSearch: () => void
  onStartYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onEndYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  yearOptions: number[]
  endYearOptions: number[]
  onReset: () => void
}

const SearchForm: React.FC<SearchFormProps> = ({
  startYear,
  endYear,
  onSearch,
  onStartYearChange,
  onEndYearChange,
  yearOptions,
  endYearOptions,
  onReset,
}) => {
  return (
    <div className="flex flex-col sm:flex-row mt-8">
      <label htmlFor="startYear" className="sr-only">Start Year</label>
      <select
        id="startYear"
        value={startYear}
        onChange={onStartYearChange}
        className="select select-primary w-full max-w-xs"
      >
        <option value="">Select Start Year</option>
        {yearOptions.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label htmlFor="endYear" className="sr-only">End Year</label>
      <select
        id="endYear"
        value={endYear}
        onChange={onEndYearChange}
        className="select select-primary w-full max-w-xs mt-2 sm:mt-0 ml-0 sm:ml-4"
      >
        <option value="">Select End Year (optional)</option>
        {endYearOptions.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <button onClick={onSearch} className="btn btn-active btn-primary ml-0 mt-2 sm:mt-0 sm:ml-4">
        Search Movies
      </button>

      <button onClick={onReset} className="btn btn-outline btn-secondary ml-0 mt-2 sm:mt-0 sm:ml-4">
        Reset
      </button>
    </div>
  )
}

export default SearchForm
