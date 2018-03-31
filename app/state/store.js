import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import * as reducers from './ducks';
import { createLogger } from './middleware';

export default function configureStore(initialState) {
    const rootReducer = combineReducers(reducers);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(            
                thunkMiddleware,
                createLogger(true),
            ),
        )
    );
}