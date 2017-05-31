import React from 'react';
import fetch from 'isomorphic-fetch'
import CountryImage from './CountryImage.js';

module.exports = class CountryStage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isYellow: false, yellowPath: '' };
    }

    handleMapClick(event) {
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
        console.log('width');
        this.fetchCountry(red, green, blue);
        if (red === 225 && green === 223 && blue === 223) {
            //this.addYellowImage('./img/27_y.png');
        }
    }

    addYellowImage(path) {
        console.log('width');
        this.setState({ isYellow: true });
        this.setState({ yellowPath: path });
        // var root = document.getElementById('country_img')
        // root.appendChild(<img className='imgPointerYellow' onClick={this.handleClick} id='map' alt="map" src={require(path)} />);


        // this.setState(this.state.concat([id='yellow', src='./img/27_y.png']));

    }

    fetchCountry(r, g, b) {
        let data = { 
            idContinent: 1
        }

let bodyStr = "idContinent=1&" + "r=" + r + "&g=" + g + "&b=" + b;
        console.log(JSON.stringify(data))

        fetch('https://aqueous-shore-73080.herokuapp.com/countries/rgb', {
            method: 'POST',
            body: bodyStr,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
            .then(function (response) {
                console.log("Response", response);
                return response.json();
            })
            .then(function (result) {
                console.log("Response", result[0].id);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    render() {
        const isYellow = this.state.isYellow;
        let yellowCountry = null;

        if (isYellow) {
            yellowCountry = <CountryImage src={this.state.yellowPath} />
        }

        return (<div id='country_img' className='image-container'>
            <CountryImage onMapClick={this.handleMapClick.bind(this)} id="map" src='./img/europe.png' />
            {yellowCountry}
        </div>
        );
    }
};