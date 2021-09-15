import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      album: [],
      name: '',
    };
    this.alteraName = this.alteraName.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
  }

  async getAlbums() {
    this.setState({ loading: true });
    const { name } = this.state;
    const disco = await searchAlbumsAPI(name); // parâmetro uma string, que deve ser o nome da banda ou artista
    console.log(name);
    this.setState({
      album: disco, //  O retorno dessa função, quando encontra as informações, é um array
      name: '',
      loading: false,
    });
    console.log(disco);
  }

  // input
  alteraName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  render() {
    const MIN_LENGTH = 2;
    const { name, album, loading } = this.state;
    //   const { artistId, artistName, collectionId, collectionName, collectionPrice, artworkUrl100, releaseDate, trackCount } = album;
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
          data-testid="search-artist-button"
          disabled={ name.length < MIN_LENGTH }
          onClick={ this.getAlbums }
        >
          Pesquisar
        </button>
        {loading ? <Loading /> : '' }
      </div>
    );
  }
}

export default Search;
