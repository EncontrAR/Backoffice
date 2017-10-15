import React from 'react'
import { Provider } from 'react-redux'
import axios from 'axios'
import { store, history } from './redux/store'
import PublicRoutes from './router'
import '../src/style/styles.less'

axios.defaults.baseURL = 'http://localhost:3000/v1'
// axios.defaults.baseURL = 'https://encontrar-stage.herokuapp.com/v1'
axios.defaults.headers.common['Content-Type'] = 'application/json'

const DashApp = () =>
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>;

export default DashApp;
