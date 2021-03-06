import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../../components/uielements/menu';
import IntlMessages from '../../../components/utility/intlMessages';

import {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} from '../../../redux/app/reducer';
import Logo from '../../../components/utility/logo';

const { Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent(e.key);
    if (this.props.app.view === 'MobileView') {
      this.props.toggleCollapsed();
      this.props.toggleOpenDrawer();
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { url, app, toggleOpenDrawer, customizedTheme } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        width="240"
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}>
        <Logo collapsed={collapsed} />
        <Scrollbars style={{ height: scrollheight - 70 }}>
          <Menu
            onClick={this.handleClick}
            theme="dark"
            mode={mode}
            openKeys={app.openKeys}
            selectedKeys={[app.current]}
            onOpenChange={this.onOpenChange}
            className="isoDashboardMenu">
            <Menu.Item key="users">
              <Link to={`${url}/users`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-person-stalker" />
                  <span className="nav-text">
                    <IntlMessages id="admin.sidebar.users" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="campaigns">
              <Link to={`${url}/campaigns`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-map" />
                  <span className="nav-text">
                    <IntlMessages id="admin.sidebar.campaigns" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="missing_people">
              <Link to={`${url}/missingPeople`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-ios-people" />
                  <span className="nav-text">
                    <IntlMessages id="admin.sidebar.missing_people" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="finders">
              <Link to={`${url}/finders`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-search" />
                  <span className="nav-text">
                    <IntlMessages id="admin.sidebar.finders" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="zones">
              <Link to={`${url}/zones`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-ios-location" />
                  <span className="nav-text">
                    <IntlMessages id="admin.sidebar.zones" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="conversations">
              <Link to={`${url}/conversations`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-chatbubbles" />
                  <span className="nav-text">
                    <IntlMessages id="admin.sidebar.messages" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reports">
              <Link to={`${url}/reports`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-document-text" />
                  <span className="nav-text">
                    <IntlMessages id="admin.sidebar.reports" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </Scrollbars>
      </Sider>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);