import { combineReducers } from 'redux';
import counter from './counter';
import somesome from './someOther';

const rootReducer = combineReducers({ counter, somesome });

export default rootReducer;
