import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import channels from './channels';
import videos from './videos';

const rootReducer = combineReducers({
  user,
  flash,
  channels,
  videos,
});

export default rootReducer;
