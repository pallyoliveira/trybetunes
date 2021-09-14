import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <input type="text" data-testid="search-artist-input" />
        <button type="submit" data-testid="search-artist-button">Pesquisar</button>
      </div>
    );
  }
}

export default Search;
