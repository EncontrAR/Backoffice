import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { Debounce } from 'react-throttle';
import { WindowResizeListener } from 'react-window-resize-listener';
import authAction from '../../redux/auth/actions';
import { toggleAll } from '../../redux/app/reducer';
import Sidebar from './Sidebar/Sidebar.js';
import Topbar from './Topbar/Topbar';
import AdminRouter from './AdminRouter';
import { siteConfig } from '../../config.js';
import { AppLocale } from '../../index';
import axios from 'axios'

const { Content, Footer } = Layout;
const { logout } = authAction;

export class Admin extends Component {
  render() {
    axios.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('auth_token')

    const { url } = this.props.match;
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Layout style={{ height: '100vh' }}>
            <Debounce time="1000" handler="onResize">
              <WindowResizeListener
                onResize={windowSize =>
                  this.props.toggleAll(
                    windowSize.windowWidth,
                    windowSize.windowHeight
                  )}
              />
            </Debounce>
            <Topbar url={url} />
            <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
              <Sidebar url={url} />
              <Layout
                style={{
                  height: '100vh'
                }}
              >
                <Content
                  className="isomorphicContent"
                  style={{
                    padding: '70px 0 0',
                    flexShrink: '0',
                    background: '#f1f3f6'
                  }}
                >
                  <AdminRouter url={url} />
                </Content>
                <Footer
                  style={{
                    background: '#ffffff',
                    textAlign: 'center',
                    borderTop: '1px solid #ededed'
                  }}
                >
                  {siteConfig.footerText}
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.toJS().language.locale
  }),
  { logout, toggleAll }
)(Admin);