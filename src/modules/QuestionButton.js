import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionButton extends React.Component {

    handleClick(event) {
        if (!this.props.isEndStage) {
            this.props.callback(this.props.questionNumber, 0);
        }
    }

    render() {
        const answer = this.props.answer;
        const player = this.props.player;

        var arrowRightClass = "arrow-right-transparent";
        var arrowLeftClass = "arrow-left-transparent";
        var buttonClass = "question-button";

console.log(this.props);
        console.log("ANWSER ", answer, "CORRECT ", this.props.correctAnswer, "NUMBER ", this.props.questionNumber, "END ", this.props.isEndStage)

        if (answer === this.props.questionNumber && !this.props.isEndStage || this.props.isEndStage 
        && this.props.correctAnswer !== this.props.answer && answer === this.props.questionNumber) {
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
        } else if (this.props.correctAnswer === this.props.questionNumber && this.props.isEndStage) {
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
    isEndStage: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isEndStage: state.isEndStage,
        answer: state.questionAnswer,
        player: state.questionPlayer
    }
}

export default connect(mapStateToProps, null)(QuestionButton)