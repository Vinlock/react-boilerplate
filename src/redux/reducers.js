import { persistCombineReducers } from 'redux-persist';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default config => persistCombineReducers(config, {
  form: formReducer,
  router: routerReducer,
});
