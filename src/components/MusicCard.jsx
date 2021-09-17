import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.alteraName = this.alteraName.bind(this);
    this.add = this.add.bind(this);
  }

  async add() {
    this.state = {
      loading: true,
    };
    await addSong();
    this.state = {
      loading: false,
    };
  }

  alteraName({ target }) {
    const { checked } = target;
    const { music } = this.props;
    if (checked) return this.add(music);
  }

  render() {
    const { music } = this.props;
    const { loading } = this.state;
    const { trackName, previewUrl, trackId } = music;
    return (
      <section>
        {loading ? <Loading /> : ''}
        <div>
          {trackName}
        </div>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.alteraName }
        />
      </section>

    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
