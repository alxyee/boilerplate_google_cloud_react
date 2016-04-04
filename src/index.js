import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

import App from './App';

import { Provider } from 'react-redux'
import { combineReducers} from 'redux'
import {Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
//import { routerMiddleware, push } from 'react-router-redux'

import {configureStore} from './configure-store.js'

const rootReducer = combineReducers({
    routing: routerReducer,
})


////STORE
const store = configureStore({}, rootReducer);
const history = syncHistoryWithStore(browserHistory, store)
//
var ReduxRoot = ({store, history}) => (
    <Provider store={store}>
        <Router history={history} routes={rootRoute}/>
    </Provider>
)
//
////APP ROUTES
const rootRoute = {
    component: 'div',
    childRoutes: [{
        path: '/',
        component: App,
        childRoutes: [

        ]
    }]
}


//history.listen(location => store.dispatch(locationDidChange(location)))

ReactDOM.render(<ReduxRoot store={store} history={history}/>, document.getElementById('root'));
