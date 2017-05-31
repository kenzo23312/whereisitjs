import React from 'react';
import { withRouter } from 'react-router-dom';

class CloseButton extends React.Component {
    render() {
        return (
            <div className='closeButton' onClick={() => { this.props.history.goBack() }}>
                <div className='centerElementR'>
                    <img className='imgClose' alt="close" src={require('./img/icon_close.png')} />
                </div>
            </div>);
    }
};

export default withRouter(CloseButton);