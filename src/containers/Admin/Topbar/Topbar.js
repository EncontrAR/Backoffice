import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { toggleCollapsed } from '../../../redux/app/reducer';

const { Header } = Layout;

class Topbar extends Component {
  render() {
    const { toggleCollapsed, customizedTheme } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    // const padLeft = collapsed ? "89px" : "265px";
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
      // padding: "0 31px 0 0",
      // paddingLeft: padLeft,
    };
    return (
      <Header
        style={styling}
        className={
          collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={toggleCollapsed}
          />
        </div>
      </Header>
    );
  }
}

export default connect(
  state => ({
    ...state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
  }),
  { toggleCollapsed }
)(Topbar);