import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [''],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
 * Configure store with sagas and other middleware
 * Start saga before return to parent
 */
export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		// rootReducer,
		persistedReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(sagaMiddleware),
	);

	// start sagas here
	sagaMiddleware.run(rootSaga);

	let persistor = persistStore(store)
	return { store, persistor };
}

