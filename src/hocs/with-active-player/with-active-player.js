import React, {PureComponent} from 'react';

import Player from "../../components/audio-player/audio-player.jsx";
import withAudio from "../with-audio/with-audio.js";

const AudioPlayer = withAudio(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    _handlePlayButtonClick(id) {
      const {activePlayerId} = this.state;

      return () => {
        this.setState({
          activePlayerId: activePlayerId === id ? -1 : id
        });
      };
    }

    _getAudioPlayer(src, id) {
      const {activePlayerId} = this.state;
      return (
        <AudioPlayer
          src={src}
          isPlaying={id === activePlayerId}
          onPlayButtonClick={this._handlePlayButtonClick(id)}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => this._getAudioPlayer(src, id)}
        />
      );
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
