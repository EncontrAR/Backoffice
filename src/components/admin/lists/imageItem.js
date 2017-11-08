import React from 'react';
import { Icon } from 'antd';

export default class ImageItem extends React.Component {
  render() {
    const listClass = `isoSingleCard card grid`;
    const style = { zIndex: 100 - this.props.index, 'display': 'inline-block' };

    console.log(this.props.id)

    return (
      <li id={ this.props.id } className={ listClass } style={ style }>
        <div className="isoCardImage">
          <img alt="#" src={ this.props.url } />
        </div>
        <button className="isoDeleteBtn" onClick={ () => { this.props.onDelete(this.props.id) }}>
          <Icon type="close" />
        </button>
      </li>
    );
  }
}