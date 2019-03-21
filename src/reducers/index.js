import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import userReducer from './userReducer';
import loadingReducer from '../reducers/loadingReducer';

const rootReducer = combineReducers({
	notes: notesReducer,
	user: userReducer,
	loading: loadingReducer
});

export default rootReducer;
