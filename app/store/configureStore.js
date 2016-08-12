/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 25/07/2016
 * Time: 13:19
 */

import {createStore, applyMiddleware} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux'
import rootReducer from '../reducers'


const RouterMiddlewear = routerMiddleware(browserHistory)

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, RouterMiddlewear)(createStore);


var initialState = {}

const store = createStoreWithMiddleware(rootReducer, initialState, window.devToolsExtension && window.devToolsExtension());
export const history = syncHistoryWithStore(browserHistory, store)

export default store


