import React from "react";
import PropTypes from "prop-types";

import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";
import {GameType} from "../const.js";

const GenreQuestionScreen = ({renderPlayer, userAnswers, onChange, onAnswer, question}) => {

  const renderGenreQuestionScreen = () => {

    const getTrack = (answer, i) => {
      const key = `${i}-${answer.src}`;

      return (
        <GenreQuestionItem
          answer={answer}
          id={i}
          key={key}
          onChange={onChange}
          renderPlayer={renderPlayer}
          userAnswer={userAnswers[i]}
        />
      );
    };

    const renderTracks = (answers) => {
      return answers.map(getTrack);
    };

    const handleSubmit = (evt) => {
      evt.preventDefault();
      onAnswer();
    };

    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={handleSubmit}
        >
          {renderTracks(answers)}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  };

  return renderGenreQuestionScreen();
};

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};


export default GenreQuestionScreen;
