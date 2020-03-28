import { combineReducers } from 'redux';
import profile from '../containers/profile/reducer';
import referred from '../containers/referred/reducer';

const appReducers = combineReducers({
  profile,
  referred
});

export default appReducers;
