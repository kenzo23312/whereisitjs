import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { whereisit } from './redux/reducers'

export default function configureStore(preloadedState) {
  return createStore(
    whereisit,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}