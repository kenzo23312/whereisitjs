import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

module.exports = class Menu extends React.Component {
    render() {
        return (
            <div>
                <RaisedButton>
                    <Link to='/game'>Start game</Link>
                </RaisedButton>
            </div>);
    }
};