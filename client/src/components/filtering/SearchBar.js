import './Filtering.css'

export const SearchBar = ({ searchTerm, setSearchTerm, setIsSearching }) => {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search...'
        id='search-bar__input'
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value)
          if (!!setIsSearching) {
            setIsSearching(true)
          }
        }}
      />
    </div>
  )
}
