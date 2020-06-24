import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {GameType} from "../const.js";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };
  }

  _handleFormSubmit(onAnswer, question) {
    return (evt) => {
      evt.preventDefault();
      onAnswer(question, this.state.answers);
    };
  }

  _handleAnswerChange(userAnswers, i) {
    return (evt) => {
      const value = evt.target.checked;
      this.setState({
        answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
      });
    };
  }

  _getTrack(answer, i, userAnswers, renderPlayer) {
    const idName = `answer-${i}`;
    const nameKey = `${answer.src}-${i}`;

    return (
      <div key={nameKey} className="track">
        {renderPlayer(answer.src, i)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={idName} id={idName}
            checked={userAnswers[i]}
            onChange={this._handleAnswerChange(userAnswers, i)}
          />
          <label className="game__check" htmlFor={idName}>Отметить</label>
        </div>
      </div>
    );
  }

  _renderTracks(answers, userAnswers, renderPlayer) {
    return answers.map((answer, i) => this._getTrack(answer, i, userAnswers, renderPlayer));
  }

  render() {
    const {onAnswer, question, renderPlayer} = this.props;
    const {answers: userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={this._handleFormSubmit(onAnswer, question)}>
          {this._renderTracks(answers, userAnswers, renderPlayer)}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
