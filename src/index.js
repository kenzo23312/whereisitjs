import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import './timer.css';
import { Provider } from 'react-redux'
import Menu from './modules/Menu.js';
import Game from './modules/Game.js';
import configureStore from './modules/configureStore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore()

const Main = () => (
    <div>
        <main>
            <Switch>
                <Route exact path='/' component={Menu} />

            </Switch>
        </main>
    </div>
)

const GameBoard = () => (
    <div>
        <main>
            <Switch>
                <Route path='/game' component={Game} />
            </Switch>
        </main>
    </div>
)

const App = () => (
    <MuiThemeProvider>
        <div>
            <div>
                <Main />
                <GameBoard />
            </div>
        </div>
    </MuiThemeProvider>
)

injectTapEventPlugin()

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));

