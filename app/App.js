/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:22
 */
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import mixpanel from 'mixpanel-browser';
import '../scss/main.scss'

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from './config/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


//Import React Router Deps
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import store, {history} from './store/configureStore'


// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


//Initialize mixpanel
//mixpanel.init("9e764a7ae2f004d104120eee14a4bd49");

const AppRouter = () => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
            <Provider store={store}>
                <Router history={history}>{routes}</Router>
            </Provider>
        </MuiThemeProvider>
    )
}


ReactDOM.render(<AppRouter />, document.getElementById('app'))