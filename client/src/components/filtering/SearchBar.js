export const SearchBar = ({ setSearchTerm, setIsSearching }) => {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search...'
        className='search-bar__input'
        onChange={(event) => {
          setSearchTerm(event.target.value)
          setIsSearching(true)
        }}
      />
    </div>
  )
}
