interface SearchFormProps {
  startYear: string
  endYear: string
  onSearch: () => void
  onStartYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onEndYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  yearOptions: number[]
  endYearOptions: number[]
  onReset: () => void
  errorMessage: string
  setErrorMessage: (message: string) => void
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
  errorMessage,
  setErrorMessage,
}) => {
  const handleSearch = () => {
    if (!startYear) {
      setErrorMessage('Please select a start year.')
      return
    }

    setErrorMessage('')
    onSearch()
  }

  return (
    <div className="flex flex-col sm:flex-row mt-8">
      <div>
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
        {errorMessage && <div className="text-red-500 mt-1">{errorMessage}</div>}
      </div>

      <div className="mt-2 sm:mt-0 ml-0 sm:ml-4">
        <label htmlFor="endYear" className="sr-only">End Year</label>
        <select
          id="endYear"
          value={endYear}
          onChange={onEndYearChange}
          className="select select-primary w-full max-w-xs"
        >
          <option value="">Select End Year (optional)</option>
          {endYearOptions.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSearch} className="btn btn-active btn-primary ml-0 mt-2 sm:mt-0 sm:ml-4">
        Search Movies
      </button>

      <button onClick={onReset} className="btn btn-outline btn-secondary ml-0 mt-2 sm:mt-0 sm:ml-4">
        Reset
      </button>
    </div>
  )
}

export default SearchForm
