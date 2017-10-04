import React from 'react'
import { Provider } from 'react-redux'
import axios from 'axios'
import { store, history } from './redux/store'
import PublicRoutes from './router'
import '../src/style/styles.less'

axios.defaults.baseURL = 'https://encontrar-stage.herokuapp.com/v1'
axios.defaults.headers.common['Content-Type'] = 'application/json'
localStorage.setItem('auth_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoyLCJleHAiOjE2MzMyMzI5MTR9.MN2zzPtPF2qygSnq5hY_A8WubvQ70tbsCYpcLBayFPs')
axios.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('auth_token')

const DashApp = () =>
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>;

export default DashApp;
