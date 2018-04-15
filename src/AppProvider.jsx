import createHistory from 'history/createBrowserHistory';
import createEncryptor from 'redux-persist-transform-encrypt';
import createCompressor from 'redux-persist-transform-compress';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import React, { Component } from 'react';
import localForage from 'localforage';
import { Provider } from 'react-redux';

// Bugsnag
// import bugsnag from 'bugsnag-js';
// import createPlugin from 'bugsnag-react';
// export const bugsnagClient = bugsnag('bbb73559b604412a7b5da35940f94e67');
// const ErrorBoundary = bugsnagClient.use(createPlugin(React));

import reducers from './redux/reducers';
import App from './App';

const history = createHistory();

const encryptor = createEncryptor({
  secretKey: process.env.REACT_APP_ENCRYPTION_KEY,
});

const persistConfig = {
  key: 'primary',
  storage: localForage,
  transforms: [
    encryptor,
    createCompressor(),
  ],
  whitelist: [],
};

const middleware = [
  promise,
  thunk,
  routerMiddleware(history),
];

const store = createStore(
  reducers(persistConfig),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(...middleware)),
);

const persistor = persistStore(store);

const { dispatch } = store;

const loading = null;

// Fixed with https://github.com/ReactTraining/react-router/issues/5895
const Renderer = withRouter(props => props.render());

class AppProvider extends Component {
  onBeforeLift = () => {
    // Actions before done loading.
  };

  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Renderer render={() => (
              <PersistGate
                loading={loading}
                onBeforeLift={this.onBeforeLift}
                persistor={persistor}
              >
                <App />
              </PersistGate>
            )}
            />
          </ConnectedRouter>
        </Provider>
      </ErrorBoundary>
    );
  }
}

export {
  history,
  store,
  dispatch,
  persistConfig,
};

export default AppProvider;
