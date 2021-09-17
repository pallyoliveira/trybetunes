import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artist: '',
      album: '',
    };
    this.getMusic = this.getMusic.bind(this);
  }

  componentDidMount() {
    this.getMusic();
  }

  async getMusic() {
    // this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      musics: music.slice(1), // agora o que está dentro do array é apenas os obj com as faixas, tirando o elemento 0 (primeiro)
      artist: music[0].artistName,
      album: music[0].collectionName,
    });
  }

  render() {
    const { musics, album, artist } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{album}</h2>
        <h2 data-testid="artist-name">{artist}</h2>
        <div>
          {musics.map((musica) => (
            <MusicCard music={ musica } key={ musica.trackId } />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ // shape: forma que o paranue vai ter
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
