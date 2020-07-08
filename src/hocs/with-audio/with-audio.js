import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      if (audio) {
        audio.src = src;

        audio.oncanplaythrough = () => this._handleCanPlayThrough();
        audio.onplay = () => this._handlePlay();
        audio.onpause = () => this._handlePause();
        audio.ontimeupdate = () => this._handleTimeUpdale();
      }
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (audio) {
        if (this.state.isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      if (audio) {
        audio.oncanplaythrough = null;
        audio.onplay = null;
        audio.onpause = null;
        audio.ontimeupdate = null;
        audio.src = ``;
      }
    }

    _handleCanPlayThrough() {
      this.setState({
        isLoading: false,
      });
    }

    _handlePlay() {
      this.setState({
        isPlaying: true,
      });
    }

    _handlePause() {
      this.setState({
        isPlaying: false,
      });
    }

    _handleTimeUpdale() {
      const audio = this._audioRef.current;

      this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    _handlePlayButtonClick() {
      const {onPlayButtonClick} = this.props;

      this.setState({isPlaying: !this.state.isPlaying});

      onPlayButtonClick();
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayButtonClick={this._handlePlayButtonClick}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
      );
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};

export default withAudio;
