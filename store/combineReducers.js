import { combineReducers } from 'redux';
import profile from '../containers/profile/reducer';

const appReducers = combineReducers({
  profile,
});

export default appReducers;
