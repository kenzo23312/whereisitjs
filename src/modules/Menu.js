import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCountriesByContinent, requestCountries } from './redux/actions';
import RaisedButton from 'material-ui/RaisedButton';
class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.handleStart = this.handleStart.bind(this)
        this.handleLocal = this.handleLocal.bind(this)
    }

    handleStart(e) {
        e.preventDefault()

        const { dispatch } = this.props

        if (!this.props.isFetching) {
            this.props.history.push("/game")
        } else {
            dispatch(fetchCountriesByContinent())
        }
    }

    handleLocal(e) {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(requestCountries())
    }


    render() {
        const { isFetching, countries } = this.props;
        var fetching = "fetching";
        if (!isFetching) {
            fetching = "fetched " + countries.length;
        }

        return (
            <div>
                <ul>
                    <li><RaisedButton label="start game" onClick={this.handleStart}>
                        {/*<Link to='/game'>Start game</Link>*/}
                    </RaisedButton>
                    </li>
                    <li><RaisedButton label="load local countries" onClick={this.handleLocal}>
                        {/*<Link to='/game'>Start game</Link>*/}
                    </RaisedButton>
                    </li>
                    <li>{fetching}</li>
                </ul>
            </div>);
    }
};

Menu.propTypes = {
    countries: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) { 
    return {
        countries: state.items,
        isFetching: state.isFetching,
    }
}

export default connect(mapStateToProps)(Menu)