import {applyMiddleware, createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import middleware from './middleware';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// create the store
let store = createStore(
  persistReducer(persistConfig, reducer),
  composeEnhancer(applyMiddleware(...middleware)),
);

// create persistor
let persistor = persistStore(store);

export { store, persistor };
