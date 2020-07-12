import React from "react";
import PropTypes from "prop-types";

const GenreQuestionItem = ({answer, id, renderPlayer, userAnswer, onChange}) => {
  const renderGenreQuestionItem = () => {

    const handleChande = (evt) => {
      const value = evt.target.checked;
      onChange(id, value);
    };

    const answerId = `answer-${id}`;

    return (
      <div className="track">
        {renderPlayer(answer.src, id)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={answerId}
            id={answerId}
            checked={userAnswer}
            onChange={handleChande}
          />
          <label className="game__check" htmlFor={answerId}>Отметить</label>
        </div>
      </div>
    );
  };

  return renderGenreQuestionItem();
};

GenreQuestionItem.propTypes = {
  answer: PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired,
};

export default GenreQuestionItem;
