import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer.js';
import CountryStage from './CountryStage.js';
import CityStage from './CityStage.js';
import { Round } from './game/Round.js';
import { Country } from './game/Country.js';
import { City } from './game/City.js';
import { Question } from './game/Question.js';
import QuestionStage from './QuestionStage.js';
import CloseButton from './CloseButton.js';

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = { rounds: new Array(9) }
    }

    componentWillMount() {
        if (this.props.countries.length === 0) {
            this.props.history.push("/")
        }

        if (this.props.countries.length > 0) {
            this.generateGame()
        }
    }

    generateGame() {
        let a = this.state.rounds.slice();
        var countries = this.props.countries.slice();

        for (var i = 0; i < 3; i++) {
            var index = i * 3;

            var random = Math.floor(Math.random() * countries.length);
            var country = countries[random]
            countries.splice(random, 1)
            a[index] = new Round(new Country(country.id, country.name, country.r, country.g, country.b), null, null);

            var cities = country.cities.slice()
            random = Math.floor(Math.random() * cities.length);
            var city = cities[random]
            a[index + 1] = new Round(null, new City(city.idCountry, city.name, city.latitude, city.longitude), null);

            var questions = country.questions.slice()
            random = Math.floor(Math.random() * questions.length);
            var question = questions[random]

            a[index + 2] = new Round(null, null, new Question(question.question, question.answerA, question.answerB, question.answerC, question.answerD, question.correctAnswer));
        }

        this.setState({ rounds: a });
    }

    currentStage(stage) {
        switch (stage % 3) {
            case 0:
                return <CountryStage country={this.state.rounds[stage].country} />;
            case 1:
                return <CityStage city={this.state.rounds[stage].city} />;
            case 2:
                return <QuestionStage question={this.state.rounds[stage].question} />;
            default:
                return <CountryStage />;
        }
    }

    render() {
        const currentRound = this.state.rounds[this.props.stage];

        var question = "";
        if (currentRound) {
            question = currentRound.title();
        }

        return (
            <div className="square">
                <div className="content">
                    <div className='navigationBar'>
                        <CloseButton />
                        <div className='centerElement'>
                            <span className='navigationTitle'>{question}</span>
                        </div>
                    </div>
                    <div className='navigationLine'></div>

                    <div className='questionBody'>{this.currentStage(this.props.stage)}</div>

                    <div className='points'>{this.props.points}<Timer /></div>
                </div>
            </div>
        )
    }
};

Game.propTypes = {
    countries: PropTypes.array.isRequired,
    points: PropTypes.number.isRequired,
    stage: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    return {
        stage: state.stage,
        countries: state.items,
        points: state.points,
    }
}

export default connect(mapStateToProps, null)(Game);