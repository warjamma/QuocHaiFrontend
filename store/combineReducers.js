import { combineReducers } from 'redux';
import profile from '../containers/profile/reducer';
import referred from '../containers/referred/reducer';
import company from '../containers/company/reducer';

const appReducers = combineReducers({
  profile,
  referred,
  company
});

export default appReducers;
