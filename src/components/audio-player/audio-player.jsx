import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends PureComponent {

  render() {
    const {isLoading, isPlaying, onPlayButtonClick, children} = this.props;
    const classButtonDefinition = `track__button track__button--${isPlaying ? `pause` : `play`}`;

    return (
      <Fragment>
        <button
          className={classButtonDefinition}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          {children}
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
