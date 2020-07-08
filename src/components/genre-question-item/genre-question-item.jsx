import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class GenreQuestionItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChande = this.handleChande.bind(this);
  }

  handleChande(evt) {
    const {id, onChange} = this.props;
    const value = evt.target.checked;

    onChange(id, value);
  }

  render() {
    const {answer, id, renderPlayer, userAnswer} = this.props;
    const answerId = `answer-${id}`;

    return (
      <div className="track">
        {renderPlayer(answer.src, id)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={answerId}
            id={answerId}
            checked={userAnswer}
            onChange={this.handleChande}
          />
          <label className="game__check" htmlFor={answerId}>Отметить</label>
        </div>
      </div>
    );
  }
}

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

