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

  _getTrack(answer, i, userAnswers) {
    const idName = `answer-${i}`;
    const nameKey = `${answer.src}-${i}`;

    const answerChange = (evt) => {
      const value = evt.target.checked;
      this.setState({
        answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
      });
    };

    return (
      <div key={nameKey} className="track">
        <button className="track__button track__button--play" type="button"></button>
        <div className="track__status">
          <audio src={answer.src} />
        </div>
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={idName} id={idName}
            checked={userAnswers[i]}
            onChange={answerChange}
          />
          <label className="game__check" htmlFor={idName}>Отметить</label>
        </div>
      </div>
    );
  }

  _renderTracks(answers, userAnswers) {
    return answers.map((answer, i) => this._getTrack(answer, i, userAnswers));
  }

  render() {
    const {onAnswer, question} = this.props;
    const {answers: userAnswers} = this.state;
    const {
      answers,
      genre,
    } = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780" />
          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>
        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks" onSubmit={this._handleFormSubmit(onAnswer, question)}>
            {this._renderTracks(answers, userAnswers)}
            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
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
};

export default GenreQuestionScreen;
