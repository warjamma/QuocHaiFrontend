import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import reducer from './combineReducers'

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['profile'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, reducer)

export function initializeStore(initialState = {}) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
