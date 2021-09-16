import React from 'react';
import { Link } from 'react-router-dom';
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
      artist: '',
    };
    this.alteraName = this.alteraName.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
  }

  async getAlbums() {
    const { name } = this.state;
    this.setState({ loading: true, artist: name }); // defini artist com o valor de name, porque depois o input é limpado
    const disco = await searchAlbumsAPI(name); // parâmetro uma string, que deve ser o nome da banda ou artista
    this.setState({
      album: disco, //  O retorno dessa função, quando encontra as informações, é um array
      name: '',
      loading: false,
    });
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
    const { name, album, loading, artist } = this.state;
    // const { artistId, artistName, collectionId, collectionName,
    //   collectionPrice, artworkUrl100, releaseDate, trackCount } = album;

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
        {loading ? <Loading /> : ''}
        <p>
          {album.length === 0 ? 'Nenhum álbum foi encontrado' : ` Resultado de álbuns de:
          ${artist}`}
        </p>
        <section>
          {/* Código renderização do album inspirado no do Marcello Alves (T14A) */}
          {album.map(({ artistName, artworkUrl100, collectionName, collectionId }, k) => (
            <div key={ k }>
              <p>{artistName}</p>
              <img src={ artworkUrl100 } alt="Imagem do Álbum" />
              <p>{collectionName}</p>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Search;
