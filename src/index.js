import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import './timer.css';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import whereisitApp from './modules/redux/reducers'
import Menu from './modules/Menu.js';
import Game from './modules/Game.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const loggerMiddleware = createLogger()
let store = createStore(whereisitApp);

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

