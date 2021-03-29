import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
// import myLogger from './middlewares/myLogger';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
// export default createStore(rootReducer, applyMiddleware(myLogger, logger));
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);
