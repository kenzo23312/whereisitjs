import React from 'react';
import { connect } from 'react-redux';
import nextStage from './redux/actions';
import CircularProgressbar from 'react-circular-progressbar';

class Timer extends React.Component {
    constructor(props) {
        super(props)

        var progress = 10;
        this.state = { progressMax: progress, count: progress, stage: 0, progress: 0 }
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    tick() {
        if (this.state.count > 0 && this.state.count <= this.state.progressMax) {
            this.setState({ count: (this.state.count - 1) });
            this.setState({ progress: (100 / this.state.progressMax) * (this.state.progressMax - this.state.count) });
        } else if (this.state.count === 0) {
            if (this.state.stage === 2) {
                this.setState({ stage: 0 });
            } else {
                this.setState({ progress: (0) });
                this.setState({ stage: (this.state.stage + 1) });
            }

            this.setState({ count: this.state.progressMax });
            this.props.nextStage(this.state.stage);
        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        nextStage: stage => dispatch(nextStage(stage))
    }
};

export default connect(null, mapDispatchToProps)(Timer);