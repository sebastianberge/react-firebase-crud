import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import Login from './components/Login';
import Header from './routes/Header';
import Loader from './components/Loader';
import Authenticated from './components/Authenticated';
import NoteDetail from './components/NoteDetail';
import NoteEdit from './components/NoteEdit';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Loader>
				<React.Fragment>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Redirect from="/logout" to="/login" />
						<Authenticated>
							<Header />
							<Route path="/:id/edit" component={NoteEdit} exact />
							<Route path="/:id" component={NoteDetail} exact />
							<Route exact path="/" component={App} />
						</Authenticated>
					</Switch>
				</React.Fragment>
			</Loader>
		</Router>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
