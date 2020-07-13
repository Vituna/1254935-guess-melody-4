import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer.js";

const WinScreen = ({questions, mistakes, resetGame}) => {

  const questionsCount = questions.length;
  const mistakesCount = mistakes;
  const onReplayButtonClick = resetGame;

  const correctlyQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button
        className="replay"
        type="button"
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </button>
    </section>
  );
};

WinScreen.propTypes = {
  questions: PropTypes.array,
  mistakes: PropTypes.number,
  resetGame: PropTypes.func,
};

const mapStateToProps = (state) => ({
  mistakes: state.mistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {WinScreen};
export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);
