import React from 'react';
import { connect } from 'react-redux';
import Timer from './Timer.js';
import CountryStage from './CountryStage.js' ;
import CityStage from './CityStage.js';
import QuestionStage from './QuestionStage.js';
import CloseButton from './CloseButton.js';

class Game extends React.Component {
    constructor(props) {
        super(props)
    }

    currentStage(stage) {
        console.log("currec", stage);
        switch (stage) {
            case 0:
                return <CountryStage />;
            case 1:
                return <CountryStage />;
            case 2:
                return <CountryStage />;
            default:
                return <div>empty</div>;
        }
    }

    render() {
        return (
            <div className="square">
                <div className="content">
                    <div className='navigationBar'>
                        <CloseButton/>
                        <div className='centerElement'>
                            <span className='navigationTitle'>Where is Poland</span>
                            </div>
                    </div>
                    <div className='navigationLine'></div>
                    
                    <div className='questionBody'>{this.currentStage(this.props.stage)}</div>
                    
                    <div className='points'><Timer /></div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    console.log("Stage aaaa: ", state.stage);
    return {
        stage: state.stage
    }
}

export default connect(mapStateToProps, null)(Game);