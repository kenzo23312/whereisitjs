import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionButton extends React.Component {

    handleClick(event) {
        if (this.props.answer === -1) {
            this.props.callback(this.props.questionNumber, 0);
        }
    }

    render() {
        const answer = this.props.answer;
        const player = this.props.player;
        const correct = this.props.correct;

        var arrowRightClass = "arrow-right-transparent";
        var arrowLeftClass = "arrow-left-transparent";
        var buttonClass = "question-button";

        console.log(correct, answer);
        if (answer === this.props.questionNumber && correct !== this.props.questionNumber) {
            if (player === 0) {
                buttonClass = "question-button-player";
                arrowRightClass = "arrow-right"
            } else if (player === 1) {
                arrowLeftClass = "arrow-left"
                buttonClass = "question-button-bot";
            } else {
                arrowLeftClass = "arrow-left"
                arrowRightClass = "arrow-right"
                buttonClass = "question-button-both";
            }
        } else if (correct === this.props.questionNumber) {
            buttonClass = "question-button-correct";

            if (answer === this.props.questionNumber) {
                if (player === 0) {
                    arrowRightClass = "arrow-right"
                } else if (player === 1) {
                    arrowLeftClass = "arrow-left"
                } else {
                    arrowLeftClass = "arrow-left"
                    arrowRightClass = "arrow-right"
                }
            }
        }

        return (
            <div className={buttonClass} onClick={() => { this.handleClick() }}>
                <div className={arrowRightClass} />
                <div className="question-content"> {this.props.content}</div>
                <div className={arrowLeftClass} />
            </div>);
    }
};

QuestionButton.propTypes = {
    callback: PropTypes.func,
    player: PropTypes.number.isRequired,
    answer: PropTypes.number.isRequired,
    correct: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        correct: state.questionCorrect,
        answer: state.questionAnswer,
        player: state.questionPlayer
    }
}

export default connect(mapStateToProps, null)(QuestionButton)