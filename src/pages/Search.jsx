import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.alteraName = this.alteraName.bind(this);
  }

  alteraName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  render() {
    const MIN_LENGTH = 2;
    const { name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          value={ name }
          onChange={ this.alteraName }
          data-testid="search-artist-input"
        />
        <button
          type="submit"
          // Será validado se o botão está habilitado somente se o input de nome tiver 2 ou mais caracteres
          disabled={ name.length < MIN_LENGTH }
          data-testid="search-artist-button"
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
