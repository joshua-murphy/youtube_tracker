import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import subscriptions from './subscriptions';

const rootReducer = combineReducers({
  user,
  flash,
  subscriptions,
});

export default rootReducer;
