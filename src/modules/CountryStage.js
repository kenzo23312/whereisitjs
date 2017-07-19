import React from 'react'; 
import { requestCountries } from './redux/actions';
import CountryImage from './CountryImage.js';
import PropTypes from 'prop-types';
import { endRound } from './redux/actions';
import { connect } from 'react-redux';

class CountryStage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isYellow: false, yellowPath: '', items: [] };
    }

     componentDidMount() {
        const { dispatch } = this.props
        dispatch(requestCountries)
    }

    handleMapClick(event) {
        if(this.state.isYellow) {
            return;
        }

        var img = document.getElementById('map');
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, img.width, img.height);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var index = (event.nativeEvent.offsetY * imageData.width + event.nativeEvent.offsetX) * 4;
        var red = imageData.data[index];
        var green = imageData.data[index + 1];
        var blue = imageData.data[index + 2];
        
        this.checkCountry(red, green, blue);
    }

    addYellowImage(path) { 
        this.setState({ isYellow: true });
        this.setState({ yellowPath: path }); 
    }

    endRound(points) {
        const { dispatch } = this.props;
        dispatch(endRound(points));
    } 

    checkCountry(r, g, b) { 
        const country = this.props.country;
        const countries = this.props.countries;

        for(var i = 0; i < countries.length; i++) {
            if(r === countries[i].r && g === countries[i].g && b === countries[i].b) {
                this.addYellowImage("./img/map/yellow/" + countries[i].id + "_y.png");
                break;
            }
        }
 
        if(r === country.r && g === country.g && b === country.b) {
            this.endRound(50);
        } else {
            this.endRound(0);
        }
    }

    render() {
        const isYellow = this.state.isYellow;
        const isEndStage = this.props.isEndStage;
        let yellowCountry = null;
        let correctCountry = null;

        if (isYellow) {
            yellowCountry = <CountryImage className='imgPointerYellow' src={this.state.yellowPath} />
        }

        if (isEndStage) {
            correctCountry = <CountryImage className='imgCorrect' src={"./img/map/green/" + this.props.country.id + "_g.png"} />
        }

        return (<div id='country_img' className='image-container'>
            <CountryImage className='imgPointer' onMapClick={this.handleMapClick.bind(this)} id="map" src='./img/europe.png' />
            {yellowCountry}
            {correctCountry}
        </div>
        );
    }
}; 

CountryStage.propTypes = {
    countries: PropTypes.array.isRequired,
    isEndStage: PropTypes.bool.isRequired,
    
};

function mapStateToProps(state) { 
    return {
        isEndStage: state.isEndStage,
        countries: state.items
    }
}

export default connect(mapStateToProps)(CountryStage)