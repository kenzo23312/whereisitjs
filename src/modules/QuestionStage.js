import React from 'react';
import QuestionButton from './QuestionButton.js'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { endRound, questionAnswer } from './redux/actions';

class QuestionStage extends React.Component {
    constructor(props) {
        super(props);

        this.answerQuestion = this.answerQuestion.bind(this);
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(questionAnswer(-1, -1, -1))
    }

    endRound(points) {
        const { dispatch } = this.props
        dispatch(endRound(points))

        this.showCorrectAnswer()
    }

    showCorrectAnswer() {
        setTimeout(() => {
            const { dispatch } = this.props
            dispatch(questionAnswer(this.props.answer, this.props.question.correct, this.props.player))
        }, 2000);
    }

    answerQuestion(questionNumber) {
        const { dispatch } = this.props
        dispatch(questionAnswer(questionNumber, -1, 0))

        var points = questionNumber === this.props.question.correct ? 50 : 0;
        this.endRound(points);
    }

    render() {
        return (
            <div className='questions'>
                <div className="question-label">{this.props.question.question}</div>
                <QuestionButton callback={this.answerQuestion} questionNumber={1} content={this.props.question.a} />
                <QuestionButton callback={this.answerQuestion} questionNumber={2} content={this.props.question.b} />
                <QuestionButton callback={this.answerQuestion} questionNumber={3} content={this.props.question.c} />
                <QuestionButton callback={this.answerQuestion} questionNumber={4} content={this.props.question.d} />
            </div>);
    }
};

QuestionStage.propTypes = {
    player: PropTypes.number.isRequired,
    answer: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        answer: state.questionAnswer,
        player: state.questionPlayer
    }
}

export default connect(mapStateToProps, null)(QuestionStage)