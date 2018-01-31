import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import channels from './channels';
import subscriptions from './subscriptions';

const rootReducer = combineReducers({
  user,
  flash,
  channels,
  subscriptions,
});

export default rootReducer;
