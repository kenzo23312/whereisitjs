import React from 'react';

module.exports = class CountryStage extends React.Component {
    render() { 
        return  <img className={this.props.className} alt="map" onClick={this.props.onMapClick} id={this.props.id} src={require(this.props.src)} />;
    }
};