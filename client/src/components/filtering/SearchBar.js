export const SearchBar = ({ searchTerm, setSearchTerm, setIsSearching }) => {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search...'
        className='search-bar__input'
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
