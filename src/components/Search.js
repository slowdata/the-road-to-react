import React, { Component } from "react";

class Search extends Component {
  componentDidMount() {
    this._input.focus();
  }
  render() {
    const { searchTerm, handleSearch, children, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        {children}
        <input
          ref={el => (this._input = el)}
          type="text"
          onChange={handleSearch}
          value={searchTerm}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

export default Search;
