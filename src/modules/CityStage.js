import React from 'react';
import CountryImage from './CountryImage.js';
import { endRound } from './redux/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CityStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isYellow: false, top: 0, left: 100, imgW: 0, };
    }

    componentDidMount() {
        var img = new Image();
        img.onload = (e) => {
            this.setState({ imgW: e.target.width });
        }

        img.src = require('./img/pin_yellow.png');
    }

    handleMapClick(event) {
        if (!this.props.isEndStage) {
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

            if (red !== 0 && green !== 0 && blue !== 0 && !this.state.isYellow) {
                this.setState({ isYellow: true });
                this.setState({ top: event.nativeEvent.offsetY - img.width / 2 });
                this.setState({ left: event.nativeEvent.offsetX - img.height / 2 - this.state.imgW / 2 });
                this.endRound(0);
            }
        }
    }

    endRound(points) {
        const { dispatch } = this.props
        dispatch(endRound(points))
    }

    render() {
        const isYellow = this.state.isYellow;
        let yellowPin = null;

        if (isYellow) {
            var styles = { "alignSelf": "center", "zIndex": 1, position: "relative", top: this.state.top + "px", left: this.state.left + "px" }
            yellowPin = <img style={styles} alt="pin" src={require('./img/pin_yellow.png')} />
        }

        var countrySrc = './img/country/' + this.props.city.idCountry + '.png';

        return (<div id='country_img' className='image-container'>
            <CountryImage className='imgPointerCity' onMapClick={this.handleMapClick.bind(this)} id="map" src={countrySrc} />
            {yellowPin}
        </div>
        );
    }
};

CityStage.propTypes = {
    isEndStage: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isEndStage: state.isEndStage,
    }
}

export default connect(mapStateToProps)(CityStage)