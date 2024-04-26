const Search = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-box"
    />
  );
};

export default Search;
