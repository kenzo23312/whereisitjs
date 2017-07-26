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
        dispatch(questionAnswer(-1, -1))
    }

    endRound(points) {
        const { dispatch } = this.props
        dispatch(endRound(points)) 
    } 

    answerQuestion(questionNumber) {
        const { dispatch } = this.props
        dispatch(questionAnswer(questionNumber, 0))

        var points = questionNumber === this.props.question.correct ? 50 : 0;
        this.endRound(points);
    }

    render() {
        return (
            <div className='questions'>
                <div className="question-label">{this.props.question.question}</div>
                <QuestionButton callback={this.answerQuestion} correctAnswer={this.props.question.correct} questionNumber={1} content={this.props.question.a} />
                <QuestionButton callback={this.answerQuestion} correctAnswer={this.props.question.correct} questionNumber={2} content={this.props.question.b} />
                <QuestionButton callback={this.answerQuestion} correctAnswer={this.props.question.correct} questionNumber={3} content={this.props.question.c} />
                <QuestionButton callback={this.answerQuestion} correctAnswer={this.props.question.correct} questionNumber={4} content={this.props.question.d} />
            </div>);
    }
};

QuestionStage.propTypes = {
    player: PropTypes.number.isRequired,
    answer: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return { 
        answer: state.questionAnswer,
        player: state.questionPlayer
    }
}

export default connect(mapStateToProps, null)(QuestionStage)