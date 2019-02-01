import React, { Component } from "react";
import "./App.css";

import Search from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";

// API parameters
const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "100";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}0&${PARAM_HPP}${DEFAULT_HPP}`;

// const list = [
//   {
//     title: "React",
//     url: "https:/reactjs.org",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//   },
//   {
//     title: "Redux",
//     url: "https:/redux.js.org",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//   }
// ];

class App extends Component {
  state = {
    results: null,
    searchKey: "",
    searchTerm: DEFAULT_QUERY,
    error: null
  };

  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm];
  };

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];

    // this.setState({ result: { ...result, hits: updatedHits } });
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }));
  };

  onDismiss = ID => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== ID;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  };

  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  onSearchSubmit = e => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    e.preventDefault();
  };

  render() {
    const { results, searchTerm, searchKey } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTerm={searchTerm}
            handleSearch={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table result={list} onDismiss={this.onDismiss} />
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
