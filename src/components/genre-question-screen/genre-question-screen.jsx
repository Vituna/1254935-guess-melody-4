import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";
import {GameType} from "../const.js";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._getTrack = this._getTrack.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getTrack(answer, i) {
    const {renderPlayer, userAnswers, onChange} = this.props;
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
  }

  _renderTracks(answers) {
    return answers.map(this._getTrack);
  }

  _handleSubmit(evt) {
    const {onAnswer} = this.props;

    evt.preventDefault();
    onAnswer();
  }

  render() {
    const {question} = this.props;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleSubmit}
        >
          {this._renderTracks(answers)}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

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
