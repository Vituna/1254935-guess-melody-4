import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends PureComponent {
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
      progress: audio.currentTime,
    });
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

  _handlePlayButtonClick() {
    const {onPlayButtonClick} = this.props;

    this.setState({isPlaying: !this.state.isPlaying});
    onPlayButtonClick();
  }

  render() {
    const {isLoading, isPlaying} = this.state;
    const classButtonDefinition = `track__button track__button--${isPlaying ? `pause` : `play`}`;

    return (
      <Fragment>
        <button
          className={classButtonDefinition}
          type="button"
          disabled={isLoading}
          onClick={this._handlePlayButtonClick}
        />
        <div className="track__status">
          <audio ref={this._audioRef}/>
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};
