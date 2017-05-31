import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

module.exports = class CountryStage extends React.Component {
    render() {
        return (
        <div className='center'>
            <div className='questionButtons'>
                <RaisedButton className='button'>Question</RaisedButton>
                <RaisedButton className='button'>Question</RaisedButton>
                <RaisedButton className='button'>Question</RaisedButton>
<RaisedButton className='button'>Question</RaisedButton>
            </div>
        </div>);
    }
};