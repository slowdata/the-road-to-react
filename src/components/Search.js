import React from "react";

const Search = ({ searchTerm, handleSearch, children, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {children}
    <input type="text" onChange={handleSearch} value={searchTerm} />
    <button type="submit">{children}</button>
  </form>
);

export default Search;
