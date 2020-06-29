import React from "react";
import PropTypes from "prop-types";

import {GameType} from "../const.js";

const ArtistQuestionScreen = ({onAnswer, question, renderPlayer}) => {
  const {answers, song} = question;

  const handleAnswerChange = (answer) => {
    return (evt) => {
      evt.preventDefault();
      onAnswer(question, answer);
    };
  };

  const getArtist = (answer, i) => {
    const idName = `answer-${i}`;

    return (
      <div key={answer.artist} className="artist">
        <input className="artist__input visually-hidden" type="radio" name="answer" value={idName} id={idName}
          onChange={handleAnswerChange(answer)}
        />
        <label className="artist__name" htmlFor={idName}>
          <img className="artist__picture" src={answer.picture} alt={answer.artist} />
          {answer.artist}
        </label>
      </div>
    );
  };

  const renderArtists = () => answers.map(getArtist);

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 0)}
        </div>
      </div>
      <form className="game__artist">
        {renderArtists()}
      </form>
    </section>
  );

};

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
