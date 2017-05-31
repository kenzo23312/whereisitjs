import React from 'react';

module.exports = class CountryStage extends React.Component {
    constructor(props) {
        super(props); 
    } 
    render() { 
        return  <img className='imgPointer' alt="map" onClick={this.props.onMapClick} id={this.props.id} src={require(this.props.src)} />;
    }
};