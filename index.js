/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './src/reducers';
import rootSaga from './src/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(sagaMiddleware))
   );

sagaMiddleware.run(rootSaga);

const ReactApp = ()=>(
    <Provider store={store}>
        <App />
    </Provider>
)
    // AppRegistry.registerComponent(appName, () => <Provider store={store}>{App}</Provider>);


AppRegistry.registerComponent(appName, () => ReactApp);
