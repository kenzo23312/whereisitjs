import React from 'react';
import { connect } from 'react-redux';
import { nextStage, endStage } from './redux/actions';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';

const BREAK = 3;
const ROUND_TIME = 10;

class Timer extends React.Component {
    constructor(props) {
        super(props)

        this.state = { count: ROUND_TIME, progress: 0 }
        this.nextStageTick = this.nextStageTick.bind(this);
        this.startNextStage = this.startNextStage.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    tick() {
        if (this.state.count > 0 && this.state.count <= ROUND_TIME && !this.props.isEndRound) {
            this.setState({ count: (this.state.count - 1) });
            this.setState({ progress: (100 / ROUND_TIME) * (ROUND_TIME - this.state.count) });
        } else if (this.props.isEndRound || this.state.count === 0) {
            this.clearStageTimer();
            this.startNextStage();
        }
    }

    clearStageTimer() {
        this.stopTimer();
        this.setState({ progress: 0 });
        this.setState({ count: BREAK });
    }

    nextStageTick() {
        if (this.state.count > 0 && this.state.count <= BREAK) {
            this.setState({ count: (this.state.count - 1) });
            this.setState({ progress: (100 / 3) * (3 - this.state.count) });
        } else if (this.state.count === 0) {
            this.setState({ count: ROUND_TIME });
            this.setState({ progress: 0 });
            this.stopTimer();
            this.startTimer();

            const { dispatch } = this.props
            dispatch(nextStage(this.props.stage + 1));
            dispatch(endStage(false))
        }
    }

    startNextStage() { 
        setTimeout(() => {
            const { dispatch } = this.props
            dispatch(endStage(true))
        }, 2000);

        this.timer = setInterval(this.nextStageTick.bind(this), 1000)
    }

    startTimer() {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div>
                <div className='centerElement'>
                    <div className='timerBg' />
                </div>
                <div className='centerElement'>
                    <CircularProgressbar percentage={this.state.progress} textForPercentage={(pct) => `${this.state.count}`} />
                </div>
            </div>
        )
    }
}


Timer.propTypes = {
    isEndRound: PropTypes.bool.isRequired,
    stage: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isEndRound: state.isEndRound,
        stage: state.stage,
    }
}

export default connect(mapStateToProps)(Timer);