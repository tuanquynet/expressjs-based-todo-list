// import React from 'react'
// import { render } from 'react-dom'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import App from './components/App'
// import reducer from './reducers'
import 'todomvc-app-css/index.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { getTodoRequest } from './actions'

const {store} = configureStore();

function renderRoot( ) {
	getTodoRequest();

	ReactDOM.render((
		<Provider store={store} >
        <App />
		</Provider>
	), document.getElementById('root'));
}

// first render the app
renderRoot();

// watch and re-render with new language select
store.subscribe(() => {
	console.log('store change');
});

// registerServiceWorker();
