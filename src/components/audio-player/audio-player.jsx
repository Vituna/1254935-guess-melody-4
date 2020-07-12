import React from "react";
import PropTypes from "prop-types";

const AudioPlayer = ({isLoading, isPlaying, onPlayButtonClick, children}) => {

  const classButtonDefinition = `track__button track__button--${isPlaying ? `pause` : `play`}`;

  return (
    <>
      <button
        className={classButtonDefinition}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        {children}
      </div>
      </>
  );

};

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default AudioPlayer;
